import {
  Dependencies,
  OptionSelectionResult,
  RcFile,
  TemplateParams
} from '../types/types';
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
  optionSelection: OptionSelectionResult
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
  optionSelection: OptionSelectionResult
): TemplateParams =>
  Object.values(optionSelection).reduce<TemplateParams>((prev, curr) => {
    const paramsForSelectedOption = SelectionToTemplateParamsMap[curr];
    if (paramsForSelectedOption) {
      return { ...prev, ...paramsForSelectedOption };
    }
    return prev;
  }, DefaultTemplateParams);

export const getRcFileContentFromSelectedOptions = (
  optionSelection: OptionSelectionResult
): RcFile => {
  const { stateManagementLibrary, styleLibrary } = optionSelection;
  return {
    projectUses: {
      redux: stateManagementLibrary === StateLibraryChoice.ReduxToolkit,
      styledComponents: styleLibrary === StyleLibraryChoice.StyledComponents
    }
  };
};

export const getFilePathsToExclude = (
  optionSelection: OptionSelectionResult
) => {
  const selectionChoices = Object.values(optionSelection);
  return Object.entries(SelectionToOptionalFilePathsMap)
    .flatMap(([option, path]) =>
      selectionChoices.includes(option) ? undefined : path
    )
    .filter(path => path);
};
