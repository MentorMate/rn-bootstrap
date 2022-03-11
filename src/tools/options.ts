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

// When the user selects an option, the corresponding files are NOT skipped when copying
export const SelectionToOptionalFilePathsMap = {
  [StateLibraryChoice.ReduxToolkit]: [
    'src/store/hooks.ts',
    'src/store/store.ts'
  ],
  [ReactNavigationExampleChoice.WithReactNavigationExample]: [
    'src/common/navigation/bottomTab/BottomTabNavigator.tsx',
    'src/common/navigation/stack/StackNavigator.tsx'
  ]
};

export const DefaultTemplateParams: TemplateParams = {
  hasStyledComponents: false,
  hasReduxToolkit: false,
  hasReactNavigationExample: false
};

export const OptionalFilePaths = Object.values(
  SelectionToOptionalFilePathsMap
).flatMap(filePath => filePath);

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
