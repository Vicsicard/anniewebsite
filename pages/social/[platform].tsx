import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { fetchSiteData } from '../../utils/api';

interface SocialPlatformPageProps {
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
export async function getServerSideProps(context: any) {
  try {
    // Get the platform from the URL
    const { platform } = context.params;
    
    // Fetch data from MongoDB via the Payload CMS API
    const siteData = await fetchSiteData();
    
    // Validate if the platform exists
    const validPlatforms = ['linkedin', 'twitter', 'instagram', 'facebook'];
    
    if (!validPlatforms.includes(platform)) {
      return {
        notFound: true, // This will render the 404 page
      };
    }
    
    return {
      props: { 
        siteData,
        platform
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      notFound: true,
    };
  }
}

const SocialPlatformPage: React.FC<SocialPlatformPageProps & { platform: string }> = ({ siteData, platform }) => {
  const router = useRouter();
  const { site, socialPosts } = siteData;
  const socialConfig = site?.social || {};
  const platformConfig = getPlatformConfig(platform);
  const [currentPage, setCurrentPage] = useState(1);
  const [featuredPostId, setFeaturedPostId] = useState<string | null>(null);
  
  // Filter posts by platform and published status
  const platformPosts = socialPosts
    ? [...socialPosts]
        .filter((post: SocialPost) => post.status === 'published' && post.platform === platform)
        .sort((a: SocialPost, b: SocialPost) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    : [];
  
  // Set default featured post (first post) if none selected
  const defaultFeaturedPostId = platformPosts.length > 0 ? platformPosts[0].id : null;
  const activeFeaturedPostId = featuredPostId || defaultFeaturedPostId;
  
  // Get featured post
  const featuredPost = platformPosts.find((post: SocialPost) => post.id === activeFeaturedPostId);
  
  // Posts per page
  const postsPerPage = 3;
  
  // Get recent posts (excluding featured post)
  const recentPosts = platformPosts
    .filter((post: SocialPost) => post.id !== activeFeaturedPostId)
    .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
  
  // Calculate total pages
  const totalRecentPosts = platformPosts.length - (activeFeaturedPostId ? 1 : 0);
  const totalPages = Math.ceil(totalRecentPosts / postsPerPage);
  
  // Platform specific config
  function getPlatformConfig(platform: string) {
    const platformConfigs: Record<string, {
      name: string;
      color: string;
      bgColor: string;
      icon: React.ReactNode;
      buttonText: string;
    }> = {
      linkedin: {
        name: 'LinkedIn',
        color: 'text-blue-700',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        ),
        buttonText: 'Connect on LinkedIn',
      },
      twitter: {
        name: 'Twitter',
        color: 'text-blue-400',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        ),
        buttonText: 'Follow on Twitter',
      },
      instagram: {
        name: 'Instagram',
        color: 'text-pink-600',
        bgColor: 'bg-pink-50 dark:bg-pink-900/20',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        ),
        buttonText: 'Follow on Instagram',
      },
      facebook: {
        name: 'Facebook',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        ),
        buttonText: 'Follow on Facebook',
      },
    };

    return platformConfigs[platform] || platformConfigs.twitter;
  }

  // Page title format: "[Platform Name] Updates - [Site Title]"
  const pageTitle = `${platformConfig.name} Updates ${site?.title ? `- ${site.title}` : ''}`;

  return (
    <Layout
      title={pageTitle}
      description={`Latest ${platformConfig.name} updates and posts`}
      siteData={siteData}
    >
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <div className="mb-8">
            <Link href="/social" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Social Media Hub
            </Link>
          </div>

          {/* Page Header */}
          <div className="flex items-center mb-8">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${platformConfig.color} ${platformConfig.bgColor} mr-4`}>
              {platformConfig.icon}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {platformConfig.name} Updates
            </h1>
          </div>

          {/* Profile Link Button */}
          {socialConfig.profiles && socialConfig.profiles[platform] && (
            <div className="mb-10">
              <a
                href={socialConfig.profiles[platform]}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-6 py-3 rounded-lg font-medium ${platformConfig.color} ${platformConfig.bgColor} hover:bg-opacity-80 transition-all`}
              >
                {platformConfig.icon}
                <span className="ml-2">{platformConfig.buttonText}</span>
              </a>
            </div>
          )}

          {platformPosts.length > 0 ? (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-12 border-t-4" style={{ borderColor: platformConfig.color.replace('text-', '') }}>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center mb-6">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${platformConfig.color} bg-white dark:bg-gray-700`}>
                        {platformConfig.icon}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {platformConfig.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(featuredPost.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {featuredPost.title || `Featured ${platformConfig.name} Post`}
                    </h2>

                    <div className="mb-6">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {featuredPost.content}
                      </p>
                    </div>

                    {featuredPost.link && (
                      <a
                        href={featuredPost.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center font-medium ${platformConfig.color} hover:underline`}
                      >
                        View Original Post
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Section Title */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Recent {platformConfig.name} Posts
                </h2>
              </div>

              {/* Recent Posts Grid */}
              {recentPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {recentPosts.map((post: SocialPost) => (
                    <div
                      key={post.id}
                      className={`p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 border-t-4`}
                      style={{ borderColor: platformConfig.color.replace('text-', '') }}
                    >
                      <div className="flex items-center mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${platformConfig.color} bg-white dark:bg-gray-700`}>
                          {platformConfig.icon}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {platformConfig.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(post.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                        {post.title || `${platformConfig.name} Update`}
                      </h3>

                      <div className="mb-4">
                        <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                          {post.content}
                        </p>
                      </div>

                      <button
                        onClick={() => setFeaturedPostId(post.id)}
                        className={`inline-flex items-center font-medium ${platformConfig.color} hover:underline`}
                      >
                        Read Full Post
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg mb-10">
                  <p className="text-gray-600 dark:text-gray-300">No additional posts to display</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mb-8">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-md ${
                        currentPage === page
                          ? `${platformConfig.color} ${platformConfig.bgColor}`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">No {platformConfig.name} posts found</p>
              
              {socialConfig.profiles && socialConfig.profiles[platform] && (
                <div className="mt-6">
                  <a
                    href={socialConfig.profiles[platform]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-6 py-3 rounded-lg font-medium ${platformConfig.color} ${platformConfig.bgColor} hover:bg-opacity-80 transition-all`}
                  >
                    {platformConfig.icon}
                    <span className="ml-2">{platformConfig.buttonText}</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default SocialPlatformPage;
