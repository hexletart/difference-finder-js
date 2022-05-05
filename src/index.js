import _ from 'lodash';
import { getValidPath } from './data/filePath.js';
import getDataByParcing from './data/parsers.js';

const stylish = (inputTree, format, dash = ' ', dashLength = 2) => {
  const buildStruct = (branches, depth = 1) => {
    const currentGap = (level) => dash.repeat(dashLength * level);
    const bracketGap = (level) => dash.repeat((dashLength * level) - dashLength);
    const lines = branches.map((branch) => {
      const [prefix, name, children] = Object.keys(branch).map((el) => branch[el]);
      const currentChildren = (_.isArray(children)) ? buildStruct(children, depth + 2) : children;
      return `${currentGap(depth)}${prefix} ${name}: ${currentChildren}`;
    });
    return ['{', ...lines, `${bracketGap(depth)}}`].join('\n');
  };
  if (format === 'stylish') return buildStruct(inputTree);
  return null;
};

const buildBranchByKey = (file1, file2, uniqKey, callback) => {
  const isInFirst = _.has(file1, uniqKey);
  const isInSecond = _.has(file2, uniqKey);
  const value1 = _.get(file1, uniqKey);
  const value2 = _.get(file2, uniqKey);
  if (_.isUndefined(file2) && _.isObject(file1)) return [{ sign: ' ', key: uniqKey, value: callback(value1) }];
  let str;
  if (_.has(file1, uniqKey) && !isInSecond) {
    str = [{ sign: '-', key: uniqKey, value: callback(value1) }];
  } else if (isInSecond && !isInFirst) {
    str = [{ sign: '+', key: uniqKey, value: callback(value2) }];
  } else if (_.isEqual(value1, value2)) {
    str = [{ sign: ' ', key: uniqKey, value: callback(value1) }];
  } else {
    str = (_.isObject(value1) && _.isObject(value2))
      ? { sign: ' ', key: uniqKey, value: callback(value1, value2) }
      : [
        { sign: '-', key: uniqKey, value: callback(value1) },
        { sign: '+', key: uniqKey, value: callback(value2) },
      ];
  }
  return str;
};

export default (filepath1, filepath2, format = 'stylish') => {
  const [fileData1, fileData2] = [filepath1, filepath2]
    .map((path) => getDataByParcing(getValidPath(path)));
  if (!fileData1 && !fileData2) return null;

  const diffIdent = (file1, file2) => {
    if (_.isUndefined(file2) && !_.isObject(file1)) return file1;
    const objKeys = [file1, file2]
      .filter((data) => _.isObject(data)).map((data) => Object.keys(data)).flat();
    const uniqKeys = _.uniq(objKeys).sort();
    return uniqKeys.map((key) => buildBranchByKey(file1, file2, key, diffIdent)).flat();
  };
  const filesDiff = diffIdent(fileData1, fileData2);
  return stylish(filesDiff, format);
};
