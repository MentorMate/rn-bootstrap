import { spawnProgress } from './spawn-progress';

type PackageInstallOptions = {
  dev?: boolean;
  exact?: boolean;
};
const defaultPackageInstallOptions: PackageInstallOptions = {
  dev: false,
  exact: false,
};

type PackageListOptions = {
  global?: boolean;
};

const defaultPackageListOptions: PackageListOptions = {
  global: false,
};

type PackageListOutput = [string, (str) => [string, string][]];
function list(
  options: PackageListOptions = defaultPackageListOptions
): PackageListOutput {
  return [
    `yarn${options.global ? ' global' : ''} list`,
    (output: string): [string, string][] => {
      // Parse yarn's human-readable output
      return output
        .split('\n')
        .reduce((acc: [string, string][], line: string): [string, string][] => {
          const match = line.match(/info "([^@]+)@([^"]+)" has binaries/);
          return match ? [...acc, [match[1], match[2]]] : acc;
        }, []);
    },
  ];
}

export const yarn = {
  run: (command: string) => {
    return spawnProgress(`yarn ${command}`);
  },
  add: (
    pkgs: string | string[],
    options: PackageInstallOptions = defaultPackageInstallOptions
  ) => {
    const dev = options.dev ? ' --dev' : '';
    const exact = options.exact ? ' --exact' : '';
    const packages = Array.isArray(pkgs) ? pkgs.join(' ') : pkgs;
    const cmd = `yarn add ${packages}${dev}${exact}`;
    return spawnProgress(cmd);
  },
  remove: (pkg: string) => {
    return spawnProgress(`yarn remove ${pkg}`);
  },
  install: () => {
    return spawnProgress('yarn install');
  },
  list: async (options: PackageListOptions = defaultPackageListOptions) => {
    const [cmd, parseFn] = list(options);
    return parseFn(await spawnProgress(cmd, {}));
  },
};
