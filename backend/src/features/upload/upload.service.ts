import {
  UploadApiResponse,
} from 'cloudinary';

import {
  Readable,
} from 'stream';

import {
  cloudinary,
} from '../../config/cloudinary.js';

import {
  ApiError,
} from '../../utils/ApiError.js';

// ==========================================
// BUFFER TO STREAM
// ==========================================

function bufferToStream(
  buffer: Buffer
): Readable {
  const readable =
    new Readable();

  readable.push(buffer);
  readable.push(null);

  return readable;
}

// ==========================================
// CLOUDINARY UPLOAD
// ==========================================

export function uploadReceiptToCloudinary(
  buffer: Buffer,
  mimetype: string
): Promise<string> {
  const isPdf =
    mimetype ===
    'application/pdf';

  const resourceType =
    isPdf ? 'raw' : 'image';

  return new Promise<string>(
    (resolve, reject) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            folder:
              'looplab/receipts',

            resource_type:
              resourceType,

            /*
             * Cloudinary should not use
             * the user's original filename.
             */
            use_filename: false,

            unique_filename: true,

            overwrite: false,

            /*
             * Only explicitly supported
             * formats are allowed.
             */
            allowed_formats:
              isPdf
                ? ['pdf']
                : [
                    'jpg',
                    'jpeg',
                    'png',
                    'webp',
                  ],

            /*
             * Add controlled metadata.
             */
            context: {
              uploaded_for:
                'looplab-registration-receipt',
            },
          },

          (
            error,
            result:
              | UploadApiResponse
              | undefined
          ) => {
            if (
              error ||
              !result
            ) {
              /*
               * Do not return Cloudinary
               * internal details publicly.
               */
              console.error(
                'Cloudinary receipt upload failed:',
                error?.message ||
                  error
              );

              reject(
                new ApiError(
                  500,

                  'Receipt could not be uploaded. Please try again'
                )
              );

              return;
            }

            if (
              !result.secure_url
            ) {
              reject(
                new ApiError(
                  500,

                  'Cloudinary did not return a secure receipt URL'
                )
              );

              return;
            }

            resolve(
              result.secure_url
            );
          }
        );

      bufferToStream(
        buffer
      ).pipe(uploadStream);
    }
  );
}