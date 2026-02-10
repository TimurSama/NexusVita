'use client'

import { motion } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'

export default function FAQSection() {
  const faqs = [
    {
      q: 'Как работает ИИ-планировщик?',
      a: 'ИИ анализирует ваши цели, предпочтения, ограничения и интегрированные данные (анализы, тренировки, питание), создавая персональный план. План динамически адаптируется по мере получения новых данных.',
    },
    {
      q: 'Как оплачивать тренеров?',
      a: 'Все платежи проходят через приложение. Вы можете оплачивать разовые сессии или покупать пакеты услуг. Интеграция с календарем позволяет автоматически планировать и оплачивать консультации.',
    },
    {
      q: 'Безопасны ли мои медицинские данные?',
      a: 'Да, все данные хранятся с шифрованием, соответствуют требованиям GDPR и HIPAA. Вы полностью контролируете доступ к вашим данным и можете экспортировать или удалить их в любой момент.',
    },
    {
      q: 'Можно ли использовать бесплатно?',
      a: 'Да, базовая версия доступна бесплатно с ограниченным функционалом. Вы можете попробовать ИИ-планировщик и основные функции. Для полного доступа рекомендуется подписка.',
    },
    {
      q: 'Что включает премиум подписка?',
      a: 'Премиум подписка ($25/мес) включает неограниченный чат с персональным ИИ-коучем, выбор и загрузку библиотек исследований и знаний для глубокой персонализации, расширенную аналитику, приоритетную поддержку и скидки в магазине.',
    },
    {
      q: 'Как интегрировать устройства?',
      a: 'Поддерживается интеграция с Apple Watch, Garmin, Oura, умными весами и другими устройствами через OAuth. Данные синхронизируются автоматически в реальном времени.',
    },
  ]

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            Часто задаваемые вопросы
          </h2>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <NeumorphicCard className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-warmGraphite-800 mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm sm:text-base text-warmGraphite-600">
                  {faq.a}
                </p>
              </NeumorphicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
