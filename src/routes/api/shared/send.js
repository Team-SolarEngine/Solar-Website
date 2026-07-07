import { DISCORD_WEBHOOK } from '$env/static/private'

export async function sendUrl(req) {
  try {
    const response = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `# New share submission\n**Github URL**; ${req}`,
      })
    })

    if (!response.ok) {
      const errorText = await response.text();
      return `Discord API responded with status ${response.status}: ${errorText}`
    }

    return "Successfully dispatched Discord's webhook."
  } catch (e) {
    return err.message
  }
}

export default sendUrl;