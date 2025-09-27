# MindfulU Shared Theme Configuration

This document outlines the shared design system and theme configuration used across all MindfulU applications to ensure consistency and brand coherence.

## 🎨 Brand Colors

### Primary Colors
```css
--brand-purple: #8B5CF6    /* Primary brand color */
--brand-yellow: #FBBF24    /* Accent and highlight color */
--brand-pink: #EC4899      /* Secondary accent */
--brand-teal: #14B8A6      /* Success and positive actions */
--bg-cream: #FFFBEB        /* Background color */
--text-dark: #1F2937       /* Primary text */
--text-medium: #6B7280     /* Secondary text */
```

### Extended Palette
```css
--brand-blue: #3B82F6      /* Additional accent */
--brand-green: #10B981     /* Success states */
--brand-orange: #F59E0B    /* Warning states */
```

## 🔤 Typography

### Font Families
- **Headers**: Poppins (sans-serif)
- **Body Text**: Inter (sans-serif)  
- **Handwritten Elements**: Caveat (cursive)

### Font Weights
- Regular: 400
- Medium: 500
- Semi-bold: 600
- Bold: 700
- Extra-bold: 800

## 🎯 Component Styling

### Buttons
```css
.btn-primary {
  background: var(--brand-purple);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}
```

### Cards
```css
.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 30px -15px rgba(139, 92, 246, 0.15);
}
```

### Gradients
```css
.gradient-purple {
  background: linear-gradient(135deg, var(--brand-purple), #A855F7);
}

.gradient-teal {
  background: linear-gradient(135deg, var(--brand-teal), #06B6D4);
}

.gradient-pink {
  background: linear-gradient(135deg, var(--brand-pink), #F472B6);
}
```

## 🎭 Animations

### Key Animations
```css
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-gentle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```

### Animation Classes
- `.animate-float` - Floating animation for icons
- `.animate-fade-in-up` - Fade in with upward motion
- `.animate-pulse-gentle` - Gentle pulsing effect
- `.animate-slide-up` - Slide up animation for messages

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Adaptations
- Reduced padding and margins
- Simplified layouts
- Touch-friendly button sizes (minimum 44px)
- Optimized typography scaling

## 🎨 Application-Specific Adaptations

### GameGPT Frontend
- Game cards with purple borders
- Chat interface with MindfulU colors
- Loading spinners with brand colors

### Assessment Engine
- Progress bars with teal gradients
- Question cards with rounded corners
- Privacy-focused messaging with purple accents

### Chatbot Demo
- Message bubbles with brand gradients
- Welcome screen with floating animations
- Status indicators with pulsing effects

### MindfulU Main Frontend
- Landing page with full brand experience
- Dashboard with warm, inviting colors
- Assessment flow with progress visualization

## 🔧 Implementation Guidelines

### 1. Import Theme Files
Each application should import the MindfulU theme CSS:
```css
@import './mindfulu-theme.css';
```

### 2. Use CSS Variables
Prefer CSS custom properties for colors:
```css
color: var(--brand-purple);
background: var(--bg-cream);
```

### 3. Consistent Spacing
Use consistent spacing scale:
- 4px, 8px, 12px, 16px, 24px, 32px, 48px

### 4. Border Radius
- Small elements: 8px
- Cards and buttons: 12px-16px
- Large containers: 20px-24px

### 5. Shadows
- Light: `0 4px 6px -1px rgba(139, 92, 246, 0.1)`
- Medium: `0 8px 15px rgba(139, 92, 246, 0.15)`
- Heavy: `0 20px 30px -15px rgba(139, 92, 246, 0.2)`

## 🎯 Brand Voice & Messaging

### Tone
- Warm and supportive
- Professional yet approachable
- Privacy-focused
- Empowering and positive

### Key Phrases
- "Your Safe Space"
- "Privacy First"
- "Your Journey Matters"
- "Always Here for You"

### Visual Elements
- Soft, rounded corners
- Gentle animations
- Warm color palette
- Clean, uncluttered layouts
- Emphasis on security and privacy

## 📋 Checklist for New Components

When adding new components, ensure:
- [ ] Uses MindfulU color palette
- [ ] Implements consistent spacing
- [ ] Includes hover states and transitions
- [ ] Is responsive across devices
- [ ] Follows accessibility guidelines
- [ ] Maintains privacy-first messaging
- [ ] Uses appropriate typography hierarchy
- [ ] Includes loading states where needed

This shared theme system ensures a cohesive user experience across all MindfulU applications while maintaining the brand's core values of privacy, support, and mental wellness.

