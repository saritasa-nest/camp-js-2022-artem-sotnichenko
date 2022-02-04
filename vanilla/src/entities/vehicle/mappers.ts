import { Vehicle, VehicleDto } from './types';

export namespace VehicleMappers {

  /**
   * Maps Vehicle DTO to Vehicle model.
   * @param dto Vehicle DTO.
   */
  export function fromDto(dto: VehicleDto): Vehicle {
    return {
      class: dto.fields.vehicle_class,
      id: dto.id,
      model: dto.model,
      pk: dto.pk,
    };
  }

  /**
   * Maps Vehicle model to Vehicle DTO.
   * @param vehicle Vehicle model.
   */
  export function toDto(vehicle: Vehicle): VehicleDto {
    return {
      fields: {
        vehicle_class: vehicle.class,
      },
      id: vehicle.id,
      model: vehicle.model,
      pk: vehicle.pk,
    };
  }
}
