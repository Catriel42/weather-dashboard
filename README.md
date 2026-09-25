# Weather Dashboard

Interactive web application to check real-time weather conditions for any city worldwide, consuming the OpenWeatherMap API. Built with React 19, TypeScript, and Vite.

<img width="1785" height="893" alt="image" src="https://github.com/user-attachments/assets/73bed920-10f4-4110-9bce-1ee6bac08974" />

<img width="1801" height="898" alt="image" src="https://github.com/user-attachments/assets/d3dffd1d-b589-4c90-ae84-6229a95c7bf2" />

- **Live Demo:** [https://dnr3v5hngcmwc.cloudfront.net](https://dnr3v5hngcmwc.cloudfront.net)
- **Repository:** [https://github.com/Catriel42/weather-dashboard](https://github.com/Catriel42/weather-dashboard)

---

## Features

- Dynamic city search with autocomplete and geographic coordinates.
- Detailed real-time weather metrics: current temperature, feels-like temperature, humidity, wind speed, visibility, and atmospheric pressure.
- 5-day weather forecast with dedicated dynamic routes (`/forecast/:city`) and daily precipitation metrics.
- Single Page Application (SPA) routing powered by React Router v7 (`createBrowserRouter`) with persistent layout and fallback handling (`404 Not Found`).
- Global state management using React Context API (`ThemeContext`) and custom `useTheme()` hook for seamless dark/light mode toggling across all routes.
- Custom declarative `useFetch` hook built with TypeScript generics, race condition prevention, and request cancellation via native `AbortController`.
- Performance optimization with route-level code splitting and lazy loading (`React Router lazy`) on the About page.
- Local sunrise and sunset times calculated using timezone offset.
- Responsive design tailored for mobile and desktop viewports.
- End-to-end strict typing with TypeScript.
- Automated cloud architecture using Infrastructure as Code (IaC) with AWS CDK.

---

## Technologies

- **Frontend:** React 19, TypeScript, Vite, React Router v7, Lucide React
- **Styling:** CSS Modules / Vanilla CSS with custom properties
- **Code Quality:** ESLint, Prettier
- **Infrastructure:** AWS CDK (TypeScript), Amazon S3, Amazon CloudFront
- **Documentation:** [md-pdf](https://github.com/DaNnielRody/md-pdf) by [DaNnielRody](https://github.com/DaNnielRody)

---

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/)
- [AWS CLI](https://aws.amazon.com/cli/) installed and configured with valid credentials (only required for deploying infrastructure).

---

## Getting Started

1. Clone the repository or navigate to the project directory:

   ```bash
   cd weather-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local address displayed in the terminal in your browser (defaults to `http://localhost:5173`).

---

## Available Scripts

In the project root, you can run:

| Command                | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| `npm run dev`          | Starts the local Vite development server.                           |
| `npm run build`        | Type-checks with TypeScript and generates static assets in `dist/`. |
| `npm run preview`      | Locally previews the generated production build.                    |
| `npm run lint`         | Analyzes code with ESLint to detect syntax and rule errors.         |
| `npm run lint:fix`     | Automatically fixes fixable ESLint errors.                          |
| `npm run format`       | Formats all source files using Prettier.                            |
| `npm run format:check` | Checks if files conform to Prettier rules without modifying them.   |

---

## AWS Deployment with CDK

The project infrastructure is defined as code in the `infra/` directory. The deployment provisions:

- A private **Amazon S3** bucket to host the compiled frontend assets.
- An **Amazon CloudFront** distribution with enforced HTTPS and 404/403 error redirection to `index.html` (supporting Single Page Application routing).
- A `BucketDeployment` construct that automatically syncs the `dist/` directory to S3 and invalidates the CloudFront cache.

### Deployment Steps

1. **Build for production:**

   From the project root, compile the application:

   ```bash
   npm run build
   ```

   This generates the `dist/` directory required by the CDK stack.

2. **Navigate to the infrastructure directory:**

   ```bash
   cd infra
   ```

3. **Install CDK dependencies:**

   ```bash
   npm install
   ```

4. **Synthesize and deploy the stack:**

   _(If this is your first time using CDK in your AWS account/region, run `npx cdk bootstrap` first)._

   ```bash
   npx cdk deploy
   ```

5. Once completed, the terminal will display the CloudFront URL output (`DomainURL`) where the application is publicly accessible.

---

## Documentation

The project's technical documentation and lab reports located in the `docs/` folder are compiled into professional PDF documents using [**md-pdf**](https://github.com/DaNnielRody/md-pdf), an open-source tool developed by [**DaNnielRody**](https://github.com/DaNnielRody).

`md-pdf` turns Markdown source files into publication-quality PDFs with client-facing finishes:

- Professional cover page with institutional branding (`Jala University`) and metadata grid.
- Dynamic table of contents with accurate real page-number resolution.
- Running headers, footers, and clean page breaks per section.
- Integrated styling and vector diagram rendering matching the rest of the document.

To generate any documentation PDF locally:

```bash
cd docs
mdpdf <document-name>.md
```
