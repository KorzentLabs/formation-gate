import { readFileSync } from 'node:fs';
import { FormationGateConfig } from './types.js';

const DEFAULT_CONFIG: FormationGateConfig = {
  checks: {
    requireTestEvidence: true,
    requireBuildEvidence: true,
    requireVerificationCommands: true,
    requireDirtyGitStatusEvidence: false,
    forbidAuthorityLanguage: true,
    forbidApprovalClaims: true,
    requireProofOnly: true,
    requireExecutionAuthorityFalse: true,
    requireKnownGaps: true,
    requireReceiptHash: true,
  },
  scope: {
    allowedPatterns: ['src/**', 'lib/**', 'test/**'],
    excludedPatterns: ['node_modules/**', 'dist/**', '.git/**'],
  },
  output: {
    format: 'json',
    includeReceipt: true,
    includePRComment: true,
  },
};

export function loadConfig(configPath: string): FormationGateConfig {
  try {
    const configContent = readFileSync(configPath, 'utf8');
    const userConfig = JSON.parse(configContent) as Partial<FormationGateConfig>;
    return mergeConfig(DEFAULT_CONFIG, userConfig);
  } catch (error) {
    console.error(`Failed to load config from ${configPath}: ${error}`);
    return DEFAULT_CONFIG;
  }
}

function mergeConfig(defaultConfig: FormationGateConfig, userConfig: Partial<FormationGateConfig>): FormationGateConfig {
  return {
    checks: { ...defaultConfig.checks, ...userConfig.checks },
    scope: { ...defaultConfig.scope, ...userConfig.scope },
    output: { ...defaultConfig.output, ...userConfig.output },
  };
}

export { DEFAULT_CONFIG };
