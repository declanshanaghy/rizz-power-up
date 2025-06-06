# Phase 1: ACM Certificate for rizz-power-up.firemandecko.com
resource "aws_acm_certificate" "cert" {
  domain_name               = "rizz-power-up.firemandecko.com"
  subject_alternative_names = ["www.rizz-power-up.firemandecko.com"]
  validation_method         = "DNS"

  # ACM certificates for CloudFront must be in us-east-1 region
  provider = aws.us_east_1

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name        = "rizz-power-up-certificate"
    Environment = "production"
  }
}

# CloudFront Origin Access Identity to secure S3 bucket
resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for rizz-power-up.firemandecko.com"
}

# Output the certificate validation records
output "certificate_validation_records" {
  value = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }
  description = "DNS records needed for certificate validation"
}

output "acm_certificate_arn" {
  value       = aws_acm_certificate.cert.arn
  description = "ARN of the ACM certificate"
}

output "custom_domain" {
  value       = "https://rizz-power-up.firemandecko.com"
  description = "Custom domain with HTTPS (will be available after CloudFront setup)"
}