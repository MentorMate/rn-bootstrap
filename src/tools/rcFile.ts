import { ProjectRcFile } from '../types/RcFile';
import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';
import { RCFILE_MODULE_NAME } from './constants';

export const getRc = ({
  config: { loadConfig }
}: RnBootstrapToolbox): ProjectRcFile => loadConfig(RCFILE_MODULE_NAME);

