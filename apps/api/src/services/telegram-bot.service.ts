import axios from 'axios';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';

export class TelegramBotService {
  private botToken: string;
  private botApiUrl: string;

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN || '';
    this.botApiUrl = `https://api.telegram.org/bot${this.botToken}`;
  }

  /**
   * Send message to user
   */
  async sendMessage(chatId: number | string, text: string, options?: any) {
    try {
      const response = await axios.post(`${this.botApiUrl}/sendMessage`, {
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        ...options,
      });
      return response.data;
    } catch (error: any) {
      logger.error(`Error sending message: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send photo with caption
   */
  async sendPhoto(chatId: number | string, photo: string, caption?: string, options?: any) {
    try {
      const response = await axios.post(`${this.botApiUrl}/sendPhoto`, {
        chat_id: chatId,
        photo,
        caption,
        parse_mode: 'HTML',
        ...options,
      });
      return response.data;
    } catch (error: any) {
      logger.error(`Error sending photo: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send invite card to user
   */
  async sendInviteCardToUser(telegramId: string, referrerId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: referrerId },
        include: {
          profile: true,
          referralCode: true,
        },
      });

      if (!user || !user.referralCode) {
        throw new Error('User or referral code not found');
      }

      const referralCode = user.referralCode.code;
      const inviteLink = `https://t.me/${process.env.TELEGRAM_BOT_USERNAME}?start=${referralCode}`;
      const webAppLink = `${process.env.WEB_APP_URL || 'https://nexusvita.io'}/telegram?ref=${referralCode}`;

      const inviteMessage = this.createInviteMessage(user, referralCode, inviteLink);

      // Send photo with invite card
      const photoUrl = user.profile?.avatarUrl || 'https://nexusvita.io/images/default-invite.png';
      
      await this.sendPhoto(telegramId, photoUrl, inviteMessage, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '🚀 Присоединиться',
                url: inviteLink,
              },
            ],
            [
              {
                text: '📱 Открыть приложение',
                web_app: { url: webAppLink },
              },
            ],
            [
              {
                text: '📤 Поделиться с друзьями',
                switch_inline_query: `Присоединяйся к Nexus Vita! ${inviteLink}`,
              },
            ],
          ],
        },
      });

      return { success: true, inviteLink };
    } catch (error: any) {
      logger.error(`Error sending invite card: ${error.message}`);
      throw error;
    }
  }

  /**
   * Create invite message
   */
  private createInviteMessage(user: any, referralCode: string, inviteLink: string): string {
    const displayName = user.profile?.displayName || user.email;
    
    return `🎉 <b>Приглашение в Nexus Vita!</b>

👋 Привет! <b>${displayName}</b> приглашает тебя присоединиться к экосистеме здоровья и фитнеса!

✨ <b>Что тебя ждёт:</b>
💪 Персональные тренировки
🥗 Планы питания
🧠 Психология и ментальное здоровье
🏆 Челленджи и награды
🪙 Зарабатывай NVT токены
📚 Образовательные курсы

🎁 <b>Бонус за регистрацию:</b>
Получи 50 NVT токенов при регистрации по этой ссылке!

🔗 <b>Твоя реферальная ссылка:</b>
<code>${inviteLink}</code>

📱 Нажми кнопку ниже, чтобы присоединиться!`;
  }

  /**
   * Handle /start command with referral code
   */
  async handleStartCommand(chatId: number, userId: number, referralCode?: string) {
    try {
      let message = `👋 <b>Добро пожаловать в Nexus Vita!</b>\n\nЭкосистема здоровья и фитнеса с Web3 технологиями.`;

      if (referralCode) {
        message += `\n\n🎁 Ты перешёл по реферальной ссылке! Получишь бонус при регистрации.`;
      }

      await this.sendMessage(chatId, message, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '🚀 Открыть приложение',
                web_app: {
                  url: `${process.env.WEB_APP_URL || 'https://nexusvita.io'}/telegram${referralCode ? `?ref=${referralCode}` : ''}`,
                },
              },
            ],
            [
              {
                text: '📖 Узнать больше',
                url: 'https://nexusvita.io',
              },
            ],
          ],
        },
      });

      // If referral code exists, track it
      if (referralCode) {
        // Check if user already exists
        const telegramUser = await prisma.telegramUser.findUnique({
          where: { telegramId: userId.toString() },
        });

        if (!telegramUser) {
          // Store referral for when user registers
          // This will be handled during registration
        }
      }
    } catch (error: any) {
      logger.error(`Error handling start command: ${error.message}`);
      throw error;
    }
  }

  /**
   * Handle /invite command
   */
  async handleInviteCommand(chatId: number, telegramId: string) {
    try {
      const telegramUser = await prisma.telegramUser.findUnique({
        where: { telegramId },
        include: {
          user: {
            include: {
              profile: true,
              referralCode: true,
            },
          },
        },
      });

      if (!telegramUser || !telegramUser.user.referralCode) {
        await this.sendMessage(
          chatId,
          '❌ Сначала зарегистрируйся в приложении, чтобы получить реферальную ссылку.'
        );
        return;
      }

      await this.sendInviteCardToUser(telegramId, telegramUser.userId);
    } catch (error: any) {
      logger.error(`Error handling invite command: ${error.message}`);
      await this.sendMessage(chatId, '❌ Произошла ошибка. Попробуй позже.');
    }
  }

  /**
   * Set webhook
   */
  async setWebhook(url: string, secretToken?: string) {
    try {
      const response = await axios.post(`${this.botApiUrl}/setWebhook`, {
        url,
        secret_token: secretToken,
        allowed_updates: ['message', 'callback_query'],
      });
      return response.data;
    } catch (error: any) {
      logger.error(`Error setting webhook: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get bot info
   */
  async getBotInfo() {
    try {
      const response = await axios.get(`${this.botApiUrl}/getMe`);
      return response.data.result;
    } catch (error: any) {
      logger.error(`Error getting bot info: ${error.message}`);
      throw error;
    }
  }
}


