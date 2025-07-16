/**
 * Branding utilities to apply custom branding from CMS to site
 */

/**
 * Extracts and prepares branding information from site data
 */
export const getBrandingInfo = (siteData: any) => {
  if (!siteData?.site) {
    return {
      logo: null,
      primaryColor: '#0047AB', // Default blue if no branding is set
      copyrightText: '© Copyright',
    };
  }

  const { site } = siteData;
  
  return {
    logo: site.branding?.logo || null,
    primaryColor: site.branding?.primaryColor || '#0047AB',
    copyrightText: site.branding?.copyrightText || '© Copyright',
    siteTitle: site.title || 'Self Cast Studios',
    siteTagline: site.subtitle || 'Personal Branding Platform',
  };
};
