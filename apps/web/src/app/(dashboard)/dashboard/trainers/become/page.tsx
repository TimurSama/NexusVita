'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Input, Avatar } from '@/components/ui';

export default function BecomeTrainerPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: '',
    slug: '',
    bio: '',
    specializations: [] as string[],
    certifications: [] as string[],
    experience: '',
    priceRange: '',
    availableForOnline: false,
    availableForOffline: false,
    locations: [] as string[],
  });

  const allSpecializations = [
    'Фитнес', 'Силовые тренировки', 'Функциональный тренинг', 'Йога', 'Пилатес',
    'Нутрициология', 'Психология', 'Реабилитация', 'Танцы', 'Бокс', 'Плавание',
  ];

  const handleSpecializationToggle = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter(s => s !== spec)
        : [...prev.specializations, spec],
    }));
  };

  const handleAddCertification = () => {
    const cert = prompt('Введите название сертификата:');
    if (cert) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, cert],
      }));
    }
  };

  const handleSubmit = async () => {
    // Submit form data
    console.log('Submitting:', formData);
    // await trainerApi.createTrainerProfile(formData);
    router.push(`/dashboard/trainers/${formData.slug}`);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="heading-2">Стать специалистом 👨‍🏫</h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Создайте свою страницу и начните работать с клиентами
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= s ? 'bg-violet-500 text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
            }`}>
              {step > s ? '✓' : s}
            </div>
            {s < 3 && (
              <div className={`flex-1 h-1 mx-2 ${
                step > s ? 'bg-violet-500' : 'bg-[var(--bg-tertiary)]'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">Имя для отображения *</label>
              <Input
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                placeholder="Алекс Петров"
              />
            </div>

            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">URL страницы *</label>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-secondary)]">nexusvita.io/trainers/</span>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  placeholder="alex-petrov"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">О себе *</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Расскажите о себе, своём опыте и подходе к работе..."
                className="w-full min-h-[150px] px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl resize-none"
              />
            </div>

            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">Опыт работы (лет) *</label>
              <Input
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="5"
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!formData.displayName || !formData.slug || !formData.bio}>
                Далее
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Specializations & Certifications */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Специализации и сертификаты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-3 block">Выберите специализации *</label>
              <div className="flex flex-wrap gap-2">
                {allSpecializations.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => handleSpecializationToggle(spec)}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      formData.specializations.includes(spec)
                        ? 'bg-violet-500 text-white'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-3 block">Сертификаты</label>
              <div className="space-y-2 mb-3">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-tertiary)]">
                    <span>{cert}</span>
                    <button
                      onClick={() => setFormData({
                        ...formData,
                        certifications: formData.certifications.filter((_, i) => i !== index),
                      })}
                      className="text-red-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="secondary" onClick={handleAddCertification}>
                + Добавить сертификат
              </Button>
            </div>

            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(1)}>Назад</Button>
              <Button onClick={() => setStep(3)} disabled={formData.specializations.length === 0}>
                Далее
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Pricing & Availability */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Цены и доступность</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">Диапазон цен *</label>
              <Input
                value={formData.priceRange}
                onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                placeholder="2000-3000 ₽/час"
              />
            </div>

            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-3 block">Форматы работы</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-tertiary)] cursor-pointer hover:bg-[var(--bg-elevated)] transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.availableForOnline}
                    onChange={(e) => setFormData({ ...formData, availableForOnline: e.target.checked })}
                    className="w-5 h-5 rounded border-[var(--border-default)] bg-[var(--bg-primary)] text-violet-500"
                  />
                  <div>
                    <div className="font-medium">Онлайн тренировки</div>
                    <div className="text-sm text-[var(--text-secondary)]">Видеозвонки, удалённые консультации</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-tertiary)] cursor-pointer hover:bg-[var(--bg-elevated)] transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.availableForOffline}
                    onChange={(e) => setFormData({ ...formData, availableForOffline: e.target.checked })}
                    className="w-5 h-5 rounded border-[var(--border-default)] bg-[var(--bg-primary)] text-violet-500"
                  />
                  <div>
                    <div className="font-medium">Офлайн тренировки</div>
                    <div className="text-sm text-[var(--text-secondary)]">Личные встречи, занятия в зале</div>
                  </div>
                </label>
              </div>
            </div>

            {formData.availableForOffline && (
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">Локации</label>
                <Input
                  placeholder="Москва, Санкт-Петербург..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (value && !formData.locations.includes(value)) {
                        setFormData({ ...formData, locations: [...formData.locations, value] });
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.locations.map((loc, index) => (
                    <Badge key={index} variant="default">
                      {loc}
                      <button
                        onClick={() => setFormData({
                          ...formData,
                          locations: formData.locations.filter((_, i) => i !== index),
                        })}
                        className="ml-2"
                      >
                        ✕
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(2)}>Назад</Button>
              <Button onClick={handleSubmit} disabled={!formData.priceRange || (!formData.availableForOnline && !formData.availableForOffline)}>
                Создать страницу
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview */}
      {step > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Предпросмотр</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar name={formData.displayName || 'Имя'} size="lg" />
              <div>
                <h3 className="font-semibold">{formData.displayName || 'Имя специалиста'}</h3>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{formData.bio || 'Описание...'}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.specializations.slice(0, 3).map((spec) => (
                    <Badge key={spec} variant="default" size="sm">{spec}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}



