import { DiseaseCategory, ConditionType, RiskLevel } from '../types';

export interface DiseaseDetail {
  category: DiseaseCategory;
  nameEn: string;
  nameTa: string;
  scientificName: string;
  conditionType: ConditionType;
  defaultRisk: RiskLevel;
  symptomsEn: string[];
  symptomsTa: string[];
  whySuspectedEn: string;
  whySuspectedTa: string;
  inspectionChecklistEn: string[];
  inspectionChecklistTa: string[];
  preventiveMeasuresEn: string[];
  preventiveMeasuresTa: string[];
  bioControlEn: string[];
  bioControlTa: string[];
  chemicalAdvisoryEn: string;
  chemicalAdvisoryTa: string;
  urgentExpertInspection: boolean;
  icarcpcriRef: string;
}

export const COCONUT_DISEASES: Record<DiseaseCategory, DiseaseDetail> = {
  bud_rot: {
    category: 'bud_rot',
    nameEn: 'Bud Rot',
    nameTa: 'மொட்டு அழுகல் நோய்',
    scientificName: 'Phytophthora palmivora',
    conditionType: 'disease',
    defaultRisk: 'HIGH',
    symptomsEn: [
      'Yellowing and wilting of the central spear leaf',
      'Rotting and collapse of central spindle leaf',
      'Foul odor emanating from the crown bud region',
      'Outer fronds remain green while central shoot dies'
    ],
    symptomsTa: [
      'மையக்குருத்து இலை மஞ்சள் நிறமாகி வாடுதல்',
      'மையக் குருத்து அழுகி எளிதில் கையோடு வருதல்',
      'மண்டைப் பகுதியில் அழுகிய துர்நாற்றம் வீசுதல்',
      'வெளிமட்டைகள் பச்சையாக இருக்கும்போதே நடுக்குருத்து இறந்துபோதல்'
    ],
    whySuspectedEn: 'High humidity, monsoon rainfall, and water stagnant in the crown fostering fungal spores.',
    whySuspectedTa: 'அதிக காற்றில் ஈரப்பதம், தொடர் பருவமழை மற்றும் மரத்தின் உச்சியில் நீர் தேங்கி பூஞ்சான் பரவுதல்.',
    inspectionChecklistEn: [
      'Gently pull the central spindle leaf to check if it slips out easily',
      'Check for brown water-soaked lesions at the base of youngest leaves',
      'Inspect nearby palms as fungal spores disperse via rain splash'
    ],
    inspectionChecklistTa: [
      'நடுக்குருத்தை மெதுவாக பிடித்து இழுத்து எளிதாக வருகிறதா என சோதிக்கவும்',
      'இளம் மட்டைகளின் அடிப்பகுதியில் நீர் கசிவு போன்ற பழுப்பு நிற திட்டுக்களைக் கவனிக்கவும்'
    ],
    preventiveMeasuresEn: [
      'Crown cleaning: Remove dead and decaying vegetative debris before monsoons',
      'Ensure proper drainage in low-lying plantation patches',
      'Avoid planting at dense spacing to ensure crown aeration'
    ],
    preventiveMeasuresTa: [
      'மழைக்காலத்திற்கு முன் உச்சி பகுதியை சுத்தம் செய்து காய்ந்த மட்டைகளை அப்புறப்படுத்தவும்',
      'தோட்டத்தில் நீர் தேங்காமல் வடிகால் வசதி அமைக்கவும்'
    ],
    bioControlEn: [
      'Prophylactic application of Trichoderma viride or Pseudomonas fluorescens in leaf axils'
    ],
    bioControlTa: [
      'டிரைக்கோடெர்மா விரிடி அல்லது சூடோமோனாஸ் நுண்ணுயிரி கலவையை உச்சி மட்டை இடுக்குகளில் இடவும்'
    ],
    chemicalAdvisoryEn: 'Early stage: Remove infected spindle tissue and apply 10% Bordeaux paste. Spray adjacent healthy trees with 1% Bordeaux mixture.',
    chemicalAdvisoryTa: 'ஆரம்ப நிலையில்: அழுகிய திசுக்களை வெட்டி அகற்றிவிட்டு 10% போர்டோ பசையை பூசவும். அருகிலுள்ள மரங்களுக்கு 1% போர்டோ கலவை தெளிக்கவும்.',
    urgentExpertInspection: true,
    icarcpcriRef: 'ICAR-CPCRI Technical Bulletin No. 94 & TNAU Agritech'
  },

  basal_stem_rot: {
    category: 'basal_stem_rot',
    nameEn: 'Basal Stem Rot / Thanjavur Wilt',
    nameTa: 'தஞ்சாவூர் வாடல் / அடிமர அழுகல் நோய்',
    scientificName: 'Ganoderma lucidum / Ganoderma applanatum',
    conditionType: 'disease',
    defaultRisk: 'HIGH',
    symptomsEn: [
      'Exudation of reddish-brown gummy fluid from base of the trunk (1-1.5m from ground)',
      'Decay and rotting of root cortex and lower bole',
      'Formation of bracket-like fungal fruiting bodies (conks) at trunk base',
      'Progressive yellowing and drooping of lower fronds'
    ],
    symptomsTa: [
      'மரத்தின் அடிப்பகுதியில் (பூமியிலிருந்து 1-1.5 மீ உயரத்தில்) செம்பழுப்பு நிற பிசின் கசிதல்',
      'வேர்கள் அழுகி மரத்தின் அடித்தண்டு உள்நோக்கி உளுத்து போதல்',
      'அடிமரத்தில் காளான் போன்ற விசிறி வடிவ தட்டுகள் தோன்றுதல்',
      'கீழ் மட்டைகள் மஞ்சள் நிறமாகி தொங்கி விழுதல்'
    ],
    whySuspectedEn: 'Soil-borne fungal pathogen attacking palms in light sandy or coastal soils with fluctuating water tables.',
    whySuspectedTa: 'மணற்பாங்கான நிலங்களில் நீர்ப்பாசன குறைபாடு மற்றும் நிலத்தடி நீர்மட்டம் மாறுபடும் போது மண்ணிலுள்ள பூஞ்சான் தாக்குதல்.',
    inspectionChecklistEn: [
      'Inspect ground level trunk up to 1.5m height for dark wet bleeding spots',
      'Examine root zone for brittle, hollowed roots',
      'Look for shelf-like Ganoderma mushroom brackets around trunk circumference'
    ],
    inspectionChecklistTa: [
      'அடிமரத்திலிருந்து 1.5 மீட்டர் உயரம் வரை கரும்பழுப்பு நிற திரவம் கசிகிறதா எனப் பார்க்கவும்',
      'வேர்களைத் தோண்டிப்பார்த்து அவை உளுத்து போய் உள்ளதா என சோதிக்கவும்',
      'மண்ணின் மட்டத்தில் விசிறி போன்ற காளான் தட்டுகள் முளைத்துள்ளதா என ஆராயவும்'
    ],
    preventiveMeasuresEn: [
      'Dig isolation trenches (1m deep, 50cm wide) around affected trees to stop root contact spread',
      'Apply 50kg farmyard manure + 5kg neem cake enriched with Trichoderma harzianum per palm annually',
      'Avoid damage to trunk base and roots during ploughing'
    ],
    preventiveMeasuresTa: [
      'நோய் தாக்கிய மரத்தைச் சுற்றி 1 மீ ஆழம், 50 செ.மீ அகலத்தில் தனிமைப்படுத்தும் பள்ளம் தோண்டவும்',
      'மரம் ஒன்றுக்கு 50 கிலோ தொழு உரம் மற்றும் டிரைக்கோடெர்மா கலந்த வேப்பம்பிண்ணாக்கு 5 கிலோ இடவும்'
    ],
    bioControlEn: [
      'Soil application of Trichoderma harzianum (200g per palm) mixed in well-decomposed organic manure'
    ],
    bioControlTa: [
      'டிரைக்கோடெர்மா ஹார்சியானம் (மரம் ஒன்றுக்கு 200 கிராம்) தொழு உரத்துடன் கலந்து இடவும்'
    ],
    chemicalAdvisoryEn: 'Root feeding with Hexaconazole (2ml in 100ml water) at quarterly intervals after testing root vitality. Soil drenching around basin with Bordeaux mixture (1%).',
    chemicalAdvisoryTa: 'உயிருள்ள இளம் வேர் மூலம் ஹெக்சாகோனசோல் (2 மி.லி + 100 மி.லி நீர்) வேர் வழியே செலுத்துதல். தண்டுப்பகுதியில் போர்டோ கலவை ஊற்றுதல்.',
    urgentExpertInspection: true,
    icarcpcriRef: 'ICAR-CPCRI Disease Management Guidelines & TNAU Coconut Pathology'
  },

  stem_bleeding: {
    category: 'stem_bleeding',
    nameEn: 'Stem Bleeding',
    nameTa: 'தண்டு வடிதல் நோய்',
    scientificName: 'Thielaviopsis paradoxa (Ceratocystis paradoxa)',
    conditionType: 'disease',
    defaultRisk: 'MEDIUM',
    symptomsEn: [
      'Exudation of dark brown viscous liquid from trunk cracks or growth fissures',
      'Exudate dries forming a blackish encrustation on bark',
      'Internal fibrous trunk tissues undergo yellow-brown wet rotting',
      'Gradual decline in crown vigor and nut production'
    ],
    symptomsTa: [
      'மரத்தின் தண்டு வெடிப்புகளில் இருந்து அடர் பழுப்பு நிறத்தில் பிசின் திரவம் வடிதல்',
      'வடிந்த திரவம் காய்ந்து மரத்தின் பட்டையில் கருப்பு நிற படலமாக மாறுதல்',
      'மரத்தின் உள் திசுக்கள் அழுகி மஞ்சள்-பழுப்பு நிறமாக மாறுதல்'
    ],
    whySuspectedEn: 'Entry of Thielaviopsis fungus through wounds or growth splits during sudden heavy irrigation following dry spells.',
    whySuspectedTa: 'வறட்சிக்கு பின் திடீரென அதிக நீர் பாய்ச்சும்போது ஏற்படும் தண்டு வெடிப்புகள் வழியே பூஞ்சை புகுதல்.',
    inspectionChecklistEn: [
      'Locate origin height of bleeding oozes on trunk',
      'Check if exudation is in middle trunk (distinguish from basal stem rot)',
      'Inspect irrigation regularity and soil moisture'
    ],
    inspectionChecklistTa: [
      'திரவம் வழியும் இடத்தின் ஆழத்தை கவனிக்கவும்',
      'அடிமரத்தில் உள்ளதா அல்லது நடுப்பகுதியில் உள்ளதா என்பதை சரிபார்க்கவும்'
    ],
    preventiveMeasuresEn: [
      'Avoid trunk injuries during harvest climbing',
      'Ensure balanced regular irrigation; avoid drought-flood cycles',
      'Apply recommended potassium fertilizer dosage'
    ],
    preventiveMeasuresTa: [
      'மரம் ஏறும் போது தண்டில் காயம் ஏற்படுவதைத் தவிர்க்கவும்',
      'வறட்சிக்குப் பின் திடீரென வெள்ளம்போல் நீர் பாய்ச்சுவதை தவிர்த்து சீரான பாசனம் தரவும்'
    ],
    bioControlEn: [
      'Apply Trichoderma viride paste formulated with cow dung directly over cleaned trunk wounds'
    ],
    bioControlTa: [
      'டிரைக்கோடெர்மா பூஞ்சாணத்தை சாண பசையுடன் கலந்து சீவப்பட்ட தண்டுப் பகுதியில் பூசவும்'
    ],
    chemicalAdvisoryEn: 'Chisel out infected bleeding bark up to healthy wood, flame the surface, and paint with coal tar or 10% Bordeaux paste. Root feeding with Hexaconazole if spreading.',
    chemicalAdvisoryTa: 'பாதிக்கப்பட்ட பட்டைப் பகுதியை சீவி எடுத்துவிட்டு, போர்டோ பசை அல்லது நிலக்கரி தார் பூசவும்.',
    urgentExpertInspection: false,
    icarcpcriRef: 'ICAR-CPCRI Agritech Series: Stem Bleeding Management'
  },

  leaf_rot: {
    category: 'leaf_rot',
    nameEn: 'Leaf Rot',
    nameTa: 'இலை அழுகல் நோய்',
    scientificName: 'Colletotrichum gloeosporioides / Exserohilum rostratum',
    conditionType: 'disease',
    defaultRisk: 'MEDIUM',
    symptomsEn: [
      'Blackening and rotting of distal ends of leaflets on youngest fronds',
      'Rotten leaflets break off in winds giving fronds a frayed, fan-shaped cut appearance',
      'Black necrotic spots along leaflet margins'
    ],
    symptomsTa: [
      'இளம் மட்டைகளின் இலை நுனிகள் கருப்பாகி அழுகுதல்',
      'அழுகிய இலைப்பகுதி காற்றில் உடைந்து விழுந்து விசிறி போன்ற வெட்டுத் தோற்றம் தருதல்',
      'மட்டைகளின் விளிம்பில் கருப்பு நிற திட்டுகள் பரவுதல்'
    ],
    whySuspectedEn: 'Secondary fungal colonization favored by monsoon humidity on canopy leaves with low vigor.',
    whySuspectedTa: 'மழைக்கால குளிர் ஈரப்பதம் மற்றும் சத்து குறைந்த தென்னை மட்டைகளில் பூஞ்சை பெருகுதல்.',
    inspectionChecklistEn: [
      'Examine the newest fronds for charred leaflet tips',
      'Check if leaf rachis itself is infected or only leaflet blades'
    ],
    inspectionChecklistTa: [
      'புதிய மட்டைகளில் கருகிய இலை நுனிகளை ஆராயவும்'
    ],
    preventiveMeasuresEn: [
      'Prune off only the severely rotten distal parts of infected leaflets',
      'Improve tree nutrition with magnesium sulfate and potassium',
      'Clean crown axils before monsoon rains'
    ],
    preventiveMeasuresTa: [
      'அழுகிய இலை நுனிகளை மட்டும் கத்தரித்து அப்புறப்படுத்தவும்',
      'மெக்னீசியம் சல்பேட் மற்றும் பொட்டாஷ் உரங்களை இட்டு மரத்தின் சத்தை கூட்டவும்'
    ],
    bioControlEn: [
      'Spray Pseudomonas fluorescens (20g/litre) on emerging crown leaves'
    ],
    bioControlTa: [
      'சூடோமோனாஸ் புளோரசன்ஸ் கரைத்து புதிய மட்டைகள் மீது தெளிக்கவும்'
    ],
    chemicalAdvisoryEn: 'Pour Contaf (Hexaconazole 5 EC 2ml in 300ml water) into the well around the base of spindle leaf after cutting off rotten parts.',
    chemicalAdvisoryTa: 'ஹெக்சாகோனசோல் (2 மி.லி) 300 மி.லி தண்ணீரில் கலந்து குருத்து மட்டையின் அடிப்பகுதியில் ஊற்றவும்.',
    urgentExpertInspection: false,
    icarcpcriRef: 'CPCRI Regional Station Kayamkulam Research Bulletin'
  },

  root_wilt: {
    category: 'root_wilt',
    nameEn: 'Root Wilt Disease',
    nameTa: 'வேர் வாடல் நோய்',
    scientificName: 'Phytoplasma (Transmitted by Lace Bug & Plant Hopper)',
    conditionType: 'disease',
    defaultRisk: 'HIGH',
    symptomsEn: [
      'Inward flaccidity and ribbing of leaflets (leaflets curve inward like a boat rib)',
      'General yellowing and marginal necrosis of fronds',
      'Premature drooping of older leaves and tapering of stem apex',
      'Severe shedding of buttons and yield reduction'
    ],
    symptomsTa: [
      'தென்னை ஓலைகள் படகு போல உள்நோக்கி வளைந்து சுருங்குதல்',
      'மட்டைகள் பொதுவான மஞ்சள் நிறமாகி விளிம்புகள் காய்ந்து போதல்',
      'கீழ் மட்டைகள் முன்கூட்டியே உதிர்ந்து, உச்சி தண்டு குறுகுதல்',
      'குரும்பைகள் கொட்டுதல் மற்றும் காய்ப்பிடிப்பு குறைதல்'
    ],
    whySuspectedEn: 'Phytoplasma infection spread by vector insects (Stephanitis typica and Proutista moesta).',
    whySuspectedTa: 'இலைப்பேன் மற்றும் தத்துப் பூச்சிகள் மூலம் பரவும் பைட்டோபிளாஸ்மா நுண்கிருமித் தொற்று.',
    inspectionChecklistEn: [
      'Check for characteristic boat-rib leaflet curling across crown fronds',
      'Examine lace wing bugs under the undersurface of leaflets'
    ],
    inspectionChecklistTa: [
      'ஓலைகள் உள்நோக்கி வளைந்துள்ள தன்மையை சோதிக்கவும்',
      'ஓலைகளின் அடிப்புறத்தில் பூச்சிகள் உள்ளதா எனப் பார்க்கவும்'
    ],
    preventiveMeasuresEn: [
      'Eradicate severely diseased, unproductive palms',
      'Plant disease-tolerant hybrids (Kalpa Raksha, Kalpa Sree)',
      'Grow green manure cover crops in palm basins'
    ],
    preventiveMeasuresTa: [
      'முற்றிய நோயுற்ற மரங்களை வெட்டி அகற்றி கிருமி பரவுவதை தடுக்கவும்',
      'நோய் எதிர்ப்புத் திறன் கொண்ட ரகங்களை நடவு செய்யவும் (கல்ப ரக்ஷா)'
    ],
    bioControlEn: [
      'Spray Neem oil-garlic emulsion (2%) on under-surface of leaves to control vector insects'
    ],
    bioControlTa: [
      'வேப்ப எண்ணெய் பூண்டு கரைசல் (2%) ஓலைகளின் அடிப்புறத்தில் தெளிக்கவும்'
    ],
    chemicalAdvisoryEn: 'Non-curable phytoplasma disease; manage vigor with balanced NPK + Magnesium (500g MgSO4/palm/year) and control insect vectors.',
    chemicalAdvisoryTa: 'பரிந்துரைக்கப்பட்ட உரங்களுடன் மெக்னீசியம் சல்பேட் 500 கிராம் ஆண்டுதோறும் இட்டு மரத்தின் வலிமையை காக்கவும்.',
    urgentExpertInspection: true,
    icarcpcriRef: 'CPCRI National Research Center on Coconut Root Wilt'
  },

  red_palm_weevil: {
    category: 'red_palm_weevil',
    nameEn: 'Red Palm Weevil Infestation',
    nameTa: 'சிவப்பு கூன்வண்டு தாக்குதல்',
    scientificName: 'Rhynchophorus ferrugineus',
    conditionType: 'pest_damage',
    defaultRisk: 'HIGH',
    symptomsEn: [
      'Holes on trunk or leaf bases with chewed brown fibrous frass protruding',
      'Thick brownish liquid oozing from small boring holes',
      'Audible chewing/gnawing sounds inside the trunk core',
      'Sudden toppling of the entire crown or wilting of inner leaves'
    ],
    symptomsTa: [
      'மரத்தின் தண்டு அல்லது மட்டை இடுக்குகளில் துளைகள் மற்றும் மென்ற நார் வெளிவருதல்',
      'துளைகளில் இருந்து துர்நாற்றத்துடன் கூடிய பழுப்பு திரவம் வடிதல்',
      'மரத்தின் தண்டில் காதை வைத்து கேட்கும்போது உள்ளே புழுக்கள் தின்னும் சத்தம் கேட்டல்',
      'உச்சி கொண்டை திடீரென முறிந்து கீழே விழுதல்'
    ],
    whySuspectedEn: 'Adult weevils attracted to fresh wounds, cut fronds, or rhinoceros beetle bore holes to lay eggs.',
    whySuspectedTa: 'பச்சை மட்டைகளை வெட்டும் போது ஏற்படும் காயங்கள் மற்றும் வண்டு துளைத்த இடங்களில் முட்டையிடுதல்.',
    inspectionChecklistEn: [
      'Search trunk and leaf base collars for small oval bore holes',
      'Check for fresh moist brown fibrous frass pushed out from holes',
      'Listen for internal gnawing sounds inside the trunk'
    ],
    inspectionChecklistTa: [
      'மட்டை இடுக்குகளில் கூன்வண்டு துளைகள் உள்ளதா என ஆராயவும்',
      'தண்டில் காதை வைத்து மெல்லும் சத்தம் கேட்கிறதா என சோதிக்கவும்'
    ],
    preventiveMeasuresEn: [
      'Never cut green fronds flush with trunk; leave at least 120cm frond petiole stub',
      'Install pheromone lures (Ferrolure+) at 1 trap per hectare',
      'Seal fresh cuts, wounds, and cracks with coal tar'
    ],
    preventiveMeasuresTa: [
      'பச்சை மட்டைகளை வெட்டக்கூடாது; அவசியமானால் தண்டுப்பகுதியிலிருந்து 120 செ.மீ தள்ளி வெட்டவும்',
      'தோட்டத்தில் ஏக்கருக்கு ஒரு பெரோமோன் இனக்கவர்ச்சி பொறி அமைத்தல்'
    ],
    bioControlEn: [
      'Pheromone trapping with food baits (sugarcane or pineapple in water with yeast)'
    ],
    bioControlTa: [
      'இனக்கவர்ச்சி பொறி மூலம் கூன்வண்டுகளை கவர்ந்து அழிக்கவும்'
    ],
    chemicalAdvisoryEn: 'If detected early before crown collapse: Trunk injection or root feeding with Imidacloprid (2ml in 100ml water) and plug bore holes with clay or cement.',
    chemicalAdvisoryTa: 'ஆரம்ப நிலையிலேயே கண்டறிந்தால்: இமிடாக்ளோப்ரிட் (2 மி.லி + 100 மி.லி நீர்) வேர் மூலம் செலுத்தி, துளைகளை அடைக்கவும்.',
    urgentExpertInspection: true,
    icarcpcriRef: 'ICAR-CPCRI Entomology Technical Bulletin on Red Palm Weevil'
  },

  rhinoceros_beetle: {
    category: 'rhinoceros_beetle',
    nameEn: 'Rhinoceros Beetle Damage',
    nameTa: 'காண்டாமிருக வண்டு தாக்குதல்',
    scientificName: 'Oryctes rhinoceros',
    conditionType: 'pest_damage',
    defaultRisk: 'MEDIUM',
    symptomsEn: [
      'Geometric V-shaped or fan-shaped clipping cuts on unfurled palm fronds',
      'Bore holes at the base of petiole/crown packed with chewed fibre',
      'Ragged newly emerging leaves',
      'Creates entry wounds that later invite lethal Red Palm Weevil and Bud Rot'
    ],
    symptomsTa: [
      'வளர்ந்த ஓலைகளில் ஆங்கில எழுத்து ‘V’ வடிவில் வெட்டியது போன்ற தோற்றம்',
      'குருத்து மட்டைகளின் அடிப்பகுதியில் துளைகள் மற்றும் மென்ற நார் காணப்படுதல்',
      'புதிதாக வெளிவரும் ஓலைகள் சிதைந்து வெளிவருதல்'
    ],
    whySuspectedEn: 'Adult beetles fly from nearby manure pits, dead coconut logs, or coir compost heaps at night to feed on tender crown tissues.',
    whySuspectedTa: 'தோட்டத்திற்கு அருகில் உள்ள எருவுக்குழிகள், மக்கிய மரக்கட்டைகளில் இருந்து வண்டுகள் இரவில் வந்து உண்ணுதல்.',
    inspectionChecklistEn: [
      'Observe newly opened fronds for telltale "V" cut patterns',
      'Inspect top leaf axils for beetle entry tunnels plugged with fibre',
      'Examine farmyard manure heaps on the farm for white grubs'
    ],
    inspectionChecklistTa: [
      'ஓலைகளில் ‘V’ வடிவ வெட்டு உள்ளதா என பார்க்கவும்',
      'உச்சி மட்டை இடுக்குகளில் வண்டு துளைத்துள்ளதா என பரிசோதிக்கவும்',
      'எருவுக்குழிகளில் வெள்ளை நிற புழுக்கள் உள்ளதா என ஆய்வு செய்யவும்'
    ],
    preventiveMeasuresEn: [
      'Crown sanitation: Hook out beetles from crown axils using an iron beetle hook',
      'Fill topmost 3 leaf axils with equal parts of sand + neem seed kernel powder',
      'Treat manure pits with Metarhizium anisopliae green muscardine fungus'
    ],
    preventiveMeasuresTa: [
      'இரும்புக் கொக்கி கொண்டு மட்டை இடுக்குகளில் உள்ள வண்டுகளை குத்தி எடுக்கவும்',
      'உச்சியில் உள்ள மேல் 3 மட்டை இடுக்குகளில் மணல் மற்றும் வேப்பங்கொட்டை தூள் கலவையை நிரப்பவும்'
    ],
    bioControlEn: [
      'Oryctes rhinoceros nudivirus (OrNV) biocontrol and Metarhizium anisopliae fungal drench in breeding pits'
    ],
    bioControlTa: [
      'மெட்டாரைசியம் அனிசோபிலியே பச்சை பூஞ்சான் உயிரியல் கட்டுப்பாடு'
    ],
    chemicalAdvisoryEn: 'Placement of Naphthalene balls (3 to 4 balls of 10-12g each) in innermost leaf axils and covering with sand at 45-day intervals.',
    chemicalAdvisoryTa: 'உள் மட்டை இடுக்குகளில் 3-4 நாப்தலின் உருண்டைகளை வைத்து மணலால் மூடவும் (45 நாட்களுக்கு ஒருமுறை).',
    urgentExpertInspection: false,
    icarcpcriRef: 'TNAU Crop Protection Guide: Coconut Rhinoceros Beetle'
  },

  nutrient_deficiency: {
    category: 'nutrient_deficiency',
    nameEn: 'Nutrient Deficiency / Foliar Yellowing',
    nameTa: 'ஊட்டச்சத்து பற்றாக்குறை / இலை மஞ்சள் நிறமாதல்',
    scientificName: 'Potassium (K) / Magnesium (Mg) / Boron (B) Deficiency',
    conditionType: 'nutrient_deficiency',
    defaultRisk: 'LOW',
    symptomsEn: [
      'Marginal chlorosis and orange-yellow spotting on older leaflets (Potassium deficiency)',
      'Broad golden-yellow chlorotic bands along leaflet pinnae while midrib stays green (Magnesium)',
      'Hook-tipped leaflets or crinkled spear leaves (Boron deficiency)',
      'No foul odor, no soft rotting or viscous bleeding'
    ],
    symptomsTa: [
      'முதிர்ந்த கீழ்மட்டைகளின் ஓரங்களில் மஞ்சள்-ஆரஞ்சு நிறப் புள்ளிகள் தோன்றுதல் (பொட்டாசியம்)',
      'ஈர்க்கு பச்சையாக இருக்கும்போது பக்கவாட்டு இலைகள் தங்க மஞ்சள் நிறமாக மாறுதல் (மெக்னீசியம்)',
      'கொக்கி போன்ற வளைந்த குருத்து இலைகள் (போரான் குறைபாடு)',
      'எந்த ஒரு துர்நாற்றமோ, அழுகலோ அல்லது பிசின் கசிவோ இருக்காது'
    ],
    whySuspectedEn: 'Depleted plantation soils, inadequate muriate of potash (MOP) dosage, or soil pH imbalances.',
    whySuspectedTa: 'மண்ணில் போதிய பொட்டாஷ் மற்றும் நுண்ணூட்டச் சத்து இல்லாத நிலை.',
    inspectionChecklistEn: [
      'Distinguish if yellowing is on oldest lower leaves (K/Mg) vs youngest spear (Boron/Bud rot)',
      'Confirm absence of rotting odor or bleeding',
      'Review farm fertilizer application log'
    ],
    inspectionChecklistTa: [
      'மஞ்சள் நிறம் பழைய கீழ் மட்டைகளில் உள்ளதா அல்லது புதிய குருத்தில் உள்ளதா என பார்க்கவும்',
      'அழுகிய வாசனை இல்லை என்பதை உறுதி செய்யவும்'
    ],
    preventiveMeasuresEn: [
      'Apply soil test based fertilizers: 1.3kg MOP, 1kg Urea, 2kg Single Super Phosphate per adult palm per year in two splits',
      'Apply 500g Magnesium sulphate per palm annually in deficient soils',
      'Apply 50g Borax around palm basin twice a year for boron deficient crowns'
    ],
    preventiveMeasuresTa: [
      'மண் பரிசோதனை அடிப்படையில் ஆண்டுக்கு ஒரு மரத்திற்கு 1.3 கிலோ பொட்டாஷ், 1 கிலோ யூரியா, 2 கிலோ சூப்பர் பாஸ்பேட் இடவும்',
      'மெக்னீசியம் சல்பேட் 500 கிராம் ஆண்டுதோறும் இடவும்'
    ],
    bioControlEn: [
      'Incorporate Azospirillum (100g) and Phosphobacteria (100g) mixed with organic compost'
    ],
    bioControlTa: [
      'அசோஸ்பைரில்லம் மற்றும் பாஸ்போபாக்டீரியா தலா 100 கிராம் தொழுஉரத்துடன் கலந்து இடவும்'
    ],
    chemicalAdvisoryEn: 'This is a soil nutritional issue, NOT an infectious disease. Do NOT spray chemical fungicides or insecticides. Correct with soil-applied fertilizers.',
    chemicalAdvisoryTa: 'இது ஊட்டச்சத்துக் குறைபாடு மட்டுமே, தொற்று நோய் அல்ல! எனவே பூச்சிக்கொல்லி மருந்துகளை அடிக்க வேண்டாம்.',
    urgentExpertInspection: false,
    icarcpcriRef: 'ICAR-CPCRI Coconut Nutrition Management Manual'
  },

  leaf_blight: {
    category: 'leaf_blight',
    nameEn: 'Grey Leaf Spot / Leaf Blight',
    nameTa: 'சாம்பல் நிற இலைப்புள்ளி / கருகல் நோய்',
    scientificName: 'Pestalotiopsis palmarum',
    conditionType: 'disease',
    defaultRisk: 'LOW',
    symptomsEn: [
      'Small yellowish spots on mature leaflets enlarging into oval lesions with greyish centres and dark borders',
      'Minute black dots (acervuli) in grey central zone',
      'Severe blighting of outer fronds in dry summer weather'
    ],
    symptomsTa: [
      'முதிர்ந்த மட்டைகளில் சிறிய மஞ்சள் புள்ளிகள் தோன்றி, சாம்பல் நிற மையத்துடன் விரிவடைதல்',
      'சாம்பல் நிறப் பகுதியின் நடுவே சிறிய கருப்பு புள்ளிகள் தோன்றுதல்'
    ],
    whySuspectedEn: 'Low soil potassium, prolonged heat stress, or debilitated palms.',
    whySuspectedTa: 'மண்ணில் பொட்டாசியம் பற்றாக்குறை மற்றும் கோடை வெப்ப அழுத்தம்.',
    inspectionChecklistEn: [
      'Inspect undersurface of lesions for tiny black fungal pinheads',
      'Check if upper canopy leaves are healthy'
    ],
    inspectionChecklistTa: [
      'இலைப்புள்ளிகளில் சாம்பல் நிற மையத்தை கவனிக்கவும்'
    ],
    preventiveMeasuresEn: [
      'Prune and burn heavily infected dead lower fronds',
      'Apply adequate potassium (MOP) to improve foliar strength',
      'Ensure regular summer irrigation'
    ],
    preventiveMeasuresTa: [
      'காய்ந்து தொங்கும் கீழ்மட்டைகளை வெட்டி அப்புறப்படுத்தவும்',
      'பொட்டாஷ் உரமிட்டு மரத்தின் எதிர்ப்பு சக்தியை அதிகரிக்கவும்'
    ],
    bioControlEn: [
      'Foliar spray with Pseudomonas fluorescens (0.5%)'
    ],
    bioControlTa: [
      'சூடோமோனாஸ் புளோரசன்ஸ் கரைசலை மட்டைகளில் தெளிக்கவும்'
    ],
    chemicalAdvisoryEn: 'Spray Copper Oxychloride (0.25%) or Carbendazim (0.1%) only if nursery or young palms are heavily blighted. On mature palms, cultural correction with potash is usually sufficient.',
    chemicalAdvisoryTa: 'இளங்கன்றுகளுக்கு காப்பர் ஆக்சி குளோரைடு (0.25%) தெளிக்கலாம். பெரிய மரங்களுக்கு பொட்டாஷ் உரமிட்டாலே சரியாகும்.',
    urgentExpertInspection: false,
    icarcpcriRef: 'TNAU Agritech Portal: Grey Blight in Coconut'
  },

  healthy: {
    category: 'healthy',
    nameEn: 'Healthy Coconut Palm',
    nameTa: 'ஆரோக்கியமான தென்னை மரம்',
    scientificName: 'Cocos nucifera L.',
    conditionType: 'healthy',
    defaultRisk: 'NONE',
    symptomsEn: [
      'Vibrant deep green foliage with balanced spherical or semi-spherical crown',
      'Straight, firm central spindle leaf without discoloration or wilting',
      'Clean, undamaged trunk bark without bleeding cracks or bore holes',
      'Healthy spadix emerging with robust button retention and uniform nut clusters'
    ],
    symptomsTa: [
      'செழுமையான அடர் பச்சை நிற ஓலைகள் கொண்ட வட்ட வடிவ கொண்டை',
      'நேரான, வாடாத மையக் குருத்து இலை',
      'வெடிப்புகள், பிசின் கசிவு அல்லது வண்டுத் துளைகள் இல்லாத தூய தண்டு',
      'குரும்பைகள் உதிராமல் திரட்சியான காய்க்குலைகள் அமைந்திருத்தல்'
    ],
    whySuspectedEn: 'Optimal soil health, balanced nutrition, adequate irrigation, and clean orchard sanitation.',
    whySuspectedTa: 'முறையான பராமரிப்பு, சீரான பாசனம் மற்றும் இயற்கை உரங்கள் கொண்ட ஆரோக்கியமான நிலை.',
    inspectionChecklistEn: [
      'Confirm continuous green color on youngest spindle frond',
      'Verify trunk perimeter is clean from oozes or insect frass',
      'Record normal baseline telemetry and continue routine scheduled 360 camera scans'
    ],
    inspectionChecklistTa: [
      'குருத்து மற்றும் உச்சி இலைகள் பசுமையாக உள்ளதை உறுதி செய்யவும்',
      'வழக்கமான கண்காணிப்பு அட்டவணையை தொடரவும்'
    ],
    preventiveMeasuresEn: [
      'Maintain biannual organic manure and bio-fertilizer application',
      'Ensure regular irrigation of 60-80 litres/palm/day in dry months',
      'Keep tree basins mulched with coconut husks or green manure'
    ],
    preventiveMeasuresTa: [
      'ஆண்டுக்கு இருமுறை தொழு உரம் இடுவதை தொடரவும்',
      'கோடை காலத்தில் மரம் ஒன்றுக்கு நாள் ஒன்றுக்கு 60-80 லிட்டர் நீர் பாய்ச்சவும்',
      'தென்னை மட்டைகளால் மரத்தடியில் மூடாக்கு போடவும்'
    ],
    bioControlEn: [
      'Preventive intercropping with leguminous green manure and honeybee keeping'
    ],
    bioControlTa: [
      'பசுந்தாள் உரம் மற்றும் தேனீ வளர்ப்பு மூலம் மகரந்தச் சேர்க்கையை பெருக்குதல்'
    ],
    chemicalAdvisoryEn: 'No chemical intervention required. Do not apply prophylactic chemicals to healthy trees.',
    chemicalAdvisoryTa: 'எந்தவிதமான பூச்சிக்கொல்லி அல்லது ரசாயன மருந்தும் தேவையில்லை.',
    urgentExpertInspection: false,
    icarcpcriRef: 'ICAR-CPCRI Good Agricultural Practices (GAP) for Coconut'
  },

  unknown_or_inconclusive: {
    category: 'unknown_or_inconclusive',
    nameEn: 'Uncertain / Expert Inspection Required',
    nameTa: 'தெளிவற்ற நிலை / வேளாண் வல்லுநர் ஆய்வு தேவை',
    scientificName: 'Inconclusive Optical Pattern',
    conditionType: 'inconclusive',
    defaultRisk: 'LOW',
    symptomsEn: [
      'Image blurry, backlit, obscured by sunlight glare, or out-of-focus',
      'Symptoms do not match known diagnostic patterns with high confidence',
      'Physical lightning strike, wind tear, or atypical foliar marking'
    ],
    symptomsTa: [
      'புகைப்படம் மங்கலாகவோ அல்லது அதிக சூரிய வெளிச்சத்தினால் தெளிவாக இல்லாமலோ இருத்தல்',
      'அறிகுறிகள் தெரிந்த நோய் வகைகளுடன் போதுமான அளவு பொருந்தாமை',
      'இயற்கை மின்னல் தாக்கம், காற்றில் உடைந்த மட்டை அல்லது வழக்கத்திற்கு மாறான நிறமாற்றம்'
    ],
    whySuspectedEn: 'Single image inference has insufficient optical feature clarity to make a conclusive scientific assessment.',
    whySuspectedTa: 'ஒற்றைப் புகைப்படத்தைக் கொண்டு துல்லியமான அறிவியல் முடிவை எடுக்க போதிய தெளிவு இல்லை.',
    inspectionChecklistEn: [
      'Capture a fresh close-up photo in diffuse morning daylight (avoid direct camera glare)',
      'Inspect physical crown and trunk directly in the field',
      'Request agricultural extension officer / KVK visit if symptoms worsen'
    ],
    inspectionChecklistTa: [
      'காலை வேளையில் புதிய தெளிவான புகைப்படத்தை எடுக்கவும்',
      'நேரடியாக தோட்டத்திற்கு சென்று மட்டைகளை கண்காணிக்கவும்'
    ],
    preventiveMeasuresEn: [
      'Calibrate camera focus and adjust 360 pan angle for a clear view of the suspected tree',
      'Clean camera lens from dust and spider webs'
    ],
    preventiveMeasuresTa: [
      'கேமரா லென்ஸில் தூசி துடைக்கவும்',
      'மறுபடியும் சரியான கோணத்தில் படம்பிடிக்கவும்'
    ],
    bioControlEn: [
      'Continue regular organic orchard sanitation'
    ],
    bioControlTa: [
      'வழக்கமான இயற்கை தோட்டப் பராமரிப்பை தொடரவும்'
    ],
    chemicalAdvisoryEn: 'NEVER apply chemical fungicides or insecticides without conclusive diagnosis or expert guidance.',
    chemicalAdvisoryTa: 'சரியான காரணம் அறியாமல் எவ்வித ரசாயன மருந்துகளையும் தெளிக்க வேண்டாம்.',
    urgentExpertInspection: true,
    icarcpcriRef: 'Standard Agricultural Diagnostic Protocol'
  }
};
