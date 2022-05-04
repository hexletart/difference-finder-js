import { readFileSync } from 'fs';
import genDiff from '../src/index';
import { getFixturePath as getPath } from '../src/data/filePath';

test('empty_test_of_genDiff', () => {
  expect(genDiff(null, getPath(null))).toBe(null);
});

test('not_valid_format_for_gendiff', () => {
  const first = 'jsonFile2.json';
  const second = 'diffTestJson1Yaml2.txt';
  const expected = 'diffTestJson2Txt.txt';
  expect(genDiff(getPath(first), getPath(second)))
    .toEqual(readFileSync(getPath(expected), 'utf-8'));
});

test('json_and_yml_for_gendiff', () => {
  const first = 'jsonFile1.json';
  const second = 'yamlFile2.yml';
  const expected = 'diffTestJson1Yaml2.txt';
  expect(genDiff(getPath(first), getPath(second)))
    .toEqual(readFileSync(getPath(expected), 'utf-8'));
});

test('not_valid_value_for_formatter', () => {
  const first = 'yamlFile1.yaml';
  const second = 'jsonFile2.json';
  const format = 'format';
  expect(genDiff(getPath(first), getPath(second), format)).toBe(null);
});
