'use strict';
const {Octokit} = require('@octokit/rest');
const isEmpty = require('lodash.isempty');
const chalk = require('chalk');
const nodeEmoji = require('node-emoji');
const cleanDeep = require('clean-deep');
const getUsername = require('./read-username');

const detectEventType = (type, payload) => {
	let event = {};

	switch (type) {
		case 'WatchEvent':
			event = {
				event: 'starred',
				postfix: '',
				icon: chalk.white(nodeEmoji.get('star2'))
			};
			break;

		case 'ForkEvent':
			event = {
				event: 'forked',
				postfix: '',
				icon: chalk.white(nodeEmoji.get('rocket'))
			};
			break;

		case 'PublicEvent':
			event = {
				event: 'made',
				postfix: 'public',
				icon: chalk.white(nodeEmoji.get('globe_with_meridians'))
			};
			break;

		case 'CreateEvent':
			event = {
				event: 'created',
				postfix: 'a repository',
				icon: chalk.white(nodeEmoji.get('pencil'))
			};
			break;

		case 'IssuesEvent':
			event = {
				event: 'openned',
				postfix: 'an issue in',
				issueNumber: payload.issue.number,
				issueTitle: payload.issue.title,
				icon: chalk.white(nodeEmoji.get('alarm_clock'))
			};
			break;

		case 'IssueCommentEvent':
			event = {
				event: 'commented',
				postfix: 'in an issue',
				issueNumber: payload.issue.number,
				issueTitle: payload.issue.title,
				commentBody: payload.comment.body,
				icon: chalk.white(nodeEmoji.get('speech_balloon'))
			};
			break;

		case 'PushEvent':
			event = {
				event: 'pushed',
				postfix: 'commits to',
				icon: nodeEmoji.get('sparkles')
			};
			break;

		case 'PullRequestEvent':
			event = {
				event: 'opened',
				postfix: 'a pull request in',
				icon: chalk.white(nodeEmoji.get('fire'))
			};
			break;

		case 'PullRequestReviewCommentEvent':
			event = {
				event: 'commented',
				postfix: `in PR #${payload.pull_request.number} of`,
				icon: chalk.white(nodeEmoji.get('speech_balloon'))
			};
			break;

		default:
			event = {};
	}

	return event;
};

module.exports = async options => {
	const username = options.username === '' ? await getUsername() : options.username;
	/**
	 * @Todo
	 * Adding auth token as argument is supported but not making it available in the cli version for now.
	 */
	const octokit = new Octokit();

	const feedActivites = await octokit.request('GET /users/{username}/received_events', {
		username,
		page: options.page
	});

	const updatedEvent = feedActivites.data.map(action => {
		let filteredEvents = {};

		if (!isEmpty(action.payload)) {
			filteredEvents = {
				actor: action.actor.display_login,
				repo: action.repo.name,
				action: detectEventType(action.type, action.payload),
				createdAt: action.created_at
			};
		}

		return filteredEvents;
	}).reverse();

	return cleanDeep(updatedEvent, {emptyStrings: false});
};
