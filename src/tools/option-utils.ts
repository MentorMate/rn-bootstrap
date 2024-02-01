import { TemplateParams } from '../types/BaseProjectTemplateParams';
import { Dependencies } from '../types/Dependencies';
import { RcFile } from '../types/RcFile';
import { StartProjectOptionSelectionResult } from '../types/StartProjectOptionSelectionResult';
import { filter, isEqual, uniqWith, map, every } from 'lodash';
import {
  DefaultTemplateParams,
  SelectionToDependencyNameMap,
  SelectionToDevDependencyNameMap,
  SelectionToTemplateParamsMap,
  SelectionToOptionalFilePathsMap,
  StateLibraryChoice,
  StyleLibraryChoice
} from './options';

export const getDependenciesToInstallFromSelectedOptions = (
  optionSelection: StartProjectOptionSelectionResult
): Dependencies =>
  Object.values(optionSelection).reduce<Dependencies>(
    (prev, curr) => {
      const dependenciesForSelection = SelectionToDependencyNameMap[curr];
      if (dependenciesForSelection) {
        prev.dependencies.push(...dependenciesForSelection);
      }
      const devDependenciesForSelection = SelectionToDevDependencyNameMap[curr];
      if (devDependenciesForSelection) {
        prev.devDependencies.push(...devDependenciesForSelection);
      }
      return prev;
    },
    { dependencies: [], devDependencies: [] }
  );

export const getTemplateParamsFromSelectedOptions = (
  optionSelection: StartProjectOptionSelectionResult
): TemplateParams =>
  Object.values(optionSelection).reduce<TemplateParams>((prev, curr) => {
    const paramsForSelectedOption = SelectionToTemplateParamsMap[curr];
    if (paramsForSelectedOption) {
      return { ...prev, ...paramsForSelectedOption };
    }
    return prev;
  }, DefaultTemplateParams);

export const getRcFileContentFromSelectedOptions = (
  optionSelection: StartProjectOptionSelectionResult
): RcFile => {
  const { stateManagementLibrary, styleLibrary } = optionSelection;
  return {
    projectUses: {
      redux: stateManagementLibrary !== StateLibraryChoice.NoStateManagement,
      rtkQuery:
        stateManagementLibrary === StateLibraryChoice.ReduxToolkitWithQuery,
      styledComponents: styleLibrary === StyleLibraryChoice.StyledComponents
    }
  };
};

// Some options are mutually exclusive
// This handles the case where one option excludes a file/directory that's included in another
export const getFilePathsToExcludeFromSelectedOptions = (
  optionSelection: StartProjectOptionSelectionResult
) => {
  const SelectionToOptionalFilePathsMapEntries = Object.entries(
    SelectionToOptionalFilePathsMap
  );
  const selectedOptions = Object.values(optionSelection);
  const filesToExclude = SelectionToOptionalFilePathsMapEntries.filter(
    ([option]) => !selectedOptions.includes(option)
  ).flatMap(([_, exclusion]) => exclusion);

  const filesToInclude = SelectionToOptionalFilePathsMapEntries.filter(
    ([option]) => selectedOptions.includes(option)
  ).flatMap(([_, exclusion]) => exclusion);

  const exclusions = filter(filesToExclude, fileToExclude =>
    every(
      filesToInclude,
      fileToInclude => !isEqual(fileToInclude, fileToExclude)
    )
  );

  const dedupedExclusions = uniqWith(exclusions, isEqual);

  const escapeRegExp = (incomingString: string) => {
    return incomingString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  return map(dedupedExclusions, ({ shouldRegexp, matcher }) => {
    const escapedMatcher = shouldRegexp
      ? new RegExp(escapeRegExp(matcher))
      : matcher;
    return shouldRegexp ? new RegExp(escapedMatcher) : escapedMatcher;
  });
};
