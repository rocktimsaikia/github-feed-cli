const chalk = require('chalk');
const nodeEmoji = require('node-emoji');

// Installation message
console.log(`\n
${chalk.magenta.bold('Thanks for installing github-feed-cli!')}
${chalk.magenta('Run `feed --help` to get started')}
${chalk.blue(`If you enjoy using this tool, don't forget to star${nodeEmoji.get('star2')} the project at rocktimsaikia/github-feed-cli`)}
\n`);
