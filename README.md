# NFC Business App

A React Native mobile application with Flask backend that allows users to upload business card images, store them in Firebase, and share them via NFC tags or QR codes.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This application consists of two main components:
1. **Backend (Flask)**: Handles image uploads, Firebase storage, and provides REST API
2. **Frontend (React Native)**: Mobile app for image capture, NFC writing, and QR code generation

The workflow is:
1. User selects/captures a business card image in the mobile app
2. Image is uploaded to Flask backend via REST API
3. Backend processes and stores image in Firebase Storage
4. User can write business card data to NFC tags or generate QR codes for sharing

## ✨ Features

- 📱 **Image Upload**: Capture or select business card images from device gallery
- ☁️ **Firebase Integration**: Secure cloud storage for images and metadata
- 🔗 **NFC Support**: Write business card data to NFC tags
- 📱 **QR Code Generation**: Generate QR codes for easy sharing
- 🌐 **Ngrok Integration**: Public URL exposure for development
- 📊 **JSON Metadata**: Structured data storage with image links

## 🏗️ Architecture

```
┌─────────────────┐    HTTP/REST    ┌──────────────────┐    Firebase API    ┌─────────────────┐
│                 │   ──────────→   │                  │   ──────────────→  │                 │
│  React Native   │                 │  Flask Backend   │                    │   Firebase      │
│  Mobile App     │   ←──────────   │  (Python)        │   ←──────────────  │   Storage       │
│                 │    JSON Data    │                  │    Image URLs      │                 │
└─────────────────┘                 └──────────────────┘                    └─────────────────┘
```

## 📋 Prerequisites

### Backend Requirements
- Python 3.8+
- pip (Python package manager)
- Firebase account and project setup
- Ngrok account (for public URL)

### Frontend Requirements
- Node.js 18+
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Android/iOS device or emulator

### Environment Variables
Create a `.env` file in the Backend directory with:
```env
FIREBASE_API=your_firebase_api_key
FIREBASE_SENDER_ID=your_firebase_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd NFC_Business_App
```

### 2. Backend Setup

#### Install Python Dependencies
```bash
cd Backend
python -m venv .venv
.venv\Scripts\activate  # On Windows
# source .venv/bin/activate  # On macOS/Linux
pip install -r requirements.txt
```

#### Configure Firebase
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Storage in your Firebase project
3. Get your Firebase configuration keys
4. Create `.env` file with your Firebase credentials (see Prerequisites)

#### Install Ngrok
1. Sign up at https://ngrok.com/
2. Download and install ngrok
3. Update `RouteNgrok.bat` with your ngrok URL

### 3. Frontend Setup

#### Install Node Dependencies
```bash
cd Native-Frontend
npm install
```

#### React Native Environment Setup
Follow the official React Native environment setup guide:
https://reactnative.dev/docs/environment-setup

#### iOS Setup (macOS only)
```bash
cd ios
pod install
cd ..
```

## 🏃‍♂️ Running the Application

### Option 1: Automated Startup (Recommended)

#### Start Backend with Ngrok
```bash
cd Backend
run.bat
```
This will:
- Start ngrok tunnel in a new window
- Activate Python virtual environment
- Start Flask server on port 5000

#### Start Frontend
```bash
cd Native-Frontend
npm run android  # For Android
# or
npm run ios      # For iOS (macOS only)
```

### Option 2: Manual Startup

#### Backend Only
```bash
cd Backend
StartBackend.bat
```

#### Ngrok Only
```bash
cd Backend
RouteNgrok.bat
```

#### Frontend Development Server
```bash
cd Native-Frontend
npm start
```

## 📁 Project Structure

```
NFC_Business_App/
├── Backend/                          # Flask backend server
│   ├── main.py                       # Main Flask application
│   ├── requirements.txt              # Python dependencies
│   ├── StartBackend.bat             # Backend startup script
│   ├── run.bat                      # Combined startup script
│   ├── RouteNgrok.bat              # Ngrok tunnel script
│   ├── firebase_downloaded_files/   # Downloaded Firebase files
│   ├── img_test/                    # Test images
│   └── Utils/                       # Utility modules
│       └── Tests/                   # Backend tests
│           └── UploadImageTest.py   # Image upload test
├── Native-Frontend/                  # React Native mobile app
│   ├── App.tsx                      # Main app component
│   ├── package.json                 # Node.js dependencies
│   ├── app.json                     # React Native config
│   ├── tsconfig.json               # TypeScript config
│   ├── assets/                      # App assets
│   │   └── contactless.png         # NFC icon
│   ├── src/                         # Source code
│   │   ├── components/             # React components
│   │   │   ├── QRScreen.tsx        # QR code display component
│   │   │   └── UploadImage.tsx     # Image upload component
│   │   └── backend/                # Backend integration
│   │       ├── NFC.tsx             # NFC functionality
│   │       └── QR.tsx              # QR code generation
│   ├── ios/                        # iOS-specific files
│   └── android/                    # Android-specific files (generated)
└── README.md                        # This file
```

## 🔌 API Endpoints

### Upload Image
- **URL**: `/<business_name>/upload_img`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "image": "base64_encoded_image_string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "File has been uploaded successfully",
    "file": {
      "Name": "temp.png",
      "Business": "business_name",
      "Type": "image/png",
      "Size": 12345,
      "image_link": "firebase_storage_url"
    }
  }
  ```

### Get Image Metadata
- **URL**: `/get_img/<business_name>/<filename>`
- **Method**: `GET`
- **Response**: JSON metadata for the requested image

## ⚙️ Configuration

### Backend Configuration
- **Port**: 5000 (default Flask port)
- **Debug Mode**: Enabled in development
- **Allowed File Types**: PNG, JPG, JPEG
- **Firebase Storage**: Organized by business name folders

### Frontend Configuration
- **Ngrok URL**: Update in `UploadImage.tsx` line 56
  ```typescript
  const response = await fetch('https://your-ngrok-url.ngrok-free.app/KhaledDev/upload_img', {
  ```
- **Image Constraints**: Max 1050x600 pixels
- **Supported Platforms**: iOS and Android

### NFC Configuration
- **Required Permissions**: NFC access
- **Supported Data**: NDEF messages with JSON business card data
- **File Storage**: Local device storage in DocumentDirectory

## 🔧 Troubleshooting

### Common Backend Issues

#### Firebase Connection Issues
- Verify `.env` file contains correct Firebase credentials
- Ensure Firebase Storage is enabled in your project
- Check Firebase Storage rules allow read/write access

#### Ngrok Issues
- Update `RouteNgrok.bat` with your personal ngrok URL
- Ensure ngrok is installed and authenticated
- Update frontend URL to match ngrok tunnel

#### Python Virtual Environment
- Ensure virtual environment is activated before running
- Reinstall dependencies if import errors occur:
  ```bash
  pip install -r requirements.txt
  ```

### Common Frontend Issues

#### Metro Bundle Issues
```bash
cd Native-Frontend
npx react-native start --reset-cache
```

#### Android Build Issues
```bash
cd Native-Frontend
npx react-native run-android --verbose
```

#### iOS Build Issues (macOS)
```bash
cd Native-Frontend/ios
pod install
cd ..
npx react-native run-ios
```

#### Permission Issues
- Ensure camera/storage permissions are granted
- For NFC: Enable NFC in device settings
- For Android: Check manifest permissions

#### Network Issues
- Verify ngrok URL is accessible
- Check firewall settings
- Ensure backend is running on correct port

### Testing the Setup

#### Test Backend
```bash
cd Backend/Utils/Tests
python UploadImageTest.py
```

#### Test Image Upload
1. Start backend and ngrok
2. Launch mobile app
3. Tap "Import Card" and select an image
4. Check Firebase Storage for uploaded file
5. Verify JSON metadata is created

#### Test NFC (Physical Device Required)
1. Upload an image first
2. Tap "Send Business Card"
3. Hold device near NFC tag
4. Verify data is written to tag

#### Test QR Code
1. Upload an image first
2. Tap "Show QR Code"
3. Scan QR code with another device
4. Verify it opens the Firebase image URL

### Development Tips

1. **Hot Reload**: React Native supports hot reload for faster development
2. **Debugging**: Use React Native Debugger or Chrome DevTools
3. **Logs**: Check Metro bundler logs for frontend issues
4. **Backend Logs**: Flask runs in debug mode showing detailed errors
5. **Firebase Console**: Monitor storage usage and access logs

## 📱 App Usage Flow

1. **Launch App**: Start the React Native application
2. **Import Card**: Tap "Import Card" to select/capture business card image
3. **Upload Process**: Image is automatically uploaded to Firebase via Flask backend
4. **Share Options**:
   - **NFC**: Tap "Send Business Card" to write data to NFC tag
   - **QR Code**: Tap "Show QR Code" to generate shareable QR code
5. **Recipients**: Others can scan NFC tag or QR code to access business card image

The app creates a seamless experience for digitizing and sharing business cards using modern mobile technologies.