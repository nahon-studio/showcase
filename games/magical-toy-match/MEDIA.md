# 매지컬 토이 매치 소개 자료

- 공개 상태: 출시 예정. Google Play 정식 공개 페이지와 YouTube 트레일러가 없어 링크는 비워 둔다. 내부 테스트 전용 주소를 공개 설치 링크로 쓰지 않는다.
- 기준: 게임 v2.64.2. 결제·광고·온라인 친구·클라우드 저장이 정식 제공 중이라는 문구는 넣지 않았다.
- 배너·표지: 기존 게임의 `assets/toy-v1/toy-playroom.png`와 `game/public/art/objects-atlas.png`를 웹용으로 배치·내보내기. 별도 콘셉트 시안이나 가상 플레이 화면이 아니다.
- 화면 01: `output/first-play-v2.63/home-ko-390.png` — 한국어 첫 실행 화면.
- 화면 02·03: `store/google-play/screenshots/gameplay.png`, `map.png` — 실제 게임 퍼즐·진행 지도.
- 화면 04: `output/polish-v2.64/toy-complete-ko.png` — 실제 완성 UI. QA 준비 상태에서 조립 버튼으로 도달한 화면이며, 일반 플레이로 61스테이지까지 진행했다는 증거는 아니다.
- 스크린샷은 원래 종횡비와 화면 내용을 유지하고 WebP로만 변환했다.

## 2026-10-18 배너 개편

- `banner-v2.webp`(1920×1080)와 `cover-v2.webp`(1200×800): 기존 놀이방 배너·실제 퍼즐 화면·기존 영어 블록 타이틀을 입력으로 사용해 내장 이미지 생성 모델에서 홍보용 구도로 합성했다.
- 영어 타이틀과 세로형 모바일 패널을 크게 배치했다. 배너는 홍보용 합성 이미지이며 화면 여백·원근 표현은 원본과 차이가 있다. 갤러리의 실제 게임 스크린샷 4장은 유지했다.
- 웹 내보내기에서는 크기·압축만 조정하고, 표지는 전체 구도를 보존하는 여백을 두었다.
- 배너는 화면 전체를 채운다. `bannerFocus`를 오른쪽 보드 쪽으로 두고 `bannerTextPosition: "bottom-left"`로 제목을 왼쪽 아래에 표시한다. 신규 파일명으로 이전 배너 캐시와 구분한다.
- 800px 이하에서 해당 게임 배너 위의 중복 화살표만 숨긴다. 하단 이전·다음 버튼과 스와이프·키보드 이동은 유지하며 다른 게임 배너의 화살표는 변경하지 않는다.

## 2026-10-19 상세 갤러리 확장

기존 4장을 유지하고 21장을 추가해 총 25장으로 구성했다. 튜토리얼·일반 퍼즐·특수 조각·마법 선택·점수 목표·보드 구조와 장애물·클리어 보상·장난감 조립·세트·놀이방·도구/마법/유물 성장·여행 기록·지역 복원·출석·설정·가이드 순서로 배치했다. 엔딩 핵심 장면과 결제·광고 테스트 화면은 넣지 않았다.

새 촬영 17장은 현재 v2.64.2 일반 실행 화면을 브라우저 390×844에서 캡처했다. 별도 촬영 주소에 QA 준비 저장을 불러온 뒤 일반 버튼으로 화면에 진입했다. QA 바·QA 행동 버튼은 없으며, 준비 상태를 정상 플레이로 달성했다는 검증 자료는 아니다. 실제 저장·계정이나 출시 설정은 변경하지 않았다. 07번의 마법 화면은 팽이·도미노를 실제로 교환한 후 마법 버튼으로 열었다.

05·13·14번은 기존 정상 플레이 촬영(v2.63), 22번은 기존 준비 상태의 실제 복원 UI 촬영(v2.64)을 사용했다. 모든 화면은 실제 게임 UI이며 이미지 생성·내용 합성·문구 덧씌우기를 하지 않았다. 웹용 WebP 인코딩만 적용하고 화면 비율을 유지했다.
- `screenshot-05.webp`: `output/first-play-v2.63/tutorial-start.png` — normal-play archive v2.63.
- `screenshot-06.webp`: `output/nahon-gallery-2026-10-19/captures/special-blocks.png` — special-robot, resume.
- `screenshot-07.webp`: `output/nahon-gallery-2026-10-19/captures/in-game-magic.png` — special-robot, real adjacent special swap, magic.
- `screenshot-08.webp`: `output/nahon-gallery-2026-10-19/captures/score-stage.png` — before-10, normal start.
- `screenshot-09.webp`: `output/nahon-gallery-2026-10-19/captures/board-moss.png` — blocks-moss, resume.
- `screenshot-10.webp`: `output/nahon-gallery-2026-10-19/captures/board-seal.png` — blocks-seal, resume.
- `screenshot-11.webp`: `output/nahon-gallery-2026-10-19/captures/board-fog.png` — blocks-fog, resume.
- `screenshot-12.webp`: `output/nahon-gallery-2026-10-19/captures/board-bomb.png` — blocks-bomb, resume.
- `screenshot-13.webp`: `output/first-play-v2.63/first-clear.png` — normal-play archive v2.63.
- `screenshot-14.webp`: `output/first-play-v2.63/first-assembly.png` — normal-play archive v2.63.
- `screenshot-15.webp`: `output/nahon-gallery-2026-10-19/captures/collection-set.png` — collection-8, collection set 1.
- `screenshot-16.webp`: `output/nahon-gallery-2026-10-19/captures/playroom.png` — collection-8, room, run.
- `screenshot-17.webp`: `output/nahon-gallery-2026-10-19/captures/tools.png` — collection-8, workshop tools.
- `screenshot-18.webp`: `output/nahon-gallery-2026-10-19/captures/tool-upgrade.png` — collection-8, clock details.
- `screenshot-19.webp`: `output/nahon-gallery-2026-10-19/captures/spells.png` — collection-8, workshop spells.
- `screenshot-20.webp`: `output/nahon-gallery-2026-10-19/captures/relics.png` — collection-8, workshop relics.
- `screenshot-21.webp`: `output/nahon-gallery-2026-10-19/captures/story-journal.png` — collection-8, journal act 1.
- `screenshot-22.webp`: `output/polish-v2.64/restoration-progress.png` — prepared-state archive v2.64.
- `screenshot-23.webp`: `output/nahon-gallery-2026-10-19/captures/attendance.png` — collection-8, events attendance.
- `screenshot-24.webp`: `output/nahon-gallery-2026-10-19/captures/settings.png` — collection-8, settings.
- `screenshot-25.webp`: `output/nahon-gallery-2026-10-19/captures/guide.png` — collection-8, settings guide.


## 2026-10-22 · v2.66.1 전체 이미지 교체

최신 게임을 새로 촬영한 33장으로 현재 갤러리를 전부 교체했다. 이전 촬영 이미지는 이번 갤러리에서 재사용하지 않았다. 배너(1920×1080)와 표지(1200×800)는 기존 영어 타이틀·놀이방 아트와 새 실제 플레이 스크린샷을 HTML/CSS로 배치해 촬영했다. 게임 보드와 UI를 생성 이미지로 다시 그리지 않았다.

후반 콘텐츠와 수집 화면은 별도의 촬영 전용 로컬 주소에 준비 저장을 불러와 촬영했다. 원정 기록은 실제 엔진의 유효한 행동을 재생해 준비했다. 이는 첫 스테이지부터 해당 상태까지 정상 플레이로 전부 검증했다는 뜻이 아니다. 사용자의 저장·APK·결제·광고 설정은 변경하지 않았다.

- `v2661-01-home.webp` — 한국어 타이틀 · 새로운 홈 화면 / 촬영 준비: `fresh`
- `v2661-02-expedition-play.webp` — 태엽 원정 · 매치로 동력 충전 / 촬영 준비: `exp-ready`
- `v2661-03-expedition-aim.webp` — 태엽 원정 · 장치 범위 미리보기 / 촬영 준비: `exp-ready + UI target selection`
- `v2661-04-expedition-draft.webp` — 구역 완료 · 새 설계도 선택 / 촬영 준비: `exp-ready + UI fire`
- `v2661-05-expedition-route.webp` — 다음 경로 · 부품 창고와 실험실 / 촬영 준비: `exp-ready + UI fire/draft`
- `v2661-06-expedition-loadout.webp` — 설계도 편성 · 장치 순서 변경 / 촬영 준비: `exp-late`
- `v2661-07-expedition-late.webp` — 후반 원정 · 비정형 보드와 장애물 / 촬영 준비: `exp-late`
- `v2661-08-blueprint-library.webp` — 설계도 도감 · 발견과 수집 / 촬영 준비: `exp-late`
- `v2661-09-expedition-lobby.webp` — 원정 안내 · 매치, 연결, 조립 / 촬영 준비: `exp-ready`
- `v2661-10-tutorial.webp` — 첫 교환 · 튜토리얼 / 촬영 준비: `fresh + UI start`
- `v2661-11-campaign.webp` — 캠페인 · 사물 수집 퍼즐 / 촬영 준비: `fresh + UI first swap`
- `v2661-12-special-blocks.webp` — 특수 장난감 · 팽이와 도미노 / 촬영 준비: `special-robot`
- `v2661-13-magic.webp` — 플레이 중 마법 · 효과와 마력 / 촬영 준비: `special-robot`
- `v2661-14-boss-crates.webp` — 보스 목표 · 나무 상자 / 촬영 준비: `before-10 + UI start`
- `v2661-15-obstacle-moss.webp` — 이끼 장애물 · 계단형 보드 / 촬영 준비: `blocks-moss`
- `v2661-16-obstacle-seal.webp` — 색 봉인 · 세로형 보드 / 촬영 준비: `blocks-seal`
- `v2661-17-obstacle-fog.webp` — 먼지 덮개 · 복합 장애물 / 촬영 준비: `blocks-fog`
- `v2661-18-obstacle-bomb.webp` — 시한폭탄 · 분기형 보드 / 촬영 준비: `blocks-bomb`
- `v2661-19-map.webp` — 진행 지도 · 다음 스테이지 / 촬영 준비: `collection-8`
- `v2661-20-collection.webp` — 장난감 수집 · 단계별 조립 / 촬영 준비: `collection-8`
- `v2661-21-toy-complete.webp` — 장난감 완성 · 능력 해금 / 촬영 준비: `story-set-ready + UI build`
- `v2661-22-collection-set.webp` — 수집 세트 · 세 장난감 완성 / 촬영 준비: `story-set-ready + UI build`
- `v2661-23-playroom.webp` — 놀이방 · 장난감 전시 / 촬영 준비: `collection-8`
- `v2661-24-tools.webp` — 도구 장착 · 여섯 가지 도구 / 촬영 준비: `collection-8`
- `v2661-25-upgrade.webp` — 도구 강화 · 효과와 비용 / 촬영 준비: `collection-8`
- `v2661-26-spells.webp` — 마법 성장 · 장착과 해금 / 촬영 준비: `collection-8`
- `v2661-27-relics.webp` — 유물 수집 · 장착 효과 / 촬영 준비: `collection-8`
- `v2661-28-story.webp` — 여행 기록 · 완료한 첫 장 / 촬영 준비: `collection-8`
- `v2661-29-restoration.webp` — 지역 복원 · 장난감 기차역 / 촬영 준비: `collection-8`
- `v2661-30-attendance.webp` — 출석 · 일일·주간 목표 / 촬영 준비: `story-set-ready`
- `v2661-31-prologue.webp` — 프롤로그 · 멈춘 놀이방 / 촬영 준비: `collection-8 + UI replay`
- `v2661-32-settings.webp` — 옵션 · 언어, 사운드, 연출 / 촬영 준비: `collection-8`
- `v2661-33-guide.webp` — 플레이 가이드 · 조작과 기능 / 촬영 준비: `collection-8`
