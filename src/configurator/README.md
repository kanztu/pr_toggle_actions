# Configurator

This docker image is used to generate and check the github action workflows.

## Generate

Authenticate with github using a PAT. Once authenticated pull the latest
configurator image.

    docker pull docker.pkg.github.com/dogmatic69/actions/configurator

Once the image is download

	docker run --rm -i \
		-e ROOT_DIR=/repo \
		-v /path/to/repo:/repo \
		docker.pkg.github.com/dogmatic69/actions/configurator /src/index.js template-name

As an example, to generate the workflow file for `automation-pr` for this
repository the following command is run from the root of the repository.

	docker run --rm -i \
		-e ROOT_DIR=/repo \
		-v $(realpath .):/repo \
		docker.pkg.github.com/dogmatic69/actions/configurator /src/index.js automation-pr
