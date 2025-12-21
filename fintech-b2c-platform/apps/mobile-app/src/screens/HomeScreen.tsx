import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Text } from '@carteira-digital/ui-design-system';
import { useAuthStore } from '../store/authStore';
import { formatCurrency } from '@carteira-digital/shared-utils';

interface Saldo {
  total: number;
  disponivel: number;
  bloqueado: number;
}

export default function HomeScreen() {
  const { user } = useAuthStore();
  const [saldo, setSaldo] = useState<Saldo>({
    total: 0,
    disponivel: 0,
    bloqueado: 0,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    try {
      const response = await fetch('https://api.carteira-digital.com/v1/wallet/balance');
      const data = await response.json();
      setSaldo(data);
    } catch (error) {
      console.error('Erro ao buscar saldo:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBalance();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Bem-vindo, {user?.firstName}!</Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Saldo total</Text>
        <Text style={styles.balanceValue}>{formatCurrency(saldo.total)}</Text>
        
        <View style={styles.balanceDetails}>
          <View style={styles.balanceItem}>
            <Text style={styles.detailLabel}>Disponível</Text>
            <Text style={styles.detailValue}>{formatCurrency(saldo.disponivel)}</Text>
          </View>
          <View style={styles.balanceItem}>
            <Text style={styles.detailLabel}>Bloqueado</Text>
            <Text style={styles.detailValue}>{formatCurrency(saldo.bloqueado)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações rápidas</Text>
        <View style={styles.quickActions}>
          <QuickActionButton title="Transferir" icon="📤" />
          <QuickActionButton title="Pagar" icon="💳" />
          <QuickActionButton title="Solicitar" icon="💰" />
          <QuickActionButton title="Histórico" icon="📋" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transações recentes</Text>
        {/* Adicionar lista de transações aqui */}
      </View>
    </ScrollView>
  );
}

function QuickActionButton({ title, icon }: { title: string; icon: string }) {
  return (
    <View style={styles.actionButton}>
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={styles.actionTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#6366F1',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  balanceCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  balanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  balanceItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: '23%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    gap: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
});
