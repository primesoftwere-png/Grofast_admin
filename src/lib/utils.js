export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return it
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:image/')) {
    return imagePath;
  }

  // Get base URL
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
  
  // Clean up path
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Check if it already includes 'upload' or 'uploads' at the beginning
  if (cleanPath.startsWith('upload/') || cleanPath.startsWith('uploads/')) {
    return `${baseUrl}/${cleanPath}`;
  }
  
  // Default fallback assuming it needs to be prefixed with upload/
  return `${baseUrl}/upload/${cleanPath}`;
};
