# git-branch-switcher

A simple and intuitive CLI tool for switching between git branches with an interactive prompt. Say goodbye to remembering branch names and typing long `git checkout` commands!

## Features

- 🚀 Interactive branch selection with fuzzy search
- 🌐 Support for both local and remote branches
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

### Command options

```bash
git-branch-switcher [options]

Options:
  -r, --remote    Show remote branches instead of local ones
  -h, --help      Show help
  -v, --version   Show version number
```

## Requirements

- Node.js 18 or higher
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
- **simple-git** - Git operations
- **inquirer** - Interactive CLI prompts
- **yargs** - Command line argument parsing
- **chalk** - Terminal colors
- **Biome** - Linting and formatting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT © [Luca Lischetti](https://sirlisko.com)

## Links

- [GitHub Repository](https://github.com/sirlisko/git-branch-switcher)
- [npm Package](https://www.npmjs.com/package/git-branch-switcher)
- [Issues](https://github.com/sirlisko/git-branch-switcher/issues)
