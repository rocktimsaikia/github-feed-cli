'use strict!';
require('dotenv').config();
const mem = require('mem');
const Conf = require('conf');
const {Octokit} = require('@octokit/rest');
const readUserName = require('read-git-user');

const config = new Conf();

const getFeed = mem(async (username, page) => {
	const octokit = new Octokit({
		auth: process.env.GITHUB_TOKEN
	});

	const feedActivites = await octokit.request('GET /users/{username}/received_events', {
		username,
		page
	});

	return feedActivites.data;
}, {cache: config});

module.exports = async options => {
	const username = options.username === undefined ? (await readUserName()).username : options.username;

	return getFeed(username, options.page);
};
