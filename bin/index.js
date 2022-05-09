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

async function main() {
  try {
    console.log("Downloading files...");
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);
    // Git overwrite the folder as git cant clone to a non empty folder
    // npm i and npx rimraf should be fine too Maybe?

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

try {
  fs.mkdirSync(projectPath);
  main(); // make file with name given
} catch (err) {
  if (err.code === "EEXIST") {
    if (projectName === ".") {
      main(); // make file in root directory
    } else {
      console.log(`The file ${projectName} already exists`);
    }
  } else {
    console.log(error);
    process.exit(1);
  }
}
