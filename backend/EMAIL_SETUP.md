# Email Notification Setup Guide

This guide will help you set up email notifications for the Sangeet Restaurant reservation system.

## Prerequisites

1. A Gmail account (or other email service)
2. 2-Step Verification enabled on your Gmail account

## Gmail Setup

### 1. Enable 2-Step Verification
- Go to your Google Account settings
- Navigate to Security
- Enable 2-Step Verification if not already enabled

### 2. Generate App Password
- Go to Security > App passwords
- Select "Mail" as the app
- Click "Generate"
- Copy the 16-character password

### 3. Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sangeet_restaurant
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Server Configuration
PORT=5001

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
```

## Email Templates

The system includes three email templates:

### 1. Reservation Created
- Sent when a customer creates a new reservation
- Status: Pending
- Includes reservation details and confirmation message

### 2. Reservation Confirmed
- Sent when admin confirms a reservation
- Status: Confirmed
- Includes table assignment and important information

### 3. Reservation Cancelled
- Sent when admin cancels a reservation
- Status: Cancelled
- Includes cancellation confirmation

## Testing Email Setup

1. Start the backend server
2. Create a test reservation through the frontend
3. Check the console for email sending logs
4. Verify email delivery in the customer's inbox

## Troubleshooting

### Common Issues

1. **Authentication Error**
   - Ensure you're using an App Password, not your regular password
   - Verify 2-Step Verification is enabled

2. **Email Not Sending**
   - Check console logs for error messages
   - Verify environment variables are set correctly
   - Ensure the email address is valid

3. **Gmail Security**
   - Gmail may block "less secure apps"
   - App passwords bypass this restriction

### Alternative Email Services

You can modify the email service to use other providers:

```javascript
// For Outlook/Hotmail
service: 'outlook'

// For Yahoo
service: 'yahoo'

// For custom SMTP
host: 'smtp.your-provider.com',
port: 587,
secure: false
```

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables for sensitive information
- Regularly rotate your app passwords
- Monitor email sending logs for any issues
