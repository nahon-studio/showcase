#!/usr/bin/env python3
"""Validate registered game JSON, local image paths and store links. No dependencies."""
import json
import re
import sys
import math
from pathlib import Path
from urllib.parse import urlparse, parse_qs

ROOT = Path(__file__).resolve().parent.parent
errors = []
seen_ids = set()
PLATFORMS = {"steam", "app-store", "google-play", "roblox", "stove"}
STATUSES = {"released", "coming-soon", "in-development"}
KR_AGE_RATINGS = {"all", "12", "15"}
KR_CONTENT_DESCRIPTORS = {"선정성", "폭력성", "공포", "언어의 부적절성", "약물", "범죄", "사행성"}
BANNER_TEXT_POSITIONS = ["top-left", "center-left", "bottom-left", "top-right", "center-right", "bottom-right"]


def fail(source, message):
    errors.append(f"{source}: {message}")


def local_file(value, source):
    if not isinstance(value, str) or not value:
        fail(source, "파일 경로가 비어 있습니다.")
        return None
    candidate = (ROOT / value).resolve()
    if urlparse(value).scheme or value.startswith("/") or "\\" in value or ".." in value.split("/") or ROOT not in candidate.parents:
        fail(source, f"사이트 내부의 상대경로를 사용하세요: {value}")
        return None
    if not candidate.is_file():
        fail(source, f"파일을 찾을 수 없습니다: {value}")
        return None
    return candidate


def read_json(value):
    path = local_file(value, value)
    if not path:
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError) as error:
        fail(value, str(error))
        return None


def youtube_video_id(value):
    try:
        parsed = urlparse(value)
        if parsed.scheme != "https" or parsed.username or parsed.password or parsed.port:
            return None
        parts = [part for part in parsed.path.split("/") if part]
        video_id = None
        if parsed.hostname == "youtu.be" and len(parts) == 1:
            video_id = parts[0]
        if parsed.hostname in {"youtube.com", "www.youtube.com", "m.youtube.com"}:
            if parsed.path == "/watch":
                video_id = parse_qs(parsed.query).get("v", [None])[0]
            elif len(parts) == 2 and parts[0] in {"embed", "shorts", "live"}:
                video_id = parts[1]
        if parsed.hostname in {"youtube-nocookie.com", "www.youtube-nocookie.com"} and len(parts) == 2 and parts[0] == "embed":
            video_id = parts[1]
        return video_id if re.fullmatch(r"[a-zA-Z0-9_-]{11}", video_id or "") else None
    except ValueError:
        return None


def validate_age_rating(rating, source):
    if not isinstance(rating, dict):
        fail(source, "ageRating은 객체여야 합니다.")
        return
    category = rating.get("rating")
    if rating.get("system") != "KR" or not isinstance(category, str) or category not in KR_AGE_RATINGS:
        fail(source, 'ageRating: system은 KR, rating은 문자열 all / 12 / 15 중 하나입니다.')
    else:
        local_file(f"assets/ratings/kr-{category}.gif", source)
    if rating.get("method") not in ["self", "committee"]:
        fail(source, "ageRating.method는 self 또는 committee여야 합니다.")
    for field in ["authority", "classificationNumber", "classifiedAt"]:
        if field in rating and (not isinstance(rating[field], str) or not rating[field].strip()):
            fail(source, f"ageRating.{field}는 비어 있지 않은 문자열이어야 합니다.")
    if "contentDescriptors" in rating:
        descriptors = rating["contentDescriptors"]
        if not isinstance(descriptors, list) or any(not isinstance(value, str) or value not in KR_CONTENT_DESCRIPTORS for value in descriptors) or len(set(descriptors)) != len(descriptors):
            fail(source, "ageRating.contentDescriptors에는 통지서의 내용정보 항목을 중복 없이 입력하세요.")


def validate_game(file):
    game = read_json(file)
    if game is None:
        return
    if not isinstance(game, dict):
        fail(file, "게임 정보는 JSON 객체여야 합니다.")
        return
    game_id = game.get("id")
    if not isinstance(game_id, str) or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", game_id):
        fail(file, "id는 영문 소문자·숫자·하이픈으로 작성하세요.")
    elif game_id in seen_ids:
        fail(file, f"중복된 id입니다: {game_id}")
    else:
        seen_ids.add(game_id)
    for field in ["title", "tagline", "description", "genre", "banner", "bannerAlt"]:
        if not isinstance(game.get(field), str) or not game[field].strip():
            fail(file, f"{field}는 비어 있지 않은 문자열이어야 합니다.")
    if "heroTitle" in game and not isinstance(game["heroTitle"], str):
        fail(file, "heroTitle은 문자열이어야 합니다.")
    if "bannerFit" in game and game["bannerFit"] not in ["cover", "contain"]:
        fail(file, "bannerFit은 cover 또는 contain이어야 합니다.")
    if "bannerTextPosition" in game and game["bannerTextPosition"] not in BANNER_TEXT_POSITIONS:
        fail(file, "bannerTextPosition은 top/center/bottom과 left/right를 조합하세요. 예: bottom-right")
    if "bannerFocus" in game:
        focus = game["bannerFocus"]
        if not isinstance(focus, dict) or any(type(focus.get(axis)) not in [int, float] or not math.isfinite(focus[axis]) or not 0 <= focus[axis] <= 100 for axis in ["x", "y"]):
            fail(file, "bannerFocus의 x, y는 0~100 범위의 숫자여야 합니다.")
    if not isinstance(game.get("status"), str) or game["status"] not in STATUSES:
        fail(file, "status는 released / coming-soon / in-development 중 하나입니다.")
    for field in ["demo", "featured"]:
        if not isinstance(game.get(field), bool):
            fail(file, f"{field}는 true 또는 false여야 합니다.")
    if "visible" in game and not isinstance(game["visible"], bool):
        fail(file, "visible은 true 또는 false여야 합니다.")
    if "ageRating" in game:
        validate_age_rating(game["ageRating"], file)
    local_file(game.get("banner"), file)
    if game.get("cover"):
        local_file(game["cover"], file)
    platforms = game.get("platforms")
    if not isinstance(platforms, list) or not platforms:
        fail(file, "platforms에 지원 플랫폼을 하나 이상 등록하세요.")
    else:
        seen_platforms = set()
        for platform in platforms:
            if not isinstance(platform, dict) or not isinstance(platform.get("type"), str) or platform["type"] not in PLATFORMS:
                fail(file, "지원 플랫폼: steam / app-store / google-play / roblox / stove")
                continue
            if platform["type"] in seen_platforms:
                fail(file, f"중복된 플랫폼: {platform['type']}")
            seen_platforms.add(platform["type"])
            url = platform.get("url", "")
            if not isinstance(url, str):
                fail(file, "스토어 URL은 문자열이어야 합니다.")
                continue
            if url:
                parsed = urlparse(url)
                if parsed.scheme != "https" or not parsed.netloc or any(char.isspace() for char in url):
                    fail(file, f"유효한 HTTPS 스토어 URL이 아닙니다: {url}")
    shots = game.get("screenshots", [])
    if not isinstance(shots, list):
        fail(file, "screenshots는 배열이어야 합니다.")
    else:
        for index, shot in enumerate(shots):
            if not isinstance(shot, dict):
                fail(file, f"screenshots[{index}]는 객체여야 합니다.")
                continue
            local_file(shot.get("src"), file)
            if not isinstance(shot.get("alt"), str) or not shot["alt"].strip():
                fail(file, f"screenshots[{index}].alt 설명이 필요합니다.")
            if "caption" in shot and not isinstance(shot["caption"], str):
                fail(file, f"screenshots[{index}].caption은 문자열이어야 합니다.")
    for field in ["about", "features", "languages", "tags"]:
        if field in game and (not isinstance(game[field], list) or any(not isinstance(value, str) or not value.strip() for value in game[field])):
            fail(file, f"{field}는 비어 있지 않은 문자열의 배열이어야 합니다.")
    for field in ["releaseDate", "developer", "players"]:
        if field in game and not isinstance(game[field], str):
            fail(file, f"{field}는 문자열이어야 합니다.")
    videos = game.get("videos", [])
    if not isinstance(videos, list):
        fail(file, "videos는 배열이어야 합니다.")
    else:
        for index, video in enumerate(videos):
            if not isinstance(video, dict) or not isinstance(video.get("url"), str):
                fail(file, f"videos[{index}].url은 문자열이어야 합니다.")
                continue
            if video["url"] and not youtube_video_id(video["url"]):
                fail(file, f"videos[{index}].url에 유효한 HTTPS YouTube 영상 주소가 필요합니다.")
            if "title" in video and not isinstance(video["title"], str):
                fail(file, f"videos[{index}].title은 문자열이어야 합니다.")
            if video.get("poster"):
                local_file(video["poster"], file)


manifest = read_json("content/games.json")
if isinstance(manifest, dict) and isinstance(manifest.get("games"), list):
    for file in manifest["games"]:
        if isinstance(file, str):
            validate_game(file)
        else:
            fail("content/games.json", "각 게임 파일 경로는 문자열이어야 합니다.")
else:
    fail("content/games.json", "games 배열이 필요합니다.")

if errors:
    print("콘텐츠 검사 실패:\n- " + "\n- ".join(errors))
    sys.exit(1)
print(f"콘텐츠 검사 통과: 게임 {len(seen_ids)}개, JSON·이미지·플랫폼 링크·YouTube 링크·상세 소개·이용등급 정상.")
