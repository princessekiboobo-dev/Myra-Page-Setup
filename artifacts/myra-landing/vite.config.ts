import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const rawPort = process.env.PORT ?? '19173';
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? '/';

export default defineConfig(async ({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const resolvedSupabaseEnv = {
    NEXT_PUBLIC_SUPABASE_URL: env.NEXT_PUBLIC_SUPABASE_URL ?? env.SUPABASE_URL ?? '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      env.SUPABASE_ANON_KEY ??
      env.SUPABASE_PUBLISHABLE_KEY ??
      '',
    NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL: env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? '',
  };

  return {
  define: Object.fromEntries(
    Object.entries(resolvedSupabaseEnv).map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)]),
  ),
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: false,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
    preview: {
      port,
      host: '0.0.0.0',
      allowedHosts: true,
    },
  };
});
