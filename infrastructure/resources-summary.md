# R1zz P0w3r Up 1nfr4structur3 R3s0urc3s ☁️🔧

## S3 Buck3t 🗄️
- **Name**: rizz-power-up-firemandecko
- **Region**: us-east-1 (default region)
- **ARN**: arn:aws:s3:::rizz-power-up-firemandecko
- **Website URL**: http://rizz-power-up-firemandecko.s3-website-us-east-1.amazonaws.com

## W3bs1t3 C0nf1gur4t10n 🌐
```json
{
    "IndexDocument": {
        "Suffix": "index.html"
    },
    "ErrorDocument": {
        "Key": "index.html"
    }
}
```

## Buck3t P0l1cy 🔒
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "CloudFrontReadGetObject",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity [OAI_ID]"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::rizz-power-up-firemandecko/*"
        }
    ]
}
```

## Publ1c 4cc3ss Bl0ck C0nf1gur4t10n 🛡️
```json
{
    "BlockPublicAcls": false,
    "IgnorePublicAcls": false,
    "BlockPublicPolicy": false,
    "RestrictPublicBuckets": false
}
```

## Cl0udFr0nt D1str1but10n ☁️
- **Domain**: rizz-power-up.firemandecko.com
- **Aliases**: rizz-power-up.firemandecko.com, www.rizz-power-up.firemandecko.com
- **Origin**: S3 bucket (rizz-power-up-firemandecko)
- **Origin Access Identity**: Used to secure S3 bucket access
- **Default Root Object**: index.html
- **Price Class**: PriceClass_100 (North America and Europe edge locations)
- **SSL Certificate**: ACM Certificate for rizz-power-up.firemandecko.com
- **Custom Error Response**: 404 errors return index.html with 200 status code (for SPA routing)

## R0ut3 53 4nd DNS 🌐
- **Hosted Zone**: firemandecko.com
- **DNS Records**:
  - rizz-power-up.firemandecko.com -> CloudFront distribution
  - www.rizz-power-up.firemandecko.com -> CloudFront distribution

## SSL/TLS C3rt1f1c4t3 🔐
- **Domain**: rizz-power-up.firemandecko.com
- **Alternative Names**: www.rizz-power-up.firemandecko.com
- **Validation Method**: DNS
- **Region**: us-east-1 (required for CloudFront)

## 3st1m4t3d C0sts 💰

| Service | Estimated Monthly Cost |
|---------|------------------------|
| S3 Standard Storage | ~$0.023 per GB (likely < $0.01 for small app) |
| S3 GET Requests | $0.0004 per 1,000 requests |
| S3 PUT Requests | $0.005 per 1,000 requests (only during deployment) |
| CloudFront Data Transfer | $0.085 per GB (first 10TB) |
| CloudFront Requests | $0.01 per 10,000 HTTPS requests |
| Route 53 Hosted Zone | $0.50 per hosted zone |
| ACM Certificate | Free |

**Total Estimated Monthly Cost**: $1-5 for low traffic sites

## D3pl0ym3nt Pr0c3ss 🚀

The application is deployed automatically using GitHub Actions workflows:

1. **Infrastructure Deployment** (.github/workflows/deploy-infrastructure.yml):
   - Triggered when files in the infrastructure/ directory change
   - Uses OpenTofu to apply infrastructure changes
   - Waits for certificate validation and DNS propagation

2. **Application Deployment** (.github/workflows/deploy-app.yml):
   - Triggered when application files change
   - Builds the application using pnpm
   - Deploys the built files to S3
   - Invalidates the CloudFront cache to ensure the latest content is served
   - Verifies the deployment

## Cl0udFr0nt C4ch3 1nv4l1d4t10n 🔄

When new content is deployed to S3, the CloudFront cache is invalidated to ensure the latest content is served to users. This is done automatically as part of the GitHub Actions workflow.

To manually invalidate the CloudFront cache:

```bash
# Get the CloudFront distribution ID
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?contains(@, 'rizz-power-up.firemandecko.com')]].Id" --output text --profile rizz-power-up)

# Create invalidation for all files
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" --profile rizz-power-up
```

## Tr0ubl3sh00t1ng 🔍

If you encounter 403 Forbidden errors from CloudFront:

1. Check that the S3 bucket policy allows access from the CloudFront Origin Access Identity
2. Verify that the CloudFront distribution is properly configured to use the OAI
3. Ensure that the CloudFront cache has been invalidated after deploying new content
4. Check the CloudFront distribution status in the AWS Console

---

*Crafted with conscious code & single-origin coffee* ☕✨

## 📚 Documentation

For complete project documentation, please see the [Table of Contents](../TOC.md) which provides links to all documentation files in this project.