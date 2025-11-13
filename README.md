# 📱 QRConnect – Smart Digital Visiting Card App

## 1. Introduction

**QRConnect** is a modern, eco-friendly mobile application designed to replace traditional paper visiting cards. It allows users to instantly share their professional and personal contact information using a unique, scannable QR code.

---

## 👨‍💻 Project Details

* **Project Title:** QRConnect – Smart Digital Visiting Card App
* **Developed By:** Yash Lahase
* **Roll No:** 2024-B-17112006C

---

## 3. Problem Statement

Traditional paper visiting cards suffer from several drawbacks:
* They are **easily lost, forgotten, or damaged**.
* They are **not eco-friendly**, contributing to paper waste.
* They **cannot be updated** once printed, leading to outdated contact information.

In today's fast-paced, digital world, there is a clear need for a simple, instant, and sustainable method for sharing contact and professional details.

---

## 4. Proposed Solution / Idea

**QRConnect** provides a seamless digital solution:
1.  **Creation:** Users fill in their details (Name, Phone, Email, Instagram, LinkedIn, etc.) within the mobile app to create their digital visiting card.
2.  **Generation:** The app automatically generates a **unique, personalized QR code** for the user.
3.  **Sharing:** The user's QR code is scanned by another user (who also has the app installed) to **instantly view and save** the contact details directly into their in-app contact list.

---

## 5. Key Features ✨

| Icon | Feature | Description |
| :--- | :--- | :--- |
| 📱 | **QR Code Contact Sharing** | Instantly generate and share your digital visiting card as a scannable QR code. |
| 📝 | **Customizable Profile** | Easily add and update personal and professional details (Name, Phone, Email, LinkedIn, Instagram, etc.). |
| ⚡ | **One-Scan Save** | Users who scan your QR code can instantly save your details within the QRConnect app's contact section. |
| 🌐 | **Offline Functionality** | QR code generation and scanning/data transfer works **without requiring an active internet connection**. |
| 🌱 | **Digital & Eco-Friendly** | Eliminate the need for physical visiting cards, supporting a sustainable alternative. |
| 🔗 | **Smart Action Buttons** | Tap on phone numbers, email addresses, or social links to instantly open the respective dialer, mail app, or website. |
| 📋 | **Copy-to-Clipboard** | Long press on any field (phone, email, URLs) to quickly copy the information to the clipboard. |

---

## 6. Target Users / Audience 🎯

* **Professionals:** Ideal for networking events, business meetings, and client introductions.
* **Students:** Perfect for sharing educational details, portfolios, LinkedIn, and social media handles.
* **General Users:** A simple, modern way to exchange contact information with friends and family.

---

## 7. Technology Stack 🛠️

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | `React Native` | Cross-platform mobile development for iOS and Android. |
| **Backend** | `None` | Designed as a pure **offline-first** application for core functionality. |
| **Local Storage** | `AsyncStorage` | Used for saving the user's profile and all acquired contact details locally on the device. |
| **Tools** | `Expo CLI` | Development environment and toolchain for React Native. |
| **Libraries** | `React Native QRCode Generator`, `QRCode Scanner libraries` | For QR code handling. |

---

## 🚀 How to Run the Project (Expo Setup Guide)

Follow these steps to set up and run the QRConnect app locally using Expo:

### **Prerequisites**

1.  **Node.js** and **npm** installed.
2.  **Expo Go** app installed on your Android/iOS mobile device.

### **Installation Steps**

1.  **Clone the Repository** (Assume you've already cloned or downloaded the project files).
2.  **Navigate to the project folder:**
    ```bash
    cd my-app
    ```
3.  **Install dependencies:**
    ```bash
    npm i
    ```
4.  **Start the Expo project:**
    ```bash
    npm start
    # or
    npx expo start
    ```

### **Running on Mobile Device**

1.  **Ensure Same WiFi Network:** Your PC/Mac and your mobile device **must be connected to the exact same WiFi network**. If they are on different networks, the app will not load.
2.  **Scan the QR Code:**
    * Open the **Expo Go** app on your device.
    * Use the scanner function in Expo Go to scan the QR code displayed in your terminal or the Expo web dashboard (which opens in your browser).

### **Usage**

* Once the app loads:
    * **To Generate:** Fill in your details on the profile screen to generate your unique personal QR code.
    * **To Scan & Save:** Another user opens the Expo Go app, taps **Scan**, and scans your QR code. The scanned information instantly appears and is saved in their Contacts section within the QRConnect app.

---

## 8. Expected Outcome

The successful deployment of QRConnect will result in a robust mobile app that:
* Completely **eliminates the reliance on physical paper visiting cards**.
* Facilitates **instant and error-free** sharing and storage of contact details.
* Promotes an **eco-friendly and professional** method of networking.

---

## 9. Timeline 🗓️

| Week | Focus Area |
| :--- | :--- |
| **Week 1** | UI/UX design and Profile input form development. |
| **Week 2** | Implementation of the QR code generation feature. |
| **Week 3** | Implementation of QR code scanning and local contact saving functionality. |
| **Week 4** | Comprehensive testing, bug fixes, optimization, and final deployment. |

---

## 10. Future Enhancements (Optional) 🚀

The Minimum Viable Product (MVP) focuses on offline QR scanning.
**Future versions could include:**
    - * 🔐 **Login & Account System:** Google / Email login for cloud backup and syncing.
   - * ☁️ **Cloud Sync:** For backing up contacts and profile across multiple devices.
   - * 🎨 **Custom Branding:** Ability to add a company logo or customize the QR code design.
   - * 📊 **Analytics:** Tracking the number of times the digital card/QR code has been scanned.
   - * 🔗 **NFC-based Contact Sharing:** Implementing tap-to-share functionality.
