import { PromptOptions } from 'gluegun/build/types/toolbox/prompt-enquirer-types';
import { TemplateParams } from '../types/types';

export enum StyleLibraryChoice {
  StyledComponents = 'Styled Components',
  StyleSheet = 'React-Native built-in StyleSheet',
}

export enum StateLibraryChoice {
  ReduxToolkit = 'Redux Toolkit',
  NoStateManagement = 'No State Management',
}

export const SelectionToDependencyNameMap = {
  [StyleLibraryChoice.StyledComponents]: ['styled-components@^5.3.3'],
  [StateLibraryChoice.ReduxToolkit]: ['@reduxjs/toolkit@^1.7.2', 'react-redux@^7.2.6'],
};

export const SelectionToDevDependencyNameMap = {
  [StyleLibraryChoice.StyledComponents]: [
    '@types/styled-components-react-native@^5.1.3',
  ],
};

// Maps selection to handlebars-friendly object for easier conditionals within templates.
export const SelectionToTemplateParamsMap: Partial<
  Record<StyleLibraryChoice | StateLibraryChoice, Partial<TemplateParams>>
> = {
  [StyleLibraryChoice.StyledComponents]: {
    hasStyledComponents: true,
  },
  [StateLibraryChoice.ReduxToolkit]: {
    hasReduxToolkit: true,
  },
};

export const SelectionToOptionalFilePathsMap = {
  [StateLibraryChoice.ReduxToolkit]: ['app/hooks.ts', 'app/store.ts'],
};

export const DefaultTemplateParams: TemplateParams = {
  hasStyledComponents: false,
  hasReduxToolkit: false,
};

export const OptionalFilePaths = Object.values(
  SelectionToOptionalFilePathsMap
).flatMap((filePath) => filePath);

const PromptSelectionOptions = {
  styleLibrary: {
    choices: Object.values(StyleLibraryChoice),
    message: 'Please select a styling library',
  },
  stateManagementLibrary: {
    choices: Object.values(StateLibraryChoice),
    message: 'Please select a state management library',
  },
};

export const LibrarySelectionPrompts: PromptOptions[] = Object.entries(
  PromptSelectionOptions
).map(([key, value]) => {
  return {
    type: 'select',
    name: key,
    message: value.message,
    choices: value.choices,
  };
});
