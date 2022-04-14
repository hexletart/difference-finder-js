import fs from 'fs';
import path from 'path';
import process from 'process';

export default (ident) => JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ident), 'utf-8'));
