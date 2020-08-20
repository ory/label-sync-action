
Origami Service Makefile
========================

Common tools for building and running Origami services.

[![NPM version](https://img.shields.io/npm/v/@financial-times/origami-service-makefile.svg)](https://www.npmjs.com/package/@financial-times/origami-service-makefile)
[![Build status](https://img.shields.io/circleci/project/Financial-Times/origami-service-makefile.svg)](https://circleci.com/gh/Financial-Times/origami-service-makefile)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)][license]


Table Of Contents
-----------------

  - [Usage](#usage)
  - [Configuration](#configuration)
  - [Contact](#contact)
  - [Licence](#licence)


Usage
-----

Origami Service Makefile provides a set of common tools that are required for building and running Origami services. To use the Makefile, copy the [`boilerplate.mk`](boilerplate.mk) file to the root of your repo and name it `Makefile`:

```sh
curl https://raw.githubusercontent.com/Financial-Times/origami-service-makefile/master/boilerplate.mk > Makefile
```

Now install this module and save it to your `package.json` file:

```sh
npm install --save @financial-times/origami-service-makefile
```

You should now be able to run the following commands:

```
make install       # Install application dependencies
make verify        # Verify code using static analysis
make test          # Run unit and integration tests
make run           # Run the application as if in production
make run-dev       # Run the application and restart when files change
make deploy        # Deploy the application to QA
make release       # Run required tasks before a release goes live
make promote       # Promote a QA deploy to production
make auto-version  # Auto-version the repo and create a GitHub release
make cmdb-update   # Update CMDB endpoints for the application
make release-log   # Create a release log for the application in Salesforce
make grafana-pull  # Pull changes from the Grafana dashboard
make grafana-push  # Push changes to the Grafana dashboard
```


Configuration
-------------

The Origami Service Makefile can be configured with [environment variables] either in an extending Makefiles or externally. Some configurations are required to never be committed for security reasons, these have been separated below.

### Safe Configurations

These configurations are safe to include in your extending `Makefile`, and _should_ be kept there to avoid repetition of their values:

  - `SERVICE_NAME`: The human readable name for this service, used in many of the tasks. E.g. `Origami Image Service`
  - `SERVICE_SYSTEM_CODE`: The system code for this service, used in many of the tasks. E.g. `origami-image-service`
  - `SERVICE_SALESFORCE_ID`: The Salesforce ID associated with this service, used to create release logs
  - `HEROKU_APP_QA`: The Heroku application ID for QA. E.g. `origami-image-service-qa`
  - `HEROKU_APP_EU`: The Heroku application ID for production EU. E.g. `origami-image-service-eu`
  - `HEROKU_APP_US`: The Heroku application ID for production US. E.g. `origami-image-service-us`
  - `EXPECTED_COVERAGE`: A number indicating the expected code coverage of the application's unit tests. Defaults to `90`
  - `INTEGRATION_TIMEOUT`: The time in milliseconds that each integration test is allowed to run for. Defaults to `5000`
  - `INTEGRATION_SLOW`: The time in milliseconds at which each integration test is considered slow. Defaults to `4000`
  - `INTEGRATION_FLAGS`: Any additional flags that must be passed to `mocha` when running the integration tests.
  - `REGION`: The region the application is running in, used in release logs and determining which release tasks are required. One of `QA`, `EU`, or `US`
  - `RELEASE_LOG_ENVIRONMENT`: The Salesforce environment to include in release logs. One of `Test` or `Production`
  - `GRAFANA_DASHBOARD`: The Grafana dashboard ID for the application
  - `GITHUB_RELEASE_REPO`: The GitHub repository in `owner/name` format. This is used for auto-versioning

### Private Configurations

These configurations must never appear in your source code, and so should be set in CI, or Heroku, or an `.env` file locally:

  - `CMDB_API_KEY`: The API key to use when performing CMDB operations
  - `RELEASE_LOG_API_KEY`: The change request API key to use when creating and closing release logs
  - `GRAFANA_API_KEY`: The API key to use when performing Grafana operations
  - `GITHUB_RELEASE_USER`: The user who will create releases on GitHub for repositories which use the auto-version task. This user must have write access to `GITHUB_RELEASE_REPO`
  - `GITHUB_RELEASE_TOKEN`: A token for `GITHUB_RELEASE_USER` which has `repo` level access


Contact
-------

If you have any questions or comments about this module, or need help using it, please either [raise an issue][issues], visit [#origami-support] or email [Origami Support].


Licence
-------

This software is published by the Financial Times under the [MIT licence][license].



[#origami-support]: https://financialtimes.slack.com/messages/origami-support/
[issues]: https://github.com/Financial-Times/origami-service-makefile/issues
[license]: http://opensource.org/licenses/MIT
[origami support]: mailto:origami-support@ft.com
