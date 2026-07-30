# TODO.AI.md

- (tabssh/desktop repo, not this repo) desktop/README.md documents release
  binary names as `tabssh-linux-x86_64` / `tabssh-linux-aarch64`, but the
  actual release workflow (desktop/.github/workflows/release.yml) publishes
  `tabssh-linux-amd64` / `tabssh-linux-arm64`. Anyone following the desktop
  README's curl command gets a 404. Needs a fix in the desktop repo.
- (tabssh/desktop repo, not this repo) desktop/README.md and this site's
  download page both list macOS/Windows/FreeBSD/OpenBSD/NetBSD install
  instructions, but the release workflow currently only builds
  linux-amd64/linux-arm64. Either the workflow needs those targets added, or
  the README/site copy should be scoped down to Linux-only until they exist.
