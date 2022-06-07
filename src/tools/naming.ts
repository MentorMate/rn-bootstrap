import { CodeGenerator } from '../types/CodeGenerator';
import capitalize from 'lodash.capitalize';
import { upperCamelCase } from './pretty';

export const getNameForFeaturePartFactory = (featureName: string) => (
  part: CodeGenerator
) => `${upperCamelCase(featureName)}${capitalize(part)}`;

export const getNameForFeatureHook = (featureName: string) =>
  `use${upperCamelCase(featureName)}`;
