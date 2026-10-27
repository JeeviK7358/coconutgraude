import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Tree, RiskLevel, DiseaseCategory } from '../types';
import { translations } from '../translations';
import { COCONUT_DISEASES } from '../services/diseaseDatabase';
import {
  MapPin,
  Search,
  Filter,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Compass,
  ScanEye,
  ExternalLink,
  X,
  Layers,
  ZoomIn
} from 'lucide-react';

interface MapViewProps {
  trees: Tree[];
  language: 'en' | 'ta';
  selectedTreeId?: string;
  onSelectTree: (treeId: string) => void;
  onNavigateToAi: (treeId: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  trees,
  language,
  selectedTreeId,
  onSelectTree,
  onNavigateToAi,
}) => {
  const t = translations[language];

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('ALL');
  const [selectedDiseaseFilter, setSelectedDiseaseFilter] = useState<string>('ALL');
  const [activeTree, setActiveTree] = useState<Tree | null>(
    trees.find((t) => t.id === selectedTreeId) || trees[0] || null
  );

  // Sync selectedTreeId prop
  useEffect(() => {
    if (selectedTreeId) {
      const match = trees.find((t) => t.id === selectedTreeId);
      if (match) setActiveTree(match);
    }
  }, [selectedTreeId, trees]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Pollachi Coconut Belt
    const map = L.map(mapContainerRef.current, {
      center: [10.6582, 76.9954],
      zoom: 18,
      zoomControl: true,
    });

    // Dark styled or OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; OpenStreetMap contributors | ICAR-CPCRI Smart Coconut Monitoring',
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when trees, filters, or search change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const layer = markersLayerRef.current;
    layer.clearLayers();

    const filtered = trees.filter((tree) => {
      const matchesSearch =
        tree.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tree.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tree.block.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRisk =
        selectedRiskFilter === 'ALL' || tree.currentRisk === selectedRiskFilter;

      const matchesDisease =
        selectedDiseaseFilter === 'ALL' || tree.latestCondition === selectedDiseaseFilter;

      return matchesSearch && matchesRisk && matchesDisease;
    });

    filtered.forEach((tree) => {
      // Determine marker color
      let markerColor = '#10b981'; // Green
      let pulseRing = false;

      if (tree.healthStatus === 'awaiting_inspection' && tree.latestConfidence < 50) {
        markerColor = '#64748b'; // Gray
      } else if (tree.currentRisk === 'HIGH') {
        markerColor = '#ef4444'; // Red
        pulseRing = true;
      } else if (tree.currentRisk === 'MEDIUM') {
        markerColor = '#f59e0b'; // Orange
      } else if (tree.currentRisk === 'LOW') {
        markerColor = '#eab308'; // Yellow
      }

      // Custom SVG Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-tree-pin',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group" style="width: 32px; height: 32px;">
            ${
              pulseRing
                ? `<span class="animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-75" style="background-color: ${markerColor};"></span>`
                : ''
            }
            <div class="relative flex items-center justify-center rounded-full border-2 border-white shadow-lg text-white font-bold"
                 style="background-color: ${markerColor}; width: 28px; height: 28px; font-size: 11px;">
              🌴
            </div>
            <div class="absolute -bottom-4 bg-slate-900/90 text-white font-mono text-[9px] px-1 rounded border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-30">
              ${tree.id}
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([tree.latitude, tree.longitude], { icon: customIcon });

      marker.on('click', () => {
        setActiveTree(tree);
        onSelectTree(tree.id);
      });

      layer.addLayer(marker);
    });
  }, [trees, searchQuery, selectedRiskFilter, selectedDiseaseFilter, onSelectTree]);

  // Center on activeTree when it changes
  useEffect(() => {
    if (activeTree && mapInstanceRef.current) {
      mapInstanceRef.current.setView([activeTree.latitude, activeTree.longitude], 19, {
        animate: true,
      });
    }
  }, [activeTree]);

  const handleZoomHighRisk = () => {
    const highRisk = trees.filter((t) => t.currentRisk === 'HIGH');
    if (highRisk.length > 0 && mapInstanceRef.current) {
      const bounds = L.latLngBounds(highRisk.map((t) => [t.latitude, t.longitude]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
      setActiveTree(highRisk[0]);
    }
  };

  const handleResetView = () => {
    if (trees.length > 0 && mapInstanceRef.current) {
      const bounds = L.latLngBounds(trees.map((t) => [t.latitude, t.longitude]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  const diseaseDetail = activeTree ? COCONUT_DISEASES[activeTree.latestCondition] : null;

  return (
    <div className="space-y-4">
      {/* Top Map Header & Filters Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.searchTreePlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 w-48 sm:w-60 focus:border-emerald-500 outline-none font-mono"
            />
          </div>

          {/* Risk Level Filter */}
          <select
            value={selectedRiskFilter}
            onChange={(e) => setSelectedRiskFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 outline-none"
          >
            <option value="ALL">{t.allRisks}</option>
            <option value="HIGH">High Risk (Red)</option>
            <option value="MEDIUM">Medium Risk (Orange)</option>
            <option value="LOW">Low Risk (Yellow)</option>
            <option value="NONE">Healthy Only (Green)</option>
          </select>

          {/* Disease Category Filter */}
          <select
            value={selectedDiseaseFilter}
            onChange={(e) => setSelectedDiseaseFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 outline-none max-w-[170px] truncate"
          >
            <option value="ALL">{t.allDiseases}</option>
            <option value="bud_rot">Bud Rot (Phytophthora)</option>
            <option value="basal_stem_rot">Basal Stem Rot / Thanjavur</option>
            <option value="stem_bleeding">Stem Bleeding</option>
            <option value="red_palm_weevil">Red Palm Weevil</option>
            <option value="rhinoceros_beetle">Rhinoceros Beetle</option>
            <option value="leaf_rot">Leaf Rot</option>
            <option value="nutrient_deficiency">Nutrient Deficiency</option>
            <option value="healthy">Healthy Palms</option>
          </select>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomHighRisk}
            className="px-3 py-1.5 rounded-lg bg-red-950/70 hover:bg-red-900 border border-red-700/60 text-xs font-semibold text-red-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>{t.zoomToHighRisk}</span>
          </button>
          <button
            onClick={handleResetView}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>{t.resetView}</span>
          </button>
        </div>
      </div>

      {/* Map Body & Slide-Over Detail Drawer */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-[620px] shadow-2xl flex">
        {/* Leaflet Container */}
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Map Legend Overlay */}
        <div className="absolute top-4 left-4 z-20 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-[11px] shadow-lg text-slate-300 space-y-1.5 font-sans">
          <div className="font-bold text-white text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.mapLegend}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white"></span>
            <span>Healthy / No Abnormality</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-400 border border-white"></span>
            <span>Low Risk / Nutrient Deficiency</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 border border-white"></span>
            <span>Medium Risk (Foliar/Stem)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 border border-white animate-pulse"></span>
            <span className="font-semibold text-red-400">High Risk (Urgent Action)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-500 border border-white"></span>
            <span>Uncertain / Awaiting Scan</span>
          </div>
        </div>

        {/* Tree Detail Slide-Over Card */}
        {activeTree && (
          <div className="absolute top-4 right-4 z-20 w-80 sm:w-96 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-800 p-4 shadow-2xl space-y-4 max-h-[580px] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-base text-white px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                    {activeTree.id}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                      activeTree.currentRisk === 'HIGH'
                        ? 'bg-red-950 text-red-400 border border-red-700'
                        : activeTree.currentRisk === 'MEDIUM'
                        ? 'bg-amber-950 text-amber-400 border border-amber-700'
                        : activeTree.currentRisk === 'LOW'
                        ? 'bg-yellow-950 text-yellow-400 border border-yellow-700'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                    }`}
                  >
                    {activeTree.currentRisk} Risk
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-semibold mt-1">
                  {language === 'ta' && diseaseDetail ? diseaseDetail.nameTa : diseaseDetail?.nameEn || 'Healthy'}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  {activeTree.variety} • {activeTree.block}
                </p>
              </div>

              <button
                onClick={() => setActiveTree(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tree Image */}
            {activeTree.imageUrl && (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800">
                <img
                  src={activeTree.imageUrl}
                  alt={activeTree.id}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/70 text-slate-300">
                  Last: {new Date(activeTree.lastInspectedAt).toLocaleTimeString()}
                </span>
              </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">AI Match Confidence</span>
                <span className="font-bold text-emerald-400">{activeTree.latestConfidence}%</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Visual Tissue Severity</span>
                <span className={`font-bold ${activeTree.latestSeverity > 30 ? 'text-red-400' : 'text-amber-400'}`}>
                  {activeTree.latestSeverity}%
                </span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 col-span-2">
                <span className="text-[10px] text-slate-500 block">GPS Coordinates</span>
                <span className="text-[11px] text-slate-300">
                  {activeTree.latitude.toFixed(6)}° N, {activeTree.longitude.toFixed(6)}° E
                </span>
              </div>
            </div>

            {/* Notes / Agronomic Guidance */}
            {diseaseDetail && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Action Recommendation:
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {language === 'ta'
                    ? diseaseDetail.inspectionChecklistTa[0]
                    : diseaseDetail.inspectionChecklistEn[0]}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onNavigateToAi(activeTree.id)}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <ScanEye className="w-3.5 h-3.5" />
                <span>Re-Analyze with AI</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
