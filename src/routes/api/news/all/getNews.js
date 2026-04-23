import { json, error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

async function main(url) {
  try {
    const dirPath = path.resolve(url);
    const files = fs.readdirSync(dirPath);
    
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    return json(markdownFiles);
  } catch (err) {
    console.error(err);
    throw error(500, 'Could not read the news directory');
  }
}

export default main;