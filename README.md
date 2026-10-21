# NAHON Studio

Steam·모바일 게임을 소개하는 GitHub Pages용 정적 사이트입니다. 빌드 도구나 패키지 설치가 필요하지 않습니다.

- 사이트: [NAHON Studio](https://nahon-studio.github.io/showcase/)
- 저장소: [nahon-studio/showcase](https://github.com/nahon-studio/showcase)
- 다른 게임 프로젝트에 전달: [짧은 업로드 지침](docs/UPLOAD_GAME_SHORT.md)

- 공개된 모든 게임이 자동 포함되는 배너: 배너 안에 현재 게임 제목 표시(콜론 뒤 부제는 작은 글씨), 6.5초 자동 전환, 가로 스크롤 썸네일, 양옆·하단 이동 화살표, 일시정지, 터치 스와이프. 모바일에서도 배너 영역을 이미지로 채우며, 게임별로 제목 위치와 이미지 중심을 지정할 수 있습니다.
- 게임 목록: 전체 / PC / STOVE / Android / iOS / Roblox 필터, 상품 페이지 링크가 있는 플랫폼은 컬러 아이콘으로 표시
- 게임별 상세 페이지: 큰 미디어 뷰어, 스크린샷 썸네일, YouTube 영상, 게임 정보·긴 소개·스토어 버튼
- 이미지 갤러리: 이전/다음, 썸네일 선택, 확대 보기, 방향키·터치 스와이프, Esc 닫기
- 데스크톱·태블릿·모바일 반응형 레이아웃, 키보드 탐색, 모션 줄이기 설정 지원
- 프로젝트별 JSON과 이미지 폴더로 콘텐츠 관리

게임 자료는 각 프로젝트의 `game.json`과 이미지 폴더에서 관리합니다. 스토어 URL이 비어 있으면 링크 대신 `준비 중`을 표시합니다.

임시로 숨길 때는 해당 `game.json`의 `visible`을 `false`로 설정합니다. 자료를 삭제하지 않고 숨기며, `true`로 바꾸면 다시 공개됩니다. 생략한 게임은 공개 상태입니다.

## 로컬 미리보기

저장소 폴더에서 다음을 실행하고 [로컬 미리보기](http://localhost:8000)를 엽니다.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Windows에서는 `py -m http.server 8000 --bind 127.0.0.1`을 사용할 수 있습니다. 종료는 `Ctrl+C`입니다. JSON을 불러오기 때문에 `index.html`을 더블클릭하는 `file://` 방식 대신 HTTP 서버를 이용하세요.

## 게임 자료 추가

[게임 추가 가이드](docs/ADDING_GAMES.md)를 각 게임 프로젝트에 전달하세요. [자료 템플릿](games/_template/game.json)을 복사하면 됩니다.

```text
index.html                 홈과 스튜디오 소개 문구
game.html                  게임 상세 페이지 (game.html?id=<게임ID>)
styles.css                 색상·레이아웃·반응형 스타일
game.css                   상세 페이지 스타일
shared.js                  공용 콘텐츠 검증·플랫폼·URL 처리
app.js                     홈 슬라이더·필터
game.js                    상세 소개·영상·스크린샷 뷰어
assets/                    사이트 로고 및 이미지 대체 화면
content/games.json         게임 파일 목록과 표시 순서
games/
  _template/game.json      복사용 게임 데이터 템플릿
  <game-id>/
    game.json              게임 이름·소개·플랫폼 링크
    banner.webp            상단 배너
    cover.webp             선택: 목록용 표지
    screenshot-01.webp     게임 스크린샷
docs/ADDING_GAMES.md        프로젝트 담당자용 등록 가이드
scripts/validate_content.py 콘텐츠 오류 검사
```

홈의 배너 버튼·게임 이미지·게임 제목을 누르면 상세 페이지로 이동합니다. 상세 주소는 `game.html?id=<게임ID>`이며 새로고침·직접 링크·GitHub Pages 하위 경로를 지원합니다. `videos`에 실제 YouTube URL을 넣으면 영상 썸네일과 재생 버튼이 나타납니다. 트레일러가 등록되지 않은 게임은 영상 `준비 중`으로 표시합니다.

변경 후 콘텐츠 검사를 실행할 수 있습니다. Python 표준 라이브러리만 사용합니다.

```sh
python3 scripts/validate_content.py
```

## GitHub Pages 게시

1. 이 폴더의 파일 전체를 사용할 GitHub 저장소에 업로드합니다. `index.html`이 저장소 최상위에 있어야 합니다. `.nojekyll`도 포함합니다.
2. 저장소의 **Settings → Pages → Build and deployment → Source**에서 **Deploy from a branch**를 선택합니다.
3. 파일을 업로드한 브랜치(예: `main`)와 **/(root)**를 선택하고 저장합니다.
4. 배포가 끝나면 Pages 설정 화면의 **Visit site**로 확인합니다.

일반 프로젝트 저장소의 주소는 `https://<계정>.github.io/<저장소>/`입니다. `<계정>.github.io`라는 저장소를 사용하면 계정 기본 주소에 게시됩니다. 이미지·스크립트·JSON 경로는 모두 상대경로라 프로젝트 하위 경로에서도 동작합니다.

공식 안내: [GitHub Pages 사이트 만들기](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [게시 소스 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

이 사이트는 위 저장소의 `main` 브랜치 최상위(`/`)를 GitHub Pages 게시 소스로 사용합니다. `main`에 게임 자료를 반영하면 사이트가 자동 갱신됩니다. 상세 페이지 주소는 `https://nahon-studio.github.io/showcase/game.html?id=<게임ID>`입니다.

## 스튜디오 정보 수정

- `index.html`: 브랜드·상단 소개·Studio 영역·검색 결과 제목 및 설명
- `styles.css` 상단 `:root`: 포인트 컬러와 배경색
- `assets/nahon-a1-light-loop.gif` / `nahon-a1-dark-loop.gif`: 8초마다 반복되는 A1 해달 로고 원본. 메인 페이지의 상단과 하단은 밝은 배경에 맞춰 light를, 게임 상세 페이지는 어두운 배경에 맞춰 dark를 사용합니다. 로고 영역의 배경을 바꾸면 HTML의 GIF와 PNG 경로도 함께 맞춰 주세요.
- `assets/nahon-a1-light-still.png` / `nahon-a1-dark-still.png`: 기기의 ‘동작 줄이기’ 설정이 켜져 있을 때 표시하는 정지 버전. `picture`의 `source`에서 선택합니다.
- `assets/favicon-32.png` / `favicon.ico`: 같은 해달 캐릭터의 브라우저 탭 아이콘
- `assets/apple-touch-icon.png`: 홈 화면에 추가할 때 사용하는 아이콘
- 사이트에 연락처가 필요하면 실제 이메일이나 공식 링크를 확인한 뒤 추가합니다.

별도의 서버·데이터베이스·관리자 업로드 화면은 없습니다. 자료 변경은 GitHub의 파일 업로드 또는 Git 커밋으로 반영됩니다.
