# AWS deployment handoff

No AWS resources have been created. The owner has an AWS account and is completing sign-in. Confirm the account’s plan, credit balance, eligible services, region and spending limit before provisioning. A $1 verification/payment is not proof that a Java/PostgreSQL deployment is free.

AWS changed its free-tier model in July 2025. New free plans generally end after six months or credit exhaustion. Existing older accounts have different service allowances. Check the actual Billing console rather than assuming either rule applies. [AWS free-tier plans](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html).

## Proposed managed deployment, subject to account/budget verification

Use the tested `backend/Dockerfile` image with ECS Express Mode for an HTTPS service, plus a private RDS PostgreSQL database in the same VPC. Express Mode creates a load balancer, networking and compute; all underlying resources can incur charges. It is not automatically a free-tier service. A small EC2 deployment may be cheaper but has different maintenance, HTTPS and backup responsibilities; choose only after checking account eligibility.

Do not choose App Runner for a new account: AWS has closed it to new customers. AWS recommends ECS Express Mode. [Availability change](https://docs.aws.amazon.com/apprunner/latest/dg/apprunner-availability-change.html), [ECS Express Mode](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/express-service-overview.html).

## Concrete deployment sequence

1. Sign in using the owner’s normal AWS flow. Use temporary CLI/CloudShell credentials; never commit access keys or send them in chat. Verify account ID/region and free-tier/credit limits. Agree on a resource estimate first.
2. Create a scoped ECR repository and upload an immutable backend image. The image runs as a non-root user on port 8080. Tag the image with the Git commit; preserve its digest for rollback.
3. Create private encrypted PostgreSQL with a security group allowing port 5432 only from the service’s security group. Enable backups, deletion protection and an explicit retention policy. Avoid a publicly accessible database.
4. Store database credentials and a random 32+ character bridge secret in Secrets Manager. Grant only the execution/task access required for those secrets. Set `DATABASE_URL` to a JDBC URL using TLS, `DATABASE_USER`, `DATABASE_PASSWORD` and `FITLIVE_BRIDGE_SECRET`. OIDC is optional and should remain unset unless a verified issuer/audience is being used.
5. Deploy the container through ECS Express Mode with port 8080, `/actuator/health` checks, bounded scaling and the selected VPC settings. Inspect the created load balancer, public/private subnets and resource costs. [CLI contract](https://docs.aws.amazon.com/cli/latest/reference/ecs/create-express-gateway-service.html).
6. Confirm HTTPS health, anonymous 401, signed account access, native pairing, duplicate-save safety and invalid/revoked credential rejection on a dedicated staging account. Do not run the repository’s destructive localhost fixtures against a real user.
7. Configure `JAVA_API_URL` and the same `FITLIVE_BRIDGE_SECRET` as hosted Sites runtime values. The server validates and transfers an existing D1 snapshot only into an absent PostgreSQL account. Verify the same logs/versions from browser and iPhone before declaring cutover successful.
8. Review D1 retention and retire the legacy copy through an explicit migration after verification. Never toggle back to D1 after Java writes without reverse migration or restore.
9. Test backup restoration, operational alarms, request limits, deploy rollback and secret rotation. Record observed latency/error rates and the actual monthly cost estimate; no SLA is implied by a passing local test.

## Access still needed

AWS console sign-in, credit/budget decision and scoped deployment access; Xcode iOS/watchOS components, signing team and real paired hardware. Provider secrets for optional USDA/OpenAI remain separate. Do not paste passwords, access keys or API keys into the conversation.
