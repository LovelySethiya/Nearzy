# Firebase Authentication Setup for Nearzy

This guide will help you set up Firebase Authentication in your Nearzy application.

## Prerequisites

- A Firebase project (create one at [Firebase Console](https://console.firebase.google.com/))
- Node.js and npm installed
- The Nearzy project cloned and dependencies installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "nearzy-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project console, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password**: Enable and allow users to sign up
   - **Phone**: Enable and configure reCAPTCHA verification

### For Phone Authentication:
1. Click on "Phone" provider
2. Enable it
3. Add your app's domain to the authorized domains
4. For testing, you can use test phone numbers

## Step 3: Get Your Firebase Configuration

1. In your Firebase project console, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "Nearzy Web App")
6. Copy the Firebase configuration object

## Step 4: Update Firebase Configuration

1. Open `src/utils/firebase.ts`
2. Replace the placeholder configuration with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 5: Configure reCAPTCHA for Phone Authentication

1. In your Firebase project console, go to Authentication > Settings
2. Scroll down to "Phone numbers for testing"
3. Add test phone numbers if needed
4. Make sure your domain is added to authorized domains

## Step 6: Test the Authentication

1. Start your development server: `npm run dev`
2. Navigate to the login page
3. Test both email/password and phone authentication

## Features Implemented

### Email/Password Authentication
- ✅ User registration (sign up)
- ✅ User login
- ✅ Password reset functionality
- ✅ Secure password handling

### Phone Authentication
- ✅ Phone number verification with OTP
- ✅ reCAPTCHA integration
- ✅ SMS delivery (requires Firebase project setup)

### User Management
- ✅ Automatic user state management
- ✅ Sign out functionality
- ✅ Admin role detection
- ✅ Persistent authentication state

### Security Features
- ✅ Firebase security rules
- ✅ Input validation
- ✅ Error handling
- ✅ Loading states

## Admin Access

To access admin features:
1. Use email: `admin@nearzy.com`
2. Use any password (the app will detect admin role based on email)

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Check your Firebase configuration in `src/utils/firebase.ts`
   - Ensure the API key is correct

2. **"Firebase: Error (auth/operation-not-allowed)"**
   - Enable the authentication method in Firebase Console
   - Go to Authentication > Sign-in method

3. **Phone authentication not working**
   - Ensure phone authentication is enabled in Firebase Console
   - Check that your domain is authorized
   - For testing, use Firebase's test phone numbers

4. **reCAPTCHA issues**
   - Make sure your domain is added to authorized domains
   - Check browser console for reCAPTCHA errors

### Development Tips:

1. **Test Phone Numbers**: Use Firebase's test phone numbers for development
2. **Firebase Emulator**: For local development, consider using Firebase Emulator Suite
3. **Error Handling**: All authentication errors are displayed to users
4. **Loading States**: The app shows loading spinners during authentication

## Environment Variables (Optional)

For production, consider using environment variables:

1. Create a `.env` file in your project root
2. Add your Firebase config:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

3. Update `src/utils/firebase.ts` to use environment variables:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Next Steps

After setting up Firebase Authentication, you can:

1. Add user profile management
2. Implement role-based access control
3. Add social authentication (Google, Facebook, etc.)
4. Set up Firebase Firestore for user data storage
5. Implement email verification
6. Add multi-factor authentication

## Support

If you encounter any issues:
1. Check the Firebase Console for error logs
2. Review the browser console for JavaScript errors
3. Ensure all Firebase services are properly configured
4. Verify your Firebase project settings 