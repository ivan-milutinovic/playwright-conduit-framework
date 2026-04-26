# 🎭 Playwright Framework - Conduit (RealWorld App)

This repository serves as a professional automation showcase for the **Conduit RealWorld** application. The project is designed as an MVP (Minimum Viable Portfolio) for commercial-grade applications, demonstrating advanced QA engineering patterns and hybrid testing strategies.

---

## Key Technical Highlights

- **Architecture:** Implementation of the **Page Object Model (POM)** pattern using strictly typed **TypeScript** for maximum maintainability and scalability.
- **State Management:** Global **API Authentication** (Category 1) that eliminates the need for repetitive and slow UI-based logins across the test suite.
- **Hybrid CRUD Flows:** Leveraging the backend API for rapid data seeding and cleanup, focusing UI tests on critical user journeys.
- **Network Resilience (Mocking):** Intercepting network traffic to simulate server failures (HTTP 500) and verify UI consistency in empty states.
- **CI/CD Integration:** A fully automated pipeline via **GitHub Actions** that ensures code quality and test stability on every push or pull request.

---

## Tech Stack

| Technology              | Purpose                                                 |
| :---------------------- | :------------------------------------------------------ |
| **Playwright**          | Core engine for end-to-end automation                   |
| **TypeScript**          | Type-safe development of robust test scripts            |
| **ESLint & Prettier**   | Maintaining high code quality and stylistic consistency |
| **Husky & lint-staged** | Git hooks for automated pre-commit linting gates        |
| **GitHub Actions**      | Automated cloud-based execution and reporting           |

---

## Test Strategy (The 10-Test Plan)

The framework is organized into five logical categories to demonstrate a comprehensive profile:

### 1. Authentication & State Management

- [x] **Global API Setup:** Injecting JWT tokens into `storageState` for instant application access.
- [x] **Negative UI Login:** Validating robust UI error handling for invalid user credentials.

### 2. Hybrid CRUD Operations

- [ ] **Article Lifecycle:** UI-based article creation combined with backend API database cleanup (Teardown).
- [ ] **Data Seeding & Edit:** Utilizing API to instantly seed an article, followed by UI validation of the edit flow.

### 3. Network Mocking & Isolation

- [ ] **Empty Feed State:** Intercepting the network to return an empty array and verifying the UI "No articles are here" state.
- [ ] **System Robustness:** Simulating an HTTP 500 server error during login to check frontend stability and user feedback.

### 4. Asynchronous Mutations & Routing

- [ ] **State Synchronisation:** Verifying that clicking the "Favorite" button asynchronously increments the counter without a page reload.
- [ ] **Global Tag Filtering:** Clicking a tag on the home page and asserting that the feed correctly filters the network response.
- [ ] **Profile Interaction:** Verifying the Follow/Unfollow toggle functionality on a user's profile page.

### 5. Pure API Validation

- [ ] **Endpoint Security:** Executing direct API requests to verify 401 Unauthorized responses when attempting to modify protected resources without a token.

---

## Setup & Execution

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ivan-milutinovic/playwright-conduit-framework.git
    ```

2.  **Install dependencies:**

    ```bash
    npm ci
    npx playwright install chromium --with-deps
    ```

3.  **Environment Configuration:**<br>
    Create a `.env` file based on the `.env.example` template and provide your Conduit credentials.

4.  **Run Tests:**
    ```bash
    npx playwright test
    ```

---

## Reporting

The framework generates detailed **HTML Reports** after every run. In the CI/CD environment, these reports are preserved as artifacts for 14 days, providing transparency into test execution and failure analysis.
