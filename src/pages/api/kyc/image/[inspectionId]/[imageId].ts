// This is an example of to protect an API route
import { getServerSession } from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserRole } from 'types/auth';
import axios from 'axios';
import { authOptions } from '../../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (session && session.token.accessToken && session.token.role === UserRole.ADMIN) {
    const { inspectionId, imageId } = req.query;
    console.log(inspectionId, imageId);
    axios.defaults.headers.common = { Authorization: `bearer ${session.token.accessToken as string}` };
    const response = await axios
      .get(`${process.env.SHIPFINEX_BACKEND_URL}/kyc/image/${inspectionId}/${imageId}`, { responseType: 'arraybuffer' })
      .catch((err) => {
        res.status(err.response.status).json({ error: err });
      });
    if (response) {
      const base64 = btoa(
        new Uint8Array(response.data).reduce(function (data, byte) {
          return data + String.fromCharCode(byte);
        }, '')
      );
      res.status(200).json(base64);
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
