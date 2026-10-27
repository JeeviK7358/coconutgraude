import React, { useState } from 'react';
import { Tree, InspectionStatus, RiskLevel, DiseaseCategory } from '../types';
import { translations } from '../translations';
import { api } from '../services/api';
import {
  Trees,
  Plus,
  Search,
  Download,
  Edit2,
  Trash2,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Clock,
  X,
  ExternalLink,
  Filter
} from 'lucide-react';

interface TreeManagementViewProps {
  trees: Tree[];
  language: 'en' | 'ta';
  onTreesUpdated: () => void;
  onNavigateToMap: (treeId: string) => void;
  onNavigateToAi: (treeId: string) => void;
}

export const TreeManagementView: React.FC<TreeManagementViewProps> = ({
  trees,
  language,
  onTreesUpdated,
  onNavigateToMap,
  onNavigateToAi,
}) => {
  const t = translations[language];

  const [search, setSearch] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTree, setEditingTree] = useState<Tree | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form State
  const [formId, setFormId] = useState<string>('');
  const [formBlock, setFormBlock] = useState<string>('Block A (North Grove)');
  const [formVariety, setFormVariety] = useState<string>('West Coast Tall (WCT)');
  const [formAge, setFormAge] = useState<number>(12);
  const [formLat, setFormLat] = useState<number>(10.6582);
  const [formLng, setFormLng] = useState<number>(76.9954);
  const [formStatus, setFormStatus] = useState<InspectionStatus>('healthy');
  const [formNotes, setFormNotes] = useState<string>('');

  const openAddModal = () => {
    setEditingTree(null);
    setFormId(`COC-${String(trees.length + 1).padStart(3, '0')}`);
    setFormBlock('Block A (North Grove)');
    setFormVariety('West Coast Tall (WCT)');
    setFormAge(12);
    setFormLat(10.6582 + (Math.random() - 0.5) * 0.001);
    setFormLng(76.9954 + (Math.random() - 0.5) * 0.001);
    setFormStatus('healthy');
    setFormNotes('');
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (tree: Tree) => {
    setEditingTree(tree);
    setFormId(tree.id);
    setFormBlock(tree.block);
    setFormVariety(tree.variety);
    setFormAge(tree.ageYears);
    setFormLat(tree.latitude);
    setFormLng(tree.longitude);
    setFormStatus(tree.healthStatus);
    setFormNotes(tree.notes || '');
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleSaveTree = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      if (editingTree) {
        await api.updateTree(editingTree.id, {
          block: formBlock,
          variety: formVariety,
          ageYears: Number(formAge),
          latitude: Number(formLat),
          longitude: Number(formLng),
          healthStatus: formStatus,
          notes: formNotes,
        });
      } else {
        await api.addTree({
          id: formId.trim().toUpperCase(),
          farmId: 'FARM-POL-01',
          farmName: 'Anamalai Green Palms',
          block: formBlock,
          variety: formVariety,
          ageYears: Number(formAge),
          latitude: Number(formLat),
          longitude: Number(formLng),
          healthStatus: formStatus,
          currentRisk: formStatus === 'healthy' ? 'NONE' : 'MEDIUM',
          latestCondition: formStatus === 'healthy' ? 'healthy' : 'unknown_or_inconclusive',
          latestConfidence: 90,
          latestSeverity: 0,
          lastInspectedAt: new Date().toISOString(),
          notes: formNotes,
        });
      }

      setIsModalOpen(false);
      onTreesUpdated();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error saving tree record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(`Are you sure you want to remove ${id} from registry?`)) {
      try {
        await api.deleteTree(id);
        onTreesUpdated();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const filteredTrees = trees.filter((tree) => {
    const matchesSearch =
      tree.id.toLowerCase().includes(search.toLowerCase()) ||
      tree.variety.toLowerCase().includes(search.toLowerCase()) ||
      tree.block.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || tree.healthStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-600/30 text-emerald-400 border border-emerald-500/40">
              <Trees className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">{t.navTreeManagement}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Registered palms with individual GPS coordinates, health classification, variety, and age records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/api/trees/export/csv"
            download
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>{t.exportCsv}</span>
          </a>

          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addTree}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.searchTreePlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 outline-none font-mono"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 outline-none"
          >
            <option value="ALL">All Health Statuses ({trees.length})</option>
            <option value="healthy">Healthy Only</option>
            <option value="suspected">Suspected Cases</option>
            <option value="under_treatment">Under Treatment</option>
            <option value="awaiting_inspection">Awaiting Inspection</option>
          </select>
        </div>
      </div>

      {/* Trees Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <th className="py-3 px-4">Tree ID</th>
                <th className="py-3 px-4">Variety & Block</th>
                <th className="py-3 px-4">Age</th>
                <th className="py-3 px-4">GPS Coordinates</th>
                <th className="py-3 px-4">Condition</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredTrees.map((tree) => {
                return (
                  <tr key={tree.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-white whitespace-nowrap">
                      {tree.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-200">{tree.variety}</div>
                      <div className="text-[11px] text-slate-400">{tree.block}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">
                      {tree.ageYears} {t.years}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {tree.latitude.toFixed(5)}, {tree.longitude.toFixed(5)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="capitalize font-medium text-slate-300">
                        {tree.latestCondition.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          tree.currentRisk === 'HIGH'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : tree.currentRisk === 'MEDIUM'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : tree.currentRisk === 'LOW'
                            ? 'bg-yellow-950 text-yellow-400 border border-yellow-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {tree.currentRisk}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-emerald-400">
                      {tree.latestConfidence}%
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onNavigateToMap(tree.id)}
                          title="View on Map"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-colors cursor-pointer"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openEditModal(tree)}
                          title="Edit"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(tree.id)}
                          title="Delete"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/60 text-slate-400 hover:text-red-300 border border-slate-700 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingTree ? `${t.editTree}: ${editingTree.id}` : t.addTree}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-200">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSaveTree} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tree ID *</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingTree}
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                    placeholder="e.g. COC-029"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Block / Grove *</label>
                  <input
                    type="text"
                    required
                    value={formBlock}
                    onChange={(e) => setFormBlock(e.target.value)}
                    placeholder="e.g. Block A"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Variety *</label>
                  <select
                    value={formVariety}
                    onChange={(e) => setFormVariety(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  >
                    <option value="West Coast Tall (WCT)">West Coast Tall (WCT)</option>
                    <option value="East Coast Tall (ECT)">East Coast Tall (ECT)</option>
                    <option value="Chowghat Orange Dwarf (COD)">Chowghat Orange Dwarf (COD)</option>
                    <option value="D x T Hybrid (Kera Sankara)">D x T Hybrid (Kera Sankara)</option>
                    <option value="Malayan Yellow Dwarf (MYD)">Malayan Yellow Dwarf (MYD)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Palm Age (Years)</label>
                  <input
                    type="number"
                    min="1"
                    max="80"
                    value={formAge}
                    onChange={(e) => setFormAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">GPS Latitude *</label>
                  <input
                    type="number"
                    step="0.000001"
                    required
                    value={formLat}
                    onChange={(e) => setFormLat(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">GPS Longitude *</label>
                  <input
                    type="number"
                    step="0.000001"
                    required
                    value={formLng}
                    onChange={(e) => setFormLng(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Health Status</label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as InspectionStatus)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                >
                  <option value="healthy">Healthy</option>
                  <option value="suspected">Suspected</option>
                  <option value="under_treatment">Under Treatment</option>
                  <option value="awaiting_inspection">Awaiting Inspection</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Agronomic Notes</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Crown healthy, high nut cluster count"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-950 transition-colors cursor-pointer"
                >
                  {isSubmitting ? 'Saving...' : 'Save Tree'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
