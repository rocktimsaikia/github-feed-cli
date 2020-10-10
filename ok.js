const getuser = require('./lib');

(async () => {
	const data = await getuser({username: 'sindresorhus'});
	console.log(data);
})();
