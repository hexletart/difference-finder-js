import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getValidPath = (ident) => ((ident) ? path.resolve(process.cwd(), ident) : null);
export const getFixturePath = (ident) => ((ident) ? path.join(__dirname, '../..', '__fixtures__', ident) : null);
