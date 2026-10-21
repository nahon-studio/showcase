# 게임 이용등급 등록

게임 프로젝트의 `games/<게임ID>/game.json`에 실제 통지받은 등급만 추가합니다. 아래는 **12세 이용가 자체등급분류 결과가 있는 게임**의 예시입니다.

```json
"ageRating": {
  "system": "KR",
  "rating": "12",
  "method": "self"
}
```

- 현재 지원 값: `"all"`(전체이용가), `"12"`(12세 이용가), `"15"`(15세 이용가). 반드시 문자열로 입력합니다.
- `method`: 자체등급분류사업자의 결과는 `self`, 등급분류기관 심의 결과는 `committee`.
- 통지서에 있는 경우 `authority`(기관·사업자), `classificationNumber`(분류번호), `classifiedAt`(분류일)를 문자열로 추가할 수 있습니다.
- `contentDescriptors`에는 통지서의 내용정보를 문자열 배열로 입력합니다. 지원 항목: 선정성, 폭력성, 공포, 언어의 부적절성, 약물, 범죄, 사행성. 예: `["폭력성", "공포"]`. 통지서에서 해당 없음이 확인된 경우만 `[]`로 입력합니다. 모르면 필드 자체를 생략합니다.
- 등급이 확인되지 않은 게임은 `ageRating`을 생략합니다. 임의로 전체이용가를 입력하거나 다른 게임의 결과를 복사하지 않습니다.
- 등록하면 배너 오른쪽 위의 공식 도안과 상세 페이지의 등급분류표가 함께 표시됩니다. `python3 scripts/validate_content.py`로 검사한 뒤 게시하세요.

## 현재 등록 근거

아래는 2026-10-21 사이트 운영자가 전달한 자체등급분류 결과입니다. 분류사업자·분류번호·분류일·내용정보는 전달되지 않아 입력하지 않았습니다. 이 날짜는 등급분류일이 아닙니다.

| 게임 ID | 등급 |
| --- | --- |
| `outlaw-isles-rogue-tides` | 12세 이용가 |
| `sword-and-backpack` | 12세 이용가 |
| `unlisted-patient` | 15세 이용가 |
| `my-ai-empire` | 전체이용가 |
| `breakout-protocol` | 15세 이용가 |
| `apricot-and-acorn` | 12세 이용가 |

## 공식 도안과 서비스별 처리

국내 도안은 [GCRB 공식 배포본](https://www.gcrb.or.kr/Institution/EtcForm01.aspx)을 사용합니다. 원본 출처는 [assets/ratings/README.md](../assets/ratings/README.md)에 기록되어 있습니다. 웹사이트의 표시는 게임 실행 화면·포장·내용정보 등 다른 표시 의무를 대신하지 않습니다. 실제 배포 형태와 자체등급분류 적용 여부에 따라 [게임산업진흥에 관한 법률 시행령 제19조](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lspttninfSeq=186075) 및 [별표 3](https://www.law.go.kr/LSW/flDownload.do?bylClsCd=110201&flSeq=156672039)을 확인하세요.

Steam에서는 앱별 [콘텐츠 설문(Content Survey)](https://partner.steamgames.com/doc/gettingstarted/contentsurvey?l=english)을 작성하고, 실제 심의 결과가 있으면 Ratings 항목에 입력합니다. Steam은 설문을 바탕으로 여러 지역의 등급을 생성해 서비스에 표시합니다. [독일](https://partner.steamgames.com/doc/gettingstarted/contentsurvey/germany)은 USK 심의 등급 또는 Steam 설문 기반 등급을, [인도네시아](https://partner.steamgames.com/doc/gettingstarted/contentsurvey/indonesia)는 IGRS 심의 등급 또는 Steam 설문 기반 등급을 안내합니다.

한국의 12세·15세를 ESRB·PEGI·USK 등으로 환산하거나, 발급되지 않은 해외 등급 로고를 붙이지 않습니다. 이 사이트는 현재 한국 등급만 지원합니다. 해외 등급이 발급되면 해당 게임·버전·지역의 결과와 공식 도안 사용 지침을 확인한 뒤 별도 필드와 표시를 추가하세요. 앱 마켓이나 Roblox의 연령·콘텐츠 표시도 해당 서비스에서 확정된 결과를 사용해야 합니다.
