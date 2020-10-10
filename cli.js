#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const boxen = require('boxen');
const logSymbols = require('log-symbols');
const {format} = require('timeago.js');
const meow = require('meow');
const ora = require('ora');

const readFeed = require('./lib');

const cli = meow(
	`
		Usage
			$ feed <options>

		Options
			--user, -u Github username to fetch the feed
			--page, -p Page number of the results to fetch (default 1)
			--version, -v Get the current version
		
		Examples
			$ feed
			$ feed -u rocktimsaikia
			$ feed -p 2
			$ feed -v
	`,
	{
		flags: {
			user: {
				type: 'string',
				alias: 'u',
				default: ''
			},
			page: {
				type: 'number',
				alias: 'p',
				default: 1
			},
			version: {
				type: 'boolean',
				alias: 'v'
			}
		}
	}
);

const formatFeedlog = ({actor, action: {postfix, event, icon, issueTitle, issueNumber}, repo, createdAt}) => {
	actor = chalk.white(chalk.bold(actor));
	postfix = chalk.white.dim(postfix);
	event = chalk.blue(event);
	repo = chalk.blue(repo);
	createdAt = chalk.white.dim(format(createdAt, 'en_us'));
	issueNumber = issueTitle === undefined ? '' : issueNumber;
	issueTitle = issueTitle === undefined ? '' : `\n\n${logSymbols.info}) ${chalk.underline(`${issueTitle} #${issueNumber}`)}`;

	const log = `\n${logSymbols.success} ${actor} ${event}${icon} ${postfix} ${repo} ${createdAt}${issueTitle}\n`;

	return boxen(log, {
		margin: {left: 2},
		padding: {left: 1, right: 1},
		borderColor: 'magenta',
		borderStyle: 'round',
		dimBorder: true
	});
};

(async () => {
	const spinner = ora({
		text: 'Loading the feed...',
		color: 'magenta'
	}).start();

	try {
		const feedEvents = await readFeed({
			username: cli.flags.user,
			page: cli.flags.page
		});

		spinner.stop();

		feedEvents.map(activity => console.log(formatFeedlog(activity)));
	} catch (error) {
		if (error.status === 404) {
			console.error('User not found! Please provide a valid github username.');
		}

		console.error(error);
	}
})();
