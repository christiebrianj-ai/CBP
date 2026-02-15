import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "leads.db");

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT,
        project_type TEXT,
        service_types TEXT,
        rooms TEXT,
        timeline TEXT,
        budget TEXT,
        description TEXT,
        preferred_contact TEXT,
        photo_urls TEXT,
        status TEXT NOT NULL DEFAULT 'new'
      );
    `);
  }
  return db;
}

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

export function insertLead(lead: LeadRow) {
  const stmt = getDb().prepare(`
    INSERT INTO leads (name, phone, email, address, project_type, service_types, rooms, timeline, budget, description, preferred_contact, photo_urls)
    VALUES (@name, @phone, @email, @address, @project_type, @service_types, @rooms, @timeline, @budget, @description, @preferred_contact, @photo_urls)
  `);
  return stmt.run(lead);
}
