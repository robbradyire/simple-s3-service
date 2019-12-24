import express, { RequestHandler } from 'express';
import S3 from 'aws-sdk/clients/s3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development'
  ),
});

const app = express();
const port = 5000;

const s3 = new S3({
  apiVersion: '2006-03-01',
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  params: {
    Bucket: process.env.BUCKET,
  },
});

const listImagesHandler: RequestHandler = (_req, res) => {
  s3.listObjectsV2((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.setHeader('Content-type', 'application/json');
      res.send(data.Contents ? data.Contents.map(s3Obj => s3Obj.Key) : []);
    }
  });
};

app.get('/api/images', listImagesHandler);

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
