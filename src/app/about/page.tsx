import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="space-y-5 pb-4 max-w-lg">
      <h1 className="font-display text-xl font-bold">About</h1>
      <p className="text-secondary text-sm leading-relaxed">
        Pool Pilot helps you launch a coin with up to 18 teammates on Robinhood Chain.
        Friends sit tradeable chairs on a shared Uniswap v3 pool. You keep the token.
        You sign every step.
      </p>
      <Link href="/launch" className="btn btn-primary">
        Launch a coin
      </Link>
    </div>
  );
}
