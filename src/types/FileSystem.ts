import { AvailableGeneratorTemplates, CodeGenerator } from './CodeGenerator';

export type CopyRecursivelyOptions = {
  from: string;
  to: string;
  excluded?: Array<string | RegExp | undefined>;
};

export interface FileSystemToolboxEntries {
  copyRecursively(options: CopyRecursivelyOptions);
  getFsChildrenRecursively(
    path: string,
    isRelative?: boolean,
    matching?: string | string[]
  ): string[];
  getSourceFilesRecursivelyFromCurrentDir(): string[];
  getGeneratorBaseDirPathParts(generatorType: CodeGenerator): string[];
  getFileNamePathPartsForCurrentDir(fileName: string, ext: string);
  getGeneratorTemplatePathParts(
    generatorType: CodeGenerator,
    template: AvailableGeneratorTemplates
  );
}
