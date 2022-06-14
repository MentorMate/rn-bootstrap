import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';
import { FeaturePiece } from '../types/CodeGenerator';
import toKebabCase from 'lodash.kebabcase';
import capitalize from 'lodash.capitalize';
import { upperCamelCase } from '../tools/pretty';

module.exports = (toolbox: RnBootstrapToolbox) => {
  const basicNameValidator = (name?: string, minLength = 3) => {
    if (!name) {
      return toolbox.throwExitError(
        `A second name parameter is required for this command.`
      );
    }
    if (name.length < minLength) {
      return toolbox.throwExitError(`The name ${name} is is too short?`);
    }
  };

  const nameEndsWithValidator = (name: string, generatorName: FeaturePiece) => {
    const capitalizedEnding = capitalize(generatorName);
    if (!name.endsWith(capitalizedEnding)) {
      return toolbox.throwExitError(
        `Your component name is invalid. Did you mean "${name}${capitalizedEnding}"?`
      );
    }
  };

  const nameUpperCamelCaseValidator = (name: string) => {
    const upperCamelCaseName = upperCamelCase(name);
    if (name !== upperCamelCaseName) {
      return toolbox.throwExitError(
        `Your component name is invalid. Did you mean "${upperCamelCaseName}"?`
      );
    }
  };

  toolbox.validateComponent = async name => {
    basicNameValidator(name);
    nameEndsWithValidator(name!, FeaturePiece.component);
    nameUpperCamelCaseValidator(name!);
  };
  toolbox.validateContainer = name => {
    basicNameValidator(name);
    nameEndsWithValidator(name!, FeaturePiece.container);
    nameUpperCamelCaseValidator(name!);
  };
  toolbox.validateHook = name => {
    basicNameValidator(name);
    if (!/^use([A-Z])+[A-Za-z]+/.test(name!)) {
      return toolbox.throwExitError(
        `Your hook name is invalid. Did you follow the "useYourHookName" convention?`
      );
    }
  };
  toolbox.validateModel = name => {
    basicNameValidator(name);
    nameUpperCamelCaseValidator(name!);
  };
  toolbox.validatePage = name => {
    basicNameValidator(name);
    nameEndsWithValidator(name!, FeaturePiece.page);
    nameUpperCamelCaseValidator(name!);
  };
  toolbox.validateUtil = name => {
    basicNameValidator(name);
  };
  toolbox.validateFeature = name => {
    basicNameValidator(name);
    const kebabCaseName = toKebabCase(name!);
    if (kebabCaseName !== name) {
      return toolbox.throwExitError(
        `Your feature name is invalid. Did you mean "${kebabCaseName}"?`
      );
    }
  };
};
