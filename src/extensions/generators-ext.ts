import {
  getValidFeaturePieceParentDirs,
  isCurrentDirValidFeaturePieceDir,
  shouldCreateOrOverwrite,
  shouldProceedInDir
} from '../tools/generator-checks';
import { getRc } from '../tools/rcFile';
import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';
import {
  ComponentTemplate,
  ContainerTemplate,
  HookTemplate,
  ModelTemplate,
  PageTemplate,
  FeaturePiece,
  generateFeatureOptionSelectionKey,
  GenerateFeaturePromptResult,
  UtilTemplate,
  GenericGenerator
} from '../types/CodeGenerator';
import {
  getNameForFeatureHook,
  getNameForFeaturePartFactory
} from '../tools/naming';

module.exports = (toolbox: RnBootstrapToolbox) => {
  const generateComponent: GenericGenerator = async name => {
    const outputPath = toolbox.getFileNamePathPartsForCurrentDir(name, 'tsx');

    if (!(await shouldCreateOrOverwrite(toolbox, outputPath))) {
      return toolbox.print.info('Aborting.');
    }
    if (!(await shouldProceedInDir(toolbox, FeaturePiece.component))) {
      return toolbox.print.info('Aborting.');
    }

    const styledComponentsTemplatePath = toolbox.getGeneratorTemplatePathParts(
      FeaturePiece.component,
      ComponentTemplate.StyledComponentsComponent
    );
    const stylesheetComponentsTemplatePath = toolbox.getGeneratorTemplatePathParts(
      FeaturePiece.component,
      ComponentTemplate.StylesheetComponent
    );

    const rcFile = getRc(toolbox);
    rcFile.projectUses?.styledComponents
      ? toolbox.compileTemplate(
          styledComponentsTemplatePath,
          { name },
          outputPath
        )
      : toolbox.compileTemplate(
          stylesheetComponentsTemplatePath,
          { name },
          outputPath
        );
  };

  const generateContainer: GenericGenerator = async name => {
    const outputPath = toolbox.getFileNamePathPartsForCurrentDir(name, 'tsx');

    if (!(await shouldCreateOrOverwrite(toolbox, outputPath))) {
      return toolbox.print.info('Aborting.');
    }
    if (!(await shouldProceedInDir(toolbox, FeaturePiece.container))) {
      return toolbox.print.info('Aborting.');
    }

    const templatePath = toolbox.getGeneratorTemplatePathParts(
      FeaturePiece.container,
      ContainerTemplate.Base
    );

    toolbox.compileTemplate(templatePath, { name }, outputPath);
  };

  const generateHook: GenericGenerator = async name => {
    const outputPath = toolbox.getFileNamePathPartsForCurrentDir(name, 'ts');

    if (!(await shouldCreateOrOverwrite(toolbox, outputPath))) {
      return toolbox.print.info('Aborting.');
    }
    if (!(await shouldProceedInDir(toolbox, FeaturePiece.hook))) {
      return toolbox.print.info('Aborting.');
    }

    const templatePath = toolbox.getGeneratorTemplatePathParts(
      FeaturePiece.hook,
      HookTemplate.Base
    );

    toolbox.compileTemplate(templatePath, { name }, outputPath);
  };

  const generateModel: GenericGenerator = async name => {
    const outputPath = toolbox.getFileNamePathPartsForCurrentDir(name, 'ts');

    if (!(await shouldCreateOrOverwrite(toolbox, outputPath))) {
      return toolbox.print.info('Aborting.');
    }
    if (!(await shouldProceedInDir(toolbox, FeaturePiece.model))) {
      return toolbox.print.info('Aborting.');
    }

    const templatePath = toolbox.getGeneratorTemplatePathParts(
      FeaturePiece.model,
      ModelTemplate.Base
    );

    toolbox.compileTemplate(templatePath, { name }, outputPath);
  };

  const generatePage: GenericGenerator = async name => {
    const outputPath = toolbox.getFileNamePathPartsForCurrentDir(name, 'tsx');

    if (!(await shouldCreateOrOverwrite(toolbox, outputPath))) {
      return toolbox.print.info('Aborting.');
    }
    if (!(await shouldProceedInDir(toolbox, FeaturePiece.page))) {
      return toolbox.print.info('Aborting.');
    }

    const utilTemplate = toolbox.getGeneratorTemplatePathParts(
      FeaturePiece.page,
      PageTemplate.Base
    );

    toolbox.compileTemplate(utilTemplate, { name }, outputPath);
  };

  const generateUtil: GenericGenerator = async name => {
    const outputPath = toolbox.getFileNamePathPartsForCurrentDir(name, 'ts');

    if (!(await shouldCreateOrOverwrite(toolbox, outputPath))) {
      return toolbox.print.info('Aborting.');
    }
    if (!(await shouldProceedInDir(toolbox, FeaturePiece.util))) {
      return toolbox.print.info('Aborting.');
    }

    const utilTemplate = toolbox.getGeneratorTemplatePathParts(
      FeaturePiece.util,
      UtilTemplate.Base
    );

    toolbox.compileTemplate(utilTemplate, { name }, outputPath);
  };

  const generateFeature: GenericGenerator = async name => {
    const {
      prompt,
      filesystem: { dir, cwd, path }
    } = toolbox;
    const featureGenerationPrompt = await prompt.ask<
      GenerateFeaturePromptResult
    >([
      {
        message: 'Please select the directories you want to generate.',
        type: 'multiselect',
        name: generateFeatureOptionSelectionKey,
        choices: Object.values(FeaturePiece)
      }
    ]);
    const featureGenerationSelection =
      featureGenerationPrompt[generateFeatureOptionSelectionKey];

    if (!featureGenerationSelection.length) {
      return toolbox.throwExitError('Nothing selected. Aborting.');
    }

    const featureDir = path(cwd(), name);
    dir(featureDir);
    for (const piece of featureGenerationSelection) {
      const featurePieceDir = path(featureDir, piece);
      dir(featurePieceDir);
      process.chdir(featurePieceDir);

      const getCamelCaseNameForFeaturePart = getNameForFeaturePartFactory(name);
      switch (piece) {
        case FeaturePiece.component:
          await generateComponent(
            getCamelCaseNameForFeaturePart(FeaturePiece.component)
          );
          break;
        case FeaturePiece.container:
          await generateContainer(
            getCamelCaseNameForFeaturePart(FeaturePiece.container)
          );
          break;
        case FeaturePiece.hook:
          await generateHook(getNameForFeatureHook(FeaturePiece.hook));
          break;
        case FeaturePiece.model:
          await generateModel(
            getCamelCaseNameForFeaturePart(FeaturePiece.model)
          );
          break;
        case FeaturePiece.page:
          await generatePage(getCamelCaseNameForFeaturePart(FeaturePiece.page));
          break;
        case FeaturePiece.util:
          await generateUtil(getCamelCaseNameForFeaturePart(FeaturePiece.util));
          break;
      }
    }
  };

  const generateTest = async () => {
    const {
      filesystem: { cwd }
    } = toolbox;

    if (!isCurrentDirValidFeaturePieceDir(toolbox)) {
      const validParents = getValidFeaturePieceParentDirs(toolbox);
      return toolbox.throwExitError(
        `${cwd()} does not contain a supported parent. Valid parents are: ${validParents.join(', ')}`
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
