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
  description: 'Displays MM RN CLI help',
  run: async (toolbox: GluegunToolbox) => {
    const { meta } = toolbox;

    p();
    RnBootstrapHeading();
    heading(`Welcome to MentorMate React Native CLI ${meta.version()}`);
    p();
    p('MM RN CLI helps you start a new React Native project with an ease.');
    p(
      'It comes with predefined goodies which usually take tons of time to setup.'
    );
    p('Just start a new project and begin coding directly.');
    p();
    heading('Commands:');
    p();
    commandFormat('start-project         ', 'Creates a new React Native app', [
      'mm-rn-cli start-project MyApp com.myappbundleid'
    ]);
    p();
    direction(
      `See the documentation: ${link(
        'https://github.com/MentorMate/rn-bootstrap'
      )}`
    );
    p();
    direction(
      `If you need additional help, contact Biser: ${link(
        'https://github.com/MMbiser'
      )} or Ivan: ${link('https://github.com/MMIvan')}`
    );
    p();
    RnBootstrapHeading();
  }
};

module.exports = command;
