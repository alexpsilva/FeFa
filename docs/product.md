# Product brief

Status: First-release product scope agreed, 2026-09-23. Launch operations handled manually are described below.

## Purpose

FeFa helps an individual doctor maintain and retrieve their own patients' clinical records during care. The core task is to find a patient quickly, capture a clinical encounter, and understand that patient's history on a desktop or mobile browser.

FeFa is intended for doctors practicing in Brazil. The first interface is in Brazilian Portuguese. It is an online service; offline access and synchronization are outside the initial product.

## Users and ownership

- **Doctor:** The primary and only clinical user for the first release. Doctors are manually invited, and multiple doctors are supported from launch. Each has an account and owns a private set of patient records.
- **Operator:** The product owner manually manages doctor invitations, access removal, account recovery, and restoration of soft-deleted records. This role does not imply permission to read clinical content.
- **Patient:** The subject of a record, not an application user in the first release.
- The same person may appear in separate doctors' private patient lists. No cross-doctor search, sharing, or clinic workspace is planned for the first release.
- Administrative or support access to clinical data is not assumed. Any such capability would need an explicit product and privacy decision.

## First-release scope

1. A manually invited doctor signs in with Google and can access only their own records. MFA is required as an account-use policy, but FeFa accepts Google Sign-In as currently implemented and does not itself verify that Google used a second factor. The operator can add or deactivate a doctor's access. Deactivation retains the doctor account and leaves all patient and encounter records untouched.
2. A doctor can create a patient record, find patients in their own list, open a patient's record, and correct patient details. Only a patient name is required at creation. CPF, date of birth, address, and a general patient note are optional fields.
3. Before patient creation, the interface warns about existing records with the same name and/or CPF in that doctor's list. A warning never blocks creation. Names and CPFs are not uniqueness constraints; the interface must help doctors distinguish records with the same name.
4. A doctor can add a dated clinical encounter with one free-text note to a patient, review the patient's encounters in chronological order, and correct an encounter with an attributable change history.
5. A doctor can soft-delete their patients and encounters. Soft-deleted records are retained and excluded from ordinary lists and histories. Soft-deleting a patient also hides that patient's retained encounters from normal access; restoring the patient makes the retained, non-deleted encounters visible again. Only operational support can restore deleted records through a manual process. There is no hard-delete operation for doctors, patients, or encounters.
6. The interface communicates save results and errors clearly, and protects entered text against accidental loss during ordinary use.
7. All core tasks work at practical mobile and desktop widths, including navigation, search, reading a history, and entering an encounter.

An **encounter** means a clinical contact recorded in the patient's history. It is not a booking or calendar event. The first release contains doctor-entered text records; it does not need file uploads or a patient-facing portal. Patient name is the only required identity field; CPF, date of birth, address, and note are optional.

### Outside the first release

- Appointment scheduling, calendars, reminders, and billing.
- Patient accounts or patient self-service.
- File attachments, imaging, and document storage.
- Shared clinic records, staff roles, or referrals between doctors.
- Offline use, a native mobile app, or a separate public API.
- Dedicated medication, prescription, insurance, or clinical decision-support modules. Their presence in historical branches does not make them first-release requirements.
- In-app restoration requests, duplicate-record resolution, automated invitations or account recovery, record export, and automated retention or erasure workflows. The operator handles the relevant launch tasks manually.

These boundaries can be revisited through a new product decision. They are not claims that the features will never be built.

## Experience requirements

- The interface uses Brazilian Portuguese, including labels, validation messages, and date display. Date and time storage and display rules must be defined before implementation so encounters are not assigned to the wrong day.
- The layout adapts to narrow and wide browser windows without hiding clinical content or requiring horizontal scrolling for the core workflows.
- Forms have visible labels, useful validation messages, keyboard support, and a clear save state. Destructive actions require explicit confirmation and a defined recovery or correction path.
- A doctor's patient search and history should be easy to scan. Avoid requiring the doctor to navigate through scheduling concepts to record care.
- A possible duplicate is a warning for the doctor to review, never a reason to reject a patient record.
- Clinical text is displayed faithfully, without silent truncation or transformation.

## Privacy, safety, and reliability requirements

Health information is sensitive personal data. Product design and deployment must be reviewed for Brazilian privacy obligations before use with real patient data.

- Every patient and encounter operation is scoped to the signed-in doctor. A guessed URL or record ID must not reveal or change another doctor's information.
- The product records who created, changed, soft-deleted, or restored a clinical record and when. Soft deletion must retain the record. No hard-delete operation is available in the product.
- Clinical text must not be sent to general analytics or included in routine application logs, URLs, or test fixtures.
- Data must be recoverable from backups. A restoration procedure must be exercised before production use.
- The application must show failures honestly. A failed save must not appear successful, and previously saved text must remain available after a transient error.
- Patient search and encounter history must remain usable at a target scale of tens of thousands of patients per doctor and hundreds of encounters per patient. This is a capacity target, not a claim about expected launch usage or a response-time guarantee.

## Release acceptance

The first release is ready for a controlled pilot when manually invited doctors can complete the core patient and free-text encounter workflow on desktop and mobile; access boundaries are verified with at least two independent doctor accounts; duplicate warnings do not block creation; soft deletion retains records and an operator can restore them; failed writes and recovery are understandable; and privacy, backup restoration, and clinical-record correction processes are documented and exercised.

This is a product release criterion, not a statement about the current `main` implementation.

## Later product work

The operator will handle restoration requests, mistaken or duplicate patient records, invitations, account recovery, and the Google-account MFA policy manually at launch. Automated workflows for these tasks, export, retention, and any legally required erasure process are outside the first release. Those processes need domain and legal review if introduced; there is no product hard-delete operation.

Measurable response-time and availability targets can be set during capacity planning. The stated patient and encounter volumes remain the design target.
