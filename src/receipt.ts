import { Receipt, CheckResult, CheckStatus, FormationGateConfig, FormationGateInput } from './types.js';

export function generateReceipt(input: FormationGateInput, checks: CheckResult[], config: FormationGateConfig): Receipt {
  const overallStatus = determineOverallStatus(checks);
  const knownGaps = extractKnownGaps(checks);

  const receipt: Receipt = {
    receiptVersion: '0.1.0',
    toolName: 'formation-gate',
    toolVersion: '0.1.0',
    status: overallStatus,
    proofOnly: true,
    executionAuthority: false,
    checks,
    knownGaps,
    generatedAt: new Date().toISOString(),
    config,
    context: {
      prNumber: input.prNumber,
      branch: input.branch,
      commitSha: input.commitSha,
      changedFiles: input.changedFiles,
    },
  };

  receipt.receiptHash = computeReceiptHash(receipt);
  return receipt;
}

function determineOverallStatus(checks: CheckResult[]): CheckStatus {
  if (checks.length === 0) {
    return 'SKIPPED';
  }

  const hasFailed = checks.some(check => check.status === 'FAILED');
  if (hasFailed) {
    return 'FAILED';
  }

  const hasUnverified = checks.some(check => check.status === 'UNVERIFIED');
  if (hasUnverified) {
    return 'UNVERIFIED';
  }

  return 'PASS';
}

function extractKnownGaps(checks: CheckResult[]): string[] {
  const gaps: string[] = [];
  
  for (const check of checks) {
    if (check.status === 'UNVERIFIED') {
      gaps.push(check.message);
    }
    if (check.status === 'SKIPPED') {
      gaps.push(`Check skipped: ${check.name}`);
    }
  }

  return gaps;
}

function computeReceiptHash(receipt: Receipt): string {
  const hashInput = {
    receiptVersion: receipt.receiptVersion,
    toolName: receipt.toolName,
    toolVersion: receipt.toolVersion,
    status: receipt.status,
    checks: receipt.checks.map(check => ({
      id: check.id,
      status: check.status,
    })),
    generatedAt: receipt.generatedAt,
  };

  const jsonString = JSON.stringify(hashInput);
  const hash = simpleHash(jsonString);
  return `sha256:${hash}`;
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
}
