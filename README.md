# generator-svalter [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Generator to help you create and manage svelte/sapper application

## Installation

First, install [Yeoman](http://yeoman.io) and generator-svalter using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-svalter
```

Then generate your new project:

```bash
yo svalter [project_name] [options...]
```

## Available options

| Option | Description |
| ---:   | ---         |
| --**svelte** | Creates a **svelte** project. *(Skips the project type question)* |
| --**sapper** | Creates a **sapper** project. *(Skips the project type question)* |
| --**library** | Creates a **component library** project *(Skips the project type question)* |
| --**css-reset**=*\<name>* | Adds a css reset in your project. *name* can be any of : none, meyer_reset, normalize, sanitize *(Skips the css reset question)* |
| --**typescript**  *or*  --**ts** | Adds TypeScript support to your project *(Skips the TypeScript question)* |
| --**no-typescript** *or* --**no-ts** | Does not add TypeScript support to your project *(Skips the TypeScript question)* | 
| --**sass** *or* --**scss** | Adds SASS support to your project *(Skips the SASS question)* |
| --**no-sass** *or* --**no-scss** | Does not add SASS support to your project *(Skips the SASS question)* |

## License

Apache-2.0 © [Nokorbis](https://github.com/Nokorbis)


[npm-image]: https://badge.fury.io/js/generator-svalter.svg
[npm-url]: https://npmjs.org/package/generator-svalter
[travis-image]: https://travis-ci.com/Nokorbis/generator-svalter.svg?branch=master
[travis-url]: https://travis-ci.com/Nokorbis/generator-svalter
[daviddm-image]: https://david-dm.org/Nokorbis/generator-svalter.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Nokorbis/generator-svalter
[coveralls-image]: https://coveralls.io/repos/Nokorbis/generator-svalter/badge.svg
[coveralls-url]: https://coveralls.io/r/Nokorbis/generator-svalter
