import { QueryDocumentSnapshot } from 'firebase/firestore';
import { FirestoreDto } from '../dtos/firestore';

/**
 * Firestore mapper.
 */
class FirestoreMapper {
  /**
   * Maps Firestore snapshot to Firestore DTO.
   * @param snapshot Firestore snapshot.
   */
  public toDto<T>(snapshot: QueryDocumentSnapshot<T>): FirestoreDto<T> {
    return {
      ...snapshot.data(),
      id: snapshot.id,
    };
  }
}

export const firestoreMapper = new FirestoreMapper();
