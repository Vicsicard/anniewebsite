import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { fetchSiteData } from '../utils/api';

interface SocialPageProps {
  siteData: any;
}

interface SocialPost {
  id: string;
  title?: string;
  content: string;
  platform: string;
  link?: string;
  image?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
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
            title: 'Annie Sicard',
            description: 'Annie Sicard Social - Connect with me online'
          },
          socialPosts: []
        }
      },
    };
  }
}

const SocialPage: React.FC<SocialPageProps> = ({ siteData }) => {
  const { site, socialPosts } = siteData;
  const socialConfig = site?.social || {};
  
  // Sort posts by date (newest first)
  const sortedPosts = socialPosts
    ? [...socialPosts]
        .filter((post: SocialPost) => post.status === 'published')
        .sort((a: SocialPost, b: SocialPost) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    : [];
  
  // Get latest post for each platform
  const latestLinkedInPost = sortedPosts.find(post => post.platform === 'linkedin');
  const latestTwitterPost = sortedPosts.find(post => post.platform === 'twitter');
  const latestInstagramPost = sortedPosts.find(post => post.platform === 'instagram');
  const latestFacebookPost = sortedPosts.find(post => post.platform === 'facebook');
  
  // Platform icons and colors
  const platformConfig: Record<string, { 
    icon: React.ReactNode;
    color: string;
    bgColor: string;
  }> = {
    twitter: {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      color: 'text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    linkedin: {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      color: 'text-blue-700',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    instagram: {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    },
    facebook: {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    medium: {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3v18h18V3H3zm15 4.5v9l-3-1.5v-6L18 7.5zm-2.368.327l-5.605 9.66L4.48 7.813l5.605 9.66 5.547-9.646z" />
        </svg>
      ),
      color: 'text-gray-800 dark:text-gray-200',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
    },
    github: {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      color: 'text-gray-900 dark:text-white',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
    },
  };
  
  // Default platform config for unknown platforms
  const defaultPlatformConfig = {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    color: 'text-gray-700 dark:text-gray-300',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
  };

  return (
    <Layout 
      title={socialConfig.title || "Social Media Hub"} 
      description="Connect with me across my social media platforms" 
      siteData={siteData}
    >
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {socialConfig.title || "Social Media Hub"}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Connect with me across my social media platforms
            </p>
          </div>
          
          {/* Social Media Grid - 4 cards layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* LinkedIn Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border-t-4 border-blue-700">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-blue-700 bg-blue-50 dark:bg-blue-900/20">
                    {platformConfig.linkedin.icon}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">LinkedIn</p>
                  </div>
                </div>
                
                {latestLinkedInPost ? (
                  <>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                      {latestLinkedInPost.title || "Latest LinkedIn Update"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {latestLinkedInPost.content}
                    </p>
                    <Link href="/social/linkedin" className="inline-flex items-center font-medium text-blue-700 hover:text-blue-800">
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 dark:text-gray-400">No recent posts</p>
                    {socialConfig.profiles?.linkedin && (
                      <a 
                        href={socialConfig.profiles.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center font-medium text-blue-700 hover:text-blue-600"
                      >
                        Follow on LinkedIn
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Twitter Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border-t-4 border-blue-400">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-blue-400 bg-blue-50 dark:bg-blue-900/20">
                    {platformConfig.twitter.icon}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">Twitter</p>
                  </div>
                </div>
                
                {latestTwitterPost ? (
                  <>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                      {latestTwitterPost.title || "Latest Tweet"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {latestTwitterPost.content}
                    </p>
                    <Link href="/social/twitter" className="inline-flex items-center font-medium text-blue-400 hover:text-blue-500">
                        Read More
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 dark:text-gray-400">No recent tweets</p>
                    {socialConfig.profiles?.twitter && (
                      <a 
                        href={socialConfig.profiles.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center font-medium text-blue-400 hover:text-blue-500"
                      >
                        Follow on Twitter
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Instagram Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border-t-4 border-pink-600">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-pink-600 bg-pink-50 dark:bg-pink-900/20">
                    {platformConfig.instagram.icon}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">Instagram</p>
                  </div>
                </div>
                
                {latestInstagramPost ? (
                  <>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                      {latestInstagramPost.title || "Latest Instagram Post"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {latestInstagramPost.content}
                    </p>
                    <Link href="/social/instagram" className="inline-flex items-center font-medium text-pink-600 hover:text-pink-500">
                        Read More
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 dark:text-gray-400">No recent posts</p>
                    {socialConfig.profiles?.instagram && (
                      <a 
                        href={socialConfig.profiles.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center font-medium text-pink-600 hover:text-pink-500"
                      >
                        Follow on Instagram
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Facebook Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border-t-4 border-blue-600">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-blue-600 bg-blue-50 dark:bg-blue-900/20">
                    {platformConfig.facebook.icon}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">Facebook</p>
                  </div>
                </div>
                
                {latestFacebookPost ? (
                  <>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                      {latestFacebookPost.title || "Latest Facebook Post"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {latestFacebookPost.content}
                    </p>
                    <Link href="/social/facebook" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-700">
                        Read More
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 dark:text-gray-400">No recent posts</p>
                    {socialConfig.profiles?.facebook && (
                      <a 
                        href={socialConfig.profiles.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center font-medium text-blue-600 hover:text-blue-500"
                      >
                        Follow on Facebook
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SocialPage;
