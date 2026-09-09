# Native applications

Open `apps/ios/FitLive.xcodeproj`. This combined project contains the iPhone app and embedded Watch app. The checked-in project is generated from `apps/ios/project.yml`; regenerate with XcodeGen 2.46.0 after changing target structure. Shared packet types are in `apps/shared`.

## Owner setup

1. Install full Xcode and the **iOS and watchOS platforms** in Settings → Components.
2. Sign in yourself in Xcode → Settings → Accounts. Keep passwords and verification codes private.
3. Select your development team for both targets. If bundle identifiers are unavailable, change the iPhone identifier and its Watch-prefixed identifier together, including `WKCompanionAppBundleIdentifier`.
4. Connect and trust your iPhone; enable Developer Mode when requested. Build the FitLive scheme. A paired Watch is needed to exercise WatchConnectivity.
5. After the Java service is deployed, create a consented real account on FitLive web. In Account → Connections, create a device token. Copy its HTTPS backend address and one-time token into iPhone Account, then connect.
6. Confirm Health upload consent in the app and grant the desired read access in Apple’s permission sheet. Profile and device time zones must match for the current daily aggregation.

## Implemented behavior

Five SwiftUI sections read the shared account and computed daily plan. The iPhone logs check-ins, workouts, confirmed-label meals, groceries and coach requests. Program/recipe editing and richer analytics remain on the web.

Pending account saves retain their operation ID and original version in a protected file. A retry is safe after an uncertain network response. A version conflict requires refreshing and reviewing the pending input; the app does not silently apply stale data. Credentials are in Keychain, and workout drafts are stored in account-scoped protected files.

Health reads 29 noon-to-noon windows, merges overlapping asleep intervals, excludes awake/in-bed records, encodes absent HRV/RHR as null, and hashes summary content for repeat sync. Empty results are not treated as zero recovery or proof of permission. This foreground summary approach does not yet reconcile deleted records or implement background anchored delivery/source priority.

Watch sessions are stored locally and transferred to the paired phone. The phone checks an account-link identifier, shows the sets for review, and uses the packet ID as the server operation ID. The Watch receives acknowledgment only after a successful account save. Workouts retain their performed calendar date. Hardware interruption, account-switching, background delivery and acknowledgment-loss behavior still require verification.

## Verified and pending

The iPhone and Watch source each pass `swiftc -typecheck` against the installed Apple SDKs. This is stronger than syntax parsing, but is not a signed app or device test. The combined Xcode build currently reports a missing watchOS platform installation. No TestFlight/App Store build has been submitted.

Before beta: finish platform compilation, signing, final privacy manifest review, real Health comparison, DST/travel/source conflict cases, revoked/partial permissions, Watch queue recovery, VoiceOver/Dynamic Type and native/web data consistency checks.

References: [HealthKit authorization](https://developer.apple.com/documentation/healthkit/authorizing-access-to-health-data), [anchored queries](https://developer.apple.com/documentation/healthkit/hkanchoredobjectquery).
