import Link from "next/link";
import { TrendingList } from "@/components/TrendingList";
import { PoolPilotLaunches } from "@/components/PoolPilotLaunches";
import { TrustStrip } from "@/components/TrustStrip";
import { SeatRing } from "@/components/SeatRing";
import { MCFL } from "@/lib/tokens";

const sampleMarkets = [
  { t: "MOON", p: "0.0042", c: "+38.4%", seats: 14, volume: "$48k", up: true },
  { t: "FLMG", p: "0.0187", c: "+12.1%", seats: 17, volume: "$31k", up: true },
  { t: "PDOG", p: "0.0009", c: "-6.3%", seats: 9, volume: "$22k", up: false },
  { t: "SCAT", p: "0.0311", c: "+74.9%", seats: 18, volume: "$67k", up: true },
];

function MarketRow({ m }: { m: typeof sampleMarkets[number] }) {
  return (
    <Link href="/books" className="flex items-center gap-3 py-3.5 border-b border-[var(--divider)] last:border-0">
      <div className="flex-1 min-w-0">
        <b className="font-semibold">{m.t}</b>
        <div className="text-xs text-secondary">{m.volume} volume</div>
        <div className="text-xs text-secondary">{m.seats} of 18 seats</div>
      </div>
      <div className="text-right min-w-[72px]">
        <div className="text-sm">{"$"}{m.p}</div>
        <div className={m.up ? "text-up" : "text-down"}>{m.c}</div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-7 pb-4">
      <section className="pt-1">
        <h1 className="text-[32px] leading-[1.14] mb-3">Launch a coin<br />with your team.</h1>
        <p className="text-secondary leading-relaxed mb-5">
          A non-custodial launch and trading desk on Robinhood Chain. Eighteen seats,
          one Uniswap v3 pool, and you sign every transaction.
        </p>
        <div className="flex gap-2.5 mb-5">
          <Link href="/launch" className="btn btn-primary flex-1">Launch a coin</Link>
          <Link href="/books" className="btn btn-secondary flex-1">Browse markets</Link>
        </div>
        <TrustStrip />
      </section>

      <Link href="/books" className="card block p-4">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs text-secondary">Example book: MOON</span>
          <span className="text-up text-xs">+38.4% today</span>
        </div>
        <h2 className="text-[21px] mb-3">14 of 18 seats filled</h2>
        <div className="flex gap-[3px]" aria-label="14 of 18 seats filled">
          {Array.from({length:18}, (_,i) => <i key={i} className="block flex-1 h-2 rounded-[2px]" style={{background:i<14 ? "var(--lime)" : "var(--border)"}} />)}
        </div>
        <p className="text-xs text-secondary mt-2.5">Minimum bid $10 per seat</p>
      </Link>

      <div className="grid grid-cols-2 border-y border-[var(--divider)]">
        <div className="py-3.5"><span className="text-xs text-secondary block">24h volume</span><b className="font-display text-[26px]">$1.2M</b></div>
        <div className="py-3.5 pl-4 border-l border-[var(--divider)]"><span className="text-xs text-secondary block">Coins launched</span><b className="font-display text-[26px]">3,481</b></div>
      </div>

      <section>
        <h2 className="text-[21px] mb-2.5">How it works</h2>
        <ol className="border-t border-[var(--divider)]">
          {[
            ["1","Name your coin","Set the ticker and the minimum bid per seat."],
            ["2","Mint the token and pool","One signature creates a 1B supply and a pool."],
            ["3","Invite your team","Share a QR code so friends can take a seat."],
          ].map(([n,t,d]) => (
            <li key={n} className="flex gap-3.5 py-3.5 border-b border-[var(--divider)]">
              <span className="w-[26px] h-[26px] rounded-full bg-[#e4f1ec] text-[var(--lime)] flex items-center justify-center text-xs font-semibold shrink-0">{n}</span>
              <div><b className="font-medium block">{t}</b><span className="text-xs text-secondary">{d}</span></div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-1"><h2 className="text-[21px]">Markets</h2><span className="text-xs text-muted">Sample data</span></div>
        <div className="flex gap-1 border-b border-[var(--divider)]">
          {["Trending","New","Volume","Filling"].map((x,i) => (
            <Link key={x} href="/books" className={"px-3 py-2.5 text-sm " + (i===0 ? "text-[var(--text)] font-semibold border-b-2 border-[var(--lime)]" : "text-secondary")}>{x}</Link>
          ))}
        </div>
        {sampleMarkets.map(m => <MarketRow key={m.t} m={m} />)}
        <Link href="/books" className="btn btn-secondary btn-full mt-3.5">See all markets</Link>
      </section>

      <section>
        <h2 className="text-[21px] mb-2.5">Featured on Pool Pilot</h2>
        <div className="card p-4 flex items-center gap-4">
          <SeatRing taken={7} total={18} size={86} label="MCFL seats" />
          <div className="min-w-0 flex-1">
            <div className="flex gap-2 items-center flex-wrap"><b className="text-lg">{"$"}{MCFL.symbol}</b><span className="pill pill-fill">Live</span></div>
            <p className="text-xs text-secondary mt-1">{MCFL.name}</p>
            <Link href="/books/book-mcfl-001" className="text-xs text-lime mt-2 inline-block">Open book →</Link>
          </div>
        </div>
      </section>

      <PoolPilotLaunches />
      <TrendingList title="Trending on Robinhood Chain" limit={6} />

      <section>
        <h2 className="text-[21px] mb-2.5">Built by a real person</h2>
        <div className="card p-4"><b className="font-semibold">Pool Pilot operator</b><p className="text-xs text-secondary mt-1.5">Operator, fees, holdings, and security disclosures are available on the About and Security pages.</p><Link href="/about" className="text-xs text-lime mt-3 inline-block">About Pool Pilot →</Link></div>
      </section>

      <p className="text-[11px] text-muted border-t border-[var(--divider)] pt-5 leading-relaxed">Coins launched on Pool Pilot can lose all of their value. Only use money you can afford to lose. Pool Pilot is a tool, not financial advice.</p>
    </div>
  );
}
