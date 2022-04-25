import { readFileSync } from 'fs';
import gendiff from '../src/index';
import { getFixturePath as getPath } from '../src/data/filePath';

const testData = {
  testForDiff: 'filesDiff.txt',
  file1: 'jsonFile1.json',
  file2: 'jsonFile2.json',
  file3: 'yamlFile1.yaml',
  file4: 'yamlFile2.yml',
};

test('gendiffCheck_json_json_1', () => {
  expect(gendiff(getPath(testData.file1), getPath(testData.file2)))
    .toEqual(readFileSync(getPath(testData.testForDiff), 'utf-8'));
});

test('gendiffCheck_null_json', () => {
  expect(gendiff(getPath(null), getPath(testData.file2))).toBe(null);
});
