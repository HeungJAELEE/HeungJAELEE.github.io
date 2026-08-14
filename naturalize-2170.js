(() => {
  const projectId = "battery-2170-pilot";
  const project = window.PRESERVED_PROJECT_CONTENT?.[projectId];
  if (!project?.html) {
    console.error("[2170 preview] Source project was not found.");
    return;
  }

  const revised = [
  "제조 프로젝트",
  "양산 적용",
  "2170 양산 수율 안정화",
  "수율 기준과 측정 신뢰성을 다시 맞춘 뒤, 공정별 5M+1E 분석과 실제 Cell 재시험으로 양산조건을 표준화",
  "프로젝트 기간",
  "핵심 안정화 2024.05–2024.12 · 후속 유지 확인 2025.01–2025.02",
  "맥락",
  "금양 전지기술팀 재직 중 수행",
  "담당 범위",
  "수율·측정기준 정렬, 조립공정 시험방향, 부서별 담당·기한·재시험·판정기준과 표준문서 개정",
  "프로젝트 핵심 요약",
  "과제 정의",
  "설비 수율과 최종 전수검사 수율 간 차이가 발생해, 실제 공정 불량과 검사기 과검을 분리하는 기준 재설정이 필요했습니다.",
  "핵심 역할",
  "수율 분모와 검사기 Gage R&R 기준을 확립하고, 공정별 5M+1E 원인 분석 및 재현 시험을 조율하여 최적 공정 조건을 도출했습니다.",
  "주요 성과",
  "월평균 양산 수율을 약 40%에서 98.7%로 향상시켰으며, 검증된 공정 조건을 QCP, P-FMEA, SOP에 반영하여 산포를 제어했습니다.",
  "양산 양품 수율",
  "약 40% → 98.7%",
  "MSA 및 Gage R&R을 통해 검사 신뢰성을 확보한 후, 5M+1E 기반 조건 최적화 및 양산 이관 완료",
  "양산 초기 불량 현상",
  "양산 초기, 개별 설비의 직행 수율과 최종 수율 간 불일치 현상이 지속되었습니다. 실제 공정 불량과 검사기 과검이 혼재되어 있어, 공정 조건을 임의로 변경하면 수율 산포가 악화될 수 있었습니다.",
  "먼저 총 투입, 최종 양품, 샘플/파괴검사 로스, 그리고 진성 불량의 기준을 명확히 정의하여 수율 산출 기준을 일원화했습니다. 그 후 계측 신뢰성을 선행 확보하고, Vision 설비, Jig 정렬, 소모품 교체 주기, 공정 파라미터 등을 5M+1E 관점에서 분리하여 상관관계를 검증했습니다.",
  "생산/설비/품질/개발 유관 부서 간의 과제와 일정을 조율하는 역할을 맡아, 각 부서의 조치가 실제 양산 수율 향상으로 이어지도록 유도했습니다. 최적화된 조건은 모두 P-FMEA, QCP, SOP로 이관하여 표준화를 마쳤습니다.",
  "성공 판정기준",
  "구분\t판정기준",
  "수율\t총 투입·양품·검사 Loss·공정불량을 같은 분모로 집계",
  "판정 신뢰성\t기준 Sample과 동일 Cell 재검사에서 실제 불량과 오판정 구분",
  "공정조건\t여러 변수를 한꺼번에 바꾸지 않고 원인별 조건을 재시험",
  "현장 적용\t작업자와 설비가 바뀌어도 같은 기준으로 검사·조치 가능",
  "표준화\t확인된 조건과 이상조치를 현장문서와 교육에 반영",
  "수율 기준과 측정 신뢰성",
  "구분\t관리기준\t사용 목적",
  "총 투입\t해당 기간 라인에 투입한 Cell\t수율 분모 통일",
  "양품\t최종 판정기준을 충족한 Cell\t실제 생산결과 확인",
  "Sample 검사 Loss\t공정검증·파괴검사에 사용한 Cell\t공정불량과 분리",
  "공정불량\t재검사 후에도 기준을 충족하지 못한 Cell\t원인별 개선대상 확정",
  "총 투입량을 양품, 샘플 검사 Loss와 공정 불량으로 구분해 양품률을 평가했습니다.",
  "2024년 12월 월평균 실질 양품수율 **98.7%**는 총 양품 ÷ 총 투입으로 계산한 팀 결과입니다. 이 기준을 고정한 뒤 측정·검사, Jig·정렬·소모품, 공정조건 순서로 원인을 좁혔습니다.",
  "DMAIC 개선 흐름",
  "DMAIC · 양산 안정화",
  "수율 기준부터 재시험·표준화까지",
  "측정과 판정의 신뢰성을 확보한 뒤 확인된 원인만 공정조건 변경으로 넘겼습니다.",
  "01",
  "DEFINE",
  "수율·Loss·범위·성공기준",
  "02",
  "MEASURE",
  "분모·MSA·기준 Sample",
  "03",
  "ANALYZE",
  "공정별 5M+1E·비교시험",
  "04",
  "IMPROVE",
  "Jig·소모품·검사·조건 조치",
  "05",
  "VERIFY",
  "동일 Cell·동일 기준 재시험",
  "06",
  "CONTROL",
  "SOP·QCP·P-FMEA·검사기준",
  "라인 공통 5M+1E 분석",
  "분석대상\t추정원인\t확인결과\t조치사항",
  "Man\t작업순서·Setting·이상보고 차이\t작업자·교대별 결과와 작업방법 비교 · 판정: 재발방지 관리대상\t작업순서·Setting·이상보고 기준 표준화",
  "Machine\tSensor, Jig·정렬, Head·Knife, 전극·소모품, Vision 광학계·Sequence\t반복 Error 위치, 설비이력, 해체·재투입 결과 대조 · 판정: 공정별 주요 후보\t공정별 설비점검과 동일 기준 재시험으로 연결",
  "Material\t극판·Can·Cap·Tube·전해액·전극의 Lot·형상·특성\t변경 전후와 동일조건 Sample 비교 · 판정: 사례별 영향 분리\t변경점과 Lot를 공정결과에 연결",
  "Method\t압력·시간·전류·진공·세정·검사영역·교체주기\t한 조건씩 바꾼 비교시험 · 판정: 확인된 조건만 변경\t원인별 조건시험 후 필요한 항목만 개정",
  "Measurement\tGage R&R, 기준 Sample, 반복측정, 검사기 간 차이\t기준 Sample 재측정, 10 Batch 이상 전수확인, 유지 MSA · 판정: 공정조건보다 먼저 확인\t기준 Sample·MSA를 조건변경 전 Gate로 적용",
  "Environment\t온습도·공조·부식·변색·세정환경\t기간·위치·동일 Sample 비교 · 판정: 단일 원인으로 채택하지 않음\t관리변수로 모니터링하고 공정원인과 분리",
  "공통 5M+1E 분석은 라인 전체의 후보를 정리한 표입니다. 실제 조치는 각 공정의 불량형태와 성공기준에 맞춰 다시 분석했습니다.",
  "사례 01. Vision 검사기 과검 개선",
  "01",
  "Measurement · Method",
  "회전 방향별 Vision ROI 및 검출 알고리즘 최적화",
  "제품의 물리적 규격은 동결하고, Align 좌표·검사 ROI·레시피 셋업 시퀀스를 조정했습니다.",
  "불량 현상 및 핵심 품질 특성 (CTQ)",
  "특정 회전 방향에서 양품 Cell이 반복적으로 NG 배출(과검)되었습니다. 마이크로미터 실측 두께가 설계 공차 이내임을 확인하여 소재 변수는 통제하고, 동일 기준 샘플이 방향과 작업자에 무관하게 100% 양품 판정받는 것을 목표로 설정했습니다.",
  "측정 및 분석",
  "기준 샘플 회전 방향별 연속 측정",
  "실측 두께와 Vision 측정치 간 편차 분석",
  "Vision Align 좌표 및 검사 ROI 영역 대조",
  "작업자별 셋업 표준 산포 확인",
  "5M+1E 분석",
  "분석대상\t추정원인\t확인결과\t조치사항",
  "Man\t방향별 Setting 순서\t같은 정상 Cell의 작업자별 재검사 · 판정: 재발 관리요인\t방향별 Setting 순서 표준화",
  "Machine\t회전방향별 Vision 정렬위치\t오배출 방향과 위치차가 반복 · 판정: 원인후보 유지\t방향별 정렬위치 재설정",
  "Material\t극판 Press 두께\t실제 두께가 설계범위 안 · 판정: 주요 원인 제외\tPress 조건 유지",
  "Method\t양품범위·검사영역\t규격충족 Cell이 검사영역에서 NG 발생 · 판정: 핵심 원인\t양품범위와 검사영역 재설정",
  "Measurement\t기준 양품 Cell 반복측정\t동일 Cell의 방향별 판정 비교 · 판정: 판정근거\t같은 Cell을 방향별로 재검사",
  "Environment\t조명·주변조건\t방향·정렬·검사영역보다 설명력이 낮음 · 판정: 주요 원인 제외\t기존 조명·주변 관리조건 유지",
  "개선 및 검증",
  "물리적 Press 조건은 변경하지 않았습니다. 대신 방향별 Vision Align 좌표와 검사 ROI를 재설정하고, 기준 샘플 30회 반복 투입 테스트를 통해 과검률이 0%로 수렴하는 것을 확인했습니다.",
  "유지 관리 및 표준화",
  "방향별 셋업 시퀀스, 일일 점검표, 마스터 샘플 보관 기준을 SOP 및 이상조치계획(OCAP)에 반영했습니다.",
  "사례 02. 전해액 주액 누액 및 중량 산포 개선",
  "02",
  "Machine · Method",
  "기밀 구조 보정 및 주액 파라미터 최적화",
  "Jig 및 가압 구조 등 하드웨어 요인을 선행 조치한 후, 파라미터를 미세 조정했습니다.",
  "불량 현상 및 핵심 품질 특성 (CTQ)",
  "특정 생산 단위에서 누액 및 미주액에 따른 중량 미달 불량이 군집 형태로 발생했으며, Jig 위치별 편차도 뚜렷했습니다. 누액 발생률 0%를 달성하고, 주액량과 셀 중량이 공차 내에 들며 후속 공정을 통과하는 것을 목표로 설정했습니다.",
  "측정 및 분석",
  "Jig 위치별 누액 발생률 및 중량 산포 매핑",
  "주액 전/후 중량 측정 및 후속 공정 데이터 대조",
  "O-ring, Spring 장력, Jig Align 및 진공 기밀도 점검",
  "Hopper/Pump 압력과 진공·가압 제어 Log 분석",
  "5M+1E 분석",
  "분석대상\t추정원인\t확인결과\t조치사항",
  "Man\tCell 투입·Jig 장착·정렬\t위치별 Loss와 작업순서 비교 · 판정: 단독 원인으로 확정하지 않음\t투입·Jig 장착·정렬 순서 표준화",
  "Machine\tO-ring·Spring·Jig·기밀·가압구조·Hopper·Pump\t누액·미주액 위치와 설비상태 대조 · 판정: 주요 원인후보\tJig·밀봉·가압구조를 먼저 보정",
  "Material\t밀봉부품·소재 Lot\t부품 변경점과 밀봉특성 비교 · 판정: 사례별 영향 확인\t부품·Lot 변경점을 주액결과와 추적",
  "Method\t주액위치·진공·가압·유지·반복 Sequence\t기구조치 전후 조건별 재시험 · 판정: 주요 조정축\t진공·가압·유지조건을 한 항목씩 비교",
  "Measurement\t중량·누액·주액량·후속검사\t동일 Cell 결과를 한 기준으로 연결 · 판정: 판정근거\t주액 전후와 후속검사를 같은 Cell로 연결",
  "Environment\t온습도·세정환경\t기밀구조·Sequence보다 설명력이 낮음 · 판정: 주요 원인 제외\t기존 환경 관리조건 유지",
  "개선 및 검증",
  "Jig 정렬 편차와 밀봉 가압 구조를 우선 보정했습니다. 이후 가압력, 진공도, 유지 시간을 단일 변수로 통제하며 변경해 최적 중량과 누액 발생 여부를 교차 검증했습니다.",
  "유지 관리 및 표준화",
  "예방보전 점검표, 소모성 부품 교체 주기, 주액 조건 최적화 이력을 SOP, QCP, P-FMEA에 등록했습니다.",
  "사례 03. 저항용접 미접합 및 화성(Formation) 내부저항(IR) 개선",
  "03",
  "Machine · Measurement",
  "접합 상태 파괴검사와 후공정 내부저항의 상관관계 검증",
  "Welding Head 정렬, 가압력, 전극 마모도를 우선 정상화한 후 전기적 용접 파라미터를 최적화했습니다.",
  "불량 현상 및 핵심 품질 특성 (CTQ)",
  "화성 공정에서 내부저항 불량 셀을 해체한 결과, 저항용접부 미접합이 원인으로 확인되었습니다. 파괴검사인 너깃 크기, 인장강도, 파단면 형상이 규격을 만족함과 동시에, 화성 공정 내부저항 산포가 안정화되는 것을 목표로 설정했습니다.",
  "측정 및 분석",
  "불량 Cell 단면 결과와 공정 이력 대조",
  "Welding Head 정렬, 가압력 산포 및 전극 마모도 점검",
  "파괴검사(너깃, 인장강도, 파단면 형상) 측정",
  "동일 조건 Cell의 화성 공정 내부저항 데이터 교차 검증",
  "5M+1E 분석",
  "분석대상\t추정원인\t확인결과\t조치사항",
  "Man\t전극교체·정렬·검사순서\t작업방법과 접합결과 비교 · 판정: 재발 관리요인\t전극교체·정렬·검사순서 표준화",
  "Machine\tHead 정렬·가압·전극마모·반복동작\t미접합 Cell 해체결과와 설비상태 대조 · 판정: 주요 원인후보\tHead·가압·전극상태 우선 보정",
  "Material\tTab·전극·접합부 소재\t설비·조건 조치와 분리해 비교 · 판정: 사례별 영향 확인\t소재·Lot 변경을 설비조건과 분리 추적",
  "Method\t전류·시간·가압·검사순서\t설비와 전극 정상화 후 조건별 비교 · 판정: 후속 조정축\t전류·시간·가압을 한 항목씩 재시험",
  "Measurement\t파괴검사·인장·파단·IR\t직접 접합검사와 후공정 전기결과 연결 · 판정: 재시험 근거\t접합검사와 화성 IR을 같은 흐름으로 확인",
  "Environment\t작업환경\t정렬·전극·용접조건보다 설명력이 낮음 · 판정: 주요 원인 제외\t기존 작업환경 관리조건 유지",
  "개선 및 검증",
  "전극 마모 교체 한계 재설정 및 Head 정렬/가압 편차를 먼저 기구적으로 보정했습니다. 이후 전류, 시간, 가압력 조건을 검증하여 최적 용접 구간을 도출하고, 파괴검사 결과와 최종 내부저항 수치의 연관성을 확인했습니다.",
  "유지 관리 및 표준화",
  "전극 정기 교체 주기, Head 점검표, 파단면 판정 기준을 정립하여 QCP 및 SOP로 이관했습니다.",
  "사례 04. Beading 공정 형상 불량 및 치수 산포 제어",
  "04",
  "Machine · Method",
  "Multi-Head 공통 양품 구간 도출",
  "특정 Head 중심의 임시 조치를 배제하고, 4개 Head 간 편차를 최소화하는 공통 파라미터를 확보했습니다.",
  "불량 현상 및 핵심 품질 특성 (CTQ)",
  "Knife 세팅 편차와 Head별 단차로 인해 Beading 부위의 형상 불량이 반복 발생했습니다. 4개 Head 전수가 3D 형상 및 높이 규격을 충족하는 공통 조건을 도출하는 것을 목표로 설정했습니다.",
  "측정 및 분석",
  "Head별 Z축 단차 및 Knife 위치 편차 측정",
  "동일 투입 Cell 기준 Head 간 Beading 형상 산포 대조",
  "Beading 치수와 최종 총고 불량 간의 상관관계 분석",
  "교대 조별/작업자별 금형 셋업 절차 및 산포 비교",
  "5M+1E 분석",
  "분석대상\t추정원인\t확인결과\t조치사항",
  "Man\tKnife·Head Setting 방법\t작업자와 Head별 결과 비교 · 판정: 관리요인\tSetting 순서와 확인방법 표준화",
  "Machine\tKnife 정도·Head 높이편차\t특정 Head에서 같은 형상불량 반복 · 판정: 주요 원인후보\tKnife·Head 위치 보정",
  "Material\tCan·Cap·반제품 형상\tHead·Knife 조건과 분리해 비교 · 판정: 주요 원인으로 채택하지 않음\t기존 반제품 조건 유지",
  "Method\t한 Head 중심 임시 Setting\t4개 Head 공통조건과 비교 · 판정: 핵심 개선대상\t4개 Head 공통 양품조건 채택",
  "Measurement\tBeading 형상·높이\tHead별 동일 기준 측정 · 판정: 재시험 근거\t동일 Cell을 Head별 같은 기준으로 측정",
  "Environment\t주변조건\tHead·Knife 정도보다 설명력이 낮음 · 판정: 주요 원인 제외\t기존 주변 관리조건 유지",
  "개선 및 검증",
  "다이얼 게이지를 활용해 Knife와 Head 간 기구적 단차를 미크론 단위로 조절했습니다. 이후 4개 Head에 동일 Cell을 50회 연속 투입하여, 공통적으로 규격을 충족하는 양품 구간을 산출해 적용했습니다.",
  "유지 관리 및 표준화",
  "금형 교체 시 Knife/Head 셋업 절차서, 양품 구간 검증 절차, 초/종물 검사 기준을 현장 SOP 및 P-FMEA에 등록했습니다.",
  "사례 05. Sizing 공정 치수 산포 제어 및 부품 마모 관리",
  "05",
  "Machine · Measurement",
  "실제 형상 변형과 측정 편차 분리",
  "단위 공정과 최종 검사 간의 측정 기준을 일치시키고, 기구부 마모 한계점을 정립했습니다.",
  "불량 현상 및 핵심 품질 특성 (CTQ)",
  "공정 진행 중 총고·내경 불량이 복합 발생했고, 캔 씹힘 현상과 부품(3-Jaw) 마모가 나타났습니다. 실제 형상 불량과 측정 오판정을 분리하고, 최종 검사와 단위 공정 간 측정 편차를 제거하는 것을 목표로 설정했습니다.",
  "측정 및 분석",
  "공정별 총고 반복 측정 및 반제품 치수 추이 모니터링",
  "단위 공정 측정 데이터와 최종 데이터 간 교차 분석",
  "Vision 검출 알고리즘 검증",
  "윤활제 토출량, 세척 주기, 3-Jaw 툴링 마모 상태 점검",
  "5M+1E 분석",
  "분석대상\t추정원인\t확인결과\t조치사항",
  "Man\t전수검사·Setting 순서\t작업자별 측정·판정 비교 · 판정: 관리요인\t전수검사와 Setting 순서 표준화",
  "Machine\t총고 Sensor·Vision·3-Jaw\t단위공정·최종 결과와 부품상태 대조 · 판정: 주요 원인후보\tSensor·Vision 점검과 3-Jaw 교체기준 설정",
  "Material\t반제품 형상·소재\t설비정도·측정결과와 분리 · 판정: 주요 원인으로 채택하지 않음\t기존 반제품 조건 유지",
  "Method\tDMC 토출·Cleaning·점검주기\t씹힘과 유지점검 이력 비교 · 판정: 주요 관리조건\tDMC 토출·Cleaning·점검주기 개정",
  "Measurement\t총고 MSA·교차측정·Vision\t실제 형상과 측정편차 분리 · 판정: 판정근거\t단위공정과 최종 총고를 교차확인",
  "Environment\t세정·주변조건\t설비·측정체계보다 설명력이 낮음 · 판정: 주요 원인 제외\t기존 세정·주변 관리조건 유지",
  "개선 및 검증",
  "단위 공정과 최종 검사 간의 총고 측정 기준점을 통일하여 측정 신뢰성을 확보했습니다. 윤활제 토출 압력 및 세척 주기를 조정하고, 마모도에 따른 치수 산포를 분석하여 부품 교체 시점을 도출했습니다.",
  "유지 관리 및 표준화",
  "총고 측정 표준, Vision 한도 견본, 윤활제 점검표, 부품 정기 교체 기준을 예방보전 점검표 및 QCP에 이관했습니다.",
  "사례 06. X-Ray 검사기 오판정 개선",
  "06",
  "Material · Method · Measurement",
  "내부 물리적 형상 분석 및 X-Ray 검사 조건 최적화",
  "불량 판정 Cell의 해체 결과를 바탕으로, 실제 불량과 검사 조건 한계를 분리해 파라미터를 조정했습니다.",
  "불량 현상 및 핵심 품질 특성 (CTQ)",
  "극판이 원뿔형으로 거동하는 현상에서 과검이 다발했습니다. 실제 권취 불량은 검출하되, 품질 부서에서 양품으로 승인한 정상 거동 형상은 불량으로 오판하지 않는 것을 목표로 설정했습니다.",
  "측정 및 분석",
  "X-Ray 불량 판정 Cell 전수 해체 및 단면 계측",
  "실제 내부 마진과 권취 거동 대조",
  "권취기 센서 동작 Log와 X-Ray 판정 상관관계 분석",
  "X-Ray 파라미터별 민감도 평가",
  "5M+1E 분석",
  "분석대상\t추정원인\t확인결과\t조치사항",
  "Man\t권취·판정 작업방법\t해체근거를 부서 공동 검토 · 판정: 주요 원인 제외\t부서 공동판정 기준 통일",
  "Machine\tEPC 동작·유효위치 감지\t실제 전극위치와 X-Ray 출력 비교 · 판정: 핵심 원인에서 제외\t기존 EPC 조건 유지",
  "Material\t원뿔형 제품형상·활물질 위치\t해체·절단결과와 품질협의 · 판정: 양품형상으로 판정\t승인된 양품형상을 검사기준에 반영",
  "Method\t검사 Count·Range\t유효한 양품형상을 지나치게 제외 · 판정: 핵심 원인\tCount와 유효 판정범위 조정",
  "Measurement\t해체·절단·육안확인\tX-Ray 결과와 실제 내부형상 대조 · 판정: 변경근거\t조정 후 실제 권취불량 통과 여부 재검사",
  "Environment\t검사환경\t제품형상·검사조건보다 설명력이 낮음 · 판정: 주요 원인 제외\t기존 검사환경 유지",
  "개선 및 검증",
  "품질 부서와 협의된 한도 견본 형상을 기준으로 X-Ray 검출 조건과 판정 범위를 조정했습니다. 이후 경계성 불량 샘플을 반복 투입하여 실제 불량 검출력과 정상품 통과율을 동시 확보함을 확인했습니다.",
  "유지 관리 및 표준화",
  "부서 간 검토를 거쳐 한도 견본 승인서, X-Ray 판정 레시피, 초중종물 검사 기준을 현장 문서 및 QCP에 등록했습니다.",
  "사례 07. 외관 검사 기준 세분화 및 부식 인자 제어",
  "07",
  "Measurement · Method · Environment",
  "결함과 단순 외관 변형의 한도 견본 분리",
  "외관 검사 판정 기준을 등급제로 세분화하고, 부식에 영향을 미치는 세정수 pH 및 공조 조건을 점검했습니다.",
  "불량 현상 및 핵심 품질 특성 (CTQ)",
  "후공정 외관 검사에서 실제 부식, 열 변색, 단순 스크래치가 단일 '외관 불량' 코드로 집계되어 세부 분석이 어려웠습니다. 결함과 허용 한도를 한도 견본으로 분리 제정하고, 육안 검사자 간의 판정 일치율을 유지하는 것을 목표로 설정했습니다.",
  "측정 및 분석",
  "결함 유형별 한도 견본 제작 및 검사자 간 교차 평가",
  "과용접 부위의 실제 산화 여부와 단순 열 변색 분리 분석",
  "세정수 pH 농도 및 환수 주기에 따른 표면 상태 매핑",
  "공조 조건에 따른 국소 온습도 모니터링",
  "단순 스크래치의 기능적 영향성 평가",
  "5M+1E 분석",
  "분석대상\t추정원인\t확인결과\t조치사항",
  "Man\t작업자별 외관판정 차이\t같은 Cell과 한도견본을 작업자별로 비교 · 판정: 판정 표준화 대상\t한도견본 기반 외관판정 교육",
  "Machine\t세정설비·공조·용접상태\t세정설비와 공조 운전상태 확인 · 판정: 운영조건 확인대상\t세정설비·공조·용접상태 점검",
  "Material\tCan 표면, 용접부 외관\t기능·부식 여부와 외관차이를 분리 · 판정: 사례별 영향 분리\t녹·변색·색상차이·스크래치를 별도 판정",
  "Method\t세정수 pH·환수주기·세정방법\t조건별 외관과 재검사 결과 비교 · 판정: 핵심 관리축\tpH·환수주기·세정·한도견본 기준 운영",
  "Measurement\t한도견본, 육안·기능 판정\t같은 외관을 실제 녹과 허용흔적으로 구분 · 판정: 최종 판정근거\t육안·기능 평가를 연결해 생산판정",
  "Environment\t온습도·공조·세정환경\t여러 시험 조건이 달라 단일 원인으로 설명 안 됨 · 판정: 관리변수 유지\t공조·세정환경을 모니터링하고 공정원인과 분리",
  "개선 및 검증",
  "한도 견본 제정을 통해 판정 기준을 명확히 하고, 단순 열 변색품은 정상 처리 후 로트에 합류시켰습니다. 부식의 주요 요인인 세정수 pH 열화 사이클을 분석하여 환수 주기를 조정하고, 공조 설비를 통해 작업장 온습도 조건을 모니터링했습니다.",
  "유지 관리 및 표준화",
  "결함 유형별 한도 견본 보드 비치, 세정수 일일 점검표, 공조 설비 점검 기준을 QCP에 등록했습니다. 단순 스크래치는 기능 불량과 분리하여 별도 코드로 추적 관리하도록 조치했습니다.",
  "추가 후공정 관리사례",
  "후공정에서도 조건을 한꺼번에 바꾸지 않았습니다. 실제 시험에서 확인한 조건과 유지할 조건을 공정별로 구분했습니다.",
  "사례 08. 표면 세정 공정 파라미터 최적화",
  "08",
  "Machine · Method · Environment",
  "유효 인자 관리와 노이즈 인자 통제",
  "조건 비교 시험을 통해 상관관계가 확인된 세정수 온도 및 브러시 관리만 변경하고, 나머지 변수는 기존 조건을 유지했습니다.",
  "불량 현상 및 핵심 품질 특성 (CTQ)",
  "세정 공정에서 이물 잔류가 발생했으나, 세정수 온도, 브러시 상태, pH 등 잠재 원인이 많아 혼선이 있었습니다. 여러 변수를 일괄 변경하는 대신, 실제 세정력 향상에 기여하는 핵심 조건만 도출하는 것을 목표로 설정했습니다.",
  "측정 및 분석",
  "세정수 온도 구간별 이물 잔류량 비교 분석",
  "노즐 분사각 변경 전후의 수압 및 세정력 비교",
  "브러시 마모도에 따른 표면 상태 대조",
  "pH 농도 및 세정 시간 변동 시 세정력 분석",
  "세정 후 표면 상태를 기존 출하 검사 한도 견본과 교차 검증",
  "5M+1E 분석",
  "분석대상\t추정원인\t확인결과\t조치사항",
  "Man\t세정순서·브러시 점검방법\t작업자 차이를 핵심 변경원인으로 볼 근거 부족 · 판정: 주요 원인 제외\t세정순서와 브러시 점검방법 동일 유지",
  "Machine\t노즐각도·브러시 상태\t노즐 변경효과는 크지 않고 브러시 관리는 필요 · 판정: 브러시 관리대상\t브러시 정기 교체주기 설정, 노즐각도 유지",
  "Material\t세정수와 세정대상 표면\t온도·브러시 조건에서 개선방향 확인됨 · 판정: 주요 원인 제외\t기존 세정수·제품소재 기준 유지",
  "Method\t세정수 온도·pH·세정시간\t조건 비교에서 온도와 브러시만 변경대상 선정 · 판정: 핵심 관리축\t세정수 온도기준 상향, pH·세정시간 유지",
  "Measurement\t세정 후 검사결과\t변경 전후 결과를 같은 기준으로 비교 · 판정: 판정근거\t변경조건 적용 후 동일 기준으로 재확인",
  "Environment\t세정 주변조건\t단일 원인으로 확인되지 않음 · 판정: 기존 관리조건 유지\t주변조건 별도 모니터링",
  "개선 및 검증",
  "유의미한 세정수 온도 목표값을 상향 조정하고, 브러시 교체 주기를 확립했습니다. 반면 변경 효과가 미미했던 노즐 각도, pH, 세정 시간은 작업 오동작 방지를 위해 기존 조건을 강제 유지했습니다.",
  "유지 관리 및 표준화",
  "세정수 온도 관리 한계, 브러시 예방보전 주기, 변경 금지 항목 목록을 현장 QCP 및 공정 조건표에 명문화했습니다.",
  "사례 09. 마킹 설비 가동률 저하 요인 확인",
  "09",
  "Machine · Method",
  "Nozzle 막힘 예방 주기 확립 및 수동 마킹 기능 분리",
  "마킹 노즐 자동 세척 주기를 데이터화하여 규정하고, 작업 시간이 과다한 수동 마킹 공정은 후속 과제로 이관했습니다.",
  "불량 현상 및 핵심 품질 특성 (CTQ)",
  "마킹 노즐의 간헐적 막힘으로 폰트 끊김 불량이 다발하고 설비 가동률이 저하되었습니다. 자동 세척 주기를 정립해 가동률을 회복하고, 수동 조작이 과다한 마킹 작업은 선행기술 부서의 후속 과제로 분리하는 것을 목표로 설정했습니다.",
  "측정 및 분석",
  "노즐 세척 주기 대비 막힘 발생률 추이 분석",
  "세척 전후의 가독성 및 Vision 판정 결과 교차 검증",
  "수동 마킹 작업의 소요 시간 및 작업자 산포 측정",
  "4M 분석",
  "분석대상\t추정원인\t확인결과\t조치사항",
  "Man\tCleaning 수행순서\t세척 주기를 일정하게 적용할 관리기준 필요 · 판정: 재발 관리요인\t작업순서와 확인시점 표준화",
  "Machine\tMarking Nozzle\t세척 전후 막힘상태가 달라짐 · 판정: 주요 관리부품\tNozzle 상태점검과 Cleaning 적용",
  "Material\tMarking 소모재\t소재변경이 핵심 원인이라는 근거 없음 · 판정: 주요 원인 제외\t기존 소재 관리기준 유지",
  "Method\tCleaning 주기·수동 작업\t세척 주기로 막힘 관리 가능, 수동 마킹은 양산성 미달 · 판정: 기능 보류\t세척 주기 표준화, 수동 마킹은 후속 Gate 이관",
  "개선 및 검증",
  "마킹 설비의 자동 세척 주기를 조절해 폰트 불량률을 안정화시켰습니다. 양산 속도를 저해하는 수동 마킹 방식은 후속 과제로 이관 조치했습니다.",
  "유지 관리 및 표준화",
  "자동 세척 주기를 설비 점검표 및 QCP에 반영했습니다.",
  "사례 10. Pre-Charge 설비 간헐적 이상 확인",
  "10",
  "Machine · Measurement · Environment",
  "설비 제어 이상, 파라미터, 제품 요인 분할 분석",
  "간헐적 미동작 현상을 하드웨어, 시퀀스, 제품 상태로 분리해 교차 검증했습니다.",
  "불량 현상 및 핵심 품질 특성 (CTQ)",
  "Pre-Charge 설비에서 원인 불명의 간헐적 미동작 및 오측정이 발생했습니다. 섣부른 파라미터 조정을 지양하고, 제어 보드 상태, 동작 시퀀스, 입력 제품 상태를 구분해 검증하는 것을 목표로 설정했습니다.",
  "측정 및 분석",
  "간헐 미동작 알람 Log 및 PLC 시퀀스 매핑",
  "제어 보드 계통과 구동 파라미터를 분리 점검",
  "제품 자체 이상과 설비 측정 시스템 오작동 간 일치성 검토",
  "과거 설비 노출 이력과 현재 에러 코드 상관성 추정",
  "5M+1E 분석",
  "분석대상\t추정원인\t확인결과\t조치사항",
  "Man\t운전·확인순서\t작업방법만으로 간헐현상 설명 불가 · 판정: 주요 원인 제외\t동일 운전·확인순서 유지",
  "Machine\t제어 보드·설비동작\t간헐 미동작과 지연성 이상 가능성 분리 필요 · 판정: 확인후보\t보드와 일반 설비동작 별도 점검",
  "Material\t투입 Cell 상태\t제품이상과 설비 오측정 구분 필요 · 판정: 분리 확인대상\t제품검사 결과와 설비판정 대조",
  "Method\t설비조건·Reset 절차\t보드 이상과 조건을 같은 원인으로 묶을 수 없음 · 판정: 비교대상\t조건·보드 점검순서 분리",
  "Measurement\t미동작·오측정·제품결과\t설비출력과 실제 제품결과 일치 확인 필요 · 판정: 판정근거\t같은 Cell의 설비판정과 후속결과 비교",
  "Environment\t과거 외부 환경 노출 이력\t노출이력은 있으나 확정 근거 부족 · 판정: 가설 유지\t점검정보로 유지하고 확정원인으로 사용 안 함",
  "개선 및 검증",
  "임의적인 공정 튜닝을 제한하고, 설비 구동 시퀀스 확인, 제어 보드 상태 진단, 제품 상태 판정 순서로 점검 절차를 수립했습니다. 동일 Cell에 대한 설비 계측 데이터와 수동 계측 데이터를 대조하여 설비 오측정 여부를 파악했습니다.",
  "유지 관리 및 표준화",
  "잠재적 제어 보드 이상 가능성을 모니터링 대상으로 분류해 문서에 등록하고, 에러 코드별 알람 조치 매뉴얼을 정리했습니다.",
  "사례 11. 대체 Tube 적용 한계 검증",
  "11",
  "Material · Method · Measurement",
  "신규 소재 수축 특성 및 외관 검출 한계 확인",
  "대체 소재에 대한 수축 조건을 개별 도출하고, 외관 불량 판정 한계를 확인했습니다.",
  "불량 현상 및 핵심 품질 특성 (CTQ)",
  "부품 대체를 위해 신규 튜브를 도입하는 과정에서, 기존 소재와 열수축 특성 및 초기 색상 편차가 달랐습니다. 기능적 수축 상태와 단순 외관 차이를 분리해, 튜브별 최적 온도 조건과 한도 견본을 도출하는 것을 목표로 설정했습니다.",
  "측정 및 분석",
  "대체 튜브 특성 및 초기 색차 분석",
  "온도 조건별 수축 밀착성 및 주름 발생 평가",
  "색상 편차와 기능적 절연 불량 간 연관성 분리",
  "외관 허용 한도 검토",
  "5M+1E 분석",
  "분석대상\t추정원인\t확인결과\t조치사항",
  "Man\tTube 장착·수축 순서\t작업자 차이가 핵심 변경축이라는 근거 없음 · 판정: 주요 원인 제외\t동일 작업순서 유지",
  "Machine\t수축 설비상태\t설비이상보다 Tube와 온도조건 차이가 주요 비교대상 · 판정: 기존 설비 유지\t설비조건 고정 후 튜브/온도 비교",
  "Material\t소재특성·색상\t튜브별 수축상태와 외관차이 확인됨 · 판정: 핵심 변경축\t두 튜브 특성과 색상차이 구분",
  "Method\t수축 온도조건\t조건별 수축결과 비교 · 판정: 주요 조정축\t온도 적용방향 설정",
  "Measurement\t수축상태·외관·기능 확인\t색상차이와 기능문제를 분리 · 판정: 제한 검증근거\t품질부서 승인범위에서 외관 판정",
  "Environment\t주변 보관조건\t특이사항 없음 · 판정: 주요 원인 제외\t기존 환경 유지",
  "개선 및 검증",
  "튜브 소재 특성에 맞춰 설비 온도 파라미터를 개별 분리해 설정했습니다. 초기 색상 차이는 내전압에 영향이 없음을 교차 검증하여 품질 부서의 양품 승인을 확인했습니다.",
  "유지 관리 및 표준화",
  "소재별 수축 레시피와 한도 견본을 문서 및 보드에 등록했습니다. 장기 신뢰성 평가는 개발 부서의 후속 과제로 이관했습니다.",
  "양산 안정화 결과",
  "구분\t결과",
  "실질 양품수율\t약 40% → 98.7% · 2024년 12월 월평균 · 총 양품÷총 투입 · 팀 결과",
  "직접 책임\t조립공정 시험방향, 부서별 담당·기한·재시험·판정기준 운영",
  "검증 방식\t측정·검사 → Jig·정렬·소모품 → 공정조건 순서의 원인별 재시험",
  "표준화\tMSA 기준·SOP·QCP·P-FMEA·검사기준 직접 개정",
  "유지 확인\t2025년 1~2월 개정조건과 점검기준 현장 적용 확인",
  "초기 기준선은 사후검사에서 완전 양품으로 판정한 수량을 적용했습니다. 98.7%도 같은 분모로 계산한 월평균 실질 양품수율입니다.",
  "현장 표준화",
  "문서·관리항목\t반영내용",
  "MSA 기준\t기준 Sample, 반복측정, 교정·유지점검과 재확인방법",
  "SOP\t작업순서, Setting, 소모품 교체와 이상 시 조치",
  "QCP\tCTQ, 검사주기, 중점관리항목과 기록방법",
  "P-FMEA\t확인된 실패요인, 현행통제와 예방조치",
  "검사기준\t양품·불량 경계, 재검사와 판정기준",
  "교육·이관\t생산·품질·설비·개발 담당자의 동일 Sample 재시험 방법",
  "금양 재직 중 연계 프로젝트",
  "4695 조립라인 주요 설비 정상화 및 제한 생산 전환: 개발완료 제품의 설비 조건과 제한 생산 시작기준을 다시 세운 사례",
  "25P LFP Power Cell 공정개발 및 고객 Qual: 소재·구조 변경을 시양산으로 연결한 사례",
  "차세대 2170 Tabless 구조 선행 제조 검증: 기존 설비와 임시 Jig로 신규 구조의 제작가능성을 확인한 사례",
  "원통형 배터리 대체 Can 공급사 이원화: 부품 변경을 공정·안전시험과 Pilot 공급전환까지 연결한 사례"
];
  const splitRow = (line) => line.split("\t");
  const setText = (node, value) => {
    if (node) node.textContent = value;
  };
  const replaceTable = (doc, table, lines) => {
    if (!table || !lines.length) return;
    const rows = lines.map(splitRow);
    const thead = doc.createElement("thead");
    const headRow = doc.createElement("tr");
    rows[0].forEach((value) => {
      const th = doc.createElement("th");
      th.textContent = value;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    const tbody = doc.createElement("tbody");
    rows.slice(1).forEach((values) => {
      const tr = doc.createElement("tr");
      values.forEach((value) => {
        const td = doc.createElement("td");
        td.textContent = value;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.replaceChildren(thead, tbody);
  };

  const doc = new DOMParser().parseFromString(project.html, "text/html");
  const article = doc.querySelector("article.portfolio-article");
  const content = article?.querySelector("#post-content");
  if (!article || !content) {
    console.error("[2170 preview] Article structure was not found.");
    return;
  }

  setText(article.querySelector(".portfolio-article__eyebrow"), revised[0]);
  setText(article.querySelector(".portfolio-article__stage"), revised[1]);
  setText(article.querySelector(".portfolio-article__header h1"), revised[2]);
  setText(article.querySelector(".portfolio-article__lead"), revised[3]);
  const metaTerms = article.querySelectorAll(".portfolio-case-meta dt");
  const metaValues = article.querySelectorAll(".portfolio-case-meta dd");
  [[0,4],[1,6],[2,8]].forEach(([i,j]) => setText(metaTerms[i], revised[j]));
  [[0,5],[1,7],[2,9]].forEach(([i,j]) => setText(metaValues[i], revised[j]));
  setText(article.querySelector(".portfolio-case-summary h2"), revised[10]);
  const summaryTerms = article.querySelectorAll(".portfolio-case-summary dt");
  const summaryValues = article.querySelectorAll(".portfolio-case-summary dd");
  [[0,11],[1,13],[2,15]].forEach(([i,j]) => setText(summaryTerms[i], revised[j]));
  [[0,12],[1,14],[2,16]].forEach(([i,j]) => setText(summaryValues[i], revised[j]));
  setText(article.querySelector(".portfolio-case-metrics span"), revised[17]);
  setText(article.querySelector(".portfolio-case-metrics strong"), revised[18]);
  setText(article.querySelector(".portfolio-case-visual figcaption"), revised[19]);

  const initial = [...content.children];
  setText(initial[0], revised[20]);
  setText(initial[1], revised[21]);
  setText(initial[2], revised[22]);
  setText(initial[3], revised[23]);
  setText(initial[4], revised[24]);
  replaceTable(doc, initial[5], revised.slice(25,31));
  setText(initial[6], revised[31]);
  replaceTable(doc, initial[7], revised.slice(32,37));
  setText(initial[8], revised[37]);
  setText(initial[9], revised[38]);
  setText(initial[10], revised[39]);
  const rail = initial[11];
  setText(rail.querySelector("figcaption span"), revised[40]);
  setText(rail.querySelector("figcaption strong"), revised[41]);
  setText(rail.querySelector("figcaption small"), revised[42]);
  [...rail.querySelectorAll("ol > li")].forEach((li, i) => {
    const offset = 43 + i * 3;
    setText(li.querySelector(".portfolio-logic-rail__index"), revised[offset]);
    setText(li.querySelector("b"), revised[offset + 1]);
    setText(li.querySelector("strong"), revised[offset + 2]);
  });
  setText(initial[12], revised[61]);
  replaceTable(doc, initial[13], revised.slice(62,69));
  setText(initial[14], revised[69]);

  const casePattern = /^사례 \d{2}\./;
  const caseStarts = revised.flatMap((line, index) => casePattern.test(line) ? [index] : []);
  const extraIndex = revised.indexOf("추가 후공정 관리사례");
  const resultsIndex = revised.indexOf("양산 안정화 결과");
  const caseSections = [...content.querySelectorAll("section.portfolio-analysis-case")];
  const analysisPattern = /^[45]M(?:\+1E)? 분석$/;

  const parseCase = (startIndex, caseNumber) => {
    const nextCase = caseStarts[caseNumber + 1] ?? resultsIndex;
    let endIndex = nextCase;
    if (extraIndex > startIndex && extraIndex < endIndex) endIndex = extraIndex;
    const block = revised.slice(startIndex, endIndex);
    const analysisAt = block.findIndex((line, i) => i > 7 && analysisPattern.test(line));
    const tableAt = analysisAt + 1;
    let afterTable = tableAt + 1;
    while (afterTable < block.length && block[afterTable].includes("\t")) afterTable += 1;
    return {
      pageTitle: block[0],
      number: block[1],
      axis: block[2],
      title: block[3],
      summary: block[4],
      findingTitle: block[5],
      findingText: block[6],
      measureTitle: block[7],
      bullets: block.slice(8, analysisAt),
      analysisTitle: block[analysisAt],
      tableLines: block.slice(tableAt, afterTable),
      improveTitle: block[afterTable],
      improveText: block[afterTable + 1],
      controlTitle: block[afterTable + 2],
      controlText: block[afterTable + 3]
    };
  };

  caseSections.forEach((section, index) => {
    const data = parseCase(caseStarts[index], index);
    setText(section.previousElementSibling, data.pageTitle);
    setText(section.querySelector(".portfolio-analysis-case__number"), data.number);
    setText(section.querySelector(".portfolio-analysis-case__header p"), data.axis);
    setText(section.querySelector(".portfolio-analysis-case__header h2"), data.title);
    setText(section.querySelector(".portfolio-analysis-case__header div > span"), data.summary);
    const body = section.querySelector(".portfolio-analysis-case__body");
    const headings = body.querySelectorAll(":scope > h3");
    const paragraphs = body.querySelectorAll(":scope > p");
    [data.findingTitle, data.measureTitle, data.analysisTitle, data.improveTitle, data.controlTitle]
      .forEach((value, i) => setText(headings[i], value));
    [data.findingText, data.improveText, data.controlText]
      .forEach((value, i) => setText(paragraphs[i], value));
    const list = body.querySelector(":scope > ul");
    if (list) {
      list.replaceChildren(...data.bullets.map((value) => {
        const li = doc.createElement("li");
        li.textContent = value;
        return li;
      }));
    }
    replaceTable(doc, body.querySelector(":scope > table"), data.tableLines);
  });

  if (extraIndex >= 0 && caseSections[6] && caseSections[7]) {
    let node = caseSections[6].nextElementSibling;
    while (node && node !== caseSections[7].previousElementSibling) {
      if (node.tagName === "H2") setText(node, revised[extraIndex]);
      if (node.tagName === "P") setText(node, revised[extraIndex + 1]);
      node = node.nextElementSibling;
    }
  }

  let node = caseSections.at(-1)?.nextElementSibling;
  const tail = [];
  while (node) {
    tail.push(node);
    node = node.nextElementSibling;
  }
  if (tail.length >= 7) {
    setText(tail[0], revised[resultsIndex]);
    replaceTable(doc, tail[1], revised.slice(resultsIndex + 1, resultsIndex + 7));
    setText(tail[2], revised[resultsIndex + 7]);
    setText(tail[3], revised[resultsIndex + 8]);
    replaceTable(doc, tail[4], revised.slice(resultsIndex + 9, resultsIndex + 16));
    setText(tail[5], revised[resultsIndex + 16]);
    const linked = revised.slice(resultsIndex + 17, resultsIndex + 21);
    const items = tail[6].querySelectorAll(":scope > li");
    [...items].forEach((li, i) => {
      const value = linked[i] ?? "";
      const separator = value.indexOf(": ");
      const title = separator >= 0 ? value.slice(0, separator) : value;
      const detail = separator >= 0 ? value.slice(separator + 2) : "";
      const oldLink = li.querySelector("a");
      const href = oldLink?.getAttribute("href") ?? "#gallery";
      const link = doc.createElement("a");
      link.setAttribute("href", href);
      link.textContent = title;
      li.replaceChildren(link, doc.createTextNode(detail ? ": " + detail : ""));
    });
  }

  project.title = revised[2];
  project.html = article.outerHTML;
})();
