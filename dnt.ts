import { build, emptyDir } from "https://deno.land/x/dnt@0.39.0/mod.ts";

await emptyDir("./dist");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./dist",
  shims: {
    deno: "dev",
  },
  typeCheck: "both",
  scriptModule: false,
  package: {
    name: "wordle-logic",
    version: "0.1.0",
  },
});
