import { json, error } from '@sveltejs/kit';
import path from 'path';

async function main(markdownFile, isNews) {
  try {
    const markdownFiles = Object.keys(markdownFile)
      .map((filePath) => path.basename(filePath))
      .sort();

    if (isNews) {
      const toNum = (s) => {
        const cleaned = s.replace(/(\d+)(?:st|nd|rd|th)/, '$1');
        return Date.parse(cleaned);
      };

      const articles = Object.entries(markdownFile).map(([filePath, content]) => {
        const lines = content.split('\n');
        let dateStr = null;
        for (const line of lines) {
          const match = line.match(/\*{0,2}Date\*{0,2}\s*:\s*(.+?)(?:\s*<br\s*\/?\s*>)?\s*$/i);
          if (match) {
            dateStr = match[1].trim();
            break;
          }
        }
        return { file: path.basename(filePath), dateStr: dateStr || '' };
      });

      articles.sort((a, b) => toNum(b.dateStr) - toNum(a.dateStr));
      return json(articles);
    }

    return json(markdownFiles);
  } catch (err) {
    console.error('getMarkdowns error:', err);
    throw error(500, err.message || 'Could not read the news directory');
  }
}

export default main;
