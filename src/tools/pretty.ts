import { print } from 'gluegun'

const { cyan, gray, white, bold, red, yellow } = print.colors
const { underline } = print.colors

export const p = (m = '') => print.info(gray(`   ${m}`))

export const heading = (m = '') => p(white(bold(m)))

export const link = (m = "") => underline(white(m))


export const mmRNCliHeading = () =>
  p(
    cyan(
      bold(
        ' · · · · · · · · · · · · · · · 💥️ MM RN CLI 💥️ · · · · · · · · · · · · · · · · \n',
      ),
    ),
  )

export const commandFormat = (m = '', second = '', examples: string[] = []) => {
  p(white(m) + "  " + gray(second))
  const indent = m.length + 2
  if (examples) {
    examples.forEach((ex) => p(gray(" ".repeat(indent) + ex)))
  }
}

export const direction = (m = '') => p(cyan(m))
