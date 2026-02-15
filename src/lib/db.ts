import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = process.env.LEADS_TABLE_NAME ?? "cbp-leads";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION ?? "us-east-1",
});
const docClient = DynamoDBDocumentClient.from(client);

export interface LeadRow {
  name: string;
  phone: string;
  email: string;
  address?: string;
  project_type?: string;
  service_types?: string;
  rooms?: string;
  timeline?: string;
  budget?: string;
  description?: string;
  preferred_contact?: string;
  photo_urls?: string;
}

export async function insertLead(lead: LeadRow) {
  const item = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    created_at: new Date().toISOString(),
    status: "new",
    ...lead,
  };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
    }),
  );

  return item;
}
