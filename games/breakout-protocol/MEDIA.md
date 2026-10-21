# Breakout Protocol · 웹 갤러리 자료

2026-10-18 등록. 실제 게임 자료이며 `demo`는 `false`입니다.

- 배너: 인물과 로고가 있는 대표 키 아트(`cover.webp`)를 사용하며 화면 전체를 채웁니다. `bannerFocus`로 중심을 조절하고 제목은 `bannerTextPosition: "bottom-right"`로 오른쪽 아래에 표시합니다. 기존 `banner.webp`는 글자 없는 320×200 픽셀 배경을 정수 6배 확대 후 1920×1080으로 자른 보관 자료입니다.
- 표지: 기존 1280×800 타이틀 키 아트의 양옆을 잘라 1200×800으로 내보냈습니다.
- 최초 스크린샷 6장(2026-10-18): 현재 개발 소스를 Godot 4.5.2에서 실행해 원래 화면 비율 1280×800으로 촬영했습니다. 이전에 실제 진행한 QA 체크포인트를 복구했고 아이템이나 퀘스트 상태는 추가하지 않았습니다.
- WebP는 무손실 변환입니다. 원본 시트·작업 파일·빌드 파일은 사이트에 포함하지 않습니다.
- 개발 화면은 기존 0.47.0 배포 ZIP 및 STOVE 제출 빌드와 차이가 있을 수 있습니다.
- STOVE URL은 공개 상품페이지의 게임명과 일치함을 확인했습니다. Steam 상품 및 YouTube 영상 URL은 확인된 주소가 없어 비워 두었습니다.
- 다국어는 구현된 언어를 기재하되 한국어 외 언어는 번역 검수 중임을 표시했습니다.

| 웹 이미지 | 체크포인트 |
| --- | --- |
| screenshot-01-prison.webp | `qa/v46/mara-chapter-2.json` |
| screenshot-02-inventory.webp | `qa/v46/mara-complete-story.json` |
| screenshot-03-deduction.webp | `qa/v46/mara-deduction-0.json` |
| screenshot-04-records.webp | `qa/stove-20261012/earned/isol-memory-copy-light.json` |
| screenshot-05-research.webp | `qa/v46/nim-chapter-2.json` |
| screenshot-06-airport.webp | `qa/stove-20261012/earned/outer-area-1.json` |

## 2026-10-19 · 상황과 UI 추가

기존 6장을 유지하고 8장을 더해 총 14장으로 구성했습니다. 탐색 → 대화 → 소지품 → 추리 → 면회 → 일과 → 지도 → 계획 → 기록 시설 → 이송역 → 연구시설 → 공항 → 잠수정 → 컬렉션 순서입니다. 기존 대표 이미지 설정과 소개·링크·출시 상태는 변경하지 않았습니다.

현재 Godot 4.5.2 개발 소스에서 1280×800으로 촬영해 WebP로 무손실 변환했습니다. 일반 화면은 기존 실제 진행 체크포인트를 복구했습니다. 컬렉션은 마라의 실제 완주 기록과 이보·님의 실제 중간 기록을 메모리에서 집계했으며 사용자 저장에 기록하지 않았습니다. 면회 장면은 현재 작성된 연출을 엔진에서 직접 열어 촬영한 개발 연출 화면입니다. 아이템·퀘스트 완료 상태를 수동으로 부여하지 않았고 엔딩 화면은 추가하지 않았습니다.

| 추가 이미지 | 촬영 출처 |
| --- | --- |
| screenshot-07-dialogue.webp | `qa/stove-20261012/earned/view-friend.json` |
| screenshot-08-schedule.webp | `qa/v46/mara-chapter-2.json` |
| screenshot-09-map.webp | `qa/v46/mara-chapter-2.json` |
| screenshot-10-escape-plan.webp | `qa/stove-20261012/earned/mara-sewer-action-5-open.json` |
| screenshot-11-collection.webp | `qa/stove-20261012/earned/mara-sewer-action-12-route_escape.json` |
| screenshot-12-visitation.webp | `qa/stove-20261012/earned/view-friend.json` · 면회 연출 직접 열기 |
| screenshot-13-railway.webp | `qa/stove-20261012/earned/yujin-freight-train-ready.json` |
| screenshot-14-submarine.webp | `qa/stove-20261012/earned/outer-ready-2.json` |
