import {MMRNCliCommand} from '../types/types';
import {GluegunToolbox} from 'gluegun';
import {mmRNCliHeading, p, heading, commandFormat, direction, link} from '../tools/pretty';

const command: MMRNCliCommand = {
  dashed: true,
  alias: ['h'],
  description: 'Displays MM RN CLI help',
  run: async (toolbox: GluegunToolbox) => {
    const { meta } = toolbox

    p()
    mmRNCliHeading()
    heading(`Welcome to MentorMate React Native CLI ${meta.version()}`)
    p()
    p('MM RN CLI helps you start a new React Native project with an ease.')
    p('It comes with predefined goodies which usually take tons of time to setup.')
    p('Just start a new project and begin coding directly.')
    p()
    heading('Commands:')
    p()
    commandFormat('start-project         ', 'Creates a new React Native app', [
      'mm-rn-cli start-project MyApp com.myappbundleid'
    ])
    p()
    direction(
      `See the documentation: ${link('https://gitlab.mentormate.bg/mm-dev/mm-rn-cli')}`, // TODO replace with github link
    )
    p()
    direction(
      `If you need additional help, contact Biser: ${link('https://github.com/MMbiser')} or Ivan: ${link('https://github.com/MMIvan')}`,
    )
    p()
    mmRNCliHeading()
  },
};

module.exports = command;
