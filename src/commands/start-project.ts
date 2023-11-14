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
import { commandFormat, RnBootstrapHeading, p } from '../tools/pretty';
import { StartProjectOptionSelectionResult } from '../types/StartProjectOptionSelectionResult';
import { IS_WINDOWS } from '../tools/constants';
const { spawn } = require('child_process');

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
    print.info('Creating storybook mobile...');
    await spawnProgress('npx sb@latest init --type react_native');

    filesystem.rename('.storybook', '.storybookMobile');

    print.info('Creating storybook web...');
    spawn('npx', ['sb@latest', 'init', '--type', 'react'], {
      stdio: 'inherit',
      shell: true
    });

    // Add storybook script to package.json.
    const packageJsonPath = filesystem.path(process.cwd(), 'package.json');
    const packageJson = filesystem.read(packageJsonPath, 'json');
    packageJson.scripts['storybook:mobile'] =
      "cross-env STORYBOOK_ENABLED='true' yarn start";
    packageJson.scripts['storybook:web'] =
      'start-storybook -p 6006 -c .storybook';
    filesystem.write(packageJsonPath, packageJson, { jsonIndent: 2 });
  }

  await toolbox.renameProject(projectName, bundleId);

  // Replace storybook files with preconfigured ones if selected.
  // if (selectedOptions.storybook === StorybookChoice.withStorybook) {
  //   const sourceWebDirectory = filesystem.path(
  //     process.cwd(),
  //     'config',
  //     'storybook'
  //   );
  //   const destinationWebDirectory = filesystem.path(
  //     process.cwd(),
  //     '.storybook'
  //   );

  //   const sourceMobileDirectory = filesystem.path(
  //     process.cwd(),
  //     'config',
  //     'ondevice'
  //   );
  //   const destinationMobileDirectory = filesystem.path(
  //     process.cwd(),
  //     '.ondevice'
  //   );

  //   // List of files to replace based on the selected options. Add more here if needed.
  //   let filesToReplace: string[] = ['main.js'];

  //   if (gluestackOptions.includes(selectedOptions.styleLibrary)) {
  //     filesToReplace.push('preview.js');
  //   }

  //   filesToReplace.forEach(file => {
  //     const sbWebPreviewSourcePath = filesystem.path(sourceWebDirectory, file);
  //     const destinationWebPath = filesystem.path(destinationWebDirectory, file);
  //     const sbMobilePreviewSourcePath = filesystem.path(
  //       sourceMobileDirectory,
  //       file
  //     );
  //     const destinationMobilePath = filesystem.path(
  //       destinationMobileDirectory,
  //       file
  //     );
  //     filesystem.copy(sbWebPreviewSourcePath, destinationWebPath, {
  //       overwrite: true
  //     });
  //     filesystem.copy(sbMobilePreviewSourcePath, destinationMobilePath, {
  //       overwrite: true
  //     });
  // });
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
  print.success(`Setup${isGluestackEjected ? ' is almost' : ''} done.`);

  // Eject theme if GluestackUIEjected was selected.
  if (isGluestackEjected) {
    print.info('Initiating theme config ejection...');
    await spawnProgress('npx gluestack-ui-scripts eject-theme');
  }
};

module.exports = command;
