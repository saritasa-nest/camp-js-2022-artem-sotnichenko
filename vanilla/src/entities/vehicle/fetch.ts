import { fetchAll } from '../fetch';

import { VehicleMappers } from './mappers';
import { Vehicle, VehicleDto } from './types';

/**
 * Get all vehicles.
 */
export async function getAllVehicles(): Promise<Vehicle[]> {
  return (await fetchAll<VehicleDto>('vehicles')).map(VehicleMappers.fromDto);
}
