import { GluegunCommand, GluegunToolbox } from 'gluegun';
import { StateLibraryChoice, StyleLibraryChoice } from '../tools/options';
import { CopyBoilerplateOptions } from './CopyBoilerplateOptions';

export interface MMRNCliToolbox extends GluegunToolbox {
  throwExitError(error: any): never;
  compileTemplate(pathParts: string[], props: Record<string, any>): void;
  copyBoilerplate(options: CopyBoilerplateOptions);
  renameProject(projectName: string, bundleIdentifier: string): Promise<string>;
  getProjectName(): string | never;
  getBundleId(): string | never;
}

export type MMRNCliCommand = GluegunCommand<MMRNCliToolbox>;

export interface OptionSelectionResult {
  styleLibrary: StyleLibraryChoice;
  stateManagementLibrary: StateLibraryChoice;
}

export interface TemplateParams {
  hasReduxToolkit: boolean;
  hasStyledComponents: boolean;
}

export interface Dependencies {
  dependencies: string[];
  devDependencies: string[];
}
