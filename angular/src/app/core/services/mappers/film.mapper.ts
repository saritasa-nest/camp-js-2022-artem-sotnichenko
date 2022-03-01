import { Injectable } from '@angular/core';
import { QueryDocumentSnapshot } from 'firebase/firestore';

import { Film } from '../../models/film';

import { FilmDocument, FilmDto } from './dto/film.dto';

/**
 * Mapper for user entities.
 */
@Injectable({ providedIn: 'root' })
export class FilmMapper {
  /**
   * Maps Film document to Film model.
   * @param doc Film Document.
   */
  public fromDoc(doc: QueryDocumentSnapshot<FilmDocument>): Film {
    const dto = doc.data();
    return {
      id: doc.id,
      title: dto.fields.title,
      director: dto.fields.director,
      producers: dto.fields.producer.split(',').map(str => str.trim()),
      openingCrawl: dto.fields.opening_crawl,
      releaseDate: new Date(dto.fields.release_date),
      characterIds: dto.fields.characters,
      planetIds: dto.fields.planets,
    };
  }

  /**
   * Maps Film model to Film dto.
   * @param model Film model.
   */
  public toDto(model: Film): FilmDto {
    return {
      id: model.id,
      fields: {
        title: model.title,
        director: model.director,
        opening_crawl: model.openingCrawl,
        producer: model.producers.join(','),
        release_date: model.releaseDate.toISOString(),
        characters: model.characterIds,
        planets: model.planetIds,
      },
    };
  }
}
