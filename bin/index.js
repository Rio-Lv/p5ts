#! /usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log("Please provide a name...");
  console.log("For example :");
  console.log("    npx p5ts my-app");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/Rio-Lv/p5ts.git";

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(`The file ${projectName} already exists`);
  } else {
    console.log(error);
  }
  process.exit(1);
}
async function main() {
  try {
    console.log("Downloading files...");
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

    process.chdir(projectPath);

    console.log("Installing dependencies...");
    execSync("npm install");

    console.log("Removing useless files");
    execSync("npx rimraf ./.git");
    fs.rmSync(path.join(projectPath, "bin"), { recursive: true });

    console.log("The installation is done... I think?");
    console.log("To enable Live Editing run:  npm start");
  } catch (error) {
    console.log(error);
  }
}
main();
