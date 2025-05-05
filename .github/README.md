# GitHub Actions Workflows for Rizz Power Up

This directory contains GitHub Actions workflows for the Rizz Power Up project.

## Workflows

### Frontend CI/CD (`frontend-ci-cd.yml`)

This workflow handles the continuous integration and deployment of the frontend React application.

**Triggers:**
- Push to `main` branch (only files in `apps/frontend/` or the workflow file itself)
- Pull requests to `main` branch (only files in `apps/frontend/`)
- Manual trigger via GitHub Actions UI

**Jobs:**
1. **Build and Deploy:**
   - Checkout the repository
   - Set up Node.js and pnpm
   - Install dependencies
   - Lint the code
   - Build the application
   - Deploy to AWS S3 (only on push to `main`)
   - Invalidate CloudFront cache (only on push to `main`)

**Required Secrets:**
- `AWS_ACCESS_KEY_ID`: AWS access key with permissions to deploy to S3 and invalidate CloudFront
- `AWS_SECRET_ACCESS_KEY`: Corresponding AWS secret key
- `CLOUDFRONT_DISTRIBUTION_ID`: ID of the CloudFront distribution

### Deploy Application (`deploy-app.yml`)

This workflow deploys the application to AWS S3 when files outside the infrastructure directory are modified.

**Triggers:**
- Push to `main` branch (excluding changes to infrastructure files, deploy-infrastructure workflow, and markdown files)

**Jobs:**
1. **Build and Deploy Application:**
   - Checkout the repository
   - Set up Node.js and pnpm
   - Install dependencies
   - Build the application
   - Deploy to S3
   - Verify deployment
   - Invalidate CloudFront cache
   - Output deployment status and URLs

### Deploy Infrastructure (`deploy-infrastructure.yml`)

This workflow deploys infrastructure changes using OpenTofu when files in the infrastructure directory are modified.

**Triggers:**
- Push to `main` branch (only files in `infrastructure/`)

**Jobs:**
1. **Deploy Infrastructure:**
   - Checkout the repository
   - Set up OpenTofu
   - Plan infrastructure changes
   - Apply infrastructure changes
   - Wait for certificate validation
   - Check DNS propagation
   - Output deployment status

### Infrastructure Validation (`infrastructure-validation.yml`)

This workflow validates the Terraform/OpenTofu infrastructure configuration.

**Triggers:**
- Push to `main` branch (only files in `infrastructure/` or the workflow file itself)
- Pull requests to `main` branch (only files in `infrastructure/`)
- Manual trigger via GitHub Actions UI

**Jobs:**
1. **Validate:**
   - Checkout the repository
   - Set up OpenTofu
   - Initialize OpenTofu (without backend)
   - Validate the configuration
   - Check formatting

## Setting Up Required Secrets

To set up the required secrets for these workflows:

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Click on "New repository secret"
4. Add the following secrets:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
   - `CLOUDFRONT_DISTRIBUTION_ID`: Your CloudFront distribution ID

Note: The AWS credentials should have permissions to:
- Deploy to S3
- Create CloudFront invalidations
- Access ACM certificates
- Perform Route53 operations

## Local Testing

You can test the build process locally by running:

```bash
# Install dependencies
pnpm install

# Lint the frontend code
pnpm --filter rizz-power-up-frontend lint

# Build the frontend
pnpm --filter rizz-power-up-frontend build
```

For infrastructure validation:

```bash
cd infrastructure
tofu init -backend=false
tofu validate
tofu fmt -check