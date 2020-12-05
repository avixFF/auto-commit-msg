/**
 * Auto Commit Message CLI script.
 *
 * This is the entry-point for this tool as a command-line script. This does not interact with VS
 * Code or git commands. It just receives text on an argument and prints output stdout for use in a hook flow. Or stderr in the case of a message not appropriate for a commit message.
 *
 * See shell/README.md docs.
 */
import { generateMsg } from './prepareCommitMsg';

/**
 * Command-line entry-point.
 *
 * Expect `git diff-index` output as the first argument and return suitable commit message.
 */
function main(args: string[]) {
  console.debug(args);

  if (!args || args.length === 0) {
    throw new Error('Missing arguments');
  }
  const lines = [args[0]];
  if (!lines) {
    console.error('No file changes found');
    return;
  }

  const msg = generateMsg(lines);
  console.log(msg);
}

const args = process.argv.slice(2);
main(args);
