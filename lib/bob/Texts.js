"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texts = void 0;
const chalk_1 = require("chalk");
class Texts {
    static Welcome() {
        console.log(chalk_1.blueBright('______       _      ______\n'
            + '| ___ \\     | |     |  _  \\\n'
            + '| |_/ / ___ | |__   | | | |___ _ __\n'
            + '| ___ \\/ _ \\|  _ \\  | | | / _ \\  __|\n'
            + '| |_/ / (_) | |_) | | |/ /  __/ |\n'
            + '\\____/ \\___/|____/  |___/ \\___|_|\n'
            + '\n'
            + '\n'
            + '______           _                            _     _\n'
            + '|  _  \\         | |                          (_)   | |\n'
            + '| | | |___ _ __ | | ___  _   _ _ __ ___   ___ _ ___| |_ ___ _ __\n'
            + '| | | / _ \\  _ \\| |/ _ \\| | | |  _ ` _ \\ / _ \\ / __| __/ _ \\  __|\n'
            + '| |/ /  __/ |_) | | (_) | |_| | | | | | |  __/ \\__ \ ||  __/ |\n'
            + '|___/ \\___| .__/|_|\\___/ \\__, |_| |_| |_|\\___|_|___/\\__\\___|_|\n'
            + '          | |             __/ |\n'
            + '          |_|            |___/\n'));
    }
    static Help() {
        console.log(`

${chalk_1.bold('Color guide:')}
  - ${chalk_1.bold(chalk_1.greenBright('commands'))}
  - ${chalk_1.green('parameters')}
  - ${chalk_1.yellow('files or paths')}
  - ${chalk_1.blue('values within config files')}
  - ${chalk_1.redBright('thrown errors')}

${chalk_1.bold('Available general options:')}

  ${chalk_1.bold(chalk_1.green('--skipDotenv'))}\t\tIgnore ${chalk_1.yellow('.env')} file initialization

${chalk_1.bold('Available commands:')}

  ${chalk_1.bold(chalk_1.greenBright('db'))} Database command
    Connection parameters can be added as arguments to all ${chalk_1.bold(chalk_1.greenBright('db'))} commands.
    Availabe command arguments:
      ${chalk_1.green('--db=""')}\t\tDefault from ${chalk_1.yellow('.env')} in ${chalk_1.blue('DB_DSN="dbname=...;"')}, ${chalk_1.redBright('throws error on fallback')}
      ${chalk_1.green('--user=""')}\t\tDefault from ${chalk_1.yellow('.env')} in ${chalk_1.blue('DB_USER=""')}, fallback ${chalk_1.green('"root"')}
      ${chalk_1.green('--password=""')}\tDefault from ${chalk_1.yellow('.env')} in ${chalk_1.blue('DB_PASSWORD=""')}, fallback ${chalk_1.green('""')}
      ${chalk_1.green('--host=""')}\t\tDefault from ${chalk_1.yellow('.env')} in ${chalk_1.blue('DB_DSN="host=...;"')}, fallback ${chalk_1.green('"localhost"')}
      ${chalk_1.green('--port=""')}\t\tDefault from ${chalk_1.yellow('.env')} in ${chalk_1.blue('DB_DSN="port=...;"')}, fallback ${chalk_1.green('"3306"')}

      All ${chalk_1.green('--xxxx=""')} commands, except ${chalk_1.green('--port=""')}, support ${chalk_1.yellow('.env')} variables. For example:
      ${chalk_1.green('--db="#TASK_DB_NAME_STAGING"')}\t\tThis tries to use the value from ${chalk_1.blue('TASK_DB_NAME_STAGING=""')}, fallback is like above

    ${chalk_1.bold(chalk_1.greenBright('db') + ' commands:')}

    - ${chalk_1.bold(chalk_1.greenBright('pull'))} Export db to ${chalk_1.yellow('*.sql')} file
      ${chalk_1.bold('Example:')} ${chalk_1.bold(chalk_1.greenBright('./bob db pull ')) + chalk_1.yellow('my_db_export.sql')}

    - ${chalk_1.bold(chalk_1.greenBright('push'))} Import ${chalk_1.yellow('*.sql')} file to db
      ${chalk_1.green('--createDb')}\tEnabled by default. To disable it, use ${chalk_1.green('--createDb=false')}
      ${chalk_1.bold('Example:')} ${chalk_1.bold(chalk_1.greenBright('./bob db push ')) + chalk_1.yellow('my_db_export.sql')}

  ${chalk_1.bold(chalk_1.greenBright('migrate'))} Database command

  ${chalk_1.bold(chalk_1.greenBright('ftp'))} FTP command
    Connection parameters can be added as arguments to all ${chalk_1.bold(chalk_1.greenBright('ftp'))} commands.
    Mandatory command arguments:
      ${chalk_1.green('--user=""')}\t\tNo default value, ${chalk_1.redBright('throws error if missing')}
      ${chalk_1.green('--password=""')}\tNo default value, ${chalk_1.redBright('throws error if missing')}
      ${chalk_1.green('--host=""')}\t\tNo default value, ${chalk_1.redBright('throws error if missing')}
      ${chalk_1.green('--include=""')}\tNo default value, value must be JSON array (escape " with \\"), ${chalk_1.redBright('throws error if missing')}
    Optional command arguments:
      ${chalk_1.green('--port=')}\t\tDefault ${chalk_1.green('21')}
      ${chalk_1.green('--localRoot=""')}\tDefault  ${chalk_1.green('./')}, value must start with "./"
      ${chalk_1.green('--remoteRoot=""')}\tDefault ${chalk_1.green('/')}, value must start with "/"
      ${chalk_1.green('--exclude=""')}\tDefault ${chalk_1.green('[]')}

    ${chalk_1.bold('Example:')}
    ${chalk_1.bold(chalk_1.greenBright('./bob ftp'))} ${chalk_1.green('--skipDotenv --user=\'my_db_user\' --password=\'****\' --host=\'napoleon.metanet.ch\' --localRoot=\'./web\' --remoteRoot=\'/web\' --include=\'["web/**/*", "**/*.js", "**/*.php"]\' --exclude=\'["web/files/**/*"]\'')}
    `);
    }
}
exports.Texts = Texts;
