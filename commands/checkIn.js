const fs = require('fs');
const Constant = require('../constant');
const utils = require('../utils');

const getCheckInLog = () => {
  return fs.readFileSync(Constant.CHECK_IN_LOG_DIRECTORY, Constant.READ_FILE_STANDARD);
};

const getDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const options = { weekday: 'long' };
  const dayName = date.toLocaleDateString('en-US', options);
  return `${dayName}, ${day}-${month}-${year} `;
};

const checkInMember = async (checkingInMember, message) => {
  let status;
  let checkedInMembers;

  checkedInMembers = getCheckedInMember();
  const command = message.content.toLowerCase();

  if(command.includes('wfh')){
    status = 'Work From Home';
  }

  if(command.includes('wfo')){
    status = 'Work From Office';
  }

  if(command.includes('sakit')){
    status = 'Sakit';
  }

  if(command.includes('cuti')){
    status = 'Lagi Cuti';
  }

  if(command.includes('ijin')){
    status = 'Sedang Ijin';
  }

  if(status === undefined){
    message.reply('Maaf, mohon diketik dengan format yang benar ya\n ```!dsme check in (tag kamu sendiri) wfh/wfo/sakit/cuti/ijin```');
    return checkedInMembers;
  }

  const checkInMemberData = `${checkingInMember} - ${status}`;
  let membersListLog = '';
  checkedInMembers.map((member) => {
    let selectedMember =  member;
    if(!selectedMember.includes('\n')){
      selectedMember = selectedMember + '\n';
    }
    selectedMember = selectedMember.replace(',','');
    membersListLog = membersListLog.concat(selectedMember);
  });

  if(checkedInMembers.toString().includes(checkingInMember)){
    message.reply('Eh udah minum air putih ? anggota sudah ter-checkin nih');
    return membersListLog.substr(0,membersListLog.length-1);
  }

  membersListLog = membersListLog.concat(checkInMemberData.concat('\n'));
  await saveCheckedInMembers(membersListLog);

  return membersListLog;
};

const saveCheckedInMembers = async (members) => {
  await fs.writeFileSync(Constant.CHECK_IN_MEMBERS_DIRECTORY, members);
};

const getCheckedInMember = () => {
  const checkedInMembers = fs.readFileSync(Constant.CHECK_IN_MEMBERS_DIRECTORY, Constant.READ_FILE_STANDARD);
  return checkedInMembers.split('\n');
};

const checkIn = async (client, message) => {
  let checkInLog = getCheckInLog();
  const formaattedDate = getDate();
  const mentionedMember = message.mentions.users.first().username;

  const checkedInMembers = await checkInMember(mentionedMember, message);

  checkInLog = checkInLog.replace('checkin_date', formaattedDate);
  checkInLog = checkInLog.replace('checkin_log', checkedInMembers);

  const announcementChannel = utils.channel.getChannel(client, 'checkin');
  announcementChannel.send(checkInLog);
};

module.exports = checkIn;
