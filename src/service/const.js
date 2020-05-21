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
  },

  HttpStatusInfo: {
    NOT_FOUND: `Not found`,
    OK: `Ok`,
    SERVER_ERROR: `Server error`,
  }
};

