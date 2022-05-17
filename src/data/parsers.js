import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filePath) => {
  if (!filePath) return `${filePath}`;
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const fileExt = path.extname(filePath);
  if (fileExt === '.json') return JSON.parse(fileData);
  if (fileExt === '.yaml' || fileExt === '.yml') return yaml.load(fileData);
  return null;
};
