const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const fs = require("fs");
const path = require("path");
const { NewMessage } = require("telegram/events");

const apiId = 20139100;
const apiHash = "52b622701427b68305d7090da5383d60";
const stringSession = new StringSession(""); // leave empty if you're logging in fresh
const channelUsername = "Truelightghofficial";

const audioMessagesPath = path.join(__dirname, "audio_messages.json");

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

  console.log("✅ Logged in successfully!");
  console.log("📥 Fetching past audio messages...");

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
    .filter((msg) =>
      msg?.media?.document?.mimeType?.startsWith("audio")
    )
    .map((msg) => ({
      title: msg.message || "Untitled Audio",
      link: `https://t.me/${channelUsername}/${msg.id}`,
    }));

  saveAudioMessages(pastAudios);

  console.log(`✅ Saved ${pastAudios.length} audio messages.`);
  console.log("🔔 Watching for new audio messages...");

  // Listen for new audio messages
  client.addEventHandler(
    async (event) => {
      const message = event.message;

      if (
        message?.media?.document?.mimeType?.startsWith("audio")
      ) {
        const newAudio = {
          title: message.message || "Untitled Audio",
          link: `https://t.me/${channelUsername}/${message.id}`,
        };

        console.log("🎧 New audio message:", newAudio);

        const existing = fs.existsSync(audioMessagesPath)
          ? JSON.parse(fs.readFileSync(audioMessagesPath, "utf-8"))
          : [];

        const updated = [newAudio, ...existing.filter((m) => m.link !== newAudio.link)];

        fs.writeFileSync(audioMessagesPath, JSON.stringify(updated, null, 2));
      }
    },
    new NewMessage({ chats: [inputChannel] })
  );

  // Keep client running to listen for new messages
  await client.runUntilDisconnected();
})();

// === Helper Function ===
function saveAudioMessages(messages) {
  const unique = Array.from(new Map(messages.map((m) => [m.link, m])).values());
  fs.writeFileSync(audioMessagesPath, JSON.stringify(unique, null, 2));
}