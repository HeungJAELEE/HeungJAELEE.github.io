window.PROJECT_DEMOS = window.PROJECT_DEMOS || [];

window.PROJECT_DEMOS.push(
  {
    id: "welding-vision-ai",
    code: "DX01",
    group: "dx",
    templateName: "팀 PoC·AI 평가형",
    title: "용접 Vision AI 판정기준",
    fullTitle: "용접 실기품 Vision AI 판정기준 설계",
    stage: "EDUCATION PoC",
    stageTone: "pilot",
    category: "제조 Vision AI",
    period: "팀 교육 프로젝트",
    context: "현장 촬영조건 차이와 미검출 위험을 반영한 모델 평가",
    lead: "정확도 한 개를 높이는 대신, 현장 이미지에서 놓치면 안 되는 불량과 재검토 대상을 구분하는 판정기준을 설계했습니다.",
    summary: {
      problem: "학습 이미지와 실제 촬영 이미지의 조명·배경·거리 차이 때문에, 보고서상 성능만으로 현장 판정 가능성을 설명하기 어려웠습니다.",
      role: "프로젝트 기획, AI 모델링, 현장성 Sample 평가와 Threshold별 미검출·과검출 기준 수립을 담당했습니다.",
      outcome: "팀은 FastAPI와 PWA 시연 흐름을 연결했고, 저는 제한된 평가셋에서 Recall과 FPR을 함께 비교해 현장형 판정기준을 정리했습니다."
    },
    metrics: [
      ["현장성 Sample Recall", "15.84% → 85.15%"],
      ["Threshold 0.40", "FN 0 · Recall 100%"],
      ["재검토 부담", "FPR 16.30%"]
    ],
    limitation: "수치는 보고서의 제한된 평가셋 결과입니다. 독립 생산 Test나 양산 배포 결과가 아니며, 미검출 0을 현장 전체의 무결점 성능으로 확대하지 않습니다.",
    asset: {
      src: "./assets/welding-vision-domain-gap.jpg",
      alt: "학습 이미지와 현장 촬영 이미지의 조명, 배경, 거리 차이를 비교한 자료",
      caption: "모델 점수보다 먼저 확인한 학습환경과 현장환경의 차이"
    },
    sections: [
      {
        kind: "flow",
        title: "팀 프로젝트 전체 흐름",
        intro: "현장 촬영조건을 재현하고, 모델 비교부터 판정 API와 사용자 화면까지 하나의 시연 흐름으로 연결했습니다.",
        items: [
          ["01", "문제 정의", "학습환경과 현장 촬영조건의 차이 확인"],
          ["02", "데이터 구성", "현장성 Sample과 증강조건 분리"],
          ["03", "모델 비교", "검출 성능과 오검출 양상 비교"],
          ["04", "판정기준", "Threshold별 FN·Recall·FPR 확인"],
          ["05", "API 연결", "FastAPI /predict로 추론 결과 전달"],
          ["06", "PWA 시연", "촬영·판정·결과 확인 흐름 통합"]
        ]
      },
      {
        kind: "ownership",
        title: "팀 역할과 내 책임 경계",
        intro: "팀 성과와 개인 기여를 나누고, 제가 왜 AI 평가기준을 맡았는지 함께 설명합니다.",
        columns: [
          ["TEAM OBJECTIVE", "용접 실기품을 촬영하고 AI 판정 결과를 웹에서 확인할 수 있는 교육용 PoC를 완성했습니다."],
          ["MY RESPONSIBILITY", "전체 기획, 모델링, 현장성 Sample 평가, Threshold 비교와 미검출 기준 수립을 맡았습니다."],
          ["TEAM INTERFACE", "팀원이 구현한 FastAPI·PWA와 모델 출력 형식을 맞추고, 사용자가 재검토해야 할 판정정보를 전달했습니다."]
        ]
      },
      {
        kind: "architecture",
        title: "데이터와 판정이 연결되는 구조",
        intro: "입력 이미지가 모델 점수로 끝나지 않고, API와 사용자 재검토 흐름까지 이어지도록 구성했습니다.",
        items: [
          ["INPUT", "현장성 이미지", "조명·배경·거리 차이가 포함된 Sample"],
          ["MODEL", "검출 모델", "객체 위치와 Confidence 산출"],
          ["DECISION", "판정기준", "Threshold별 미검출과 과검출 균형 확인"],
          ["API", "FastAPI", "예측결과를 구조화해 화면에 전달"],
          ["USER", "PWA", "촬영결과와 재검토 대상을 확인"]
        ]
      },
      {
        kind: "split",
        title: "왜 Recall만 높이지 않았는가",
        intro: "제조검사는 불량을 놓치지 않는 것과 정상품을 과도하게 막지 않는 것을 함께 봐야 합니다.",
        panels: [
          ["놓치면 안 되는 위험", ["FN과 Recall로 미검출 위험 확인", "현장성 Sample에서 성능 하락 여부 확인", "불확실한 결과는 사용자 재검토 대상으로 유지"]],
          ["함께 관리한 부담", ["FPR로 정상품 과검출 부담 확인", "Threshold를 낮출 때 늘어나는 재검토량 확인", "PoC 결과와 생산 적용 Gate를 분리"]]
        ]
      },
      {
        kind: "evidence",
        title: "직접 확인한 결과",
        intro: "발표자료에 남은 평가결과와 팀 통합화면을 기준으로 확인 범위를 구분했습니다.",
        assets: [
          {
            src: "./assets/welding-vision-app-results.webp",
            alt: "용접 Vision AI 모델 평가와 PWA 판정 결과 화면",
            caption: "모델 평가결과와 FastAPI·PWA 시연 화면"
          }
        ]
      },
      {
        kind: "outputs",
        title: "결과물",
        intro: "팀 결과와 제가 직접 만든 판단기준을 분리해 표시합니다.",
        items: [
          ["AI 모델 평가표", "현장성 Sample과 Threshold별 FN·Recall·FPR 비교"],
          ["판정기준", "미검출 우선 조건과 재검토가 필요한 과검출 범위"],
          ["FastAPI 연동", "모델 추론결과를 PWA에 전달하는 팀 시연 흐름"],
          ["발표자료", "문제·실험·결과·적용한계를 정리한 팀 보고자료"]
        ]
      }
    ]
  },
  {
    id: "giga-press-dx",
    code: "DX02",
    group: "dx",
    templateName: "팀 PoC·가상공장형",
    title: "GIGA Press 가상공장 확장",
    fullTitle: "GIGA Press 가상공장 확장 시나리오",
    stage: "EDUCATION PoC",
    stageTone: "pilot",
    category: "Digital Twin",
    period: "2026 · 약 2주",
    context: "10인 교육 팀 프로젝트",
    lead: "가상설비의 신호를 PLC·OPC UA·SCADA·이력데이터로 연결하고, 공장 확장 전에 생산흐름과 병목을 검토하는 시나리오를 만들었습니다.",
    summary: {
      problem: "설비동작, 제어신호, 모니터링 화면과 생산이력이 분리돼 있어 확장 시나리오를 같은 데이터로 검토하기 어려웠습니다.",
      role: "프로젝트 기획과 보고서 작성, OPC UA·데이터 수집 구간, 생산지표 정의와 Digital Twin 데이터–분석모델 연결구조를 담당했습니다.",
      outcome: "팀은 Factory I/O부터 PLC·SCADA·SQLite까지 정상 통신을 확인했고, 공정 흐름에서 T자 분기구간의 약 1초 정체를 병목 후보로 정리했습니다."
    },
    metrics: [
      ["팀 구성", "10명"],
      ["프로젝트", "약 2주"],
      ["병목 후보", "T자 분기 약 1초"]
    ],
    limitation: "교육용 가상환경의 시연결과입니다. 실제 공장 Layout 비교, 고장·복구시간, AI 폐루프 제어와 실공장 생산성 효과는 확인하지 않았습니다.",
    asset: {
      src: "./assets/giga-press-team-demo.jpg",
      alt: "Factory I/O, PLC, SCADA와 데이터 분석 화면으로 구성된 팀 프로젝트 시연",
      caption: "가상설비부터 제어·모니터링·이력데이터까지 연결한 팀 시연"
    },
    sections: [
      {
        kind: "flow",
        title: "팀 프로젝트 전체 흐름",
        intro: "가상공장을 먼저 동작시키고, 같은 Tag를 제어·모니터링·이력분석이 공유하도록 연결했습니다.",
        items: [
          ["01", "가상공정 구성", "Factory I/O로 설비·물류 흐름 표현"],
          ["02", "PLC 제어", "Ladder와 공정 Sequence 연결"],
          ["03", "OPC 연결", "Tag와 상태값을 상위 시스템에 전달"],
          ["04", "SCADA 감시", "설비상태와 생산흐름 모니터링"],
          ["05", "이력 저장", "SQLite에 생산·상태데이터 축적"],
          ["06", "확장 검토", "Cycle·Buffer·가동률과 병목 후보 확인"]
        ]
      },
      {
        kind: "ownership",
        title: "팀 역할과 내 책임 경계",
        intro: "팀 전체 목적을 먼저 보여주고, 제가 맡은 연결 구간과 판단을 따로 설명합니다.",
        columns: [
          ["TEAM OBJECTIVE", "가상설비·PLC·SCADA·데이터 저장을 연결해 공장 확장 전 생산흐름을 검토하는 교육용 PoC를 만들었습니다."],
          ["MY RESPONSIBILITY", "프로젝트 기획, OPC UA·수집구간, Tag·상태 의미, 생산지표와 분석모델 연결구조, 최종 보고서를 맡았습니다."],
          ["TEAM INTERFACE", "팀원이 만든 Ladder·Factory I/O·SCADA가 같은 공정상태를 공유하도록 입출력과 검증순서를 맞췄습니다."]
        ]
      },
      {
        kind: "architecture",
        title: "설비신호와 분석이 연결되는 구조",
        intro: "제어경로와 분석경로를 분리해, 분석결과가 검증 없이 설비를 직접 움직이지 않도록 구성했습니다.",
        items: [
          ["TWIN", "Factory I/O", "가상설비와 물류동작 생성"],
          ["CONTROL", "PLC", "Sequence·Interlock·상태 제어"],
          ["CONNECT", "OPC UA", "Tag와 상태데이터 전달"],
          ["OBSERVE", "SCADA·SQLite", "감시화면과 생산이력 저장"],
          ["ADVISE", "분석모델", "확장 시나리오 후보를 계산해 검토자에게 제시"]
        ]
      },
      {
        kind: "split",
        title: "왜 제어와 분석을 분리했는가",
        intro: "교육 PoC라도 설비 제어권과 분석 권고를 구분해야 결과의 책임이 분명해집니다.",
        panels: [
          ["실시간 제어경로", ["PLC가 Sequence와 Interlock을 유지", "SCADA는 상태를 감시", "기본 동작은 분석모델 없이도 유지"]],
          ["분석·검토경로", ["SQLite 이력으로 Cycle·Buffer·가동률 확인", "분석결과는 확장 후보로 제시", "엔지니어 검토 후 다음 시험조건 결정"]]
        ]
      },
      {
        kind: "evidence",
        title: "구성도와 직접 확인한 결과",
        intro: "팀 발표자료의 통신 구성과 시연화면을 기준으로 실제 연결범위를 표시했습니다.",
        assets: [
          {
            src: "./assets/giga-press-report-process-flow.svg",
            alt: "Factory I/O, PLC, OPC UA, SCADA, SQLite와 분석 흐름을 연결한 구성도",
            caption: "제어경로와 분석·검토경로를 구분한 데이터 흐름"
          }
        ]
      },
      {
        kind: "outputs",
        title: "결과물",
        intro: "팀 통합결과와 제가 담당한 기획·연동 산출물을 구분했습니다.",
        items: [
          ["가상공장 시연", "Factory I/O·PLC·OPC UA·SCADA 정상 통신"],
          ["데이터 구조", "Tag·설비상태·생산지표와 SQLite 이력 연결"],
          ["확장 검토안", "Cycle Time·이송·Buffer·가동률 기반 병목 후보"],
          ["최종 보고서", "팀 역할·구성·검증결과·미반영 범위를 정리"]
        ]
      }
    ]
  },
  {
    id: "robot-json-omniverse",
    code: "DX03",
    group: "dx",
    templateName: "팀 프로젝트·로봇 연동형",
    title: "Indy7 Digital Twin",
    fullTitle: "Indy7 Digital Twin 구현·AX 전환",
    stage: "INTEGRATED DEMO",
    stageTone: "pilot",
    category: "Robot Digital Twin",
    period: "팀 교육 프로젝트",
    context: "Indy7 HMI·Controller·MQTT·PLC·Web Twin 연동",
    lead: "로봇 Teaching 정보를 JSON으로 꺼내 PC에서 편집하고, Controller 실행상태와 읽기 전용 Web Twin을 연결하는 팀 시스템을 구현했습니다.",
    summary: {
      problem: "Teaching 좌표·프로그램·I/O가 Pendant와 개별 파일에 나뉘어 있어 PC 편집, 실행이력 확인과 Twin 연동이 어려웠습니다.",
      role: "프로젝트 기획과 Robot A·B·C 작업흐름, Teaching JSON, PC-HMI·Controller·FK Twin 구현을 담당했습니다.",
      outcome: "팀은 QR 확인부터 Robot A·Vision·Robot B·Vision·Robot C로 이어지는 통합 시연을 완성했고, 로봇 데이터의 편집·실행·상태확인 흐름을 연결했습니다."
    },
    metrics: [],
    limitation: "Omniverse·Isaac Sim과 AI 제어는 후속 확장 방향입니다. 공개된 완료범위는 팀 통합 시연과 Teaching JSON·HMI·읽기 전용 Web Twin 구현입니다.",
    asset: {
      src: "./assets/indy7-web-twin-read-only.png",
      alt: "Indy7 로봇 상태와 좌표를 보여주는 읽기 전용 Web Digital Twin 화면",
      caption: "Controller 상태를 읽어 로봇 위치를 표시하는 Web Twin"
    },
    sections: [
      {
        kind: "flow",
        title: "팀 프로젝트 전체 흐름",
        intro: "제품 확인부터 로봇 이송과 Vision 판정까지 팀 전체 작업흐름을 먼저 보여줍니다.",
        items: [
          ["01", "QR 확인", "제품 ID와 작업정보 조회"],
          ["02", "Robot A", "투입위치에서 검사위치로 이송"],
          ["03", "Vision 1", "첫 번째 상태 확인"],
          ["04", "Robot B", "다음 검사·작업위치로 이송"],
          ["05", "Vision 2", "후속 상태 확인"],
          ["06", "Robot C", "최종 위치로 이송하고 이력 연결"]
        ]
      },
      {
        kind: "ownership",
        title: "팀 역할과 내 책임 경계",
        intro: "팀 통합흐름과 제가 직접 구현한 로봇 실무를 한 화면에서 구분합니다.",
        columns: [
          ["TEAM OBJECTIVE", "QR·Robot·Vision·PLC·DB를 연결해 제품 이송과 검사상태를 추적하는 팀 시연을 완성했습니다."],
          ["MY RESPONSIBILITY", "전체 기획, Robot A·B·C Job, Teaching JSON, PC-HMI·Controller 연동과 FK 기반 Web Twin을 구현했습니다."],
          ["TEAM INTERFACE", "Vision·PLC·DB 담당자가 사용할 로봇 상태와 작업완료 신호를 정의하고 인계조건을 맞췄습니다."]
        ]
      },
      {
        kind: "architecture",
        title: "Teaching부터 Twin까지의 연동 구조",
        intro: "로봇 실행과 Twin 표시의 책임을 나눠, Web 화면이 로봇을 직접 제어하지 않도록 구성했습니다.",
        items: [
          ["EDIT", "PC-HMI", "Teaching JSON 조회·편집·검증"],
          ["EXECUTE", "Controller", "검증된 Job과 좌표 실행"],
          ["PUBLISH", "MQTT", "좌표·상태·작업결과 전달"],
          ["STORE", "DB·PLC Bridge", "공정신호와 실행이력 연결"],
          ["VIEW", "Web Twin", "FK 계산으로 로봇 자세를 읽기 전용 표시"]
        ]
      },
      {
        kind: "split",
        title: "왜 JSON과 읽기 전용 Twin을 선택했는가",
        intro: "Teaching 편집과 실행권한을 분리해 변경경로와 안전경계를 명확하게 했습니다.",
        panels: [
          ["Teaching JSON", ["Pendant 안의 좌표를 구조화해 PC에서 검토", "Job·좌표·메타정보를 같은 형식으로 보존", "Controller 반영 전 검증단계를 유지"]],
          ["Read-only Twin", ["실행상태를 시각화하되 제어권은 갖지 않음", "MQTT 상태를 FK 자세로 변환", "실제 Controller와 화면 책임을 분리"]]
        ]
      },
      {
        kind: "evidence",
        title: "직접 구현한 화면",
        intro: "공개 저장소와 팀 자료에서 확인 가능한 HMI·Controller·Twin 범위만 표시했습니다.",
        assets: [
          {
            src: "./assets/indy7-web-twin-read-only.png",
            alt: "MQTT로 받은 Indy7 좌표를 FK 자세로 표현하는 읽기 전용 Web Twin",
            caption: "실제 제어권과 분리한 읽기 전용 상태 시각화"
          }
        ]
      },
      {
        kind: "outputs",
        title: "결과물",
        intro: "팀 통합 시연과 제가 직접 구현한 로봇 산출물을 나눠 표시합니다.",
        items: [
          ["Robot Job", "Robot A·B·C의 작업순서와 인계신호"],
          ["Teaching JSON", "좌표·프로그램 정보를 PC에서 조회·편집하는 구조"],
          ["PC-HMI·Controller", "검증 후 로봇 실행으로 이어지는 연동화면"],
          ["Web Digital Twin", "MQTT 상태를 FK 기반 자세로 표시하는 읽기 전용 화면"]
        ]
      }
    ]
  }
);
