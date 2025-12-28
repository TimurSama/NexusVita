'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Input } from '@/components/ui';

interface Wallet {
  address: string;
  network: string;
  balance: number;
  isConnected: boolean;
}

interface NFT {
  id: string;
  name: string;
  image: string;
  type: 'achievement' | 'certificate' | 'collectible';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export default function Web3Page() {
  const [activeTab, setActiveTab] = useState<'wallet' | 'tokens' | 'nft' | 'staking' | 'dao'>('wallet');
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);

  const handleConnectWallet = async () => {
    // Connect wallet logic
    console.log('Connecting wallet...');
    // In real app, this would trigger MetaMask or WalletConnect
    setWallet({
      address: '0x1234...5678',
      network: 'Ethereum',
      balance: 1250.5,
      isConnected: true,
    });
  };

  const handleDisconnectWallet = () => {
    setWallet(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="heading-2">Web3 & Блокчейн ⛓️</h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Управляйте кошельком, токенами, NFT и участвуйте в DAO
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-[var(--bg-secondary)] rounded-xl w-fit">
        {[
          { id: 'wallet', label: 'Кошелёк', icon: '💼' },
          { id: 'tokens', label: 'Токены', icon: '🪙' },
          { id: 'nft', label: 'NFT', icon: '🎨' },
          { id: 'staking', label: 'Стейкинг', icon: '🔒' },
          { id: 'dao', label: 'DAO', icon: '🗳️' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-violet-500 text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Wallet Tab */}
      {activeTab === 'wallet' && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Кошелёк</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {wallet ? (
                <>
                  <div>
                    <div className="text-sm text-[var(--text-secondary)] mb-1">Адрес</div>
                    <div className="font-mono text-sm bg-[var(--bg-tertiary)] p-3 rounded-xl">
                      {wallet.address}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-secondary)] mb-1">Сеть</div>
                    <Badge variant="default">{wallet.network}</Badge>
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-secondary)] mb-1">Баланс</div>
                    <div className="text-2xl font-bold text-violet-400">{wallet.balance} ETH</div>
                  </div>
                  <Button variant="danger" fullWidth onClick={handleDisconnectWallet}>
                    Отключить кошелёк
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-[var(--text-secondary)] mb-4">
                    Подключите криптовалютный кошелёк для работы с токенами и NFT
                  </p>
                  <Button fullWidth onClick={handleConnectWallet}>
                    Подключить кошелёк
                  </Button>
                  <div className="text-xs text-[var(--text-tertiary)] text-center">
                    Поддерживаются: MetaMask, WalletConnect, Coinbase Wallet
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="secondary" fullWidth disabled={!wallet}>
                💸 Отправить токены
              </Button>
              <Button variant="secondary" fullWidth disabled={!wallet}>
                📥 Получить токены
              </Button>
              <Button variant="secondary" fullWidth disabled={!wallet}>
                🔄 Обменять
              </Button>
              <Button variant="secondary" fullWidth disabled={!wallet}>
                📊 История транзакций
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tokens Tab */}
      {activeTab === 'tokens' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>NVT Токены</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-5xl font-bold text-violet-400 mb-2">1,250</div>
                <div className="text-[var(--text-secondary)] mb-6">NVT токенов</div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
                    <div className="text-sm text-[var(--text-secondary)] mb-1">Заработано</div>
                    <div className="text-xl font-bold text-green-400">+500</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
                    <div className="text-sm text-[var(--text-secondary)] mb-1">Потрачено</div>
                    <div className="text-xl font-bold text-red-400">-250</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
                    <div className="text-sm text-[var(--text-secondary)] mb-1">В стейкинге</div>
                    <div className="text-xl font-bold text-amber-400">750</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>Получить токены</Button>
                  <Button variant="secondary">Обменять</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Способы получения NVT</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '🏃', name: 'Move-to-Earn', desc: 'Зарабатывайте за активность' },
                  { icon: '💪', name: 'Тренировки', desc: 'Завершайте программы' },
                  { icon: '🏆', name: 'Челленджи', desc: 'Участвуйте и побеждайте' },
                  { icon: '📚', name: 'Обучение', desc: 'Проходите курсы' },
                  { icon: '👥', name: 'Рефералы', desc: 'Приглашайте друзей' },
                  { icon: '💰', name: 'Покупка', desc: 'Купите токены' },
                ].map((method) => (
                  <div key={method.name} className="p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors">
                    <div className="text-3xl mb-2">{method.icon}</div>
                    <div className="font-medium mb-1">{method.name}</div>
                    <div className="text-sm text-[var(--text-secondary)]">{method.desc}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* NFT Tab */}
      {activeTab === 'nft' && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Мои NFT</CardTitle>
              <Badge variant="default">{nfts.length} NFT</Badge>
            </CardHeader>
            <CardContent>
              {nfts.length > 0 ? (
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {nfts.map((nft) => (
                    <div key={nft.id} className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
                      <div className="aspect-square bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl mb-3 flex items-center justify-center text-4xl">
                        {nft.type === 'achievement' ? '🏆' : nft.type === 'certificate' ? '📜' : '🎨'}
                      </div>
                      <div className="font-medium mb-1">{nft.name}</div>
                      <Badge variant="default" size="sm">{nft.rarity}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">🎨</span>
                  <p className="text-[var(--text-secondary)] mb-2">У вас пока нет NFT</p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    Получайте NFT за достижения и участие в челленджах
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>NFT Маркетплейс</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <span className="text-5xl mb-4 block">🛒</span>
                <p className="text-[var(--text-secondary)] mb-4">Покупайте и продавайте NFT</p>
                <Button>Открыть маркетплейс</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Staking Tab */}
      {activeTab === 'staking' && (
        <Card>
          <CardHeader>
            <CardTitle>Стейкинг NVT</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-6">
              <div className="text-4xl font-bold text-violet-400 mb-2">750 NVT</div>
              <div className="text-[var(--text-secondary)] mb-4">В стейкинге</div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
                  <div className="text-sm text-[var(--text-secondary)] mb-1">APY</div>
                  <div className="text-xl font-bold text-green-400">12%</div>
                </div>
                <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
                  <div className="text-sm text-[var(--text-secondary)] mb-1">Заработано</div>
                  <div className="text-xl font-bold text-emerald-400">90 NVT</div>
                </div>
                <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
                  <div className="text-sm text-[var(--text-secondary)] mb-1">Срок</div>
                  <div className="text-xl font-bold">90 дней</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">Сумма стейкинга</label>
                <Input type="number" placeholder="0" />
              </div>
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">Срок (дней)</label>
                <select className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl">
                  <option>30 дней (8% APY)</option>
                  <option>60 дней (10% APY)</option>
                  <option>90 дней (12% APY)</option>
                  <option>180 дней (15% APY)</option>
                </select>
              </div>
              <Button fullWidth>Застейкать</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* DAO Tab */}
      {activeTab === 'dao' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>DAO Управление</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-4xl font-bold text-violet-400 mb-2">1,250 NVT</div>
                <div className="text-[var(--text-secondary)] mb-4">Ваша доля в DAO</div>
                <div className="text-sm text-[var(--text-tertiary)] mb-6">
                  Чем больше токенов, тем больше вес вашего голоса
                </div>
                <Link href="/dashboard/dao" className="btn btn-primary">
                  Участвовать в голосованиях
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Активные предложения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: 'Добавить новую функцию в приложение', votes: 234, status: 'active' },
                  { title: 'Изменить комиссию платформы', votes: 156, status: 'active' },
                ].map((proposal, index) => (
                  <div key={index} className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{proposal.title}</h3>
                      <Badge variant="success" size="sm">Активно</Badge>
                    </div>
                    <div className="text-sm text-[var(--text-secondary)] mb-3">
                      {proposal.votes} голосов
                    </div>
                    <Button size="sm">Проголосовать</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


