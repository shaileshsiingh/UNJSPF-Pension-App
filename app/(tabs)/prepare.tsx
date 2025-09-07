// App.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Full consolidated checklist data
type ChecklistItem = { step: string; category: string; task: string; status: 'Pending' | 'In Progress' | 'Done' };

const INITIAL_DATA: ChecklistItem[] = [
  // STEP 1
  {
    step: "Step 1: 90–30 Days Before Separation",
    category: "UNJSPF Actions",
    task: "Confirm/update personal & family info with HR.",
    status: "Pending",
  },
  {
    step: "Step 1: 90–30 Days Before Separation",
    category: "UNJSPF Actions",
    task: "Submit Separation Notification (PF4/SEP) through HR.",
    status: "Pending",
  },
  {
    step: "Step 1: 90–30 Days Before Separation",
    category: "Employing Organization",
    task: "Submit Separation Payments Form (F.250).",
    status: "Pending",
  },
  {
    step: "Step 1: 90–30 Days Before Separation",
    category: "Employing Organization",
    task: "Check accrued leave balances & travel entitlement.",
    status: "Pending",
  },

  // STEP 2
  {
    step: "Step 2: 30 Days Before Separation",
    category: "Tasks",
    task: "Complete exit medical examination (if required).",
    status: "Pending",
  },
  {
    step: "Step 2: 30 Days Before Separation",
    category: "Tasks",
    task: "Settle outstanding advances (education grant, DSA, travel).",
    status: "Pending",
  },
  {
    step: "Step 2: 30 Days Before Separation",
    category: "Tasks",
    task: "Inform HR of dependents’ status changes.",
    status: "Pending",
  },

  // STEP 3
  {
    step: "Step 3: At Separation",
    category: "Tasks",
    task: "HR issues Separation Personnel Action (SEPPA).",
    status: "Pending",
  },
  {
    step: "Step 3: At Separation",
    category: "Tasks",
    task: "Return UN ID card and official documents.",
    status: "Pending",
  },
  {
    step: "Step 3: At Separation",
    category: "Tasks",
    task: "Return UNLP (Laissez-Passer).",
    status: "Pending",
  },

  // STEP 4
  {
    step: "Step 4: After Separation",
    category: "Tasks",
    task: "HR sends Separation PF4/SEP + SEPPA to UNJSPF.",
    status: "Pending",
  },
  {
    step: "Step 4: After Separation",
    category: "Tasks",
    task: "Submit Payment Instructions (PF23) to UNJSPF.",
    status: "Pending",
  },
  {
    step: "Step 4: After Separation",
    category: "Tasks",
    task: "Submit proof of life (if requested).",
    status: "Pending",
  },
  {
    step: "Step 4: After Separation",
    category: "Tasks",
    task: "Return UNLP (passport) if not yet done.",
    status: "Pending",
  },

  // STEP 5
  {
    step: "Step 5: Banking & Accounts",
    category: "Tasks",
    task: "Clear outstanding UNFCU loan, obtain clearance letter, inform HR partner (if applicable).",
    status: "Pending",
  },
  {
    step: "Step 5: Banking & Accounts",
    category: "Tasks",
    task: "Close your local bank account (if repatriating) and inform Finance.",
    status: "Pending",
  },
  {
    step: "Step 5: Banking & Accounts",
    category: "Tasks",
    task: "Update personal bank account details for final payments.",
    status: "Pending",
  },

  // STEP 6
  {
    step: "Step 6: Supply & Clearance",
    category: "Tasks",
    task: "Return office equipment (laptop, phone, etc.).",
    status: "Pending",
  },
  {
    step: "Step 6: Supply & Clearance",
    category: "Tasks",
    task: "Complete property clearance certificate.",
    status: "Pending",
  },

  // STEP 7
  {
    step: "Step 7: As a Retiree",
    category: "Tasks",
    task: "Maintain valid proof of life to UNJSPF.",
    status: "Pending",
  },
  {
    step: "Step 7: As a Retiree",
    category: "Tasks",
    task: "Register with UN retiree associations if desired.",
    status: "Pending",
  },
];

const STEPS = [
  "Step 1: 90–30 Days Before Separation",
  "Step 2: 30 Days Before Separation",
  "Step 3: At Separation",
  "Step 4: After Separation",
  "Step 5: Banking & Accounts",
  "Step 6: Supply & Clearance",
  "Step 7: As a Retiree",
];

export default function App() {
  const [data, setData] = useState<ChecklistItem[]>(INITIAL_DATA);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    save();
  }, [data, showIntro, collapsed]);

  const save = async () => {
    try {
      await AsyncStorage.setItem(
        "actsChecklist",
        JSON.stringify({ data, showIntro, collapsed })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const load = async () => {
    try {
      const raw = await AsyncStorage.getItem("actsChecklist");
      if (raw) {
        const parsed = JSON.parse(raw);
        setData(parsed.data || INITIAL_DATA);
        setShowIntro(parsed.showIntro ?? true);
        setCollapsed(parsed.collapsed || {});
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toggleStatus = (task: string) => {
    setData((prev) =>
      prev.map((t) =>
        t.task === task
          ? {
              ...t,
              status:
                t.status === "Pending"
                  ? "In Progress"
                  : t.status === "In Progress"
                  ? "Done"
                  : "Pending",
            }
          : t
      )
    );
  };

  const computeProgress = () => {
    const total = data.length;
    const done = data.filter((t) => t.status === "Done").length;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  const { done, total, pct } = computeProgress();

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <View style={{ backgroundColor: '#FFFFFF', paddingTop: 20, paddingBottom: 24, paddingHorizontal: 24, borderBottomLeftRadius: 16, borderBottomRightRadius: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 }}>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <Text style={{ fontSize: 18, fontWeight: '800', color: 'rgb(70 106 209)', marginBottom: 8, textAlign: 'center' }}>ACTS-Consolidated Retirement Preparation Checklist</Text>
          <Text style={{ fontSize: 13, color: 'black', textAlign: 'center', fontWeight: '600' }}>(Actions, Checklist, Timelines, Submissions)</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* <Text style={styles.title}>
          Consolidated Retirement Preparation Checklist
        </Text>
        <Text style={styles.subtitle}>
          (Actions, Checklist, Timelines, Submissions)
        </Text> */}

        <TouchableOpacity
          style={styles.banner}
          onPress={() => setShowIntro(!showIntro)}
        >
          <Text style={styles.bannerText}>
            {showIntro ? "Hide Intro ▲" : "Show Intro ▼"}
          </Text>
        </TouchableOpacity>

        {showIntro && (
          <View style={styles.introBox}>
            <Text style={styles.introNote}>
              ⚠️ Your retirement prep begins when HR issues PF4/SEP & SEPPA.
              After separation, access to official portals/emails ends
              immediately — save essential messages now.
            </Text>
            <Text style={styles.sectionHead}>
              Types of payments you will receive on separation
            </Text>
            <Text style={styles.sectionSub}>A. From UNJSPF</Text>
            <Text>• Withdrawal benefit — One-time payment</Text>
            <Text>• Lump sum amount — Optional</Text>
            <Text>• Monthly pension for life (COLA adjusted)</Text>

            <Text style={[styles.sectionSub, { marginTop: 8 }]}>
              B. From your employing organization
            </Text>
            <Text>• Relocation grant — Lump-sum for you & family</Text>
            <Text>• Repatriation grant — Recognizes service abroad</Text>
            <Text>
              • Final Payments (Leave encashment) — Paid up to 18 days
              (temporary) or 60 days (fixed/continuing)
            </Text>
            <Text>• Final Travel Entitlements — Travel costs reimbursed</Text>
          </View>
        )}

        {/* Progress bar */}
        <View style={styles.progressOuter}>
          <View style={[styles.progressInner, { width: `${pct}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {done}/{total} done ({pct}%)
        </Text>

        {/* Checklist */}
        {STEPS.map((step) => {
          const tasks = data.filter((t) => t.step === step);
          if (!tasks.length) return null;
          const isCollapsed = !!collapsed[step];
          return (
            <View key={step} style={styles.stepBox}>
              <Pressable
                onPress={() =>
                  setCollapsed((prev) => ({ ...prev, [step]: !isCollapsed }))
                }
              >
                <Text style={styles.stepTitle}>
                  {step} {isCollapsed ? "▼" : "▲"}
                </Text>
              </Pressable>
              {!isCollapsed &&
                tasks.map((t, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.taskRow}
                    onPress={() => toggleStatus(t.task)}
                  >
                    <Text
                      style={[
                        styles.taskText,
                        t.status === "Done" && styles.taskDone,
                      ]}
                    >
                      {t.task}
                    </Text>
                    <Text style={styles.statusBadge}>{t.status}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "rgb(70 106 209)",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
  banner: {
    backgroundColor: "#e0f2f1",
    padding: 8,
    borderRadius: 8,
    marginVertical: 6,
  },
  bannerText: { textAlign: "center", color: "#0f172a", fontWeight: "600" },
  introBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  introNote: { color: "#b91c1c", fontWeight: "600", marginBottom: 10 },
  sectionHead: { fontWeight: "700", marginBottom: 6 },
  sectionSub: { fontWeight: "600", marginTop: 4 },
  progressOuter: {
    height: 14,
    backgroundColor: "#e2e8f0",
    borderRadius: 999,
    marginVertical: 10,
  },
  progressInner: {
    height: "100%",
    backgroundColor: "#14b8a6",
    borderRadius: 999,
  },
  progressText: { fontSize: 12, textAlign: "center", color: "#64748b" },
  stepBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  stepTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  taskText: { flex: 1, marginRight: 6 },
  taskDone: { textDecorationLine: "line-through", color: "#64748b" },
  statusBadge: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: "#f1f5f9",
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
});
