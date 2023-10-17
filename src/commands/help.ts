import { RnBootstrapCommand } from '../types/RnBootstrapToolbox';
import { GluegunToolbox } from 'gluegun';
import {
  RnBootstrapHeading,
  p,
  heading,
  commandFormat,
  direction,
  link
} from '../tools/pretty';

const command: RnBootstrapCommand = {
  dashed: true,
  alias: ['h'],
  description: 'Displays MM rn-bootstrap CLI help',
  run: async (toolbox: GluegunToolbox) => {
    const { meta } = toolbox;

    p();
    RnBootstrapHeading();
    heading(`Welcome to MentorMate React Native CLI ${meta.version()}`);
    p();
    p(
      'MM rn-bootstrap CLI helps you start a new React Native project with an ease.'
    );
    p(
      'It comes with predefined goodies which usually take tons of time to setup.'
    );
    p('Just start a new project and begin coding directly.');
    p();
    heading('Commands:');
    p();
    commandFormat('start-project         ', 'Creates a new React Native app', [
      'rn-bootstrap start-project MyApp com.myappbundleid',
      '    '
    ]);
    commandFormat('generate component    ', 'Creates a new component', [
      'rn-bootstrap generate component {{ComponentName}}',
      '    '
    ]);
    commandFormat('generate hook         ', 'Creates a new hook', [
      'rn-bootstrap generate hook {{useHookName}}',
      '    '
    ]);
    commandFormat('generate model        ', 'Creates a new model', [
      'rn-bootstrap generate model {{ModelName}}',
      '    '
    ]);
    commandFormat('generate page         ', 'Creates a new page', [
      'rn-bootstrap generate page {{NamePage}}',
      '    '
    ]);
    commandFormat('generate util         ', 'Creates a new util', [
      'rn-bootstrap generate util {{utilName}}',
      '    '
    ]);
    p();
    direction(
      `See the documentation: ${link(
        'https://github.com/MentorMate/rn-bootstrap'
      )}`
    );
    p();
    direction(
      `If you need additional help, contact Nick Donev: ${link(
        'https://github.com/NikolayDonev'
      )} or Metodi Yanev: ${link('https://github.com/MetodiYanev')}`
    );
    p();
    RnBootstrapHeading();
  }
};

module.exports = command;
