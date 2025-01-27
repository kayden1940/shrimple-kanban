<img width="1678" alt="image" src="https://github.com/user-attachments/assets/6ac71a76-d93c-4461-9502-c3c569b99689" />

A minimalistic modular kanban web application, made for self-deploy. Free and open source.

- automatically scaled, nothing to maintain
- costs nothing*(aws monthly free tier)
- responsive, fully compatible for mobile

Made possible with IAC(sst&pulumi), serverless, nosql, and typical react stuff.
Originally made this for my team. Useful for small teams with tons of tasks to keep track of, but don't feel like paying saas nor maintaining server from self-hosting.

[Video](https://twitter.com/kaydent_cc/status/1883634821475574031)

## Deploy guide

1. [have an aws account and configured AWS CLI in your machine](https://sst.dev/docs/aws-accounts)
3. `git clone git@github.com:kayden1940/shrimple-kanban.git`
4. `sst secret set Password password-here --stage=production`
5. `sst deploy --stage production`

## Usage practices

### Prefixing board and column names
<img width="636" alt="image" src="https://github.com/user-attachments/assets/4bacdbcf-03cd-46da-9e6b-882aabe5d934" />

A good idea to help categorizing and searching.

## Code
### Infrastructure
- Dynamodb table for storing all related data of the board.
- Lambda functions for api, accessing above table and the password.
- S3, storing encrypted password and the SPA.
- Cloudfront, cdn of the SPA.

IAC in sst v3 and Pulumi.

### Frontend
- React 19
- Tailwind v4
- Xstate v5
- Pragmatic drag and drop
- Vite
- Some util libraries

### Remark
I made this in a rush so the code rn is a bit rough, will be rewriting it at some point.
