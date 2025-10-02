'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getBrandingInfo } from '../../utils/branding';

interface HeaderProps {
  siteData: {
    site: {
      title: string;
      subtitle?: string;
      logo?: any;
      headerImage?: any;
      projects?: {
        navLabel?: string;
      };
    };
  };
}

const Header: React.FC<HeaderProps> = ({ siteData }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  const { site } = siteData || { site: { title: 'Annie Sicard' } };
  const branding = getBrandingInfo(siteData);
  
  // Navigation links with custom Projects label if available
  const projectsLabel = site.projects?.navLabel || 'Projects';
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    // { href: '/projects', label: projectsLabel }, // Temporarily removed
    { href: '/social', label: 'Social' },
    { href: '/contact', label: 'Contact' }
  ];

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`w-full ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-white/90 backdrop-blur-sm py-4'} fixed top-0 z-50 transition-all duration-300`}>
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            {branding.logo?.url ? (
              <div className="relative w-10 h-10 overflow-hidden rounded-full">
                <Image 
                  src={branding.logo.url} 
                  alt={branding.siteTitle || "Site Logo"} 
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-annie-primary to-annie-accent rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {(branding.siteTitle?.[0] || 'A').toUpperCase()}
              </div>
            )}
            <div>
              <span className="text-lg sm:text-xl font-heading font-bold text-annie-dark">{branding.siteTitle || 'Annie Sicard'}</span>
              {branding.siteTagline && (
                <span className="hidden md:block text-xs text-gray-600">{branding.siteTagline}</span>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`font-semibold text-sm uppercase tracking-wide transition-all duration-200 hover:text-annie-primary relative group ${
                  router.pathname === link.href
                    ? 'text-annie-primary'
                    : 'text-annie-dark'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-annie-primary transition-all duration-200 group-hover:w-full ${
                  router.pathname === link.href ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-annie-primary"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-annie-dark rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-annie-dark rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-annie-dark rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="h-full flex flex-col pt-20 px-6">
          <ul className="space-y-1 flex-1">
            {navLinks.map((link, index) => (
              <li 
                key={link.href}
                style={{ animationDelay: `${index * 50}ms` }}
                className={isMobileMenuOpen ? 'animate-slideIn' : ''}
              >
                <Link
                  href={link.href}
                  className={`block py-4 px-5 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    router.pathname === link.href
                      ? 'bg-gradient-to-r from-annie-primary to-annie-accent text-white shadow-lg'
                      : 'text-annie-dark hover:bg-gray-100 active:bg-gray-200'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span>{link.label}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile Menu Footer */}
          <div className="py-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} {branding.siteTitle}
            </p>
          </div>
        </nav>
      </div>
      
      {/* Spacer - ensures content doesn't hide under fixed header */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Header;
