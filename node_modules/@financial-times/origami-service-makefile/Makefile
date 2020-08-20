# Origami Service Makefile
# ------------------------
# This section of the Makefile should not be modified, it includes
# commands from the Origami service Makefile.
# https://github.com/Financial-Times/origami-service-makefile
include index.mk
# [edit below this line]
# ------------------------

npm-publish:
	@npx -p npm-prepublish@^1 npm-prepublish --verbose
	@npm publish --access public
