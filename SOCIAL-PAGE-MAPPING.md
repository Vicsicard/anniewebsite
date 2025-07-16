# Social Media Hub Mapping

This document provides a mapping between the Self Cast Studios website Social Media Hub components, Payload CMS admin fields, and MongoDB storage structure. This will help ensure that content editors have a clear understanding of how their edits in the CMS admin interface affect the website.

## Main Social Page Mapping

| Website Component | CMS Admin Field | MongoDB Field | Description |
|------------------|-----------------|---------------|-------------|
| **Page Header** |  |  | |
| Title | Site → Social → Title | site.social.title | The main page title ("Social Media Hub") |
| Navigation Label | Site → Social → Nav Label | site.social.navLabel | Custom label shown in the navigation menu (default: "Social") |
| Description | Site → Social → Description | site.social.description | The description text below the title |
| **Platform Grid** |  |  | |
| LinkedIn Card | Site → Social → LinkedInCard → Visible | site.social.linkedInCard.visible | Toggle to show/hide LinkedIn card |
| Twitter Card | Site → Social → TwitterCard → Visible | site.social.twitterCard.visible | Toggle to show/hide Twitter card |
| Instagram Card | Site → Social → InstagramCard → Visible | site.social.instagramCard.visible | Toggle to show/hide Instagram card |
| Facebook Card | Site → Social → FacebookCard → Visible | site.social.facebookCard.visible | Toggle to show/hide Facebook card |
| Card Style | Site → Social → CardStyle | site.social.cardStyle | Visual style for platform cards ("standard", "minimal", "bordered") |
| **Platform Profile Links** |  |  | |
| LinkedIn Profile | Site → Social → Profiles → LinkedIn | site.social.profiles.linkedin | LinkedIn profile URL |
| Twitter Profile | Site → Social → Profiles → Twitter | site.social.profiles.twitter | Twitter profile URL |
| Instagram Profile | Site → Social → Profiles → Instagram | site.social.profiles.instagram | Instagram profile URL |
| Facebook Profile | Site → Social → Profiles → Facebook | site.social.profiles.facebook | Facebook profile URL |
| **Call to Action** |  |  | |
| CTA Visibility | Site → Social → ShowCTA | site.social.showCTA | Toggle to show/hide call-to-action section |
| CTA Heading | Site → Social → CTAHeading | site.social.ctaHeading | Heading for the call-to-action section |
| CTA Text | Site → Social → CTAText | site.social.ctaText | Text content for the call-to-action |
| CTA Button Text | Site → Social → CTAButtonText | site.social.ctaButtonText | Text for the call-to-action button |
| CTA Button URL | Site → Social → CTAButtonURL | site.social.ctaButtonURL | URL for the call-to-action button |

## Platform-Specific Page Mapping

| Website Component | CMS Admin Field | MongoDB Field | Description |
|------------------|-----------------|---------------|-------------|
| **Page Header** |  |  | |
| LinkedIn Title | Site → Social → LinkedIn → Title | site.social.linkedin.title | Title for LinkedIn page ("My LinkedIn Posts") |
| Twitter Title | Site → Social → Twitter → Title | site.social.twitter.title | Title for Twitter page ("My Twitter Feed") |
| Instagram Title | Site → Social → Instagram → Title | site.social.instagram.title | Title for Instagram page ("My Instagram Feed") |
| Facebook Title | Site → Social → Facebook → Title | site.social.facebook.title | Title for Facebook page ("My Facebook Posts") |
| **Platform Follow Section** |  |  | |
| LinkedIn Button Text | Site → Social → LinkedIn → FollowButtonText | site.social.linkedin.followButtonText | Text for LinkedIn follow button |
| Twitter Button Text | Site → Social → Twitter → FollowButtonText | site.social.twitter.followButtonText | Text for Twitter follow button |
| Instagram Button Text | Site → Social → Instagram → FollowButtonText | site.social.instagram.followButtonText | Text for Instagram follow button |
| Facebook Button Text | Site → Social → Facebook → FollowButtonText | site.social.facebook.followButtonText | Text for Facebook follow button |
| **Recent Posts Grid** |  |  | |
| Posts Per Page | Site → Social → PostsPerPage | site.social.postsPerPage | Number of posts to show in recent posts grid |
| Show Pagination | Site → Social → ShowPagination | site.social.showPagination | Toggle to show/hide pagination controls |

## Social Posts Items

| Post Component | CMS Admin Field | MongoDB Field | Description |
|----------------|-----------------|---------------|-------------|
| Title | Social Posts → Title | socialPosts[].title | Post title |
| Excerpt | Social Posts → Excerpt | socialPosts[].excerpt | Short excerpt shown on cards |
| Content | Social Posts → Content | socialPosts[].content | Full post content shown on platform page |
| Platform | Social Posts → Platform | socialPosts[].platform | Platform type ("linkedin", "twitter", "instagram", "facebook") |
| Published Date | Social Posts → PublishedAt | socialPosts[].publishedAt | Date when the post was published |
| Original Link | Social Posts → Link | socialPosts[].link | URL to the original post on the platform |
| Image | Social Posts → Image | socialPosts[].image | Image associated with the post |
| Status | Social Posts → Status | socialPosts[].status | Status of the post ("draft", "published") |
| Featured | Social Posts → Featured | socialPosts[].featured | Flag to mark post as featured on main social page |

## Implementation Notes

1. The social page is designed to showcase content from various social media platforms in a unified feed.
2. Platform filtering allows visitors to focus on content from specific networks.
3. Each social post displays the original platform, date, content, and provides a link to the original post.
4. The layout is responsive and adapts to different screen sizes.

## Current Implementation Status

1. Basic social feed structure is implemented with platform filtering
2. Posts are displayed in a grid with platform-specific styling
3. Responsive design for mobile and desktop viewing

## Proposed Enhancements

1. **Custom Platform Colors**: Allow content editors to customize colors for each platform
2. **Auto-Import Integration**: Add ability to automatically import posts from connected social accounts
3. **Post Embedding**: Support for embedded social media posts with their native formatting
4. **Analytics Integration**: Add view counts and engagement metrics for social posts
5. **Content Scheduling**: Allow scheduling of posts for future publication

## Requirements for Full CMS Implementation

1. Complete Social section in the Sites collection schema
2. Ensure Social Posts collection exists with all necessary fields
3. Update API utility to handle the Social section and provide fallback data
4. Enhance the social.tsx file to fully consume data from the CMS structure
