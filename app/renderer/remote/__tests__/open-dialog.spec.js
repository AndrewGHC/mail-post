import td from 'testdouble';

require('testdouble-jest')(td, jest);

const channel = 'any channel';
const filePath = ['mocked file path'];
let electron;
let utils;
let openDialog;
describe('openDialog', () => {
  beforeEach(() => {
    electron = td.replace('electron', {
      remote: {
        dialog: {
          showOpenDialog: td.function(),
        },
      },
    });
    td.when(electron.remote.dialog.showOpenDialog(td.matchers.isA(Object))).thenCallback(filePath);

    utils = td.replace('../../utils', {
      io: {
        emit: td.function(),
      },
    });

    openDialog = require('../open-dialog');
  });

  afterEach(() => {
    td.reset();
  });

  it('calls io.emit with the channel name filePath as a string', async () => {
    openDialog(channel, {});
    td.verify(utils.io.emit(channel, filePath[0]));
  });
});
