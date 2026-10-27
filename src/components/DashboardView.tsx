import React from 'react';
import { Tree, CameraDevice, Alert, FarmerProfile } from '../types';
import { translations } from '../translations';
import { COCONUT_DISEASES } from '../services/diseaseDatabase';
import {
  Trees,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Clock,
  Compass,
  Radio,
  Percent,
  ScanEye,
  MapPin,
  ArrowRight,
  ShieldAlert,
  BatteryCharging,
  Sun,
  Flame
} from 'lucide-react';
import { TabId } from './Navigation';

interface DashboardViewProps {
  trees: Tree[];
  camera: CameraDevice;
  alerts: Alert[];
  farmer: FarmerProfile;
  language: 'en' | 'ta';
  onNavigate: (tab: TabId) => void;
  onSelectTree: (treeId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  trees,
  camera,
  alerts,
  farmer,
  language,
  onNavigate,
  onSelectTree,
}) => {
  const t = translations[language];

  const total = trees.length;
  const healthyCount = trees.filter((tree) => tree.currentRisk === 'NONE' || tree.healthStatus === 'healthy').length;
  const highRiskCount = trees.filter((tree) => tree.currentRisk === 'HIGH').length;
  const mediumRiskCount = trees.filter((tree) => tree.currentRisk === 'MEDIUM').length;
  const lowRiskCount = trees.filter((tree) => tree.currentRisk === 'LOW').length;
  const suspectedCount = highRiskCount + mediumRiskCount + lowRiskCount;
  const awaitingCount = trees.filter((tree) => tree.healthStatus === 'awaiting_inspection').length;

  const healthScore = total > 0 ? Math.round((healthyCount / total) * 100) : 100;

  // Active high risk alerts
  const urgentAlerts = alerts.filter((a) => a.riskLevel === 'HIGH' && !a.isResolved);

  return (
    <div className="space-y-6">
      {/* Top Banner Notice for Mode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900 border border-emerald-900/40 text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>
            <strong className="text-emerald-400 font-semibold">{farmer.farmName}</strong> • {farmer.location}
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
          <span>{camera.mode === 'DEMO' ? '⚠️ DEMO MODE ACTIVE' : '🟢 LIVE HARDWARE ONLINE'}</span>
          <span>•</span>
          <span>GPS: 10.6582° N, 76.9954° E</span>
        </div>
      </div>

      {/* Main KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {/* Monitored Trees */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-800/60 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t.totalMonitored}</span>
            <Trees className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{total}</div>
          <div className="text-[11px] text-emerald-400/80 mt-1">4 Plantation Blocks</div>
        </div>

        {/* Healthy Trees */}
        <div className="p-4 rounded-xl bg-slate-900 border border-emerald-900/30 hover:border-emerald-700/60 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t.healthyTrees}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            {healthyCount}
            <span className="text-xs font-normal text-slate-400 ml-1.5">({healthScore}%)</span>
          </div>
          <div className="text-[11px] text-emerald-500/80 mt-1">Green Zone Normal</div>
        </div>

        {/* Suspected Conditions */}
        <div className="p-4 rounded-xl bg-slate-900 border border-amber-900/30 hover:border-amber-700/60 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t.suspectedDisease}</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 font-mono">{suspectedCount}</div>
          <div className="text-[11px] text-amber-500/80 mt-1">
            {mediumRiskCount} Med • {lowRiskCount} Low
          </div>
        </div>

        {/* High Risk Trees */}
        <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/50 hover:border-red-600/70 transition-colors relative overflow-hidden">
          <div className="flex items-center justify-between text-red-300 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.highRiskTrees}</span>
            <AlertOctagon className="w-4 h-4 text-red-400 animate-pulse" />
          </div>
          <div className="text-2xl font-bold text-red-400 font-mono">{highRiskCount}</div>
          <div className="text-[11px] text-red-300/80 mt-1 font-medium">Urgent Field Check Required</div>
        </div>

        {/* Awaiting Inspection */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{t.awaitingInspection}</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-sky-400 font-mono">{awaitingCount}</div>
          <div className="text-[11px] text-sky-400/80 mt-1">Scheduled Today</div>
        </div>
      </div>

      {/* Middle Section: 360° Live Scanner Snapshot + Urgent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 360 Camera Status Widget */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-900/40 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass className={`w-5 h-5 text-emerald-400 ${camera.status === 'scanning' ? 'animate-spin' : ''}`} />
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t.cameraStatus}</h3>
                <p className="text-[11px] text-slate-400 font-mono">{camera.hardwareModel}</p>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase font-mono ${
              camera.status === 'scanning' ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/50' : 'bg-slate-800 text-slate-300'
            }`}>
              {camera.status}
            </span>
          </div>

          {/* Compass / Angle dial representation */}
          <div className="relative flex flex-col items-center justify-center p-4 bg-slate-950/80 rounded-xl border border-slate-800/80">
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-emerald-800/70 flex items-center justify-center relative">
              {/* Dial tick marks */}
              <span className="absolute top-1 text-[9px] font-mono text-slate-500 font-bold">N 0°</span>
              <span className="absolute right-1 text-[9px] font-mono text-slate-500 font-bold">E 90°</span>
              <span className="absolute bottom-1 text-[9px] font-mono text-slate-500 font-bold">S 180°</span>
              <span className="absolute left-1 text-[9px] font-mono text-slate-500 font-bold">W 270°</span>

              {/* Needle pointing to currentPanAngle */}
              <div
                className="absolute w-1 h-14 bg-gradient-to-t from-transparent via-emerald-500 to-emerald-400 rounded origin-bottom transform transition-transform duration-300"
                style={{
                  bottom: '50%',
                  transform: `rotate(${camera.currentPanAngle}deg)`
                }}
              >
                <div className="w-2.5 h-2.5 bg-emerald-300 rounded-full -ml-[3px] -mt-1 shadow-sm shadow-emerald-400"></div>
              </div>
              <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-emerald-400 z-10"></div>
            </div>

            <div className="mt-3 text-center">
              <div className="text-lg font-bold text-white font-mono tracking-wider">
                {camera.currentPanAngle}° AZIMUTH
              </div>
              <div className="text-xs text-emerald-400 font-medium mt-0.5">
                Target Palm: <span className="font-mono font-bold text-white">{camera.currentTargetTreeId}</span>
              </div>
            </div>
          </div>

          {/* Hardware Telemetry strip */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono py-1">
            <div className="p-2 rounded bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block">Battery</span>
              <span className="font-bold text-amber-300 flex items-center justify-center gap-1 mt-0.5">
                <Sun className="w-3 h-3 text-amber-400" />
                {camera.batteryPercentage}%
              </span>
            </div>
            <div className="p-2 rounded bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block">Speed</span>
              <span className="font-bold text-emerald-300 mt-0.5 block">{camera.rotationSpeed}°/s</span>
            </div>
            <div className="p-2 rounded bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block">Wi-Fi RSSI</span>
              <span className="font-bold text-sky-300 mt-0.5 block">{camera.wifiRssi} dBm</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('camera')}
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-emerald-950"
          >
            <span>Open 360° Rotating Mast Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* High Risk Disease Alerts List */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Active High-Risk Warning Events ({urgentAlerts.length})
                </h3>
                <p className="text-[11px] text-slate-400">
                  {t.alertHighRiskNotice}
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('alerts')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{t.alertsCenter}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {urgentAlerts.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
              No unhandled high-risk disease events currently detected.
            </div>
          ) : (
            <div className="space-y-3">
              {urgentAlerts.slice(0, 3).map((alert) => {
                const diseaseDetail = COCONUT_DISEASES[alert.diseaseCategory];

                return (
                  <div
                    key={alert.id}
                    className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/60 hover:border-red-700/80 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      {alert.imageUrl ? (
                        <img
                          src={alert.imageUrl}
                          alt={alert.treeId}
                          className="w-14 h-14 rounded-lg object-cover border border-red-800/60 shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-red-900/30 border border-red-800/60 flex items-center justify-center text-xl shrink-0">
                          🌴
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                            {alert.treeId}
                          </span>
                          <span className="text-xs font-bold text-red-400">
                            {language === 'ta' ? alert.conditionNameTa : alert.conditionNameEn}
                          </span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-red-900/60 text-red-200 border border-red-700">
                            High Risk
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                          {alert.recommendedAction}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-mono">
                          <span>Confidence: {alert.modelConfidence}%</span>
                          <span>•</span>
                          <span>Severity: {alert.visualSeverity}%</span>
                          <span>•</span>
                          <span>{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => {
                          onSelectTree(alert.treeId);
                          onNavigate('map');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-emerald-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Map</span>
                      </button>
                      <button
                        onClick={() => {
                          onSelectTree(alert.treeId);
                          onNavigate('ai-detect');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800/80 text-xs font-semibold text-white border border-red-700/60 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ScanEye className="w-3.5 h-3.5" />
                        <span>Analyze</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Action Bar */}
          <div className="pt-2 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => onNavigate('ai-detect')}
              className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <ScanEye className="w-4 h-4 text-emerald-400" />
              <span>AI Diagnosis</span>
            </button>
            <button
              onClick={() => onNavigate('map')}
              className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>GPS Farm Map</span>
            </button>
            <button
              onClick={() => onNavigate('trees')}
              className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <Trees className="w-4 h-4 text-emerald-400" />
              <span>Tree Registry</span>
            </button>
            <button
              onClick={() => onNavigate('treatment')}
              className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <span className="text-emerald-400">📖</span>
              <span>Treatment Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Disease Distribution Preview Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white uppercase tracking-wider">
            Farm Health & Pathology Breakdown
          </span>
          <span className="text-emerald-400 font-mono font-bold">
            {healthyCount} of {total} Palms Healthy ({healthScore}%)
          </span>
        </div>

        {/* Multi-segment stacked bar */}
        <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${(healthyCount / total) * 100}%` }}
            className="bg-emerald-500 h-full transition-all"
            title={`Healthy: ${healthyCount}`}
          />
          <div
            style={{ width: `${(lowRiskCount / total) * 100}%` }}
            className="bg-yellow-400 h-full transition-all"
            title={`Low Risk: ${lowRiskCount}`}
          />
          <div
            style={{ width: `${(mediumRiskCount / total) * 100}%` }}
            className="bg-amber-500 h-full transition-all"
            title={`Medium Risk: ${mediumRiskCount}`}
          />
          <div
            style={{ width: `${(highRiskCount / total) * 100}%` }}
            className="bg-red-500 h-full transition-all"
            title={`High Risk: ${highRiskCount}`}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Healthy ({healthyCount})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> Low / Nutrient ({lowRiskCount})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Medium Risk ({mediumRiskCount})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> High Risk Urgent ({highRiskCount})
            </span>
          </div>
          <button
            onClick={() => onNavigate('analytics')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            View Full Analytics Report →
          </button>
        </div>
      </div>
    </div>
  );
};
