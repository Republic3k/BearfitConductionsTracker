'use client';

import { useState } from 'react';
import type { Client, SessionRecord } from '@/context/client-context';
import { useClients } from '@/context/client-context';
import { Dumbbell, HeartPulse, Flower2, X } from 'lucide-react';

interface SessionModalProps {
  isOpen: boolean;
  client: Client;
  onClose: () => void;
}

const SESSION_OPTIONS: Array<{
  value: SessionRecord['type'];
  label: string;
  icon: typeof Dumbbell;
  description: string;
}> = [
  {
    value: 'Weights',
    label: 'Weights',
    icon: Dumbbell,
    description: 'Strength or resistance training',
  },
  {
    value: 'Cardio',
    label: 'Cardio',
    icon: HeartPulse,
    description: 'Cardio-focused workout',
  },
  {
    value: 'Pilates',
    label: 'Pilates',
    icon: Flower2,
    description: 'Pilates session',
  },
];

export default function SessionModal({
  isOpen,
  client,
  onClose,
}: SessionModalProps) {
  const { deductSession } = useClients();
  const [sessionType, setSessionType] = useState<SessionRecord['type']>('Weights');

  if (!isOpen) return null;

  const isBlocked = !!client.isInactive || client.remainingBalance <= 0;

  const handleSave = () => {
    if (isBlocked) return;
    deductSession(client.id, sessionType, client.coach);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Log Session</p>
            <h2 className="text-2xl font-bold text-white">{client.name}</h2>
            <p className="mt-1 text-sm text-slate-400">
              {client.packageType} • {client.remainingBalance} remaining
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isBlocked && (
          <div className="mb-4 rounded-xl border border-red-800 bg-red-950/60 p-4 text-sm text-red-200">
            {client.isInactive
              ? 'This client is marked inactive. Reactivate the record before logging a session.'
              : 'This client has no remaining balance. Renew the package before logging a session.'}
          </div>
        )}

        <div className="space-y-3">
          {SESSION_OPTIONS.map((option) => {
            const Icon = option.icon;
            const active = sessionType === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSessionType(option.value)}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  active
                    ? 'border-blue-500 bg-blue-950/60'
                    : 'border-slate-700 bg-slate-800/70 hover:border-slate-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`rounded-lg p-2 ${
                      active ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{option.label}</p>
                    <p className="text-sm text-slate-400">{option.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-600 px-4 py-2 font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isBlocked}
            className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            Save Session
          </button>
        </div>
      </div>
    </div>
  );
}
