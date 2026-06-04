#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
import pc from 'picocolors';
import { Command } from 'commander';
import boxen from 'boxen';

const program = new Command();

program
  .name('cache-reaper')
  .description('Interactively obliterate hidden developer caches to reclaim gigabytes of space.')
  .version('1.0.0')
  .parse(process.argv);

const banner = `
    ██████╗ ██████╗  █████╗ ██╗  ██╗███████╗    ██████╗ ███████╗ █████╗ ██████╗ ███████╗██████╗ 
    ██╔════╝██╔══██╗██╔══██╗██║  ██║██╔════╝    ██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
    ██║     ██████╔╝███████║███████║█████╗      ██████╔╝█████╗  ███████║██████╔╝█████╗  ██████╔╝
    ██║     ██╔══██╗██╔══██║██╔══██║██╔══╝      ██╔══██╗██╔══╝  ██╔══██║██╔═══╝ ██╔══╝  ██╔══██╗
    ╚██████╗██║  ██║██║  ██║██║  ██║███████╗    ██║  ██║███████╗██║  ██║██║     ███████╗██║  ██║
     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝
`;

console.log(pc.magenta(banner));
console.log(pc.gray('    Sweep the hidden garbage.\n'));

const checkCli = (cmd) => {
  try {
    execSync(`which ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

const caches = [
  { id: 'npm', name: 'NPM Cache', check: 'npm', cmd: 'npm cache clean --force' },
  { id: 'yarn', name: 'Yarn Cache', check: 'yarn', cmd: 'yarn cache clean' },
  { id: 'brew', name: 'Homebrew Cache', check: 'brew', cmd: 'brew cleanup' },
  { id: 'pip', name: 'Pip Cache', check: 'pip3', cmd: 'pip3 cache purge' },
  { id: 'docker', name: 'Docker Build Cache', check: 'docker', cmd: 'docker builder prune -f' },
  { id: 'bun', name: 'Bun Cache', check: 'bun', cmd: 'bun pm cache rm' }
];

const availableCaches = caches.filter(c => checkCli(c.check));

if (availableCaches.length === 0) {
  console.log(pc.green('✨ No supported package managers found on this system. You are clean.'));
  console.log(pc.cyan('\nArchitected by @lakshanmuruganandam\n'));
  process.exit(0);
}

const choices = availableCaches.map(c => ({
  name: `🗑️  ${pc.bold(c.name.padEnd(20))} ${pc.gray(`[Runs: ${c.cmd}]`)}`,
  value: c,
  short: c.name
}));

const run = async () => {
  const { selected } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'selected',
    message: 'Select caches to instantly obliterate:',
    choices: choices,
    pageSize: 10,
    loop: false
  }]);

  if (selected.length === 0) {
    console.log(pc.gray('\nMission aborted. No caches cleared.'));
    console.log(pc.cyan('\nArchitected by @lakshanmuruganandam\n'));
    process.exit(0);
  }

  const { confirm } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message: pc.bgRed(pc.white(` WARNING: You are about to wipe ${selected.length} system caches. Proceed? `)),
    default: false
  }]);

  if (!confirm) {
    console.log(pc.gray('\nMission aborted.'));
    console.log(pc.cyan('\nArchitected by @lakshanmuruganandam\n'));
    process.exit(0);
  }

  console.log();
  let cleared = 0;
  for (const cache of selected) {
    try {
      process.stdout.write(pc.yellow(`⏳ Sweeping ${cache.name}... `));
      execSync(cache.cmd, { stdio: 'ignore' });
      process.stdout.write(pc.green(`✔ Cleared!\n`));
      cleared++;
    } catch (e) {
      process.stdout.write(pc.red(`❌ Failed to clear.\n`));
    }
  }

  console.log(
    boxen(
      pc.green(`Mission Accomplished.\n`) + pc.white(`Obliterated ${cleared} caches. Reclaimed precious space.`),
      { padding: 1, margin: { top: 1 }, borderStyle: 'round', borderColor: 'green' }
    )
  );

  console.log(pc.cyan('\nArchitected by @lakshanmuruganandam\n'));
};

run().catch(e => {
  console.error(pc.red('\nAn unexpected error occurred:'), e.message);
  process.exit(1);
});
