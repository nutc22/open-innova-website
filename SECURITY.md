# Security Policy

## Overview

This is a fully static website: no server-side code, no database, no runtime
environment. Pages are generated at build time with Hugo and served from AWS S3
behind CloudFront over HTTPS.

Attack surface is intentionally minimal:

- No cookies, no sessions, no authentication
- No forms posting to a backend
- No external scripts, fonts or CDNs (CSP: `default-src 'self'`)
- JavaScript is a small hand-written vanilla file, minified and integrity-hashed (SRI)
- The S3 bucket only allows `GetObject` through CloudFront

## Reporting a vulnerability

If you find a security issue with this site, please email
**info@daniele.nucciarelli.it** with a description and, if possible, steps to
reproduce. You will get a reply as soon as possible.

Please do not open public issues for security reports.
