# Installation

## GitHub Action

### Step 1: Add to Workflow

Create `.github/workflows/formation-gate.yml`:

```yaml
name: Formation Gate

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  formation-gate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Formation Gate
        uses: your-org/formation-gate@v0.1.0
        with:
          pr-number: ${{ github.event.pull_request.number }}
          branch: ${{ github.event.pull_request.head.ref }}
          commit-sha: ${{ github.event.pull_request.head.sha }}
          verification-commands: npm test,npm run build
```

### Step 2: Configure

Create `formation-gate.config.json` in your repository root. See [config-reference.md](config-reference.md).

## CLI

### Install Globally

```bash
npm install -g formation-gate
```

### Install Locally

```bash
npm install --save-dev formation-gate
```

### Run CLI

```bash
formation-gate --config formation-gate.config.json --verification-commands npm test,npm run build
```

## Requirements

- Node.js >= 18
- npm or yarn
