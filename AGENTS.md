# Repository guidance

- Read [docs/product.md](docs/product.md) when defining or changing product behavior. Read [docs/decisions/0001-foundation.md](docs/decisions/0001-foundation.md) when making architecture, data, or authentication choices.
- The code currently on `main` is the legacy Next.js/Prisma/MySQL implementation. The agreed SvelteKit/PostgreSQL/Drizzle target is documented but not yet implemented. Keep this distinction clear in code changes and documentation.
- Keep each doctor's patient and encounter records isolated. Check ownership on every record operation; signing in alone does not authorize access to a record.
- Do not put real patient information in fixtures, logs, analytics, screenshots, examples, or issue text.
- Record a new product or architecture decision in `docs/` when implementation changes an agreed boundary. Keep this file short and point to the relevant document instead of duplicating it.
