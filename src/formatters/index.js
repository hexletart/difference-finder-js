import getPlainOutput from './plain.js';
import getStylishOutput from './stylish.js';

export default (treeData, format) => {
  if (format === 'stylish') return getStylishOutput(treeData);
  if (format === 'plain') return getPlainOutput(treeData);
  return null;
};
