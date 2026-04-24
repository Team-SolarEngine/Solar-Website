import { json, error } from '@sveltejs/kit';
import path from 'path';

async function main(newsFiles) {
  try {
    const markdownFiles = Object.keys(newsFiles)
      .map((filePath) => path.basename(filePath))
      .sort();

    return json(markdownFiles);
  } catch (err) {
    console.error(err);
    throw error(500, 'Could not read the news directory');
  }
}

export default main;
