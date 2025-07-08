# Secure Login Portal with CAPTCHA Verification

> **Project Title:** Secure Login Portal with CAPTCHA Verification  
> **Author:** Ragini Singh
> Reg no.: 12419137
> **Course Code:** PETV83L  
> **Date:** July 2025

---

## Overview

This project is a professional-grade secure login system designed to demonstrate advanced cybersecurity practices, including robust password validation and dynamic CAPTCHA verification. The portal simulates a high-security environment suitable for educational, demonstration, or prototype use.

---

## Features

- **Modern UI/UX:** Clean, responsive interface with a cybersecurity theme.
- **Username/Email Validation:** Ensures correct format for user credentials.
- **Password Strength Enforcement:** Real-time feedback for password requirements (length, uppercase, lowercase, number, special character).
- **CAPTCHA Verification:** Randomly generated image-based CAPTCHA to prevent automated logins.
- **Error Handling:** User-friendly error messages for invalid input or failed authentication.
- **Session Feedback:** Success message upon authentication, with simulated secure session initialization.
- **Accessibility:** Keyboard navigation and clear visual cues.

---

## File Structure

```
secure-login/
│   auth.html                # Authentication success page
│   DENIED.HTML              # Access denied page
│   login.html               # Main login interface
│   script.js                # Frontend logic (validation, CAPTCHA, UI)
│   style.css                # Custom styles and responsive design
│
└───Hackdoor_Captcha/
    │   generate_captchas.py     # Python script to generate CAPTCHA images
    │
    └───captcha-images/
            cap1.png
            cap2.png
            ...
            cap10.png           # Pre-generated CAPTCHA images
```

---

## How It Works

1. **User Login:**
   - Enter username/email and password.
   - Password is validated in real-time for security requirements.
2. **CAPTCHA Challenge:**
   - User must solve a randomly selected CAPTCHA image.
   - Option to refresh for a new CAPTCHA.
3. **Authentication:**
   - On successful validation, user is redirected to `auth.html`.
   - On failure, error messages are displayed or redirected to `DENIED.HTML`.

---

## Setup & Usage

1. Clone or download the repository.
2. Open `login.html` in a web browser.
3. To generate new CAPTCHA images, run `generate_captchas.py` (requires Python and Pillow library).

---

## Technologies Used

- HTML5, CSS3 (with Google Fonts)
- JavaScript (Vanilla)
- Python (for CAPTCHA generation)
- [Pillow](https://python-pillow.org/) (Python Imaging Library)

---


## License

This project is for educational purposes only. All rights reserved © 2025 Ragini Singh.
