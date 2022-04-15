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
  UtilTemplate
} from '../types/CodeGenerator';

module.exports = (toolbox: RnBootstrapToolbox) => {
  toolbox.generateComponent = async params => {
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

  toolbox.generateContainer = async params => {
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

  toolbox.generateHook = async params => {
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

  toolbox.generateModel = async params => {
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

  toolbox.generatePage = async params => {
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

  toolbox.generateUtil = async params => {
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

  toolbox.generateFeature = async params => {
    const { prompt } = toolbox;
    const featureGenerationOptions = await prompt.ask<
      GenerateFeaturePromptResult
    >([
      {
        message: 'Please select the directories you want to generate.',
        type: 'multiselect',
        name: generateFeatureOptionSelectionKey,
        choices: Object.values(CodeGenerator)
      }
    ])[generateFeatureOptionSelectionKey];
    /* TODO: implement complete feature generation using the already existing separate generators */
    /* TODO: documentation */
    console.log(featureGenerationOptions);
  };
};
