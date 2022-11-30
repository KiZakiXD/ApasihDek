//------------------ © Chitanda Multi - Device ------------------//
/*
• Ganti Sesukalu Gabutuh Nama
• Cuman Belajar Liat Kanan Kiri
• Hikone Multi Device & Chitanda Multi Device
• Thanks X-Asena & X-Electra & Xzeera-ID & Senku
*/

const events = require("../lib/event");
const { command, isPrivate, tiny, serif_B, clockString } = require("../lib");
const { OWNER_NAME, BOT_NAME } = require("../config");
const { hostname, uptime } = require("os");
command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All commands",
    dontAddCommandList: true,
  },
  async (message, match) => {
    if (match) {
      for (let i of events.commands) {
        if (i.pattern.test(message.prefix + match))
          message.reply(
            `\`\`\`Command : ${message.prefix}${match.trim()}
Description : ${i.desc}\`\`\``
          );
      }
    } else {
      let { prefix } = message;
      let [date, time] = new Date()
        .toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
        .split(",");
      let menu = `*❝ I'm A Simple Bot Whatsapp, Developed By KiZakiXD, Please Read More To See The Features.*
      
❏ About Bot :*      
  • *Owner* :  ${OWNER_NAME}
  • *Prefix* : ${prefix}
  • *Hostname* :${hostname().split("-")[0]}
  • *Date* : ${date}
  • *Time* : ${time}
  • *Commands* : ${events.commands.length} 
  • *Runtime* : ${clockString(uptime())} 

\n`;
      let cmnd = [];
      let cmd;
      let category = [];
      events.commands.map((command, num) => {
        if (command.pattern) {
          cmd = command.pattern
            .toString()
            .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
        }

        if (!command.dontAddCommandList && cmd !== undefined) {
          let type;
              if (!command.type) {
          type = "misc";      
        } else {
          type = command.type.toLowerCase();
        }

        cmnd.push({ cmd, type: type });

        if (!category.includes(type)) category.push(type);
      }
    });
    cmnd.sort();
    category.sort().forEach((cmmd) => {
     menu+=`*❏ ${cmmd}*`
let comad = cmnd.filter(({ type }) => type == cmmd);
      comad.forEach(({ cmd }, num) => {
 menu += `  • ${cmd.trim()}`;
      });
    });
    menu += `*🍟 Note : Ketik ${prefix}menu <command> untuk melihat info command*`;
      return await message.client.sendMessage(message.jid, {
        image: { url: `https://telegra.ph/file/36021058404bc06c0f01b.jpg` },
        caption: menu,
        footer: tiny(
          `© Chitanda Multi-Device`
        ),
        buttons: [
          {
            buttonId: `${prefix}list`,
            buttonText: { displayText: serif_B("List Command") },
          }
        ],
      });
    }
  }
);

command(
  {
    pattern: "list",
    fromMe: isPrivate,
    desc: "Show All commands",
    dontAddCommandList: true,
  },
  async (message, match, { prefix }) => {
    let menu = `© List Command For © Chitanda Multi-Device\n`;

    let cmnd = [];
    let cmd, desc;
    events.commands.map((command) => {
      if (command.pattern) {
        cmd = command.pattern
          .toString()
          .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
      }
      if (command.desc) {
        desc = command.desc;
      } else {
        desc = false;
      }
      if (!command.dontAddCommandList && cmd !== undefined) {
        cmnd.push({ cmd, desc });
      }
    });
    cmnd.sort();
    cmnd.forEach(({ cmd, desc }, num) => {
      menu += `❏ ${(num += 1)} *${tiny(cmd.trim())}*\n`;
      if (desc) menu += `  • ${tiny("use : " + desc)}\n`;
    });
    return await message.reply(menu);
  }
);
