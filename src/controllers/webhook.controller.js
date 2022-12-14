require('dotenv').config();
const Handler = require('../modules/MessageHandler');

const { saveInfor, getInfor, deleteInfor } = require('../utils/infor');
const { setUpPersistentMenu, callSendAPI } = require('../utils/facebookCall');
const timezone = require('../utils/timezone');

class WebhookController {
  // [GET] ./webhook
  connect(req, res) {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');

        // Set up persistent menu
        setUpPersistentMenu();

        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  }

  // [POST] ./webhook
  handle(req, res) {
    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function (entry) {
        // Gets the message. entry.messaging is an array, but
        // will only ever contain one message, so we get index 0
        let webhook_event = entry.messaging[0];

        // Get the sender PSID
        let sender_psid = webhook_event.sender.id;
        console.log('\nSender PSID: ' + sender_psid);

        // Check if the event is a message
        if (webhook_event.message) {
          handleMessage(sender_psid, webhook_event.message);
          // Check if the event is a postback
        } else if (webhook_event.postback) {
          handlePostback(sender_psid, webhook_event.postback);
        }
      });

      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  }
}

// Handles messages events
async function handleMessage(sender_psid, received_message) {
  const message = received_message.text;
  // console.log(`receive: "${message}"`);

  if (!message) return callSendAPI(sender_psid, { text: 'What ???????' });

  const lower = message.toLowerCase();
  const { mssv, pass } = getInfor(sender_psid);

  if (lower.includes('login ')) {
    const mssvInput = message.slice(6, 6 + 8);
    const passInput = message.slice(6 + 8 + 1);

    if (!checkLoginInput(mssvInput, passInput))
      return callSendAPI(sender_psid, {
        text: 'Th??ng tin c???a b???n kh??ng h???p l???',
      });

    saveInfor(sender_psid, mssvInput, passInput);

    await callSendAPI(sender_psid, {
      text: '???? ghi nh???n th??ng tin c???a b???n. Nh??? thu h???i tin nh???n ????? b???o m???t nh??!',
    });
    sendHelpButton(sender_psid);
  }

  // User logs out
  else if (lower == 'logout') {
    deleteInfor(sender_psid);
    callSendAPI(sender_psid, { text: 'Th??ng tin c???a b???n ???? ???????c xo??' });
  }

  // User logged in
  else if (mssv && pass) categorizeMessage(sender_psid, mssv, pass, message);
  else {
    await callSendAPI(sender_psid, { text: `B???n v???a g???i: "${message}"` });
    callSendAPI(sender_psid, { text: `B???n ch??a ????ng nh???p!` });
  }
}

// Handles postback events
async function handlePostback(sender_psid, received_postback) {
  const payload = received_postback.payload;

  if (payload === 'GET_STARTED')
    return callSendAPI(sender_psid, {
      text: `Ch??o m???ng b???n ?????n v???i chatbot c???a ?????c Ph???m ????`,
    });

  const { mssv, pass } = getInfor(sender_psid);

  // User logged in
  if (mssv && pass) categorizeMessage(sender_psid, mssv, pass, payload);
  else {
    await callSendAPI(sender_psid, { text: `B???n v???a g???i: "${payload}"` });
    callSendAPI(sender_psid, { text: `B???n ch??a ????ng nh???p!` });
  }
}

// ====================================== //
// ========== SUPPORT FUNCTION ========== //

// Check if login input is valid
function checkLoginInput(mssvInput, passInput) {
  if (mssvInput.length < 8 || passInput.length < 1) return false;

  // MSSV contains alphanumeric character only
  if (!/^[A-Za-z0-9]+$/.test(mssvInput)) return false;

  return true;
}

// Reply to predefined messages if users have logged in
async function categorizeMessage(sender_psid, mssv, pass, message) {
  const lower = message.toLowerCase();

  const MESSAGE_HANDLER = {
    'help': Handler.handleHelp,
    'week': Handler.handleWeek,
    'week next': Handler.handleWeekNext,
    'score': Handler.handleScore,
    'score all': Handler.handleScoreAll,
    'score list': Handler.handleScoreList,
  };

  if (lower in MESSAGE_HANDLER)
    return MESSAGE_HANDLER[lower](sender_psid, mssv, pass);

  const WEEKDAY = {
    mon: 'Th??? 2',
    tue: 'Th??? 3',
    wed: 'Th??? 4',
    thu: 'Th??? 5',
    fri: 'Th??? 6',
    sat: 'Th??? 7',
    sun: 'CN',
    today: timezone.TODAY,
    tomorrow: timezone.TOMORROW,
  };

  if (lower in WEEKDAY)
    return Handler.handleWeekday(sender_psid, mssv, pass, WEEKDAY[lower]);

  if (lower.includes('score -'))
    return Handler.handleScoreCustom(sender_psid, mssv, pass, message);

  // default or wrong message
  await callSendAPI(sender_psid, { text: `B???n v???a g???i: "${message}"` });
  sendHelpButton(sender_psid);
}

// Send custom Help message which have Help button
async function sendHelpButton(sender_psid) {
  await callSendAPI(sender_psid, {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: 'Nh???n "help" ho???c nh???n n??t d?????i ????y ????? xem h?????ng d???n!',
        buttons: [
          {
            type: 'postback',
            title: 'Help',
            payload: 'Help',
          },
        ],
      },
    },
  });
}

module.exports = new WebhookController();
