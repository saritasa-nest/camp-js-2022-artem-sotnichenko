import { Character } from '../character/types';
import { Film } from '../film/types';
import { Planet } from '../planet/types';
import { Specie } from '../specie/types';
import { Starship } from '../starship/types';
import { Vehicle } from '../vehicle/types';

/** Film model. */
export interface ConnectedFilm extends Omit<Film, 'characterIds' | 'specieIds' | 'starshipIds' | 'vehicleIds' | 'planetIds'> {

  /** Characters. */
  readonly characters: readonly Character[];

  /** Species. */
  readonly species: readonly Specie[];

  /** Starship ids. */
  readonly starships: readonly Starship[];

  /** Vehicle ids. */
  readonly vehicles: readonly Vehicle[];

  /** Planet ids. */
  readonly planets: readonly Planet[];
}
