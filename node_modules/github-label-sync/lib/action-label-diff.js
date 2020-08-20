'use strict';

module.exports = actionLabelDiff;

function actionLabelDiff(options) {
	const apiClient = options.apiClient;
	const diff = options.diff;
	const repo = options.repo;

	const actions = diff.map((diffEntry) => {
		if (diffEntry.type === 'missing') {
			return apiClient.createLabel(repo, diffEntry.expected);
		}
		if (diffEntry.type === 'changed') {
			return apiClient.updateLabel(repo, diffEntry.name, diffEntry.expected);
		}
		if (diffEntry.type === 'added') {
			return apiClient.deleteLabel(repo, diffEntry.name);
		}
	});

	return actions.filter(action => action);
}
