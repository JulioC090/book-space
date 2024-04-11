export default class Role<Permission> {
  private permissions: Array<Permission>;
  private level: number;

  constructor(permissions: Array<Permission>, level: number) {
    this.permissions = permissions;
    this.level = level;
  }

  public can(permission: Permission) {
    return this.permissions.includes(permission);
  }

  public isBelow(role: Role<Permission>) {
    return this.level < role.level;
  }

  public isAbove(role: Role<Permission>) {
    return this.level > role.level;
  }

  public isSame(role: Role<Permission>) {
    return this.level === role.level;
  }
}
