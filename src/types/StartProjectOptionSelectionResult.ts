import {
  ReactNavigationExampleChoice,
  StateLibraryChoice,
  StyleLibraryChoice
} from '../tools/options';

export interface StartProjectOptionSelectionResult {
  styleLibrary: StyleLibraryChoice;
  stateManagementLibrary: StateLibraryChoice;
  reactNavigationExample: ReactNavigationExampleChoice;
}
