/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { bookConsultation } from '../src/lib/api/bookConsultation';

export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const result = bookConsultation(req.body ?? {});
  return res.status(result.status).json(result.body);
}
