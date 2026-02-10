'use client'

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function PresentationFooter() {
  return (
    <footer className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-warmGraphite-800 text-warmGray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">NexusVita</h3>
            <p className="text-sm sm:text-base text-warmGray-400">
              Цифровой путь к здоровью и энергии
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Продукт</h4>
            <ul className="space-y-2 text-sm sm:text-base text-warmGray-400">
              <li><a href="/about" className="hover:text-warmGray-200 transition-colors">О нас</a></li>
              <li><a href="/roadmap" className="hover:text-warmGray-200 transition-colors">Дорожная карта</a></li>
              <li><a href="/subscriptions" className="hover:text-warmGray-200 transition-colors">Подписки</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Поддержка</h4>
            <ul className="space-y-2 text-sm sm:text-base text-warmGray-400">
              <li><a href="/faq" className="hover:text-warmGray-200 transition-colors">FAQ</a></li>
              <li><a href="/contact" className="hover:text-warmGray-200 transition-colors">Контакты</a></li>
              <li><a href="/legal" className="hover:text-warmGray-200 transition-colors">Правовая информация</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Социальные сети</h4>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="hover:text-warmGray-200 transition-colors"><Facebook className="w-4 h-4 sm:w-5 sm:h-5" /></a>
              <a href="#" className="hover:text-warmGray-200 transition-colors"><Instagram className="w-4 h-4 sm:w-5 sm:h-5" /></a>
              <a href="#" className="hover:text-warmGray-200 transition-colors"><Twitter className="w-4 h-4 sm:w-5 sm:h-5" /></a>
              <a href="#" className="hover:text-warmGray-200 transition-colors"><Youtube className="w-4 h-4 sm:w-5 sm:h-5" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-warmGray-700 pt-6 sm:pt-8 text-center text-sm sm:text-base text-warmGray-400">
          <p>&copy; 2025 NexusVita. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
