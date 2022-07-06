import { TemplateParams } from '../types/BaseProjectTemplateParams';
import { Dependencies } from '../types/Dependencies';
import { RcFile } from '../types/RcFile';
import { StartProjectOptionSelectionResult } from '../types/StartProjectOptionSelectionResult';

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
      redux: stateManagementLibrary === StateLibraryChoice.ReduxToolkit,
      styledComponents: styleLibrary === StyleLibraryChoice.StyledComponents
    }
  };
};

export const getFilePathsToExcludeFromSelectedOptions = (
  optionSelection: StartProjectOptionSelectionResult
) => {
  const selectionChoices = Object.values(optionSelection);
  return Object.entries(SelectionToOptionalFilePathsMap)
    .flatMap(([option, path]) =>
      selectionChoices.includes(option) ? undefined : path
    )
    .filter(path => path);
};
