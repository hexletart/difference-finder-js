import _ from 'lodash';

export default (treeData, deepness = 1, dash = ' ', dashLength = 2) => {
  const buildTree = (tree, depth) => {
    if (!_.isUndefined(tree) && !_.isObject(tree)) return `${tree}`;
    const currentGap = (level) => dash.repeat(dashLength * level);
    const bracketGap = (level) => dash.repeat((dashLength * level) - dashLength);
    const lines = _.flatten([tree]).reduce((acc, branch) => {
      const [node, mark = ' '] = (_.isArray(tree))
        ? Object.keys(branch).map((key) => branch[key]) : [branch];
      const linesChunk = Object.entries(node)
        .map(([key, value]) => {
          const currentValue = buildTree(value, depth + 2);
          return `${currentGap(depth)}${mark} ${key}: ${currentValue}`;
        });
      return [...acc, ...linesChunk];
    }, []);
    return ['{', ...lines, `${bracketGap(depth)}}`].join('\n');
  };
  return buildTree(treeData, deepness);
};
