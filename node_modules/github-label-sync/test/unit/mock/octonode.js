'use strict';

const sinon = require('sinon');

module.exports = {
	client: sinon.stub().returns({
		del: sinon.stub(),
		get: sinon.stub(),
		patch: sinon.stub(),
		post: sinon.stub(),
		requestDefaults: {
			headers: {}
		},
	})
};
