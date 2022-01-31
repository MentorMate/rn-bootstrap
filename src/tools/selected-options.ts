import {
  Dependencies,
  OptionSelectionResult,
  TemplateParams
} from '../types/types'
import {
  DefaultTemplateParams,
  OptionalFilePaths,
  SelectionToDependencyNameMap,
  SelectionToDevDependencyNameMap,
  SelectionToTemplateParamsMap,
  SelectionToOptionalFilePathsMap
} from './constants'

export const getDependenciesToInstallFromSelectedOptions = (
  optionSelection: OptionSelectionResult
): Dependencies =>
  Object.values(optionSelection).reduce<Dependencies>(
    (prev, curr) => {
      const dependenciesForSelection = SelectionToDependencyNameMap[curr]
      if (dependenciesForSelection) {
        prev.dependencies.push(...dependenciesForSelection)
      }
      const devDependenciesForSelection = SelectionToDevDependencyNameMap[curr]
      if (devDependenciesForSelection) {
        prev.devDependencies.push(...devDependenciesForSelection)
      }
      return prev
    },
    { dependencies: [], devDependencies: [] }
  )

export const getTemplateParamsFromSelectedOptions = (
  optionSelection: OptionSelectionResult
): TemplateParams =>
  Object.values(optionSelection).reduce<TemplateParams>((prev, curr) => {
    const paramsForSelectedOption = SelectionToTemplateParamsMap[curr]
    if (paramsForSelectedOption) {
      return { ...prev, ...paramsForSelectedOption }
    }
    return prev
  }, DefaultTemplateParams)

export const getOptionalFilePathsFromSelectedOptions = (
  optionSelection: OptionSelectionResult
) =>
  Object.values(optionSelection).reduce((prev, curr) => {
    const pathsForSelectedOption = SelectionToOptionalFilePathsMap[curr]
    if (pathsForSelectedOption) {
      return [...prev, ...pathsForSelectedOption]
    }
    return prev
  }, [])

export const getFilePathsToExclude = (pathsFromOptionSelection: string[]) =>
  OptionalFilePaths.filter(filePath =>
    !pathsFromOptionSelection.includes(filePath)
  )
