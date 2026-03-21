'use client';

import { useState } from 'react';
import { Client } from '@/context/client-context';
import { useClients } from '@/context/client-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SessionHistory from '@/components/session-history';
import SessionModal from '@/components/session-modal';
import PaymentEditor from '@/components/payment-editor';
import { User, Dumbbell, AlertCircle, CreditCard } from 'lucide-react';

interface ClientCardProps {
  client: Client;
}

export default function ClientCard({ client }: ClientCardProps) {
  const { getPaymentReminder } = useClients();
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showPaymentEditor, setShowPaymentEditor] = useState(false);
  const [timeFilter, setTimeFilter] = useState<'day' | 'week' | 'month'>('week');

  const packageColors: Record<string, string> = {
    'Full 48': 'bg-purple-600',
    'Full 24': 'bg-blue-600',
    'Staggered 48': 'bg-green-600',
    'Staggered 24': 'bg-orange-600',
  };

  const isLowBalance = client.remainingBalance < 5;
  const paymentReminder = getPaymentReminder(client);

  return (
    <>
      <Card className="bg-slate-700 border-slate-600 text-white overflow-hidden hover:border-slate-500 transition-colors">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 border-b border-slate-600">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{client.name}</h3>
                <p className="text-sm text-slate-400">ID: {client.qrCode}</p>
              </div>
            </div>
            {isLowBalance && (
              <div className="flex items-center gap-1 text-yellow-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                Low
              </div>
            )}
          </div>
          <Badge className={`${packageColors[client.packageType]} text-white border-0`}>
            {client.packageType}
          </Badge>
        </div>

        {/* Info Section */}
        <div className="p-4 space-y-3 border-b border-slate-600">
          {/* Balance */}
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Remaining Balance</span>
            <span className={`text-2xl font-bold ${isLowBalance ? 'text-yellow-400' : 'text-green-400'}`}>
              {client.remainingBalance}
            </span>
          </div>

          {/* Coach and Branch */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Coach</p>
              <p className="text-sm font-semibold">{client.coach}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Branch</p>
              <p className="text-sm font-semibold">{client.branch}</p>
            </div>
          </div>

          {/* Payment Status */}
          {client.paymentStatus && (
            <div className="bg-slate-600 p-2 rounded text-xs">
              <p className="text-slate-400">Payment Status</p>
              <p className="text-slate-200 font-semibold">{client.paymentStatus}</p>
            </div>
          )}

          {/* Inactive Badge */}
          {client.isInactive && (
            <div className="bg-gray-600 p-2 rounded text-xs text-center font-semibold text-gray-200">
              INACTIVE
            </div>
          )}

          {/* Payment Reminder */}
          {paymentReminder && (
            <div className="bg-red-900/50 border border-red-700 p-3 rounded text-xs">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <p className="text-red-200 font-semibold">Payment Reminder</p>
              </div>
              <p className="text-red-100">{paymentReminder}</p>
            </div>
          )}
        </div>

        {/* Session Tabs */}
        <div className="p-4">
          <Tabs defaultValue="week" onValueChange={(v) => setTimeFilter(v as 'day' | 'week' | 'month')}>
            <TabsList className="grid w-full grid-cols-3 bg-slate-600 mb-4">
              <TabsTrigger value="day" className="text-xs">Day</TabsTrigger>
              <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
              <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
            </TabsList>

            <TabsContent value="day">
              <SessionHistory client={client} timeFilter="day" />
            </TabsContent>
            <TabsContent value="week">
              <SessionHistory client={client} timeFilter="week" />
            </TabsContent>
            <TabsContent value="month">
              <SessionHistory client={client} timeFilter="month" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Action Buttons */}
        <div className="px-4 pb-4 pt-2 space-y-2">
          <Button
            onClick={() => setShowSessionModal(true)}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold gap-2"
          >
            <Dumbbell className="w-4 h-4" />
            Log Session
          </Button>
          <Button
            onClick={() => setShowPaymentEditor(true)}
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-600 gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Edit Payment
          </Button>
        </div>
      </Card>

      {/* Session Modal */}
      <SessionModal
        isOpen={showSessionModal}
        onClose={() => setShowSessionModal(false)}
        client={client}
      />

      {/* Payment Editor Modal */}
      {showPaymentEditor && (
        <PaymentEditor
          client={client}
          onClose={() => setShowPaymentEditor(false)}
        />
      )}
    </>
  );
}
