# Directory submission payload

Name: Converra

One-line: Fix production agent behavior with tested changes and a production verdict on every fix.

Converra fixes the behavior, not the code. It reads production conversations, diagnoses failures at the step they happened, generates a bounded prompt or configuration fix, tests it head-to-head against the current agent in simulation, ships what the customer approves, and reports a production verdict on every fix: verified, not fixed, or confounded.

Converra (converra.ai), not Convera.

Remote endpoint: https://converra.ai/api/mcp
Transport: Streamable HTTP
Authentication: OAuth for interactive clients; Authorization: Bearer API_KEY for unattended clients. Confirm the tenant during OAuth and use a least-privilege API key.

Docs: https://converra.ai/docs/mcp/coding-agents
Repository: https://github.com/converra/converra-agent-kit

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

## Tools from the public catalog

`list_agents`, `create_agent`, `update_agent`, `get_agent_status`, `trigger_optimization`, `get_optimization_details`, `list_optimizations`, `get_variant_details`, `apply_variant`, `stop_optimization`, `get_insights`, `get_run_insights`, `regenerate_run_insights`, `batch_regenerate_insights`, `refresh_agent_analysis`, `refresh_agent_insights`, `list_runs`, `get_run`, `create_run`, `list_personas`, `create_persona`, `simulate_agent`, `analyze_agent`, `simulate_ab_test`, `regression_test`, `get_account`, `get_settings`, `update_settings`, `list_integrations`, `sync_runs`, `list_webhooks`, `create_webhook`, `delete_webhook`, `get_integration_guide`, `verify_integration`, `get_deployment_impact`, `get_run_step_diagnosis`, `get_step_failure_aggregation`, `get_regression_suite`

Tool availability and permission depend on account and key scope. This catalog is public documentation, not a live audit of tools.
