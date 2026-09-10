// PayPal Configuration File
// ================================
// IMPORTANT: Add your PayPal credentials here to enable PayPal payments
//
// Steps to get your PayPal credentials:
// 1. Go to https://developer.paypal.com/
// 2. Log in or create an account
// 3. Navigate to Apps & Credentials
// 4. Create a new app or use existing
// 5. Copy your Client ID and Secret
// 6. Paste them below
//
// DO NOT commit your actual credentials to version control!
// Use environment variables in production: process.env.PAYPAL_CLIENT_ID

export const PAYPAL_CONFIG = {
  // TODO: Add your PayPal credentials here
  clientId: process.env.PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID_HERE',
  secret: process.env.PAYPAL_SECRET || 'YOUR_PAYPAL_SECRET_HERE',
  mode: 'sandbox', // Change to 'live' for production
  enabled: false, // Set to true when credentials are added
};

// Once configured, uncomment the PayPal provider in:
// src/lib/auth.server.ts (around line 30)
// And update the dashboard payment section in:
// src/routes/dashboard.tsx (around line 250)
