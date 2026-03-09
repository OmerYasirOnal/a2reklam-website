import { defineCollection, z, reference } from 'astro:content';

// Services collection (TR)
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

// Districts collection (TR)
const districts = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        heroImage: z.string().optional(),
        districtName: z.string(),
    }),
});

// Blog collection (TR)
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

// Tabela Rehberleri collection (TR only - SEO/AIO focused guides)
const tabela_rehberi = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        category: z.string(),
        tags: z.array(z.string()).optional(),
        faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    }),
});

export const collections = {
    services,
    districts,
    blog,
    tabela_rehberi,
};
