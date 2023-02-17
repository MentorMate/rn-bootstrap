## Contribution guide

- To run the cli locally, first link the package. Run the following command inside the repository:
```
yarn link
```

Then you can test the cli on your machine.

## Customizing your CLI

Check out the documentation at https://github.com/infinitered/gluegun/tree/master/docs

## Publishing to NPM

To package your CLI up for NPM, do this:

```shell
$ npm login
$ npm whoami
$ npm lint
$ npm test
(if typescript, run `npm run build` here)
$ npm publish
```

## Updating confluence documentation
This project has its own [confluence page][confluence] which is automatically updated using [kovetskiy/mark][mark] tool
Config file:
```
username = "your-email"
password = "password-or-api-key-for-confluence-cloud"
# If you are using Confluence Cloud add the /wiki suffix to base_url
base_url = "https://mentormate.atlassian.net/wiki"
```

Update confluence command: \
``mark -f README.md``