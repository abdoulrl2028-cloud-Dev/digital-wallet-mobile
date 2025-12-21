// Exportar todos os componentes do design system
export { Button } from './Button';
export { TextInput, Text } from './TextInput';
export { Card } from './Card';

// Exportar temas e estilos
export const colors = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  danger: '#DC2626',
  success: '#10B981',
  warning: '#F59E0B',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const borderRadius = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 999,
};
