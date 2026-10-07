export interface Searchable {
  label: string
  group: string
  /** Extra search terms that aren't shown. */
  keywords?: string
  /** Shown after the label, and searchable. */
  detail?: string
  /** Technologies etc. Searchable, and the matching ones are reported back. */
  tags?: string[]
  /** Long text (descriptions, highlights). Searchable, but ranked last. */
  body?: string
}

export interface SearchResult<T> {
  item: T
  /** Which of the item's tags the query hit, so the UI can say why it matched. */
  matchedTags: string[]
}

/**
 * How well one token matches — lower is better, `null` is no match:
 * 0 label starts with it · 1 label contains it · 2 a keyword, detail or tag
 * has it · 3 the body text has it (3+ characters only, to keep noise down).
 */
function tier(item: Searchable, token: string): number | null {
  const label = item.label.toLowerCase()
  if (label.startsWith(token)) return 0
  if (label.includes(token)) return 1
  const meta = [item.keywords, item.group, item.detail, ...(item.tags ?? [])].join(' ').toLowerCase()
  if (meta.includes(token)) return 2
  if (token.length >= 3 && item.body?.toLowerCase().includes(token)) return 3
  return null
}

/** Every word of the query must match; results are ordered by their weakest match. */
export function searchCommands<T extends Searchable>(items: T[], query: string): SearchResult<T>[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return items.map((item) => ({ item, matchedTags: [] }))

  const ranked: { item: T; rank: number }[] = []
  for (const item of items) {
    const tiers = tokens.map((token) => tier(item, token))
    if (tiers.some((t) => t === null)) continue
    ranked.push({ item, rank: Math.max(...(tiers as number[])) })
  }

  return ranked
    .sort((a, b) => a.rank - b.rank) // stable, so original order survives within a rank
    .map(({ item }) => ({
      item,
      matchedTags: (item.tags ?? []).filter((tag) => tokens.some((token) => tag.toLowerCase().includes(token))),
    }))
}
