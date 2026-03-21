'use client';

import React, { createContext, useContext, useState } from 'react';

export interface SessionRecord {
  id: string;
  type: 'Cardio' | 'Weights' | 'Pilates';
  date: Date;
  coach: string;
  branch: string;
}

export interface PaymentRecord {
  id: string;
  date: Date;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  note?: string;
}

export interface Client {
  id: string;
  name: string;
  qrCode: string;
  packageType: 'Full 48' | 'Full 24' | 'Staggered 48' | 'Staggered 24';
  remainingBalance: number;
  startingBalance?: number;
  coach: string;
  branch: string;
  sessions: SessionRecord[];
  paymentStatus?: string;
  isInactive?: boolean;
  paymentRecords?: PaymentRecord[];
  paymentReminder?: string;
}

export interface Coach {
  id: string;
  name: string;
  password: string;
  branch: string;
}

interface ClientContextType {
  clients: Client[];
  coaches: Coach[];
  updateClient: (clientId: string, updates: Partial<Client>) => void;
  deductSession: (clientId: string, sessionType: SessionRecord['type'], coach: string) => void;
  getClientById: (id: string) => Client | undefined;
  getClientsByCoach: (coachName: string) => Client[];
  getCoachSessions: (coachName: string, timeFrame: 'day' | 'week' | 'month') => number;
  getPaymentReminder: (client: Client) => string;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const COACHES: Coach[] = [
  { id: 'coach_001', name: 'Coach Jaoquin', password: 'Jaoquin123', branch: 'Malingap' },
  { id: 'coach_002', name: 'Coach Amiel', password: 'Amiel123', branch: 'Malingap' },
  { id: 'coach_003', name: 'Coach Hunejin', password: 'Hunejin123', branch: 'Erod' },
  { id: 'coach_004', name: 'Coach Andrei', password: 'Andrei123', branch: 'Erod' },
  { id: 'coach_005', name: 'Coach Isaac', password: 'Isaac123', branch: 'Cainta' },
];

// Helper function to calculate payment reminder
function getPaymentReminderForClient(client: Client): string {
  if (client.isInactive) return '';
  
  if (client.packageType === 'Staggered 24') {
    if (client.remainingBalance <= 19 && client.remainingBalance >= 15) return '1st Payment - P8,500 due';
    if (client.remainingBalance <= 13 && client.remainingBalance >= 7) return '2nd Payment - P7,500 due';
    if (client.remainingBalance <= 1 && client.remainingBalance > 0) return 'Renewal - P9,200 due';
  }
  
  if (client.packageType === 'Full 24') {
    if (client.remainingBalance === 0) return 'Renewal - P25,200 due';
  }
  
  return '';
}

const MOCK_CLIENTS: Client[] = [
  // Coach Jaoquin Clients - Staggered 24
  { 
    id: 'client_001', 
    name: 'Paola', 
    qrCode: 'QR_001', 
    packageType: 'Staggered 24', 
    remainingBalance: 0, 
    startingBalance: 24,
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'DONE', 
    sessions: [], 
    isInactive: false 
  },
  { 
    id: 'client_002', 
    name: 'Gabe', 
    qrCode: 'QR_002', 
    packageType: 'Staggered 24', 
    remainingBalance: 9, 
    startingBalance: 24,
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: '3rd payment DUE', 
    sessions: [] 
  },
  { 
    id: 'client_003', 
    name: 'Alvaro', 
    qrCode: 'QR_003', 
    packageType: 'Staggered 24', 
    remainingBalance: 24, 
    startingBalance: 24,
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: '1st payment paid', 
    sessions: [
      { id: 's_a1', type: 'Weights', date: new Date('2024-03-04'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_a2', type: 'Cardio', date: new Date('2024-03-06'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_a3', type: 'Pilates', date: new Date('2024-03-10'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_a4', type: 'Weights', date: new Date('2024-03-17'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    ] 
  },
  { 
    id: 'client_004', 
    name: 'Bo', 
    qrCode: 'QR_004', 
    packageType: 'Staggered 24', 
    remainingBalance: 11, 
    startingBalance: 24,
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: '3rd payment paid', 
    sessions: [] 
  },
  { 
    id: 'client_005', 
    name: 'Data', 
    qrCode: 'QR_005', 
    packageType: 'Staggered 24', 
    remainingBalance: 18, 
    startingBalance: 24,
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: '2nd Payment DUE', 
    sessions: [
      { id: 's_d1', type: 'Cardio', date: new Date('2024-03-03'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_d2', type: 'Weights', date: new Date('2024-03-06'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_d3', type: 'Pilates', date: new Date('2024-03-07'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_d4', type: 'Cardio', date: new Date('2024-03-09'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_d5', type: 'Weights', date: new Date('2024-03-10'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_d6', type: 'Pilates', date: new Date('2024-03-16'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    ],
    paymentRecords: [
      { id: 'p_d1', date: new Date('2024-03-01'), amount: 8500, status: 'paid', note: '1st payment' }
    ]
  },
  { 
    id: 'client_006', 
    name: 'Gabbie', 
    qrCode: 'QR_006', 
    packageType: 'Staggered 24', 
    remainingBalance: 15, 
    startingBalance: 24,
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: '2nd payment paid', 
    sessions: [] 
  },
  { 
    id: 'client_007', 
    name: 'Polyn', 
    qrCode: 'QR_007', 
    packageType: 'Staggered 24', 
    remainingBalance: 4, 
    startingBalance: 24,
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'fully paid', 
    sessions: [],
    paymentRecords: [
      { id: 'p_p1', date: new Date('2024-03-01'), amount: 8500, status: 'paid', note: '1st payment' },
      { id: 'p_p2', date: new Date('2024-03-08'), amount: 7500, status: 'paid', note: '2nd payment' },
    ]
  },
  { 
    id: 'client_008', 
    name: 'Lomi', 
    qrCode: 'QR_008', 
    packageType: 'Staggered 24', 
    remainingBalance: 19, 
    startingBalance: 24,
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: '1st payment paid', 
    sessions: [], 
    isInactive: true 
  },
  { 
    id: 'client_009', 
    name: 'Gerard', 
    qrCode: 'QR_009', 
    packageType: 'Staggered 24', 
    remainingBalance: 18, 
    startingBalance: 24,
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: '2nd payment DUE', 
    sessions: [] 
  },
  { 
    id: 'client_010', 
    name: 'Rikki', 
    qrCode: 'QR_010', 
    packageType: 'Staggered 24', 
    remainingBalance: 13, 
    startingBalance: 24,
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: '2nd payment paid', 
    sessions: [] 
  },
  
  // Coach Jaoquin Clients - Full 24
  { 
    id: 'client_011', 
    name: 'Dino', 
    qrCode: 'QR_011', 
    packageType: 'Full 24', 
    remainingBalance: 15, 
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'Full 24', 
    sessions: [
      { id: 's_di1', type: 'Weights', date: new Date('2024-03-04'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_di2', type: 'Cardio', date: new Date('2024-03-06'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_di3', type: 'Pilates', date: new Date('2024-03-11'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_di4', type: 'Weights', date: new Date('2024-03-18'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_di5', type: 'Cardio', date: new Date('2024-03-20'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    ]
  },
  { 
    id: 'client_012', 
    name: 'Chich', 
    qrCode: 'QR_012', 
    packageType: 'Full 24', 
    remainingBalance: 22, 
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'Full 24', 
    sessions: [
      { id: 's_ch1', type: 'Weights', date: new Date('2024-03-03'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_ch2', type: 'Cardio', date: new Date('2024-03-05'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_ch3', type: 'Pilates', date: new Date('2024-03-10'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_ch4', type: 'Weights', date: new Date('2024-03-12'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_ch5', type: 'Cardio', date: new Date('2024-03-17'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_ch6', type: 'Pilates', date: new Date('2024-03-19'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    ]
  },
  { 
    id: 'client_013', 
    name: 'Debbie', 
    qrCode: 'QR_013', 
    packageType: 'Full 24', 
    remainingBalance: 22, 
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'Full 24', 
    sessions: [
      { id: 's_db1', type: 'Weights', date: new Date('2024-03-11'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_db2', type: 'Cardio', date: new Date('2024-03-12'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    ]
  },
  { 
    id: 'client_014', 
    name: 'Leo', 
    qrCode: 'QR_014', 
    packageType: 'Full 24', 
    remainingBalance: 9, 
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'Full 24', 
    sessions: [
      { id: 's_l1', type: 'Pilates', date: new Date('2024-03-04'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_l2', type: 'Weights', date: new Date('2024-03-06'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_l3', type: 'Cardio', date: new Date('2024-03-11'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_l4', type: 'Pilates', date: new Date('2024-03-13'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_l5', type: 'Weights', date: new Date('2024-03-16'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    ]
  },
  { 
    id: 'client_015', 
    name: 'Durben', 
    qrCode: 'QR_015', 
    packageType: 'Full 24', 
    remainingBalance: 16, 
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'Full 24', 
    sessions: [
      { id: 's_du1', type: 'Cardio', date: new Date('2024-03-07'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_du2', type: 'Weights', date: new Date('2024-03-21'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    ]
  },
  { 
    id: 'client_016', 
    name: 'Maam E', 
    qrCode: 'QR_016', 
    packageType: 'Full 24', 
    remainingBalance: 17, 
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'Full 24', 
    sessions: [
      { id: 's_me1', type: 'Pilates', date: new Date('2024-03-03'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_me2', type: 'Weights', date: new Date('2024-03-10'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_me3', type: 'Cardio', date: new Date('2024-03-12'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_me4', type: 'Pilates', date: new Date('2024-03-19'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_me5', type: 'Weights', date: new Date('2024-03-20'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    ]
  },
  { 
    id: 'client_017', 
    name: 'Maam G', 
    qrCode: 'QR_017', 
    packageType: 'Full 24', 
    remainingBalance: 24, 
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'Full 24', 
    sessions: [
      { id: 's_mg1', type: 'Cardio', date: new Date('2024-03-03'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_mg2', type: 'Pilates', date: new Date('2024-03-10'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_mg3', type: 'Weights', date: new Date('2024-03-12'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_mg4', type: 'Cardio', date: new Date('2024-03-20'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    ]
  },
  { 
    id: 'client_018', 
    name: 'Charlene', 
    qrCode: 'QR_018', 
    packageType: 'Full 24', 
    remainingBalance: 20, 
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'Full 24', 
    sessions: [
      { id: 's_c1', type: 'Weights', date: new Date('2024-03-03'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_c2', type: 'Pilates', date: new Date('2024-03-06'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_c3', type: 'Cardio', date: new Date('2024-03-10'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_c4', type: 'Weights', date: new Date('2024-03-17'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    ]
  },
  { 
    id: 'client_019', 
    name: 'Doc Ella', 
    qrCode: 'QR_019', 
    packageType: 'Full 24', 
    remainingBalance: 2, 
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'INACTIVE', 
    sessions: [], 
    isInactive: true 
  },
  { 
    id: 'client_020', 
    name: 'Ella Marcelo', 
    qrCode: 'QR_020', 
    packageType: 'Full 24', 
    remainingBalance: 4, 
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'INACTIVE', 
    sessions: [], 
    isInactive: true 
  },
  { 
    id: 'client_021', 
    name: 'Camille', 
    qrCode: 'QR_021', 
    packageType: 'Full 24', 
    remainingBalance: 17, 
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'INACTIVE', 
    sessions: [], 
    isInactive: true 
  },
  { 
    id: 'client_022', 
    name: 'Akia', 
    qrCode: 'QR_022', 
    packageType: 'Full 24', 
    remainingBalance: 9, 
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'Full 24', 
    sessions: [
      { id: 's_ak1', type: 'Cardio', date: new Date('2024-03-02'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_ak2', type: 'Pilates', date: new Date('2024-03-05'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_ak3', type: 'Weights', date: new Date('2024-03-12'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_ak4', type: 'Cardio', date: new Date('2024-03-16'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    ]
  },
  { 
    id: 'client_023', 
    name: 'Xavier', 
    qrCode: 'QR_023', 
    packageType: 'Full 24', 
    remainingBalance: 17, 
    coach: 'Coach Jaoquin', 
    branch: 'Malingap', 
    paymentStatus: 'Full 24', 
    sessions: [
      { id: 's_x1', type: 'Weights', date: new Date('2024-03-13'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_x2', type: 'Pilates', date: new Date('2024-03-16'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_x3', type: 'Cardio', date: new Date('2024-03-17'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_x4', type: 'Weights', date: new Date('2024-03-19'), coach: 'Coach Jaoquin', branch: 'Malingap' },
      { id: 's_x5', type: 'Pilates', date: new Date('2024-03-20'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    ]
  },
  
  // Coach Jaoquin Clients - Full 48
  { id: 'client_024', name: 'Ilynne', qrCode: 'QR_024', packageType: 'Full 48', remainingBalance: 43, coach: 'Coach Jaoquin', branch: 'Malingap', paymentStatus: 'Full 48', sessions: [
    { id: 's_i1', type: 'Cardio', date: new Date('2024-03-02'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_i2', type: 'Weights', date: new Date('2024-03-06'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_i3', type: 'Pilates', date: new Date('2024-03-07'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_i4', type: 'Cardio', date: new Date('2024-03-09'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_i5', type: 'Weights', date: new Date('2024-03-11'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_i6', type: 'Pilates', date: new Date('2024-03-13'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_i7', type: 'Cardio', date: new Date('2024-03-16'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_i8', type: 'Weights', date: new Date('2024-03-18'), coach: 'Coach Jaoquin', branch: 'Malingap' },
  ] },
  { id: 'client_025', name: 'Ria', qrCode: 'QR_025', packageType: 'Full 48', remainingBalance: 43, coach: 'Coach Jaoquin', branch: 'Malingap', paymentStatus: 'Full 48', sessions: [
    { id: 's_r1', type: 'Weights', date: new Date('2024-03-02'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_r2', type: 'Cardio', date: new Date('2024-03-03'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_r3', type: 'Pilates', date: new Date('2024-03-05'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_r4', type: 'Weights', date: new Date('2024-03-09'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_r5', type: 'Cardio', date: new Date('2024-03-10'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_r6', type: 'Pilates', date: new Date('2024-03-12'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_r7', type: 'Weights', date: new Date('2024-03-17'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_r8', type: 'Cardio', date: new Date('2024-03-19'), coach: 'Coach Jaoquin', branch: 'Malingap' },
  ] },
  { id: 'client_026', name: 'Manny', qrCode: 'QR_026', packageType: 'Full 48', remainingBalance: 39, coach: 'Coach Jaoquin', branch: 'Malingap', paymentStatus: 'Full 48', sessions: [
    { id: 's_ma1', type: 'Pilates', date: new Date('2024-03-03'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_ma2', type: 'Weights', date: new Date('2024-03-05'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_ma3', type: 'Cardio', date: new Date('2024-03-10'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_ma4', type: 'Pilates', date: new Date('2024-03-12'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_ma5', type: 'Weights', date: new Date('2024-03-17'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_ma6', type: 'Cardio', date: new Date('2024-03-19'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_ma7', type: 'Pilates', date: new Date('2024-03-21'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_ma8', type: 'Weights', date: new Date('2024-03-20'), coach: 'Coach Jaoquin', branch: 'Malingap' },
  ] },
  { id: 'client_027', name: 'Claudine', qrCode: 'QR_027', packageType: 'Full 48', remainingBalance: 53, coach: 'Coach Jaoquin', branch: 'Malingap', paymentStatus: 'Full 48', sessions: [
    { id: 's_cl1', type: 'Cardio', date: new Date('2024-03-04'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_cl2', type: 'Weights', date: new Date('2024-03-06'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_cl3', type: 'Pilates', date: new Date('2024-03-07'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_cl4', type: 'Cardio', date: new Date('2024-03-11'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_cl5', type: 'Weights', date: new Date('2024-03-18'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_cl6', type: 'Pilates', date: new Date('2024-03-21'), coach: 'Coach Jaoquin', branch: 'Malingap' },
  ] },
  { id: 'client_028', name: 'Karen', qrCode: 'QR_028', packageType: 'Full 48', remainingBalance: 31, coach: 'Coach Jaoquin', branch: 'Malingap', paymentStatus: 'Full 48', sessions: [
    { id: 's_k1', type: 'Weights', date: new Date('2024-03-02'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_k2', type: 'Cardio', date: new Date('2024-03-06'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_k3', type: 'Pilates', date: new Date('2024-03-09'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_k4', type: 'Weights', date: new Date('2024-03-13'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_k5', type: 'Cardio', date: new Date('2024-03-16'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_k6', type: 'Pilates', date: new Date('2024-03-18'), coach: 'Coach Jaoquin', branch: 'Malingap' },
  ] },
  { id: 'client_029', name: 'Frank', qrCode: 'QR_029', packageType: 'Full 48', remainingBalance: 10, coach: 'Coach Jaoquin', branch: 'Malingap', paymentStatus: 'Full 48', sessions: [] },
  { id: 'client_030', name: 'Janice', qrCode: 'QR_030', packageType: 'Full 48', remainingBalance: 8, coach: 'Coach Jaoquin', branch: 'Malingap', paymentStatus: 'Full 48', sessions: [
    { id: 's_j1', type: 'Cardio', date: new Date('2024-03-03'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_j2', type: 'Weights', date: new Date('2024-03-10'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_j3', type: 'Pilates', date: new Date('2024-03-17'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_j4', type: 'Cardio', date: new Date('2024-03-19'), coach: 'Coach Jaoquin', branch: 'Malingap' },
  ] },
  { id: 'client_031', name: 'Ding', qrCode: 'QR_031', packageType: 'Full 48', remainingBalance: 11, coach: 'Coach Jaoquin', branch: 'Malingap', paymentStatus: 'Full 48', sessions: [
    { id: 's_di1', type: 'Weights', date: new Date('2024-03-16'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_di2', type: 'Cardio', date: new Date('2024-03-17'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_di3', type: 'Pilates', date: new Date('2024-03-18'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_di4', type: 'Weights', date: new Date('2024-03-20'), coach: 'Coach Jaoquin', branch: 'Malingap' },
  ] },
  { id: 'client_032', name: 'Sam', qrCode: 'QR_032', packageType: 'Full 48', remainingBalance: 24, coach: 'Coach Jaoquin', branch: 'Malingap', paymentStatus: 'Full 48', sessions: [
    { id: 's_s1', type: 'Pilates', date: new Date('2024-03-02'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_s2', type: 'Cardio', date: new Date('2024-03-03'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_s3', type: 'Weights', date: new Date('2024-03-05'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_s4', type: 'Pilates', date: new Date('2024-03-07'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_s5', type: 'Cardio', date: new Date('2024-03-09'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_s6', type: 'Weights', date: new Date('2024-03-12'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_s7', type: 'Pilates', date: new Date('2024-03-16'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_s8', type: 'Cardio', date: new Date('2024-03-19'), coach: 'Coach Jaoquin', branch: 'Malingap' },
  ] },
  { id: 'client_033', name: 'Nina', qrCode: 'QR_033', packageType: 'Full 48', remainingBalance: 8, coach: 'Coach Jaoquin', branch: 'Malingap', paymentStatus: 'Full 48', sessions: [
    { id: 's_n1', type: 'Weights', date: new Date('2024-03-03'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_n2', type: 'Cardio', date: new Date('2024-03-10'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_n3', type: 'Pilates', date: new Date('2024-03-20'), coach: 'Coach Jaoquin', branch: 'Malingap' },
  ] },
  { id: 'client_034', name: 'Paula Briones', qrCode: 'QR_034', packageType: 'Full 48', remainingBalance: 13, coach: 'Coach Jaoquin', branch: 'Malingap', paymentStatus: 'INACTIVE', sessions: [], isInactive: true },
  { id: 'client_035', name: 'Alexa', qrCode: 'QR_035', packageType: 'Full 48', remainingBalance: 12, coach: 'Coach Jaoquin', branch: 'Malingap', paymentStatus: 'Full 48', sessions: [
    { id: 's_al1', type: 'Cardio', date: new Date('2024-03-02'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_al2', type: 'Weights', date: new Date('2024-03-06'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_al3', type: 'Pilates', date: new Date('2024-03-13'), coach: 'Coach Jaoquin', branch: 'Malingap' },
  ] },
  { id: 'client_036', name: 'Theresa', qrCode: 'QR_036', packageType: 'Full 48', remainingBalance: 37, coach: 'Coach Jaoquin', branch: 'Malingap', paymentStatus: 'Full 48', sessions: [
    { id: 's_t1', type: 'Pilates', date: new Date('2024-03-04'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_t2', type: 'Weights', date: new Date('2024-03-06'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_t3', type: 'Cardio', date: new Date('2024-03-11'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_t4', type: 'Pilates', date: new Date('2024-03-18'), coach: 'Coach Jaoquin', branch: 'Malingap' },
    { id: 's_t5', type: 'Weights', date: new Date('2024-03-20'), coach: 'Coach Jaoquin', branch: 'Malingap' },
  ] },

  // Coach Hunejin Clients - Staggered 24
  { 
    id: 'client_037', 
    name: 'Jensine', 
    qrCode: 'QR_037', 
    packageType: 'Staggered 24', 
    remainingBalance: 42, 
    startingBalance: 24,
    coach: 'Coach Hunejin', 
    branch: 'Erod', 
    paymentStatus: 'Renewed 48 Feb 17 +2 free', 
    sessions: [
      { id: 's_jen1', type: 'Cardio', date: new Date('2024-03-02'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_jen2', type: 'Weights', date: new Date('2024-03-03'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_jen3', type: 'Pilates', date: new Date('2024-03-05'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_jen4', type: 'Cardio', date: new Date('2024-03-06'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_jen5', type: 'Weights', date: new Date('2024-03-10'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_jen6', type: 'Pilates', date: new Date('2024-03-12'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_jen7', type: 'Cardio', date: new Date('2024-03-19'), coach: 'Coach Hunejin', branch: 'Erod' },
    ]
  },
  { 
    id: 'client_038', 
    name: 'Pat', 
    qrCode: 'QR_038', 
    packageType: 'Staggered 24', 
    remainingBalance: 2, 
    startingBalance: 24,
    coach: 'Coach Hunejin', 
    branch: 'Erod', 
    paymentStatus: 'busy', 
    sessions: [
      { id: 's_pat1', type: 'Weights', date: new Date('2024-03-11'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_pat2', type: 'Cardio', date: new Date('2024-03-12'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_pat3', type: 'Pilates', date: new Date('2024-03-17'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_pat4', type: 'Weights', date: new Date('2024-03-19'), coach: 'Coach Hunejin', branch: 'Erod' },
    ]
  },
  { 
    id: 'client_039', 
    name: 'Dulce', 
    qrCode: 'QR_039', 
    packageType: 'Staggered 24', 
    remainingBalance: 21, 
    startingBalance: 24,
    coach: 'Coach Hunejin', 
    branch: 'Erod', 
    paymentStatus: '24 partial renewed Feb 18', 
    sessions: [
      { id: 's_dul1', type: 'Cardio', date: new Date('2024-03-04'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_dul2', type: 'Weights', date: new Date('2024-03-07'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_dul3', type: 'Pilates', date: new Date('2024-03-11'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_dul4', type: 'Cardio', date: new Date('2024-03-18'), coach: 'Coach Hunejin', branch: 'Erod' },
    ]
  },
  { 
    id: 'client_040', 
    name: 'Bea', 
    qrCode: 'QR_040', 
    packageType: 'Staggered 24', 
    remainingBalance: 17, 
    startingBalance: 24,
    coach: 'Coach Hunejin', 
    branch: 'Erod', 
    paymentStatus: '7 sessions left', 
    sessions: [
      { id: 's_bea1', type: 'Weights', date: new Date('2024-03-06'), coach: 'Coach Hunejin', branch: 'Erod' },
    ]
  },
  { 
    id: 'client_041', 
    name: 'Steph', 
    qrCode: 'QR_041', 
    packageType: 'Staggered 24', 
    remainingBalance: 8, 
    startingBalance: 24,
    coach: 'Coach Hunejin', 
    branch: 'Erod', 
    paymentStatus: '5 free sessions', 
    sessions: [
      { id: 's_steph1', type: 'Cardio', date: new Date('2024-03-02'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_steph2', type: 'Weights', date: new Date('2024-03-09'), coach: 'Coach Hunejin', branch: 'Erod' },
    ]
  },
  { 
    id: 'client_042', 
    name: 'Dianne', 
    qrCode: 'QR_042', 
    packageType: 'Staggered 24', 
    remainingBalance: 3, 
    startingBalance: 24,
    coach: 'Coach Hunejin', 
    branch: 'Erod', 
    paymentStatus: '3 left +2 free', 
    sessions: [
      { id: 's_di_h1', type: 'Pilates', date: new Date('2024-03-18'), coach: 'Coach Hunejin', branch: 'Erod' },
    ]
  },
  { 
    id: 'client_043', 
    name: 'Bel', 
    qrCode: 'QR_043', 
    packageType: 'Staggered 24', 
    remainingBalance: 0, 
    startingBalance: 24,
    coach: 'Coach Hunejin', 
    branch: 'Erod', 
    paymentStatus: 'Done', 
    sessions: [],
    isInactive: true
  },
  { 
    id: 'client_044', 
    name: 'Julie', 
    qrCode: 'QR_044', 
    packageType: 'Staggered 24', 
    remainingBalance: 0, 
    startingBalance: 24,
    coach: 'Coach Hunejin', 
    branch: 'Erod', 
    paymentStatus: 'Done, will renew', 
    sessions: [],
    isInactive: true
  },
  { 
    id: 'client_045', 
    name: 'Doc Sherwin', 
    qrCode: 'QR_045', 
    packageType: 'Full 24', 
    remainingBalance: 29, 
    startingBalance: 24,
    coach: 'Coach Hunejin', 
    branch: 'Erod', 
    paymentStatus: '+21 from Doc Cheche', 
    sessions: []
  },
  { 
    id: 'client_046', 
    name: 'Gloria Ocampo', 
    qrCode: 'QR_046', 
    packageType: 'Full 24', 
    remainingBalance: 17, 
    coach: 'Coach Hunejin', 
    branch: 'Erod', 
    paymentStatus: '2nd payment 2/21', 
    sessions: []
  },
  { 
    id: 'client_047', 
    name: 'Victor Domingo', 
    qrCode: 'QR_047', 
    packageType: 'Full 24', 
    remainingBalance: 11, 
    coach: 'Coach Hunejin', 
    branch: 'Erod', 
    paymentStatus: '+2 free', 
    sessions: [
      { id: 's_vd1', type: 'Cardio', date: new Date('2024-03-03'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_vd2', type: 'Weights', date: new Date('2024-03-05'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_vd3', type: 'Pilates', date: new Date('2024-03-12'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_vd4', type: 'Cardio', date: new Date('2024-03-17'), coach: 'Coach Hunejin', branch: 'Erod' },
    ]
  },
  { 
    id: 'client_048', 
    name: 'Lexi Bartolome', 
    qrCode: 'QR_048', 
    packageType: 'Full 24', 
    remainingBalance: 15, 
    coach: 'Coach Hunejin', 
    branch: 'Erod', 
    paymentStatus: 'Full 24', 
    sessions: [
      { id: 's_lex1', type: 'Weights', date: new Date('2024-03-10'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_lex2', type: 'Cardio', date: new Date('2024-03-11'), coach: 'Coach Hunejin', branch: 'Erod' },
    ]
  },
  { 
    id: 'client_049', 
    name: 'Starsky', 
    qrCode: 'QR_049', 
    packageType: 'Full 24', 
    remainingBalance: 6, 
    coach: 'Coach Hunejin', 
    branch: 'Erod', 
    paymentStatus: '+5 free', 
    sessions: [
      { id: 's_star1', type: 'Pilates', date: new Date('2024-03-03'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_star2', type: 'Cardio', date: new Date('2024-03-09'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_star3', type: 'Weights', date: new Date('2024-03-11'), coach: 'Coach Hunejin', branch: 'Erod' },
    ]
  },
  { 
    id: 'client_050', 
    name: 'Christine', 
    qrCode: 'QR_050', 
    packageType: 'Staggered 24', 
    remainingBalance: 22, 
    startingBalance: 24,
    coach: 'Coach Hunejin', 
    branch: 'Erod', 
    paymentStatus: '24 stag, 2/25 first payment', 
    sessions: [
      { id: 's_chr1', type: 'Cardio', date: new Date('2024-03-04'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_chr2', type: 'Weights', date: new Date('2024-03-07'), coach: 'Coach Hunejin', branch: 'Erod' },
      { id: 's_chr3', type: 'Pilates', date: new Date('2024-03-11'), coach: 'Coach Hunejin', branch: 'Erod' },
    ]
  },
];

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);

  const updateClient = (clientId: string, updates: Partial<Client>) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId ? { ...client, ...updates } : client
      )
    );
  };

  const deductSession = (
    clientId: string,
    sessionType: SessionRecord['type'],
    coach: string
  ) => {
    setClients((prevClients) =>
      prevClients.map((client) => {
        if (client.id === clientId) {
          const branch = client.branch;
          const newSession: SessionRecord = {
            id: `s_${Date.now()}`,
            type: sessionType,
            date: new Date(),
            coach,
            branch,
          };
          return {
            ...client,
            remainingBalance: Math.max(0, client.remainingBalance - 1),
            sessions: [newSession, ...client.sessions],
          };
        }
        return client;
      })
    );
  };

  const getClientById = (id: string) => clients.find((c) => c.id === id);

  const getClientsByCoach = (coachName: string) => {
    return clients.filter((c) => c.coach === coachName);
  };

  const getCoachSessions = (coachName: string, timeFrame: 'day' | 'week' | 'month'): number => {
    const coachClients = getClientsByCoach(coachName);
    const now = new Date();
    let daysBack = 1;

    if (timeFrame === 'week') daysBack = 7;
    if (timeFrame === 'month') daysBack = 30;

    const cutoffDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);

    let count = 0;
    coachClients.forEach((client) => {
      client.sessions.forEach((session) => {
        if (new Date(session.date) >= cutoffDate) {
          count++;
        }
      });
    });

    return count;
  };

  const getPaymentReminder = (client: Client): string => {
    return getPaymentReminderForClient(client);
  };

  return (
    <ClientContext.Provider value={{ clients, coaches: COACHES, updateClient, deductSession, getClientById, getClientsByCoach, getCoachSessions, getPaymentReminder }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClients must be used within ClientProvider');
  }
  return context;
}
