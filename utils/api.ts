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
          url: 'https://imagestopost.carrd.co/assets/images/image07.jpg?v=911794d3',
          alt: 'Annie Sicard - Environmental Sustainability Advocate'
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
      title: 'Carbon Offset Strategies for Businesses',
      excerpt: 'Just shared my top 5 carbon offset strategies that can transform your business sustainability...',
      content: 'Just shared my top 5 carbon offset strategies that can transform your business sustainability. The right approach and implementation make all the difference! From renewable energy credits to verified carbon standard projects, these strategies can help companies of all sizes reduce their environmental impact while improving their bottom line. #CarbonNeutrality #SustainableBusiness #ClimateAction',
      publishedAt: '2025-05-01T14:30:00Z',
      link: 'https://linkedin.com/in/anniesicard/posts/1',
      status: 'published',
      featured: true
    },
    {
      id: 'linkedin-2',
      platform: 'linkedin',
      title: 'Corporate Sustainability Success Story',
      excerpt: 'Excited to share our latest client success story. Their carbon neutrality program has...',
      content: 'Excited to share our latest client success story. Their carbon neutrality program has reduced emissions by 45% in just one year while generating significant cost savings through energy efficiency. This demonstrates how sustainability and profitability can go hand in hand when properly implemented. #SustainabilitySuccess #GreenBusiness #CarbonReduction',
      publishedAt: '2025-04-28T10:15:00Z',
      link: 'https://linkedin.com/in/anniesicard/posts/2',
      status: 'published',
      featured: false
    },
    {
      id: 'linkedin-3',
      platform: 'linkedin',
      title: 'Sustainability Leadership Award',
      excerpt: 'Honored to receive the Sustainability Leadership Award for our environmental impact assessment tools...',
      content: 'Honored to receive the Sustainability Leadership Award for our innovative environmental impact assessment tools. These tools have helped dozens of organizations measure, track, and reduce their carbon footprint with unprecedented accuracy. Thank you to all our amazing clients who trust us with their sustainability journeys. #SustainabilityAward #EnvironmentalLeadership #GreenInnovation',
      publishedAt: '2025-04-20T16:45:00Z',
      link: 'https://linkedin.com/in/anniesicard/posts/3',
      status: 'published',
      featured: false
    },
    {
      id: 'linkedin-4',
      platform: 'linkedin',
      title: 'New Renewable Energy Project Launch',
      excerpt: 'Just launched our newest community solar project with an innovative financing model...',
      content: 'Just launched our newest community solar project with an innovative financing model that makes renewable energy accessible to low-income communities! This 2.5MW installation will provide clean energy to over 400 households while creating local jobs and reducing carbon emissions by approximately 2,000 tons annually. #RenewableEnergy #CommunitySolar #CleanEnergyTransition',
      publishedAt: '2025-04-15T11:30:00Z',
      link: 'https://linkedin.com/in/anniesicard/posts/4',
      status: 'published',
      featured: false
    },
    
    // Twitter posts
    {
      id: 'twitter-1',
      platform: 'twitter',
      title: 'Quick Sustainability Tip',
      excerpt: 'Quick tip for businesses: Conduct an energy audit to identify quick wins for reducing carbon footprint...',
      content: 'Quick tip for businesses: Conduct an energy audit to identify quick wins for reducing carbon footprint. Simple changes like LED lighting and smart thermostats can reduce emissions AND save money! #SustainabilityTip #GreenBusiness #CarbonFootprint',
      publishedAt: '2025-05-02T09:20:00Z',
      link: 'https://twitter.com/anniesicard/status/1',
      status: 'published',
      featured: true
    },
    {
      id: 'twitter-2',
      platform: 'twitter',
      title: 'New Research Publication',
      excerpt: 'Just published our latest white paper on the economic benefits of sustainable business practices...',
      content: 'Just published our latest white paper on the economic benefits of sustainable business practices! Our research shows that companies with strong ESG performance outperform peers by an average of 11% over five years. Download the full report from our website. #SustainabilityResearch #GreenEconomy #ClimateAction',
      publishedAt: '2025-04-30T13:45:00Z',
      link: 'https://twitter.com/anniesicard/status/2',
      status: 'published',
      featured: false
    },
    {
      id: 'twitter-3',
      platform: 'twitter',
      title: 'Sustainability Conference',
      excerpt: 'Heading to the Global Climate Action Summit next week! Who else will be there?...',
      content: 'Heading to the Global Climate Action Summit next week! I will be speaking on innovative financing models for community renewable energy projects. Who else will be there? Let\'s connect and discuss collaborative approaches to climate challenges. #ClimateConference #SustainabilityEvent #GreenNetworking',
      publishedAt: '2025-04-25T08:30:00Z',
      link: 'https://twitter.com/anniesicard/status/3',
      status: 'published',
      featured: false
    },
    {
      id: 'twitter-4',
      platform: 'twitter',
      title: 'Sustainability Survey Results',
      excerpt: 'Survey results are in! 82% of businesses see sustainability as a competitive advantage...',
      content: 'Survey results are in! 82% of businesses now see sustainability as a competitive advantage rather than just a compliance issue. The shift from "nice to have" to "must have" is happening across industries. Thanks to all who participated in our research. #SustainabilityTrends #GreenBusinessStats #ClimateAction',
      publishedAt: '2025-04-22T15:10:00Z',
      link: 'https://twitter.com/anniesicard/status/4',
      status: 'published',
      featured: false
    },
    
    // Instagram posts
    {
      id: 'instagram-1',
      platform: 'instagram',
      title: 'Renewable Energy Site Tour',
      excerpt: 'Take a virtual tour of our newest community solar installation! Swipe to see all the...',
      content: 'Take a virtual tour of our newest community solar installation! Swipe to see the 2.5MW solar array, battery storage system, and community education center we\'ve built. This project will provide clean energy to over 400 households and reduce carbon emissions by approximately 2,000 tons annually. #RenewableEnergy #SolarPower #CleanEnergyTransition',
      publishedAt: '2025-05-03T16:00:00Z',
      link: 'https://instagram.com/p/anniesicard1',
      status: 'published',
      featured: true
    },
    {
      id: 'instagram-2',
      platform: 'instagram',
      title: 'Behind The Scenes: Sustainable Agriculture',
      excerpt: 'Behind the scenes at River Valley Farm as they implement regenerative agriculture practices...',
      content: 'Behind the scenes at River Valley Farm as they implement regenerative agriculture practices! Their transition to no-till farming, cover crops, and rotational grazing has increased soil carbon sequestration by 40% while improving crop yields. So exciting to see these sustainable methods in action. #RegenerativeAgriculture #SustainableFarming #ClimateAction',
      publishedAt: '2025-04-29T14:20:00Z',
      link: 'https://instagram.com/p/anniesicard2',
      status: 'published',
      featured: false
    },
    {
      id: 'instagram-3',
      platform: 'instagram',
      title: 'Green Technology Showcase',
      excerpt: 'Our favorite green technologies for environmental monitoring and carbon reduction...',
      content: 'Our favorite green technologies for environmental monitoring and carbon reduction! Swipe through to see cutting-edge solutions for businesses of all sizes - from AI-powered energy optimization systems to affordable carbon accounting software. Drop a comment with questions about implementing these in your organization! #GreenTech #CleanTech #SustainableInnovation',
      publishedAt: '2025-04-24T11:45:00Z',
      link: 'https://instagram.com/p/anniesicard3',
      status: 'published',
      featured: false
    },
    {
      id: 'instagram-4',
      platform: 'instagram',
      title: 'Field Research Team',
      excerpt: 'Meet our field research team! We\'re passionate about gathering accurate environmental data...',
      content: 'Meet our field research team! We\'re passionate about gathering accurate environmental data to inform sustainability decisions. Here we are conducting soil carbon measurements at one of our agricultural research sites. The data we collect helps farmers optimize their practices for both productivity and carbon sequestration. #EnvironmentalScience #Sustainability #FieldResearch',
      publishedAt: '2025-04-18T09:30:00Z',
      link: 'https://instagram.com/p/anniesicard4',
      status: 'published',
      featured: false
    },
    
    // Facebook posts
    {
      id: 'facebook-1',
      platform: 'facebook',
      title: 'Sustainability Workshop Announcement',
      excerpt: 'Excited to announce our upcoming Carbon Neutrality Workshop for Businesses on May 15th!...',
      content: 'Excited to announce our upcoming Carbon Neutrality Workshop for Businesses on May 15th! Learn practical strategies to measure, reduce, and offset your organization\'s carbon footprint. This hands-on session will provide actionable steps for businesses of all sizes. Early bird registration available now - link in comments! #SustainabilityWorkshop #CarbonNeutral #GreenBusiness',
      publishedAt: '2025-05-04T10:00:00Z',
      link: 'https://facebook.com/anniesicard/posts/1',
      status: 'published',
      featured: true
    },
    {
      id: 'facebook-2',
      platform: 'facebook',
      title: 'Client Sustainability Transformation',
      excerpt: 'Sharing this wonderful testimonial from our client EcoTech Manufacturing about their sustainability journey...',
      content: 'Sharing this wonderful testimonial from our client EcoTech Manufacturing: "Working with Annie transformed our approach to sustainability. Her comprehensive assessment identified opportunities we had missed, and her implementation strategy helped us reduce our carbon footprint by 35% while generating significant energy cost savings. The ROI on our sustainability investments exceeded our expectations within the first year!" #ClientTestimonial #SustainabilitySuccess #GreenTransformation',
      publishedAt: '2025-04-27T15:30:00Z',
      link: 'https://facebook.com/anniesicard/posts/2',
      status: 'published',
      featured: false
    },
    {
      id: 'facebook-3',
      platform: 'facebook',
      title: 'Sustainable Business Practices',
      excerpt: 'Check out our latest blog post: "10 Sustainable Business Practices That Will Reduce Your Environmental Impact"...',
      content: 'Check out our latest blog post: "10 Sustainable Business Practices That Will Reduce Your Environmental Impact" - learn how simple operational changes, supply chain optimizations, and employee engagement can transform your organization\'s sustainability profile. These practical strategies can be implemented by businesses of any size. Link in comments! #SustainableBusiness #GreenPractices #EnvironmentalLeadership',
      publishedAt: '2025-04-23T12:15:00Z',
      link: 'https://facebook.com/anniesicard/posts/3',
      status: 'published',
      featured: false
    },
    {
      id: 'facebook-4',
      platform: 'facebook',
      title: 'Sustainability Assessment Offer',
      excerpt: 'Spring special! Book a comprehensive sustainability assessment this month and get a free...',
      content: 'Spring special! Book a comprehensive sustainability assessment this month and get a free carbon reduction strategy session. Our assessment includes energy usage analysis, waste audit, supply chain evaluation, and detailed recommendations with ROI calculations. Limited spots available - contact us today to start your sustainability journey! #SustainabilityAssessment #GreenBusiness #EnvironmentalConsulting',
      publishedAt: '2025-04-16T14:00:00Z',
      link: 'https://facebook.com/anniesicard/posts/4',
      status: 'published',
      featured: false
    }
  ],
  
  blogPosts: [
    {
      id: 'post-1',
      title: 'CWNYC25: Why the Voluntary Carbon Market Must Hold the Line Until Policy Returns',
      slug: 'voluntary-carbon-market-climate-week-nyc-2025',
      content: `Introduction

One headline from Climate Week NYC 2025 caught my attention: a U.S. lawmaker argued that the voluntary carbon market must step up to drive carbon removal in the U.S. until the political pendulum swings back.

It's a reminder of something I've seen time and again: when policy falters, markets often become the bridge. And while the voluntary carbon market is far from perfect, its role in sustaining momentum for carbon removal is becoming harder to ignore.


The Current Landscape

Here's the reality the Congressman was pointing to:

U.S. climate policy is uneven, shifting with political winds. That leaves carbon removal projects exposed to funding gaps and uncertainty.

The voluntary carbon market (VCM), though historically seen as a complement to regulation, is increasingly the front line for financing carbon removal.

Legal and financial experts at CWNYC highlighted that treating carbon credits as environmental commodities—tradeable, transparent, and finance-ready—could make them more scalable.

Quality remains the challenge: the VCM has been criticized for inconsistent standards, uneven verification, and credibility gaps.

So the question isn't whether the voluntary market can replace policy—it can't—but whether it can keep carbon removal moving forward during political swings.


My Thoughts

It's understood that voluntary markets are not a cure-all. But it is as a practical lever to keep ambition alive in moments when politics slows us down.

Critics are right: there are plenty of credits that lack integrity, permanence, or transparency. But I've also seen the upside when companies invest in high-quality, removal-based projects that deliver co-benefits—restored forests, healthier soils, stronger rural economies. That's where the voluntary market can shine.

For me, the bigger takeaway is this: climate progress isn't linear. Policy support will ebb and flow. What matters is having systems—markets, incentives, corporate commitments—that don't stall every time politics does.


Practical Pathways

For organizations navigating this space, a few priorities stand out:

1. Focus on integrity, not volume
Invest in projects with strong MRV (measurement, reporting, verification), permanence, and co-benefits. Avoid the temptation of cheap credits.

2. Support infrastructure improvements
Engage with efforts to standardize and "commoditize" credits—because credible, transparent credits will help the VCM mature.

3. Treat removals as part of the hierarchy
Remember the emissions reduction hierarchy: avoid → reduce → substitute → offset. Voluntary removal credits should complement, not replace, deep internal decarbonization.

4. Build resilience into strategy
Don't tie your climate commitments to political cycles. Use voluntary markets to keep progress steady, even when policy is uncertain.


Conclusion & Takeaway

The message from CWNYC25 was clear: the voluntary carbon market can't be a sideline player anymore. Until U.S. policy regains momentum, it must be robust enough to carry carbon removal forward.

For companies, this is a call to act with discernment—supporting high-quality projects, helping strengthen market standards, and making sure that voluntary action doesn't become a placeholder, but a bridge to stronger policy in the future.


SEO FAQs

Q1: Why is the voluntary carbon market important right now?
Because it can fund carbon removal projects even when U.S. policy support weakens, keeping climate ambition on track.

Q2: What makes a carbon credit "high quality"?
Strong verification, permanence, transparency, and co-benefits like biodiversity and community resilience.

Q3: How should companies use voluntary carbon credits?
As a complement to internal emissions reductions—especially for Scope 3—while ensuring credits are part of a long-term net zero pathway.`,
      excerpt: 'At Climate Week NYC, a lawmaker urged the voluntary carbon market to carry U.S. climate ambition until political support for carbon removal returns.',
      publishedAt: '2025-05-15T10:00:00Z',
      status: 'published',
      category: 'Carbon Markets',
      author: 'Annie Sicard',
      featuredImage: { 
        url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80',
        alt: 'New York City skyline during Climate Week'
      }
    },
    {
      id: 'post-2',
      title: 'Farmer-Led Carbon Reduction: Transforming Rural Livelihoods in Zambia',
      slug: 'farmer-led-carbon-reduction-zambia',
      content: `Introduction

When we talk about climate action, it's easy to picture global pledges and corporate strategies. But some of the most inspiring solutions are happening far from conference halls. In Zambia, a farmer-led carbon reduction project is showing how community leadership can restore ecosystems, reduce emissions, and build stronger rural livelihoods—all at the same time. By 2030, it's expected to remove 2 million tonnes of CO₂ each year while supporting 240,000 Zambians.


Who's Behind the Project?

This effort, called the Ecopreneur Movement – Miombo Woodland Restoration Project, was developed by Community Climate Solutions (CCS) and brought to market by Climate Impact Partners. But the real drivers are the farmers themselves.

Local farmers, trained as "Ecopreneurs," are:

Restoring degraded Miombo Woodlands, one of Southern Africa's most important carbon sinks.

Practicing sustainable farming techniques that keep soils healthy and productive.

Working together on fire prevention to protect land, homes, and biodiversity.

The beauty of this model is that it's not charity—it's a partnership. Farmers benefit directly, both financially and environmentally, while leading the restoration work themselves.


Why This Matters

The Miombo Woodlands stretch across much of Southern Africa, supporting millions of people and countless species. But decades of deforestation, overgrazing, and uncontrolled fires have taken a toll. That's why this project stands out:

Carbon impact: Removing up to 2 million tonnes of CO₂ annually by 2030.

Economic resilience: Farmers gain new income from climate finance and more stable harvests.

Biodiversity benefits: Woodlands shelter wildlife, improve water cycles, and protect soils.

Community scale: With 240,000 participants, this isn't a small pilot—it's a movement.


My Thoughts

What excites me most is that farmers are in the driver's seat. Too often, carbon projects are designed elsewhere and dropped into communities. Here, the knowledge, leadership, and benefits stay local.

I've seen how skepticism around carbon markets can be valid—especially when offsets are used as a shortcut instead of a complement to real reductions. But this project is different. It's not just about credits; it's about restoring ecosystems and livelihoods at the same time. In my view, this is the type of climate finance we need more of: practical, impactful, and achievable.


Practical Pathways

So what can businesses learn from Zambia's Ecopreneur Movement? A few takeaways stand out:

1. Look for co-benefits, not just credits
The strongest projects cut emissions while also building resilience for people and ecosystems.

2. Put farmers at the center
In agriculture and forestry supply chains, those closest to the land often have the most effective solutions.

3. Use projects to tackle Scope 3
With Scope 3 emissions making up about 70% of corporate footprints, partnerships like this can reduce value chain risk while delivering measurable social impact.

4. Think long-term
Short-term offsets can be volatile. Supporting regenerative, community-led projects builds trust and lasting returns.


Conclusion & Takeaway

The Zambia Ecopreneur Movement is more than a carbon project—it's a story about what happens when climate solutions grow from the ground up. By combining woodland restoration, farmer leadership, and climate finance, it's proving that sustainability can transform both landscapes and livelihoods.

For companies exploring carbon neutrality pathways, Scope 3 strategies, or regenerative agriculture investments, this is the kind of blueprint worth paying attention to—and scaling.


SEO FAQs

Q1: How does the Zambia carbon reduction project work?
Farmers restore Miombo Woodlands by planting trees, improving soil health, and preventing fires. Their work generates verified carbon credits and strengthens rural economies.

Q2: What makes farmer-led carbon projects effective?
They embed local knowledge, create shared economic benefits, and deliver both climate and community outcomes, making them more durable than top-down approaches.

Q3: How can companies support Scope 3 reductions through projects like this?
By investing in farmer-led carbon initiatives, companies can reduce value chain emissions while also delivering social and biodiversity benefits.`,
      excerpt: 'A farmer-led carbon project in Zambia is restoring woodlands, removing 2M tonnes CO₂ annually, and improving 240,000 rural livelihoods.',
      publishedAt: '2025-04-28T14:30:00Z',
      status: 'published',
      category: 'Regenerative Agriculture',
      author: 'Annie Sicard',
      featuredImage: { 
        url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
        alt: 'Farmers planting trees in African woodland restoration project'
      }
    },
    {
      id: 'post-3',
      title: 'Update from Climate Week NYC: AI\'s Emissions Effect',
      slug: 'ai-emissions-climate-week-nyc',
      content: `Introduction

One question kept surfacing at Climate Week NYC: Will artificial intelligence derail corporate emissions strategies—or help accelerate them? It's a fair concern. With AI fueling massive data center expansion, the energy demands are real. But what I heard this week suggests the story isn't so simple.


Who's Weighing In

At a panel discussion, Josh Parker, NVIDIA's head of sustainability, made a bold claim: AI might actually reduce emissions by helping modernize the grid.

"AI is helping us integrate renewables and batteries," he explained. "It can smooth out bottlenecks, making electrification more efficient."

That's a striking perspective, given NVIDIA's outsized role in the AI ecosystem. Its chips are the backbone of cloud providers like Amazon Web Services, Google, and Microsoft—and the company just announced a $100 billion investment to accelerate OpenAI's infrastructure buildout.

Still, NVIDIA is at the beginning of its own climate journey. It only validated its first science-based targets in 2025, and new partnerships, including one with Intel, will be critical to making progress.


Why This Matters

AI is often painted as either the climate villain or the silver bullet. The truth, as usual, is in the middle:

Data centers are energy-intensive. If powered by fossil-heavy grids, emissions rise.

AI enables optimization. From grid management to precision agriculture, AI can unlock efficiency gains.

Corporate strategies are evolving. With Scope 2 and Scope 3 emissions under pressure, companies can't ignore AI's footprint—or its potential.

In short: AI is reshaping the energy system, and companies need to understand both its risks and its opportunities.


My Thoughts

I think the wrong question is, "Will AI break my climate strategy?" The better one is, "How do I design a climate strategy that accounts for AI?"

From what I've seen, AI is like any other disruptive technology: it magnifies both the good and the bad. If you're powering AI with fossil fuels, you've just scaled up your emissions problem. If you're integrating AI with renewables, microgrids, and smart electrification, you may actually accelerate your pathway to net zero.

What excites me most are the possibilities for supply chain visibility and Scope 3 management. Imagine using AI to model emissions in real time across thousands of suppliers—or to identify the fastest, lowest-cost decarbonization levers. That's the kind of impact that goes beyond the hype.


Practical Pathways

Here's how I'd advise companies thinking about AI and sustainability:

1. Map AI into your Scope 2 footprint
If you're expanding digital workloads, make sure you know where the energy is coming from and how to secure renewable energy.

2. Use AI for emissions intelligence
Deploy AI tools to track Scope 3 emissions, optimize logistics, and identify hotspots faster than traditional methods.

3. Demand climate leadership from tech partners
Cloud providers and chip makers are part of your footprint. Choose partners with credible, science-based targets.

4. Keep AI in the bigger picture
Remember Parker's point: AI isn't the only load factor. Electrification of vehicles and industrial systems may reshape your footprint even more dramatically.


Conclusion & Takeaway

The conversation at Climate Week NYC reminded me: AI is neither the problem nor the solution—it's a tool. Whether it accelerates or hinders progress depends entirely on the energy systems we build and the strategies we design.

For sustainability leaders, the task is clear: account for AI's footprint, leverage its optimization power, and demand transparency from tech providers. Done right, AI could be one of the most practical accelerators of corporate climate strategies.


SEO FAQs

Q1: Does AI increase corporate emissions?
AI workloads are energy-intensive, but the impact depends on whether data centers are powered by renewable or fossil-heavy grids.

Q2: How can AI help reduce emissions?
AI can optimize grid operations, improve energy efficiency, and enhance supply chain emissions tracking, making corporate decarbonization strategies more effective.

Q3: What should companies do about AI in their net zero plans?
Companies should integrate AI into Scope 2 and Scope 3 planning, demand renewable energy commitments from tech providers, and use AI tools for emissions intelligence.`,
      excerpt: 'AI is reshaping energy use and emissions. At Climate Week NYC, leaders explored whether AI will break—or accelerate—corporate climate strategies.',
      publishedAt: '2025-05-10T09:15:00Z',
      status: 'published',
      category: 'Technology & Climate',
      author: 'Annie Sicard',
      featuredImage: { 
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
        alt: 'Earth at night showing city lights and energy consumption from space'
      }
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
