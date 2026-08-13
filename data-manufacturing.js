window.PROJECT_DEMOS = window.PROJECT_DEMOS || [];

window.PROJECT_DEMOS.push(
  {
    id: "ncm-fat-sat",
    code: "M02",
    group: "manufacturing",
    templateName: "설비 인수·Pilot 검증형",
    title: "NCM Pilot Line 인수",
    fullTitle: "NCM 각형 Pilot Line 인수·초기 안정화",
    stage: "PILOT RESULT",
    stageTone: "pass",
    category: "배터리 제조",
    period: "FAT 2023.05–07 · SAT 2023.07–11",
    context: "NCM 50Ah 각형 Pilot Line",
    lead: "기능완료 통보를 실제 Cell이 반복 생산될 수 있는 인수상태로 전환했습니다.",
    summary: {
      problem: "설비업체의 기능 완료와 실제 Pilot 생산 가능 상태 사이에 차이가 있었습니다.",
      role: "핵심설비 11대와 주요공정 13개의 인수기준, FAT·SAT 검수, Punch 재시험과 초기 생산운영을 연결했습니다.",
      outcome: "약 5일·약 1,000 Cell을 생산하고 초기 조립 결과 약 95%와 운영문서 이관까지 확인했습니다."
    },
    metrics: [
      ["인수 범위", "핵심설비 11대 · 주요공정 13개"],
      ["Pilot Run", "약 5일 · 약 1,000 Cell"],
      ["초기 조립 결과", "약 95%"]
    ],
    limitation: "약 95%는 재작업 후 품질기준 충족품을 포함한 초기 팀 결과이며 FPY나 장기 양산수율을 뜻하지 않습니다.",
    asset: {
      src: "./assets/ncm-acceptance-flow.svg",
      alt: "인수기준에서 FAT, SAT, Punch 재시험, Pilot Run과 문서 이관으로 이어지는 NCM 설비 인수 흐름",
      caption: "같은 인수기준으로 설비기능과 실제 Cell 생산을 연결한 흐름"
    },
    sections: [
      {
        kind: "flow",
        title: "설비 인수 흐름",
        intro: "사양 확인으로 끝내지 않고 실제 Cell 생산과 운영문서 이관까지 하나의 Gate로 묶었습니다.",
        items: [
          ["01", "인수기준", "Cycle·안전·Sensor·Alarm·Interlock"],
          ["02", "FAT", "공급사 조건에서 기능과 반복동작 확인"],
          ["03", "SAT", "현장 설치조건과 반제품 품질 확인"],
          ["04", "Punch 재시험", "조치 전후를 같은 기준으로 비교"],
          ["05", "Pilot Run", "생산·재공·Lot·불량 이력 운영"],
          ["06", "문서 이관", "SOP·QCP·검사·운영기준 반영"]
        ]
      },
      {
        kind: "table",
        title: "4M 인수 위험분석",
        intro: "설비 인수에서 문제가 생길 수 있는 위치를 작업·설비·반제품·검수방법으로 나눴습니다.",
        columns: ["분석대상", "추정원인", "확인결과", "조치사항"],
        rows: [
          ["Man", "작업순서·점검자 판정 차이", "작업·검사 순서 통일 필요", "검수 Sheet와 작업순서 고정"],
          ["Machine", "Sensor·Alarm·Interlock·반복동작", "Punch 항목별 재시험 필요", "담당자·기한·동일 기준 재시험"],
          ["Material", "반제품 공차·Sample 상태", "실제 Cell 조건 확인 필요", "반제품 검사와 공정결과 연결"],
          ["Method", "기능완료 중심의 인수방식", "생산 가능 상태를 설명하지 못함", "Acceptance→Pilot Run Gate 적용"]
        ]
      },
      {
        kind: "gates",
        title: "검증 Gate",
        intro: "다음 단계로 넘어가기 전에 무엇을 확인했는지 보여주는 표입니다.",
        items: [
          ["FAT", "기능·안전·Cycle·Sensor·Alarm·Interlock", "공급사 조치"],
          ["SAT", "설치·정렬·반제품 품질·작업자 안전", "현장 재시험"],
          ["Punch", "조치 결과를 최초 인수기준과 대조", "완료 또는 재개방"],
          ["Pilot", "생산계획·재공·Lot·불량·재작업 이력", "운영 이관"]
        ]
      },
      {
        kind: "outputs",
        title: "결과물",
        intro: "인수 판단과 초기 생산운영에서 실제로 사용한 문서 항목입니다.",
        items: [
          ["FAT·SAT 검수표", "기능·안전·반복동작·반제품 품질 확인항목"],
          ["Punch List", "담당자·조치기한·재시험·종료조건"],
          ["SOP·QCP", "확정된 작업순서와 공정·품질 관리항목"],
          ["검사·운영기준", "측정방법·판정기준·생산·Lot 이력 관리"]
        ]
      }
    ]
  },
  {
    id: "robot-overhaul-standardization",
    code: "M03",
    group: "manufacturing",
    templateName: "설비 Overhaul·표준화형",
    title: "진공로봇 Overhaul 표준화",
    fullTitle: "진공 이송로봇 Overhaul 표준체계 구축",
    stage: "FIELD STANDARD",
    stageTone: "pass",
    category: "로보틱스·설비",
    period: "2019.10–2022.03",
    context: "신규 기종 기술내재화 → 반복 Overhaul 운영",
    lead: "고장품과 정상품의 차이를 Failure Mode로 정리하고 조립·정렬·Leak·부하검사를 표준 작업으로 전환했습니다.",
    summary: {
      problem: "Parts List와 조립·검사기준이 없어 정렬오차, Leak, 부하 Alarm과 Teaching 오류가 반복될 위험이 있었습니다.",
      role: "분해분석, 정밀조립, Align·Encoder Zero, FARO·Helium Leak·부하 Cycle과 작업자 교육을 담당했습니다.",
      outcome: "초도 Qual과 반복 Overhaul에 사용할 Parts List·SOP·Check Sheet·OJT 체계를 만들었습니다."
    },
    metrics: [],
    limitation: "제조사·Model·내부 Setting·고객정보는 공개하지 않으며 출하증가 수치는 사용하지 않습니다.",
    sections: [
      {
        kind: "flow",
        title: "Overhaul 작업 흐름",
        intro: "구전 작업을 분해·조립·검사·현장 인수 순서로 고정했습니다.",
        items: [
          ["01", "입고·분해", "상태기록과 Failure Mode 확인"],
          ["02", "세척·부품", "Bearing·Belt·Motor·소모품 점검"],
          ["03", "정밀조립", "Torque·Arm Align·Encoder Zero"],
          ["04", "성능검사", "FARO·Leak·반복정밀도·부하 Cycle"],
          ["05", "현장 Setup", "설치·Teaching·초도 Sample"],
          ["06", "교육·이관", "SOP·Check Sheet·OJT"]
        ]
      },
      {
        kind: "table",
        title: "4M Failure Mode 분석",
        intro: "검사결과가 기준을 벗어났을 때 되돌아갈 위치를 4M으로 정리했습니다.",
        columns: ["분석대상", "추정원인", "확인결과", "조치사항"],
        rows: [
          ["Man", "구전 조립순서·작업자별 Align 차이", "재발 관리요인", "작업순서·교육·Check Sheet"],
          ["Machine", "Encoder Zero·Arm Align·구동부 상태", "주요 Failure Mode", "정렬·부하 Cycle 재시험"],
          ["Material", "Bearing·Belt·Motor·세척상태", "부품상태가 구동과 진공품질에 영향", "Parts List·교체기준"],
          ["Method", "Torque·Leak·반복정밀도 판정기준 부재", "핵심 관리요인", "SOP·검사항목·보류기준"]
        ]
      },
      {
        kind: "split",
        title: "대표 검사축",
        intro: "조립 품질을 기구 정렬, 진공 건전성, 반복 구동 세 축으로 확인했습니다.",
        panels: [
          ["정렬·반복정밀도", ["Arm Align과 Encoder Zero 확인", "FARO 기준 위치·직진도 대조", "Teaching 위치 반복 확인"]],
          ["Leak·부하 Cycle", ["Helium Leak로 기밀상태 확인", "부하 구동 중 Alarm·진동 확인", "검사결과가 맞지 않으면 조립단계로 회귀"]]
        ]
      },
      {
        kind: "outputs",
        title: "결과물",
        intro: "신규 기종의 0→1 기술내재화와 반복 Overhaul에 사용한 문서 항목입니다.",
        items: [
          ["Parts List", "교체부품·소모품·구성품 식별"],
          ["SOP", "분해·세척·정밀조립·정렬·검사순서"],
          ["Check Sheet", "Torque·Align·Leak·반복정밀도·부하 Cycle"],
          ["교육자료", "조립·검사·Teaching·이상 발생 시 보류기준"]
        ]
      }
    ]
  },
  {
    id: "diffuser-scaleup-failure",
    code: "G01",
    group: "judgment",
    templateName: "실패분석·중단판단형",
    title: "Diffuser Scale-up 양산 도입 실패사례",
    fullTitle: "Diffuser Scale-up 양산 도입 실패사례",
    stage: "GATE-STOP",
    stageTone: "stop",
    category: "제조 판단",
    period: "2018.10–2019.12",
    context: "국책과제 Scale-up 검증",
    lead: "시간 단축보다 표면손상·Particle·재사용성·EHS를 우선해 Scale-up 중단 기준을 남겼습니다.",
    summary: {
      problem: "배기 인프라 제약으로 약액을 배제한 채 물+초음파 Scale-up을 진행하면서 표면손상과 Particle 위험이 나타났습니다.",
      role: "Lab·실물시험, 조도·현미경·SEM–EDS·Particle 분석으로 손상기전과 구조한계를 확인했습니다.",
      outcome: "Scale-up을 중단하고 기존공정으로 회귀했으며 차기 R&D의 설계·품질·EHS Gate를 정리했습니다."
    },
    metrics: [],
    limitation: "서로 다른 시험조건의 3일·8시간·1.5일을 동일조건 개선율로 계산하지 않습니다.",
    sections: [
      {
        kind: "flow",
        title: "실패분석 흐름",
        intro: "성공 수치가 아니라 어떤 증거로 중단을 결정했는지 순서대로 보여줍니다.",
        items: [
          ["01", "제약 확인", "배기 인프라 미구축·약액 배제"],
          ["02", "Lab 시험", "물+초음파 박리 가능성 확인"],
          ["03", "실물 Scale-up", "고정 진동자 중첩영역 손상 관찰"],
          ["04", "손상분석", "조도·현미경·SEM–EDS·Particle"],
          ["05", "Gate 판단", "표면손상·재사용성·EHS 검토"],
          ["06", "중단·회귀", "기존공정 복귀·차기 Gate 제정"]
        ]
      },
      {
        kind: "table",
        title: "4M 원인축소",
        intro: "확인하지 않은 항목은 임의로 정상 처리하지 않고 분석 범위를 그대로 표시했습니다.",
        columns: ["분석대상", "추정원인", "확인결과", "조치사항"],
        rows: [
          ["Man", "작업자·취급 편차", "작업자 입력의 특이사항 없음", "기존 작업기준 유지"],
          ["Machine", "고정 진동자·중첩영역·상대이동 부재", "주요 손상기전 후보", "구조변경 없이는 Scale-up 보류"],
          ["Material", "Diffuser 표면의 반복 초음파 노출", "Erosion·Particle·재사용성 위험", "조도·표면·Particle Gate"],
          ["Method", "약액 배제 후 물+초음파 단일 접근", "기존공정 대체조건 미충족", "기존공정 회귀·대안 재설계"]
        ]
      },
      {
        kind: "gates",
        title: "Stop Gate",
        intro: "처리시간만 통과해도 채택하지 않도록 중단판정 기준을 분리했습니다.",
        items: [
          ["표면", "조도·미세손상·Erosion이 허용범위인지", "미충족 시 중단"],
          ["Particle", "박리 후 오염과 재부착 위험이 없는지", "미충족 시 중단"],
          ["재사용", "반복 사용 후 기능과 표면이 유지되는지", "미확인 시 보류"],
          ["EHS", "배기·약액·작업환경 조건이 준비됐는지", "미구축 시 Scale-up 금지"]
        ]
      },
      {
        kind: "outputs",
        title: "결과물",
        intro: "실패를 성과처럼 꾸미지 않고 차기 시험의 중단·재설계 조건으로 전환했습니다.",
        items: [
          ["실패분석 보고서", "현상·시험조건·손상분석·원인흐름"],
          ["중단판정", "Scale-up 중단과 기존공정 회귀 근거"],
          ["설계 Gate", "상대이동·진동자 중첩·실물 구조 검토"],
          ["품질·EHS Gate", "표면손상·Particle·재사용·배기조건"]
        ]
      }
    ]
  }
);
