# git-branch-switcher

A comprehensive CLI tool for git branch management with interactive prompts. Switch, search, and delete branches effortlessly. Say goodbye to remembering branch names and typing long `git checkout` commands!

## Features

- 🚀 Interactive branch selection with multiple interfaces
- 🔍 Real-time branch search with filtering
- 🗑️ Safe branch deletion with multi-select, local and remote
- 📅 Branches sorted by commit date (most recent first)
- 🎨 Colorized output for better readability
- ⚡ Fast and lightweight
- 🛡️ Safety features (confirmation prompt before deleting remote branches)
- 🔧 Two convenient commands: `git-branch-switcher` and `br`

## Installation

Install globally via npm:

```bash
npm install -g git-branch-switcher
```

Or using pnpm:

```bash
pnpm add -g git-branch-switcher
```

## Usage

### Switch between local branches

```bash
git-branch-switcher
# or use the shorthand
br
```

This will show an interactive list of your local branches. Use arrow keys to navigate and press Enter to switch.

### Switch to remote branches

```bash
git-branch-switcher --remote
# or
br -r
```

This fetches and displays remote branches for checkout.

### Search for branches

```bash
git-branch-switcher --search
# or
br -s
```

Use the search interface to filter branches in real-time as you type.

### Delete local branches

```bash
git-branch-switcher --delete
# or
br -d

# Force delete (for unmerged branches)
git-branch-switcher --delete-force
# or
br -D
```

Select multiple local branches to delete.

### Delete remote branches

```bash
git-branch-switcher --remote --delete
# or
br -r -d

# Force delete (skips the confirmation prompt)
br -r -D
```

Select multiple remote branches to delete. This runs `git push <remote> --delete` under the hood, so it's a real, hard-to-undo operation — you'll be asked to confirm unless you pass `-D`. The remote is auto-detected (your only remote, or `origin` if you have several); if neither applies, the command will tell you it can't determine which remote to use.

### Combine options

```bash
# Search through remote branches
br --remote --search

# Search, then pick which local branches to delete
br --search --delete

# All available combinations work together
```

### Command options

```bash
git-branch-switcher [options]

Options:
  -r, --remote          Work with remote branches instead of local ones
  -s, --search          Use search interface for branch filtering
  -d, --delete          Delete selected branches (asks for confirmation on remote)
  -D, --delete-force    Force delete selected branches (skips the merge check locally, and the confirmation prompt on remote)
  -h, --help            Show help
  -v, --version         Show version number
```

## Requirements

- Node.js 20+ or 22+ (see .nvmrc for the version used in CI)
- Git installed and configured
- A git repository (local or cloned)

## Development

### Setup

```bash
git clone https://github.com/sirlisko/git-branch-switcher.git
cd git-branch-switcher
pnpm install
```

### Available scripts

```bash
pnpm build      # Compile TypeScript to JavaScript
pnpm typecheck  # Run TypeScript type checking
pnpm lint       # Run Biome linter
pnpm format     # Format code with Biome
pnpm check      # Run linting and formatting checks
```

### Releasing

This project uses [Changesets](https://github.com/changesets/changesets) with automated publishing:

1. Create a changeset: `pnpm changeset`
2. Commit and open a PR to `main`
3. After merging, GitHub Actions will create a "Version Packages" PR
4. Merge the "Version Packages" PR to automatically publish to npm

### Tech stack

- **TypeScript** - Type-safe JavaScript
- **simple-git** - Git operations (branch listing, checkout, deletion)
- **@inquirer/prompts** - Modular interactive CLI prompts (select, search, checkbox)
- **yargs** - Command line argument parsing
- **chalk** - Terminal colors and styling
- **Biome** - Linting and formatting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT © [Luca Lischetti](https://sirlisko.com)

## Links

- [GitHub Repository](https://github.com/sirlisko/git-branch-switcher)
- [npm Package](https://www.npmjs.com/package/git-branch-switcher)
- [Issues](https://github.com/sirlisko/git-branch-switcher/issues)
