# generator-svalter [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Generator to help you create and manage svelte/sapper application

## Supported "templates"

- **Svelte** : (javascript || typescript) && (css || scss)
- **Sapper** : javascript && (css || scss)
- **Component library** : (javascript || typescript) && (css || scss)

## Planned features

- Page generation for sapper
- Script generation (models, services, actions) (according to script configuration)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-svalter using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-svalter
```

## Project generation

```bash
mkdir your-project
cd your-project
yo svalter [project_name] [options...]
```


### Available options


| Option | Description |
| ---:   | ---         |
| --**svelte** | Creates a **svelte** project. *(Skips the project type question)* |
| --**sapper** | Creates a **sapper** project. *(Skips the project type question)* |
| --**library** | Creates a **component library** project *(Skips the project type question)* |
| --**css-reset**=*\<name>* | Adds a css reset in your project. *name* can be any of : **none**, **meyer_reset**, **normalize**, **sanitize** *(Skips the css reset question)* |
| --**style-separation** | Components' styles will be put in a different file for each component |
| --**no-style-separation** | Components' styles will be put in the same file as the markup |
| --**script-separation** | Components' scripts will be put in a different file for each component |
| --**no-script-separation** | Components' scripts will be put in the same file as the markup |
| --**typescript**  *or*  --**ts** | **Adds TypeScript support** to your project |
| --**no-typescript** *or* --**no-ts** | Does **not add TypeScript support** to your project | 
| --**sass** *or* --**scss** | **Adds SASS support** to your project  |
| --**no-sass** *or* --**no-scss** | Does **not add SASS support** to your project |

## Component generation

```bash
#in a svalter project
yo svalter:component [component-name] [options...]
```

### Available options

| Option | Description |
| ---:   | ---         |
| --**folder**=*path* | Put the component in a specific folder (which will be under /src/components) |

## License

Apache-2.0 © [Nokorbis](https://github.com/Nokorbis)


[npm-image]: https://badge.fury.io/js/generator-svalter.svg
[npm-url]: https://npmjs.org/package/generator-svalter
[travis-image]: https://travis-ci.org/Nokorbis/svalter.svg?branch=master
[travis-url]: https://travis-ci.org/Nokorbis/svalter
[daviddm-image]: https://david-dm.org/Nokorbis/generator-svalter.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Nokorbis/generator-svalter
[coveralls-image]: https://coveralls.io/repos/Nokorbis/generator-svalter/badge.svg
[coveralls-url]: https://coveralls.io/r/Nokorbis/generator-svalter
