import { GluegunToolbox } from 'gluegun';
import { SelectionPrompts } from '../tools/options';
import {
  getDependenciesToInstallFromSelectedOptions,
  getTemplateParamsFromSelectedOptions,
  getFilePathsToExclude
} from '../tools/option-utils';
import { yarn } from '../tools/yarn';
import {
  MMRNCliCommand,
  MMRNCliToolbox,
  OptionSelectionResult
} from '../types/types';
import { spawnProgress } from '../tools/spawn-progress';
import { commandFormat, heading, mmRNCliHeading, p } from '../tools/pretty';

enum Generators {
  Feature = 'feature',
  Component = 'component',
  Hook = 'hook'
}

const command: MMRNCliCommand = {
  name: 'generate',
  description: 'Generates a feature/component/hook',
  alias: 'gen',
  run: async toolbox => {
    const {
      parameters,
      throwExitError,
      generateComponent,
      validateComponent,
      generateHook,
      validateHook,
      generateFeature
    } = toolbox;

    if (!parameters.first) {
      return throwExitError(`TODO: implement help`);
    }

    if (!parameters.second) {
      return throwExitError('Missing name!');
    }

    switch (parameters.first) {
      case Generators.Component:
        const componentParams = { componentName: parameters.second };
        validateComponent(componentParams);
        await generateComponent(componentParams);
        break;
      case Generators.Hook:
        const hookParams = { hookName: parameters.second };
        validateHook(hookParams);
        await generateHook(hookParams);
        break;
      case Generators.Feature:
        await generateFeature();
        break;
      default:
        throwExitError(
          `Invalid second parameter. The supported generators are: ${Object.values(
            Generators
          ).join(', ')}`
        );
        break;
    }
  }
};

module.exports = command;
