import { json, error } from '@sveltejs/kit';
import path from 'path';
import fs from 'fs';

async function main(file, url) {
  const sanitizedName = path.basename(file);
  const filePath = path.join(url, sanitizedName);
  
  try {
    if (!fs.existsSync(filePath)) throw error(404, 'File not found');
    
    const content = fs.readFileSync(filePath, 'utf-8');
    return json({ content });
  } catch {
    throw error(500, 'Error reading file content');
  }
}

export default main;