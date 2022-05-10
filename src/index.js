import _ from 'lodash';
import { getValidPath } from './data/filePath.js';
import getDataByParcing from './data/parsers.js';

const getDataByFormat = (inputTree, format, dash = ' ', dashLength = 2) => {
  const getStylishOutput = (tree, depth = 1) => {
    const currentGap = (level) => dash.repeat(dashLength * level);
    const bracketGap = (level) => dash.repeat((dashLength * level) - dashLength);
    const lines = tree.reduce((acc, branch) => {
      const [branchData, prefix = ' '] = [branch].flat();
      const linesChunk = Object.entries(branchData)
        .map(([key, value]) => {
          const currentValue = (_.isObject(value))
            ? getStylishOutput([value].flat(), depth + 2) : value;
          return `${currentGap(depth)}${prefix} ${key}: ${currentValue}`;
        });
      return [...acc, ...linesChunk];
    }, []);
    return ['{', ...lines, `${bracketGap(depth)}}`].join('\n');
  };
  if (format === 'stylish') return getStylishOutput(inputTree);
  return null;
};

export default (filepath1, filepath2, format = 'stylish') => {
  const [fileData1, fileData2] = [filepath1, filepath2]
    .map((path) => getDataByParcing(getValidPath(path)));
  if (!fileData1 && !fileData2) return null;
  const diffIdent = (file1, file2) => {
    if (_.isUndefined(file2) || _.isEqual(file1, file2)) return file1;
    const objKeys = [file1, file2]
      .filter((data) => _.isObject(data)).map((data) => Object.keys(data)).flat();
    const uniqKeys = _.uniq(objKeys).sort();
    const getTree = uniqKeys.flatMap((key) => {
      const buildBranchByKey = (uniqKey) => {
        const isInFirst = _.has(file1, uniqKey);
        const isInSecond = _.has(file2, uniqKey);
        const value1 = _.get(file1, uniqKey);
        const value2 = _.get(file2, uniqKey);
        if (isInFirst && !isInSecond) return [{ [uniqKey]: diffIdent(value1) }, '-'];
        if (isInSecond && !isInFirst) return [{ [uniqKey]: diffIdent(value2) }, '+'];
        if ((!_.isObject(value1) || !_.isObject(value2)) && !_.isEqual(value1, value2)) {
          return [
            [{ [uniqKey]: diffIdent(value1) }, '-'],
            [{ [uniqKey]: diffIdent(value2) }, '+'],
          ].flat();
        }
        return [{ [uniqKey]: diffIdent(value1, value2) }, ' '];
      };
      const treeData = (buildBranchByKey(key));
      return _.chunk(treeData, 2);
    });
    return getTree;
  };
  const filesDiff = diffIdent(fileData1, fileData2);
  return getDataByFormat(filesDiff, format);
};
