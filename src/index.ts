#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import simpleGit, { type SimpleGit } from "simple-git";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

//@ts-expect-error types are wrong
const git: SimpleGit = simpleGit();

async function switchBranch(remote = false) {
	const branchType = remote ? "remote" : "local";
	try {
		const branches = remote
			? (await git.branch(["-r"])).all.map(
					(branch) => branch.split("origin/")[1],
				)
			: (await git.branchLocal()).all;

		const { branch } = await inquirer.prompt([
			{
				type: "list",
				name: "branch",
				message: `Select a ${branchType} branch:`,
				choices: branches,
			},
		]);

		await git.checkout(branch);
		console.log(
			chalk.greenBright(`Switched to ${branchType} branch '${branch}'`),
		);
	} catch (error) {
		console.error(chalk.redBright(error));
	}
}

yargs(hideBin(process.argv))
	.command(
		"$0 [-r]",
		"Switch branches",
		(yargs) => {
			return yargs;
		},
		(argv) => {
			switchBranch(argv.remote);
		},
	)
	.option("remote", {
		alias: "r",
		type: "boolean",
		description: "Fetch remote branches",
	})
	.parse();
