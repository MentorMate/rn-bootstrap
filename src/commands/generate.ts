import {
  FeaturePiece,
  AdditionalCodeGenerator,
  SupportedCommandsText
} from '../types/CodeGenerator';
import { RnBootstrapCommand } from '../types/RnBootstrapToolbox';

const command: RnBootstrapCommand = {
  name: 'generate',
  description: `Generates a ${SupportedCommandsText}`,
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
      validateFeature,
      generateTest
    } = toolbox;

    if (!command) {
      return throwExitError(`TODO: implement help`);
    }

    switch (command) {
      case FeaturePiece.component:
        validateComponent(name);
        await generateComponent(name!);
        break;
      case FeaturePiece.container:
        validateContainer(name);
        await generateContainer(name!);
        break;
      case FeaturePiece.hook:
        validateHook(name);
        await generateHook(name!);
        break;
      case FeaturePiece.model:
        validateModel(name);
        await generateModel(name!);
        break;
      case FeaturePiece.page:
        validatePage(name);
        await generatePage(name!);
        break;
      case FeaturePiece.util:
        validateUtil(name);
        await generateUtil(name!);
        break;
      case AdditionalCodeGenerator.feature:
        validateFeature(name);
        await generateFeature(name!);
        break;
      case AdditionalCodeGenerator.test:
        await generateTest();
        break;
      default:
        throwExitError(
          `Invalid second parameter. The supported generators are: ${SupportedCommandsText}`
        );
        break;
    }
  }
};

module.exports = command;
