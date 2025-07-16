"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import { fetchSiteData } from '../utils/api';
import DocumentCard from '../components/ui/DocumentCard';

interface BlogPageProps {
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
            description: 'Self Cast Studios Blog - Latest news and insights'
          },
          blogPosts: [],
          media: []
        }
      },
    };
  }
}

const BlogPage: React.FC<BlogPageProps> = ({ siteData }) => {
  const { site, blogPosts, media } = siteData;
  
  // Use the new blog structure if available, otherwise fallback to defaults
  const blogData = site?.blog || {};
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const postsPerPage = blogData.postsPerPage || 6;

  // Get unique categories
  const allCategories = ['all'];
  if (blogPosts && blogPosts.length > 0) {
    const categories = new Set(blogPosts.map((post: any) => post.category).filter(Boolean));
    categories.forEach((category: string) => {
      if (!allCategories.includes(category)) {
        allCategories.push(category);
      }
    });
  }
  
  // Filter posts by search term, category, and published status
  const filteredPosts = blogPosts
    ? blogPosts
        .filter((post: any) => post.status === 'published')
        .filter((post: any) => 
          post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          post.content?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((post: any) => 
          selectedCategory === 'all' || post.category === selectedCategory
        )
    : [];
  
  // Calculate reading time for blog posts (returns a number of minutes)
  const calculateReadingTime = (content: string): number => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Format reading time with "min read" text
  const formatReadingTime = (minutes: number): string => {
    return `${minutes} min read`;
  };

  // Determine the featured post based on CMS settings
  let featuredPost = null;
  
  if (blogData.featuredPost?.visible) {
    if (blogData.featuredPost?.selectionType === 'manual' && blogData.featuredPost?.postId) {
      // Use manually selected post
      featuredPost = blogPosts?.find((post: any) => 
        post.status === 'published' && post.id === blogData.featuredPost.postId
      ) || null;
    } else {
      // Use most recent post (first in the list, assuming they're sorted by date)
      const publishedPosts = blogPosts?.filter((post: any) => post.status === 'published') || [];
      featuredPost = publishedPosts.length > 0 ? publishedPosts[0] : null;
    }
  }

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <Layout 
      title={blogData.title || 'Blog'} 
      description={blogData.description || 'Read the latest articles and insights'}
      siteData={siteData}
    >
      <div className="bg-white py-16 mt-8">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-selfcast-dark mb-4">
            {blogData.title || 'Blog'}
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl">
            {blogData.description || 'Explore thoughts, ideas, and insights on a variety of topics.'}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        {/* Search Bar */}
        {(blogData.showSearch !== false) && (
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-grow flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-selfcast-primary focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setCurrentPage(1);
                    }
                  }}
                />
                <div className="absolute left-3 top-3.5 text-gray-400">
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
              </div>
              <button 
                onClick={() => setCurrentPage(1)}
                className="bg-selfcast-primary hover:bg-selfcast-accent text-white px-6 py-3 rounded-r-md transition-colors font-medium"
              >
                Search Blogs
              </button>
            </div>
          </div>
        )}
        
        {/* Featured Post */}
        {featuredPost && !searchTerm && selectedCategory === 'all' && currentPage === 1 && (
          <div className="mb-16">
            <div className="bg-white rounded-xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                {/* Image Column (2/5) */}
                <div className="md:col-span-2 relative h-60 md:h-full min-h-[320px]">
                  {featuredPost.featuredImage?.url ? (
                    <Image
                      src={featuredPost.featuredImage.url}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-selfcast-primary to-selfcast-secondary flex items-center justify-center">
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Content Column (3/5) */}
                <div className="md:col-span-3 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-selfcast-accent text-white text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </span>
                    {featuredPost.category && (
                      <span className="ml-2 text-gray-600 text-sm">
                        {featuredPost.category}
                      </span>
                    )}
                  </div>
                  
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-selfcast-dark mb-4 hover:text-selfcast-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 mb-6">
                    {featuredPost.content.substring(0, 200)}...
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {new Date(featuredPost.updatedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                      <span className="mx-2">•</span>
                      <span>{formatReadingTime(calculateReadingTime(featuredPost.content))}</span>
                    </div>
                    
                    <Link 
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center text-selfcast-primary font-medium hover:text-selfcast-accent transition-colors"
                    >
                      Read Article
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            {filteredPosts.length === 0 ? (
              'No posts found.'
            ) : (
              `Showing ${Math.min((currentPage - 1) * postsPerPage + 1, filteredPosts.length)} - ${Math.min(currentPage * postsPerPage, filteredPosts.length)} of ${filteredPosts.length} articles`
            )}
          </p>
        </div>
        
        {/* Blog Post Grid */}
        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post: any) => (
              <DocumentCard
                key={post.id}
                title={post.title}
                excerpt={post.content}
                slug={post.slug}
                date={post.updatedAt}
                imageSrc={post.featuredImage?.url}
                category={post.category}
                readTime={formatReadingTime(calculateReadingTime(post.content))}
                author={post.author?.name}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xl font-heading font-medium text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-8">
              {searchTerm 
                ? `No articles found matching "${searchTerm}". Try a different search term.` 
                : 'No articles have been published yet. Check back soon for new content!'}
            </p>
            
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-selfcast-primary text-white rounded-md hover:bg-selfcast-primary/90 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
        
        {/* Pagination */}
        <div className="flex flex-col items-center mt-16 mb-8">
          <p className="text-sm text-gray-600 mb-4">
            {totalPages > 0 ? `Page ${currentPage} of ${totalPages}` : ''}
          </p>
          
          {totalPages > 1 && (
            <div className="inline-flex items-center shadow-md rounded-md overflow-hidden">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-3 border border-gray-200 ${
                  currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-selfcast-primary hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </div>
              </button>
              
              {/* Desktop pagination with page numbers */}
              <div className="hidden md:flex">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNumber = i + 1;
                  const isVisible = 
                    pageNumber === 1 || 
                    pageNumber === totalPages || 
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);
                  
                  if (!isVisible) {
                    if (pageNumber === 2 || pageNumber === totalPages - 1) {
                      return (
                        <span key={pageNumber} className="px-4 py-3 border-t border-b border-gray-200 bg-white text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-3 border-t border-b border-gray-200 min-w-[3rem] ${
                        currentPage === pageNumber 
                          ? 'bg-selfcast-primary text-white font-bold' 
                          : 'bg-white text-selfcast-dark hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-3 border border-gray-200 ${
                  currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-selfcast-primary hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span>Next</span>
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
