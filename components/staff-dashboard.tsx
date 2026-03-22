'use client';

import { useMemo, useState } from 'react';
import { useClients } from '@/context/client-context';
import ClientCardMinimized from '@/components/client-card-minimized';
import { Search, QrCode, LogOut, Users, Activity, AlertTriangle, FileText, X, Download, DollarSign } from 'lucide-react';

interface StaffDashboardProps {
  coachName: string;
  onScanClick: () => void;
  onLogout: () => void;
}

const PACKAGE_FILTERS = ['All', 'Full 48', 'Full 24', 'Staggered 48', 'Staggered 24'] as const;
const STATUS_FILTERS = ['All', 'Active', 'Inactive'] as const;

export default function StaffDashboard({
  coachName,
  onScanClick,
  onLogout,
}: StaffDashboardProps) {
  const { getClientsByCoach, getCoachSessions, getPaymentReminder } = useClients();
  const [search, setSearch] = useState('');
  const [packageFilter, setPackageFilter] = useState<(typeof PACKAGE_FILTERS)[number]>('All');
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>('All');
  const [showLowBalance, setShowLowBalance] = useState(false);
  const [showAllPayments, setShowAllPayments] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportPeriod, setReportPeriod] = useState<'day' | 'week' | 'month'>('day');

  const coachClients = useMemo(() => getClientsByCoach(coachName), [getClientsByCoach, coachName]);

  const filteredClients = useMemo(() => {
    return coachClients
      .filter((client) => {
        const term = search.trim().toLowerCase();
        const matchesSearch =
          !term ||
          client.name.toLowerCase().includes(term) ||
          client.qrCode.toLowerCase().includes(term) ||
          (client.paymentStatus || '').toLowerCase().includes(term);

        const matchesPackage = packageFilter === 'All' || client.packageType === packageFilter;

        const matchesStatus =
          statusFilter === 'All' ||
          (statusFilter === 'Active' && !client.isInactive) ||
          (statusFilter === 'Inactive' && !!client.isInactive);

        return matchesSearch && matchesPackage && matchesStatus;
      })
      .sort((a, b) => Number(!!a.isInactive) - Number(!!b.isInactive) || a.name.localeCompare(b.name));
  }, [coachClients, packageFilter, search, statusFilter]);

  const todaySessions = getCoachSessions(coachName, 'day');
  const weekSessions = getCoachSessions(coachName, 'week');
  const monthSessions = getCoachSessions(coachName, 'month');
  const activeClients = coachClients.filter((client) => !client.isInactive).length;
  
  // Low balance clients (5 or fewer sessions remaining)
  const lowBalanceClientsList = useMemo(() => {
    return coachClients.filter(
      (client) => !client.isInactive && client.remainingBalance > 0 && client.remainingBalance <= 5
    );
  }, [coachClients]);
  
  const lowBalanceClients = lowBalanceClientsList.length;

  // Clients needing payment follow-up
  const paymentFollowUpClients = useMemo(() => {
    return coachClients.filter((client) => {
      if (client.isInactive) return false;
      const reminder = getPaymentReminder(client);
      const status = (client.paymentStatus || '').toLowerCase();
      return !!reminder || status.includes('due') || status.includes('renew');
    });
  }, [coachClients, getPaymentReminder]);

  const branch = coachClients[0]?.branch ?? 'Unknown branch';

  const periodLabel = reportPeriod === 'day' ? 'Today' : reportPeriod === 'week' ? 'This Week' : 'This Month';
  const sessions = reportPeriod === 'day' ? todaySessions : reportPeriod === 'week' ? weekSessions : monthSessions;

  const downloadReport = () => {
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    let content = `BEARFIT CONDUCTION REPORT - ${coachName.toUpperCase()}\n`;
    content += `Period: ${periodLabel}\n`;
    content += `Generated: ${date}\n`;
    content += `${'='.repeat(50)}\n\n`;

    content += `SUMMARY\n`;
    content += `-`.repeat(30) + '\n';
    content += `Sessions ${periodLabel}: ${sessions}\n`;
    content += `Total Clients: ${coachClients.length}\n`;
    content += `Active Clients: ${activeClients}\n`;
    content += `Low Balance Clients: ${lowBalanceClients}\n\n`;
    
    if (paymentFollowUpClients.length > 0) {
      content += `CLIENTS NEEDING PAYMENT REMINDER\n`;
      content += `-`.repeat(30) + '\n';
      paymentFollowUpClients.forEach((client) => {
        const reminder = getPaymentReminder(client) || client.paymentStatus || 'Payment due';
        content += `- ${client.name}: ${reminder}\n`;
        content += `  Package: ${client.packageType} | Remaining: ${client.remainingBalance} sessions\n`;
      });
    } else {
      content += `No clients needing payment reminders.\n`;
    }
    
    content += '\n';
    
    if (lowBalanceClientsList.length > 0) {
      content += `LOW BALANCE CLIENTS (5 or fewer sessions)\n`;
      content += `-`.repeat(30) + '\n';
      lowBalanceClientsList.forEach((client) => {
        content += `- ${client.name}: ${client.remainingBalance} sessions remaining\n`;
        content += `  Package: ${client.packageType}\n`;
      });
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${coachName.replace(/\s+/g, '-').toLowerCase()}-report-${reportPeriod}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <div className="mb-6 rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-400">Coach Dashboard</p>
            <h1 className="text-3xl font-bold text-white">{coachName}</h1>
            <p className="text-sm text-slate-400">{branch}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowAllPayments(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition hover:bg-amber-500"
            >
              <DollarSign className="h-4 w-4" />
              Payments Due
            </button>
            <button
              onClick={() => setShowReport(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-500"
            >
              <FileText className="h-4 w-4" />
              Generate Report
            </button>
            <button
              onClick={onScanClick}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500"
            >
              <QrCode className="h-4 w-4" />
              QR Scanner
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
        <div className="rounded-2xl border border-blue-800 bg-blue-950/60 p-4">
          <p className="text-sm text-blue-300">Today</p>
          <p className="mt-2 text-3xl font-bold text-white">{todaySessions}</p>
        </div>
        <div className="rounded-2xl border border-purple-800 bg-purple-950/60 p-4">
          <p className="text-sm text-purple-300">This Week</p>
          <p className="mt-2 text-3xl font-bold text-white">{weekSessions}</p>
        </div>
        <div className="rounded-2xl border border-green-800 bg-green-950/60 p-4">
          <p className="text-sm text-green-300">This Month</p>
          <p className="mt-2 text-3xl font-bold text-white">{monthSessions}</p>
        </div>
        <button
          onClick={() => setShowLowBalance(true)}
          className="rounded-2xl border border-amber-800 bg-amber-950/60 p-4 text-left transition hover:border-amber-600 hover:bg-amber-900/60"
        >
          <p className="text-sm text-amber-300">Low Balance Clients</p>
          <p className="mt-2 text-3xl font-bold text-white">{lowBalanceClients}</p>
          <p className="text-xs text-amber-400 mt-1">Click to view list</p>
        </button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Users className="h-4 w-4" />
            Total Clients
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{coachClients.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Activity className="h-4 w-4" />
            Active Clients
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{activeClients}</p>
        </div>
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Search className="h-4 w-4" />
            Showing
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{filteredClients.length}</p>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
        <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search client, QR code, or payment note"
              className="w-full rounded-lg border border-slate-600 bg-slate-800 py-3 pl-10 pr-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

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

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as (typeof STATUS_FILTERS)[number])}
            className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-3 text-white outline-none focus:border-blue-500"
          >
            {STATUS_FILTERS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
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

      {/* Low Balance Clients Modal */}
      {showLowBalance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Low Balance Clients ({lowBalanceClients})</h2>
              <button
                onClick={() => setShowLowBalance(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-4 text-sm text-slate-400">Clients with 5 or fewer sessions remaining</p>
            
            {lowBalanceClientsList.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No low balance clients.</p>
            ) : (
              <div className="space-y-3">
                {lowBalanceClientsList.map((client) => (
                  <div
                    key={client.id}
                    className="rounded-lg border border-slate-700 bg-slate-800 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-white">{client.name}</p>
                        <p className="text-sm text-slate-400">{client.packageType}</p>
                        <p className="text-sm text-slate-400">{client.paymentStatus || 'No payment status'}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block rounded-full bg-amber-900/60 px-3 py-1 text-lg font-bold text-amber-300">
                          {client.remainingBalance}
                        </span>
                        <p className="text-xs text-slate-400 mt-1">sessions left</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* All Payments Due Modal */}
      {showAllPayments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Payments Due ({paymentFollowUpClients.length})</h2>
              <button
                onClick={() => setShowAllPayments(false)}
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

      {/* Generate Report Modal */}
      {showReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Generate Report - {coachName}</h2>
              <button
                onClick={() => setShowReport(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Period selector */}
            <div className="mb-6 flex flex-wrap gap-2">
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
                Download
              </button>
            </div>
            
            {/* Report preview */}
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{coachName}</h3>
                  <p className="text-sm text-slate-400">{branch}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-400">{sessions}</p>
                  <p className="text-xs text-slate-400">sessions {periodLabel.toLowerCase()}</p>
                </div>
              </div>
              
              <div className="mb-4 grid grid-cols-3 gap-4 text-sm">
                <div className="rounded bg-slate-900 p-3 text-center">
                  <p className="text-xl font-bold text-white">{coachClients.length}</p>
                  <p className="text-slate-400">Total</p>
                </div>
                <div className="rounded bg-slate-900 p-3 text-center">
                  <p className="text-xl font-bold text-white">{activeClients}</p>
                  <p className="text-slate-400">Active</p>
                </div>
                <div className="rounded bg-slate-900 p-3 text-center">
                  <p className="text-xl font-bold text-amber-400">{lowBalanceClients}</p>
                  <p className="text-slate-400">Low Balance</p>
                </div>
              </div>
              
              {paymentFollowUpClients.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-medium text-amber-400">Clients Needing Payment Reminder:</p>
                  <div className="space-y-1">
                    {paymentFollowUpClients.map((client) => {
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
              
              {paymentFollowUpClients.length === 0 && (
                <p className="text-sm text-green-400">No clients need payment reminders.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
