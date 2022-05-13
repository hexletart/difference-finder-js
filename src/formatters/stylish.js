import _ from 'lodash';

export default (treeData, deepness = 1, dash = ' ', dashLength = 2) => {
  const buildTree = (tree, depth) => {
    const currentGap = (level) => dash.repeat(dashLength * level);
    const bracketGap = (level) => dash.repeat((dashLength * level) - dashLength);
    const lines = tree.reduce((acc, branch) => {
      const [branchData, prefix = ' '] = [branch].flat();
      const linesChunk = Object.entries(branchData)
        .map(([key, value]) => {
          const currentValue = (_.isObject(value))
            ? buildTree([value].flat(), depth + 2) : value;
          return `${currentGap(depth)}${prefix} ${key}: ${currentValue}`;
        });
      return [...acc, ...linesChunk];
    }, []);
    return ['{', ...lines, `${bracketGap(depth)}}`].join('\n');
  };
  return buildTree(treeData, deepness);
};
