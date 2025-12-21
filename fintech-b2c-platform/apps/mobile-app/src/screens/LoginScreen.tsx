import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Text } from '@carteira-digital/ui-design-system';
import { useAuthStore } from '../store/authStore';
import { validateEmail } from '@carteira-digital/shared-utils';

export default function LoginScreen({ navigation }: any) {
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setError('');

      if (!email || !password) {
        setError('Preencha todos os campos');
        return;
      }

      if (!validateEmail(email)) {
        setError('Email inválido');
        return;
      }

      if (password.length < 6) {
        setError('Senha deve ter no mínimo 6 caracteres');
        return;
      }

      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoSection}>
        <Text style={styles.logo}>💳</Text>
        <Text style={styles.title}>Carteira Digital</Text>
        <Text style={styles.subtitle}>Seu banco em suas mãos</Text>
      </View>

      <View style={styles.formSection}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!isLoading}
          style={styles.input}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!isLoading}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Button
          title={isLoading ? 'Entrando...' : 'Entrar'}
          onPress={handleLogin}
          disabled={isLoading}
          style={styles.loginButton}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerSection}>
        <Text style={styles.registerText}>Não tem conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Cadastre-se aqui</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  formSection: {
    marginBottom: 40,
  },
  input: {
    marginBottom: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 14,
    top: 14,
    fontSize: 20,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#FEE2E2',
    borderRadius: 4,
    overflow: 'hidden',
  },
  loginButton: {
    backgroundColor: '#6366F1',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  forgotPassword: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
  },
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  registerText: {
    color: '#6B7280',
    fontSize: 14,
  },
  registerLink: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '700',
  },
});
