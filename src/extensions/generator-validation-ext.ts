import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';
import { CodeGenerator, GeneratorBaseParams } from '../types/CodeGenerator';
import toKebabCase from 'lodash.kebabcase';
import capitalize from 'lodash.capitalize';
import { upperCamelCase } from '../tools/pretty';

module.exports = (toolbox: RnBootstrapToolbox) => {
  const nameLengthValidator = (
    { name }: GeneratorBaseParams,
    minLength = 3
  ) => {
    if (name.length < minLength) {
      return toolbox.throwExitError(`The name ${name} is is too short?`);
    }
  };

  const nameEndsWithValidator = (
    { name }: GeneratorBaseParams,
    generatorName: CodeGenerator
  ) => {
    const capitalizedEnding = capitalize(generatorName);
    if (!name.endsWith(capitalizedEnding)) {
      return toolbox.throwExitError(
        `Your component name is invalid. Did you mean "${name}${capitalizedEnding}"?`
      );
    }
  };

  const nameUpperCamelCaseValidator = ({ name }: GeneratorBaseParams) => {
    const upperCamelCaseName = upperCamelCase(name);
    if (name !== upperCamelCaseName) {
      return toolbox.throwExitError(
        `Your component name is invalid. Did you mean "${upperCamelCaseName}"?`
      );
    }
  };

  toolbox.validateComponent = async params => {
    nameLengthValidator(params);
    nameEndsWithValidator(params, CodeGenerator.component);
    nameUpperCamelCaseValidator(params);
  };
  toolbox.validateContainer = params => {
    nameLengthValidator(params);
    nameEndsWithValidator(params, CodeGenerator.container);
    nameUpperCamelCaseValidator(params);
  };
  toolbox.validateHook = params => {
    nameLengthValidator(params);
    if (!/^use([A-Z])+[A-Za-z]+/.test(params.name)) {
      return toolbox.throwExitError(
        `Your hook name is invalid. Did you follow the "useYourHookName" convention?`
      );
    }
  };
  toolbox.validateModel = params => {
    nameLengthValidator(params);
    nameUpperCamelCaseValidator(params);
  };
  toolbox.validatePage = params => {
    nameLengthValidator(params);
    nameEndsWithValidator(params, CodeGenerator.page);
    nameUpperCamelCaseValidator(params);
  };
  toolbox.validateUtil = params => {
    nameLengthValidator(params);
  };
  toolbox.validateFeature = params => {
    nameLengthValidator(params);
    const kebabCaseName = toKebabCase(name);
    if (kebabCaseName !== params.name) {
      return toolbox.throwExitError(
        `Your feature name is invalid. Did you mean "${kebabCaseName}"?`
      );
    }
  };
};
