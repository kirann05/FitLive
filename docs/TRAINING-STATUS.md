# Training implementation status — September 10, 2026

Exercise search is available beneath the input in both the active workout logger and program editor. A pinned, bundled free-exercise-db catalogue requires no API key and sends no search queries externally. Its provenance and license live in apps/web/lib/exercises/vendor. The logger filters to strength exercises; duration and distance logging are not implemented.

Results include muscle, equipment and recent set details. Users can select by touch or keyboard, or create a custom exercise. Stable exercise IDs preserve original recorded sets; uncertain legacy name matches ask for confirmation. Historical loads and repetitions are not replaced during migration.

The training update also includes set steppers, previous-set defaults, optional effort, five starter templates, repeat-last-session, kg/lb display, a rest countdown, browser voice input and an account-scoped IndexedDB queue for workout saves. Queued sessions appear in totals after synchronization. Other record types are not queued. Browser microphone support varies; voice input must be reviewed before logging.

## Validation and remaining work

54 automated web tests, type checking, lint and the production build pass. The build reports a large client chunk warning. Physical-device, microphone, offline fault-injection and cross-browser acceptance testing have not been completed. No measured claim of three-tap logging, sub-90-second sessions, or 80% zero-typing completion is made.

Remaining broader training brief: duration/distance modalities and running template; full voice command grammar and optional on-device speech engine; configurable plate inventory; full editor unit conversion; per-exercise rest defaults; background notifications when the browser is closed; comprehensive queue conflict recovery UI; repeat-session restoration across refresh; and measured performance/accessibility acceptance checks. Native watch integration and deployment remain deferred by the user.

This is an implementation milestone, not a declaration of market readiness.
