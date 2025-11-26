# QRConnect – Smart Digital Visiting Card App

## 1. Project Title
**QRConnect – Smart Digital Visiting Card App**

---

## 2. Name & Roll Number
**Yash Lahase**  
Roll No: 2024-B-17112006C  

---

## 3. Problem Statement
Traditional paper visiting cards are often lost, forgotten, or damaged. They are also not eco-friendly and cannot be updated once printed.  
In today’s digital era, there is a need for a simple, eco-friendly, and instant way to share personal or professional contact details without relying on physical cards.

---

## 4. Proposed Solution / Idea
QRConnect is a mobile app that allows users to create a **digital visiting card** by filling in their details such as name, phone number, email, LinkedIn, Instagram, etc.  
The app then generates a **unique QR code** for each user, which can be scanned by others to instantly view and save their contact details.

The app works **fully offline** using **AsyncStorage**, without requiring any backend or online database.

---

# 5.📱React Native Expo App — Setup & Preview Guide

This guide explains how to set up the project and preview it on your mobile device using Expo Go.

## 🚀 Previewing the App

 To preview this app on your smartphone:

1. Install the **Expo Go** app from the Play Store or App Store.
2. Make sure **your mobile device and your PC are connected to the same Wi-Fi network**.  
   If both devices are not on the same network, the app will not load.

## 🛠️ Project Setup

### 1. Clone the Repository
Clone this project and open it in VS Code.

### 2. Install Dependencies
Run the following command inside the project:

```bash
npm install
```

## ▶️ Running the App

### 3. Start the Expo Development Server
Use one of these commands:

```bash
npm start
```

or

```bash
npx expo start
```

## 🔄 Switch to Expo Go Mode

When the server starts, you will see a message like:

```
Using development build
```

Press:

```
s
```

This switches your project to **Expo Go mode**.

## 📲 Preview on Your Mobile Device

### 4. Scan the QR Code
After switching, a QR code will appear.

1. Open the **Expo Go** app on your phone  
2. Scan the QR code  
3. You will see two options:  
   - Continue to Development Build  
   - Expo Go  

Tap **Expo Go** to launch the app.

## ✅ Done!
app will start on your mobile device.

---

## 6. Key Features
- 📱 **QR Code Contact Sharing** – Instantly generate and share your digital visiting card as a QR code.  
- 📝 **Customizable Profile** – Add and update personal details like name, phone number, email, LinkedIn, Instagram etc.  
- ⚡ **One-Scan Save** – Person 2 scans Person 1’s QR code and instantly saves the details in the app.  
- 🌐 **No Internet Required** – QR code scanning and data transfer works offline.  
- 🌱 **Digital & Eco-Friendly** – Replace physical visiting cards with a digital solution.  
 

---

## 7. Target Users / Audience
- Professionals (business meetings, networking events)  
- Students (sharing Instagram, Contact info, LinkedIn)    
- General users (easy way to share contact info with friends/family)  

---

## 8. Technology Stack
- **Frontend:** React Native (Expo)
- **Storage:** AsyncStorage (Local device storage)  
- **Libraries / Tools:** Expo CLI, React Native QRCode Generator, QRCode Scanner libraries  


---

## 9. Expected Outcome

A fully offline digital visiting card app that enables fast, eco-friendly, and professional contact sharing using QR codes. 

---

## 10. Timeline (Optional)
- **Week 1:** UI/UX design and profile input form  
- **Week 2:** QR code generation feature  
- **Week 3:** QR code scanning + contact saving functionality  
- **Week 4:** Testing, bug fixes, and deployment  

---

## 11. Additional Notes (Optional)
- The app MVP will work offline for QR scanning.  
- Future versions may include:  
  - ☁️ Cloud sync for backup across devices  
  - 🎨 Custom branding (company logo on QR code)  
  - 📊 Analytics (track number of times QR is scanned)  
  - 🔗 NFC-based contact sharing (tap-to-share)  
