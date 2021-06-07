import { Headers } from '@sveltejs/kit/types/helper';
import { StrictBody } from '@sveltejs/kit/types/hooks';

/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
  userid: string;
}

export type ApiResponse = {
  status: number;
  headers?: Headers;
  body?: StrictBody;
};
