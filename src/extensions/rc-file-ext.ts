import { RCFILE_NAME } from '../tools/constants';
import { getRcFileContentFromSelectedOptions } from '../tools/option-utils';
import { spawnProgress } from '../tools/spawn-progress';
import { MMRNCliToolbox, OptionSelectionResult } from '../types/types';

module.exports = (toolbox: MMRNCliToolbox) => {
  const {
    filesystem: { append }
  } = toolbox;
  const makeRcFile = (optionSelection: OptionSelectionResult) => {
    const fileContent = getRcFileContentFromSelectedOptions(optionSelection);
    append(RCFILE_NAME, JSON.stringify(fileContent, null, 2));
  };
  toolbox.makeRcFile = makeRcFile;
};
