# Script Organization Guide

## Overview
All scripts have been organized into modular, reusable components for better maintainability and clarity.

---

## Script Modules

### **main.js**
**Entry point** for all page functionality. Initializes all modules on `DOMContentLoaded` event.
- Imports all sub-modules
- Calls initialization functions
- Single connection point in HTML files

**Usage:** Add to every HTML page:
```html
<script type="module" src="../scripts/main.js"></script>
```

---

### **navigation.js**
**Handles navigation interactions:**
- Sticky navigation styling on scroll
- Observes hero element visibility
- Adds/removes `.scrolled` class to nav

**Exported Function:**
- `initNavigation()` - Initialize navigation behavior

**Depends on:**
- `.site-nav` element
- `#hero` element (triggers scroll effect)
- CSS class: `.scrolled`

---

### **modal.js**
**Handles login modal and tab switching:**
- Open/close login modal
- Tab switching in modal
- Keyboard support (Escape key)
- Backdrop click detection

**Exported Function:**
- `initLoginModal()` - Initialize modal interactions

**Depends on:**
- `.login-btn` button
- `#loginModal` element
- `.close-modal` button
- `.login-tab` elements
- `.tab-panel` elements
- `.modal-backdrop` element
- CSS classes: `.show`, `.active`
- HTML attributes: `data-target`, `aria-hidden`, `aria-selected`

---

### **animations.js**
**Handles scroll-triggered reveal animations:**
- Observes elements with `.reveal` class
- Adds `.visible` class when scrolled into view
- Threshold: 12% visibility

**Exported Function:**
- `initScrollAnimations()` - Initialize scroll observer

**Depends on:**
- HTML class: `.reveal`
- CSS class: `.visible`
- IntersectionObserver API

---

### **forms.js**
**Handles form submission events:**
- Create Webinar form submission
- Registration/RSVP form submission
- Demo alerts for testing

**Exported Function:**
- `initFormHandlers()` - Initialize form listeners

**Depends on:**
- `#createWebinar` form element
- `#registerForm` form element

---

### **videoplayer.js**
**Existing video player controls:**
- Play/pause toggle
- Stop (rewind to start)
- Volume control
- Mute/unmute

**Usage:** Should be imported when needed for pages with videos.
- Currently not auto-imported in main.js
- Can be conditionally loaded if video element exists

---

### **convert-og.js**
**Node.js utility (not browser-side):**
- Converts SVG to PNG images
- Used for Open Graph social media images
- Run with: `node scripts/convert-og.js`

---

## HTML Integration

Every page now includes a **single script reference**:

```html
  <script type="module" src="../scripts/main.js"></script>
</body>
</html>
```

### Pages Updated:
- ✅ index.html
- ✅ webinars.html
- ✅ quality.html
- ✅ design.html
- ✅ ai.html
- ✅ info-security.html
- ✅ login.html

---

## How to Add New Features

### If adding new functionality:
1. **Create a new module** in `scripts/` (e.g., `scripts/myfeature.js`)
2. **Export an init function**: `export function initMyFeature() { ... }`
3. **Import in main.js**: `import { initMyFeature } from './myfeature.js';`
4. **Call in DOMContentLoaded**: `initMyFeature();`

### Example:
```javascript
// scripts/myfeature.js
export function initMyFeature() {
  const element = document.querySelector('.my-element');
  if (!element) return; // Graceful exit if not on this page
  
  element.addEventListener('click', () => {
    console.log('Feature activated!');
  });
}
```

---

## Benefits of This Structure

✅ **Modular** - Each feature in its own file  
✅ **Maintainable** - Easy to locate and update specific features  
✅ **Reusable** - Modules can be imported elsewhere if needed  
✅ **Clean HTML** - One script tag per page  
✅ **Scalable** - Add new features without cluttering existing code  
✅ **Easy Testing** - Functions can be tested individually  

---

## Quick Reference: Which Module Does What

| Feature | Module | Trigger |
|---------|--------|---------|
| Sticky nav | navigation.js | DOMContentLoaded |
| Login modal | modal.js | DOMContentLoaded |
| Scroll reveals | animations.js | DOMContentLoaded |
| Form handling | forms.js | DOMContentLoaded |
| Video controls | videoplayer.js | (manual import) |
