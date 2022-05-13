import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';

module.exports = (toolbox: RnBootstrapToolbox) => {
  toolbox.throwExitError = (error) => {
    toolbox.print.error(error);
    process.exit(1);
  };
};
