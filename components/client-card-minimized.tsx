'use client';

import { useState } from 'react';
import { Client } from '@/context/client-context';
import { useClients } from '@/context/client-context';
import SessionModal from '@/components/session-modal';
import PaymentEditor from '@/components/payment-editor';
import { ChevronDown, Dumbbell, CreditCard } from 'lucide-react';

interface ClientCardMinimizedProps {
  client: Client;
}

const packageColors: Record<string, { bg: string; text: string; border: string }> = {
  'Full 48': { bg: 'bg-purple-900', text: 'text-purple-300', border: 'border-purple-700' },
  'Full 24': { bg: 'bg-blue-900', text: 'text-blue-300', border: 'border-blue-700' },
  'Staggered 48': { bg: 'bg-green-900', text: 'text-green-300', border: 'border-green-700' },
  'Staggered 24': { bg: 'bg-orange-900', text: 'text-orange-300', border: 'border-orange-700' },
};

export default function ClientCardMinimized({ client }: ClientCardMinimizedProps) {
  const { getPaymentReminder } = useClients();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showPaymentEditor, setShowPaymentEditor] = useState(false);
  const isLowBalance = client.remainingBalance <= 5 && client.remainingBalance > 0;
  const paymentReminder = getPaymentReminder(client);
  const colors = packageColors[client.packageType] || packageColors['Full 24'];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`rounded-lg overflow-hidden transition-all ${colors.bg} border-2 ${colors.border} hover:shadow-lg`}>
      {/* Minimized Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full p-4 flex items-center justify-between hover:opacity-90 transition-opacity`}
      >
        <div className="flex-1 text-left">
          <div className="flex items-center gap-3">
            <div className={`px-2 py-1 rounded text-xs font-bold ${colors.text} bg-black/20`}>
              {client.packageType}
            </div>
            <div>
              <h3 className="font-bold text-white">{client.name}</h3>
              {client.startingBalance && (
                <p className="text-xs text-slate-300">Started: {client.startingBalance}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className={`text-lg font-bold ${isLowBalance ? 'text-yellow-300' : 'text-green-300'}`}>
              {client.remainingBalance}
            </span>
            <p className="text-xs text-slate-300">remaining</p>
          </div>
          {client.isInactive && (
            <span className="px-2 py-1 bg-gray-600 text-gray-200 text-xs font-semibold rounded">
              INACTIVE
            </span>
          )}
          <ChevronDown 
            className={`w-5 h-5 text-slate-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Payment Reminder Alert */}
      {paymentReminder && (
        <div className="px-4 pt-2 pb-0">
          <div className="bg-red-900/50 border border-red-700 p-3 rounded text-xs">
            <p className="text-red-100 font-semibold">{paymentReminder}</p>
          </div>
        </div>
      )}

      {/* Expanded Details */}
      {isExpanded && (
        <div className={`border-t-2 ${colors.border} p-4 space-y-4 ${colors.bg}/50`}>
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-slate-300 mb-1">Coach</p>
              <p className="font-semibold text-white">{client.coach}</p>
            </div>
            <div>
              <p className="text-xs text-slate-300 mb-1">Branch</p>
              <p className="font-semibold text-white">{client.branch}</p>
            </div>
            <div>
              <p className="text-xs text-slate-300 mb-1">QR Code</p>
              <p className="font-semibold text-white">{client.qrCode}</p>
            </div>
            <div>
              <p className="text-xs text-slate-300 mb-1">Status</p>
              <p className="font-semibold text-white">{client.paymentStatus || 'Active'}</p>
            </div>
          </div>

          {/* Sessions Summary */}
          {client.sessions && client.sessions.length > 0 && (
            <div>
              <p className="text-xs text-slate-300 mb-2 font-semibold">Sessions ({client.sessions.length})</p>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {client.sessions.slice(0, 5).map((session) => (
                  <div key={session.id} className="flex justify-between text-xs bg-black/20 p-2 rounded">
                    <span className="font-semibold">{session.type}</span>
                    <span className="text-slate-400">{formatDate(session.date)}</span>
                  </div>
                ))}
                {client.sessions.length > 5 && (
                  <p className="text-xs text-slate-400 italic">+{client.sessions.length - 5} more sessions</p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => setShowSessionModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-3 rounded transition-colors flex items-center justify-center gap-2"
            >
              <Dumbbell className="w-4 h-4" />
              Log Session
            </button>
            <button
              onClick={() => setShowPaymentEditor(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-3 rounded transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Payment
            </button>
          </div>
        </div>
      )}

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
    </div>
  );
}
