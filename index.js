const mineflayer = require('mineflayer')

// Настройки подключения
const botArgs = {
    host: 'Viper-SMP.aternos.me', // Замени на свой айпи
    port: 62227,
    username: 'AternosBot3000',   // Имя бота
    version: '1.21.4'               // Укажи версию своего сервера
}

const password = 'YourPassword123' // Придумай пароль для регистрации

function createBot() {
    const bot = mineflayer.createBot(botArgs)

    // Когда бот заспавнился
    bot.on('spawn', () => {
        console.log('Бот зашел на сервер!')
        
        // Ждем 3 секунды перед вводом команд (чтобы прогрузился мир)
        setTimeout(() => {
            // Пытаемся и зарегистрироваться, и залогиниться на всякий случай
            bot.chat(`/register ${2244667} ${2244667}`)
            bot.chat(`/login ${2244667}`)
            console.log('Команды авторизации отправлены')
        }, 3000)

        // Цикл ударов рукой (чтобы не кикнуло за АФК)
        setInterval(() => {
            // Машем рукой (бьем воздух)
            bot.swingArm('right')
            
            // Можно еще заставить его слегка поворачиваться, чтобы выглядел живым
            bot.look(bot.entity.yaw + 0.1, bot.entity.pitch)
        }, 1500) // Машет каждые 1.5 секунды
    })

    // Авто-реконнект, если выкинуло
    bot.on('end', () => {
        console.log('Бот отключен. Переподключение через 10 секунд...')
        setTimeout(createBot, 10000)
    })

    // Лог ошибок в консоль Гитхаба
    bot.on('error', (err) => console.log('Ошибка:', err))
}

createBot()
