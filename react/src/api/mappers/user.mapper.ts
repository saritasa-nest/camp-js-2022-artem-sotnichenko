import { User } from 'src/models/user';
import { UserDto } from '../dtos/user.dto';

const USER_PLACEHOLDER_NAME = 'Anon';

/**
 * User mapper.
 */
class UserMapper {
  /**
   * Maps user DTO to user model.
   * @param dto User DTO.
   */
  public fromDto(dto: UserDto): User {
    return new User({
      id: dto.uid,
      name: dto.displayName ?? USER_PLACEHOLDER_NAME,
      avatar: dto.photoURL,
    });
  }
}

export const userMapper = new UserMapper();
