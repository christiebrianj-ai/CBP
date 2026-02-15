#!/usr/bin/env bash
# Creates the DynamoDB table for storing leads.
# Run once before first deploy:
#   chmod +x scripts/create-dynamodb-table.sh
#   ./scripts/create-dynamodb-table.sh

set -euo pipefail

TABLE_NAME="${LEADS_TABLE_NAME:-cbp-leads}"
REGION="${AWS_REGION:-us-east-1}"

echo "Creating DynamoDB table '$TABLE_NAME' in region '$REGION'..."

aws dynamodb create-table \
  --table-name "$TABLE_NAME" \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
  --key-schema \
    AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region "$REGION"

echo "Done. Table '$TABLE_NAME' created."
