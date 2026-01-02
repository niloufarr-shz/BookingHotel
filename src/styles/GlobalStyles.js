import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

/* ===================== */
/* 🌞 LIGHT MODE (DEFAULT) */
/* ===================== */

:root {
  /* Brand */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;

  /* Grey */
  --color-grey-0: #ffffff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  /* Status colors */
  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;

  --color-green-100: #dcfce7;
  --color-green-700: #15803d;

  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;

  /* UI */
  --backdrop-color: rgba(255, 255, 255, 0.1);

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  /* Radius */
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  /* Images */
  --image-grayscale: 0%;
  --image-opacity: 100%;
}

/* ===================== */
/* 🌙 DARK MODE */
/* ===================== */

.dark-mode {
  --color-grey-0: #18212f;
  --color-grey-50: #1f2937;
  --color-grey-100: #374151;
  --color-grey-200: #4b5563;
  --color-grey-300: #6b7280;
  --color-grey-400: #9ca3af;
  --color-grey-500: #d1d5db;
  --color-grey-600: #e5e7eb;
  --color-grey-700: #f3f4f6;
  --color-grey-800: #f9fafb;
  --color-grey-900: #ffffff;

  --color-brand-50: #1e1b4b;
  --color-brand-100: #312e81;
  --color-brand-200: #3730a3;
  --color-brand-500: #6366f1;
  --color-brand-600: #818cf8;
  --color-brand-700: #a5b4fc;
  --color-brand-800: #c7d2fe;
  --color-brand-900: #e0e7ff;

  --color-blue-100: #075985;
  --color-blue-700: #7dd3fc;

  --color-green-100: #166534;
  --color-green-700: #4ade80;

  --color-yellow-100: #854d0e;
  --color-yellow-700: #fde047;

  --color-red-100: #7f1d1d;
  --color-red-700: #f87171;
  --color-red-800: #fecaca;

  --color-silver-100: #374151;
  --color-silver-700: #e5e7eb;

  --backdrop-color: rgba(0, 0, 0, 0.4);

  --image-grayscale: 10%;
  --image-opacity: 90%;
}

/* ===================== */
/* 🌍 GLOBAL RESET */
/* ===================== */

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: background-color 0.3s, border 0.3s, color 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  font-size: 1.6rem;
  min-height: 100vh;
  line-height: 1.5;

  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

input:disabled,
select:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

img {
  max-width: 100%;
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;

export default GlobalStyles;
