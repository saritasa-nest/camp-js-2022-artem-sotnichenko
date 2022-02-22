import { Injectable } from '@angular/core';
import { User as UserDto } from 'firebase/auth';
import { User } from 'src/app/core/models/user';

/** Used when there are no name provided. */
const ANONYMOUS_NAME = 'Anonymous' as const;

/**
 * Mapper for user entities.
 */
@Injectable({ providedIn: 'root' })
export class UserMapper {
  /**
   * Maps user dto to user model.
   * @param dto User DTO.
   */
  public fromDto(dto: UserDto): User {
    return new User({
      name: dto.displayName ?? ANONYMOUS_NAME,
      photoUrl: dto.photoURL,
    });
  }
}
