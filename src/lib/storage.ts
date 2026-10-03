const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export interface StorageUploadResult {
  path: string;
  downloadUrl: string;
  size: number;
  contentType: string;
}

/**
 * Validates file MIME type and size before processing
 */
function validateUpload(file: File): void {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(`Invalid file type (${file.type}). Allowed formats: JPEG, PNG, WEBP, GIF.`);
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File size (${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds 10MB limit.`);
  }
}

/**
 * Converts a file to a base64 data URL for local display and persistence
 */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads/processes a user avatar image to users/{uid}/avatar/{timestamp}_{filename}
 */
export async function uploadUserAvatar(file: File, uid: string): Promise<StorageUploadResult> {
  validateUpload(file);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `users/${uid}/avatar/${Date.now()}_${safeName}`;
  const downloadUrl = await fileToDataUrl(file);

  return {
    path,
    downloadUrl,
    size: file.size,
    contentType: file.type,
  };
}

/**
 * Uploads/processes a user file to users/{uid}/uploads/{timestamp}_{filename}
 */
export async function uploadUserFile(file: File, uid: string): Promise<StorageUploadResult> {
  validateUpload(file);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `users/${uid}/uploads/${Date.now()}_${safeName}`;
  const downloadUrl = await fileToDataUrl(file);

  return {
    path,
    downloadUrl,
    size: file.size,
    contentType: file.type,
  };
}

/**
 * Uploads/processes a recipe photo to recipes/{recipeId}/{timestamp}_{filename}
 */
export async function uploadRecipePhoto(file: File, recipeId: string): Promise<StorageUploadResult> {
  validateUpload(file);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `recipes/${recipeId}/${Date.now()}_${safeName}`;
  const downloadUrl = await fileToDataUrl(file);

  return {
    path,
    downloadUrl,
    size: file.size,
    contentType: file.type,
  };
}
