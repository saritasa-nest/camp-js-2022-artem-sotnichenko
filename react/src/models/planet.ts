import { Immerable, OmitImmerable } from './immerable';

/** Planet model. */
export class Planet extends Immerable {
  /** Planet id. */
  public readonly id: string;

  /** The name of this planet. */
  public readonly name: string;

  public constructor(data: InitArgs) {
    super();
    this.id = data.id;
    this.name = data.name;
  }
}

type InitArgs = OmitImmerable<Planet>;
