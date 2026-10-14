# Available Tools

All Converra MCP tools with examples and common use cases.

## Agents

### `list_agents`

List all your agents.

**You say:** "Show me my agents"

**Response:**
```
Found 3 agents:
- Customer Support (gpt-4o) - Active
- Sales Assistant (gpt-4o) - Active
- Code Review (claude-3.5-sonnet) - Draft
```

### `create_agent`

Create a new agent. Requires: `name`, `content` (the agent's system prompt), `llmModel`.

**You say:** "Create a customer support agent for gpt-4o"

**Example with full content:**
```
Create an agent with:
- name: "Customer Support Agent"
- llmModel: "gpt-4o"
- content: "You are a helpful customer support agent. Be friendly,
  concise, and always try to resolve issues on first contact."
- description: "Main support chatbot"
- tags: ["support", "production"]
```

**Supported models (examples):** `gpt-4o`, `gpt-4.1`, `gpt-4o-mini`, `gpt-o3`, `o4-mini`, `o1-mini`, `claude-3.5-sonnet`, `claude-sonnet-4`, `claude-opus-4`, `gemini-2.5-pro`, `gemini-2.5-flash`

### `update_agent`

Update an existing agent's system prompt or settings.

**You say:** "Update my support agent to be more friendly"

**Example:**
```
Update agent abc123:
- content: "You are an exceptionally friendly customer support agent..."
```

### `get_agent_status`

Get details about a specific agent including performance metrics.

**You say:** "Show details for my support agent"

**Response:**
```
Agent: Customer Support Agent
Model: gpt-4o
Status: Active
Runs: 1,247
Last optimized: 3 days ago
Performance: 87% task completion
```

---

## Optimization

### `trigger_optimization`

Start an optimization to improve your agent.

**You say:** "Optimize my support agent with 3 variants"

**Full example:**
```
Optimize agent abc123:
- mode: "exploratory"  (or "validation" for statistical rigor)
- variantCount: 3
- intent:
  - targetImprovements: ["clarity", "task completion"]
  - hypothesis: "Adding examples will help users understand better"
```

**What happens:**
1. Converra generates variant prompts
2. Simulates runs with AI personas
3. Evaluates which variant performs best
4. Reports results with improvement percentages

### `get_optimization_details`

Check progress and results of an optimization.

**You say:** "How's my optimization going?"

**Response (in progress):**
```
Optimization abc123
Status: Running (Iteration 2/5)
Progress: Simulating runs...
Variants: 3 being tested
```

**Response (complete):**
```
Optimization abc123
Status: Complete
Winner: Variant B
Improvement: +23% task completion, +15% clarity
Recommendation: Apply Variant B
```

### `list_optimizations`

See recent optimization runs.

**You say:** "Show my recent optimizations"

**Response:**
```
Recent optimizations:
1. Customer Support - Completed 2h ago - Variant B won (+23%)
2. Sales Assistant - Running - Iteration 3/5
3. Code Review - Completed yesterday - No clear winner
```

### `get_variant_details`

Compare variants from an optimization.

**You say:** "Show me the variants from my last optimization"

**Response:**
```
Variant A (Control):
- Task completion: 72%
- Clarity: 68%

Variant B (Winner):
- Task completion: 89% (+17%)
- Clarity: 83% (+15%)
- Key change: Added step-by-step instructions

Variant C:
- Task completion: 75% (+3%)
- Clarity: 71% (+3%)
```

### `apply_variant`

Deploy a winning variant to your agent.

**You say:** "Apply the winning variant"

**Response:**
```
Applied Variant B to "Customer Support Agent"
Review the production verdict after applying the approved change.
```

### `stop_optimization`

Stop a running optimization.

**You say:** "Stop the current optimization"

---

## Insights

### `get_insights`

Get aggregated performance insights for an agent based on logged runs.

**You say:** "How is my support agent performing?"

**Response:**
```
Insights for Customer Support (last 30 days):
- Task completion: 87%
- Avg sentiment: Positive
- Common topics: order status, refunds, shipping
- Improvement opportunity: Users often confused about return policy
```

### `get_run_insights`

Get detailed insights for a specific run.

**You say:** "Show me the insights for run xyz789"

**Response:**
```
Run: Order Status Inquiry
Success Score: 85%
AI Relevancy: 88%
User Sentiment: 72%

Summary: Customer inquired about order status. AI provided tracking info.
Issues: None
AI Performance: Quick response, accurate information
```

### `regenerate_run_insights`

Re-run insights analysis for a run when insights are missing or incorrect.

**You say:** "Regenerate insights for run xyz789"

**Response:**
```
Insights regeneration started for run xyz789
Existing insights will be refreshed asynchronously.
```

### `batch_regenerate_insights`

Regenerate insights for all runs of an agent. Useful for bulk fixes.

**You say:** "Regenerate insights for all runs of my support agent"

**Response:**
```
Batch regeneration initiated:
- Total runs: 85
- Queued for regeneration: 83
- Errors: 2
Insights will be generated asynchronously.
```

### `refresh_agent_analysis`

Re-analyze an agent's structure (strengths, weaknesses, quality metrics).

**You say:** "Re-analyze my support agent"

**Response:**
```
Analysis refreshed for Customer Support:
Strengths:
- Clear role definition
- Good tone instructions

Weaknesses:
- Missing product context
- No edge case handling

Opportunities:
- Add example interactions
- Include escalation guidelines
```

### `refresh_agent_insights`

Regenerate aggregated agent insights from run data.

**You say:** "Refresh the insights for my support agent"

**Response:**
```
Insights refreshed for Customer Support:
- Runs analyzed: 142
- Success patterns: Clear explanations, quick responses
- Failure patterns: Difficulty with technical queries
- Summary: Strong performance with room to improve technical support
```

---

## Runs

### `list_runs`

List logged runs for an agent.

**You say:** "Show recent runs for my support agent"

### `get_run`

Get details of a specific run by run ID or external session ID, including insights.

**You say:** "Show me the run for LangSmith session xyz789"

### `create_run`

Log a run for analysis.

**Example:**
```
Log run:
- agentId: "abc123"
- content: "User: I need help with my order\nAI: Happy to help! What's your order number?"
- status: "completed"
```

**With tool usage** - pass `toolDefinitions` (tools the agent could call) and `toolCalls` (the calls it actually made, with arguments and results) so Converra can grade tool selection and results:
```
Log run:
- agentId: "abc123"
- content: "User: Where's my order?\nAI: Let me check.\nAI: It ships tomorrow."
- toolDefinitions: [{ name: "lookup_order", description: "Look up an order by ID" }]
- toolCalls: [{ name: "lookup_order", arguments: { id: "12345" }, result: "ships 2026-06-04" }]
- status: "completed"
```

---

## Personas

### `list_personas`

List simulation personas for testing.

**You say:** "What personas are available for testing?"

**Response:**
```
Available personas:
- Frustrated Customer (impatient, had bad experiences)
- Enterprise Buyer (technical, detail-oriented)
- First-time User (needs guidance, asks basic questions)
- Power User (efficient, knows what they want)
```

### `create_persona`

Create a custom persona for simulations.

**Example:**
```
Create persona:
- name: "Confused Senior"
- description: "An elderly user unfamiliar with technology,
  needs patient explanations, may ask the same thing twice"
- tags: ["senior", "patience-test"]
```

---

## Simulation

### `simulate_agent`

Test your agent against personas without optimization.

**You say:** "Test my support agent against 5 personas"

**Response:**
```
Simulation complete:
- 5 runs generated
- Avg task completion: 78%
- Issues found: Struggled with technical users
- Recommendation: Add more technical details
```

### `analyze_agent`

Get structural analysis and improvement recommendations.

**You say:** "Analyze my support agent for weaknesses"

**Response:**
```
Analysis of Customer Support:
Strengths:
- Clear role definition
- Good tone instructions

Weaknesses:
- No examples provided
- Missing edge case handling
- Could be more concise

Recommendations:
1. Add 2-3 example interactions
2. Add instructions for handling complaints
3. Remove redundant phrases
```

### `simulate_ab_test`

Run A/B simulation test comparing two variants. Executes multi-turn simulated runs for both variants against identical personas and scenarios, then compares performance to determine which is better.

**Note:** This tool was previously named `run_head_to_head`.

**You say:** "Compare my old and new support agents with simulations"

**Response:**
```
A/B Simulation Results:
Baseline vs Variant across 9 runs

Recommendation: variant
Lift: +12.3 successScore

Comparison:
- Variant wins: 6
- Baseline wins: 2
- Ties: 1

Evidence level: high
```

### `regression_test`

Test a variant against an agent's golden test suite to ensure it doesn't break existing functionality. Uses pre-validated scenarios with known success criteria.

**You say:** "Run regression test on my new support agent"

**Response:**
```
Regression Test: PASSED

Summary:
- Total scenarios: 8
- Passed: 8
- Regressed: 0
- Pass rate: reported from the completed suite

All golden scenarios passed. Safe to deploy.
```

---

## Account

### `get_account`

Get account info and usage.

**You say:** "What's my Converra usage?"

### `get_settings`

Get optimization settings.

### `update_settings`

Update default settings.

---

## Integrations

### `list_integrations`

List all configured integrations and their status.

**You say:** "Show me my integrations"

**Response:**
```
✓ LANGSMITH
  Project: My Production Bot
  Last import: Jan 3, 2:30 PM (47 imported)
  Available projects:
    - My Production Bot (proj_abc) ← selected
    - Development (proj_def)
    - Testing (proj_ghi)

✓ LANGFUSE
  Region: US
  Last import: Jan 2, 8:00 AM (23 imported)
```

### `sync_runs`

Sync runs from LangSmith or Langfuse. Optionally configure auto-sync.

**You say:** "Sync my LangSmith runs"

**Example with options:**
```
Sync runs from langsmith:
- lookbackDays: 30
- maxTraces: 500
- enableAutoSync: true
- syncIntervalMinutes: 1440  (daily)
```

**Response:**
```
✓ Import successful

Runs imported: 47
Agents created: 3
Agents reused: 2
Skipped: 12 (8 single-turn)
Auto-sync enabled (daily).
```

**Parameters:**

| Parameter | Options | Description |
|-----------|---------|-------------|
| `source` | `langsmith`, `langfuse` | Required. Integration to sync from |
| `lookbackDays` | `7`, `30`, `90` | Days to look back (default: 30) |
| `maxTraces` | 1-2000 | Max traces to sync (default: 500) |
| `enableAutoSync` | true/false | Enable automatic sync |
| `syncIntervalMinutes` | `60`, `360`, `720`, `1440` | Hourly, 6h, 12h, or daily |

---

## Webhooks

### `list_webhooks`

List configured webhooks.

### `create_webhook`

Create a webhook for events.

**Example:**
```
Create webhook:
- url: "https://myapp.com/converra-webhook"
- events: ["optimization.completed", "prompt.updated", "regression_test.completed"]
```

### `delete_webhook`

Remove a webhook.

---

## Onboarding

### `get_integration_guide`

Get a step-by-step integration guide tailored to your tech stack.

**You say:** "How do I integrate Converra with my Next.js app using Vercel AI SDK?"

**Example:**
```
Get integration guide for:
- stack: "Vercel AI SDK with streamText"
- framework: "Next.js"
- runtime: "Vercel Functions"
- agentName: "Support Bot"
```

**Response:**
```
Integration Guide for Support Bot (Vercel AI SDK)

1. Install the middleware:
   npm install @converra/ai-sdk-middleware ai@4.3.19 @ai-sdk/openai@1.3.24

2. Add to your streamText call:
   import { createConverraMiddleware } from '@converra/ai-sdk-middleware'
   ...
```

### `verify_integration`

Verify your integration is working by checking recent runs.

**You say:** "Is my Converra integration working?"

**Response:**
```
✓ Integration verified

Recent runs found: 12
Latest: 3 minutes ago
Agent: Customer Support Agent
```

---

## Deployment Impact

### `get_deployment_impact`

Check whether deployed fixes actually worked in production. Returns per-agent verification data by default, or PR-grouped impact with `view: "pr"`.

**You say:** "Did my recent fixes actually work?"

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `agentId` | string | - | Filter to a specific agent |
| `status` | string | - | Filter by status: `monitoring`, `verified`, `not_fixed`, `regressed`, `confounded`, `likely_fixed`, `improving`, `flat`, `insufficient_data` |
| `view` | string | `agent` | Use `agent` for per-agent impact or `pr` for PR-grouped impact |
| `repo` | string | - | Filter PR view to a repo full name like `owner/repo` |
| `cursor` | string | - | Cursor returned by a previous impact call |
| `includeDirect` | boolean | `false` | Include direct deployments with no PR in PR view |
| `limit` | number | 10 | Max results to return |

**Response:**
```
Impact Summary: 1 verified ✓ | 1 monitoring ◐ | 1 not fixed ✗

✓ Customer Support Agent: 62% fewer Incorrect refund policy (18→7 failures across 80 runs)
◐ Sales Assistant: Deployed 1d ago - 8/10 runs observed
✗ Onboarding Bot: Handoff confusion persists (12→11 failures across 62 runs)
```

**PR view example:**
```
get_deployment_impact({ view: "pr" })
```

**Response:**
```
Impact Summary: 3 verified ✓ | 1 improving ↗ | 1 insufficient evidence ○

✓ #123 org/repo - VERIFIED
    Agents: Support Agent
    Change: Clarified refund policy handling
    Impact: 18→7 failures, 61% reduction across 47 post-fix runs
    Deployments: dep_abc123

○ #145 org/repo - INSUFFICIENT_DATA
    Agents: Sales Assistant
    Change: Reworded qualifying question
    Impact: 0→0 failures, 0% reduction across 9 post-fix runs
    Reason: Detector version changed mid-window - can't compare cleanly yet.
    Deployments: dep_def456
```

The `Reason:` line surfaces why a row reads `insufficient_data` - including a
detector-version change (internally `version_drift`), which is collapsed into
`insufficient_data` rather than claiming a before/after delta it cannot isolate.

---

## Diagnosis

### `get_run_step_diagnosis`

Get step-level failure diagnosis for a run. Shows which step first failed, cascade effects, root cause hypothesis, and per-turn timeline.

**You say:** "What went wrong in run xyz789?"

**Response:**
```
Step Diagnosis for run xyz789

Root Cause: Intent classification failure at turn 3
Severity: Major

Timeline:
  Turn 1:   ok   - User greeting
  Turn 2:   ok   - Agent asks for details
  Turn 3: FAILURE - Misclassified refund as complaint
  Turn 4: cascade - Wrong escalation path triggered
  Turn 5: symptom - User frustrated by irrelevant response

Hypothesis: System prompt lacks explicit intent categories

Detector regime: detectorVersion 1, detectorKind "transcript"
```

The response includes the **detector regime** (`detectorVersion`, `detectorKind`,
and `scoreRubricVersionUsed` on score-coupled paths) that produced the diagnosis,
so trend and PR-impact comparisons can require same-regime diagnoses.

### `get_step_failure_aggregation`

Get fleet-level failure patterns for an agent. Shows which steps fail most often across all runs in the last 30 days.

**You say:** "What are the common failure patterns for my support agent?"

**Response:**
```
Step Failure Patterns (last 30 days)

1. Intent classification (Turn 2-3)
   ████████░░░░░░░░░░░░ 38% (47 runs)
   Impact: Users routed to wrong handler

2. Context retention (Turn 4-6)
   ████░░░░░░░░░░░░░░░░ 22% (27 runs)
   Impact: Agent forgets prior details

3. Escalation logic (Turn 5-7)
   ██░░░░░░░░░░░░░░░░░░ 12% (15 runs)
   Impact: Agent keeps trying when it should hand off
```

### `get_regression_suite`

Get regression test scenarios with source tracking - the golden scenarios your baseline handles well.

**You say:** "Show the regression test suite for my support agent"

---

## Common Workflows

### Bring Your Agent
```
1. "Here's my agent's system prompt that isn't working well: [paste prompt]"
2. "What's wrong with it?"
3. "Test it against difficult users"
4. "What changed in the winning version?"
5. "Apply it"
```

### Analyze Run Logs
```
1. "Here are some runs from my bot: [paste logs]"
2. "What patterns do you see?"
3. "Optimize the agent based on these issues"
4. "Apply the improvement"
```

### Test Before Going Live
```
1. "Here's a new agent I'm considering: [paste system prompt]"
2. "Simulate against frustrated and confused users"
3. "What issues were found?"
4. "Fix those and test again"
```
