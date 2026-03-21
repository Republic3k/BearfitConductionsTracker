'use client';

import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

interface UnrecordedSessionsNoteProps {
  sessions: Array<{ name: string; date: string; count: number }>;
}

export default function UnrecordedSessionsNote({ sessions }: UnrecordedSessionsNoteProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || sessions.length === 0) return null;

  return (
    <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-200 mb-2">Unrecorded Sessions</h3>
            <p className="text-amber-100/80 text-sm mb-3">
              The following clients have sessions in the PDF that haven't been recorded in the system yet:
            </p>
            <div className="space-y-1 text-sm">
              {sessions.map((session, idx) => (
                <div key={idx} className="text-amber-100">
                  <strong>{session.name}</strong> - {session.count} session{session.count > 1 ? 's' : ''} (as of {session.date})
                </div>
              ))}
            </div>
            <p className="text-amber-100/60 text-xs mt-3">
              Please review and manually record these sessions to keep records accurate.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-amber-600 hover:text-amber-500 flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
