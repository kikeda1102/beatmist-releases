import yaml from "js-yaml";
import { z } from "zod";

const roadmapItemSchema = z.object({
  title: z.string(),
  title_en: z.string(),
  description: z.string(),
  description_en: z.string(),
  priority: z.enum(["high", "medium", "low"]),
});

const roadmapCategorySchema = z.object({
  id: z.string(),
  label: z.string(),
  label_en: z.string(),
  items: z.array(roadmapItemSchema),
});

const roadmapDataSchema = z.object({
  last_updated: z.string(),
  categories: z.array(roadmapCategorySchema),
});

export type RoadmapItem = z.infer<typeof roadmapItemSchema>;
export type RoadmapCategory = z.infer<typeof roadmapCategorySchema>;
export type RoadmapData = z.infer<typeof roadmapDataSchema>;

const ROADMAP_URL =
  "https://raw.githubusercontent.com/kikeda1102/beatmist-releases/main/roadmap.yml";

export async function fetchRoadmap(): Promise<RoadmapData> {
  const res = await fetch(ROADMAP_URL);
  if (!res.ok) throw new Error("Failed to fetch roadmap");
  const text = await res.text();
  const parsed = yaml.load(text);
  return roadmapDataSchema.parse(parsed);
}
