window.PROJECT_DEMOS = window.PROJECT_DEMOS || [];

window.PROJECT_DEMOS.push(
  {
    id: "ontology-construction",
    code: "AI01",
    group: "ai",
    templateName: "개인 제품·지식검색형",
    title: "제조 지식 검색 LLM WIKI",
    fullTitle: "제조 지식 검색 LLM WIKI",
    stage: "LOCAL PROTOTYPE",
    stageTone: "pilot",
    category: "Knowledge Graph·RAG",
    period: "개인 프로젝트 · 공개 Snapshot 기준",
    context: "제조지식 원장·그래프·검색·초안생성",
    lead: "흩어진 제조문서를 공통 관계로 연결하고, 질문과 관련된 근거를 찾아 엔지니어 검토용 초안을 만드는 로컬 검색구조를 구현했습니다.",
    summary: {
      problem: "공정·설비·품질 지식이 문서와 프로젝트별로 나뉘어 있어 같은 관계를 반복해서 찾고 다시 정리해야 했습니다.",
      role: "Markdown·YAML 지식원장, Graphfy 관계그래프, 증분 RAG와 검색·재정렬, 로컬 모델 초안과 검토 Gate를 직접 구성했습니다.",
      outcome: "분리돼 있던 지식관계를 연결 그래프로 바꾸고, 검색근거를 붙인 제조 검토 초안 3건을 로컬에서 생성·확인했습니다."
    },
    metrics: [
      ["연결구조", "문서 → 그래프 → 검색"],
      ["검증 초안", "3건"],
      ["실행범위", "Local CUDA"]
    ],
    limitation: "로컬 Snapshot에서 확인한 프로토타입입니다. 생성문은 엔지니어 검토 전 자동 승인되지 않으며, 운영 Graph DB나 전사 배포를 뜻하지 않습니다.",
    asset: {
      src: "./assets/heungtology-graphfy-connected.webp",
      alt: "분리된 제조지식 노드가 공통 관계로 연결된 Graphfy 그래프 화면",
      caption: "문서 목록을 공정·설비·품질 관계로 연결한 그래프"
    },
    sections: [
      {
        kind: "flow",
        title: "문서가 답변으로 이어지는 흐름",
        intro: "원문을 바로 모델에 넣지 않고, 지식원장과 관계·검색근거를 거쳐 검토 가능한 초안으로 바꿉니다.",
        items: [
          ["01", "지식 등록", "Markdown·YAML에 출처와 상태 기록"],
          ["02", "관계 연결", "공정·설비·품질·문서 관계 생성"],
          ["03", "증분 색인", "변경된 자료만 분할·Embedding"],
          ["04", "질문 검색", "BGE·Chroma로 관련 근거 회수"],
          ["05", "재정렬", "질문과 근거의 관련도를 다시 비교"],
          ["06", "초안·검토", "로컬 모델 초안 후 엔지니어 Gate"]
        ]
      },
      {
        kind: "architecture",
        title: "지식·검색·생성 구조",
        intro: "사실을 소유하는 원장과 빠르게 찾는 색인, 문장을 만드는 모델의 책임을 분리했습니다.",
        items: [
          ["SOURCE", "Markdown·YAML", "지식내용·출처·상태의 기준"],
          ["RELATION", "Graphfy", "공정·설비·문서 관계 탐색"],
          ["INDEX", "BGE·Chroma", "질문과 가까운 근거 검색"],
          ["RERANK", "근거 재정렬", "후보의 관련도와 우선순위 조정"],
          ["DRAFT", "Gemma 12B", "근거 기반 초안을 만들고 검토 대기"]
        ]
      },
      {
        kind: "split",
        title: "왜 그래프와 RAG를 함께 사용했는가",
        intro: "문장 유사도 검색만으로는 공정 전후관계와 문서 적용범위를 놓칠 수 있어 두 구조를 나눴습니다.",
        panels: [
          ["Graph가 답하는 것", ["어떤 설비와 공정이 연결되는가", "표준·시험·결과가 어떤 관계인가", "한 변경이 어디까지 영향을 주는가"]],
          ["RAG가 답하는 것", ["질문과 가까운 원문은 무엇인가", "답변에 붙일 직접 근거는 무엇인가", "초안에 사용할 문맥의 범위는 어디까지인가"]]
        ]
      },
      {
        kind: "evidence",
        title: "검색 파이프라인과 확인결과",
        intro: "공개 저장소의 구성도와 로컬 실행결과에서 확인 가능한 범위만 사용했습니다.",
        assets: [
          {
            src: "./assets/heungtology-rag-pipeline.svg",
            alt: "제조문서를 증분 색인하고 검색, 재정렬, 로컬 모델 초안으로 연결하는 RAG 파이프라인",
            caption: "원문 보존·증분 색인·근거회수·초안생성을 분리한 흐름"
          },
          {
            src: "./assets/heungtology-graphfy-connected.webp",
            alt: "공정, 설비, 품질 지식이 공통 관계로 연결된 Graphfy 화면",
            caption: "분리된 지식을 공통 제조관계로 연결한 그래프"
          }
        ]
      },
      {
        kind: "outputs",
        title: "결과물",
        intro: "검색시스템이 실제로 소유하는 데이터와 검토 산출물을 구분했습니다.",
        items: [
          ["제조지식 원장", "Markdown·YAML 기반 내용·출처·상태 기록"],
          ["관계 그래프", "공정·설비·품질·문서 연결구조"],
          ["증분 RAG", "변경된 자료만 색인하고 근거를 검색·재정렬"],
          ["검토 초안", "LFP 분석 1건과 SIB 사양 초안 2건"]
        ]
      },
      {
        kind: "gates",
        title: "다음 적용 Gate",
        intro: "로컬 검색이 운영 의사결정으로 넘어가기 전에 필요한 조건입니다.",
        items: [
          ["근거", "답변 주장마다 원문과 상태를 추적할 수 있는가", "필수"],
          ["검토", "엔지니어가 근거와 초안을 함께 확인했는가", "필수"],
          ["승인", "승인 전 초안이 운영문서로 사용되지 않는가", "필수"],
          ["운영", "업데이트·권한·실패복구가 검증됐는가", "후속"]
        ]
      }
    ]
  },
  {
    id: "ai-authority-evidence-plane",
    code: "AI02",
    group: "ai",
    templateName: "개인 제품·실행안전형",
    title: "AX 전환 AI Agent 플랫폼",
    fullTitle: "AX 전환 AI Agent 플랫폼",
    stage: "LOCAL FOUNDATION",
    stageTone: "pilot",
    category: "Manufacturing Agent",
    period: "2026.08 Snapshot",
    context: "근거·권한·승인·중단조건을 분리한 로컬 Foundation",
    lead: "MES·PLC·품질·표준정보를 한 화면에 모으는 데서 끝내지 않고, 근거와 권한을 확인한 뒤 사람 승인으로 실행을 통제하는 구조를 설계했습니다.",
    summary: {
      problem: "제조 의사결정마다 시간·Lot·Tag·품질기준을 다시 맞춰야 하고, 분석결과가 어떤 근거와 권한으로 실행되는지 추적하기 어려웠습니다.",
      role: "제품정의, 데이터·연결 아키텍처, 공정·품질·생산 분석, 제어·분석 분리와 승인·Readback·복구 Gate를 직접 설계했습니다.",
      outcome: "문서작성 기능과 Validator, 구현단위·검증 Binding을 로컬 Foundation으로 구성하고 운영 Runtime 전환에 필요한 Gate를 분리했습니다."
    },
    metrics: [
      ["문서기능", "4개 + Validator"],
      ["구현설계", "13영역 · 111단위"],
      ["검증연결", "1,837 Binding · 47 Check"]
    ],
    limitation: "현재 확인범위는 로컬 Foundation입니다. 지속 Runtime, 승인 UI, PLC·MES Adapter와 실공장 Readback은 다음 구현·검증 단계입니다.",
    asset: {
      src: "./assets/agent-os-evidence-workflow.svg",
      alt: "제조 요청을 근거 확인, 분석, 권한 검토, 사람 승인, 제한 실행과 결과 Readback으로 연결한 흐름",
      caption: "분석결과가 바로 실행되지 않도록 근거·권한·승인을 사이에 둔 흐름"
    },
    sections: [
      {
        kind: "flow",
        title: "요청이 실행안으로 바뀌는 흐름",
        intro: "AI의 문장 생성보다, 어떤 근거와 권한으로 어디까지 실행할 수 있는지를 먼저 판정합니다.",
        items: [
          ["01", "업무요청", "문제·대상·시간·Lot·완료조건 확인"],
          ["02", "근거조회", "표준·품질·설비·생산 Source 연결"],
          ["03", "분석", "공정·품질·생산 관점의 후보 도출"],
          ["04", "권한판정", "읽기·제안·승인·실행 범위 구분"],
          ["05", "사람 승인", "근거·영향·중단조건 검토"],
          ["06", "실행·Readback", "제한 실행 후 실제 결과 재확인"]
        ]
      },
      {
        kind: "architecture",
        title: "데이터·분석·실행의 책임 구조",
        intro: "현장 데이터, 판단로직, 실행권한과 감사근거를 서로 다른 층으로 분리했습니다.",
        items: [
          ["SOURCE", "MES·PLC·품질·표준", "시간·Lot·Tag·기준 데이터"],
          ["CONTEXT", "Ontology·Wiki", "공정관계와 적용범위 해석"],
          ["ANALYZE", "제조 분석", "이상·원인후보·대응안 생성"],
          ["AUTHORITY", "권한·승인", "실행주체·범위·중단조건 확인"],
          ["EVIDENCE", "Readback·Audit", "실제 결과와 근거를 다시 연결"]
        ]
      },
      {
        kind: "split",
        title: "왜 분석과 실행을 분리했는가",
        intro: "좋은 분석도 승인과 현장 Readback이 없으면 안전한 실행이 아닙니다.",
        panels: [
          ["분석 Plane", ["여러 Source의 시간·Lot·Tag를 맞춤", "가능한 원인과 대응안을 비교", "근거와 불확실성을 함께 표시"]],
          ["권한·실행 Plane", ["사람 승인 전 제안상태 유지", "허용된 Adapter와 범위만 실행", "결과를 authoritative Source에서 Readback"]]
        ]
      },
      {
        kind: "ownership",
        title: "직접 설계한 범위",
        intro: "완료된 로컬 Foundation과 운영 전환에 남은 범위를 분리했습니다.",
        columns: [
          ["PRODUCT", "제조 문제를 공정·품질·생산 관점으로 해석하고 문서·분석·실행안으로 연결하는 제품범위를 정의했습니다."],
          ["FOUNDATION", "데이터 계약, 지식구조, Validator, 권한·승인·중단조건과 검증 Binding을 구성했습니다."],
          ["NEXT RUNTIME", "지속 실행환경, 승인 UI, 현장 Adapter, 실제 Readback과 복구훈련은 다음 단계로 분리했습니다."]
        ]
      },
      {
        kind: "evidence",
        title: "근거·권한·실행 흐름",
        intro: "로컬 설계·검증에서 확인된 구성과 다음 Runtime Gate를 한 도면으로 표시합니다.",
        assets: [
          {
            src: "./assets/agent-os-evidence-workflow.svg",
            alt: "제조 요청이 근거조회, 분석, 승인, 제한실행, 결과 Readback으로 이어지는 시스템 흐름",
            caption: "근거 없는 실행과 승인 없는 자동화를 막는 기본 구조"
          }
        ]
      },
      {
        kind: "outputs",
        title: "결과물",
        intro: "운영 플랫폼이라는 표현 대신, 현재 로컬에서 확인한 Foundation 산출물만 표시합니다.",
        items: [
          ["문서작성 기능", "제조 보고서·포트폴리오·표준서·AX 표준서 4개 Route"],
          ["Validator", "구조·필수항목·금지표현과 출력계약 검사"],
          ["구현설계", "13개 영역과 111개 구현단위의 책임·입출력 정의"],
          ["검증 Binding", "1,837개 연결과 Node.js 24 기반 47개 점검"]
        ]
      },
      {
        kind: "gates",
        title: "운영 전환 Gate",
        intro: "로컬 Foundation이 실제 제조 Runtime으로 넘어가기 전에 닫아야 할 조건입니다.",
        items: [
          ["Identity", "누가 어떤 권한으로 요청·승인·실행했는가", "미검증"],
          ["Adapter", "PLC·MES 연결이 허용범위와 실패모드를 지키는가", "미구현"],
          ["Readback", "실행 결과를 실제 시스템에서 다시 확인하는가", "미검증"],
          ["Recovery", "중단·Rollback·재시도 조건이 현장에서 재현되는가", "미검증"]
        ]
      }
    ]
  }
);
