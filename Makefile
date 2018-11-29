GPG_KEYS := CF8E9976 8F8B408A632A5AEC


.PHONY: secrets.md.gpg
secrets.md.gpg:
	gpg --keyserver pgp.mit.edu --keyserver-options timeout=20 --recv-keys $(GPG_KEYS) || true
	gpg --yes --output $@ --encrypt $(addprefix --recipient ,$(GPG_KEYS)) secrets.md

.PHONY: secrets.md
secrets.md:
	gpg --yes --output $@ --decrypt secrets.md.gpg

