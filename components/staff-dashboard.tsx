'use client';

import { useMemo, useState } from 'react';
import { useClients } from '@/context/client-context';
import ClientCardMinimized from '@/components/client-card-minimized';
import { Search, QrCode, LogOut, Users, Activity } from 'lucide-react';

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
  const { getClientsByCoach, getCoachSessions } = useClients();
  const [search, setSearch] = useState('');
  const [packageFilter, setPackageFilter] = useState<(typeof PACKAGE_FILTERS)[number]>('All');
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>('All');

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
  const lowBalanceClients = coachClients.filter(
    (client) => !client.isInactive && client.remainingBalance > 0 && client.remainingBalance <= 5
  ).length;
  const branch = coachClients[0]?.branch ?? 'Unknown branch';

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
        <div className="rounded-2xl border border-amber-800 bg-amber-950/60 p-4">
          <p className="text-sm text-amber-300">Low Balance Clients</p>
          <p className="mt-2 text-3xl font-bold text-white">{lowBalanceClients}</p>
        </div>
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
    </div>
  );
}
