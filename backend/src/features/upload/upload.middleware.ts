import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';

import multer from 'multer';

import {
  ApiError,
} from '../../utils/ApiError.js';

const ALLOWED_MIME_TYPES =
  new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
  ]);

const MAX_FILE_SIZE_BYTES =
  5 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize:
      MAX_FILE_SIZE_BYTES,

    files: 1,
  },

  fileFilter: (
    _req,
    file,
    callback
  ) => {
    if (
      ALLOWED_MIME_TYPES.has(
        file.mimetype
      )
    ) {
      callback(null, true);
      return;
    }

    callback(
      new ApiError(
        400,
        'Only JPEG, PNG, WebP or PDF files are accepted'
      )
    );
  },
});

function isJpeg(
  buffer: Buffer
): boolean {
  return (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  );
}

function isPng(
  buffer: Buffer
): boolean {
  const pngSignature = [
    0x89,
    0x50,
    0x4e,
    0x47,
    0x0d,
    0x0a,
    0x1a,
    0x0a,
  ];

  return pngSignature.every(
    (byte, index) =>
      buffer[index] === byte
  );
}

function isWebP(
  buffer: Buffer
): boolean {
  if (buffer.length < 12) {
    return false;
  }

  const riff = buffer
    .subarray(0, 4)
    .toString('ascii');

  const webp = buffer
    .subarray(8, 12)
    .toString('ascii');

  return (
    riff === 'RIFF' &&
    webp === 'WEBP'
  );
}

function isPdf(
  buffer: Buffer
): boolean {
  if (buffer.length < 5) {
    return false;
  }

  return (
    buffer
      .subarray(0, 5)
      .toString('ascii') ===
    '%PDF-'
  );
}

function validateFileSignature(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  if (!req.file) {
    next(
      new ApiError(
        400,
        'No receipt file provided'
      )
    );

    return;
  }

  const { buffer, mimetype } =
    req.file;

  let validFile = false;

  if (
    mimetype === 'image/jpeg'
  ) {
    validFile = isJpeg(buffer);
  }

  if (
    mimetype === 'image/png'
  ) {
    validFile = isPng(buffer);
  }

  if (
    mimetype === 'image/webp'
  ) {
    validFile = isWebP(buffer);
  }

  if (
    mimetype ===
    'application/pdf'
  ) {
    validFile = isPdf(buffer);
  }

  if (!validFile) {
    next(
      new ApiError(
        400,
        'File content does not match its declared format'
      )
    );

    return;
  }

  next();
}

const receiveReceipt =
  upload.single('receipt');

export const uploadReceiptMiddleware: RequestHandler[] =
  [
    receiveReceipt,
    validateFileSignature,
  ];