import Role from '@/domain/models/Role';

enum Permission {
  ADD_TEST = 'ADD_TEST',
  DELETE_TEST = 'DELETE_TEST',
}

const makeSut = (permissions: Array<Permission>, level: number) => {
  const sut = new Role<Permission>(permissions, level);
  return { sut };
};

describe('Role', () => {
  test('It should return true when the role has permission', () => {
    const { sut } = makeSut([Permission.ADD_TEST], 1);
    const result = sut.can(Permission.ADD_TEST);
    expect(result).toBeTruthy();
  });

  test('It should return false when the role does not have permission', () => {
    const { sut } = makeSut([Permission.ADD_TEST], 1);
    const result = sut.can(Permission.DELETE_TEST);
    expect(result).toBeFalsy();
  });

  test('It should return true when isBelow is called and the role is below the other', () => {
    const { sut: sutAbove } = makeSut([Permission.ADD_TEST], 2);
    const { sut: sutBelow } = makeSut([Permission.ADD_TEST], 1);
    const result = sutBelow.isBelow(sutAbove);
    expect(result).toBeTruthy();
  });

  test('It should return false when isBelow is called and the role is above the other', () => {
    const { sut: sutAbove } = makeSut([Permission.ADD_TEST], 2);
    const { sut: sutBelow } = makeSut([Permission.ADD_TEST], 1);
    const result = sutAbove.isBelow(sutBelow);
    expect(result).toBeFalsy();
  });

  test('It should return false when isBelow is called and the role is at the same level as the other', () => {
    const { sut } = makeSut([Permission.ADD_TEST], 1);
    const result = sut.isBelow(sut);
    expect(result).toBeFalsy();
  });

  test('It should return true when isAbove is called and the role is above the other', () => {
    const { sut: sutAbove } = makeSut([Permission.ADD_TEST], 2);
    const { sut: sutBelow } = makeSut([Permission.ADD_TEST], 1);
    const result = sutAbove.isAbove(sutBelow);
    expect(result).toBeTruthy();
  });

  test('It should return false when isAbove is called and the role is below the other', () => {
    const { sut: sutAbove } = makeSut([Permission.ADD_TEST], 2);
    const { sut: sutBelow } = makeSut([Permission.ADD_TEST], 1);
    const result = sutBelow.isAbove(sutAbove);
    expect(result).toBeFalsy();
  });

  test('It should return false when isAbove is called and the role is at the same level as the other', () => {
    const { sut } = makeSut([Permission.ADD_TEST], 1);
    const result = sut.isAbove(sut);
    expect(result).toBeFalsy();
  });

  test('It should return true when isSame is called and the role is at the same level as the other', () => {
    const { sut } = makeSut([Permission.ADD_TEST], 1);
    const result = sut.isSame(sut);
    expect(result).toBeTruthy();
  });

  test('It should return false when isSame is called and the role is above the other', () => {
    const { sut: sutAbove } = makeSut([Permission.ADD_TEST], 2);
    const { sut: sutBelow } = makeSut([Permission.ADD_TEST], 1);
    const result = sutAbove.isSame(sutBelow);
    expect(result).toBeFalsy();
  });

  test('It should return false when isSame is called and the role is below the other', () => {
    const { sut: sutAbove } = makeSut([Permission.ADD_TEST], 2);
    const { sut: sutBelow } = makeSut([Permission.ADD_TEST], 1);
    const result = sutBelow.isSame(sutAbove);
    expect(result).toBeFalsy();
  });
});
