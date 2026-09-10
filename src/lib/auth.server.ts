import { betterAuth } from 'better-auth';
import { admin, twoFactor } from 'better-auth/plugins';
import { Database } from 'better-auth/database';

export const auth = betterAuth({
  database: {
    provider: 'postgres',
    url: process.env.DATABASE_URL || 'postgresql://localhost/virellion',
  },
  secret: process.env.BETTER_AUTH_SECRET || 'your-secret-key-change-in-production',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  basePath: '/api/auth',
  plugins: [
    admin({
      defaultRole: 'admin',
    }),
    twoFactor(),
  ],
  emailAndPassword: {
    enabled: true,
    autoSignUpOnFirstLogin: false,
    minPasswordLength: 8,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    },
  },
});
