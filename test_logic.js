function quoteIdentifier(identifier) {
  if (isQuoted(identifier)) return identifier;
  return `"${identifier.replace(/"/g, '""')}"`;
}

function isQuoted(s) {
  if (s.length < 2) return false;
  const first = s[0];
  const last = s[s.length - 1];
  if (first === '"' && last === '"') {
    return !s.substring(1, s.length - 1).replace(/""/g, '').includes('"');
  }
  if (first === '`' && last === '`') {
    return !s.substring(1, s.length - 1).includes('`');
  }
  if (first === '[' && last === ']') {
    return !s.substring(1, s.length - 1).includes(']');
  }
  return false;
}

function splitIdentifiers(s) {
    const parts = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (!inQuotes) {
            if (c === '"' || c === '`' || c === '[') {
                inQuotes = true;
                quoteChar = c === '[' ? ']' : c;
                current += c;
            } else if (c === '.') {
                parts.push(current);
                current = '';
            } else {
                current += c;
            }
        } else {
            current += c;
            if (c === quoteChar) {
                if (quoteChar === '"' && i + 1 < s.length && s[i+1] === '"') {
                    current += s[i+1];
                    i++;
                } else {
                    inQuotes = false;
                }
            }
        }
    }
    parts.push(current);
    return parts;
}

function quoteTable(table) {
  return splitIdentifiers(table)
    .map(part => quoteIdentifier(part))
    .join('.');
}

const testCases = [
    'files',
    'aux.files',
    '"my.table"',
    'aux."my.table"',
    '[my table].foo',
    'foo"bar',
    'foo""bar',
    '"foo""bar"',
    'files" ; DROP TABLE files; -- ',
    '[foo] ; DROP TABLE files; -- [bar]',
    '"foo"""',
    '""',
    '[]',
    '``'
];

testCases.forEach(tc => {
    console.log(`Input: ${tc}`);
    console.log(`Output: ${quoteTable(tc)}`);
    console.log('---');
});
