# ShopSmart MLM Ecommerce Platform - Styling Guide

## Overview

This document provides a comprehensive guide to the styling system used in the ShopSmart MLM Ecommerce Platform. The platform uses a modern, scalable CSS architecture built with Tailwind CSS and custom components.

## Table of Contents

1. [Design System](#design-system)
2. [CSS Architecture](#css-architecture)
3. [Component Library](#component-library)
4. [Utility Classes](#utility-classes)
5. [Responsive Design](#responsive-design)
6. [Accessibility](#accessibility)
7. [Best Practices](#best-practices)
8. [File Structure](#file-structure)

## Design System

### Color Palette

#### Primary Colors
- **Primary 50-950**: Blue gradient from light to dark
- **Primary 500**: Main brand color (#3b82f6)
- **Primary 600**: Hover states (#2563eb)
- **Primary 700**: Active states (#1d4ed8)

#### Secondary Colors
- **Secondary 50-950**: Gray gradient for text and backgrounds
- **Secondary 500**: Body text (#64748b)
- **Secondary 900**: Headings (#0f172a)

#### Semantic Colors
- **Success**: Green for positive actions (#22c55e)
- **Warning**: Orange for warnings (#f59e0b)
- **Danger**: Red for errors (#ef4444)

#### MLM-Specific Colors
- **Gold**: Premium tier (#ffd700)
- **Silver**: Standard tier (#c0c0c0)
- **Bronze**: Basic tier (#cd7f32)
- **Diamond**: Elite tier (#b9f2ff)
- **Platinum**: VIP tier (#e5e4e2)

### Typography

#### Font Families
- **Sans**: Inter (Primary font)
- **Display**: Poppins (Headings)
- **Mono**: JetBrains Mono (Code)

#### Font Sizes
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)

### Spacing

#### Standard Spacing Scale
- **0**: 0px
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **4**: 1rem (16px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)
- **24**: 6rem (96px)

### Shadows

#### Shadow Variants
- **soft**: Subtle shadow for cards
- **medium**: Medium shadow for elevated elements
- **large**: Strong shadow for modals
- **glow**: Glowing effect for primary elements

## CSS Architecture

### File Structure

```
src/
├── index.css              # Global styles and Tailwind imports
├── App.css                # App-specific styles
└── styles/
    └── components.css     # Component-specific styles
```

### CSS Layers

#### 1. Base Layer (`@layer base`)
- Global resets
- Typography defaults
- Form element styles
- Focus states

#### 2. Component Layer (`@layer components`)
- Button variants
- Card styles
- Form components
- Navigation elements
- Modal components

#### 3. Utility Layer (`@layer utilities`)
- Custom utilities
- Responsive helpers
- Animation classes

### CSS Variables

```css
:root {
  /* Primary Colors */
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;
  
  /* Secondary Colors */
  --color-secondary-50: #f8fafc;
  --color-secondary-500: #64748b;
  --color-secondary-900: #0f172a;
  
  /* Shadows */
  --shadow-soft: 0 2px 15px -3px rgba(0, 0, 0, 0.07);
  --shadow-medium: 0 4px 25px -5px rgba(0, 0, 0, 0.1);
  --shadow-large: 0 10px 40px -10px rgba(0, 0, 0, 0.15);
}
```

## Component Library

### Buttons

#### Button Variants
```html
<!-- Primary Button -->
<button class="btn btn-primary">Primary Action</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Secondary Action</button>

<!-- Success Button -->
<button class="btn btn-success">Success Action</button>

<!-- Warning Button -->
<button class="btn btn-warning">Warning Action</button>

<!-- Danger Button -->
<button class="btn btn-danger">Danger Action</button>

<!-- Outline Button -->
<button class="btn btn-outline">Outline Action</button>

<!-- Ghost Button -->
<button class="btn btn-ghost">Ghost Action</button>
```

#### Button Sizes
```html
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-md">Medium</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### Cards

#### Basic Card
```html
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content goes here.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

#### Product Card
```html
<div class="product-card">
  <div class="product-image-container">
    <img src="product.jpg" alt="Product" class="product-image" />
    <div class="badge badge-primary">New</div>
  </div>
  <div class="product-info">
    <h3 class="product-title">Product Name</h3>
    <div class="product-price">$99.99</div>
    <button class="btn btn-primary w-full">Add to Cart</button>
  </div>
</div>
```

### Forms

#### Form Components
```html
<div class="form-group">
  <label class="form-label">Email Address</label>
  <input type="email" class="form-input" placeholder="Enter your email" />
  <p class="form-help">We'll never share your email.</p>
</div>

<div class="form-group">
  <label class="form-label">Message</label>
  <textarea class="form-textarea" placeholder="Enter your message"></textarea>
  <p class="form-error">This field is required.</p>
</div>
```

### Badges

#### Badge Variants
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Danger</span>

<!-- MLM Badges -->
<span class="badge badge-gold">Gold Member</span>
<span class="badge badge-silver">Silver Member</span>
<span class="badge badge-bronze">Bronze Member</span>
<span class="badge badge-diamond">Diamond Member</span>
<span class="badge badge-platinum">Platinum Member</span>
```

### Alerts

#### Alert Variants
```html
<div class="alert alert-info">
  <div class="alert-title">Information</div>
  <div class="alert-message">This is an informational message.</div>
</div>

<div class="alert alert-success">
  <div class="alert-title">Success</div>
  <div class="alert-message">Operation completed successfully.</div>
</div>

<div class="alert alert-warning">
  <div class="alert-title">Warning</div>
  <div class="alert-message">Please review your input.</div>
</div>

<div class="alert alert-danger">
  <div class="alert-title">Error</div>
  <div class="alert-message">Something went wrong.</div>
</div>
```

## Utility Classes

### Layout Utilities

#### Container
```html
<div class="container-responsive">
  <!-- Responsive container with max-width and padding -->
</div>
```

#### Grid Layouts
```html
<div class="grid-auto-fit">
  <!-- Auto-fitting grid for products -->
</div>

<div class="grid-auto-fill">
  <!-- Auto-filling grid for larger collections -->
</div>
```

### Animation Utilities

#### Animation Classes
```html
<div class="animate-fade-in">Fade in animation</div>
<div class="animate-slide-up">Slide up animation</div>
<div class="animate-slide-down">Slide down animation</div>
<div class="animate-scale-in">Scale in animation</div>
```

#### Hover Effects
```html
<div class="hover-lift">Lifts on hover</div>
<div class="hover-glow">Glows on hover</div>
```

### Text Utilities

#### Text Gradients
```html
<h1 class="text-gradient-primary">Gradient Text</h1>
<h2 class="text-gradient-secondary">Secondary Gradient</h2>
```

#### Text Balance
```html
<p class="text-balance">Balanced text wrapping</p>
<p class="text-pretty">Pretty text wrapping</p>
```

## Responsive Design

### Breakpoints

- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

### Responsive Utilities

#### Responsive Spacing
```html
<div class="space-y-responsive">
  <!-- Responsive vertical spacing -->
</div>
```

#### Responsive Visibility
```html
<div class="mobile-menu lg:hidden">Mobile only</div>
<div class="desktop-menu hidden lg:flex">Desktop only</div>
```

### Mobile-First Approach

All components are designed with a mobile-first approach:

1. **Base styles** are for mobile
2. **Responsive prefixes** (sm:, md:, lg:, xl:) add styles for larger screens
3. **Touch-friendly** interactions (minimum 44px touch targets)
4. **Optimized** layouts for small screens

## Accessibility

### Focus Management

- **Visible focus indicators** on all interactive elements
- **Keyboard navigation** support
- **Screen reader** friendly markup

### Color Contrast

- **WCAG AA compliant** color combinations
- **High contrast mode** support
- **Color-blind friendly** design

### Semantic HTML

- **Proper heading hierarchy** (h1, h2, h3, etc.)
- **ARIA labels** for complex components
- **Alt text** for images
- **Form labels** properly associated with inputs

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Best Practices

### CSS Organization

1. **Use semantic class names** that describe purpose, not appearance
2. **Group related styles** together
3. **Comment complex CSS** for maintainability
4. **Use CSS custom properties** for consistent values

### Performance

1. **Minimize CSS bundle size** by using Tailwind's purge
2. **Use efficient selectors** (avoid deep nesting)
3. **Optimize critical CSS** for above-the-fold content
4. **Lazy load** non-critical styles

### Maintainability

1. **Follow consistent naming conventions**
2. **Document component usage** with examples
3. **Use design tokens** for consistent values
4. **Regular code reviews** for style consistency

### Component Guidelines

1. **Single responsibility** - each component has one purpose
2. **Composable** - components can be combined easily
3. **Configurable** - use props for customization
4. **Accessible** - follow WCAG guidelines

## File Structure

```
src/
├── index.css                    # Global styles, Tailwind imports
├── App.css                      # App-specific styles
├── styles/
│   └── components.css           # Component-specific styles
├── components/
│   ├── shared/                  # Shared components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Sidebar.jsx
│   ├── ecommerce/              # Ecommerce components
│   │   ├── ProductCard.jsx
│   │   ├── ShoppingCart.jsx
│   │   └── Checkout.jsx
│   ├── dashboard/              # Dashboard components
│   │   ├── DashboardLayout.jsx
│   │   ├── NetworkTree.jsx
│   │   └── Wallet.jsx
│   └── auth/                   # Authentication components
│       └── RegisterForm.jsx
└── pages/                      # Page components
    ├── Home.jsx
    ├── Shop.jsx
    ├── Dashboard.jsx
    └── ...
```

## Getting Started

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

### Customization

1. **Modify colors** in `tailwind.config.js`
2. **Add new components** in `src/styles/components.css`
3. **Update global styles** in `src/index.css`
4. **Create new pages** following existing patterns

### Contributing

1. **Follow the established patterns** in existing components
2. **Use the design system** colors, spacing, and typography
3. **Test on multiple screen sizes** and devices
4. **Ensure accessibility** compliance
5. **Document new components** with usage examples

## Support

For questions about the styling system:

1. **Check this guide** for common patterns
2. **Review existing components** for examples
3. **Consult Tailwind CSS documentation** for utilities
4. **Contact the development team** for specific issues

---

*This styling guide is a living document and will be updated as the design system evolves.* 