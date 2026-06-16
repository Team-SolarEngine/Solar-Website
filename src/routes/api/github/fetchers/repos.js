import { GITHUB_API_KEY } from '$env/static/private'

const url = "https://api.github.com/orgs/Team-SolarEngine/repos"
export async function main() {
  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${GITHUB_API_KEY}`,
        "Accept": "application/vnd.github+json",
        "User-Agent": "daveberrys"
      }
    })
    const data = await response.json()

    if (!Array.isArray(data)) { return new Response(JSON.stringify({ error: 'Expected array from GitHub API' }), { status: 500 }) }

    return new Response(JSON.stringify({
      data: data.filter((repo) => !repo.private).map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      })).filter((repo) => repo.name != ".github")
    }))
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

export default main;