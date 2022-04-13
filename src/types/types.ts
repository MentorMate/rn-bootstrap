import { GluegunCommand, GluegunToolbox } from 'gluegun';
import {
  ReactNavigationExampleChoice,
  StateLibraryChoice,
  StyleLibraryChoice
} from '../tools/options';
import { CopyBoilerplateOptions } from './CopyBoilerplateOptions';

export interface MMRNCliToolbox extends GluegunToolbox {
  throwExitError(error: any): never;
  compileTemplate(
    pathParts: string[],
    props: Record<string, any>,
    outputPathParts?: string[]
  ): void;
  copyBoilerplate(options: CopyBoilerplateOptions);
  getFsChildren(
    path: string,
    isRelative?: boolean,
    matching?: string | string[]
  ): string[];
  getSourceFilesInCurrentDir(): string[];
  renameProject(projectName: string, bundleIdentifier: string): Promise<string>;
  getProjectName(): string | never;
  getBundleId(): string | never;
  generateComponent(params: GenerateComponentParams): Promise<void>;
  validateComponent(params: GenerateComponentParams): void | never;
  generateHook(params: GenerateHookParams): Promise<void>;
  validateHook(params: GenerateHookParams): void | never;
  generateFeature(): void;
  makeRcFile(selectedOptions: OptionSelectionResult): void;
  CLI_PATH: string;
}

export type MMRNCliCommand = GluegunCommand<MMRNCliToolbox>;

export interface OptionSelectionResult {
  styleLibrary: StyleLibraryChoice;
  stateManagementLibrary: StateLibraryChoice;
  reactNavigationExample: ReactNavigationExampleChoice;
}

export interface TemplateParams {
  hasReduxToolkit: boolean;
  hasStyledComponents: boolean;
  hasReactNavigationExample: boolean;
}

export interface Dependencies {
  dependencies: string[];
  devDependencies: string[];
}

export interface RcFile {
  projectUses: RcFileProjectUses;
}

export interface RcFileProjectUses {
  redux: boolean;
  styledComponents: boolean;
}

export type ProjectRcFile = Partial<RcFile>;

export type GenerateComponentParams = {
  componentName: string;
};

export type GenerateHookParams = {
  hookName: string;
};
