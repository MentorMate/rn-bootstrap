import { RCFILE_FULL_NAME } from '../tools/constants';
import { getRcFileContentFromSelectedOptions } from '../tools/option-utils';
import { spawnProgress } from '../tools/spawn-progress';
import { MMRNCliToolbox, OptionSelectionResult } from '../types/types';

module.exports = (toolbox: MMRNCliToolbox) => {
  const {
    filesystem: { write }
  } = toolbox;

  const makeRcFile = (optionSelection: OptionSelectionResult) => {
    const fileContent = getRcFileContentFromSelectedOptions(optionSelection);
    write(RCFILE_FULL_NAME, JSON.stringify(fileContent, null, 2));
  };

  toolbox.makeRcFile = makeRcFile;
};
