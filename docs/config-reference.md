# Configuration Reference

## Config File Location

Formation Gate looks for `formation-gate.config.json` in the repository root by default. You can specify a custom path with the `--config` CLI argument.

## Config Structure

```json
{
  "checks": { ... },
  "scope": { ... },
  "output": { ... }
}
```

## Checks

### requireTestEvidence

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Require test evidence to be provided
- **Effect**: If `true` and no test evidence is provided, status is `UNVERIFIED`

### requireBuildEvidence

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Require build evidence to be provided
- **Effect**: If `true` and no build evidence is provided, status is `UNVERIFIED`

### requireVerificationCommands

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Require verification commands to be specified
- **Effect**: If `true` and no verification commands are provided, status is `FAILED`

### requireDirtyGitStatusEvidence

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Require dirty git status evidence
- **Effect**: If `true` and no dirty git status evidence is provided, status is `UNVERIFIED`

### forbidAuthorityLanguage

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Forbid authority-related language in evidence
- **Effect**: If `true` and authority language is detected, status is `FAILED`
- **Forbidden patterns**: authority, approve, permission, grant, authorize, execute, deploy, publish, merge, release

### forbidApprovalClaims

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Forbid approval/correctness claims in evidence
- **Effect**: If `true` and approval claims are detected, status is `FAILED`
- **Forbidden patterns**: correct, secure, safe, compliant, certified, approved, verified, production-ready, bug-free, error-free

### requireProofOnly

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Require receipts to be marked as proof-only
- **Effect**: If `true` and receipt lacks `proofOnly=true`, status is `FAILED`

### requireExecutionAuthorityFalse

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Require receipts to have `executionAuthority=false`
- **Effect**: If `true` and receipt lacks `executionAuthority=false`, status is `FAILED`

### requireKnownGaps

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Require receipts to include known gaps section
- **Effect**: If `true` and receipt lacks known gaps, status is `FAILED`

### requireReceiptHash

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Require receipts to include a valid hash
- **Effect**: If `true` and receipt lacks or has invalid hash, status is `FAILED`

## Scope

### allowedPatterns

- **Type**: `string[]`
- **Default**: `["src/**", "lib/**", "test/**"]`
- **Description**: Glob patterns for files to include in checks

### excludedPatterns

- **Type**: `string[]`
- **Default**: `["node_modules/**", "dist/**", ".git/**"]`
- **Description**: Glob patterns for files to exclude from checks

## Output

### format

- **Type**: `"json" | "markdown"`
- **Default**: `"json"`
- **Description**: Output format for receipts

### includeReceipt

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Include receipt in output

### includePRComment

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Include PR comment markdown in output
