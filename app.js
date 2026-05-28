const STORAGE_KEY = "skincare-commercialization-os-v3-eight-gates";
const LEGACY_STORAGE_KEYS = ["skincare-commercialization-os-v2", "skincare-stage-gate-manager-v1"];

const statusValues = [
  "Not Started",
  "In Progress",
  "Waiting on Vendor",
  "Waiting on Internal Decision",
  "Blocked",
  "Ready for Gate Review",
  "Approved",
];

const raciValues = ["", "A", "R", "C", "I"];

const gates = [
  {
    title: "Ideation",
    purpose: "Capture the product idea, customer problem, brand fit, and initial reason to believe before deeper validation work.",
    defaultOwner: "Product Lead",
    decisions: ["Target customer and problem are clear", "Idea fits Marin positioning", "Initial opportunity is worth validating"],
    documents: ["Idea brief", "Competitive scan", "Initial risk note"],
    criteria: ["Differentiated from existing market options", "Connects to marine glycoprotein platform", "Upside justifies validation work"],
    fields: [
      { key: "ideaSummary", label: "Idea summary", type: "textarea", span: "wide" },
      { key: "marketDifference", label: "Market difference", type: "textarea", span: "wide" },
      { key: "positioningFit", label: "Marine glycoprotein positioning fit", type: "textarea" },
      { key: "initialRisks", label: "Early risks", type: "textarea" },
    ],
  },
  {
    title: "Validation",
    purpose: "Validate the opportunity, customer need, business case, and go-forward rationale before funding development.",
    defaultOwner: "Commercial Lead",
    decisions: ["Opportunity size is attractive", "Target price and channel assumptions are approved", "Business case is worth funding"],
    documents: ["Validation readout", "One-page financial model", "Risk register"],
    criteria: ["Base contribution margin meets threshold", "Top risks have mitigation owners", "Consumer or market signal supports moving forward"],
    fields: [
      { key: "opportunitySize", label: "Opportunity size", type: "textarea", span: "wide" },
      { key: "businessRisks", label: "Business risks", type: "textarea", span: "wide" },
      { key: "marginThreshold", label: "Required base CM %", type: "number", defaultValue: 55 },
      { key: "pricingNotes", label: "Pricing and channel notes", type: "textarea", span: "wide" },
      { key: "scenarioModel", label: "Scenario model", type: "scenario" },
    ],
  },
  {
    title: "Formulation Development",
    purpose: "Develop and select the formula direction with technical feasibility, early consumer input, claims path, and safety evidence.",
    defaultOwner: "R&D / Formulation",
    decisions: ["Formula direction is selected", "Must-win performance specs are met", "Claims path is viable"],
    documents: ["Product brief", "Formula round notes", "Safety and derm testing plan"],
    criteria: ["Contract manufacturer technical track is active", "Margin check passes against pricing", "Safety and dermatology requirements are defined or complete"],
    fields: [
      { key: "manufacturer", label: "Contract manufacturer", type: "text" },
      { key: "formulaDirection", label: "Selected formula direction", type: "text" },
      { key: "consumerInput", label: "Early consumer input", type: "textarea", span: "wide" },
      { key: "performanceSpecs", label: "Must-win specification evidence", type: "textarea", span: "wide" },
      { key: "claimsStart", label: "Claims substantiation status", type: "textarea" },
      { key: "safetyDerm", label: "Safety and derm testing evidence", type: "textarea" },
    ],
  },
  {
    title: "Packaging Development",
    purpose: "Manage components, artwork, supplier timing, compatibility, and line-readiness on its own timeline.",
    defaultOwner: "Packaging / Operations",
    decisions: ["Pack architecture is approved", "Supplier and component path are approved", "Artwork route is approved"],
    documents: ["Packaging brief", "Supplier quote or MOQ summary", "Compatibility and line-trial evidence"],
    criteria: ["Component supports formula and claims", "Unit cost and MOQ are acceptable", "Critical path dates support target launch"],
    fields: [
      { key: "packagingVendor", label: "Packaging vendor", type: "text" },
      { key: "componentType", label: "Component / format", type: "text" },
      { key: "artworkStatus", label: "Artwork status", type: "select", options: statusValues },
      { key: "compatibilityNotes", label: "Compatibility notes", type: "textarea", span: "wide" },
      { key: "lineTrialNotes", label: "Line trial notes", type: "textarea" },
      { key: "packagingRisk", label: "Packaging risks", type: "textarea" },
    ],
  },
  {
    title: "Testing & Validation",
    purpose: "Validate product performance, packaging comprehension, claims documentation, and any final rework before launch planning locks.",
    defaultOwner: "Consumer Insights",
    decisions: ["IHUT outcome supports launch", "Packaging comprehension is acceptable", "Claims documentation is final"],
    documents: ["In-home use test readout", "5-second packaging test readout", "Claims final audit"],
    criteria: ["No unresolved safety signal", "Launch recommendation is written", "Required rework is closed or accepted"],
    fields: [
      { key: "ihutResult", label: "In-home use test result", type: "textarea", span: "wide" },
      { key: "packagingFiveSecond", label: "5-second packaging test", type: "textarea" },
      { key: "claimsAudit", label: "Claims final audit", type: "textarea" },
      { key: "launchRecommendation", label: "Launch recommendation", type: "textarea", span: "wide" },
    ],
  },
  {
    title: "Commercialization Planning",
    purpose: "Build the commercial plan across channel, pricing, forecast, demand generation, inventory, and customer sequencing.",
    defaultOwner: "Growth / Commercial",
    decisions: ["Launch channel sequence is approved", "Forecast and inventory plan are approved", "Pricing and promo guardrails are approved"],
    documents: ["Commercialization plan", "Forecast and inventory plan", "Launch marketing brief"],
    criteria: ["DTC-first or channel strategy is explicit", "Existing-customer plan is defined", "Contribution margin remains acceptable"],
    fields: [
      { key: "dtcPlan", label: "DTC / channel launch plan", type: "textarea", span: "wide" },
      { key: "customerPlan", label: "Existing-customer plan", type: "textarea" },
      { key: "forecastBuyRate", label: "Forecast and buy-rate assumption", type: "textarea" },
      { key: "commercialRisks", label: "Commercial risks", type: "textarea", span: "wide" },
    ],
  },
  {
    title: "Launch Readiness",
    purpose: "Confirm the team is operationally ready to launch with final product, packaging, claims, inventory, service, and go-live checks closed.",
    defaultOwner: "Operations / Launch Lead",
    decisions: ["Go-live date is approved", "Hero claim is locked", "Launch checklist is complete"],
    documents: ["Launch readiness checklist", "Final claims and asset packet", "Inventory and fulfillment confirmation"],
    criteria: ["No critical open blockers", "Customer-facing assets are final", "Support and issue escalation path is ready"],
    fields: [
      { key: "heroClaim", label: "Hero claim", type: "text" },
      { key: "launchChecklist", label: "Launch checklist notes", type: "textarea", span: "wide" },
      { key: "inventoryReadiness", label: "Inventory / fulfillment readiness", type: "textarea" },
      { key: "supportReadiness", label: "Support and escalation readiness", type: "textarea" },
    ],
  },
  {
    title: "Post-Launch Review",
    purpose: "Review 90-day commercial performance, repurchase, returns, actual margin, and safety/regulatory/claims issues surfaced after launch.",
    defaultOwner: "Growth / Commercial",
    decisions: ["Scale, iterate, or pause decision is made", "90-day learning agenda is closed", "Post-launch issue response is approved"],
    documents: ["90-day review", "Post-launch issue log", "Margin and repurchase readout"],
    criteria: ["Forecast vs. buy-rate is reviewed", "Repurchase and return rates are reviewed", "Contribution margin and safety/regulatory/claims issues are reviewed"],
    fields: [
      { key: "repurchaseRate", label: "90-day repurchase rate (%)", type: "number" },
      { key: "returnRate", label: "Return rate (%)", type: "number" },
      { key: "actualCm", label: "Actual contribution margin (%)", type: "number" },
      { key: "postLaunchIssues", label: "Safety, regulatory, or claims issues", type: "textarea", span: "wide" },
    ],
  },
];

let state = loadState();
let activeProductId = state.activeProductId || state.products[0].id;
let activePage = state.activePage || "summary";

const productList = document.querySelector("#productList");
const navButtons = document.querySelectorAll(".nav-button[data-page]");
const pages = document.querySelectorAll(".page");
const productName = document.querySelector("#productName");
const productOwner = document.querySelector("#productOwner");
const targetLaunch = document.querySelector("#targetLaunch");
const currentGate = document.querySelector("#currentGate");
const gateHealth = document.querySelector("#gateHealth");
const stageCards = document.querySelector("#stageCards");
const raciHead = document.querySelector("#raciHead");
const raciBody = document.querySelector("#raciBody");

document.querySelector("#addProductBtn").addEventListener("click", addProduct);
document.querySelector("#resetDemoBtn").addEventListener("click", resetDemo);
document.querySelector("#addRaciRoleBtn").addEventListener("click", addRaciRole);
document.querySelector("#exportProductsBtn").addEventListener("click", exportProductsCsv);
document.querySelector("#exportStagesBtn").addEventListener("click", exportStageCsv);
document.querySelector("#exportRaciBtn").addEventListener("click", exportRaciCsv);
document.querySelector("#downloadJsonBtn").addEventListener("click", downloadJson);
document.querySelector("#importJsonBtn").addEventListener("click", importJson);
document.querySelector("#detailOpenPipelineBtn").addEventListener("click", () => setPage("pipeline"));

navButtons.forEach((button) => button.addEventListener("click", () => setPage(button.dataset.page)));

[productName, productOwner, targetLaunch].forEach((element) => {
  element.addEventListener("input", () => {
    const product = getActiveProduct();
    product.name = productName.value;
    product.owner = productOwner.value;
    product.targetLaunch = targetLaunch.value;
    persistAndRender(false);
  });
});

["detailVendor", "detailFormulaRound", "detailPackagingStatus", "detailTestingStatus", "detailLaunch", "detailHeroClaim"].forEach((id) => {
  document.querySelector(`#${id}`).addEventListener("input", () => {
    const product = getActiveProduct();
    product.details.vendor = document.querySelector("#detailVendor").value;
    product.details.formulaRound = document.querySelector("#detailFormulaRound").value;
    product.details.packagingStatus = document.querySelector("#detailPackagingStatus").value;
    product.details.testingStatus = document.querySelector("#detailTestingStatus").value;
    product.targetLaunch = document.querySelector("#detailLaunch").value;
    product.details.heroClaim = document.querySelector("#detailHeroClaim").value;
    persistAndRender(false);
  });
});

render();

function createDemoProducts() {
  return [
    createProduct({
      name: "Mint Lip Treatment",
      owner: "Product Lead",
      targetLaunch: "2026-11-15",
      currentGate: 2,
      details: {
        vendor: "North Coast Labs",
        formulaRound: "F-04",
        packagingStatus: "Waiting on Vendor",
        testingStatus: "In Progress",
        heroClaim: "Instant cooling comfort with marine glycoprotein barrier support",
      },
      fields: {
        ideaSummary: "A daily mint lip treatment for dry, reactive lips.",
        marketDifference: "Cooling sensory profile plus barrier-care positioning instead of a plain balm.",
        positioningFit: "Marine glycoprotein supports the hydration and comfort story.",
        initialRisks: "Flavor allergen review, tube compatibility, and cooling level.",
        opportunitySize: "Strong add-on product for existing DTC customers and replenishment bundles.",
        businessRisks: "Low AOV if sold alone; component MOQ could pressure cash.",
        marginThreshold: 58,
        pricingNotes: "$24 DTC target with bundle strategy.",
        manufacturer: "North Coast Labs",
        formulaDirection: "F-04 mint peptide balm",
      },
      stageOverrides: {
        0: { status: "Approved", owner: "Product Lead", decisions: [true, true, true], documents: [true, true, true], criteria: [true, true, true] },
        1: { status: "Approved", owner: "Commercial Lead", decisions: [true, true, true], documents: [true, true, true], criteria: [true, true, true] },
        2: { status: "In Progress", owner: "R&D / Formulation", decisions: [true, false, false], documents: [true, true, false], criteria: [true, true, false], blockers: "Awaiting final flavor allergen and derm review." },
        3: { status: "Waiting on Vendor", owner: "Packaging / Operations", blockers: "Supplier confirming applicator MOQ and lead time." },
        4: { status: "Not Started", owner: "Consumer Insights" },
        5: { status: "Not Started", owner: "Growth / Commercial" },
      },
    }),
    createProduct({
      name: "Mini Cream",
      owner: "Commercial Lead",
      targetLaunch: "2027-02-01",
      currentGate: 1,
      details: {
        vendor: "TBD",
        formulaRound: "Concept",
        packagingStatus: "Not Started",
        testingStatus: "Not Started",
        heroClaim: "Barrier recovery in a travel-ready mini",
      },
      fields: {
        ideaSummary: "Mini format of a barrier cream for trial, travel, and sets.",
        marketDifference: "Accessible trial size linked to a premium science platform.",
        positioningFit: "Clear marine glycoprotein story for stressed skin barrier.",
        initialRisks: "Margin and component cost could be tight at mini size.",
        marginThreshold: 52,
      },
      stageOverrides: {
        0: { status: "Approved", owner: "Product Lead", decisions: [true, true, true], documents: [true, true, true], criteria: [true, true, true] },
        1: { status: "Waiting on Internal Decision", owner: "Commercial Lead", blockers: "Needs price architecture and bundle strategy decision." },
      },
    }),
  ];
}

function createProduct(options = {}) {
  const product = {
    id: crypto.randomUUID(),
    name: options.name || "New Skincare Concept",
    owner: options.owner || "",
    targetLaunch: options.targetLaunch || "",
    currentGate: options.currentGate || 0,
    details: {
      vendor: "",
      formulaRound: "",
      packagingStatus: "Not Started",
      testingStatus: "Not Started",
      heroClaim: "",
      ...(options.details || {}),
    },
    fields: {
      marginThreshold: 55,
      ...(options.fields || {}),
    },
    scenarios: defaultScenarios(options.scenarioOverrides || {}),
    gateData: gates.map((gate, index) => ({
      status: index === 0 ? "In Progress" : "Not Started",
      owner: gate.defaultOwner,
      blockers: "",
      notes: "",
      decisions: gate.decisions.map(() => false),
      documents: gate.documents.map(() => false),
      criteria: gate.criteria.map(() => false),
    })),
  };

  Object.entries(options.stageOverrides || {}).forEach(([index, override]) => {
    product.gateData[Number(index)] = { ...product.gateData[Number(index)], ...override };
  });

  return product;
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return normalizeState(JSON.parse(saved));
    } catch {}
  }
  const products = createDemoProducts();
  return normalizeState({ products, activeProductId: products[0].id, activePage: "summary", raci: defaultRaci() });
}

function normalizeState(raw) {
  const products = Array.isArray(raw.products) && raw.products.length ? raw.products : createDemoProducts();
  products.forEach(normalizeProduct);
  return {
    products,
    activeProductId: raw.activeProductId || products[0].id,
    activePage: raw.activePage || "summary",
    raci: normalizeRaci(raw.raci),
  };
}

function normalizeProduct(product) {
  product.id ||= crypto.randomUUID();
  product.details ||= {};
  product.fields ||= {};
  product.scenarios ||= defaultScenarios();
  product.gateData ||= [];
  gates.forEach((gate, index) => {
    const data = product.gateData[index] || {};
    product.gateData[index] = {
      status: statusValues.includes(data.status) ? data.status : index === product.currentGate ? "In Progress" : "Not Started",
      owner: data.owner || gate.defaultOwner,
      blockers: data.blockers || "",
      notes: data.notes || "",
      decisions: gate.decisions.map((_, itemIndex) => Boolean(data.decisions?.[itemIndex])),
      documents: gate.documents.map((_, itemIndex) => Boolean(data.documents?.[itemIndex])),
      criteria: gate.criteria.map((_, itemIndex) => Boolean(data.criteria?.[itemIndex])),
    };
  });
  product.currentGate = Math.min(Number(product.currentGate) || 0, gates.length - 1);
  product.details.packagingStatus ||= "Not Started";
  product.details.testingStatus ||= "Not Started";
}

function saveState() {
  state.activeProductId = activeProductId;
  state.activePage = activePage;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  const product = getActiveProduct();
  productName.value = product.name || "";
  productOwner.value = product.owner || "";
  targetLaunch.value = product.targetLaunch || "";
  renderPage();
  renderProducts();
  renderSummary();
  renderPipeline(product);
  renderDetail(product);
  renderRaci();
}

function renderPage() {
  pages.forEach((page) => page.classList.toggle("active", page.id === `${activePage}Page`));
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.page === activePage));
}

function renderProducts() {
  productList.innerHTML = "";
  state.products.forEach((product) => {
    const button = document.createElement("button");
    button.className = `product-tab${product.id === activeProductId ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${escapeHtml(product.name || "Untitled product")}</strong><span>${gates[product.currentGate]?.title || "Complete"} · ${currentGateStatus(product)}</span>`;
    button.addEventListener("click", () => {
      activeProductId = product.id;
      activePage = "detail";
      persistAndRender();
    });
    productList.append(button);
  });
}

function renderSummary() {
  const activeProducts = state.products.length;
  const ready = state.products.filter((product) => currentGateStatus(product) === "Ready for Gate Review").length;
  const blocked = state.products.filter((product) => hasBlocker(product)).length;
  const approvedGates = state.products.flatMap((product) => product.gateData).filter((gate) => gate.status === "Approved").length;
  const totalGates = state.products.length * gates.length;

  document.querySelector("#summaryMetrics").innerHTML = `
    <div><span>${activeProducts}</span><small>Active products</small></div>
    <div><span>${ready}</span><small>Ready for review</small></div>
    <div><span>${blocked}</span><small>Products blocked</small></div>
    <div><span>${Math.round((approvedGates / totalGates) * 100) || 0}%</span><small>Gate completion</small></div>
  `;

  const tbody = document.querySelector("#summaryProductRows");
  tbody.innerHTML = "";
  state.products.forEach((product) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><button class="link-button" type="button">${escapeHtml(product.name)}</button></td>
      <td>${escapeHtml(gates[product.currentGate].title)}</td>
      <td><span class="status-pill ${statusClass(currentGateStatus(product))}">${escapeHtml(currentGateStatus(product))}</span></td>
      <td>${escapeHtml(product.targetLaunch || "TBD")}</td>
      <td>${countBlockers(product)}</td>
    `;
    tr.querySelector("button").addEventListener("click", () => {
      activeProductId = product.id;
      activePage = "detail";
      persistAndRender();
    });
    tbody.append(tr);
  });

  const gateLoad = document.querySelector("#gateLoad");
  gateLoad.innerHTML = "";
  gates.forEach((gate, index) => {
    const inGate = state.products.filter((product) => product.currentGate === index).length;
    const div = document.createElement("div");
    div.innerHTML = `<strong>${escapeHtml(gate.title)}</strong><span>${inGate} product${inGate === 1 ? "" : "s"}</span>`;
    gateLoad.append(div);
  });
}

function renderPipeline(product) {
  currentGate.value = gates[product.currentGate].title;
  gateHealth.value = getGateHealth(product, product.currentGate);
  document.querySelector("#completeCount").textContent = `${product.gateData.filter((gate) => gate.status === "Approved").length} / ${gates.length}`;
  document.querySelector("#readyCount").textContent = product.gateData.filter((gate) => gate.status === "Ready for Gate Review").length;
  document.querySelector("#blockedCount").textContent = countBlockers(product);
  document.querySelector("#forecastCm").textContent = `${Math.round(computeScenario(product.scenarios.base).cmPercent)}%`;

  stageCards.innerHTML = "";
  gates.forEach((gate, gateIndex) => {
    const data = product.gateData[gateIndex];
    const card = document.querySelector("#stageTemplate").content.firstElementChild.cloneNode(true);
    const ready = isGateReady(product, gateIndex);
    const current = product.currentGate === gateIndex;
    card.classList.toggle("current", current);
    card.classList.toggle("complete", data.status === "Approved");
    card.classList.toggle("has-blocker", data.status === "Blocked" || Boolean(data.blockers.trim()));
    card.querySelector(".stage-number").textContent = `Gate ${gateIndex + 1}`;
    card.querySelector("h2").textContent = gate.title;
    card.querySelector(".stage-purpose").textContent = gate.purpose;
    const statusEl = card.querySelector(".stage-status");
    statusEl.textContent = data.status;
    statusEl.className = `stage-status ${statusClass(data.status)}`;
    renderStageAdmin(card.querySelector(".stage-admin-grid"), product, gateIndex);
    renderOutputChecklist(card.querySelector(".output-grid"), product, gateIndex);
    renderInputs(card.querySelector(".input-grid"), product, gateIndex);
    renderStageActions(card, product, gateIndex, ready);
    stageCards.append(card);
  });
}

function renderStageAdmin(container, product, gateIndex) {
  const data = product.gateData[gateIndex];
  container.innerHTML = "";
  container.append(
    fieldShell("Status", renderSelect(data.status, statusValues, (value) => {
      data.status = value;
      persistAndRender();
    })),
    fieldShell("Owner", renderInput(data.owner, (value) => {
      data.owner = value;
      persistAndRender(false);
    })),
    fieldShell("Blockers", renderTextarea(data.blockers, (value) => {
      data.blockers = value;
      persistAndRender(false);
    })),
    fieldShell("Notes", renderTextarea(data.notes, (value) => {
      data.notes = value;
      persistAndRender(false);
    })),
  );
}

function renderOutputChecklist(container, product, gateIndex) {
  container.innerHTML = "";
  const gate = gates[gateIndex];
  const data = product.gateData[gateIndex];
  [
    ["Required decisions", "decisions", gate.decisions],
    ["Required documents", "documents", gate.documents],
    ["Go/no-go criteria", "criteria", gate.criteria],
  ].forEach(([title, key, items]) => {
    const section = document.createElement("section");
    section.className = "output-section";
    section.innerHTML = `<h3>${title}</h3>`;
    items.forEach((item, itemIndex) => {
      const label = document.createElement("label");
      label.className = "criterion";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Boolean(data[key][itemIndex]);
      checkbox.addEventListener("change", () => {
        data[key][itemIndex] = checkbox.checked;
        if (isGateReady(product, gateIndex) && data.status !== "Approved") data.status = "Ready for Gate Review";
        persistAndRender();
      });
      label.append(checkbox, document.createTextNode(item));
      section.append(label);
    });
    container.append(section);
  });
}

function renderInputs(container, product, gateIndex) {
  container.innerHTML = "";
  gates[gateIndex].fields.forEach((field) => {
    if (field.type === "scenario") {
      container.append(renderScenarioModel(product));
      return;
    }
    const value = product.fields[field.key] ?? field.defaultValue ?? "";
    const control = field.type === "textarea"
      ? renderTextarea(value, (newValue) => {
          product.fields[field.key] = newValue;
          persistAndRender(false);
        })
      : field.type === "select"
        ? renderSelect(value, field.options || statusValues, (newValue) => {
            product.fields[field.key] = newValue;
            persistAndRender(false);
          })
        : renderInput(value, (newValue) => {
            product.fields[field.key] = field.type === "number" ? Number(newValue) : newValue;
            persistAndRender(false);
          }, field.type);
    const shell = fieldShell(field.label, control);
    if (field.span) shell.classList.add(field.span);
    container.append(shell);
  });
}

function renderStageActions(card, product, gateIndex, ready) {
  const backButton = card.querySelector(".back-button");
  const advanceButton = card.querySelector(".advance-button");
  backButton.disabled = gateIndex !== product.currentGate || product.currentGate === 0;
  advanceButton.disabled = gateIndex !== product.currentGate || !ready;
  advanceButton.textContent = gateIndex === gates.length - 1 ? "Complete Review" : "Advance";
  backButton.addEventListener("click", () => {
    product.currentGate = Math.max(0, product.currentGate - 1);
    persistAndRender();
  });
  advanceButton.addEventListener("click", () => {
    product.gateData[gateIndex].status = "Approved";
    product.currentGate = Math.min(gates.length - 1, product.currentGate + 1);
    if (product.gateData[product.currentGate].status === "Not Started") product.gateData[product.currentGate].status = "In Progress";
    persistAndRender();
  });
}

function renderDetail(product) {
  document.querySelector("#detailTitle").textContent = product.name || "Product Detail";
  document.querySelector("#detailSubtitle").textContent = `${gates[product.currentGate].title} · ${product.owner || "Owner unassigned"} · Launch ${product.targetLaunch || "TBD"}`;
  const currentStatus = document.querySelector("#detailCurrentStatus");
  currentStatus.textContent = currentGateStatus(product);
  currentStatus.className = `status-pill ${statusClass(currentGateStatus(product))}`;
  setSelectOptions(document.querySelector("#detailPackagingStatus"), statusValues, product.details.packagingStatus);
  setSelectOptions(document.querySelector("#detailTestingStatus"), statusValues, product.details.testingStatus);
  document.querySelector("#detailVendor").value = product.details.vendor || "";
  document.querySelector("#detailFormulaRound").value = product.details.formulaRound || "";
  document.querySelector("#detailLaunch").value = product.targetLaunch || "";
  document.querySelector("#detailHeroClaim").value = product.details.heroClaim || "";

  renderDetailMetrics(product);
  renderDetailTimeline(product);

  const detailStages = document.querySelector("#detailStages");
  detailStages.innerHTML = "";
  gates.forEach((gate, index) => {
    const data = product.gateData[index];
    const totals = gateOutputTotals(data);
    const percent = Math.round((totals.done / totals.total) * 100) || 0;
    const div = document.createElement("article");
    div.className = "detail-stage-card";
    div.innerHTML = `
      <div class="detail-stage-main">
        <div>
          <p>Gate ${index + 1}</p>
          <h3>${escapeHtml(gate.title)}</h3>
        </div>
        <span class="status-pill ${statusClass(data.status)}">${escapeHtml(data.status)}</span>
      </div>
      <div class="detail-progress" aria-label="${percent}% complete"><span style="width: ${percent}%"></span></div>
      <div class="detail-stage-stats">
        <span>${totals.decisions}/${gate.decisions.length} decisions</span>
        <span>${totals.documents}/${gate.documents.length} docs</span>
        <span>${totals.criteria}/${gate.criteria.length} criteria</span>
      </div>
      <div class="detail-stage-meta">
        <div><strong>Owner</strong><span>${escapeHtml(data.owner || "Unassigned")}</span></div>
        <div><strong>Blockers</strong><span>${escapeHtml(data.blockers || "None")}</span></div>
        <div><strong>Notes</strong><span>${escapeHtml(data.notes || "None")}</span></div>
      </div>
    `;
    div.addEventListener("click", () => {
      product.currentGate = index;
      activePage = "pipeline";
      persistAndRender();
    });
    detailStages.append(div);
  });

  const totalOutputs = product.gateData.reduce((sum, data) => sum + gateOutputTotals(data).total, 0);
  const doneOutputs = product.gateData.reduce((sum, data) => sum + gateOutputTotals(data).done, 0);
  document.querySelector("#detailEvidenceSummary").textContent = `${doneOutputs}/${totalOutputs} outputs complete`;
}

function renderDetailMetrics(product) {
  const approved = product.gateData.filter((gate) => gate.status === "Approved").length;
  const blockers = countBlockers(product);
  const ready = product.gateData.filter((gate) => gate.status === "Ready for Gate Review").length;
  const baseCm = Math.round(computeScenario(product.scenarios.base).cmPercent) || 0;
  document.querySelector("#detailMetrics").innerHTML = `
    <div><span>${approved}/${gates.length}</span><small>Approved gates</small></div>
    <div><span>${ready}</span><small>Ready for review</small></div>
    <div><span>${blockers}</span><small>Open blockers</small></div>
    <div><span>${baseCm}%</span><small>Base CM</small></div>
  `;
}

function renderDetailTimeline(product) {
  const timeline = document.querySelector("#detailTimeline");
  timeline.innerHTML = "";
  gates.forEach((gate, index) => {
    const item = document.createElement("button");
    item.className = `timeline-item ${statusClass(product.gateData[index].status)}${index === product.currentGate ? " current" : ""}`;
    item.type = "button";
    item.innerHTML = `<span>${index + 1}</span><strong>${escapeHtml(gate.title)}</strong><small>${escapeHtml(product.gateData[index].status)}</small>`;
    item.addEventListener("click", () => {
      product.currentGate = index;
      activePage = "pipeline";
      persistAndRender();
    });
    timeline.append(item);
  });
}

function gateOutputTotals(data) {
  return {
    decisions: data.decisions.filter(Boolean).length,
    documents: data.documents.filter(Boolean).length,
    criteria: data.criteria.filter(Boolean).length,
    total: data.decisions.length + data.documents.length + data.criteria.length,
    done: data.decisions.filter(Boolean).length + data.documents.filter(Boolean).length + data.criteria.filter(Boolean).length,
  };
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
  gates.forEach((gate) => {
    const th = document.createElement("th");
    th.className = "stage-col";
    th.textContent = gate.title;
    raciHead.append(th);
  });
  raciHead.append(document.createElement("th"));

  state.raci.roles.forEach((role, roleIndex) => {
    const tr = document.createElement("tr");
    tr.append(renderRaciTextInput(role, roleIndex, "role", "Role"));
    tr.append(renderRaciTextInput(role, roleIndex, "person", "Person"));
    gates.forEach((_, gateIndex) => {
      const td = document.createElement("td");
      td.className = "assignment-cell";
      const select = renderSelect(role.assignments[gateIndex] || "", raciValues, (value) => setRaciAssignment(roleIndex, gateIndex, value));
      select.className = statusClass(select.value);
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

function renderRaciTextInput(role, roleIndex, key, placeholder) {
  const td = document.createElement("td");
  const input = renderInput(role[key] || "", (value) => {
    state.raci.roles[roleIndex][key] = value;
    persistAndRender(false);
  });
  input.placeholder = placeholder;
  td.append(input);
  return td;
}

function renderRaciAccountableWarnings() {
  gates.forEach((_, gateIndex) => {
    const accountable = state.raci.roles.filter((role) => role.assignments?.[gateIndex] === "A");
    if (accountable.length === 1 && accountable[0].person.trim()) return;
    const cell = raciBody.rows[0]?.cells[gateIndex + 2];
    if (!cell) return;
    const warning = document.createElement("div");
    warning.className = "raci-warning";
    warning.textContent = accountable.length === 0 ? "Needs one A" : "Name the A";
    cell.append(warning);
  });
}

function renderScenarioModel(product) {
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
  wrapper.innerHTML = "<table><thead><tr><th>One-page financial model</th><th>Conservative</th><th>Base</th><th>Optimistic</th></tr></thead><tbody></tbody></table>";
  const tbody = wrapper.querySelector("tbody");
  rows.forEach(([label, key]) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${label}</td>`;
    cases.forEach((caseName) => {
      const td = document.createElement("td");
      const computed = computeScenario(product.scenarios[caseName]);
      if (["revenue", "grossProfit", "contributionMargin", "cmPercent"].includes(key)) {
        td.innerHTML = `<output>${key === "cmPercent" ? `${Math.round(computed[key])}%` : money(computed[key])}</output>`;
      } else {
        const input = renderInput(product.scenarios[caseName][key], (value) => {
          product.scenarios[caseName][key] = Number(value);
          persistAndRender();
        }, "number");
        td.append(input);
      }
      tr.append(td);
    });
    tbody.append(tr);
  });
  return wrapper;
}

function fieldShell(label, control) {
  const wrapper = document.createElement("label");
  wrapper.className = "input-field";
  wrapper.append(document.createTextNode(label), control);
  return wrapper;
}

function renderInput(value, onInput, type = "text") {
  const input = document.createElement("input");
  input.type = type;
  input.value = value ?? "";
  input.addEventListener("input", () => onInput(input.value));
  return input;
}

function renderTextarea(value, onInput) {
  const textarea = document.createElement("textarea");
  textarea.value = value ?? "";
  textarea.addEventListener("input", () => onInput(textarea.value));
  return textarea;
}

function renderSelect(value, values, onChange) {
  const select = document.createElement("select");
  setSelectOptions(select, values, value);
  select.addEventListener("change", () => onChange(select.value));
  return select;
}

function setSelectOptions(select, values, selectedValue) {
  select.innerHTML = "";
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value || "-";
    select.append(option);
  });
  select.value = selectedValue || values[0] || "";
}

function isGateReady(product, gateIndex) {
  const data = product.gateData[gateIndex];
  const outputsReady = ["decisions", "documents", "criteria"].every((key) => data[key].every(Boolean));
  const businessReady = gates[gateIndex].fields.some((field) => field.type === "scenario") ? scenariosComplete(product) : true;
  return outputsReady && businessReady && data.status !== "Blocked";
}

function getGateHealth(product, gateIndex) {
  const data = product.gateData[gateIndex];
  if (data.status === "Blocked" || data.blockers.trim()) return "Blocked or at risk";
  if (isGateReady(product, gateIndex)) return "Ready for gate review";
  return "Outputs still open";
}

function currentGateStatus(product) {
  return product.gateData[product.currentGate]?.status || "Not Started";
}

function hasBlocker(product) {
  return product.gateData.some((gate) => gate.status === "Blocked" || gate.blockers.trim());
}

function countBlockers(product) {
  return product.gateData.filter((gate) => gate.status === "Blocked" || gate.blockers.trim()).length;
}

function scenariosComplete(product) {
  const scenarioPass = ["conservative", "base", "optimistic"].every((caseName) => {
    const scenario = product.scenarios?.[caseName] || {};
    return ["units", "price", "cogs", "marketing"].every((key) => Number(scenario[key]) > 0);
  });
  const threshold = Number(product.fields?.marginThreshold) || 0;
  return scenarioPass && computeScenario(product.scenarios?.base).cmPercent >= threshold;
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

function defaultScenarios(overrides = {}) {
  return {
    conservative: { units: 15000, price: 58, cogs: 16, marketing: 160000, ...overrides.conservative },
    base: { units: 30000, price: 58, cogs: 14.5, marketing: 260000, ...overrides.base },
    optimistic: { units: 52000, price: 58, cogs: 13.5, marketing: 390000, ...overrides.optimistic },
  };
}

function defaultRaci() {
  return {
    roles: [
      { role: "Founder / CEO", person: "", assignments: ["A", "A", "I", "I", "I", "I", "A", "A"] },
      { role: "Product Lead", person: "", assignments: ["R", "R", "C", "C", "A", "C", "R", "C"] },
      { role: "R&D / Formulation", person: "", assignments: ["C", "C", "A", "C", "R", "C", "C", "C"] },
      { role: "Packaging / Operations", person: "", assignments: ["I", "C", "C", "A", "R", "C", "R", "I"] },
      { role: "Regulatory / Claims", person: "", assignments: ["C", "C", "C", "C", "R", "C", "R", "C"] },
      { role: "Growth / Marketing", person: "", assignments: ["C", "R", "C", "C", "C", "A", "R", "R"] },
      { role: "Customer Experience", person: "", assignments: ["I", "C", "I", "I", "C", "C", "R", "R"] },
    ],
  };
}

function normalizeRaci(raci) {
  const normalized = raci && Array.isArray(raci.roles) && raci.roles.length ? raci : defaultRaci();
  normalized.roles.forEach((role) => {
    role.assignments ||= [];
    role.assignments = gates.map((_, index) => role.assignments[index] || "");
    role.role ||= "";
    role.person ||= "";
  });
  return normalized;
}

function setRaciAssignment(roleIndex, gateIndex, value) {
  state.raci.roles.forEach((role, index) => {
    if (value === "A" && index !== roleIndex && role.assignments[gateIndex] === "A") role.assignments[gateIndex] = "";
  });
  state.raci.roles[roleIndex].assignments[gateIndex] = value;
  persistAndRender();
}

function addRaciRole() {
  state.raci.roles.push({ role: "New role", person: "", assignments: gates.map(() => "") });
  activePage = "raci";
  persistAndRender();
}

function addProduct() {
  const product = createProduct();
  state.products.unshift(product);
  activeProductId = product.id;
  activePage = "detail";
  persistAndRender();
}

function resetDemo() {
  [STORAGE_KEY, ...LEGACY_STORAGE_KEYS].forEach((key) => localStorage.removeItem(key));
  const products = createDemoProducts();
  state = normalizeState({ products, activeProductId: products[0].id, activePage: "summary", raci: defaultRaci() });
  activeProductId = state.activeProductId;
  activePage = state.activePage;
  saveState();
  render();
}

function setPage(page) {
  activePage = page;
  persistAndRender();
}

function getActiveProduct() {
  return state.products.find((product) => product.id === activeProductId) || state.products[0];
}

function persistAndRender(full = true) {
  saveState();
  if (full) render();
  else {
    renderProducts();
    renderSummary();
  }
}

function exportProductsCsv() {
  const rows = [["Product", "Owner", "Target Launch", "Current Gate", "Current Status", "Vendor", "Formula Round", "Packaging Status", "Testing Status"]];
  state.products.forEach((product) => rows.push([
    product.name,
    product.owner,
    product.targetLaunch,
    gates[product.currentGate].title,
    currentGateStatus(product),
    product.details.vendor,
    product.details.formulaRound,
    product.details.packagingStatus,
    product.details.testingStatus,
  ]));
  downloadText("products.csv", toCsv(rows), "text/csv");
}

function exportStageCsv() {
  const rows = [["Product", "Gate", "Status", "Owner", "Blockers", "Notes", "Decisions Complete", "Documents Complete", "Criteria Complete"]];
  state.products.forEach((product) => {
    product.gateData.forEach((data, index) => rows.push([
      product.name,
      gates[index].title,
      data.status,
      data.owner,
      data.blockers,
      data.notes,
      `${data.decisions.filter(Boolean).length}/${data.decisions.length}`,
      `${data.documents.filter(Boolean).length}/${data.documents.length}`,
      `${data.criteria.filter(Boolean).length}/${data.criteria.length}`,
    ]));
  });
  downloadText("stage-outputs.csv", toCsv(rows), "text/csv");
}

function exportRaciCsv() {
  const rows = [["Role", "Person", ...gates.map((gate) => gate.title)]];
  state.raci.roles.forEach((role) => rows.push([role.role, role.person, ...role.assignments]));
  downloadText("raci.csv", toCsv(rows), "text/csv");
}

function downloadJson() {
  downloadText("commercialization-os-backup.json", JSON.stringify(state, null, 2), "application/json");
}

function importJson() {
  const message = document.querySelector("#adminMessage");
  try {
    state = normalizeState(JSON.parse(document.querySelector("#importJson").value));
    activeProductId = state.activeProductId;
    activePage = state.activePage;
    saveState();
    message.textContent = "Backup imported.";
    render();
  } catch {
    message.textContent = "That backup could not be imported.";
  }
}

function toCsv(rows) {
  return rows.map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
}

function downloadText(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function statusClass(value) {
  return String(value || "")
    .toLowerCase()
    .replaceAll("/", "")
    .replaceAll(" ", "-");
}

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value || 0);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}
