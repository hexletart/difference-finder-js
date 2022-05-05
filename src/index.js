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

export default (filepath1, filepath2, format = 'stylish') => {
  const [fileData1, fileData2] = [filepath1, filepath2]
    .map((path) => getDataByParcing(getValidPath(path)));
  if (!fileData1 && !fileData2) return null;

  const diffIdent = (file1, file2) => {
    if (_.isUndefined(file2) && !_.isObject(file1)) return file1;
    const objKeys = [file1, file2]
      .filter((data) => _.isObject(data)).map((data) => Object.keys(data)).flat();
    const uniqKeys = _.uniq(objKeys).sort();
    const getTree = uniqKeys.map((key) => {
      const buildBranchByKey = (uniqKey) => {
        const isInFirst = _.has(file1, uniqKey);
        const isInSecond = _.has(file2, uniqKey);
        const value1 = _.get(file1, uniqKey);
        const value2 = _.get(file2, uniqKey);
        let str;
        if (_.isUndefined(file2) && _.isObject(file1)) {
          return [{ sign: ' ', key: uniqKey, value: diffIdent(value1) }];
        } if (isInFirst && !isInSecond) {
          str = [{ sign: '-', key: uniqKey, value: diffIdent(value1) }];
        } else if (isInSecond && !isInFirst) {
          str = [{ sign: '+', key: uniqKey, value: diffIdent(value2) }];
        } else if (_.isEqual(value1, value2)) {
          str = [{ sign: ' ', key: uniqKey, value: diffIdent(value1) }];
        } else {
          str = (_.isObject(value1) && _.isObject(value2))
            ? { sign: ' ', key: uniqKey, value: diffIdent(value1, value2) }
            : [
              { sign: '-', key: uniqKey, value: diffIdent(value1) },
              { sign: '+', key: uniqKey, value: diffIdent(value2) },
            ];
        }
        return str;
      };
      return buildBranchByKey(key);
    }).flat();
    return getTree;
  };
  const filesDiff = diffIdent(fileData1, fileData2);
  return stylish(filesDiff, format);
};


// const buildBranchByKey = (uniqKey) => {
//   const isInFirst = _.has(file1, uniqKey);
//   const isInSecond = _.has(file2, uniqKey);
//   const value1 = _.get(file1, uniqKey);
//   const value2 = _.get(file2, uniqKey);
//   if (_.isUndefined(file2) && _.isObject(file1)) return [{ sign: ' ', key: uniqKey, value: diffIdent(value1) }];
//   if (isInFirst && !isInSecond) return [{ sign: '-', key: uniqKey, value: diffIdent(value1) }];
//   if (isInSecond && !isInFirst) return [{ sign: '+', key: uniqKey, value: diffIdent(value2) }];
//   if (_.isEqual(value1, value2)) return [{ sign: ' ', key: uniqKey, value: diffIdent(value1) }];
//   return (_.isObject(value1) && _.isObject(value2)) ? { sign: ' ', key: uniqKey, value: diffIdent(value1, value2) }
//     : [
//       { sign: '-', key: uniqKey, value: diffIdent(value1) },
//       { sign: '+', key: uniqKey, value: diffIdent(value2) },
//     ];
// };