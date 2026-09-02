# domainsvault Agent Guidance

## Identity safety

- Use the `chrishacia` GitHub identity for this repository.
- Do not use the `ten-cmh` identity for personal-project work.


## Authentication and identity security (mandatory)

Authentication, authorization, account linking, session management, credential recovery, and identity-provider changes are security-boundary work. Treat framework defaults as implementation details to verify, not proof that a flow is secure.

### OAuth and OpenID Connect

- Use the authorization-code flow. Public and native clients must use PKCE with `S256`; confidential clients should also use PKCE whenever the provider supports it. Do not add implicit or resource-owner-password grants.
- Production redirect and callback URIs must be exact, pre-registered HTTPS allowlist entries on the canonical application/API domains. Never derive a security-sensitive origin from an untrusted `Host`, forwarded header, request URL, query value, or arbitrary `returnTo`/callback parameter. Allow only explicit loopback development exceptions and exact approved native-app links.
- Every authorization transaction must use a cryptographically random, transaction-specific value with at least 128 bits of entropy. `state` must be short-lived, single-use, integrity protected, bound to the initiating browser/session and intended provider, and consumed atomically. OIDC flows must validate a transaction-specific `nonce`. Reject missing, malformed, expired, mismatched, future-dated, or replayed values.
- Bind callbacks to the intended provider/issuer and defend multi-provider flows against mix-up attacks. Validate issuer, audience, authorized party/client, signature and algorithm, expiration/not-before/issued-at, nonce, and provider subject as applicable.
- Identify accounts by the stable `(provider, provider subject)` pair. Do not silently create, merge, or link accounts based only on an email address. Any email used for identity decisions must be explicitly verified by the provider. Linking another login method requires a live authenticated session, recent reauthentication, an explicit user action, and a signed or server-stored single-use linking transaction bound to that user.
- Callback handlers must fail closed and safely handle denial, malformed responses, provider errors, timeouts, duplicate callbacks, conflicts, and partial database failure. Do not expose authorization codes, tokens, secrets, raw provider payloads, or sensitive exception details in URLs, client errors, analytics, or logs.
- Native applications must use the system browser and PKCE. Prefer claimed HTTPS universal/app links; if a custom scheme is necessary, validate the exact scheme, host, path, platform, and initiating state. Exchange browser results only through short-lived, hashed, single-use codes.
- Store provider access or refresh tokens only when a documented feature requires them. Encrypt required provider tokens at rest, restrict scopes to the minimum, and support revocation/rotation.

### Sessions, tokens, passwords, and recovery

- Rotate the application session after login, reauthentication, account linking, recovery, and privilege changes. Browser credentials belong in `HttpOnly`, `Secure`, appropriately scoped `SameSite` cookies; do not put bearer or refresh tokens in URLs, `localStorage`, or `sessionStorage`. Native credentials belong in platform secure storage.
- Use short-lived access credentials. Store opaque session/refresh secrets as hashes, rotate refresh credentials atomically, detect reuse, and revoke the affected token family on replay. Logout-all, password reset, account disablement, and privilege-sensitive events must revoke applicable sessions.
- JWT verification must pin allowed algorithms and validate issuer, audience, lifetime, and a revocable/versioned session or authorization state. Authorization and privileged roles must fail closed when current server-side state cannot be verified; never preserve stale admin claims merely because a database or provider is unavailable.
- Prefer Argon2id for passwords. If bcrypt is retained, use an approved work factor, enforce its 72-byte UTF-8 input limit, support transparent rehashing, and never invent a custom password scheme. Credential failures must use generic external responses and a dummy-hash path to reduce enumeration/timing differences.
- Rate-limit authentication and recovery by both account and trusted client/network signals using a durable shared mechanism when the service can run on multiple instances. Avoid lockout designs that let attackers permanently deny service to a victim.
- Password/reset/verification/invitation secrets must come from a CSPRNG, contain at least 128 bits of entropy, be stored hashed, expire quickly, be single-use, and be consumed atomically. Successful recovery must revoke existing sessions and notify the account owner.
- Require phishing-resistant MFA/passkeys or an explicitly documented compensating control for privileged or administrative access.

### Required verification

- Auth changes require a threat-model note plus focused tests for: exact redirect allowlists; untrusted host/forwarded headers; open redirects; missing/mismatched/expired/replayed state; PKCE downgrade; wrong provider/issuer/audience; invalid or unverified email claims; account-link confusion; callback failure and retry; refresh replay/concurrency; session fixation/revocation; disabled users; CSRF; enumeration/timing; and rate-limit behavior.
- Validate production auth topology at startup or deployment, including canonical origins, HTTPS, proxy trust, cookie flags, provider callback registrations, secret presence/strength, and disabled test/development bypasses.
- Do not weaken these controls, add a new provider, or change identity-merge semantics without explicit security review, regression tests, and Chris's approval.

Standards baseline: [OAuth 2.0 Security Best Current Practice (RFC 9700)](https://www.rfc-editor.org/rfc/rfc9700), [PKCE (RFC 7636)](https://www.rfc-editor.org/rfc/rfc7636), [OAuth for Native Apps (RFC 8252)](https://www.rfc-editor.org/rfc/rfc8252), and [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html).
