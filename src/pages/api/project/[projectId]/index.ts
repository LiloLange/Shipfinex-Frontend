// This is an example of to protect an API route
import { getServerSession } from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (session && session.token.accessToken) {
    const { projectId } = req.query;

    axios.defaults.headers.common = { Authorization: `bearer ${session.token.accessToken as string}` };

    const response = await axios.get(`${process.env.SHIPFINEX_BACKEND_URL}/project/${projectId}`).catch((err) => {
      if (err) {
        res.status(err.response.status).json({ error: err });
      }
    });
    if (response) {
      res.status(200).json(response.data);
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}