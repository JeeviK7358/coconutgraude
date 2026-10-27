import React from 'react';
import { Tree, Alert } from '../types';
import { translations } from '../translations';
import { COCONUT_DISEASES } from '../services/diseaseDatabase';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Download,
  Calendar,
  Activity,
  FileText
} from 'lucide-react';

interface AnalyticsViewProps {
  trees: Tree[];
  alerts: Alert[];
  language: 'en' | 'ta';
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  trees,
  alerts,
  language,
}) => {
  const t = translations[language];

  const total = trees.length;
  const healthyCount = trees.filter((tree) => tree.currentRisk === 'NONE' || tree.healthStatus === 'healthy').length;
  const highRiskCount = trees.filter((tree) => tree.currentRisk === 'HIGH').length;
  const mediumRiskCount = trees.filter((tree) => tree.currentRisk === 'MEDIUM').length;
  const lowRiskCount = trees.filter((tree) => tree.currentRisk === 'LOW').length;
  const affectedCount = highRiskCount + mediumRiskCount + lowRiskCount;

  const farmHealthIndex = total > 0 ? Math.round((healthyCount / total) * 100) : 100;

  // Disease category breakdown
  const diseaseCounts: Record<string, number> = {};
  trees.forEach((tree) => {
    if (tree.latestCondition && tree.latestCondition !== 'healthy') {
      diseaseCounts[tree.latestCondition] = (diseaseCounts[tree.latestCondition] || 0) + 1;
    }
  });

  const diseaseEntries = Object.entries(diseaseCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-600/30 text-emerald-400 border border-emerald-500/40">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">{t.navAnalytics}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Pathological epidemiology, risk trends, and calculated orchard health metrics.
          </p>
        </div>

        <a
          href="/api/trees/export/csv"
          download
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-950 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Epidemiological Audit (CSV)</span>
        </a>
      </div>

      {/* Top 3 High Level KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Farm Health Index */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-900/40 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">{t.farmHealthIndex}</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-emerald-400 font-mono">{farmHealthIndex}%</span>
            <span className="text-xs text-slate-400">Healthy Canopy Ratio</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${farmHealthIndex}%` }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Calculated from {healthyCount} healthy palms out of {total} registered units in Anamalai Grove.
          </p>
        </div>

        {/* Pathological Threat Index */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-red-900/40 space-y-3">
          <div className="flex items-center justify-between text-red-300">
            <span className="text-xs font-bold uppercase tracking-wider">High Risk Critical Mass</span>
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-red-400 font-mono">{highRiskCount}</span>
            <span className="text-xs text-slate-400">Palms Critical ({Math.round((highRiskCount / total) * 100)}%)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${(highRiskCount / total) * 100}%` }}
              className="h-full bg-red-500 rounded-full"
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Bud rot and Basal stem rot clusters demanding immediate chemical/cultural isolation.
          </p>
        </div>

        {/* Medium & Early Stage Vulnerability */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-amber-900/40 space-y-3">
          <div className="flex items-center justify-between text-amber-300">
            <span className="text-xs font-bold uppercase tracking-wider">Early Warning Incubation</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-amber-400 font-mono">
              {mediumRiskCount + lowRiskCount}
            </span>
            <span className="text-xs text-slate-400">Palms under surveillance</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${((mediumRiskCount + lowRiskCount) / total) * 100}%` }}
              className="h-full bg-amber-500 rounded-full"
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Early Stem Bleeding, Rhinoceros Beetle V-cuts, and Potassium deficiencies.
          </p>
        </div>
      </div>

      {/* Disease Distribution Breakdown Table and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disease Incidence Distribution */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-400" />
              <span>Suspected Condition Breakdown</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">{affectedCount} Affected Palms</span>
          </div>

          <div className="space-y-3">
            {diseaseEntries.map(([category, count]) => {
              const detail = COCONUT_DISEASES[category as keyof typeof COCONUT_DISEASES];
              const pct = Math.round((count / total) * 100);

              return (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-200">
                      {language === 'ta' && detail ? detail.nameTa : detail?.nameEn || category}
                    </span>
                    <span className="font-mono text-slate-400">
                      {count} palms ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${pct * 3}%` }}
                      className={`h-full rounded-full ${
                        detail?.defaultRisk === 'HIGH'
                          ? 'bg-red-500'
                          : detail?.defaultRisk === 'MEDIUM'
                          ? 'bg-amber-500'
                          : 'bg-yellow-400'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Variety Health Resistance Comparison */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Variety Resistance Profile</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400">Pollachi Belt</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-white">West Coast Tall (WCT)</span>
                <span className="text-emerald-400">82% Healthy Baseline</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Standard commercial palm with high tolerance to water stress, moderate susceptibility to Rhinoceros Beetle.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-white">East Coast Tall (ECT)</span>
                <span className="text-emerald-400">76% Healthy Baseline</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Thick trunk with heavy copra yield, susceptible to Basal Stem Rot in sandy soils.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-white">Chowghat Orange Dwarf (COD)</span>
                <span className="text-amber-400">65% Healthy Baseline</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Early bearing tender nut variety, more prone to crown humidity and Bud Rot fungus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
