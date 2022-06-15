import { FeaturePiece } from '../types/CodeGenerator';
import capitalize from 'lodash.capitalize';
import { upperCamelCase } from './pretty';

export const getNameForFeaturePieceFactory = (featureName: string) => (
  piece: FeaturePiece
) => `${upperCamelCase(featureName)}${capitalize(piece)}`;

export const getNameForFeatureHook = (featureName: string) =>
  `use${upperCamelCase(featureName)}`;
