# 다른 게임 프로젝트에 전달할 지침

- 사이트: https://nahon-studio.github.io/showcase/
- 업로드 저장소: https://github.com/nahon-studio/showcase
- 이 저장소의 `games/_template/game.json`을 복사해 `games/<게임ID>/game.json`을 작성하고, 같은 폴더에 배너·스크린샷을 넣어 주세요. 실제 게임명·소개·스토어 링크·YouTube URL(`videos`)을 채우고 `demo`는 `false`로 설정합니다.
- `content/games.json`에 `games/<게임ID>/game.json`을 추가한 뒤 PR을 올려 `main`에 병합하면 게임 목록과 상단 배너에 자동 반영됩니다. 이후 수정은 해당 게임 폴더만 변경하면 됩니다.
- 상세 주소: `https://nahon-studio.github.io/showcase/game.html?id=<게임ID>` · [전체 작성 예시](ADDING_GAMES.md)
- 이용등급이 확정되면 `ageRating`에 실제 결과를 추가하세요. [등급 입력 예시](AGE_RATINGS.md)
- 배너 제목 위치는 `bannerTextPosition`(예: `bottom-right`), 이미지 중심은 `bannerFocus`(예: `{ "x": 65, "y": 50 }`)로 지정합니다.
