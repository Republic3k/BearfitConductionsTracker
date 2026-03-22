'use client';

import { useMemo, useState } from 'react';
import { useClients } from '@/context/client-context';
import ClientCardMinimized from '@/components/client-card-minimized';
import { LogOut, Search, Users, UserCheck, AlertTriangle, FileText, X, Download, DollarSign } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const PACKAGE_FILTERS = ['All', 'Full 48', 'Full 24', 'Staggered 48', 'Staggered 24'] as const;

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { clients, coaches, getPaymentReminder, getCoachSessions } = useClients();

  const [search, setSearch] = useState('');
  const [coachFilter, setCoachFilter] = useState('All');
  const [packageFilter, setPackageFilter] = useState<(typeof PACKAGE_FILTERS)[number]>('All');
  const [showInactive, setShowInactive] = useState(true);
  const [showPaymentFollowUp, setShowPaymentFollowUp] = useState(false);
  const [showAllPayments, setShowAllPayments] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportPeriod, setReportPeriod] = useState<'day' | 'week' | 'month'>('day');

  const filteredClients = useMemo(() => {
    return clients
      .filter((client) => {
        const term = search.trim().toLowerCase();
        const matchesSearch =
          !term ||
          client.name.toLowerCase().includes(term) ||
          client.qrCode.toLowerCase().includes(term) ||
          client.coach.toLowerCase().includes(term) ||
          (client.paymentStatus || '').toLowerCase().includes(term);

        const matchesCoach = coachFilter === 'All' || client.coach === coachFilter;
        const matchesPackage = packageFilter === 'All' || client.packageType === packageFilter;
        const matchesInactive = showInactive || !client.isInactive;

        return matchesSearch && matchesCoach && matchesPackage && matchesInactive;
      })
      .sort((a, b) => a.coach.localeCompare(b.coach) || a.name.localeCompare(b.name));
  }, [clients, coachFilter, packageFilter, search, showInactive]);

  const activeClients = clients.filter((client) => !client.isInactive).length;
  const inactiveClients = clients.filter((client) => !!client.isInactive).length;
  
  // Clients needing payment follow-up
  const paymentFollowUpClients = useMemo(() => {
    return clients.filter((client) => {
      const reminder = getPaymentReminder(client);
      const status = (client.paymentStatus || '').toLowerCase();
      return !!reminder || status.includes('due') || status.includes('renew');
    });
  }, [clients, getPaymentReminder]);

  const duePayments = paymentFollowUpClients.length;

  // Generate report data for all coaches
  const reportData = useMemo(() => {
    return coaches.map((coach) => {
      const coachClients = clients.filter((c) => c.coach === coach.name);
      const sessions = getCoachSessions(coach.name, reportPeriod);
      const clientsNeedingReminder = coachClients.filter((client) => {
        const reminder = getPaymentReminder(client);
        const status = (client.paymentStatus || '').toLowerCase();
        return (!!reminder || status.includes('due') || status.includes('renew')) && !client.isInactive;
      });
      
      return {
        coach,
        sessions,
        totalClients: coachClients.length,
        activeClients: coachClients.filter((c) => !c.isInactive).length,
        clientsNeedingReminder,
      };
    });
  }, [coaches, clients, getCoachSessions, getPaymentReminder, reportPeriod]);

  const periodLabel = reportPeriod === 'day' ? 'Today' : reportPeriod === 'week' ? 'This Week' : 'This Month';

  const downloadReport = () => {
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    let content = `BEARFIT CONDUCTION REPORT - ${periodLabel.toUpperCase()}\n`;
    content += `Generated: ${date}\n`;
    content += `${'='.repeat(60)}\n\n`;

    reportData.forEach((data) => {
      content += `COACH: ${data.coach.name} (${data.coach.branch})\n`;
      content += `-`.repeat(40) + '\n';
      content += `Sessions ${periodLabel}: ${data.sessions}\n`;
      content += `Total Clients: ${data.totalClients} | Active: ${data.activeClients}\n\n`;
      
      if (data.clientsNeedingReminder.length > 0) {
        content += `Clients Needing Payment Reminder:\n`;
        data.clientsNeedingReminder.forEach((client) => {
          const reminder = getPaymentReminder(client) || client.paymentStatus || '';
          content += `  - ${client.name}: ${reminder}\n`;
        });
      } else {
        content += `No clients needing payment reminders.\n`;
      }
      content += '\n';
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bearfit-report-${reportPeriod}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <div className="mb-6 rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-400">Bearfit Conduction Tracker</p>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-slate-400">{coaches.length} coaches - {clients.length} total clients</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowAllPayments(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition hover:bg-amber-500"
            >
              <DollarSign className="h-4 w-4" />
              All Payments Due
            </button>
            <button
              onClick={() => setShowReport(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500"
            >
              <FileText className="h-4 w-4" />
              Generate Report
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 font-medium text-slate-200 transition hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Users className="h-4 w-4" />
            Total Clients
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{clients.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <UserCheck className="h-4 w-4" />
            Active
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{activeClients}</p>
        </div>
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <AlertTriangle className="h-4 w-4" />
            Inactive
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{inactiveClients}</p>
        </div>
        <button
          onClick={() => setShowPaymentFollowUp(true)}
          className="rounded-2xl border border-amber-700 bg-amber-950/60 p-4 text-left transition hover:border-amber-500 hover:bg-amber-900/60"
        >
          <div className="flex items-center gap-2 text-amber-300">
            <AlertTriangle className="h-4 w-4" />
            Payment Follow-up
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{duePayments}</p>
          <p className="text-xs text-amber-400 mt-1">Click to view list</p>
        </button>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search client, coach, QR code, or payment note"
              className="w-full rounded-lg border border-slate-600 bg-slate-800 py-3 pl-10 pr-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          <select
            value={coachFilter}
            onChange={(e) => setCoachFilter(e.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-3 text-white outline-none focus:border-blue-500"
          >
            <option value="All">All Coaches</option>
            {coaches.map((coach) => (
              <option key={coach.id} value={coach.name}>
                {coach.name}
              </option>
            ))}
          </select>

          <select
            value={packageFilter}
            onChange={(e) => setPackageFilter(e.target.value as (typeof PACKAGE_FILTERS)[number])}
            className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-3 text-white outline-none focus:border-blue-500"
          >
            {PACKAGE_FILTERS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-3 text-sm text-slate-200">
            <input
              type="checkbox"
              checked={showInactive}
              onChange={(e) => setShowInactive(e.target.checked)}
            />
            Show inactive
          </label>
        </div>
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {coaches.map((coach) => {
          const count = clients.filter((client) => client.coach === coach.name).length;

          return (
            <div key={coach.id} className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
              <p className="text-sm text-slate-400">{coach.branch}</p>
              <p className="mt-1 font-semibold text-white">{coach.name}</p>
              <p className="mt-2 text-2xl font-bold text-white">{count}</p>
              <p className="text-sm text-slate-400">clients</p>
            </div>
          );
        })}
      </div>

      {filteredClients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-8 text-center text-slate-400">
          No clients matched your filters.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredClients.map((client) => (
            <ClientCardMinimized key={client.id} client={client} />
          ))}
        </div>
      )}

      {/* Payment Follow-up Modal */}
      {showPaymentFollowUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Payment Follow-up Required ({duePayments})</h2>
              <button
                onClick={() => setShowPaymentFollowUp(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {paymentFollowUpClients.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No clients need payment follow-up.</p>
            ) : (
              <div className="space-y-3">
                {paymentFollowUpClients.map((client) => {
                  const reminder = getPaymentReminder(client) || client.paymentStatus || 'Payment due';
                  return (
                    <div
                      key={client.id}
                      className="rounded-lg border border-slate-700 bg-slate-800 p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-white">{client.name}</p>
                          <p className="text-sm text-slate-400">{client.coach} - {client.branch}</p>
                          <p className="text-sm text-slate-400">{client.packageType} - {client.remainingBalance} sessions left</p>
                        </div>
                        <span className="rounded-full bg-amber-900/60 px-3 py-1 text-xs font-medium text-amber-300">
                          {reminder}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* All Payments Due Modal */}
      {showAllPayments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">All Clients Needing Payment ({duePayments})</h2>
              <button
                onClick={() => setShowAllPayments(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Group by coach */}
            {coaches.map((coach) => {
              const coachPaymentClients = paymentFollowUpClients.filter((c) => c.coach === coach.name);
              if (coachPaymentClients.length === 0) return null;
              
              return (
                <div key={coach.id} className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-blue-400">{coach.name} ({coach.branch})</h3>
                  <div className="space-y-2">
                    {coachPaymentClients.map((client) => {
                      const reminder = getPaymentReminder(client) || client.paymentStatus || 'Payment due';
                      return (
                        <div
                          key={client.id}
                          className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-3"
                        >
                          <div>
                            <p className="font-medium text-white">{client.name}</p>
                            <p className="text-xs text-slate-400">{client.packageType} - {client.remainingBalance} sessions left</p>
                          </div>
                          <span className="rounded-full bg-amber-900/60 px-3 py-1 text-xs font-medium text-amber-300">
                            {reminder}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            
            {paymentFollowUpClients.length === 0 && (
              <p className="text-slate-400 text-center py-8">No clients need payment.</p>
            )}
          </div>
        </div>
      )}

      {/* Generate Report Modal */}
      {showReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Generate Report - All Coaches</h2>
              <button
                onClick={() => setShowReport(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Period selector */}
            <div className="mb-6 flex gap-2">
              {(['day', 'week', 'month'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setReportPeriod(period)}
                  className={`rounded-lg px-4 py-2 font-medium transition ${
                    reportPeriod === period
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {period === 'day' ? 'Today' : period === 'week' ? 'This Week' : 'This Month'}
                </button>
              ))}
              <button
                onClick={downloadReport}
                className="ml-auto inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-500"
              >
                <Download className="h-4 w-4" />
                Download Report
              </button>
            </div>
            
            {/* Report content */}
            <div className="space-y-6">
              {reportData.map((data) => (
                <div key={data.coach.id} className="rounded-lg border border-slate-700 bg-slate-800 p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{data.coach.name}</h3>
                      <p className="text-sm text-slate-400">{data.coach.branch}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-400">{data.sessions}</p>
                      <p className="text-xs text-slate-400">sessions {periodLabel.toLowerCase()}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3 flex gap-4 text-sm">
                    <span className="text-slate-400">Total Clients: <span className="text-white">{data.totalClients}</span></span>
                    <span className="text-slate-400">Active: <span className="text-white">{data.activeClients}</span></span>
                  </div>
                  
                  {data.clientsNeedingReminder.length > 0 && (
                    <div>
                      <p className="mb-2 text-sm font-medium text-amber-400">Clients Needing Payment Reminder:</p>
                      <div className="space-y-1">
                        {data.clientsNeedingReminder.map((client) => {
                          const reminder = getPaymentReminder(client) || client.paymentStatus || 'Payment due';
                          return (
                            <div key={client.id} className="flex items-center justify-between rounded bg-slate-900 px-3 py-2 text-sm">
                              <span className="text-white">{client.name}</span>
                              <span className="text-amber-300">{reminder}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {data.clientsNeedingReminder.length === 0 && (
                    <p className="text-sm text-green-400">No clients need payment reminders.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
