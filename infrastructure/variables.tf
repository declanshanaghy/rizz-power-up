# Variables for the Rizz Power Up infrastructure

# Variable for the root domain name
variable "root_domain_name" {
  description = "The root domain name for the website"
  type        = string
  default     = "firemandecko.com"
}

# Variable for the full domain name
variable "domain_name" {
  description = "The full domain name for the website"
  type        = string
  default     = "rizz-power-up.firemandecko.com"
}