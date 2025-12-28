'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Input, Avatar } from '@/components/ui';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'notifications' | 'security' | 'billing' | 'integrations'>('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    achievements: true,
    challenges: true,
    messages: true,
    comments: true,
    likes: false,
  });

  const tabs = [
    { id: 'profile', label: 'Профиль', icon: '👤' },
    { id: 'privacy', label: 'Приватность', icon: '🔒' },
    { id: 'notifications', label: 'Уведомления', icon: '🔔' },
    { id: 'security', label: 'Безопасность', icon: '🛡️' },
    { id: 'billing', label: 'Платежи', icon: '💳' },
    { id: 'integrations', label: 'Интеграции', icon: '🔗' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="heading-2">Настройки ⚙️</h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Управляйте настройками аккаунта и приватностью
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-2">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-violet-500/10 text-violet-400'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Профиль</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar name="Иван Иванов" size="xl" />
                  <div>
                    <Button variant="secondary">Изменить фото</Button>
                    <p className="text-xs text-[var(--text-tertiary)] mt-2">
                      Рекомендуемый размер: 400x400px
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Имя" defaultValue="Иван" />
                  <Input label="Фамилия" defaultValue="Иванов" />
                  <Input label="Email" type="email" defaultValue="ivan@example.com" />
                  <Input label="Телефон" type="tel" defaultValue="+7 (999) 123-45-67" />
                  <Input label="Дата рождения" type="date" />
                  <div>
                    <label className="text-sm text-[var(--text-secondary)] mb-2 block">Пол</label>
                    <select className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl">
                      <option>Мужской</option>
                      <option>Женский</option>
                      <option>Другой</option>
                      <option>Не указано</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[var(--text-secondary)] mb-2 block">О себе</label>
                  <textarea
                    placeholder="Расскажите о себе..."
                    className="w-full min-h-[100px] px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl resize-none"
                    defaultValue="Люблю спорт и здоровый образ жизни"
                  />
                </div>

                <div className="flex gap-2">
                  <Button>Сохранить изменения</Button>
                  <Button variant="secondary">Отмена</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <Card>
              <CardHeader>
                <CardTitle>Приватность</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]">
                    <div>
                      <div className="font-medium mb-1">Публичный профиль</div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        Ваш профиль виден всем пользователям
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-[var(--bg-primary)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]">
                    <div>
                      <div className="font-medium mb-1">Показывать возраст</div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        Отображать ваш возраст в профиле
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-[var(--bg-primary)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]">
                    <div>
                      <div className="font-medium mb-1">Показывать вес</div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        Отображать ваш вес в профиле
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-[var(--bg-primary)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]">
                    <div>
                      <div className="font-medium mb-1">Разрешить сообщения</div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        Кто может отправлять вам сообщения
                      </div>
                    </div>
                    <select className="px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl text-sm">
                      <option>Все</option>
                      <option>Только подписчики</option>
                      <option>Никто</option>
                    </select>
                  </div>
                </div>

                <Button>Сохранить настройки</Button>
              </CardContent>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Уведомления</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]">
                      <div>
                        <div className="font-medium mb-1 capitalize">
                          {key === 'email' && 'Email уведомления'}
                          {key === 'push' && 'Push уведомления'}
                          {key === 'sms' && 'SMS уведомления'}
                          {key === 'achievements' && 'Достижения'}
                          {key === 'challenges' && 'Челленджи'}
                          {key === 'messages' && 'Сообщения'}
                          {key === 'comments' && 'Комментарии'}
                          {key === 'likes' && 'Лайки'}
                        </div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          Получать уведомления о {key === 'email' ? 'новостях и обновлениях' :
                          key === 'push' ? 'важных событиях' :
                          key === 'sms' ? 'критических событиях' :
                          key === 'achievements' ? 'новых достижениях' :
                          key === 'challenges' ? 'челленджах' :
                          key === 'messages' ? 'новых сообщениях' :
                          key === 'comments' ? 'комментариях' : 'лайках'}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={value}
                          onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                        />
                        <div className="w-11 h-6 bg-[var(--bg-primary)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <Button>Сохранить настройки</Button>
              </CardContent>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>Безопасность</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Смена пароля</h3>
                  <div className="space-y-4">
                    <Input label="Текущий пароль" type="password" />
                    <Input label="Новый пароль" type="password" />
                    <Input label="Подтвердите новый пароль" type="password" />
                    <Button>Изменить пароль</Button>
                  </div>
                </div>

                <div className="border-t border-[var(--border-subtle)] pt-6">
                  <h3 className="font-semibold mb-4">Двухфакторная аутентификация</h3>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]">
                    <div>
                      <div className="font-medium mb-1">2FA</div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        Дополнительная защита аккаунта
                      </div>
                    </div>
                    <Button variant="secondary">Включить</Button>
                  </div>
                </div>

                <div className="border-t border-[var(--border-subtle)] pt-6">
                  <h3 className="font-semibold mb-4">Активные сессии</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]">
                      <div>
                        <div className="font-medium">Chrome на Windows</div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          Москва, Россия • Сейчас
                        </div>
                      </div>
                      <Badge variant="success" size="sm">Текущая</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]">
                      <div>
                        <div className="font-medium">Safari на iPhone</div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          Москва, Россия • 2 часа назад
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Завершить</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <Card>
              <CardHeader>
                <CardTitle>Платежи и подписки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Активные подписки</h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium">Premium подписка</div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            До 15 февраля 2024
                          </div>
                        </div>
                        <Badge variant="success" size="sm">Активна</Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2">Управлять</Button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[var(--border-subtle)] pt-6">
                  <h3 className="font-semibold mb-4">Способы оплаты</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💳</span>
                        <div>
                          <div className="font-medium">**** **** **** 1234</div>
                          <div className="text-sm text-[var(--text-secondary)]">Истекает 12/25</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Удалить</Button>
                    </div>
                    <Button variant="secondary" fullWidth>Добавить карту</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <Card>
              <CardHeader>
                <CardTitle>Интеграции</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Apple Health', icon: '🍎', connected: true },
                  { name: 'Google Fit', icon: '📱', connected: false },
                  { name: 'Fitbit', icon: '⌚', connected: false },
                  { name: 'Garmin', icon: '🏃', connected: false },
                  { name: 'Telegram', icon: '✈️', connected: true },
                ].map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          {integration.connected ? 'Подключено' : 'Не подключено'}
                        </div>
                      </div>
                    </div>
                    {integration.connected ? (
                      <Button variant="danger" size="sm">Отключить</Button>
                    ) : (
                      <Button size="sm">Подключить</Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}


