import type { NextApiRequest, NextApiResponse } from 'next';
import { API_BASE_URL, API_KEY } from '@/lib/api/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const tmdbRes = await fetch(`${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!tmdbRes.ok) return res.status(404).json({ error: 'Movie not found' });

  const data = await tmdbRes.json();
  res.status(200).json(data);
}
