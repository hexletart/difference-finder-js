import gendiff from '../src/index.js';
import { getFixturePath, readFile } from '../src/data.js';

test('test of gendiff', () => {
  const fileName1 = 'file1.json';
  const fileName2 = 'file2.json';
  const filesDifference = 'filesDiff.txt';
  expect(gendiff(getFixturePath(fileName1), getFixturePath(fileName2))).toEqual(readFile(getFixturePath('filesDiff.txt')));
});