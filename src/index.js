import _ from 'lodash';
import fileData from './data.js';

export default (filepath1, filepath2, filler = ' ', fillerCount = 2) => {
  const [file1, file2] = [fileData(filepath1), fileData(filepath2)];
  const [file1Keys, file2Keys] = [Object.keys(file1), Object.keys(file2)];
  const uniqKeys = _.uniq([file1Keys, file2Keys].flat()).sort();
  const currentFiller = filler.repeat(fillerCount);
  const lines = uniqKeys.map((key) => {
    const getJsonPart = (uniqKey) => {
      const file1Value = _.has(file1, uniqKey);
      const file2Value = _.has(file2, uniqKey);
      if (file1Value && !file2Value) return [{ sign: '-', info: `${uniqKey}: ${file1[uniqKey]}` }];
      if (file2Value && !file1Value) return [{ sign: '+', info: `${uniqKey}: ${file2[uniqKey]}` }];
      if (file1Value && file2Value && file1[uniqKey] === file2[uniqKey]) {
        return [{ sign: ' ', info: `${uniqKey}: ${file1[uniqKey]}` }];
      }
      return [{ sign: '-', info: `${uniqKey}: ${file1[uniqKey]}` }, { sign: '+', info: `${uniqKey}: ${file2[uniqKey]}` }];
    };
    return getJsonPart(key);
  }).flat();
  const currentLines = lines.map((line) => `${currentFiller}${line.sign} ${line.info}`);
  return ['{', ...currentLines, '}'].join('\n');
};
