/**
 * Tipos compartilhados da Carteira Digital
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  cpf: string;
  phone?: string;
  birthDate?: string;
  address?: Address;
  status: 'active' | 'inactive' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  blockedBalance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  senderId: string;
  recipientId?: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export type TransactionType = 'transfer' | 'payment' | 'deposit' | 'withdrawal' | 'fee';
export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'credit_card' | 'debit_card' | 'bank_account' | 'pix';
  status: 'active' | 'inactive';
  details: Record<string, any>;
  createdAt: Date;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
  expiresIn: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface ApiError {
  error: string;
  code: string;
  statusCode: number;
  timestamp: string;
  path?: string;
}

export interface TransferRequest {
  recipientCpf: string;
  amount: number;
  description?: string;
}

export interface CreatePaymentMethodRequest {
  type: 'credit_card' | 'debit_card' | 'bank_account' | 'pix';
  details: Record<string, any>;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
