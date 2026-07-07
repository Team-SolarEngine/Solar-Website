import { error, json } from '@sveltejs/kit';
import fetchGithub from './fetch.js';
import sendUrl from './send.js';

export async function GET({ url }) {
  const repo = url.searchParams.get('repo')
  if (!repo) throw error(400, "Invalid action")
  const result = await fetchGithub(repo)
  return json(result)
}

export async function POST({ request }) {
  const { send } = await request.json();
  if (!send) throw error(400, "Invalid action")
  const result = await sendUrl(send)
  return json(result)
}