import type { Request, Response, NextFunction } from 'express';
import { schemaComposer } from 'graphql-compose';
import { S3Payload, SignS3Input, TSignS3Input } from './s3.dto';
import * as s3Service from './s3.service';

export const signS3 = schemaComposer.createResolver<
  any,
  {
    data: TSignS3Input;
  }
>({
  name: 'signS3',
  kind: 'mutation',
  description: '...',
  type: S3Payload,
  args: {
    data: SignS3Input,
  },
  async resolve({ args }) {
    const { signedRequest, url } = await s3Service.signS3Service(args?.data);
    return {
      signedRequest,
      url,
    };
  },
});

export const s3Mutations = {
  signS3,
};

export async function signS3Controller(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { signedRequest, url } = await s3Service.signS3Service(req.body);
    return res.status(200).json({ success: true, signedRequest, url });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}
