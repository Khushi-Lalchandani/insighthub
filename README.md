# Analytic Dashboard

A modern, responsive analytics dashboard built with React, TypeScript, and Tailwind CSS.

## 🎨 Color Themes

This application supports both light and dark themes with a clean, minimal design aesthetic.

### Light Theme

| Element | Color | Tailwind Class | Hex Value |
|---------|-------|----------------|-----------|
| **Background** | Light Gray | `bg-gray-50` | `#F9FAFB` |
| **Sidebar Background** | White | `bg-white` | `#FFFFFF` |
| **Card Background** | White | `bg-white` | `#FFFFFF` |
| **Primary Text** | Dark Gray | `text-gray-900` | `#111827` |
| **Secondary Text** | Medium Gray | `text-gray-600` | `#4B5563` |
| **Borders** | Light Gray | `border-gray-200` | `#E5E7EB` |
| **Active Link Background** | Light Gray | `bg-gray-100` | `#F3F4F6` |
| **Active Link Border** | Dark Gray | `border-gray-800` | `#1F2937` |
| **Hover Background** | Very Light Gray | `hover:bg-gray-50` | `#F9FAFB` |

### Dark Theme

| Element | Color | Tailwind Class | Hex Value |
|---------|-------|----------------|-----------|
| **Background** | Very Dark Gray | `bg-gray-900` | `#111827` |
| **Sidebar Background** | Very Dark Gray | `bg-gray-900` | `#111827` |
| **Card Background** | Dark Gray | `bg-gray-800` | `#1F2937` |
| **Primary Text** | Light Gray | `text-gray-100` | `#F3F4F6` |
| **Secondary Text** | Medium Gray | `text-gray-400` | `#9CA3AF` |
| **Borders** | Dark Gray | `border-gray-700` | `#374151` |
| **Active Link Background** | Medium Dark Gray | `bg-gray-700` | `#374151` |
| **Active Link Border** | Light Gray | `border-gray-300` | `#D1D5DB` |
| **Hover Background** | Dark Gray | `hover:bg-gray-800` | `#1F2937` |

## 🎯 Design Principles

- **Minimal & Clean**: Gray-based color palette for a professional appearance
- **Subtle Contrast**: Soft shadows and borders for visual hierarchy
- **Active State Indication**: Left border accent on active navigation items
- **Consistent Spacing**: Uniform padding and margins throughout
- **Smooth Transitions**: All color changes animate smoothly

## 🚀 Features

- ✅ Protected routes with authentication
- ✅ Responsive sidebar navigation
- ✅ Active link highlighting
- ✅ Light/Dark theme toggle
- ✅ Modern card-based layouts
- ✅ Smooth transitions and animations

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth.tsx              # Authentication component
│   ├── Dashboard.tsx         # Dashboard page
│   ├── DashboardLayout.tsx   # Main layout with sidebar
│   ├── Report.tsx            # Report page
│   ├── Settings.tsx          # Settings page
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── ThemeToggle.tsx       # Theme switcher
│   └── ProtectedRoutes.tsx   # Route protection
├── AppRoutes.tsx             # Route configuration
└── index.css                 # Global styles
```

## 🛠️ Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## 💻 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Customizing Colors

To customize the theme colors, modify the Tailwind classes in the following files:

- **Sidebar**: `src/components/Sidebar.tsx`
- **Layout**: `src/components/DashboardLayout.tsx`
- **Pages**: `src/components/Dashboard.tsx`, `Report.tsx`, `Settings.tsx`

### Example: Changing Active Link Color

In `Sidebar.tsx`, update the `activeClasses` variable:

```tsx
const activeClasses = 'bg-blue-100 text-blue-900 border-l-4 border-blue-600'
```

## 📝 License

MIT
