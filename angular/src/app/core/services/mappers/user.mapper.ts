import { Injectable } from '@angular/core';
import { User as UserDto } from 'firebase/auth';
import { User } from 'src/app/core/models/user';

import { MapperFromDto } from './mappers';

/** Used when there are no name provided. */
const ANONYMOUS_NAME = 'Anonymous' as const;

/**
 * Mapper for login entities.
 */
@Injectable({ providedIn: 'root' })
export class UserMapper implements MapperFromDto<UserDto, User> {
  /** @inheritdoc */
  public fromDto(dto: UserDto): User {
    return new User({
      name: dto.displayName ?? ANONYMOUS_NAME,
      photoUrl: dto.photoURL,
    });
  }
}
