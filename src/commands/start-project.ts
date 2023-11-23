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
  const { prompt, print, filesystem, replaceFile } = toolbox;

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

  await toolbox.renameProject(projectName, bundleId);
  print.info('Your project has been automatically renamed.');

  await yarn.run('prettify:write');

  !IS_WINDOWS && (await yarn.run('pod-install'));

  print.info(
    'Please note you might have to use Xcode to change the iOS bundle ID!'
  );
  print.info('Screenshot for reference: https://bit.ly/ios-bundle-id-change');

  const isGluestackEjected =
    selectedOptions.styleLibrary === StyleLibraryChoice.GluestackUIEjected;

  // Eject theme if GluestackUIEjected was selected.
  if (isGluestackEjected) {
    print.info('Initiating theme config ejection...');
    try {
      await spawnProgress('npx gluestack-ui-scripts eject-theme');
    } catch {
      print.error(
        'Gluestack Ejected still awaiting for fix from gluestack team! This error doesn"t break the build.'
      );
    }
  }

  if (selectedOptions.storybook === StorybookChoice.withStorybook) {
    print.info('Creating storybook mobile...');
    await spawnProgress('npx sb@latest init --type react_native');

    filesystem.rename('.storybook', '.storybookMobile');

    print.info('Creating storybook web...');
    // Wrap the spawn command in a promise
    const storybookWebPromise = new Promise<void>((resolve, reject) => {
      const storybookWebProcess = spawn(
        'npx',
        ['sb@latest', 'init', '--type', 'react'],
        {
          stdio: 'inherit',
          shell: true,
          env: {
            ...process.env,
            CI: 'true'
          }
        }
      );

      storybookWebProcess.on('close', code => {
        if (code === 0) {
          resolve();
        } else {
          reject(
            new Error(
              `Storybook web initialization failed with exit code ${code}`
            )
          );
        }
      });
    });
    // Wait for the promise to resolve
    await storybookWebPromise;

    // Add storybook script to package.json.
    const packageJsonPath = filesystem.path(process.cwd(), 'package.json');
    const packageJson = filesystem.read(packageJsonPath, 'json');
    packageJson.scripts['storybook:mobile'] =
      "cross-env STORYBOOK_ENABLED='true' yarn start";
    filesystem.write(packageJsonPath, packageJson, {
      jsonIndent: 2
    });

    // Check if vite is selected
    const isViteSelected =
      '@storybook/react-vite' in packageJson.devDependencies;
    isViteSelected && (await spawnProgress('yarn add vite --dev'));

    //Replace storybook files with preconfigured ones
    if (isViteSelected) {
      const viteConfigPath = filesystem.path(process.cwd(), 'vite.config.ts');
      filesystem.write(viteConfigPath, '');

      replaceFile('vite.config.ts', 'vite.config.ts');
    } else {
      replaceFile('main.ts', '.storybook/main.ts');
    }

    if (gluestackOptions.includes(selectedOptions.styleLibrary)) {
      replaceFile('preview.tsx', '.storybook/preview.ts');
      filesystem.rename(
        `${process.cwd()}/.storybook/preview.ts`,
        'preview.tsx'
      );
      replaceFile('preview.js', '.storybookMobile/preview.js');
    }

    print.info('Removing storybook config folder reference...');
    toolbox.filesystem.remove('config/storybook');
    print.success(
      print.checkmark + ' Storybook config folder reference removed!'
    );
  }

  print.success(print.checkmark + ' Setup is done.');
};

module.exports = command;
