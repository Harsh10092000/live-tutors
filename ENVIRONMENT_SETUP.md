# Environment Setup Guide

This guide will help you set up the environment variables needed for the LiveTutors application to work properly in both development and production.

## Required Environment Variables

Create a `.env.local` file in the `livetutors` directory with the following variables:

### Database Configuration
```env
MYSQL_HOST=localhost
MYSQL_USER=your_mysql_username
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=your_database_name

# Optional: Separate database for logs
MYSQL_HOST_LOG=localhost
MYSQL_USER_LOG=your_mysql_username
MYSQL_PASSWORD_LOG=your_mysql_password
MYSQL_DATABASE_LOG=your_logs_database_name
```

### NextAuth Configuration
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-make-it-long-and-random
```

### Razorpay Configuration
```env
# Server-side Razorpay credentials
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Client-side Razorpay key (same as key_id, but prefixed with NEXT_PUBLIC_)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Email Configuration (Optional)
```env
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@livetutors.com
```

## Production Deployment

### For Vercel:
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add all the environment variables listed above
4. Make sure to set `NEXTAUTH_URL` to your production domain
5. Redeploy your application

### For Other Platforms:
1. Set all environment variables in your hosting platform's environment configuration
2. Make sure `NEXTAUTH_URL` points to your production domain
3. Restart your application

## Common Issues and Solutions

### Wallet Not Working in Production
1. **Check Razorpay Configuration**: Ensure both `RAZORPAY_KEY_ID` and `NEXT_PUBLIC_RAZORPAY_KEY_ID` are set
2. **Check Database Connection**: Verify all MySQL environment variables are correct
3. **Check NextAuth**: Ensure `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are properly set

### Payment Processing Fails
1. Verify Razorpay credentials are correct
2. Check that the Razorpay script is loading (check browser console)
3. Ensure your Razorpay account is in live mode for production

### Database Connection Issues
1. Verify MySQL credentials
2. Check if the database exists and is accessible
3. Ensure the required tables are created (run the schema.sql file)

## Testing Environment Variables

The application includes an `EnvironmentChecker` component that will show the status of:
- Razorpay Key availability
- Razorpay Script loading
- Database connectivity

This component is automatically included on the wallet page and will help you debug configuration issues.

## Security Notes

1. Never commit `.env.local` or `.env` files to version control
2. Use strong, random values for `NEXTAUTH_SECRET`
3. Keep your Razorpay credentials secure
4. Use different credentials for development and production

## Database Setup

Make sure to run the SQL schema file to create all required tables:
```bash
mysql -u your_username -p your_database < db/schema.sql
```

This will create all necessary tables including:
- `users`
- `user_wallets`
- `coin_transactions`
- `contact_requests`
- `notifications`
- And other required tables
