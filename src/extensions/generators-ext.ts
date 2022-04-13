import { shouldCreateOrOverwriteFile } from '../tools/check-overwrite';
import { GENERATOR_TEMPLATES_DIR } from '../tools/constants';
import { capitalizeFirstLetter } from '../tools/pretty';
import { getRc } from '../tools/rcFile';
import {
  GenerateComponentParams,
  GenerateHookParams,
  MMRNCliToolbox
} from '../types/types';

module.exports = (toolbox: MMRNCliToolbox) => {
  const validateComponent = async ({
    componentName
  }: GenerateComponentParams) => {
    if (!componentName.endsWith('Component')) {
      toolbox.throwExitError(
        `Your component name is invalid. Did you mean "${componentName}Component"?`
      );
    }
  };

  const generateComponent = async (params: GenerateComponentParams) => {
    const outputPath = [process.cwd(), `${params.componentName}.tsx`];

    if (!(await shouldCreateOrOverwriteFile(toolbox, outputPath))) {
      return;
    }

    const COMPONENT_TEMPLATES_DIR = [
      toolbox.CLI_PATH,
      GENERATOR_TEMPLATES_DIR,
      'component'
    ];
    const rcFile = getRc(toolbox);

    rcFile.projectUses?.styledComponents
      ? toolbox.compileTemplate(
          [...COMPONENT_TEMPLATES_DIR, 'styled-components-component.tsx'],
          params,
          outputPath
        )
      : toolbox.compileTemplate(
          [...COMPONENT_TEMPLATES_DIR, 'stylesheet-component.tsx'],
          params,
          outputPath
        );
  };

  const validateHook = ({ hookName }: GenerateHookParams) => {
    if (!/^use([A-Z])+[A-Za-z]+/.test(hookName)) {
      toolbox.throwExitError(
        `Your hook name is invalid. Did you follow the "useYourHookName" convention?`
      );
    }
  };

  const generateHook = async (params: GenerateHookParams) => {
    const outputPath = [process.cwd(), `${params.hookName}.tsx`];

    if (!(await shouldCreateOrOverwriteFile(toolbox, outputPath))) {
      return;
    }

    const HOOK_TEMPLATES_DIR = [
      toolbox.CLI_PATH,
      GENERATOR_TEMPLATES_DIR,
      'hook'
    ];

    toolbox.compileTemplate(
      [...HOOK_TEMPLATES_DIR, 'base-hook.ts'],
      params,
      outputPath
    );
  };

  const generateFeature = () => {};

  toolbox.generateComponent = generateComponent;
  toolbox.validateComponent = validateComponent;
  toolbox.generateHook = generateHook;
  toolbox.validateHook = validateHook;
  toolbox.generateFeature = generateFeature;
};
