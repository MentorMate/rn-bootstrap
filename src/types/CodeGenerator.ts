export const GENERATOR_TEMPLATES_DIR = 'generator-templates';

export enum CodeGenerator {
  container = 'container',
  component = 'component',
  hook = 'hook',
  model = 'model',
  page = 'page',
  util = 'util'
}
export type CodeGeneratorType = keyof typeof CodeGenerator;

export enum GenerateFeatureOption {
  feature = 'feature'
}

export const generateFeatureOptionSelectionKey = 'featureGenerationOptions';
export type GenerateFeaturePromptResult = {
  [generateFeatureOptionSelectionKey]: [CodeGeneratorType];
};

export const SupportedCommandsString = [
  ...Object.values(CodeGenerator),
  ...Object.values(GenerateFeatureOption)
].join(', ');

export type GeneratorBaseParams = {
  name: string;
};

export type Generator<T extends GeneratorBaseParams> = (
  options: T
) => Promise<void>;

export type DefaultGenerator = Generator<GeneratorBaseParams>;

export type GeneratorValidator<T extends GeneratorBaseParams> = (
  options: T
) => void | never;

export type DefaultGeneratorValidator = GeneratorValidator<GeneratorBaseParams>;

export enum ComponentTemplate {
  StyledComponentsComponent = 'base-styled-components-component.tsx',
  StylesheetComponent = 'base-stylesheet-component.tsx'
}
export enum ContainerTemplate {
  Base = 'base-container.tsx'
}
export enum HookTemplate {
  Base = 'base-hook.ts'
}
export enum ModelTemplate {
  Base = 'base-model.ts'
}
export enum PageTemplate {
  Base = 'base-page.tsx'
}
export enum UtilTemplate {
  Base = 'base-util.ts'
}

export type AvailableGeneratorTemplates =
  | ComponentTemplate
  | ContainerTemplate
  | HookTemplate
  | ModelTemplate
  | PageTemplate
  | UtilTemplate;

export interface CodeGeneratorToolboxEntries {
  generateComponent: DefaultGenerator;
  validateComponent: DefaultGeneratorValidator;
  generateContainer: DefaultGenerator;
  validateContainer: DefaultGeneratorValidator;
  generateHook: DefaultGenerator;
  validateHook: DefaultGeneratorValidator;
  generateModel: DefaultGenerator;
  validateModel: DefaultGeneratorValidator;
  generatePage: DefaultGenerator;
  validatePage: DefaultGeneratorValidator;
  generateUtil: DefaultGenerator;
  validateUtil: DefaultGeneratorValidator;
  generateFeature: DefaultGenerator;
  validateFeature: DefaultGeneratorValidator;
}
