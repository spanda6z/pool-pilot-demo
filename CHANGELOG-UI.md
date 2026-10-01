# UI redesign changelog (demo)

## Summary
Pons-style mobile launchpad redesign applied to `pool-pilot-demo` only. **UI and layout only.** Mock data remains. No smart-contract or signing logic (demo never had live signing).

## Design tokens
- Background `#141012`, cards `#1d1719`, borders `#2f282b`, controls `#2a2326`
- Text `#f3eeee` / `#c9bfc3` / `#9a8f93`
- Accent lime `#c6f432` on dark text
- Up `#4ade80`, down `#f87171`, warn `#fbbf24`
- Flat style: no gradients, shadows, or glow
- Radii: 12px buttons, 14px cards, 20px pills
- Fonts: Space Grotesk (display), Inter (body), `font-display: swap`

## Shell
- Top bar: logo mark (P placeholder), Security link, Connect
- Mobile bottom tabs: Home · Explore · Seats · Projects · Launch
- Centered column max-width on larger screens

## Screens mapped (demo routes)
| Spec screen | Demo route |
|-------------|------------|
| Home | `/` |
| Explore | `/books` |
| Coin page | `/books/[bookId]` |
| Seats | `/portfolio` |
| Projects | `/verify` |
| Launch | `/launch` |
| Swap | `/swap` |
| Sit | `/sit/[bookId]` |
| Security | `/security` |

## Home
- Status pill: Live on Robinhood Chain + Demo data
- Headline: “Meme with a team. Don’t meme alone.”
- Concept line + Launch / Explore CTAs
- 18-seat ring on featured book
- Stats, How it works (Name it → Mint → Seat the team), Trending list

## Not in this demo (production-only)
- Live indexer / RPC prices
- Real wallet signing (wagmi)
- `/start`, `/seat`, `/arrive`, `/sol-mint` production routes
- Real logo file (still using P mark — replace when provided)
- QR invite, live chart series

## Non-custodial
Copy and Security page still state: you sign; Pool Pilot never holds funds.
