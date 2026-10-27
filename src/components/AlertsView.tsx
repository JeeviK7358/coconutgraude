import React, { useState } from 'react';
import { Alert, Tree, FarmerProfile } from '../types';
import { translations } from '../translations';
import { api } from '../services/api';
import {
  BellRing,
  Send,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Clock,
  MapPin,
  Mail,
  MessageSquare,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  Check,
  RotateCw,
  Filter
} from 'lucide-react';

interface AlertsViewProps {
  alerts: Alert[];
  trees: Tree[];
  farmer: FarmerProfile;
  language: 'en' | 'ta';
  onAlertsUpdated: () => void;
  onNavigateToMap: (treeId: string) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  trees,
  farmer,
  language,
  onAlertsUpdated,
  onNavigateToMap,
}) => {
  const t = translations[language];

  const [testTreeId, setTestTreeId] = useState<string>(trees[0]?.id || 'COC-024');
  const [testChannel, setTestChannel] = useState<'all' | 'sms' | 'email' | 'whatsapp'>('all');
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [dispatchFeedback, setDispatchFeedback] = useState<string | null>(null);
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  const handleDispatchTest = async () => {
    setIsDispatching(true);
    setDispatchFeedback(null);
    try {
      await api.dispatchTestAlert({
        treeId: testTreeId,
        channel: testChannel,
        customMessage: `Test early warning alert dispatched for coconut palm ${testTreeId} to registered mobile: ${farmer.phone}`
      });
      setDispatchFeedback(`Alert dispatched to ${testChannel.toUpperCase()} successfully.`);
      onAlertsUpdated();
    } catch (err: any) {
      setDispatchFeedback(`Error: ${err.message}`);
    } finally {
      setIsDispatching(false);
    }
  };

  const handleResolveAlert = async (id: string) => {
    try {
      await api.resolveAlert(id);
      onAlertsUpdated();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAlerts = alerts.filter((a) => {
    if (filterRisk === 'ALL') return true;
    if (filterRisk === 'UNRESOLVED') return !a.isResolved;
    return a.riskLevel === filterRisk;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-red-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-600/30 text-red-400 border border-red-500/40">
              <BellRing className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">{t.alertsCenter}</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            {t.alertHighRiskNotice}
          </p>
        </div>

        {/* Farmer Recipient Summary */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
          <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
            Verified Farmer Contacts:
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="w-3.5 h-3.5 text-slate-400" />
            <span>SMS/WhatsApp: {farmer.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate max-w-[200px]">{farmer.email}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Alert Dispatch Tester + Real Alert Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Dispatch Test Alert & Delivery Channels (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Simulate Carrier Dispatch</span>
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Verify that early disease alarms trigger the carrier API pipelines. In accordance with system constraints,
              delivery status is verified in real-time.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Target Tree ID:</label>
                <select
                  value={testTreeId}
                  onChange={(e) => setTestTreeId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-emerald-300 font-mono font-bold outline-none"
                >
                  {trees.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.id} - {t.latestCondition.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Notification Channel:</label>
                <div className="grid grid-cols-2 gap-2 font-mono">
                  {(['all', 'sms', 'whatsapp', 'email'] as const).map((channel) => (
                    <button
                      key={channel}
                      type="button"
                      onClick={() => setTestChannel(channel)}
                      className={`p-2 rounded-lg border text-center uppercase text-xs transition-colors cursor-pointer ${
                        testChannel === channel
                          ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {channel}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleDispatchTest}
                disabled={isDispatching}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-950"
              >
                {isDispatching ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Transmitting to Carrier...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.sendTestAlert}</span>
                  </>
                )}
              </button>

              {dispatchFeedback && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-[11px] text-emerald-300">
                  {dispatchFeedback}
                </div>
              )}
            </div>
          </div>

          {/* Delivery Channels Status Legend */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Carrier Gateway Handshake
            </h4>
            <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
              <div className="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SMS Gateway</span>
                </span>
                <span className="text-emerald-400">ACTIVE (Fast2SMS / Twilio)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-800">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Business API</span>
                </span>
                <span className="text-emerald-400">AUTHORIZED (Meta Cloud)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SMTP Digest</span>
                </span>
                <span className="text-emerald-400">CONNECTED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Notifications Feed & Status Tracking (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Filter Bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="font-bold text-white uppercase tracking-wider">
              Recorded Disease Alerts ({alerts.length})
            </span>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="bg-slate-950 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-lg text-xs outline-none"
              >
                <option value="ALL">All Alerts</option>
                <option value="UNRESOLVED">Unresolved Only</option>
                <option value="HIGH">High Risk (Urgent)</option>
                <option value="MEDIUM">Medium Risk</option>
              </select>
            </div>
          </div>

          {/* Alerts Feed */}
          <div className="space-y-3">
            {filteredAlerts.map((alert) => {
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-2xl border transition-all space-y-3 ${
                    alert.riskLevel === 'HIGH'
                      ? 'bg-red-950/20 border-red-900/60'
                      : alert.riskLevel === 'MEDIUM'
                      ? 'bg-amber-950/20 border-amber-900/50'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  {/* Alert Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-sm text-white px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {alert.treeId}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {language === 'ta' ? alert.conditionNameTa : alert.conditionNameEn}
                      </h4>
                      <span
                        className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                          alert.riskLevel === 'HIGH'
                            ? 'bg-red-950 text-red-300 border border-red-700'
                            : 'bg-amber-950 text-amber-300 border border-amber-700'
                        }`}
                      >
                        {alert.riskLevel} Risk
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Body with Image & Details */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 text-xs">
                    {alert.imageUrl && (
                      <img
                        src={alert.imageUrl}
                        alt={alert.treeId}
                        className="w-24 h-24 rounded-xl object-cover border border-slate-800 shrink-0"
                      />
                    )}

                    <div className="flex-1 space-y-2">
                      <p className="text-slate-300 leading-relaxed font-sans">
                        {alert.recommendedAction}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px] text-slate-400">
                        <div className="p-1.5 rounded bg-slate-950/60 border border-slate-800">
                          AI Confidence: <strong className="text-emerald-400">{alert.modelConfidence}%</strong>
                        </div>
                        <div className="p-1.5 rounded bg-slate-950/60 border border-slate-800">
                          Visual Severity: <strong className="text-amber-400">{alert.visualSeverity}%</strong>
                        </div>
                        <div className="p-1.5 rounded bg-slate-950/60 border border-slate-800 col-span-2 sm:col-span-1">
                          GPS: {alert.latitude.toFixed(4)}, {alert.longitude.toFixed(4)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Carrier Delivery Status Pipeline & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-slate-800/80 text-[11px]">
                    {/* Channel delivery statuses */}
                    <div className="flex flex-wrap items-center gap-3 font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Smartphone className="w-3 h-3 text-slate-500" />
                        SMS: <span className="text-emerald-400 font-bold uppercase">{alert.deliveryStatus.sms}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-slate-500" />
                        WhatsApp: <span className="text-emerald-400 font-bold uppercase">{alert.deliveryStatus.whatsapp}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-500" />
                        Email: <span className="text-emerald-400 font-bold uppercase">{alert.deliveryStatus.email}</span>
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigateToMap(alert.treeId)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold border border-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{t.viewOnMap}</span>
                      </button>

                      {!alert.isResolved ? (
                        <button
                          onClick={() => handleResolveAlert(alert.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3 h-3" />
                          <span>{t.markResolved}</span>
                        </button>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{t.resolved}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
