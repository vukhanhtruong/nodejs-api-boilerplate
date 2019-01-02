require('dotenv').config();

const npsUtils = require('nps-utils');

const { rimraf, crossEnv, series, concurrent } = npsUtils;

module.exports = {
  scripts: {
    build: {
      description: 'Building in production environment.',
      default: series.nps('clean', 'build.build'),
      build: `cross-env NODE_ENV=production backpack build`,
    },
    debug: {
      description: 'Debug with VSCode.See VSCode Auto-Attach [here](https://code.visualstudio.com/updates/v1_22#_node-debugging)',
      default: series.nps('clean', 'debug.start'),
      start: `cross-env NODE_ENV=development backpack dev --inspect-brk`
    },
    clean: {
      description: 'Clean dist folder.',
      default: rimraf('dist'),
    },
    default: {
      description: 'Start project with pm2 on production.',
      script: `${crossEnv('NODE_ENV=production')} pm2 start processes.json --env production --no-daemon`,
    },
    stop: {
      description: 'Stop project with pm2 on production.',
      script: `pm2 delete all`,
    },
    doc: {
      description: 'Documenting the api.',
      default: 'apidoc -i src',
      deploy: {
        description: 'Deploy the docs on surge.',
        script: series('nps doc', `npx surge ./doc -d ${process.env.DOCS_URL}`),
      },
    },
    dev: {
      start: {
        description: 'Running on dev environment.',
        script: `${crossEnv('NODE_ENV=development')} backpack dev`,
      },
      default: {
        script: concurrent.nps('dev.start'),
      }
    },
    lint: {
      default: 'eslint src',
      fix: 'eslint --fix src',
    },
    lintStaged: 'lint-staged',
    seeds: {
      user: {
        description: 'Deploy the docs on surge.',
        create: series('bash ./scripts/seeds/user.seed.sh'),
        clear: series('bash ./scripts/seeds/clearUser.seed.sh'),
        clearAll: series('bash ./scripts/seeds/clearAll.seed.sh')
      }
    },
    test: {
      default: series.nps('test.test'),
      test: `${crossEnv('NODE_ENV=test')} jest --detectOpenHandles --runInBand --forceExit`,
      cover: {
        default: series.nps('test.test --collectCoverageFrom=src/**.js --coverageDirectory=coverage --coverage'),
        open: 'npx lite-server --baseDir="coverage/lcov-report"'
      },
      watch: series.nps('test.test --watch')
    },
    validate: {
      description: 'Validate code by linting, type-checking.',
      default: series.nps('lint', 'test'),
    },
  },
};
