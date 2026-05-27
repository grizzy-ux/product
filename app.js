const STORAGE_KEY = "skincare-stage-gate-manager-v1";
const raciValues = ["", "A", "R", "C", "I"];

const stages = [
  {
    title: "Find the Idea",
    purpose: "Decide whether the idea is meaningfully different, fits the marine glycoprotein positioning, and is worth more investment.",
    criteria: [
      "Different from existing products on the market",
      "Connects to marine glycoprotein positioning",
      "Opportunity is worth further time investment",
      "Initial risks and unknowns are named",
    ],
    fields: [
      { key: "ideaSummary", label: "Idea summary", type: "textarea", required: true, span: "wide" },
      { key: "marketDifference", label: "Market difference", type: "textarea", required: true, span: "wide" },
      { key: "positioningFit", label: "Marine glycoprotein fit", type: "textarea", required: true },
      { key: "opportunityRationale", label: "Opportunity rationale", type: "textarea", required: true },
      { key: "initialRisks", label: "Initial risks", type: "textarea", required: true },
    ],
  },
  {
    title: "Build the Business Case",
    purpose: "Build a one-page financial model with conservative, base, and optimistic cases before committing heavier development resources.",
    criteria: [
      "Opportunity size is documented",
      "Risks are documented",
      "Conservative case is complete",
      "Base case is complete",
      "Optimistic case is complete",
      "Base contribution margin meets threshold",
    ],
    fields: [
      { key: "opportunitySize", label: "Opportunity size", type: "textarea", required: true, span: "wide" },
      { key: "businessRisks", label: "Business risks", type: "textarea", required: true, span: "wide" },
      { key: "marginThreshold", label: "Required base CM %", type: "number", required: true, defaultValue: 55 },
      { key: "pricingNotes", label: "Pricing and channel notes", type: "textarea", required: true, span: "wide" },
      { key: "scenarioModel", label: "Scenario model", type: "scenario" },
    ],
  },
  {
    title: "Formulation and Technical Development",
    purpose: "Move from brief to technical feasibility with the contract manufacturer, formula direction, early consumer input, margin check, claims work, and safety testing.",
    criteria: [
      "Technical track active with contract manufacturer",
      "Early consumer input received",
      "Formula direction selected",
      "Margin check passes against pricing",
      "Claims substantiation has begun",
      "Must-win performance specs are met",
      "Safety and dermatology testing are complete",
    ],
    fields: [
      { key: "manufacturer", label: "Contract manufacturer", type: "text", required: true },
      { key: "formulaDirection", label: "Selected formula direction", type: "text", required: true },
      { key: "consumerInput", label: "Early consumer input", type: "textarea", required: true, span: "wide" },
      { key: "performanceSpecs", label: "Must-win specifications evidence", type: "textarea", required: true, span: "wide" },
      { key: "claimsStart", label: "Claims substantiation status", type: "textarea", required: true },
      { key: "safetyDerm", label: "Safety and derm testing evidence", type: "textarea", required: true },
    ],
  },
  {
    title: "Test and Validate",
    purpose: "Validate the product and packaging experience before launch with in-home use testing, quick packaging comprehension, and claims documentation.",
    criteria: [
      "In-home use test completed",
      "5-second packaging test completed",
      "Claims final audit is documented",
      "Launch recommendation is written",
    ],
    fields: [
      { key: "ihutResult", label: "In-home use test result", type: "textarea", required: true, span: "wide" },
      { key: "packagingFiveSecond", label: "5-second packaging test", type: "textarea", required: true },
      { key: "claimsAudit", label: "Claims final audit", type: "textarea", required: true },
      { key: "launchRecommendation", label: "Launch recommendation", type: "textarea", required: true, span: "wide" },
    ],
  },
  {
    title: "Launch and Learn",
    purpose: "Launch DTC first, learn from existing customers, focus on one hero claim, then review 90-day commercial and risk signals.",
    criteria: [
      "DTC-first launch is confirmed",
      "Existing customers are prioritized first",
      "One hero claim is selected",
      "90-day forecast vs. buy-rate review is complete",
      "90-day repurchase review is complete",
      "Return rate is reviewed",
      "Actual contribution margin is reviewed",
      "Post-launch safety, regulatory, and claims issues are reviewed",
    ],
    fields: [
      { key: "heroClaim", label: "Hero claim", type: "text", required: true },
      { key: "dtcPlan", label: "DTC-first launch plan", type: "textarea", required: true },
      { key: "customerPlan", label: "Existing-customer plan", type: "textarea", required: true },
      { key: "forecastBuyRate", label: "90-day forecast vs buy rate", type: "textarea", required: true },
      { key: "repurchaseRate", label: "90-day repurchase rate", type: "number", required: true, suffix: "%" },
      { key: "returnRate", label: "Return rate", type: "number", required: true, suffix: "%" },
      { key: "actualCm", label: "Actual contribution margin", type: "number", required: true, suffix: "%" },
      { key: "postLaunchIssues", label: "Safety, regulatory, or claims issues", type: "textarea", required: true, span: "wide" },
    ],
  },
];

function createDemoProducts() {
  return [
    {
      id: crypto.randomUUID(),
      name: "Barrier Cloud Cream",
      owner: "Product Marketing",
      targetLaunch: "2026-10-15",
      currentStage: 1,
      fields: {
        ideaSummary: "Ceramide-rich daily moisturizer centered on visible barrier recovery.",
        marketDifference: "More elegant texture than occlusive barrier creams, with clinical marine glycoprotein story.",
        positioningFit: "Marine glycoprotein is framed as the bioactive support system for stressed skin barrier.",
        opportunityRationale: "High repeat-use category with room for a premium sensitive-skin positioning.",
        initialRisks: "Pump compatibility, claims support, and margin pressure.",
        opportunitySize: "US prestige barrier care opportunity is large enough to support DTC-first test.",
        businessRisks: "Component cost and performance claims could compress margin.",
        marginThreshold: 55,
        pricingNotes: "Target $58 DTC price; retail expansion only after launch proof.",
        manufacturer: "North Coast Labs",
        formulaDirection: "F-03 ceramide gel-cream",
      },
      checks: {
        0: [true, true, true, true],
        1: [true, true, true, true, true, true],
        2: [true, false, true, true, true, false, false],
        3: [false, false, false, false],
        4: [false, false, false, false, false, false, false, false],
      },
      scenarios: defaultScenarios(),
    },
    {
      id: crypto.randomUUID(),
      name: "Vitamin C Silk Serum",
      owner: "R&D",
      targetLaunch: "2026-12-01",
      currentStage: 0,
      fields: {
        marginThreshold: 58,
      },
      checks: blankChecks(),
      scenarios: defaultScenarios({
        conservative: { units: 12000, price: 62, cogs: 14, marketing: 150000 },
        base: { units: 26000, price: 62, cogs: 13.25, marketing: 240000 },
        optimistic: { units: 44000, price: 62, cogs: 12.75, marketing: 360000 },
      }),
    },
  ];
}

let state = loadState();
let activeProductId = state.activeProductId || state.products[0].id;
let activePage = state.activePage || "tracker";

const productList = document.querySelector("#productList");
const stageCards = document.querySelector("#stageCards");
const productName = document.querySelector("#productName");
const productOwner = document.querySelector("#productOwner");
const targetLaunch = document.querySelector("#targetLaunch");
const currentGate = document.querySelector("#currentGate");
const gateHealth = document.querySelector("#gateHealth");
const trackerPage = document.querySelector("#trackerPage");
const raciPage = document.querySelector("#raciPage");
const trackerPageBtn = document.querySelector("#trackerPageBtn");
const raciPageBtn = document.querySelector("#raciPageBtn");
const raciHead = document.querySelector("#raciHead");
const raciBody = document.querySelector("#raciBody");

document.querySelector("#addProductBtn").addEventListener("click", addProduct);
document.querySelector("#resetDemoBtn").addEventListener("click", resetDemo);
document.querySelector("#addRaciRoleBtn").addEventListener("click", addRaciRole);
trackerPageBtn.addEventListener("click", () => setPage("tracker"));
raciPageBtn.addEventListener("click", () => setPage("raci"));

[productName, productOwner, targetLaunch].forEach((element) => {
  element.addEventListener("input", () => {
    const product = getActiveProduct();
    product.name = productName.value;
    product.owner = productOwner.value;
    product.targetLaunch = targetLaunch.value;
    persistAndRender(false);
  });
});

render();

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.products) && parsed.products.length) {
        parsed.raci = normalizeRaci(parsed.raci);
        parsed.activePage ||= "tracker";
        return parsed;
      }
    } catch {}
  }
  const products = createDemoProducts();
  return { products, activeProductId: products[0].id, activePage: "tracker", raci: defaultRaci() };
}

function saveState() {
  state.activeProductId = activeProductId;
  state.activePage = activePage;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function blankChecks() {
  return Object.fromEntries(stages.map((stage, index) => [index, stage.criteria.map(() => false)]));
}

function defaultRaci() {
  return {
    roles: [
      { role: "Founder / CEO", person: "", assignments: ["A", "A", "I", "I", "A"] },
      { role: "Product Lead", person: "", assignments: ["R", "R", "A", "A", "R"] },
      { role: "R&D / Formulation", person: "", assignments: ["C", "C", "R", "C", "C"] },
      { role: "Contract Manufacturer", person: "", assignments: ["", "C", "R", "C", "I"] },
      { role: "Regulatory / Claims", person: "", assignments: ["C", "C", "C", "R", "C"] },
      { role: "Marketing / Brand", person: "", assignments: ["C", "R", "C", "R", "R"] },
      { role: "Operations / Supply", person: "", assignments: ["I", "C", "R", "C", "R"] },
    ],
  };
}

function normalizeRaci(raci) {
  const normalized = raci && Array.isArray(raci.roles) && raci.roles.length ? raci : defaultRaci();
  normalized.roles.forEach((role) => {
    role.assignments ||= [];
    role.assignments = stages.map((_, index) => role.assignments[index] || "");
    role.role ||= "";
    role.person ||= "";
  });
  return normalized;
}

function defaultScenarios(overrides = {}) {
  return {
    conservative: { units: 15000, price: 58, cogs: 16, marketing: 160000, ...overrides.conservative },
    base: { units: 30000, price: 58, cogs: 14.5, marketing: 260000, ...overrides.base },
    optimistic: { units: 52000, price: 58, cogs: 13.5, marketing: 390000, ...overrides.optimistic },
  };
}

function getActiveProduct() {
  return state.products.find((product) => product.id === activeProductId) || state.products[0];
}

function persistAndRender(full = true) {
  saveState();
  if (full) render();
  else renderSummary();
}

function render() {
  const product = getActiveProduct();
  productName.value = product.name || "";
  productOwner.value = product.owner || "";
  targetLaunch.value = product.targetLaunch || "";
  renderPage();
  renderProducts();
  renderStages(product);
  renderRaci();
  renderSummary();
}

function renderPage() {
  trackerPage.classList.toggle("active", activePage === "tracker");
  raciPage.classList.toggle("active", activePage === "raci");
  trackerPageBtn.classList.toggle("active", activePage === "tracker");
  raciPageBtn.classList.toggle("active", activePage === "raci");
  productList.hidden = activePage === "raci";
}

function renderProducts() {
  productList.innerHTML = "";
  state.products.forEach((product) => {
    const button = document.createElement("button");
    button.className = `product-tab${product.id === activeProductId ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${escapeHtml(product.name || "Untitled product")}</strong><span>${stages[product.currentStage]?.title || "Complete"}</span>`;
    button.addEventListener("click", () => {
      activeProductId = product.id;
      persistAndRender();
    });
    productList.append(button);
  });
}

function renderStages(product) {
  stageCards.innerHTML = "";
  stages.forEach((stage, stageIndex) => {
    const card = document.querySelector("#stageTemplate").content.firstElementChild.cloneNode(true);
    const complete = isStageComplete(product, stageIndex);
    const current = product.currentStage === stageIndex;
    const locked = stageIndex > product.currentStage;
    const ready = current && complete;
    const status = locked ? "Locked" : complete ? "Ready" : current ? "In Progress" : "Complete";

    card.classList.toggle("current", current);
    card.classList.toggle("complete", complete && !current);
    card.classList.toggle("blocked", current && !complete);
    card.querySelector(".stage-number").textContent = `Stage ${stageIndex + 1}`;
    card.querySelector("h2").textContent = stage.title;
    card.querySelector(".stage-purpose").textContent = stage.purpose;
    const statusEl = card.querySelector(".stage-status");
    statusEl.textContent = status;
    statusEl.classList.toggle("ready", ready || (complete && !current));
    statusEl.classList.toggle("blocked", current && !complete);

    renderCriteria(card.querySelector(".criteria-list"), product, stageIndex, locked);
    renderInputs(card.querySelector(".input-grid"), product, stageIndex, locked);

    const backButton = card.querySelector(".back-button");
    const advanceButton = card.querySelector(".advance-button");
    backButton.disabled = stageIndex !== product.currentStage || product.currentStage === 0;
    advanceButton.disabled = stageIndex !== product.currentStage || !complete;
    advanceButton.textContent = stageIndex === stages.length - 1 ? "Complete Launch Review" : "Advance";

    backButton.addEventListener("click", () => {
      product.currentStage = Math.max(0, product.currentStage - 1);
      persistAndRender();
    });
    advanceButton.addEventListener("click", () => {
      product.currentStage = Math.min(stages.length - 1, product.currentStage + 1);
      persistAndRender();
      document.querySelector(".stage-card.current")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    stageCards.append(card);
  });
}

function renderRaci() {
  state.raci = normalizeRaci(state.raci);
  raciHead.innerHTML = "";
  raciBody.innerHTML = "";

  ["Role", "Person"].forEach((label) => {
    const th = document.createElement("th");
    th.textContent = label;
    raciHead.append(th);
  });
  stages.forEach((stage) => {
    const th = document.createElement("th");
    th.className = "stage-col";
    th.textContent = stage.title;
    raciHead.append(th);
  });
  const actionTh = document.createElement("th");
  actionTh.textContent = "";
  raciHead.append(actionTh);

  state.raci.roles.forEach((role, roleIndex) => {
    const tr = document.createElement("tr");
    tr.append(renderRaciTextInput(role, roleIndex, "role", "Role"));
    tr.append(renderRaciTextInput(role, roleIndex, "person", "Person"));

    stages.forEach((_, stageIndex) => {
      const td = document.createElement("td");
      td.className = "assignment-cell";
      const select = document.createElement("select");
      select.value = role.assignments?.[stageIndex] || "";
      setRaciSelectClass(select);
      raciValues.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value || "-";
        select.append(option);
      });
      select.addEventListener("change", () => {
        setRaciAssignment(roleIndex, stageIndex, select.value);
      });
      td.append(select);
      tr.append(td);
    });

    const actionTd = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.className = "remove-role-button";
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.disabled = state.raci.roles.length === 1;
    removeButton.addEventListener("click", () => {
      state.raci.roles.splice(roleIndex, 1);
      persistAndRender();
    });
    actionTd.append(removeButton);
    tr.append(actionTd);
    raciBody.append(tr);
  });

  renderRaciAccountableWarnings();
}

function renderRaciTextInput(role, roleIndex, key, label) {
  const td = document.createElement("td");
  const input = document.createElement("input");
  input.value = role[key] || "";
  input.placeholder = label;
  input.addEventListener("input", () => {
    state.raci.roles[roleIndex][key] = input.value;
    persistAndRender(false);
  });
  td.append(input);
  return td;
}

function renderRaciAccountableWarnings() {
  stages.forEach((_, stageIndex) => {
    const accountable = state.raci.roles.filter((role) => role.assignments?.[stageIndex] === "A");
    const cell = raciBody.rows[0]?.cells[stageIndex + 2];
    if (!cell) return;
    if (accountable.length === 1 && accountable[0].person.trim()) return;
    const warning = document.createElement("div");
    warning.className = "raci-warning";
    warning.textContent = accountable.length === 0 ? "Needs one A" : "Name the A";
    cell.append(warning);
  });
}

function setRaciAssignment(roleIndex, stageIndex, value) {
  state.raci.roles.forEach((role, index) => {
    role.assignments ||= Array(stages.length).fill("");
    if (value === "A" && index !== roleIndex && role.assignments[stageIndex] === "A") {
      role.assignments[stageIndex] = "";
    }
  });
  state.raci.roles[roleIndex].assignments[stageIndex] = value;
  persistAndRender();
}

function setRaciSelectClass(select) {
  select.className = "";
  const classByValue = {
    A: "accountable",
    R: "responsible",
    C: "consulted",
    I: "informed",
  };
  if (classByValue[select.value]) select.classList.add(classByValue[select.value]);
}

function renderCriteria(container, product, stageIndex, locked) {
  container.innerHTML = "";
  const checks = ensureChecks(product, stageIndex);
  stages[stageIndex].criteria.forEach((criterion, criterionIndex) => {
    const label = document.createElement("label");
    label.className = "criterion";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(checks[criterionIndex]);
    checkbox.disabled = locked;
    checkbox.addEventListener("change", () => {
      checks[criterionIndex] = checkbox.checked;
      persistAndRender();
    });
    label.append(checkbox, document.createTextNode(criterion));
    container.append(label);
  });
}

function renderInputs(container, product, stageIndex, locked) {
  container.innerHTML = "";
  const fields = product.fields || (product.fields = {});
  stages[stageIndex].fields.forEach((field) => {
    if (field.type === "scenario") {
      container.append(renderScenarioModel(product, locked));
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = `input-field ${field.span || ""}`;
    const label = document.createElement("label");
    label.textContent = field.suffix ? `${field.label} (${field.suffix})` : field.label;
    const input = field.type === "textarea" ? document.createElement("textarea") : document.createElement("input");
    if (field.type !== "textarea") input.type = field.type;
    input.value = fields[field.key] ?? field.defaultValue ?? "";
    input.disabled = locked;
    input.addEventListener("input", () => {
      fields[field.key] = field.type === "number" ? Number(input.value) : input.value;
      persistAndRender();
    });
    label.append(input);
    wrapper.append(label);
    container.append(wrapper);
  });
}

function renderScenarioModel(product, locked) {
  product.scenarios ||= defaultScenarios();
  const wrapper = document.createElement("div");
  wrapper.className = "scenario-table";
  const rows = [
    ["Annual units", "units"],
    ["DTC price", "price"],
    ["COGS / unit", "cogs"],
    ["Marketing spend", "marketing"],
    ["Revenue", "revenue"],
    ["Gross profit", "grossProfit"],
    ["Contribution margin", "contributionMargin"],
    ["CM %", "cmPercent"],
  ];
  const cases = ["conservative", "base", "optimistic"];
  wrapper.innerHTML = `
    <table>
      <thead>
        <tr><th>One-page financial model</th><th>Conservative</th><th>Base</th><th>Optimistic</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  `;
  const tbody = wrapper.querySelector("tbody");
  rows.forEach(([label, key]) => {
    const tr = document.createElement("tr");
    const th = document.createElement("td");
    th.textContent = label;
    tr.append(th);
    cases.forEach((caseName) => {
      const td = document.createElement("td");
      const computed = computeScenario(product.scenarios[caseName]);
      if (["revenue", "grossProfit", "contributionMargin", "cmPercent"].includes(key)) {
        const output = document.createElement("output");
        output.textContent = key === "cmPercent" ? `${Math.round(computed[key])}%` : money(computed[key]);
        td.append(output);
      } else {
        const input = document.createElement("input");
        input.type = "number";
        input.value = product.scenarios[caseName][key] ?? "";
        input.disabled = locked;
        input.addEventListener("input", () => {
          product.scenarios[caseName][key] = Number(input.value);
          persistAndRender();
        });
        td.append(input);
      }
      tr.append(td);
    });
    tbody.append(tr);
  });
  return wrapper;
}

function computeScenario(scenario = {}) {
  const units = Number(scenario.units) || 0;
  const price = Number(scenario.price) || 0;
  const cogs = Number(scenario.cogs) || 0;
  const marketing = Number(scenario.marketing) || 0;
  const revenue = units * price;
  const grossProfit = units * (price - cogs);
  const contributionMargin = grossProfit - marketing;
  const cmPercent = revenue ? (contributionMargin / revenue) * 100 : 0;
  return { revenue, grossProfit, contributionMargin, cmPercent };
}

function isStageComplete(product, stageIndex) {
  const checks = ensureChecks(product, stageIndex);
  const criteriaPass = checks.every(Boolean);
  const fieldsPass = stages[stageIndex].fields.every((field) => {
    if (field.type === "scenario") return scenariosComplete(product);
    if (!field.required) return true;
    const value = product.fields?.[field.key] ?? field.defaultValue;
    return value !== undefined && value !== null && String(value).trim() !== "";
  });
  return criteriaPass && fieldsPass;
}

function scenariosComplete(product) {
  const scenarioPass = ["conservative", "base", "optimistic"].every((caseName) => {
    const scenario = product.scenarios?.[caseName] || {};
    return ["units", "price", "cogs", "marketing"].every((key) => Number(scenario[key]) > 0);
  });
  const threshold = Number(product.fields?.marginThreshold) || 0;
  return scenarioPass && computeScenario(product.scenarios?.base).cmPercent >= threshold;
}

function ensureChecks(product, stageIndex) {
  product.checks ||= blankChecks();
  product.checks[stageIndex] ||= stages[stageIndex].criteria.map(() => false);
  return product.checks[stageIndex];
}

function renderSummary() {
  const product = getActiveProduct();
  const complete = stages.filter((_, index) => isStageComplete(product, index)).length;
  const ready = stages.filter((_, index) => product.currentStage === index && isStageComplete(product, index)).length;
  const blocked = stages.filter((_, index) => product.currentStage === index && !isStageComplete(product, index)).length;
  const baseCm = computeScenario(product.scenarios?.base).cmPercent;

  currentGate.value = stages[product.currentStage]?.title || "Complete";
  gateHealth.value = ready ? "Ready to advance" : "Gate items open";
  document.querySelector("#completeCount").textContent = `${complete} / ${stages.length}`;
  document.querySelector("#readyCount").textContent = ready;
  document.querySelector("#blockedCount").textContent = blocked;
  document.querySelector("#forecastCm").textContent = `${Math.round(baseCm)}%`;
  renderProducts();
}

function addProduct() {
  const product = {
    id: crypto.randomUUID(),
    name: "New Skincare Concept",
    owner: "",
    targetLaunch: "",
    currentStage: 0,
    fields: { marginThreshold: 55 },
    checks: blankChecks(),
    scenarios: defaultScenarios(),
  };
  state.products.unshift(product);
  activeProductId = product.id;
  persistAndRender();
}

function addRaciRole() {
  state.raci ||= defaultRaci();
  state.raci.roles.push({
    role: "New role",
    person: "",
    assignments: Array(stages.length).fill(""),
  });
  activePage = "raci";
  persistAndRender();
}

function setPage(page) {
  activePage = page;
  persistAndRender();
}

function resetDemo() {
  const products = createDemoProducts();
  state = { products, activeProductId: products[0].id, activePage, raci: defaultRaci() };
  activeProductId = state.activeProductId;
  saveState();
  render();
}

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value || 0);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}
