import { UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';
import { cloudinary } from '../../config/cloudinary.js';
import { ApiError } from '../../utils/ApiError.js';

const bufferToStream = (buffer: Buffer): Readable => {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
};

/** Upload a receipt file buffer to Cloudinary and return the secure URL */
export const uploadReceiptToCloudinary = (buffer: Buffer, mimetype: string): Promise<string> => {
  const resourceType = mimetype === 'application/pdf' ? 'raw' : 'image';

  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'looplab/receipts',
        resource_type: resourceType,
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'pdf'],
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          console.error('❌ Cloudinary Upload Error:', error);
          const errorMsg = error?.message ? `Cloudinary Upload Error: ${error.message}` : 'Failed to upload receipt. Please try again';
          reject(new ApiError(500, errorMsg));
          return;
        }
        resolve(result.secure_url);
      }
    );
    bufferToStream(buffer).pipe(uploadStream);
  });
};
