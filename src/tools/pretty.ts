import { print } from 'gluegun';
import upperFirst from 'lodash.upperfirst';
import camelCase from 'lodash.camelcase';

const { cyan, gray, white, bold } = print.colors;
const { underline } = print.colors;

export const p = (m = '') => print.info(gray(`   ${m}`));

export const heading = (m = '') => p(white(bold(m)));

export const link = (m = '') => underline(white(m));

export const RnBootstrapHeading = () =>
  p(
    cyan(
      bold(
        ' · · · · · · · · · · · · · · · 💥️ MM rn-bootstrap CLI 💥️ · · · · · · · · · · · · · · · · \n'
      )
    )
  );

export const commandFormat = (m = '', second = '', examples: string[] = []) => {
  p(white(m) + '  ' + gray(second));
  const indent = m.length + 2;
  if (examples) {
    examples.forEach(ex => p(gray(' '.repeat(indent) + ex)));
  }
};

export const direction = (m = '') => p(cyan(m));

export const upperCamelCase = (str: string) => {
  return upperFirst(camelCase(str));
};
