import React, { useState, useRef } from 'react';
import { Tree, DiseasePrediction, DiseaseCategory, RiskLevel } from '../types';
import { translations } from '../translations';
import { BENCHMARK_CASES, BenchmarkCase } from '../services/sampleData';
import { COCONUT_DISEASES } from '../services/diseaseDatabase';
import { api } from '../services/api';
import {
  ScanEye,
  Upload,
  Camera,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  ShieldCheck,
  FileQuestion,
  Info,
  Clock,
  MapPin,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Send,
  Eye
} from 'lucide-react';

interface AiDetectionViewProps {
  trees: Tree[];
  language: 'en' | 'ta';
  initialImage?: string;
  initialTreeId?: string;
  onPredictionComplete: (prediction: DiseasePrediction) => void;
  onNavigateToMap: (treeId: string) => void;
}

export const AiDetectionView: React.FC<AiDetectionViewProps> = ({
  trees,
  language,
  initialImage,
  initialTreeId,
  onPredictionComplete,
  onNavigateToMap,
}) => {
  const t = translations[language];

  const [selectedImage, setSelectedImage] = useState<string>(
    initialImage || BENCHMARK_CASES[0].imageUrl
  );
  const [selectedTreeId, setSelectedTreeId] = useState<string>(initialTreeId || 'COC-024');
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string>('bench-budrot');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<DiseasePrediction | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [notificationSent, setNotificationSent] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result);
          setSelectedBenchmarkId('');
          setPrediction(null);
          setAnalysisError(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectBenchmark = (bench: BenchmarkCase) => {
    setSelectedBenchmarkId(bench.id);
    setSelectedImage(bench.imageUrl);
    setSelectedTreeId(bench.treeId);
    setPrediction(null);
    setAnalysisError(null);
    setNotificationSent(false);
  };

  const runAiAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setNotificationSent(false);

    try {
      const result = await api.analyzeImage({
        imageBase64: selectedImage.startsWith('data:') ? selectedImage : undefined,
        imageUrl: !selectedImage.startsWith('data:') ? selectedImage : undefined,
        treeId: selectedTreeId,
        benchmarkId: selectedBenchmarkId || undefined,
      });

      setPrediction(result);
      onPredictionComplete(result);
    } catch (err: any) {
      console.error(err);
      setAnalysisError(err.message || 'Image inference failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTriggerFieldAlert = async () => {
    if (!prediction) return;
    try {
      await api.dispatchTestAlert({
        treeId: prediction.treeId,
        channel: 'all',
        customMessage: `AI Detected ${prediction.conditionNameEn} with ${prediction.modelConfidence}% confidence. Immediate field verification needed.`
      });
      setNotificationSent(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Scientific Methodology Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-600/30 text-emerald-400 border border-emerald-500/40">
              <ScanEye className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">{t.aiTitle}</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">{t.aiSubtitle}</p>
        </div>

        {/* Methodology Notice */}
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 max-w-md font-sans">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
            <Info className="w-3.5 h-3.5" />
            <span>ICAR-CPCRI & TNAU Diagnostic Framework</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Visual symptoms are classified by confidence match and estimated tissue damage severity.
            Inconclusive or low-confidence results are flagged for direct field inspection.
          </p>
        </div>
      </div>

      {/* Main Analysis Workbench (Grid: 5 cols input, 7 cols output) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Selection & Verified Benchmarks (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Image Card & Tree Selector */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Select Tree To Diagnose:
              </label>
              <select
                value={selectedTreeId}
                onChange={(e) => setSelectedTreeId(e.target.value)}
                className="bg-slate-800 text-xs text-emerald-300 font-mono font-bold px-2.5 py-1 rounded-lg border border-slate-700 outline-none"
              >
                {trees.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.id} - {t.variety} ({t.block})
                  </option>
                ))}
              </select>
            </div>

            {/* Image Preview Box */}
            <div className="relative aspect-video rounded-xl bg-black border border-slate-800 overflow-hidden group">
              <img
                src={selectedImage}
                alt="Selected coconut part"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload New</span>
                </button>
              </div>

              <span className="absolute bottom-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-emerald-300 border border-slate-700">
                Target: {selectedTreeId}
              </span>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            {/* Run Analysis CTA */}
            <button
              onClick={runAiAnalysis}
              disabled={isAnalyzing}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-950"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t.analyzingImage}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>{t.analyzeImageButton}</span>
                </>
              )}
            </button>
          </div>

          {/* Verified Real-World Benchmark Case Selector */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t.selectSampleImage}
              </span>
              <span className="text-[10px] font-mono text-emerald-400">8 Curated Cases</span>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-1">
              {BENCHMARK_CASES.map((bench) => {
                const isSelected = selectedBenchmarkId === bench.id;

                return (
                  <div
                    key={bench.id}
                    onClick={() => handleSelectBenchmark(bench)}
                    className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-sm shadow-emerald-950'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-1.5 border border-slate-800">
                      <img
                        src={bench.imageUrl}
                        alt={bench.titleEn}
                        className="w-full h-full object-cover"
                      />
                      <span
                        className={`absolute top-1 right-1 text-[9px] font-bold font-mono px-1 rounded ${
                          bench.expectedRisk === 'HIGH'
                            ? 'bg-red-600 text-white'
                            : bench.expectedRisk === 'MEDIUM'
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {bench.expectedRisk}
                      </span>
                    </div>

                    <p className="text-[11px] font-bold truncate leading-tight">
                      {language === 'ta' ? bench.titleTa : bench.titleEn}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      Target: {bench.treeId}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: AI Inference Diagnosis Result Card (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {analysisError && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <div>
                <p className="font-bold">Computer Vision Inference Error</p>
                <p className="mt-0.5 text-slate-300">{analysisError}</p>
              </div>
            </div>
          )}

          {!prediction && !isAnalyzing && (
            <div className="p-10 rounded-2xl bg-slate-900 border border-dashed border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center text-3xl">
                🌴
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Diagnostic Inference Engine Ready</h3>
                <p className="text-xs text-slate-400 max-w-md mt-1">
                  Click <strong className="text-emerald-400 font-semibold">{t.analyzeImageButton}</strong> or select a benchmark case above to run real computer vision analysis.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 font-mono max-w-sm text-left space-y-1">
                <div>• Evaluates Bud Rot, Stem Bleeding, Basal Rot, Weevil, Beetle & Deficiencies</div>
                <div>• Distinguishes Model Confidence from Visual Severity</div>
                <div>• Translates symptoms and advisory into Tamil and English</div>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="p-10 rounded-2xl bg-slate-900 border border-emerald-900/40 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30"></span>
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Extracting Foliar & Trunk Feature Maps</h3>
                <p className="text-xs text-slate-400 max-w-md mt-1">
                  Comparing optical texture against ICAR-CPCRI coconut pathology benchmarks using Gemini 3.8 Flash...
                </p>
              </div>
            </div>
          )}

          {prediction && !isAnalyzing && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-900/50 space-y-5 shadow-xl">
              {/* Header Badge & Tree ID */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-base text-white px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
                    {prediction.treeId}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {language === 'ta' ? prediction.conditionNameTa : prediction.conditionNameEn}
                      <span className="text-xs text-slate-400 font-normal italic">
                        ({COCONUT_DISEASES[prediction.category]?.scientificName || 'Cocos nucifera'})
                      </span>
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 capitalize">
                      <span>Type: <strong className="text-slate-200">{prediction.conditionType.replace('_', ' ')}</strong></span>
                      <span>•</span>
                      <span>{new Date(prediction.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Risk Level Badge */}
                <div
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 border ${
                    prediction.riskLevel === 'HIGH'
                      ? 'bg-red-950 text-red-300 border-red-700 animate-pulse'
                      : prediction.riskLevel === 'MEDIUM'
                      ? 'bg-amber-950 text-amber-300 border-amber-700'
                      : prediction.riskLevel === 'LOW'
                      ? 'bg-yellow-950 text-yellow-300 border-yellow-700'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  }`}
                >
                  {prediction.riskLevel === 'HIGH' && <AlertOctagon className="w-4 h-4 text-red-400" />}
                  {prediction.riskLevel === 'MEDIUM' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                  {prediction.riskLevel === 'LOW' && <Info className="w-4 h-4 text-yellow-400" />}
                  {prediction.riskLevel === 'NONE' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  <span>{prediction.riskLevel} Risk</span>
                </div>
              </div>

              {/* Crucial Scientific Distinction: Confidence vs Severity */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {/* Model Confidence */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">{t.confidence}</span>
                      <span className="font-mono font-bold text-emerald-400">{prediction.modelConfidence}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${prediction.modelConfidence}%` }}
                        className="h-full bg-emerald-500 rounded-full transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Probability of feature pattern match
                    </span>
                  </div>

                  {/* Visual Severity */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">{t.severity}</span>
                      <span className={`font-mono font-bold ${prediction.visualSeverity > 35 ? 'text-red-400' : 'text-amber-400'}`}>
                        {prediction.visualSeverity}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${prediction.visualSeverity}%` }}
                        className={`h-full rounded-full transition-all ${
                          prediction.visualSeverity > 35 ? 'bg-red-500' : 'bg-amber-500'
                        }`}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Estimated tissue damage area
                    </span>
                  </div>
                </div>

                {/* Explanation text */}
                <p className="text-[11px] text-slate-400 border-t border-slate-900 pt-2 leading-relaxed">
                  {t.modelConfidenceDisclaimer}
                </p>
              </div>

              {/* Detected Symptoms Tags */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  {t.symptoms} Detected:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(language === 'ta' ? prediction.symptomsDetectedTa : prediction.symptomsDetected).map((sym, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200"
                    >
                      • {sym}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Action / Advisory */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/50 space-y-2">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{t.recommendedAction}:</span>
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {language === 'ta' ? prediction.recommendedActionTa : prediction.recommendedActionEn}
                </p>
              </div>

              {/* Expert Inspection Callout */}
              {prediction.requiresExpertInspection && (
                <div className="p-3 rounded-xl bg-red-950/30 border border-red-800/60 text-xs text-red-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="font-semibold">{t.expertInspectionRequired}</span>
                  </div>
                  <button
                    onClick={handleTriggerFieldAlert}
                    disabled={notificationSent}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 disabled:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    <span>{notificationSent ? 'Dispatched' : 'Alert Field Officer'}</span>
                  </button>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-[11px] font-mono text-slate-500">
                  Engine: {prediction.modelVersion}
                </span>

                <button
                  onClick={() => onNavigateToMap(prediction.treeId)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{t.viewOnMap}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
