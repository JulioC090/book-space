import timeToDateConverter from '@/presentation/helpers/timeToDateConverter';

describe('timeToDateConverter', () => {
  test('It should convert time string to Date object', () => {
    const time = '12:34:56';
    const expectedDate = new Date();
    expectedDate.setHours(12);
    expectedDate.setMinutes(34);
    expectedDate.setSeconds(56);

    const convertedDate = timeToDateConverter(time);

    expect(convertedDate.getHours()).toBe(expectedDate.getHours());
    expect(convertedDate.getMinutes()).toBe(expectedDate.getMinutes());
    expect(convertedDate.getSeconds()).toBe(expectedDate.getSeconds());
  });

  test('It should handle time string with leading zeros', () => {
    const time = '01:02:03';
    const expectedDate = new Date();
    expectedDate.setHours(1);
    expectedDate.setMinutes(2);
    expectedDate.setSeconds(3);

    const convertedDate = timeToDateConverter(time);

    expect(convertedDate.getHours()).toBe(expectedDate.getHours());
    expect(convertedDate.getMinutes()).toBe(expectedDate.getMinutes());
    expect(convertedDate.getSeconds()).toBe(expectedDate.getSeconds());
  });

  test('It should handle time string without leading zeros', () => {
    const time = '9:8:7';
    const expectedDate = new Date();
    expectedDate.setHours(9);
    expectedDate.setMinutes(8);
    expectedDate.setSeconds(7);

    const convertedDate = timeToDateConverter(time);

    expect(convertedDate.getHours()).toBe(expectedDate.getHours());
    expect(convertedDate.getMinutes()).toBe(expectedDate.getMinutes());
    expect(convertedDate.getSeconds()).toBe(expectedDate.getSeconds());
  });
});
