import React from 'react';
import { TextInput as RNTextInput, TextInputProps, StyleSheet, View } from 'react-native';

export interface CustomTextInputProps extends TextInputProps {
  error?: string;
  label?: string;
}

/**
 * Componente de input de texto reutilizável
 */
export function TextInput({ error, label, style, ...props }: CustomTextInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[
          styles.input,
          error ? styles.inputError : styles.inputDefault,
          style,
        ]}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export function Text(props: any) {
  const { style, ...restProps } = props;
  return <RNTextInput {...restProps} style={[styles.text, style]} editable={false} />;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderRadius: 6,
  },
  inputDefault: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 4,
  },
  text: {
    fontSize: 16,
    color: '#111827',
  },
});
