# Security Policy

## Overview

This is a static website with no server-side code, database, or runtime environment.
Security considerations focus on:

1. **Repository security** — protecting source code and preventing credential exposure
2. **Build pipeline security** — ensuring dependencies are safe
3. **Deployment security** — AWS S3/CloudFront hardening
4. **AI agent access** — controlling what crawlers can read

## Reporting a Vulnerability

If you discover a security vulnerability, **please do NOT open a public GitHub issue**.

### Responsible Disclosure

**Email:** security@openinnova.it

**Response time:** We aim to respond within 72 hours.

**Please include:**
- Description of the vulnerability
- Steps to reproduce (if applicable)
- Affected component (e.g., build process, S3 config, dependencies)
- Potential impact
- Your recommendation for fixing it (optional)

Your report will be treated confidentially and acknowledged promptly.

---

## Security Practices

### 1. Repository Security

**No Credentials in Git**

- AWS credentials are **never** stored in the repository
- API keys, personal tokens, and sensitive config are **never** committed
- Private company data (partita IVA, fiscal codes, personal info) is gitignored

Verify no credentials exist:
```bash
git log -S "AKIA" --oneline      # AWS access keys
git log -S "aws_secret" --oneline
git log --all -S "BEGIN PRIVATE"  # SSH keys
```

**Data Separation Strategy**

- `src/` → MIT licensed, open source, safe to commit
- `assets/` → proprietary brand assets, gitignored
- `content/` → proprietary marketing copy, gitignored
- `data/company.json` → private fiscal data, gitignored
- `data/company.example.json` → public template, committed for reference


**Protected Branches**

- `main` branch requires pull request reviews before merge
- No force-pushing to main
- All commits must pass automated checks

### 2. Dependency Security

**Automated Audits**

```bash
npm audit                       # Check for vulnerabilities
npm audit --audit-level=high    # Fail on high/critical
```

Run on every CI pipeline execution and before deployment.

**Dependency Updates**

- Regular updates: npm audit monthly
- Security patches: applied immediately
- Breaking changes: evaluated for compatibility

**Locked Dependencies**

- `package-lock.json` is committed
- Ensures reproducible builds across environments
- Dependency versions are locked, not floating

### 3. Build & Output Security

**Static HTML Only**

- No server-side code execution
- No database queries
- No dynamic content generation at runtime
- All content is pre-rendered during `npm run build`

**Build Artifacts**

- `dist/` directory contains only `.html`, `.css`, `.js` (if added), and static assets
- No sensitive data in dist/ (verified before deployment)
- `dist/` is not committed; rebuilt fresh for each deployment

### 4. AWS S3 & CloudFront Security

**Bucket Configuration**

- **Bucket policy:** Allow `s3:GetObject` only (no PutObject, DeleteObject from public)
- **Block Public Access:**
  - BlockPublicAcls: `true`
  - IgnorePublicAcls: `true`
  - BlockPublicPolicy: `false` (to allow our own policy)
  - RestrictPublicBuckets: `false`
- **Versioning:** Enabled (allows rollback)
- **MFA Delete:** Recommended (requires MFA to delete versions)

See `docs/deployment-aws-s3.md` for detailed setup.

**Credential Management**

- AWS credentials stored in:
  - **Best:** AWS SSO / IAM Identity Center
  - **Good:** CI/CD environment secrets (GitHub Actions)
  - **Acceptable:** Local `~/.aws/credentials` (machine-specific)
- Credentials are NEVER passed as arguments to scripts
- Credentials are NEVER in `.env` files committed to git

**CloudFront (when used)**

- HTTPS mandatory (TLS 1.2+)
- Custom domain via Certificate Manager
- WAF rules to block common attacks (optional but recommended)
- Origin access identity (OAI) restricts direct S3 access

### 5. AI Agent Access Control

**Allowed Crawlers**

`public/robots.txt` explicitly allows:
- GPTBot (OpenAI)
- Google-Extended (Google)
- ClaudeBot (Anthropic)
- All other standard crawlers

```
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /
```

**AI-Readable Format**

- `public/llms.txt` provides structured description for AI agents
- Follows emerging standard for AI agent discoverability
- Does NOT contain sensitive data

### 6. Scanning & Monitoring

**Automated Checks**

- `npm audit` on every commit (CI pipeline)
- No high/critical vulnerabilities allowed
- Dependency graph reviewed monthly

**Secrets Detection**

- `git log -S` scanning for credential patterns
- Pre-commit hooks can detect `.env` files or AWS key patterns

**Rate Limiting (via CloudFront)**

- If deployed with CloudFront: implement request rate limiting rules
- Protects against DDoS and automated attacks

---

## Secure Deployment Checklist

Before deploying to production:

- [ ] `npm audit` passes with no high/critical issues
- [ ] `git log -S "AKIA"` returns no AWS credentials
- [ ] `git log -S "aws_secret_access_key"` returns nothing
- [ ] No `.env*` files in git history
- [ ] `dist/` does not contain sensitive data
- [ ] S3 bucket policy is set correctly (GetObject only)
- [ ] BlockPublicPolicy is `false`, other block settings are `true`
- [ ] CloudFront HTTPS redirect is enabled (if using CloudFront)
- [ ] robots.txt allows intended crawlers
- [ ] Sitemap is present in `dist/sitemap-index.xml`
- [ ] All environment variables are stored as CI/CD secrets, not in code

---

## Incident Response

If a vulnerability is discovered:

1. **Immediate:** Disable affected resource if possible
2. **Assessment:** Determine scope and impact (within 24 hours)
3. **Fix:** Develop and test a patch
4. **Deploy:** Roll out fix with new build
5. **Notify:** Inform affected parties (if applicable)
6. **Review:** Post-incident review to prevent recurrence

---

## Third-Party Dependencies

See `NOTICE` and `package.json` for all third-party software used.

- Astro: MIT license, well-maintained, active security updates
- @astrojs/sitemap: MIT license, part of official Astro ecosystem
- Other: Each dependency is reviewed for security status before inclusion

---

## Questions or Concerns?

**Security issues:** security@openinnova.it (confidential)
**General questions:** dev@openinnova.it

---

**Last updated:** March 2026
**Security policy version:** 1.0
