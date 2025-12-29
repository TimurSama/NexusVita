'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Avatar } from '@/components/ui';

const categories = [
  { id: 'all', name: 'Все', icon: '🛍️' },
  { id: 'programs', name: 'Программы', icon: '📋' },
  { id: 'courses', name: 'Курсы', icon: '📚' },
  { id: 'consultations', name: 'Консультации', icon: '💬' },
  { id: 'nft', name: 'NFT', icon: '🎨' },
  { id: 'merchandise', name: 'Мерч', icon: '👕' },
];

const products = [
  {
    id: 1,
    name: '12-недельная трансформация тела',
    description: 'Полная программа тренировок и питания для максимального результата',
    seller: 'Алекс Петров',
    sellerAvatar: null,
    category: 'programs',
    priceNVT: 500,
    priceFiat: 4990,
    rating: 4.9,
    reviews: 234,
    sales: 1250,
    isNFT: false,
    isPremium: true,
    image: null,
  },
  {
    id: 2,
    name: 'Мастер-класс по нутрициологии',
    description: 'Научитесь составлять правильный рацион питания',
    seller: 'Мария Козлова',
    sellerAvatar: null,
    category: 'courses',
    priceNVT: 300,
    priceFiat: 2990,
    rating: 4.8,
    reviews: 89,
    sales: 567,
    isNFT: false,
    isPremium: false,
    image: null,
  },
  {
    id: 3,
    name: 'NFT Сертификат фитнес-тренера',
    description: 'Уникальный верифицированный сертификат на блокчейне',
    seller: 'Nexus Vita',
    sellerAvatar: null,
    category: 'nft',
    priceNVT: 1000,
    priceFiat: 9990,
    rating: 5.0,
    reviews: 45,
    sales: 120,
    isNFT: true,
    isPremium: true,
    image: null,
  },
  {
    id: 4,
    name: 'Консультация психолога (1 час)',
    description: 'Индивидуальная онлайн-консультация с сертифицированным специалистом',
    seller: 'Елена Смирнова',
    sellerAvatar: null,
    category: 'consultations',
    priceNVT: 200,
    priceFiat: 3500,
    rating: 4.7,
    reviews: 156,
    sales: 890,
    isNFT: false,
    isPremium: false,
    image: null,
  },
  {
    id: 5,
    name: 'Брендированная футболка Nexus Vita',
    description: 'Премиальный хлопок, эксклюзивный дизайн',
    seller: 'Nexus Vita Store',
    sellerAvatar: null,
    category: 'merchandise',
    priceNVT: 100,
    priceFiat: 1990,
    rating: 4.6,
    reviews: 78,
    sales: 450,
    isNFT: false,
    isPremium: false,
    image: null,
  },
  {
    id: 6,
    name: 'NFT Достижение "Марафонец"',
    description: 'Уникальный NFT за прохождение 100 км за месяц',
    seller: 'Nexus Vita',
    sellerAvatar: null,
    category: 'nft',
    priceNVT: 250,
    priceFiat: 2490,
    rating: 4.9,
    reviews: 34,
    sales: 89,
    isNFT: true,
    isPremium: true,
    image: null,
  },
];

const featuredProducts = products.slice(0, 3);

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [paymentType, setPaymentType] = useState<'nvt' | 'fiat'>('nvt');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (paymentType === 'nvt' ? a.priceNVT : a.priceFiat) - (paymentType === 'nvt' ? b.priceNVT : b.priceFiat);
      case 'price-high':
        return (paymentType === 'nvt' ? b.priceNVT : b.priceFiat) - (paymentType === 'nvt' ? a.priceNVT : a.priceFiat);
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.sales - a.sales;
    }
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-2">Маркетплейс 🛒</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Программы, курсы, консультации и NFT
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/marketplace/my-products" className="btn btn-secondary">
            Мои товары
          </Link>
          <Link href="/dashboard/marketplace/create" className="btn btn-primary">
            Продать
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full blur-3xl" />
        <CardHeader>
          <CardTitle>🔥 Популярное</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-all cursor-pointer"
              >
                <div className="aspect-video rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 mb-4 flex items-center justify-center relative overflow-hidden">
                  <span className="text-4xl">
                    {product.category === 'programs' ? '💪' :
                     product.category === 'courses' ? '📚' :
                     product.category === 'nft' ? '🎨' :
                     product.category === 'consultations' ? '💬' : '🛍️'}
                  </span>
                  {product.isPremium && (
                    <Badge variant="warning" size="sm" className="absolute top-2 right-2">
                      PRO
                    </Badge>
                  )}
                  {product.isNFT && (
                    <Badge variant="primary" size="sm" className="absolute top-2 left-2">
                      NFT
                    </Badge>
                  )}
                </div>
                <h3 className="font-medium mb-1 group-hover:text-violet-400 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-2">
                  <Avatar size="xs" name={product.seller} />
                  <span>{product.seller}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-violet-400">{product.priceNVT} NVT</span>
                    <span className="text-xs text-[var(--text-tertiary)] ml-2">
                      / {product.priceFiat} ₽
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-400">⭐</span>
                    <span>{product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories & Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-violet-500 text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-xl text-sm"
          >
            <option value="popular">Популярные</option>
            <option value="price-low">Цена: по возрастанию</option>
            <option value="price-high">Цена: по убыванию</option>
            <option value="rating">По рейтингу</option>
          </select>

          <div className="flex rounded-xl overflow-hidden border border-[var(--border-default)]">
            <button
              onClick={() => setPaymentType('nvt')}
              className={`px-4 py-2 text-sm transition-colors ${
                paymentType === 'nvt'
                  ? 'bg-violet-500 text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
              }`}
            >
              🪙 NVT
            </button>
            <button
              onClick={() => setPaymentType('fiat')}
              className={`px-4 py-2 text-sm transition-colors ${
                paymentType === 'fiat'
                  ? 'bg-violet-500 text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
              }`}
            >
              ₽ RUB
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} hover clickable className="group">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-violet-500/50 to-cyan-500/50 mb-4 flex items-center justify-center relative overflow-hidden">
              <span className="text-5xl group-hover:scale-110 transition-transform">
                {product.category === 'programs' ? '💪' :
                 product.category === 'courses' ? '📚' :
                 product.category === 'nft' ? '🎨' :
                 product.category === 'consultations' ? '💬' : '👕'}
              </span>
              <div className="absolute top-2 right-2 flex gap-1">
                {product.isPremium && <Badge variant="warning" size="sm">PRO</Badge>}
                {product.isNFT && <Badge variant="primary" size="sm">NFT</Badge>}
              </div>
            </div>

            <h3 className="font-medium mb-1 line-clamp-2 group-hover:text-violet-400 transition-colors">
              {product.name}
            </h3>

            <p className="text-sm text-[var(--text-tertiary)] mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center gap-2 mb-3">
              <Avatar size="xs" name={product.seller} />
              <span className="text-sm text-[var(--text-secondary)]">{product.seller}</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-sm">
                <span className="text-yellow-400">⭐</span>
                <span>{product.rating}</span>
                <span className="text-[var(--text-tertiary)]">({product.reviews})</span>
              </div>
              <span className="text-xs text-[var(--text-tertiary)]">
                {product.sales} продаж
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
              <div>
                {paymentType === 'nvt' ? (
                  <>
                    <span className="font-bold text-violet-400">{product.priceNVT} NVT</span>
                    <span className="text-xs text-[var(--text-tertiary)] ml-1">≈ {product.priceFiat} ₽</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold">{product.priceFiat} ₽</span>
                    <span className="text-xs text-[var(--text-tertiary)] ml-1">≈ {product.priceNVT} NVT</span>
                  </>
                )}
              </div>
              <Button size="sm">Купить</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="secondary">Загрузить ещё</Button>
      </div>

      {/* Become a Seller */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-600/20" />
        <div className="relative p-8 text-center">
          <h3 className="heading-3 mb-4">Станьте продавцом на Nexus Vita</h3>
          <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
            Продавайте свои программы, курсы и услуги миллионам пользователей. 
            Получайте оплату в NVT токенах или фиатной валюте.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/dashboard/marketplace/become-seller" className="btn btn-primary">
              Начать продавать
            </Link>
            <Link href="/dashboard/marketplace/learn-more" className="btn btn-secondary">
              Узнать больше
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}



