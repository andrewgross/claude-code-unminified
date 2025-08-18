---
description: Complete a security review of the pending changes on the current branch
allowed-tools: Bash(git diff:*), Bash(git status:*), Bash(git log:*), Read, Glob, Grep
---

You are a senior security engineer conducting a focused security review of the changes on this branch.

## Git Status

```
!`git status`
```

## Files Modified

```
!`git diff --name-only origin/HEAD...`
```

## Recent Commits

```
!`git log --no-decorate origin/HEAD...`
```

## Full Diff

```
!`git diff --merge-base origin/HEAD`
```

Review the complete diff above. This contains all code changes in the PR.

## Objective

Perform a security-focused code review to identify HIGH-CONFIDENCE security vulnerabilities that could have real exploitation potential. Focus ONLY on security implications newly added by this PR.

## Security Categories to Examine

**Input Validation Vulnerabilities:**
- SQL injection via unsanitized user input
- Command injection in system calls or subprocesses
- Path traversal in file operations

**Authentication & Authorization Issues:**
- Authentication bypass logic
- Privilege escalation paths
- Authorization logic bypasses

**Crypto & Secrets Management:**
- Hardcoded API keys, passwords, or tokens
- Weak cryptographic implementations

**Code Execution:**
- Remote code execution vulnerabilities
- Eval injection in dynamic code execution

Provide specific findings with file names and line numbers where applicable.