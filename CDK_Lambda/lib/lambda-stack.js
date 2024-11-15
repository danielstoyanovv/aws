const cdk = require('aws-cdk-lib');
const sns = require('aws-cdk-lib/aws-sns');
const subs = require('aws-cdk-lib/aws-sns-subscriptions');
const sqs = require('aws-cdk-lib/aws-sqs');
const lambda_ = require('aws-cdk-lib/aws-lambda');
const lambda_event_sources = require('aws-cdk-lib/aws-lambda-event-sources');
const lambdaHandler = require("../lambda/lambda-handler")

class LambdaStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
      super(scope, id, props);

      const queue = new sqs.Queue(this, 'LambdaQueue', {
        visibilityTimeout: cdk.Duration.seconds(300)
      });

      const lambdaQueue = new lambda_.Function(this, 'lambdaQueue', {
          runtime: lambda_.Runtime.NODEJS_LATEST,
          handler: 'index.handler',
          code: lambda_.Code.fromAsset("lambda")
      });

      const SQSEventSource = lambda_event_sources.SqsEventSource.constructor(queue)

      lambdaQueue.addEventSource(SQSEventSource)

    // const topic = new sns.Topic(this, 'LambdaTopic');

    // topic.addSubscription(new subs.SqsSubscription(queue));
  }
}

module.exports = { LambdaStack }
