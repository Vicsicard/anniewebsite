import React from 'react';
import Image from 'next/image';
import StandardLayout from '../components/Layout';
import { fetchSiteData } from '../utils/api';

interface AboutPageProps {
  siteData: any;
}

// This function gets called at build time or on server-side renders
export async function getServerSideProps() {
  try {
    // Fetch data from MongoDB via the Payload CMS API
    const siteData = await fetchSiteData();
    
    return {
      props: { siteData },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: { 
        siteData: {
          site: {
            title: 'Annie Website',
            description: 'About Annie Website - Professional podcast and media production'
          },
          media: []
        }
      },
    };
  }
}

const AboutPage: React.FC<AboutPageProps> = ({ siteData }) => {
  const { site, media } = siteData;
  
  // Debug logging
  console.log('🔍 About Page - siteData:', siteData);
  console.log('🔍 About Page - site:', site);
  console.log('🔍 About Page - site.about:', site?.about);
  
  // Use the new about structure if available, otherwise fallback to legacy structure
  const aboutData = site?.about || {};
  console.log('🔍 About Page - aboutData:', aboutData);
  
  // Handle profile picture - either from the new structure or find from media collection
  let profilePicture = aboutData.profileImage;
  if (!profilePicture && media) {
    // Fallback to searching in media collection if needed
    profilePicture = media.find((item: any) => 
      item.alt?.toLowerCase().includes('profile') || 
      item.alt?.toLowerCase().includes('avatar') ||
      item.filename?.toLowerCase().includes('profile') ||
      item.filename?.toLowerCase().includes('avatar')
    );
  }

  return (
    <StandardLayout 
      title={aboutData.title || 'About Me'} 
      description={aboutData.subtitle || `Learn more about ${site?.title || 'me'} - background, skills, and experience`} 
      siteData={siteData}
    >
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-annie-dark dark:text-white mb-6">
              {aboutData.title || 'About Me'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {aboutData.subtitle || site?.description || 'Get to know more about me and my background'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
            {/* Profile Column */}
            <div className="md:col-span-1 space-y-8">
              <div className="flex justify-center">
                <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src={profilePicture?.url || 'https://imagestopost.carrd.co/assets/images/image07.jpg?v=911794d3'} 
                    alt={profilePicture?.alt || 'Annie Sicard - Environmental Sustainability Advocate'} 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-annie-dark dark:text-white mb-4">
                  {aboutData.contactHeading || 'Contact Information'}
                </h3>
                <ul className="space-y-3">
                  {(aboutData.contact?.businessName || site?.title) && (
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <span>{aboutData.contact?.businessName || site?.title}</span>
                    </li>
                  )}
                  
                  {(aboutData.contact?.email || site?.email) && (
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span>{aboutData.contact?.email || site?.email}</span>
                    </li>
                  )}
                  
                  {(aboutData.contact?.phone || site?.phone) && (
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>{aboutData.contact?.phone || site?.phone}</span>
                    </li>
                  )}
                  
                  {(aboutData.contact?.location || site?.location) && (
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{aboutData.contact?.location || site?.location}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            
            {/* Content Column */}
            <div className="md:col-span-2 space-y-12">
              {/* About Me Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-annie-dark dark:text-white border-gray-200 dark:border-gray-700 pb-2">
                  {aboutData.contentSubheading || 'About Annie Website'}
                </h2>
                
                <div className="prose prose-lg dark:prose-dark">
                  {aboutData.content ? (
                    <div className="text-gray-700 dark:text-gray-300 space-y-4">
                      {typeof aboutData.content === 'string' 
                        ? aboutData.content.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="leading-relaxed">
                              {paragraph}
                            </p>
                          ))
                        : <p>Annie Website is a premium podcast and media production company dedicated to helping brands, individuals, and organizations tell their stories through high-quality audio and visual content.</p>
                      }
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300">
                      Annie Sicard is a professional designer and developer dedicated to helping brands, individuals, and organizations create beautiful digital experiences and tell their stories through high-quality web content. With modern design principles and technical expertise, I ensure your message reaches your audience with visual impact and optimal user experience.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </StandardLayout>
  );
};

export default AboutPage;
