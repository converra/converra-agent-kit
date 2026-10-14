# Registry publishing

Schema checked 2026-10-14 against the official 2025-12-11 schema.
Use the official `modelcontextprotocol/registry` release of `mcp-publisher`.

```bash
mcp-publisher validate server.json
mcp-publisher login github
mcp-publisher publish server.json
curl 'https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.converra/converra'
```

GitHub authentication for `io.github.converra` requires a Converra organization
owner. Ordinary membership is insufficient. Keep credentials only in the shell
or an untracked `.env.local`; never commit publisher tokens.
The remote is hosted independently of this public documentation repository.
