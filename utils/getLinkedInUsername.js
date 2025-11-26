export const getLinkedInUsername = (linkedinUrl) => {
  if (!linkedinUrl) return '';

  let url = linkedinUrl.trim().replace(/\/$/, '');

  const match = url.match(/linkedin\.com\/in\/([^\/\?]+)/i);
  if (match && match[1]) {
    return match[1];
  }

  if (!url.includes('/') && !url.includes('.')) {
    return url;
  }

  return linkedinUrl;
};