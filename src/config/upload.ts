import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

interface IUploadConfig {
  driver: 'disk' | 's3';
  tmpFolder: string;

  config: {
    multer: {
      storage: StorageEngine;
    };
    disk: {
      uploadsFolder: string;
    };
    aws: {
      bucket: string;
    };
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  config: {
    multer: {
      storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    },
    disk: {
      uploadsFolder: path.resolve(tmpFolder, 'uploads'),
    },
    aws: {
      bucket: process.env.BUCKET,
    },
  },
} as IUploadConfig;
