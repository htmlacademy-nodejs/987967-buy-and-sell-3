'use strict';

module.exports = {
  ExitCode: {
    SUCCESS: 0,
    ERROR: 1,
    WORKING: 2,
  },

  MOCK_FILE_NAME: `mocks.json`,

  HttpStatusCode: {
    NOT_FOUND: 404,
    OK: 200,
    SERVER_ERROR: 500,
    CREATED: 201,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
  },

  HttpStatusInfo: {
    NOT_FOUND: `Not found`,
    OK: `Ok`,
    SERVER_ERROR: `Server error`,
  },

  MAX_ID_LENGTH: 6,

  API_PREFIX: `/api`,

  ROOT_FOLDER: `987967-buy-and-sell-3`,

  LoggerName: {
    SERVER: `server`,
    API: `server:api`,
    GENERATE: `generate`,
    HELP: `help`,
    VERSION: `version`,
    UTIL: `util`,
  }
};

