import _ from 'lodash';

export default (inpuTtree) => {
  const buildString = (layout, action, ...options) => {
    const [option1, option2] = options
      .map((el) => ((typeof el === 'string') ? `'${el}'` : el))
      .map((el) => (_.isObject(el) ? '[complex value]' : el));
    const prefix = `Property '${layout}' was`;
    let body;
    switch (action) {
      case 'removed': body = 'removed';
        break;
      case 'added': body = `added with value: ${option1}`;
        break;
      case 'updated': body = `updated. From ${option1} to ${option2}`;
        break;
      default: body = 'not mentioned';
    }
    return `${prefix} ${body}`;
  };

  const buildComparison = (tree, root = []) => {
    const preparedTree = [tree].flat();
    const preparedObjTree = (preparedTree).flat().filter((el) => _.isObject(el));
    const keys = preparedObjTree.map((el) => Object.keys(el)).flat();
    const blocks = preparedTree.map((branch) => {
      const [valueData, sign] = branch;
      const lines = Object.entries(valueData)
        .map(([key, value]) => {
          const newRoot = [...root, key];
          const rootForPrint = newRoot.join('.');
          const isUniq = keys.filter((el) => _.isEqual(el, key)).length === 1;
          let printCall;
          if (sign === '-' && isUniq) {
            printCall = buildString(rootForPrint, 'removed');
          } else if (sign === '-' && !isUniq) {
            const [value1, value2] = preparedObjTree
              .map((el) => _.get(el, key, [])).flat();
            printCall = (buildString(rootForPrint, 'updated', value1, value2));
          } else if (sign === '+' && isUniq) {
            printCall = buildString(rootForPrint, 'added', value);
          } else if (sign === ' ') {
            printCall = (_.isObject(value)) ? buildComparison(value, newRoot) : [];
          } else {
            printCall = [];
          }
          return printCall;
        }).flat();
      return lines;
    }).flat();
    return blocks.join('\n');
  };
  return buildComparison(inpuTtree);
};

// ИЗУЧИ БЫСТРЫЕ КЛАВИШИ
