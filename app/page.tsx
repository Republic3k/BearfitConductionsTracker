'use client';

import { useState } from 'react';
import StaffDashboard from '@/components/staff-dashboard';
import QRScanner from '@/components/qr-scanner';
import CoachLogin from '@/components/coach-login';
import AdminLogin from '@/components/admin-login';
import AdminDashboard from '@/components/admin-dashboard';
import { ClientProvider } from '@/context/client-context';

type AuthMode = 'coach-login' | 'coach-dashboard' | 'coach-scanner' | 'admin-login' | 'admin-dashboard';

export default function Home() {
  const [authMode, setAuthMode] = useState<AuthMode>('coach-login');
  const [currentCoach, setCurrentCoach] = useState('');

  const handleCoachLogin = (coachName: string) => {
    setCurrentCoach(coachName);
    setAuthMode('coach-dashboard');
  };

  const handleAdminClick = () => {
    setAuthMode('admin-login');
  };

  const handleAdminLogin = () => {
    setAuthMode('admin-dashboard');
  };

  const handleLogout = () => {
    setCurrentCoach('');
    setAuthMode('coach-login');
  };

  return (
    <ClientProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        {authMode === 'coach-login' && (
          <CoachLogin onLogin={handleCoachLogin} onAdminClick={handleAdminClick} />
        )}

        {authMode === 'admin-login' && (
          <AdminLogin onLogin={handleAdminLogin} onBack={() => setAuthMode('coach-login')} />
        )}

        {authMode === 'admin-dashboard' && <AdminDashboard onLogout={handleLogout} />}

        {authMode === 'coach-dashboard' && (
          <StaffDashboard
            coachName={currentCoach}
            onScanClick={() => setAuthMode('coach-scanner')}
            onLogout={handleLogout}
          />
        )}

        {authMode === 'coach-scanner' && (
          <QRScanner
            coachName={currentCoach}
            onClose={() => setAuthMode('coach-dashboard')}
          />
        )}
      </div>
    </ClientProvider>
  );
}
