# GitHub Rulesets Configuration

## Setup Date
October 18, 2025

## Rulesets Applied to Master Branch

### Enabled Rules

1. **Require a pull request before merging**
   - Required approvals: 1
   - Dismiss stale pull request approvals: ON
   - Require review from Code Owners: OFF
   - Require approval of the most recent reviewable push: ON

2. **Require linear history**
   - Enforces squash or rebase merging
   - Keeps git history clean and bisectable

3. **Block force pushes**
   - Prevents accidental history rewrites
   - Protects branch integrity

4. **Require conversation resolution before merging**
   - All code review comments must be marked resolved
   - Ensures no outstanding issues before merge

### Disabled Rules (For Later)

- ❌ Require signed commits (add when needed)
- ❌ Require Code Owners review (add when team grows)
- ❌ Require status checks (add with GitHub Actions)
- ❌ Automatically request Copilot review (optional)

### Bypass List

- **Role**: Maintain or higher
- **Purpose**: Allows repository owner to override in emergencies
- **Impact**: Only owner can bypass, all others must follow rules

## How to Verify Setup

1. Go to: https://github.com/Texxer/NEXUS/settings/rules
2. Should see ruleset: `master-protection` (or similar name)
3. Verify enabled rules match list above

## Future Enhancements

### Phase 2 (Week 2)
- Set up GitHub Actions CI/CD
- Enable "Require status checks to pass"
- Enable "Require branches to be up to date before merging"

### Phase 3 (Week 3+)
- Add CODEOWNERS file
- Enable "Require review from Code Owners"
- Optional: Enable Copilot code review

## Testing the Rules

After setup, test with a simple PR:

```bash
git checkout -b test/ruleset-verification
echo "# Test" >> README.md
git add README.md
git commit -m "test: Verify ruleset is working"
git push origin test/ruleset-verification
```

Then on GitHub:
1. Create PR from `test/ruleset-verification` to `master`
2. Should require approval
3. Approve your own PR
4. Should allow merge with linear history maintained
5. Delete test branch after verification

## Branch Protection Summary

```
Protected Branch: master

Requirements:
✓ Pull request required (1 approval)
✓ Dismiss stale approvals (ON)
✓ Recent push must be approved (ON)
✓ Linear history only (squash/rebase)
✓ No force pushes allowed
✓ All conversations resolved before merge

Bypasses:
✓ Owner/Maintainer role only
```

---

**Status**: ✅ Configured and ready
**Last Updated**: October 18, 2025
