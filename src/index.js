import _ from 'lodash';
import { getValidPath } from './data/filePath.js';
import getDataByParcing from './data/parsers.js';
import getDataByFormat from './formatters/index.js';

export default (filepath1, filepath2, format) => {
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
