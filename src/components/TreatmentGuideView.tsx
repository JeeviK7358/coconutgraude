import React, { useState } from 'react';
import { translations } from '../translations';
import { COCONUT_DISEASES, DiseaseDetail } from '../services/diseaseDatabase';
import { DiseaseCategory } from '../types';
import {
  BookOpenCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Leaf,
  Bug,
  Search,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface TreatmentGuideViewProps {
  language: 'en' | 'ta';
}

export const TreatmentGuideView: React.FC<TreatmentGuideViewProps> = ({ language }) => {
  const t = translations[language];

  const diseaseList = Object.values(COCONUT_DISEASES);
  const [selectedCategory, setSelectedCategory] = useState<DiseaseCategory>('bud_rot');
  const [search, setSearch] = useState<string>('');

  const activeDisease: DiseaseDetail = COCONUT_DISEASES[selectedCategory] || diseaseList[0];

  const filteredDiseases = diseaseList.filter((d) => {
    const nameMatch =
      d.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      d.nameTa.toLowerCase().includes(search.toLowerCase()) ||
      d.scientificName.toLowerCase().includes(search.toLowerCase());
    return nameMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-600/30 text-emerald-400 border border-emerald-500/40">
              <BookOpenCheck className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">{t.navTreatmentGuide}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Certified ICAR-CPCRI & TNAU agronomic pathology compendium with preventive cultural controls,
            bio-agents, and chemical safety guidelines.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-400">
          Integrated Pest & Disease Management (IPDM)
        </div>
      </div>

      {/* Main 2-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Disease Navigation List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search diseases or pests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {filteredDiseases.map((d) => {
              const isSelected = selectedCategory === d.category;

              return (
                <div
                  key={d.category}
                  onClick={() => setSelectedCategory(d.category)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-emerald-950/80 border-emerald-600 text-white shadow-md shadow-emerald-950'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        d.defaultRisk === 'HIGH'
                          ? 'bg-red-500'
                          : d.defaultRisk === 'MEDIUM'
                          ? 'bg-amber-500'
                          : d.defaultRisk === 'LOW'
                          ? 'bg-yellow-400'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <div>
                      <h4 className="text-xs font-bold leading-tight">
                        {language === 'ta' ? d.nameTa : d.nameEn}
                      </h4>
                      <p className="text-[10px] text-slate-400 italic truncate max-w-[200px]">
                        {d.scientificName}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 text-slate-500 ${isSelected ? 'text-emerald-400' : ''}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Full Scientific Guide Card (8 cols) */}
        <div className="lg:col-span-8">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
            {/* Guide Header */}
            <div className="border-b border-slate-800 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-slate-800 font-bold">
                  {activeDisease.conditionType.toUpperCase()}
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    activeDisease.defaultRisk === 'HIGH'
                      ? 'bg-red-950 text-red-400 border border-red-700'
                      : activeDisease.defaultRisk === 'MEDIUM'
                      ? 'bg-amber-950 text-amber-400 border border-amber-700'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                  }`}
                >
                  {activeDisease.defaultRisk} Priority
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mt-2">
                {language === 'ta' ? activeDisease.nameTa : activeDisease.nameEn}
              </h3>
              <p className="text-xs text-emerald-400 font-mono italic mt-0.5">
                {activeDisease.scientificName}
              </p>
            </div>

            {/* Why Suspected */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Etiology & Suspected Factors:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'ta' ? activeDisease.whySuspectedTa : activeDisease.whySuspectedEn}
              </p>
            </div>

            {/* Observable Symptoms */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>Primary Symptoms Identified by Vision System:</span>
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(language === 'ta' ? activeDisease.symptomsTa : activeDisease.symptomsEn).map((sym, idx) => (
                  <li key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Field Inspection Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-4 h-4 text-sky-400" />
                <span>Next Field Verification Steps for Farmer:</span>
              </span>
              <ul className="space-y-1.5 text-xs">
                {(language === 'ta' ? activeDisease.inspectionChecklistTa : activeDisease.inspectionChecklistEn).map((step, idx) => (
                  <li key={idx} className="p-2.5 rounded-lg bg-sky-950/20 border border-sky-900/40 text-slate-200 flex items-start gap-2">
                    <span className="font-mono font-bold text-sky-400">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preventive & Cultural Measures */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Cultural Sanitation & Preventative Measures:</span>
              </span>
              <ul className="space-y-1.5 text-xs">
                {(language === 'ta' ? activeDisease.preventiveMeasuresTa : activeDisease.preventiveMeasuresEn).map((measure, idx) => (
                  <li key={idx} className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-slate-200 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{measure}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Biological Control (Trichoderma, Pheromones, Pseudomonas) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Bug className="w-4 h-4 text-amber-400" />
                <span>Biological Control & Natural Bio-agents:</span>
              </span>
              <ul className="space-y-1.5 text-xs">
                {(language === 'ta' ? activeDisease.bioControlTa : activeDisease.bioControlEn).map((bio, idx) => (
                  <li key={idx} className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/40 text-slate-200 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✦</span>
                    <span>{bio}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chemical Advisory Caution Box */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/60 space-y-2">
              <span className="text-xs font-bold text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>Chemical Advisory & Agronomic Caution:</span>
              </span>
              <p className="text-xs text-red-100/90 leading-relaxed font-sans">
                {language === 'ta' ? activeDisease.chemicalAdvisoryTa : activeDisease.chemicalAdvisoryEn}
              </p>
            </div>

            {/* Scientific Citation Footer */}
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{t.scientificReference}:</span>
              <span className="font-mono text-emerald-400 text-right">{activeDisease.icarcpcriRef}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
