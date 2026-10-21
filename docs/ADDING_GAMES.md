# NAHON Studio 게임 자료 등록 가이드

각 게임 프로젝트 담당자는 아래 구조의 폴더를 준비해 이 사이트 저장소의 `games/`에 업로드하면 됩니다. 게임 자료는 해당 프로젝트 폴더 안에서 관리하고, 첫 등록 때만 공용 목록 `content/games.json`을 수정합니다.

## 1. 게임 폴더 만들기

`games/_template/game.json`을 복사해 게임별 폴더를 만듭니다. 폴더명과 `id`에는 영문 소문자·숫자·하이픈만 사용하세요.

```text
games/my-game/
  game.json
  banner.webp
  cover.webp
  screenshot-01.webp
  screenshot-02.webp
  screenshot-03.webp
```

다른 프로젝트에서 자료를 제작하는 경우 위 폴더를 통째로 전달하면 됩니다. 게임의 별도 저장소에만 업로드한 파일이 자동으로 연동되지는 않습니다. 이 소개 사이트 저장소로 폴더를 복사하거나 PR을 올려 주세요.

## 2. game.json 작성

```json
{
  "id": "my-game",
  "title": "MY GAME",
  "tagline": "한 문장으로 전하는 게임의 매력.",
  "description": "어떤 세계에서 무엇을 즐기는 게임인지 두 문장 정도로 설명해 주세요.",
  "genre": "PUZZLE · ADVENTURE",
  "status": "released",
  "featured": true,
  "demo": false,
  "banner": "games/my-game/banner.webp",
  "bannerAlt": "배너에 보이는 장면을 설명하는 문장",
  "cover": "games/my-game/cover.webp",
  "platforms": [
    { "type": "steam", "url": "" },
    { "type": "app-store", "url": "" },
    { "type": "google-play", "url": "" }
  ],
  "screenshots": [
    {
      "src": "games/my-game/screenshot-01.webp",
      "alt": "첫 번째 스크린샷 장면 설명",
      "caption": "숲속에서 발견한 첫 번째 퍼즐"
    },
    {
      "src": "games/my-game/screenshot-02.webp",
      "alt": "두 번째 스크린샷 장면 설명",
      "caption": "새로운 동료와 함께하는 탐험"
    }
  ]
}
```

JSON은 큰따옴표를 사용하며 주석이나 마지막 항목 뒤 쉼표를 허용하지 않습니다. 줄바꿈은 위 예시처럼 `\n`으로 입력합니다.

| 항목 | 입력 방법 |
| --- | --- |
| `id` | 사이트 전체에서 유일한 영문 소문자 ID. 상세 주소는 `game.html?id=<id>`입니다. 게시 후 유지하면 직접 링크가 바뀌지 않습니다. |
| `title` | 배너 안·카드·상세 페이지에 표시할 실제 게임명. `게임 제목: 부제`처럼 쓰면 배너 제목에서 콜론 뒤 부제가 작게 표시됩니다. |
| `heroTitle` | 이전 자료와의 호환용 항목. 현재 배너 제목은 `title`을 사용하므로 새 자료에서는 생략합니다. |
| `tagline` | 배너에 들어갈 한 줄 소개. 약 40자 이내 권장. |
| `description` | 카드 소개문. 한글 50~90자 정도 권장. |
| `genre` | `ACTION · ROGUELIKE`처럼 장르 표시. |
| `status` | `released`(출시), `coming-soon`(출시 예정), `in-development`(개발 중) 중 하나. |
| `featured` | `true`인 게임을 상단 배너에 먼저 배치합니다. `false`인 게임도 이어서 표시되며, 공개된 모든 게임이 자동 순환합니다. |
| `visible` | 선택. 기본 `true`. `false`로 설정하면 목록·배너·관련 게임·상세 페이지에서 숨깁니다. 자료와 등록 경로는 유지되므로 `true`로 바꾸면 다시 공개됩니다. |
| `demo` | 실제 자료는 **`false`**. `true`는 예시 프로젝트·콘셉트 아트 표시를 켭니다. |
| `banner` | 큰 배너 이미지의 사이트 루트 기준 상대경로. |
| `bannerTextPosition` | 선택. 기본 `bottom-left`. `top-left`, `center-left`, `bottom-left`, `top-right`, `center-right`, `bottom-right` 중 선택. 제목·소개·버튼이 함께 이동하며 해당 좌우 한쪽에만 어두운 그라데이션이 표시됩니다. |
| `bannerFocus` | 선택. 기본 `{ "x": 50, "y": 50 }`. 이미지는 항상 배너 전체를 채우므로 잘리는 부분을 0~100% 기준으로 조절합니다. `x`는 왼쪽 0~오른쪽 100, `y`는 위 0~아래 100입니다. |
| `bannerFit` | 이전 자료와의 호환용 항목. 현재는 값과 관계없이 배너를 꽉 채우므로 새 자료에서는 생략합니다. |
| `bannerAlt` | 이미지를 볼 수 없는 방문자를 위한 구체적인 장면 설명. |
| `cover` | 선택. 카드용 이미지 경로. 생략하면 배너를 재사용합니다. |
| `platforms` | 지원하거나 출시 예정인 플랫폼만 남깁니다. 최소 1개 필요. |
| `screenshots` | 선택. 원하는 순서로 이미지 등록. 비어 있거나 생략하면 배너를 갤러리에 표시합니다. |
| `screenshots[].alt` | 각 스크린샷 설명. 필수. |
| `screenshots[].caption` | 선택. 확대했을 때 표시할 설명. 생략하면 `alt` 사용. |
| `videos` | 선택. YouTube 영상 목록. 등록된 영상이 스크린샷 앞에 표시됩니다. |
| `about` | 선택. 상세 소개 문단들의 문자열 배열. 생략하면 `description` 사용. |
| `features` | 선택. 게임의 핵심 특징 목록. |
| `developer` | 선택. 개발사. 생략하면 `NAHON Studio`. |
| `releaseDate` | 선택. 실제 출시일 또는 `2027년 예정`, `추후 공개` 등의 문구. |
| `players` | 선택. `싱글 플레이`, `온라인 협동 1~4인` 등의 플레이 방식. |
| `languages` | 선택. 지원 언어 문자열 배열. |
| `tags` | 선택. 장르·분위기 태그. 생략하면 `genre`를 구분점 `·`으로 나눠 사용. |
| `ageRating` | 선택. 실제 등급분류 결과. 배너 로고와 상세 등급분류표에 함께 표시됩니다. [입력 예시·공식 도안·해외 서비스 안내](AGE_RATINGS.md) |

모든 경로는 **사이트 최상위 기준**이며 `/games/...`처럼 앞에 슬래시를 붙이지 않습니다. 예: `games/my-game/banner.webp`. 외부 이미지 URL, 상위 폴더를 가리키는 `../` 경로는 사용하지 않습니다. 파일명 대소문자는 실제 파일과 일치해야 합니다.

## 3. 플랫폼 링크 넣기

해당 게임이 지원하는 플랫폼만 배열에 남기고 `url`에 공식 스토어의 실제 HTTPS 주소를 넣습니다.

| type | 표시 로고·이름 | URL 형식 예시 | 필터 |
| --- | --- | --- | --- |
| `roblox` | Roblox | `https://www.roblox.com/games/실제PlaceID/` | PC · Roblox |
| `steam` | Steam | `https://store.steampowered.com/app/실제앱ID/` | PC |
| `stove` | STOVE | `https://store.onstove.com/ko/games/실제상품ID` | PC · STOVE |
| `app-store` | App Store | `https://apps.apple.com/kr/app/id실제앱ID` | iOS |
| `google-play` | Google Play | `https://play.google.com/store/apps/details?id=실제패키지명` | Android |

위 주소의 한글 부분은 반드시 실제 값으로 교체합니다. 실제 링크가 없으면 `"url": ""`로 두세요. 클릭할 수 없는 `준비 중` 표시로 보입니다. 실제 주소가 있으면 게임 목록에서 해당 플랫폼 아이콘이 컬러로 표시되며, 플랫폼 로고 버튼을 눌러 새 탭으로 이동합니다. 출시 예정 게임의 위시리스트·사전 등록 URL도 입력할 수 있습니다.

STOVE 게임은 Steam 출시도 예정되어 있으므로 `{"type": "steam", "url": ""}`를 함께 등록해 `준비 중`으로 표시합니다. Steam 상품 페이지가 생기면 해당 URL을 채웁니다.

`status`는 게임 전체 상태입니다. 일부 플랫폼만 나중에 출시한다면 아직 스토어 페이지가 없는 플랫폼의 URL은 비워 둡니다.

## 4. 이미지 준비

| 용도 | 권장 크기·비율 | 참고 |
| --- | --- | --- |
| 배너 | 1920×1080 이상, 가로형 | 게임의 인물·분위기가 보이는 대표 이미지를 사용하세요. 화면에 꽉 차도록 일부 가장자리가 잘릴 수 있으므로 `bannerFocus`로 주인공 위치를 조절하고 PC·모바일에서 확인하세요. |
| 카드 표지 | 1200×800 정도 | 자동으로 잘려 보이므로 가장자리에 중요한 텍스트를 넣지 마세요. |
| 스크린샷 | 실제 게임 화면의 원래 비율 | 확대 화면은 비율을 유지합니다. 가로·세로 이미지 모두 가능. |

- WebP를 권장하며 JPG·PNG·AVIF·SVG도 사용할 수 있습니다.
- 이미지당 200~600KB 정도를 권장합니다. 스크린샷은 3~6장 정도면 게임을 충분히 소개할 수 있습니다.
- 원본 작업 파일(PSD·영상 원본 등)은 올리지 않고 웹용으로 내보낸 파일을 사용합니다.
- 배너 제목은 웹페이지가 별도로 표시하므로 글자가 없는 이미지를 권장합니다.
- 제목이 주인공이나 이미지 속 글씨와 겹치면 `"bannerTextPosition": "bottom-right"`처럼 위치를 바꾸세요. 이미지는 `"bannerFocus": { "x": 65, "y": 45 }`처럼 별도로 조절합니다. 숫자는 따옴표 없이 입력합니다.
- 이미지 파일이 없으면 대체 화면이 표시되지만, 게시 전에 검사 스크립트로 누락을 고쳐 주세요.

## 5. 상세 소개와 YouTube 영상

새 HTML 페이지를 만들 필요 없이 `game.json`에 아래 필드를 추가하면 됩니다. 전부 선택 항목이므로 기존 게임 데이터도 그대로 동작합니다.

```json
{
  "about": [
    "게임의 배경과 플레이어의 역할을 소개하는 첫 번째 문단입니다.",
    "플레이 방식과 세계관을 설명하는 두 번째 문단입니다."
  ],
  "features": ["자유롭게 탐험하는 넓은 세계", "함께 풀어 가는 환경 퍼즐"],
  "developer": "NAHON Studio",
  "releaseDate": "추후 공개",
  "players": "싱글 플레이",
  "languages": ["한국어", "English"],
  "tags": ["탐험", "퍼즐", "힐링"],
  "videos": [
    {
      "url": "https://www.youtube.com/watch?v=실제영상ID",
      "title": "공식 트레일러",
      "poster": "games/my-game/trailer-poster.webp"
    }
  ]
}
```

- 위 코드는 **추가 필드 예시**입니다. 기존의 필수 필드를 유지한 상태로 합칩니다. `실제영상ID`는 공유할 영상의 실제 ID로 바꾸세요.
- `videos[].url`에는 `https://www.youtube.com/watch?v=...`, `https://youtu.be/...`, `/shorts/...`, `/live/...`, `/embed/...` 형식의 HTTPS 영상 주소를 사용할 수 있습니다. 채널·재생목록 주소와 iframe HTML은 지원하지 않습니다.
- `videos[].title`은 영상 제목입니다. 생략하면 `게임 트레일러`가 표시됩니다.
- `videos[].poster`는 선택한 로컬 썸네일 경로입니다. 생략하거나 빈 문자열로 두면 게임 배너가 표시됩니다.
- 영상이 없으면 `"videos": []`로 둡니다. 템플릿의 빈 `url` 항목도 화면에서 자동으로 제외됩니다.
- 영상 여러 개를 등록하면 입력한 순서대로 나오며, 그 뒤에 `screenshots` 이미지가 이어집니다.
- 영상은 방문자가 재생을 누를 때 YouTube 플레이어가 열립니다. 다른 미디어로 이동하면 재생 중인 플레이어를 제거해 소리를 멈춥니다. YouTube에서 직접 여는 링크도 함께 표시합니다.
- 비공개 영상이나 임베드가 제한된 영상은 사이트에서 재생되지 않을 수 있으므로 공개 또는 일부 공개 상태와 퍼가기 허용을 확인하세요. [YouTube의 영상 삽입 안내](https://support.google.com/youtube/answer/171780?hl=ko)
- 상세 페이지의 이전/다음 버튼, 썸네일, 키보드 방향키로 미디어를 넘길 수 있습니다. 이미지를 누르면 확대되며, 확대 상태에서도 방향키·스와이프·이전/다음을 사용할 수 있습니다. `Esc`로 닫습니다.

상세 주소는 `game.html?id=<게임ID>`입니다. 게임 추가 후 해당 ID로 주소가 자동 연결됩니다. 홈의 게임 카드·제목·배너 버튼에서 접근할 수 있습니다.

## 6. 첫 등록과 순서 변경

`content/games.json`에 새 게임의 JSON 경로를 추가합니다.

```json
{
  "games": [
    "games/my-game/game.json",
    "games/another-game/game.json"
  ]
}
```

배열 순서가 게임 목록 순서입니다. 상단 배너에는 등록된 모든 게임이 자동으로 추가되며 개수 제한이 없습니다. `featured: true`인 게임을 먼저, 나머지 게임을 그다음에 각각 목록 순서대로 보여줍니다. 숨길 게임은 목록에서 경로를 빼면 됩니다.

이미 등록한 게임의 설명·이미지·링크 수정은 해당 게임 폴더만 업데이트하면 됩니다. 홈페이지 코드를 고칠 필요가 없습니다.

## 7. 게시 전 확인

```sh
python3 scripts/validate_content.py
python3 -m http.server 8000 --bind 127.0.0.1
```

로컬 페이지에서 배너, 플랫폼 필터, 상세 페이지 이동, 스토어 링크, YouTube 재생, 스크린샷 넘기기·확대를 확인하고 GitHub에 커밋합니다. 상세 페이지 주소를 새로고침해도 같은 게임이 열리는지 확인하세요. GitHub Pages가 설정되어 있다면 선택한 게시 브랜치의 변경 사항이 배포됩니다.

각 프로젝트 담당자에게 전달할 짧은 요청:

> `games/<게임ID>/` 폴더에 `game.json`, 배너, 게임 스크린샷을 준비해 주세요. JSON에는 실제 게임명·한 줄 소개·장르·출시 상태·Steam/App Store/Google Play 주소를 넣어 주세요. 상세 소개는 `about`, 특징은 `features`, 유튜브 링크는 `videos`, 여러 스크린샷은 `screenshots`에 등록합니다. `demo`는 `false`로 설정해 주세요. 파일 경로는 `games/<게임ID>/...` 형식을 사용합니다. 첫 등록 시 `content/games.json`에 게임 JSON 경로를 추가해 PR을 올려 주세요.
