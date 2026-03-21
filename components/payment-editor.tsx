'use client';

import { useState } from 'react';
import { Client, PaymentRecord } from '@/context/client-context';
import { useClients } from '@/context/client-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Check } from 'lucide-react';

interface PaymentEditorProps {
  client: Client;
  onClose: () => void;
}

export default function PaymentEditor({ client, onClose }: PaymentEditorProps) {
  const { updateClient } = useClients();
  const [paymentStatus, setPaymentStatus] = useState(client.paymentStatus || '');
  const [newAmount, setNewAmount] = useState('');
  const [newNote, setNewNote] = useState('');
  const [existingPayments, setExistingPayments] = useState(client.paymentRecords || []);

  const paymentStatusOptions = [
    'pending',
    'paid',
    '1st payment paid',
    '1st payment DUE',
    '2nd payment paid',
    '2nd Payment DUE',
    '3rd payment paid',
    '3rd payment DUE',
    'fully paid',
    'DONE',
    'Renewal due',
    'INACTIVE',
  ];

  const addPaymentRecord = () => {
    if (newAmount && newNote) {
      const newPayment: PaymentRecord = {
        id: `p_${Date.now()}`,
        date: new Date(),
        amount: parseInt(newAmount),
        status: 'paid',
        note: newNote,
      };
      setExistingPayments([newPayment, ...existingPayments]);
      setNewAmount('');
      setNewNote('');
    }
  };

  const removePaymentRecord = (id: string) => {
    setExistingPayments(existingPayments.filter(p => p.id !== id));
  };

  const saveChanges = () => {
    updateClient(client.id, {
      paymentStatus,
      paymentRecords: existingPayments,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{client.name} - Payment Editor</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Payment Status */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Payment Status
            </label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="">Select status</option>
              {paymentStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Add Payment Record */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-4">Add Payment Record</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-slate-400 mb-2">Amount (PHP)</label>
                <Input
                  type="number"
                  placeholder="e.g., 8500"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="bg-slate-600 border-slate-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-2">Note</label>
                <Input
                  type="text"
                  placeholder="e.g., 1st payment, 2nd payment..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="bg-slate-600 border-slate-500"
                />
              </div>
            </div>
            <Button
              onClick={addPaymentRecord}
              className="bg-green-600 hover:bg-green-700 text-white gap-2 w-full"
            >
              <Plus className="w-4 h-4" />
              Add Payment
            </Button>
          </div>

          {/* Payment History */}
          <div>
            <h3 className="font-semibold text-white mb-4">Payment History</h3>
            {existingPayments.length > 0 ? (
              <div className="space-y-2">
                {existingPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="bg-slate-700 p-3 rounded-lg flex items-center justify-between"
                  >
                    <div>
                      <p className="text-white font-semibold">₱{payment.amount}</p>
                      <p className="text-xs text-slate-400">
                        {payment.note} • {new Date(payment.date).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => removePaymentRecord(payment.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">No payment records yet</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-600">
            <Button
              onClick={saveChanges}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <Check className="w-4 h-4" />
              Save Changes
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
