import { error } from '@sveltejs/kit';
import getNewsFile from './all/getNewsFile.js'
import getNews from './all/getNews.js'

export async function GET({ url }) {
  const action = url.searchParams.get('act');
  const theURL = 'src/routes/api/news/file'
  
  if (action === 'getNews') {
    return await getNews(theURL);
  } else if (action === 'getNewsFile') {
    const fileName = url.searchParams.get('f');
    return await getNewsFile(fileName, theURL)
  }
  
  throw error(400, 'Invalid action');
}