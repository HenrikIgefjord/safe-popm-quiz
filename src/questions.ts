export const BUILTIN_QUIZ_ID   = 'builtin';
export const BUILTIN_QUIZ_NAME = 'SAFe POPM (Built-in)';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export const questions: Question[] = [
  // ── SAFe Principles & Values ──────────────────────────────────────────────
  {
    id: 1,
    question: "What is the primary purpose of the Lean-Agile Mindset in SAFe?",
    options: [
      "Prescribe a fixed delivery process that all teams must follow without deviation",
      "Apply Lean and Agile principles to deliver value continuously and sustainably across the enterprise",
      "Replace Scrum with a new scaled framework built entirely on Kanban",
      "Reduce headcount by automating project management and reporting tasks",
    ],
    correctIndex: 1,
    explanation:
      "The Lean-Agile Mindset is the combination of beliefs, assumptions, and actions that leaders and practitioners must adopt to move from traditional to Lean-Agile practices. It focuses on delivering value continuously and sustainably by applying Lean and Agile principles at scale — not on prescribing a fixed process.",
    category: "Lean-Agile Mindset",
  },
  {
    id: 2,
    question: "What are the four core values of SAFe?",
    options: [
      "Vision, Roadmap, Backlog, Delivery",
      "Courage, Commitment, Focus, Openness",
      "Alignment, Built-in Quality, Transparency, Program Execution",
      "Innovation, Collaboration, Cadence, Synchronization",
    ],
    correctIndex: 2,
    explanation:
      "SAFe's four core values are Alignment, Built-in Quality, Transparency, and Program Execution. These values guide the behaviors and decisions of teams and leaders throughout the enterprise. The other options mix in Scrum values or general Agile terms that are not SAFe's four core values.",
    category: "SAFe Principles",
  },
  {
    id: 3,
    question: "Which SAFe principle is 'Apply systems thinking'?",
    options: [
      "Principle #1 — Take an economic view",
      "Principle #2 — Apply systems thinking",
      "Principle #4 — Build incrementally with fast, integrated learning cycles",
      "Principle #7 — Apply cadence, synchronize with cross-domain planning",
    ],
    correctIndex: 1,
    explanation:
      "SAFe Principle #2 is 'Apply systems thinking.' It encourages understanding the enterprise as a whole system — people, processes, and technology — rather than locally optimizing individual components. Improving a subsystem in isolation can degrade overall system performance.",
    category: "SAFe Principles",
  },
  {
    id: 4,
    question: "Which formula correctly calculates WSJF (Weighted Shortest Job First)?",
    options: [
      "Business Value multiplied by Job Duration",
      "User Value plus Time Criticality plus Risk Reduction",
      "Cost of Delay divided by Job Size (Duration)",
      "Risk Reduction multiplied by Opportunity Enablement",
    ],
    correctIndex: 2,
    explanation:
      "WSJF = Cost of Delay ÷ Job Size (or Job Duration). Cost of Delay includes user/business value, time criticality, and risk reduction/opportunity enablement. Dividing by job size prioritizes smaller, high-value items first to maximize economic throughput.",
    category: "Prioritization",
  },
  {
    id: 5,
    question: "What is the primary goal of the SAFe principle 'Decentralize decision-making'?",
    options: [
      "Ensure that portfolio leadership approves all decisions before teams act",
      "Empower teams to make routine decisions quickly while escalating strategic ones to leadership",
      "Give every team member an equal vote on all architectural choices",
      "Delegate all infrastructure and tooling decisions to external vendors",
    ],
    correctIndex: 1,
    explanation:
      "Decentralizing decision-making empowers the people closest to the work to make routine, time-sensitive decisions quickly — reducing delays and increasing flow. Strategic, long-horizon, or cross-cutting decisions are still escalated to leadership. This is about optimizing decision latency, not eliminating leadership.",
    category: "SAFe Principles",
  },

  // ── Product Owner Role ─────────────────────────────────────────────────────
  {
    id: 6,
    question: "What is the primary responsibility of the Product Owner (PO) in SAFe?",
    options: [
      "Facilitating PI Planning ceremonies on behalf of the Agile Release Train",
      "Writing and maintaining acceptance test scripts for the CI/CD pipeline",
      "Managing and prioritizing the Team Backlog to maximize the team's delivery of value",
      "Owning the ART Vision and Program Backlog across all teams",
    ],
    correctIndex: 2,
    explanation:
      "The Product Owner is responsible for managing and prioritizing the Team Backlog. They define user stories, accept completed work, and ensure the team focuses on the highest-value items aligned to PI objectives. PI Planning facilitation belongs to the RTE; ART Vision and Program Backlog belong to the Product Manager.",
    category: "Product Owner",
  },
  {
    id: 7,
    question: "A critical new story is requested mid-Sprint. What should the Product Owner do?",
    options: [
      "Add it immediately — critical items always override Sprint commitments",
      "Negotiate with the team, assess impact on existing commitments, and defer to the next Sprint if possible",
      "Ask the Scrum Master to formally extend the Sprint to fit the new story",
      "Escalate to the Release Train Engineer who has authority to modify Sprint scope",
    ],
    correctIndex: 1,
    explanation:
      "The Sprint backlog is owned by the team once Sprint planning is complete. Mid-Sprint scope additions disrupt flow. The PO should discuss urgency with the team, assess impact, and typically defer to the next Sprint unless truly critical and the team agrees. Unilaterally adding scope undermines predictability.",
    category: "Product Owner",
  },
  {
    id: 8,
    question: "Who has the authority to accept completed user stories in a SAFe Agile team?",
    options: [
      "Scrum Master — as the team's servant leader and quality gatekeeper",
      "Release Train Engineer — on behalf of the ART stakeholders",
      "Product Owner — based on defined acceptance criteria and Definition of Done",
      "System Architect — to ensure technical standards are met",
    ],
    correctIndex: 2,
    explanation:
      "The Product Owner has the authority and responsibility to accept or reject completed user stories based on the defined acceptance criteria and the Definition of Done. This ensures the story delivers the intended value before it is considered complete.",
    category: "Product Owner",
  },
  {
    id: 9,
    question: "How do the Product Owner and Product Manager roles differ in SAFe?",
    options: [
      "They are identical roles — the titles are used interchangeably at different companies",
      "The PO manages team-level work; the PM manages program-level vision, roadmap, and the Program Backlog",
      "The PM reports to the PO and translates business strategy into technical features",
      "The PO works with external customers; the PM works only with internal stakeholders",
    ],
    correctIndex: 1,
    explanation:
      "In SAFe, the Product Manager operates at the program level — owning the Program Vision, Roadmap, and Program Backlog (Features). The Product Owner operates at the team level, refining and prioritizing the Team Backlog derived from those program-level priorities. They are distinct roles at different levels of the framework.",
    category: "Product Owner",
  },
  {
    id: 10,
    question: "Which backlog artifact does the Product Owner primarily own and manage?",
    options: [
      "Program Backlog — containing features for the ART",
      "Portfolio Backlog — containing epics awaiting Lean Business Case approval",
      "Team Backlog — containing user stories, defects, and enablers for the Agile team",
      "Solution Backlog — containing capabilities for the Solution Train",
    ],
    correctIndex: 2,
    explanation:
      "The Product Owner primarily manages the Team Backlog, which contains user stories, defects, spikes, and enabler stories for the Agile team. It is derived from features in the Program Backlog and prioritized based on PI objectives. The Program Backlog is owned by the Product Manager.",
    category: "Product Owner",
  },

  // ── Product Manager Role ───────────────────────────────────────────────────
  {
    id: 11,
    question: "What is the primary responsibility of the Product Manager in SAFe?",
    options: [
      "Facilitating daily stand-ups and retrospectives for each Agile team on the ART",
      "Defining and managing the Program Backlog, owning the ART Vision, and representing customer needs",
      "Maintaining the Team Backlog and writing acceptance criteria for all user stories",
      "Approving code merges and managing the Continuous Integration pipeline",
    ],
    correctIndex: 1,
    explanation:
      "The Product Manager owns the Program Vision and the Program Backlog (Features). They work with customers, stakeholders, and Business Owners to understand market needs, define features, and guide the ART in delivering value. Team-level backlog ownership belongs to the Product Owner.",
    category: "Product Manager",
  },
  {
    id: 12,
    question: "What is the Product Manager's primary contribution during PI Planning?",
    options: [
      "Assigning user stories to specific team members based on capacity",
      "Presenting the Program Vision and the prioritized Program Backlog for the upcoming PI",
      "Facilitating team breakout sessions and resolving cross-team scheduling conflicts",
      "Writing Sprint goals for each Agile team on the ART",
    ],
    correctIndex: 1,
    explanation:
      "During PI Planning, the Product Manager presents the Program Vision and the prioritized list of features from the Program Backlog. This context enables teams to plan their iterations and commit to meaningful PI Objectives. Story assignment and Sprint goal writing are team-level activities.",
    category: "Product Manager",
  },
  {
    id: 13,
    question: "Which artifact does the Product Manager use to communicate multi-PI delivery plans?",
    options: [
      "Sprint Backlog — showing the work committed for the current iteration",
      "PI Objectives — summarizing each team's goals for the current PI",
      "Program Roadmap — showing planned features and milestones across upcoming PIs",
      "Value Stream Map — identifying waste and bottlenecks in the delivery process",
    ],
    correctIndex: 2,
    explanation:
      "The Program Roadmap provides a multi-PI view of upcoming features and milestones. It communicates to customers, stakeholders, and portfolio leadership what the ART plans to deliver over time while remaining adaptable to change. PI Objectives reflect a single PI; the Roadmap spans multiple PIs.",
    category: "Product Manager",
  },
  {
    id: 14,
    question: "What is the purpose of the Vision artifact in SAFe?",
    options: [
      "To list all known defects and accumulated technical debt for leadership review",
      "To describe the future state of the solution and align teams and stakeholders around a shared direction",
      "To document the Definition of Done criteria for all features and stories",
      "To track team velocity trends across multiple Program Increments",
    ],
    correctIndex: 1,
    explanation:
      "The Vision describes the future state of the solution or product, providing a north star for the ART. It aligns teams and stakeholders around a shared purpose and motivates work by connecting daily activities to strategic goals. It is not a defect list, metrics tool, or Definition of Done.",
    category: "Product Manager",
  },

  // ── PI Planning ────────────────────────────────────────────────────────────
  {
    id: 15,
    question: "What is the typical cadence of PI Planning in SAFe?",
    options: [
      "Once per Sprint — at the start of each two-week iteration",
      "Every 8–12 weeks, at the start of each Program Increment (typically 4–5 Sprints)",
      "Every six months, aligned to the annual corporate planning calendar",
      "Once per year, during the organization's strategic planning cycle",
    ],
    correctIndex: 1,
    explanation:
      "A Program Increment typically spans 8–12 weeks, containing 4–5 development Sprints plus 1 Innovation & Planning (IP) Sprint. PI Planning occurs at the start of each PI to align all ART teams on goals, dependencies, and risks for the coming increment.",
    category: "PI Planning",
  },
  {
    id: 16,
    question: "What are PI Objectives in SAFe?",
    options: [
      "A prioritized list of all user stories planned for delivery during the PI",
      "Business and technical goals the ART commits to achieving in the upcoming PI",
      "Detailed acceptance test cases written before coding begins in each Sprint",
      "Performance benchmarks used to evaluate individual team member contributions",
    ],
    correctIndex: 1,
    explanation:
      "PI Objectives are a summary of the business and technical goals each team and the ART aims to achieve in the upcoming PI. They create alignment, enable cross-team coordination, and provide a basis for measuring execution at the end-of-PI System Demo and I&A.",
    category: "PI Planning",
  },
  {
    id: 17,
    question: "What is the Innovation and Planning (IP) Sprint used for in SAFe?",
    options: [
      "To add stories that were missed during PI Planning before the next PI begins",
      "To provide a cadence buffer for PI Planning, innovation time, and addressing technical debt",
      "To run full regression testing and harden the release before shipping to production",
      "To allow the Product Manager to rewrite and reprioritize the Program Backlog",
    ],
    correctIndex: 1,
    explanation:
      "The IP Sprint is a special Sprint at the end of each PI. It acts as a buffer for meeting PI commitments, hosts PI Planning for the next PI, provides time for innovation (hackathons), education, and addressing technical debt — supporting sustainable pace.",
    category: "PI Planning",
  },
  {
    id: 18,
    question: "How are risks and impediments categorized during PI Planning in SAFe?",
    options: [
      "Critical, Major, Minor — based on severity and business impact",
      "ROAM: Resolved, Owned, Accepted, Mitigated",
      "In-Sprint, Cross-Team, External — based on where they originated",
      "Red, Amber, Green — using a traffic-light RAG status model",
    ],
    correctIndex: 1,
    explanation:
      "Risks identified during PI Planning are ROAMed: Resolved (eliminated), Owned (assigned to a named person), Accepted (acknowledged and lived with), or Mitigated (action taken to reduce impact or probability). ROAM is SAFe's standard risk classification approach.",
    category: "PI Planning",
  },
  {
    id: 19,
    question: "What is the Program Board used for during PI Planning?",
    options: [
      "Recording individual team velocity and capacity for the upcoming PI",
      "Documenting acceptance criteria and Definition of Done for each feature",
      "Visualizing feature delivery timelines, cross-team dependencies, and milestones across the PI",
      "Assigning specific user stories to individual team members",
    ],
    correctIndex: 2,
    explanation:
      "The Program Board is a visual tool used during PI Planning to display which features each team plans to deliver, when, and any cross-team dependencies. It enables transparency of the overall ART plan and helps teams identify and negotiate dependency conflicts before the PI begins.",
    category: "PI Planning",
  },

  // ── Backlog Management ─────────────────────────────────────────────────────
  {
    id: 20,
    question: "How is a Feature defined in SAFe?",
    options: [
      "A technical task owned by a developer, sized to fit within one Sprint",
      "A service or capability that fulfills a stakeholder need and is sized for delivery within a single PI",
      "A high-level strategic objective managed at the Portfolio level",
      "A defect fix spanning multiple teams that requires cross-ART coordination",
    ],
    correctIndex: 1,
    explanation:
      "A Feature is a service or capability that fulfills a stakeholder need. Features are written from a customer/user perspective and sized so that one or more teams can deliver them within a single Program Increment. They appear in the Program Backlog, not the Team Backlog.",
    category: "Backlog Management",
  },
  {
    id: 21,
    question: "What distinguishes an Enabler story from a User story in SAFe?",
    options: [
      "Enabler stories are always higher priority than user stories in the backlog",
      "Enabler stories have no acceptance criteria and cannot be estimated by the team",
      "Enabler stories support architectural, infrastructure, or technical work that creates capacity for future user-facing capabilities",
      "Enabler stories are only created during PI Planning and expire if not started in that PI",
    ],
    correctIndex: 2,
    explanation:
      "Enablers extend the Architectural Runway to support future development. They include exploration (spikes), architecture, infrastructure, and compliance work. Unlike user stories, they may not deliver direct user value immediately — but they create the foundation for features and user stories that will.",
    category: "Backlog Management",
  },
  {
    id: 22,
    question: "What is the correct SAFe backlog hierarchy from largest to smallest work item?",
    options: [
      "Epic → Feature → Story",
      "Theme → Epic → Feature → Story",
      "Vision → Capability → Feature → Story",
      "Portfolio Initiative → Program Feature → Team Task",
    ],
    correctIndex: 0,
    explanation:
      "The SAFe backlog hierarchy flows: Epics (Portfolio level) → Features (Program level) → User Stories (Team level). Epics are the largest work items, potentially spanning multiple PIs; features are delivered within a PI; stories are completed within a single Sprint.",
    category: "Backlog Management",
  },
  {
    id: 23,
    question: "What does the Program Kanban system visualize in SAFe?",
    options: [
      "Individual developer task completion across each Sprint",
      "The flow of Features from definition through analysis, implementation, and acceptance at the ART level",
      "Sprint velocity trends for each team over the last several PIs",
      "Portfolio Epic approval status and remaining budget for each value stream",
    ],
    correctIndex: 1,
    explanation:
      "The Program Kanban system visualizes the flow of Features through states such as Funnel, Analyzing, Backlog, Implementing, Validating, and Done. It provides visibility into WIP, helps identify bottlenecks, and improves the predictability of feature delivery across the ART.",
    category: "Backlog Management",
  },
  {
    id: 24,
    question: "What does the Definition of Ready (DoR) describe for a user story?",
    options: [
      "The conditions that must be met before a story is accepted as complete by the Product Owner",
      "The criteria a story must satisfy before it can be pulled into Sprint planning",
      "The minimum test coverage required before code can be merged to the main branch",
      "The approval process a feature must pass before it reaches the Program Backlog",
    ],
    correctIndex: 1,
    explanation:
      "The Definition of Ready defines criteria a story must meet before it can be pulled into Sprint planning — typically: clear title, user story format, testable acceptance criteria, dependencies identified, and sized to complete within one Sprint. The Definition of Done covers acceptance/completion, which is a different concept.",
    category: "Backlog Management",
  },
  {
    id: 25,
    question: "Which format is recommended for writing user stories in SAFe?",
    options: [
      "\"The system shall [action] in order to [measurable outcome]\"",
      "\"As a [user role], I want [goal/action] so that [benefit/value]\"",
      "\"Given [context], When [action], Then [outcome]\"",
      "\"Task: [description] | Owner: [name] | Priority: [1-5]\"",
    ],
    correctIndex: 1,
    explanation:
      "User stories follow the format: 'As a [user role], I want [goal] so that [benefit].' This keeps focus on who wants the capability, what they want to do, and why — ensuring stories deliver user value rather than describing technical tasks. Given/When/Then is the format for acceptance criteria (BDD), not story descriptions.",
    category: "Backlog Management",
  },

  // ── ART & Team Ceremonies ──────────────────────────────────────────────────
  {
    id: 26,
    question: "What is an Agile Release Train (ART) in SAFe?",
    options: [
      "An automated CI/CD pipeline that trains models and deploys software to production",
      "A long-lived team of Agile teams (50–125 people) that plans, commits, and executes on a common cadence",
      "A release management committee that approves production deployments",
      "A Kanban system used to manage the flow of features through the delivery pipeline",
    ],
    correctIndex: 1,
    explanation:
      "The ART is a long-lived, self-organizing team of Agile teams — typically 50–125 people — that works together to define, build, and deploy solutions within a Value Stream. All ART teams operate on the same iteration cadence and plan together during PI Planning.",
    category: "ART",
  },
  {
    id: 27,
    question: "Which event demonstrates the integrated, working system built by all ART teams at the end of every Sprint?",
    options: [
      "Sprint Review — held by each individual team to show completed stories",
      "System Demo — showing the cumulative integrated work of the entire ART",
      "Inspect & Adapt — the PI-end retrospective and problem-solving workshop",
      "PI Planning — where all teams align on goals for the upcoming increment",
    ],
    correctIndex: 1,
    explanation:
      "The System Demo is held at the end of every Sprint. It demonstrates the integrated, working system developed by all the teams on the ART — not individual team work in isolation. It provides stakeholders a view of cumulative value built during the PI and drives feedback.",
    category: "ART",
  },
  {
    id: 28,
    question: "What is the purpose of the Inspect & Adapt (I&A) event in SAFe?",
    options: [
      "To plan the next PI's features and assign stories to individual teams",
      "To demonstrate the final PI System increment to customers and Business Owners only",
      "To reflect on the PI, identify improvement opportunities, and create improvement stories",
      "To review individual team velocity and adjust capacity allocations for the next PI",
    ],
    correctIndex: 2,
    explanation:
      "Inspect & Adapt (I&A) is held at the end of each PI. It includes a PI System Demo, quantitative and qualitative measurement review, and a structured problem-solving workshop. The output is improvement stories added to the next PI's backlog — driving continuous, measurable improvement.",
    category: "ART",
  },
  {
    id: 29,
    question: "What is the Release Train Engineer's (RTE) primary role in SAFe?",
    options: [
      "Owning the Program Backlog and defining features on behalf of the Product Manager",
      "Serving as the chief Scrum Master for the ART — facilitating events, removing impediments, and coaching teams",
      "Acting as the primary liaison between portfolio leadership and development teams",
      "Reviewing and approving all code changes before they merge to the main branch",
    ],
    correctIndex: 1,
    explanation:
      "The RTE is the servant leader for the ART. They facilitate PI Planning, Scrum of Scrums, System Demos, and I&A. They coach teams and Scrum Masters, manage risks and dependencies, and drive continuous improvement of the ART's practices and flow.",
    category: "ART",
  },
  {
    id: 30,
    question: "What is the Scrum of Scrums (SoS) in SAFe?",
    options: [
      "A large-scale planning event that replaces PI Planning for distributed ARTs",
      "A regular ART-level sync where team representatives surface and resolve cross-team dependencies and impediments",
      "A daily stand-up format used when more than one Scrum Master attends a Sprint ceremony",
      "A ceremony where ART teams accept features and demonstrate integrated value to stakeholders",
    ],
    correctIndex: 1,
    explanation:
      "Scrum of Scrums is a regular ART-level sync where representatives (typically Scrum Masters) from each team meet to coordinate, surface cross-team impediments, and manage dependencies. It helps maintain flow across the ART within a Sprint — separate from PI Planning.",
    category: "ART",
  },

  // ── Continuous Delivery & DevOps ───────────────────────────────────────────
  {
    id: 31,
    question: "What are the four aspects of SAFe's Continuous Delivery Pipeline?",
    options: [
      "Design, Build, Test, Deploy",
      "Plan, Code, Review, Release",
      "Continuous Exploration, Continuous Integration, Continuous Deployment, Release on Demand",
      "Feature Definition, Sprint Planning, System Demo, PI Review",
    ],
    correctIndex: 2,
    explanation:
      "SAFe's Continuous Delivery Pipeline consists of: Continuous Exploration (understanding customer needs), Continuous Integration (frequently integrating code), Continuous Deployment (deploying to production-like environments), and Release on Demand (releasing to customers when the business is ready).",
    category: "DevOps & CD",
  },
  {
    id: 32,
    question: "What does 'Release on Demand' mean in SAFe?",
    options: [
      "Teams automatically release to production at the end of every Sprint without manual approval",
      "Features are only released after 100% of planned stories in the PI are completed",
      "The business can deploy and release functionality to customers at any time, independent of development cadence",
      "Release decisions are made exclusively during PI Planning and cannot be changed mid-PI",
    ],
    correctIndex: 2,
    explanation:
      "Release on Demand means the business can release features to customers whenever it makes strategic sense — independent of development cycles. This is enabled by a mature Continuous Delivery Pipeline that keeps the system always releasable, giving the business flexibility to time releases for maximum market impact.",
    category: "DevOps & CD",
  },
  {
    id: 33,
    question: "Which SAFe practice is reflected in the Lean mantra 'Stop starting, start finishing'?",
    options: [
      "Built-in Quality — ensuring every increment meets quality standards before moving on",
      "Continuous Integration — integrating code frequently to detect defects early",
      "Limiting Work in Progress (WIP) — completing items before pulling in new work",
      "Architectural Runway — preparing infrastructure before features are needed",
    ],
    correctIndex: 2,
    explanation:
      "'Stop starting, start finishing' encourages teams to limit WIP. Taking on too many tasks simultaneously increases context switching, delays completion, and reduces throughput. By limiting WIP, teams finish valuable work faster — a core Lean/Kanban principle applied throughout SAFe.",
    category: "DevOps & CD",
  },

  // ── Built-in Quality ───────────────────────────────────────────────────────
  {
    id: 34,
    question: "What are the five dimensions of Built-in Quality in SAFe?",
    options: [
      "Unit Test, Integration Test, System Test, UAT, Production Monitoring",
      "Code, Design, Architecture, Performance, Security",
      "Flow, Architecture & Design Quality, Code Quality, System Quality, Release Quality",
      "Sprint Review, System Demo, I&A, PI Objectives, Definition of Done",
    ],
    correctIndex: 2,
    explanation:
      "SAFe's five dimensions of Built-in Quality are: Flow (smooth delivery), Architecture & Design Quality (sound system design), Code Quality (clean, tested code), System Quality (integrated solution quality), and Release Quality (fitness for production release). Together they ensure quality is built in — not inspected in at the end.",
    category: "Built-in Quality",
  },
  {
    id: 35,
    question: "What is the Architectural Runway in SAFe?",
    options: [
      "A documented record of all past architectural decisions and their outcomes",
      "The existing code, components, and infrastructure sufficient to implement near-term features without re-architecture delays",
      "A mandatory design review process all features must pass before development begins",
      "A Kanban board tracking the status of all active architectural spikes",
    ],
    correctIndex: 1,
    explanation:
      "The Architectural Runway is the existing set of code, components, and technical infrastructure sufficient to implement near-term features without significant re-architecture. Maintaining adequate runway prevents technical debt from slowing feature delivery and is a shared responsibility of architects, PMs, and teams.",
    category: "Built-in Quality",
  },
  {
    id: 36,
    question: "What is Test-Driven Development (TDD) and why does SAFe promote it?",
    options: [
      "Writing all tests after code is complete to verify that functionality works as expected",
      "A QA process where testers write regression suites before the Product Owner accepts stories",
      "Writing automated tests before writing production code to drive clean design and ensure correctness",
      "A manual exploratory testing technique used alongside automated regression suites",
    ],
    correctIndex: 2,
    explanation:
      "TDD requires writing a failing automated test before writing the code to make it pass. This drives clean, testable design, provides instant regression coverage, and gives developers confidence to refactor. SAFe promotes TDD as a key Built-in Quality practice that shifts quality left.",
    category: "Built-in Quality",
  },

  // ── Metrics & Flow ─────────────────────────────────────────────────────────
  {
    id: 37,
    question: "Which SAFe metric measures ART predictability by comparing actual vs. planned business value?",
    options: [
      "Team Velocity — story points completed per Sprint by each individual team",
      "Program Predictability Measure — actual vs. planned PI Objective business value",
      "Net Promoter Score — customer satisfaction with the delivered increment",
      "Flow Efficiency — percentage of time work is actively being worked vs. waiting",
    ],
    correctIndex: 1,
    explanation:
      "The Program Predictability Measure compares the actual business value delivered against the planned (committed) PI Objectives. A healthy ART typically achieves 80–100% of its planned business value. It is calculated and reviewed during the I&A event at the end of each PI.",
    category: "Metrics",
  },
  {
    id: 38,
    question: "What are SAFe's four Flow Metrics?",
    options: [
      "Velocity, Capacity, Throughput, Reliability",
      "WIP Limit, Cycle Time, Lead Time, Defect Escape Rate",
      "Flow Velocity, Flow Time, Flow Load, Flow Efficiency",
      "Release Rate, Story Point Burndown, Bug Count, Test Coverage",
    ],
    correctIndex: 2,
    explanation:
      "SAFe's four Flow Metrics are: Flow Velocity (value delivered per time unit), Flow Time (start to delivery time), Flow Load (amount of WIP in the system), and Flow Efficiency (percentage of active vs. waiting time). They provide a system-level view of throughput and help identify bottlenecks across the ART.",
    category: "Metrics",
  },

  // ── Portfolio & Value Streams ──────────────────────────────────────────────
  {
    id: 39,
    question: "What is a Value Stream in SAFe?",
    options: [
      "A financial model for estimating and tracking ROI on Portfolio Epics",
      "The series of steps an organization uses to build solutions and deliver continuous value to customers",
      "A team-level Kanban board showing current work in progress",
      "A document listing all internal and external stakeholders for a product",
    ],
    correctIndex: 1,
    explanation:
      "A Value Stream is the sequence of activities required to deliver value — from customer need to customer outcome. Organizing work around Value Streams reduces handoffs, improves flow, and ensures the entire system is optimized for customer value rather than functional silos.",
    category: "Portfolio",
  },
  {
    id: 40,
    question: "What is a Portfolio Epic in SAFe?",
    options: [
      "A user story that is too large to complete in a single Sprint",
      "A large cross-cutting initiative spanning multiple ARTs or Value Streams that requires a Lean Business Case",
      "A set of features grouped together on the Program Roadmap by a common theme",
      "A high-level release milestone tracked on the portfolio calendar",
    ],
    correctIndex: 1,
    explanation:
      "Portfolio Epics are large, significant investments that cut across Value Streams or ARTs. They require a Lean Business Case for approval, go through the Portfolio Kanban, and are decomposed into Features once approved. This lightweight governance ensures significant investments are evaluated for strategic fit and ROI.",
    category: "Portfolio",
  },
  {
    id: 41,
    question: "What is the purpose of a Lean Business Case for a Portfolio Epic?",
    options: [
      "To enumerate every user story that will be built as part of the Epic",
      "To provide sufficient context — outcome hypothesis, options, and cost/benefit — to make an informed investment decision",
      "To replace PI Planning for large cross-ART initiatives requiring special funding",
      "To document the full technical architecture before development begins",
    ],
    correctIndex: 1,
    explanation:
      "The Lean Business Case is a lightweight decision-making tool. It articulates the epic's hypothesis (expected outcome), business drivers, estimated cost/benefit, and the minimum viable information to fund and proceed. It avoids over-planning while ensuring strategic alignment before significant investment.",
    category: "Portfolio",
  },

  // ── Customer Centricity ────────────────────────────────────────────────────
  {
    id: 42,
    question: "How is a Customer Journey Map used in SAFe product development?",
    options: [
      "As a Gantt chart showing customer-facing milestone dates and release commitments",
      "As a visual that maps the customer's experience, emotions, and pain points to inform feature opportunities",
      "As a RACI matrix identifying which stakeholders own each customer-facing deliverable",
      "As a compliance checklist for data privacy and accessibility requirements",
    ],
    correctIndex: 1,
    explanation:
      "A Customer Journey Map visualizes the steps a customer takes when interacting with a product — including emotions, pain points, and moments of delight. Product Managers and POs use it to identify feature opportunities that genuinely improve the customer experience, grounded in real user behavior.",
    category: "Customer Centricity",
  },
  {
    id: 43,
    question: "What is a Design Thinking persona and why is it used?",
    options: [
      "A fictional employee profile created by HR for onboarding and role clarity",
      "A research-based archetype of a target user that helps teams empathize and make better product decisions",
      "A role definition template used to staff Agile teams with the right mix of skills",
      "A standardized format for writing acceptance criteria tied to specific user types",
    ],
    correctIndex: 1,
    explanation:
      "Personas are research-based composites of real users. They give teams a concrete, empathetic picture of who they are building for — their goals, frustrations, and behaviors. Using personas prevents teams from building for imaginary users and grounds product decisions in real human needs.",
    category: "Customer Centricity",
  },
  {
    id: 44,
    question: "In Design Thinking, what is the goal of the 'Empathize' phase?",
    options: [
      "To rapidly prototype multiple solution options and select the best one",
      "To deeply understand users' worlds, needs, challenges, and motivations through research and observation",
      "To define measurable success metrics and OKRs for the product",
      "To prioritize features based on business value and market opportunity",
    ],
    correctIndex: 1,
    explanation:
      "The Empathize phase is the foundation of Design Thinking. Teams observe and engage with real users to build genuine understanding of their lived experiences. This prevents assumptions from driving product decisions and ensures solutions address real — not imagined — problems.",
    category: "Customer Centricity",
  },

  // ── Story Writing & Acceptance ─────────────────────────────────────────────
  {
    id: 45,
    question: "What format do BDD (Behavior-Driven Development) acceptance criteria follow?",
    options: [
      "A production monitoring format: Alert [condition], Threshold [value], Response [action]",
      "A scenario format: Given [context], When [action], Then [outcome]",
      "A performance format: Load [users], Duration [time], Expect [response time]",
      "A code review format: Change [description], Risk [level], Approve [role]",
    ],
    correctIndex: 1,
    explanation:
      "BDD acceptance criteria follow the Given-When-Then scenario format. This ensures shared understanding between POs, developers, and testers before coding begins and produces living documentation that drives automated tests. It is distinct from the user story format (As a / I want / So that).",
    category: "Story Writing",
  },
  {
    id: 46,
    question: "What does the INVEST acronym stand for when evaluating user story quality?",
    options: [
      "Iterative, Necessary, Validated, Explicit, Stable, Traceable",
      "Integrated, Novel, Verified, Executable, Scalable, Transparent",
      "Independent, Negotiable, Valuable, Estimable, Small, Testable",
      "Important, Needed, Visible, Enforceable, Safe, Timely",
    ],
    correctIndex: 2,
    explanation:
      "INVEST is a checklist for good user stories: Independent (can be developed in any order), Negotiable (scope is flexible), Valuable (delivers user or business value), Estimable (team can size it), Small (fits in a Sprint), Testable (clear acceptance criteria). Stories failing INVEST should be refined before entering a Sprint.",
    category: "Story Writing",
  },
  {
    id: 47,
    question: "What is a Story Map and how does it support backlog management?",
    options: [
      "A geographic map showing which customer regions each feature will be deployed to",
      "A two-dimensional visualization organizing user activities horizontally and story detail vertically to enable prioritized release slicing",
      "A burndown chart tracking story completion rate across a Program Increment",
      "A dependency map linking stories across teams to surface cross-ART coordination needs",
    ],
    correctIndex: 1,
    explanation:
      "A Story Map organizes stories across two axes: the horizontal axis shows the user journey (activities in sequence), the vertical axis shows increasing detail. This makes it easy to see the big picture, identify gaps, and slice the backlog into prioritized releases that each deliver end-to-end value.",
    category: "Story Writing",
  },

  // ── Agile Teams ───────────────────────────────────────────────────────────
  {
    id: 48,
    question: "What is the recommended size for an Agile team in SAFe?",
    options: [
      "2–4 people — small enough for fast decision-making with zero overhead",
      "5–11 people — large enough for skill diversity, small enough for close collaboration",
      "12–20 people — standard enterprise team size for full-stack delivery",
      "20–30 people — sized to cover all roles needed for an end-to-end feature team",
    ],
    correctIndex: 1,
    explanation:
      "SAFe recommends Agile teams of 5–11 people (including the PO and Scrum Master). Teams smaller than 5 lack skill diversity; teams larger than 11 create too much communication overhead. This size enables the close collaboration needed for high-performing, self-organizing teams.",
    category: "Agile Teams",
  },
  {
    id: 49,
    question: "What is the Scrum Master's role in a SAFe Agile team?",
    options: [
      "Assigning tasks to team members and tracking individual progress against commitments",
      "Serving as a servant leader — facilitating ceremonies, coaching on Agile practices, and removing impediments",
      "Owning the Team Backlog and making final prioritization decisions for the Sprint",
      "Approving code merges and ensuring the CI/CD pipeline remains green",
    ],
    correctIndex: 1,
    explanation:
      "The Scrum Master is a servant leader who helps the team self-organize and continuously improve. They facilitate Sprint ceremonies, remove impediments, shield the team from distractions, and coach toward higher Agile maturity. Task assignment and backlog ownership belong to the team and Product Owner respectively.",
    category: "Agile Teams",
  },
  {
    id: 50,
    question: "What is a 'Spike' in SAFe?",
    options: [
      "An unexpected surge in team velocity caused by removing a major impediment",
      "A time-boxed research or investigation activity to reduce uncertainty so a story can be estimated or implemented",
      "An unplanned production defect that must be fixed within the current Sprint",
      "A high-risk feature that requires an architectural review before development begins",
    ],
    correctIndex: 1,
    explanation:
      "A Spike is a time-boxed exploration activity used when a team needs to research, prototype, or investigate before they can estimate or implement a story confidently. Spikes produce knowledge (not shippable software) and are treated as backlog items with their own acceptance criteria.",
    category: "Agile Teams",
  },

  // ── SAFe Roles & Leadership ────────────────────────────────────────────────
  {
    id: 51,
    question: "What is a Business Owner in SAFe?",
    options: [
      "The CEO or executive sponsor who has ultimate authority over the entire product portfolio",
      "A key stakeholder with significant business or compliance responsibility who participates in PI Planning and validates value delivery",
      "A role synonymous with Product Manager — both terms describe the same position",
      "A portfolio-level role responsible for managing Lean Business Cases for all Epics",
    ],
    correctIndex: 1,
    explanation:
      "Business Owners are key stakeholders with the authority and accountability for the business outcomes of the ART. They participate in PI Planning (assigning and negotiating business value for PI Objectives), attend System Demos, and participate in I&A. They are distinct from Product Managers and portfolio-level roles.",
    category: "Roles",
  },
  {
    id: 52,
    question: "What is the System Architect/Engineer's primary responsibility in SAFe?",
    options: [
      "Managing the Program Backlog and feature prioritization on behalf of the Product Manager",
      "Defining overall system architecture, guiding technical decisions, and maintaining the Architectural Runway",
      "Writing all infrastructure and platform code to support the ART's feature teams",
      "Facilitating PI Planning logistics and managing the Program Board",
    ],
    correctIndex: 1,
    explanation:
      "The System Architect/Engineer provides technical leadership for the ART. They define the overall system architecture, ensure adequate Architectural Runway, work with teams to define Enabler Features and Stories, and guide technical decisions that impact the entire ART.",
    category: "Roles",
  },
  {
    id: 53,
    question: "Which leadership style does SAFe advocate for leaders at all levels?",
    options: [
      "Command-and-control — clear authority chains with top-down decision-making",
      "Transactional — motivating teams through performance rewards and penalties",
      "Servant leadership — enabling teams by removing obstacles and creating conditions for great work",
      "Autocratic — leaders make all key decisions to maintain strategic alignment",
    ],
    correctIndex: 2,
    explanation:
      "SAFe advocates for servant leadership — where leaders focus on the growth and well-being of their teams. Servant leaders ask 'How can I help?' rather than 'Do as I say.' They create psychological safety, remove systemic impediments, coach teams, and develop future leaders.",
    category: "Roles",
  },

  // ── Applied Scenarios ──────────────────────────────────────────────────────
  {
    id: 54,
    question: "A feature has a Cost of Delay of 20 and a job size of 4. What is its WSJF score?",
    options: [
      "80 — multiply Cost of Delay by job size",
      "16 — subtract job size from Cost of Delay",
      "5 — divide Cost of Delay by job size",
      "24 — add Cost of Delay and job size",
    ],
    correctIndex: 2,
    explanation:
      "WSJF = Cost of Delay ÷ Job Size = 20 ÷ 4 = 5. Features with higher WSJF scores are sequenced first because they deliver the most value relative to the effort required, maximizing the economic value delivered by the ART over time.",
    category: "Prioritization",
  },
  {
    id: 55,
    question: "What best describes a Minimum Viable Product (MVP) in a Lean-Agile context?",
    options: [
      "The final production-ready release shipped to all customers at PI end",
      "The smallest increment that validates a hypothesis about customer value and generates learning",
      "A low-fidelity prototype with no production-quality code, used only in usability tests",
      "The set of backlog items the team commits to completing in the first Sprint",
    ],
    correctIndex: 1,
    explanation:
      "An MVP is the smallest increment that allows a team to learn whether their hypothesis about value is correct. It must be viable enough to genuinely test assumptions with real users — not just a prototype. This Lean Startup concept underpins SAFe's innovation and learning model.",
    category: "Lean-Agile Mindset",
  },
  {
    id: 56,
    question: "What is the key difference between a 'push' and 'pull' system in Lean?",
    options: [
      "Push systems are fully automated; pull systems require manual intervention at each stage",
      "Push systems are used for hardware delivery; pull systems are used only for software",
      "In a push system, work is scheduled regardless of capacity; in a pull system, work is started only when capacity is available",
      "Pull systems require more documentation; push systems are lighter-weight and faster",
    ],
    correctIndex: 2,
    explanation:
      "A pull system (Kanban) starts new work only when downstream capacity is available, matching throughput to demand. A push system forces work into queues based on schedules regardless of capacity. Pull systems reduce WIP, shorten cycle times, and expose bottlenecks — core Lean principles applied throughout SAFe.",
    category: "Lean-Agile Mindset",
  },
  {
    id: 57,
    question: "A story is missing one acceptance criterion at Sprint Review. What should the Product Owner do?",
    options: [
      "Accept the story and log the missing criterion as a defect in the next Sprint",
      "Ask the Scrum Master to override the criterion so the Sprint can close cleanly",
      "Return the story to the Team Backlog, refine it to meet the criterion, and re-plan in a future Sprint",
      "Remove the criterion from the story so it can be accepted immediately",
    ],
    correctIndex: 2,
    explanation:
      "If a story does not meet its acceptance criteria, it cannot be accepted. The PO discusses the gap with the team, the story returns to the backlog for refinement, and the missing work is planned in a subsequent Sprint. Lowering the bar to force acceptance creates technical debt and undermines trust in the Definition of Done.",
    category: "Product Owner",
  },
  {
    id: 58,
    question: "What is the key difference between Team Velocity and Flow Velocity?",
    options: [
      "They are the same metric — the names depend on whether you use Scrum or Kanban",
      "Team Velocity tracks quality outcomes; Flow Velocity tracks delivery speed only",
      "Team Velocity measures story points per Sprint for one team; Flow Velocity measures business items delivered at the ART level over time",
      "Flow Velocity is used only at the portfolio level; Team Velocity applies only to individual developers",
    ],
    correctIndex: 2,
    explanation:
      "Team Velocity (story points per Sprint) is a planning tool for individual teams. Flow Velocity is one of SAFe's four Flow Metrics — it measures the number of business outcomes or work items the entire ART delivers per unit of time, giving a system-level view of throughput beyond individual teams.",
    category: "Metrics",
  },
  {
    id: 59,
    question: "A team discovers mid-Sprint it will not complete all planned stories. What is the recommended response?",
    options: [
      "Work overtime to finish all committed stories and protect the Sprint goal at all costs",
      "Notify the Product Owner early, de-scope lower-priority stories if needed, and communicate transparently",
      "Immediately add more developers to the team to restore capacity",
      "Move the Sprint end date to accommodate all planned stories without reducing scope",
    ],
    correctIndex: 1,
    explanation:
      "Transparency is a core SAFe value. When a team identifies a risk to Sprint commitments, the PO should be informed immediately so they can make informed trade-off decisions — de-scoping lower-value stories or adjusting PI Objectives. Hiding risk until the last moment removes the ability to adapt.",
    category: "Product Owner",
  },
  {
    id: 60,
    question: "What is Continuous Exploration in the SAFe Continuous Delivery Pipeline?",
    options: [
      "Running automated test suites on every code commit to detect integration failures early",
      "Continuously monitoring production systems and alerting teams to performance anomalies",
      "The ongoing process of understanding customer needs and market trends to fill the Program Backlog with validated ideas",
      "A Sprint cadence for developing experimental features that may not reach production",
    ],
    correctIndex: 2,
    explanation:
      "Continuous Exploration is the first stage of the SAFe Continuous Delivery Pipeline. It involves customer research, design thinking, market analysis, and hypothesis formulation to continually fill the Program Backlog with relevant, validated feature ideas aligned to the strategic vision.",
    category: "DevOps & CD",
  },

  // ── SAFe Principles (extended) ─────────────────────────────────────────────
  {
    id: 61,
    question: "Which SAFe principle states that organizations should 'Take an economic view'?",
    options: [
      "Principle #3 — Assume variability; preserve options",
      "Principle #1 — Take an economic view",
      "Principle #6 — Make value flow without interruptions",
      "Principle #9 — Decentralize decision-making",
    ],
    correctIndex: 1,
    explanation:
      "SAFe Principle #1 is 'Take an economic view.' Every decision in product development has economic consequences. Lean-Agile leaders must understand and apply economic trade-offs — including the Cost of Delay — to maximize the flow of value and overall Return on Investment across the portfolio.",
    category: "SAFe Principles",
  },
  {
    id: 62,
    question: "What does SAFe Principle #3 — 'Assume variability; preserve options' — guide teams to do?",
    options: [
      "Avoid prototyping and spike work because they create unpredictable schedule variability",
      "Lock down all design and architecture decisions at the start of the PI to eliminate uncertainty",
      "Maintain multiple design options and set-based thinking until the last responsible moment before committing",
      "Assign a dedicated risk manager to each ART to quantify and eliminate all variance",
    ],
    correctIndex: 2,
    explanation:
      "Principle #3 draws on Lean product development's concept of set-based design. Rather than converging on a single solution early, teams explore multiple options and defer final decisions to the last responsible moment. This preserves economic value from variability and avoids costly late-stage rework caused by premature commitment.",
    category: "SAFe Principles",
  },
  {
    id: 63,
    question: "What is the 'Last Responsible Moment' concept in SAFe?",
    options: [
      "The final Sprint in a PI when all uncommitted backlog items must be cancelled",
      "The point at which delaying a decision further would result in irreversible consequences or lost options",
      "The deadline by which the Product Manager must publish the roadmap for the next PI",
      "The moment a team exceeds its WIP limit and must stop pulling new work",
    ],
    correctIndex: 1,
    explanation:
      "The Last Responsible Moment is the point at which failing to make a decision eliminates important alternatives or causes irreversible harm. Waiting until this moment to decide — rather than deciding early under uncertainty — preserves design options and reduces the cost of change. It is a key practice in Lean product development.",
    category: "SAFe Principles",
  },
  {
    id: 64,
    question: "SAFe Principle #8 is 'Unlock the intrinsic motivation of knowledge workers.' Which practice best embodies this?",
    options: [
      "Tying individual story point targets to quarterly performance bonuses",
      "Requiring all developers to submit daily status reports to track progress",
      "Giving teams autonomy over how they work, mastery opportunities through learning, and purpose through mission alignment",
      "Standardizing all processes so every team follows identical practices regardless of context",
    ],
    correctIndex: 2,
    explanation:
      "Knowledge workers are motivated by autonomy (control over how they work), mastery (opportunities to grow), and purpose (connection to meaningful outcomes). SAFe's principle #8 emphasizes creating conditions for intrinsic motivation rather than relying on extrinsic rewards. Command-and-control management destroys the engagement that drives innovation.",
    category: "SAFe Principles",
  },
  {
    id: 65,
    question: "Which SAFe principle addresses the idea that 'Cadence creates reliability and synchronization enables alignment'?",
    options: [
      "Principle #4 — Build incrementally with fast, integrated learning cycles",
      "Principle #5 — Base milestones on objective evaluation of working systems",
      "Principle #7 — Apply cadence; synchronize with cross-domain planning",
      "Principle #10 — Organize around value",
    ],
    correctIndex: 2,
    explanation:
      "Principle #7 recognizes that cadence (regular, predictable iteration and PI rhythms) reduces the accumulative effect of variability, and synchronization (aligning all ART teams to the same cadence) enables meaningful cross-team coordination. Together, they are the heartbeat of SAFe delivery.",
    category: "SAFe Principles",
  },

  // ── Lean Portfolio Management ──────────────────────────────────────────────
  {
    id: 66,
    question: "What are the three main functions of Lean Portfolio Management (LPM) in SAFe?",
    options: [
      "Hiring, Budgeting, and Performance Management",
      "Strategy & Investment Funding, Agile Portfolio Operations, and Lean Governance",
      "Program Backlog Management, PI Planning, and Release Coordination",
      "Enterprise Architecture, Value Stream Mapping, and Technical Debt Reduction",
    ],
    correctIndex: 1,
    explanation:
      "SAFe's LPM function comprises three areas: Strategy & Investment Funding (connecting strategy to execution with participatory budgeting), Agile Portfolio Operations (coordinating ART and Solution Train execution), and Lean Governance (dynamic budgeting, compliance, and measurement). These replace traditional project-based governance with leaner, value-stream-oriented oversight.",
    category: "Portfolio",
  },
  {
    id: 67,
    question: "What is 'Participatory Budgeting' in SAFe Lean Portfolio Management?",
    options: [
      "A process where every employee votes on which features should receive funding",
      "A collaborative approach where stakeholders and business owners help allocate budgets to value streams rather than projects",
      "A financial model that automatically allocates budgets based on team velocity data",
      "A governance process where external auditors review and approve all portfolio investments quarterly",
    ],
    correctIndex: 1,
    explanation:
      "Participatory Budgeting is a collaborative LPM event where key stakeholders come together to review the strategic portfolio vision and collectively allocate funding to value streams. It replaces top-down, project-by-project budget allocation with a more inclusive process that improves alignment and reduces political friction.",
    category: "Portfolio",
  },
  {
    id: 68,
    question: "How does SAFe recommend funding ARTs and Value Streams — using projects or using a different model?",
    options: [
      "Projects — each ART is funded per feature through standard project accounting",
      "Fixed headcount — teams are permanently funded and never adjusted based on value delivery",
      "Lean Budgets — long-lived ARTs and Value Streams receive funding guardrails instead of project-by-project approvals",
      "Cost centers — all development costs are pooled into a single enterprise-wide cost center",
    ],
    correctIndex: 2,
    explanation:
      "SAFe replaces traditional project funding (fund and disband) with Lean Budgets. Long-lived ARTs and Value Streams receive budget guardrails that provide spending boundaries without micromanaging individual projects. Teams operate within these guardrails, reducing overhead, speeding investment decisions, and supporting continuous delivery.",
    category: "Portfolio",
  },

  // ── House of Lean ──────────────────────────────────────────────────────────
  {
    id: 69,
    question: "What is the 'goal' (roof) of the SAFe House of Lean?",
    options: [
      "Continuous Delivery — releasing to production after every Sprint",
      "Value — delivering maximum value in the shortest sustainable lead time",
      "Quality — achieving zero defect production systems",
      "People — developing the workforce to achieve enterprise agility",
    ],
    correctIndex: 1,
    explanation:
      "The roof of the SAFe House of Lean is Value — delivering the maximum value in the shortest sustainable lead time with the highest quality. This goal is supported by the four pillars (Respect for People and Culture, Flow, Innovation, and Relentless Improvement) and a foundation of Lean-Agile Leadership.",
    category: "Lean-Agile Mindset",
  },
  {
    id: 70,
    question: "What are the four pillars of the SAFe House of Lean?",
    options: [
      "Vision, Roadmap, Backlog, Delivery",
      "Alignment, Quality, Transparency, Execution",
      "Respect for People and Culture, Flow, Innovation, and Relentless Improvement",
      "Strategy, Planning, Execution, and Retrospection",
    ],
    correctIndex: 2,
    explanation:
      "The four pillars of the House of Lean are: Respect for People and Culture (engaging and motivating knowledge workers), Flow (optimizing the continuous flow of value), Innovation (creating space for continuous improvement and disruption), and Relentless Improvement (using data and kaizen to continuously improve). These pillars support the goal of delivering maximum value.",
    category: "Lean-Agile Mindset",
  },

  // ── Iteration Execution ────────────────────────────────────────────────────
  {
    id: 71,
    question: "What are the five events in a SAFe Scrum iteration (Sprint)?",
    options: [
      "Backlog Grooming, Sprint Start, Daily Check-in, Code Review, Sprint End",
      "Sprint Planning, Daily Stand-up, Backlog Refinement, Sprint Review, Sprint Retrospective",
      "PI Planning, Scrum of Scrums, System Demo, I&A, Release Planning",
      "Sprint Kick-off, Task Assignment, Mid-Sprint Review, Acceptance Testing, Sprint Close",
    ],
    correctIndex: 1,
    explanation:
      "A SAFe Scrum iteration includes five events: Sprint Planning (plan iteration work), Daily Stand-up (daily 15-minute sync), Backlog Refinement (ongoing story grooming), Sprint Review (demonstrate completed work), and Sprint Retrospective (improve team practices). These are identical to standard Scrum ceremonies, embedded within SAFe's broader PI cadence.",
    category: "Agile Teams",
  },
  {
    id: 72,
    question: "What is the purpose of the Sprint Retrospective in a SAFe Agile team?",
    options: [
      "To demonstrate completed user stories to the Product Owner for acceptance",
      "To plan the work for the next iteration based on the updated Team Backlog",
      "To reflect on team processes, identify what went well and what to improve, and commit to specific improvements",
      "To review PI Objectives and report on progress to ART stakeholders",
    ],
    correctIndex: 2,
    explanation:
      "The Sprint Retrospective is a team ceremony focused on continuous improvement of working practices. The team inspects their collaboration, processes, and tools — then identifies actionable improvement items to implement in the next Sprint. Retrospective improvements accumulate over time and contribute to the team's Agile maturity.",
    category: "Agile Teams",
  },
  {
    id: 73,
    question: "What is 'Team Backlog Refinement' (also called grooming) in SAFe?",
    options: [
      "A formal ceremony where the Scrum Master reviews stories for compliance with the Definition of Done",
      "A process where the RTE approves all stories before they enter the Team Backlog",
      "An ongoing activity where the PO and team elaborate stories, estimate size, and ensure they meet the Definition of Ready",
      "A quarterly activity synchronized with portfolio planning to align team work with strategic themes",
    ],
    correctIndex: 2,
    explanation:
      "Backlog Refinement is an ongoing activity (not a one-time event) where the Product Owner and team collaboratively elaborate user stories, add acceptance criteria, estimate size, and ensure upcoming stories meet the Definition of Ready. Well-refined stories lead to smoother Sprint Planning and more predictable delivery.",
    category: "Agile Teams",
  },

  // ── Program Execution & ART ────────────────────────────────────────────────
  {
    id: 74,
    question: "What is a 'stretch objective' in SAFe PI Planning?",
    options: [
      "A mandatory PI Objective that the team must deliver regardless of capacity",
      "A goal assigned by leadership that exceeds the team's historical velocity baseline",
      "A lower-confidence PI Objective representing work the team will attempt if capacity allows, but does not commit to",
      "A technical objective owned exclusively by the System Architect for the PI",
    ],
    correctIndex: 2,
    explanation:
      "Stretch objectives are PI Objectives the team hopes to achieve but does not firmly commit to — typically work that is dependent on completing committed objectives first, or where uncertainty is higher. Business Owners assign lower business value to stretch objectives during PI Planning, keeping the committed plan realistic and achievable.",
    category: "PI Planning",
  },
  {
    id: 75,
    question: "What does 'Agile Architecture' mean in the context of SAFe?",
    options: [
      "A fully documented architecture designed upfront before any development begins",
      "An approach where architectural decisions emerge iteratively, enabled by sufficient Architectural Runway, to support fast, sustainable delivery",
      "A microservices-only architecture pattern mandated for all SAFe ARTs",
      "The process of outsourcing all infrastructure decisions to cloud vendors",
    ],
    correctIndex: 1,
    explanation:
      "Agile Architecture in SAFe means architectural decisions emerge incrementally rather than being fully designed upfront. The System Architect/Engineer maintains sufficient Architectural Runway to enable teams to implement near-term features quickly, while larger design decisions are deferred until enough is known — balancing intentional architecture with emergent design.",
    category: "Built-in Quality",
  },
  {
    id: 76,
    question: "What is the role of Communities of Practice (CoPs) in SAFe?",
    options: [
      "To replace Scrum ceremonies with a peer-learning format that reduces meeting overhead",
      "To serve as the governing body that approves architectural standards across the ART",
      "To connect people with shared professional interests across teams to share knowledge, develop skills, and align on practices",
      "To provide mandatory training for new team members on SAFe principles and ceremonies",
    ],
    correctIndex: 2,
    explanation:
      "Communities of Practice are informal groups of practitioners across different teams who share a common interest (e.g., UX, security, DevOps). They drive shared learning, alignment of practices, and professional development across the ART and organization — without formal authority. They support both technical and business competencies.",
    category: "Roles",
  },

  // ── Continuous Learning Culture ────────────────────────────────────────────
  {
    id: 77,
    question: "What does a 'Learning Organization' mean in the context of SAFe?",
    options: [
      "An organization that provides mandatory certification programs for all employees annually",
      "An enterprise that continuously creates, captures, and transfers knowledge to adapt and improve more effectively than competitors",
      "A team structure where learning sprints replace delivery sprints every third iteration",
      "A compliance-focused training system ensuring regulatory knowledge is up to date",
    ],
    correctIndex: 1,
    explanation:
      "A Learning Organization — a concept from Peter Senge — continuously expands its capacity to create its future by building systems thinking, personal mastery, mental model inquiry, shared vision, and team learning. SAFe's Continuous Learning Culture pillar encourages relentless improvement, innovation, and knowledge transfer throughout the enterprise.",
    category: "Lean-Agile Mindset",
  },
  {
    id: 78,
    question: "What is a 'Kaizen' event in the context of SAFe's Continuous Learning Culture?",
    options: [
      "A root-cause analysis triggered by a production outage affecting multiple customers",
      "A focused, time-boxed workshop where a team or ART identifies and immediately implements improvements to a specific process or workflow",
      "A quarterly performance review process evaluating team members against OKRs",
      "A hackathon where teams build experimental features unrelated to the PI backlog",
    ],
    correctIndex: 1,
    explanation:
      "Kaizen (Japanese for 'change for better') events are focused workshops where teams intensively analyze and improve a specific process. They produce rapid, measurable improvement over a short period (typically 3–5 days). In SAFe, Kaizen thinking is embedded in the I&A problem-solving workshop and the IP Sprint.",
    category: "Lean-Agile Mindset",
  },

  // ── Organizational Agility ─────────────────────────────────────────────────
  {
    id: 79,
    question: "What is Business Agility in SAFe?",
    options: [
      "The ability of software teams to release to production without manual intervention",
      "The capacity of the entire enterprise — not just IT — to adapt rapidly to market opportunities and threats with innovative business solutions",
      "A metric measuring how quickly the ART responds to new feature requests from customers",
      "A program for training all employees in Scrum and Kanban to make the company fully Agile",
    ],
    correctIndex: 1,
    explanation:
      "Business Agility is the ability of the whole enterprise to compete and thrive in a digital age by continuously adapting and delivering innovative products and services faster than competitors. It requires Agile practices to extend beyond IT to include HR, Finance, Legal, Marketing, and other business functions.",
    category: "Portfolio",
  },
  {
    id: 80,
    question: "What are the two types of Value Streams in SAFe?",
    options: [
      "Development Value Streams and Release Value Streams",
      "Internal Value Streams and External Value Streams",
      "Operational Value Streams and Development Value Streams",
      "Portfolio Value Streams and Team Value Streams",
    ],
    correctIndex: 2,
    explanation:
      "SAFe defines two types of Value Streams: Operational Value Streams (the steps needed to deliver a product or service to a customer — e.g., order-to-cash) and Development Value Streams (the steps needed to develop a solution that supports operational value streams). Identifying both helps organizations optimize end-to-end flow.",
    category: "Portfolio",
  },

  // ── Solution Train ─────────────────────────────────────────────────────────
  {
    id: 81,
    question: "When is a Solution Train needed in SAFe?",
    options: [
      "For every ART that has more than 50 people working on a single product",
      "When multiple ARTs must coordinate to build and deliver a large, complex solution that a single ART cannot deliver alone",
      "When a company has more than 100 Agile teams across different business units",
      "When the portfolio contains more than 10 active epics requiring cross-team execution",
    ],
    correctIndex: 1,
    explanation:
      "A Solution Train is the organizational construct for building large, complex solutions that require multiple ARTs working together. It provides coordination, integration, and alignment across ARTs via Solution Kanban, Pre- and Post-PI Planning, and Solution Demo ceremonies. Solution Trains are not needed for single-ART solutions.",
    category: "ART",
  },
  {
    id: 82,
    question: "What is a 'Capability' in SAFe, and how does it differ from a Feature?",
    options: [
      "A Capability is a story too large to fit in one Sprint; a Feature fits within one Sprint",
      "A Capability is a high-level solution behavior that may span multiple ARTs; a Feature is an ART-level behavior delivered in one PI",
      "They are synonyms — both terms describe user-visible functionality at the program level",
      "A Capability is owned by the Portfolio Kanban; a Feature is owned by the Team Backlog",
    ],
    correctIndex: 1,
    explanation:
      "In SAFe, a Capability is a higher-level service that may span multiple ARTs, used at the Large Solution level. A Feature is an ART-level behavior sized to deliver within one PI. Capabilities decompose into Features across ARTs. For organizations with only one ART, Features are the primary work item and Capabilities may not be needed.",
    category: "Backlog Management",
  },

  // ── Kanban & Flow ──────────────────────────────────────────────────────────
  {
    id: 83,
    question: "What is the primary purpose of a WIP (Work in Progress) limit in SAFe Kanban?",
    options: [
      "To restrict the number of stories a developer may own simultaneously to enforce specialization",
      "To cap the total number of items in the backlog to prevent scope creep",
      "To expose bottlenecks, reduce multitasking, and improve the flow of value through the system",
      "To ensure that no Sprint can contain more work than the team's historical average velocity",
    ],
    correctIndex: 2,
    explanation:
      "WIP limits constrain the number of items that can be in a given stage simultaneously. When a stage hits its WIP limit, upstream work must pause — making bottlenecks visible. Teams then swarm the bottleneck to restore flow. This drives higher throughput, faster cycle times, and better-quality work than unlimited multitasking.",
    category: "DevOps & CD",
  },
  {
    id: 84,
    question: "What does 'Flow Time' measure in SAFe's four Flow Metrics?",
    options: [
      "The total time a developer spends actively coding a feature from assignment to merge",
      "The elapsed time from when a work item is started to when it is delivered to the customer",
      "The percentage of time that work is actively being worked on versus waiting in a queue",
      "The number of work items the ART delivers per iteration on average",
    ],
    correctIndex: 1,
    explanation:
      "Flow Time (also called cycle time or lead time depending on context) measures the elapsed time from when work begins on an item to when it is delivered. Shorter Flow Time means faster value delivery and improved responsiveness to customer needs. Reducing wait states and WIP are the primary levers for improving Flow Time.",
    category: "Metrics",
  },
  {
    id: 85,
    question: "What is 'Little's Law' and why is it relevant in SAFe?",
    options: [
      "A legal standard requiring software products to have written privacy policies before deployment",
      "A quality principle stating that every defect found late costs ten times more than one found early",
      "A mathematical relationship: Average Cycle Time = WIP ÷ Throughput — showing that reducing WIP reduces delivery time",
      "A principle stating that small teams always outperform large teams on complex software projects",
    ],
    correctIndex: 2,
    explanation:
      "Little's Law (from queuing theory) states: Cycle Time = WIP ÷ Throughput. For a given throughput, reducing WIP directly reduces cycle time. SAFe uses this to justify WIP limits — keeping less work in the system at once leads to shorter, more predictable delivery times. It underpins SAFe's emphasis on flow and limiting work in process.",
    category: "Metrics",
  },

  // ── WSJF & Prioritization ──────────────────────────────────────────────────
  {
    id: 86,
    question: "When two features have the same Cost of Delay, how does WSJF determine which to prioritize?",
    options: [
      "Choose the feature with the higher business value score regardless of size",
      "Choose the feature with the smaller job size — it delivers the same value faster",
      "Escalate to portfolio leadership to break the tie using strategic priority",
      "Choose the feature that has been waiting longest in the backlog (FIFO ordering)",
    ],
    correctIndex: 1,
    explanation:
      "WSJF = Cost of Delay ÷ Job Size. When Cost of Delay is equal, the feature with the smaller job size yields the higher WSJF score and should be sequenced first. Smaller items deliver the same economic value with less investment, freeing capacity sooner for the next high-value item.",
    category: "Prioritization",
  },
  {
    id: 87,
    question: "What does 'Time Criticality' represent in the WSJF Cost of Delay calculation?",
    options: [
      "The total number of development hours required to complete the feature",
      "The urgency driven by a market window, compliance deadline, or seasonal opportunity — where delay causes a disproportionate drop in value",
      "The confidence level the team has in their size estimate for the feature",
      "The number of teams that depend on the feature before they can begin their own work",
    ],
    correctIndex: 1,
    explanation:
      "Time Criticality captures how urgent the feature is based on external timing factors — a regulatory deadline, a competitive window, or a seasonal peak. A feature with high time criticality loses value rapidly with each unit of delay. It is one of the three components of Cost of Delay alongside User/Business Value and Risk Reduction/Opportunity Enablement.",
    category: "Prioritization",
  },

  // ── Estimation ─────────────────────────────────────────────────────────────
  {
    id: 88,
    question: "What is 'relative estimation' and why does SAFe prefer it over hour-based estimation?",
    options: [
      "Estimating based on a team member's years of experience relative to the task complexity",
      "Estimating in calendar days relative to the Sprint start date to improve deadline accuracy",
      "Sizing work items relative to each other using a reference story, which is faster, more consistent, and avoids false precision in hour estimates",
      "Comparing actual hours to budgeted hours to determine estimate accuracy for future sprints",
    ],
    correctIndex: 2,
    explanation:
      "Relative estimation sizes stories against each other (e.g., story points, T-shirt sizes) rather than estimating in hours. Teams compare a new story to a known reference story and agree on relative size. This approach is faster, reduces anchoring bias, and acknowledges that hour estimates carry false precision. SAFe uses story points normalized at the ART level.",
    category: "Agile Teams",
  },
  {
    id: 89,
    question: "What is 'Normalized Estimation' in SAFe?",
    options: [
      "Converting all team estimates to hours so they can be aggregated in portfolio planning tools",
      "Aligning story point definitions across all ART teams so an '8-point story' represents similar effort on any team",
      "Adjusting individual team velocity by removing outlier Sprints from the historical average",
      "Having the Release Train Engineer review and approve all story estimates before Sprint planning",
    ],
    correctIndex: 1,
    explanation:
      "Normalized estimation aligns the story point scale across all ART teams so that estimates are comparable. Teams calibrate against a common reference story to ensure an '8-point story' means roughly the same thing on every team. This enables meaningful ART-level capacity planning and more accurate PI Planning.",
    category: "PI Planning",
  },

  // ── DevOps & Continuous Deployment ────────────────────────────────────────
  {
    id: 90,
    question: "What is a 'feature toggle' (feature flag) and how does it support Continuous Delivery?",
    options: [
      "A toggle switch in Jira that marks a feature story as ready for release",
      "A code mechanism that enables or disables features at runtime without deploying new code, allowing safe dark launches and gradual rollouts",
      "A manual approval gate that blocks deployment until a business owner toggles the feature on",
      "A sprint toggle that enables teams to switch between Scrum and Kanban for different feature types",
    ],
    correctIndex: 1,
    explanation:
      "Feature toggles (flags) wrap new functionality in conditional logic controlled by configuration, not code deployments. Teams can deploy code to production while keeping features 'dark' until ready for release. This enables trunk-based development, gradual rollouts, A/B testing, and instant rollback — key enablers of the Continuous Delivery Pipeline.",
    category: "DevOps & CD",
  },
  {
    id: 91,
    question: "What is the role of a 'Definition of Done' (DoD) in SAFe?",
    options: [
      "A list of acceptance criteria written for each individual story by the Product Owner",
      "A team-wide agreement on the quality standards every story must meet before it can be accepted as complete",
      "A portfolio-level compliance checklist required before any epic can be approved",
      "A formal sign-off document signed by the Business Owner at the end of each PI",
    ],
    correctIndex: 1,
    explanation:
      "The Definition of Done is a shared team agreement listing the conditions every story must satisfy to be considered complete — typically including: coded, unit-tested, peer-reviewed, integrated, acceptance criteria met, and non-functional requirements satisfied. It ensures consistent quality and prevents half-done work from accumulating as hidden debt.",
    category: "Built-in Quality",
  },

  // ── SAFe Roles (extended) ──────────────────────────────────────────────────
  {
    id: 92,
    question: "What is 'Lean-Agile Leadership' and why is it foundational to SAFe?",
    options: [
      "A management style where leaders attend all Scrum ceremonies to maintain oversight",
      "An approach where leaders embody and teach Lean-Agile principles, create conditions for teams to succeed, and drive cultural change",
      "A training program leaders complete before their teams can begin PI Planning",
      "A performance review framework evaluating managers against Agile KPIs",
    ],
    correctIndex: 1,
    explanation:
      "Lean-Agile Leadership is the foundation of the SAFe House of Lean. Leaders who embody Lean-Agile values, model the mindset, and create a safe environment for teams to innovate are essential for sustained transformation. Without leadership transformation, process changes remain superficial. Leaders must go first.",
    category: "Roles",
  },
  {
    id: 93,
    question: "What is a Solution Train Engineer (STE) in SAFe?",
    options: [
      "The chief architect responsible for all technical decisions across the entire enterprise",
      "A servant leader for the Solution Train who facilitates cross-ART coordination and coaches ARTs and RTE",
      "A project manager who tracks the delivery progress of large-solution epics for portfolio leadership",
      "A senior Product Manager who owns the Solution Backlog and presents it at Pre-PI Planning",
    ],
    correctIndex: 1,
    explanation:
      "The Solution Train Engineer (STE) is the servant leader for the Solution Train — the equivalent of the RTE at the large-solution level. The STE facilitates Pre- and Post-PI Planning, coaches RTEs and ARTs, manages Solution-level risks, and drives continuous improvement of Solution Train practices and flow.",
    category: "Roles",
  },

  // ── Customer Centricity (extended) ────────────────────────────────────────
  {
    id: 94,
    question: "What is an Innovation Funnel in SAFe's Continuous Exploration?",
    options: [
      "A sprint-based format where innovation stories are developed only during IP Sprints",
      "A structured process for generating, capturing, filtering, and validating new ideas before they enter the Program Backlog",
      "A portfolio governance process that filters epics based on ROI thresholds",
      "A Kanban board used exclusively by the System Architect to manage technical spikes",
    ],
    correctIndex: 1,
    explanation:
      "The Innovation Funnel is a lightweight process within Continuous Exploration for managing the flow of ideas from initial discovery through validation to the Program Backlog. Ideas are generated from customer research, market data, and internal innovation, then filtered and validated (e.g., via MVP or prototype) before being formulated as features.",
    category: "Customer Centricity",
  },
  {
    id: 95,
    question: "What is 'Design Thinking' and how does SAFe incorporate it?",
    options: [
      "A software architecture methodology for designing modular, loosely-coupled systems",
      "A human-centered approach to innovation that integrates user desirability, technical feasibility, and business viability — used in Continuous Exploration to shape the product vision and backlog",
      "A Lean practice for designing value stream maps to eliminate waste in delivery workflows",
      "A UI/UX framework specifying interface standards for all customer-facing SAFe solutions",
    ],
    correctIndex: 1,
    explanation:
      "Design Thinking is a human-centered innovation process with five phases: Empathize, Define, Ideate, Prototype, and Test. SAFe integrates Design Thinking into Continuous Exploration to ensure products solve real user problems. Product Managers and UX designers use it to develop personas, journey maps, and solution hypotheses before committing to features.",
    category: "Customer Centricity",
  },

  // ── Scenario-based (extended) ──────────────────────────────────────────────
  {
    id: 96,
    question: "An ART consistently finishes PIs at 65% of planned business value. What is the most likely root cause to investigate first?",
    options: [
      "The teams lack sufficient development skills and need more training",
      "PI Objectives are being set without sufficient input from the teams who must deliver them, leading to overcommitment",
      "The Release Train Engineer is not facilitating Scrum of Scrums frequently enough",
      "Business Owners are assigning inflated business value scores to all PI Objectives",
    ],
    correctIndex: 1,
    explanation:
      "An ART consistently delivering below 80% of planned business value is a predictability problem. The most common root cause is that PI Objectives are set top-down without teams having sufficient say in what is achievable given capacity and dependencies. SAFe's bottom-up team planning during PI Planning is designed to create realistic, team-owned commitments.",
    category: "PI Planning",
  },
  {
    id: 97,
    question: "A Product Owner wants to accept a story that passes all functional acceptance criteria but has a 40% regression test failure rate in CI. Should they accept it?",
    options: [
      "Yes — functional acceptance criteria are the PO's primary concern; test failures are a developer responsibility",
      "Yes — if the failures are in unrelated areas, they do not affect the story's own acceptance criteria",
      "No — the Definition of Done typically requires a passing CI build; accepting the story would introduce known quality debt",
      "No — only the Scrum Master has the authority to block a story based on CI failures",
    ],
    correctIndex: 2,
    explanation:
      "In SAFe, the Definition of Done typically requires a passing automated test suite and a green CI build. A story that causes a 40% regression failure rate does not meet the built-in quality standard — accepting it would introduce known defects into the system and compromise the integrity of the codebase. The PO should reject the story and ask the team to fix the regressions first.",
    category: "Built-in Quality",
  },
  {
    id: 98,
    question: "During PI Planning, Team A identifies a dependency on Team B for a critical feature. Team B cannot commit to the dependency in the same PI. What is the correct action?",
    options: [
      "Team A should commit to the feature anyway and hope Team B finishes in time",
      "Escalate to the Release Train Engineer who must force Team B to reprioritize their backlog",
      "Mark the dependency on the Program Board, negotiate with Team B and the Product Managers, and either reschedule or mark it as a risk to ROAM",
      "Cancel the feature and remove it from the PI Objectives entirely since it cannot be delivered",
    ],
    correctIndex: 2,
    explanation:
      "The Program Board exists precisely to surface cross-team dependencies during PI Planning. When a dependency cannot be met within the PI, teams and Product Managers negotiate alternatives: reschedule the dependent feature, find a workaround, or accept and ROAM the risk. Committing without a resolved dependency creates a predictability risk that should be owned and tracked.",
    category: "PI Planning",
  },
  {
    id: 99,
    question: "What is the correct response when a customer requests a new feature mid-PI after PI Planning is complete?",
    options: [
      "Add it to the current Sprint immediately — customer requests always take top priority",
      "Evaluate its priority using WSJF; if it outranks committed features, negotiate a scope trade-off with the team and Business Owners",
      "Reject it and ask the customer to submit it for the next PI Planning event",
      "Assign it to the Release Train Engineer to handle as an unplanned work item outside the PI Objectives",
    ],
    correctIndex: 1,
    explanation:
      "PI plans are not immutable, but changes should be managed deliberately. New mid-PI requests are evaluated for priority using WSJF. If a new item ranks higher than committed work, the Product Manager works with Business Owners and the team to swap scope — removing equivalent work from the plan — rather than simply adding to it and overloading the team.",
    category: "Product Manager",
  },
  {
    id: 100,
    question: "Which SAFe artifact helps teams understand non-functional requirements such as performance, security, and compliance that apply across all features?",
    options: [
      "PI Objectives — where teams define quality commitments alongside functional goals",
      "Architectural Runway — the technical infrastructure that supports non-functional requirements",
      "Non-Functional Requirements (NFRs) / System Qualities — constraints or requirements that apply across features and are part of the Definition of Done",
      "The Innovation Funnel — where security and compliance ideas are captured before reaching the backlog",
    ],
    correctIndex: 2,
    explanation:
      "Non-Functional Requirements (NFRs), sometimes called System Qualities, capture constraints that apply across many or all features — such as performance thresholds, security standards, and regulatory compliance. They are typically captured at the program level, reflected in the Definition of Done, and considered when sizing and accepting any story or feature.",
    category: "Built-in Quality",
  },
];
