#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { LambdaStack } = require('../lib/lambda-stack');

const app = new cdk.App();
new LambdaStack(app, 'LambdaStack', {
        env: {
            account: "971422719771",
            region: "us-east-1",
        }
    }
);
