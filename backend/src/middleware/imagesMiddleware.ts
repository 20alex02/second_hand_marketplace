import type { NextFunction, Response } from 'express';
import type { Request } from 'express-serve-static-core';
import multer from 'multer';
import path from 'path';
import { handleErrorResp } from '../controllers/common';
import { ExtensionError } from '../errors/middlewareErrors';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './src/images');
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = (req: Request, res: Response, next: NextFunction) => {
  // TODO replace 'images' in array with name attribute from form
  multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (_req, file, cb) => {
      if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new ExtensionError());
      }
    },
  }).array('images')(req, res, (err) => {
    if (err instanceof ExtensionError) {
      return handleErrorResp(400, res, err.message);
    }
    if (err) {
      return handleErrorResp(500, res, 'File upload failed');
    }
    next();
    return;
  });
};

export default upload;
