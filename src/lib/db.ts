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
    status: "new" as const,
    ...lead,
  };

  // Log the lead so it's captured in Vercel's function logs.
  // You can view all leads at: Vercel Dashboard → your project → Logs
  console.log("NEW_LEAD:", JSON.stringify(item, null, 2));

  return item;
}
