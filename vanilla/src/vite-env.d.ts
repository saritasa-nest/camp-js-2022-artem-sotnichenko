/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMetaEnv {

  /** Firebase api key. */
  readonly VITE_API_KEY: string;

  /** Firebase auth domain. */
  readonly VITE_AUTH_DOMAIN: string;

  /** Firebase project id. */
  readonly VITE_PROJECT_ID: string;

  /** Firebase storage bucket. */
  readonly VITE_STORAGE_BUCKET: string;

  /** Firebase messaging sender id. */
  readonly VITE_MESSAGING_SENDER_ID: string;

  /** Firebase app id. */
  readonly VITE_APP_ID: string;
}

interface ImportMeta {

  /** App enviroment variables. */
  readonly env: ImportMetaEnv;
}
