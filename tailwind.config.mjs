/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // Primary brand colors (aligned with logo gold)
                primary: '#C9A227',
                'primary-hover': '#E0B945',
                'primary-light': 'rgba(201, 162, 39, 0.1)',
                'primary-dark': '#A6891F',
                
                // Base background colors
                secondary: '#0B0F14', // Near-black base
                'surface': '#121826', // Card/surface background
                'surface-light': '#151C2C', // Lighter surface variant
                
                // Legacy support (keep for backward compatibility)
                accent: '#121826',
                'accent-light': '#151C2C',
                
                white: '#FFFFFF',
                gray: {
                    50: '#FAFAFA',
                    100: '#F5F5F5',
                    200: '#E5E7EB',
                    300: '#D4D4D4',
                    400: '#A3A3A3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif'],
                arabic: ['Cairo', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-gradient': 'linear-gradient(to right bottom, #0B0F14, #121826)',
            },
            spacing: {
                'section': '5rem', // py-20 equivalent
                'section-mobile': '3rem', // py-12 equivalent
            },
            borderRadius: {
                'xl': '1.25rem',
                '2xl': '1.5rem',
            },
            boxShadow: {
                'primary': '0 4px 12px rgba(201, 162, 39, 0.3)',
                'primary-lg': '0 10px 25px rgba(201, 162, 39, 0.4)',
            }
        },
    },
    plugins: [],
}
