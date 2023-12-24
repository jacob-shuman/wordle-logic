# wordle-logic

<!-- Badges -->

<!-- TODO: deno.land/x badge -->
<!-- TODO: npm badge -->

[![license badge](https://img.shields.io/badge/license-mit-blue?style=for-the-badge&labelColor=blue)](https://github.com/jacob-shuman/wordle-logic/blob/main/LICENSE)

> A typesafe deno/node package to facilitate a game of wordle using nanostores

## Why?

I plan on building a minimal adless version of [wordle](https://en.wikipedia.org/wiki/Wordle) and decided to open source the logic.

### Getting started

This module exports a single `wordle()` function which exports [nanostores](https://github.com/nanostores/nanostores) and a single `attempt()` function to test words.

- `word`: a nanostore which holds the current game's word
- `attempts`: a nanostore which holds the current game's guesses
- `attempt()`: a function which takes in a single string and returns an object with a `error?: WordleError` property.

### Errors

The `attempt()` function will return an object with an `error?: WordleError` property if the attempt failed for any reason. Common errors are (for an exhaustive list see [mod.ts](./mod.ts)):

- `"max_attempts_reached"`: the game is already over since the number of attempts has reached `options?.maxAttempts` (6 by default)
- `"too_few_characters"`: the attempted word has less characters then the current word
- `"too_many_characters"`: the attempted word has more characters then the current word
- `"invalid_attempt"`: the attempt did not pass the `options?.validateAttempt()` function

## Tasks

| Task   | Description                                                       |
| ------ | ----------------------------------------------------------------- |
| `test` | run all tests once                                                |
| `dev`  | run all tests in watch mode                                       |
| `node` | compile node package using [dnt](https://github.com/denoland/dnt) |
