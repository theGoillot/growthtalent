export { linkedInSource } from "./linkedin";
export { wttjSource } from "./wttj";
export { wellfoundSource } from "./wellfound";
export { zipRecruiterSource } from "./ziprecruiter";
export type { ScraperSource, ScraperSearchConfig } from "./types";

import { linkedInSource } from "./linkedin";
import { wttjSource } from "./wttj";
import { wellfoundSource } from "./wellfound";
import { zipRecruiterSource } from "./ziprecruiter";
import type { ScraperSource } from "./types";

/** All active scraper sources */
export const ALL_SOURCES: ScraperSource[] = [
  linkedInSource,
  wttjSource,
  wellfoundSource,
  zipRecruiterSource,
];
