// ✅ Image-based CAPTCHA pool
const imageCaptchas = [
  { src: 'Hackdoor_Captcha/captcha-images/cap1.png', value: 'ZFK8V' },
  { src: 'Hackdoor_Captcha/captcha-images/cap2.png', value: 'R3JGW' },
  { src: 'Hackdoor_Captcha/captcha-images/cap3.png', value: 'KC6KG' },
  { src: 'Hackdoor_Captcha/captcha-images/cap4.png', value: 'PYVVU' },
  { src: 'Hackdoor_Captcha/captcha-images/cap5.png', value: '2TLF7' },
  { src: 'Hackdoor_Captcha/captcha-images/cap6.png', value: 'V6M6X' },
  { src: 'Hackdoor_Captcha/captcha-images/cap7.png', value: 'P3BAO' },
  { src: 'Hackdoor_Captcha/captcha-images/cap8.png', value: 'EROKA' },
  { src: 'Hackdoor_Captcha/captcha-images/cap9.png', value: 'XYRJ5' },
  { src: 'Hackdoor_Captcha/captcha-images/cap10.png', value: 'EKC52' }
];

let currentCaptcha = null;

// ✅ Toggle password visibility
function togglePassword() {
  const passwordField = document.getElementById('password');
  const eyeIcon = document.querySelector('.toggle-password');
  
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    eyeIcon.textContent = '👁️‍🗨️'; // Changed eye icon
    eyeIcon.title = 'Hide Password';
    eyeIcon.classList.add('active');
  } else {
    passwordField.type = 'password';
    eyeIcon.textContent = '👁️';
    eyeIcon.title = 'Show Password';
    eyeIcon.classList.remove('active');
  }
  
  // Add glitch effect on toggle
  passwordField.classList.add('glitch-effect');
  setTimeout(() => {
    passwordField.classList.remove('glitch-effect');
  }, 500);
  
  // Ensure focus remains on password field
  passwordField.focus();
}

// ✅ Create matrix particles
function createMatrixParticles() {
  const body = document.querySelector('body');
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    body.appendChild(particle);
  }
}

// ✅ Load random image CAPTCHA
function generateImageCaptcha() {
  const selected = imageCaptchas[Math.floor(Math.random() * imageCaptchas.length)];
  currentCaptcha = selected;
  document.getElementById('captchaImage').src = selected.src;
  
  // Add a loading effect
  const captchaImg = document.getElementById('captchaImage');
  captchaImg.style.opacity = '0.5';
  setTimeout(() => {
    captchaImg.style.opacity = '1';
  }, 300);
  
  console.log("Expected CAPTCHA:", selected.value); // Optional for testing
}

// ✅ Validate password as user types
function validatePassword(password) {
  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  // Update rule indicators
  document.getElementById('rule-length').className = rules.length ? 'valid' : 'invalid';
  document.getElementById('rule-upper').className = rules.upper ? 'valid' : 'invalid';
  document.getElementById('rule-lower').className = rules.lower ? 'valid' : 'invalid';
  document.getElementById('rule-number').className = rules.number ? 'valid' : 'invalid';
  document.getElementById('rule-special').className = rules.special ? 'valid' : 'invalid';

  // Update text for each rule
  document.getElementById('rule-length').innerHTML = rules.length ? '✅ Min 8 characters' : '❌ Min 8 characters';
  document.getElementById('rule-upper').innerHTML = rules.upper ? '✅ Uppercase letter' : '❌ Uppercase letter';
  document.getElementById('rule-lower').innerHTML = rules.lower ? '✅ Lowercase letter' : '❌ Lowercase letter';
  document.getElementById('rule-number').innerHTML = rules.number ? '✅ Number' : '❌ Number';
  document.getElementById('rule-special').innerHTML = rules.special ? '✅ Special character' : '❌ Special character';

  // Make the toggle button more visible as requirements are met
  const toggleBtn = document.querySelector('.toggle-password');
  const validRulesCount = Object.values(rules).filter(rule => rule).length;
  
  // Increase opacity based on how many rules are valid
  if (password.length > 0) {
    const opacityValue = 0.3 + (validRulesCount / 5) * 0.7;
    toggleBtn.style.opacity = opacityValue.toString();
  }

  return Object.values(rules).every(rule => rule === true);
}

// ✅ Form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const captchaInput = document.getElementById('captchaInput').value.trim().toUpperCase();
  let isValid = true;

  // Reset messages
  document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
  document.getElementById('successMessage').style.display = 'none';

  // Username validation
  if (!username || username.length < 3) {
    document.getElementById('usernameError').style.display = 'block';
    document.getElementById('usernameError').textContent = "Username must be at least 3 characters";
    isValid = false;
  }

  // Password validation
  if (!validatePassword(password)) {
    document.getElementById('passwordError').style.display = 'block';
    document.getElementById('passwordError').textContent = "Password doesn't meet security requirements";
    isValid = false;
  }

  // CAPTCHA validation
  if (!currentCaptcha || captchaInput !== currentCaptcha.value) {
    document.getElementById('captchaError').style.display = 'block';
    isValid = false;
  }

  // Final result
  if (isValid) {
    // Save user email to local storage for the auth page
    localStorage.setItem('userEmail', username);
    
    // Show success animation
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('successMessage').innerHTML = `<div class="success-animation">Access granted! Initializing secure session...</div>`;
    
    // Redirect after a delay
    setTimeout(() => {
      window.location.href = 'auth.html';
    }, 1500);
  } else {
    // Add a shake effect to the form
    const form = document.querySelector('.login-form');
    form.classList.add('error-shake');
    setTimeout(() => {
      form.classList.remove('error-shake');
    }, 500);
    
    generateImageCaptcha(); // Refresh CAPTCHA
  }
});

// ✅ On page load
window.addEventListener('load', () => {
  generateImageCaptcha();
  createMatrixParticles();
  
  // Show password rules when password field is focused or has input
  const passwordField = document.getElementById('password');
  
  passwordField.addEventListener('focus', () => {
    document.getElementById('passwordRules').style.display = 'block';
  });
  
  // Show toggle button when password field has content
  passwordField.addEventListener('input', () => {
    const toggleBtn = document.querySelector('.toggle-password');
    validatePassword(passwordField.value);
    
    // Show the toggle button only when password field has content
    if (passwordField.value.length > 0) {
      toggleBtn.style.opacity = '1';
      toggleBtn.style.pointerEvents = 'auto';
    } else {
      toggleBtn.style.opacity = '0.3';
    }
  });
  
  // Initialize toggle button state
  const toggleBtn = document.querySelector('.toggle-password');
  toggleBtn.style.opacity = '0.3';
});
