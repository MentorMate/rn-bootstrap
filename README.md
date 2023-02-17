<!-- Space: MMSDLC -->
<!-- Parent: SDLC - Technologies -->
<!-- Parent: SDLC - Front-End -->
<!-- Parent: React Native -->
<!-- Title: React Native Project Templates -->
<!-- Attachment: ./assets/commitizen.png -->
<!-- Attachment: ./assets/generated_feature.png -->
<!-- Attachment: ./assets/select_feature_folders.png -->

<!-- Include: disclaimer.md -->
# rn-bootstrap CLI
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

The CLI facilitates the process of creating a new React Native project from scratch.
When starting a new project with `rn-bootstrap` it automatically installs and sets up the following:
- React
- React Native
- TypeScript
- React Navigation - read more [here](#Navigation)
- Styles(optional) - styled-components vs Stylesheet - read more [here](#Styles)
- Redux State management(optional) - read more [here](#State-Management)
- Jest - unit test setup, threshold for coverage - read more [here](#Testing)
- Predefined environments - read more [here](#Environments)
- Husky Hooks - read more [here](#Husky)
- Commits linter - commitlint and commitizen - read more [here](#Commits)
- Predefined eslint and prettier rules

## Installation
```
npm i -g @mentormate/rn-bootstrap
```

## Prerequisite

Yarn - If you don't already have yarn installed, please follow the steps listed [here](https://yarnpkg.com/getting-started/install).

Before you can start using this tool you need to prepare you local environment for React Native development as described [here](https://reactnative.dev/docs/environment-setup).

Make sure to follow the instructions under the `React Native CLI Quickstart` tab for both iOS and Android platforms and when you reach the `React Native Command Line Interface` return to this guide and proceed with next steps.

## Usage
Create a new project using `start-project` and mandatory options for `Folder Name` and `App Bundle Id`

```
rn-bootstrap start-project awesomeApp com.awesomeapp
```
Note that bundle ID should follow proper format (for details check `BUNDLE_ID_REGEX` in `constants.ts`) or an Error will be thrown.

Pick the styling library - Styled Components or built-in StyleSheet:
```
? Please select a styling library … 
❯ Styled Components
  React-Native built-in StyleSheet
```

Pick the state management library - Redux Toolkit, Redux Toolkit with RTK Query or No State Management
```
? Please select a state management library … 
❯ Redux Toolkit
  Redux Toolkit with RTK Query Example
  No State Management
```

In case you want to add react navigation example code in the project:
```
? React Navigation: … 
❯ With set-up and example screens.
  Without examples.
```

#### `Styles`
- `Styled Components` option - when selected `styled-components` library is automatically installed and 
  basic usage code examples are added in `baseProject/src/features/home/components/HomeComponent.tsx`
  
  If `React-Native built-in StyleSheet` option is picked the application will use the default StyleSheet functionality:
  ```
  const styles = StyleSheet.create({
    container: {
      ...options
    }
  });
  ```

#### `State Management`
- `Redux Toolkit` option - when selected `react-redux` library will be automatically installed. 
  `src/store/store.ts` will be imported in App.tsx. The file contains basic store setup including redux toolkit.
  `src/store/hooks.ts` is also available with predefined setup for easy usage of useDispatch and useSelector.
- `Redux Toolkit with RTK Query` option - will include Redux Toolkit and also predefined RTK Query Example:
   Checkout `baseProject/src/common/services/api/api.ts` and the RTK Query documentation: https://redux-toolkit.js.org/rtk-query/overview

#### `Navigation`
- `With set-up and example screens` option - when selected the App will automatically include example BottomTabNavigator 
  (`src/common/navigation/bottomTab/BottomTabNavigator.tsx`)


#### `Testing`
- The script will install `jest` and setup jest config for coverage threshold

#### `Environments`
- In order to handle different environments the CLI will install `react-native-config` library and include dev, stage and production environment files.

#### `Husky`
- Husky hooks are to be used in order to automate some processes:
  - commit-msg - will trigger validation on the commit message enforcing writing proper commit messages.
  - pre-commit - will run linters and TypeScript check against staged files. It will also check for circular dependencies among the project.
  - pre-push - will run all tests and fail if any of them fail or the coverage threshold is not met.

#### `Commits`
- The CLI enforces usage of proper commit messages using commitlint and commitizen. Commitizen will guide you through a friendly CLI when git commit command is used:
  ![commitizen.png](./assets/commitizen.png)


  It is all about using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 


### `Generator Commands:`
- Container:
  `rn-bootstrap generate container FileNameContainer`
  Filename **must** end with *Container* keyword.
  If a container folder doesn't exist, you will be asked if it should be created.

- Component:
  `rn-bootstrap generate component FileNameComponent`
  Filename **must** end with *Component* keyword.
  If a container folder doesn't exist, you will be asked if it should be created.

- Hook:
  `rn-bootstrap generate hook useMyHookName`
  Filename follows "useYourHookName" convention.

- Model:
  `rn-bootstrap generate model ModelFile`

- Page:
  `rn-bootstrap generate page FileNamePage`
  Filename **must** end with *Page* keyword.

- Util:
  `rn-bootstrap generate util FileNameUtil`

- Test:
  `rn-bootstrap generate test FileName`
  File **must** be placed inside a container, component, hook, model, page or util folder.

- Feature:
  `rn-bootstrap generate feature awesome-feature`
  Feature name should start with lowercase character.
  ![select_feature_folders.png](./assets/select_feature_folders.png)

  As a result, a new set of feature components will be added to the project:
  ![generated_feature.png](./assets/generated_feature.png)


## Contribution

Read our [Contributing Guide][contribution_guide] to learn about our development process, and how to build and test your changes.

# License

MM-RN-CLI is MIT licensed, as found in the [LICENSE][license] file.

[contribution_guide]: ./docs/contribution.md
[license]: ./LICENSE
[mark]: https://github.com/kovetskiy/mark
[confluence]: https://mentormate.atlassian.net/wiki/spaces/MMSDLC/pages/4086366230/React+Native+Project+Templates
