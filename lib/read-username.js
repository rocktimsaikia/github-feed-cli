const execa = require('execa');

module.exports = async () => {
	const {stdout} = await execa('git', ['config', 'user.name']);
	return String(stdout);
};
