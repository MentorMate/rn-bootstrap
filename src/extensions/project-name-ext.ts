import { BUNDLE_ID_REGEX, NAME_REGEX, RESERVED_NAMES } from '../tools/constants';
import { MMRNCliToolbox } from '../types/types';

module.exports = (toolbox: MMRNCliToolbox) => {
  const { parameters, strings, print, runtime } = toolbox;
  const { isBlank } = strings;

  const getProjectName = () => {
    const projectName = (parameters.first || '').toString();

    if (isBlank(projectName)) {
      print.info(
        `Please use ${runtime?.brand} start-project <projectName> <bundleIdentifier>`
      );
      return toolbox.throwExitError('Project name is required');
    }

    if (
      !String(projectName).match(NAME_REGEX) ||
      RESERVED_NAMES.includes(projectName.toLowerCase())
    ) {
      return toolbox.throwExitError('Invalid project name');
    }

    return projectName;
  };

  const getBundleId = () => {
    const bundleId = (parameters.second || '').toString();

    if (isBlank(bundleId)) {
      print.info(
        `Please provide a bundle id ${
          runtime?.brand
        } start-project ${getProjectName()} <bundleIdentifier>`
      );
      return toolbox.throwExitError('Bundle ID is required');
    }
    const id = bundleId.split('.');

    if (id.length < 2) {
      return toolbox.throwExitError(
        'Invalid Bundle Identifier. Add something like "com.travelapp" or "com.junedomingo.travelapp'
      );
    }

    if (!BUNDLE_ID_REGEX.test(bundleId)) {
      return toolbox.throwExitError(
        'Invalid Bundle Identifier. It must have at least two segments (one or more dots). Each segment must start with a letter. All characters must be alphanumeric or an underscore [a-zA-Z0-9_]'
      );
    }

    return bundleId;
  };

  toolbox.getProjectName = getProjectName;
  toolbox.getBundleId = getBundleId;
};
