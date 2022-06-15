import {
  shouldCreateOrOverwrite,
  shouldProceedInDir
} from '../tools/generator-checks';
import { getRc } from '../tools/rcFile';
import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';
import {
  FeaturePiece,
  GenerateFeatureOptionSelectionKey,
  GenerateFeaturePromptResult,
  GenericGeneratorRunner,
  GeneratorConfig,
  FeatureVariance,
  getGeneratorConfig,
  Template,
  GenerateTestFilesSelectionPromptResult,
  GenerateTestFilesSelectionKey
} from '../types/CodeGenerator';
import {
  getNameForFeatureHook,
  getNameForFeaturePieceFactory
} from '../tools/naming';
import { TESTS_DIR } from '../tools/constants';

const generateFeaturePart = async (
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
  const generateComponent: GenericGeneratorRunner = async name => {
    const rcFile = getRc(toolbox);
    if (rcFile.projectUses?.styledComponents) {
      generateFeaturePart(
        toolbox,
        getGeneratorConfig(
          FeaturePiece.component,
          FeatureVariance.styledComponents
        ),
        name
      );
    } else {
      generateFeaturePart(
        toolbox,
        getGeneratorConfig(FeaturePiece.component, FeatureVariance.default),
        name
      );
    }
  };

  const generateContainer: GenericGeneratorRunner = name =>
    generateFeaturePart(
      toolbox,
      getGeneratorConfig(FeaturePiece.container, FeatureVariance.default),
      name
    );

  const generateHook: GenericGeneratorRunner = name =>
    generateFeaturePart(
      toolbox,
      getGeneratorConfig(FeaturePiece.hook, FeatureVariance.default),
      name
    );

  const generateModel: GenericGeneratorRunner = name =>
    generateFeaturePart(
      toolbox,
      getGeneratorConfig(FeaturePiece.model, FeatureVariance.default),
      name
    );

  const generatePage: GenericGeneratorRunner = name =>
    generateFeaturePart(
      toolbox,
      getGeneratorConfig(FeaturePiece.page, FeatureVariance.default),
      name
    );

  const generateUtil: GenericGeneratorRunner = name =>
    generateFeaturePart(
      toolbox,
      getGeneratorConfig(FeaturePiece.util, FeatureVariance.default),
      name
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

      const getCamelCaseNameForFeaturePiece = getNameForFeaturePieceFactory(
        name
      );
      switch (piece) {
        case FeaturePiece.component:
          await generateComponent(
            getCamelCaseNameForFeaturePiece(FeaturePiece.component)
          );
          break;
        case FeaturePiece.container:
          await generateContainer(
            getCamelCaseNameForFeaturePiece(FeaturePiece.container)
          );
          break;
        case FeaturePiece.hook:
          await generateHook(getNameForFeatureHook(FeaturePiece.hook));
          break;
        case FeaturePiece.model:
          await generateModel(
            getCamelCaseNameForFeaturePiece(FeaturePiece.model)
          );
          break;
        case FeaturePiece.page:
          await generatePage(
            getCamelCaseNameForFeaturePiece(FeaturePiece.page)
          );
          break;
        case FeaturePiece.util:
          await generateUtil(
            getCamelCaseNameForFeaturePiece(FeaturePiece.util)
          );
          break;
      }
    }
  };

  const generateTest = async () => {
    const {
      filesystem: { cwd, list, inspect },
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
        `${cwd()} is empty. Unable to generate selection.`
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

    for (const file of filesToGenerate) {
      await generateFeaturePart(
        toolbox,
        getGeneratorConfig(featurePiece, FeatureVariance.default),
        file,
        Template.Tests
      );
    }
  };

  toolbox.generateComponent = generateComponent;
  toolbox.generateContainer = generateContainer;
  toolbox.generatePage = generatePage;
  toolbox.generateHook = generateHook;
  toolbox.generateModel = generateModel;
  toolbox.generateUtil = generateUtil;

  toolbox.generateFeature = generateFeature;
  toolbox.generateTest = generateTest;
};
