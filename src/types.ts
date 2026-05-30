export type CheckStatus = 'PASS' | 'FAILED' | 'UNVERIFIED' | 'SKIPPED';

export type CheckResult = {
  id: string;
  name: string;
  status: CheckStatus;
  message: string;
  evidence?: string;
};

export type FormationGateConfig = {
  checks: {
    requireTestEvidence?: boolean;
    requireBuildEvidence?: boolean;
    requireVerificationCommands?: boolean;
    requireDirtyGitStatusEvidence?: boolean;
    forbidAuthorityLanguage?: boolean;
    forbidApprovalClaims?: boolean;
    requireProofOnly?: boolean;
    requireExecutionAuthorityFalse?: boolean;
    requireKnownGaps?: boolean;
    requireReceiptHash?: boolean;
  };
  scope?: {
    allowedPatterns?: string[];
    excludedPatterns?: string[];
  };
  output?: {
    format?: 'json' | 'markdown';
    includeReceipt?: boolean;
    includePRComment?: boolean;
  };
};

export type Receipt = {
  receiptVersion: string;
  toolName: string;
  toolVersion: string;
  status: CheckStatus;
  proofOnly: boolean;
  executionAuthority: boolean;
  checks: CheckResult[];
  knownGaps: string[];
  generatedAt: string;
  receiptHash?: string;
  config?: FormationGateConfig;
  context?: {
    prNumber?: number;
    branch?: string;
    commitSha?: string;
    changedFiles?: string[];
  };
};

export type FormationGateInput = {
  config: FormationGateConfig;
  prNumber?: number;
  branch?: string;
  commitSha?: string;
  changedFiles?: string[];
  repoRoot?: string;
  testEvidence?: string;
  buildEvidence?: string;
  verificationCommands?: string[];
  dirtyGitStatusEvidence?: string;
  receipt?: Receipt;
};

export type FormationGateOutput = {
  receipt: Receipt;
  prComment?: string;
  status: CheckStatus;
};
