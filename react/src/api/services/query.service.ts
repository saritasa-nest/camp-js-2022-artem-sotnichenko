import {
  limit, orderBy, QueryConstraint, startAfter, where,
} from 'firebase/firestore';
import { QueryDirection } from 'src/models/queryDirection';
import { FirestoreService } from './firestore.service';

const FILMS_PER_PAGE = 5;

/** Query. */
export interface Query<QueryField extends string> {
  /** Search text. */
  readonly searchText: string;

  /** Query field. */
  readonly field: QueryField;

  /** Query direction. */
  readonly direction: QueryDirection;
}

/** Get query constraints options. */
export interface QueryGetConstraintsOptions<QueryField extends string> {
  /** Count of film. */
  readonly count?: number;

  /** Fetch after entity id. */
  readonly afterId?: string;

  /** Query. Search is done by the field. */
  readonly query: Query<QueryField>;
}

const FIREBASE_SEARCH_SYMBOL = '~';

export namespace QueryService {
  /**
   * Get query constraint, for use in firestore query.
   * @param options Options.
   */
  export async function getConstraints<QueryField extends string>({
    count = FILMS_PER_PAGE,
    afterId,
    query: { searchText, field, direction },
  }: QueryGetConstraintsOptions<QueryField>): Promise<readonly QueryConstraint[]> {
    const constraints: QueryConstraint[] = [
      limit(count),
      where(field, '>=', searchText),
      where(field, '<=', `${searchText}${FIREBASE_SEARCH_SYMBOL}`),
      orderBy(field, direction),
    ];

    if (afterId != null) {
      const cursor = await FirestoreService.fetchSnapshot('films', afterId);
      constraints.push(startAfter(cursor));
    }

    return constraints;
  }
}
