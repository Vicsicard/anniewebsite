# About Page Mapping

This document provides a mapping between the Self Cast Studios website About page UI components, Payload CMS admin fields, and MongoDB storage structure. This will help ensure that content editors have a clear understanding of how their edits in the CMS admin interface affect the website.

## About Page Section Mapping

| Website Component | CMS Admin Field | MongoDB Field | Description |
|------------------|-----------------|---------------|-------------|
| **Profile Section** |  |  | |
| Profile Picture | Site → About → Profile Image | site.about.profileImage | Main profile/headshot shown on the About page |
| Contact Information | Site → About → Contact Info | site.about.contactInfo | Contact details shown in the sidebar |
| - Email | Site → About → Contact Info → Email | site.about.contactInfo.email | Email address |
| - Phone | Site → About → Contact Info → Phone | site.about.contactInfo.phone | Phone number |
| - Location | Site → About → Contact Info → Location | site.about.contactInfo.location | Physical location/address |
| **About Me** |  |  | |
| Section Visibility | Site → About → About Me Section → Visible | site.about.aboutMeSection.visible | Toggle to show/hide entire About Me section | 
| Heading | Site → About → About Me Section → Heading | site.about.aboutMeSection.heading | Heading for the About Me section |
| Bio Cards | Site → About → About Me Section → Bio Cards | site.about.aboutMeSection.bioCards | Collection of biographical text cards |
| - Bio Card 1 | Site → About → About Me Section → Bio Cards → Card 1 | site.about.aboutMeSection.bioCards[0] | First bio card |
| -- Title | Site → About → About Me Section → Bio Cards → Card 1 → Title | site.about.aboutMeSection.bioCards[0].title | Title of the first bio card |
| -- Content | Site → About → About Me Section → Bio Cards → Card 1 → Content | site.about.aboutMeSection.bioCards[0].content | Content of the first bio card |
| -- Visible | Site → About → About Me Section → Bio Cards → Card 1 → Visible | site.about.aboutMeSection.bioCards[0].visible | Toggle visibility of the first bio card |
| - Bio Card 2 | Site → About → About Me Section → Bio Cards → Card 2 | site.about.aboutMeSection.bioCards[1] | Second bio card |
| -- Title | Site → About → About Me Section → Bio Cards → Card 2 → Title | site.about.aboutMeSection.bioCards[1].title | Title of the second bio card |
| -- Content | Site → About → About Me Section → Bio Cards → Card 2 → Content | site.about.aboutMeSection.bioCards[1].content | Content of the second bio card |
| -- Visible | Site → About → About Me Section → Bio Cards → Card 2 → Visible | site.about.aboutMeSection.bioCards[1].visible | Toggle visibility of the second bio card |
| **Skills & Expertise** |  |  | |
| Section Visibility | Site → About → Skills Section → Visible | site.about.skillsSection.visible | Toggle to show/hide entire Skills section |
| Heading | Site → About → Skills Section → Heading | site.about.skillsSection.heading | Heading for the Skills section |
| Skills List | Site → About → Skills Section → Skills | site.about.skillsSection.skills | Collection of skills items |
| - Skill 1 | Site → About → Skills Section → Skills → Skill 1 | site.about.skillsSection.skills[0] | First skill item |
| -- Name | Site → About → Skills Section → Skills → Skill 1 → Name | site.about.skillsSection.skills[0].name | Name of the first skill |
| -- Description | Site → About → Skills Section → Skills → Skill 1 → Description | site.about.skillsSection.skills[0].description | Description of the first skill |
| -- Visible | Site → About → Skills Section → Skills → Skill 1 → Visible | site.about.skillsSection.skills[0].visible | Toggle visibility of the first skill |
| **Work Experience** |  |  | |
| Section Visibility | Site → About → Experience Section → Visible | site.about.experienceSection.visible | Toggle to show/hide entire Experience section |
| Heading | Site → About → Experience Section → Heading | site.about.experienceSection.heading | Heading for the Experience section |
| Experience Items | Site → About → Experience Section → Jobs | site.about.experienceSection.jobs | Collection of work experience items |
| - Job 1 | Site → About → Experience Section → Jobs → Job 1 | site.about.experienceSection.jobs[0] | First job entry |
| -- Title | Site → About → Experience Section → Jobs → Job 1 → Title | site.about.experienceSection.jobs[0].title | Job title |
| -- Company | Site → About → Experience Section → Jobs → Job 1 → Company | site.about.experienceSection.jobs[0].company | Company name |
| -- Period | Site → About → Experience Section → Jobs → Job 1 → Period | site.about.experienceSection.jobs[0].period | Time period (e.g., "2018-2021") |
| -- Description | Site → About → Experience Section → Jobs → Job 1 → Description | site.about.experienceSection.jobs[0].description | Job description |
| -- Visible | Site → About → Experience Section → Jobs → Job 1 → Visible | site.about.experienceSection.jobs[0].visible | Toggle visibility of the first job |
| **Education** |  |  | |
| Section Visibility | Site → About → Education Section → Visible | site.about.educationSection.visible | Toggle to show/hide entire Education section |
| Heading | Site → About → Education Section → Heading | site.about.educationSection.heading | Heading for the Education section |
| Education Items | Site → About → Education Section → Schools | site.about.educationSection.schools | Collection of education items |
| - School 1 | Site → About → Education Section → Schools → School 1 | site.about.educationSection.schools[0] | First education entry |
| -- Institution | Site → About → Education Section → Schools → School 1 → Institution | site.about.educationSection.schools[0].institution | Name of the institution |
| -- Degree | Site → About → Education Section → Schools → School 1 → Degree | site.about.educationSection.schools[0].degree | Degree earned |
| -- Period | Site → About → Education Section → Schools → School 1 → Period | site.about.educationSection.schools[0].period | Time period (e.g., "2014-2018") |
| -- Description | Site → About → Education Section → Schools → School 1 → Description | site.about.educationSection.schools[0].description | Additional details |
| -- Visible | Site → About → Education Section → Schools → School 1 → Visible | site.about.educationSection.schools[0].visible | Toggle visibility of the first school |
| **Testimonials** |  |  | |
| Section Visibility | Site → About → Testimonials Section → Visible | site.about.testimonialsSection.visible | Toggle to show/hide entire Testimonials section |
| Heading | Site → About → Testimonials Section → Heading | site.about.testimonialsSection.heading | Heading for the Testimonials section |
| Testimonial Items | Site → About → Testimonials Section → Testimonials | site.about.testimonialsSection.testimonials | Collection of testimonial quotes |
| - Testimonial 1 | Site → About → Testimonials Section → Testimonials → Testimonial 1 | site.about.testimonialsSection.testimonials[0] | First testimonial |
| -- Content | Site → About → Testimonials Section → Testimonials → Testimonial 1 → Content | site.about.testimonialsSection.testimonials[0].content | Testimonial quote text |
| -- Author | Site → About → Testimonials Section → Testimonials → Testimonial 1 → Author | site.about.testimonialsSection.testimonials[0].author | Name of the testimonial author |
| -- Author Title | Site → About → Testimonials Section → Testimonials → Testimonial 1 → Author Title | site.about.testimonialsSection.testimonials[0].authorTitle | Title/role of the testimonial author |
| -- Visible | Site → About → Testimonials Section → Testimonials → Testimonial 1 → Visible | site.about.testimonialsSection.testimonials[0].visible | Toggle visibility of the first testimonial |

## Implementation Notes

1. All content sections (About Me, Skills, Experience, Education, Testimonials) have their own visibility toggles.
2. Within each section, individual items (bio cards, skills, jobs, etc.) can be individually toggled on/off.
3. The section headings are customizable to match the client's preferred terminology.
4. The profile image is connected to the Media collection in the CMS.
5. All text content supports rich text formatting through the Payload CMS editor.

## Migration from Legacy Structure

For existing sites using the old structure:
1. Bio Cards collection will be migrated to the appropriate section in the About page structure
2. Quotes collection with type "testimonial" will be migrated to the Testimonials section
3. Contact information from the old Site collection will be mapped to the new contact fields
