import { RCFILE_FULL_NAME } from '../tools/constants';
import { getRcFileContentFromSelectedOptions } from '../tools/option-utils';
import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';
import { StartProjectOptionSelectionResult } from '../types/StartProjectOptionSelectionResult';

module.exports = (toolbox: RnBootstrapToolbox) => {
  const {
    filesystem: { write }
  } = toolbox;

  toolbox.makeRcFile = (optionSelection: StartProjectOptionSelectionResult) => {
    const fileContent = getRcFileContentFromSelectedOptions(optionSelection);
    write(RCFILE_FULL_NAME, JSON.stringify(fileContent, null, 2));
  };
};
