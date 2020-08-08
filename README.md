# generator-svalter [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Generator to help you create and manage svelte/sapper application

## Features

-   Generate a boilerplate project for svelte, sapper or a component library
-   Generate routes (sapper only), components, models, services and (svelte) actions

## Supported "templates"

-   **Svelte** : (javascript || typescript) && (css || scss)
-   **Sapper** : javascript && (css || scss)
-   **Component library** : (javascript || typescript) && (css || scss)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-svalter using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-svalter
```

## Usage notes :

Each option is optional. If the generator needs more data, you will be prompted a question.

## Project generation

```bash
mkdir your-project
cd your-project
yo svalter [project_name] [options...]
```

### Available options

|                               Option | Description                                                                                                                                      |
| -----------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------ |
|                         --**svelte** | Creates a **svelte** project. _(Skips the project type question)_                                                                                |
|                         --**sapper** | Creates a **sapper** project. _(Skips the project type question)_                                                                                |
|                        --**library** | Creates a **component library** project _(Skips the project type question)_                                                                      |
|            --**css-reset**=_\<name>_ | Adds a css reset in your project. _name_ can be any of : **none**, **meyer_reset**, **normalize**, **sanitize** _(Skips the css reset question)_ |
|               --**style-separation** | Components' styles will be put in a different file for each component                                                                            |
|            --**no-style-separation** | Components' styles will be put in the same file as the markup                                                                                    |
|              --**script-separation** | Components' scripts will be put in a different file for each component                                                                           |
|           --**no-script-separation** | Components' scripts will be put in the same file as the markup                                                                                   |
|       --**typescript** _or_ --**ts** | **Adds TypeScript support** to your project                                                                                                      |
| --**no-typescript** _or_ --**no-ts** | Does **not add TypeScript support** to your project                                                                                              |
|           --**sass** _or_ --**scss** | **Adds SASS support** to your project                                                                                                            |
|     --**no-sass** _or_ --**no-scss** | Does **not add SASS support** to your project                                                                                                    |

## Component generation

```bash
#in a svalter project
yo svalter:component [component-name] [options...]
```

### Available options

|              Option | Description                                                                  |
| ------------------: | ---------------------------------------------------------------------------- |
| --**folder**=_path_ | Put the component in a specific folder (which will be under /src/components) |

## Route generation

```bash
#in a svalter project
yo svalter:route [route] [options...]
```

If your route's name starts with [ and ends with ], you will be prompted to choose a predefined pattern to help you.  
If you have existing routes containing path variables with patterns, you can skip the pattern, and the generator will still find the right route for you.  
Example:  
If a route "/a/[b(some-pattern)]/" exists, to generate a new [c] route, you can type :

```bash
yo svalter:route a/[b]/[c]
```

### Available options

|                               Option | Description                                                                                                                                                                                         |
| -----------------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|        --**json-api** _or_ --**api** | Create a json api script in this generated route                                                                                                                                                    |
| --**page-component** _or_ --**page** | Create a page component in this generated route                                                                                                                                                     |
|  --**page-layout** _or_ --**layout** | Create a page layout in this route                                                                                                                                                                  |
|         --**pattern**=_some_pattern_ | Available patterns: **none**, **numbers**, **characters**, **date**, **time**, **datetime**. Many patterns can be specified (separated by ; ) _for each path variable that doesn't currently exist_ |

## Service generation

```bash
#in a svalter project
yo svalter:service [service-name] [options...]
```

### Available options

|              Option | Description                                                                      |
| ------------------: | -------------------------------------------------------------------------------- |
| --**folder**=_path_ | Put the service in a specific folder (which will be under /src/scripts/services) |

## Model generation

```bash
#in a svalter project
yo svalter:model [model-name] [options...]
```

### Available options

|              Option | Description                                                                  |
| ------------------: | ---------------------------------------------------------------------------- |
| --**folder**=_path_ | Put the model in a specific folder (which will be under /src/scripts/models) |

## Action generation

```bash
#in a svalter project
yo svalter:action [action-name] [options...]
```

### Available options

|              Option | Description                                                                    |
| ------------------: | ------------------------------------------------------------------------------ |
| --**folder**=_path_ | Put the action in a specific folder (which will be under /src/scripts/actions) |

## Considered features

Recipes generation  
i18n addition

## License

Apache-2.0 © [Nokorbis](https://github.com/Nokorbis)

[npm-image]: https://badge.fury.io/js/generator-svalter.svg
[npm-url]: https://npmjs.org/package/generator-svalter
[travis-image]: https://travis-ci.org/Nokorbis/svalter.svg?branch=master
[travis-url]: https://travis-ci.org/Nokorbis/svalter
[daviddm-image]: https://david-dm.org/Nokorbis/svalter.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Nokorbis/svalter
