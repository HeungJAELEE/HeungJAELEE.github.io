(() => {
  "use strict";

  const app = document.querySelector("#app");
  const configuredProjects = window.PROJECT_DEMOS || [];
  const preservedByLocale = Object.freeze({
    ko: window.PRESERVED_PROJECT_CONTENT || {},
    en: window.PRESERVED_PROJECT_CONTENT_EN || {}
  });
  const configuredById = new Map(configuredProjects.map((project) => [project.id, project]));
  const configuredEnglishById = new Map([
    ["ncm-fat-sat", {
      title: "NCM Pilot Line Handover",
      summary: {
        problem: "There was a gap between the equipment supplier's declaration of functional completion and the point at which pilot production could actually run.",
        role: "I connected the acceptance criteria for 11 core systems and 13 major processes with FAT/SAT inspection, punch-list retesting, and initial production operations.",
        outcome: "Over about five days, approximately 1,000 cells were produced; the initial assembly result was about 95%, and the operating documents were handed over."
      },
      lead: "I converted the supplier's functional-completion notice into an accepted state in which actual cells could be produced repeatedly."
    }],
    ["robot-overhaul-standardization", {
      title: "Vacuum Robot Overhaul Standardization",
      summary: {
        problem: "Without a parts list or assembly and inspection standards, alignment error, leakage, load alarms, and teaching errors could recur.",
        role: "I handled teardown analysis, precision assembly, alignment and encoder-zero setting, FARO and helium-leak checks, load-cycle tests, and operator training.",
        outcome: "I established the parts list, SOP, check sheets, and OJT system used for initial qualification and repeat overhauls."
      },
      lead: "I organized the differences between failed and normal units by failure mode and converted assembly, alignment, leak, and load testing into standard work."
    }],
    ["diffuser-scaleup-failure", {
      title: "Diffuser Scale-Up Production Introduction Failure",
      summary: {
        problem: "Because exhaust-infrastructure constraints forced scale-up with water and ultrasonics instead of chemicals, surface-damage and particle risks appeared.",
        role: "I used lab and full-size trials plus roughness, microscopy, SEM–EDS, and particle analysis to confirm the damage mechanism and structural limits.",
        outcome: "The scale-up was stopped and the previous process restored; design, quality, and EHS gates were defined for the next R&D stage."
      },
      lead: "I prioritized surface damage, particles, reusability, and EHS over cycle-time reduction and documented the scale-up stop criteria."
    }],
    ["welding-vision-ai", {
      title: "Welding Vision AI Decision Criteria",
      summary: {
        problem: "Differences in lighting, background, and distance between training images and directly captured images made report-level performance alone insufficient to explain field decision readiness.",
        role: "I planned the project, modeled the AI, evaluated field-representative samples, and established threshold-based miss and false-positive criteria.",
        outcome: "The team connected the FastAPI and PWA demo flow; I compared recall and FPR on a limited evaluation set and defined field-oriented decision criteria."
      },
      lead: "Instead of optimizing a single accuracy score, I designed decision criteria that separate defects that must not be missed from cases requiring reinspection in field images."
    }],
    ["giga-press-dx", {
      title: "GIGA Press Virtual Factory Expansion",
      summary: {
        problem: "Equipment operation, control signals, monitoring screens, and production history were separated, making it difficult to evaluate expansion scenarios against the same data.",
        role: "I handled project planning and report writing, the OPC UA and data-collection segment, production-metric definitions, and the link between Digital Twin data and the analytical model.",
        outcome: "The team verified end-to-end communication from Factory I/O through PLC, SCADA, and SQLite, and identified an approximately one-second delay at the T-junction as a bottleneck candidate."
      },
      lead: "I linked virtual-equipment signals through PLC, OPC UA, SCADA, and historical data to create a scenario for reviewing production flow and bottlenecks before factory expansion."
    }],
    ["robot-json-omniverse", {
      title: "Indy7 Digital Twin",
      summary: {
        problem: "Teaching coordinates, programs, and I/O were split across the pendant and separate files, making PC editing, execution-history review, and Twin integration difficult.",
        role: "I planned the project and implemented the Robot A/B/C work sequence, Teaching JSON, PC HMI, controller connection, and forward-kinematics Twin.",
        outcome: "The team completed an integrated demonstration from QR verification through Robot A, Vision, Robot B, Vision, and Robot C, connecting robot-data editing, execution, and status review."
      },
      lead: "I implemented a team system that exports robot Teaching data to JSON for PC editing and connects controller execution status with a read-only Web Twin."
    }],
    ["ontology-construction", {
      title: "Manufacturing Knowledge Search LLM Wiki",
      summary: {
        problem: "Process, equipment, and quality knowledge was split across documents and projects, so the same relationships had to be found and organized repeatedly.",
        role: "I built the Markdown and YAML knowledge registry, Graphfy relationship graph, incremental RAG and search/reranking flow, local-model drafts, and review gate.",
        outcome: "I converted fragmented knowledge relationships into a connected graph and locally generated and reviewed three manufacturing-review drafts with supporting search evidence."
      },
      lead: "I implemented a local search structure that links dispersed manufacturing documents through shared relationships, retrieves relevant evidence, and drafts material for engineer review."
    }],
    ["ai-authority-evidence-plane", {
      title: "AX Transformation AI Agent Platform",
      summary: {
        problem: "Each manufacturing decision required time, lot, tag, and quality criteria to be reconciled again, while the evidence and authority behind analytical actions were difficult to trace.",
        role: "I directly designed the product definition, data and integration architecture, process/quality/production analysis, separation of control from analysis, and approval, readback, and recovery gates.",
        outcome: "I assembled the document-writing function, validator, and implementation-to-verification bindings as a local foundation, while separating the gates required for an operational runtime transition."
      },
      lead: "Rather than stopping at a screen that aggregates MES, PLC, quality, and standard information, I designed a structure that verifies evidence and authority before execution under human approval."
    }]
  ]);

  const localeCopy = Object.freeze({
    ko: {
      documentTitle: "이재흥 포트폴리오",
      galleryDocumentTitle: "이재흥 포트폴리오 프로젝트 디자인 시안",
      metaDescription: "제조·DX·AI 프로젝트 유형별 상세 페이지 디자인 시안",
      skipLink: "본문으로 바로가기",
      brandName: "이재흥",
      brandAria: "포트폴리오 메인으로 이동",
      navAria: "포트폴리오 탐색",
      nav: { about: "소개", projects: "프로젝트", experience: "경력", skills: "핵심 역량", education: "교육", cases: "기술사례" },
      groups: { manufacturing: "제조 성과", judgment: "실패 사례", dx: "제조 DX", ax: "제조 AX", personal: "개인 프로젝트" },
      companies: {
        "amat-akt-qual": "와이엠씨", "battery-2170-pilot": "금양", "battery-25p-lfp-development": "금양",
        "battery-4695-production-transition": "금양", "battery-tabless-concept": "금양", "can-supplier-pilot-transition": "금양",
        "diffuser-scaleup-failure": "와이엠씨", "mixed-acid-bath-analysis": "와이엠씨", "ncm-fat-sat": "제이스텍",
        "ncm-pre-forming-validation": "제이스텍", "oled-anodizing-development": "와이엠씨",
        "robot-overhaul-standardization": "와이엠씨·본테크", "wet-process-standardization": "와이엠씨"
      },
      personalTypes: { "ai-seolbi-learning-platform": "학습 서비스", "ai-unemployment-qna": "안내 서비스" },
      approvedTitles: {
        "amat-akt-qual": "글로벌 장비사 기술&품질 Qual Audit 승인",
        "battery-2170-pilot": "2170 양산 수율 안정화",
        "battery-25p-lfp-development": "LFP Power Cell 개발",
        "battery-4695-production-transition": "4695 조립 라인 정상화 및 양산 체제 구축",
        "battery-tabless-concept": "2170 Tabless 셀 개발 (Pilot Lv)",
        "can-supplier-pilot-transition": "2170 Can 공급사 이원화 프로젝트",
        "diffuser-scaleup-failure": "Diffuser Scale-up 양산 도입 실패사례",
        "ncm-pre-forming-validation": "Short 방지를 위한 신규 공정 개발",
        "ai-authority-evidence-plane": "AX 전환 AI Agent 플랫폼",
        "deep-learning-modeling": "제조 현장 AI 모델 가이드북",
        "ontology-construction": "제조 지식 검색 LLM WIKI",
        "wet-process-standardization": "표면처리 프로젝트 요약"
      }
    },
    en: {
      documentTitle: "Jaeheung Lee Portfolio",
      galleryDocumentTitle: "Jaeheung Lee Portfolio Project Design Preview",
      metaDescription: "Design previews for manufacturing, DX, and AI project case pages",
      skipLink: "Skip to main content",
      brandName: "Jaeheung Lee",
      brandAria: "Go to the portfolio home",
      navAria: "Portfolio navigation",
      nav: { about: "About", projects: "Projects", experience: "Experience", skills: "Core Skills", education: "Education", cases: "Technical Cases" },
      groups: { manufacturing: "Manufacturing Results", judgment: "Failure Case", dx: "Manufacturing DX", ax: "Manufacturing AX", personal: "Personal Projects" },
      companies: {
        "amat-akt-qual": "YMC", "battery-2170-pilot": "Kumyang", "battery-25p-lfp-development": "Kumyang",
        "battery-4695-production-transition": "Kumyang", "battery-tabless-concept": "Kumyang", "can-supplier-pilot-transition": "Kumyang",
        "diffuser-scaleup-failure": "YMC", "mixed-acid-bath-analysis": "YMC", "ncm-fat-sat": "Jastech",
        "ncm-pre-forming-validation": "Jastech", "oled-anodizing-development": "YMC",
        "robot-overhaul-standardization": "YMC · Bontech", "wet-process-standardization": "YMC"
      },
      personalTypes: { "ai-seolbi-learning-platform": "Learning Service", "ai-unemployment-qna": "Information Service" },
      approvedTitles: {
        "amat-akt-qual": "Global Equipment-Maker Technical & Quality Qual Audit Approval",
        "battery-2170-pilot": "2170 Mass-Production Yield Stabilization",
        "battery-25p-lfp-development": "LFP Power Cell Development",
        "battery-4695-production-transition": "4695 Assembly-Line Recovery and Production Readiness",
        "battery-tabless-concept": "2170 Tabless Cell Development (Pilot Lv)",
        "can-supplier-pilot-transition": "2170 Can Supplier Dual-Sourcing Project",
        "diffuser-scaleup-failure": "Diffuser Scale-Up Production Introduction Failure",
        "giga-press-dx": "GIGA Press Virtual Factory Expansion",
        "ncm-fat-sat": "NCM Pilot Line Handover",
        "ncm-pre-forming-validation": "New Process Development for Short Prevention",
        "robot-json-omniverse": "Indy7 Digital Twin",
        "robot-overhaul-standardization": "Vacuum Robot Overhaul Standardization",
        "welding-vision-ai": "Welding Vision AI Decision Criteria",
        "ai-authority-evidence-plane": "AX Transformation AI Agent Platform",
        "deep-learning-modeling": "Manufacturing-Site AI Model Guidebook",
        "ontology-construction": "Manufacturing Knowledge Search LLM Wiki",
        "wet-process-standardization": "Surface-Treatment Project Summary"
      }
    }
  });

  const interfaceCopy = Object.freeze({
    ko: {
      personalProject: "개인 프로젝트",
      cardReference: "기준 시안 보기",
      cardDetail: "상세 시안 보기",
      filters: { manufacturing: "제조 성과", judgment: "실패 사례", dx: "제조 DX", ax: "제조 AX", personal: "개인 프로젝트" },
      allProjects: (count) => `전체 ${count}건 프로젝트`,
      galleryHeading: "문제를 어떻게 판단하고<br>실행했는지 보여줍니다.",
      galleryLead: "단순한 결과 나열을 넘어, 문제를 정의하고 원인을 분석해 실행·검증한 과정을 중심으로 구성했습니다. 제조 공정 개선, 설비 인수, 원인 분석, 팀 DX, 개인 AI 도입 등 프로젝트 성격에 따라 문제 접근 방식도 다르게 제시합니다.",
      frameworkAria: "핵심 문제 해결 체계",
      framework: [
        ["Define:", "직면한 문제와 책임 범위(R&R)를 명확히 정의"],
        ["Analyze & Verify:", "4M과 데이터를 바탕으로 원인을 분석하고 기술 선택과 공정 조건을 검증"],
        ["Result & Next Gate:", "성과와 결과물을 정리하고 후속 적용 방향과 배운 점을 구분"]
      ],
      filterAria: "프로젝트 유형 필터",
      galleryAria: "프로젝트 상세 디자인 시안",
      galleryFooter: "로컬 디자인 검토용 시안 · 운영 포트폴리오에는 아직 반영하지 않았습니다.",
      tableSuffix: " 표",
      tocAria: "페이지 목차",
      tableScrollAria: "표 가로 스크롤 영역",
      homeHeroTitle: "현장의 문제를 데이터로 풀어내는 제조·공정 엔지니어입니다.",
      homeHeroTitleLines: ["현장의 문제를 데이터로", "풀어내는 제조·공정", "엔지니어입니다."],
      homeHeroDescription: "지난 9년 4개월 동안 이차전지, 반도체 부품, 진공로봇 제조 현장에서 설비를 셋업하고 공정 불량을 개선하는 일을 해왔습니다. 특히 2170 배터리 조립 라인에서는 측정 기준부터 바로잡아, 40%대였던 양품 수율을 98.7%까지 끌어올리며 양산을 안정화시킨 경험이 있습니다. 감에 의존하기보다 데이터와 4M 기준을 믿습니다. 최근에는 현장에서 쌓은 노하우에 Python과 Vision AI 등 데이터 분석 기술을 더해, 제조 업무를 더 스마트하게 해결하는 방향으로 영역을 넓혀가고 있습니다.",
      portraitDomain: "배터리·디스플레이·진공로봇 Domain지식",
      yieldChartStartLabel: "실질 수율",
      yieldChartEndLabel: "6개월 뒤",
      yieldChartTitle: "2170 실질 양품수율 변화",
      yieldChartDescription: "초기 약 40%와 6개월 뒤 98.7%의 두 측정값을 선으로 연결한 그래프입니다.",
      featuredDescription: "제조 개선과 데이터 활용을 다룬 핵심 프로젝트 6건입니다.",
      featuredNote: "대표 프로젝트 6건을 먼저 보여드립니다. 전체 프로젝트는 기술사례 목록에서 확인할 수 있습니다.",
      detailDocumentSuffix: "원문 보존 디자인 시안",
      backToGallery: "전체 시안으로 돌아가기",
      detailFooter: "현재 포트폴리오 원문·섹션·표·도식을 보존한 로컬 디자인 시안",
      otherProjects: "다른 프로젝트 시안 보기 →",
      fallbackDocumentSuffix: "디자인 시안",
      summaryLabels: ["문제", "내 역할", "확인 결과"],
      overviewAria: "프로젝트 개요",
      summaryAria: "30초 요약",
      metricAria: "대표 수치",
      limitLabel: "확인 범위",
      fallbackFooter: "로컬 디자인 검토용 · 사실 범위와 역할 경계를 보존한 시안",
      notFoundTitle: "시안을 찾을 수 없음",
      notFoundHeading: "해당 시안을 찾을 수 없습니다.",
      requestedId: "요청한 ID",
      fourMHeaders: ["분석대상", "추정원인", "확인결과", "조치사항"],
      verdictLabel: "판정"
    },
    en: {
      personalProject: "Personal Project",
      cardReference: "View Reference Design",
      cardDetail: "View Case Design",
      filters: { manufacturing: "Manufacturing Results", judgment: "Failure Case", dx: "Manufacturing DX", ax: "Manufacturing AX", personal: "Personal Projects" },
      allProjects: (count) => `All ${count} Projects`,
      galleryHeading: "How I assessed each problem<br>and carried it through execution.",
      galleryLead: "Rather than listing results alone, this portfolio shows how each problem was defined, analyzed, executed, and verified. The approach changes with the work: process improvement, equipment handover, failure analysis, team DX, or a personal AI project.",
      frameworkAria: "Core problem-solving framework",
      framework: [
        ["Define:", "Define the problem and the boundary of responsibility (R&R)"],
        ["Analyze & Verify:", "Use 4M and data to analyze causes and verify the selected technology and process conditions"],
        ["Result & Next Gate:", "Separate the result and deliverables from lessons learned and the next application direction"]
      ],
      filterAria: "Project-type filter",
      galleryAria: "Project case design previews",
      galleryFooter: "Local design-review preview · Not yet applied to the live portfolio.",
      tableSuffix: " table",
      tocAria: "Page contents",
      tableScrollAria: "Horizontally scrollable table",
      homeHeroTitle: "I am a manufacturing and process engineer who solves shop-floor problems with data.",
      homeHeroTitleLines: ["I am a manufacturing and process engineer", "who solves shop-floor problems", "with data."],
      homeHeroDescription: "Over the past 9 years and 4 months, I have set up equipment and improved process defects across battery, semiconductor-component, and vacuum-robot manufacturing. On a 2170 battery assembly line, I started by correcting the measurement criteria and helped stabilize mass production by raising good-product yield from the 40% range to 98.7%. I rely on data and the 4M framework rather than intuition. More recently, I have been combining that shop-floor expertise with Python, Vision AI, and data analysis to solve manufacturing work more intelligently.",
      portraitDomain: "Domain knowledge in batteries, displays, and vacuum robots",
      yieldChartStartLabel: "Actual yield",
      yieldChartEndLabel: "Six months later",
      yieldChartTitle: "Change in actual good-cell yield for the 2170 line",
      yieldChartDescription: "A line connects the two measured values: about 40% initially and 98.7% six months later.",
      featuredDescription: "Six selected projects in manufacturing improvement and data application.",
      featuredNote: "These six projects are shown first. The complete portfolio is available under Technical Cases.",
      detailDocumentSuffix: "Source-Preserving Design Preview",
      backToGallery: "Back to All Case Designs",
      detailFooter: "Local design preview preserving the current portfolio text, sections, tables, and diagrams",
      otherProjects: "View Other Project Designs →",
      fallbackDocumentSuffix: "Design Preview",
      summaryLabels: ["Problem", "My Role", "Verified Result"],
      overviewAria: "Project overview",
      summaryAria: "30-second summary",
      metricAria: "Key metrics",
      limitLabel: "Verified Scope",
      fallbackFooter: "Local design-review preview · Preserves the verified facts and role boundaries",
      notFoundTitle: "Design Not Found",
      notFoundHeading: "The requested design could not be found.",
      requestedId: "Requested ID",
      fourMHeaders: ["Analysis Target", "Suspected Cause", "Verification Result", "Corrective Action"],
      verdictLabel: "Decision"
    }
  });

  const requestedLocale = new URLSearchParams(location.search).get("lang");
  let locale = requestedLocale === "en" ? "en" : "ko";
  let groupLabels = localeCopy[locale].groups;
  let projectCompany = localeCopy[locale].companies;
  let personalProjectType = localeCopy[locale].personalTypes;
  let approvedProjectTitles = localeCopy[locale].approvedTitles;
  let preservedProjects = preservedByLocale[locale];
  let preservedHome = preservedProjects.__home;

  const ui = () => interfaceCopy[locale];

  const projectPeriod = Object.freeze({
    "amat-akt-qual": "2017.12–2018.12",
    "battery-2170-pilot": "2024.05–2025.02",
    "battery-25p-lfp-development": "2025.01–2025.03",
    "battery-4695-production-transition": "2025.02–2025.09",
    "battery-tabless-concept": "2025.01",
    "can-supplier-pilot-transition": "2025.01–2025.03",
    "diffuser-scaleup-failure": "2018.10–2019.12",
    "mixed-acid-bath-analysis": "2017.07–2018.06",
    "ncm-fat-sat": "2023.05–2023.11",
    "ncm-pre-forming-validation": "2023.11–2024.05",
    "oled-anodizing-development": "2017.01–2018.10",
    "robot-overhaul-standardization": "2019.10–2022.03",
    "wet-process-standardization": "2016.03–2021.01"
  });

  const projectOrderByFilter = Object.freeze({
    all: ["battery-2170-pilot", "ncm-fat-sat", "amat-akt-qual", "ai-authority-evidence-plane"],
    manufacturing: ["battery-2170-pilot", "battery-4695-production-transition", "ncm-fat-sat", "wet-process-standardization"],
    ax: ["ai-authority-evidence-plane", "deep-learning-modeling", "ontology-construction"],
    personal: ["ai-seolbi-learning-platform", "ai-unemployment-qna"]
  });

  function inferProjectGroup(id) {
    if (id === "diffuser-scaleup-failure") return "judgment";
    if (["cell-production-tracking", "giga-press-dx", "robot-json-omniverse", "welding-vision-ai"].includes(id)) return "dx";
    if (["ai-authority-evidence-plane", "deep-learning-modeling", "ontology-construction"].includes(id)) return "ax";
    if (["ai-seolbi-learning-platform", "ai-unemployment-qna"].includes(id)) return "personal";
    return "manufacturing";
  }

  function inferStageTone(stage) {
    if (/중단|실패|GATE-STOP|STOPPED|FAIL(?:ED|URE)?/i.test(stage)) return "stop";
    if (/양산|완료|결과|표준화|QUAL|PRODUCTION|COMPLETED|RESULT|STANDARDI[ZS]ED|APPROVED/i.test(stage)) return "pass";
    return "pilot";
  }

  function projectFromPreserved(id, entry, index) {
    const template = document.createElement("template");
    template.innerHTML = entry.html.trim();
    const article = template.content.querySelector(".portfolio-article");
    const sourceTitle = article?.querySelector(".portfolio-article__header h1")?.textContent.trim() || id;
    const stage = article?.querySelector(".portfolio-article__stage")?.textContent.trim() || "PROJECT";
    const group = inferProjectGroup(id);
    return {
      id,
      code: `P${String(index + 1).padStart(2, "0")}`,
      group,
      templateName: article?.querySelector(".portfolio-article__eyebrow")?.textContent.trim() || (locale === "ko" ? "프로젝트 상세" : "Project Detail"),
      title: approvedProjectTitles[id] || sourceTitle,
      stage,
      stageTone: inferStageTone(stage),
      lead: article?.querySelector(".portfolio-article__lead")?.textContent.trim() || (locale === "ko" ? "현재 공개 사례의 전체 본문을 보존한 상세 페이지입니다." : "This detail page preserves the complete text of the current public case."),
      company: projectCompany[id] || "",
      catalogPeriod: projectPeriod[id] || "",
      featured: id === "battery-2170-pilot"
    };
  }

  let projects = [];
  let galleryProjects = [];
  let originalProjectOrder = new Map();
  let activeFilter = "all";

  function rebuildLocalizedProjects() {
    const current = localeCopy[locale];
    groupLabels = current.groups;
    projectCompany = current.companies;
    personalProjectType = current.personalTypes;
    approvedProjectTitles = current.approvedTitles;
    preservedProjects = preservedByLocale[locale] || preservedByLocale.ko;
    preservedHome = preservedProjects.__home;
    projects = Object.entries(preservedProjects)
      .filter(([id]) => id !== "__home" && Object.hasOwn(preservedByLocale.ko, id))
      .map(([id, entry], index) => {
        const configured = locale === "ko" ? configuredById.get(id) : configuredEnglishById.get(id);
        const merged = { ...projectFromPreserved(id, entry, index), ...(configured || {}), id, external: undefined };
        return {
          ...merged,
          group: inferProjectGroup(id),
          company: projectCompany[id] || merged.company || "",
          catalogPeriod: projectPeriod[id] || merged.catalogPeriod || ""
        };
      });
    galleryProjects = projects;
    originalProjectOrder = new Map(galleryProjects.map((project, index) => [project.id, index]));
  }

  rebuildLocalizedProjects();

  function buildLocaleHref(nextLocale) {
    const url = new URL(location.href);
    url.searchParams.set("lang", nextLocale);
    url.hash = location.hash || "#home";
    return `${url.pathname}${url.search}${url.hash}`;
  }

  function updateStaticChrome() {
    const current = localeCopy[locale];
    document.documentElement.lang = locale;
    document.querySelector("#page-description")?.setAttribute("content", current.metaDescription);
    const skipLink = document.querySelector("#skip-link");
    if (skipLink) skipLink.textContent = current.skipLink;
    const brand = document.querySelector("#brand-link");
    if (brand) brand.setAttribute("aria-label", current.brandAria);
    const brandName = document.querySelector("#brand-name");
    if (brandName) brandName.textContent = current.brandName;
    const navigation = document.querySelector("#header-nav");
    if (navigation) navigation.setAttribute("aria-label", current.navAria);
    document.querySelectorAll("[data-nav-key]").forEach((link) => {
      const label = current.nav[link.dataset.navKey];
      if (label) link.textContent = label;
    });
    document.querySelectorAll("[data-language]").forEach((link) => {
      const linkLocale = link.dataset.language;
      const active = linkLocale === locale;
      link.href = buildLocaleHref(linkLocale);
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function setLocale(nextLocale) {
    if (!Object.hasOwn(preservedByLocale, nextLocale) || nextLocale === locale) return;
    locale = nextLocale;
    const url = new URL(location.href);
    url.searchParams.set("lang", locale);
    history.replaceState(null, "", `${url.pathname}${url.search}${url.hash || "#home"}`);
    rebuildLocalizedProjects();
    updateStaticChrome();
    app.replaceChildren();
    route();
  }

  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const projectHref = (project) => project.external || `#${encodeURIComponent(project.id)}`;

  function setHomeStyles(enabled) {
    const existing = document.querySelector("#home-source-styles");
    const layoutOverrides = document.querySelector("#home-layout-overrides");
    if (!enabled) {
      existing?.remove();
      layoutOverrides?.remove();
      return;
    }
    if (!existing) {
      const link = document.createElement("link");
      link.id = "home-source-styles";
      link.rel = "stylesheet";
      link.href = "./vendor/home-source.css";
      document.head.append(link);
    }
    if (!layoutOverrides) {
      const style = document.createElement("style");
      style.id = "home-layout-overrides";
      style.textContent = ".preserved-home .portfolio-capability-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;width:100%!important;max-width:none!important;gap:0!important}.preserved-home .portfolio-capability-grid>.portfolio-capability{grid-column:auto!important;width:auto!important;max-width:none!important;min-width:0!important;height:100%!important;margin:0!important;justify-self:stretch!important;align-self:stretch!important;transform:none!important}@media(max-width:679px){.preserved-home .portfolio-capability-grid{grid-template-columns:minmax(0,1fr)!important}}";
      document.head.append(style);
    }
  }

  function orderProjects(items, filter) {
    const priority = new Map((projectOrderByFilter[filter] || []).map((id, index) => [id, index]));
    return [...items].sort((left, right) => {
      const leftPriority = priority.has(left.id) ? priority.get(left.id) : Number.MAX_SAFE_INTEGER;
      const rightPriority = priority.has(right.id) ? priority.get(right.id) : Number.MAX_SAFE_INTEGER;
      const personalTail = filter === "all" ? Number(left.group === "personal") - Number(right.group === "personal") : 0;
      return leftPriority - rightPriority || personalTail || originalProjectOrder.get(left.id) - originalProjectOrder.get(right.id);
    });
  }

  function getCardSecondaryLabel(project) {
    if (["manufacturing", "judgment"].includes(project.group)) {
      return [project.company, project.catalogPeriod].filter(Boolean).join(" · ");
    }
    if (project.group === "ax") return ui().personalProject;
    if (project.group === "personal") return personalProjectType[project.id] || ui().personalProject;
    return project.templateName;
  }

  function renderCard(project, index) {
    const secondaryLabel = getCardSecondaryLabel(project);
    return `
      <article class="demo-card" data-group="${escapeHtml(project.group)}" data-featured="${project.featured ? "true" : "false"}">
        <div class="demo-card-top">
          <span class="demo-card-index">${escapeHtml(String(index + 1).padStart(2, "0"))} / ${escapeHtml(project.code)}</span>
          <span class="status ${escapeHtml(project.stageTone || "")}">${escapeHtml(project.stage)}</span>
        </div>
        <h2>${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.lead)}</p>
        <div class="demo-card-foot">
          <span class="template-label">
            <span>${escapeHtml(groupLabels[project.group])}</span>
            <span class="template-secondary">${escapeHtml(secondaryLabel)}</span>
          </span>
          <a class="open-label" href="${escapeHtml(projectHref(project))}">${project.external ? ui().cardReference : ui().cardDetail}</a>
        </div>
      </article>`;
  }

  function renderGallery() {
    setHomeStyles(false);
    document.title = localeCopy[locale].galleryDocumentTitle;
    const visible = orderProjects(
      galleryProjects.filter((project) => activeFilter === "all" || project.group === activeFilter),
      activeFilter
    );
    const filters = [
      ["all", ui().allProjects(galleryProjects.length)],
      ["manufacturing", ui().filters.manufacturing],
      ["judgment", ui().filters.judgment],
      ["dx", ui().filters.dx],
      ["ax", ui().filters.ax],
      ["personal", ui().filters.personal]
    ];

    app.innerHTML = `
      <section class="gallery-hero">
        <div class="shell gallery-hero-inner">
          <div>
            <p class="eyebrow">PROJECT PORTFOLIO</p>
            <h1>${ui().galleryHeading}</h1>
            <p>${escapeHtml(ui().galleryLead)}</p>
          </div>
          <aside class="template-key" aria-label="${escapeHtml(ui().frameworkAria)}">
            <strong>Core Problem-Solving Framework</strong>
            <ol>
              ${ui().framework.map(([label, text]) => `<li><b>${escapeHtml(label)}</b> ${escapeHtml(text)}</li>`).join("")}
            </ol>
          </aside>
        </div>
      </section>
      <div class="shell">
        <div class="filter-bar" role="group" aria-label="${escapeHtml(ui().filterAria)}">
          ${filters.map(([value, label]) => `<button class="filter-button" type="button" data-filter="${value}" aria-pressed="${value === activeFilter}">${label}</button>`).join("")}
        </div>
        <section class="gallery-grid" aria-label="${escapeHtml(ui().galleryAria)}">
          ${visible.map(renderCard).join("")}
        </section>
      </div>
      <footer class="site-footer">
        <div class="shell">${escapeHtml(ui().galleryFooter)}</div>
      </footer>`;

    app.querySelectorAll("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        renderGallery();
      });
    });
  }

  function renderFlow(section) {
    return `<div class="process-flow" style="--count:${section.items.length}">
      ${section.items.map(([code, title, body]) => `
        <div class="process-step">
          <small>${escapeHtml(code)}</small>
          <strong>${escapeHtml(title)}</strong>
          <p>${escapeHtml(body)}</p>
        </div>`).join("")}
    </div>`;
  }

  function renderTable(section) {
    return `<div class="table-wrap" tabindex="0" aria-label="${escapeHtml(section.title + ui().tableSuffix)}">
      <table>
        <thead><tr>${section.columns.map((column) => `<th scope="col">${escapeHtml(column)}</th>`).join("")}</tr></thead>
        <tbody>
          ${section.rows.map((row) => `<tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${escapeHtml(cell)}</th>` : `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>`;
  }

  function renderSplit(section) {
    return `<div class="split-grid">
      ${section.panels.map(([title, items], index) => `
        <section class="split-panel ${index === 1 ? "accent" : ""}">
          <h3>${escapeHtml(title)}</h3>
          <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>`).join("")}
    </div>`;
  }

  function renderArchitecture(section) {
    return `<div class="architecture" style="--count:${section.items.length}">
      ${section.items.map(([code, title, body]) => `
        <div class="architecture-node">
          <small>${escapeHtml(code)}</small>
          <strong>${escapeHtml(title)}</strong>
          <p>${escapeHtml(body)}</p>
        </div>`).join("")}
    </div>`;
  }

  function renderOwnership(section) {
    return `<div class="ownership-grid">
      ${section.columns.map(([title, body], index) => `
        <section class="ownership-column ${index === 1 ? "personal" : ""}">
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(body)}</p>
        </section>`).join("")}
    </div>`;
  }

  function renderOutputs(section) {
    return `<div class="output-grid">
      ${section.items.map(([title, body]) => `
        <div class="output-item">
          <strong>${escapeHtml(title)}</strong>
          <span>${escapeHtml(body)}</span>
        </div>`).join("")}
    </div>`;
  }

  function renderGates(section) {
    return `<div class="gate-list">
      ${section.items.map(([title, body, verdict]) => `
        <div class="gate-row">
          <strong>${escapeHtml(title)}</strong>
          <span>${escapeHtml(body)}</span>
          <em>${escapeHtml(verdict)}</em>
        </div>`).join("")}
    </div>`;
  }

  function renderEvidence(section) {
    return section.assets.map((asset) => `
      <figure class="visual-evidence">
        <img src="${escapeHtml(asset.src)}" alt="${escapeHtml(asset.alt)}" loading="lazy">
        <figcaption>${escapeHtml(asset.caption)}</figcaption>
      </figure>`).join("");
  }

  function renderSectionBody(section) {
    switch (section.kind) {
      case "flow": return renderFlow(section);
      case "table": return renderTable(section);
      case "split": return renderSplit(section);
      case "architecture": return renderArchitecture(section);
      case "ownership": return renderOwnership(section);
      case "outputs": return renderOutputs(section);
      case "gates": return renderGates(section);
      case "evidence": return renderEvidence(section);
      default: return "";
    }
  }

  function buildSourceToc(content) {
    const headings = [...content.querySelectorAll(":scope > h2")];
    if (!headings.length) return null;

    const toc = document.createElement("nav");
    toc.className = "detail-toc source-toc";
    toc.setAttribute("aria-label", ui().tocAria);
    const title = document.createElement("strong");
    title.textContent = "PAGE INDEX";
    toc.append(title);

    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = `source-section-${index + 1}`;
      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.textContent = `${String(index + 1).padStart(2, "0")} ${heading.textContent.trim()}`;
      toc.append(link);
    });

    return toc;
  }

  function findHeading(root, text) {
    return [...root.querySelectorAll("h1, h2, h3")]
      .find((heading) => heading.textContent.trim() === text);
  }

  function createList(items) {
    const list = document.createElement("ul");
    list.className = "manufacturing-cell-list";
    items.forEach((item) => {
      const entry = document.createElement("li");
      entry.textContent = item;
      list.append(entry);
    });
    return list;
  }

  function replaceManufacturingHandoverTable(table) {
    const columns = [
      "구분 (공정 단계)",
      "주관 업무 (직접 책임)",
      "협업 및 지원 (협업 입력)",
      "산출물 (완료 증거)",
      "양산 이관 기준 (인수기준)"
    ];
    const rows = [
      [
        "설비 사양 확정 및 인수 검사",
        ["제품(R&D)·품질 요구사항을 기능·안전·품질·Tact Time 기준의 설비 제작 사양으로 구체화"],
        ["공장·현장 인수검사(FAT/SAT) Check List 도출"],
        ["FAT/SAT 실시 결과", "Punch List(미결 항목) 발행 및 재검수 조건 협의"],
        ["설비업체 Punch 항목 조치 완료", "시운전용 자재와 Sample 투입 확인"]
      ],
      [
        "공정조건(Recipe) 확보 및 Pilot 평가",
        ["양산 Cell 기준 Recipe 설정", "측정·검사 표준과 기준·한도견본(Golden/Limit Sample) 적용"],
        ["품질부서의 Sample 측정·판정", "개발(R&D) 부서의 제품 성능 검증"],
        ["양산 공정조건표", "Sample 평가 결과서", "계측기 측정시스템분석(MSA) 완료"],
        ["Pilot Run 실시", "자재·재공(WIP)·Lot·불량·Rework 이력을 MES 및 일일 생산계획과 연결"]
      ],
      [
        "양산성 검증 및 품질 안정화",
        ["약 5일·약 1,000 Cell Pilot 생산으로 공정 흐름과 초기 조립 결과 확인"],
        ["양산 이관 조건 점검", "이상 발생 시 Hold·Rework·재가동·합불 판정 절차 문서화"],
        ["제조·품질·설비(보전) 유관부서 합동 Review 및 이관 승인"],
        ["표준작업지도서(SOP)", "관리계획서(Control Plan/QCP)", "설비 일상점검표(Check List)", "최종 측정·검사기준서 확정"]
      ]
    ];

    const head = document.createElement("thead");
    const headRow = document.createElement("tr");
    columns.forEach((column) => {
      const cell = document.createElement("th");
      cell.scope = "col";
      cell.textContent = column;
      headRow.append(cell);
    });
    head.append(headRow);

    const body = document.createElement("tbody");
    rows.forEach((row) => {
      const tableRow = document.createElement("tr");
      row.forEach((value, index) => {
        const cell = document.createElement(index === 0 ? "th" : "td");
        if (index === 0) {
          cell.scope = "row";
          cell.textContent = value;
        } else {
          cell.append(createList(value));
        }
        tableRow.append(cell);
      });
      body.append(tableRow);
    });

    table.replaceChildren(head, body);
    table.classList.add("manufacturing-handover-table");
  }

  function normalizeFourMAnalysisTables(article) {
    const factorNames = new Set(["Man", "Machine", "Material", "Method", "Measurement", "Environment"]);
    article.querySelectorAll("table").forEach((table) => {
      const headers = [...table.querySelectorAll("thead th")];
      const rows = [...table.querySelectorAll("tbody tr")];
      if (headers.length !== 5 || rows.length < 4) return;
      const factors = rows.map((row) => row.cells[0]?.textContent.trim());
      if (!["Man", "Machine", "Material", "Method"].every((factor) => factors.includes(factor))) return;
      if (!factors.every((factor) => factorNames.has(factor))) return;

      headers[0].textContent = ui().fourMHeaders[0];
      headers[1].textContent = ui().fourMHeaders[1];
      headers[2].textContent = ui().fourMHeaders[2];
      headers[4].textContent = ui().fourMHeaders[3];
      headers[3].remove();

      rows.forEach((row) => {
        const cells = [...row.cells];
        const evidence = cells[2]?.textContent.trim();
        const verdict = cells[3]?.textContent.trim();
        if (cells[2]) cells[2].textContent = verdict ? `${evidence} · ${ui().verdictLabel}: ${verdict}` : evidence;
        cells[3]?.remove();
      });
      table.classList.add("analysis-4m-table");
    });
  }

  function applyTablessDfmeaTerminology(article) {
    if (locale !== "ko") return;
    const replacements = [
      ["Taguchi Trial Matrix로 비교하며", "DFMEA Root Cause Matrix로 분석하며"],
      ["Taguchi 기반 Trial Matrix로 핵심 조합 비교", "DFMEA Root Cause Matrix로 불량 유형별 원인과 조치 방향 분석"],
      ["Taguchi Trial Matrix의 핵심 설계인자", "DFMEA Root Cause Matrix의 핵심 분석인자"],
      ["Taguchi 기반 Trial Matrix로 약 100개 Trial의 조건조합과 Failure Mode 압축", "DFMEA Root Cause Matrix로 약 100개 Trial의 Failure Mode별 원인과 조치 방향 정리"],
      ["Jig·Laser·조립 인자를 Trial Matrix로 비교해", "Jig·Laser·조립 인자를 Failure Mode별 Root Cause Matrix로 분석해"],
      ["Taguchi 기반 Trial Matrix", "DFMEA Root Cause Matrix"],
      ["Taguchi Trial Matrix", "DFMEA Root Cause Matrix"],
      ["Taguchi Trial", "DFMEA"]
    ];

    const replaceValue = (value) => replacements.reduce(
      (updated, [before, after]) => updated.replaceAll(before, after),
      value
    );
    const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) node.nodeValue = replaceValue(node.nodeValue || "");
    article.querySelectorAll("img[alt]").forEach((image) => {
      image.alt = replaceValue(image.alt);
    });

    const matrixHeading = [...article.querySelectorAll("h2")]
      .find((heading) => heading.textContent.trim() === "DFMEA Root Cause Matrix");
    if (matrixHeading) {
      matrixHeading.textContent = "DFMEA [불량 유형별 근본 원인(Root Cause) 도출 매트릭스]";
      matrixHeading.id = "dfmea-root-cause-matrix";
    }
  }

  function applyApprovedContentAdjustments(project, article) {
    const approvedTitle = locale === "en" || project.id === "battery-tabless-concept"
      ? approvedProjectTitles[project.id]
      : null;
    if (approvedTitle) {
      const title = article.querySelector(".portfolio-article__header h1");
      if (title) title.textContent = approvedTitle;
    }

    article.querySelectorAll("h2").forEach((heading) => {
      const text = heading.textContent.trim();
      if (locale === "ko" && text === "다음 Engineering Gate") {
        heading.textContent = "향후 적용 방향";
        heading.id = "향후-적용-방향";
      }
      if (locale === "en" && text === "Next Engineering Gate") {
        heading.textContent = "Future Application Direction";
        heading.id = "future-application-direction";
      }
    });

    article.querySelectorAll("h2, h3, th, dt").forEach((label) => {
      if (locale === "ko" && label.textContent.trim() === "남긴 기준") label.textContent = "결과물";
    });

    if (project.id === "battery-tabless-concept") applyTablessDfmeaTerminology(article);

    normalizeFourMAnalysisTables(article);

    if (locale !== "ko" || project.id !== "ncm-fat-sat") return;
    const ownershipHeading = findHeading(article, "프로젝트 오너십과 역할");
    if (!ownershipHeading) return;

    ownershipHeading.textContent = "설비 도입 및 양산 이관(Handover) 프로세스";
    ownershipHeading.id = "설비-도입-및-양산-이관-handover-프로세스";
    let table = ownershipHeading.nextElementSibling;
    while (table && table.tagName !== "TABLE" && !/^H[1-3]$/.test(table.tagName)) {
      table = table.nextElementSibling;
    }
    if (table?.tagName === "TABLE") replaceManufacturingHandoverTable(table);
  }

  function replaceDefinitionList(list, items) {
    if (!list || !Array.isArray(items)) return;
    list.replaceChildren(...items.map((item) => {
      const row = document.createElement("div");
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = item.label;
      description.textContent = item.value;
      row.append(term, description);
      return row;
    }));
  }

  function applyExactRevisedContent(project, article) {
    const revisedByLocale = locale === "en"
      ? window.PORTFOLIO_REVISED_CONTENT_EN
      : window.PORTFOLIO_REVISED_CONTENT_KO;
    const revised = revisedByLocale?.[project.id];
    if (!revised) return false;

    const eyebrow = article.querySelector(".portfolio-article__eyebrow");
    const stage = article.querySelector(".portfolio-article__stage");
    const title = article.querySelector(".portfolio-article__header h1");
    const lead = article.querySelector(".portfolio-article__lead");
    if (eyebrow) eyebrow.textContent = revised.eyebrow;
    if (stage) stage.textContent = revised.stage;
    if (title) title.textContent = revised.title;
    if (lead) lead.textContent = revised.lead;

    replaceDefinitionList(article.querySelector(".portfolio-case-meta"), revised.meta);

    const summary = article.querySelector(".portfolio-case-summary");
    const summaryTitle = summary?.querySelector("h2");
    if (summaryTitle) summaryTitle.textContent = revised.summaryTitle;
    replaceDefinitionList(summary?.querySelector("dl"), revised.summary);

    const content = article.querySelector(".portfolio-article__content");
    if (!content) return false;
    content.innerHTML = revised.bodyHtml;
    article.dataset.revisedSourceHash = revised.sourceHash;
    article.dataset.revisedSourceBytes = String(revised.sourceCounts.bytes);
    article.dataset.revisedLocale = locale;
    return true;
  }

  function removeEmptyContentArtifacts(root) {
    if (!root) return;
    const hasMeaningfulContent = (element) => Boolean(
      element.textContent.trim()
      || element.querySelector("img, picture, video, audio, svg, canvas, iframe, .mermaid")
    );

    root.querySelectorAll("tr").forEach((row) => {
      if (!hasMeaningfulContent(row)) row.remove();
    });
    root.querySelectorAll("table").forEach((table) => {
      if (!hasMeaningfulContent(table) || !table.querySelector("tr")) table.remove();
    });
    root.querySelectorAll("p, li, blockquote, pre").forEach((element) => {
      if (!hasMeaningfulContent(element)) element.remove();
    });
    root.querySelectorAll(".table-wrap, .source-table-wrap").forEach((wrapper) => {
      if (!wrapper.querySelector("table") && !hasMeaningfulContent(wrapper)) wrapper.remove();
    });
  }

  function enhanceDmaicProcessFlow(content) {
    const heading = [...content.children]
      .find((element) => element.tagName === "H2" && /DMAIC/i.test(element.textContent.trim()));
    if (!heading || heading.nextElementSibling?.classList.contains("portfolio-logic-rail--dmaic")) return;

    const introduction = heading.nextElementSibling;
    const list = introduction?.nextElementSibling;
    if (!introduction || list?.tagName !== "OL") return;

    const phases = "DEFINE|MEASURE|ANALYZE|IMPROVE|VERIFY|CONTROL";
    const steps = [...list.children].map((item) => {
      const sourceText = item.textContent.trim();
      const visibleText = sourceText.replace(/\*+/g, "");
      const match = visibleText.match(new RegExp(`^(\\d{2})\\s*(${phases})\\s*(.+)$`, "i"));
      return match ? { item, sourceText, index: match[1], phase: match[2], detail: match[3].trim() } : null;
    });
    if (!steps.length || steps.some((step) => !step)) return;

    const figure = document.createElement("figure");
    figure.className = "portfolio-logic-rail portfolio-logic-rail--dmaic";
    figure.dataset.sourceText = introduction.textContent.trim();

    const caption = document.createElement("figcaption");
    const introductionText = introduction.textContent.trim();
    const highlightedText = introduction.querySelector("strong")?.textContent.trim() || "";
    const highlightedIndex = highlightedText ? introductionText.indexOf(highlightedText) : -1;
    const prefixText = highlightedIndex >= 0
      ? introductionText.slice(0, highlightedIndex).trim()
      : "";
    const suffixText = highlightedIndex >= 0
      ? introductionText.slice(highlightedIndex + highlightedText.length).trim()
      : introductionText;

    if (prefixText) {
      const prefix = document.createElement("span");
      prefix.textContent = prefixText.replace(/^\*+|\*+$/g, "").trim();
      caption.append(prefix);
    }
    if (highlightedText) {
      const highlight = document.createElement("strong");
      highlight.textContent = highlightedText;
      caption.append(highlight);
    }
    if (suffixText) {
      const suffix = document.createElement("small");
      suffix.textContent = suffixText.replace(/^\*+|\*+$/g, "").trim();
      caption.append(suffix);
    }

    list.className = "portfolio-logic-rail__steps";
    steps.forEach(({ item, sourceText, index, phase, detail }) => {
      item.dataset.sourceText = sourceText;
      const indexLabel = document.createElement("span");
      indexLabel.className = "portfolio-logic-rail__index";
      indexLabel.textContent = index;
      const phaseLabel = document.createElement("b");
      phaseLabel.textContent = phase;
      const detailLabel = document.createElement("strong");
      detailLabel.textContent = detail;
      item.replaceChildren(indexLabel, phaseLabel, detailLabel);
    });

    heading.classList.add("portfolio-process-heading");
    heading.after(figure);
    figure.append(caption, list);
    introduction.remove();
  }

  function mergeCaseAnalysisColumns(table) {
    const headers = [...table.querySelectorAll("thead th")];
    const rows = [...table.querySelectorAll("tbody tr")];
    const factorNames = new Set(["Man", "Machine", "Material", "Method", "Measurement", "Environment"]);
    if (headers.length !== 5 || rows.length < 4) return false;
    if (!rows.every((row) => factorNames.has(row.cells[0]?.textContent.trim()))) return false;

    const mergeCells = (primary, secondary, modifier) => {
      if (!primary || !secondary) return;
      const primaryPart = document.createElement("span");
      primaryPart.className = `${modifier} ${modifier}--evidence`;
      primaryPart.append(...primary.childNodes);
      const secondaryPart = document.createElement("span");
      secondaryPart.className = `${modifier} ${modifier}--verdict`;
      secondaryPart.append(...secondary.childNodes);
      primary.replaceChildren(primaryPart, document.createTextNode(" "), secondaryPart);
      secondary.remove();
    };

    mergeCells(headers[2], headers[3], "case-analysis__header-part");
    rows.forEach((row) => {
      const cells = [...row.cells];
      mergeCells(cells[2], cells[3], "case-analysis__result-part");
    });
    table.classList.add("analysis-4m-table", "analysis-4m-table--case");
    table.dataset.originalColumns = "5";
    table.dataset.visibleColumns = "4";
    return true;
  }

  function wrapCaseSubsections(caseStudy) {
    const headings = [...caseStudy.children].filter((element) => element.tagName === "H3");
    headings.forEach((heading) => {
      if (heading.parentElement !== caseStudy) return;
      const group = document.createElement("section");
      const title = heading.textContent.trim();
      group.className = "portfolio-case-study__section";
      if (["현상과 판정기준", "Phenomenon and Judgment Criteria"].includes(title)) {
        group.classList.add("portfolio-case-study__criterion");
      } else if (["재현·측정", "Reproduction and Measurement"].includes(title)) {
        group.classList.add("portfolio-case-study__measurement");
      } else if (/(?:분석|Analysis)$/.test(title)) {
        group.classList.add("portfolio-case-study__analysis");
      } else if (["조치·재시험", "Action and Retesting"].includes(title)) {
        group.classList.add("portfolio-case-study__action");
      }
      else group.classList.add("portfolio-case-study__result");

      heading.before(group);
      group.append(heading);
      let sibling = group.nextElementSibling;
      while (sibling && sibling.tagName !== "H3") {
        const next = sibling.nextElementSibling;
        group.append(sibling);
        sibling = next;
      }
    });
  }

  function groupCaseSections(caseStudy, selector, className) {
    const sections = [...caseStudy.querySelectorAll(`:scope > ${selector}`)];
    if (sections.length < 2) return;
    const group = document.createElement("div");
    group.className = className;
    sections[0].before(group);
    sections.forEach((section) => group.append(section));
  }

  function structureManufacturingCase(caseStudy) {
    const firstSubheading = [...caseStudy.children].find((element) => element.tagName === "H3");
    const headerNodes = [];
    let cursor = caseStudy.firstElementChild;
    while (cursor && cursor !== firstSubheading) {
      headerNodes.push(cursor);
      cursor = cursor.nextElementSibling;
    }
    if (headerNodes.length < 5) return;

    const header = document.createElement("header");
    header.className = "portfolio-case-study__header";
    headerNodes[0].before(header);
    headerNodes.forEach((node) => header.append(node));

    const caseHeadings = [...header.querySelectorAll(":scope > h2")];
    const meta = [...header.querySelectorAll(":scope > p")];
    caseHeadings[0]?.classList.add("portfolio-case-study__case-title");
    caseHeadings[1]?.classList.add("portfolio-case-study__work-title");
    meta[0]?.classList.add("portfolio-case-study__number");
    meta[1]?.classList.add("portfolio-case-study__domain");
    meta[2]?.classList.add("portfolio-case-study__lead");

    wrapCaseSubsections(caseStudy);
    groupCaseSections(
      caseStudy,
      ".portfolio-case-study__criterion, .portfolio-case-study__measurement",
      "portfolio-case-study__decision-grid"
    );
    groupCaseSections(
      caseStudy,
      ".portfolio-case-study__action, .portfolio-case-study__result",
      "portfolio-case-study__outcome-grid"
    );

    caseStudy.querySelectorAll(".portfolio-case-study__analysis table")
      .forEach((table) => mergeCaseAnalysisColumns(table));
  }

  function enhanceManufacturingCaseStudies(content) {
    const caseHeadingPattern = /^(?:사례|Case)\s+\d+\./i;
    const caseHeadings = [...content.children]
      .filter((element) => element.tagName === "H2" && caseHeadingPattern.test(element.textContent.trim()));

    caseHeadings.forEach((caseHeading) => {
      if (caseHeading.closest(".portfolio-case-study")) return;
      const nodes = [];
      let cursor = caseHeading;
      let workTitleSeen = false;
      while (cursor) {
        if (cursor !== caseHeading && cursor.tagName === "H2") {
          if (caseHeadingPattern.test(cursor.textContent.trim()) || workTitleSeen) break;
          workTitleSeen = true;
        }
        nodes.push(cursor);
        cursor = cursor.nextElementSibling;
      }
      if (nodes.length < 6) return;

      const caseStudy = document.createElement("section");
      caseStudy.className = "portfolio-case-study";
      caseHeading.before(caseStudy);
      nodes.forEach((node) => caseStudy.append(node));
      structureManufacturingCase(caseStudy);
    });
  }

  const sectionIntentTokens = Object.freeze({
    problem: [
      "배경", "문제", "과제", "프로젝트 개요", "추진 배경", "AS-IS", "Gap", "공정조건 변화",
      "background", "problem", "challenge", "as-is", "gap"
    ],
    flow: [
      "흐름", "순서", "DMAIC", "DMADV", "개발·양산 이관 승인조건", "승인조건", "작업 Tree",
      "flow", "sequence", "process", "workflow", "gate"
    ],
    analysis: [
      "4M", "5M", "원인", "위험", "분석", "FMEA", "고장 모드", "판정", "CTQ", "Correlation",
      "analysis", "risk", "failure mode", "decision", "correlation"
    ],
    architecture: [
      "시스템 구성", "통합 시스템", "구조", "아키텍처", "Data Standardization", "Incremental Sync",
      "Search & Reranking", "Mapping", "JSON", "Digital Twin", "VBA Application", "Data 처리",
      "system", "architecture", "data engineering", "modeling", "deployment", "round-trip"
    ],
    responsibility: [
      "역할", "책임", "담당 범위", "직접 구현", "직접 설계", "업무 분장", "오너십", "직접 수행",
      "role", "responsibility", "ownership", "directly implemented"
    ],
    verification: [
      "검증", "시험", "확인", "Pilot", "Qual", "평가", "시연", "Evidence", "현재 상태", "현재 구현",
      "검수", "Punch", "결과", "성과", "verification", "test", "result", "outcome", "evidence"
    ],
    output: [
      "표준", "문서", "현장 이관", "향후", "다음", "차후", "연계", "공개", "운영범위", "기술자산",
      "standard", "handover", "next", "future", "public", "operation", "asset"
    ]
  });

  function sectionIntent(title) {
    const normalized = title.toLowerCase();
    const order = ["problem", "responsibility", "flow", "analysis", "architecture", "verification", "output"];
    return order.find((intent) => sectionIntentTokens[intent]
      .some((token) => normalized.includes(token.toLowerCase()))) || "detail";
  }

  function wrapStructuredTopLevelSections(content) {
    const headings = [...content.children]
      .filter((element) => element.tagName === "H2");

    headings.forEach((heading, index) => {
      if (heading.parentElement !== content) return;
      const section = document.createElement("section");
      const intent = sectionIntent(heading.textContent.trim());
      section.className = `portfolio-structured-section portfolio-section--${intent}`;
      section.dataset.sectionIntent = intent;
      section.dataset.sectionIndex = String(index + 1).padStart(2, "0");
      heading.before(section);
      section.append(heading);

      let sibling = section.nextElementSibling;
      while (sibling && sibling.tagName !== "H1" && sibling.tagName !== "H2") {
        const next = sibling.nextElementSibling;
        section.append(sibling);
        sibling = next;
      }
    });

    [...content.children]
      .filter((element) => element.tagName === "H1")
      .forEach((heading) => heading.classList.add("portfolio-chapter-heading"));
  }

  function wrapStructuredSubsections(section) {
    const headings = [...section.children]
      .filter((element) => element.tagName === "H3");
    if (!headings.length) return;

    const groups = headings.map((heading) => {
      const group = document.createElement("section");
      group.className = "portfolio-subsection";
      group.dataset.sectionIntent = sectionIntent(heading.textContent.trim());
      heading.before(group);
      group.append(heading);
      let sibling = group.nextElementSibling;
      while (sibling && sibling.tagName !== "H3") {
        const next = sibling.nextElementSibling;
        group.append(sibling);
        sibling = next;
      }
      return group;
    });

    const grid = document.createElement("div");
    grid.className = "portfolio-subsection-grid";
    if (groups.length === 1) grid.classList.add("portfolio-subsection-grid--single");
    if (groups.some((group) => group.querySelector("table, pre, .highlight, img, iframe, .mermaid"))) {
      grid.classList.add("portfolio-subsection-grid--stacked");
    }
    groups[0].before(grid);
    groups.forEach((group) => grid.append(group));
  }

  function enhanceInlineMermaidDiagrams(content) {
    const diagramPattern = /^(?:(?:flowchart|graph)\s+(?:TB|TD|BT|RL|LR)\b|stateDiagram(?:-v2)?\b|sequenceDiagram\b|classDiagram\b|erDiagram\b|journey\b|gantt\b|pie\b)/i;
    const normalizeDiagramSource = (sourceText) => sourceText
      .replace(/^((?:flowchart|graph)\s+(?:TB|TD|BT|RL|LR))\s+/i, "$1\n")
      .replace(/^(stateDiagram(?:-v2)?)\s+/i, "$1\n")
      .replace(/^(sequenceDiagram)\s+/i, "$1\n")
      .replace(/--\s*"([^"]+)"\s*-->/g, "-->|$1|")
      .replace(/(\]|\}|\)|[A-Za-z][\w-]*)\s+(?=(?:\[\*\]|[A-Za-z][\w-]*(?:\[[^\]]*\]|\{[^}]*\}|\([^)]*\))?)\s+(?:-->|<-->|---|-.->|==>))/g, "$1\n")
      .replace(/\s+(?=(?:actor|participant|loop|alt|opt|par|rect|critical|break|else|end)\b|[A-Za-z][\w-]*-+>>?[A-Za-z])/g, "\n");
    [...content.querySelectorAll("p")].forEach((paragraph) => {
      const sourceText = paragraph.textContent.trim();
      if (!diagramPattern.test(sourceText)) return;
      const diagram = document.createElement("div");
      diagram.className = "mermaid portfolio-inline-diagram";
      diagram.dataset.sourceText = sourceText;
      diagram.dataset.renderSource = normalizeDiagramSource(sourceText);
      diagram.textContent = diagram.dataset.renderSource;
      paragraph.replaceWith(diagram);
    });
  }

  function wrapStructuredIntro(content) {
    const firstSection = [...content.children]
      .find((element) => element.classList.contains("portfolio-structured-section"));
    if (!firstSection) return;

    const leading = [];
    let cursor = content.firstElementChild;
    while (cursor && cursor !== firstSection) {
      if (cursor.tagName === "H1") return;
      leading.push(cursor);
      cursor = cursor.nextElementSibling;
    }
    if (!leading.some((element) => element.tagName === "OL")) return;

    const framework = document.createElement("section");
    framework.className = "portfolio-project-framework";
    framework.dataset.sectionIntent = "flow";
    leading[0].before(framework);
    leading.forEach((element) => framework.append(element));
  }

  function enhanceStructuredArrowFlows(content) {
    content.querySelectorAll("pre").forEach((block) => {
      if (block.classList.contains("portfolio-sequence-block")) return;
      const source = block.querySelector(":scope > code") || block;
      const lines = source.textContent.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (lines.length < 4 || lines.length > 12) return;
      const arrowLines = lines.filter((line) => line.startsWith("→") || line.includes(" → ")).length;
      if (arrowLines < lines.length - 1) return;

      block.classList.add("portfolio-sequence-block");
      const columns = lines.length > 8 ? 5 : lines.length > 6 ? 4 : lines.length;
      block.style.setProperty("--sequence-columns", String(columns));
      block.dataset.stepColumns = String(columns);
      block.dataset.stepCount = String(lines.length);
      block.classList.toggle("portfolio-sequence-block--wrapped", lines.length > columns);
      const steps = lines.map((line) => {
        const step = document.createElement("span");
        step.className = "portfolio-sequence-block__step";
        step.dataset.sourceText = line;
        const match = line.match(/^(→\s*)?(.+)$/);
        if (match?.[1]) {
          const sourceArrow = document.createElement("span");
          sourceArrow.className = "portfolio-sequence-block__source-arrow";
          sourceArrow.textContent = match[1];
          const text = document.createElement("span");
          text.className = "portfolio-sequence-block__text";
          text.textContent = match[2];
          step.append(sourceArrow, text);
        } else {
          step.textContent = line;
        }
        return step;
      });
      source.replaceChildren(...steps);
    });
  }

  function enhanceStructuredProcessLists(content) {
    content.querySelectorAll(".portfolio-structured-section, .portfolio-project-framework").forEach((section) => {
      section.querySelectorAll(":scope > ol").forEach((list) => {
        const items = [...list.children].filter((item) => item.tagName === "LI");
        if (items.length < 3 || items.length > 12 || list.querySelector("ol, ul")) return;

        const parsed = items.map((item) => {
          const sourceText = item.textContent.trim();
          const match = sourceText.match(/^(\d{2})\s*([^*]+?)\*+(.+)$/);
          return match ? { item, sourceText, index: match[1], phase: match[2].trim(), detail: match[3].trim() } : null;
        });
        if (parsed.some((step) => !step)) return;

        const columns = items.length > 8 ? 5 : items.length > 6 ? 4 : items.length;
        list.classList.add("portfolio-step-rail");
        list.classList.toggle("portfolio-step-rail--wrapped", items.length > columns);
        list.style.setProperty("--step-columns", String(columns));
        list.dataset.stepColumns = String(columns);
        list.dataset.stepCount = String(items.length);

        parsed.forEach(({ item, sourceText, index, phase, detail }) => {
          item.dataset.sourceText = sourceText;
          const indexLabel = document.createElement("span");
          indexLabel.className = "portfolio-step-rail__index";
          indexLabel.textContent = index;
          const phaseLabel = document.createElement("b");
          phaseLabel.textContent = phase;
          const detailLabel = document.createElement("strong");
          detailLabel.textContent = detail;
          item.replaceChildren(indexLabel, phaseLabel, detailLabel);
        });
      });
    });
  }

  function enhanceStructuredFactorTables(content) {
    const factorNames = new Set(["Man", "Machine", "Material", "Method", "Measurement", "Environment"]);
    content.querySelectorAll("table").forEach((table) => {
      const headerCount = table.querySelectorAll("thead th").length;
      const rows = [...table.querySelectorAll("tbody tr")];
      const factorRows = rows.filter((row) => factorNames.has(row.cells[0]?.textContent.trim()));
      if (factorRows.length < 4 || headerCount < 4) return;
      const belongsToCaseStudy = Boolean(table.closest(".portfolio-case-study"));
      if (headerCount === 5 && table.dataset.visibleColumns !== "4") {
        mergeCaseAnalysisColumns(table);
      }
      if (!belongsToCaseStudy) table.classList.remove("analysis-4m-table--case");
      table.classList.add("analysis-factor-table--structured");
    });
  }

  function markStructuredFactorSections(content) {
    content.querySelectorAll(".portfolio-structured-section").forEach((section) => {
      if (section.querySelector(".analysis-factor-table--structured")) {
        section.classList.add("portfolio-section--factor-analysis");
      }
    });
  }

  function enhanceStructuredSections(project, content) {
    content.classList.add("portfolio-layout", `portfolio-layout--${project.group}`);
    content.dataset.layoutType = project.group;

    enhanceDmaicProcessFlow(content);
    if (project.group === "manufacturing") enhanceManufacturingCaseStudies(content);
    enhanceStructuredFactorTables(content);

    if (project.id !== "battery-2170-pilot") {
      enhanceInlineMermaidDiagrams(content);
      wrapStructuredTopLevelSections(content);
      wrapStructuredIntro(content);
      content.querySelectorAll(".portfolio-structured-section")
        .forEach((section) => wrapStructuredSubsections(section));
      enhanceStructuredArrowFlows(content);
      enhanceStructuredProcessLists(content);
      markStructuredFactorSections(content);
    }
  }

  function enhanceExactRevisedLayout(project, content) {
    enhanceStructuredSections(project, content);
  }

  function applyHomeTitleAdjustments(root) {
    const heroTitle = root.querySelector("#portfolio-hero-title");
    const heroDescription = root.querySelector(".portfolio-hero__description");
    if (heroTitle) {
      heroTitle.replaceChildren();
      ui().homeHeroTitleLines.forEach((line) => {
        const titleLine = document.createElement("span");
        titleLine.className = "portfolio-hero__title-line";
        titleLine.textContent = line;
        heroTitle.append(titleLine);
      });
    }
    if (heroDescription) heroDescription.textContent = ui().homeHeroDescription;
    root.querySelector(".portfolio-hero__kicker")?.remove();
    root.querySelector(".portfolio-hero__evidence-line")?.remove();

    const portraitDomain = root.querySelector(".portfolio-hero__portrait figcaption span");
    if (portraitDomain) portraitDomain.textContent = ui().portraitDomain;

    const yieldFigure = root.querySelector(".portfolio-yield-chart");
    const yieldSvg = yieldFigure?.querySelector("svg");
    const yieldLabels = yieldSvg?.querySelectorAll(".portfolio-yield-chart__labels text");
    if (yieldLabels?.[0]) yieldLabels[0].textContent = ui().yieldChartStartLabel;
    if (yieldLabels?.[1]) yieldLabels[1].textContent = ui().yieldChartEndLabel;
    const yieldTitle = yieldSvg?.querySelector("#yield-chart-title");
    const yieldDescription = yieldSvg?.querySelector("#yield-chart-desc");
    if (yieldTitle) yieldTitle.textContent = ui().yieldChartTitle;
    if (yieldDescription) yieldDescription.textContent = ui().yieldChartDescription;
    if (yieldSvg && !yieldSvg.querySelector(".portfolio-yield-chart__trend")) {
      const trend = document.createElementNS("http://www.w3.org/2000/svg", "line");
      trend.classList.add("portfolio-yield-chart__trend");
      trend.setAttribute("x1", "190");
      trend.setAttribute("y1", "260");
      trend.setAttribute("x2", "490");
      trend.setAttribute("y2", "75");
      trend.setAttribute("aria-hidden", "true");
      const startPoint = yieldSvg.querySelector(".portfolio-yield-chart__start");
      yieldSvg.insertBefore(trend, startPoint);
    }
    yieldFigure?.querySelector("figcaption")?.remove();
    yieldFigure?.removeAttribute("aria-labelledby");

    const updates = new Map(Object.entries(approvedProjectTitles).map(([id, title]) => [`#${id}`, title]));
    root.querySelectorAll("a[href]").forEach((link) => {
      const replacement = updates.get(link.getAttribute("href"));
      if (replacement && link.closest("h1, h2, h3")) link.textContent = replacement;
    });

    const authorityLink = root.querySelector('a[href="#ai-authority-evidence-plane"]');
    const category = authorityLink?.closest(".portfolio-project__header")?.querySelector(".portfolio-project__category");
    if (category) category.textContent = "[Manufacturing AX]";
  }

  function renderHome(anchor = "home") {
    if (!preservedHome) {
      renderGallery();
      return;
    }

    setHomeStyles(true);
    document.title = localeCopy[locale].documentTitle;
    app.innerHTML = `<div class="preserved-home home-page">${preservedHome.html}</div>`;
    const root = app.querySelector(".preserved-home");
    applyHomeTitleAdjustments(root);
    const featuredSection = root.querySelector(".portfolio-featured-projects");
    if (featuredSection) {
      const description = featuredSection.querySelector(".portfolio-featured-projects__copy > p:last-child");
      const note = featuredSection.querySelector(".portfolio-featured-projects__note span");
      if (description) description.textContent = ui().featuredDescription;
      if (note) note.textContent = ui().featuredNote;
    }
    root.querySelectorAll("a[href^='http']").forEach((link) => {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });

    requestAnimationFrame(() => {
      const target = document.getElementById(anchor);
      if (target) target.scrollIntoView({ block: "start" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
  }

  function enhancePreservedArticle(project) {
    const host = app.querySelector(".preserved-project");
    const article = host?.querySelector(".portfolio-article");
    if (!host || !article) return;

    const exactRevisedContentApplied = applyExactRevisedContent(project, article);
    if (!exactRevisedContentApplied) applyApprovedContentAdjustments(project, article);
    article.dataset.code = project.code;
    [...article.children].forEach((child) => {
      if (!child.classList.contains("portfolio-article__content")) child.classList.add("shell");
    });

    const content = article.querySelector(".portfolio-article__content");
    if (!content) return;

    article.classList.add("portfolio-layout", `portfolio-layout--${project.group}`);
    article.dataset.layoutType = project.group;

    removeEmptyContentArtifacts(content);

    enhanceExactRevisedLayout(project, content);

    content.querySelectorAll("table").forEach((table) => {
      if (table.parentElement?.classList.contains("table-wrap")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "table-wrap source-table-wrap";
      wrapper.tabIndex = 0;
      wrapper.setAttribute("aria-label", ui().tableScrollAria);
      table.before(wrapper);
      wrapper.append(table);
    });

    removeEmptyContentArtifacts(content);

    const layout = document.createElement("div");
    layout.className = "shell source-body-layout";
    content.before(layout);
    layout.append(content);

    const toc = buildSourceToc(content);
    if (toc) layout.append(toc);

    article.querySelectorAll("a[href^='http']").forEach((link) => {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });

    window.dispatchEvent(new CustomEvent("portfolio:content-rendered"));
  }

  function renderPreservedProject(project, preserved) {
    document.title = `${project.title} · ${ui().detailDocumentSuffix}`;
    app.innerHTML = `
      <div class="preserved-project detail-page">
        <div class="detail-back"><div class="shell"><a href="#gallery">${escapeHtml(ui().backToGallery)}</a></div></div>
        ${preserved.html}
        <footer class="shell detail-footer">
          <span>${escapeHtml(ui().detailFooter)}</span>
          <a href="#gallery">${escapeHtml(ui().otherProjects)}</a>
        </footer>
      </div>`;
    enhancePreservedArticle(project);
  }

  function renderProject(project) {
    setHomeStyles(false);
    const preserved = preservedProjects[project.id];
    if (preserved) {
      renderPreservedProject(project, preserved);
      return;
    }

    document.title = `${project.title} · ${ui().fallbackDocumentSuffix}`;
    const summaryItems = [
      [ui().summaryLabels[0], project.summary.problem],
      [ui().summaryLabels[1], project.summary.role],
      [ui().summaryLabels[2], project.summary.outcome]
    ];

    app.innerHTML = `
      <article class="detail-page">
        <div class="detail-back"><div class="shell"><a href="#gallery">${escapeHtml(ui().backToGallery)}</a></div></div>
        <header class="detail-hero" data-code="${escapeHtml(project.code)}">
          <div class="shell detail-hero-grid">
            <div>
              <div class="detail-stage"><span>${escapeHtml(project.stage)}</span><span>·</span><span>${escapeHtml(project.category)}</span></div>
              <h1>${escapeHtml(project.fullTitle)}</h1>
              <p class="detail-lead">${escapeHtml(project.lead)}</p>
            </div>
            <aside class="detail-meta" aria-label="${escapeHtml(ui().overviewAria)}">
              <dl>
                <div><dt>PROJECT</dt><dd>${escapeHtml(project.code)}</dd></div>
                <div><dt>PERIOD</dt><dd>${escapeHtml(project.period)}</dd></div>
                <div><dt>CONTEXT</dt><dd>${escapeHtml(project.context)}</dd></div>
                <div><dt>TEMPLATE</dt><dd>${escapeHtml(project.templateName)}</dd></div>
              </dl>
            </aside>
          </div>
        </header>
        <section class="shell summary-strip" aria-label="${escapeHtml(ui().summaryAria)}">
          ${summaryItems.map(([title, body]) => `<div class="summary-cell"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(body)}</p></div>`).join("")}
        </section>
        ${project.metrics?.length ? `<section class="shell metric-strip" aria-label="${escapeHtml(ui().metricAria)}">${project.metrics.map(([label, value]) => `<div class="metric-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}</section>` : ""}
        ${project.asset ? `<div class="shell"><figure class="visual-evidence"><img src="${escapeHtml(project.asset.src)}" alt="${escapeHtml(project.asset.alt)}"><figcaption>${escapeHtml(project.asset.caption)}</figcaption></figure></div>` : ""}
        <div class="shell detail-layout">
          <div class="detail-content">
            ${project.sections.map((section, index) => `
              <section class="detail-section" id="section-${index + 1}">
                <div class="section-title">
                  <span class="section-no">${String(index + 1).padStart(2, "0")}</span>
                  <div><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.intro)}</p></div>
                </div>
                ${renderSectionBody(section)}
              </section>`).join("")}
            <aside class="limit-note"><strong>${escapeHtml(ui().limitLabel)}</strong><br>${escapeHtml(project.limitation)}</aside>
          </div>
          <nav class="detail-toc" aria-label="${escapeHtml(ui().tocAria)}">
            <strong>PAGE INDEX</strong>
            ${project.sections.map((section, index) => `<a href="#section-${index + 1}">${String(index + 1).padStart(2, "0")} ${escapeHtml(section.title)}</a>`).join("")}
          </nav>
        </div>
        <footer class="shell detail-footer">
          <span>${escapeHtml(ui().fallbackFooter)}</span>
          <a href="#gallery">${escapeHtml(ui().otherProjects)}</a>
        </footer>
      </article>`;
  }

  function renderNotFound(id) {
    setHomeStyles(false);
    document.title = ui().notFoundTitle;
    app.innerHTML = `<section class="shell not-found"><p class="eyebrow">NOT FOUND</p><h1>${escapeHtml(ui().notFoundHeading)}</h1><p class="muted">${escapeHtml(ui().requestedId)}: ${escapeHtml(id)}</p><a href="#gallery">${escapeHtml(ui().backToGallery)}</a></section>`;
  }

  function route() {
    updateStaticChrome();
    const id = decodeURIComponent(location.hash.slice(1));
    const homeSections = new Set(["home", "about", "projects", "experiences", "skills", "education", "contact"]);
    if (id && app.querySelector(".detail-page") && document.getElementById(id)) return;
    if (!id || homeSections.has(id)) {
      renderHome(id || "home");
      return;
    }
    if (id === "gallery") {
      renderGallery();
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const project = projects.find((item) => item.id === id);
    if (project) {
      renderProject(project);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      renderNotFound(id);
    }
  }

  document.querySelectorAll("[data-language]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setLocale(link.dataset.language);
    });
  });
  window.addEventListener("hashchange", route);
  updateStaticChrome();
  route();
})();
