import { writeFileSync } from 'fs';
import { generateSitemap } from '../src/utils/generateSitemap.js';

writeFileSync('public/sitemap.xml', generateSitemap());
