import { Character } from '../character/types';
import { Film } from '../film/types';
import { Planet } from '../planet/types';
import { Species } from '../species/types';
import { Starship } from '../starship/types';
import { Vehicle } from '../vehicle/types';

/** Connected film model. */
export interface ConnectedFilm extends Omit<Film, 'characterIds' | 'speciesIds' | 'starshipIds' | 'vehicleIds' | 'planetIds'> {

  /** Characters. */
  readonly characters: readonly Character[];

  /** Species. */
  readonly species: readonly Species[];

  /** Starship ids. */
  readonly starships: readonly Starship[];

  /** Vehicle ids. */
  readonly vehicles: readonly Vehicle[];

  /** Planet ids. */
  readonly planets: readonly Planet[];
}
