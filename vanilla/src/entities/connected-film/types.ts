import { Character } from '../character/types';
import { Film } from '../film/types';

/** Film model. */
export interface СonnectedFilm extends Omit<Film, 'characterIds'> {

  /** Character ids. */
  readonly characters: readonly Character[];

  // /** Specie ids. */
  // readonly specieIds: readonly string[];

  // /** Starship ids. */
  // readonly starshipIds: readonly string[];

  // /** Vehicle ids. */
  // readonly vehicleIds: readonly string[];
}
