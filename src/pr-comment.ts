import { Receipt, CheckStatus } from './types.js';

export function generatePRComment(receipt: Receipt): string {
  const statusEmoji = getStatusEmoji(receipt.status);
  const summary = getStatusSummary(receipt.status);
  
  let comment = `## Formation Gate Report ${statusEmoji}\n\n`;
  comment += `**Status:** ${receipt.status}\n\n`;
  comment += `${summary}\n\n`;
  comment += `### Proof-Only Diagnostic\n\n`;
  comment += `This is a diagnostic report only. It does not approve, reject, or block any changes.\n`;
  comment += `No automatic merging, deployment, or publication will occur.\n\n`;
  comment += `### Checks\n\n`;

  for (const check of receipt.checks) {
    const checkEmoji = getCheckEmoji(check.status);
    comment += `- ${checkEmoji} **${check.name}**: ${check.message}\n`;
  }

  if (receipt.knownGaps.length > 0) {
    comment += `\n### Known Gaps\n\n`;
    for (const gap of receipt.knownGaps) {
      comment += `- ${gap}\n`;
    }
  }

  comment += `\n### Receipt\n\n`;
  comment += `**Tool:** ${receipt.toolName} v${receipt.toolVersion}\n`;
  comment += `**Generated:** ${receipt.generatedAt}\n`;
  comment += `**Hash:** ${receipt.receiptHash}\n`;
  comment += `**Proof-Only:** ${receipt.proofOnly}\n`;
  comment += `**Execution Authority:** ${receipt.executionAuthority}\n`;

  return comment;
}

function getStatusEmoji(status: CheckStatus): string {
  switch (status) {
    case 'PASS':
      return '✅';
    case 'FAILED':
      return '❌';
    case 'UNVERIFIED':
      return '⚠️';
    case 'SKIPPED':
      return '⏭️';
    default:
      return '❓';
  }
}

function getCheckEmoji(status: CheckStatus): string {
  return getStatusEmoji(status);
}

function getStatusSummary(status: CheckStatus): string {
  switch (status) {
    case 'PASS':
      return 'All checks passed. Code formation evidence is present.';
    case 'FAILED':
      return 'Some checks failed. Review the failed checks below.';
    case 'UNVERIFIED':
      return 'Some checks could not be verified due to missing evidence.';
    case 'SKIPPED':
      return 'All checks were skipped.';
    default:
      return 'Unable to determine status.';
  }
}
