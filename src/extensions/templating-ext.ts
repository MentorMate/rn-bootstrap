import Handlebars from 'handlebars';
import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';
import capitalize from 'lodash.capitalize';
import kebabCase from 'lodash.kebabcase';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';
import { upperCamelCase } from '../tools/pretty';

Handlebars.registerHelper('includes', function(elem: any, list: any, options) {
  if (list.includes(elem)) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('capitalize', function(hbString: string) {
  const entryType = typeof hbString;
  if (typeof hbString !== 'string') {
    throw new Error(
      `Unable to capitalize ${hbString} in handlebars template because data is of type ${entryType}.`
    );
  }
  return capitalize(hbString);
});

Handlebars.registerHelper('kebabCase', function(hbString: string) {
  const entryType = typeof hbString;
  if (typeof hbString !== 'string') {
    throw new Error(
      `Unable to kebab-case ${hbString} in handlebars template because data is of type ${entryType}.`
    );
  }
  return kebabCase(hbString);
});

Handlebars.registerHelper('upperCamelCase', function(hbString: string) {
  const entryType = typeof hbString;
  if (typeof hbString !== 'string') {
    throw new Error(
      `Unable to camel-case ${hbString} in handlebars template because data is of type ${entryType}.`
    );
  }
  return upperCamelCase(hbString);
});

Handlebars.registerHelper('upperFirst', function(hbString: string) {
  const entryType = typeof hbString;
  if (typeof hbString !== 'string') {
    throw new Error(
      `Unable to camel-case ${hbString} in handlebars template because data is of type ${entryType}.`
    );
  }
  return upperFirst(hbString);
});

Handlebars.registerHelper('camelCase', function(hbString: string) {
  const entryType = typeof hbString;
  if (typeof hbString !== 'string') {
    throw new Error(
      `Unable to camel-case ${hbString} in handlebars template because data is of type ${entryType}.`
    );
  }
  return camelCase(hbString);
});

module.exports = (toolbox: RnBootstrapToolbox) => {
  const {
    filesystem: { path, read, write }
  } = toolbox;

  toolbox.compileTemplate = (
    pathParts: string[],
    props: Record<string, any>,
    outputPathParts?: string[]
  ) => {
    const filePath = path(...pathParts);
    const writePath = outputPathParts ? path(...outputPathParts) : filePath;
    const rawFileContent = read(filePath);
    if (!rawFileContent) {
      return toolbox.throwExitError(
        `Couldn't compile template. File not found at ${filePath}`
      );
    }
    write(writePath, Handlebars.compile(rawFileContent)(props));
  };
};
