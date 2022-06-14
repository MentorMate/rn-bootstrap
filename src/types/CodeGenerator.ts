export const GENERATOR_TEMPLATES_DIR = 'generator-templates';

export enum FeaturePiece {
  container = 'container',
  component = 'component',
  hook = 'hook',
  model = 'model',
  page = 'page',
  util = 'util'
}
export type FeaturePieceType = keyof typeof FeaturePiece;

export enum AdditionalCodeGenerator {
  feature = 'feature',
  test = 'test'
}

export const generateFeatureOptionSelectionKey = 'featureGenerationOptions';
export type GenerateFeaturePromptResult = {
  [generateFeatureOptionSelectionKey]: [FeaturePieceType];
};

export const SupportedCommandsText = [
  ...Object.values(FeaturePiece),
  ...Object.values(AdditionalCodeGenerator)
].join(', ');

export type GenericGenerator = (name: string) => Promise<void>;

export type GenericGeneratorValidator = (name?: string) => void | never;

export enum ComponentTemplate {
  StyledComponentsComponent = 'base-styled-components-component.tsx',
  StylesheetComponent = 'base-stylesheet-component.tsx',
  Tests = '__tests__/base-component.test.tsx'
}
export enum ContainerTemplate {
  Base = 'base-container.tsx',
  Tests = '__tests__/base-container.test.tsx'
}
export enum HookTemplate {
  Base = 'base-hook.ts',
  Tests = '__tests__/base-hook.test.ts'
}
export enum ModelTemplate {
  Base = 'base-model.ts',
  Tests = '__tests__/base-model.test.ts'
}
export enum PageTemplate {
  Base = 'base-page.tsx',
  Tests = '__tests__/base-page.test.tsx'
}
export enum UtilTemplate {
  Base = 'base-util.ts',
  Tests = '__tests__/base-util.test.ts'
}

export type AvailableGeneratorTemplates =
  | ComponentTemplate
  | ContainerTemplate
  | HookTemplate
  | ModelTemplate
  | PageTemplate
  | UtilTemplate;

export interface CodeGeneratorToolboxEntries {
  generateComponent: GenericGenerator;
  validateComponent: GenericGeneratorValidator;

  generateContainer: GenericGenerator;
  validateContainer: GenericGeneratorValidator;

  generateHook: GenericGenerator;
  validateHook: GenericGeneratorValidator;

  generateModel: GenericGenerator;
  validateModel: GenericGeneratorValidator;

  generatePage: GenericGenerator;
  validatePage: GenericGeneratorValidator;

  generateUtil: GenericGenerator;
  validateUtil: GenericGeneratorValidator;

  generateFeature: GenericGenerator;
  validateFeature: GenericGeneratorValidator;

  generateTest: () => Promise<void>;
}
