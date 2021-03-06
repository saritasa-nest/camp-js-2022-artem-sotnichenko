import { fetchAllFromCollection } from '../fetch';

import { VehicleMappers } from './mappers';
import { Vehicle, VehicleDto } from './types';

/**
 * Get all vehicles.
 */
export async function getAllVehicles(): Promise<Vehicle[]> {
  return (await fetchAllFromCollection<VehicleDto>('vehicles')).map(VehicleMappers.fromDto);
}
