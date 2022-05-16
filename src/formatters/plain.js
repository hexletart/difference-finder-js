import _ from 'lodash';

export default (inputTree) => {
  const buildString = (layout, action, ...options) => {
    const [option1, option2] = options.filter((el) => !_.isUndefined(el))
      .map((el) => ((typeof el === 'string') ? `'${el}'` : el))
      .map((el) => (_.isObject(el) ? `${'[complex value]'}` : el));
    const prefix = `Property '${layout}' was`;
    let body;
    switch (action) {
      case 'removed': body = 'removed';
        break;
      case 'added': body = `added with value: ${option1}`;
        break;
      default: body = `updated. From ${option1} to ${option2}`;
    }
    return `${prefix} ${body}`;
  };
  const buildComparison = (tree, root = []) => {
    const branchesData = tree.map((branch) => branch[_.head(Object.keys(branch))]);
    const keys = branchesData.map((branch) => Object.keys(branch)).flat();
    const branches = tree.map((branch) => {
      const [branchData, sign] = Object.keys(branch).map((key) => branch[key]);
      const leafs = Object.entries(branchData)
        .map(([key, value]) => {
          const newRoot = [...root, key];
          const rootForPrint = newRoot.join('.');
          const isUniq = keys.filter((el) => _.isEqual(el, key)).length === 1;
          let printCall;
          if (sign === '-' && isUniq) {
            printCall = buildString(rootForPrint, 'removed');
          } else if (sign === '-' && !isUniq) {
            const [value1, value2] = branchesData.map((el) => _.get(el, key, [])).flat();
            printCall = (buildString(rootForPrint, 'updated', value1, value2));
          } else if (sign === '+' && isUniq) {
            printCall = buildString(rootForPrint, 'added', value);
          } else if (sign === ' ') {
            printCall = (_.isArray(value)) ? buildComparison(value, newRoot) : [];
          } else {
            printCall = [];
          }
          return printCall;
        }).flat();
      return leafs;
    }).flat();
    return branches.join('\n');
  };
  return buildComparison(inputTree);
};
