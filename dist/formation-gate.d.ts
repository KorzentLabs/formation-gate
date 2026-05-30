import { FormationGateInput, FormationGateOutput } from './types.js';
export declare function runFormationGate(configPath: string, input: Partial<FormationGateInput>): Promise<FormationGateOutput>;
export declare function parseCLIArgs(args: string[]): {
    configPath: string;
    input: Partial<FormationGateInput>;
};
