# NPM Basics: 

## Table of Contents
1. [What is NPM?](#1-what-is-npm)
2. [Installation & Setup](#2-installation--setup)
3. [Basic Commands In-Depth](#3-basic-commands-in-depth)
4. [Package.json Essentials](#4-packagejson-essentials)
5. [Understanding node_modules](#5-understanding-node_modules)
6. [Quick Reference](#6-quick-reference)

---

# 1. What is NPM?

## Definition

NPM stands for **Node Package Manager**. It's three things in one:

```
┌─────────────────────────────────────────────────────────────┐
│                        NPM                                  │
├───────────────────┬───────────────────┬────────────────────┤
│     Registry      │       CLI         │      Website       │
│                   │                   │                    │
│  Database with    │  Command-line     │  Browse packages   │
│  2+ million       │  tool to install  │  at npmjs.com      │
│  packages         │  & manage pkgs    │                    │
└───────────────────┴───────────────────┴────────────────────┘
```

## Why Do We Need NPM?

**Without NPM:**
- Manually download JavaScript files
- Copy-paste code from websites
- Track versions yourself
- Update each file manually
- No dependency management

**With NPM:**
- One command to install packages
- Automatic version management
- Handles dependencies automatically
- Easy updates
- Standardized across all projects

## Key Terms

| Term | Meaning |
|------|---------|
| **Package** | A folder containing code and a package.json file |
| **Module** | Any file/folder in node_modules that can be loaded with `require()` |
| **Dependency** | A package your project needs to work |
| **Registry** | Online database where packages are stored |
| **CLI** | Command Line Interface - the npm commands you type |

## How NPM Works (Simple Flow)

```
You type: npm install lodash
              │
              ▼
    NPM checks registry
    (registry.npmjs.org)
              │
              ▼
    Downloads package + 
    all its dependencies
              │
              ▼
    Saves to node_modules/
              │
              ▼
    Updates package.json &
    package-lock.json
              │
              ▼
    Ready to use!
```

---

# 2. Installation & Setup

## Installing Node.js (Includes NPM)

NPM comes automatically with Node.js. You don't install them separately.

### Step 1: Download Node.js

Go to [nodejs.org](https://nodejs.org) and download:
- **LTS Version** (Recommended) - More stable
- **Current Version** - Latest features

### Step 2: Install

**Windows:**
1. Run the downloaded `.msi` installer
2. Follow the installation wizard
3. Check "Automatically install necessary tools" if prompted

**macOS:**
1. Run the downloaded `.pkg` installer
2. Follow the installation wizard

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

### Step 3: Verify Installation

Open your terminal (Command Prompt, PowerShell, or Terminal):

```bash
# Check Node.js version
node --version
# Output: v20.10.0 (or similar)

# Check NPM version
npm --version
# Output: 10.2.0 (or similar)

# More detailed version info
npm version
```

## Using NVM (Recommended for Developers)

NVM (Node Version Manager) lets you install and switch between multiple Node.js versions.

### Why Use NVM?
- Different projects may need different Node versions
- Easy to upgrade or downgrade
- No permission issues with global packages

### Installing NVM

**macOS/Linux:**
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or run:
source ~/.bashrc    # For bash
source ~/.zshrc     # For zsh

# Verify
nvm --version
```

**Windows:**
Download [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

### Basic NVM Commands

```bash
# See available versions to install
nvm ls-remote

# Install a specific version
nvm install 20.10.0

# Install latest LTS version
nvm install --lts

# See installed versions
nvm ls

# Switch to a version
nvm use 20.10.0

# Set default version
nvm alias default 20.10.0

# Use Node version from .nvmrc file
nvm use
```

### .nvmrc File

Create a `.nvmrc` file in your project root:
```
20.10.0
```

Now anyone can run `nvm use` to switch to the correct version.

## Updating NPM

NPM updates independently of Node.js:

```bash
# Update to latest version
npm install -g npm@latest

# Update to specific version
npm install -g npm@10.0.0

# Check current version
npm --version
```

## Basic Configuration

```bash
# See all your configuration
npm config list

# Set your default author info (for new projects)
npm config set init-author-name "Your Name"
npm config set init-author-email "your@email.com"

# Set default license
npm config set init-license "MIT"

# View a specific config
npm config get init-author-name

# Delete a config
npm config delete init-author-name
```

---

# 3. Basic Commands In-Depth

## Creating a New Project

### npm init

Creates a `package.json` file for your project.

```bash
# Interactive mode (asks questions)
npm init
```

You'll be asked:
```
package name: (my-project) 
version: (1.0.0) 
description: My awesome project
entry point: (index.js) 
test command: jest
git repository: https://github.com/user/repo
keywords: awesome, project
author: Your Name
license: (ISC) MIT
```

```bash
# Quick mode (accepts all defaults)
npm init -y
npm init --yes
```

This creates:
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## Installing Packages

### Install Single Package

```bash
# Full command
npm install lodash

# Shorthand
npm i lodash
```

**What happens:**
1. Package downloaded from registry
2. Saved in `node_modules/lodash/`
3. Added to `package.json` dependencies
4. Recorded in `package-lock.json`

### Install Multiple Packages

```bash
npm install express mongoose dotenv
```

### Install Specific Version

```bash
# Exact version
npm install lodash@4.17.21

# Latest version
npm install lodash@latest
```

### Install All Project Dependencies

When you clone a project or pull changes:

```bash
# Install everything listed in package.json
npm install
npm i
```

### Types of Dependencies

**Production Dependencies (default):**
```bash
npm install express
npm install express --save      # Same thing (--save is default)
npm install express -S          # Shorthand
```

Goes into `"dependencies"` - needed for your app to run.

**Development Dependencies:**
```bash
npm install jest --save-dev
npm install jest -D             # Shorthand
```

Goes into `"devDependencies"` - only needed during development (testing, building, etc.).

**Global Packages:**
```bash
npm install -g nodemon
npm install --global typescript
```

Installed system-wide, available everywhere. Use for CLI tools.

### Comparison Table

| Command | Where Installed | Saved To |
|---------|-----------------|----------|
| `npm i lodash` | ./node_modules | dependencies |
| `npm i lodash -D` | ./node_modules | devDependencies |
| `npm i -g nodemon` | Global folder | Nothing |

## Uninstalling Packages

```bash
# Uninstall local package
npm uninstall lodash
npm un lodash           # Shorthand
npm remove lodash       # Alternative
npm rm lodash           # Alternative

# Uninstall dev dependency
npm uninstall jest --save-dev
npm un jest -D

# Uninstall global package
npm uninstall -g nodemon
```

## Updating Packages

```bash
# Check which packages are outdated
npm outdated
```

Output:
```
Package  Current  Wanted  Latest  Location
lodash   4.17.19  4.17.21 4.17.21 my-project
express  4.17.1   4.18.2  4.18.2  my-project
```

- **Current**: What you have installed
- **Wanted**: Max version satisfying your package.json range
- **Latest**: Newest version available

```bash
# Update all packages (within version ranges)
npm update
npm up              # Shorthand

# Update specific package
npm update lodash

# Update to latest (ignore version range)
npm install lodash@latest
```

## Listing Packages

```bash
# List all installed packages
npm list
npm ls

# List only top-level packages
npm list --depth=0

# List global packages
npm list -g --depth=0

# Find specific package
npm list lodash

# See why a package is installed
npm explain lodash
npm why lodash
```

## Viewing Package Information

```bash
# View package details
npm view express
npm info express        # Same thing

# View specific info
npm view express version           # Current version
npm view express versions          # All available versions
npm view express description       # Package description
npm view express dependencies      # What it depends on
npm view express repository.url    # Repository URL
```

## Running Scripts

Scripts are defined in `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "build": "webpack"
  }
}
```

```bash
# Built-in scripts (no 'run' needed)
npm start
npm test
npm stop
npm restart

# Custom scripts (need 'run')
npm run dev
npm run build

# List available scripts
npm run
```

## Other Essential Commands

```bash
# Clear npm cache (fixes weird issues)
npm cache clean --force

# Check for problems
npm doctor

# Search for packages
npm search keyword

# Open package homepage
npm home lodash

# Open package repository
npm repo lodash

# See npm help
npm help
npm help install
```

---

# 4. Package.json Essentials

## What is package.json?

The `package.json` file is your project's manifest. It contains:
- Project metadata (name, version, description)
- Dependencies list
- Scripts to run
- Configuration

## Basic Structure

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A description of my project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "keywords": ["example", "project"],
  "author": "Your Name <your@email.com>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.5.0"
  }
}
```

## Field Explanations

### Required Fields

**name**
```json
{
  "name": "my-project"
}
```
- Must be lowercase
- Can use hyphens and underscores
- No spaces
- Must be unique if publishing to npm

**version**
```json
{
  "version": "1.0.0"
}
```
- Uses semantic versioning (MAJOR.MINOR.PATCH)
- More on this in versioning section

### Descriptive Fields

```json
{
  "description": "A short description for npm search",
  "keywords": ["api", "server", "express"],
  "author": "Your Name <email@example.com> (https://website.com)",
  "license": "MIT",
  "homepage": "https://github.com/user/repo#readme",
  "repository": {
    "type": "git",
    "url": "https://github.com/user/repo.git"
  },
  "bugs": {
    "url": "https://github.com/user/repo/issues"
  }
}
```

### Entry Point

```json
{
  "main": "index.js"
}
```

The file that loads when someone `require()`s your package.

### Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "build": "webpack --mode production",
    "lint": "eslint src/"
  }
}
```

### Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "jest": "^29.5.0",
    "nodemon": "^3.0.0"
  }
}
```

### Version Symbols Explained

| Symbol | Meaning | Example | Matches |
|--------|---------|---------|---------|
| None | Exact | `4.18.2` | Only 4.18.2 |
| `^` | Minor updates OK | `^4.18.2` | 4.18.2 to <5.0.0 |
| `~` | Patch updates OK | `~4.18.2` | 4.18.2 to <4.19.0 |
| `*` | Any version | `*` | Any |
| `>=` | Greater or equal | `>=4.0.0` | 4.0.0 and above |

**Most common: `^` (caret)**
- `^4.18.2` means "4.18.2 or higher, but less than 5.0.0"
- Allows minor and patch updates (usually safe)

### Private Field

```json
{
  "private": true
}
```

Prevents accidental publishing to npm.

### Engines

```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

Specifies which Node/npm versions your project supports.

---

# 5. Understanding node_modules

## What is node_modules?

The `node_modules` folder contains all installed packages and their dependencies.

```
my-project/
├── node_modules/           ← All packages live here
│   ├── express/
│   ├── lodash/
│   └── ... (many more)
├── package.json
├── package-lock.json
└── index.js
```

## Why is it So Large?

Each package can have its own dependencies:

```
express (you installed this)
├── accepts
├── body-parser
│   ├── bytes
│   ├── content-type
│   └── ... (more deps)
├── content-disposition
└── ... (48+ dependencies total)
```

One package can install dozens more.

## Should You Commit node_modules?

**NO!** Always add to `.gitignore`:

```gitignore
# .gitignore
node_modules/
```

Why?
- Very large (hundreds of MB)
- Can be recreated with `npm install`
- May contain platform-specific binaries

## What to Commit

✅ **Always commit:**
- `package.json`
- `package-lock.json`

❌ **Never commit:**
- `node_modules/`

## package-lock.json

This file locks exact versions of all dependencies.

**Why it matters:**
```
package.json says: "lodash": "^4.17.0"
Could install: 4.17.0, 4.17.15, 4.17.21...

package-lock.json says: "lodash": "4.17.21"
Always installs: exactly 4.17.21
```

**Benefits:**
- Same versions for everyone
- Reproducible builds
- Faster installs (knows exact versions)

**Commands:**
```bash
# npm install - may update lock file
# npm ci - uses lock file exactly (for CI/CD)
npm ci
```

## Cleaning node_modules

```bash
# Delete and reinstall (fixes many issues)
rm -rf node_modules
npm install

# Or on Windows
rmdir /s /q node_modules
npm install

# Using npx
npx rimraf node_modules
npm install
```

---

# 6. Quick Reference

## Most Used Commands

```bash
# Initialize project
npm init -y

# Install packages
npm install                    # Install all from package.json
npm install lodash             # Install single package
npm install lodash express     # Install multiple
npm install lodash@4.17.21     # Install specific version
npm install lodash -D          # Install as dev dependency
npm install -g nodemon         # Install globally

# Uninstall packages
npm uninstall lodash           # Remove package
npm uninstall -g nodemon       # Remove global package

# Update packages
npm outdated                   # Check what's outdated
npm update                     # Update all packages
npm update lodash              # Update specific package

# List packages
npm list --depth=0             # List top-level packages
npm list -g --depth=0          # List global packages

# Run scripts
npm start                      # Run start script
npm test                       # Run test script
npm run dev                    # Run custom script

# Info commands
npm view lodash                # View package info
npm search keyword             # Search packages
npm help                       # Get help
```

## Common Shortcuts

| Full Command | Shorthand |
|--------------|-----------|
| `npm install` | `npm i` |
| `npm install --save-dev` | `npm i -D` |
| `npm install --global` | `npm i -g` |
| `npm uninstall` | `npm un` |
| `npm update` | `npm up` |
| `npm test` | `npm t` |
| `npm list` | `npm ls` |

## Typical Project Setup

```bash
# 1. Create project folder
mkdir my-project
cd my-project

# 2. Initialize npm
npm init -y

# 3. Install dependencies
npm install express dotenv
npm install -D nodemon jest

# 4. Create files
touch index.js
touch .gitignore

# 5. Add to .gitignore
echo "node_modules/" >> .gitignore

# 6. Update scripts in package.json
# Add "start", "dev", "test" scripts

# 7. Start coding!
```

## Troubleshooting Common Issues

**"Module not found"**
```bash
npm install    # Make sure packages are installed
```

**Permission errors (global)**
```bash
# Fix npm permissions or use nvm
```

**Weird bugs after pulling code**
```bash
rm -rf node_modules
npm install
```

**Cache issues**
```bash
npm cache clean --force
```

**Conflicting packages**
```bash
npm ls package-name    # See what's installed
npm dedupe             # Reduce duplicates
```

---

## Next Steps

Once you're comfortable with basics, explore:
- NPM Scripts (automation)
- Semantic Versioning (version management)
- Publishing Packages (share your code)
- Workspaces (monorepos)
- Security (npm audit)

---

## Resources

- [Official NPM Docs](https://docs.npmjs.com/)
- [Node.js Download](https://nodejs.org/)
- [NVM GitHub](https://github.com/nvm-sh/nvm)
- [NPM Package Search](https://www.npmjs.com/)