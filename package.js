Package.describe({
  name: 'lodash:lodash',
  version: '3.7.0',
  summary: 'A JavaScript utility library delivering consistency, modularity, performance, & extras. https://lodash.com',
  git: 'https://github.com/lodash/lodash.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.addFiles('lodash.js');
  api.addFiles('export.js');

  api.export('lodash');
  api.export('_');
});

