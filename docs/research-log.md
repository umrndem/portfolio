# Research log

## Scope

Discovery was performed against the authenticated GitHub account `umrndem` and locally available repositories. GitHub API and Git inspection were used read-only. No inspected repository was changed.

## Identity and access

- GitHub account: `umrndem`; display name returned by the API: Muhammad Umar Nadeem.
- GitHub account context returned by the API: FAST NUCES, Islamabad; four public repositories were reported by the profile endpoint.
- `gh auth status` confirmed an authenticated account with repository read access. Token material was not recorded.
- Local Git identity matched the GitHub display name; the local email was not copied into portfolio-facing documentation.

## Repositories considered

GitHub listed seven owned repositories: `sentinel`, `the-matootoo-project`, `ets-website`, `snakinesis`, `financial-tick-data-pipeline`, `rideflow`, and `DataPulse`. A separate affiliation query found three additional accessible repositories: `ammaarrahmed/Mehmaan`, `razq8/ets-scroll-world`, and `Sami-Shahid-001/Movies-Data-Manager-DSA`.

Local repositories inspected read-only included:

- `/home/umrndem/nexus`, whose remote is `umrndem/sentinel`.
- `/home/umrndem/ets-website`, whose remote is `umrndem/ets-website`.
- `/home/umrndem/the-matootoo-project`, whose remote is `umrndem/the-matootoo-project`.

The local `ets-website` checkout had one uncommitted documentation file when inspected. It was not treated as committed evidence and was not modified.

## Methods and evidence sources

- `gh auth status`, `gh api user`, `gh repo list`, and `gh repo view` for account, visibility, ownership, URLs, dates, default branches, and descriptions.
- GitHub repository trees and selected file contents for public repositories.
- GitHub language, contributor, branch, tag, and commit endpoints.
- Local `git status`, `git log`, remotes, file inventories, package manifests, architecture documents, and project READMEs for cloned repositories.
- Selected implementation files and tests where they materially supported a skill or architecture claim.

## Limitations

- GitHub API repository counts and commit/contributor counts are snapshots, not measures of quality.
- README claims were checked against selected source files, but not every line of every repository was audited.
- No deployment, production database, issue tracker, organization repository, or external employment record was independently verified.
- Private repositories were summarized without copying private implementation details.
- The profile’s fourth-year status and FAST NUCES Islamabad context are user-provided request context, not inferred from code.

## Privacy decisions

- No environment values, access tokens, private source code, private media, database contents, employee records, customer data, or internal company operational details were copied.
- `sentinel`, `ets-website`, and `the-matootoo-project` are marked private where relevant. Public presentation recommendations for private work are conditional on user approval and redaction.
- The local Git email was not promoted to a contact section.
