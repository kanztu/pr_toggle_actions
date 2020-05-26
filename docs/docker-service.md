<!-- NOTICE: Auto generated file! -->
# Service Action Runner [docker action]

Run CI jobs for a particular service in a mono repo

> The latest version available for this action is `de8f8fc4`. It was last
updated on **Tue May 26 2020**.

## Inputs

#### service

The name of service (folder name relative to root)

- required: true
- default: null

#### targets

targets to call in the makefile

- required: true
- default: lint test


## Examples

As a step in pre-existing job.

  - uses: actions/checkout@master
  - ... other steps
  - uses: dogmatic69/actions@de8f8fc4
    with:
      service: foobar
      targets: foobar


This simple job example has the bare minimum required to run.

  service-action-runner:
    name: Service Action Runner
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: dogmatic69/actions@de8f8fc4
        with:
          service: foobar
          targets: foobar

This example has all possible inputs, with dummy data.

  service-action-runner:
    name: Service Action Runner
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@master
        - uses: dogmatic69/actions@de8f8fc4
        with:
          service: foobar
          targets: foobar
