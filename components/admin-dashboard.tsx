'use client';

import { useMemo, useState } from 'react';
import { useClients } from '@/context/client-context';
import ClientCardMinimized from '@/components/client-card-minimized';
import { LogOut, Search, Users, UserCheck, AlertTriangle } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const PACKAGE_FILTERS = ['All', 'Full 48', 'Full 24', 'Staggered 48', 'Staggered 24'] as const;

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { clients, coaches, getPaymentReminder } = useClients();

  const [search, setSearch] = useState('');
  const [coachFilter, setCoachFilter] = useState('All');
  const [packageFilter, setPackageFilter] = useState<(typeof PACKAGE_FILTERS)[number]>('All');
  const [showInactive, setShowInactive] = useState(true);

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
  const duePayments = clients.filter((client) => {
    const reminder = getPaymentReminder(client);
    const status = (client.paymentStatus || '').toLowerCase();
    return !!reminder || status.includes('due') || status.includes('renew');
  }).length;

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <div className="mb-6 rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-400">Bearfit Conduction Tracker</p>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-slate-400">{coaches.length} coaches • {clients.length} total clients</p>
          </div>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 font-medium text-slate-200 transition hover:bg-slate-800"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
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
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
          <div className="flex items-center gap-2 text-slate-300">
            <AlertTriangle className="h-4 w-4" />
            Payment Follow-up
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{duePayments}</p>
        </div>
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
    </div>
  );
}
