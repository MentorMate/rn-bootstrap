import { join, sep } from 'path';
import { PromptOptions } from 'gluegun/build/types/toolbox/prompt-enquirer-types';
import { TemplateParams } from '../types/BaseProjectTemplateParams';
import {
  navigationDeps,
  gluestackUIDeps,
  reduxDeps,
  styleDeps,
  styleDevDeps,
  glueStackUICoreDeps,
  storybookDevDeps,
  reactotronDevDeps,
  iconsDevDeps
} from './dependency-versions';

export enum StyleLibraryChoice {
  GluestackUICore = 'Gluestack-UI Core (Unstyled)',
  GluestackUIDefault = 'Gluestack-UI Default',
  GluestackUIEjected = 'Gluestack-UI Ejected',
  StyledComponents = 'Styled Components',
  StyleSheet = 'React-Native built-in StyleSheet',
}

export enum StorybookChoice {
  Storybook = 'Storybook no examples',
  StorybookWithStories = 'Storybook with Stories example',
  NoStorybook = 'No Storybook' 
}

export enum IconChoice {
  withIcons = 'Yes',
  withoutIcons = 'No',
  
}

export enum StateLibraryChoice {
  ReduxToolkit = 'Redux Toolkit',
  ReduxToolkitWithQuery = 'Redux Toolkit with RTK Query Example',
  NoStateManagement = 'No State Management'
}

export enum ReactotronChoice {
  withReactotron = 'Add Reactotron',
  withoutReactotron = 'No Reactotron'
}

export enum ReactNavigationExampleChoice {
  WithReactNavigationExample = 'With set-up and example screens',
  WithoutReactNavigationExample = 'Without examples'
}

// When the user selects an option, the corresponding dependencies are installed
export const SelectionToDependencyNameMap = {
  [StyleLibraryChoice.GluestackUICore]: glueStackUICoreDeps,
  [StyleLibraryChoice.GluestackUIDefault]: gluestackUIDeps,
  [StyleLibraryChoice.GluestackUIEjected]: gluestackUIDeps,
  [StyleLibraryChoice.StyledComponents]: styleDeps,
  [StateLibraryChoice.ReduxToolkit]: reduxDeps,
  [StateLibraryChoice.ReduxToolkitWithQuery]: reduxDeps,
  [ReactNavigationExampleChoice.WithReactNavigationExample]: navigationDeps,
  [ReactNavigationExampleChoice.WithoutReactNavigationExample]: navigationDeps
};

export const SelectionToDevDependencyNameMap = {
  [StyleLibraryChoice.StyledComponents]: styleDevDeps,
  [StorybookChoice.Storybook]: storybookDevDeps,
  [StorybookChoice.StorybookWithStories]: storybookDevDeps,
  [ReactotronChoice.withReactotron]: reactotronDevDeps,
  [IconChoice.withIcons]: iconsDevDeps,
};

// Maps selection to handlebars-friendly object for easier conditionals within templates.
export const SelectionToTemplateParamsMap: Partial<Record<
  | StyleLibraryChoice
  | StorybookChoice
  | StateLibraryChoice
  | ReactotronChoice
  | ReactNavigationExampleChoice
  | IconChoice,
  Partial<TemplateParams>
>> = {
  [StyleLibraryChoice.GluestackUICore]: {
    hasGluestackUICore: true,
    hasAnyGluestackUIOption: true
  },
  [StyleLibraryChoice.GluestackUIDefault]: {
    hasGluestackUI: true,
    hasGluestackUIDefaultTheme: true,
    hasAnyGluestackUIOption: true
  },
  [StyleLibraryChoice.GluestackUIEjected]: {
    hasGluestackUI: true,
    hasGluestackUIEjected: true,
    hasAnyGluestackUIOption: true
  },
  [StyleLibraryChoice.StyledComponents]: {
    hasStyledComponents: true
  },
  [StorybookChoice.Storybook]: {
    hasStorybook: true,
  },
  [StorybookChoice.StorybookWithStories]: {
    hasStorybook: true,
    hasStorybookExample: true
  },
  [StateLibraryChoice.ReduxToolkit]: {
    hasReduxToolkit: true
  },
  [StateLibraryChoice.ReduxToolkitWithQuery]: {
    hasRTKQuery: true,
    hasReduxToolkit: true
  },
  [ReactotronChoice.withReactotron]: {
    hasReactotron: true
  },
  [ReactotronChoice.withoutReactotron]: {
    hasReactotron: false
  },
  [ReactNavigationExampleChoice.WithReactNavigationExample]: {
    hasReactNavigationExample: true
  },
  [IconChoice.withIcons]: {
    hasIcons: true,
  },
  
};

const getFullPathMatcher = (partialPath: string) => {
  const parts = partialPath.split('/');
  const constructedPath = parts.join(sep);
  return { matcher: constructedPath, shouldRegexp: true };
};

const getFileNameMatcher = (fileName: string) => {
  return { matcher: fileName, shouldRegexp: false };
};

// Paths from unselected options get skipped when copying the baseProject
// You can also specify individual file names as strings
export const SelectionToOptionalFilePathsMap = {
  [StorybookChoice.Storybook]: [
    getFileNameMatcher('App.storybook.tsx')
  ],
  [StorybookChoice.StorybookWithStories]: [
    getFullPathMatcher('config/storybook/'),
    getFileNameMatcher('App.storybook.tsx')
  ],
  [StateLibraryChoice.ReduxToolkit]: [getFullPathMatcher('src/common/store/')],
  [StateLibraryChoice.ReduxToolkitWithQuery]: [
    getFullPathMatcher('src/common/store/'),
    getFullPathMatcher('src/common/services/')
  ],
  [ReactotronChoice.withReactotron]: [
    getFileNameMatcher('reactotronConfig.js'),
    getFullPathMatcher('__mocks__/reactotron-react-native.ts')
  ],
  [ReactNavigationExampleChoice.WithReactNavigationExample]: [
    getFullPathMatcher('src/common/navigation/'),
    getFullPathMatcher('src/features/fancy-feature/'),
    getFullPathMatcher('src/features/another-fancy-feature/')
  ]
};

export const gluestackOptions = [
  StyleLibraryChoice.GluestackUICore,
  StyleLibraryChoice.GluestackUIEjected,
  StyleLibraryChoice.GluestackUIDefault
];

export const DefaultTemplateParams: TemplateParams = {
  hasGluestackUI: false,
  hasGluestackUICore: false,
  hasGluestackUIDefaultTheme: false,
  hasGluestackUIEjected: false,
  hasAnyGluestackUIOption: false,
  hasStyledComponents: false,
  hasStorybook: false,
  hasStorybookExample: false,
  hasReduxToolkit: false,
  hasRTKQuery: false,
  hasReactotron: false,
  hasReactNavigationExample: false,
  hasIcons: false
};

const PromptSelectionOptions = {
  styleLibrary: {
    choices: Object.values(StyleLibraryChoice),
    message: 'Styling Library:'
  },
  storybook: {
    choices: Object.values(StorybookChoice),
    message: 'Storybook:'
  },
  stateManagementLibrary: {
    choices: Object.values(StateLibraryChoice),
    message: 'State Management:'
  },
  reactotron: {
    choices: Object.values(ReactotronChoice),
    message: 'Reactotron:'
  },
  reactNavigationExample: {
    choices: Object.values(ReactNavigationExampleChoice),
    message: 'React Navigation:'
  },
  icons: {
    choices: Object.values(IconChoice),
    message: 'Lucide icons:'
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
