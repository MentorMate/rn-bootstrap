# baseProject Project Repository

## Table of contents

1. [Introduction](#introduction)
1. [Tech Overview](#tech-overview)
1. [Third-Party Dependencies](#third-party-dependencies)
1. [Prerequisites](#prerequisites)
1. [Getting Started](#getting-started)
1. [Scripts](#scripts)
1. [Setting an environmental variable](#setting-an-environmental-variable)
1. [Git strategy](#git-strategy)
1. [Pull Requests](#pull-requests)
1. [Versioning](#versioning)
1. [Build Process](#build-process)
1. [CI/CD](#cicd)
1. [Folder structure](#folder-structure)
1. [Unit Testing](#unit-testing)
1. [Commit messages guide](#commit-messages-guide)

## Introduction

A React Native application that would be distributed through iOS and Android
stores.

## Tech Overview

- React
- React Native
- typescript
- React Navigation
- Jest
- react-testing-library

## Third-Party Dependencies

The list of third-party dependencies and their versions can be found in the
package.json file at the root of this repo.

## Prerequisites

_assuming your development environment is MacOS_

- `brew`
  - to install `brew` run the following command in the terminal
    `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
- `Git`
  - run the following command in the terminal `brew install git`
- `Node` [latest]
  - run the following command in the terminal `brew install node`
- `yarn`
  - run the following command in the terminal `brew install yarn`
- `CocoaPods`
  - run the following command in the terminal `sudo gem install cocoapods`
- `Android Studio` (optional)
  - download the Android Studio from
    [here](https://developer.android.com/studio)
  - Follow the [instructions](https://developer.android.com/studio/install#mac)
    and install it
- `fastlane`
  - (macOs) run the following command in the terminal `xcode-select --install`
  - run the following command in the terminal `bundle install`

_for `node-gyp` on Windows_
- install python (should work with versions 2 and 3 but tested with python2 only)
- you need to have Visual Studio or `npm install --global windows-build-tools`

## Getting Started

1. Run `yarn setup` to install dependencies
1. Run the application:

- Run `yarn android` to build and run the application in the Android simulator.
- Run `yarn ios` to build and run the application in the iOS
  simulator. It will run the application in the default iOS
  simulator.

## Scripts

Available commands for the project and short description of each one:

#### `General Scripts`
- [`start`](#start)
- [`start:reset-cache`](#startreset-cache)
- [`setup`](#setup)
- [`check-circular-deps`](#check-circular-deps)
- [`lint`](#lint)
- [`lint:fix`](#lintfix)
- [`prettier:check-format`](#prettiercheck-format)
- [`prettier:format`](#prettierformat)
- [`test`](#test)
- [`test:clear:cache`](#testclearcache)
- [`test:coverage`](#testcoverage)
- [`test:watch`](#testwatch)
- [`typecheck`](#typecheck)
- [`validate:commit-message`](#validatecommit-message)

#### `Android Scripts`
- [`android`](#android)
- [`android:dev`](#androiddev)
- [`android:dev-release`](#androiddev-release)
- [`android:stage`](#androidstage)
- [`android:stage-release`](#androidstage-release)
- [`android:prod`](#androidprod)
- [`android:prod-release`](#androidprod-release)

#### `iOS Scripts`
- [`pod-install`](#pod-install)
- [`pod-clean-install`](#pod-clean-install)
- [`ios`](#ios)
- [`ios-dev`](#ios-dev)
- [`ios-stage`](#ios-stage)
- [`ios-prod`](#ios-prod)

#### `Fastlane Scripts`

- [`npm:version:patch`](#npmversionpatch)
- [`npm:version:minor`](#npmversionminor)
- [`npm:version:major`](#npmversionmajor)
- [`fastlane:update-versions`](#fastlaneupdate-versions)
- [`version:build`](#versionbuild)
- [`version:patch`](#versionpatch)
- [`version:minor`](#versionminor)
- [`version:major`](#versionmajor)


### `General Scripts:`

#### `start`

Starts the server that communicates with connected devices.

#### `start:reset-cache`

Starts the server that communicates with connected devices resetting the Metro`s cache before that.

#### `setup`

Install all dependencies for the project. Also installs pods.

#### `check-circular-deps`

Checks the project for circular dependencies. Used in pre-commit husky hook.

#### `lint`

Runs `eslint` - used for identifying and reporting on patterns found in ECMAScript/JavaScript code(.js,.jsx,.ts,.tsx files).

#### `lint:fix`

Runs `eslint` with --fix prefix which automatically fixes found problems.

#### `prettier:check-format`

Report on patterns found in .js,.jsx,.ts,.tsx, .css, .json and other files. Rules are listed in .prettierrc.js.

#### `prettier:format`

Formats all files supported by Prettier in the current directory and its subdirectories.

#### `typecheck`

Compiles the project defined by tsconfig.json file.

#### `validate:commit-message`

Checks if the commit messages meet the format described in .commitlintrc.js file.
The command is run automatically by husky on each commit. Check commit-msg husky hook.

#### `test`

Run all tests.

#### `test:clear:cache`

Deletes the Jest cache directory and then exits without running tests.

#### `test:coverage`

Generates test coverage report.

#### `test:watch`

Watch files for changes and rerun tests related to changed files.

### `Android scripts:`

#### `android`

Installs and launches the Android app the default device/simulator.

#### `android:dev`

Installs and launches the Android app in devDebug mode. Uses .env.development config file.

#### `android:dev-release`

Installs and launches the Android app in devRelease mode. Uses .env.development config file.

#### `android:stage`

Installs and launches the Android app in stageDebug mode. Uses .env.staging config file.

#### `android:stage-release`

Installs and launches the Android app in stageRelease mode. Uses .env.staging config file.

#### `android:prod`

Installs and launches the Android app in prodDebug mode. Uses .env.production config file.

#### `android:prod-release`

Installs and launches the Android app in prodRelease mode. Uses .env.production config file.

### `iOS scripts:`

#### `pod-install`

Navigates to ./ios folder and runs `pod install` command.

#### `pod-clean-install`

Navigates to ./ios folder and runs `pod install` command but deletes the Pods folder before that.

#### `ios`

Installs and launches the iOS app the default device/simulator.

#### `ios-dev`

Installs and launches the iOS with Dev scheme - uses .env.development config file.

#### `ios-stage`

Installs and launches the iOS with Stage scheme - uses .env.staging config file.

#### `ios-prod`

Installs and launches the iOS with Production scheme - uses .env.production config file.


### `Fastlane Scripts: `

#### `npm:version:patch`

Increments patch level version.

#### `npm:version:minor`

Increments minor level version.

#### `npm:version:major`

Increments major level version.

### `fastlane:update-versions`

Executes the update_version lane which increments the build version.

### `version:build`

Increments the build number.

### `version:patch`

Increments the build number and the patch version.

### `version:minor`

Increments the build number and the minor version.

### `version:major`

Increments the build number and the major version.



## Setting an environmental variable

We are using `react-native-config` module to expose environmental
variables to react-native supporting multiple
environments. There are three environment files in the project:

- .env.development
- .env.staging
- .env.production

Each of the files corresponds to a specific environment. The `.env` file will
provide the default values if for any reason some variable is missing from its
respective file. Be careful when adding a new variable - add its values in all
environmental files.

## Git strategy

This project is using a modified version of GitFlow strategy. The key benefits
of this strategy includes easy parallel feature development, easy collaboration
between multiple developers within a single feature branch, support for
emergency fixes (hotfixes).

#### Branches

- **`develop`** - `develop` is the main branch for development. All completed
  feature branches gets merged here.

- **`test`** - we use `test` branch for producing a build for the QA's. Whenever
  we merge a code into that branch, an automatic pipeline would be triggered,
  and a new build would be created and distributed to the appropriate channels.

- **`staging`** - used for creating a stage environment builds. Whenever we
  merge a code into that branch, an automatic pipeline would be triggered, and a
  new build would be created and distributed to the appropriate channels.

- **`master`** - used for creating a production builds. The `master` branch
  tracks released code only. The only commits to `master` are merges from
  `staging` and `hotfix` branches.

#### Branch naming

When creating branch use the following pattern:
`[feature | bugfix | hotfix | task]/TicketNumber`

For example, you have to create a feature, and your ticket number is 7888, then
you should create the following branch: `feature/7888` The same is valid if
you're working on a bugfix, hotfix, or a task.

#### Feature development

The following rules apply when a new feature needs to be developed:

1. Create a **feature** branch from `develop`
1. The branch name should apply to the following pattern:
   `feature/[Azure DevOps ticket number]`. Example: `feature/10`
1. After the development of the new feature is completed, create a Pull Request
   to `develop` and assign at least 2 reviewers.

#### Multiple developers working on a single feature ticket

The following rules apply when a new feature needs to be developed by multiple
developers at the same time:

1. Create a **feature** branch from `develop`
1. The branch name should apply to the following pattern:
   `feature/[ticket number]`. Example: `feature/10`
1. Create sub tasks and assign them.
1. Create a **task** branch from the feature branch.
1. After the development of the task/s is completed, merge back the task branch
   into the feature branch.
1. After the development of the new feature is completed, create a Pull Request
   to `develop` and assign at least 2 reviewers.

#### Releasing

When it is time for a release, a build from the `staging` branch is created and
distributed to the QA's. Any problems are fixed with starting the `bugfix`
branch directly from the `staging` branch.  
After the code gets into a _bug free state_ mode, the `staging` branch is merged
into `master` and `develop` to make sure, that any changes made in the `staging`
branch will be not lost by any new development.

#### Hotfixes

Hotfixes branches are made from a tagged release. Those branches are used for
emergency fixes and are branched directly from a tagged release in the `master`
branch, and when finished are merged back into both `master` and `develop`.

#### Code promotion process

1. Feature
1. Merge in develop
1. Merge develop into test
1. QA testing the build
1. Merge testing into staging
1. QA testing the build
1. Tag the release
1. Merge into master (releasing to production)

###### // TODO diagram

## Pull Requests

Open a Pull Request when a unit of work (feature, task, bugfix, etc.) has been
completed. Once a PR is opened, discuss and review the potential changes with PR
reviewers and add follow-up commits.

⚠️ In order to merge your changes into the target branch, you need to have at
least **one** approval from a team-member.

## Versioning

This project uses the **Semantic Versioning** system. The version number format
is **MAJOR.MINOR.PATCH**

When you need to update it, follow the next simple rules:

- **MAJOR** version when you make incompatible API changes
- **MINOR** version when you add functionality in a backwards compatible manner
- **PATCH** version when you make backwards compatible bug fixes

✅ Since we want to update only a single version number, without having to open
the iOS and Android projects, changing their version numbers, and doing the
impossible to keep the numbers in sync, our **package.json version will be the
source of truth**.

✅ When you have to update a _major, minor, or patch version_, **run the
relevant script**, and all the changes would be reflected accordingly.

For more info [https://semver.org/](https://semver.org/)

## Build Process (project specific)

In order to create a build you'll have to do the following:

- run one of the available scripts in the `package.json`:
  - for creating a QA build use `version:build`
  - for creating a production build where you want to increment the **patch**
    version, use: `version:patch`
  - for creating a production build where you want to increment the **minor**
    version, use: `version:minor`
  - for creating a production build where you want to increment the **major**
    version, use: `version:major`
- commit the changes
  - When releasing a production version, add git tag in the build commit.
- create a PR to the appropriate branch (see
  [Code promotion process](#code-promotion-process))
- merge the changes
- update the release notes
- Ideally pipelines for **test** and **staging** branches would run automatically
- when the build is done, update the testers that should receive it

## CI/CD
The project comes with basic GitHub actions file included.
It will trigger lint, typecheck, check for circular dependencies and run tests when a PR is created against develop branch.\
//TODO update based on the project needs

## //TODO describe Folder structure

###Example (EDIT ACCORDINGLY):
The folder structure in the project is **feature based**. Features or modules
are domain specific pieces of code. They should be **self-contained** and should
describe a part of the application. For example authentication, settings, etc.
Modules should not rely on internals of other modules. Each module should
**provide a simple API in its index.ts file** which would be used by the other
modules.

A few more notes around the folder structure:

- The folder structure is feature based.
- Group files that belong to the same domain in a feature folder.
- Features should be modular and could depend on other features. Try not to mix
  files that belong to other features into one folder.
- Separate the folders in a feature, based on their technical role. For example:

```
- authentication
    -- components
    -- hooks
    -- utils
    etc.
```

In the feature children folders, put entities that are only specific for the
current feature. If you have component that could be used by multiple features,
move the component higher in the folder hierarchy.

- ⚠️ modules like **form, components-lib, authentication, utils** should **NOT**
  include code specific to that project. **They should rely on external
  configuration.** Those modules should not depend on project feature modules.
  They should be reused throughout the project without any relation to any
  feature. They also should have higher test coverage.

## Unit Testing

There are five scripts in the `package.json` file that are responsible for
running the unit tests:

- `yarn test` to run the test suite with Jest
- `yarn test:coverage` to generate test coverage
- `yarn test:watch` to run Jest in watch mode (use it in development)
- `yarn test:debug` to debug tests (use it in development)
- `yarn test:ci` to run the test suite in a CI environment

While developing, use the `yarn test:watch` script. This will run the test in
_interactive mode_ with the following options:

- `a` -- will run all tests
- `f` -- will run only the failed tests
- `q` -- will quit watch mode
- `p` -- will filter by a _filename_ regex pattern
- `t` -- will filter by a _test name_ regex pattern
- `Enter` will trigger a test run

Try to follow the next few rules:

- Keep the test files close to the components/functions that are tested.

```
-- Layout
  --- LayoutComponent.tsx
  --- LayoutComponent.test.tsx

```

- Create your cases with end users in mind.
- Test’s cases description should follow the pattern: “Should --do something--”

  ```jsx
  // bad
  it('Test that the form will be filled out a across multiple screens.')...
  it('test ListItem Set Daily Reminder.')...

  // good
  it('Should fill out the form across multiple screens.')...
  it('Should render the daily reminder list item.')...

  ```

#### Coverage

- Once you've generated a coverage report, you can run
  `yarn test:open-coverage-report` which will open the report in your default
  browser.
- You can find the configuration for the **coverage threshold** in the
  `jest.config.js` file.
- ⚠️ When developing a new feature, you'll have to add tests that would increase
  the coverage at least to the percentage in the config file. Otherwise, you
  won't be able to push your code to the repository. Unit tests are also ran as
  part of the CI pipelines which adds another layer of protection.

## Commit messages guide

Good commit messages serve at least two important purposes:

- To speed up the reviewing process.
- To help us know why a particular change has been made to the code or why a
  specific feature has been added.

A commit message should answer three primary questions;

1. Why is this change necessary?
1. How does this commit address the issue?
1. What effects does this change have?

Structure your commit message like this: From:
[https://git-scm.com/book/ch5-2.html](https://git-scm.com/book/ch5-2.html)

```
    chore: AB# 3333 Short (50 chars or less) summary of changes [commit subject]

    [separate the commit subject from the commit body with an empty line]

    More detailed explanatory text, if necessary.  Wrap it to about 72
    characters or so.  In some contexts, the first line is treated as the
    subject of an email and the rest of the text as the body.  The blank
    line separating the summary from the body is critical (unless you omit
    the body entirely); tools like rebase can get confused if you run the
    two together. [commit body]

    [separate the commit body from the commit footer with an empty line]

    Further paragraphs come after blank lines. [commit footer]
        - Bullet points are okay, too
        - Typically a hyphen or asterisk is used for the bullet, preceded by a
            single space, with blank lines in between, but conventions vary here

```

#### Commit linter

For consistency, as part of the project we are using a `commit linter` package.
The following rules are applied:

- the commit message should follow the convention:
  `feat: AB#333 commit message`, where:
  - `feat` is the commit type
  - `AB#333 ...` is the commit subject
- a commit that appends a **! after the type/scope** introduces a breaking
  change in the code! For example:
  `refactor!: remove push-notifications support`
- the commit types that could be used are: _ `chore` -- use this type when your
  changes doesn't affect the application/s source code. For example:
  `chore: upgrade typescript` _ `feat` -- a commit of the type _feat_ introduces
  a new feature to the codebase * `fix` -- a commit of the type *fix* patches a
  bug in the codebase * `docs` -- use it when adding/editing documents in the
  codebase _ `style` -- changes that do not affect the meaning of the code
  (white-space, formatting, missing semi-colons, etc) _ `test` -- use it when
  adding/editing existing tests * `revert` -- a commit of the type *revers* is
  used when the commit reverts a previous one * `ci` -- use it when introducing
  changes to the CI scripts \*\* reference
  [conventionalcommits](https://www.conventionalcommits.org/en/v1.0.0/)
- the subject should start with `AB#` because we want to integrate with Azure
  Dev Ops boards

#### General commit message rules

- ⚠️ Not every commit requires both a subject and a body. Sometimes a single
  line is fine. When the change simple enough, that no further clarifications or
  context around the change is necessary. For example: `Fix typo in the build`.
  There is no need for further information in this case.
- ⚠️ If it seems difficult to summarize what your commit does, it may be because
  it includes several logical changes or bug fixes, and are better split up into
  several commits using git add -p.
- ✅ Write the summary line and description of what you have done in the
  imperative mood, that is as if you were commanding someone. Start the line
  with "Fix", "Add", "Change" instead of "Fixed", "Added", "Changed".
- ✅ Always leave the second line blank.
- ✅ Line break the commit message (to make the commit message readable without
  having to scroll horizontally).
- 🚫 Don't end the summary line with a period - it's a title and titles don't
  end with a period.
