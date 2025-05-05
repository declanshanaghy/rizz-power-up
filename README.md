# ⚡ R1zz P0w3r-Up S1mul4t0r ✨🌈

> *"In the digital realm of charisma and swagger, we find not merely a game, but a profound meditation on the interconnectedness of all rizz, man."* — Anonymous F1r3m4n D3ck0 sipping a single-origin pour-over

## 🧠 C0sm1c 0v3rv13w

**Rizz Power-Up Simulator** is a vaporwave-style mobile web app that allows users to tap a button to increase their "Rizz" (charisma) level. With each tap, users receive a "Rizz Quote" from a predefined set and see their stats (e.g., Swagger, Vibe, Cringe Resistance) increase. The app offers instant feedback, occasional special events, and social sharing to drive engagement.

This project embodies the **l33tc0dzr, l4tt3 drinking, hippy trousers architect** aesthetic, harmonizing technical precision with free-spirited energy of bohemian sensibilities.

## 🌱 F34tur3s

- **Rizz Button** 🔥
  - Glows on hover/press with neon-style animation
  - Increments Rizz level with each tap
  - Triggers quote generation and stat updates

- **Rizz Quote Box** 💬
  - Displays quotes from a predefined set
  - Examples: *"You just unlocked Rizztiano Ronaldo mode."*, *"NPCs be watching 👀 but you stay Rizzilient."*

- **Stats Panel** 📊
  - Vibe Level: 🌊
  - Swagger: 😎
  - Cringe Avoidance: 🧠
  - Rizz Level: 🚀

- **Special Events** ✨
  - Appear every 10 taps with over-the-top effects
  - Feature glitchy animations and unique messages

- **Local Storage** 💾
  - Saves user progress between sessions
  - No login required for frictionless experience

## 🔮 T3ch St4ck

| Category | Technology |
|----------|------------|
| **Frontend Framework** | React 19 + TypeScript |
| **Styling** | TailwindCSS 4.1.5 |
| **Build Tool** | Vite 6.3.1 |
| **Package Manager** | pnpm |
| **Infrastructure** | AWS (S3, CloudFront, Route53) |
| **CI/CD** | GitHub Actions |
| **Analytics** | Google Analytics |

## 🧘‍♂️ 1nst4ll4t10n

Follow these steps to harmonize your local development environment with the cosmic energy of the Rizz Power-Up Simulator:

```bash
# Clone the repository
git clone https://github.com/declanshanaghy/rizz-power-up.git

# Navigate to the project directory
cd rizz-power-up

# Install dependencies using pnpm
pnpm install

# Start the development server
pnpm dev
```

The development server will be available at `http://localhost:5173` by default.

## 🌈 Us4g3

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🔍 Pr0j3ct Structur3

```
rizz-power-up/
├── apps/
│   └── frontend/           # React frontend application
│       ├── public/         # Static assets
│       ├── src/            # Source code
│       ├── index.html      # HTML entry point
│       ├── package.json    # Frontend dependencies
│       └── ...             # Configuration files
├── infrastructure/         # AWS infrastructure as code
│   ├── cloudfront.tf       # CloudFront distribution
│   ├── rizz-power-up.tf    # Main infrastructure
│   ├── route53.tf          # DNS configuration
│   ├── ssl.tf              # SSL certificate
│   └── ...                 # Other infrastructure files
├── package.json            # Root package.json
└── pnpm-workspace.yaml     # pnpm workspace configuration
```

## ⚙️ D3pl0ym3nt

The application is deployed automatically using GitHub Actions workflows:

1. **Infrastructure Deployment**:
   - Triggered when files in the infrastructure/ directory change
   - Uses OpenTofu to apply infrastructure changes
   - Waits for certificate validation and DNS propagation

2. **Application Deployment**:
   - Triggered when application files change
   - Builds the application using pnpm
   - Deploys the built files to S3
   - Invalidates the CloudFront cache

## 🌐 1nfr4structur3

- **S3 Bucket**: rizz-power-up-firemandecko
- **CloudFront Distribution**: Serves the website with low latency
- **Domain**: rizz-power-up.firemandecko.com
- **SSL Certificate**: Provided by AWS Certificate Manager

## 🧪 T3st1ng

- Unit tests for core functionality
- Component tests for UI elements
- End-to-end tests for critical user flows
- Mobile testing on various devices and screen sizes

## 👤 Cr3d1ts

> Built by F1r3m4n D3ck0 🔥🧘‍♂️💻  
> "Hustling through the 5th dimension of meme logic and frontend fire."

## 📜 L1c3ns3

This project is licensed under the Apache License 2.0.

---

*Crafted with conscious code & single-origin coffee* ☕✨