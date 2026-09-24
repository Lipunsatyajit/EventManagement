# Next.js Beginner Guide for Utkal Events

This guide explains the project in very simple words.

## 1. What Next.js is

Next.js is a React framework.

It helps you build:
- pages
- components
- routes
- layouts
- forms

In this project, we use the App Router.

## 2. Main rule of the App Router

In `app/`, the file names decide the route.

Examples:
- `app/page.tsx` = `/`
- `app/customer/login/page.tsx` = `/customer/login`
- `app/planner/dashboard/page.tsx` = `/planner/dashboard`
- `app/admin/dashboard/page.tsx` = `/admin/dashboard`

If you create a folder and add `page.tsx` inside it, that folder becomes a route.

## 3. What a component is

A component is a reusable UI piece.

Examples:
- header
- sidebar
- button
- card
- login form
- dashboard section

You create components when you want to reuse the same UI in many places.

## 4. How to create a new component

Create a `.tsx` file.

Example:

```tsx
export function HelloCard() {
  return <div>Hello</div>;
}
```

Use it like this:

```tsx
import { HelloCard } from "./hello-card";

export default function Page() {
  return <HelloCard />;
}
```

## 5. How to write HTML and TypeScript in Next.js

In Next.js, you write JSX inside `.tsx` files.

JSX looks like HTML, but it is written inside TypeScript.

Example:

```tsx
export default function Page() {
  const title = "Utkal Events";

  return (
    <main>
      <h1>{title}</h1>
      <p>This is a Next.js page.</p>
    </main>
  );
}
```

Rules:
- use `className` instead of `class`
- use `{}` to print TypeScript variables
- use `onClick`, `onChange`, `onSubmit` for actions

## 6. How to create CSS for one component

Use a CSS Module file.

Example:
- component file: `site-header.tsx`
- CSS file: `site-header.module.css`

The CSS file should have the same base name as the component.

Example CSS:

```css
.header {
  background: white;
}

.title {
  font-size: 24px;
}
```

## 7. How to connect CSS to a component

Import the CSS module in the component.

Example:

```tsx
import styles from "./site-header.module.css";

export function SiteHeader() {
  return <header className={styles.header}>Header</header>;
}
```

What happens:
- `styles.header` means the `.header` class from the CSS file
- the CSS file only affects this component

## 8. When to use `globals.css`

Use `globals.css` only for:
- body background
- font setup
- shared colors
- very common reset styles

Do not put all page styles in `globals.css`.

For component-specific styles, use CSS modules.

## 9. How to create a new route

Create a folder inside `app/`.

Then create `page.tsx` inside that folder.

Example:

```text
app/
  customer/
    profile/
      page.tsx
```

This becomes:
- `/customer/profile`

## 10. Folder structure rule for this project

Use this rule:

```text
app/
  layout.tsx
  globals.css
  _components/
  Component/
    Customer/
    Planner/
    SuperAdmin/
  customer/
  planner/
  admin/
```

Meaning:
- `app/Component/Customer` = customer UI components
- `app/Component/Planner` = planner UI components
- `app/Component/SuperAdmin` = super admin UI components
- `app/customer` = customer routes
- `app/planner` = planner routes
- `app/admin` = admin routes

## 11. Simple flow for building a new screen

1. Decide which role it belongs to
2. Create the route folder
3. Create `page.tsx`
4. Create a component if the UI is reusable
5. Create a `.module.css` file for that component
6. Import the CSS in the component
7. Put the page together

## 12. Example for a customer page

Route:
- `app/customer/dashboard/page.tsx`

Component:
- `app/Component/Customer/customer-dashboard.tsx`

CSS:
- `app/Component/Customer/customer-dashboard.module.css`

Component import:

```tsx
import styles from "./customer-dashboard.module.css";
```

## 13. Example for login flow

Customer login:
- email only
- OTP verification
- then dashboard

Planner login:
- email only
- OTP verification
- then planner dashboard

Super admin login:
- email only
- OTP verification
- then admin dashboard

## 14. How to know which CSS file is used

Look for imports like:

```tsx
import styles from "./name.module.css";
```

If you see that line in a component, that component is using that CSS file.

## 15. Very short summary

- `.tsx` file = component or page
- `page.tsx` = route
- `module.css` = component CSS
- `globals.css` = app-wide styles only
- `app/Component/...` = reusable UI pieces
- `app/customer`, `app/planner`, `app/admin` = route folders

End of guide.
