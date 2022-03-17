import { User } from 'src/models/user';
import { UserDto } from '../dtos/user.dto';

const USER_PLACEHOLDER_NAME = 'Anon';

export namespace UserMapper {
  /**
   * Maps dto to model.
   * @param dto User dto.
   */
  export function fromDto(dto: UserDto): User {
    return new User({
      id: dto.uid,
      name: dto.displayName ?? USER_PLACEHOLDER_NAME,
      avatar: dto.photoURL,
    });
  }
}
