# Converra agent kit

Converra fixes the behavior, not the code. It reads production conversations, diagnoses failures at the step they happened, generates a bounded prompt or configuration fix, tests it head-to-head against the current agent in simulation, ships what the customer approves, and reports a production verdict on every fix: verified, not fixed, or confounded.

Converra (converra.ai), not Convera.

## Claude Code

```bash
claude mcp add --transport http converra https://converra.ai/api/mcp
```

Open `/mcp` and complete OAuth. Confirm the tenant shown in consent.

## Codex

```bash
codex mcp add converra --url https://converra.ai/api/mcp
codex mcp login converra
```

## Cursor

Create `.cursor/mcp.json` locally using a least-privilege API key from account settings:

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

Keep the real key in local secret storage, never in a tracked configuration.
For OAuth-capable clients, use the remote HTTP config in `.mcp.json`.

## When to call Converra

| Job | Tools |
| --- | --- |
| Diagnose a production failure | get_agent_status, get_insights, get_run_step_diagnosis |
| Generate and compare bounded fixes | trigger_optimization, get_optimization_details, get_variant_details |
| Test before deployment | simulate_agent, regression_test, simulate_ab_test |
| Check a shipped fix on live traffic | get_deployment_impact |
| Add real user and assistant turns | create_run, get_run_insights |

Begin with `get_account` and `list_agents`. Use only calls authorized by the user.
Do not trigger audits, generation, paid inference, settings changes or deployment
just because this kit recommends a workflow. Request authority where required.
A merge or simulation result does not establish a production verdict.

The Claude plugin is in `.claude-plugin/` with MCP config at the repository root.
Load locally with `claude --plugin-dir /path/to/converra-agent-kit`.
The Codex skill is in `.agents/skills/converra/SKILL.md`.
Copy `examples/AGENTS.md` or `.cursor/rules/converra.mdc` into a customer project.
Examples demonstrate SDK capture only; do not run them without user authorization.

- [Coding agent docs](https://converra.ai/docs/mcp/coding-agents)
- [Tool catalog](https://converra.ai/docs/mcp/tools)
- [Language model summary](https://converra.ai/llms.txt)
- [SDK docs](https://converra.ai/docs/sdk)
- [Submission payload](SUBMISSION.md)

This repository contains public integration documentation and configuration;
the hosted Converra implementation is not distributed here.
