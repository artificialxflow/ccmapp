# Security Specification for Comprehensive Center Management (CCM)

## Data Invariants
- A user profile must match the authenticated `request.auth.uid`.
- A center must have an `ownerId` matching the creator's UID.
- An appointment must reference a valid center and be created by an authenticated user.
- Roles can only be upgraded by an ADMIN or through a specific verification flow (not implemented yet, default to USER).

## The Dirty Dozen Payloads
1. **Identity Spoofing**: Attempt to create a user profile with a UID different from `auth.uid`.
2. **Role Escalation**: A user attempting to update their own `role` to `ADMIN`.
3. **Ghost Fields**: Adding `isVerified: true` to a center creation payload when not an admin.
4. **Unauthorized Center Update**: A user attempting to update a center they don't own.
5. **Illegal Appointment Cancellation**: A user attempting to cancel someone else's appointment.
6. **ID Poisoning**: Using a 2KB string as a center ID.
7. **Resource Exhaustion**: Sending a 1MB string in the `fullName` field.
8. **Orphaned Appointment**: Creating an appointment for a center ID that doesn't exist.
9. **Timestamp Spoofing**: Sending a manual `createdAt` string instead of `serverTimestamp()`.
10. **State Shortcutting**: Skipping `PENDING` and creating an appointment as `COMPLETED`.
11. **Shadow Update**: Adding an undocumented `internal_notes` field to an appointment update.
12. **PII Leak**: A guest user attempting to `list` all users to scrape phone numbers.

## Test Runner (Draft Rules Strategy)
The rules will be evaluated using the "Red Team Audit" logic.
All write operations will use `isValid[Entity]` helpers.
Update operations will use `affectedKeys().hasOnly()`.
Access will be tiered by RBAC.
