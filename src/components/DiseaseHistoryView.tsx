import React, { useState } from 'react';
import { DiseaseHistoryRecord, Tree } from '../types';
import { translations } from '../translations';
import { api } from '../services/api';
import {
  History,
  Search,
  Filter,
  Download,
  Plus,
  Clock,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Calendar,
  User,
  ArrowRight,
  ExternalLink,
  X
} from 'lucide-react';

interface DiseaseHistoryViewProps {
  history: DiseaseHistoryRecord[];
  trees: Tree[];
  language: 'en' | 'ta';
  onHistoryUpdated: () => void;
  onNavigateToMap: (treeId: string) => void;
  onNavigateToAi: (treeId: string) => void;
}

export const DiseaseHistoryView: React.FC<DiseaseHistoryViewProps> = ({
  history,
  trees,
  language,
  onHistoryUpdated,
  onNavigateToMap,
  onNavigateToAi,
}) => {
  const t = translations[language];

  const [search, setSearch] = useState<string>('');
  const [filterStage, setFilterStage] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // New Inspection Log Form
  const [treeId, setTreeId] = useState<string>(trees[0]?.id || 'COC-024');
  const [conditionEn, setConditionEn] = useState<string>('Bud Rot');
  const [conditionTa, setConditionTa] = useState<string>('மொட்டு அழுகல் நோய்');
  const [riskLevel, setRiskLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('HIGH');
  const [confidence, setConfidence] = useState<number>(90);
  const [severity, setSeverity] = useState<number>(35);
  const [stage, setStage] = useState<'early' | 'moderate' | 'advanced' | 'recovered'>('early');
  const [actionTaken, setActionTaken] = useState<string>('');
  const [actionTakenTa, setActionTakenTa] = useState<string>('');
  const [outcomeStatus, setOutcomeStatus] = useState<'under_observation' | 'treatment_applied' | 'cured' | 'palm_removed'>('treatment_applied');
  const [inspector, setInspector] = useState<string>('Dr. S. Ramanathan (TNAU Extension)');
  const [followUpDue, setFollowUpDue] = useState<string>('2026-11-05');

  const handleSaveEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.addHistoryEntry({
        treeId,
        diseaseCategory: 'bud_rot',
        conditionNameEn: conditionEn,
        conditionNameTa: conditionTa,
        riskLevel,
        confidenceScore: Number(confidence),
        visualSeverity: Number(severity),
        stage,
        actionTaken: actionTaken || 'Field verification completed.',
        actionTakenTa: actionTakenTa || 'கள ஆய்வு முடிக்கப்பட்டது.',
        treatmentDate: new Date().toISOString(),
        outcomeStatus,
        inspector,
        followUpDue,
      });

      setIsModalOpen(false);
      onHistoryUpdated();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredHistory = history.filter((h) => {
    const matchesSearch =
      h.treeId.toLowerCase().includes(search.toLowerCase()) ||
      h.conditionNameEn.toLowerCase().includes(search.toLowerCase()) ||
      h.conditionNameTa.toLowerCase().includes(search.toLowerCase()) ||
      h.inspector.toLowerCase().includes(search.toLowerCase());

    const matchesStage = filterStage === 'ALL' || h.stage === filterStage;
    const matchesStatus = filterStatus === 'ALL' || h.outcomeStatus === filterStatus;

    return matchesSearch && matchesStage && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-600/30 text-emerald-400 border border-emerald-500/40">
              <History className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {language === 'ta' ? 'நோய் வரலாறு & சிகிச்சை பதிவுகள்' : 'Disease History & Treatment Timeline'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Chronological audit of all detected infections, field verification visits, fungicide/bio-agent applications, and recovery progress.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/api/history/export/csv"
            download
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Timeline (CSV)</span>
          </a>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log Field Treatment</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Tree ID, condition, inspector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 outline-none font-mono"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 outline-none"
          >
            <option value="ALL">All Infection Stages</option>
            <option value="early">Early Stage</option>
            <option value="moderate">Moderate Stage</option>
            <option value="advanced">Advanced Stage</option>
            <option value="recovered">Recovered</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 outline-none"
          >
            <option value="ALL">All Outcome Statuses</option>
            <option value="treatment_applied">Treatment Applied</option>
            <option value="under_observation">Under Observation</option>
            <option value="cured">Cured / Healthy</option>
            <option value="palm_removed">Eradicated / Removed</option>
          </select>
        </div>
      </div>

      {/* Chronological Timeline Feed */}
      <div className="space-y-4">
        {filteredHistory.map((item, index) => {
          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3 shadow-lg"
            >
              {/* Timeline Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-sm text-white px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                    {item.treeId}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      {language === 'ta' ? item.conditionNameTa : item.conditionNameEn}
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                          item.stage === 'early'
                            ? 'bg-amber-950 text-amber-300 border border-amber-700'
                            : item.stage === 'moderate'
                            ? 'bg-orange-950 text-orange-300 border border-orange-700'
                            : item.stage === 'advanced'
                            ? 'bg-red-950 text-red-300 border border-red-700'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        }`}
                      >
                        {item.stage} Stage
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{new Date(item.detectedAt).toLocaleDateString()}</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.outcomeStatus === 'cured'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                        : item.outcomeStatus === 'treatment_applied'
                        ? 'bg-sky-950 text-sky-400 border border-sky-700'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.outcomeStatus.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col sm:flex-row items-start gap-4 text-xs">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.treeId}
                    className="w-24 h-24 rounded-xl object-cover border border-slate-800 shrink-0"
                  />
                )}

                <div className="flex-1 space-y-2">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Agronomic Action & Clinical Intervention:
                    </span>
                    <p className="text-slate-200 leading-relaxed">
                      {language === 'ta' ? item.actionTakenTa : item.actionTaken}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] text-slate-400">
                    <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                      Match: <strong className="text-emerald-400">{item.confidenceScore}%</strong>
                    </div>
                    <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                      Severity: <strong className="text-amber-400">{item.visualSeverity}%</strong>
                    </div>
                    <div className="p-1.5 rounded bg-slate-950 border border-slate-800 col-span-2">
                      Inspector: <strong className="text-slate-200">{item.inspector}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <span className="font-mono">
                  Follow-up Audit Scheduled: <strong className="text-slate-200">{item.followUpDue || 'N/A'}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigateToMap(item.treeId)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Locate on Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Log Treatment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Log Clinical Field Treatment</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEntry} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tree ID *</label>
                  <select
                    value={treeId}
                    onChange={(e) => setTreeId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono outline-none"
                  >
                    {trees.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.id} - {t.variety}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Infection Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  >
                    <option value="early">Early Stage</option>
                    <option value="moderate">Moderate Stage</option>
                    <option value="advanced">Advanced Stage</option>
                    <option value="recovered">Recovered</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Action & Treatment Administered (English)</label>
                <textarea
                  rows={2}
                  required
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  placeholder="e.g. Cleaned bud rot lesion, applied 10% Bordeaux paste and scheduled Trichoderma drench."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Action & Treatment (Tamil / தமிழ்)</label>
                <textarea
                  rows={2}
                  value={actionTakenTa}
                  onChange={(e) => setActionTakenTa(e.target.value)}
                  placeholder="உதா: போர்டோ பசை பூசப்பட்டு, வேர் மூலம் மருந்து செலுத்தப்பட்டது."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Outcome Status</label>
                  <select
                    value={outcomeStatus}
                    onChange={(e) => setOutcomeStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  >
                    <option value="treatment_applied">Treatment Applied</option>
                    <option value="under_observation">Under Observation</option>
                    <option value="cured">Cured / Healthy</option>
                    <option value="palm_removed">Palm Removed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Follow-up Due Date</label>
                  <input
                    type="date"
                    value={followUpDue}
                    onChange={(e) => setFollowUpDue(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Inspector / Agronomist Name</label>
                <input
                  type="text"
                  required
                  value={inspector}
                  onChange={(e) => setInspector(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-950"
                >
                  {isSubmitting ? 'Saving...' : 'Record In History Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
