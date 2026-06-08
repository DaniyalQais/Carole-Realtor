/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { evaluateHome } from '../src/lib/api/homeEvaluation';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const result = await evaluateHome(req.body ?? {});
  return res.status(result.status).json(result.body);
}
