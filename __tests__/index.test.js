/* eslint-disable object-curly-newline */
import { readFileSync } from 'fs';
import genDiff from '../src/index';
import { getFixturePath as getPath } from '../src/data/filePath';

const formatterSet = [
  { a: 'jsonFile1.json', b: 'yamlFile2.yml', expected: 'stylishOutput.txt', format: 'stylish' },
  { a: 'yamlFile1.yaml', b: 'jsonFile2.json', expected: 'plainOutput.txt', format: 'plain' },
  { a: 'jsonFile1.json', b: 'jsonFile2.json', expected: 'jsonOutput.txt', format: 'json' },
];

test('default formatter of equal values of gendiff', () => {
  const equalValue = 'jsonFile1.json';
  const expectedStaitment = 'Values are the same';
  expect(genDiff(getPath(equalValue), getPath(equalValue)))
    .toBe(expectedStaitment);
});

test.each(formatterSet)('$format formatter of gendiff', ({ a, b, expected, format }) => {
  expect(genDiff(getPath(a), getPath(b), format))
    .toEqual(readFileSync(getPath(expected), 'utf-8'));
});
