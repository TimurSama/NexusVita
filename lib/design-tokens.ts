/**
 * Design Tokens для Nexus Vita
 * Неоморфизм + Material 3 Expressive + Теплая палитра
 */

export const designTokens = {
  colors: {
    // Теплый серый
    warmGray: {
      50: '#f9f7f4',
      100: '#f2ede8',
      200: '#e8e0d8',
      300: '#d9cec4',
      400: '#c4b5a8',
      500: '#a8998c',
      600: '#8a7d72',
      700: '#6f645b',
      800: '#574e47',
      900: '#3d3631',
    },
    // Теплый графитовый
    warmGraphite: {
      50: '#f5f3f0',
      100: '#e8e4df',
      200: '#d4cdc5',
      300: '#b8afa4',
      400: '#9a8e81',
      500: '#7d7165',
      600: '#645a50',
      700: '#4f4740',
      800: '#3d3631',
      900: '#2a2521',
    },
    // Теплый мягкий голубой
    warmBlue: {
      50: '#f0f5f9',
      100: '#d4e4f0',
      200: '#b8d3e7',
      300: '#9cc2de',
      400: '#80b1d5',
      500: '#64a0cc',
      600: '#4d8bb8',
      700: '#3d6f91',
      800: '#2e536a',
      900: '#1f3743',
    },
    // Розовый
    warmPink: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9f1239',
      900: '#831843',
    },
    // Зеленый
    warmGreen: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    // Красный
    warmRed: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  borderRadius: {
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    full: '9999px',
  },
  shadows: {
    // Неоморфные тени (светлая тема)
    neumorphicLight: {
      raised: '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.9)',
      pressed: 'inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.9)',
      soft: '6px 6px 12px rgba(0, 0, 0, 0.08), -6px -6px 12px rgba(255, 255, 255, 0.8)',
    },
    // Неоморфные тени (темная тема)
    neumorphicDark: {
      raised: '8px 8px 16px rgba(0, 0, 0, 0.5), -8px -8px 16px rgba(255, 255, 255, 0.05)',
      pressed: 'inset 4px 4px 8px rgba(0, 0, 0, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.05)',
      soft: '6px 6px 12px rgba(0, 0, 0, 0.4), -6px -6px 12px rgba(255, 255, 255, 0.03)',
    },
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    },
  },
} as const
