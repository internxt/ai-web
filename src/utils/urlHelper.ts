export const cleanTrackingParams = (url: string): string => {
  const trackingParams = ['_gl', '_gcl_au', 'utm_source', 'utm_medium', 'utm_campaign', 'fbclid', 'gclid'];
  const urlObj = new URL(url, window.location.origin);
  
  trackingParams.forEach(param => {
    urlObj.searchParams.delete(param);
  });
  
  return urlObj.pathname + urlObj.search + urlObj.hash;
};