var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const chalk = require("chalk");
const process = require("process");
const filePaths = [];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const [i, filePath] of filePaths.entries()) {
            if (i > 0) {
                console.log("");
            }
            const scriptPath = "./script/" + filePath;
            console.log("Running tests in " + chalk.underline(scriptPath) + "...\n");
            process.chdir(__dirname + "/script");
            try {
                require(scriptPath);
            }
            catch (err) {
                console.error(err);
                process.exit(1);
            }
            const esmPath = "./esm/" + filePath;
            console.log("\nRunning tests in " + chalk.underline(esmPath) + "...\n");
            process.chdir(__dirname + "/esm");
            yield import(esmPath);
        }
    });
}
main();
