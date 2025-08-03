/* ---------- Context ---------- */
const defaultCultState = {
  scores: { F: 10, Z: 10, O: 10, H: 10 },
  pools: { ZP: 0, OS: 0, RP: 0, FL: 10, SS: 0 },
  ruin: { Corruption: 0, Betrayal: 0, Decay: 0, Strife: 0 },
  leadership: {
    prophet: { name: "", invested: false },
    highRitualist: { name: "", invested: false },
    warlord: { name: "", invested: false },
    beastmaster: { name: "", invested: false },
    scoutmaster: { name: "", invested: false },
    bloodKeeper: { name: "", invested: false },
    lorebinder: { name: "", invested: false },
    enforcer: { name: "", invested: false },
  },
  turn: 1,
  log: ["Cult founded. Tier I (Initiate) reached."]
};

const CultContext = createContext();
export const useCult = () => useContext(CultContext);
const mod = (score) => Math.floor((score - 10) / 2);

/* ---------- UI Components ---------- */
const ScoreCard = ({ label, value, color }) => (
  <div className="rounded-2xl shadow p-4 flex flex-col items-center" style={{ borderColor: color }}>
    <span className="text-lg font-semibold" style={{ color }}>{label}</span>
    <span className="text-3xl font-bold">{value}</span>
    <span className="text-sm">mod {mod(value) >= 0 ? "+" : ""}{mod(value)}</span>
  </div>
);

const PoolCard = ({ label, value, max = 12 }) => (
  <div className="rounded-2xl shadow p-4 flex flex-col gap-2">
    <span className="text-lg font-semibold">{label}</span>
    <input type="range" min="0" max={max} value={value} readOnly className="accent-cyan-600" />
    <span className="text-right text-sm">{value}/{max}</span>
  </div>
);

const Dashboard = () => {
  const { state } = useCult();
  const { scores, pools } = state;
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <ScoreCard label="Faith" value={scores.F} color="#c000ff" />
      <ScoreCard label="Zeal" value={scores.Z} color="#0066cc" />
      <ScoreCard label="Offerings" value={scores.O} color="#ffcc00" />
      <ScoreCard label="Heresy" value={scores.H} color="#006400" />
      <PoolCard label="Zeal Pts" value={pools.ZP} />
      <PoolCard label="Offering Stock" value={pools.OS} />
      <PoolCard label="Ritual Power" value={pools.RP} />
      <PoolCard label="Followers" value={pools.FL} max={99} />
    </div>
  );
};

const LogPanel = () => {
  const { state } = useCult();
  return (
    <div className="rounded-2xl shadow p-4 overflow-auto h-40 text-sm space-y-1">
      {state.log.map((entry, idx) => (
        <div key={idx}>{entry}</div>
      ))}
    </div>
  );
};

const TurnControls = () => {
  const { state, setState } = useCult();
  return (
    <div className="flex gap-4 items-center">
      <button
        className="px-4 py-2 rounded-xl bg-indigo-600 text-white"
        onClick={() => setState((prev) => ({
          ...prev,
          turn: prev.turn + 1,
          log: [...prev.log, `Turn ${prev.turn + 1} begins.`]
        }))}
      >Next Turn</button>
      <span className="font-semibold">Turn {state.turn}</span>
    </div>
  );
};

export default function CultMakerApp() {
  const [state, setState] = useState(defaultCultState);
  return (
    <CultContext.Provider value={{ state, setState }}>
      <div className="p-4 space-y-4">
        <h2 className="text-3xl font-bold text-center">CultMaker</h2>
        <Dashboard />
        <TurnControls />
        <LogPanel />
      </div>
    </CultContext.Provider>
  );
}
