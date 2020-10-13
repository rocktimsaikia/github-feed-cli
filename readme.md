<p align="center">
  <h1 align="center">github-feed-cli</h1>
  <p align="center">Github feed right at your terminal.<p>
  <p align="center">
	<a href="https://travis-ci.com/rocktimsaikia/github-feed-cli"><img src="https://travis-ci.com/RocktimSaikia/github-feed-cli.svg?branch=master" alt="Build Status"></a>
	<a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" alt="Code Style"></a>
</p>
</p>
<p align="center"><img src="https://raw.githack.com/RocktimSaikia/github-feed-cli/master/demo.gif" alt="gif"></p>

## :sparkles: Highlights

* Fast and Simple
* Can be used to check the feed of any Github user
* Also shows the notification events. ex: (Creating a issue, commenting, pushing codes etc)
* Filters out `depandabot` events
* Working in [all the OSS.](https://github.com/RocktimSaikia/github-feed-cli/runs/1241472881)
<br><br>

## Install
```bash
$ npm install --global github-feed-cli
```

If you are using `npm` version `5.2+` or higher then you can use this tool with `npx` too.
```bash 
$ npx feed
```
<br>

## Usage

```bash
Usage
	$ feed <options>

Options
	--username, -u Github username to fetch the feed [default: Your own git username]
	--page, -p Page number of the results to fetch [default: 1]
	--version, -v Get the current version
		
Examples
	$ feed
        $ feed --page 2
	$ feed --username rocktimsaikia
	$ feed --username rocktimsaikia -page 2
```
<br>

## Contribution

If you want to add new feature or improve the existing ones of `github-feed-cli`, please [open an issue](https://github.com/rocktimsaikia/github-feed-cli/issues/new) :rocket:<br>
<br>

## Related

- [`read-git-user`](https://github.com/rocktimsaikia/read-git-user) - Reads the Github username and email from `.gitconfig` :wrench: and returns it as a json object
<br>

## Support

<a href="https://www.buymeacoffee.com/7BdaxfI"><img src="https://user-images.githubusercontent.com/33410545/95193575-a3b51b00-07f1-11eb-9bbb-90ea2e1018d7.png" height="60px"/></a>
