import {
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
  CodeGenerator,
  generateFeatureOptionSelectionKey,
  GenerateFeaturePromptResult,
  UtilTemplate,
  DefaultGenerator
} from '../types/CodeGenerator';
import {
  getNameForFeatureHook,
  getNameForFeaturePartFactory
} from '../tools/naming';

module.exports = (toolbox: RnBootstrapToolbox) => {
  const generateComponent: DefaultGenerator = async params => {
    const outputPath = toolbox.getFileNamePathPartsForCurrentDir(
      params.name,
      'tsx'
    );

    if (!(await shouldCreateOrOverwrite(toolbox, outputPath))) {
      return toolbox.print.info('Aborting.');
    }
    if (!(await shouldProceedInDir(toolbox, CodeGenerator.component))) {
      return toolbox.print.info('Aborting.');
    }

    const styledComponentsTemplatePath = toolbox.getGeneratorTemplatePathParts(
      CodeGenerator.component,
      ComponentTemplate.StyledComponentsComponent
    );
    const stylesheetComponentsTemplatePath = toolbox.getGeneratorTemplatePathParts(
      CodeGenerator.component,
      ComponentTemplate.StylesheetComponent
    );

    const rcFile = getRc(toolbox);
    rcFile.projectUses?.styledComponents
      ? toolbox.compileTemplate(
          styledComponentsTemplatePath,
          params,
          outputPath
        )
      : toolbox.compileTemplate(
          stylesheetComponentsTemplatePath,
          params,
          outputPath
        );
  };
  toolbox.generateComponent = generateComponent;

  const generateContainer: DefaultGenerator = async params => {
    const outputPath = toolbox.getFileNamePathPartsForCurrentDir(
      params.name,
      'tsx'
    );

    if (!(await shouldCreateOrOverwrite(toolbox, outputPath))) {
      return toolbox.print.info('Aborting.');
    }
    if (!(await shouldProceedInDir(toolbox, CodeGenerator.container))) {
      return toolbox.print.info('Aborting.');
    }

    const templatePath = toolbox.getGeneratorTemplatePathParts(
      CodeGenerator.container,
      ContainerTemplate.Base
    );

    toolbox.compileTemplate(templatePath, params, outputPath);
  };
  toolbox.generateContainer = generateContainer;

  const generateHook: DefaultGenerator = async params => {
    const outputPath = toolbox.getFileNamePathPartsForCurrentDir(
      params.name,
      'ts'
    );

    if (!(await shouldCreateOrOverwrite(toolbox, outputPath))) {
      return toolbox.print.info('Aborting.');
    }
    if (!(await shouldProceedInDir(toolbox, CodeGenerator.hook))) {
      return toolbox.print.info('Aborting.');
    }

    const templatePath = toolbox.getGeneratorTemplatePathParts(
      CodeGenerator.hook,
      HookTemplate.Base
    );

    toolbox.compileTemplate(templatePath, params, outputPath);
  };
  toolbox.generateHook = generateHook;

  const generateModel: DefaultGenerator = async params => {
    const outputPath = toolbox.getFileNamePathPartsForCurrentDir(
      params.name,
      'ts'
    );

    if (!(await shouldCreateOrOverwrite(toolbox, outputPath))) {
      return toolbox.print.info('Aborting.');
    }
    if (!(await shouldProceedInDir(toolbox, CodeGenerator.model))) {
      return toolbox.print.info('Aborting.');
    }

    const templatePath = toolbox.getGeneratorTemplatePathParts(
      CodeGenerator.model,
      ModelTemplate.Base
    );

    toolbox.compileTemplate(templatePath, params, outputPath);
  };
  toolbox.generateModel = generateModel;

  const generatePage: DefaultGenerator = async params => {
    const outputPath = toolbox.getFileNamePathPartsForCurrentDir(
      params.name,
      'tsx'
    );

    if (!(await shouldCreateOrOverwrite(toolbox, outputPath))) {
      return toolbox.print.info('Aborting.');
    }
    if (!(await shouldProceedInDir(toolbox, CodeGenerator.page))) {
      return toolbox.print.info('Aborting.');
    }

    const utilTemplate = toolbox.getGeneratorTemplatePathParts(
      CodeGenerator.page,
      PageTemplate.Base
    );

    toolbox.compileTemplate(utilTemplate, params, outputPath);
  };
  toolbox.generatePage = generatePage;

  const generateUtil: DefaultGenerator = async params => {
    const outputPath = toolbox.getFileNamePathPartsForCurrentDir(
      params.name,
      'ts'
    );

    if (!(await shouldCreateOrOverwrite(toolbox, outputPath))) {
      return toolbox.print.info('Aborting.');
    }
    if (!(await shouldProceedInDir(toolbox, CodeGenerator.util))) {
      return toolbox.print.info('Aborting.');
    }

    const utilTemplate = toolbox.getGeneratorTemplatePathParts(
      CodeGenerator.util,
      UtilTemplate.Base
    );

    toolbox.compileTemplate(utilTemplate, params, outputPath);
  };
  toolbox.generateUtil = generateUtil;

  toolbox.generateFeature = async params => {
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
        choices: Object.values(CodeGenerator)
      }
    ]);
    const featureGenerationSelection =
      featureGenerationPrompt[generateFeatureOptionSelectionKey];

    if (!featureGenerationSelection.length) {
      return toolbox.throwExitError('Nothing selected. Aborting.');
    }

    const featureDir = path(cwd(), params.name);
    dir(featureDir);
    for (const piece of featureGenerationSelection) {
      const featurePieceDir = path(featureDir, piece);
      dir(featurePieceDir);
      process.chdir(featurePieceDir);

      const getCamelCaseNameForFeaturePart = getNameForFeaturePartFactory(
        params.name
      );
      switch (piece) {
        case CodeGenerator.component:
          await generateComponent({
            name: getCamelCaseNameForFeaturePart(CodeGenerator.component)
          });
          break;
        case CodeGenerator.container:
          await generateContainer({
            name: getCamelCaseNameForFeaturePart(CodeGenerator.container)
          });
          break;
        case CodeGenerator.hook:
          await generateHook({
            name: getNameForFeatureHook(CodeGenerator.hook)
          });
          break;
        case CodeGenerator.model:
          await generateModel({
            name: getCamelCaseNameForFeaturePart(CodeGenerator.model)
          });
          break;
        case CodeGenerator.page:
          await generatePage({
            name: getCamelCaseNameForFeaturePart(CodeGenerator.page)
          });
          break;
        case CodeGenerator.util:
          await generateUtil({
            name: getCamelCaseNameForFeaturePart(CodeGenerator.util)
          });
          break;
      }
    }
  };
};
