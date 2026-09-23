# FeFa

FeFa is a browser-based medical record system for individual doctors in Brazil. Its goal is to make it clear and practical to find a patient, record a clinical encounter, and review that patient's history on desktop and mobile screens.

Each doctor has a separate account and a separate set of patient records. The product is online only. The first release focuses on doctor-entered text records and a Brazilian Portuguese interface. Patient information is sensitive personal data; privacy, access control, and recoverability are product requirements from the start.

## Project documents

- [Product brief](docs/product.md): users, goals, scope, experience requirements, release criteria, and open product questions.
- [Foundation decision](docs/decisions/0001-foundation.md): agreed application, database, and authentication direction.

Read the product brief before defining a feature. Record new product decisions there or in a focused decision document before implementing them.

## Repository status

The code currently on `main` is an earlier Next.js, React, Prisma, and MySQL implementation. The agreed direction is SvelteKit, PostgreSQL, and Drizzle. **The migration has not started.** Documentation of the target product and architecture does not imply that the current code implements them.

The current implementation can be explored with `npm install` and `npm start`, provided its existing environment and database requirements are supplied. These commands describe the legacy app, not the planned stack.

The `astro` and `js-old-school` branches are historical architecture explorations, not the chosen implementation base.
