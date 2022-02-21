/**
 * Mapper of DTO to domain model.
 */
export interface MapperFromDto<Dto, Domain> {

  /**
   * Maps from DTO to Domain model.
   */
  fromDto(data: Dto): Domain;
}

/**
 * Mapper of domain model to DTO.
 */
export interface MapperToDto<Dto, Domain> {

  /**
   * Maps from Domain to DTO model.
   */
  toDto(data: Domain): Dto;
}

/**
 * Mapper from DTO to Domain model and vice versa.
 */
export interface Mapper<Dto, Domain> extends MapperFromDto<Dto, Domain>, MapperToDto<Dto, Domain> {
}
