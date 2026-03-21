'use client';

import { useState } from 'react';
import StaffDashboard from '@/components/staff-dashboard';
import QRScanner from '@/components/qr-scanner';
import CoachLogin from '@/components/coach-login';
import AdminLogin from '@/components/admin-login';
import AdminDashboard from '@/components/admin-dashboard';
import { ClientProvider } from '@/context/client-context';

type AuthMode = 'none' | 'coach' | 'admin' | 'admin-login';

export default function Home() {
  const [authMode, setAuthMode] = useState<AuthMode>('none');
  const [showScanner, setShowScanner] = useState(false);
  const [currentCoach, setCurrentCoach] = useState('');

  const handleCoachLogin = (coachName: string) => {
    setCurrentCoach(coachName);
    setAuthMode('coach');
  };

  const handleAdminClick = () => {
    setAuthMode('admin-login');
  };

  const handleAdminLogin = () => {
    setAuthMode('admin');
  };

  const handleLogout = () => {
    setAuthMode('none');
    setCurrentCoach('');
    setShowScanner(false);
  };

  return (
    <ClientProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        {authMode === 'none' && (
          <CoachLogin onLogin={handleCoachLogin} onAdminClick={handleAdminClick} />
        )}
        {authMode === 'admin-login' && (
          <AdminLogin onLogin={handleAdminLogin} />
        )}
        {authMode === 'admin' && (
          <AdminDashboard onLogout={handleLogout} />
        )}
        {authMode === 'coach' && !showScanner && (
          <StaffDashboard 
            coachName={currentCoach}
            onScanClick={() => setShowScanner(true)}
            onLogout={handleLogout}
          />
        )}
        {authMode === 'coach' && showScanner && (
          <QRScanner 
            coachName={currentCoach}
            onClose={() => setShowScanner(false)} 
          />
        )}
      </div>
    </ClientProvider>
  );
}
