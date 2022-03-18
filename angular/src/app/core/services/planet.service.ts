import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Planet } from '../models/planet';

import { FirestoreService } from './firestore/firestore.service';
import { PlanetDto } from './mappers/dto/planet.dto';
import { PlanetMapper } from './mappers/planet.mapper';

/** Planet service. */
@Injectable({
  providedIn: 'root',
})
export class PlanetService {

  public constructor(
    private readonly firestoreService: FirestoreService,
    private readonly planetMapper: PlanetMapper,
  ) { }

  /**
   * Get planets by ids array.
   * @param ids Planet ids.
   */
  public getPlanets(ids: readonly Planet['id'][]): Observable<Planet[]> {
    return this.firestoreService
      .getManyByIds<PlanetDto>('planets', ids)
      .pipe(map(dtos => dtos.map(dto => this.planetMapper.fromDto(dto))));
  }

  /** Get all planets. */
  public getAllPlanets(): Observable<Planet[]> {
    return this.firestoreService.getMany<PlanetDto>('planets').pipe(
      map(planetDtos => planetDtos.map(this.planetMapper.fromDto)),
    );
  }
}
