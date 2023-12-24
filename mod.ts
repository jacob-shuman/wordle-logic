import { persistentAtom } from "npm:@nanostores/persistent@0.9.1";
import { action, atom, WritableAtom } from "npm:nanostores@0.9.5";

export type WordleError =
  | "max_attempts_reached"
  | "too_few_characters"
  | "too_many_characters"
  | "invalid_attempt";

export function wordle(
  word: string,
  options?: {
    persistKey?: string;
    maxAttempts?: number;
    validateAttempt?: (word: string) => boolean;
  },
) {
  if (options?.persistKey) {
    console.log("key is", `"wordle-${options?.persistKey}"`);
  }

  const $word: WritableAtom<string> =
    options?.persistKey && options?.persistKey.length > 0
      ? persistentAtom(`wordle-${options?.persistKey}`, word)
      : atom(word);

  const $attempts: WritableAtom<string[]> =
    options?.persistKey && options?.persistKey.length > 0
      ? persistentAtom(`wordle-${options?.persistKey}`, [], {
        encode: JSON.stringify,
        decode: JSON.parse,
      })
      : atom([]);

  const maxAttempts = options?.maxAttempts ?? 6;

  if (options?.persistKey && options?.persistKey.length < 1) {
    console.warn("persistKey key length must be greater than 0");
  }

  const attempt = action(
    $attempts,
    "attempt",
    (store, attemptedWord: string): { error?: WordleError } => {
      if (store.get().length > maxAttempts - 1) {
        return { error: "max_attempts_reached" };
      }

      if (attemptedWord.length < $word.get().length) {
        return { error: "too_few_characters" };
      }

      if (attemptedWord.length > $word.get().length) {
        return { error: "too_many_characters" };
      }

      if (
        options?.validateAttempt &&
        !options?.validateAttempt(attemptedWord)
      ) {
        return { error: "invalid_attempt" };
      }

      store.set([...store.get(), attemptedWord]);

      return {};
    },
  );

  return { word: $word, attempts: $attempts, attempt, maxAttempts };
}

export default wordle;
