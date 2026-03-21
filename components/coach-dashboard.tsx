'use client';

import { useClients } from '@/context/client-context';
import { Activity } from 'lucide-react';

interface CoachDashboardProps {
  coachName: string;
}

export default function CoachDashboard({ coachName }: CoachDashboardProps) {
  const { getCoachSessions } = useClients();

  const todaySessions = getCoachSessions(coachName, 'day');
  const weekSessions = getCoachSessions(coachName, 'week');
  const monthSessions = getCoachSessions(coachName, 'month');

  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="mb-8">
      {/* Month Header */}
      <div className="mb-6">
        <p className="text-slate-400 text-sm mb-2">Current Period</p>
        <h2 className="text-2xl font-bold text-white">{currentMonth}</h2>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700 hover:border-blue-600 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm mb-2">Today</p>
              <p className="text-4xl font-bold text-white">{todaySessions}</p>
              <p className="text-blue-300 text-xs mt-2">sessions</p>
            </div>
            <Activity className="w-12 h-12 text-blue-400 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-700 hover:border-purple-600 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm mb-2">This Week</p>
              <p className="text-4xl font-bold text-white">{weekSessions}</p>
              <p className="text-purple-300 text-xs mt-2">sessions</p>
            </div>
            <Activity className="w-12 h-12 text-purple-400 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700 hover:border-green-600 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm mb-2">This Month</p>
              <p className="text-4xl font-bold text-white">{monthSessions}</p>
              <p className="text-green-300 text-xs mt-2">sessions</p>
            </div>
            <Activity className="w-12 h-12 text-green-400 opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
}
