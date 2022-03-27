import { Planet } from 'src/models/planet';
import { PlanetDto } from '../dtos/planet.dto';
import { planetMapper } from '../mappers/planet.mapper';
import { FirestoreService } from './firestore.service';

export namespace PlanetService {
  /**
   * Get planets by ids array.
   * @param ids Planet ids.
   */
  export async function fetchPlanetsByIds(ids: readonly Planet['id'][]): Promise<Planet[]> {
    const planetDtos = await FirestoreService.fetchManyByIds<PlanetDto>('planets', ids);
    return planetDtos.map(planetMapper.fromDto);
  }

  /**
   * Get all planets.
   */
  export async function fetchAllPlanets(): Promise<Planet[]> {
    const planetDtos = await FirestoreService.fetchMany<PlanetDto>('planets');
    return planetDtos.map(planetMapper.fromDto);
  }
}
