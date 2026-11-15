// Asthma Pathophysiology Explorer — expanded visual version
// Uses p5.js v2. The airway is a teaching schematic and is not to scale.

const lessons = [
  {
    title: "1. The big picture: four changes narrow the airway",
    focus: "Muscle squeeze, wall swelling, mucus and wall remodelling can all reduce the room for air.",
    cards: [
      "Muscle contracts → lumen narrows",
      "Inflammation → fluid swells the wall",
      "Mucus builds → occupies the lumen",
      "Repeated inflammation → wall remodelling"
    ],
    notes: [
      "These are the shared end points; different people may have different mixes.",
      "The next stages trace the risk, triggers and signals that can lead here."
    ],
    active: 3,
    scene: { mode: "compare", constriction: 0.56, edema: 0.44, mucus: 0.48, remodel: 0.30, damage: 0.25, actors: [] }
  },
  {
    title: "2. Start with the small airway",
    focus: "Cross-section: one epithelial cell layer lines the blue lumen; pink bands outside it are other airway-wall tissues.",
    cards: [
      "Lumen = the open air channel",
      "Epithelium = one layer of barrier cells",
      "Outside it: support tissue, vessels and muscle"
    ],
    notes: [
      "Imagine cutting across a small airway tube: the blue centre is its lumen; pale oval shapes at the edge are lining cells.",
      "Pink bands are support tissue and muscle. Larger bronchi can look multilayered (pseudostratified), but the lining is still one cell layer; this small-airway view is simplified."
    ],
    active: 0,
    scene: { mode: "anatomy", constriction: 0, edema: 0, mucus: 0, remodel: 0, damage: 0, actors: [] }
  },
  {
    title: "3. Susceptibility is shaped over time",
    focus: "Genes and early environment shape susceptibility alongside exposures across life.",
    cards: [
      "Inherited variants can shift risk",
      "Atopy can favour allergen-specific IgE responses",
      "Early environment can shape immune development"
    ],
    notes: [
      "Susceptibility is the background on which later triggers act.",
      "Early microbial exposure can shape immune development; vaccination protects against specific infections."
    ],
    active: 0,
    scene: { mode: "susceptibility", constriction: 0, edema: 0, mucus: 0, remodel: 0, damage: 0, actors: [["dna", "Risk genes"], ["microbe", "Environment"]] }
  },
  {
    title: "4. A trigger meets the airway barrier",
    focus: "A trigger can bring on a flare in an airway made susceptible by genes, development and environment.",
    cards: [
      "Allergen / virus / irritant reaches the airway",
      "Cold air, exercise or work exposure can also trigger symptoms",
      "AERD, reflux or emotion matter for some people"
    ],
    notes: [
      "A trigger can start a flare; susceptibility is shaped over time.",
      "Next, the airway lining senses stress and sends alarm signals; AERD is a distinct NSAID-sensitive pathway."
    ],
    active: 0,
    scene: { mode: "trigger", constriction: 0.04, edema: 0, mucus: 0, remodel: 0, damage: 0.12, actors: [["allergen", "Allergen"], ["virus", "Irritant / virus"]] }
  },
  {
    title: "5. The epithelium sends an alarm",
    focus: "One epithelial cell layer senses stress and sends alarmin signals to nearby immune cells.",
    cards: [
      "Stressed lining → TSLP, IL-25 and IL-33 alarms",
      "Dendritic cell carries allergen information to T cells",
      "ILC2 hears alarmins → can release IL-5 / IL-13"
    ],
    notes: [
      "Orange dots represent alarmin messages released by stressed lining cells and travelling to nearby immune cells.",
      "Alarmins hand off a danger message to immune cells; the dendritic cell also carries allergen information."
    ],
    active: 1,
    scene: { mode: "alarmin", constriction: 0.04, edema: 0.02, mucus: 0, remodel: 0, damage: 0.22, actors: [["epithelium", "Stressed lining"], ["dendritic", "Dendritic cell"], ["ilc2", "ILC2"]] }
  },
  {
    title: "6. Who are the immune cells?",
    focus: "Follow one allergen-specific relay: a dendritic scout activates a T helper, which helps a matching B cell make IgE.",
    cards: [
      "Origins: immune cells start from bone-marrow stem cells; B cells mature there, T cells in thymus",
      "T and B cells are lymphocytes: T helpers coordinate; B cells recognise specific targets",
      "In lymph nodes, dendritic cells show allergen pieces to CD4 T cells; activated CD4 cells can become Th2",
      "IL-4 supports class-switching: a matching B cell keeps its target but switches antibody type to IgE"
    ],
    notes: [
      "Origin: Blood-forming stem cells in bone marrow make immune cells. B cells mature in marrow; T cells mature in thymus; dendritic and mast precursors mature in tissues.",
      "Relay: Dendritic cells show allergen fragments to naïve CD4 T cells. Th2 signals help matching B cells class-switch to IgE; plasma cells release IgE, which coats mast cells. Alarmins also activate ILC2s."
    ],
    active: 1,
    scene: { mode: "immuneCells", constriction: 0, edema: 0, mucus: 0, remodel: 0, damage: 0, actors: [] }
  },
  {
    title: "7. Sensitisation builds allergen-specific IgE",
    focus: "In allergic asthma, Th2 signals help B cells make allergen-specific IgE that coats mast cells.",
    cards: [
      "Allergen presentation → CD4 helper T-cell response",
      "Th2 IL-4 → B cell switches to allergen-specific IgE",
      "Allergen-specific IgE coats mast cells → sensitisation"
    ],
    notes: [
      "Sensitisation prepares the system; it can develop before symptoms appear.",
      "Next, allergen re-exposure can link IgE molecules on mast cells and activate them; other asthma pathways also occur."
    ],
    active: 1,
    scene: { mode: "sensitisation", constriction: 0.04, edema: 0.02, mucus: 0, remodel: 0, damage: 0.12, actors: [["dendritic", "Antigen"], ["th2", "Th2"], ["bcell", "B cell"], ["mast", "IgE-coated mast"]] }
  },
  {
    title: "8. Re-exposure activates mast cells",
    focus: "On re-exposure, allergen cross-links mast-cell IgE; mediators start a fast response and recruit later inflammation.",
    cards: [
      "Allergen cross-links IgE / FcεRI → mast cell activates",
      "Histamine and leukotrienes → fast inflammatory signals",
      "Muscle, vessels, nerves and glands respond"
    ],
    notes: [
      "Mast cells translate allergen recognition into chemical signals; they are one part of the airway network.",
      "Next, mediators and vagal ACh can make the muscle ring contract."
    ],
    active: 1,
    scene: { mode: "crosslink", constriction: 0.12, edema: 0.12, mucus: 0.12, remodel: 0, damage: 0.12, actors: [["allergen", "Allergen"], ["mast", "Mast cell"], ["mediator", "Mediators"]] }
  },
  {
    title: "9. Fast response: smooth muscle squeezes",
    focus: "Mast mediators and vagal ACh can contract muscle; β2 stimulation can relax the same ring.",
    cards: [
      "Mediator / vagal ACh signal → M3 activation",
      "Smooth-muscle ring contracts → lumen narrows",
      "β2 stimulation → muscle relaxes → lumen widens"
    ],
    notes: [
      "Contraction is a fast, reversible part of the response, though the degree varies.",
      "Next, fluid swells the wall and mucus occupies the lumen from the inside."
    ],
    active: 2,
    scene: { mode: "bronchoconstriction", constriction: 0.66, edema: 0.14, mucus: 0.16, remodel: 0, damage: 0.16, actors: [["mast", "Mast mediators"], ["ach", "ACh"], ["m3", "M3 receptor"]] }
  },
  {
    title: "10. Oedema and mucus reduce the open space",
    focus: "Inflammation can leak fluid into the wall, while IL-13 can increase mucus inside the lumen.",
    cards: [
      "Inflammatory signals → small vessels leak → oedema",
      "IL-13 → more goblet-cell / gland mucus",
      "Wall swells inward + mucus fills lumen"
    ],
    notes: [
      "This is a second route to narrowing alongside muscle contraction.",
      "Immune cells can maintain or amplify inflammation; mucus levels vary between flares."
    ],
    active: 2,
    scene: { mode: "edemaMucus", constriction: 0.22, edema: 0.68, mucus: 0.72, remodel: 0.02, damage: 0.22, actors: [["vessel", "Leaky vessel"], ["mucus", "Mucus"]] }
  },
  {
    title: "11. Late response: eosinophils sustain inflammation",
    focus: "In many T2-high pathways, IL-5 supports eosinophils; their granules can injure lining, while IL-13 can increase mucus and remodelling.",
    cards: [
      "IL-5 → eosinophil growth and survival",
      "Activated eosinophil → granule proteins → lining injury",
      "IL-13 → mucus, sensitivity and remodelling signals"
    ],
    notes: [
      "This later response can overlap with the early mast-cell response.",
      "Eosinophil levels vary; the next stage shows a different inflammatory pattern."
    ],
    active: 1,
    scene: { mode: "eosinophil", constriction: 0.28, edema: 0.40, mucus: 0.42, remodel: 0.06, damage: 0.62, actors: [["th2", "IL-5 signal"], ["eosinophil", "Eosinophil"]] }
  },
  {
    title: "12. T2-low: another inflammatory route",
    focus: "One T2-low route: neutrophils release NET webs; inflammation, mucus and muscle can still narrow the airway.",
    cards: [
      "Th1 / Th17 signals can recruit neutrophils",
      "NET = neutrophil extracellular trap: a sticky mesh of neutrophil DNA coated with proteins",
      "Inflammasomes can release IL-1β and amplify some patterns"
    ],
    notes: [
      "NET means neutrophil extracellular trap: an activated neutrophil releases a sticky web of its own DNA coated with proteins from its granules.",
      "NETs can trap microbes. In some neutrophilic asthma patterns, abundant NETs may injure lining cells and help inflammation persist. Blue strands show the web; gold blobs are mucus."
    ],
    active: 1,
    scene: { mode: "t2low", constriction: 0.30, edema: 0.30, mucus: 0.24, remodel: 0.08, damage: 0.48, actors: [["th17", "Th17 / IL-17"], ["neutrophil", "Neutrophil"], ["inflammasome", "IL-1β"]] }
  },
  {
    title: "13. Nerve signal: ACh tightens muscle; β2 relaxes it",
    focus: "Sensory input can trigger vagal ACh → M3 contraction; β2 stimulation is a separate relaxing signal.",
    cards: [
      "Sensory input → vagal motor reflex",
      "Vagal ACh → M3 → smooth-muscle contraction",
      "Adrenaline / β2 agonist → β2 → relaxation"
    ],
    notes: [
      "Sensory nerves detect a stimulus; vagal motor endings carry the reflex to muscle. Orange dots represent ACh travelling to M3.",
      "Circulating adrenaline or inhaled β2 medicines bind the β2 receptor and relax the muscle ring."
    ],
    active: 2,
    scene: { mode: "neural", constriction: 0.62, edema: 0, mucus: 0, remodel: 0, damage: 0.08, actors: [] }
  },
  {
    title: "14. Hyperresponsive airways overreact",
    focus: "When muscle, nerves and inflammation overreact, a modest trigger can cause outsized narrowing.",
    cards: [
      "Trigger meets a sensitised / reactive airway",
      "Nerves + inflammation amplify muscle response",
      "More narrowing → variable airflow and symptoms"
    ],
    notes: [
      "Hyperresponsiveness describes how strongly an airway responds; several mechanisms can contribute.",
      "Repeated episodes can contribute to longer-term changes in the airway wall."
    ],
    active: 2,
    scene: { mode: "hyperresponsive", constriction: 0.50, edema: 0.20, mucus: 0.26, remodel: 0.08, damage: 0.24, actors: [["trigger", "Trigger"], ["nerve", "Sensory reflex"], ["m3", "Muscle response"]] }
  },
  {
    title: "15. Repeated inflammation can remodel the wall",
    focus: "Repeated inflammation can thicken and reshape airway walls, leaving less room and sometimes less reversible airflow.",
    cards: [
      "Repeated injury → epithelial shedding / subepithelial fibrosis",
      "Repair signals → more vessels + thicker smooth muscle",
      "Goblet-cell / gland changes → more mucus potential"
    ],
    notes: [
      "Remodelling varies between people and can occur alongside active inflammation.",
      "A thicker wall can make later narrowing more consequential; next, follow the effect on breathing."
    ],
    active: 2,
    scene: { mode: "remodelling", constriction: 0.26, edema: 0.28, mucus: 0.36, remodel: 0.72, damage: 0.42, actors: [["fibroblast", "Fibrosis"], ["muscle", "Thicker muscle"], ["vessel", "More vessels"]] }
  },
  {
    title: "16. What narrowing does to breathing",
    focus: "Narrowing raises resistance and reduces total airflow; air may locally speed up through the tightest point.",
    cards: [
      "Narrowed branch → less ventilation reaches alveoli",
      "Uneven ventilation → V/Q mismatch",
      "Severe obstruction → air-trapping, low O₂ / raised CO₂"
    ],
    notes: [
      "Moving dots represent total airflow through the airway. Air may form a faster local jet at the tightest point.",
      "The narrowed airway passes less total air; severe obstruction can also trap air during breathing out."
    ],
    active: 3,
    scene: { mode: "compare", constriction: 0.76, edema: 0.56, mucus: 0.62, remodel: 0.32, damage: 0.30, actors: [] }
  },
  {
    title: "17. Follow the whole pathway",
    focus: "Different immune and nerve routes can overlap, then converge on the same four airway changes.",
    cards: [
      "Different susceptibility + exposure → different routes",
      "Immune cells, mast mediators and nerves can overlap",
      "Shared end point → muscle, swelling, mucus, remodelling"
    ],
    notes: [
      "Origins: airway lining renews locally; immune cells start in marrow; T cells mature in the thymus.",
      "Senders: lining → alarmins; Th2 / ILC2 → IL-4, IL-5 and IL-13; plasma cells → IgE; mast cells → histamine; vagal nerves → ACh."
    ],
    active: 3,
    scene: { mode: "flowchart", constriction: 0, edema: 0, mucus: 0, remodel: 0, damage: 0, actors: [] }
  }
];

const pathwayLabels = ["Risk / trigger", "Immune response", "Airway changes", "Airflow / symptoms"];
const glossary = {
  dna: { label: "DNA / risk genes", definition: "Inherited DNA variants can influence asthma susceptibility, but no single gene determines whether someone develops asthma." },
  gene: { label: "Gene", definition: "A stretch of DNA that contains instructions for making a functional product. Genetic variants can alter asthma susceptibility." },
  microbe: { label: "Microbe", definition: "A microscopic organism. Early-life microbial exposures can influence immune development, but the relationship with asthma is complex." },
  virus: { label: "Respiratory virus", definition: "A virus that infects the respiratory tract. Viral infections can trigger asthma symptoms and airway inflammation." },
  irritant: { label: "Airway irritant", definition: "An exposure such as smoke or pollution that can irritate the airway lining and trigger symptoms." },
  alarmin: { label: "Alarmin", definition: "An alarm messenger released by stressed or injured airway lining cells. TSLP, IL-25 and IL-33 alert nearby immune cells; they can activate ILC2s and support type 2 inflammation." },
  tslp: { label: "TSLP", definition: "Thymic stromal lymphopoietin, a cytokine released by airway lining cells. It can activate immune cells and help set up type 2 inflammation, which is why it is also a treatment target in some severe asthma." },
  "il-25": { label: "IL-25", definition: "An epithelial alarm signal that can activate ILC2 cells and support type 2 inflammation." },
  "il-33": { label: "IL-33", definition: "An epithelial alarm signal that can activate ILC2 cells and other immune cells." },
  ilc2: { label: "ILC2", definition: "A rapid-response immune cell that lives in tissues such as the airway. It responds to tissue alarm signals and can release IL-5 and IL-13." },
  th2: { label: "Th2 cell", definition: "A CD4+ helper T cell in the adaptive immune system. It coordinates type 2 responses by releasing IL-4, IL-5 and IL-13, linking allergen recognition with IgE production, eosinophils and mucus." },
  th1: { label: "Th1 cell", definition: "A helper T-cell type. Th1-related signals, alongside Th17 signals, are reported in some T2-low / neutrophilic asthma patterns." },
  nkt: { label: "Natural killer T cell", definition: "A T-cell type with features of both T cells and natural killer cells; it can contribute to airway immune responses." },
  il4: { label: "IL-4", definition: "A type 2 cytokine: an immune-cell message that helps naïve CD4 T cells become Th2 cells and helps B cells switch to allergen-specific IgE." },
  "il-4": { label: "IL-4", definition: "A type 2 cytokine: an immune-cell message that helps naïve CD4 T cells become Th2 cells and helps B cells switch to allergen-specific IgE." },
  il5: { label: "IL-5", definition: "A type 2 cytokine and major growth / survival signal for eosinophils. More eosinophil activity can mean more granule-protein release and airway lining injury." },
  "il-5": { label: "IL-5", definition: "A type 2 cytokine and major growth / survival signal for eosinophils. More eosinophil activity can mean more granule-protein release and airway lining injury." },
  il13: { label: "IL-13", definition: "A type 2 cytokine that acts on airway lining and gland cells. It can increase mucus, airway sensitivity and structural remodelling." },
  "il-13": { label: "IL-13", definition: "A type 2 cytokine that acts on airway lining and gland cells. It can increase mucus, airway sensitivity and structural remodelling." },
  il17: { label: "IL-17", definition: "A cytokine associated with some Th17 and neutrophilic inflammatory pathways." },
  "il-17": { label: "IL-17", definition: "A cytokine associated with some Th17 and neutrophilic inflammatory pathways." },
  "il-6": { label: "IL-6", definition: "An inflammatory cytokine that can be increased in some T2-low / neutrophilic asthma pathways." },
  "il-1β": { label: "IL-1β", definition: "An inflammatory cytokine that can be activated through inflammasome signalling." },
  ige: { label: "IgE", definition: "Immunoglobulin E is an antibody class used in allergic responses. Allergen-specific IgE can attach to high-affinity FcεRI on mast cells; later allergen exposure can cross-link the IgE and activate the mast cell." },
  "fcεri": { label: "FcεRI", definition: "The high-affinity IgE receptor found on mast cells. Allergen cross-linking of bound IgE can activate the cell." },
  bcell: { label: "B cell", definition: "A lymphocyte that makes antibodies. With type 2 signals such as IL-4, it can switch to making IgE that recognises a particular allergen." },
  mast: { label: "Mast cell", definition: "A long-lived immune cell that lives in tissues, including the airway wall. In allergic asthma, allergen links IgE on its surface receptor and triggers quick release of histamine and leukotrienes. These signals affect muscle, blood vessels and mucus. Other immune and nerve pathways can also drive asthma flares." },
  "mast-cell": { label: "Mast cell", definition: "A long-lived immune cell that lives in tissues, including the airway wall. In allergic asthma, allergen links IgE on its surface receptor and triggers quick release of histamine and leukotrienes. These signals affect muscle, blood vessels and mucus. Other immune and nerve pathways can also drive asthma flares." },
  eosinophil: { label: "Eosinophil", definition: "A white blood cell often involved in type 2 asthma. IL-5 supports its development and survival; when activated, it releases granule proteins that can injure the airway lining and sustain inflammation. Eosinophil levels vary between people with asthma." },
  neutrophil: { label: "Neutrophil", definition: "A fast-acting innate immune cell that engulfs microbes and releases enzymes and oxidants. In some T2-low patterns, signals such as IL-17 recruit neutrophils; their activity may add to airway injury and inflammation." },
  nets: { label: "NETs", definition: "Neutrophil extracellular traps: sticky DNA-and-protein webs released by activated neutrophils. The blue strands represent this web, which can add to airway inflammation." },
  cytokine: { label: "Cytokine", definition: "A small signalling protein that lets immune and tissue cells coordinate. Different cytokines send different instructions, such as recruiting a cell, helping it survive or changing mucus production." },
  "il-6": { label: "IL-6", definition: "An inflammatory cytokine that can be increased in some T2-low / neutrophilic asthma pathways." },
  mediator: { label: "Inflammatory mediator", definition: "A chemical released by immune or airway cells that can affect smooth muscle, blood vessels, nerves or mucus production." },
  alarmins: { label: "Alarmins", definition: "Alarm signals from stressed or injured cells. Airway examples include TSLP, IL-25 and IL-33." },
  mucus: { label: "Mucus", definition: "A secretion that traps particles in the airway. Excess or thick mucus can obstruct the lumen." },
  oedema: { label: "Oedema", definition: "Swelling caused by fluid moving into airway tissue, often during inflammation." },
  edema: { label: "Oedema", definition: "Swelling caused by fluid moving into airway tissue, often during inflammation." },
  lumen: { label: "Airway lumen", definition: "The open inner space of an airway through which air flows. In this diagram it is the blue central space." },
  wall: { label: "Airway wall", definition: "The tissue surrounding the lumen, including smooth muscle, the lining, connective tissue and small blood vessels." },
  submucosa: { label: "Submucosa", definition: "Tissue beneath the airway lining that contains connective tissue, immune cells, glands and blood vessels." },
  epithelium: { label: "Epithelium", definition: "A single layer of cells lining the inside of the airway. It forms a barrier and releases signals when stressed or injured; the surrounding pink bands are other airway-wall tissues." },
  epithelial: { label: "Epithelial", definition: "Relating to the epithelium: the cell layer lining the airway." },
  muscle: { label: "Smooth muscle", definition: "Muscle surrounding the airway. When it contracts, the lumen becomes narrower." },
  bronchoconstriction: { label: "Bronchoconstriction", definition: "Tightening of airway smooth muscle that narrows the airway and restricts airflow." },
  atopy: { label: "Atopy", definition: "An inherited tendency to develop IgE-mediated allergic sensitisation to common allergens." },
  sensitisation: { label: "Sensitisation", definition: "An immune process in which allergen-specific IgE is made and binds to mast-cell receptors." },
  sensitization: { label: "Sensitisation", definition: "An immune process in which allergen-specific IgE is made and binds to mast-cell receptors." },
  antigen: { label: "Antigen", definition: "A substance recognised by the immune system. Here, an allergen acts as the antigen presented to T cells." },
  allergen: { label: "Allergen", definition: "A usually harmless substance that can trigger an allergic immune response in a sensitised person." },
  hyperresponsive: { label: "Hyperresponsive", definition: "Overly sensitive: the airway narrows more than expected in response to a trigger." },
  hyperresponsiveness: { label: "Airway hyperresponsiveness", definition: "A tendency for airways to narrow excessively in response to triggers such as cold air, exercise or allergens." },
  hyperreactivity: { label: "Airway hyperreactivity", definition: "A tendency for the airway to overreact and narrow too much when exposed to a trigger." },
  remodelling: { label: "Airway remodelling", definition: "Longer-term structural changes such as fibrosis, thicker smooth muscle, increased vessels and goblet-cell changes." },
  remodeling: { label: "Airway remodelling", definition: "Longer-term structural changes such as fibrosis, thicker smooth muscle, increased vessels and goblet-cell changes." },
  fibrosis: { label: "Fibrosis", definition: "Build-up of connective tissue, including collagen, in the airway wall." },
  desquamation: { label: "Epithelial shedding", definition: "Loss or shedding of airway lining cells; this can weaken the epithelial barrier." },
  subepithelial: { label: "Subepithelial", definition: "Located just beneath the airway epithelium, the cell layer lining the airway." },
  hypertrophy: { label: "Hypertrophy", definition: "An increase in tissue or muscle size. Airway smooth-muscle hypertrophy can thicken the muscle layer." },
  paucigranulocytic: { label: "Paucigranulocytic asthma", definition: "An asthma pattern with few eosinophils and neutrophils in airway samples; narrowing and hyperresponsiveness may still occur." },
  angiogenesis: { label: "Angiogenesis", definition: "Formation of new blood vessels." },
  goblet: { label: "Goblet cell", definition: "A mucus-producing cell in the airway lining. Increased numbers can contribute to excess mucus." },
  ach: { label: "Acetylcholine (ACh)", definition: "A chemical messenger released from parasympathetic (vagal) nerve endings. In the airway it binds muscarinic receptors: M3 activation contracts smooth muscle and can increase glandular secretion, while M2 receptors provide feedback that limits further ACh release." },
  nerve: { label: "Airway sensory nerve", definition: "A sensory nerve ending that detects irritants and other stimuli. It can start a reflex that increases parasympathetic output; sensory nerves can also release neuropeptides locally. The sensory fibre and the vagal motor ending are different parts of the pathway." },
  vagal: { label: "Vagal motor ending", definition: "A parasympathetic nerve ending near airway muscle and glands. When vagal activity rises, it releases acetylcholine (ACh); ACh acts at M3 receptors to tighten smooth muscle and can increase secretion. Sensory nerves detect the trigger and start this reflex; vagal motor endings carry its message to the airway." },
  "substance-p": { label: "Substance P", definition: "A neuropeptide released from sensory nerves. It can contribute to airway inflammation and narrowing." },
  substance: { label: "Substance P", definition: "A neuropeptide released from sensory nerves. It can contribute to airway inflammation and narrowing." },
  "neurokinin-a": { label: "Neurokinin A", definition: "A sensory-nerve neuropeptide that can contribute to bronchoconstriction and airway inflammation." },
  neurokinin: { label: "Neurokinin A", definition: "A sensory-nerve neuropeptide that can contribute to bronchoconstriction and airway inflammation." },
  cgrp: { label: "CGRP", definition: "Calcitonin gene-related peptide, a neuropeptide released from sensory nerves that can influence airway responses." },
  pge2: { label: "Prostaglandin E2 (PGE2)", definition: "A prostaglandin with context-dependent effects; it can help limit bronchoconstriction in the airway." },
  m3: { label: "M3 receptor", definition: "A muscarinic receptor on airway smooth muscle and glands. When acetylcholine binds, it promotes muscle contraction and secretion, reducing the open airway space." },
  m2: { label: "M2 receptor", definition: "A muscarinic autoreceptor on parasympathetic nerve endings. It acts as feedback to limit further acetylcholine release; disruption of this brake may increase cholinergic responses." },
  "β2": { label: "β2 receptor", definition: "A receptor on airway smooth muscle. Stimulation by adrenaline or inhaled β2 agonists raises intracellular cAMP and relaxes the muscle, widening the airway. This is the relaxing side of the balance with constrictor signals." },
  "β2-receptor": { label: "β2 receptor", definition: "A receptor on airway smooth muscle. Stimulation by adrenaline or inhaled β2 agonists raises intracellular cAMP and relaxes the muscle, widening the airway. This is the relaxing side of the balance with constrictor signals." },
  raas: { label: "RAAS", definition: "The renin–angiotensin–aldosterone system regulates blood pressure, salt and fluid balance. Its connection to asthma is indirect and context-dependent." },
  airflow: { label: "Airflow", definition: "Movement of air through the lumen. Narrowing increases resistance, especially during expiration." },
  aerd: { label: "Aspirin-exacerbated respiratory disease (AERD)", definition: "Asthma associated with reactions to aspirin / some NSAIDs, commonly alongside chronic rhinosinusitis and nasal polyps; arachidonic-acid signalling is dysregulated." },
  nsaid: { label: "NSAID", definition: "A nonsteroidal anti-inflammatory drug. Aspirin and some other NSAIDs can trigger symptoms in people with AERD." },
  gerd: { label: "Gastro-oesophageal reflux", definition: "Reflux can trigger asthma symptoms in some people, possibly through reflex bronchoconstriction or microaspiration." },
  "v/q": { label: "Ventilation–perfusion mismatch", definition: "A difference between how much air reaches a lung region (ventilation) and how much blood flows through it (perfusion)." },
  alveoli: { label: "Alveoli", definition: "Tiny air sacs where oxygen enters blood and carbon dioxide leaves it." },
  "air-trapping": { label: "Air trapping", definition: "Air becomes difficult to breathe out through narrowed airways, so some remains in the lungs." },
  hypoxaemia: { label: "Hypoxaemia", definition: "A low oxygen level in the blood; severe widespread airway obstruction can contribute to it." },
  hypercapnia: { label: "Hypercapnia", definition: "A raised carbon dioxide level in the blood; it can occur in severe asthma exacerbations." },
  acidosis: { label: "Acidosis", definition: "A fall in blood pH. Severe respiratory obstruction can contribute to respiratory acidosis." },
  inflammasome: { label: "Inflammasome", definition: "An intracellular protein complex that can activate inflammatory signals, including IL-1β." },
  vessel: { label: "Blood vessel", definition: "Small vessels in the airway wall. Inflammation can make them leak fluid into surrounding tissue." },
  vessels: { label: "Blood vessels", definition: "Small vessels in the airway wall. Inflammation can make them leak fluid into surrounding tissue." },
  signal: { label: "Signal molecules", definition: "The moving orange dots represent signalling mediators or cytokines travelling between cells." },
  molecules: { label: "Signal molecules", definition: "The moving orange dots represent signalling mediators or cytokines travelling between cells." },
  immune: { label: "Immune cells", definition: "Cells that coordinate or carry out immune responses, including Th2 cells, ILC2s, mast cells and eosinophils." },
  dendritic: { label: "Dendritic cell", definition: "An antigen-presenting immune cell. It takes up material such as an allergen, processes it and shows fragments to T cells, helping start a targeted adaptive immune response." },
  b: { label: "B cell", definition: "An immune cell that can make antibodies, including allergen-specific IgE after class switching." },
  "t2-high": { label: "T2-high", definition: "An asthma inflammatory pattern with evidence of type 2 activity, often involving IL-4, IL-5, IL-13 and eosinophils." },
  "t2-low": { label: "T2-low", definition: "A broad group of asthma patterns without clear type 2 biomarkers; mechanisms may include neutrophilic or paucigranulocytic inflammation." },
  il17: { label: "IL-17", definition: "A cytokine associated with some Th17 and neutrophilic inflammatory pathways." },
  th17: { label: "Th17 cell", definition: "A CD4+ helper T-cell subset that can produce IL-17. In some T2-low airway patterns, IL-17 helps recruit neutrophils; its contribution varies between people." },
  th2: { label: "Th2 cell", definition: "A type of helper T cell that can produce IL-4, IL-5 and IL-13 in type 2 inflammation." },
  ecp: { label: "ECP", definition: "Eosinophil cationic protein, a granule protein released by activated eosinophils." },
  "major": { label: "Major basic protein", definition: "A toxic granule protein released by eosinophils that can damage airway tissue." },
  il1β: { label: "IL-1β", definition: "An inflammatory cytokine that can be activated through inflammasome signalling." },
  il1b: { label: "IL-1β", definition: "An inflammatory cytokine that can be activated through inflammasome signalling." }
};

// Important terms connect a plain-language meaning, a source, and the asthma link.
const glossaryLearning = {
  lymphocyte: { label: "Lymphocyte", overview: "A family of white blood cells that includes B cells and T cells.", inAsthma: "B cells can make antibodies; helper T cells coordinate targeted immune responses." },
  lymph: { label: "Lymph node", overview: "A small immune-organ station that filters lymph fluid and brings immune cells together.", inAsthma: "Airway dendritic cells travel here with allergen fragments; T and B cells meet in this organised immune hub." },
  naive: { label: "Naïve lymphocyte", overview: "A mature B or T cell that has not yet been activated by a matching target and the right signals.", inAsthma: "A naïve CD4 T cell can receive allergen information from a dendritic cell and develop into a helper type." },
  presentation: { label: "Antigen presentation", overview: "A cell displays a small piece of a larger substance on its surface for a T cell to inspect.", inAsthma: "A dendritic cell displays an allergen fragment to a CD4 T cell in a lymph node, alongside activation signals." },
  antibody: { label: "Antibody", overview: "A Y-shaped immune protein; each B-cell family makes antibodies that bind a particular target.", inAsthma: "Plasma cells release allergen-specific IgE. IgE attaches to mast cells and prepares them to respond if that allergen returns." },
  memory: { label: "Memory B cell", overview: "A long-lived B cell that keeps a record of a target after an immune response.", inAsthma: "Memory cells can help the immune system respond faster when the same allergen is encountered again." },
  lining: { label: "Airway lining", overview: "The epithelial cell layer covering the inside surface of the airway.", inAsthma: "Lining cells form a barrier, sense irritation and release alarm signals when stressed." },
  marrow: { label: "Bone marrow", overview: "Soft tissue inside some bones where blood-forming stem cells make new blood and immune cells.", inAsthma: "Many immune cells shown here begin in marrow, then travel in blood and develop into specialised cells." },
  thymus: { label: "Thymus", overview: "An immune-training organ in the chest where developing T cells mature.", inAsthma: "T cells then travel through the body; some become helper types such as Th2 or Th17 after immune activation." },
  cd4: { label: "CD4 T cell", overview: "A helper T lymphocyte: a white blood cell that coordinates immune responses. CD4 is a protein marker on its surface.", inAsthma: "After a dendritic cell presents allergen and provides activation signals, a naïve CD4 T cell can become a helper type such as Th2." },
  "plasma-cell": { label: "Plasma cell", overview: "A specialised antibody-making form of an activated B cell.", inAsthma: "Some activated B cells become plasma cells that release large amounts of allergen-specific IgE." },
  plasma: { label: "Plasma cell", overview: "A specialised antibody-making form of an activated B cell.", inAsthma: "Some activated B cells become plasma cells that release large amounts of allergen-specific IgE." },
  "cross-link": { label: "Cross-link", overview: "To link two or more nearby molecules together.", inAsthma: "An allergen can link IgE molecules on a mast cell surface, switching on the cell." },
  "class-switching": { label: "Class switching", overview: "A B cell changes the antibody type it makes while keeping its target recognition.", inAsthma: "IL-4 can help a B cell switch toward IgE production during allergic sensitisation." },
  pseudostratified: { label: "Pseudostratified lining", overview: "A single layer of cells whose nuclei sit at different heights, making the lining look stacked.", inAsthma: "This is common in larger airways; the animation uses a simpler one-row drawing for a small airway." },
  granulocyte: { label: "Granulocyte", overview: "A white blood cell containing visible packets of stored proteins called granules.", inAsthma: "Eosinophils and neutrophils are granulocytes; their numbers and activity vary across asthma patterns." },
  trigger: { label: "Trigger", overview: "An exposure or event that brings on symptoms in a susceptible airway.", inAsthma: "Triggers can activate the lining, immune cells or airway nerves. They can start a flare without being the original cause of asthma." },
  allergen: { overview: "A usually harmless substance that can be recognised by the immune system, such as pollen or dust mite material.", inAsthma: "In a sensitised airway, allergen can link IgE on mast cells and start mediator release. Other flares begin with infections, irritants, exercise, cold air or nerve signals." },
  gene: { overview: "A section of DNA that helps guide how cells work.", inAsthma: "Asthma risk emerges through interactions between many gene variants, environment, development and exposures." },
  dna: { overview: "DNA carries inherited instructions used by cells.", inAsthma: "Asthma risk reflects many genes interacting with environment, development and exposures." },
  microbe: { overview: "A microscopic living organism, including bacteria and fungi.", inAsthma: "Microbial exposures can shape immune development, while respiratory infections can also trigger flares; these are different effects." },
  virus: { overview: "A virus is an infectious agent that uses host cells to reproduce.", inAsthma: "Respiratory viruses can irritate the airway and trigger symptoms, especially during an exacerbation." },
  epithelium: { overview: "The airway epithelium is its inner lining. Larger bronchi usually have pseudostratified epithelium: one cell layer whose nuclei sit at different heights, making it look stacked; bronchioles have a simpler lining.", inAsthma: "This small-airway cutaway shows one row of pale oval lining cells. The wider pink bands represent supporting airway-wall tissues outside that lining. Stressed lining cells can release alarmins." },
  epithelial: { overview: "Relating to the cell layer lining the airway.", inAsthma: "Epithelial stress can connect a trigger with alarmin release, immune activation and later airway changes." },
  alarmin: { overview: "An alarm messenger released by stressed or injured cells.", inAsthma: "Airway TSLP, IL-25 and IL-33 warn nearby immune cells, can activate ILC2s and support type 2 responses." },
  alarmins: { overview: "Alarm messengers released by stressed or injured cells.", inAsthma: "Airway TSLP, IL-25 and IL-33 warn nearby immune cells, can activate ILC2s and support type 2 responses." },
  tslp: { overview: "A cytokine made by epithelial cells that helps coordinate immune responses.", inAsthma: "Airway TSLP is an alarmin that can promote type 2 inflammation and is a target of some severe-asthma treatments." },
  "il-25": { overview: "A cytokine that can signal tissue stress and shape immune activity.", inAsthma: "Airway IL-25 is an alarmin that can activate ILC2s and contribute to type 2 inflammation." },
  "il-33": { overview: "A cytokine released or exposed when tissue cells are stressed or injured.", inAsthma: "Airway IL-33 acts as an alarmin and can activate ILC2s and other type 2 immune pathways." },
  dendritic: { overview: "A scouting immune cell that collects material, breaks it into fragments and displays them to T cells.", inAsthma: "In the airway, a dendritic cell can carry allergen information to a lymph node and activate a matching CD4 T cell." },
  ilc2: { label: "Type 2 innate lymphoid cell (ILC2)", overview: "A rapid-response immune cell that lives in tissues and reacts to local alarm signals.", inAsthma: "Airway alarmins can activate ILC2s, which release IL-5 and IL-13 and support type 2 inflammation alongside the T-cell / B-cell route." },
  th2: { overview: "A Th2 cell is one specialised type of CD4 helper T cell. It sends instructions using small messenger proteins called cytokines.", inAsthma: "Th2 signals, especially IL-4, can support allergen-specific IgE; IL-5 supports eosinophils and IL-13 can increase mucus and airway sensitivity." },
  th1: { overview: "A CD4 helper T-cell type: a white blood cell that directs parts of the immune response.", inAsthma: "Th1-related signals can contribute to some T2-low patterns; asthma pathways vary between people." },
  th17: { overview: "A CD4 helper T-cell type—a white blood cell that directs immune activity—and a source of IL-17.", inAsthma: "In some T2-low patterns, IL-17 helps recruit neutrophils; this is one possible route among several." },
  il4: { overview: "A cytokine is a small messenger protein that gives cells instructions; IL-4 is a type 2 cytokine.", inAsthma: "IL-4 helps naïve CD4 T cells develop toward Th2 and supports B-cell class switching to allergen-specific IgE, together with other helper signals." },
  "il-4": { overview: "A cytokine is a small messenger protein that gives cells instructions; IL-4 is a type 2 cytokine.", inAsthma: "IL-4 helps naïve CD4 T cells develop toward Th2 and supports B-cell class switching to allergen-specific IgE, together with other helper signals." },
  il5: { overview: "A type 2 cytokine that helps regulate eosinophils.", inAsthma: "IL-5 supports eosinophil development and survival, so eosinophils can persist in some T2-high airway inflammation." },
  "il-5": { overview: "A type 2 cytokine that helps regulate eosinophils.", inAsthma: "IL-5 supports eosinophil development and survival, so eosinophils can persist in some T2-high airway inflammation." },
  il13: { overview: "A type 2 cytokine that changes how airway lining and gland cells behave.", inAsthma: "IL-13 can increase mucus production, airway sensitivity and remodelling." },
  "il-13": { overview: "A type 2 cytokine that changes how airway lining and gland cells behave.", inAsthma: "IL-13 can increase mucus production, airway sensitivity and remodelling." },
  bcell: { overview: "A B lymphocyte carries a surface receptor that binds a particular target; activated B cells can become antibody-making cells.", inAsthma: "A B cell that recognises an allergen can receive matching helper-T signals. IL-4 supports class switching to IgE; some descendants become plasma cells and others become memory B cells." },
  ige: { overview: "IgE is an antibody: a protein made by immune cells that can bind a particular target.", inAsthma: "Allergen-specific IgE can sit on mast-cell FcεRI; later allergen exposure may link nearby IgE molecules and activate the mast cell." },
  "fcεri": { overview: "A receptor is a protein switch on a cell surface. FcεRI is the strong IgE-binding receptor on mast cells.", inAsthma: "When an allergen links nearby IgE molecules on FcεRI, it can activate the mast cell." },
  mast: { overview: "A long-lived immune cell that matures in tissues, including the airway wall. It stores chemical messengers in small packets and can release them quickly.", inAsthma: "In allergic asthma, allergen links IgE held on the mast-cell surface; activation releases histamine and makes other mediators. These signals affect muscle, vessels, nerves and mucus." },
  "mast-cell": { overview: "A long-lived immune cell that lives in tissues, including the airway wall. It stores chemical messengers in small packets and can release them quickly.", inAsthma: "In allergic asthma, allergen binds IgE on its surface; activation releases histamine and leukotrienes. These signals affect muscle, vessels and mucus. Other triggers can activate mast cells too." },
  histamine: { label: "Histamine", overview: "A chemical messenger stored in mast-cell granules and released during some immune responses.", inAsthma: "It can contribute to airway smooth-muscle contraction, swelling and mucus secretion as part of an early allergic response." },
  leukotriene: { label: "Leukotriene", overview: "A fat-derived chemical message made by activated immune cells.", inAsthma: "Some leukotrienes tighten airway muscle, increase mucus and contribute to swelling." },
  mediator: { overview: "A chemical message released by one cell that changes what another cell does.", inAsthma: "Different mediators act on muscle, vessels, nerves or glands, so they can combine to narrow the airway in more than one way." },
  cytokine: { overview: "A small protein messenger that lets immune and tissue cells coordinate.", inAsthma: "Different cytokines give different instructions—for example, recruit or support eosinophils, or increase mucus production." },
  eosinophil: { overview: "A white blood cell filled with tiny packets of proteins; it can help fight parasites and take part in allergy.", inAsthma: "IL-5 helps eosinophils grow and survive. When activated, they release packet contents that can injure the airway lining. Not everyone with asthma has raised eosinophils." },
  neutrophil: { overview: "A fast, first-response white blood cell. It can engulf microbes and release enzymes and oxygen-based chemicals that damage them.", inAsthma: "In some T2-low patterns, signals such as IL-17 call neutrophils into the airway; their activity can add to inflammation and tissue injury." },
  net: { label: "NET (neutrophil extracellular trap)", overview: "A sticky mesh made from a neutrophil’s own DNA coated with proteins and released outside the cell.", inAsthma: "NETs can trap microbes. In some neutrophilic asthma patterns, abundant webs may injure airway lining and help inflammation persist; the blue strands depict NETs." },
  nets: { overview: "NET means neutrophil extracellular trap: a mesh of the neutrophil’s own DNA coated with proteins and released outside the cell.", inAsthma: "NETs can trap microbes. In some neutrophilic asthma patterns, abundant webs may injure airway lining and help inflammation persist; the blue strands depict NETs." },
  "t2-high": { overview: "An asthma pattern with type 2 immune signals. An endotype groups disease by its working mechanism; severity is assessed separately.", inAsthma: "It often involves IL-4 / IL-5 / IL-13, IgE, mast cells or eosinophils, with the mix varying between people." },
  "t2-low": { overview: "A group of asthma patterns with low measured type 2 signals; mechanisms can include neutrophilic or paucigranulocytic inflammation.", inAsthma: "Neutrophilic patterns involve neutrophils; paucigranulocytic patterns have few eosinophils or neutrophils. Airway narrowing can occur in both." },
  inflammasome: { overview: "A group of proteins assembled inside a cell that acts like an alarm switch and activates inflammatory signals.", inAsthma: "In some T2-low patterns, it helps process and release IL-1β, which can amplify local inflammation." },
  mucus: { overview: "A protective secretion that traps particles and helps clear them from airways.", inAsthma: "Too much or thick mucus can occupy the lumen and add to blockage, alongside muscle contraction and wall swelling." },
  oedema: { overview: "Swelling from extra fluid in tissue.", inAsthma: "Inflamed airway vessels can leak fluid into the wall; the thicker wall pushes inward and reduces the lumen." },
  edema: { overview: "Swelling from extra fluid in tissue.", inAsthma: "Inflamed airway vessels can leak fluid into the wall; the thicker wall pushes inward and reduces the lumen." },
  vessel: { overview: "A small blood vessel supplies tissue and allows exchange with the surrounding space.", inAsthma: "Inflammatory signals can increase vascular leak, allowing fluid into the airway wall and causing oedema." },
  vessels: { overview: "Small blood vessels supply tissue and allow exchange with the surrounding space.", inAsthma: "Inflammatory signals can increase vascular leak, allowing fluid into the airway wall and causing oedema." },
  lumen: { overview: "The open inner channel of a tube.", inAsthma: "Air travels through the airway lumen; muscle, swelling and mucus can all reduce its open diameter." },
  muscle: { overview: "Smooth muscle is involuntary muscle that surrounds many airways.", inAsthma: "When it contracts, the airway narrows; repeated inflammation may also enlarge the muscle layer." },
  bronchoconstriction: { overview: "A narrowing of the airway caused by contraction of its smooth-muscle ring.", inAsthma: "It can happen quickly after mediator or vagal ACh signals and combine with swelling or mucus to reduce airflow." },
  hyperresponsiveness: { overview: "An exaggerated airway response to a stimulus.", inAsthma: "A trigger that has little effect on another person may cause marked narrowing when airway muscle, nerves or inflammation are more reactive." },
  hyperreactivity: { overview: "A tendency for an airway to overreact to triggers.", inAsthma: "This can amplify variable bronchoconstriction and symptoms; it can interact with inflammation and structural change." },
  remodelling: { overview: "Longer-term changes in tissue structure after repeated injury or repair.", inAsthma: "Airway fibrosis, thicker muscle, more vessels and mucus-cell changes may leave less room and sometimes persistent airflow limitation." },
  remodeling: { overview: "Longer-term changes in tissue structure after repeated injury or repair.", inAsthma: "Airway fibrosis, thicker muscle, more vessels and mucus-cell changes may leave less room and sometimes persistent airflow limitation." },
  fibrosis: { overview: "A build-up of connective tissue, including collagen, during tissue repair.", inAsthma: "Subepithelial fibrosis can thicken the airway wall and contribute to remodelling." },
  ach: { overview: "Acetylcholine is a neurotransmitter used by parasympathetic nerves.", inAsthma: "Vagal ACh binds M3 receptors to contract airway muscle and can increase secretion; M2 receptors provide feedback that limits ACh release." },
  nerve: { overview: "A sensory nerve detects a stimulus and sends information through the nervous system.", inAsthma: "Airway sensory input can start a reflex that increases vagal output; sensory fibres and vagal motor endings are different parts of that pathway." },
  vagal: { overview: "The vagus carries parasympathetic signals between the brainstem and organs, including the lungs.", inAsthma: "A vagal motor ending can release ACh near airway muscle; ACh activates M3 and promotes contraction." },
  m3: { overview: "A muscarinic receptor is a protein that responds to acetylcholine.", inAsthma: "M3 receptors on airway muscle and glands promote contraction and secretion when ACh binds." },
  m2: { overview: "A muscarinic receptor that can act as feedback on nerve endings.", inAsthma: "Presynaptic M2 receptors normally limit further ACh release; reduced braking may increase cholinergic airway responses." },
  "β2": { overview: "A beta-2 adrenergic receptor is a protein on airway smooth muscle.", inAsthma: "Adrenaline or an inhaled β2 agonist stimulates it, raising cAMP and relaxing the muscle so the airway can widen." },
  "β2-receptor": { overview: "A beta-2 adrenergic receptor is a protein on airway smooth muscle.", inAsthma: "Adrenaline or an inhaled β2 agonist stimulates it, raising cAMP and relaxing the muscle so the airway can widen." },
  airflow: { overview: "Airflow is the amount of air moving through the breathing passages over time.", inAsthma: "A narrowed airway usually passes less total air because resistance rises. Air can form a faster local jet at the tightest point; the moving dots show total airflow." },
  "v/q": { overview: "Ventilation is air reaching alveoli; perfusion is blood flowing past them.", inAsthma: "Narrowing can reduce ventilation in some lung regions more than others, creating ventilation–perfusion mismatch." },
  alveoli: { overview: "Tiny air sacs where oxygen enters blood and carbon dioxide leaves it.", inAsthma: "If a narrowed airway delivers less fresh air, alveoli beyond it are less ventilated." },
  "air-trapping": { overview: "Air remains in the lungs because it is difficult to breathe out fully.", inAsthma: "Severe, widespread narrowing can impede expiration, trap air and increase the work of breathing." },
  hypoxaemia: { overview: "A lower-than-normal oxygen level in arterial blood.", inAsthma: "Severe widespread obstruction can cause uneven ventilation and contribute to hypoxaemia." },
  hypercapnia: { overview: "A higher-than-normal carbon dioxide level in blood.", inAsthma: "In severe obstruction, inadequate ventilation can cause carbon dioxide to rise." },
  aerd: { overview: "AERD is a respiratory condition involving asthma, chronic rhinosinusitis with nasal polyps and reactions to aspirin / some NSAIDs.", inAsthma: "COX-1 inhibition shifts arachidonic-acid mediator balance and can provoke bronchoconstriction in susceptible people." },
  raas: { overview: "The renin–angiotensin–aldosterone system regulates blood pressure and fluid balance.", inAsthma: "Its connection to asthma is indirect and context-dependent; its main actions are on blood pressure, salt and fluid balance." },
  wall: { overview: "The airway wall is the living tissue around the open air channel, including lining, muscle, vessels and connective tissue.", inAsthma: "Inflammation can swell it; repeated repair can thicken or remodel it; muscle inside the wall can contract inward." },
  infection: { label: "Respiratory infection", overview: "An infection of the nose, throat or lungs, often caused by a virus.", inAsthma: "Respiratory infections can stress the airway lining and trigger an exacerbation; they are one of several possible contributors." },
  irritant: { overview: "An inhaled substance such as smoke, pollution, perfume or cleaning spray that can irritate airway tissue.", inAsthma: "Irritants can trigger symptoms or flares through airway and immune responses; the exact pathway varies by exposure and person." },
  exercise: { label: "Exercise", overview: "Physical activity increases ventilation and moves more air through the airways.", inAsthma: "Exercise, especially in cold or dry air, can trigger temporary airway narrowing in some people with asthma." },
  "cold air": { label: "Cold, dry air", overview: "Cold air can also be dry, increasing heat and water loss from airway surfaces during breathing.", inAsthma: "This can trigger airway narrowing in some people, particularly during exercise or heavy ventilation." },
  cold: { label: "Cold, dry air", overview: "Cold air can also be dry, increasing heat and water loss from airway surfaces during breathing.", inAsthma: "This can trigger airway narrowing in some people, particularly during exercise or heavy ventilation." },
  emotion: { label: "Strong emotion", overview: "Strong emotions can change breathing pattern and autonomic nervous-system activity.", inAsthma: "Anxiety, anger or excitement can trigger physical airway changes and symptoms in some people." },
  nkt: { overview: "A natural killer T cell is a T-cell type with some features of innate immune cells.", inAsthma: "NKT-cell contributions vary across asthma patterns and may add to airway immune responses." },
  innate: { label: "Innate immunity", overview: "The body's rapid, broadly responsive defence system, including barriers and cells that react to common danger signals.", inAsthma: "Airway epithelium, ILC2s, mast cells and neutrophils can take part in innate responses to triggers." },
  adaptive: { label: "Adaptive immunity", overview: "A targeted immune response that learns to recognise specific antigens, using T cells and B cells.", inAsthma: "In allergic asthma, adaptive Th2 and B-cell responses can produce allergen-specific IgE and prepare mast cells for re-exposure." },
  leukotrienes: { label: "Leukotrienes", overview: "Lipid mediators made by inflammatory cells from arachidonic acid.", inAsthma: "Cysteinyl leukotrienes can tighten airway muscle, increase mucus and contribute to swelling." },
  susceptibility: { label: "Susceptibility", overview: "A background tendency that changes how likely an outcome is.", inAsthma: "Genes, atopy and environment combine to shape asthma risk and immune responses." },
  atopy: { overview: "An inherited tendency to make IgE responses to common, usually harmless allergens.", inAsthma: "Atopy raises the likelihood of allergic sensitisation; asthma pathways can also involve other immune patterns." },
  sensitisation: { overview: "The immune system becomes prepared to respond to a particular antigen, sometimes before symptoms occur.", inAsthma: "In allergic asthma, allergen-specific IgE is made and binds mast-cell FcεRI; re-exposure can then activate the cell." },
  sensitization: { overview: "The immune system becomes prepared to respond to a particular antigen, sometimes before symptoms occur.", inAsthma: "In allergic asthma, allergen-specific IgE is made and binds mast-cell FcεRI; re-exposure can then activate the cell." },
  antigen: { overview: "A substance or molecular feature that the immune system can recognise.", inAsthma: "An allergen can be processed by dendritic cells and presented to T cells, helping start a targeted immune response." },
  il17: { overview: "A cytokine messenger produced by several immune-cell types, including Th17 cells.", inAsthma: "IL-17 can recruit neutrophils in some T2-low patterns; its contribution varies between people." },
  "il-17": { overview: "A cytokine messenger produced by several immune-cell types, including Th17 cells.", inAsthma: "IL-17 can recruit neutrophils in some T2-low patterns; its contribution varies between people." },
  "il-6": { overview: "A cytokine that helps regulate inflammation and communication between cells.", inAsthma: "IL-6 can be part of inflammatory signalling in some T2-low / neutrophilic patterns." },
  "il-1β": { overview: "An inflammatory messenger protein first made in an inactive form by some immune cells.", inAsthma: "An inflammasome can switch on the inactive form, releasing active IL-1β that may amplify inflammation in some T2-low patterns." },
  il1β: { overview: "An inflammatory messenger protein first made in an inactive form by some immune cells.", inAsthma: "An inflammasome can switch on the inactive form, releasing active IL-1β that may amplify inflammation in some T2-low patterns." },
  il1b: { overview: "An inflammatory messenger protein first made in an inactive form by some immune cells.", inAsthma: "An inflammasome can switch on the inactive form, releasing active IL-1β that may amplify inflammation in some T2-low patterns." },
  paucigranulocytic: { overview: "A pattern with few granule-containing white blood cells, especially eosinophils and neutrophils, in airway samples.", inAsthma: "Airway narrowing and over-reactivity can still be present even when few of these cells are detected." },
  goblet: { overview: "A mucus-producing cell in the airway lining.", inAsthma: "More goblet cells or gland activity can add mucus to the lumen and worsen obstruction." },
  angiogenesis: { overview: "The formation of new blood vessels.", inAsthma: "New vessels can be part of airway remodelling and may increase wall vascularity." },
  desquamation: { overview: "Surface cells are damaged or shed from a lining; this can weaken its barrier function.", inAsthma: "The short red slashes represent epithelial injury or cell loss; the pale oval shapes represent the single row of lining cells." },
  hypertrophy: { overview: "An increase in the size of a tissue or its cells.", inAsthma: "Smooth-muscle hypertrophy thickens the airway muscle layer and can contribute to narrowing and reactivity." },
  subepithelial: { overview: "Located just beneath the epithelium, the surface lining of a tissue.", inAsthma: "Subepithelial fibrosis means collagen has built up beneath the airway lining as part of remodelling." },
  submucosa: { overview: "The tissue layer under a mucosal lining, containing connective tissue, vessels, glands and cells.", inAsthma: "Oedema and inflammatory cells in airway-wall tissue can thicken this area and push toward the lumen." },
  "substance-p": { overview: "A neuropeptide: a small nerve-released signal that can influence nearby tissue.", inAsthma: "Substance P can contribute to neurogenic inflammation and airway narrowing in some responses." },
  substance: { overview: "A neuropeptide: a small nerve-released signal that can influence nearby tissue.", inAsthma: "Substance P can contribute to neurogenic inflammation and airway narrowing in some responses." },
  "neurokinin-a": { overview: "A neuropeptide released from sensory nerves.", inAsthma: "Neurokinin A can contribute to bronchoconstriction and local airway inflammation." },
  neurokinin: { overview: "A neuropeptide released from sensory nerves.", inAsthma: "Neurokinin A can contribute to bronchoconstriction and local airway inflammation." },
  cgrp: { overview: "Calcitonin gene-related peptide, a signal made by sensory nerves and other cells.", inAsthma: "CGRP can affect blood vessels and inflammatory responses; its contribution varies by context." },
  pge2: { overview: "Prostaglandin E2 is a locally made, fat-derived chemical messenger.", inAsthma: "Its effects depend on context; airway PGE2 can help limit muscle tightening, so loss of relaxing influences may matter." },
  adrenaline: { overview: "A hormone and neurotransmitter that signals through adrenergic receptors.", inAsthma: "Adrenaline can stimulate airway β2 receptors and relax smooth muscle; inhaled β2 agonists use the same receptor pathway." },
  nsaid: { overview: "A nonsteroidal anti-inflammatory drug; aspirin is one example.", inAsthma: "Aspirin and some NSAIDs can trigger symptoms in people with AERD, a distinct sensitivity pattern." },
  gerd: { overview: "Gastro-oesophageal reflux is movement of stomach contents back into the oesophagus.", inAsthma: "Reflux may trigger symptoms in some people, possibly through reflex bronchoconstriction or microaspiration." }
};

// The source field explains who makes a cell or signal, or how a structure forms.
const glossaryOrigins = {
  lymphocyte: "T and B lymphocytes develop from blood-forming stem cells in bone marrow; T cells then mature in the thymus.",
  lymph: "Lymph nodes sit along lymphatic vessels, which collect fluid from tissues and carry it through immune checkpoints.",
  naive: "Mature T or B cell that has travelled from its bone marrow or thymus training site into blood and lymph.",
  presentation: "Dendritic cells process allergen proteins into small fragments and display them on their surface.",
  antibody: "Made by plasma cells, the antibody-secreting descendants of activated B cells.",
  memory: "Some activated B cells become long-lived memory cells after an immune response.",
  lining: "Airway lining stem cells renew the surface locally and produce specialised lining cells.",
  marrow: "Blood-forming stem cells in the soft tissue inside some bones make new blood and immune cells.",
  thymus: "Immature T cells travel from bone marrow to this chest organ to mature and learn to recognise targets.",
  cd4: "A surface protein made by helper T cells; it helps identify and coordinate this immune-cell group.",
  "plasma-cell": "Develops from an activated B cell; plasma cells become specialised factories for releasing antibodies.",
  plasma: "Develops from an activated B cell; plasma cells become specialised factories for releasing antibodies.",
  "cross-link": "Happens when an allergen binds neighbouring IgE molecules on a mast cell at the same time.",
  "class-switching": "A gene-control change inside an activated B cell changes which antibody class it produces.",
  pseudostratified: "Forms when one lining layer has cells with nuclei at different heights, creating a stacked appearance.",
  granulocyte: "Develops from blood-forming stem cells in bone marrow; mature cells carry protein-filled granules.",
  epithelium: "Local airway lining stem cells renew the surface; different specialised lining cells appear along the airway tree.",
  epithelial: "Airway lining cells renew from local starter cells within the surface layer.",
  alarmin: "Stressed airway lining cells release TSLP and IL-25; injury can expose or release IL-33.",
  alarmins: "Stressed airway lining cells release TSLP and IL-25; injury can expose or release IL-33.",
  tslp: "Released mainly by stressed airway lining cells.",
  "il-25": "Released mainly by airway lining cells after irritation or injury.",
  "il-33": "Stored in or released by airway lining and nearby structural cells when stressed or injured.",
  dendritic: "Develops from blood-forming stem cells in bone marrow (soft tissue inside bones), travels in blood, then samples material in tissues.",
  ilc2: "Develops from lymphoid precursors that arise in bone marrow; many ILC2s mature and live in lung tissue.",
  immune: "Most immune cells start from blood-forming stem cells in bone marrow; T cells mature in the thymus before specialising.",
  th1: "T cells begin in bone marrow, mature in the thymus (an immune-training organ), then can become Th1 cells in lymph nodes.",
  th2: "CD4 T cells begin in bone marrow, mature in the thymus (an immune-training organ), then can become Th2 cells in lymph nodes.",
  th17: "T cells begin in bone marrow, mature in the thymus (an immune-training organ), then can become Th17 cells in lymph nodes.",
  cytokine: "Made and released by the cell sending the message; the source depends on which cytokine it is.",
  il4: "Mainly released by Th2 cells in this pathway; other immune cells can also contribute.",
  "il-4": "Mainly released by Th2 cells in this pathway; other immune cells can also contribute.",
  il5: "Released by Th2 cells and ILC2s; these are two different sources of type 2 signals.",
  "il-5": "Released by Th2 cells and ILC2s; these are two different sources of type 2 signals.",
  il13: "Released by Th2 cells and ILC2s; these are two different sources of type 2 signals.",
  "il-13": "Released by Th2 cells and ILC2s; these are two different sources of type 2 signals.",
  bcell: "B cells develop from blood-forming stem cells and mature in bone marrow; activated cells can become plasma cells or long-lived memory B cells.",
  b: "B cells develop from blood-forming stem cells in bone marrow; after activation some become antibody-making plasma cells.",
  ige: "Made by plasma cells, which are activated descendants of B cells, after they switch antibody type.",
  "fcεri": "A receptor protein made by mast cells and other immune cells; it sits on their surface ready to bind IgE.",
  mast: "Starts from blood-forming stem cells in bone marrow (soft tissue inside bones), travels in blood, then matures in airway tissue.",
  "mast-cell": "Starts from blood-forming stem cells in bone marrow (soft tissue inside bones), travels in blood, then matures in airway tissue.",
  histamine: "Stored in tiny packets inside mast cells and basophils; released when those cells activate.",
  leukotriene: "Made on demand by mast cells and other white blood cells from arachidonic acid, a fatty material in cell membranes.",
  leukotrienes: "Made on demand by mast cells and other white blood cells from arachidonic acid, a fatty material in cell membranes.",
  eosinophil: "Develops in bone marrow, travels in blood, then airway signals can draw it into lung tissue; IL-5 supports its survival.",
  neutrophil: "Made in bone marrow and released into blood; airway chemical signals can call it into lung tissue.",
  net: "Activated neutrophils release their own DNA coated with granule proteins outside the cell; extracellular means outside the cell.",
  nets: "Activated neutrophils release their own DNA coated with granule proteins outside the cell; extracellular means outside the cell.",
  "t2-high": "An immune pattern grouped by signals such as IL-4/5/13; it may include eosinophils or IgE.",
  "t2-low": "A broad immune pattern label covering several pathways, including neutrophilic and paucigranulocytic patterns.",
  inflammasome: "Several proteins assemble inside activated immune or tissue cells to switch on inflammatory messages.",
  "il-1β": "Immune cells make an inactive starter form; inflammasome activity can process it into active IL-1β.",
  il1β: "Immune cells make an inactive starter form; inflammasome activity can process it into active IL-1β.",
  il1b: "Immune cells make an inactive starter form; inflammasome activity can process it into active IL-1β.",
  mucus: "Made by goblet cells (mucus-producing lining cells) and airway glands; IL-13 can increase production.",
  goblet: "Develops from airway lining starter cells and releases mucus onto the airway surface.",
  oedema: "Inflammation lets fluid move from small blood vessels into the airway wall.",
  edema: "Inflammation lets fluid move from small blood vessels into the airway wall.",
  vessel: "Its inner surface is made of endothelial cells (the cells lining blood vessels); new vessels can sprout from existing ones.",
  vessels: "Their inner surface is made of endothelial cells (the cells lining blood vessels); new vessels can sprout from existing ones.",
  muscle: "Smooth-muscle cells are already part of the airway wall; they contract quickly and may thicken over time.",
  bronchoconstriction: "The airway's smooth-muscle cells tighten, narrowing the open lumen.",
  fibrosis: "Repair cells called fibroblasts lay down collagen, a strong structural protein, during tissue repair.",
  remodelling: "Built over time by changes in lining cells, muscle, connective-tissue repair, vessels and mucus glands.",
  remodeling: "Built over time by changes in lining cells, muscle, connective-tissue repair, vessels and mucus glands.",
  angiogenesis: "Endothelial cells sprout from existing small vessels to form new vessels.",
  desquamation: "Airway lining cells become injured and detach from the surface.",
  hypertrophy: "The existing airway muscle cells grow larger after repeated growth and repair signals.",
  ach: "Made and released at parasympathetic (vagal) nerve endings when the nerve sends a signal.",
  nerve: "Airway nerve endings are branches of sensory or vagal neurons that connect to the nervous system.",
  vagal: "The vagus starts in the brainstem and sends parasympathetic nerve branches to the airways.",
  m3: "A receptor protein made by airway smooth-muscle and gland cells; it responds to ACh.",
  "β2": "A receptor protein made by airway smooth-muscle cells; adrenaline and inhaled β2 medicines can activate it.",
  "substance-p": "Made and stored in airway sensory-nerve endings, then released when those nerves are activated.",
  substance: "Made and stored in airway sensory-nerve endings, then released when those nerves are activated.",
  "neurokinin-a": "Made and stored in airway sensory-nerve endings, then released when those nerves are activated.",
  neurokinin: "Made and stored in airway sensory-nerve endings, then released when those nerves are activated.",
  cgrp: "Released mainly from sensory-nerve endings; some other cell types can also make it.",
  pge2: "Made by many tissue cells from arachidonic acid when they are activated or injured.",
  airflow: "Breathing muscles create pressure differences that move air through the airways."
};

for (const [term, context] of Object.entries(glossaryLearning)) {
  if (!glossary[term]) glossary[term] = { label: context.label || term, definition: context.inAsthma || context.overview };
  glossary[term].overview = context.overview;
  glossary[term].inAsthma = context.inAsthma;
  glossary[term].origin = glossaryOrigins[term] || "";
}

for (const [term, origin] of Object.entries(glossaryOrigins)) {
  if (glossary[term]) glossary[term].origin = origin;
}

let lessonIndex = 0;
let hoverTargets = [];
let pinnedTerm = "";
let pinnedTarget = null;
let pinnedSecondTarget = null;
let hoverSelection = [];
let hoverCandidateTargets = [];
let hoverCandidateKey = "";
let hoverCandidateSince = 0;

function setup() {
  const canvas = createCanvas(canvasWidth(), canvasHeight());
  canvas.parent("sketch");
  textFont("Arial");
  describe("Seventeen-stage asthma learning story. It connects susceptibility, triggers, immune and neural pathways, airway changes, airflow effects and two-level explanations for key terms.");

  document.getElementById("back-stage").addEventListener("click", () => changeStage(-1));
  document.getElementById("next-stage").addEventListener("click", () => changeStage(1));
}

function canvasWidth() {
  return min(960, max(340, windowWidth - 24));
}

function canvasHeight() {
  return canvasWidth() < 700 ? 940 : 860;
}

function changeStage(direction) {
  lessonIndex = constrain(lessonIndex + direction, 0, lessons.length - 1);
  pinnedTerm = "";
  pinnedTarget = null;
  pinnedSecondTarget = null;
  hoverSelection = [];
  hoverCandidateTargets = [];
  hoverCandidateKey = "";
  describe("Stage " + (lessonIndex + 1) + " of " + lessons.length + ". " + lessons[lessonIndex].title + ". " + lessons[lessonIndex].focus);
}

function draw() {
  hoverTargets = [];
  const narrow = width < 700;
  const panelY = narrow ? 302 : 232;
  const panelH = 450;
  const notesY = panelY + panelH + 10;

  background(245, 248, 251);
  drawHeader();
  drawProgress();
  drawPathwayCards(narrow);
  drawMechanismPanel(panelY, panelH, narrow);
  drawKeyPoints(notesY);
  drawGlossaryTooltip();
}

function drawHeader() {
  noStroke();
  fill(22, 42, 63);
  textAlign(LEFT, TOP);
  textSize(width < 500 ? 16 : width < 700 ? 20 : 25);
  text("Asthma: inside the airway", 18, 13);
  fill(85, 105, 123);
  textSize(width < 500 ? 10 : 12);
  text("Follow the story from trigger to airflow", 19, 43);
}

function drawProgress() {
  const margin = width < 500 ? 22 : 28;
  const gap = (width - margin * 2) / (lessons.length - 1);
  const y = 83;
  stroke(190, 203, 214);
  strokeWeight(2);
  line(margin, y, width - margin, y);

  for (let i = 0; i < lessons.length; i++) {
    const x = margin + i * gap;
    noStroke();
    fill(i === lessonIndex ? color(27, 116, 160) : color(177, 193, 205));
    circle(x, y, i === lessonIndex ? (width < 500 ? 20 : 23) : (width < 500 ? 14 : 16));
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(width < 500 ? 7.5 : 9);
    text(i + 1, x, y - 0.5);
  }

  fill(33, 59, 80);
  textAlign(CENTER, TOP);
  let titleSize = width < 500 ? 14 : width < 700 ? 18 : 21;
  textSize(titleSize);
  const title = lessons[lessonIndex].title;
  while (textWidth(title) > width - 28 && titleSize > 11) {
    titleSize--;
    textSize(titleSize);
  }
  drawGlossaryText(title, 14, 105, width - 28, titleSize + 4, titleSize, color(33, 59, 80), "center");
}

function drawPathwayCards(narrow) {
  const cards = lessons[lessonIndex].cards;
  const margin = 18;
  const gap = 8;
  const columns = narrow ? 2 : cards.length >= 4 ? 4 : 3;
  const cardW = (width - margin * 2 - gap * (columns - 1)) / columns;
  const cardH = narrow ? 68 : 74;
  const topY = 145;

  for (let i = 0; i < cards.length; i++) {
    const col = i % columns;
    const row = floor(i / columns);
    const x = margin + col * (cardW + gap);
    const y = topY + row * (cardH + gap);
    const pulse = (sin(frameCount * 0.045 - i * 0.8) + 1) / 2;
    noStroke();
    fill(255);
    rect(x, y, cardW, cardH, 10);
    fill(30, 132, 171, 160 + pulse * 70);
    rect(x, y, 5, cardH, 4);
    fill(36, 57, 75);
    textAlign(LEFT, TOP);
    textSize(width < 500 ? 10 : 12);
    drawGlossaryText(cards[i], x + 10, y + 9, cardW - 18, cardH - 12, width < 500 ? 10 : 12, color(36, 57, 75));
    fill(30, 132, 171);
    circle(x + cardW - 10, y + 10, 4 + pulse * 2);
  }
}

function drawMechanismPanel(panelY, panelH, narrow) {
  const lesson = lessons[lessonIndex];
  const scene = lesson.scene;
  noStroke();
  fill(255);
  rect(14, panelY, width - 28, panelH, 14);

  fill(31, 68, 91);
  textAlign(LEFT, TOP);
  textSize(width < 500 ? 11 : 13);
  const panelTitle = scene.mode === "flowchart" ? "PATHWAY SUMMARY" : scene.mode === "immuneCells" ? "WHO DOES WHAT? FOLLOW THE CELLS" : "AIRWAY CUTAWAY";
  text(panelTitle, 25, panelY + 10);
  fill(104, 122, 135);
  textAlign(RIGHT, TOP);
  textSize(width < 500 ? 7.5 : 9);
  text("Hover / tap a part for details", width - 25, panelY + 12);

  drawPathwayStrip(lesson.active, panelY + 38);
  fill(64, 81, 96);
  textAlign(CENTER, TOP);
  textSize(width < 500 ? 9.5 : 11);
  drawGlossaryText(lesson.focus, 25, panelY + 69, width - 50, 32, width < 500 ? 9.5 : 11, color(64, 81, 96), "center");

  if (scene.mode === "flowchart") {
    drawAsthmaFlowchart(panelY, panelH, narrow);
  } else if (scene.mode === "immuneCells") {
    drawImmuneCellMap(panelY, panelH);
  } else if (scene.mode === "compare") {
    const cy = panelY + 246;
    const r = min(width < 500 ? 58 : 94, width * 0.19);
    drawAirwaySection(width * 0.27, cy, r, { constriction: 0.03, edema: 0, mucus: 0, remodel: 0, damage: 0, mode: "baseline" });
    drawAirwaySection(width * 0.73, cy, r, scene);
    fill(42, 61, 77);
    textAlign(CENTER, TOP);
    textSize(width < 500 ? 9 : 11);
    const labelW = width * 0.43;
    text("Open airway\nMore overall air passes", width * 0.27 - labelW / 2, cy + r + 6, labelW, 34);
    text("Asthma flare\nLess total air; local jet may be faster", width * 0.73 - labelW / 2, cy + r + 6, labelW, 42);
  } else {
    const cx = width / 2;
    const cy = panelY + 246;
    const r = min(width < 500 ? 82 : 116, (width - 116) / 2);
    drawAirwaySection(cx, cy, r, scene);
    if (scene.mode !== "neural") drawMechanismActors(scene.actors, cx, cy, r);
    if (scene.mode === "neural") drawNeuralMechanism(cx, cy, r);
    else drawPathwayEffect(scene.mode, cx, cy, r, scene);
  }

  if (scene.mode === "flowchart") {
    fill(100, 116, 129);
    textAlign(CENTER, BOTTOM);
    textSize(width < 500 ? 7 : 8);
    text("Simplified map: pathways overlap and vary between people.", width / 2, panelY + panelH - 10);
  } else if (scene.mode === "immuneCells") {
    drawImmuneCellLegend(panelY + panelH - 49);
    fill(110, 125, 137);
    textAlign(RIGHT, BOTTOM);
    textSize(7.5);
    text("Simplified cell pathway", width - 24, panelY + panelH - 7);
  } else {
    drawVisualKey(panelY + panelH - 57, scene.mode);
    fill(110, 125, 137);
    textAlign(RIGHT, BOTTOM);
    textSize(8);
    text("Teaching schematic — not to scale", width - 24, panelY + panelH - 7);
  }
}

function drawAsthmaFlowchart(panelY, panelH, narrow) {
  const mobile = width < 500;
  const root = { x: width / 2 - (mobile ? 118 : 160), y: panelY + 105, w: mobile ? 236 : 320, h: 32 };
  const routeFill = color(235, 245, 249);
  const parallelFill = color(250, 241, 226);
  const effectFill = color(248, 250, 251);
  const rootY = root.y + root.h;
  const routeY = panelY + (mobile ? 147 : 153);
  const routeH = mobile ? 43 : 68;
  const routes = [];

  if (mobile) {
    const gap = 8;
    const boxW = (width - 44 - gap) / 2;
    routes.push({ x: 22, y: routeY, w: boxW, h: 56, title: "T2-HIGH", detail: "Th2 / ILC2 → IL-4, IL-5, IL-13", term: "t2-high", symbol: "eosinophil", fill: routeFill });
    routes.push({ x: 22 + boxW + gap, y: routeY, w: boxW, h: 56, title: "T2-LOW", detail: "Th1 / Th17 · neutrophilic or paucigranulocytic", term: "t2-low", symbol: "neutrophil", fill: routeFill });
    routes.push({ x: 22, y: panelY + 209, w: width - 44, h: 39, title: "MAST CELLS + NERVES", detail: "Histamine / leukotrienes · ACh → M3 · β2 relaxes", term: "mast", symbol: "mast", fill: parallelFill });
  } else {
    const gap = 12;
    const boxW = (width - 52 - gap * 2) / 3;
    routes.push({ x: 26, y: routeY, w: boxW, h: routeH, title: "T2-HIGH ROUTE", detail: "Th2 / ILC2 · IL-4, IL-5, IL-13 · IgE / eosinophils", term: "t2-high", symbol: "eosinophil", fill: routeFill });
    routes.push({ x: 26 + boxW + gap, y: routeY, w: boxW, h: routeH, title: "T2-LOW ROUTE", detail: "Th1 / Th17 · neutrophilic or paucigranulocytic", term: "t2-low", symbol: "neutrophil", fill: routeFill });
    routes.push({ x: 26 + (boxW + gap) * 2, y: routeY, w: boxW, h: routeH, title: "MAST CELLS + NERVES", detail: "Mediators · vagal ACh → M3 · β2 relaxes", term: "mast", symbol: "mast", fill: parallelFill });
  }

  const effectY = panelY + (mobile ? 258 : 246);
  const effectH = mobile ? 38 : 59;
  const effects = [];
  if (mobile) {
    const gap = 8;
    const boxW = (width - 44 - gap) / 2;
    effects.push({ x: 22, y: effectY, w: boxW, h: effectH, title: "Muscle tightens", detail: "bronchoconstriction", term: "bronchoconstriction", symbol: "muscle" });
    effects.push({ x: 22 + boxW + gap, y: effectY, w: boxW, h: effectH, title: "Wall swells", detail: "oedema / fluid", term: "oedema", symbol: "fluid" });
    effects.push({ x: 22, y: effectY + 43, w: boxW, h: effectH, title: "Mucus builds", detail: "may plug lumen", term: "mucus", symbol: "mucus" });
    effects.push({ x: 22 + boxW + gap, y: effectY + 43, w: boxW, h: effectH, title: "Wall remodels", detail: "longer-term change", term: "remodelling", symbol: "fibrosis" });
  } else {
    const gap = 9;
    const boxW = (width - 52 - gap * 3) / 4;
    const items = [
      ["Muscle tightens", "bronchoconstriction", "bronchoconstriction", "muscle"],
      ["Wall swells", "oedema / fluid", "oedema", "fluid"],
      ["Mucus builds", "may plug lumen", "mucus", "mucus"],
      ["Wall remodels", "longer-term change", "remodelling", "fibrosis"]
    ];
    items.forEach((item, i) => effects.push({ x: 26 + i * (boxW + gap), y: effectY, w: boxW, h: effectH, title: item[0], detail: item[1], term: item[2], symbol: item[3] }));
  }

  const finalY = panelY + (mobile ? 352 : 325);
  const finalNode = { x: width / 2 - (mobile ? 143 : 205), y: finalY, w: mobile ? 286 : 410, h: mobile ? 32 : 38 };
  const routeCenters = routes.map(node => node.x + node.w / 2);

  // Connect the entry point to the distinct immune / parallel routes.
  stroke(133, 163, 177);
  strokeWeight(1.2);
  if (mobile) {
    const splitY = routeY - 7;
    line(width / 2, rootY, width / 2, splitY);
    line(routes[0].x + routes[0].w / 2, splitY, routes[1].x + routes[1].w / 2, splitY);
    drawFlowArrow(width / 2, splitY, routes[0].x + routes[0].w / 2, routeY);
    drawFlowArrow(width / 2, splitY, routes[1].x + routes[1].w / 2, routeY);
    drawFlowArrow(width / 2, rootY, width / 2, routes[2].y);
  } else {
    const splitY = routeY - 8;
    line(width / 2, rootY, width / 2, splitY);
    line(min(...routeCenters), splitY, max(...routeCenters), splitY);
    routeCenters.forEach(x => drawFlowArrow(x, splitY, x, routeY));
  }

  // The immune routes and parallel nerve / mast-cell signals converge on the airway changes.
  const convergeY = mobile ? effectY - 8 : effectY - 12;
  if (mobile) {
    const leftRail = 12;
    const rightRail = width - 12;
    const upperBottom = routes[0].y + routes[0].h;
    const upperBranchY = upperBottom + 5;
    line(routes[0].x + routes[0].w / 2, upperBottom, leftRail, upperBranchY);
    line(leftRail, upperBranchY, leftRail, convergeY);
    line(routes[1].x + routes[1].w / 2, upperBottom, rightRail, upperBranchY);
    line(rightRail, upperBranchY, rightRail, convergeY);
    line(routes[2].x + routes[2].w / 2, routes[2].y + routes[2].h, width / 2, convergeY);
    line(leftRail, convergeY, rightRail, convergeY);

    const firstRowY = effectY - 8;
    const firstLeft = effects[0].x + effects[0].w / 2;
    const firstRight = effects[1].x + effects[1].w / 2;
    line(width / 2, convergeY, width / 2, firstRowY);
    line(firstLeft, firstRowY, firstRight, firstRowY);
    drawFlowArrow(firstLeft, firstRowY, firstLeft, effects[0].y);
    drawFlowArrow(firstRight, firstRowY, firstRight, effects[1].y);

    const secondRowY = effects[2].y - 6;
    const secondLeft = effects[2].x + effects[2].w / 2;
    const secondRight = effects[3].x + effects[3].w / 2;
    line(width / 2, firstRowY, width / 2, secondRowY);
    line(secondLeft, secondRowY, secondRight, secondRowY);
    drawFlowArrow(secondLeft, secondRowY, secondLeft, effects[2].y);
    drawFlowArrow(secondRight, secondRowY, secondRight, effects[3].y);
  } else {
    const left = effects[0].x + effects[0].w / 2;
    const right = effects[effects.length - 1].x + effects[effects.length - 1].w / 2;
    const routeBottom = routeY + routeH;
    routeCenters.forEach(x => drawFlowArrow(x, routeBottom, x, convergeY));
    line(left, convergeY, right, convergeY);
    effects.forEach(node => drawFlowArrow(node.x + node.w / 2, convergeY, node.x + node.w / 2, node.y));
  }

  // The four airway changes meet at less open space and variable airflow.
  const effectBottom = mobile ? effects[effects.length - 1].y + effectH : effectY + effectH;
  line(width / 2, effectBottom, width / 2, finalY - 7);
  drawFlowArrow(width / 2, finalY - 7, width / 2, finalY);

  drawFlowNode(root, "TRIGGER + SUSCEPTIBILITY", "Allergens, infections, irritants, exercise + risk", "trigger", "allergen", color(242, 235, 218));
  routes.forEach(node => drawFlowNode(node, node.title, node.detail, node.term, node.symbol, node.fill));
  effects.forEach(node => drawFlowNode(node, node.title, node.detail, node.term, node.symbol, effectFill));
  drawFlowNode(finalNode, "LESS OPEN LUMEN  →  VARIABLE AIRFLOW / SYMPTOMS", "", "airflow", "airflow", color(224, 239, 244));
}

function drawImmuneCellMap(panelY) {
  const mobile = width < 500;
  const nodeFill = color(235, 245, 249);
  const orangeFill = color(250, 241, 226);
  const cells = [
    { title: "1  Dendritic cell", detail: "takes up allergen; carries a fragment to a lymph node", term: "dendritic", symbol: "dendritic" },
    { title: "2  CD4 T cell", detail: "recognises the displayed fragment; may become a Th2 helper", term: "cd4", symbol: "th2" },
    { title: "3  Th2 helper", detail: "sends cytokine messages; IL-4 helps B cells switch to IgE", term: "th2", symbol: "th2" },
    { title: "4  B cell", detail: "binds the matching allergen and receives helper signals", term: "bcell", symbol: "bcell" },
    { title: "5  Plasma cell", detail: "an activated B-cell descendant that releases specific IgE", term: "plasma", symbol: "bcell" },
    { title: "6  IgE-coated mast cell", detail: "repeat exposure links IgE and releases fast signals", term: "mast", symbol: "mast" }
  ];

  if (mobile) {
    const x = 22;
    const w = width - 44;
    const h = 30;
    const gap = 8;
    const startY = panelY + 105;
    for (let i = 0; i < cells.length; i++) {
      const y = startY + i * (h + gap);
      if (i > 0) drawMovingArrow(x + w / 2, y - gap + 1, x + w / 2, y - 1, i * 0.16);
      drawFlowNode({ x, y, w, h }, cells[i].title, cells[i].detail, cells[i].term, cells[i].symbol, i === 5 ? orangeFill : nodeFill);
    }

    drawImmuneInfoBand(
      x, panelY + 330, w, 28, "WHERE CELLS COME FROM",
      "T and B cells begin in bone marrow; T cells mature in thymus, B cells in marrow. Dendritic and mast precursors also begin in marrow.",
      "marrow", color(71, 153, 182), 5.8
    );
    drawImmuneInfoBand(
      x, panelY + 364, w, 28, "PARALLEL RAPID RESPONSE",
      "Airway alarmins → resident ILC2 → IL-5 / IL-13 → eosinophils + mucus.",
      "ilc2", color(222, 151, 77), 6.1
    );
    return;
  }

  const gap = 12;
  const nodeW = (width - 52 - gap * 2) / 3;
  const x = [26, 26 + nodeW + gap, 26 + (nodeW + gap) * 2];
  const topY = panelY + 111;
  const bottomY = panelY + 194;
  const h = 58;

  // First row travels left to right: airway scout → CD4 cell → Th2 helper.
  drawMovingArrow(x[0] + nodeW + 1, topY + h / 2, x[1] - 2, topY + h / 2, 0.05);
  drawMovingArrow(x[1] + nodeW + 1, topY + h / 2, x[2] - 2, topY + h / 2, 0.2);
  // The route then drops to B-cell help and returns across the second row.
  drawMovingArrow(x[2] + nodeW / 2, topY + h + 2, x[2] + nodeW / 2, bottomY - 2, 0.35);
  drawMovingArrow(x[2] - 1, bottomY + h / 2, x[1] + nodeW + 2, bottomY + h / 2, 0.5);
  drawMovingArrow(x[1] - 1, bottomY + h / 2, x[0] + nodeW + 2, bottomY + h / 2, 0.65);

  drawFlowNode({ x: x[0], y: topY, w: nodeW, h }, "1  Dendritic cell", "Airway scout: takes up allergen, then carries a fragment to a lymph node", "dendritic", "dendritic", nodeFill);
  drawFlowNode({ x: x[1], y: topY, w: nodeW, h }, "2  CD4 T cell", "Recognises the displayed fragment; activation signals can make it a Th2 helper", "cd4", "th2", nodeFill);
  drawFlowNode({ x: x[2], y: topY, w: nodeW, h }, "3  Th2 helper", "A CD4 T-cell type; IL-4 helps a matching B cell switch antibody class", "th2", "th2", nodeFill);
  drawFlowNode({ x: x[2], y: bottomY, w: nodeW, h }, "4  B cell", "Binds the same allergen and receives helper signals, including IL-4", "bcell", "bcell", nodeFill);
  drawFlowNode({ x: x[1], y: bottomY, w: nodeW, h }, "5  Plasma cell", "An activated B-cell descendant; releases allergen-specific IgE", "plasma", "bcell", nodeFill);
  drawFlowNode({ x: x[0], y: bottomY, w: nodeW, h }, "6  IgE-coated mast cell", "IgE sits on the cell; re-exposure can link IgE and release mediators", "mast", "mast", orangeFill);

  drawImmuneInfoBand(
    26, panelY + 265, width - 52, 45, "CELL ORIGINS",
    "Blood-forming stem cells in bone marrow produce these immune-cell families. T cells mature in the thymus; B cells mature in marrow. Dendritic and mast precursors finish developing in tissues.",
    "marrow", color(71, 153, 182), 7.1
  );
  drawImmuneInfoBand(
    26, panelY + 317, width - 52, 54, "PARALLEL RAPID RESPONSE",
    "Airway lining releases alarmins → ILC2 responds → IL-5 / IL-13 support eosinophils and mucus. This innate route can run alongside the allergen-specific T-cell / B-cell route.",
    "ilc2", color(222, 151, 77), 7.1
  );
}

function drawImmuneInfoBand(x, y, w, h, title, body, term, accent, fontSize) {
  noStroke();
  fill(248, 250, 251);
  rect(x, y, w, h, 8);
  fill(accent);
  rect(x, y, 4, h, 4);
  fill(48, 82, 101);
  textAlign(LEFT, TOP);
  textSize(width < 500 ? 6.8 : 7.6);
  text(title, x + 10, y + 4, w - 18, 9);
  fill(61, 79, 92);
  drawGlossaryText(body, x + 10, y + 14, w - 18, h - 16, fontSize, color(61, 79, 92));
  hoverTargets.push({ x, y, w, h, term, symbol: symbolForTerm(term) });
}

function drawMovingArrow(x1, y1, x2, y2, phase) {
  stroke(133, 163, 177);
  strokeWeight(1.2);
  line(x1, y1, x2, y2);
  push();
  translate(x2, y2);
  rotate(atan2(y2 - y1, x2 - x1));
  noStroke();
  fill(133, 163, 177);
  triangle(0, 0, -6, -3.5, -6, 3.5);
  pop();

  const progress = (frameCount * 0.018 + phase) % 1;
  noStroke();
  fill(230, 143, 75);
  circle(lerp(x1, x2, progress), lerp(y1, y2, progress), 4.2);
}

function drawImmuneCellLegend(y) {
  const items = [
    ["dendritic", "Scout presents allergen"],
    ["th2", "T helper guides"],
    ["bcell", "B / plasma make IgE"],
    ["mast", "Mast cell releases signals"]
  ];
  const segment = (width - 40) / items.length;
  noStroke();
  fill(53, 74, 91);
  textAlign(LEFT, TOP);
  textSize(7);
  text("CELL KEY", 22, y - 10);
  for (let i = 0; i < items.length; i++) {
    const x = 20 + i * segment;
    drawMiniIcon(items[i][0], x + 7, y + 7, width < 500 ? 10 : 12);
    drawGlossaryText(items[i][1], x + 16, y + 1, segment - 18, 15, width < 500 ? 5.8 : 7.1, color(73, 91, 105));
  }
}

function drawFlowNode(node, title, detail, term, symbol, fillColour) {
  noStroke();
  fill(fillColour);
  rect(node.x, node.y, node.w, node.h, 8);
  stroke(182, 204, 215);
  strokeWeight(1);
  noFill();
  rect(node.x, node.y, node.w, node.h, 8);
  noStroke();

  const mobile = width < 500;
  const iconSize = node.h < 43 ? (mobile ? 14 : 17) : (mobile ? 17 : 22);
  const iconX = node.x + (mobile ? 15 : 22);
  const iconY = node.y + node.h / 2;
  drawMiniIcon(symbol, iconX, iconY, iconSize);
  fill(36, 60, 76);
  textAlign(LEFT, CENTER);
  textSize(node.h < 43 ? (mobile ? 7.3 : 9) : (mobile ? 7.4 : 9.5));
  const textX = node.x + (mobile ? 27 : 38);
  const textW = node.w - (mobile ? 34 : 48);
  if (detail) {
    textAlign(LEFT, TOP);
    textSize(node.h < 43 ? (mobile ? 7.1 : 8.3) : (mobile ? 7.1 : 8.2));
    text(title, textX, node.y + (node.h < 43 ? 5 : 9), textW, 12);
    fill(77, 97, 111);
    textSize(node.h < 43 ? (mobile ? 6.2 : 7.3) : (mobile ? 6.2 : 7.4));
    drawGlossaryText(detail, textX, node.y + (node.h < 43 ? 19 : 26), textW, node.h - (node.h < 43 ? 20 : 29), mobile ? 6.2 : 7.4, color(77, 97, 111));
  } else {
    textAlign(CENTER, CENTER);
    textSize(mobile ? 7.4 : 9.5);
    text(title, node.x + 5, node.y + 2, node.w - 10, node.h - 4);
  }
  hoverTargets.push({ x: node.x, y: node.y, w: node.w, h: node.h, term, symbol: symbolForTerm(term) });
}

function drawFlowArrow(x1, y1, x2, y2) {
  stroke(133, 163, 177);
  strokeWeight(1.2);
  line(x1, y1, x2, y2);
  noStroke();
  fill(133, 163, 177);
  triangle(x2, y2, x2 - 3.2, y2 - 5, x2 + 3.2, y2 - 5);
}

function drawNeuralMechanism(cx, cy, r) {
  const mobile = width < 500;
  const terminalX = cx - r * 1.05;
  const terminalY = cy - r * 0.16;
  const receptorX = cx - r * 0.76;
  const receptorY = cy - r * 0.14;
  const betaX = cx + r * 0.78;
  const betaY = cy - r * 0.14;

  // A vagal nerve ending stays outside the lumen; ACh crosses the small gap to M3.
  noFill();
  stroke(111, 121, 175);
  strokeWeight(mobile ? 2.5 : 3.5);
  bezier(cx - r * 1.45, cy + r * 0.78, cx - r * 1.22, cy + r * 0.42, cx - r * 1.18, cy - r * 0.05, terminalX, terminalY);
  noStroke();
  fill(111, 121, 175);
  circle(terminalX, terminalY, mobile ? 6 : 8);
  registerCircleHover(terminalX, terminalY, 15, "vagal");
  drawMiniIcon("nerve", cx - r * 1.16, cy - r * 0.68, mobile ? 16 : 20);
  registerCircleHover(cx - r * 1.16, cy - r * 0.68, 20, "vagal");
  fill(52, 74, 94);
  textAlign(CENTER, CENTER);
  textSize(mobile ? 6.5 : 8);
  drawGlossaryText("VAGAL MOTOR", cx - r * 1.48, cy - r * 0.56, r * 0.78, 12, mobile ? 6.5 : 8, color(52, 74, 94), "center");

  drawMiniIcon("m3", receptorX, receptorY, mobile ? 19 : 23);
  registerCircleHover(receptorX, receptorY, 24, "m3");
  fill(52, 74, 94);
  textSize(mobile ? 6 : 7.5);
  drawGlossaryText("M3", receptorX - 10, receptorY + (mobile ? 10 : 13), 20, 10, mobile ? 6 : 7.5, color(52, 74, 94), "center");

  // Animated ACh particles move only from the nerve ending to the M3 receptor.
  for (let i = 0; i < 4; i++) {
    const t = (frameCount * 0.018 + i * 0.25) % 1;
    const x = lerp(terminalX + 3, receptorX - 6, t);
    const y = lerp(terminalY, receptorY, t) - sin(t * PI) * r * 0.06;
    noStroke();
    fill(234, 151, 73);
    circle(x, y, mobile ? 3.5 : 4.5);
    registerCircleHover(x, y, 10, "ach");
  }
  fill(151, 100, 51);
  textSize(mobile ? 6 : 7.5);
  drawGlossaryText("ACh", (terminalX + receptorX) / 2 - 14, terminalY - r * 0.16, 28, 10, mobile ? 6 : 7.5, color(151, 100, 51), "center");

  // β2 is drawn on the opposite side as a distinct relaxing signal.
  drawMiniIcon("beta2", betaX, betaY, mobile ? 20 : 24);
  registerCircleHover(betaX, betaY, 25, "β2");
  stroke(62, 156, 136);
  strokeWeight(2);
  line(betaX + 8, betaY, betaX + r * 0.23, betaY);
  noStroke();
  fill(62, 156, 136);
  triangle(betaX + r * 0.23, betaY, betaX + r * 0.23 - 5, betaY - 3, betaX + r * 0.23 - 5, betaY + 3);
  fill(52, 74, 94);
  textSize(mobile ? 6 : 7.5);
  drawGlossaryText("β2 relaxes", betaX - 8, betaY - r * 0.31, r * 0.92, 12, mobile ? 6 : 7.5, color(52, 74, 94), "center");
}

function drawPathwayStrip(active, y) {
  const labels = pathwayLabels;
  const margin = width < 500 ? 21 : 40;
  const x0 = margin;
  const x1 = width - margin;
  const gap = (x1 - x0) / (labels.length - 1);
  stroke(201, 213, 221);
  strokeWeight(2);
  line(x0, y + 6, x1, y + 6);

  for (let i = 0; i < labels.length; i++) {
    const x = x0 + gap * i;
    noStroke();
    fill(i === active ? color(231, 145, 63) : color(138, 166, 181));
    circle(x, y + 6, i === active ? 11 : 7);
    fill(i === active ? color(39, 64, 82) : color(104, 122, 135));
    textAlign(CENTER, TOP);
    textSize(width < 500 ? 7.5 : 9);
    const labelColour = i === active ? color(39, 64, 82) : color(104, 122, 135);
    drawGlossaryText(labels[i], x - gap / 2, y + 13, width < 500 ? gap - 2 : gap + 10, 20, width < 500 ? 7.5 : 9, labelColour, "center");
  }
  const t = (frameCount * 0.022) % 1;
  const travel = active === 0 ? 0 : (active - 1 + t) / (labels.length - 1);
  noStroke();
  fill(241, 165, 76);
  circle(lerp(x0, x1, travel), y + 6, 4);
}

function drawAirwaySection(cx, cy, r, state) {
  const pulse = state.mode === "hyperresponsive" ? 0.5 + 0.5 * sin(frameCount * 0.09) : 0.5 + 0.5 * sin(frameCount * 0.035);
  const constriction = constrain(state.constriction * (0.90 + pulse * 0.10), 0, 1);
  const edema = state.edema;
  const remodel = state.remodel;
  // Contraction and remodelling move the inner edge of the muscle layer inward.
  // Oedema thickens the layer beneath the lining; mucus occupies the lumen itself.
  const muscleOuter = r * (0.86 + 0.04 * remodel);
  const muscleInner = r * (0.72 - 0.09 * constriction - 0.08 * remodel);
  const subOuter = muscleInner - r * 0.08;
  const edemaInner = subOuter - r * 0.06 * edema;
  const liningOuter = edemaInner - r * 0.08;
  const lumenR = max(r * 0.18, liningOuter - r * 0.07);

  // The concentric layers represent the airway wall, smooth muscle, lining and lumen.
  noStroke();
  fill(247, 222, 215);
  circle(cx, cy, r * 2);
  fill(189, 91, 106);
  circle(cx, cy, muscleOuter * 2);
  fill(250, 236, 211);
  circle(cx, cy, muscleInner * 2);
  fill(245, 205, 190);
  circle(cx, cy, subOuter * 2);
  fill(230, 184, 174);
  circle(cx, cy, edemaInner * 2);
  fill(219, 145, 142);
  circle(cx, cy, liningOuter * 2);
  fill(65, 150, 179);
  circle(cx, cy, lumenR * 2);

  drawVessels(cx, cy, r, state);
  drawEpithelialCells(cx, cy, (liningOuter + lumenR) / 2, r, state.damage);
  if (remodel > 0.15) drawFibrosis(cx, cy, subOuter, liningOuter, remodel);
  if (constriction > 0.18) drawContractionMarks(cx, cy, muscleOuter, muscleInner, constriction);
  if (state.mucus > 0.05) drawMucus(cx, cy, lumenR, state.mucus);
  drawAirParticles(cx, cy, lumenR, constriction, state.mucus);

  // Make the visible airway layers themselves hoverable, not only their captions.
  registerRingHover(cx, cy, muscleOuter, r, "wall");
  registerRingHover(cx, cy, muscleInner, muscleOuter, "muscle");
  registerRingHover(cx, cy, subOuter, muscleInner, "submucosa");
  registerRingHover(cx, cy, edemaInner, subOuter, "oedema");
  registerRingHover(cx, cy, lumenR, liningOuter, "epithelium");
  registerCircleHover(cx, cy, lumenR, "lumen", lumenR);

  // Layer captions are placed directly over the corresponding rings.
  fill(255, 250, 239, 235);
  textAlign(CENTER, CENTER);
  textSize(width < 500 ? 6.5 : 8);
  drawGlossaryText("LUMEN", cx - lumenR * 0.65, cy - 5, lumenR * 1.3, 12, width < 500 ? 6.5 : 8, color(255, 250, 239), "center");
  fill(93, 51, 62);
  textSize(width < 500 ? 5.8 : 7);
  drawGlossaryText("SMOOTH MUSCLE", cx - muscleOuter * 0.8, cy - (muscleOuter + muscleInner) * 0.52 - 4, muscleOuter * 1.6, 10, width < 500 ? 5.8 : 7, color(93, 51, 62), "center");
  fill(99, 76, 67);
  drawGlossaryText("AIRWAY WALL", cx - r * 0.7, cy + r * 0.90 - 4, r * 1.4, 10, width < 500 ? 5.8 : 7, color(99, 76, 67), "center");

  return { cx, cy, r, lumenR, muscleOuter, liningOuter };
}

function drawContractionMarks(cx, cy, outerRadius, innerRadius, intensity) {
  const angles = [0, HALF_PI, PI, PI + HALF_PI];
  stroke(229, 132, 65, 170 + intensity * 70);
  strokeWeight(1 + intensity);
  for (const a of angles) {
    const startR = outerRadius - 3;
    const endR = innerRadius + 3;
    const sx = cx + cos(a) * startR;
    const sy = cy + sin(a) * startR;
    const ex = cx + cos(a) * endR;
    const ey = cy + sin(a) * endR;
    line(sx, sy, ex, ey);
    noStroke();
    fill(229, 132, 65);
    push();
    translate(ex, ey);
    rotate(a + PI);
    triangle(0, 0, -5, -3, -5, 3);
    pop();
    stroke(229, 132, 65, 170 + intensity * 70);
    strokeWeight(1 + intensity);
  }
  noStroke();
}

function drawEpithelialCells(cx, cy, radius, r, damage) {
  const count = 20;
  const cellW = max(4, r * 0.075);
  const cellH = max(3, r * 0.05);
  noStroke();
  for (let i = 0; i < count; i++) {
    const angle = i * TWO_PI / count;
    const damaged = damage > 0.2 && (i === 2 || i === 3 || i === 16 || (damage > 0.55 && i === 4));
    if (damaged) {
      stroke(179, 79, 83);
      strokeWeight(1.5);
      const x = cx + cos(angle) * radius;
      const y = cy + sin(angle) * radius;
      line(x - 2.6, y - 2.6, x + 2.6, y + 2.6);
      noStroke();
      registerCircleHover(x, y, 8, "desquamation");
      continue;
    }
    fill(255, 242, 229);
    push();
    translate(cx + cos(angle) * radius, cy + sin(angle) * radius);
    rotate(angle);
    ellipse(0, 0, cellW, cellH);
    pop();
    registerCircleHover(cx + cos(angle) * radius, cy + sin(angle) * radius, cellW, "epithelium");
  }
}

function drawVessels(cx, cy, r, state) {
  const angles = [-2.52, -1.92, -1.18, -0.56, 0.55, 1.2, 1.92, 2.58];
  for (let i = 0; i < angles.length; i++) {
    const a = angles[i];
    const x = cx + cos(a) * r * 0.92;
    const y = cy + sin(a) * r * 0.92;
    noStroke();
    fill(177, 73, 91, 185);
    ellipse(x, y, r * 0.15, r * 0.085);
    fill(248, 203, 195);
    ellipse(x, y, r * 0.075, r * 0.045);
    registerEllipseHover(x, y, r * 0.15, r * 0.085, "vessel");

    if (state.edema > 0.24 && i % 2 === 0) {
      const phase = (frameCount * 0.025 + i * 0.17) % 1;
      fill(111, 184, 208, 190);
      circle(lerp(x, cx + cos(a) * r * 0.72, phase), lerp(y, cy + sin(a) * r * 0.72, phase), 3 + state.edema * 2);
      registerCircleHover(lerp(x, cx + cos(a) * r * 0.72, phase), lerp(y, cy + sin(a) * r * 0.72, phase), 9, "oedema");
    }
  }
}

function drawFibrosis(cx, cy, outer, inner, intensity) {
  stroke(176, 130, 101, 100 + intensity * 90);
  strokeWeight(1 + intensity * 1.3);
  for (let i = 0; i < 18; i++) {
    const a = i * TWO_PI / 18;
    const r1 = inner + 2;
    const r2 = outer - 3;
    line(cx + cos(a) * r1, cy + sin(a) * r1, cx + cos(a) * r2, cy + sin(a) * r2);
    registerCircleHover(cx + cos(a) * (r1 + r2) / 2, cy + sin(a) * (r1 + r2) / 2, 8, "fibrosis");
  }
  noStroke();
}

function drawMucus(cx, cy, lumenR, amount) {
  const blobs = min(6, 1 + floor(amount * 6));
  noStroke();
  fill(244, 195, 83, 235);
  for (let i = 0; i < blobs; i++) {
    const angle = -1.05 + i * 0.62;
    const wobble = sin(frameCount * 0.035 + i) * 2;
    const x = cx + cos(angle) * lumenR * 0.62;
    const y = cy + sin(angle) * lumenR * 0.62 + wobble;
    ellipse(x, y, max(5, lumenR * 0.34), max(4, lumenR * 0.18));
    registerEllipseHover(x, y, max(8, lumenR * 0.34), max(8, lumenR * 0.18), "mucus");
  }
}

function drawAirParticles(cx, cy, lumenR, constriction, mucus) {
  const speed = 0.010 * (1 - constriction * 0.62 - mucus * 0.18);
  for (let i = 0; i < 4; i++) {
    const t = (frameCount * speed + i / 4) % 1;
    const x = lerp(cx - lumenR * 0.76, cx + lumenR * 0.76, t);
    const y = cy + sin(t * TWO_PI * 1.5 + i) * lumenR * 0.19;
    noStroke();
    fill(232, 248, 251, 230);
    circle(x, y, 3.5);
    registerCircleHover(x, y, 10, "airflow");
  }
}

function drawMechanismActors(actors, cx, cy, r) {
  if (!actors.length) return;
  const offsets = actors.length === 1 ? [0] : actors.length === 2 ? [-0.85, 0.85] : actors.length === 3 ? [-1.0, 0, 1.0] : [-1.28, -0.43, 0.43, 1.28];
  for (let i = 0; i < actors.length; i++) {
    const x = cx + offsets[i] * r;
    const y = cy - r * (actors.length < 3 ? 0.62 : 0.76);
    drawMiniIcon(actors[i][0], x, y, width < 500 ? 19 : 23);
    registerCircleHover(x, y, width < 500 ? 23 : 28, termForSymbol(actors[i][0], actors[i][1]));
    fill(47, 66, 81);
    textAlign(CENTER, TOP);
    textSize(width < 500 ? 6.5 : 8);
    drawGlossaryText(actors[i][1], x - r * 0.42, y + (width < 500 ? 11 : 14), r * 0.84, 18, width < 500 ? 6.5 : 8, color(47, 66, 81), "center");
  }
}

function drawPathwayEffect(mode, cx, cy, r, state) {
  if (mode === "trigger") {
    for (let i = 0; i < 4; i++) {
      const t = (frameCount * 0.012 + i * 0.23) % 1;
      const x = cx - r * 1.65 + t * r * 0.82;
      const y = cy - r * 0.35 + sin(frameCount * 0.03 + i) * r * 0.12;
      drawMiniIcon("allergen", x, y, 9);
      registerCircleHover(x, y, 12, "allergen");
    }
  } else if (mode === "alarmin") {
    drawRadialSignals(cx, cy - r * 0.55, r * 0.55, 8, color(231, 147, 70), 0.035);
    fill(126, 75, 56);
    textAlign(CENTER, CENTER);
    textSize(width < 500 ? 6 : 8);
    drawGlossaryText("TSLP • IL-25 • IL-33", cx - r, cy - r * 1.04 - 5, r * 2, 12, width < 500 ? 6 : 8, color(126, 75, 56), "center");
  } else if (mode === "sensitisation") {
    drawArrowBetween(cx - r * 0.55, cy - r * 0.78, cx + r * 0.55, cy - r * 0.78, color(126, 166, 183));
    for (let i = 0; i < 3; i++) {
      const t = (frameCount * 0.014 + i / 3) % 1;
      circle(lerp(cx - r * 0.5, cx + r * 0.5, t), cy - r * 0.78, 4);
    }
  } else if (mode === "crosslink") {
    drawRadialSignals(cx + r * 0.55, cy - r * 0.58, r * 0.72, 9, color(230, 151, 67), 0.028);
    drawIgE(cx + r * 0.34, cy - r * 0.64, 0.55);
    drawIgE(cx + r * 0.72, cy - r * 0.36, 0.55);
  } else if (mode === "edemaMucus") {
    drawLeakSignals(cx, cy, r, 5);
  } else if (mode === "eosinophil") {
    drawRadialSignals(cx - r * 0.82, cy - r * 0.18, r * 0.72, 8, color(221, 124, 85), 0.023);
  } else if (mode === "t2low") {
    stroke(104, 124, 151, 205);
    strokeWeight(1.7);
    for (let i = 0; i < 4; i++) {
      const y = cy - r * 0.38 + i * r * 0.19;
      bezier(cx - r * 0.74, y, cx - r * 0.26, y - 12, cx + r * 0.22, y + 12, cx + r * 0.75, y - 3);
    }
    // Cross-links make the strands read as a web, rather than airflow streaks.
    for (let i = 0; i < 3; i++) {
      const x = cx - r * 0.42 + i * r * 0.42;
      bezier(x, cy - r * 0.34, x + r * 0.16, cy - r * 0.12, x - r * 0.12, cy + r * 0.12, x + r * 0.12, cy + r * 0.34);
    }
    noStroke();
    fill(104, 124, 151);
    textAlign(CENTER, CENTER);
    textSize(width < 500 ? 6 : 8);
    drawGlossaryText("NET WEB", cx - r * 0.4, cy + r * 0.22 - 5, r * 0.8, 12, width < 500 ? 6 : 8, color(104, 124, 151), "center");
    hoverTargets.push({ x: cx - r * 0.78, y: cy - r * 0.44, w: r * 1.56, h: r * 0.64, term: "nets", symbol: "nets" });
  } else if (mode === "neural") {
    drawNeuralMechanism(cx, cy, r);
  } else if (mode === "hyperresponsive") {
    for (let i = 0; i < 5; i++) {
      const a = i * TWO_PI / 5 + frameCount * 0.025;
      const d = r * (1.12 + 0.10 * sin(frameCount * 0.08 + i));
      fill(235, 153, 74, 220);
      circle(cx + cos(a) * d, cy + sin(a) * d, 4);
      registerCircleHover(cx + cos(a) * d, cy + sin(a) * d, 9, "hyperresponsiveness");
    }
  } else if (mode === "remodelling") {
    drawFibrosis(cx, cy, r * 0.64, r * 0.54, 0.75);
  }
}

function drawRadialSignals(cx, cy, reach, count, colour, speed) {
  noStroke();
  fill(colour);
  for (let i = 0; i < count; i++) {
    const angle = i * TWO_PI / count;
    const t = (frameCount * speed + i * 0.13) % 1;
    const d = t * reach;
    circle(cx + cos(angle) * d, cy + sin(angle) * d, 3.5);
    registerCircleHover(cx + cos(angle) * d, cy + sin(angle) * d, 9, "signal");
  }
}

function drawLeakSignals(cx, cy, r, count) {
  noStroke();
  fill(113, 184, 208);
  for (let i = 0; i < count; i++) {
    const t = (frameCount * 0.018 + i / count) % 1;
    const x = cx + r * 0.58 + t * r * 0.13;
    const y = cy - r * 0.74 + i * r * 0.23;
    circle(x, y, 4);
    registerCircleHover(x, y, 9, "oedema");
  }
}

function drawArrowBetween(x1, y1, x2, y2, colour) {
  const t = (frameCount * 0.018) % 1;
  stroke(colour);
  strokeWeight(1.5);
  line(x1, y1, x2, y2);
  noStroke();
  fill(235, 145, 67);
  circle(lerp(x1, x2, t), lerp(y1, y2, t), 4);
  registerCircleHover(lerp(x1, x2, t), lerp(y1, y2, t), 9, "signal");
}

function drawIgE(x, y, size) {
  stroke(238, 194, 80);
  strokeWeight(2);
  line(x, y, x, y + 10 * size);
  line(x, y, x - 5 * size, y - 6 * size);
  line(x, y, x + 5 * size, y - 6 * size);
  noStroke();
  registerCircleHover(x, y, 12 * size, "ige");
}

function drawMiniIcon(type, x, y, size) {
  push();
  translate(x, y);
  noStroke();

  if (type === "dna") {
    stroke(76, 132, 174);
    strokeWeight(1.5);
    noFill();
    beginShape();
    for (let i = 0; i <= 8; i++) splineVertex(sin(i * 0.8 + frameCount * 0.04) * size * 0.35, -size * 0.5 + i * size * 0.125);
    endShape();
    beginShape();
    for (let i = 0; i <= 8; i++) splineVertex(-sin(i * 0.8 + frameCount * 0.04) * size * 0.35, -size * 0.5 + i * size * 0.125);
    endShape();
    for (let i = 0; i < 5; i++) {
      const yy = -size * 0.4 + i * size * 0.2;
      const xx = sin(i * 0.8 + frameCount * 0.04) * size * 0.35;
      line(xx, yy, -xx, yy);
    }
  } else if (type === "allergen" || type === "trigger") {
    fill(238, 171, 72);
    for (let i = 0; i < 6; i++) {
      const a = i * TWO_PI / 6 + frameCount * 0.012;
      circle(cos(a) * size * 0.28, sin(a) * size * 0.28, size * 0.3);
    }
    fill(250, 216, 137);
    circle(0, 0, size * 0.45);
  } else if (type === "virus" || type === "microbe") {
    fill(type === "virus" ? color(153, 132, 174) : color(105, 171, 126));
    ellipse(0, 0, size * 0.82, size * 0.58);
    stroke(type === "virus" ? color(153, 132, 174) : color(105, 171, 126));
    strokeWeight(1);
    for (let i = 0; i < 6; i++) {
      const a = i * TWO_PI / 6;
      line(cos(a) * size * 0.34, sin(a) * size * 0.22, cos(a) * size * 0.52, sin(a) * size * 0.39);
    }
    noStroke();
    fill(255, 230);
    circle(-size * 0.12, 0, 2);
    circle(size * 0.12, 0, 2);
  } else if (type === "epithelium") {
    fill(221, 147, 141);
    rect(-size * 0.42, -size * 0.34, size * 0.27, size * 0.7, 3);
    rect(-size * 0.12, -size * 0.34, size * 0.27, size * 0.7, 3);
    rect(size * 0.18, -size * 0.34, size * 0.27, size * 0.7, 3);
    fill(111, 81, 99);
    circle(-size * 0.28, 0, 3);
    circle(0, 0, 3);
    circle(size * 0.32, 0, 3);
  } else if (type === "dendritic") {
    stroke(117, 144, 180);
    strokeWeight(2);
    for (let i = 0; i < 6; i++) {
      const a = i * TWO_PI / 6;
      line(0, 0, cos(a) * size * 0.48, sin(a) * size * 0.48);
    }
    noStroke();
    fill(117, 144, 180);
    circle(0, 0, size * 0.5);
  } else if (["th2", "ilc2", "bcell", "mast", "eosinophil", "neutrophil", "th17", "fibroblast", "muscle"].includes(type)) {
    let cellColor = color(91, 164, 193);
    if (type === "ilc2") cellColor = color(111, 177, 157);
    if (type === "bcell") cellColor = color(130, 156, 204);
    if (type === "mast") cellColor = color(184, 133, 184);
    if (type === "eosinophil") cellColor = color(228, 147, 110);
    if (type === "neutrophil") cellColor = color(152, 169, 196);
    if (type === "th17") cellColor = color(224, 171, 96);
    if (type === "fibroblast") cellColor = color(190, 150, 111);
    if (type === "muscle") cellColor = color(190, 91, 105);
    fill(cellColor);
    circle(0, 0, size * 0.9);
    fill(255, 255, 255, 130);
    circle(-size * 0.12, -size * 0.12, size * 0.4);
    fill(69, 88, 119);
    if (type === "eosinophil") {
      ellipse(-size * 0.14, 0, size * 0.18, size * 0.4);
      ellipse(size * 0.14, 0, size * 0.18, size * 0.4);
      fill(184, 91, 63);
      for (let i = 0; i < 5; i++) circle(cos(i * TWO_PI / 5) * size * 0.3, sin(i * TWO_PI / 5) * size * 0.3, 2);
    } else if (type === "neutrophil") {
      ellipse(-size * 0.16, 0, size * 0.16, size * 0.4);
      ellipse(0, -size * 0.06, size * 0.16, size * 0.4);
      ellipse(size * 0.16, size * 0.04, size * 0.16, size * 0.4);
    } else if (type === "mast") {
      for (let i = 0; i < 6; i++) {
        const a = i * TWO_PI / 6 + frameCount * 0.01;
        fill(246, 194, 95);
        circle(cos(a) * size * 0.31, sin(a) * size * 0.31, 2.5);
      }
      ellipse(0, 0, size * 0.24, size * 0.32);
    } else {
      circle(0, 0, size * 0.3);
    }
  } else if (type === "mediator" || type === "inflammasome" || type === "vessel" || type === "mucus") {
    const c = type === "vessel" ? color(178, 77, 91) : type === "mucus" ? color(241, 193, 77) : color(230, 143, 75);
    fill(c);
    if (type === "vessel") ellipse(0, 0, size, size * 0.48);
    else if (type === "mucus") ellipse(0, 0, size, size * 0.7);
    else {
      for (let i = 0; i < 5; i++) circle(cos(i * TWO_PI / 5) * size * 0.22, sin(i * TWO_PI / 5) * size * 0.22, size * 0.3);
      circle(0, 0, size * 0.35);
    }
  } else if (type === "nerve" || type === "ach" || type === "beta2" || type === "m3" || type === "m2") {
    if (type === "nerve") {
      noFill();
      stroke(112, 126, 177);
      strokeWeight(2);
      bezier(-size * 0.5, size * 0.25, -size * 0.12, -size * 0.4, size * 0.1, size * 0.4, size * 0.5, -size * 0.2);
      noStroke();
      fill(232, 153, 77);
      circle(0, 0, 4);
    } else {
      fill(type === "beta2" ? color(64, 156, 136) : type === "m3" ? color(197, 84, 91) : color(232, 153, 77));
      circle(0, 0, size * 0.68);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(size * 0.45);
      text(type === "ach" ? "A" : type === "m3" ? "M₃" : type === "m2" ? "M₂" : "β", 0, 0);
    }
  } else {
    fill(140, 165, 180);
    circle(0, 0, size * 0.75);
  }
  pop();
}

function resolveGlossaryTerm(token) {
  let key = String(token).toLowerCase().replace(/^[^a-z0-9βε]+|[^a-z0-9β]+$/g, "");
  if (glossary[key]) return key;
  if (key.endsWith("s") && glossary[key.slice(0, -1)]) return key.slice(0, -1);
  if (key === "ilc2s") return "ilc2";
  if (key === "th2s") return "th2";
  if (key === "th17s") return "th17";
  return "";
}

function termForSymbol(symbol, label) {
  const key = String(symbol || "").toLowerCase();
  const direct = {
    dna: "dna", microbe: "microbe", virus: "virus", allergen: "allergen",
    trigger: "trigger", epithelium: "epithelium", dendritic: "dendritic",
    th2: "th2", ilc2: "ilc2", bcell: "bcell", mast: "mast",
    eosinophil: "eosinophil", neutrophil: "neutrophil", th17: "th17",
    mediator: "mediator", ach: "ach", m3: "m3", beta2: "β2",
    vessel: "vessel", mucus: "mucus", muscle: "muscle", fibroblast: "fibrosis"
  };
  if (direct[key] && glossary[direct[key]]) return direct[key];
  if (glossary[key]) return key;
  return resolveGlossaryTerm(label) || "immune";
}

function symbolForTerm(term) {
  const key = String(term || "").toLowerCase();
  if (["lumen", "airflow"].includes(key)) return key;
  if (["wall", "submucosa"].includes(key)) return "wall";
  if (["muscle", "bronchoconstriction"].includes(key)) return "muscle";
  if (["m2", "m3", "nerve"].includes(key)) return key;
  if (key === "vagal") return "nerve";
  if (["β2", "β2-receptor"].includes(key)) return "beta2";
  if (["adrenaline"].includes(key)) return "beta2";
  if (["susceptibility", "gene", "dna"].includes(key)) return "dna";
  if (["atopy", "sensitisation", "sensitization", "ige", "fcεri"].includes(key)) return "ige";
  if (["mast-cell"].includes(key)) return "mast";
  if (["oedema", "edema", "vessel", "vessels"].includes(key)) return key === "vessel" || key === "vessels" ? "vessel" : "fluid";
  if (["epithelium", "epithelial", "goblet", "desquamation"].includes(key)) return "epithelium";
  if (key === "mucus") return "mucus";
  if (["dna", "gene"].includes(key)) return "dna";
  if (["allergen", "antigen", "trigger"].includes(key)) return "allergen";
  if (["ige", "fcεri"].includes(key)) return "ige";
  if (["fibrosis", "remodelling", "remodeling"].includes(key)) return "fibrosis";
  if (key === "nets") return "nets";
  if (["alarmin", "alarmins", "cytokine", "signal", "molecules", "mediator", "histamine", "leukotriene", "leukotrienes", "inflammasome", "il-4", "il4", "il-5", "il5", "il-6", "il-13", "il13", "il-17", "il17", "il-25", "il-33", "tslp", "il-1β", "il1β", "il1b", "pge2", "substance-p", "substance", "neurokinin-a", "neurokinin", "cgrp"].includes(key)) return "signal";
  if (["th2", "th1", "ilc2", "bcell", "b", "mast", "eosinophil", "neutrophil", "th17", "dendritic", "microbe", "virus", "nkt"].includes(key)) return key;
  if (key === "ach") return key;
  if (["t2-high", "eosinophilia"].includes(key)) return "eosinophil";
  if (["t2-low", "paucigranulocytic"].includes(key)) return "immune";
  if (["aerd", "nsaid", "gerd", "exercise", "irritant", "infection", "cold", "emotion"].includes(key)) return "allergen";
  if (key === "immune") return "immune";
  return "wall";
}

function registerCircleHover(x, y, visualSize, term, hitRadius) {
  if (!glossary[term]) return;
  hoverTargets.push({ shape: "circle", x, y, radius: max(9, hitRadius || (visualSize > 14 ? visualSize : visualSize * 0.65)), term, symbol: symbolForTerm(term) });
}

function registerEllipseHover(x, y, visualW, visualH, term) {
  if (!glossary[term]) return;
  hoverTargets.push({ shape: "ellipse", x, y, rx: max(9, visualW * 0.65), ry: max(9, visualH * 0.85), term, symbol: symbolForTerm(term) });
}

function registerRingHover(x, y, innerRadius, outerRadius, term) {
  if (!glossary[term]) return;
  hoverTargets.push({ shape: "ring", x, y, innerRadius, outerRadius, term, symbol: symbolForTerm(term) });
}

function findHoverTargets(x, y) {
  const matches = [];
  for (let i = hoverTargets.length - 1; i >= 0; i--) {
    const target = hoverTargets[i];
    let score = Infinity;
    let priority = 0;
    if (target.shape === "ring") {
      const radius = dist(x, y, target.x, target.y);
      if (radius >= target.innerRadius && radius <= target.outerRadius) {
        score = abs(radius - (target.innerRadius + target.outerRadius) / 2) / max(1, (target.outerRadius - target.innerRadius) / 2);
        priority = 1;
      }
    } else if (target.shape === "circle") {
      const ratio = dist(x, y, target.x, target.y) / target.radius;
      if (ratio <= 1) { score = ratio; priority = 3; }
    } else if (target.shape === "ellipse") {
      const ratio = sqrt((x - target.x) ** 2 / target.rx ** 2 + (y - target.y) ** 2 / target.ry ** 2);
      if (ratio <= 1) { score = ratio; priority = 3; }
    } else if (!target.shape && x >= target.x && x <= target.x + target.w && y >= target.y && y <= target.y + target.h) {
      score = dist(x, y, target.x + target.w / 2, target.y + target.h / 2) / max(1, sqrt(target.w ** 2 + target.h ** 2) / 2);
      priority = 4;
    }
    if (score < Infinity) matches.push({ target, score, priority });
  }

  matches.sort((a, b) => b.priority - a.priority || a.score - b.score);
  const selected = [];
  for (const match of matches) {
    if (selected.some(target => target.term === match.target.term)) continue;
    selected.push(match.target);
    if (selected.length === 2) break;
  }
  return selected;
}

function updateHoverSelection(x, y) {
  if (pinnedTarget) return;
  const candidateTargets = findHoverTargets(x, y);
  const key = candidateTargets.map(target => target.term).join("|");
  if (key !== hoverCandidateKey) {
    hoverCandidateKey = key;
    hoverCandidateTargets = candidateTargets;
    hoverCandidateSince = millis();
    if (!hoverSelection.length && candidateTargets.length) hoverSelection = candidateTargets;
  }
  if (millis() - hoverCandidateSince >= 140) hoverSelection = hoverCandidateTargets;
}

function wrapTextLines(content, maxWidth, size) {
  textSize(size);
  const words = String(content).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = [];
  for (const word of words) {
    const candidate = line.concat(word).join(" ");
    if (line.length && textWidth(candidate) > maxWidth) {
      lines.push(line);
      line = [word];
    } else {
      line.push(word);
    }
  }
  if (line.length) lines.push(line);
  return lines;
}

function limitTooltipLines(content, maxWidth, size, maxLines) {
  const lines = wrapTextLines(content, maxWidth, size).map(words => words.join(" "));
  if (lines.length <= maxLines) return lines;

  const visible = lines.slice(0, maxLines);
  const lastWords = visible[maxLines - 1].split(" ");
  while (lastWords.length && textWidth(lastWords.join(" ") + "…") > maxWidth) lastWords.pop();
  visible[maxLines - 1] = (lastWords.length ? lastWords.join(" ") : "") + "…";
  return visible;
}

function drawGlossaryText(content, x, y, boxW, boxH, size, baseColour, alignment) {
  const lines = wrapTextLines(content, boxW, size);
  const lineH = size * 1.28;
  textAlign(LEFT, TOP);
  textSize(size);
  noStroke();

  for (let row = 0; row < lines.length; row++) {
    const lineWords = lines[row];
    const lineString = lineWords.join(" ");
    const totalW = textWidth(lineString);
    if (row * lineH + size > boxH) break;
    let penX = alignment === "center" ? x + (boxW - totalW) / 2 : alignment === "right" ? x + boxW - totalW : x;
    const lineY = y + row * lineH;

    for (const word of lineWords) {
      const term = resolveGlossaryTerm(word);
      const wordW = textWidth(word);
      fill(term ? color(31, 111, 153) : baseColour);
      text(word, penX, lineY);
      if (term) {
        stroke(31, 111, 153, 115);
        strokeWeight(0.7);
        line(penX, lineY + size + 1, penX + wordW, lineY + size + 1);
        noStroke();
        hoverTargets.push({ x: penX - 1, y: lineY - 1, w: wordW + 3, h: lineH, term, symbol: symbolForTerm(term) });
      }
      penX += wordW + size * 0.28;
    }
  }
}

function drawGlossaryTooltip() {
  const targets = pinnedTarget
    ? [pinnedTarget, pinnedSecondTarget].filter(Boolean)
    : hoverSelection;
  if (!targets.length) {
    cursor("arrow");
    return;
  }

  cursor("help");
  const boxW = min(width - 24, width < 500 ? 285 : 350);
  const fontSize = width < 500 ? 8.8 : 9.6;
  const titleSize = width < 500 ? 10 : 11.2;
  const sectionSize = width < 500 ? 6.8 : 7.2;
  const textX = 57;
  const textW = boxW - textX - 10;
  const lineH = fontSize * 1.22;
  const entries = targets.slice(0, 2).map(target => ({ target, info: glossary[target.term] })).filter(entry => entry.info);
  if (!entries.length) return;

  const gap = entries.length > 1 ? 6 : 0;
  const hintH = 13;

  function layoutEntries(maxLines) {
    return entries.map(({ target, info }) => {
      const fields = [
        { title: "PLAIN MEANING", text: info.overview || info.definition },
        ...(info.origin ? [{ title: "SOURCE / ORIGIN", text: info.origin }] : []),
        ...(info.inAsthma ? [{ title: "IN ASTHMA", text: info.inAsthma }] : [])
      ].filter(field => field.text);
      const layoutFields = fields.map(field => ({
        title: field.title,
        lines: limitTooltipLines(field.text, textW, fontSize, maxLines)
      }));
      const rowH = 18 + layoutFields.reduce((sum, field) => sum + 9 + field.lines.length * lineH + 3, 0) + 3;
      return { target, info, fields: layoutFields, height: rowH };
    });
  }

  const canvas = document.querySelector("#sketch canvas");
  const canvasTop = canvas ? canvas.getBoundingClientRect().top : 0;
  const visibleTop = max(10, 10 - canvasTop);
  const visibleBottom = min(height - 10, window.innerHeight - canvasTop - 10);
  const visibleHeight = max(120, visibleBottom - visibleTop);
  let laidOut;
  let boxH;
  for (const maxLines of (pinnedTerm ? [4, 2, 1] : [2, 1])) {
    laidOut = layoutEntries(maxLines);
    boxH = 8 + laidOut.reduce((sum, entry) => sum + entry.height, 0) + gap + hintH + 4;
    if (boxH <= visibleHeight) break;
  }
  boxH = min(boxH, visibleHeight);

  let x = mouseX > width / 2 ? mouseX - boxW - 12 : mouseX + 12;
  let y = mouseY + 16;
  x = constrain(x, 12, width - boxW - 12);
  if (y + boxH > visibleBottom) y = mouseY - boxH - 12;
  y = constrain(y, visibleTop, max(visibleTop, visibleBottom - boxH));

  noStroke();
  fill(21, 37, 54, 248);
  rect(x, y, boxW, boxH, 9);

  let rowY = y + 7;
  for (let i = 0; i < laidOut.length; i++) {
    const { target, info, fields, height: rowH } = laidOut[i];
    fill(255);
    textAlign(LEFT, TOP);
    textSize(titleSize);
    text(info.label, x + textX, rowY, textW, 16);
    let bodyY = rowY + 18;
    textLeading(lineH);

    for (const field of fields) {
      fill(151, 194, 217);
      textSize(sectionSize);
      text(field.title, x + textX, bodyY, textW, 9);
      bodyY += 9;
      fill(236, 243, 247);
      textSize(fontSize);
      text(field.lines.join("\n"), x + textX, bodyY, textW, field.lines.length * lineH + 1);
      bodyY += field.lines.length * lineH + 3;
    }

    drawTooltipSymbol(target.symbol || symbolForTerm(target.term), x + 29, rowY + rowH / 2, width < 500 ? 32 : 40);
    rowY += rowH + gap;
  }
  fill(167, 190, 205);
  textSize(7.5);
  text(pinnedTerm ? "Click elsewhere to close" : "Click to keep reading", x + textX, y + boxH - 11);
}

function drawTooltipSymbol(type, x, y, size) {
  push();
  translate(x, y);
  noStroke();

  if (type === "lumen" || type === "airflow") {
    fill(65, 150, 179);
    circle(0, 0, size * 0.78);
    noFill();
    stroke(229, 247, 250);
    strokeWeight(1.4);
    circle(0, 0, size * 0.78);
    noStroke();
    fill(238, 248, 250);
    for (let i = 0; i < 3; i++) {
      const t = (frameCount * 0.045 + i / 3) % 1;
      circle(-size * 0.25 + t * size * 0.5, sin(t * TWO_PI) * size * 0.09, 2.8);
    }
  } else if (type === "muscle") {
    const pulse = 0.5 + 0.5 * sin(frameCount * 0.07);
    fill(189, 91, 106);
    circle(0, 0, size * 0.9);
    fill(250, 236, 211);
    circle(0, 0, size * (0.63 - pulse * 0.12));
    fill(65, 150, 179);
    circle(0, 0, size * (0.37 - pulse * 0.06));
  } else if (type === "wall") {
    fill(247, 222, 215); circle(0, 0, size * 0.96);
    fill(189, 91, 106); circle(0, 0, size * 0.76);
    fill(250, 236, 211); circle(0, 0, size * 0.54);
    fill(219, 145, 142); circle(0, 0, size * 0.37);
    fill(65, 150, 179); circle(0, 0, size * 0.22);
  } else if (type === "fluid") {
    const drift = sin(frameCount * 0.06) * 2;
    fill(113, 184, 208, 225);
    circle(-size * 0.14, -size * 0.05 + drift, size * 0.3);
    circle(size * 0.17, size * 0.08 - drift, size * 0.22);
    fill(186, 227, 237);
    circle(-size * 0.12, -size * 0.09 + drift, size * 0.09);
  } else if (type === "mucus") {
    fill(244, 195, 83);
    ellipse(0, 0, size * (0.78 + 0.06 * sin(frameCount * 0.06)), size * 0.48);
    fill(255, 226, 149);
    circle(-size * 0.12, -size * 0.08, size * 0.13);
  } else if (type === "vessel") {
    fill(177, 73, 91);
    ellipse(0, 0, size * 0.94, size * 0.52);
    fill(248, 203, 195);
    ellipse(0, 0, size * 0.67, size * 0.28);
    fill(185, 52, 65);
    const t = (frameCount * 0.035) % 1;
    circle(-size * 0.25 + t * size * 0.5, 0, 3.5);
  } else if (type === "signal") {
    for (let i = 0; i < 4; i++) {
      const angle = i * TWO_PI / 4;
      const d = size * (0.12 + 0.22 * ((frameCount * 0.025 + i * 0.25) % 1));
      fill(230, 143, 75);
      circle(cos(angle) * d, sin(angle) * d, 4);
    }
    fill(255, 211, 153);
    circle(0, 0, 4);
  } else if (type === "ige") {
    stroke(238, 194, 80);
    strokeWeight(2);
    line(0, size * 0.22, 0, -size * 0.04);
    line(0, -size * 0.04, -size * 0.18, -size * 0.26);
    line(0, -size * 0.04, size * 0.18, -size * 0.26);
    noStroke();
    fill(238, 171, 72);
    circle(sin(frameCount * 0.06) * size * 0.13, size * 0.3, 4);
  } else if (type === "fibrosis") {
    const breathe = 0.5 + 0.5 * sin(frameCount * 0.04);
    stroke(176, 130, 101);
    strokeWeight(1.5 + breathe);
    for (let i = 0; i < 8; i++) {
      const a = i * TWO_PI / 8;
      line(cos(a) * size * 0.1, sin(a) * size * 0.1, cos(a) * size * 0.44, sin(a) * size * 0.44);
    }
    noStroke();
  } else if (type === "nets") {
    stroke(135, 153, 184);
    strokeWeight(1.2);
    noFill();
    for (let i = -1; i <= 1; i++) {
      const wave = sin(frameCount * 0.05 + i) * 2;
      line(-size * 0.42, i * size * 0.2, size * 0.42, -i * size * 0.2 + wave);
    }
    noStroke();
  } else if (type === "immune") {
    drawMiniIcon("th2", -size * 0.18, 0, size * 0.58);
    drawMiniIcon("neutrophil", size * 0.18, 0, size * 0.58);
  } else {
    drawMiniIcon(type, 0, 0, size * 0.82);
  }

  pop();
}

function drawVisualKey(y, mode) {
  const signalLabel = mode === "t2low" ? "NET strands" : mode === "alarmin" ? "Alarmin signals" : "Signal molecules";
  const signalType = mode === "t2low" ? "nets" : "signal";
  const items = [
    { label: "Lumen / airflow", type: "lumen", colour: color(65, 150, 179) },
    { label: "Epithelium (one layer)", type: "epithelium", colour: color(219, 145, 142) },
    { label: "Smooth muscle", type: "muscle", colour: color(189, 91, 106) },
    { label: "Wall / vessels", type: "wall", colour: color(247, 222, 215) },
    { label: "Mucus", type: "mucus", colour: color(244, 195, 83) },
    { label: "Oedema / fluid", type: "fluid", colour: color(113, 184, 208) },
    { label: signalLabel, type: signalType, colour: color(230, 143, 75) },
    { label: "Immune cells", type: "cell", colour: color(91, 164, 193) }
  ];
  const segment = (width - 40) / 4;
  noStroke();
  fill(53, 74, 91);
  textAlign(LEFT, TOP);
  textSize(7.5);
  text("KEY", 22, y - 11);

  for (let i = 0; i < items.length; i++) {
    const row = floor(i / 4);
    const col = i % 4;
    const x = 20 + col * segment;
    const rowY = y + row * 21;
    fill(items[i].colour);
    if (items[i].type === "mucus") ellipse(x + 4, rowY + 5, 8, 5);
    else if (items[i].type === "epithelium") {
      circle(x + 4, rowY + 5, 8);
      fill(255, 242, 229);
      ellipse(x + 4, rowY + 5, 6, 3.5);
    }
    else if (items[i].type === "nets") {
      stroke(104, 124, 151);
      strokeWeight(1);
      line(x, rowY + 3, x + 8, rowY + 7);
      line(x, rowY + 7, x + 8, rowY + 3);
      noStroke();
    }
    else if (items[i].type === "wall") {
      circle(x + 4, rowY + 5, 8);
      fill(178, 77, 91);
      circle(x + 4, rowY + 5, 3);
    } else if (items[i].type === "cell") drawMiniIcon(mode === "t2low" ? "neutrophil" : "th2", x + 4, rowY + 5, 9);
    else if (items[i].type === "lumen") {
      circle(x + 4, rowY + 5, 8);
      fill(238, 248, 250);
      circle(x + 4, rowY + 5, 2.5);
    } else circle(x + 4, rowY + 5, 7);
    drawGlossaryText(items[i].label, x + 11, rowY, segment - 13, 13, width < 500 ? 6.2 : 7.5, color(73, 91, 105));
  }
}

function drawKeyPoints(y) {
  const h = 144;
  noStroke();
  fill(255);
  rect(14, y, width - 28, h, 14);
  fill(31, 68, 91);
  textAlign(LEFT, TOP);
  textSize(width < 500 ? 11 : 13);
  text("How this connects", 26, y + 10);

  const notes = lessons[lessonIndex].notes;
  textSize(width < 500 ? 9.5 : 11.5);
  for (let i = 0; i < notes.length; i++) {
    const rowY = y + 34 + i * 43;
    fill(27, 116, 160);
    circle(28, rowY + 6, 4);
    fill(54, 72, 88);
    drawGlossaryText(notes[i], 38, rowY, width - 58, 39, width < 500 ? 9.5 : 11.5, color(54, 72, 88));
  }
  fill(100, 116, 129);
  textAlign(RIGHT, BOTTOM);
  textSize(8);
  text((lessonIndex + 1) + " / " + lessons.length, width - 24, y + h - 7);
}

function mouseClicked() {
  if (mouseY >= 70 && mouseY <= 101) {
    pinnedTerm = "";
    pinnedTarget = null;
    pinnedSecondTarget = null;
    hoverSelection = [];
    const margin = width < 500 ? 22 : 28;
    const gap = (width - margin * 2) / (lessons.length - 1);
    const selected = round((mouseX - margin) / gap);
    if (selected >= 0 && selected < lessons.length) lessonIndex = selected;
    describe("Stage " + (lessonIndex + 1) + " of " + lessons.length + ". " + lessons[lessonIndex].title + ". " + lessons[lessonIndex].focus);
    return false;
  }

  const targets = findHoverTargets(mouseX, mouseY);
  pinnedTerm = targets.length ? targets[0].term : "";
  pinnedTarget = targets[0] || null;
  pinnedSecondTarget = targets[1] || null;
  hoverSelection = targets;
  return false;
}

function mouseMoved() {
  updateHoverSelection(mouseX, mouseY);
  return false;
}

function touchMoved() {
  updateHoverSelection(mouseX, mouseY);
  return false;
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) changeStage(1);
  if (keyCode === LEFT_ARROW) changeStage(-1);
}

function windowResized() {
  resizeCanvas(canvasWidth(), canvasHeight());
}
