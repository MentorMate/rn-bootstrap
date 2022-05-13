import {
  CodeGenerator,
  GenerateFeatureOption,
  GeneratorBaseParams,
  SupportedCommandsString
} from '../types/CodeGenerator';
import { RnBootstrapCommand } from '../types/RnBootstrapToolbox';

const command: RnBootstrapCommand = {
  name: 'generate',
  description: `Generates a ${SupportedCommandsString}`,
  alias: 'gen',
  run: async toolbox => {
    const {
      parameters: { first: command, second: name },
      throwExitError,
      generateComponent,
      validateComponent,
      generateContainer,
      validateContainer,
      generateHook,
      validateHook,
      generateModel,
      validateModel,
      generatePage,
      validatePage,
      generateUtil,
      validateUtil,
      generateFeature,
      validateFeature
    } = toolbox;

    if (!command) {
      return throwExitError(`TODO: implement help`);
    }

    if (!name) {
      return throwExitError('Missing name!');
    }

    const baseParams: GeneratorBaseParams = { name };

    switch (command) {
      case CodeGenerator.component:
        validateComponent(baseParams);
        await generateComponent(baseParams);
        break;
      case CodeGenerator.container:
        validateContainer(baseParams);
        await generateContainer(baseParams);
        break;
      case CodeGenerator.hook:
        validateHook(baseParams);
        await generateHook(baseParams);
        break;
      case CodeGenerator.model:
        validateModel(baseParams);
        await generateModel(baseParams);
        break;
      case CodeGenerator.page:
        validatePage(baseParams);
        await generatePage(baseParams);
        break;
      case CodeGenerator.util:
        validateUtil(baseParams);
        await generateUtil(baseParams);
        break;
      case GenerateFeatureOption.feature:
        validateFeature(baseParams);
        await generateFeature(baseParams);
        break;
      default:
        throwExitError(
          `Invalid second parameter. The supported generators are: ${SupportedCommandsString}`
        );
        break;
    }
  }
};

module.exports = command;
