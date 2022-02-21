/** User model. */
export class User {
  /** Display name. */
  public readonly name: string;

  /** Photo url. */
  public readonly photoUrl: string | null;

  public constructor(user: User) {
    this.name = user.name;
    this.photoUrl = user.photoUrl;
  }
}
