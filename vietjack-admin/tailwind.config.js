module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        gray: {
          25: '#FCFCFD',
          50: '#F9FAFB',
          100: '#F2F4F7',
          200: '#EAECF0',
          300: '#D0D5DD',
          400: '#98A2B3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1D2939',
          900: '#101828',
          blue: {
            50: '#F8F9FC',
            400: '#717BBC',
          },
        },
        primary: {
          25: '#F5F8FF',
          50: '#EFF4FF',
          100: '#D1E0FF',
          200: '#B2CCFF',
          300: '#84ADFF',
          400: '#528BFF',
          500: '#2970FF',
          600: '#155EEF',
          700: '#004EEB',
          800: '#0040C1',
          900: '#00359E',
          1100: '#030A65',
        },
        error: {
          25: '#FFFBFA',
          50: '#FEF3F2',
          100: '#FEE4E2',
          200: '#FECDCA',
          300: '#FDA29B',
          400: '#F97066',
          500: '#F04438',
          600: '#D92D20',
          700: '#B42318',
          800: '#912018',
          900: '#7A271A',
        },
        warning: {
          25: '#FFFCF5',
          50: '#FFFAEB',
          100: '#FEF0C7',
          200: '#FEDF89',
          300: '#FEC84B',
          400: '#FDB022',
          500: '#F79009',
          600: '#DC6803',
          700: '#B54708',
          800: '#93370D',
          900: '#7A2E0E',
        },
        orange: {
          25: '#FFFBF1',
          50: '#FFF6DE',
          100: '#FFE396',
          200: '#FFDB78',
          300: '#FFD45E',
          400: '#FFC62C',
          500: '#FFBF0F',
          600: '#F6B400',
          700: '#F6A200',
          800: '#EB9B00',
          900: '#E29601',
          dark: {
            50: '#FFF4ED',
            200: '#FFD6AE',
            400: '#FF692E',
          },
        },
        success: {
          25: '#F6FEF9',
          50: '#ECFDF3',
          100: '#D1FADF',
          200: '#A6F4C5',
          300: '#6CE9A6',
          400: '#32D583',
          500: '#12B76A',
          600: '#039855',
          700: '#027A48',
          800: '#05603A',
          900: '#054F31',
        },
        blue: {
          500: '#00359E',
          900: '#00075B',
        },
      },
      dropShadow: {
        xs: '0px 1px 2px rgba(16, 24, 40, 0.05)',
        sm: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
        md: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
        lg: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
        xl: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
        '2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
        '3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
      },
      boxShadow: {
        xs: '0px 1px 2px rgba(16, 24, 40, 0.05)',
        sm: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
        md: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
        lg: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
        xl: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
        '2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
        '3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
      },
      keyframes: {
        'fade-in-right': {
          '0%': { opacity: 0, transform: 'translateX(100%)' },
          '100%': {
            opacity: 1,
            transform: 'translateX(0%)',
          },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-right': 'fade-in-right .5s ease-in-out',
        'fade-in-down': 'fade-in-down .5s ease-in-out',
      },
      backgroundImage: {
        'gradient-linear': 'linear-gradient(180deg, #E7EAFF 0%, rgba(231, 234, 255, 0.03) 100%)',
      },
    },
    fontSize: {
      'xs-regular': [
        '12px',
        {
          lineHeight: '18px',
          fontWeight: '400',
        },
      ],
      'xs-medium': [
        '12px',
        {
          lineHeight: '18px',
          fontWeight: '500',
        },
      ],
      'xs-semi-bold': [
        '12px',
        {
          lineHeight: '18px',
          fontWeight: '600',
        },
      ],
      'xs-bold': [
        '12px',
        {
          lineHeight: '18px',
          fontWeight: '700',
        },
      ],

      'sm-regular': [
        '14px',
        {
          lineHeight: '20px',
          fontWeight: '400',
        },
      ],
      'sm-medium': [
        '14px',
        {
          lineHeight: '20px',
          fontWeight: '500',
        },
      ],
      'sm-semi-bold': [
        '14px',
        {
          lineHeight: '20px',
          fontWeight: '600',
        },
      ],
      'sm-bold': [
        '14px',
        {
          lineHeight: '20px',
          fontWeight: '700',
        },
      ],

      'md-regular': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '400',
        },
      ],
      'md-medium': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '500',
        },
      ],
      'md-semi-bold': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '600',
        },
      ],
      'md-bold': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '700',
        },
      ],

      'lg-regular': [
        '18px',
        {
          lineHeight: '28px',
          fontWeight: '400',
        },
      ],
      'lg-medium': [
        '18px',
        {
          lineHeight: '28px',
          fontWeight: '500',
        },
      ],
      'lg-semi-bold': [
        '18px',
        {
          lineHeight: '28px',
          fontWeight: '600',
        },
      ],
      'lg-bold': [
        '18px',
        {
          lineHeight: '28px',
          fontWeight: '700',
        },
      ],

      'xl-regular': [
        '20px',
        {
          lineHeight: '30px',
          fontWeight: '400',
        },
      ],
      'xl-medium': [
        '20px',
        {
          lineHeight: '30px',
          fontWeight: '500',
        },
      ],
      'xl-semi-bold': [
        '20px',
        {
          lineHeight: '30px',
          fontWeight: '600',
        },
      ],
      'xl-bold': [
        '20px',
        {
          lineHeight: '30px',
          fontWeight: '700',
        },
      ],

      'display-xs-regular': [
        '24px',
        {
          lineHeight: '32px',
          fontWeight: '400',
        },
      ],
      'display-xs-medium': [
        '24px',
        {
          lineHeight: '32px',
          fontWeight: '500',
        },
      ],
      'display-xs-semi-bold': [
        '24px',
        {
          lineHeight: '32px',
          fontWeight: '600',
        },
      ],
      'display-xs-bold': [
        '24px',
        {
          lineHeight: '32px',
          fontWeight: '700',
        },
      ],

      'display-sm-regular': [
        '30px',
        {
          lineHeight: '38px',
          fontWeight: '400',
        },
      ],
      'display-sm-medium': [
        '30px',
        {
          lineHeight: '38px',
          fontWeight: '500',
        },
      ],
      'display-sm-semi-bold': [
        '30px',
        {
          lineHeight: '38px',
          fontWeight: '600',
        },
      ],
      'display-sm-bold': [
        '30px',
        {
          lineHeight: '38px',
          fontWeight: '700',
        },
      ],

      'display-md-regular': [
        '36px',
        {
          lineHeight: '44px',
          fontWeight: '400',
          letterSpacing: '-0.02em',
        },
      ],
      'display-md-medium': [
        '36px',
        {
          lineHeight: '44px',
          fontWeight: '500',
          letterSpacing: '-0.02em',
        },
      ],
      'display-md-semi-bold': [
        '36px',
        {
          lineHeight: '44px',
          fontWeight: '600',
          letterSpacing: '-0.02em',
        },
      ],
      'display-md-bold': [
        '36px',
        {
          lineHeight: '44px',
          fontWeight: '700',
          letterSpacing: '-0.02em',
        },
      ],

      'display-lg-regular': [
        '48px',
        {
          lineHeight: '60px',
          fontWeight: '400',
          letterSpacing: '-0.02em',
        },
      ],
      'display-lg-medium': [
        '48px',
        {
          lineHeight: '60px',
          fontWeight: '500',
          letterSpacing: '-0.02em',
        },
      ],
      'display-lg-semi-bold': [
        '48px',
        {
          lineHeight: '60px',
          fontWeight: '600',
          letterSpacing: '-0.02em',
        },
      ],
      'display-lg-bold': [
        '48px',
        {
          lineHeight: '60px',
          fontWeight: '700',
          letterSpacing: '-0.02em',
        },
      ],

      'display-xl-regular': [
        '60px',
        {
          lineHeight: '72px',
          fontWeight: '400',
          letterSpacing: '-0.02em',
        },
      ],
      'display-xl-medium': [
        '60px',
        {
          lineHeight: '72px',
          fontWeight: '500',
          letterSpacing: '-0.02em',
        },
      ],
      'display-xl-semi-bold': [
        '60px',
        {
          lineHeight: '72px',
          fontWeight: '600',
          letterSpacing: '-0.02em',
        },
      ],
      'display-xl-bold': [
        '60px',
        {
          lineHeight: '72px',
          fontWeight: '700',
          letterSpacing: '-0.02em',
        },
      ],

      'display-2xl-regular': [
        '72px',
        {
          lineHeight: '90px',
          fontWeight: '400',
          letterSpacing: '-0.02em',
        },
      ],
      'display-2xl-medium': [
        '72px',
        {
          lineHeight: '90px',
          fontWeight: '500',
          letterSpacing: '-0.02em',
        },
      ],
      'display-2xl-semi-bold': [
        '72px',
        {
          lineHeight: '90px',
          fontWeight: '600',
          letterSpacing: '-0.02em',
        },
      ],
      'display-2xl-bold': [
        '72px',
        {
          lineHeight: '90px',
          fontWeight: '700',
          letterSpacing: '-0.02em',
        },
      ],
    },
  },
  variants: {},
  plugins: [],
};
