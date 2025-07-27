/**
 * API utilities for fetching data from the Payload CMS
 * This file is used to connect to the MongoDB data source via the Payload CMS API
 */

import axios from 'axios';

// Use the environment variable for API URL with fallback
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Log which API URL we're using for debugging purposes
console.log(`Using API URL: ${API_URL}`);

// Create an axios instance with default configs
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000, // 15 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.params || {});
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      statusText: response.statusText,
      dataPreview: typeof response.data === 'object' ? 
        `Object with ${Object.keys(response.data).length} keys` : 
        'Non-object response'
    });
    return response;
  },
  (error) => {
    console.error('[API Response Error]', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
    });
    return Promise.reject(error);
  }
);

// Static fallback data for when API is unavailable
const FALLBACK_DATA = {
  site: {
    id: 'annie-static',
    title: 'Annie Sicard',
    description: 'Environmental sustainability, carbon offsets, and renewable energies',
    
    // Social Media Hub structure
    social: {
      title: 'Social Media Hub',
      navLabel: 'Social',
      description: 'Connect with me and see my latest updates across social media platforms.',
      cardStyle: 'standard',
      
      linkedInCard: { visible: true },
      twitterCard: { visible: true },
      instagramCard: { visible: true },
      facebookCard: { visible: true },
      
      profiles: {
        linkedin: 'https://linkedin.com/in/selfcaststudios',
        twitter: 'https://twitter.com/selfcaststudios',
        instagram: 'https://instagram.com/selfcaststudios',
        facebook: 'https://facebook.com/selfcaststudios'
      },
      
      linkedin: {
        title: 'My LinkedIn Posts',
        followButtonText: 'Connect with me on LinkedIn'
      },
      twitter: {
        title: 'My Twitter Feed',
        followButtonText: 'Follow me on Twitter'
      },
      instagram: {
        title: 'My Instagram Feed',
        followButtonText: 'Follow me on Instagram'
      },
      facebook: {
        title: 'My Facebook Posts',
        followButtonText: 'Follow me on Facebook'
      },
      
      postsPerPage: 3,
      showPagination: true,
      
      showCTA: true,
      ctaHeading: "Let's Connect!",
      ctaText: 'Follow me on social media to stay up to date with my latest content and updates.',
      ctaButtonText: 'View All Profiles',
      ctaButtonURL: '#profiles'
    },
    headline: 'Building a Sustainable Future',
    tagline: 'Promoting sustainable solutions for a greener future',
    // Homepage structure with sections
    homepage: {
      hero: {
        title: 'Annie Sicard',
        subtitle: 'Environmental Sustainability Advocate',
        ctaText: 'View Projects',
        ctaLink: '/projects',
        image: {
          url: '/images/hero-placeholder.jpg',
          alt: 'Annie Sicard - Web Designer and Developer'
        }
      },
      aboutSection: {
        visible: true,
        heading: 'About',
        subheading: 'My approach to environmental sustainability',
        quoteCard1: {
          visible: true,
          content: 'Sustainability is about finding balance between human needs and preserving our planet for future generations.',
          author: 'Annie Sicard',
          icon: 'person'
        },
        quoteCard2: {
          visible: true,
          content: 'I believe in practical solutions that reduce carbon footprints while maintaining quality of life.',
          author: 'Annie Sicard',
          icon: 'lightbulb'
        },
        quoteCard3: {
          visible: true,
          content: 'My work combines environmental expertise with innovative approaches to sustainability challenges.',
          author: 'Annie Sicard',
          icon: 'briefcase'
        }
      },
      banner1: {
        visible: true,
        title: 'My Sustainability Mission',
        caption: 'Developing innovative carbon offset initiatives and renewable energy solutions for a greener future.'
      },
      blogPostsSection: {
        visible: true,
        heading: 'Latest Initiatives',
        subheading: 'Recent environmental sustainability projects and insights',
        showFeaturedOnly: true,
        postsToShow: 3
      },
      banner2: {
        visible: true,
        title: "Join the Movement",
        caption: 'Connect with me to learn how you can contribute to environmental sustainability efforts.'
      },
      socialMediaSection: {
        visible: true,
        heading: 'Social Media',
        subheading: 'Connect with me across platforms',
        platformsToShow: ['linkedin', 'instagram', 'facebook', 'twitter']
      }
    },
    // About page structure
    about: {
      title: 'About Me',
      subtitle: 'Environmental Sustainability Advocate',
      contentSubheading: 'About Annie Sicard',
      content: 'Annie Sicard is a visionary environmental sustainability advocate whose decade-long journey has been defined by transforming complex environmental challenges into practical, impactful solutions. With over 10 years of hands-on experience developing and implementing carbon offset initiatives and renewable energy projects, Annie has established herself as a trusted leader in the sustainability space, helping organizations navigate the path toward environmental responsibility without compromising operational excellence.\n\nHer expertise spans the full spectrum of environmental solutions, from designing comprehensive carbon offset programs for Fortune 500 companies to implementing community-scale renewable energy microgrids that serve hundreds of households. Annie\'s approach is uniquely holistic—she understands that true sustainability requires balancing environmental impact, economic viability, and social responsibility. This philosophy has guided her work in developing innovative financing models for community solar projects, creating sustainable agriculture certification programs, and optimizing global supply chains to reduce emissions while maintaining efficiency.\n\nWhat sets Annie apart is her ability to translate environmental science into actionable business strategies. She specializes in sustainable business practices, environmental impact assessment, and green technology implementation, always with an eye toward creating solutions that are both environmentally sound and economically sustainable. Her projects have collectively eliminated thousands of tons of carbon emissions while generating significant cost savings and operational improvements for her clients.\n\nAnnie\'s work extends beyond individual projects to systemic change. She has developed certification programs that help farmers transition to sustainable practices, designed renewable energy systems that provide energy independence to remote communities, and created carbon neutrality pathways that have become models for industry transformation. Her commitment to environmental stewardship is matched by her dedication to making sustainability accessible and achievable for organizations of all sizes.\n\nDriven by a deep belief that environmental responsibility and business success are not just compatible but mutually reinforcing, Annie continues to pioneer innovative approaches to sustainability challenges. Her work represents a bridge between environmental advocacy and practical implementation, proving that the path to a more sustainable future is not only necessary but also profitable and achievable.',
      contactHeading: 'Contact Information',
      contact: {
        businessName: 'Annie Sicard',
        email: 'contact@selfcaststudios.com',
        phone: '(555) 123-4567',
        location: 'Denver, CO'
      }
    },
    // Blog page structure
    blog: {
      title: 'Blog',
      description: 'Explore insights and developments in environmental sustainability, carbon offsets, and renewable energy.',
      showSearch: true,
      featuredPost: {
        visible: true,
        selectionType: 'recent'
      },
      postsPerPage: 6,
      gridLayout: 'grid-3',
      showPagination: true
    },
    // Projects page structure
    projects: {
      title: 'My Projects',
      description: 'Explore my featured environmental sustainability initiatives and renewable energy projects. Each project represents my commitment to creating a more sustainable future.',
      showCategories: true,
      gridLayout: 'grid-3',
      cardStyle: 'standard',
      projectsPerPage: 9,
      featuredProjects: {
        visible: false,
        heading: 'Featured Projects'
      },
      showCTA: true,
      ctaHeading: 'Ready to Start Your Project?',
      ctaText: 'Get in touch with us to discuss your project needs and how we can help bring your vision to life.',
      ctaButtonText: 'Contact Us',
      ctaButtonURL: '/contact'
    }
  },
  sampleProjects: [
    {
      id: 'project-1',
      title: 'Community Solar Initiative',
      slug: 'community-solar-initiative',
      description: 'A collaborative project bringing affordable solar energy to underserved communities through innovative financing models.',
      content: 'This comprehensive community solar project made renewable energy accessible to over 500 households in low-income neighborhoods. By developing a unique financing model and partnership with local utilities, we were able to reduce energy costs by an average of 30% while eliminating approximately 2,500 tons of carbon emissions annually.',
      featuredImage: {
        url: '/images/sample/project-1.jpg',
        alt: 'Community Solar Initiative'
      },
      category: 'Renewable Energy',
      client: 'Greenlight Community Partners',
      completedAt: '2024-09-15',
      featured: true
    },
    {
      id: 'project-2',
      title: 'Corporate Carbon Offset Program',
      slug: 'corporate-carbon-offset-program',
      description: 'Designed and implemented a comprehensive carbon offset strategy for a Fortune 500 company.',
      content: 'Working closely with executive leadership, we developed a tailored carbon offset program that aligned with the company\'s operational realities and sustainability goals. The program included emissions measurement protocols, reduction strategies, and investment in verified offset projects. Within the first year, the company achieved carbon neutrality for its direct operations and set a pathway to address supply chain emissions.',
      featuredImage: {
        url: '/images/sample/project-2.jpg',
        alt: 'Corporate Carbon Offset Program'
      },
      category: 'Carbon Offsets',
      client: 'Nexus Industries',
      completedAt: '2024-08-22',
      featured: true
    },
    {
      id: 'project-3',
      title: 'Sustainable Agriculture Certification',
      slug: 'sustainable-agriculture-certification',
      description: 'Created a certification program for sustainable farming practices that reduce environmental impact while maintaining productivity.',
      content: 'This innovative certification program helps farmers transition to more sustainable practices through a step-by-step implementation framework. The program includes soil health assessment, water conservation techniques, biodiversity enhancement, and reduced chemical inputs. Certified farms have shown an average 40% reduction in environmental impact while maintaining or improving crop yields.',
      featuredImage: {
        url: '/images/sample/project-3.jpg',
        alt: 'Sustainable Agriculture Certification'
      },
      category: 'Sustainable Agriculture',
      client: 'EcoHarvest Alliance',
      completedAt: '2024-07-10',
      url: 'https://example.com/techsales-training'
    },
    {
      id: 'project-4',
      title: 'Urban Reforestation Initiative',
      slug: 'urban-reforestation-initiative',
      description: 'Developed and implemented a city-wide tree planting program to combat urban heat islands and improve air quality.',
      content: 'This comprehensive urban forestry project transformed underutilized urban spaces into thriving green areas. Working with city planners, community organizations, and corporate sponsors, we planted over 5,000 native trees strategically selected for maximum carbon sequestration and biodiversity support. The initiative has reduced local temperatures by an average of 3°C during summer months and created new habitats for urban wildlife.',
      featuredImage: {
        url: '/images/sample/project-4.jpg',
        alt: 'Urban Reforestation Initiative'
      },
      category: 'Environmental Restoration',
      client: 'Metropolitan Planning Commission',
      completedAt: '2024-06-18'
    },
    {
      id: 'project-5',
      title: 'Sustainable Supply Chain Transformation',
      slug: 'sustainable-supply-chain',
      description: 'Comprehensive supply chain sustainability assessment and transformation for a multinational consumer goods company.',
      content: 'This project involved a complete analysis and redesign of the client\'s global supply chain operations to reduce environmental impact while maintaining operational efficiency. We conducted carbon footprint assessments across 12 countries, identified key intervention points, and implemented sustainable sourcing practices, packaging redesigns, and logistics optimizations. The initiative resulted in a 35% reduction in supply chain emissions and significant cost savings through reduced waste and energy consumption.',
      featuredImage: {
        url: '/images/sample/project-5.jpg',
        alt: 'Sustainable Supply Chain Transformation'
      },
      category: 'Corporate Sustainability',
      client: 'Global Consumer Goods Corp',
      completedAt: '2024-05-01',
      featured: true
    },
    {
      id: 'project-6',
      title: 'Renewable Energy Microgrid Implementation',
      slug: 'renewable-energy-microgrid',
      description: 'Designed and implemented a self-sustaining renewable energy microgrid for a remote community.',
      content: 'This innovative project established a fully independent renewable energy system combining solar arrays, wind turbines, and battery storage to provide reliable power to a previously underserved rural community. The microgrid incorporates smart distribution technology, real-time monitoring, and adaptive load management to optimize energy usage and resilience during extreme weather events. The system now provides clean, affordable electricity to over 200 households while eliminating approximately 500 tons of CO2 emissions annually.',
      featuredImage: {
        url: '/images/sample/project-6.jpg',
        alt: 'Renewable Energy Microgrid'
      },
      category: 'Renewable Energy',
      client: 'Rural Communities Alliance',
      completedAt: '2022-05-15'
    }
  ],
  socialPosts: [
    // LinkedIn posts
    {
      id: 'linkedin-1',
      platform: 'linkedin',
      title: 'Podcast Production Tips',
      excerpt: 'Just shared my top 5 podcast production tips that can transform your sound quality...',
      content: 'Just shared my top 5 podcast production tips that can transform your sound quality. The right equipment and environment make all the difference! #PodcastProduction #AudioTips',
      publishedAt: '2025-05-01T14:30:00Z',
      link: 'https://linkedin.com/in/selfcaststudios/posts/1',
      status: 'published',
      featured: true
    },
    {
      id: 'linkedin-2',
      platform: 'linkedin',
      title: 'Client Success Story',
      excerpt: 'Excited to share our latest client success story. The Business Leadership podcast...',
      content: 'Excited to share our latest client success story. The Business Leadership podcast we produced has reached 100,000 downloads in just two months! Proper production and marketing strategy pays off. #PodcastSuccess #ClientWin',
      publishedAt: '2025-04-28T10:15:00Z',
      link: 'https://linkedin.com/in/selfcaststudios/posts/2',
      status: 'published',
      featured: false
    },
    {
      id: 'linkedin-3',
      platform: 'linkedin',
      title: 'Industry Recognition',
      excerpt: 'Honored to receive the Industry Excellence Award for our podcast production services...',
      content: 'Honored to receive the Industry Excellence Award for our podcast production services this year. Thank you to all our amazing clients who trust us with their audio content. #IndustryAward #PodcastProduction',
      publishedAt: '2025-04-20T16:45:00Z',
      link: 'https://linkedin.com/in/selfcaststudios/posts/3',
      status: 'published',
      featured: false
    },
    {
      id: 'linkedin-4',
      platform: 'linkedin',
      title: 'New Studio Equipment',
      excerpt: 'Just upgraded our recording studio with state-of-the-art equipment...',
      content: 'Just upgraded our recording studio with state-of-the-art equipment! Our new soundproofing and premium microphones will take podcast quality to the next level. Book a tour to see it in person! #StudioUpgrade #RecordingEquipment',
      publishedAt: '2025-04-15T11:30:00Z',
      link: 'https://linkedin.com/in/selfcaststudios/posts/4',
      status: 'published',
      featured: false
    },
    
    // Twitter posts
    {
      id: 'twitter-1',
      platform: 'twitter',
      title: 'Quick Tip',
      excerpt: 'Quick tip for podcasters: Always record in a quiet room with soft surfaces...',
      content: 'Quick tip for podcasters: Always record in a quiet room with soft surfaces to reduce echo. Your listeners will thank you! #PodcastTips #AudioQuality',
      publishedAt: '2025-05-02T09:20:00Z',
      link: 'https://twitter.com/selfcaststudios/status/1',
      status: 'published',
      featured: true
    },
    {
      id: 'twitter-2',
      platform: 'twitter',
      title: 'New Episode Alert',
      excerpt: 'New episode of our behind-the-scenes podcast just dropped! Learn how we produce...',
      content: 'New episode of our behind-the-scenes podcast just dropped! Learn how we produce award-winning shows from start to finish. Link in bio. #BehindTheScenes #PodcastProduction',
      publishedAt: '2025-04-30T13:45:00Z',
      link: 'https://twitter.com/selfcaststudios/status/2',
      status: 'published',
      featured: false
    },
    {
      id: 'twitter-3',
      platform: 'twitter',
      title: 'Industry Event',
      excerpt: 'Heading to PodcastCon next week! Who else will be there?...',
      content: 'Heading to PodcastCon next week! Who else will be there? Let\'s connect and talk about the future of audio content. #PodcastCon2025 #Networking',
      publishedAt: '2025-04-25T08:30:00Z',
      link: 'https://twitter.com/selfcaststudios/status/3',
      status: 'published',
      featured: false
    },
    {
      id: 'twitter-4',
      platform: 'twitter',
      title: 'Poll Results',
      excerpt: 'Poll results are in! 78% of you prefer longer, in-depth podcast episodes...',
      content: 'Poll results are in! 78% of you prefer longer, in-depth podcast episodes over shorter ones. Quality content wins! Thanks for voting. #PodcastPolls #ContentStrategy',
      publishedAt: '2025-04-22T15:10:00Z',
      link: 'https://twitter.com/selfcaststudios/status/4',
      status: 'published',
      featured: false
    },
    
    // Instagram posts
    {
      id: 'instagram-1',
      platform: 'instagram',
      title: 'Studio Tour',
      excerpt: 'Take a virtual tour of our newly renovated podcast studio! Swipe to see all the...',
      content: 'Take a virtual tour of our newly renovated podcast studio! Swipe to see all the new equipment and soundproofing we\'ve installed to create the perfect recording environment. Book your session now! #StudioTour #PodcastStudio #RecordingSpace',
      publishedAt: '2025-05-03T16:00:00Z',
      link: 'https://instagram.com/p/selfcaststudios1',
      status: 'published',
      featured: true
    },
    {
      id: 'instagram-2',
      platform: 'instagram',
      title: 'Behind The Scenes',
      excerpt: 'Behind the scenes with our latest client recording their debut podcast episode...',
      content: 'Behind the scenes with our latest client recording their debut podcast episode! So exciting to help bring new voices to the podcasting world. #BehindTheScenes #NewPodcast #FirstEpisode',
      publishedAt: '2025-04-29T14:20:00Z',
      link: 'https://instagram.com/p/selfcaststudios2',
      status: 'published',
      featured: false
    },
    {
      id: 'instagram-3',
      platform: 'instagram',
      title: 'Equipment Showcase',
      excerpt: 'Our favorite microphones for different podcast styles and budgets...',
      content: 'Our favorite microphones for different podcast styles and budgets! Swipe through to see our recommendations for beginners, intermediate podcasters, and professionals. Drop a comment with questions! #MicrophoneReview #PodcastEquipment #AudioGear',
      publishedAt: '2025-04-24T11:45:00Z',
      link: 'https://instagram.com/p/selfcaststudios3',
      status: 'published',
      featured: false
    },
    {
      id: 'instagram-4',
      platform: 'instagram',
      title: 'Team Photo',
      excerpt: 'Meet Annie Sicard! I\'m passionate about...',
      content: 'Meet Annie Sicard! I\'m passionate about creating beautiful digital experiences that engage and delight users. Book a consultation with me today! #WebDesign #UXDesign #DigitalCreator',
      publishedAt: '2025-04-18T09:30:00Z',
      link: 'https://instagram.com/p/selfcaststudios4',
      status: 'published',
      featured: false
    },
    
    // Facebook posts
    {
      id: 'facebook-1',
      platform: 'facebook',
      title: 'Workshop Announcement',
      excerpt: 'Excited to announce our upcoming Podcast Launch Workshop on May 15th!...',
      content: 'Excited to announce our upcoming Podcast Launch Workshop on May 15th! Learn everything you need to know to start your podcast from concept to launch. Early bird tickets available now - link in comments! #PodcastWorkshop #LaunchYourPodcast #ContentCreation',
      publishedAt: '2025-05-04T10:00:00Z',
      link: 'https://facebook.com/selfcaststudios/posts/1',
      status: 'published',
      featured: true
    },
    {
      id: 'facebook-2',
      platform: 'facebook',
      title: 'Client Testimonial',
      excerpt: 'Sharing this wonderful testimonial from our client Sarah of The Marketing Mindset Podcast...',
      content: 'Sharing this wonderful testimonial from my client Sarah of The Marketing Mindset: "Working with Annie transformed my website from amateur to professional. The design is amazing, and her guidance on content strategy helped me grow my audience by 400% in just three months!" #ClientTestimonial #WebDesign #DigitalSuccess',
      publishedAt: '2025-04-27T15:30:00Z',
      link: 'https://facebook.com/selfcaststudios/posts/2',
      status: 'published',
      featured: false
    },
    {
      id: 'facebook-3',
      platform: 'facebook',
      title: 'Production Tips',
      excerpt: 'Check out our latest blog post: "10 Post-Production Techniques That Will Elevate Your Podcast"...',
      content: 'Check out our latest blog post: "10 Post-Production Techniques That Will Elevate Your Podcast" - learn how professional editing, sound design, and mixing can transform your show. Link in comments! #PostProduction #PodcastEditing #AudioTips',
      publishedAt: '2025-04-23T12:15:00Z',
      link: 'https://facebook.com/selfcaststudios/posts/3',
      status: 'published',
      featured: false
    },
    {
      id: 'facebook-4',
      platform: 'facebook',
      title: 'Special Offer',
      excerpt: 'Spring special! Book a podcast production package this month and get a free...',
      content: 'Spring special! Book a podcast production package this month and get a free consultation on audience growth and monetization strategies. Limited spots available - contact us today! #SpecialOffer #PodcastProduction #ContentStrategy',
      publishedAt: '2025-04-16T14:00:00Z',
      link: 'https://facebook.com/selfcaststudios/posts/4',
      status: 'published',
      featured: false
    }
  ],
  
  blogPosts: [
    {
      id: 'post-1',
      title: 'The Business Case for Carbon Neutrality',
      slug: 'business-case-carbon-neutrality',
      content: 'Many businesses view carbon offset initiatives as purely altruistic endeavors, but the reality is that sustainability can significantly improve your bottom line. From energy cost savings to enhanced brand reputation and customer loyalty, this article explores the tangible business benefits of pursuing carbon neutrality...',
      excerpt: 'Discover how carbon neutrality can benefit your business beyond environmental impact.',
      publishedAt: new Date().toISOString(),
      status: 'published',
      category: 'Carbon Offsets',
      featuredImage: { url: '/images/carbon-neutrality.jpg' }
    },
    {
      id: 'post-2',
      title: 'Renewable Energy: Myths vs. Reality',
      slug: 'renewable-energy-myths-reality',
      content: 'Despite the growing adoption of renewable energy technologies, misconceptions persist about their reliability, cost, and practicality. This article addresses the most common myths surrounding solar, wind, and other renewable energy sources, providing evidence-based perspectives on their current capabilities and limitations...',
      excerpt: 'Separating fact from fiction in the renewable energy conversation.',
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'published',
      category: 'Renewable Energy',
      featuredImage: { url: '/images/renewable-energy.jpg' }
    },
    {
      id: 'post-3',
      title: 'Building Resilient Food Systems Through Sustainable Agriculture',
      slug: 'resilient-food-systems-sustainable-agriculture',
      content: 'Climate change poses unprecedented challenges to global food security. This article explores how sustainable and regenerative agricultural practices can build resilience in our food systems while simultaneously sequestering carbon and restoring ecosystem health...',
      excerpt: 'How sustainable farming practices can ensure food security in a changing climate.',
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'published',
      category: 'Sustainable Agriculture',
      featuredImage: { url: '/images/sustainable-agriculture.jpg' }
    }
  ],
  bioCards: [
    {
      id: 'bio-1',
      title: 'About Annie Sicard',
      content: 'Annie Sicard is a professional designer and developer dedicated to helping brands, individuals, and organizations create beautiful digital experiences and tell their stories through high-quality web content. With state-of-the-art equipment and experienced professionals, we ensure your message reaches your audience with crystal clarity and maximum impact.'
    }
  ],
  quotes: [
    {
      id: 'quote-1',
      content: 'Working with Annie transformed our website from an amateur design to a professional showcase. The difference in quality was immediately noticeable to our visitors.',
      author: 'Sarah Johnson, Tech Talk Podcast'
    },
    {
      id: 'quote-2',
      content: 'Annie doesn\'t just design and develop - she collaborates with you to elevate your digital presence to new heights.',
      author: 'Michael Chen, Marketing Director'
    },
    {
      id: 'quote-3',
      content: 'My approach to podcasting focuses on authentic storytelling. I believe that genuine conversations create the most engaging and impactful content.',
      author: 'Personal Philosophy'
    }
  ],
  media: [
    {
      id: 'media-1',
      url: '/images/studio-setup.jpg',
      alt: 'Professional podcast studio setup',
      filename: 'studio-setup.jpg'
    },
    {
      id: 'media-2',
      url: '/images/profile-picture.jpg',
      alt: 'Annie Sicard profile picture',
      filename: 'profile-picture.jpg'
    }
  ],
  projects: [
    {
      id: 'project-1',
      title: 'Corporate Podcast Series',
      slug: 'corporate-podcast-series',
      description: 'A 10-episode podcast series highlighting industry leaders and innovations',
      status: 'published'
    },
    {
      id: 'project-2',
      title: 'Educational Audiobook Production',
      slug: 'educational-audiobook-production',
      description: 'Full production and mastering of educational content for university courses',
      status: 'published'
    },
    {
      id: 'project-3',
      title: 'Multi-Camera Podcast Setup',
      slug: 'multi-camera-podcast-setup',
      description: 'Custom installation of professional multi-camera studio for live streaming',
      status: 'published'
    }
  ]
};

/**
 * Fetch site data for Annie Sicard
 * This retrieves all necessary content from MongoDB via the Payload CMS API
 * Updated to support the new section-based structure
 */
export async function fetchSiteData() {
  console.log('🔍 Fetching site data from Payload CMS...');
  
  try {
    // Check API availability first
    try {
      console.log(`Testing API availability at ${API_URL}...`);
      await apiClient.get('/'); // Simple ping to check if API is available
      console.log('✅ API connection successful');
    } catch (pingError) {
      console.warn('⚠️ API ping failed, API may not be available:', pingError.message);
      console.log('🔄 Using fallback data instead of live API');
      
      // Return fallback data immediately if API is not available
      return FALLBACK_DATA;
    }
    
    // If API ping succeeded, proceed with actual data fetching
    // The siteId for Annie Sicard
    const siteId = 'annie-sicard'; 
    console.log(`🔍 Using site ID: ${siteId}`);
    
    // Fetch site data with homepage sections using populate to get all nested data
    const siteResponse = await apiClient.get(`/sites?where[projectId][equals]=${siteId}&depth=2`);
    
    const site = siteResponse.data.docs[0] || {};
    
    if (!site.id) {
      console.warn('⚠️ Site data not found or missing ID. This may cause issues with related data fetching.');
      // Provide a fallback site ID for testing or in case the API doesn't return expected data
      site.id = siteId;
    }
    
    console.log('✅ Site data fetched successfully:', { 
      title: site.title,
      id: site.id,
      hasHomepage: !!site.homepage
    });
    
    // If the site doesn't have the new homepage structure, we need to ensure backward compatibility
    if (!site.homepage) {
      console.log('ℹ️ Site using legacy structure - adding default homepage sections');
      site.homepage = FALLBACK_DATA.site.homepage;
    }
    
    // Wrap each API call in individual try/catch blocks to prevent one failure from blocking all data
    let blogPosts = [];
    try {
      const blogResponse = await apiClient.get(`/posts?where[site][equals]=${site.id}&limit=100`);
      blogPosts = blogResponse.data.docs || [];
      
      // Sort and filter for featured posts if using the new structure
      if (site.homepage?.blogPostsSection?.showFeaturedOnly) {
        blogPosts = blogPosts
          .filter(post => post.featured === true && post.status === 'published')
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      } else {
        // Default sorting by date for backward compatibility
        blogPosts = blogPosts
          .filter(post => post.status === 'published')
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      }
      
      // Limit to the number specified in the section config or default to 3
      const postsToShow = site.homepage?.blogPostsSection?.postsToShow || 3;
      blogPosts = blogPosts.slice(0, postsToShow);
      
      console.log(`✅ Blog posts fetched: ${blogPosts.length}`);
    } catch (error) {
      console.error('❌ Failed to fetch blog posts:', error);
      blogPosts = FALLBACK_DATA.blogPosts; // Use fallback blog posts
    }
    
    // For About cards using the new structure, we'll use the quote cards directly from homepage
    // but still fetch quotes for backward compatibility
    let quotes = [];
    try {
      const quotesResponse = await apiClient.get(`/quotes?where[site][equals]=${site.id}&limit=100`);
      quotes = quotesResponse.data.docs || [];
      console.log(`✅ Quotes fetched: ${quotes.length}`);
      
      // If we have the new structure but no quotes are populated, we can create them from the homepage
      if (quotes.length === 0 && site.homepage?.aboutSection) {
        const { quoteCard1, quoteCard2, quoteCard3 } = site.homepage.aboutSection;
        if (quoteCard1?.content) {
          quotes.push({
            id: 'quote-1',
            content: quoteCard1.content,
            author: quoteCard1.author || 'Annie Sicard'
          });
        }
        if (quoteCard2?.content) {
          quotes.push({
            id: 'quote-2',
            content: quoteCard2.content,
            author: quoteCard2.author || 'Annie Sicard'
          });
        }
        if (quoteCard3?.content) {
          quotes.push({
            id: 'quote-3',
            content: quoteCard3.content,
            author: quoteCard3.author || 'Annie Sicard'
          });
        }
      }
    } catch (error) {
      console.error('❌ Failed to fetch quotes:', error);
      quotes = FALLBACK_DATA.quotes || []; // Use fallback quotes
    }
    
    // For backward compatibility, fetch bio cards separately
    let bioCards = [];
    try {
      const bioResponse = await apiClient.get(`/bio-cards?where[site][equals]=${site.id}&limit=100`);
      bioCards = bioResponse.data.docs || [];
      console.log(`✅ Bio cards fetched: ${bioCards.length}`);
    } catch (error) {
      console.error('❌ Failed to fetch bio cards:', error);
      bioCards = FALLBACK_DATA.bioCards || []; // Use fallback bio cards
    }
    
    // Fetch social posts, filtering by the platforms in the new structure if available
    let socialPosts = [];
    try {
      const socialResponse = await apiClient.get(`/social-posts?where[site][equals]=${site.id}&limit=100`);
      socialPosts = socialResponse.data.docs || [];
      
      // If we have the new structure, filter by the platforms selected
      if (site.homepage?.socialMediaSection?.platformsToShow?.length > 0) {
        const platforms = site.homepage.socialMediaSection.platformsToShow;
        socialPosts = socialPosts.filter(post => 
          platforms.includes(post.platform?.toLowerCase())
        );
      }
      
      console.log(`✅ Social posts fetched: ${socialPosts.length}`);
    } catch (error) {
      console.error('❌ Failed to fetch social posts:', error);
      socialPosts = FALLBACK_DATA.socialPosts || []; // Use fallback social posts
    }
    
    // Fetch media for profile pictures and banners
    let media = [];
    try {
      const mediaResponse = await apiClient.get(`/media?where[site][equals]=${site.id}&limit=100`);
      media = mediaResponse.data.docs || [];
      console.log(`✅ Media items fetched: ${media.length}`);
      
      // For the new structure, if we have specific profile image or banner image IDs,
      // we can ensure they're properly linked
      if (site.homepage?.heroSection?.profileImage && typeof site.homepage.heroSection.profileImage === 'string') {
        const profileImageId = site.homepage.heroSection.profileImage;
        const profileImage = media.find(item => item.id === profileImageId);
        if (profileImage) {
          site.homepage.heroSection.profileImage = profileImage;
        }
      }
      
      if (site.homepage?.banner1?.bannerImage && typeof site.homepage.banner1.bannerImage === 'string') {
        const banner1Id = site.homepage.banner1.bannerImage;
        const banner1Image = media.find(item => item.id === banner1Id);
        if (banner1Image) {
          site.homepage.banner1.bannerImage = banner1Image;
        }
      }
      
      if (site.homepage?.banner2?.bannerImage && typeof site.homepage.banner2.bannerImage === 'string') {
        const banner2Id = site.homepage.banner2.bannerImage;
        const banner2Image = media.find(item => item.id === banner2Id);
        if (banner2Image) {
          site.homepage.banner2.bannerImage = banner2Image;
        }
      }
    } catch (error) {
      console.error('❌ Failed to fetch media:', error);
      media = FALLBACK_DATA.media || []; // Use fallback media
    }
    
    // For backward compatibility, still fetch projects
    let projects = [];
    try {
      const projectsResponse = await apiClient.get(`/projects?where[site][equals]=${site.id}&limit=100`);
      projects = projectsResponse.data.docs || [];
      console.log(`✅ Projects fetched: ${projects.length}`);
    } catch (error) {
      console.error('❌ Failed to fetch projects:', error);
      projects = FALLBACK_DATA.sampleProjects || []; // Use fallback projects
    }
    
    // Return the compiled data
    const compiledData = {
      site,
      blogPosts,
      bioCards,
      quotes,
      socialPosts,
      media,
      projects
    };
    
    console.log('🎉 All site data fetched successfully');
    return compiledData;
    
  } catch (error) {
    console.error('❌ Error fetching site data:', error);
    console.log('🔄 Using fallback data due to API error');
    
    // Return fallback data so the site can still render
    return FALLBACK_DATA;
  }
}

/**
 * Fetch a specific blog post by slug
 */
export async function fetchBlogPost(slug) {
  console.log(`🔍 Fetching blog post with slug: ${slug}`);
  
  try {
    // Check if API is available
    try {
      await apiClient.get('/'); // Simple ping
    } catch (pingError) {
      console.warn('⚠️ API ping failed, API may not be available');
      
      // Return fallback blog post
      const fallbackPost = FALLBACK_DATA.blogPosts.find(post => post.slug === slug);
      if (fallbackPost) {
        return fallbackPost;
      }
      return null;
    }
    
    // If API is available, fetch the post
    const response = await apiClient.get(`/posts?where[slug][equals]=${slug}`);
    const post = response.data.docs[0];
    
    if (!post) {
      console.warn(`⚠️ Blog post with slug "${slug}" not found`);
      return null;
    }
    
    console.log('✅ Blog post fetched successfully:', { 
      title: post.title,
      id: post.id
    });
    
    return post;
  } catch (error) {
    console.error(`❌ Error fetching blog post with slug "${slug}":`, error);
    
    // Check fallback data for a matching post
    const fallbackPost = FALLBACK_DATA.blogPosts.find(post => post.slug === slug);
    if (fallbackPost) {
      console.log('🔄 Using fallback blog post data');
      return fallbackPost;
    }
    
    return null;
  }
}

/**
 * Send contact form data to Messages collection
 */
export async function submitContactForm(formData) {
  console.log('📤 Submitting contact form:', formData);
  
  try {
    // Check if API is available
    try {
      await apiClient.get('/'); // Simple ping
    } catch (pingError) {
      console.warn('⚠️ API ping failed, API may not be available');
      throw new Error('API is not available. Please try again later.');
    }
    
    // Submit to the Messages collection
    const response = await apiClient.post('/messages', formData);
    console.log('✅ Contact form submitted successfully:', response.data);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('❌ Error submitting contact form:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'An unknown error occurred'
    };
  }
}
