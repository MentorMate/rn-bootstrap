import { LibrarySelectionPrompts } from '../tools/options';
import {
  getDependenciesToInstallFromSelectedOptions,
  getTemplateParamsFromSelectedOptions,
  getOptionalFilePathsFromSelectedOptions,
  getFilePathsToExclude,
} from '../tools/option-utils';
import { yarn } from '../tools/yarn';
import { MMRNCliCommand, OptionSelectionResult } from '../types/types';
import {GluegunToolbox} from 'gluegun';
import {commandFormat, heading, mmRNCliHeading, p} from '../tools/pretty';

const command: MMRNCliCommand = {
  name: 'start-project',
  description: 'Creates a new project',
  run: async (toolbox) => {
    const { parameters } = toolbox;

    p()
    if (parameters.options.h) {
      p()
      mmRNCliHeading()
      commandFormat('start-project         ', 'Creates a new React Native app', [
        'mm-rn-cli start-project MyApp com.myappbundleid'
      ])
      p()
      p('Use this command to generate a new React Native project.')
      p('The command accepts two required parameters: AppName and bundleId.')
      p()
    } else {
      // catch-all, just show help
      startProject(toolbox)
    }
  },
};

async function startProject (toolbox: GluegunToolbox) {
  const { meta, filesystem, prompt, print } = toolbox;
  const { path } = filesystem;

  const projectName = toolbox.getProjectName();
  const bundleId = toolbox.getBundleId();
  const selectedOptions = await prompt.ask<OptionSelectionResult>(
    LibrarySelectionPrompts
  );

  const cliPath = path(`${meta.src}`, '..');
  const boilerplatePath = path(cliPath, 'baseProject');

  const optionalFilesFromSelection =
    getOptionalFilePathsFromSelectedOptions(selectedOptions);
  const filesToExclude = getFilePathsToExclude(optionalFilesFromSelection);

  toolbox.copyBoilerplate({
    boilerplatePath,
    projectName,
    excluded: filesToExclude,
  });
  process.chdir(projectName);

  const dependenciesToInstall =
    getDependenciesToInstallFromSelectedOptions(selectedOptions);

  await yarn.install();
  await yarn.add(dependenciesToInstall.dependencies);
  await yarn.add(dependenciesToInstall.devDependencies, { dev: true });
  await toolbox.renameProject(projectName, bundleId);
  await yarn.run('pod-install');

  print.info('Your project has been automatically renamed.');
  print.info(
    'Please note you might have to use Xcode to change the iOS bundle ID!'
  );
  print.info('Screenshot for reference: https://bit.ly/ios-bundle-id-change');

  const templateParams =
    getTemplateParamsFromSelectedOptions(selectedOptions);
  toolbox.compileTemplate(['App.tsx'], templateParams);
  print.success('Compiled templates.');
  print.success('Setup done.');
};

module.exports = command;
