'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useClients } from '@/context/client-context';
import type { Client, SessionRecord } from '@/context/client-context';
import { Camera, Search, X, QrCode } from 'lucide-react';

interface QRScannerProps {
  coachName: string;
  onClose: () => void;
}

type BarcodeDetectorLike = {
  detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue?: string }>>;
};

declare global {
  interface Window {
    BarcodeDetector?: new (options?: { formats?: string[] }) => BarcodeDetectorLike;
  }
}

export default function QRScanner({ coachName, onClose }: QRScannerProps) {
  const { getClientsByCoach, deductSession } = useClients();
  const coachClients = useMemo(() => getClientsByCoach(coachName), [getClientsByCoach, coachName]);

  const [query, setQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [sessionType, setSessionType] = useState<SessionRecord['type']>('Weights');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [supportsBarcode, setSupportsBarcode] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectorRef = useRef<BarcodeDetectorLike | null>(null);
  const frameRef = useRef<number | null>(null);

  const findClient = (value: string) => {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) {
      setSelectedClient(null);
      return;
    }

    const match =
      coachClients.find((client) => client.qrCode.toLowerCase() === trimmed) ||
      coachClients.find((client) => client.name.toLowerCase() === trimmed) ||
      coachClients.find((client) => client.qrCode.toLowerCase().includes(trimmed)) ||
      coachClients.find((client) => client.name.toLowerCase().includes(trimmed));

    setSelectedClient(match ?? null);
  };

  useEffect(() => {
    setSupportsBarcode(typeof window !== 'undefined' && !!window.BarcodeDetector);
  }, []);

  useEffect(() => {
    findClient(query);
  }, [query, coachClients]);

  const stopCamera = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsCameraActive(false);
  };

  useEffect(() => stopCamera, []);

  const scanFrame = async () => {
    if (!videoRef.current || !detectorRef.current || !isCameraActive) return;

    try {
      const results = await detectorRef.current.detect(videoRef.current);
      const rawValue = results[0]?.rawValue;

      if (rawValue) {
        setQuery(rawValue);
        findClient(rawValue);
        stopCamera();
        return;
      }
    } catch {
      // ignore transient detector errors
    }

    frameRef.current = requestAnimationFrame(scanFrame);
  };

  const startCamera = async () => {
    setCameraError('');

    if (!supportsBarcode || !window.BarcodeDetector) {
      setCameraError('Camera QR scanning is not supported in this browser. Use manual QR entry below.');
      return;
    }

    try {
      detectorRef.current = new window.BarcodeDetector({ formats: ['qr_code'] });
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });

      streamRef.current = stream;
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      frameRef.current = requestAnimationFrame(scanFrame);
    } catch {
      setCameraError('Unable to access camera. Check browser permissions and try again.');
      stopCamera();
    }
  };

  const handleLogSession = () => {
    if (!selectedClient) return;
    deductSession(selectedClient.id, sessionType, coachName);
    onClose();
  };

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-6">
      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Quick Lookup</p>
            <h1 className="text-3xl font-bold text-white">QR Scanner</h1>
            <p className="text-sm text-slate-400">Scan or type a client QR code, then log the session.</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-600 px-4 py-2 text-slate-200 transition hover:bg-slate-800"
          >
            Back
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
            <div className="mb-4 flex flex-wrap gap-3">
              <button
                onClick={startCamera}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500"
              >
                <Camera className="h-4 w-4" />
                Start Camera Scan
              </button>

              {isCameraActive && (
                <button
                  onClick={stopCamera}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 font-medium text-slate-200 transition hover:bg-slate-800"
                >
                  <X className="h-4 w-4" />
                  Stop Camera
                </button>
              )}
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-700 bg-black">
              <video ref={videoRef} className="aspect-video w-full object-cover" muted playsInline />
            </div>

            {cameraError && (
              <p className="mt-3 rounded-lg border border-amber-800 bg-amber-950/50 p-3 text-sm text-amber-200">
                {cameraError}
              </p>
            )}

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-300">Manual QR input</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Example: QR_001"
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 py-3 pl-10 pr-3 text-white outline-none transition focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
            <div className="mb-4 flex items-center gap-2 text-slate-300">
              <QrCode className="h-4 w-4" />
              Scan Result
            </div>

            {!query ? (
              <div className="rounded-xl border border-dashed border-slate-700 p-6 text-center text-slate-400">
                Waiting for a QR code or manual input.
              </div>
            ) : !selectedClient ? (
              <div className="rounded-xl border border-red-800 bg-red-950/50 p-4 text-red-200">
                No client matched <span className="font-semibold">{query}</span>.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
                  <p className="text-sm text-slate-400">Client</p>
                  <h2 className="text-2xl font-bold text-white">{selectedClient.name}</h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">QR Code</p>
                      <p className="text-sm text-slate-200">{selectedClient.qrCode}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Remaining</p>
                      <p className="text-sm text-slate-200">{selectedClient.remainingBalance}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Package</p>
                      <p className="text-sm text-slate-200">{selectedClient.packageType}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
                      <p className="text-sm text-slate-200">{selectedClient.paymentStatus || 'Active'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Session type</label>
                  <select
                    value={sessionType}
                    onChange={(e) => setSessionType(e.target.value as SessionRecord['type'])}
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-3 text-white outline-none focus:border-blue-500"
                  >
                    <option value="Weights">Weights</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Pilates">Pilates</option>
                  </select>
                </div>

                <button
                  onClick={handleLogSession}
                  disabled={selectedClient.isInactive || selectedClient.remainingBalance <= 0}
                  className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                >
                  {selectedClient.isInactive
                    ? 'Client inactive'
                    : selectedClient.remainingBalance <= 0
                    ? 'No balance remaining'
                    : 'Log Session'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
