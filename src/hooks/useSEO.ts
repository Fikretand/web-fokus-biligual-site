
import { useEffect } from 'react';

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  lang?: string;
}

export const useSEO = (seoData: SEOData) => {
  useEffect(() => {
    // Update title
    document.title = seoData.title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };
    
    // Basic meta tags
    updateMetaTag('description', seoData.description);
    if (seoData.keywords) updateMetaTag('keywords', seoData.keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', seoData.ogTitle || seoData.title, true);
    updateMetaTag('og:description', seoData.ogDescription || seoData.description, true);
    if (seoData.ogImage) updateMetaTag('og:image', seoData.ogImage, true);
    if (seoData.ogUrl) updateMetaTag('og:url', seoData.ogUrl, true);
    
    // Twitter tags
    updateMetaTag('twitter:title', seoData.ogTitle || seoData.title);
    updateMetaTag('twitter:description', seoData.ogDescription || seoData.description);
    if (seoData.ogImage) updateMetaTag('twitter:image', seoData.ogImage);
    if (seoData.ogUrl) updateMetaTag('twitter:url', seoData.ogUrl);
    
    // Canonical URL
    if (seoData.canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', seoData.canonical);
    }
    
    // Language
    if (seoData.lang) {
      document.documentElement.lang = seoData.lang;
    }
  }, [seoData]);
};
