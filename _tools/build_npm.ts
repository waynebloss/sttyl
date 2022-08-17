/**
 * @file Run with `deno run -A build_npm.ts 1.0.0`
 */
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

async function main() {
  const vNext = Deno.args[0];
  if (!vNext) {
    console.error(
      "Please pass semver as first argument.",
    );
    Deno.exit(1);
    return;
  }
  let readmeText = Deno.readTextFileSync("README.md");
  if (!readmeText) {
    console.error("README.md not found");
    Deno.exit(2);
  }
  // Replace version number in docs.
  readmeText = readmeText.replaceAll(
    /deno\.land\/x\/sttyl[^\s/]+\/{1}/g,
    function (_substring: string, ..._args: any[]) {
      return `deno.land/x/sttyl@${vNext}/`;
    },
  );
  // Pass a 2nd argument to test docs.
  if (Deno.args[1] === "test") {
    console.log("Saving README2.md for inspection.");
    Deno.writeTextFileSync("README2.md", readmeText);
    return;
  }
  Deno.writeTextFileSync("README.md", readmeText);

  // Cleanup
  await emptyDir("./npm");

  // Build NPM Package
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

  // Copy Assets
  Deno.copyFileSync("LICENSE", "npm/LICENSE");
  Deno.copyFileSync("README.md", "npm/README.md");

  console.log("");
  console.log("Next steps, in the npm directory: npm publish");
  console.log("");
}
await main();
