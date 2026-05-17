### Roles and Core Responsibilities

#### 🥇 Overall Team Leader
* **Operational Oversight:** Exercises comprehensive supervision over all development tracks (UI and API).
* **Integration & Quality Assurance:** Reviews, merges, and rectifies incoming code contributions to prevent regression and merge conflicts.
* **Architectural Guardrails:** Validates system integrity, ensuring structural standards are upheld and correct engineering packages/dependencies are utilized.

#### 🛠️ Technical Lead
* **System Documentation:** Authors and maintains internal software specifications, setup guides, and structural documentation.
* **Registry Management:** Keeps a precise registry of shared components, utility helper functions, and environmental variables.
* **Administrative Record:** Coordinates engineering synchronize-sessions and documents detailed meeting minutes.

#### 🔌 API Integration Track (Sub-Team A)
* **API Leader:** * Oversees the entire data-fetching and state management ecosystem.
    * Verifies that integrated endpoints function correctly and handle edge cases gracefully.
* **API-1 (Routing & Page Architecture):**
    * Implements declarative layout routing and dynamic path parameters.
    * Secures public and private routing boundaries.
* **API-2 (Data Layer & Services):**
    * Writes modular, re-usable async infrastructure to fetch and mutate server data.
    * Implements data normalization and strict typing for API responses.

#### 🎨 User Interface Track (Sub-Team B)
* **UI Leader:**
    * Enforces visual fidelity, ensuring UI/UX deliverables exactly replicate structural designs.
    * Maintains layout responsiveness, component design consistency, and interactive feedback.
* **UI-1 (Global Structural Components):**
    * Engineers highly reusable, scalable Layout containers, including navigation bars and footer elements.
    * Ensures responsive adaptation across diverse viewports.
* **UI-2 (Core Feature Interfaces):**
    * Develops and refines major functional application views: Dashboard page, Notes overview, and New Note creation wizard.

---

## 🏗️ Technical Architecture Standards

To support our modular strategy, the project must adhere to a strict **feature-based folder structure**. This prevents tight coupling and ensures codebase scalability:

```text
src/
├── assets/             # Static files (images, icons)
├── components/         # Global reusable primitives (Buttons, Inputs)
├── config/             # Environment constants, Axios instances
├── features/           # Modular, self-contained domain features
│   ├── dashboard/
│   │   ├── components/ # Dashboard-specific UI elements
│   │   └── index.js    # Public feature API
│   └── notes/
│       ├── components/ # Notes-specific UI elements
│       ├── services/   # Note-taking API functions (API-2)
│       └── hooks/      # State tracking hooks
├── layouts/            # Navbar / Footer wrapper skeletons (UI-1)
└── routes/             # Unified declarative router configuration (API-1)