import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const distDir = 'dist';
const indexPath = join(distDir, 'index.html');
const fallbackPath = join(distDir, '404.html');

if (existsSync(indexPath)) {
  copyFileSync(indexPath, fallbackPath);
}
