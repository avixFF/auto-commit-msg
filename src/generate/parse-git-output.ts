/**
 * Parse git status.
 * 
 * Convert short git status into elements.
 */

import { DESCRIPTION } from './constants';

type DescriptionStrings = keyof typeof DESCRIPTION;

export function describeCode(key: DescriptionStrings) {
  return DESCRIPTION[key];
}

export interface FileChanges {
  x: string;
  y: string;
  to: string;
  from: string;
}

/**
 * Parse a line coming from the git status short command.
 */
export function parseStatus(line: string): FileChanges {
  if (line.length <= 4) {
    throw new Error(`Input string must be at least 4 characters. Got: '${line}'`);
  }

  const x = line[0];
  const y = line[1];
  const paths = line.substring(3);

  // FIXME - is this order reversed?
  const [ to, from ] = paths.includes('->') ? paths.split(' -> ') : [ paths, '' ];

  return {
    x: x,
    y: y,
    to: to,
    from: from
  };
}

/**
 * Parse a line coming from the git diff-index command.
 * 
 * For a rename as 'R100', discard the percentage.
 */
export function parseDiffIndex(line: string): FileChanges {
  if (line.length <= 4) {
    throw new Error(`Input string must be at least 4 characters. Got: '${line}'`);
  }

  const x = line[0];
  // Use unmodified symbol and keep to match status, but this is actually not present.
  const y = ' ';

  const segments = line.split(/\s+/);
  const from = segments[1];
  const to = segments.length === 3 ? segments[2] : '';
  console.debug(segments, from, to);

  return {
    x: x,
    y: y,
    from: from,
    to: to
  };
}
