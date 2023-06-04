import readline from 'readline';
import fs from 'fs/promises';
import { program } from 'commander';
import 'colors';

program.option(
  '-f, --file [type]',
  'file for saving game result',
  'results.txt'
);

program.parse(process.argv);

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const isValid = value => {
  if (isNaN(value)) {
    console.log('Enter a number!'.red);
    return false;
  }
  if (value < 1 || value > 10) {
    console.log(`The number must be between 1 and 10`.red);
    return false;
  }
  return true;
};

const log = async data => {
  try {
    await fs.appendFile(logFile, `${data}\n`);
    console.log(
      `Congratulations! Your results have been successfully saved!`.green
    );
  } catch (error) {
    console.log(
      `Failed to save game results. The reason may be related to an error: ${error}`
        .red
    );
  }
};

const game = () => {
  rl.question('Try to guess the number from 1 to 10: \n'.yellow, value => {
    let number = +value;
    if (!isValid(number)) {
      game();
      return;
    }
    count += 1;
    if (number === mind) {
      console.log(
        'Congratulations You guessed the number in %d step(s)'.green,
        count
      );
      log(
        `${new Date().toLocaleDateString()}: Congratulations You guessed the number in ${count} step(s)`
      ).finally(() => rl.close());
      return;
    }
    console.log("You haven't guessed yet try".red);
    game();
  });
};

game();
