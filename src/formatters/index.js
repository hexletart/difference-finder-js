import getPlainOutput from './plain.js';
import getStylishOutput from './stylish.js';
import getJsonOutput from './json.js';

export default (treeData, format) => {
  switch (format) {
    case 'stylish': return getStylishOutput(treeData);
    case 'plain': return getPlainOutput(treeData);
    case 'json': return getJsonOutput(treeData);
    default: return `Something went wrong with ${format} format.`;
  }
};
