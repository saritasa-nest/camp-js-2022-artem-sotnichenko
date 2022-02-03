import { fetchDocsByIds } from '../connected-film/fetch';

import { VehicleDto } from './types';

/**
 * Fetch Vehicles by id.
 * @param ids Vehicle ids.
 */
export function fetchVehiclesByIds(ids: readonly string[]): Promise<VehicleDto[]> {
  return fetchDocsByIds('vehicles', ids);
}
