# Failure Modes

Formation Gate can return the following statuses:

## PASS

All checks passed. Code formation evidence is present.

**Example causes:**
- All required evidence provided
- No forbidden language detected
- Receipt structure valid

## FAILED

One or more checks failed. Review the failed checks below.

**Example causes:**
- Verification commands missing
- Forbidden authority language detected
- Forbidden approval claims detected
- Receipt missing `proofOnly=true`
- Receipt missing `executionAuthority=false`
- Receipt missing known gaps section
- Receipt missing or invalid hash

## UNVERIFIED

One or more checks could not be verified due to missing evidence.

**Example causes:**
- Test evidence missing
- Build evidence missing
- Dirty git status evidence missing (if required)

## SKIPPED

All checks were skipped.

**Example causes:**
- No checks configured to run
- All checks disabled in config

## Check-Specific Failures

### Test Evidence
- **Status**: `UNVERIFIED` if missing
- **Message**: "Test evidence missing - unable to verify test claims"

### Build Evidence
- **Status**: `UNVERIFIED` if missing
- **Message**: "Build evidence missing - unable to verify build claims"

### Verification Commands
- **Status**: `FAILED` if missing
- **Message**: "Verification commands missing - required for reproducible verification"

### Forbidden Authority Language
- **Status**: `FAILED` if detected
- **Message**: "Forbidden authority language detected: [patterns]"

### Forbidden Approval Claims
- **Status**: `FAILED` if detected
- **Message**: "Forbidden approval claims detected: [claims]"

### Proof-Only Enforcement
- **Status**: `FAILED` if missing
- **Message**: "Receipt missing proofOnly=true enforcement"

### Execution Authority False
- **Status**: `FAILED` if missing
- **Message**: "Receipt missing executionAuthority=false enforcement"

### Known Gaps Section
- **Status**: `FAILED` if missing
- **Message**: "Receipt missing known gaps section"

### Receipt Hash
- **Status**: `FAILED` if missing or invalid
- **Message**: "Receipt missing or invalid hash"
