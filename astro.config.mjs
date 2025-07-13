import { defineConfig, envField } from 'astro/config';
import icon from 'astro-icon';
import react from '@astrojs/react';
import bundlesize from 'vite-plugin-bundlesize';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.lesondupapier.com',
  output: 'server',
  trailingSlash: 'never',
  base: '/',
  security: {
    checkOrigin: false,
  },
  vite: {
      plugins: [
        bundlesize({
          limits: [{ name: '**/*', limit: '500 kB' }],
          stats: 'summary',
        }),
      ],
      build: {
        sourcemap: 'hidden',
      },
    },
  env: {
    schema: {
      DRAFT_MODE_HOSTNAME: envField.string({
        context: 'server',
        access: 'secret',
        default: 'localhost',
      }),
      PUBLIC_HOSTNAME: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
      }),
      DATOCMS_DRAFT_CONTENT_CDA_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
      }),
      DATOCMS_CMA_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
      }),
      SECRET_API_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
      }),
      SIGNED_COOKIE_JWT_SECRET: envField.string({
        context: 'server',
        access: 'secret',
      }),
      DRAFT_MODE_COOKIE_NAME: envField.string({
        context: 'client',
        access: 'public',
      }),
    },
    validateSecrets: true,
  },
  integrations: [
    react(),
    icon({
      iconDir: 'src/icons',
      include: {
        // mdi: ["*"], // (Default) Loads entire Material Design Icon set
        teenyicons: ['facebook-outline', 'youtube-outline'], // Loads only Teeny Icon's "account" SVG
      },
    }),
  ],
  image: {
    remotePatterns: [{ protocol: 'https' }],
  },
});
