const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require('input');
const fs = require("fs");
const path = require("path");

const apiId = 20139100;
const apiHash = "52b622701427b68305d7090da5383d60";
const stringSession = new StringSession("");
const channelUsername = "Truelightghofficial"; 

const audioMessagesPath = "audio_messages.json";

(async () => {
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await input.text("Enter your phone number: "),
    password: async () => await input.text("Enter your 2FA password (if set): "),
    phoneCode: async () => await input.text("Enter the code you received: "),
    onError: (err) => console.log(err),
  });

  console.log("Logged in successfully!");

  console.log("Fetching past audio messages...");

 const channel = await client.getEntity(channelUsername);
    const inputChannel = await client.getInputEntity(channel);

    let allMessages = [];
    let lastId = null;
    const batchSize = 100;

    while (true) {
    const batch = await client.getMessages(channel, {
        limit: batchSize,
        ...(lastId && { offsetId: lastId }), 
    });

    if (batch.length === 0) break;

    allMessages.push(...batch);
    lastId = batch[batch.length - 1].id;

    if (allMessages.length >= 1000) break;
    }

    const pastAudios = allMessages
    .filter(
        (msg) =>
        msg.media &&
        msg.media.document &&
        msg.media.document.mimeType &&
        msg.media.document.mimeType.startsWith("audio")
    )
    .map((msg) => ({
        title: msg.message || "Untitled Audio",
        link: `https://t.me/${channelUsername}/${msg.id}`,
    }));

    saveAudioMessages(pastAudios);

  console.log("Past messages saved.");
  console.log("Watching for new audio messages...");

  // Listen for new audio messages
 const { NewMessage } = require("telegram/events");

    client.addEventHandler(async (event) => {
    const message = event.message;

    if (
        message &&
        message.media &&
        message.media.document &&
        message.media.document.mimeType.startsWith("audio")
    ) {
        const newAudio = {
        title: message.message || "Untitled Audio",
        link: `https://t.me/${channelUsername}/${message.id}`,
        };

        console.log("New audio message:", newAudio);

        // Load existing JSON
        const dataPath = path.join(__dirname, "audios.json");
        const existing = fs.existsSync(dataPath)
        ? JSON.parse(fs.readFileSync(dataPath, "utf-8"))
        : [];

        // Avoid duplicates
        const updated = [newAudio, ...existing.filter(m => m.link !== newAudio.link)];

        // Save
        fs.writeFileSync(dataPath, JSON.stringify(updated, null, 2));
    }
    }, new NewMessage({ chats: [inputChannel] }));

})();

// === Helper Functions ===

function saveAudioMessages(messages) {
  fs.writeFileSync(audioMessagesPath, JSON.stringify(messages, null, 2));
}

function appendAudioMessage(newAudio) {
  let current = [];

  if (fs.existsSync(audioMessagesPath)) {
    const raw = fs.readFileSync(audioMessagesPath);
    current = JSON.parse(raw);
  }

  const exists = current.some((audio) => audio.link === newAudio.link);
  if (!exists) {
    current.unshift(newAudio); // Add to top
    saveAudioMessages(current);
  }
}
