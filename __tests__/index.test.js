import { readFileSync } from 'fs';
import genDiff from '../src/index';
import { getFixturePath as getPath } from '../src/data/filePath';

const defaultFormatValue = 'stylish';

const json1 = 'jsonFile1.json';
const json2 = 'jsonFile2.json';
const yaml1 = 'yamlFile1.yaml';
const yaml2 = 'yamlFile2.yml';

test('empty_values_for_genDiff', () => {
  expect(genDiff(null, getPath(null), defaultFormatValue)).toBe(null);
});

test('mix_check_for_gendiff_by_default_format', () => {
  const expected = 'stylishDiffOfTwo.txt';
  expect(genDiff(getPath(json1), getPath(yaml2)))
    .toEqual(readFileSync(getPath(expected), 'utf-8'));
});

test('wrong_format_for_parsers', () => {
  const wrongFile = 'stylishDiffOfTwo.txt';
  expect(genDiff(getPath(wrongFile), getPath(wrongFile), defaultFormatValue))
    .toBe(null);
});

test('not_valid_value_for_formatter', () => {
  const format = 'format';
  expect(genDiff(getPath(yaml1), getPath(json2), format)).toBe(null);
});

test('yaml_check_for_gendiff_by_plain_format', () => {
  const format = 'plain';
  const expected = 'plainDiffOfTwo.txt';
  expect(genDiff(getPath(yaml1), getPath(yaml2), format))
    .toEqual(readFileSync(getPath(expected), 'utf-8'));
});

test('json_check_for_gendiff_by_json_format', () => {
  const format = 'json';
  const expected = 'jsonDiffOfTwo.txt';
  expect(genDiff(getPath(json1), getPath(json2), format))
    .toEqual(readFileSync(getPath(expected), 'utf-8'));
});
