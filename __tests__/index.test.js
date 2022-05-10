import { readFileSync } from 'fs';
import genDiff from '../src/index';
import { getFixturePath as getPath } from '../src/data/filePath';

test('empty_values_for_genDiff', () => {
  expect(genDiff(null, getPath(null))).toBe(null);
});

test('format_mix_check_for_gendiff', () => {
  const first = 'jsonFile1.json';
  const second = 'yamlFile2.yml';
  const expected = 'stylishDiffOfTwo.txt';
  expect(genDiff(getPath(first), getPath(second)))
    .toEqual(readFileSync(getPath(expected), 'utf-8'));
});

test('wrong_format_for_parsers', () => {
  const first = 'stylishDiffOfTwo.txt';
  expect(genDiff(getPath(first))).toBe(null);
});

test('not_valid_value_for_formatter', () => {
  const first = 'yamlFile1.yaml';
  const second = 'jsonFile2.json';
  const format = 'format';
  expect(genDiff(getPath(first), getPath(second), format)).toBe(null);
});
