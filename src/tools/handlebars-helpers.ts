import Handlebars from 'handlebars';
import capitalize from 'lodash.capitalize';
import kebabCase from 'lodash.kebabcase';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';
import { upperCamelCase } from '../tools/pretty';
require('handlebars-helpers')();

const validateStringType = data => {
  const entryType = typeof data;
  if (entryType !== 'string') {
    throw new Error(
      `Unable to use helper for ${data} in handlebars because the data is of type ${entryType}.`
    );
  }
};

export const registerHbsHelpers = () => {
  Handlebars.registerHelper('includes', function(
    elem: any,
    list: any,
    options
  ) {
    if (list.includes(elem)) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  Handlebars.registerHelper('capitalize', function(hbString: string) {
    validateStringType(hbString);
    return capitalize(hbString);
  });

  Handlebars.registerHelper('kebabCase', function(hbString: string) {
    validateStringType(hbString);
    return kebabCase(hbString);
  });

  Handlebars.registerHelper('upperCamelCase', function(hbString: string) {
    validateStringType(hbString);
    return upperCamelCase(hbString);
  });

  Handlebars.registerHelper('upperFirst', function(hbString: string) {
    validateStringType(hbString);
    return upperFirst(hbString);
  });

  Handlebars.registerHelper('camelCase', function(hbString: string) {
    validateStringType(hbString);
    return camelCase(hbString);
  });

  Handlebars.registerHelper('curlyBraces', function(hbString: string) {
    return '{' + hbString + '}';
  });

  Handlebars.registerHelper('spacedCurlyBraces', function(hbString: string) {
    return '{ ' + hbString + ' }';
  });

  Handlebars.registerHelper(
    'append',
    function (hbString: string, append: string) {
      return hbString + append;
    },
  );
};
