const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'Viper-SMP.aternos.me', // <-- ТВОЙ АДРЕС ТУТ
        port: 62227,
        username: 'AFK_Bot_Pro', // Ник бота
        version: 1.21.11 // Авто-определение версии
    });

    bot.on('spawn', () => {
        console.log('Бот в игре!');
        // Бот будет прыгать каждые 15 секунд
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 15000);
    });

    // Если выкинуло — перезаходим через 30 секунд
    bot.on('end', () => {
        console.log('Бот вылетел, переподключаюсь...');
        setTimeout(createBot, 30000);
    });

    bot.on('error', (err) => console.log('Ошибка:', err));
}

createBot();
