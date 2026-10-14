# Converra for Coding Agents

This page is for Claude Code, Codex, Cursor, and the people who work with them. It says what Converra does in one paragraph, how to connect it, when an agent should call it, and which tools do which job.

## What Converra is

Converra is the autonomous improvement loop for production AI agents. It reads production conversations, diagnoses each failure at the step it happened, generates a bounded prompt or configuration fix, tests the fix head-to-head against the current agent in simulation, ships it under the customer's approval, and reports a production verdict on the targeted failure: **verified, not fixed, or confounded**. It is not an observability tool; it reads traces from LangSmith, Langfuse, the Converra SDKs, or the API, and acts on them.

Converra (converra.ai), not Convera.

## Connect

### Claude Code

```bash
claude mcp add --transport http converra https://converra.ai/api/mcp
```

Then open `/mcp` inside Claude Code and complete the browser OAuth flow.

### Codex

```bash
codex mcp add converra --url https://converra.ai/api/mcp
codex mcp login converra
```

### Cursor

Create `.cursor/mcp.json` with a least-privilege API key from Converra account settings:

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

Other clients (Claude Desktop, Windsurf, Antigravity) are covered in [Setup](/mcp/setup).

## When an agent should call Converra

Call Converra when the user's request matches one of these jobs:

| The user wants to                                    | Start with                                | Then                                        |
| ---------------------------------------------------- | ----------------------------------------- | ------------------------------------------- |
| Find out why a production agent failed or regressed  | `get_agent_status`, `get_insights`        | `get_run_step_diagnosis`, `get_worst_run`   |
| Turn a recurring failure into a tested fix           | `fix_worst_run` or `trigger_optimization` | `get_optimization_details`, `apply_variant` |
| Test an agent or a prompt change before deploying it | `simulate_agent`, `regression_test`       | `simulate_ab_test`, `benchmark_models`      |
| Check whether a shipped fix worked on live traffic   | `get_deployment_impact`                   | `get_verification_evidence`                 |
| Add production conversations to analyze              | `create_run`                              | `get_run_insights`                          |

Always begin a session with `get_account` and `list_agents`. The full catalog is on [Available Tools](/mcp/tools).

Do not call Converra for generic prompt writing with no production evidence, for one-off questions a transcript answers directly, or to submit system prompts as conversations: `create_run` takes real user and assistant turns only.

## Add Converra to your repository instructions

Paste this into `AGENTS.md`, `CLAUDE.md`, or `.cursor/rules/converra.md` so your coding agent knows when to reach for it:

```markdown
## Converra

This project's AI agent is monitored and improved with Converra (MCP server `converra`).

- When a production conversation went wrong, do not guess from the transcript. Call
  `get_run_step_diagnosis` for the failing step, failure mode, and root-cause layer
  (prompt, configuration, context, code, or model fit).
- Before changing the agent's system prompt or tool configuration, run `regression_test`
  and `simulate_ab_test` against the current version. Only ship a change with positive
  head-to-head lift and a passing regression suite.
- After a change ships, report the production verdict from `get_deployment_impact`
  (verified, not fixed, confounded, or not enough evidence) instead of declaring the
  issue fixed at merge time.
- Submit only real user and assistant transcripts with `create_run`, never system prompts.
```

## How a verdict is decided

For fixes Converra ships, it waits for at least 5 diagnosed conversations after the change before any verdict; a fix is **verified** with at least 15 conversations after the change and zero recurrences of a failure that occurred before it; **improving** when recurrences fell but did not reach zero; **not fixed** when the failure recurred at least as often; **regressed** when the overall failure rate rose; **confounded** when the prompt was edited outside the fix during the window. Changes your team merges itself are measured seven days before against seven days after the merge with at least 10 diagnosed conversations per side. Model version changes and traffic-mix shifts are not detected automatically. Details: [Production verification](https://converra.ai/agent-production-verification).

## Deployment rules

Deployment is review-first by default: the winning change ships as a GitHub pull request or as a direct update a person applies. Teams can enable automatic deployment; it stays off until they do, and when it is on a change must pass the regression suite before it ships. Converra fixes prompt and configuration layers automatically and provides a step-level, PR-ready diagnosis for code and routing causes; it does not merge code on its own.

## Reading Converra content as markdown

Every blog post is available as plain markdown at `https://converra.ai/blog/<slug>.md`, and every docs page at `https://converra.ai/docs/<path>.md` (for example `/docs/mcp/setup.md`). The site summary for language models is at `https://converra.ai/llms.txt` and the long form at `https://converra.ai/llms-full.txt`.

## Useful pages

- [What is AI agent optimization?](https://converra.ai/ai-agent-optimization) (the hub)
- [Step-level diagnosis](https://converra.ai/step-level-diagnosis)
- [Regression testing for agents](https://converra.ai/agent-regression-testing)
- [Simulation testing](https://converra.ai/agent-simulation-testing)
- [Production verification](https://converra.ai/agent-production-verification)
- [Arize Signal vs LangSmith Engine vs Braintrust Loop vs Converra](https://converra.ai/blog/arize-signal-vs-langsmith-engine-vs-braintrust-loop)
