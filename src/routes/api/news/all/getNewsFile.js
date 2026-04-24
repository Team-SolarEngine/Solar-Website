import { json, error } from '@sveltejs/kit';
import path from 'path';

async function main(file, newsFiles) {
  if (!file) {
    throw error(400, 'File name is required');
  }

  const sanitizedName = path.basename(file);
  const newsEntry = Object.entries(newsFiles).find(([filePath]) => {
    return path.basename(filePath) === sanitizedName;
  });
  
  try {
    if (!newsEntry) {
      throw error(404, 'File not found');
    }

    const content = newsEntry[1];
    return json({ content });
  } catch (err) {
    if (err?.status) {
      throw err;
    }

    throw error(500, 'Error reading file content');
  }
}

export default main;
