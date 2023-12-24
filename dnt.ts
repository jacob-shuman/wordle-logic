import { build, emptyDir } from "https://deno.land/x/dnt@0.39.0/mod.ts";

await emptyDir("./dist");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./dist",
  shims: {
    deno: true,
  },
  package: {
    name: "wordle-logic",
    version: "0.1.0",
  },
});
