import { Immerable, OmitImmerable } from './immerable';

/** Character model. */
export class Character extends Immerable {
  /** Character id. */
  public readonly id: string;

  /** The name of this planet. */
  public readonly name: string;

  public constructor(data: InitArgs) {
    super();
    this.id = data.id;
    this.name = data.name;
  }
}

type InitArgs = OmitImmerable<Character>;
