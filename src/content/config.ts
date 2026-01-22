import { defineCollection, z, reference } from 'astro:content';

// Services collection (TR)
// IDs are auto-generated from filenames with 'tr-service-' prefix
const services = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        heroImage: z.string().optional(),
        features: z.array(z.string()).optional(),
    }),
});

// Services collection (EN)
// IDs are auto-generated from filenames with 'en-service-' prefix
const services_en = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        heroImage: z.string().optional(),
        features: z.array(z.string()).optional(),
    }),
});

// Districts collection (TR)
// IDs are auto-generated from filenames with 'tr-district-' prefix
const districts = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        heroImage: z.string().optional(),
        districtName: z.string(), // For dynamic replacement in templates
    }),
});

// Districts collection (EN)
// IDs are auto-generated from filenames with 'en-district-' prefix
const districts_en = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        heroImage: z.string().optional(),
        districtName: z.string(),
    }),
});

// Blog collection (TR)
// IDs are auto-generated from filenames with 'tr-blog-' prefix
const blog = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
        faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    }),
});

// Blog collection (EN)
// IDs are auto-generated from filenames with 'en-blog-' prefix
const blog_en = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
        faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    }),
});

// Tabela Rehberleri collection (TR only - SEO/AIO focused guides)
const tabela_rehberi = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        category: z.string(), // Category for grouping
        tags: z.array(z.string()).optional(),
        faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    }),
});

export const collections = {
    services,
    services_en,
    districts,
    districts_en,
    blog,
    blog_en,
    tabela_rehberi,
};
