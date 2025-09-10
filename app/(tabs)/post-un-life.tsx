import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Linking,
  Share,
  Modal,
  FlatList,
  Switch,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { LogOut, Workflow } from 'lucide-react-native';
import { router } from 'expo-router';

type BudgetSplits = Record<string, number>;

function computeBudget(pension: number, splits: BudgetSplits) {
  const entries = Object.entries(splits).map(([k, v]) => [k, Math.round(pension * v)] as const);
  const total = entries.reduce((s, [, val]) => s + val, 0);
  return { entries, total };
}

function toggleValue(map: Record<string, boolean>, key: string) {
  return { ...map, [key]: !map[key] };
}

export default function PostUNLifePlanner() {
  const [pension, setPension] = useState<number>(3000);
  const [country, setCountry] = useState<string>('Portugal');
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);

  const STORAGE_KEY = 'postun_plan_native';

  const countryNotes: Record<string, string> = {
    Portugal: 'EU Schengen access, quality healthcare, temperate climate.',
    Panama: 'Territorial tax, dollarized economy, acclaimed Pensionado benefits.',
    Malaysia: 'Long-stay MM2H option, English widely spoken in cities.',
    'Costa Rica': 'Stable democracy, public healthcare (Caja), biodiversity.',
    Mexico: 'Vibrant expat hubs, strong connectivity, diverse climates.',
  };

  type CountryRow = {
    name: string;
    residencyRoute: string;
    incomeNote: string;
    taxNote: string;
    healthcareNote: string;
    links: { label: string; url: string }[];
  };

  const compareRows: CountryRow[] = [
    {
      name: 'Portugal',
      residencyRoute: 'D-series (e.g., D7 passive income, D8 digital nomad)',
      incomeNote: 'Varies; verify with AIMA/VFS (thresholds and proofs subject to change)',
      taxNote: 'Resident taxation; check double-tax treaties; consult local advisor',
      healthcareNote: 'SNS public system; private plans widely available',
      links: [
        { label: 'AIMA Residence', url: 'https://aima.gov.pt/pt/viver/autorizacao-de-residencia-regime-e-requisitos-gerais-art-o-77-o-n-o-1' },
        { label: 'VFS D7 Checklist', url: 'https://www.vfsglobal.com/one-pager/portugal/india/english/pdf/checklist_for_d7_new.pdf' },
      ],
    },
    {
      name: 'Panama',
      residencyRoute: 'Pensionado (retiree) or Friendly Nations (if eligible)',
      incomeNote: 'Pensionado traditionally requires lifetime pension (e.g., ~$1,000/mo). Verify PDF.',
      taxNote: 'Territorial tax (foreign-sourced income generally not taxed)',
      healthcareNote: 'Public & private options; many expats use private clinics',
      links: [
        { label: 'Migración Permisos', url: 'https://www.migracion.gob.pa/permisos-migratorios/' },
        { label: 'Pensionado PDF', url: 'https://www.migracion.gob.pa/wp-content/uploads/02-JUBILADO-PENSIONADO-1.pdf' },
      ],
    },
    {
      name: 'Malaysia',
      residencyRoute: 'MM2H (Malaysia My Second Home)',
      incomeNote: 'Financial criteria differ; refer to Immigration & MyGov portals',
      taxNote: 'Resident/non-resident rates differ; consult for personal situation',
      healthcareNote: 'Strong private hospitals; expats typically carry private insurance',
      links: [
        { label: 'IMI MM2H', url: 'https://www.imi.gov.my/index.php/en/main-services/malaysia-my-second-home-mmh2-en/' },
        { label: 'MyGov MM2H', url: 'https://www.malaysia.gov.my/portal/subcategory/865' },
      ],
    },
    {
      name: 'Costa Rica',
      residencyRoute: 'Pensionado / Rentista',
      incomeNote: 'Pensionado historically ~$1,000/mo pension; verify latest with Migración',
      taxNote: 'Territorial system elements; confirm with local advisor',
      healthcareNote: 'Public Caja access for residents; private clinics common',
      links: [{ label: 'Migración (Visas)', url: 'https://migracion.go.cr/visas/' }],
    },
    {
      name: 'Mexico',
      residencyRoute: 'Temporary/Permanent Residency via economic solvency',
      incomeNote: 'Amounts vary by consulate (bank balances/income); check local consulate',
      taxNote: 'Resident taxation on worldwide income; verify treaties',
      healthcareNote: 'Public IMSS/INSABI options; robust private sector',
      links: [
        { label: 'Consulate (example)', url: 'https://consulmex.sre.gob.mx/leamington/index.php/non-mexicans/visas/115-temporary-resident-visa' },
      ],
    },
  ];

  const relocationLinks = [
    { name: 'Portugal — AIMA (Residence)', url: 'https://aima.gov.pt/pt/viver/autorizacao-de-residencia-regime-e-requisitos-gerais-art-o-77-o-n-o-1', tag: 'Official' },
    { name: 'Portugal — D7 Visa Checklist (VFS Global)', url: 'https://www.vfsglobal.com/one-pager/portugal/india/english/pdf/checklist_for_d7_new.pdf', tag: 'Checklist' },
    { name: 'Panama — Migración (Permisos)', url: 'https://www.migracion.gob.pa/permisos-migratorios/', tag: 'Official' },
    { name: 'Panama — Requisitos Jubilado/Pensionado (PDF)', url: 'https://www.migracion.gob.pa/wp-content/uploads/02-JUBILADO-PENSIONADO-1.pdf', tag: 'Official PDF' },
    { name: 'Malaysia — MM2H (Immigration Dept.)', url: 'https://www.imi.gov.my/index.php/en/main-services/malaysia-my-second-home-mmh2-en/', tag: 'Official' },
    { name: 'Malaysia — MyGov MM2H Portal', url: 'https://www.malaysia.gov.my/portal/subcategory/865', tag: 'Gov Portal' },
    { name: 'Costa Rica — Dirección de Migración (Visas)', url: 'https://migracion.go.cr/visas/', tag: 'Official' },
    { name: 'Mexico — Temporary Resident (Consulate)', url: 'https://consulmex.sre.gob.mx/leamington/index.php/non-mexicans/visas/115-temporary-resident-visa', tag: 'Official' },
  ];

  const secondCareerLinks = [
    { name: 'UN-Ready Professionals', url: 'https://www.dundex.net/' },
    { name: 'UN Careers', url: 'https://careers.un.org/' },
    { name: 'UN Get Involved', url: 'https://www.un.org/en/get-involved' },
    { name: 'ReliefWeb Jobs', url: 'https://reliefweb.int/jobs' },
    { name: 'Idealist Jobs', url: 'https://www.idealist.org/en/jobs' },
  ];

  const travelLinks = [
    { name: 'Google Flights', url: 'https://www.google.com/travel/flights?gl=US&hl=en-US' },
    { name: 'Skyscanner', url: 'https://www.skyscanner.com/' },
    { name: 'KAYAK', url: 'https://www.kayak.com/' },
    { name: 'Google Flights Help (price tracking)', url: 'https://support.google.com/travel/answer/2475306?co=GENIE.Platform%3DDesktop&hl=en' },
  ];

  const readingLinks = [
    { name: 'Google NotebookLM', url: 'https://notebooklm.google/' },
    { name: 'Readwise Reader', url: 'https://read.readwise.io/' },
    { name: 'Elicit (AI Research Assistant)', url: 'https://elicit.com/' },
    { name: 'Google AI Studio', url: 'https://aistudio.google.com/' },

  ];

  const storyLinks = [
    { name: 'Substack', url: 'https://substack.com/home-i' },
    { name: 'Medium', url: 'https://medium.com/' },
    { name: 'Canva (Design & Publishing)', url: 'https://www.canva.com/' },
    { name: 'Descript (Video/Podcast)', url: 'https://www.descript.com/' },
  ];

  const creativeLinks = [
    { name: 'Runway (Video AI)', url: 'https://runwayml.com/' },
    { name: 'Canva (AI Design)', url: 'https://www.canva.com/' },
    { name: 'Adobe Express', url: 'https://www.adobe.com/express/' },
    { name: 'CapCut (Video)', url: 'https://www.capcut.com/' },
    { name: 'Descript (Edit like a doc)', url: 'https://www.descript.com/' },
    { name: 'Midjourney (Images)', url: 'https://www.midjourney.com/' },
    { name: 'DALL·E 3 (Images)', url: 'https://openai.com/dall-e-3/' },
    { name: 'Stability AI / Stable Diffusion', url: 'https://stability.ai/' },
    { name: 'ElevenLabs (Voices)', url: 'https://elevenlabs.io/' },
    { name: 'Suno (AI Music)', url: 'https://suno.com/' },
  ];

  const budgetSplits: BudgetSplits = {
    Housing: 0.3,
    Healthcare: 0.15,
    Food: 0.2,
    Transport: 0.1,
    Leisure: 0.1,
    Travel: 0.1,
    Buffer: 0.05,
  };

  const budget = useMemo(() => computeBudget(pension, budgetSplits), [pension]);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (typeof parsed.pension === 'number') setPension(parsed.pension);
          if (typeof parsed.country === 'string') setCountry(parsed.country);
          if (parsed.checklist && typeof parsed.checklist === 'object') setChecklist(parsed.checklist);
        }
      } catch {
        // ignore
      }
    })();
  }, []);

  function toggleChecklistItem(key: string) {
    setChecklist(prev => toggleValue(prev, key));
  }

  async function savePlan() {
    const plan = { pension, country, checklist, ts: new Date().toISOString() };
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
      Alert.alert('Saved', 'Plan saved on device.');
    } catch {
      Alert.alert('Save failed', 'Could not save the plan.');
    }
  }

  async function sharePlan() {
    const plan = { pension, country, checklist, ts: new Date().toISOString() };
    try {
      await Share.share({ message: JSON.stringify(plan, null, 2) });
    } catch {}
  }

  async function copyPlanToClipboard() {
    const plan = { pension, country, checklist, ts: new Date().toISOString() };
    try {
      await Clipboard.setStringAsync(JSON.stringify(plan));
      Alert.alert('Copied', 'Plan JSON copied to clipboard.');
    } catch {
      Alert.alert('Copy failed', 'Could not copy to clipboard.');
    }
  }

  function openLink(url: string) {
    Linking.openURL(url).catch(() => Alert.alert('Failed to open link'));
  }

  const checklistItems = [
    'Travel medical insurance for first 6–12 months',
    'Quote private plans in destination country',
    'Understand public system eligibility/enrollment',
    'Bring apostilled birth/marriage/pension letters',
    'Translate documents (sworn translator where required)',
    'Medication continuity: prescriptions + doctor letters',
    'Vaccination record + international certificate',
    'Emergency contacts + nearest hospitals list',
    'Home safety basics (locks, lighting, community watch)',
    'Register with your embassy/consulate (if applicable)',
  ];

  const CountryPicker = () => (
    <Modal visible={countryPickerOpen} transparent animationType="fade" onRequestClose={() => setCountryPickerOpen(false)}>
      <Pressable style={styles.modalBackdrop} onPress={() => setCountryPickerOpen(false)} />
      <View style={styles.modalCard}>
        <Text style={styles.modalTitle}>Select Country</Text>
        <FlatList
          data={Object.keys(countryNotes)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setCountry(item);
                setCountryPickerOpen(false);
              }}
              style={styles.countryRow}
            >
              <Text style={styles.countryText}>{item}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={styles.header}>
          <TouchableOpacity 
                                      style={styles.backButton}
                                      onPress={() => router.push('/(tabs)')}
                                    >
                           <View style={{ transform: [{ scaleX: -1 }] }}>
                                    <LogOut size={24} color="#2563EB" strokeWidth={2} />
                                  </View>          </TouchableOpacity>
          <View style={styles.headerIconContainer}>
            <Workflow size={32} color="#2563EB" strokeWidth={2} />
          </View>
          <Text style={styles.headerTitle}>Post-UN Life Planner</Text>
          <Text style={styles.headerSub}>Helpful tools to map your life, work, and choices beyond UN service.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What can my pension buy each month?</Text>
          <Text style={styles.label}>Monthly Pension (USD)</Text>
          <TextInput
            style={styles.input}
            inputMode="numeric"
            keyboardType={Platform.select({ ios: 'number-pad', android: 'number-pad' })}
            value={String(pension)}
            onChangeText={(t) => setPension(Number(t.replace(/[^0-9]/g, '')) || 0)}
          />

          <Text style={[styles.label, { marginTop: 12 }]}>Target Country</Text>
          <TouchableOpacity onPress={() => setCountryPickerOpen(true)} style={styles.select}>
            <Text style={styles.selectText}>{country}</Text>
          </TouchableOpacity>
          <CountryPicker />

          <Text style={styles.noteSmall}>Why {country}? {countryNotes[country]}</Text>

          <View style={{ marginTop: 12 }}>
            {budget.entries.map(([k, v]) => (
              <View key={k} style={{ marginBottom: 8 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.rowLabel}>{k}</Text>
                  <Text style={styles.rowValue}>${v.toLocaleString()}</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${(v / Math.max(budget.total, 1)) * 100}%` }]} />
                </View>
              </View>
            ))}
          </View>
          <Text style={styles.total}>Total allocated: ${budget.total.toLocaleString()}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Relocate? 5 expat-friendly options</Text>
          {(['Portugal', 'Panama', 'Malaysia', 'Costa Rica', 'Mexico'] as const).map((c) => (
            <View key={c} style={{ marginTop: 8 }}>
              <Text style={styles.listTitle}>{c}</Text>
              <View style={styles.linkPills}>
                {relocationLinks
                  .filter((l) => l.name.startsWith(c))
                  .map((l) => (
                    <TouchableOpacity key={l.url} onPress={() => openLink(l.url)} style={styles.pill}>
                      <Text style={styles.pillText}>{l.tag}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Country Comparison — residency, taxes, healthcare</Text>
          <Text style={styles.noteSmall}>Indicative only. Verify with official links and advisors.</Text>
          <View style={{ marginTop: 8 }}>
            {compareRows.map((r) => (
              <View key={r.name} style={styles.compareCard}>
                <Text style={styles.compareCountry}>{r.name}</Text>
                <Text style={styles.compareLine}><Text style={styles.bold}>Residency:</Text> {r.residencyRoute}</Text>
                <Text style={styles.compareLine}><Text style={styles.bold}>Income/Proof:</Text> {r.incomeNote}</Text>
                <Text style={styles.compareLine}><Text style={styles.bold}>Tax:</Text> {r.taxNote}</Text>
                <Text style={styles.compareLine}><Text style={styles.bold}>Healthcare:</Text> {r.healthcareNote}</Text>
                <View style={styles.linkRow}>
                  {r.links.map((l) => (
                    <TouchableOpacity key={l.url} onPress={() => openLink(l.url)}>
                      <Text style={styles.linkText}>{l.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Healthcare & Safety — onboarding checklist</Text>
          <Text style={styles.noteSmall}>Tick items as you complete them. Stored locally on this device.</Text>
          <View style={{ marginTop: 8 }}>
            {checklistItems.map((label) => (
              <View key={label} style={styles.checkRow}>
                <Switch value={!!checklist[label]} onValueChange={() => toggleChecklistItem(label)} />
                <Text style={styles.checkText}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Second Career (UN/Non-profit)</Text>
          <LinkList links={secondCareerLinks} onOpen={openLink} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Travel (See what you missed)</Text>
          <LinkList links={travelLinks} onOpen={openLink} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reading & Learning (with GenAI)</Text>
          <LinkList links={readingLinks} onOpen={openLink} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tell Your Story & Publish</Text>
          <LinkList links={storyLinks} onOpen={openLink} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Creative Pursuits — 10 AI tools to learn & master</Text>
          <View style={{ marginTop: 8 }}>
            {creativeLinks.map((l) => (
              <TouchableOpacity key={l.url} onPress={() => openLink(l.url)} style={styles.linkTile}>
                <Text style={styles.linkTileName}>{l.name}</Text>
                <Text style={styles.linkTileUrl}>{l.url}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* <View style={styles.card}>
          <Text style={styles.cardTitle}>Save & Share Your Plan</Text>
          <Text style={styles.noteSmall}>Saved locally with AsyncStorage. Share or copy JSON.</Text>
          <View style={styles.actions}>
            <ButtonGhost label="Save on device" onPress={savePlan} />
            <ButtonGhost label="Share JSON" onPress={sharePlan} />
            <ButtonGhost label="Copy JSON" onPress={copyPlanToClipboard} />
          </View>
        </View> */}

        <Text style={styles.footer}>Disclaimer: Links are provided for convenience; always verify requirements and eligibility with the official authority in your country of nationality/residence. Tax and immigration rules change; consult licensed professionals before acting.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function ButtonGhost({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonGhost}>
      <Text style={styles.buttonGhostText}>{label}</Text>
    </TouchableOpacity>
  );
}

function LinkList({ links, onOpen }: { links: { name: string; url: string }[]; onOpen: (url: string) => void }) {
  return (
    <View style={{ marginTop: 8 }}>
      {links.map((l) => (
        <TouchableOpacity key={l.url} onPress={() => onOpen(l.url)} style={styles.linkRowItem}>
          <Text style={styles.linkName}>{l.name}</Text>
          <Text style={styles.linkUrl}>{l.url}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    borderRadius: 12,
  },
  backButton: {
    position: 'absolute',
    left: width < 300 ? 12 : width < 350 ? 16 : 24,
    top: width < 300 ? 20 : width < 350 ? 24 : 28,
    padding: 8,
    zIndex: 1,
  },
  headerIconContainer: {
    backgroundColor: '#EBF4FF',
    padding: 12,
    borderRadius: 50,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: 'rgb(70 106 209)',
  },
  headerSub: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8, color: '#1E40AF' },
  label: { fontSize: 14, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.select({ ios: 10, android: 6 }) as number,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  select: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  selectText: { fontSize: 16 },
  noteSmall: { fontSize: 12, color: '#475569', marginTop: 6 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowLabel: { fontSize: 14 },
  rowValue: { fontSize: 14, fontWeight: '600' },
  progressTrack: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden', marginTop: 4 },
  progressFill: { height: 8, backgroundColor: '#1E293B', borderRadius: 4 },
  total: { textAlign: 'right', fontSize: 12, color: '#64748b', marginTop: 4 },
  listTitle: { fontWeight: '700', fontSize: 16 },
  linkPills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 as any, marginTop: 8 },
  pill: { backgroundColor: '#E0E7FF', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999 },
  pillText: { color: '#1D4ED8', fontWeight: '600' },
  compareCard: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, marginTop: 8 },
  compareCountry: { fontWeight: '700', fontSize: 16, marginBottom: 4 },
  compareLine: { marginTop: 2, lineHeight: 18 },
  bold: { fontWeight: '700' },
  linkRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 as any, marginTop: 8 },
  linkText: { color: '#2563EB' },
  checkRow: { flexDirection: 'row', gap: 10 as any, alignItems: 'center', paddingVertical: 6 },
  checkText: { flex: 1, flexWrap: 'wrap' },
  linkRowItem: { paddingVertical: 8 },
  linkName: { fontSize: 14, fontWeight: '600' },
  linkUrl: { fontSize: 12, color: '#64748B' },
  linkTile: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, marginBottom: 8 },
  linkTileName: { fontWeight: '600' },
  linkTileUrl: { fontSize: 12, color: '#64748B', marginTop: 2 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 as any, marginTop: 8 },
  buttonGhost: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  buttonGhostText: { fontWeight: '600' },
  footer: { fontSize: 11, color: '#64748B', textAlign: 'center', marginBottom: 16 },
  modalBackdrop: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)' },
  modalCard: { position: 'absolute', left: 16, right: 16, top: '20%', backgroundColor: 'white', borderRadius: 16, padding: 16, maxHeight: '60%' },
  modalTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  countryRow: { paddingVertical: 10 },
  countryText: { fontSize: 16 },
  separator: { height: 1, backgroundColor: '#E5E7EB' },
});
