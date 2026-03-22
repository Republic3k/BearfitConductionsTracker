'use client';

import type { Client } from '@/context/client-context';

interface SessionHistoryProps {
  client: Client;
  timeFilter: 'day' | 'week' | 'month';
}

const DAY_MAP: Record<SessionHistoryProps['timeFilter'], number> = {
  day: 1,
  week: 7,
  month: 30,
};

export default function SessionHistory({ client, timeFilter }: SessionHistoryProps) {
  const cutoff = new Date(Date.now() - DAY_MAP[timeFilter] * 24 * 60 * 60 * 1000);

  const sessions = [...(client.sessions || [])]
    .filter((session) => new Date(session.date) >= cutoff)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (sessions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-700 p-4 text-sm text-slate-400">
        No recorded sessions in this time range.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="rounded-lg border border-slate-700 bg-slate-800/60 p-3"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-white">{session.type}</p>
              <p className="text-sm text-slate-400">
                {new Date(session.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="text-right text-sm text-slate-400">
              <p>{session.coach}</p>
              <p>{session.branch}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
