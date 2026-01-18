import { defineCollection, z } from 'astro:content';

const services = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        heroImage: z.string().optional(),
        features: z.array(z.string()).optional(),
    }),
});

const portfolio = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        category: z.string(),
        description: z.string().optional(),
        images: z.array(z.string()).optional(),
        date: z.date().optional(),
        location: z.string().optional(),
    }),
});

const districts = defineCollection({
    type: 'content', // or 'data' if we don't need markdown body
    schema: z.object({
        title: z.string(),
        slug: z.string(),
    }),
});

const services_en = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        heroImage: z.string().optional(),
        features: z.array(z.string()).optional(),
    }),
});

export const collections = {
    services,
    services_en,
    portfolio,
    districts,
};
