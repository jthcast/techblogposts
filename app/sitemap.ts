import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://techblogposts.com',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://techblogposts.com/blogs',
      lastModified: new Date(),
      priority: 0.5,
    },
  ]
}
