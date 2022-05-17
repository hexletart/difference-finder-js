import _ from 'lodash';

export default (inputTree) => {
  const getTreeInJson = (tree) => {
    if (!_.isObject(tree)) return ((typeof tree === 'string') ? `"${tree}"` : `${tree}`);
    const nodes = _.flatten([tree]).map((node) => Object.keys(node)
      .map((key) => `"${[key]}":${getTreeInJson(node[key])}`)).map((node) => `{${node}}`);
    return (_.isArray(tree)) ? `[${nodes}]` : `${nodes}`;
  };
  return getTreeInJson(inputTree);
};
