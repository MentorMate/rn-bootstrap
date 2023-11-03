import {
  SelectionPrompts,
  StorybookChoice,
  StyleLibraryChoice,
  gluestackOptions
} from '../tools/options';
import {
  getDependenciesToInstallFromSelectedOptions,
  getTemplateParamsFromSelectedOptions,
  getFilePathsToExcludeFromSelectedOptions
} from '../tools/option-utils';
import { yarn } from '../tools/yarn';
import {
  RnBootstrapCommand,
  RnBootstrapToolbox
} from '../types/RnBootstrapToolbox';
import { spawnProgress } from '../tools/spawn-progress';
import { join } from 'path';
import { commandFormat, RnBootstrapHeading, p } from '../tools/pretty';
import { StartProjectOptionSelectionResult } from '../types/StartProjectOptionSelectionResult';
import { IS_WINDOWS } from '../tools/constants';

const command: RnBootstrapCommand = {
  name: 'start-project',
  description: 'Creates a new project',
  alias: 'sp',
  run: async toolbox => {
    const {
      parameters: { options }
    } = toolbox;

    if (options.h) {
      showHelp();
    } else {
      await startProject(toolbox);
    }
  }
};

const showHelp = () => {
  p();
  RnBootstrapHeading();
  commandFormat('start-project         ', 'Creates a new React Native app', [
    'rn-bootstrap start-project MyApp com.myappbundleid'
  ]);
  p();
  p('Use this command to generate a new React Native project.');
  p('The command accepts two required parameters: AppName and bundleId.');
  p();
};

const startProject = async (toolbox: RnBootstrapToolbox) => {
  const { prompt, print, filesystem } = toolbox;

  const projectName = toolbox.getProjectName();
  const bundleId = toolbox.getBundleId();
  const selectedOptions = await prompt.ask<StartProjectOptionSelectionResult>(
    SelectionPrompts
  );

  toolbox.copyRecursively({
    from: toolbox.BASE_PROJECT_PATH,
    to: projectName,
    excluded: getFilePathsToExcludeFromSelectedOptions(selectedOptions)
  });

  // From here on we operate within the actual project directory.
  process.chdir(projectName);
  toolbox.makeRcFile(selectedOptions);

  const templateParams = getTemplateParamsFromSelectedOptions(selectedOptions);
  toolbox
    .getSourceFilesRecursivelyFromCurrentDir()
    .forEach(sourceFile =>
      toolbox.compileTemplate([sourceFile], templateParams)
    );

  print.success('Compiled templates.');

  const dependenciesToInstall = getDependenciesToInstallFromSelectedOptions(
    selectedOptions
  );

  await spawnProgress('git init');
  await yarn.install();
  await yarn.add(dependenciesToInstall.dependencies);
  if (dependenciesToInstall.devDependencies.length > 0) {
    await yarn.add(dependenciesToInstall.devDependencies, { dev: true });
  }

  // Install storybook and all its dependencies if selected.
  if (selectedOptions.storybook === StorybookChoice.withStorybook) {
    print.info('Creating storybook...');
    await spawnProgress('npx sb@latest init --type react_native');
  }

  await toolbox.renameProject(projectName, bundleId);

  // Replace storybook preview.js file with the prebuild one.
  // if (
  //   gluestackOptions.includes(selectedOptions.styleLibrary) &&
  //   selectedOptions.storybook === StorybookChoice.withStorybook
  // ) {
  //   const sbPreviewSourcePath = join(
  //     toolbox.CLI_PATH,
  //     projectName,
  //     'config',
  //     'storybook',
  //     'preview.js'
  //   );
  //   const destinationPath = join(
  //     toolbox.CLI_PATH,
  //     projectName,
  //     '.storyboook',
  //     'preview.js'
  //   );
  //   filesystem.copy(sbPreviewSourcePath, destinationPath, { overwrite: true });
  // }

  await yarn.run('prettify:write');

  !IS_WINDOWS && (await yarn.run('pod-install'));

  print.info('Your project has been automatically renamed.');
  print.info(
    'Please note you might have to use Xcode to change the iOS bundle ID!'
  );
  const isGluestackEjected =
    selectedOptions.styleLibrary === StyleLibraryChoice.GluestackUIEjected;

  print.info('Screenshot for reference: https://bit.ly/ios-bundle-id-change');
  print.success(`Setup${isGluestackEjected && ' is almost'} done.`);

  // Eject theme if GluestackUIEjected was selected.
  if (isGluestackEjected) {
    print.info('Initiating theme config ejection...');
    await spawnProgress('npx gluestack-ui-scripts eject-theme');
  }
};

module.exports = command;
