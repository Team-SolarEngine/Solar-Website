import { json, error } from '@sveltejs/kit';
import path from 'path';

/** @param {Record<string, string>} markdownFile */
async function main(markdownFile) {
  try {
    const markdownFiles = Object.keys(markdownFile)
      .map((filePath) => path.basename(filePath))
      .sort();

    return json(markdownFiles);
  } catch (err) {
    console.error(err);
    throw error(500, 'Could not read the news directory');
  }
}

export default main;
