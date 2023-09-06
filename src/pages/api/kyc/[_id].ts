// This is an example of to protect an API route
import { getServerSession } from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserRole } from 'types/auth';
import axios from 'axios';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (session && session.token.accessToken && session.token.role === UserRole.ADMIN) {
    const { _id } = req.query;

    axios.defaults.headers.common = { Authorization: `bearer ${session.token.accessToken as string}` };
    const response = await axios.get(`${process.env.SHIPFINEX_BACKEND_URL}/kyc/${_id}`).catch((err) => {
      res.status(500).json({ error: err });
    });
    if (response) {
      // console.log(response.data);
      res.status(200).json(response.data);
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
