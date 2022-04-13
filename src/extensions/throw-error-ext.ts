import { MMRNCliToolbox } from '../types/types';

module.exports = (toolbox: MMRNCliToolbox) => {
  toolbox.throwExitError = (error) => {
    toolbox.print.error(error);
    process.exit(1);
  };
};
