import { error } from '@sveltejs/kit';
import org from './fetchers/org.js'
import repos from './fetchers/repos.js'

export async function GET({ url }) {
  const type = url.searchParams.get('type'); // either repos or orgs

  if (type === 'org') {
    return await org();
  } else if (type === 'repos') {
    return await repos();
  }

  throw error(400, 'Invalid action');
}
