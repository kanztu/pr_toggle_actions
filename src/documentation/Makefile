DOCKER_IMAGE = dogmatic69/actions/documentation
DOCKER_PATH = ./
GITHUB_REPOSITORY ?= foo/bar
GITHUB_WORKSPACE ?= /github/workspace

include ../../targets/Makefile.git

.PHONY: all
all: clean build test run

.PHONY: clean
clean:
	echo "clean"

.PHONY: test
test:
	echo "done"

.PHONY: lint
lint: build
	docker run --rm -i ${DOCKER_IMAGE} run lint

.PHONY: build
build:
	docker build -t $(DOCKER_IMAGE) .

.PHONY: run
run: build
	docker run --rm \
		--env GITHUB_REPOSITORY=$(GITHUB_REPOSITORY) \
		--env INPUT_PATH=$(GITHUB_WORKSPACE) \
		--env GIT_HASH=$(GIT_HASH) \
		-v $(GITHUB_WORKSPACE):/work ${DOCKER_IMAGE}

.PHONY: debug
debug: build
	docker run --rm -it --entrypoint sh \
		--env GITHUB_REPOSITORY=$(GITHUB_REPOSITORY) \
		--env INPUT_PATH=$(GITHUB_WORKSPACE) \
		--env INPUT_COMMAND=git-$(COMMAND) \
		-v $(realpath ../../):$(GITHUB_WORKSPACE) \
		-v $(realpath ./files/src):/src \
		${DOCKER_IMAGE}
