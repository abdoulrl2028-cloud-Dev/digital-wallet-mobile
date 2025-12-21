import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
}

/**
 * Componente de cartão reutilizável
 */
export function Card({ children, variant = 'default', style, ...props }: CardProps) {
  return (
    <View style={[styles.card, styles[variant], style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
  },
  default: {
    backgroundColor: '#DF2323FF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  elevated: {
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
});
