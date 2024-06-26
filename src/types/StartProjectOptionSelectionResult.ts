import {
  IconToolkitChoice,
  ReactNavigationExampleChoice,
  StateLibraryChoice,
  StorybookChoice,
  StyleLibraryChoice
} from '../tools/options';

export interface StartProjectOptionSelectionResult {
  styleLibrary: StyleLibraryChoice;
  storybook: StorybookChoice;
  stateManagementLibrary: StateLibraryChoice;
  reactNavigationExample: ReactNavigationExampleChoice;
  iconToolkit: IconToolkitChoice;
}
