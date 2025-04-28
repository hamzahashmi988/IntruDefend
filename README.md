# IntruDefend Mobile App

This is an [Expo](https://expo.dev) based mobile application for intrusion detection and notification system.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Push Notifications Guide

### Setting Up Device Registration

1. Users need to register their device through the app:
   - Log in to the app
   - Go to the Notifications tab
   - Click "Register Device" to register for push notifications

### Sending Notifications

To send notifications to registered devices, use the following API endpoint:

```bash
POST https://your-backend-url/api/notifications/send

Headers:
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

Body:
{
    "recipient_email": "user@example.com",  // Send to specific user
    "title": "Alert",
    "body": "Intrusion detected!",
    "data": {                              // Optional additional data
        "type": "intrusion_alert",
        "location": "front_door"
    }
}
```

### Testing Notifications

1. First, ensure the device is registered:
   ```bash
   # Get list of registered devices for a user
   GET https://your-backend-url/api/user-device/list?user_id=user@example.com
   ```

2. Send a test notification:
   ```bash
   # Example using curl
   curl -X POST https://your-backend-url/api/notifications/send \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{
       "recipient_email": "user@example.com",
       "title": "Test Notification",
       "body": "This is a test notification"
     }'
   ```

### Notification Features

- **User-specific notifications**: Send to specific users by email
- **Broadcast notifications**: Send to all registered devices
- **Rich notifications**: Support for title, body, and custom data
- **Offline delivery**: Notifications are delivered when device comes online
- **Deep linking**: Notifications can link directly to specific app screens

### Troubleshooting

1. If notifications aren't being received:
   - Check if the device is registered in the app
   - Verify notification permissions are granted
   - Ensure the backend server is running
   - Check the Expo push token is valid

2. Common issues:
   - "Device not registered": Re-register the device in the app
   - "Permission denied": Grant notification permissions in device settings
   - "Token expired": Log out and log back in to refresh the token

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
