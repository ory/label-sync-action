const github = require('@actions/github')
const core = require('@actions/core')
const fs = require('fs')

const sync = require('github-label-sync')
const token = core.getInput('GITHUB_TOKEN') || process.env.GITHUB_TOKEN
const dry = core.getInput('dry') !== 'false'
const forced = core.getInput('forced') === 'true'
const { repo, owner } = github.context.repo

const labels = require('./default-labels.json')

let config = core.getInput('config') || '.github/labels.json'

if (fs.existsSync(config)) {
  const extra = JSON.parse(fs.readFileSync(config).toString())
  labels.push(...extra)
}

const milestones = new Array(10).fill(0).map((v, k) => ({
  name: `corp/m${k + 2}`,
  description: `Up for M${k + 2} at Ory Corp.`,
  color: '6274F3'
}))

labels.push(...milestones)

sync({
  accessToken: token,
  repo: `${owner}/${repo}`,
  dryRun: dry,
  allowAddedLabels: !forced,
  labels
})
  .then((diff) => {
    console.log(
      'Removing labels:',
      diff
        .filter(({ type }) => type === 'added')
        .map(({ name }) => name)
        .join(',')
    )
    console.log(
      'Adding labels:',
      diff
        .filter(({ type }) => type === 'missing')
        .map(({ name }) => name)
        .join(',')
    )
    console.log(
      'Changed labels:',
      diff
        .filter(({ type }) => type === 'changed')
        .map(({ name }) => name)
        .join(',')
    )
  })
  .catch((err) => console.error(JSON.stringify(err, null, 2)))
