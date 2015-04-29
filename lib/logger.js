import chalk from 'chalk';

const write = process.stdout.write.bind(process.stdout);
const error = process.stderr.write.bind(process.stderr);

export default class Logger {
  static info(message) {
    var string = chalk.styles.blue.open + '[INFO] ' + chalk.styles.blue.close;
    string += message + '\n';

    write(string);
  }

  static error(message) {
    var string = chalk.styles.red.open + '[ERROR] ' + chalk.styles.red.close;
    string += message + '\n';

    error(string);
    process.exit();
  }
}
