import { FormationGateInput, FormationGateOutput } from './types.js';
import { loadConfig } from './config.js';
import { runChecks } from './checks.js';
import { generateReceipt } from './receipt.js';
import { generatePRComment } from './pr-comment.js';

export async function runFormationGate(configPath: string, input: Partial<FormationGateInput>): Promise<FormationGateOutput> {
  const config = loadConfig(configPath);
  
  const fullInput: FormationGateInput = {
    config,
    prNumber: input.prNumber,
    branch: input.branch,
    commitSha: input.commitSha,
    changedFiles: input.changedFiles,
    repoRoot: input.repoRoot,
    testEvidence: input.testEvidence,
    buildEvidence: input.buildEvidence,
    verificationCommands: input.verificationCommands,
    dirtyGitStatusEvidence: input.dirtyGitStatusEvidence,
    receipt: input.receipt,
  };

  const checks = runChecks(fullInput, config);
  const receipt = generateReceipt(fullInput, checks, config);
  
  let prComment: string | undefined;
  if (config.output?.includePRComment) {
    prComment = generatePRComment(receipt);
  }

  return {
    receipt,
    prComment,
    status: receipt.status,
  };
}

export function parseCLIArgs(args: string[]): { configPath: string; input: Partial<FormationGateInput> } {
  const configPathIndex = args.indexOf('--config');
  const configPath = configPathIndex >= 0 ? args[configPathIndex + 1] : './formation-gate.config.json';

  const input: Partial<FormationGateInput> = {};

  const prNumberIndex = args.indexOf('--pr-number');
  if (prNumberIndex >= 0) {
    input.prNumber = parseInt(args[prNumberIndex + 1]);
  }

  const branchIndex = args.indexOf('--branch');
  if (branchIndex >= 0) {
    input.branch = args[branchIndex + 1];
  }

  const commitShaIndex = args.indexOf('--commit-sha');
  if (commitShaIndex >= 0) {
    input.commitSha = args[commitShaIndex + 1];
  }

  const changedFilesIndex = args.indexOf('--changed-files');
  if (changedFilesIndex >= 0) {
    input.changedFiles = args[changedFilesIndex + 1].split(',');
  }

  const testEvidenceIndex = args.indexOf('--test-evidence');
  if (testEvidenceIndex >= 0) {
    input.testEvidence = args[testEvidenceIndex + 1];
  }

  const buildEvidenceIndex = args.indexOf('--build-evidence');
  if (buildEvidenceIndex >= 0) {
    input.buildEvidence = args[buildEvidenceIndex + 1];
  }

  const verificationCommandsIndex = args.indexOf('--verification-commands');
  if (verificationCommandsIndex >= 0) {
    input.verificationCommands = args[verificationCommandsIndex + 1].split(',');
  }

  return { configPath, input };
}
