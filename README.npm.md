# wordle-logic

<!-- Badges -->

[![deno badge](https://img.shields.io/badge/deno-wordle__logic-black?style=for-the-badge&labelColor=black)](https://deno.land/x/wordle_logic)
[![npm badge](https://img.shields.io/badge/npm-wordle--logic-red?style=for-the-badge&labelColor=red)](https://www.npmjs.com/package/wordle-logic)
[![license badge](https://img.shields.io/badge/license-mit-blue?style=for-the-badge&labelColor=blue)](https://github.com/jacob-shuman/wordle-logic/blob/main/LICENSE)

> A typesafe deno/npm package to facilitate a game of wordle using nanostores

## Why?

I plan on building a minimal adless version of
[wordle](https://en.wikipedia.org/wiki/Wordle) and wanted to open source the
logic.

### Getting started

This module exports a single `wordle()` function which exports
[nanostores](https://github.com/nanostores/nanostores) and an `attempt()`
function to test words.

- `word`: a nanostore which holds the current game's word
- `attempts`: a nanostore which holds the current game's guesses
- `attempt()`: a function which takes in a single string and returns an object
  with a `error?: WordleError` property.

### Errors

The `attempt()` function will return an object with an `error?: WordleError`
property if the attempt failed for any reason. Common errors are (for an
exhaustive list see [./src/mod.ts](./mod.ts)):

- `"max_attempts_reached"`: the game is already over since the number of
  attempts has reached `options?.maxAttempts` (6 by default)
- `"too_few_characters"`: the attempted word has less characters then the
  current word
- `"too_many_characters"`: the attempted word has more characters then the
  current word
- `"invalid_attempt"`: the attempt did not pass the `options?.validateAttempt()`
  function
