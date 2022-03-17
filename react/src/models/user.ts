import { Immerable, OmitImmerable } from './immerable';

/**
 * User.
 */
export class User extends Immerable {
  /** User id in uuid format. */
  public readonly id: string;

  /** Name. */
  public readonly name: string;

  /** Avatar url. */
  public readonly avatar: string | null;

  public constructor(data: UserInitArgs) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.avatar = data.avatar;
  }
}

type UserInitArgs = OmitImmerable<User>;
