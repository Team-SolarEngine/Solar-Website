import { error } from '@sveltejs/kit';
import getMarkdownFile from './all/getMarkdownFile.js'
import getMarkdowns from './all/getMarkdowns.js'

export async function GET({ url }) {
  const action = url.searchParams.get('act');
  const type = url.searchParams.get('type'); // either news or wiki

  /** @type {Record<string, string> | undefined} */
  let markdownFiles;
  if (type === 'news') {
    markdownFiles = /** @type {Record<string, string>} */ (import.meta.glob('/static/news/*.md', {
      eager: true,
      query: '?raw',
      import: 'default'
    }));
  } else if (type === 'wiki') {
    markdownFiles = /** @type {Record<string, string>} */ (import.meta.glob('/static/wiki/*.md', {
      eager: true,
      query: '?raw',
      import: 'default'
    }));
  }
  
  if (!markdownFiles) {
    throw error(400, 'Invalid type parameter');
  }

  if (action === 'getMarkdowns') {
    return await getMarkdowns(markdownFiles);
  } else if (action === 'getMarkdownFile') {
    const fileName = url.searchParams.get('f');
    if (!fileName) {
      throw error(400, 'File name is required');
    }
    return await getMarkdownFile(fileName, markdownFiles)
  }

  throw error(400, 'Invalid action');
}
