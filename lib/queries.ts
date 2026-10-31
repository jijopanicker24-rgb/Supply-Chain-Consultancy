import "server-only";

import { sql } from "./db";

// Read-only queries for the public pages. Each returns null when the database
// can't be reached, so pages can show a friendly message instead of crashing.
// Single-row getters return undefined when the row doesn't exist (→ 404).

export type Service = {
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  icon: string | null;
  benefits: string[];
};

export type Industry = {
  slug: string;
  name: string;
  description: string;
  key_challenges: string[];
  icon: string | null;
  case_study_count: number;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client_name: string;
  industry_slug: string | null;
  industry_name: string | null;
  challenge: string;
  solution: string;
  results: string;
  metric_label: string | null;
  metric_value: string | null;
  cover_image_url: string | null;
  published_at: Date | string;
};

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author_name: string;
  read_minutes: number;
  cover_image_url: string | null;
  published_at: Date | string;
};

export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string[];
  posted_at: Date | string;
};

async function safe<T>(label: string, run: () => Promise<T>): Promise<T | null> {
  try {
    return await run();
  } catch (error) {
    console.error(`[db] ${label} failed:`, error);
    return null;
  }
}

// Services

export const getServices = () =>
  safe("getServices", () => sql<Service>`
    SELECT slug, title, short_description, full_description, icon, benefits
    FROM services WHERE is_active ORDER BY display_order, title`);

export const getService = (slug: string) =>
  safe("getService", async () => (await sql<Service>`
    SELECT slug, title, short_description, full_description, icon, benefits
    FROM services WHERE slug = ${slug} AND is_active`)[0] ?? undefined);

// Industries

export const getIndustries = () =>
  safe("getIndustries", () => sql<Industry>`
    SELECT i.slug, i.name, i.description, i.key_challenges, i.icon, count(c.id)::int AS case_study_count
    FROM industries i LEFT JOIN case_studies c ON c.industry_id = i.id
    GROUP BY i.id ORDER BY i.display_order, i.name`);

// Case studies

export const getCaseStudies = (industrySlug?: string) =>
  safe("getCaseStudies", () => sql<CaseStudy>`
    SELECT c.slug, c.title, c.client_name, i.slug AS industry_slug, i.name AS industry_name,
           c.challenge, c.solution, c.results, c.metric_label, c.metric_value, c.cover_image_url, c.published_at
    FROM case_studies c LEFT JOIN industries i ON i.id = c.industry_id
    WHERE ${industrySlug ?? null}::text IS NULL OR i.slug = ${industrySlug ?? null}
    ORDER BY c.is_featured DESC, c.published_at DESC`);

export const getFeaturedCaseStudies = (limit = 3) =>
  safe("getFeaturedCaseStudies", () => sql<CaseStudy>`
    SELECT c.slug, c.title, c.client_name, i.slug AS industry_slug, i.name AS industry_name,
           c.challenge, c.solution, c.results, c.metric_label, c.metric_value, c.cover_image_url, c.published_at
    FROM case_studies c LEFT JOIN industries i ON i.id = c.industry_id
    ORDER BY c.is_featured DESC, c.published_at DESC LIMIT ${limit}`);

export const getCaseStudy = (slug: string) =>
  safe("getCaseStudy", async () => (await sql<CaseStudy>`
    SELECT c.slug, c.title, c.client_name, i.slug AS industry_slug, i.name AS industry_name,
           c.challenge, c.solution, c.results, c.metric_label, c.metric_value, c.cover_image_url, c.published_at
    FROM case_studies c LEFT JOIN industries i ON i.id = c.industry_id
    WHERE c.slug = ${slug}`)[0] ?? undefined);

// Insights

export const INSIGHT_CATEGORIES = ["Demand Planning", "Inventory", "Logistics", "Procurement", "Technology", "Sustainability"] as const;

export const getInsights = (category?: string) =>
  safe("getInsights", () => sql<Insight>`
    SELECT slug, title, excerpt, content, category, author_name, read_minutes, cover_image_url, published_at
    FROM insights
    WHERE is_published AND published_at <= now() AND (${category ?? null}::text IS NULL OR category = ${category ?? null})
    ORDER BY published_at DESC`);

export const getInsight = (slug: string) =>
  safe("getInsight", async () => (await sql<Insight>`
    SELECT slug, title, excerpt, content, category, author_name, read_minutes, cover_image_url, published_at
    FROM insights WHERE slug = ${slug} AND is_published AND published_at <= now()`)[0] ?? undefined);

export const getRelatedInsights = (slug: string, category: string, limit = 2) =>
  safe("getRelatedInsights", () => sql<Insight>`
    SELECT slug, title, excerpt, content, category, author_name, read_minutes, cover_image_url, published_at
    FROM insights
    WHERE is_published AND published_at <= now() AND slug <> ${slug}
    ORDER BY (category = ${category}) DESC, published_at DESC LIMIT ${limit}`);

// Careers

export const getOpenJobs = () =>
  safe("getOpenJobs", () => sql<Job>`
    SELECT slug, title, department, location, employment_type, description, requirements, posted_at
    FROM job_openings WHERE is_open ORDER BY posted_at DESC`);

export const getOpenJob = (slug: string) =>
  safe("getOpenJob", async () => (await sql<Job>`
    SELECT slug, title, department, location, employment_type, description, requirements, posted_at
    FROM job_openings WHERE slug = ${slug} AND is_open`)[0] ?? undefined);

// Helpers

export const formatDate = (value: Date | string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Dubai" }).format(new Date(value));
