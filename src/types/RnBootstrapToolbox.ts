import { GluegunCommand, GluegunToolbox } from 'gluegun';
import { FileSystemToolboxEntries } from './FileSystem';
import { CodeGeneratorToolboxEntries } from './CodeGenerator';
import { StartProjectOptionSelectionResult } from './StartProjectOptionSelectionResult';

export interface RnBootstrapToolbox
  extends GluegunToolbox,
    CodeGeneratorToolboxEntries,
    FileSystemToolboxEntries {
  throwExitError(error: any): never;
  compileTemplate(
    pathParts: string[],
    props: Record<string, any>,
    outputPathParts?: string[]
  ): void;
  renameProject(projectName: string, bundleIdentifier: string): Promise<string>;
  getProjectName(): string | never;
  getBundleId(): string | never;
  makeRcFile(selectedOptions: StartProjectOptionSelectionResult): void;
  CLI_PATH: string;
  BASE_PROJECT_PATH: string;
}

export type RnBootstrapCommand = GluegunCommand<RnBootstrapToolbox>;
