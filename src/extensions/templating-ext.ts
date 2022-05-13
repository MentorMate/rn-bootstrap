import Handlebars from 'handlebars';
import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';
import { registerHbsHelpers } from '../tools/handlebars-helpers';
registerHbsHelpers();

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
