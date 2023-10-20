import { PromptOptions } from 'gluegun/build/types/toolbox/prompt-enquirer-types';
import { TemplateParams } from '../types/BaseProjectTemplateParams';
import {
  navigationDeps,
  gluestackUICoreDeps,
  gluestackUIThemedDefaultDeps,
  gluestackUIThemedMMDeps,
  reduxDeps,
  styleDeps,
  styleDevDeps
} from './dependency-versions';

export enum StyleLibraryChoice {
  GluestackUIcore = 'Gluestack-ui Core',
  GluestackUIThemedDefault = 'Gluestack-ui Themed Default',
  GluestackUIThemedMM = 'Gluestack-ui Themed MentorMate',
  StyledComponents = 'Styled Components',
  StyleSheet = 'React-Native built-in StyleSheet'
}

export enum StateLibraryChoice {
  ReduxToolkit = 'Redux Toolkit',
  ReduxToolkitWithQuery = 'Redux Toolkit with RTK Query Example',
  NoStateManagement = 'No State Management'
}

export enum ReactNavigationExampleChoice {
  WithReactNavigationExample = 'With set-up and example screens',
  WithoutReactNavigationExample = 'Without examples'
}

// When the user selects an option, the corresponding dependencies are installed
export const SelectionToDependencyNameMap = {
  [StyleLibraryChoice.GluestackUIcore]: gluestackUICoreDeps,
  [StyleLibraryChoice.GluestackUIThemedDefault]: gluestackUIThemedDefaultDeps,
  [StyleLibraryChoice.GluestackUIThemedMM]: gluestackUIThemedMMDeps,
  [StyleLibraryChoice.StyledComponents]: styleDeps,
  [StateLibraryChoice.ReduxToolkit]: reduxDeps,
  [StateLibraryChoice.ReduxToolkitWithQuery]: reduxDeps,
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
  [StyleLibraryChoice.GluestackUIcore]: {
    hasGluestackUI: true,
    hasGluestackUIcore: true
  },
  [StyleLibraryChoice.GluestackUIThemedDefault]: {
    hasGluestackUI: true,
    hasGluestackUIThemedDefault: true
  },
  [StyleLibraryChoice.GluestackUIThemedMM]: {
    hasGluestackUI: true,
    hasGluestackUIThemedMM: true
  },
  [StyleLibraryChoice.StyledComponents]: {
    hasStyledComponents: true
  },
  [StateLibraryChoice.ReduxToolkit]: {
    hasReduxToolkit: true
  },
  [StateLibraryChoice.ReduxToolkitWithQuery]: {
    hasRTKQuery: true,
    hasReduxToolkit: true
  },
  [ReactNavigationExampleChoice.WithReactNavigationExample]: {
    hasReactNavigationExample: true
  }
};

const getFullPathMatcher = (partialPath: string) => {
  return { matcher: `^${partialPath}.*`, shouldRegexp: true };
};

const getFileNameMatcher = (fileName: string) => {
  return { matcher: fileName, shouldRegexp: false };
};

// Paths from unselected options get skipped when copying the baseProject
// You can also specify individual file names as strings
export const SelectionToOptionalFilePathsMap = {
  [StateLibraryChoice.ReduxToolkit]: [getFullPathMatcher('src/common/store/')],
  [StateLibraryChoice.ReduxToolkitWithQuery]: [
    getFullPathMatcher('src/common/store/'),
    getFullPathMatcher('src/common/services/')
  ],
  [ReactNavigationExampleChoice.WithReactNavigationExample]: [
    getFullPathMatcher('src/common/navigation/'),
    getFullPathMatcher('src/features/fancy-feature/'),
    getFullPathMatcher('src/features/another-fancy-feature/')
  ]
};

export const DefaultTemplateParams: TemplateParams = {
  hasGluestackUI: false,
  hasGluestackUIcore: false,
  hasGluestackUIThemedDefault: false,
  hasGluestackUIThemedMM: false,
  hasStyledComponents: false,
  hasReduxToolkit: false,
  hasRTKQuery: false,
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
