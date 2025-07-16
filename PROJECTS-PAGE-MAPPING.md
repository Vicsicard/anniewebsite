# Projects Page Mapping

This document provides a mapping between the Self Cast Studios website Projects page UI components, Payload CMS admin fields, and MongoDB storage structure. This will help ensure that content editors have a clear understanding of how their edits in the CMS admin interface affect the website.

## Projects Page Section Mapping

| Website Component | CMS Admin Field | MongoDB Field | Description |
|------------------|-----------------|---------------|-------------|
| **Page Header** |  |  | |
| Title | Site → Projects → Title | site.projects.title | The main page title ("Our Projects") |
| Navigation Label | Site → Projects → Nav Label | site.projects.navLabel | Custom label shown in the navigation menu (default: "Projects") |
| Description | Site → Projects → Description | site.projects.description | The description text below the title |
| **Filter Navigation** |  |  | |
| Category Filters | Site → Projects → Show Categories | site.projects.showCategories | Toggle to show/hide category filters |
| **Projects Grid** |  |  | |
| Layout Type | Site → Projects → Grid Layout | site.projects.gridLayout | Layout for projects grid ("grid-2", "grid-3", "list") |
| Project Cards Style | Site → Projects → Card Style | site.projects.cardStyle | Visual style for project cards ("standard", "minimal", "featured") |
| Projects Per Page | Site → Projects → Projects Per Page | site.projects.projectsPerPage | Number of projects to display per page |
| **Featured Projects** |  |  | |
| Visibility | Site → Projects → Featured Projects → Visible | site.projects.featuredProjects.visible | Toggle to show/hide featured projects section |
| Heading | Site → Projects → Featured Projects → Heading | site.projects.featuredProjects.heading | Heading for featured projects section |
| Projects Selection | Site → Projects → Featured Projects → Project IDs | site.projects.featuredProjects.projectIds | Manual selection of featured projects |
| **Call to Action** |  |  | |
| CTA Visibility | Site → Projects → Show CTA | site.projects.showCTA | Toggle to show/hide call-to-action section |
| CTA Heading | Site → Projects → CTA Heading | site.projects.ctaHeading | Heading for the call-to-action section |
| CTA Text | Site → Projects → CTA Text | site.projects.ctaText | Text content for the call-to-action |
| CTA Button Text | Site → Projects → CTA Button Text | site.projects.ctaButtonText | Text for the call-to-action button |
| CTA Button URL | Site → Projects → CTA Button URL | site.projects.ctaButtonURL | URL for the call-to-action button |
| **Project Items** |  |  | |
| Title | Projects → Title | projects[].title | Project title |
| Slug | Projects → Slug | projects[].slug | URL slug for the project |
| Description | Projects → Description | projects[].description | Short description of the project |
| Content | Projects → Content | projects[].content | Detailed content about the project |
| Featured Image | Projects → Featured Image | projects[].featuredImage | Main image for the project |
| Category | Projects → Category | projects[].category | Category tag for the project |
| Client | Projects → Client | projects[].client | Client name for the project |
| Completion Date | Projects → Completed At | projects[].completedAt | Date when project was completed |
| External URL | Projects → URL | projects[].url | External URL to view the project (if applicable) |
| Featured | Projects → Featured | projects[].featured | Flag to mark project as featured |

## Implementation Notes

1. The projects page is designed to showcase client work and portfolio items with an emphasis on visual presentation.
2. Category filtering allows visitors to easily find specific types of projects.
3. Each project can link either to an internal detail page or to an external URL where the project can be viewed.
4. The layout is responsive and adapts to different screen sizes.

## Proposed Enhancements

1. **Grid Layout Options**: Add ability to switch between 2-column, 3-column, or list view.
2. **Featured Projects Section**: Add an optional section at the top to highlight specific projects.
3. **Project Sorting Options**: Allow content editors to choose how projects are sorted (date, alphabetical, etc.).
4. **Call to Action Section**: Add an optional CTA section at the bottom to encourage visitors to get in touch.
5. **Pagination**: Add pagination for sites with many projects.

## Requirements for CMS Implementation

1. Create a new Projects section in the Sites collection schema.
2. Ensure Projects collection exists with all necessary fields.
3. Update API utility to handle the new Projects section and provide fallback data.
4. Modify the projects.tsx file to consume data from the CMS structure.
