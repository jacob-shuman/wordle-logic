import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts";
import { wordle } from "../mod.ts";

Deno.test("empty state", () => {
  const { word, attempts, maxAttempts } = wordle("stomp");

  assertEquals(word.get(), "stomp");
  assertEquals(attempts.get(), []);
  assertEquals(maxAttempts, 6);
});

Deno.test("empty state with options", () => {
  const { word, attempts, maxAttempts } = wordle("stomp", { maxAttempts: 10 });

  assertEquals(word.get(), "stomp");
  assertEquals(attempts.get(), []);
  assertEquals(maxAttempts, 10);
});

Deno.test("one attempt", () => {
  const { attempts, attempt } = wordle("stomp");

  assertEquals(attempt("stone"), {});
  assertEquals(attempts.get(), ["stone"]);
});

Deno.test("max attempts reached", () => {
  const { attempts, attempt } = wordle("stomp", {
    maxAttempts: 2,
  });

  assertEquals(attempt("stone"), {});
  assertEquals(attempt("store"), {});
  assertEquals(attempt("stole"), { error: "max_attempts_reached" });
  assertEquals(attempt("sting"), { error: "max_attempts_reached" });
  assertEquals(attempts.get(), ["stone", "store"]);
});

Deno.test("attempt with too many characters", () => {
  const { attempts, attempt } = wordle("stomp");

  assertEquals(attempt("stone"), {});
  assertEquals(attempt("store"), {});
  assertEquals(attempt("stones"), { error: "too_many_characters" });
  assertEquals(attempt("fridges"), { error: "too_many_characters" });
  assertEquals(attempt("sting"), {});
  assertEquals(attempts.get(), ["stone", "store", "sting"]);
});

Deno.test("attempt with too few characters", () => {
  const { attempts, attempt } = wordle("stomp");

  assertEquals(attempt("stone"), {});
  assertEquals(attempt("store"), {});
  assertEquals(attempt("flip"), { error: "too_few_characters" });
  assertEquals(attempt("stay"), { error: "too_few_characters" });
  assertEquals(attempt("sting"), {});
  assertEquals(attempts.get(), ["stone", "store", "sting"]);
});

Deno.test("invalid attempt", () => {
  const dictionary = ["stone", "store", "sting"];
  const { attempts, attempt } = wordle("stomp", {
    // compare word against dictionary
    validateAttempt: (word) => dictionary.includes(word),
  });

  assertEquals(attempt("stone"), {});
  assertEquals(attempt("store"), {});
  assertEquals(attempt("stiou"), { error: "invalid_attempt" });
  assertEquals(attempt("stoqe"), { error: "invalid_attempt" });
  assertEquals(attempt("sting"), {});
  assertEquals(attempts.get(), ["stone", "store", "sting"]);
});

// TODO:
Deno.test.ignore("persist game", () => {
  // localStorage.clear();
  // const { attempts, attempt } = wordle("stomp", {
  //   persistKey: "1234",
  // });
  // // assertEquals(attempt("stone"), {});
  // // assertEquals(attempt("store"), {});
  // // assertEquals(attempt("sting"), {});
  // // assertEquals(attempts.get(), ["stone", "store", "sting"]);
  // console.log(localStorage.length);
  // localStorage.clear();
});
