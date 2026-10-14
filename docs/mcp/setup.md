# Setting Up Converra

## 1. Connect with native OAuth

### Codex

```bash
codex mcp add converra --url https://converra.ai/api/mcp
codex mcp login converra
```

Sign in to Converra and confirm the exact tenant shown during consent.
Interactive access tokens expire after one hour. Compatible clients rotate
refresh tokens within a 30-day grant. Re-run `codex mcp login converra` if the
grant expires, is revoked, or the client asks you to authenticate again.

### Claude Code

```bash
claude mcp add --transport http converra https://converra.ai/api/mcp
```

Open `/mcp` inside Claude Code and complete the browser OAuth flow.

Converra rotates public-client refresh tokens. Reuse of a consumed refresh
token revokes the active token family and requires a fresh browser login.

Clients registered before refresh support must register again to receive a
refresh token. Confirm the exact tenant whenever a new browser login appears.

## 2. Start using it

**Upload your prompt and runs:**
> "Here's my prompt: [paste your prompt]. I'm using GPT-4o."

> "Here are some real runs from my AI agent: [paste transcripts]"

**Analyze your prompt:**
> "Analyze my prompt and tell me what's working and what could be improved"

**Optimize it:**
> "Optimize my prompt and show me the results"

---

## API-key setup for machine-to-machine integrations

For unattended services or clients without native OAuth, create a
least-privilege API key in Converra account settings and keep it in a secret
manager. Do not paste keys into chat prompts.

::: details Cursor
Create `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "converra": {
      "url": "https://converra.ai/api/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_KEY" }
    }
  }
}
```
:::

::: details Claude Desktop
Add to your config file:

```json
{
  "mcpServers": {
    "converra": {
      "url": "https://converra.ai/api/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_KEY" }
    }
  }
}
```

Config locations:
- **Mac:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
:::

::: details Windsurf
```json
{
  "mcpServers": {
    "converra": {
      "serverType": "sse",
      "url": "https://converra.ai/api/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_KEY" }
    }
  }
}
```
:::

::: details Claude Code
```bash
claude mcp add --transport http converra https://converra.ai/api/mcp
```

Authenticate from `/mcp` in Claude Code. Use the API-key configurations above
only for a client or service that cannot complete OAuth.
:::

::: details AntiGravity (Gemini)
Edit `~/.gemini/antigravity/mcp_config.json`:

```json
{
  "mcpServers": {
    "converra": {
      "url": "https://converra.ai/api/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_KEY" }
    }
  }
}
```
:::
