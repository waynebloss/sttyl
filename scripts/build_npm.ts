/**
 * @file Run with `deno run -A scripts/build_npm.ts 1.0.0`
 */
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  compilerOptions: {
    target: "ES2016",
  },
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "sttyl",
    version: Deno.args[0],
    description: "Style templates for console.log.",
    license: "MIT",
    author: {
      name: "Wayne Bloss",
      email: "waynebloss@gmail.com",
    },
    repository: {
      type: "git",
      url: "git+https://github.com/waynebloss/sttyl.git",
    },
    bugs: {
      url: "https://github.com/waynebloss/sttyl/issues",
    },
  },
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
