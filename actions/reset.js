const fs = require('fs');
const Constant = require('../constant');

const resetCheckedIn = async () => {
  await fs.writeFileSync(Constant.CHECK_IN_MEMBERS_DIRECTORY, '');
};

module.exports = resetCheckedIn;
