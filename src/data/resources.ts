import { EsperantoResource } from '../types';
import { PART1_RESOURCES } from './resources_part1';
import { PART2_RESOURCES } from './resources_part2';
import { PART3_RESOURCES } from './resources_part3';
import { PART4_RESOURCES } from './resources_part4';

/**
 * Serĉilo Curated Esperanto Resource Database
 * Complete index of 300+ authentic, verified Esperanto resources
 * categorized across courses, tools, media, literature, news, and community.
 */
export const ESPERANTO_RESOURCES: EsperantoResource[] = [
  ...PART1_RESOURCES,
  ...PART2_RESOURCES,
  ...PART3_RESOURCES,
  ...PART4_RESOURCES,
];
