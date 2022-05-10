import { readFileSync } from 'fs';
import genDiff from '../src/index';
import { getFixturePath as getPath } from '../src/data/filePath';

const defaultFormatValue = 'stylish';

test('empty_values_for_genDiff', () => {
  expect(genDiff(defaultFormatValue, null, getPath(null))).toBe(null);
});

test('format_mix_check_for_gendiff', () => {
  const first = 'jsonFile1.json';
  const second = 'yamlFile2.yml';
  const expected = 'stylishDiffOfTwo.txt';
  expect(genDiff(defaultFormatValue, getPath(first), getPath(second)))
    .toEqual(readFileSync(getPath(expected), 'utf-8'));
});

test('wrong_format_for_parsers', () => {
  const first = 'stylishDiffOfTwo.txt';
  expect(genDiff(defaultFormatValue, getPath(first))).toBe(null);
});

test('not_valid_value_for_formatter', () => {
  const first = 'yamlFile1.yaml';
  const second = 'jsonFile2.json';
  const format = 'format';
  expect(genDiff(format, getPath(first), getPath(second))).toBe(null);
});
