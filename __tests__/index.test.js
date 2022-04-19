import gendiff from '../src/index.js';
import { getFixturePath, readFile } from '../src/data.js';

test('test_of_gendiff', () => {
  const file1 = 'file1.json';
  const file2 = 'file2.json';
  const filesDifference = 'filesDiff.txt';
  expect(gendiff(getFixturePath(file1), getFixturePath(file2)))
    .toEqual(readFile(getFixturePath(filesDifference)));
});
