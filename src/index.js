import _ from 'lodash';
import { getValidPath } from './data/filePath.js';
import getDataByParcing from './data/parsers.js';
import getDataByFormat from './formatters/index.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const [fileData1, fileData2] = [filepath1, filepath2]
    .map((path) => getDataByParcing(getValidPath(path)));
  if (_.isEqual(fileData1, fileData2)) return 'Values are the same';
  const diffIdent = (file1, file2) => {
    if (_.isUndefined(file2) || _.isEqual(file1, file2)) return file1;
    const objKeys = [file1, file2]
      .filter((data) => _.isObject(data)).map((data) => Object.keys(data)).flat();
    const uniqKeys = _.sortBy(_.uniq(objKeys));
    const getTree = uniqKeys.flatMap((key) => {
      const buildBranchByKey = (uniqKey) => {
        const isInFirst = _.has(file1, uniqKey);
        const isInSecond = _.has(file2, uniqKey);
        const value1 = _.get(file1, uniqKey);
        const value2 = _.get(file2, uniqKey);
        if (isInFirst && !isInSecond) return { node: { [uniqKey]: diffIdent(value1) }, mark: '-' };
        if (isInSecond && !isInFirst) return { node: { [uniqKey]: diffIdent(value2) }, mark: '+' };
        if ((!_.isObject(value1) || !_.isObject(value2)) && !_.isEqual(value1, value2)) {
          return [
            { node: { [uniqKey]: diffIdent(value1) }, mark: '-' },
            { node: { [uniqKey]: diffIdent(value2) }, mark: '+' },
          ].flat();
        }
        return { node: { [uniqKey]: diffIdent(value1, value2) }, mark: ' ' };
      };
      return buildBranchByKey(key);
    });
    return getTree;
  };
  const filesDiff = diffIdent(fileData1, fileData2);
  return getDataByFormat(filesDiff, format);
};
