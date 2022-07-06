import { getRc } from '../tools/rcFile';
import { RnBootstrapToolbox } from './RnBootstrapToolbox';

export const GENERATOR_TEMPLATES_DIR = 'generator-templates';

// These enums are used for indexing directories and commands, thus being lowercase.
export enum FeaturePiece {
  container = 'container',
  component = 'component',
  hook = 'hook',
  model = 'model',
  page = 'page',
  util = 'util'
}
export enum AdditionalCodeGenerator {
  feature = 'feature',
  test = 'test'
}
export type FeaturePieceType = keyof typeof FeaturePiece;

export enum FeatureVariance {
  Default = 'Default',
  StyledComponents = 'StyledComponents'
}


export const GenerateFeatureOptionSelectionKey = 'featureGenerationOptions';
export type GenerateFeaturePromptResult = {
  [GenerateFeatureOptionSelectionKey]: [FeaturePiece];
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
    [FeatureVariance.Default]: {
      Base: 'base-stylesheet-component.tsx',
      Tests: '__tests__/base-component.test.tsx',
      Piece: FeaturePiece.component,
      Ext: 'tsx'
    },
    [FeatureVariance.StyledComponents]: {
      Base: 'base-styled-components-component.tsx',
      Tests: '__tests__/base-component.test.tsx',
      Piece: FeaturePiece.component,
      Ext: 'tsx'
    }
  },
  [FeaturePiece.container]: {
    [FeatureVariance.Default]: {
      Base: 'base-container.tsx',
      Tests: '__tests__/base-container.test.tsx',
      Piece: FeaturePiece.container,
      Ext: 'tsx'
    }
  },
  [FeaturePiece.hook]: {
    [FeatureVariance.Default]: {
      Base: 'base-hook.ts',
      Tests: '__tests__/base-hook.test.ts',
      Piece: FeaturePiece.hook,
      Ext: 'ts'
    }
  },
  [FeaturePiece.page]: {
    [FeatureVariance.Default]: {
      Base: 'base-page.tsx',
      Tests: '__tests__/base-page.test.tsx',
      Piece: FeaturePiece.page,
      Ext: 'tsx'
    }
  },
  [FeaturePiece.model]: {
    [FeatureVariance.Default]: {
      Base: 'base-model.ts',
      Tests: '__tests__/base-model.test.ts',
      Piece: FeaturePiece.model,
      Ext: 'ts'
    }
  },
  [FeaturePiece.util]: {
    [FeatureVariance.Default]: {
      Base: 'base-util.ts',
      Tests: '__tests__/base-util.test.ts',
      Piece: FeaturePiece.util,
      Ext: 'ts'
    }
  }
};

export const getGeneratorConfig = (
  piece: FeaturePiece,
  variance: FeatureVariance
) => {
  const generator = Generator[piece][variance];
  if (!generator) {
    throw new Error(`Unsupported generator for ${variance} ${piece}`);
  }
  return generator;
};

export const getFeaturePieceVariance = (
  toolbox: RnBootstrapToolbox,
  piece: FeaturePiece
) => {
  switch (piece) {
    case FeaturePiece.component:
      const rcFile = getRc(toolbox);
      return rcFile.projectUses?.styledComponents
        ? FeatureVariance.StyledComponents
        : FeatureVariance.Default;
    case FeaturePiece.container:
    case FeaturePiece.hook:
    case FeaturePiece.model:
    case FeaturePiece.page:
    case FeaturePiece.util:
      return FeatureVariance.Default;
  }
};

export interface CodeGeneratorToolboxEntries {
  validateComponent: GenericGeneratorValidator;
  validateContainer: GenericGeneratorValidator;
  validateHook: GenericGeneratorValidator;
  validateModel: GenericGeneratorValidator;
  validatePage: GenericGeneratorValidator;
  validateUtil: GenericGeneratorValidator;
  validateFeature: GenericGeneratorValidator;

  generatePiece: (piece: FeaturePiece, name: string) => Promise<void>;
  generateFeature: GenericGeneratorRunner;
  generateTest: () => Promise<void>;
}
