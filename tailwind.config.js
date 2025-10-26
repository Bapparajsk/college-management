const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // Poppins
        "poppins-thin": ["PoppinsThin", "sans-serif"],
        "poppins-light": ["PoppinsLight", "sans-serif"],
        "poppins": ["PoppinsRegular", "sans-serif"],
        "poppins-medium": ["PoppinsMedium", "sans-serif"],
        "poppins-semibold": ["PoppinsSemiBold", "sans-serif"],
        "poppins-bold": ["PoppinsBold", "sans-serif"],
        "poppins-extrabold": ["PoppinsExtraBold", "sans-serif"],

        // Inter
        "inter-thin": ["InterThin", "sans-serif"],
        "inter-light": ["InterLight", "sans-serif"],
        "inter": ["InterRegular", "sans-serif"],
        "inter-medium": ["InterMedium", "sans-serif"],
        "inter-semibold": ["InterSemiBold", "sans-serif"],
        "inter-bold": ["InterBold", "sans-serif"],
        "inter-extrabold": ["InterExtraBold", "sans-serif"],
      },
      borderColor: {
        default: "#bdbdc2"
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('tailwindcss-animate')],
  darkMode: 'class',
}