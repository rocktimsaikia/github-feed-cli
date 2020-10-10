import test from 'ava';
import execa from 'execa';

const randomName = () => `asdasfgrgafadsgaf${Math.random().toString().slice(2)}`;

test('--version', async t => {
	const {stdout} = await execa('./bin/index.js', ['--version']);
	t.true(typeof stdout.length === 'number');
});

test('--help', async t => {
	const response = await execa('./bin/index.js', ['--help']);
	t.regex(response.stdout, /examples/i);
});

test('without arguments', async t => {
	const response = await execa('./bin/index.js');
	t.true(response.exitCode === 0 && !response.failed);
});

test('--user', async t => {
	const response = await execa('./bin/index.js',['--user', 'rocktimsaikia']);
	t.regex(response.stdout, /ago/);
})

test('--user && --page', async t => {
	const response = await execa('./bin/index.js',['--user', 'rocktimsaikia', '--page', 2]);
	t.regex(response.stdout, /ago/);
})

test('invalid --user argument', async t => {
	const response = await execa('./bin/index.js',['--user', randomName()]);
	t.regex(response.stderr, /user not found/i);
})