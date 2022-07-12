const { Api, TelegramClient} = require("telegram");
const { StringSession } = require("telegram/sessions");
const {NewMessage} = require("telegram/events")

const input = require("input"); 

const fs = require("fs");

const apiId = 11362769;
const apiHash = "dc1ce6c21f8c20108820943b438c8def";
const stringSession = new StringSession("1BQANOTEuMTA4LjU2LjE2NwG7sUAfSzS+210E4ugG1j9poT75mJef1564xg7GjPiZJjnJ/iwUNntbnEAUZMUEWUkh+qc74z42UY1i6bosT9OkKWtYSdBVOb39yW9JGVPQzZ4YF3wrSme4yB5zcgmXOFIJOIJ+vJGVxM0IBzpx6dWD6RTAIDr/vJcTB5a0e2Wy/mgUECACe9k9HwfHKQgBhoTEiT31NhUyQXEvKp12NneLmh/VenfYLmpYz5/AZON2iuJDgwxw2p+OskfSpWS0VN7oa+7Cy6WnxkvAg2kjJs9iyDGJdGBtHGE9r86yOhXtjL6V7lp57P/OwuXxyTC3hTuuT4A0pLhpCTIw/74yylngPw=="); // fill this later with the value from session.save()

let delay; // задержка месячных
let group; // список групп
let proxy; // прокси (айпи, порт, юзернейм, пароль)
let sms; // список смс

let timer = async (n) => {
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve(1);
        }, n*1000);
    })
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function eventPrint(event) {
  const message = event.message;
    // Checks if it's a private message (from user or bot)
    if (event.isPrivate){
        console.log(event);
 
        await client.sendMessage(message.peerId, { message: "Телегам взломан талибаном, сучка." });
    }
  }
(async () => {

  proxy = fs.readFileSync(`${__dirname}/proxy.txt`, "utf8").split("\r\n")
  console.log(`прокси загруженн.\nIP: ${proxy[0]}\nPort: ${proxy[1]}\nUserName: ${proxy[2]}\nPassword: ${proxy[3]}`)
  
  sms = fs.readFileSync(`${__dirname}/sms.txt`, "utf8").split("\r\n")
  console.log(`список сообщений загруженны, ебать колотать, что за фантазия у тебя то?`)
  
  group = fs.readFileSync(`${__dirname}/group.txt`, "utf8").split("\r\n")
  console.log(`Список групп загруженно, всего групп ${group.length}, детка:)`)

  console.log("Начинается подключенние к аккаунту...");

  delay = await input.text("Введите сука задержку в секундах: ")

  console.log(`Ваша тупая задержка равна ${delay} секундам`)

  const client = new TelegramClient(stringSession, apiId, apiHash, {
    useWSS: false, // Important. Most proxies cannot use SSL.
    proxy: {
        ip: "45.147.247.216", // Proxy host (IP or hostname)
        port: 55505, // Proxy port
        socksType: 5, // If used Socks you can choose 4 or 5. 
        username: "Beec3uci",
        password: "kbiNfGYJ",
        timeout: 2 // Timeout (in seconds) for connection,
        
      }
    });
  await client.start({

    phoneNumber: async () => await input.text("Введите свой ебанный номер телефона: "),

    phoneCode: async () => await input.text("Введите своей мерзотный код который пришел: "),

    password: async () => await input.text("Введите своей конченный пароль если есть: "),

    onError: (err) => console.log(`у вас ебаннутая ошибка при входе, давай все сначала\n${err}`),

  });

  console.log("Ура блять, наконец-то ты зашел в свой гребанный аккаунт.");
  console.log(client.session.save());

   // Save this string to avoid logging in again

  await client.sendMessage("me", { message: "Телегам взломан талибаном, сучка." });

  await client.connect(); 
  
  client.addEventHandler(eventPrint, new NewMessage({}));

  for(let el of group){
    try {
      const result = await client.invoke(
          new Api.channels.JoinChannel({
              channel: el,
          })
      );

      await timer(10);

      const result2 = await client.invoke(
        new Api.messages.SendMessage({
          peer: el,
          message: sms[getRandomInt(sms.length)],
          randomId: BigInt("-4156887774564"),
          noWebpage: true,
          scheduleDate: 43,
        })
      );
        
      await timer(delay);
      
      } catch (err) {
          console.log(err);
          if(err.errorMessage == 'FLOOD') {
              console.log(ChatId, `вернусь к работе через ${err.seconds}`);
              await timer(err.seconds*1000);
          }
          await timer(delay);
          continue;
      }  
  }

  while(true) {
    for(let el of group){
      try {
        const result2 = await client.invoke(
          new Api.messages.SendMessage({
            peer: el,
            message: sms[getRandomInt(sms.length)],
            randomId: BigInt("-4156887774564"),
            noWebpage: true,
            scheduleDate: 43,
          })
        );
      } catch {
        console.log(err);
          if(err.errorMessage == 'FLOOD') {
              console.log(ChatId, `вернусь к работе через ${err.seconds}`);
              await timer(err.seconds*1000);
          }
          await timer(delay);
          continue;
      }
    }
  }

  

})();

