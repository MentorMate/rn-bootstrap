import { GeneratorConfig, Template, FeaturePiece } from './CodeGenerator';

export type CopyRecursivelyOptions = {
  from: string;
  to: string;
  excluded?: Array<string | RegExp | undefined>;
};

/* TODO: consider fixing manually setting types... */
export interface FileSystemToolboxEntries {
  copyRecursively(options: CopyRecursivelyOptions);
  getFsChildrenRecursively(
    path: string,
    isRelative?: boolean,
    matching?: string | string[]
  ): string[];
  getSourceFilesRecursivelyFromCurrentDir(): string[];
  getGeneratorBaseDirPathParts(generatorType: FeaturePiece): string[];
  getFileNamePathPartsForCurrentDir(fileName: string, ext: string, template: Template): string[];
  getGeneratorTemplatePathParts(Config: GeneratorConfig, template: Template);
  getFeaturePieceFromCurrentDir(): FeaturePiece;
  removeFileExtension(filename: string): string;
}
