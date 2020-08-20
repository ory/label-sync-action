# labelsync-action

```yaml
name: Synchronize Issue Labels

on:
  workflow_dispatch:
  push:
    branches:
      - master

jobs:
  milestone:
    name: Synchronize Issue Labels
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Synchronize Issue Labels
        uses: ory/label-sync-action@v0
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          dry: false
          forced: true
```
