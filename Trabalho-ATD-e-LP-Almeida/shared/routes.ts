
import { z } from 'zod';
import { insertClickSchema, clicks } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  clicks: {
    create: {
      method: 'POST' as const,
      path: '/api/clicks',
      input: insertClickSchema,
      responses: {
        201: z.object({
          sequence: z.number(),
          date: z.string(),
          time: z.string(),
          buttonLabel: z.string(),
        }),
        400: errorSchemas.validation,
      },
    },
    listToday: { // Optional, but good for showing history if needed
      method: 'GET' as const,
      path: '/api/clicks/today',
      responses: {
        200: z.array(z.custom<typeof clicks.$inferSelect>()),
      },
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type ClickInput = z.infer<typeof api.clicks.create.input>;
export type ClickResponse = z.infer<typeof api.clicks.create.responses[201]>;
