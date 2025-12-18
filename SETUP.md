# Quick Setup Guide

## Initial Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in all required values (see README.md for details)

3. **Set Up Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Environment Variables Checklist

Make sure you have configured:

- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `STRIPE_SECRET_KEY` - Stripe secret key
- [ ] `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Same as above (for client)
- [ ] `PAYPAL_CLIENT_ID` - PayPal client ID
- [ ] `PAYPAL_CLIENT_SECRET` - PayPal client secret
- [ ] `PAYPAL_MODE` - "sandbox" or "live"
- [ ] `NEXT_PUBLIC_PAYPAL_CLIENT_ID` - Same as PAYPAL_CLIENT_ID (for client)
- [ ] `EMAIL_HOST` - SMTP host (e.g., smtp.gmail.com)
- [ ] `EMAIL_PORT` - SMTP port (usually 587)
- [ ] `EMAIL_USER` - Your email address
- [ ] `EMAIL_PASS` - Your email password or app password
- [ ] `NEXT_PUBLIC_SITE_URL` - Your site URL (http://localhost:3000 for dev)

## Testing Payments

### Stripe Test Mode
- Use test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC
- Use Stripe CLI for webhooks: `stripe listen --forward-to localhost:3000/api/payments/webhook`

### PayPal Sandbox
- Create sandbox accounts in PayPal Developer Dashboard
- Use sandbox buyer account for testing
- Set `PAYPAL_MODE=sandbox`

## Common Issues

### Database Connection
- Ensure PostgreSQL is running
- Check DATABASE_URL format: `postgresql://user:password@host:port/database?schema=public`

### Email Not Sending
- For Gmail: Enable 2FA and use App Password
- Check firewall/security settings
- Verify SMTP credentials

### Payment Issues
- Ensure API keys are correct
- Check webhook endpoint is accessible
- Verify environment variables are set

## Next Steps

1. Customize content in translation files (`src/locales/*.json`)
2. Update portfolio projects in `src/components/Portfolio.tsx`
3. Adjust package pricing in `src/components/Packages.tsx`
4. Update social media links in `src/components/Contact.tsx`
5. Configure SEO metadata in `src/app/layout.tsx`

