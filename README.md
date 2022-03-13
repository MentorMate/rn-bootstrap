# mm-rn-cli CLI
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A CLI for mm-rn-cli. The CLI facilitates the process of starting a new React Native project from scratch.
When starting a new project with mm-rn-cli it automatically installs and sets up the following:
- React
- React Native
- TypeScript
- React Navigation
- Redux State management(optional) - read more [here](#state)
- Styles(optional) - styled-components vs Stylesheet - read more [here](#styles)
- Jest - unit test setup, threshold for coverage - read more [here](#testing)
- Predefined environments - read more [here](#environments)
- Husky Hooks - read more [here](#husky)
- Commits linter - commitlint and commitizen - read more [here](#commits)
- Predefined eslint and prettier rules - read more [here](#lint)

## Installation
//TODO

## Usage
Create a new project using start-project and mandatory options for Folder Name and App Bundle Id
```
mm-rn-cli start-project awesomeApp com.awesomeapp
```
Note that bundle ID should follow proper format(for details check BUNDLE_ID_REGEX in constants.ts) or an Error will be thrown:
`Invalid Bundle Identifier. Add something like "com.travelapp" or "com.junedomingo.travelapp`

Pick the styling library - Styled Components or built-in StyleSheet:
```
? Please select a styling library … 
❯ Styled Components
  React-Native built-in StyleSheet
```


Pick the state management library - Redux Toolkit or No State Management
```
? Please select a state management library … 
❯ Redux Toolkit
  No State Management
```


###Available options
//TODO

## Customizing your CLI

Check out the documentation at https://github.com/infinitered/gluegun/tree/master/docs.

## Publishing to NPM

To package your CLI up for NPM, do this:

```shell
$ npm login
$ npm whoami
$ npm lint
$ npm test
(if typescript, run `npm run build` here)
$ npm publish
```

# License

MIT - see LICENSE

