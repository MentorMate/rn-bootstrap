const { exec } = require('child_process');
const isWindows = process.platform === 'win32';

const command = isWindows
  ? 'cd ./ios & pod install'
  : 'cd ./ios && pod install';

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log(`Success: ${stdout}`);
});
