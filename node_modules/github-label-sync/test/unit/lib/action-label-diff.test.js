'use strict';

const assert = require('proclaim');

describe('lib/action-label-diff', () => {
	let actionLabelDiff;
	let apiClient;

	beforeEach(() => {
		const githubLabelApi = require('../mock/github-label-api');
		apiClient = githubLabelApi();

		actionLabelDiff = require('../../../lib/action-label-diff');
	});

	it('should export a function', () => {
		assert.isFunction(actionLabelDiff);
	});

	describe('actionLabelDiff(options)', () => {
		let actions;
		let options;

		beforeEach(() => {
			options = {
				apiClient: apiClient,
				diff: [],
				repo: 'foo/bar'
			};
		});

		it('should return an array', function() {
			assert.isArray(actionLabelDiff(options));
		});

		it('should convert "missing" diff entries to label API create promises', () => {
			const createPromise = Promise.resolve();
			apiClient.createLabel.returns(createPromise);
			options.diff.push({
				name: 'foo',
				type: 'missing',
				actual: null,
				expected: {
					name: 'foo',
					color: '00ff00',
					description: 'baz'
				}
			});
			actions = actionLabelDiff(options);
			assert.lengthEquals(actions, 1);
			assert.calledOnce(apiClient.createLabel);
			assert.calledWithExactly(apiClient.createLabel, options.repo, options.diff[0].expected);
			assert.strictEqual(actions[0], createPromise);
		});

		it('should convert "changed" diff entries to label API update promises', () => {
			const updatePromise = Promise.resolve();
			apiClient.updateLabel.returns(updatePromise);
			options.diff.push({
				name: 'foo',
				type: 'changed',
				actual: {
					name: 'foo',
					color: 'ff0000',
					description: 'bar'
				},
				expected: {
					name: 'foo',
					color: '00ff00',
					description: 'baz'
				}
			});
			actions = actionLabelDiff(options);
			assert.lengthEquals(actions, 1);
			assert.calledOnce(apiClient.updateLabel);
			assert.calledWithExactly(apiClient.updateLabel, options.repo, options.diff[0].name, options.diff[0].expected);
			assert.strictEqual(actions[0], updatePromise);
		});

		it('should convert "added" diff entries to label API delete promises', () => {
			const deletePromise = Promise.resolve();
			apiClient.deleteLabel.returns(deletePromise);
			options.diff.push({
				name: 'foo',
				type: 'added',
				actual: {
					name: 'foo',
					color: 'ff0000',
					description: 'bar'
				},
				expected: null
			});
			actions = actionLabelDiff(options);
			assert.lengthEquals(actions, 1);
			assert.calledOnce(apiClient.deleteLabel);
			assert.calledWithExactly(apiClient.deleteLabel, options.repo, options.diff[0].name);
			assert.strictEqual(actions[0], deletePromise);
		});

		it('should filter out invalid entries', () => {
			options.diff.push({
				type: 'invalid'
			});
			actions = actionLabelDiff(options);
			assert.lengthEquals(actions, 0);
		});

	});

});
