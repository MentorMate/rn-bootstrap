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
      generatePiece,
      validateComponent,
      validateContainer,
      validateHook,
      validateModel,
      validatePage,
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
        await generatePiece(command, name!);
        break;
      case FeaturePiece.container:
        validateContainer(name);
        await generatePiece(command, name!);
        break;
      case FeaturePiece.hook:
        validateHook(name);
        await generatePiece(command, name!);
        break;
      case FeaturePiece.model:
        validateModel(name);
        await generatePiece(command, name!);
        break;
      case FeaturePiece.page:
        validatePage(name);
        await generatePiece(command, name!);
        break;
      case FeaturePiece.util:
        validateUtil(name);
        await generatePiece(command, name!);
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
