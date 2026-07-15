const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('c:/Users/hawdi/Documents/RoValutCaniso/RoVault/client/src');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;
  // Replace standalone "PTS" with "VAULT"
  // Also handle formatPts to formatVault if we want, but just changing the display string "PTS" is safest.
  if (content.includes('PTS')) {
    content = content.replace(/\bPTS\b/g, 'VAULT');
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated:', f);
  }
});
