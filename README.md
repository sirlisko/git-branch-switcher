# git-branch-switcher

A comprehensive CLI tool for git branch management with interactive prompts. Switch, search, and delete branches effortlessly. Say goodbye to remembering branch names and typing long `git checkout` commands!

## Features

- 🚀 Interactive branch selection with multiple interfaces
- 🌐 Support for both local and remote branches
- 📅 Branches sorted by commit date (most recent first)
- 🎨 Colorized output for better readability
- ⚡ Fast and lightweight
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

You can use this tool by running the following command in your terminal:

```bash
git-branch-switcher
# or use the shorthand
br
```

or the shorthand version:

```bash
br
```

You can also fetch and switch to remote branches by using the `-r` or `--remote` flag:

```bash
git-branch-switcher --remote
```

or

```bash
br -r
  -D, --delete-force    Force delete selected branches (local only)
  -h, --help            Show help
  -v, --version         Show version number
```

## Requirements

- Node.js 18 or higher (22.3.0 recommended - see .nvmrc)
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
