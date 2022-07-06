import {
  shouldCreateOrOverwrite,
  shouldProceedInDir
} from '../tools/generator-checks';
import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';
import {
  FeaturePiece,
  GenerateFeatureOptionSelectionKey,
  GenerateFeaturePromptResult,
  GenericGeneratorRunner,
  GeneratorConfig,
  getGeneratorConfig,
  Template,
  GenerateTestFilesSelectionPromptResult,
  GenerateTestFilesSelectionKey,
  getFeaturePieceVariance
} from '../types/CodeGenerator';
import { getNameForFeatureHook, getNameForFeaturePiece } from '../tools/naming';

const generateFeaturePiece = async (
  toolbox: RnBootstrapToolbox,
  Config: GeneratorConfig,
  name: string,
  template: Template = Template.Base
) => {
  const outputPath = toolbox.getFileNamePathPartsForCurrentDir(
    name,
    Config.Ext,
    template
  );
  if (!(await shouldCreateOrOverwrite(toolbox, outputPath))) {
    return toolbox.print.info('Aborting.');
  }
  if (!(await shouldProceedInDir(toolbox, Config.Piece))) {
    return toolbox.print.info('Aborting.');
  }
  const templatePath = toolbox.getGeneratorTemplatePathParts(Config, template);
  toolbox.compileTemplate(templatePath, { name }, outputPath);
};

module.exports = (toolbox: RnBootstrapToolbox) => {
  const generatePiece = (
    piece: FeaturePiece,
    name: string,
    template?: Template
  ) =>
    generateFeaturePiece(
      toolbox,
      getGeneratorConfig(piece, getFeaturePieceVariance(toolbox, piece)),
      name,
      template
    );

  const generateFeature: GenericGeneratorRunner = async name => {
    const {
      prompt: { ask },
      filesystem: { dir, cwd, path }
    } = toolbox;

    const featureGenerationPrompt = await ask<GenerateFeaturePromptResult>([
      {
        message: 'Please select the directories you want to generate.',
        type: 'multiselect',
        name: GenerateFeatureOptionSelectionKey,
        choices: Object.values(FeaturePiece)
      }
    ]);
    const featureGenerationSelection =
      featureGenerationPrompt[GenerateFeatureOptionSelectionKey];

    if (!featureGenerationSelection.length) {
      return toolbox.throwExitError('Nothing selected. Aborting.');
    }

    const featureDir = path(cwd(), name);
    dir(featureDir);
    for (const piece of featureGenerationSelection) {
      const featurePieceDir = path(featureDir, piece);
      dir(featurePieceDir);
      process.chdir(featurePieceDir);

      switch (piece) {
        case FeaturePiece.component:
        case FeaturePiece.container:
        case FeaturePiece.model:
        case FeaturePiece.page:
        case FeaturePiece.util:
          await generatePiece(piece, getNameForFeaturePiece(piece, name));
          break;
        case FeaturePiece.hook:
          await generatePiece(piece, getNameForFeatureHook(name));
      }
    }
  };

  const generateTest = async () => {
    const {
      filesystem: { cwd, list },
      prompt: { ask }
    } = toolbox;

    const featurePiece = toolbox.getFeaturePieceFromCurrentDir();
    if (!featurePiece) {
      return toolbox.throwExitError(
        `${cwd()} is not a valid directory. Valid parents are: ${Object.values(
          FeaturePiece
        ).join(', ')}`
      );
    }

    const potentialTestNames = list(cwd())
      ?.filter(name => name.includes('.'))
      .map(toolbox.removeFileExtension);

    if (!potentialTestNames?.length) {
      return toolbox.throwExitError(
        `${cwd()} is empty. There is nothing to generate tests for.`
      );
    }

    let filesToGenerate = [potentialTestNames[0]];

    if (potentialTestNames.length > 1) {
      const fileSelectionPrompt = await ask<
        GenerateTestFilesSelectionPromptResult
      >([
        {
          message: 'Please select the test files you want to generate.',
          type: 'multiselect',
          name: GenerateTestFilesSelectionKey,
          choices: potentialTestNames
        }
      ]);
      filesToGenerate = fileSelectionPrompt[GenerateTestFilesSelectionKey];
    }

    if (!filesToGenerate.length) {
      return toolbox.throwExitError('Nothing selected. Aborting.');
    }

    for (const fileName of filesToGenerate) {
      await generatePiece(featurePiece, fileName, Template.Tests);
    }
  };

  toolbox.generatePiece = generatePiece;
  toolbox.generateFeature = generateFeature;
  toolbox.generateTest = generateTest;
};
