'use client';

import { useState } from 'react';
import { COACHES } from '@/context/client-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Lock } from 'lucide-react';

interface CoachLoginProps {
  onLogin: (coachName: string) => void;
  onAdminClick?: () => void;
}

export default function CoachLogin({ onLogin, onAdminClick }: CoachLoginProps) {
  const [selectedCoach, setSelectedCoach] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!selectedCoach) {
      setError('Please select a coach');
      return;
    }

    if (!password) {
      setError('Please enter password');
      return;
    }

    const coach = COACHES.find((c) => c.name === selectedCoach);
    if (!coach || coach.password !== password) {
      setError('Invalid coach or password');
      setPassword('');
      return;
    }

    setError('');
    onLogin(selectedCoach);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Bearfit Conduction Tracker</h1>
          <p className="text-slate-400">Coach Login Portal</p>
        </div>

        {/* Login Card */}
        <Card className="bg-slate-700 border-slate-600 p-6">
          <div className="space-y-6">
            {/* Coach Selection */}
            <div>
              <label className="text-white font-semibold mb-3 block">Select Coach</label>
              <select
                value={selectedCoach}
                onChange={(e) => {
                  setSelectedCoach(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 text-white rounded-lg focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
              >
                <option value="">Choose a coach...</option>
                {COACHES.map((coach) => (
                  <option key={coach.id} value={coach.name}>
                    {coach.name} ({coach.branch})
                  </option>
                ))}
              </select>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-white font-semibold mb-3 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 pr-10 bg-slate-600 border border-slate-500 text-white placeholder:text-slate-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                >
                  <Lock className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex gap-3 p-3 bg-red-900 border border-red-700 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2"
            >
              Login
            </Button>

            {/* Admin Access */}
            {onAdminClick && (
              <Button
                onClick={onAdminClick}
                variant="outline"
                className="w-full border-slate-500 text-slate-300 hover:bg-slate-600 hover:text-white"
              >
                Admin Dashboard
              </Button>
            )}

            {/* Demo Info */}
            <div className="bg-slate-600 p-3 rounded-lg text-sm text-slate-300">
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <p>Coach Jaoquin: Jaoquin123</p>
              <p>Coach Amiel: Amiel123</p>
              <p>Coach Hunejin: Hunejin123</p>
              <p>Coach Andrei: Andrei123</p>
              <p>Coach Isaac: Isaac123</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
