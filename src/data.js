import fs from 'fs';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readFile = (ident) => fs.readFileSync(path.resolve(process.cwd(), ident), 'utf-8');
const getFixturePath = (ident) => path.join(__dirname, '..', '__fixtures__', ident);

export { readFile, getFixturePath };
