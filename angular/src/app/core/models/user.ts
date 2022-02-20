type UserArgs = User;

/** User model. */
export class User {
  /** Display name. */
  public readonly name: string;

  /** Photo url. */
  public readonly photoUrl: string | null;

  public constructor(args: UserArgs) {
    this.name = args.name;
    this.photoUrl = args.photoUrl;
  }
}
