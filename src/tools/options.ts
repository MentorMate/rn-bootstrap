import { PromptOptions } from 'gluegun/build/types/toolbox/prompt-enquirer-types';
import { TemplateParams } from '../types/types';
import {
  navigationDeps,
  reduxDeps,
  styleDeps,
  styleDevDeps
} from './dependency-versions';

export enum StyleLibraryChoice {
  StyledComponents = 'Styled Components',
  StyleSheet = 'React-Native built-in StyleSheet'
}

export enum StateLibraryChoice {
  ReduxToolkit = 'Redux Toolkit',
  NoStateManagement = 'No State Management'
}

export enum ReactNavigationExampleChoice {
  WithReactNavigationExample = 'With set-up and example screens.',
  WithoutReactNavigationExample = 'Without examples.'
}

// When the user selects an option, the corresponding dependencies are installed
export const SelectionToDependencyNameMap = {
  [StyleLibraryChoice.StyledComponents]: styleDeps,
  [StateLibraryChoice.ReduxToolkit]: reduxDeps,
  [ReactNavigationExampleChoice.WithReactNavigationExample]: navigationDeps,
  [ReactNavigationExampleChoice.WithoutReactNavigationExample]: navigationDeps
};

export const SelectionToDevDependencyNameMap = {
  [StyleLibraryChoice.StyledComponents]: styleDevDeps
};

// Maps selection to handlebars-friendly object for easier conditionals within templates.
export const SelectionToTemplateParamsMap: Partial<Record<
  StyleLibraryChoice | StateLibraryChoice | ReactNavigationExampleChoice,
  Partial<TemplateParams>
>> = {
  [StyleLibraryChoice.StyledComponents]: {
    hasStyledComponents: true
  },
  [StateLibraryChoice.ReduxToolkit]: {
    hasReduxToolkit: true
  },
  [ReactNavigationExampleChoice.WithReactNavigationExample]: {
    hasReactNavigationExample: true
  }
};

const getFullPathMatcher = (partialPath: string) =>
  new RegExp(`^${partialPath}.*`);

// Paths from unselected options get skipped when copying the baseProject
// You can also specify individual file names as strings
export const SelectionToOptionalFilePathsMap = {
  [StateLibraryChoice.ReduxToolkit]: [getFullPathMatcher('src/store/')],
  [ReactNavigationExampleChoice.WithReactNavigationExample]: [
    getFullPathMatcher('src/common/navigation/'),
    getFullPathMatcher('src/features/fancy-feature'),
    getFullPathMatcher('src/features/another-fancy-feature')
  ]
};

export const DefaultTemplateParams: TemplateParams = {
  hasStyledComponents: false,
  hasReduxToolkit: false,
  hasReactNavigationExample: false
};

const PromptSelectionOptions = {
  styleLibrary: {
    choices: Object.values(StyleLibraryChoice),
    message: 'Styling Library:'
  },
  stateManagementLibrary: {
    choices: Object.values(StateLibraryChoice),
    message: 'State Management:'
  },
  reactNavigationExample: {
    choices: Object.values(ReactNavigationExampleChoice),
    message: 'React Navigation:'
  }
};

export const SelectionPrompts: PromptOptions[] = Object.entries(
  PromptSelectionOptions
).map(([key, value]) => {
  return {
    type: 'select',
    name: key,
    message: value.message,
    choices: value.choices
  };
});
