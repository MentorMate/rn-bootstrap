import { GluegunToolbox } from 'gluegun';
import { SelectionPrompts } from '../tools/options';
import {
  getDependenciesToInstallFromSelectedOptions,
  getTemplateParamsFromSelectedOptions,
  getFilePathsToExclude
} from '../tools/option-utils';
import { yarn } from '../tools/yarn';
import {
  MMRNCliCommand,
  MMRNCliToolbox,
  OptionSelectionResult
} from '../types/types';
import { spawnProgress } from '../tools/spawn-progress';
import { commandFormat, heading, mmRNCliHeading, p } from '../tools/pretty';

const command: MMRNCliCommand = {
  name: 'start-project',
  description: 'Creates a new project',
  run: async toolbox => {
    const { parameters } = toolbox;

    p();
    if (parameters.options.h) {
      p();
      mmRNCliHeading();
      commandFormat(
        'start-project         ',
        'Creates a new React Native app',
        ['mm-rn-cli start-project MyApp com.myappbundleid']
      );
      p();
      p('Use this command to generate a new React Native project.');
      p('The command accepts two required parameters: AppName and bundleId.');
      p();
    } else {
      // catch-all, just show help
      startProject(toolbox);
    }
  }
};

async function startProject(toolbox: MMRNCliToolbox) {
  const { prompt, print } = toolbox;

  const projectName = toolbox.getProjectName();
  const bundleId = toolbox.getBundleId();
  const selectedOptions = await prompt.ask<OptionSelectionResult>(
    SelectionPrompts
  );

  toolbox.copyBoilerplate({
    projectName,
    excluded: getFilePathsToExclude(selectedOptions)
  });

  // From here on we operate within the actual project directory.
  process.chdir(projectName);
  toolbox.makeRcFile(selectedOptions);
  const templateParams = getTemplateParamsFromSelectedOptions(selectedOptions);

  toolbox
    .getSourceFilesInCurrentDir()
    .forEach(sourceFile =>
      toolbox.compileTemplate([sourceFile], templateParams)
    );

  print.success('Compiled templates.');

  const dependenciesToInstall = getDependenciesToInstallFromSelectedOptions(
    selectedOptions
  );

  await spawnProgress('git init');
  await yarn.install();
  console.log(dependenciesToInstall);
  await yarn.add(dependenciesToInstall.dependencies);
  if (dependenciesToInstall.devDependencies.length > 0) {
    await yarn.add(dependenciesToInstall.devDependencies, { dev: true });
  }
  await toolbox.renameProject(projectName, bundleId);
  await yarn.run('prettify:write');
  await yarn.run('pod-install');

  print.info('Your project has been automatically renamed.');
  print.info(
    'Please note you might have to use Xcode to change the iOS bundle ID!'
  );
  print.info('Screenshot for reference: https://bit.ly/ios-bundle-id-change');

  print.success('Setup done.');
}

module.exports = command;
