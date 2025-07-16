# Blog Page Mapping

This document provides a mapping between the Self Cast Studios website Blog page UI components, Payload CMS admin fields, and MongoDB storage structure. This will help ensure that content editors have a clear understanding of how their edits in the CMS admin interface affect the website.

## Blog Page Section Mapping

| Website Component | CMS Admin Field | MongoDB Field | Description |
|------------------|-----------------|---------------|-------------|
| **Page Header** |  |  | |
| Title | Site → Blog → Title | site.blog.title | The main page title ("Blog") |
| Description | Site → Blog → Description | site.blog.description | The description text below the title |
| **Search Functionality** |  |  | |
| Search Bar | Site → Blog → Show Search | site.blog.showSearch | Toggle to show/hide the search bar |
| **Featured Post Section** |  |  | |
| Visibility | Site → Blog → Featured Post → Visible | site.blog.featuredPost.visible | Toggle to show/hide the featured post section |
| Selection Type | Site → Blog → Featured Post → Selection Type | site.blog.featuredPost.selectionType | Method to select featured post ("recent", "manual") |
| Manual Selection | Site → Blog → Featured Post → Post ID | site.blog.featuredPost.postId | ID of manually selected featured post (if applicable) |
| **Blog List Section** |  |  | |
| Posts Per Page | Site → Blog → Posts Per Page | site.blog.postsPerPage | Number of posts to display per page (default: 6) |
| Grid Layout | Site → Blog → Grid Layout | site.blog.gridLayout | Layout type for blog list ("grid-2", "grid-3", "list") |
| **Pagination** |  |  | |
| Show Pagination | Site → Blog → Show Pagination | site.blog.showPagination | Toggle to show/hide pagination controls |
| **Blog Posts** |  |  | |
| Title | Posts → Title | posts[].title | Post title |
| Slug | Posts → Slug | posts[].slug | URL slug for the post |
| Content | Posts → Content | posts[].content | Main content of the post |
| Featured Image | Posts → Featured Image | posts[].featuredImage | Main image for the post |
| Category | Posts → Category | posts[].category | Category tag for the post |
| Status | Posts → Status | posts[].status | Post status (draft, published) |
| Author | Posts → Author | posts[].author | Post author information |
| Published Date | Posts → Published Date | posts[].publishedDate | Date when post was published |
| Updated Date | Posts → Updated Date | posts[].updatedAt | Date when post was last updated |
| Featured | Posts → Featured | posts[].featured | Flag to mark a post as featured |

## Implementation Notes

1. The blog page has been designed for personal websites with a focus on simplicity and ease of use.
2. The search functionality is maintained with a dedicated "Search Blogs" button.
3. Category filtering has been removed as it's not typically needed for personal blogs.
4. Pagination is enhanced to be more visible and user-friendly, with clear Previous/Next buttons.
5. The blog layout uses a responsive grid that adapts to different screen sizes.

## Changes Made Based on User Feedback

1. **Header Spacing**: Added more top padding to ensure the title and subtitle appear below the logo and navigation in the header.
2. **Search Simplification**: Simplified the search with a clear "Search Blogs" button and removed category filters.
3. **Pagination Enhancement**: Made pagination controls more prominent to ensure users can easily navigate through all blog posts.

## Future Enhancement Options

1. **Reading Time**: Automatic calculation of reading time for each post.
2. **Social Sharing**: Options to share blog posts on social media.
3. **Related Posts**: Suggestions for related articles at the end of each post.
4. **Comments System**: Adding ability for readers to comment on posts.
