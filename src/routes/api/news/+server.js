import { error } from '@sveltejs/kit';
import getNewsFile from './all/getNewsFile.js'
import getNews from './all/getNews.js'

const newsFiles = import.meta.glob('/static/news/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

export async function GET({ url }) {
  const action = url.searchParams.get('act');

  if (action === 'getNews') {
    return await getNews(newsFiles);
  } else if (action === 'getNewsFile') {
    const fileName = url.searchParams.get('f');
    return await getNewsFile(fileName, newsFiles)
  }

  throw error(400, 'Invalid action');
}
