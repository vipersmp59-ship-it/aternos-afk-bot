const mineflayer = require('mineflayer')

// Настройки
const config = {
    host: 'Viper-SMP.aternos.me', 
    username: 'Bot_Danya_Super',
    version: '1.21.4',
    password: 'Password123' // Пароль для регистрации/логина
}

function createBot() {
    const bot = mineflayer.createBot({
        host: config.host,
        username: config.username,
        version: config.version
    })

    // 1. Прохождение регистрации и логина через чат
    bot.on('messagestr', (message) => {
        const msg = message.toLowerCase()
        
        if (msg.includes('/register')) {
            console.log('Вижу запрос регистрации...')
            bot.chat(`/register ${config.password} ${config.password}`)
        } 
        else if (msg.includes('/login')) {
            console.log('Вижу запрос логина...')
            bot.chat(`/login ${config.password}`)
        }
    })

    // 2. Действия после спавна
    bot.on('spawn', () => {
        console.log('Бот успешно заспавнился на сервере!')
        
        // Машем рукой каждые 2 секунды (Anti-AFK)
        if (!bot.antifitInterval) {
            bot.antifitInterval = setInterval(() => {
                bot.swingArm('right')
            }, 2000)
        }
    })

    // 3. Обработка ошибок (чтобы не было Exit Code 1)
    bot.on('error', (err) => {
        console.error('Критическая ошибка:', err.message)
        if (err.code === 'ECONNREFUSED') {
            console.log('Ошибка подключения: Проверь, включен ли сервер или не забанен ли IP GitHub.')
        }
    })

    // 4. Авто-реконнект при кике
    bot.on('end', () => {
        console.log('Бот отключен. Пробую зайти снова через 20 секунд...')
        clearInterval(bot.antifitInterval)
        bot.antifitInterval = null
        setTimeout(createBot, 20000)
    })
}

// Запуск
createBot()
