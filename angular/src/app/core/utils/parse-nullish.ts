import { SWAPI_NA, SWAPI_NA_STRING, SWAPI_UNKNOWN, SWAPI_UNKNOWN_STRING } from './constants';

export type SwapiNullish = 'unknown' | 'n/a';

export type Nullish = null | undefined;

export function parseToNullish<T>(value: T | SwapiNullish): T | Nullish;
export function parseToNullish<T, V>(value: T | SwapiNullish, mapperFn: (v: T) => V): V | Nullish;

/**
 * Swapi can return value or "unknown" if not known or "n/a" if not exist.
 * @param value Value to parse.
 * @param mapperFn Mapper function to use if not nullish.
 * @returns "null" for "n/a", "undefined" for "unknown" or mapped value.
 */
export function parseToNullish<T, V>(value: T | SwapiNullish, mapperFn?: (v: T) => V): T | V | Nullish {
  if (value === SWAPI_UNKNOWN_STRING) {
    return SWAPI_UNKNOWN;
  }
  if (value === SWAPI_NA_STRING) {
    return SWAPI_NA;
  }
  return mapperFn ? mapperFn(value) : value;
}

export function parseFromNullish<T>(value: T | Nullish): T | SwapiNullish;
export function parseFromNullish<T, V>(value: T | Nullish, mapperFn: (v: T) => V): V | SwapiNullish;

/**
 * Swapi can return value or "unknown" if not known or "n/a" if not exist.
 * @param value Value to parse.
 * @param mapperFn Mapper function to use if not nullish.
 * @returns "n/a" for "null", "unknown" for "undefined" or mapped value.
 */
export function parseFromNullish<T, V>(value: T | Nullish, mapperFn?: (v: T) => V): T | V | SwapiNullish {
  if (value === SWAPI_UNKNOWN) {
    return SWAPI_UNKNOWN_STRING;
  }
  if (value === SWAPI_NA) {
    return SWAPI_NA_STRING;
  }
  return mapperFn ? mapperFn(value) : value;
}
