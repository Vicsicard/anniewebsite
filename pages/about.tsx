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
            title: 'Self Cast Studios',
            description: 'About Self Cast Studios - Professional podcast and media production'
          },
          media: []
        }
      },
    };
  }
}

const AboutPage: React.FC<AboutPageProps> = ({ siteData }) => {
  const { site, media } = siteData;
  
  // Use the new about structure if available, otherwise fallback to legacy structure
  const aboutData = site?.about || {};
  
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
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
                {profilePicture ? (
                  <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-xl">
                    <Image 
                      src={profilePicture.url} 
                      alt={profilePicture.alt || 'Profile picture'} 
                      layout="fill" 
                      objectFit="cover"
                    />
                  </div>
                ) : (
                  <div className="w-64 h-64 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Contact Information */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  {aboutData.contentSubheading || 'About Self Cast Studios'}
                </h2>
                
                <div className="prose max-w-none dark:prose-dark">
                  {aboutData.content ? (
                    <div className="text-gray-700 dark:text-gray-300">
                      {typeof aboutData.content === 'string' 
                        ? aboutData.content 
                        : 'Self Cast Studios is a premium podcast and media production company dedicated to helping brands, individuals, and organizations tell their stories through high-quality audio and visual content.'}
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300">
                      Self Cast Studios is a premium podcast and media production company dedicated to helping brands, individuals, and organizations tell their stories through high-quality audio and visual content. With state-of-the-art equipment and experienced professionals, we ensure your message reaches your audience with crystal clarity and maximum impact.
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
