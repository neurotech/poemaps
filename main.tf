# Locals
locals {
  app_bucket_name = "poemaps-bucket"
}

# S3 Bucket for frontend assets
resource "aws_s3_bucket" "poemaps_bucket" {
  bucket = local.app_bucket_name
}

resource "aws_s3_bucket_website_configuration" "poemaps_bucket" {
  bucket = aws_s3_bucket.poemaps_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_acl" "poemaps_bucket" {
  bucket = aws_s3_bucket.poemaps_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "poemaps_bucket" {
  bucket = aws_s3_bucket.poemaps_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource = [
          aws_s3_bucket.poemaps_bucket.arn,
          "${aws_s3_bucket.poemaps_bucket.arn}/*",
        ]
      },
    ]
  })
}

module "template_files" {
  source   = "hashicorp/dir/template" ## Template :: https://registry.terraform.io/modules/hashicorp/dir/template/latest
  base_dir = "./dist"
}

resource "aws_s3_object" "poemaps_files" {

  for_each = module.template_files.files

  bucket       = aws_s3_bucket.poemaps_bucket.id
  key          = each.key
  acl          = "public-read"
  content_type = each.value.content_type
  source       = each.value.source_path
  content      = each.value.content
  etag         = each.value.digests.md5
}
output "website" {
  value = aws_s3_bucket.poemaps_bucket.website_endpoint
}
