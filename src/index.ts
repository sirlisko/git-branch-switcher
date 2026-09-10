#!/usr/bin/env node

import { checkbox, confirm, input, search, select } from "@inquirer/prompts";
import chalk from "chalk";
import { type SimpleGit, simpleGit } from "simple-git";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const git: SimpleGit = simpleGit();

async function getRemoteName(): Promise<string> {
	const remotes = await git.getRemotes();
	if (remotes.length === 1) {
		return remotes[0].name;
	}
	const origin = remotes.find((remote) => remote.name === "origin");
	if (origin) {
		return origin.name;
	}
	throw new Error(
		`Multiple remotes found (${remotes.map((remote) => remote.name).join(", ")}); unable to determine which to delete from.`,
	);
}

async function switchBranch(
	argv: yargs.Arguments<{
		remote?: boolean;
		delete?: boolean;
		deleteForce?: boolean;
		search?: boolean;
		verbose?: boolean;
	}>,
) {
	const branchType = argv.remote ? "remote" : "local";
	try {
		let branches: string[];
		let currentBranch: string;

		if (argv.remote) {
			const [remoteSummary, localSummary] = await Promise.all([
				git.branch(["-r", "--sort=-committerdate"]),
				git.branch(),
			]);
			branches = remoteSummary.all
				.filter((branch) => !branch.includes("->"))
				.map((branch) => branch.replace(/^[^/]+\//, ""));
			currentBranch = localSummary.current;
		} else {
			const summary = await git.branch(["--sort=-committerdate"]);
			branches = summary.all;
			currentBranch = summary.current;
		}

		if (branches.length === 0) {
			console.log(chalk.yellow(`No ${branchType} branches found.`));
			return;
		}

		const CANCEL = "__cancel__";
		const toChoice = (branch: string) => ({
			value: branch,
			name:
				branch === currentBranch ? chalk.dim(`${branch} (current)`) : branch,
		});
		const cancelChoice = { value: CANCEL, name: "↩ Cancel" };

		if (argv.delete || argv.deleteForce) {
			let deletable = branches.filter((branch) => branch !== currentBranch);

			if (argv.search) {
				const term = await input({ message: "Search branches:" });
				if (term) {
					deletable = deletable.filter((branch) => branch.includes(term));
				}
			}

			if (deletable.length === 0) {
				console.log(chalk.yellow("No branches available to delete."));
				return;
			}

			const selectedBranches = await checkbox<string>({
				message: `Select ${branchType} branches to delete:`,
				choices: [...deletable.map(toChoice), cancelChoice],
			});

			if (selectedBranches.includes(CANCEL)) {
				console.log(chalk.yellow("Cancelled."));
				return;
			}

			if (selectedBranches.length === 0) {
				console.log(chalk.yellow("No branches selected for deletion."));
				return;
			}

			if (argv.remote) {
				const confirmed =
					argv.deleteForce ||
					(await confirm({
						message: `Delete ${selectedBranches.length} remote branch${selectedBranches.length === 1 ? "" : "es"} (${selectedBranches.join(", ")})? This cannot be undone.`,
						default: false,
					}));

				if (!confirmed) {
					console.log(chalk.yellow("Aborted."));
					return;
				}

				const remoteName = await getRemoteName();
				await git.push([remoteName, "--delete", ...selectedBranches]);
				console.log(
					chalk.greenBright(
						`Deleted ${selectedBranches.length} remote branch${selectedBranches.length === 1 ? "" : "es"} from '${remoteName}': ${selectedBranches.join(", ")}`,
					),
				);
				return;
			}

			try {
				await git.deleteLocalBranches(selectedBranches, argv.deleteForce);
			} catch (deleteError) {
				const notMerged =
					!argv.deleteForce &&
					deleteError instanceof Error &&
					/not fully merged/.test(deleteError.message);

				if (!notMerged) {
					throw deleteError;
				}

				const forceConfirmed = await confirm({
					message: `${selectedBranches.length === 1 ? "That branch is" : "Some of those branches are"} not fully merged. Force delete anyway?`,
					default: false,
				});

				if (!forceConfirmed) {
					console.log(chalk.yellow("Aborted."));
					return;
				}

				await git.deleteLocalBranches(selectedBranches, true);
			}

			console.log(
				chalk.greenBright(
					`Deleted ${selectedBranches.length} branch${selectedBranches.length === 1 ? "" : "es"}: ${selectedBranches.join(", ")}`,
				),
			);
			return;
		}

		const branch = argv.search
			? await search<string>({
					message: `Select a ${branchType} branch:`,
					source: (term: string) => {
						const filtered = term
							? branches.filter((branch) => branch.includes(term))
							: branches;
						return [...filtered.map(toChoice), cancelChoice];
					},
				})
			: await select<string>({
					message: `Select a ${branchType} branch:`,
					choices: [...branches.map(toChoice), cancelChoice],
				});

		if (branch === CANCEL) {
			console.log(chalk.yellow("Cancelled."));
			return;
		}

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
		console.error(
			chalk.redBright(error instanceof Error ? error.message : error),
		);
		if (argv.verbose && error instanceof Error && error.stack) {
			console.error(chalk.dim(error.stack));
		}
	}
}

yargs(hideBin(process.argv))
	.command(
		"$0 [-r]",
		"Git branch utilities - switch, search, or delete branches",
		(yargs) => yargs,
		(argv) => switchBranch(argv),
	)
	.option("remote", {
		alias: "r",
		type: "boolean",
		description: "Fetch remote branches",
	})
	.option("delete", {
		alias: "d",
		type: "boolean",
		description: "Delete branches",
	})
	.option("delete-force", {
		alias: "D",
		type: "boolean",
		description: "Force delete branches",
	})
	.option("search", {
		alias: "s",
		type: "boolean",
		description: "Search branches",
	})
	.option("verbose", {
		alias: "V",
		type: "boolean",
		description: "Show the full error stack trace on failure",
	})
	.usage("Usage: $0 [options] - branch utils tool")
	.parse();
