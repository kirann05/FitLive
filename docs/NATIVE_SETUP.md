# Native companion status and setup

## Implemented source
- SwiftUI iPhone companion requests read access to sleep, resting heart rate and HRV only.
- Reads 29 noon-to-noon windows, merges overlapping asleep intervals, excludes awake/in-bed records, and retains absence of optional signals.
- Daily summary content hashes make retries stable; upload success is displayed only after a 2xx response.
- Device credentials are stored in Keychain, not preferences. Disconnect clears the local credential.
- Watch target is an explicitly device-local set counter, not yet a synced workout logger.

## Build
Install full Xcode and XcodeGen. In `apps/ios`, run `xcodegen generate`, open `FitLive.xcodeproj`, choose your Apple development team and unique bundle identifier, enable HealthKit, then build to your iPhone. Grant only the data you want to share. A physical device with readable Health data is required for meaningful verification.

The current build machine has only Command Line Tools. Native compilation, signing, VoiceOver review, real HealthKit data comparison, background sync, and WatchConnectivity are **not verified or complete**.

## Server connection
The companion accepts an HTTPS `/api/health/sync` endpoint and a credential. Use an independently deployed Java service with an access token issued for its configured OIDC audience. Java currently provides the health-ingestion API only; it does not mirror the hosted web domain store.

The hosted web source also includes owner-scoped device token and health ingestion routes, but the private Sites access gateway can require browser sign-in before those routes. Do not assume a device bearer token bypasses that gateway. Do not publish health data publicly to work around it. Native-to-hosted-web dogfooding remains a release gate pending a supported authenticated mobile transport.

## Must verify before native beta
1. Xcode compilation and signing on real iPhone/Watch.
2. Source-priority and cross-device sleep comparison (unioning overlapping sources can overestimate when sources disagree).
3. Time zone changes and daylight-saving nights.
4. Partial permission, revoked permission, empty history, and stale data.
5. Background delivery, deleted-sample reconciliation and anchored queries.
6. End-to-end native authentication, account linking and cloud visibility.
7. Offline workout queue and WatchConnectivity reconciliation.

Apple references: [HealthKit authorization](https://developer.apple.com/documentation/healthkit/authorizing-access-to-health-data), [anchored queries](https://developer.apple.com/documentation/healthkit/hkanchoredobjectquery).
