# Blockly &mdash; Java (for Plocky)

[![CodeFactor](https://www.codefactor.io/repository/github/kimminkyuol/blockly/badge)](https://www.codefactor.io/repository/github/kimminkyuol/blockly)

Google Blockly 포크 프로젝트 — **Minecraft Paper API** 플러그인 개발을 위한 본소적 Java 코드 생성 확장.

[**Plocky**](https://github.com/kimminkyuol/plocky) 프로젝트에서 사용될 목적으로 만들어졌습니다.

---

## 주요 수정 사항

| 영역 | 세부 내용 |
|------|--------|
| **코드 생성기** | Java 생성기 (`generators/java.js`) — Minecraft Paper API 전용 |
| **카테고리 별 블록** | Event, Command, Executor, Player, Location |
| **플레이그라운드** | `demos/plocky/` — 사용자 인터페이스 데모 |

---

## 플레이그라운드 실행

```bash
npm install
npm start
# 브라우저에서 http://localhost:8080/demos/plocky/ 접속
```

또는 `demos/plocky/index.html` 파일을 브라우저로 직접 여는 것도 가능합니다 (일부 Blockly 기능이 제한될 수 있음).

---

## Blockly 빌드

```bash
npm run build
```

빌드 결과물 (`blockly_compressed.js`, `blocks_compressed.js`, `java_compressed.js`) 은 Plocky 프로젝트의 `src/plocky/` 디렉토리에 직접 복사하여 사용합니다.

---

## 커스텀 블록 목록

| 커스텀 블록 파일 | 설명 |
|---|---|
| `blocks/event.js` | 이벤트 리스너 블록 (PlayerInteractEvent, InventoryEvent ...) |
| `blocks/command.js` | 커맨드 핸들러 블록 |
| `blocks/executor.js` | 플레이어에게 메시지 보내기, 텔레포트, 아이템 지급 등 |
| `blocks/player.js` | 플레이어 데이터 가져오기 |
| `blocks/location.js` | 좌표 블록 |
| `generators/java.js` | Java 코드 생성기 코어 |
| `generators/java/` | 카테고리별 Java 코드 생성 구현 |

---

## 원본 프로젝트

- [google/blockly](https://github.com/google/blockly) — Apache 2.0 License
- [kimminkyuol/plocky](https://github.com/kimminkyuol/plocky) — 이 라이브러리를 사용하는 메인 앱
