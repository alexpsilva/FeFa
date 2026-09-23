# 0001: Product and technical foundation

Status: Accepted, 2026-09-23. Implementation pending.

## Context

FeFa serves individual doctors who use a browser on desktop or mobile to manage their own patients. The initial product is for Brazil, is online only, and does not share patient records between doctors. It handles sensitive health information. The repository currently contains several framework experiments; this decision describes the target architecture independent of their current completeness.

## Decisions

- Build one SvelteKit application in TypeScript. Use server-rendered pages and server-side form handling for the core record workflows. Add browser-side interactivity where it improves the task.
- Use PostgreSQL as the system of record and Drizzle for typed database access and versioned, reviewable migrations.
- Keep authentication JWT based. Put a short-lived access JWT in a `Secure`, `HttpOnly`, `SameSite` cookie. Include only an account identifier and validity claims, never clinical data or mutable access permissions.
- Use a rotating refresh token with a server-side record. Check that record when refreshing, rather than querying an authentication session on every request. A revocation can therefore leave an access JWT usable until its expiry. Start with an approximately 15-minute access lifetime; validate the exact duration against clinical workflow before launch.
- Check doctor ownership on every patient and record read or write. Token validation establishes identity, not permission to access an individual record.
- Support multiple, separately owned doctor accounts at launch. Google Sign-In is the only supported sign-in method; an operator manually invites doctors, deactivates access, and handles account recovery. MFA is required as a doctor-account policy, but FeFa accepts Google Sign-In as currently implemented and does not verify that a second factor was used. Deactivation retains the doctor account and leaves its patient and encounter records untouched.
- Soft-delete patient and encounter records; expose no hard-delete operation for doctors, patients, or encounters. Retain deletion metadata and exclude soft-deleted records from ordinary views. A deleted patient also hides their retained encounters from normal access. Only operational support can restore deleted records through a manual process, without an implied right to read clinical content.
- Keep the product online only. Do not design local clinical-data storage or synchronization as part of the initial system.
- Keep the application as a modular monolith. A separate API service, mobile application, and distributed services are not required for the stated scope.

## Product obligations that guide implementation

- Provide a clear, usable interface at desktop and mobile widths, with accessible forms, navigation, feedback, and errors.
- Protect clinical records throughout their lifecycle: access control, auditability, soft deletion, secure configuration, and recoverable backups need explicit designs before launch.
- Treat hosting location, service providers, and any international data transfers as part of the Brazil/LGPD deployment review. A Brazilian region is preferred; this document does not claim that LGPD requires all storage to be in Brazil.
- Keep patient data out of tokens, logs, analytics, screenshots, and development fixtures.

## Consequences and follow-up decisions

- The existing Next.js/Prisma/MySQL code is a source of behavior and migration data, not the target stack. Migration work needs a feature and data parity plan before code is replaced.
- Select an authentication implementation that supports the agreed JWT and refresh-token behavior. The previous suggestion of database-backed sessions on every request is superseded.
- Define exact token lifetimes, refresh-token rotation and revocation behavior, and Google account linking before implementing authentication. Removing doctor access must revoke refresh capability, while an issued access JWT may remain valid until expiry. Invitations and account recovery are manual operator tasks at launch.
- Define hosting, backup restoration, audit events, and incident processes before using real patient data. Automated retention, export, and erasure workflows are outside the first release.
