#!/usr/bin/env node

import { search, select } from "@inquirer/prompts";
import chalk from "chalk";
import simpleGit, { type SimpleGit } from "simple-git";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

//@ts-expect-error types are wrong
const git: SimpleGit = simpleGit();

async function switchBranch(
	argv: yargs.Arguments<{
		remote?: boolean;
		search?: boolean;
	}>,
) {
	const branchType = argv.remote ? "remote" : "local";
	try {
		const branches = argv.remote
			? (await git.branch(["-r", "--sort=-committerdate"])).all
					.map((branch) => branch.split("origin/")[1])
					.filter((branch) => branch && branch !== "HEAD")
			: (await git.branch(["--sort=-committerdate"])).all;

		const branch = argv.search
			? await search<string>({
					message: `Select a ${branchType} branch:`,
					source: (term: string) => {
						if (!term) {
							return branches;
						}
						return branches.filter((branch) => branch.includes(term));
					},
				})
			: await select<string>({
					message: `Select a ${branchType} branch:`,
					choices: branches,
				});

		await git.checkout(branch);
		console.log(
			chalk.greenBright(`Switched to ${branchType} branch '${branch}'`),
		);
	} catch (error) {
		if (
			error instanceof Error &&
			error.message.includes("User force closed the prompt")
		) {
			console.log("bye 👋");
			process.exit(0);
		}
		console.error(chalk.redBright(error));
	}
}

yargs(hideBin(process.argv))
	.command(
		"$0 [-r]",
		"Git branch utilities - switch or search branches",
		(yargs) => yargs,
		(argv) => switchBranch(argv),
	)
	.option("remote", {
		alias: "r",
		type: "boolean",
		description: "Fetch remote branches",
	})
	.option("search", {
		alias: "s",
		type: "boolean",
		description: "Search branches",
	})
	.usage("Usage: $0 [options] - branch utils tool")
	.parse();
