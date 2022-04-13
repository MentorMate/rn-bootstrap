import Handlebars from 'handlebars';
import { capitalizeFirstLetter } from '../tools/pretty';
import { MMRNCliToolbox } from '../types/types';

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
      `Unable to capitalize ${hbString} in handlebars template because it is of type ${entryType}.`
    );
  }
  return capitalizeFirstLetter(hbString);
});

module.exports = (toolbox: MMRNCliToolbox) => {
  const {
    filesystem: { path, read, write }
  } = toolbox;

  const compileTemplate = (
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

  toolbox.compileTemplate = compileTemplate;
};
