# Formation Gate

**Status: Developer Preview**

Formation Gate is a standalone diagnostic verifier.

It checks whether software-change claims are supported by evidence.

Formation Gate generates proof-only verification receipts.

It does not approve code, guarantee correctness, certify security, merge pull requests, deploy software, or replace human review.

## Important Warnings

- **Diagnostic only**: This tool does not approve, reject, or block any changes
- **No automatic actions**: No merging, deployment, or publication will occur
- **No guarantees**: Does not guarantee correctness, security, compliance, or production readiness
- **Proof-only**: All receipts are marked with `proofOnly=true` and `executionAuthority=false`

## Installation

### GitHub Action

Add to your `.github/workflows/formation-gate.yml`:

```yaml
name: Formation Gate

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  formation-gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: your-org/formation-gate@v0.1.0
        with:
          pr-number: ${{ github.event.pull_request.number }}
          branch: ${{ github.event.pull_request.head.ref }}
          commit-sha: ${{ github.event.pull_request.head.sha }}
          verification-commands: npm test,npm run build
```

### CLI

```bash
npm install -g formation-gate
formation-gate --config formation-gate.config.json --verification-commands npm test,npm run build
```

## Configuration

Create a `formation-gate.config.json` in your repository root:

```json
{
  "checks": {
    "requireTestEvidence": true,
    "requireBuildEvidence": true,
    "requireVerificationCommands": true,
    "requireDirtyGitStatusEvidence": false,
    "forbidAuthorityLanguage": true,
    "forbidApprovalClaims": true,
    "requireProofOnly": true,
    "requireExecutionAuthorityFalse": true,
    "requireKnownGaps": true,
    "requireReceiptHash": true
  },
  "scope": {
    "allowedPatterns": ["src/**", "lib/**", "test/**"],
    "excludedPatterns": ["node_modules/**", "dist/**", ".git/**"]
  },
  "output": {
    "format": "json",
    "includeReceipt": true,
    "includePRComment": true
  }
}
```

See [docs/config-reference.md](docs/config-reference.md) for detailed configuration options.

## Risk Boundary

Formation Gate is intentionally limited to diagnostic reporting. It:

- Does not modify source files
- Does not auto-fix issues
- Does not auto-merge PRs
- Does not deploy or publish
- Does not grant approval labels
- Does not make security or compliance guarantees
- Does not make network calls beyond GitHub API
- Does not require secrets

See [docs/risk-boundary.md](docs/risk-boundary.md) for detailed risk boundary documentation.

## Failure Modes

Formation Gate can return the following statuses:

- **PASS**: All checks passed
- **FAILED**: One or more checks failed
- **UNVERIFIED**: One or more checks could not be verified due to missing evidence
- **SKIPPED**: All checks were skipped

See [docs/failure-modes.md](docs/failure-modes.md) for detailed failure mode documentation.

## License

MIT
