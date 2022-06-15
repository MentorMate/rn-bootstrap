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

export enum FeatureVariance {
  default = 'default',
  styledComponents = 'styledComponents'
}

export enum AdditionalCodeGenerator {
  feature = 'feature',
  test = 'test'
}

export const GenerateFeatureOptionSelectionKey = 'featureGenerationOptions';
export type GenerateFeaturePromptResult = {
  [GenerateFeatureOptionSelectionKey]: [FeaturePieceType];
};

export const GenerateTestFilesSelectionKey = 'generateTestFiles';
export type GenerateTestFilesSelectionPromptResult = {
  [GenerateTestFilesSelectionKey]: [string];
};


export const SupportedCommandsText = [
  ...Object.values(FeaturePiece),
  ...Object.values(AdditionalCodeGenerator)
].join(', ');

export type GenericGeneratorRunner = (name: string) => Promise<void>;

export type GenericGeneratorValidator = (name?: string) => void | never;

export enum Template {
  Base = 'Base',
  Tests = 'Tests'
}

export type GeneratorConfig = {
  [key in Template]: string;
} & {
  Piece: FeaturePiece;
  Ext: string;
};

type Generator = {
  [key in FeaturePiece]: {
    [key in FeatureVariance]?: GeneratorConfig;
  };
};

const Generator: Generator = {
  [FeaturePiece.component]: {
    [FeatureVariance.default]: {
      Base: 'base-stylesheet-component.tsx',
      Tests: '__tests__/base-component.test.tsx',
      Piece: FeaturePiece.component,
      Ext: 'tsx'
    },
    [FeatureVariance.styledComponents]: {
      Base: 'base-styled-components-component.tsx',
      Tests: '__tests__/base-component.test.tsx',
      Piece: FeaturePiece.component,
      Ext: 'tsx'
    }
  },
  [FeaturePiece.container]: {
    [FeatureVariance.default]: {
      Base: 'base-container.tsx',
      Tests: '__tests__/base-container.test.tsx',
      Piece: FeaturePiece.container,
      Ext: 'tsx'
    }
  },
  [FeaturePiece.hook]: {
    [FeatureVariance.default]: {
      Base: 'base-hook.ts',
      Tests: '__tests__/base-hook.test.ts',
      Piece: FeaturePiece.hook,
      Ext: 'ts'
    }
  },
  [FeaturePiece.page]: {
    [FeatureVariance.default]: {
      Base: 'base-page.tsx',
      Tests: '__tests__/base-page.test.tsx',
      Piece: FeaturePiece.page,
      Ext: 'tsx'
    }
  },
  [FeaturePiece.model]: {
    [FeatureVariance.default]: {
      Base: 'base-model.ts',
      Tests: '__tests__/base-model.test.ts',
      Piece: FeaturePiece.model,
      Ext: 'ts'
    }
  },
  [FeaturePiece.util]: {
    [FeatureVariance.default]: {
      Base: 'base-util.ts',
      Tests: '__tests__/base-util.test.ts',
      Piece: FeaturePiece.util,
      Ext: 'ts'
    }
  }
};

export const getGeneratorConfig = (piece: FeaturePiece, variance: FeatureVariance) => {
  const generator = Generator[piece][variance];
  if (!generator) {
    throw new Error(`Unsupported generator for ${variance} ${piece}`);
  }
  return generator;
};

export interface CodeGeneratorToolboxEntries {
  generateComponent: GenericGeneratorRunner;
  validateComponent: GenericGeneratorValidator;

  generateContainer: GenericGeneratorRunner;
  validateContainer: GenericGeneratorValidator;

  generateHook: GenericGeneratorRunner;
  validateHook: GenericGeneratorValidator;

  generateModel: GenericGeneratorRunner;
  validateModel: GenericGeneratorValidator;

  generatePage: GenericGeneratorRunner;
  validatePage: GenericGeneratorValidator;

  generateUtil: GenericGeneratorRunner;
  validateUtil: GenericGeneratorValidator;

  generateFeature: GenericGeneratorRunner;
  validateFeature: GenericGeneratorValidator;

  generateTest: () => Promise<void>;
}
