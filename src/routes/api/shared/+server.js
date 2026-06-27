import { error, json } from '@sveltejs/kit';
import { GITHUB_API_KEY } from '$env/static/private'

export async function GET({ url }) {
  const repo = url.searchParams.get('repo')
  if (!repo) throw error(400, "Invalid action")
  const result = await fetchGithub(repo)
  return json(result)
}

async function fetchGithub(repo) {
  //                            https://api.github.com/repos/Team-SolarEngine/test-repo/contents/.solar-engine
  const response = await fetch(`https://api.github.com/repos/${repo}/contents/.solar-engine`, {
    headers: {
      "Authorization": `Bearer ${GITHUB_API_KEY}`,
    }
  })
  if (!response.ok) return console.error("Couldn't fetch github files!")
  const data = await response.json()
  
  const files = data.map(file => file.name)
  const filesNeeded = ["banner.png", "config.json", "logo.png", "readme.md"]
  const exists = filesNeeded.every(file => files.includes(file))
  
  if (exists) {
    function getFileData(submitter, filename, type) {
      return fetchFile(submitter, ".solar-engine", filename, type)
    }
    
    const banner = await getFileData(repo, "banner.png", "src")
    const logo = await getFileData(repo, "logo.png", "src")
    const config = await getFileData(repo, "config.json", "json")
    const readme = await getFileData(repo, "readme.md", "text")
    
    return { banner, logo, config, readme }
  } else {
    return "One of the file doesn't exist in the directory!"
  }
}

async function fetchFile(repo, path, filename, type) {
  const url = `https://raw.githubusercontent.com/${repo}/main/${path}/${filename}`
  
  if (type == "text" || type == "json") {
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${GITHUB_API_KEY}`,
      }
    })
    if (!response.ok) return `Couldn't fetch ${filename}!`
    
    if (type == "text") {
      const data = await response.text()
      return data
    } else {
      const data = await response.json()
      return data
    }
  } else if (type == "src") {
    return url
  }
}
