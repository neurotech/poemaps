# Providers
provider "aws" {
  region = "ap-southeast-2"
}

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
