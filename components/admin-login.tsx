'use client';

import { useState } from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onBack?: () => void;
}

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'BearfitAdmin123';

export default function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError('');
      onLogin();
      return;
    }

    setError('Invalid admin credentials');
    setPassword('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/80 p-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-400">Restricted Area</p>
            <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-slate-200 transition hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}
        </div>

        <div className="mb-4 rounded-xl border border-blue-800 bg-blue-950/50 p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-blue-300" />
            <div className="text-sm text-blue-100">
              <p className="font-semibold">Default admin credentials</p>
              <p>Username: admin</p>
              <p>Password: BearfitAdmin123</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Username</label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-3 text-white outline-none transition focus:border-blue-500"
              placeholder="Enter admin username"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-3 text-white outline-none transition focus:border-blue-500"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-800 bg-red-950/50 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-500"
          >
            Login to Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
