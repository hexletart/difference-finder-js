import getData from '../src/data/parsers';
import { getFixturePath as getPath } from '../src/data/filePath';

test('test_of_parsers_1', () => {
  const jsonPath1 = 'jsonFile1.json';
  const yamlPath1 = 'yamlFile1.yaml';
  const dataOfPath1 = getData(getPath(jsonPath1));
  const dataOfPath2 = getData(getPath(yamlPath1));
  expect(dataOfPath1).toEqual(dataOfPath2);
});

test('test_of_parsers_2', () => {
  const jsonPath1 = 'jsonFile2.json';
  const yamlPath1 = 'yamlFile2.yml';
  const dataOfPath1 = getData(getPath(jsonPath1));
  const dataOfPath2 = getData(getPath(yamlPath1));
  expect(dataOfPath1).toEqual(dataOfPath2);
});

test('test_of_parsers_3', () => {
  const jsonPath1 = 'filesDiff.txt';
  const dataOfPath1 = getData(getPath(jsonPath1));
  expect(dataOfPath1).toBe(null);
});

test('test_of_parsers_4', () => {
  const filePath = null;
  const dataOfPath1 = getData(filePath);
  expect(dataOfPath1).toBe(null);
});
