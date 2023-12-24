import { build, emptyDir } from "https://deno.land/x/dnt@0.39.0/mod.ts";

const outDir = "./npm";

const [version] = Deno.args;

if (!version) {
  throw new Error("missing version argument");
}

await emptyDir(outDir);

await build({
  entryPoints: ["./mod.ts"],
  outDir,
  shims: {
    deno: "dev",
  },
  test: false,
  package: {
    name: "wordle-logic",
    version,
    description:
      "A typesafe deno/npm package to facilitate a game of wordle using nanostores",
    license: "MIT",
    author: {
      name: "Jacob Shuman",
      email: "44483276+jacob-shuman@users.noreply.github.com",
    },
    repository: {
      type: "git",
      url: "git+https://github.com/jacob-shuman/wordle-logic.git",
    },
    bugs: {
      url: "https://github.com/jacob-shuman/wordle-logic/issues",
    },
  },
});

await Deno.copyFile("README.npm.md", `${outDir}/README.md`);
await Deno.copyFile("LICENSE", `${outDir}/LICENSE`);
