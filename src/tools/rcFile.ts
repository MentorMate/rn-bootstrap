import { MMRNCliToolbox, ProjectRcFile, RcFile } from '../types/types';
import { RCFILE_MODULE_NAME } from './constants';

export const getRc = ({
  config: { loadConfig }
}: MMRNCliToolbox): ProjectRcFile => loadConfig(RCFILE_MODULE_NAME);

