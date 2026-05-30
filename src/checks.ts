import { CheckResult, FormationGateConfig, FormationGateInput } from './types.js';

const FORBIDDEN_AUTHORITY_PATTERNS = [
  'authority',
  'approve',
  'approve',
  'permission',
  'grant',
  'authorize',
  'execute',
  'deploy',
  'publish',
  'merge',
  'release',
];

const FORBIDDEN_APPROVAL_CLAIMS = [
  'correct',
  'secure',
  'safe',
  'compliant',
  'certified',
  'approved',
  'verified',
  'production-ready',
  'bug-free',
  'error-free',
];

export function runChecks(input: FormationGateInput, config: FormationGateConfig): CheckResult[] {
  const results: CheckResult[] = [];

  if (config.checks.requireTestEvidence) {
    results.push(checkTestEvidence(input));
  }

  if (config.checks.requireBuildEvidence) {
    results.push(checkBuildEvidence(input));
  }

  if (config.checks.requireVerificationCommands) {
    results.push(checkVerificationCommands(input));
  }

  if (config.checks.requireDirtyGitStatusEvidence) {
    results.push(checkDirtyGitStatusEvidence(input));
  }

  if (config.checks.forbidAuthorityLanguage) {
    results.push(checkForbiddenAuthorityLanguage(input));
  }

  if (config.checks.forbidApprovalClaims) {
    results.push(checkForbiddenApprovalClaims(input));
  }

  if (config.checks.requireProofOnly && input.receipt) {
    results.push(checkProofOnly(input.receipt));
  }

  if (config.checks.requireExecutionAuthorityFalse && input.receipt) {
    results.push(checkExecutionAuthorityFalse(input.receipt));
  }

  if (config.checks.requireKnownGaps && input.receipt) {
    results.push(checkKnownGaps(input.receipt));
  }

  if (config.checks.requireReceiptHash && input.receipt) {
    results.push(checkReceiptHash(input.receipt));
  }

  return results;
}

function checkTestEvidence(input: FormationGateInput): CheckResult {
  if (input.testEvidence && input.testEvidence.trim().length > 0) {
    return {
      id: 'test-evidence',
      name: 'Test Evidence',
      status: 'PASS',
      message: 'Test evidence provided',
      evidence: input.testEvidence,
    };
  }
  return {
    id: 'test-evidence',
    name: 'Test Evidence',
    status: 'UNVERIFIED',
    message: 'Test evidence missing - unable to verify test claims',
  };
}

function checkBuildEvidence(input: FormationGateInput): CheckResult {
  if (input.buildEvidence && input.buildEvidence.trim().length > 0) {
    return {
      id: 'build-evidence',
      name: 'Build Evidence',
      status: 'PASS',
      message: 'Build evidence provided',
      evidence: input.buildEvidence,
    };
  }
  return {
    id: 'build-evidence',
    name: 'Build Evidence',
    status: 'UNVERIFIED',
    message: 'Build evidence missing - unable to verify build claims',
  };
}

function checkVerificationCommands(input: FormationGateInput): CheckResult {
  if (input.verificationCommands && input.verificationCommands.length > 0) {
    return {
      id: 'verification-commands',
      name: 'Verification Commands',
      status: 'PASS',
      message: `Verification commands provided: ${input.verificationCommands.length}`,
      evidence: JSON.stringify(input.verificationCommands),
    };
  }
  return {
    id: 'verification-commands',
    name: 'Verification Commands',
    status: 'FAILED',
    message: 'Verification commands missing - required for reproducible verification',
  };
}

function checkDirtyGitStatusEvidence(input: FormationGateInput): CheckResult {
  if (input.dirtyGitStatusEvidence && input.dirtyGitStatusEvidence.trim().length > 0) {
    return {
      id: 'dirty-git-status-evidence',
      name: 'Dirty Git Status Evidence',
      status: 'PASS',
      message: 'Dirty git status evidence provided',
      evidence: input.dirtyGitStatusEvidence,
    };
  }
  return {
    id: 'dirty-git-status-evidence',
    name: 'Dirty Git Status Evidence',
    status: 'SKIPPED',
    message: 'Dirty git status evidence not required by config',
  };
}

function checkForbiddenAuthorityLanguage(input: FormationGateInput): CheckResult {
  const textToCheck = [
    input.testEvidence,
    input.buildEvidence,
    input.verificationCommands?.join(' '),
  ].join(' ').toLowerCase();

  const foundPatterns = FORBIDDEN_AUTHORITY_PATTERNS.filter(pattern => 
    textToCheck.includes(pattern.toLowerCase())
  );

  if (foundPatterns.length === 0) {
    return {
      id: 'forbidden-authority-language',
      name: 'Forbidden Authority Language',
      status: 'PASS',
      message: 'No forbidden authority language detected',
    };
  }

  return {
    id: 'forbidden-authority-language',
    name: 'Forbidden Authority Language',
    status: 'FAILED',
    message: `Forbidden authority language detected: ${foundPatterns.join(', ')}`,
  };
}

function checkForbiddenApprovalClaims(input: FormationGateInput): CheckResult {
  const textToCheck = [
    input.testEvidence,
    input.buildEvidence,
    input.verificationCommands?.join(' '),
  ].join(' ').toLowerCase();

  const foundClaims = FORBIDDEN_APPROVAL_CLAIMS.filter(claim => 
    textToCheck.includes(claim.toLowerCase())
  );

  if (foundClaims.length === 0) {
    return {
      id: 'forbidden-approval-claims',
      name: 'Forbidden Approval Claims',
      status: 'PASS',
      message: 'No forbidden approval claims detected',
    };
  }

  return {
    id: 'forbidden-approval-claims',
    name: 'Forbidden Approval Claims',
    status: 'FAILED',
    message: `Forbidden approval claims detected: ${foundClaims.join(', ')}`,
  };
}

function checkProofOnly(receipt: { proofOnly?: unknown }): CheckResult {
  if (receipt.proofOnly === true) {
    return {
      id: 'proof-only',
      name: 'Proof-Only Enforcement',
      status: 'PASS',
      message: 'Receipt correctly marked as proof-only',
    };
  }
  return {
    id: 'proof-only',
    name: 'Proof-Only Enforcement',
    status: 'FAILED',
    message: 'Receipt missing proofOnly=true enforcement',
  };
}

function checkExecutionAuthorityFalse(receipt: { executionAuthority?: unknown }): CheckResult {
  if (receipt.executionAuthority === false) {
    return {
      id: 'execution-authority-false',
      name: 'Execution Authority False',
      status: 'PASS',
      message: 'Receipt correctly marked with executionAuthority=false',
    };
  }
  return {
    id: 'execution-authority-false',
    name: 'Execution Authority False',
    status: 'FAILED',
    message: 'Receipt missing executionAuthority=false enforcement',
  };
}

function checkKnownGaps(receipt: { knownGaps?: unknown }): CheckResult {
  if (Array.isArray(receipt.knownGaps) && receipt.knownGaps.length >= 0) {
    return {
      id: 'known-gaps',
      name: 'Known Gaps Section',
      status: 'PASS',
      message: 'Receipt includes known gaps section',
    };
  }
  return {
    id: 'known-gaps',
    name: 'Known Gaps Section',
    status: 'FAILED',
    message: 'Receipt missing known gaps section',
  };
}

function checkReceiptHash(receipt: { receiptHash?: unknown }): CheckResult {
  if (typeof receipt.receiptHash === 'string' && receipt.receiptHash.startsWith('sha256:')) {
    return {
      id: 'receipt-hash',
      name: 'Receipt Hash',
      status: 'PASS',
      message: 'Receipt includes valid hash',
    };
  }
  return {
    id: 'receipt-hash',
    name: 'Receipt Hash',
    status: 'FAILED',
    message: 'Receipt missing or invalid hash',
  };
}
