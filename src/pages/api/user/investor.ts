// This is an example of to protect an API route
import { getServerSession } from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserRole } from 'types/auth';
import axios from 'axios';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (session && session.token.accessToken && session.token.role === UserRole.ADMIN) {
    const { page } = req.query;

    axios.defaults.headers.common = { Authorization: `bearer ${session.token.accessToken as string}` };

    const response = await axios.get(`${process.env.SHIPFINEX_BACKEND_URL}/user/all?role=investor&page=${page}`).catch((err) => {
      res.status(err.response.status).json(err.response.data);
    });
    if (response) {
      res.status(200).json(response.data);
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
