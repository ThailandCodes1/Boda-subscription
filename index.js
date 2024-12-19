const { Client, GatewayIntentBits, EmbedBuilder, Partials, PermissionsBitField } = require('discord.js');
const fs = require('fs').promises;
const Tesseract = require('tesseract.js');
require('dotenv').config();
const PREFIX = process.env.PREFIX || '!';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.User,
    ],
});


client.on('ready', async () => {
        console.log('================');
        console.log('');
        console.log('Bot Name : ' + client.user.username);
        console.log('Bot Tag : ' + client.user.tag);
        console.log('Bot Id : ' + client.user.id);
        console.log('Users Count : ' + client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0).toLocaleString());
        console.log('');
        console.log('https://discord.com/users/1224444756398968944');
        client.user.setStatus('online');
        client.user.setActivity('Dev By: Boda', { type: 'PLAYING', url: 'https://twitch.tv/Boda' });
});


// Control Bot

// Set Name
client .on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if(message.content.startsWith(PREFIX + 'set-name')) {
        await message.channel.sendTyping();
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('You do not have permission to use this command.');
        }
        const name = message.content.slice(9).trim();
        if (!name) {
            return message.reply('Please write a name.');
        }
        client.user.setUsername(name).then(() => {
            const embed = new EmbedBuilder()
                .setTitle('Done set name')
                .setDescription(`Name set to ${name}`)
                .setColor('#00ff00');
            message.reply({ embeds: [embed] });
        });
    }
});

// Set Avatar
client .on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if(message.content.startsWith(PREFIX + 'set-avatar')) {
        await message.channel.sendTyping();
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('You do not have permission to use this command.');
        }
        const image = message.attachments.first();
        if (!image) {
            return message.reply('Please attach an image.');
        }
        client.user.setAvatar(image.url).then(() => {
            const embed = new EmbedBuilder()
                .setTitle('Done set avatar')
                .setDescription(`Avatar set to`)
                .setImage(image.url)
                .setColor('#00ff00');
            message.reply({ embeds: [embed] });
        });
    }
});

// Set Banner
client .on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if(message.content.startsWith(PREFIX + 'set-banner')) {
        await message.channel.sendTyping();
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('You do not have permission to use this command.');
        }
        const image = message.attachments.first();
        if (!image) {
            return message.reply('Please attach an image.');
        }
        client.user.setBanner(image.url).then(() => {
            const embed = new EmbedBuilder()
                .setTitle('Done set banner')
                .setDescription(`Banner set to`)
                .setImage(image.url)
                .setColor('#00ff00');
            message.reply({ embeds: [embed] });
        });
    }
});

// Setup Settings

// Set Channel Sub
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX + 'set-channel-sub')) {
        await message.channel.sendTyping();
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('You do not have permission to use this command.');
        }
        const channel = message.mentions.channels.first();
        if (!channel) {
            return message.reply('Please mention a channel.');
        }
        const filedata = await fs.readFile('config.json', 'utf-8').catch(console.error);
        if (!filedata) {
            await fs.writeFile('config.json', JSON.stringify({ channel: channel.id }, null, 2))
            const embed = new EmbedBuilder()
                .setTitle('Done set channel')
                .setDescription(`Channel set to ${channel.name}`)
                .setColor('#00ff00');
            return message.reply({ embeds: [embed] });
        };
        const data = JSON.parse(filedata);
        data.channel = channel.id;
        await fs.writeFile('config.json', JSON.stringify(data, null, 2))
        const embed = new EmbedBuilder()
            .setTitle('Done set channel')
            .setDescription(`Channel set to ${channel.name}`)
            .setColor('#00ff00');
        return message.reply({ embeds: [embed] });
    }
});

// Set Role Sub
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX + 'set-role-sub')) {
        await message.channel.sendTyping();
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('You do not have permission to use this command.');
        }
        const role = message.mentions.roles.first();
        if (!role) {
            return message.reply('Please mention a role.');
        }
        const filedata = await fs.readFile('config.json', 'utf-8').catch(console.error);
        if (!filedata) {
            await fs.writeFile('config.json', JSON.stringify({ role: role.id }, null, 2))
            const embed = new EmbedBuilder()
                .setTitle('Done set role')
                .setDescription(`Role set to ${role.name}`)
                .setColor('#00ff00');
            return message.reply({ embeds: [embed] });
        };
        const data = JSON.parse(filedata);
        data.role = role.id;
        await fs.writeFile('config.json', JSON.stringify(data, null, 2))
        const embed = new EmbedBuilder()
            .setTitle('Done set role')
            .setDescription(`Role set to ${role.name}`)
            .setColor('#00ff00');
        return message.reply({ embeds: [embed] });
    }
});

// Set Youtube Channel Name
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX + 'set-youtube-channel-name')) {
        await message.channel.sendTyping();
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('You do not have permission to use this command.');
        }
        const youtubechannelname = message.content.slice(26).trim();
        if (!youtubechannelname) {
            return message.reply('Please write a channel name.');
        }
        const filedata = await fs.readFile('config.json', 'utf-8').catch(console.error);
        if (!filedata) {
            await fs.writeFile('config.json', JSON.stringify({ youtubechannelname: youtubechannelname }, null, 2)).then(() => {
                const embed = new EmbedBuilder()
                    .setTitle('Done set youtube channel name')
                    .setDescription(`Youtube channel name set to ${youtubechannelname}`)
                    .setColor('#00ff00');
                message.reply({ embeds: [embed] });
            });
            return;
        }
        const data = JSON.parse(filedata);
        data.youtubechannelname = youtubechannelname;
        await fs.writeFile('config.json', JSON.stringify(data, null, 2)).then(() => {
            const embed = new EmbedBuilder()
                .setTitle('Done set youtube channel name')
                .setDescription(`Youtube channel name set to ${youtubechannelname}`)
                .setColor('#00ff00');
            message.reply({ embeds: [embed] });
        });
    }
});

// Check Sub Function
async function cleanExtractedText(text) {
    const darafile = await fs.readFile('config.json', 'utf-8');
    const data = JSON.parse(darafile);
    const lowerText = text.toLowerCase();
    if (lowerText.includes(data.youtubechannelname.toLowerCase())) {
        if(lowerText.includes('subscribed')) return "true";
    }
    return "false";
};

// Check Sub
client.on('messageCreate', async (message) => {
    try {
        if (message.author.bot) return;
        
        const filedata = await fs.readFile('config.json', 'utf-8');
        const data = JSON.parse(filedata);
        
        if (!data?.channel) return message.reply('Channel not set.');
        if (message.channel.id !== data.channel) return;
        if(!data?.role) return message.reply('Role not set.');
        if(!data?.youtubechannelname) return message.reply('Youtube channel name not set.');
        
        const image = message.attachments.first();
        if (!image) return;

        if (message.member.roles.cache.has(data.role)) {
            await message.delete();
            return;
        }

        const waitEmbed = new EmbedBuilder()
            .setTitle('**Processing... ⚙️**')
            .setDescription('Please wait while we verify your subscription...')
            .setColor('#FFA500');
            
        const waitMsg = await message.reply({ embeds: [waitEmbed] });

        const { data: { text } } = await Tesseract.recognize(image.url, 'eng');
        const isSubscribed = await cleanExtractedText(text);

        if (isSubscribed === "true") {
            const [member, role] = await Promise.all([
                message.guild.members.fetch(message.author.id),
                message.guild.roles.fetch(data.role)
            ]);

            if (!role || !member) {
                throw new Error('Could not fetch member or role');
            }

            await member.roles.add(role).catch(() => {
                const errorEmbed = new EmbedBuilder()
                    .setTitle('❌ Error Missing Permissions')
                    .setDescription('I do not have permission to add the role. Please try again later.')
                    .setColor('#ff0000')
                    .setTimestamp();
                return waitMsg.edit({ embeds: [errorEmbed] });
            });

            const successEmbed = new EmbedBuilder()
                .setTitle('✅ Subscription Verified')
                .setDescription('Thank you for subscribing! Your access has been granted.')
                .setColor('#00ff00')
                .setTimestamp();

            await waitMsg.edit({ embeds: [successEmbed] });

            try {
                const dmEmbed = new EmbedBuilder()
                    .setTitle('🎉 Access Granted')
                    .setDescription(`You have been successfully verified in ${message.guild.name}!`)
                    .setColor('#00ff00')
                    .setTimestamp();

                await message.author.send({ embeds: [dmEmbed] });
            } catch (err) {
                console.error('Failed to send DM:', err);
            }
        } else {
            const failEmbed = new EmbedBuilder()
                .setTitle('❌ Not Subscribed')
                .setDescription('We could not verify your subscription. Please make sure you are subscribed and try again.\n\nPlease make sure your language is set to English.')
                .setColor('#ff0000')
                .setTimestamp();

            await waitMsg.edit({ embeds: [failEmbed] });
        }
    } catch (error) {
        console.error('Error in subscription verification:', error);
        
        const errorEmbed = new EmbedBuilder()
            .setTitle('❌ Error')
            .setDescription('An error occurred while processing your request. Please try again later.')
            .setColor('#ff0000')
            .setTimestamp();

        await message.reply({ embeds: [errorEmbed] }).catch(() => {});
    }
});

// Help Command
client.on('messageCreate', async message => {
    if(message.author.bot) return;
    if (message.content === PREFIX + 'help') {
        await message.channel.sendTyping();
        const embed = new EmbedBuilder()
            .setTitle('**Commands**')
            .addFields(
                { name: `**${PREFIX}set-channel-sub**`, value: 'Set the channel for subscription verification.' },
                { name: `**${PREFIX}set-role-sub**`, value: 'Set the role for subscribers.' },
                { name: `**${PREFIX}set-youtube-channel-name**`, value: 'Set the YouTube channel name for subscription verification.' },
                { name: `**${PREFIX}set-name**`, value: 'Set the bot name.' },
                { name: `**${PREFIX}set-avatar**`, value: 'Set the bot avatar.' },
                { name: `**${PREFIX}set-banner**`, value: 'Set the bot banner.' }
            )
            .setColor('#ff0000');
        await message.reply({ embeds: [embed] });
    }
});

// Login
client.login(process.env.TOKEN);