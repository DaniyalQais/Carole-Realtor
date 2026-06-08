/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getFeaturedListings } from '../src/lib/api/featuredListings';

export default function handler(_req: any, res: any) {
  return res.status(200).json(getFeaturedListings());
}
