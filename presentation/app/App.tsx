import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  Brain, 
  Droplets, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Info,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Microscope,
  Zap,
  Users,
  Calendar,
  Settings,
  PieChart,
  ShoppingBag,
  MessageCircle,
  Clock,
  Layout,
  Layers,
  Globe,
  Plus,
  Moon,
  TrendingUp,
  Target,
  BarChart3,
  Dna,
  UserCheck
} from 'lucide-react';
import { 
  SketchButton, 
  SketchCard, 
  BlueprintLabel, 
  SketchSlider, 
  Annotation,
  cn 
} from './components/SketchUI';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { 
  PieChart as RePieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip,
  AreaChart,
  Area
} from 'recharts';
import confetti from 'canvas-confetti';

// --- Types ---
type Lang = 'RU' | 'EN';

// --- Mock Data ---
const SECTORS = [
  { id: 'medicine', icon: Stethoscope, label: { RU: 'Медицина', EN: 'Medicine' }, desc: { RU: 'Централизованная история данных, анализы и протоколы профилактики.', EN: 'Centralized medical history, labs, and prevention protocols.' } },
  { id: 'sport', icon: Activity, label: { RU: 'Спорт', EN: 'Sport' }, desc: { RU: 'Тренировки, программы, прогресс, интеграция с фитнес-центрами.', EN: 'Workouts, programs, progress, fitness center integration.' } },
  { id: 'psycho', icon: Brain, label: { RU: 'Психо', EN: 'Psychology' }, desc: { RU: 'Дневники настроения, практики осознанности, работа с психологами.', EN: 'Mood journals, mindfulness, sessions with psychologists.' } },
  { id: 'nutrition', icon: Droplets, label: { RU: 'Питание', EN: 'Nutrition' }, desc: { RU: 'Рационы, калории, макронутриенты, работа с нутрициологами.', EN: 'Diets, calories, macros, work with nutritionists.' } },
  { id: 'social', icon: Users, label: { RU: 'Социальное', EN: 'Social' }, desc: { RU: 'Сообщества, группы, совместные активности, поддержка.', EN: 'Communities, groups, joint activities, support.' } },
  { id: 'sleep', icon: Moon, label: { RU: 'Сон', EN: 'Sleep' }, desc: { RU: 'Трекинг сна, анализ качества, рекомендации по улучшению.', EN: 'Sleep tracking, quality analysis, improvement recommendations.' } },
  { id: 'prevention', icon: ShieldCheck, label: { RU: 'Профилактика', EN: 'Prevention' }, desc: { RU: 'Чек-листы, напоминания, программы профилактики заболеваний.', EN: 'Check-lists, reminders, disease prevention programs.' } }
];

const TOKENOMICS = [
  { name: 'Investors', value: 30, color: '#2b1d18' },
  { name: 'Team', value: 20, color: '#4d3b33' },
  { name: 'Reserve', value: 15, color: '#7a665e' },
  { name: 'Marketing', value: 15, color: '#a68c81' },
  { name: 'Liquidity', value: 10, color: '#c9b4aa' },
  { name: 'Rewards', value: 10, color: '#e8dad2' },
];

const GROWTH_DATA = [
  { month: 'Q1', users: 1000, arr: 50 },
  { month: 'Q2', users: 10000, arr: 500 },
  { month: 'Q3', users: 50000, arr: 2500 },
  { month: 'Q4', users: 200000, arr: 10000 },
];

// --- Main App Component ---
export default function App() {
  const [lang, setLang] = useState<Lang>('RU');
  const [activeSector, setActiveSector] = useState(SECTORS[0].id);
  const [perspective, setPerspective] = useState<'users' | 'specialists' | 'partners'>('users');
  const [showPlanModal, setShowPlanModal] = useState(false);
  
  // Survey State
  const [survey, setSurvey] = useState({
    height: 175,
    weight: 70,
    sleepGoal: 8,
    trainingsPerWeek: 3,
    caloriesGoal: 2200,
    intensity: 'Умеренный',
    mainGoal: 'Здоровье'
  });

  const [chatMessages, setChatMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
    { role: 'ai', text: 'Привет! Я твой Nexus-ассистент. Пока ты изучаешь презентацию, я помогу составить твой план. Как тебя зовут?' }
  ]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const t = (ru: string, en: string) => lang === 'RU' ? ru : en;

  const handleSurveyChange = (key: keyof typeof survey, val: any) => {
    setSurvey(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="min-h-screen bg-parchment font-serif text-ink selection:bg-ink selection:text-parchment">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-ink z-[100] origin-left" style={{ scaleX }} />

      {/* Persistent UI Elements */}
      <div className="fixed top-6 right-6 z-[90] flex gap-4">
        <button 
          onClick={() => setLang(l => l === 'RU' ? 'EN' : 'RU')}
          className="px-4 py-2 bg-ink text-parchment rounded-full font-mono text-xs uppercase hover:scale-105 transition-transform"
        >
          {lang}
        </button>
      </div>

      {/* Chat Widget (Section 26) */}
      <ChatWidget lang={lang} messages={chatMessages} onSendMessage={(text: string) => setChatMessages(p => [...p, { role: 'user', text }])} />

      {/* 1. Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <BackgroundTexture />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10 max-w-5xl"
        >
          <BlueprintLabel className="mb-6">Project Code: NexusVita_v1.0</BlueprintLabel>
          <h1 className="text-[10vw] font-bold leading-none mb-4 tracking-tight uppercase">NexusVita</h1>
          <h2 className="text-4xl font-serif italic text-ink/80 mb-6">
            {t('Первая экосистема полного здоровья человека', 'First Complete Human Health Ecosystem')}
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-12 opacity-70">
            {t('От анализа состояния до персональных планов: тренировки, питание, психо-эмоциональное здоровье и социальная интеграция', 'From assessment to personal plans: training, nutrition, psycho-emotional health and social integration')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-24">
            <SketchButton>{t('Начать бесплатно', 'Start Free')}</SketchButton>
            <SketchButton variant="secondary">{t('Получить подписку', 'Get Subscription')}</SketchButton>
          </div>

          <div className="relative mt-12 scale-90 md:scale-100">
             <VitruvianMan activeId={activeId => setActiveSector(activeId)} />
             <AnimatePresence mode="wait">
                <motion.div 
                  key={activeSector}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute -right-12 top-0 w-64 text-left hidden lg:block"
                >
                  <SketchCard title={SECTORS.find(s => s.id === activeSector)?.label[lang]}>
                    <p className="text-sm">{SECTORS.find(s => s.id === activeSector)?.desc[lang]}</p>
                  </SketchCard>
                </motion.div>
             </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* 2 & 3. Executive Summary & Ecosystem */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <SectionHeader number="02" title="Executive Summary" subtitle={t('Краткое резюме экосистемы', 'Ecosystem Executive Summary')} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <SketchCard title={t('Что такое NexusVita?', 'What is NexusVita?')}>
              <p className="text-xl mb-6">
                {t('NexusVita — экосистемная платформа для комплексного управления здоровьем, образом жизни и развитием человека с устойчивой экономической моделью.', 'NexusVita is an ecosystem platform for comprehensive health, lifestyle, and human development management with a sustainable economic model.')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeatureItem icon={Activity} label={t('Долгосрочное сопровождение', 'Long-term Support')} />
                <FeatureItem icon={Users} label={t('Профессиональная сеть', 'Professional Network')} />
                <FeatureItem icon={PieChart} label={t('Экономические механизмы', 'Economic Mechanisms')} />
                <FeatureItem icon={Globe} label={t('Социальная среда', 'Social Environment')} />
              </div>
            </SketchCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SummaryCard perspective="users" active={perspective === 'users'} onClick={() => setPerspective('users')} title={t('Пользователи', 'Users')} />
              <SummaryCard perspective="specialists" active={perspective === 'specialists'} onClick={() => setPerspective('specialists')} title={t('Специалисты', 'Specialists')} />
              <SummaryCard perspective="partners" active={perspective === 'partners'} onClick={() => setPerspective('partners')} title={t('Партнёры', 'Partners')} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={perspective}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <SketchCard title={t(`Ценность для ${perspective === 'users' ? 'пользователей' : perspective === 'specialists' ? 'специалистов' : 'партнёров'}`, `Value for ${perspective}`)}>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getValuePoints(perspective, lang).map((point: string, i: number) => (
                      <li key={i} className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 mt-1 text-ink" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </SketchCard>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <SketchCard title={t('Продукты', 'Products')} className="h-full">
              <div className="space-y-6">
                <ProductLine icon={Layout} label={t('B2C Приложение', 'B2C App')} sub={t('Дневники, планы, ИИ', 'Journals, plans, AI')} />
                <ProductLine icon={Layout} label={t('B2B Кабинеты', 'B2B Cabinets')} sub={t('Управление клиентами', 'Client management')} />
                <ProductLine icon={Globe} label={t('Экосистемные проекты', 'Ecosystem projects')} sub={t('DAO, Исследования', 'DAO, Research')} />
                <div className="pt-8">
                  <Annotation>{t('Единая модель данных для всех модулей', 'Unified data model for all modules')}</Annotation>
                </div>
              </div>
            </SketchCard>
          </div>
        </div>
      </section>

      {/* 4. Market Analysis */}
      <section className="py-32 px-8 bg-ink/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeader number="04" title="Market Analysis" subtitle={t('Проблематика и потенциал', 'Market Problems & Potential')} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <SketchCard className="mb-8 border-ink">
                <h4 className="text-2xl font-bold mb-4">{t('Текущая проблема: Фрагментация', 'Current Problem: Fragmentation')}</h4>
                <p className="opacity-70 mb-6 italic">
                  {t('Digital health растёт, но рынок фрагментирован: отдельные приложения для активности, питания, сна, тренировок и общения со специалистами.', 'Digital health is growing, but the market is fragmented: separate apps for activity, nutrition, sleep, training and communication with specialists.')}
                </p>
                <div className="space-y-4">
                  <ProblemItem label={t('Нет единого контекста данных', 'No unified data context')} />
                  <ProblemItem label={t('Слабая интеграция сервисов', 'Weak service integration')} />
                  <ProblemItem label={t('Разрыв между советом и действием', 'Gap between advice and action')} />
                  <ProblemItem label={t('Низкая вовлеченность (LTV)', 'Low engagement (LTV)')} />
                </div>
              </SketchCard>
              <Annotation>{t('NexusVita собирает все осколки в один механизм', 'NexusVita collects all fragments into one mechanism')}</Annotation>
            </div>

            <div className="relative">
              <SketchCard title={t('Решение: Единый Контур', 'Solution: Unified Circuit')}>
                <div className="h-80 w-full relative">
                  {/* Abstract Diagram */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-ink sketch-border animate-[spin_20s_linear_infinite] flex items-center justify-center">
                       <div className="w-32 h-32 border-2 border-ink sketch-border animate-[spin_10s_linear_infinite_reverse]" />
                    </div>
                    <div className="absolute inset-0 grid grid-cols-2 gap-12 p-8">
                       <div className="font-mono text-[10px] uppercase">{t('Данные', 'Data')}</div>
                       <div className="font-mono text-[10px] uppercase text-right">{t('Планы', 'Plans')}</div>
                       <div className="font-mono text-[10px] uppercase mt-auto">{t('Социум', 'Social')}</div>
                       <div className="font-mono text-[10px] uppercase text-right mt-auto">{t('Услуги', 'Services')}</div>
                    </div>
                    <Dna className="w-12 h-12 absolute z-10" />
                  </div>
                </div>
                <div className="text-center mt-6">
                  <BlueprintLabel>{t('Экосистемная модель монетизации', 'Ecosystem Monetization Model')}</BlueprintLabel>
                </div>
              </SketchCard>
            </div>
          </div>
        </div>
      </section>

      {/* 5 & 6. Architecture & Body Explorer */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <SectionHeader number="05" title="Architecture & Body" subtitle={t('Ядро системы и исследование тела', 'Core System & Body Explorer')} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <SketchCard title={t('Архитектура платформы', 'Platform Architecture')}>
            <div className="space-y-4 font-mono text-sm">
              <div className="p-4 border border-ink/20 sketch-border flex justify-between items-center">
                <span>[ LAYER 01 ] {t('Интеграционный слой', 'Integration Layer')}</span>
                <span className="text-[10px] opacity-40">IoT / API / WEARABLES</span>
              </div>
              <div className="flex justify-center"><ArrowRight className="rotate-90 w-4 h-4 opacity-30" /></div>
              <div className="p-4 border-2 border-ink sketch-border bg-ink/5 flex justify-between items-center">
                <span>[ LAYER 02 ] {t('Nexus Intelligence Core', 'Nexus Intelligence Core')}</span>
                <span className="text-[10px] opacity-60">AI / PERSONALIZATION</span>
              </div>
              <div className="flex justify-center"><ArrowRight className="rotate-90 w-4 h-4 opacity-30" /></div>
              <div className="p-4 border border-ink/20 sketch-border flex justify-between items-center">
                <span>[ LAYER 03 ] {t('Пользовательский опыт', 'User Experience')}</span>
                <span className="text-[10px] opacity-40">APP / WEB / DAO</span>
              </div>
            </div>
          </SketchCard>

          <SketchCard title={t('Body Explorer', 'Body Explorer')}>
            <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center border-4 border-ink/5 rounded-full neumorph-sketch-inset">
               <ImageWithFallback 
                src="https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmF0b215JTIwc2tldGNoJTIwaHVtYW58ZW58MXx8fHwxNzcwNzI4MDU1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                className="w-3/4 h-3/4 object-contain opacity-50 grayscale"
                alt="Body Anatomy"
               />
               <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 bg-parchment border border-ink sketch-border flex items-center justify-center cursor-pointer shadow-lg">
                    <Brain className="w-8 h-8" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 bg-parchment border border-ink sketch-border flex items-center justify-center cursor-pointer shadow-lg ml-auto">
                    <Heart className="w-8 h-8" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 bg-parchment border border-ink sketch-border flex items-center justify-center cursor-pointer shadow-lg mt-auto">
                    <Activity className="w-8 h-8" />
                  </motion.div>
               </div>
            </div>
          </SketchCard>
        </div>
      </section>

      {/* 7. Product Modules */}
      <section className="py-32 px-8 bg-ink text-parchment overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <BlueprintLabel className="bg-parchment text-ink">{t('Инструменты здоровья', 'Health Tools')}</BlueprintLabel>
            <h2 className="text-6xl font-serif font-bold mt-4">{t('Продуктовые Модули', 'Product Modules')}</h2>
            <p className="text-xl opacity-60 mt-4 max-w-2xl">{t('Каждый модуль — самостоятельная единица с полным функционалом', 'Each module is a standalone unit with full functionality')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ModuleCard icon={UserCheck} title={t('Профиль', 'Profile')} desc={t('Динамическая модель человека: данные, цели, ограничения.', 'Dynamic human model: data, goals, constraints.')} />
            <ModuleCard icon={Activity} title={t('Трекинг', 'Tracking')} desc={t('Единый контур: ручной ввод, устройства, программы.', 'Unified circuit: manual input, devices, programs.')} />
            <ModuleCard icon={Brain} title={t('Аналитика', 'Analytics')} desc={t('Анализ паттернов, корреляций и трендов.', 'Analysis of patterns, correlations and trends.')} />
            <ModuleCard icon={Calendar} title={t('Планировщик', 'Planner')} desc={t('Автоматическое планирование тренировок и встреч.', 'Automatic planning of workouts and meetings.')} />
            <ModuleCard icon={MessageCircle} title={t('Ежедневник', 'Journal')} desc={t('Трекинг эмоций, энергии и ИИ-рекомендации.', 'Tracking emotions, energy and AI recommendations.')} />
            <ModuleCard icon={Target} title={t('Цели', 'Goals')} desc={t('Визуализация прогресса и система наград.', 'Progress visualization and rewards system.')} />
            <ModuleCard icon={Microscope} title={t('Мед. карта', 'Medical Card')} desc={t('Централизованное хранение анализов и истории.', 'Centralized storage of labs and history.')} />
            <ModuleCard icon={ShoppingBag} title={t('Маркетплейс', 'Marketplace')} desc={t('Запись к специалистам и покупка продуктов.', 'Booking specialists and purchasing products.')} />
            <ModuleCard icon={Users} title={t('Соц. сеть', 'Social Network')} desc={t('Сообщества по интересам и совместные челленджи.', 'Interest communities and joint challenges.')} />
          </div>
        </div>
      </section>

      {/* 9, 10, 11. AI Planner & Interactive Survey */}
      <section id="survey" className="py-32 px-8 max-w-7xl mx-auto">
        <SectionHeader number="09" title="Interactive Planner" subtitle={t('Настройте свой профиль', 'Configure Your Profile')} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <SketchCard title={t('Параметры здоровья', 'Health Parameters')}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <SketchSlider 
                  label={t('Рост', 'Height')} min={100} max={250} unit="cm" 
                  value={survey.height} onChange={(v: number) => handleSurveyChange('height', v)} 
                />
                <SketchSlider 
                  label={t('Вес', 'Weight')} min={30} max={200} unit="kg" 
                  value={survey.weight} onChange={(v: number) => handleSurveyChange('weight', v)} 
                />
                <SketchSlider 
                  label={t('Цель по сну', 'Sleep Goal')} min={4} max={12} unit="h" 
                  value={survey.sleepGoal} onChange={(v: number) => handleSurveyChange('sleepGoal', v)} 
                />
                <SketchSlider 
                  label={t('Тренировок в неделю', 'Workouts / week')} min={1} max={7} unit="" 
                  value={survey.trainingsPerWeek} onChange={(v: number) => handleSurveyChange('trainingsPerWeek', v)} 
                />
              </div>

              <div className="mt-8 space-y-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase opacity-60">{t('Главная цель', 'Main Goal')}</label>
                  <div className="flex flex-wrap gap-3">
                    {['Здоровье', 'Форма', 'Долголетие', 'Профилактика'].map(goal => (
                      <button 
                        key={goal}
                        onClick={() => handleSurveyChange('mainGoal', goal)}
                        className={cn(
                          "px-6 py-2 border-2 border-ink sketch-border transition-all",
                          survey.mainGoal === goal ? "bg-ink text-parchment" : "hover:bg-ink/5"
                        )}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase opacity-60">{t('Интенсивность плана', 'Plan Intensity')}</label>
                  <div className="flex flex-wrap gap-3">
                    {['Мягкий', 'Умеренный', 'Интенсивный'].map(level => (
                      <button 
                        key={level}
                        onClick={() => handleSurveyChange('intensity', level)}
                        className={cn(
                          "px-6 py-2 border-2 border-ink sketch-border transition-all",
                          survey.intensity === level ? "bg-ink text-parchment" : "hover:bg-ink/5"
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SketchCard>
          </div>

          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={survey.intensity}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full"
              >
                <SketchCard title={t('Ваш ИИ-Прогноз', 'Your AI Forecast')} className="h-full border-2 border-ink bg-ink/5">
                  <div className="space-y-12">
                    <div className="text-center">
                      <div className="text-7xl font-mono font-bold">{calculateBMI(survey.weight, survey.height)}</div>
                      <BlueprintLabel className="mt-4">Body Mass Index</BlueprintLabel>
                    </div>

                    <div className="space-y-6">
                      <ForecastRow label={t('Метаболическая адаптация', 'Metabolic Adaptation')} percent={survey.trainingsPerWeek * 12} />
                      <ForecastRow label={t('Когнитивный потенциал', 'Cognitive Potential')} percent={survey.sleepGoal * 10} />
                      <ForecastRow label={t('Индекс долголетия', 'Longevity Index')} percent={75} />
                    </div>

                    <SketchButton className="w-full" onClick={() => setShowPlanModal(true)}>
                      {t('Сгенерировать Blueprint', 'Generate Blueprint')}
                    </SketchButton>
                  </div>
                </SketchCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 12. Dashboard Preview */}
      <section className="py-32 px-8 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <SectionHeader number="12" title="Dashboard Preview" subtitle={t('Ваш центр управления жизнью', 'Your Life Control Center')} />
          <DashboardDemo lang={lang} />
        </div>
      </section>

      {/* 16, 17, 18. Roadmap & Stats */}
      <section className="py-32 px-8 bg-ink/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeader number="16" title="Roadmap & Stats" subtitle={t('Путь развития и метрики', 'Development Path & Metrics')} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <SketchCard title={t('Дорожная карта 2025', 'Roadmap 2025')}>
              <div className="space-y-8">
                <RoadmapItem quarter="Q1" title={t('Запуск и база', 'Launch & Base')} items={['✅ MVP', '✅ Landing', '⏳ Token sale']} active />
                <RoadmapItem quarter="Q2" title={t('Масштабирование', 'Scaling')} items={['⏳ Android App', '⏳ AI Health+', '⏳ 10,000 users']} />
                <RoadmapItem quarter="Q3" title={t('Экосистема', 'Ecosystem')} items={['⏳ DAO Governance', '⏳ Crypto integration', '⏳ 50,000 users']} />
                <RoadmapItem quarter="Q4" title={t('Экспансия', 'Expansion')} items={['⏳ EU Market', '⏳ Series A ($5M)', '⏳ 200,000 users']} />
              </div>
            </SketchCard>

            <SketchCard title={t('Прогноз Роста', 'Growth Forecast')}>
              <div className="h-80 w-full mt-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GROWTH_DATA}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2b1d18" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2b1d18" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#2b1d18" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#fcf9f2', border: '1px solid #2b1d18', fontFamily: 'Inter' }} />
                    <Area type="monotone" dataKey="users" stroke="#2b1d18" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                 <div className="text-center p-4 border border-ink/10 sketch-border">
                    <div className="text-2xl font-bold font-mono">1M+</div>
                    <div className="text-[10px] uppercase opacity-60">Target 2026</div>
                 </div>
                 <div className="text-center p-4 border border-ink/10 sketch-border">
                    <div className="text-2xl font-bold font-mono">$10M+</div>
                    <div className="text-[10px] uppercase opacity-60">Target ARR</div>
                 </div>
              </div>
            </SketchCard>
          </div>
        </div>
      </section>

      {/* 19. Economics & Tokenomics */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <SectionHeader number="19" title="Economics" subtitle={t('Токеномика NVT и модель монетизации', 'NVT Tokenomics & Revenue Model')} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <SketchCard title={t('Распределение NVT', 'NVT Distribution')}>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={TOKENOMICS}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {TOKENOMICS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                 {TOKENOMICS.map((item, i) => (
                   <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 sketch-border" style={{ background: item.color }} />
                      <span className="opacity-70">{item.name}: {item.value}%</span>
                   </div>
                 ))}
              </div>
            </SketchCard>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <SketchCard title={t('Модель монетизации', 'Revenue Model')}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EconomicsItem label={t('B2C Подписки', 'B2C Subscriptions')} desc={t('Повторяющиеся доходы от пользователей.', 'Recurring revenue from users.')} />
                <EconomicsItem label={t('B2B Кабинеты', 'B2B Cabinets')} desc={t('Плата за проф. аккаунты специалистов.', 'Pro accounts fee for specialists.')} />
                <EconomicsItem label={t('Комиссия маркетплейса', 'Marketplace Commission')} desc={t('Доля от продаж услуг и товаров.', 'Share from service and goods sales.')} />
                <EconomicsItem label={t('Партнерские программы', 'Partner Programs')} desc={t('Рекламные и интеграционные доходы.', 'Ads and integration revenue.')} />
              </div>
              <div className="mt-12 pt-8 border-t border-ink/10">
                <h5 className="font-bold mb-4 uppercase text-sm">{t('Финансирование', 'Funding')}</h5>
                <div className="flex gap-12">
                   <div>
                      <div className="text-3xl font-mono font-bold">$500K</div>
                      <div className="text-xs opacity-60">Seed Round</div>
                   </div>
                   <div>
                      <div className="text-3xl font-mono font-bold">$5M</div>
                      <div className="text-xs opacity-60">Series A Target</div>
                   </div>
                </div>
              </div>
            </SketchCard>
          </div>
        </div>
      </section>

      {/* 22. Subscriptions */}
      <section className="py-32 px-8 bg-ink text-parchment relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeader number="22" title="Subscriptions" subtitle={t('Подписка на здоровье, которая работает', 'Health Subscription That Works')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PriceCard 
              title={t('Базовый', 'Basic')} price={t('Бесплатно', 'Free')} 
              items={[t('Дневник здоровья', 'Health journal'), t('Базовый ИИ-план', 'Basic AI plan'), t('Сообщество', 'Community')]} 
            />
            <PriceCard 
              title={t('Премиум', 'Premium')} price="$25/мес" popular
              items={[t('Личный ИИ-коуч 24/7', 'AI coach 24/7'), t('Глубокая аналитика', 'Deep analytics'), t('Скидки в магазине', 'Shop discounts')]} 
            />
            <PriceCard 
              title={t('Специалист', 'Specialist')} price="$49/мес" 
              items={[t('Управление клиентами', 'Client management'), t('Встроенный биллинг', 'Built-in billing'), t('Профиль в каталоге', 'Catalogue profile')]} 
            />
            <PriceCard 
              title={t('Бизнес', 'Business')} price={t('По запросу', 'On Request')} 
              items={[t('Командные дашборды', 'Team dashboards'), t('HR-интеграции', 'HR integrations'), t('Групповые программы', 'Group programs')]} 
            />
          </div>
        </div>
      </section>

      {/* 23. FAQ Section */}
      <section className="py-32 px-8 max-w-4xl mx-auto">
        <SectionHeader number="23" title="FAQ" subtitle={t('Часто задаваемые вопросы', 'Frequently Asked Questions')} />
        <div className="space-y-6">
          {[
            { q: t('Как работает ИИ-планировщик?', 'How does the AI planner work?'), a: t('ИИ анализирует ваши цели, предпочтения и данные трекеров, создавая динамический план, который адаптируется ежедневно.', 'AI analyzes your goals, preferences, and tracker data to create a dynamic plan that adapts daily.') },
            { q: t('Безопасны ли мои данные?', 'Is my data safe?'), a: t('Все данные шифруются по стандарту AES-256 и соответствуют требованиям GDPR и HIPAA.', 'All data is encrypted via AES-256 and complies with GDPR and HIPAA requirements.') },
            { q: t('Можно ли использовать бесплатно?', 'Can I use it for free?'), a: t('Да, базовая версия с дневником и базовыми планами доступна бесплатно навсегда.', 'Yes, the basic version with the journal and basic plans is available for free forever.') }
          ].map((faq, i) => (
            <SketchCard key={i} title={faq.q} className="border-dashed">
              <p className="opacity-70">{faq.a}</p>
            </SketchCard>
          ))}
        </div>
      </section>

      {/* 24. Final CTA */}
      <section className="py-48 px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto z-10 relative">
          <SectionHeader number="24" title="Start Your Journey" subtitle={t('Начните путь к полному здоровью', 'Start Your Way to Complete Health')} />
          <p className="text-2xl mb-12 opacity-80 leading-relaxed">
            {t('NexusVita — это экосистема нового поколения, объединяющая данные, людей, технологии и экономику в единой цифровой среде.', 'NexusVita is a next-gen ecosystem uniting data, people, technology and economics in a single digital environment.')}
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <SketchButton className="px-16 py-8 text-2xl" onClick={() => {
               confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            }}>
              {t('Начать прямо сейчас', 'Start Right Now')}
            </SketchButton>
          </div>
          <div className="mt-20">
             <Annotation>{t('Первые 100 пользователей получат статус Genesis', 'First 100 users get Genesis status')}</Annotation>
          </div>
        </div>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-ink/5 -rotate-6 pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-ink/5 rotate-12 pointer-events-none" />
      </section>

      {/* Footer (Section 25 & 28) */}
      <footer className="py-20 px-8 border-t border-ink/10 bg-parchment">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6">
            <h3 className="text-4xl font-serif font-bold tracking-tighter uppercase">NexusVita</h3>
            <p className="max-w-xs opacity-60 italic">
              {t('Платформа решает фундаментальные проблемы фрагментированного рынка цифрового здоровья.', 'Platform solves fundamental problems of the fragmented digital health market.')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h5 className="font-mono text-[10px] uppercase mb-4 opacity-40">Resources</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Documentation</a></li>
                <li><a href="#" className="hover:underline">Tokenomics</a></li>
                <li><a href="#" className="hover:underline">Whitepaper</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-mono text-[10px] uppercase mb-4 opacity-40">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-mono text-[10px] uppercase mb-4 opacity-40">Social</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Twitter / X</a></li>
                <li><a href="#" className="hover:underline">Telegram</a></li>
                <li><a href="#" className="hover:underline">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-ink/5 flex justify-between items-center text-[10px] font-mono opacity-30">
          <span>© 2026 NEXUSVITA ECOSYSTEM. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED IN DIGITAL RENAISSANCE STYLE.</span>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <PlanModal isOpen={showPlanModal} onClose={() => setShowPlanModal(false)} survey={survey} lang={lang} />
    </div>
  );
}

// --- Sub-components ---

function BackgroundTexture() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
       <div className="absolute top-20 left-10 w-[500px] h-[500px] border border-ink rounded-full" />
       <div className="absolute bottom-20 right-10 w-[600px] h-[600px] border border-ink rotate-45" />
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    </div>
  );
}

function SectionHeader({ number, title, subtitle }: any) {
  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-4">
        <BlueprintLabel>{number}</BlueprintLabel>
        <div className="h-px flex-1 bg-ink/10" />
      </div>
      <h2 className="text-7xl font-serif font-bold tracking-tight mb-2 uppercase">{title}</h2>
      <Annotation>{subtitle}</Annotation>
    </div>
  );
}

function FeatureItem({ icon: Icon, label }: any) {
  return (
    <div className="flex items-center gap-4 p-4 border border-ink/10 sketch-border hover:bg-ink/5 transition-colors">
      <div className="p-2 bg-ink/10 sketch-border"><Icon className="w-5 h-5" /></div>
      <span className="font-bold text-sm">{label}</span>
    </div>
  );
}

function SummaryCard({ active, onClick, title, perspective }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-6 border-2 sketch-border transition-all text-center group",
        active ? "bg-ink text-parchment neumorph-sketch-shadow" : "bg-parchment text-ink hover:bg-ink/5"
      )}
    >
      <div className={cn("w-12 h-12 mx-auto mb-4 sketch-border flex items-center justify-center transition-colors", active ? "bg-parchment text-ink" : "bg-ink text-parchment")}>
        {perspective === 'users' ? <Heart /> : perspective === 'specialists' ? <UserCheck /> : <Globe />}
      </div>
      <h4 className="font-bold uppercase tracking-widest text-xs">{title}</h4>
    </button>
  );
}

function ProductLine({ icon: Icon, label, sub }: any) {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-12 h-12 bg-ink text-parchment sketch-border flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h5 className="font-bold text-lg">{label}</h5>
        <p className="text-xs opacity-60 uppercase font-mono">{sub}</p>
      </div>
    </div>
  );
}

function ProblemItem({ label }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-ink sketch-border" />
      <span className="text-sm font-bold opacity-80">{label}</span>
    </div>
  );
}

function ModuleCard({ icon: Icon, title, desc }: any) {
  return (
    <motion.div whileHover={{ y: -10 }}>
      <SketchCard className="h-full border-parchment/20 bg-parchment/5">
        <div className="mb-6 p-4 bg-parchment text-ink sketch-border w-fit"><Icon className="w-6 h-6" /></div>
        <h4 className="text-2xl font-bold mb-3 text-parchment font-serif tracking-tight">{title}</h4>
        <p className="text-sm opacity-60 text-parchment leading-relaxed">{desc}</p>
      </SketchCard>
    </motion.div>
  );
}

function ForecastRow({ label, percent }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] uppercase font-mono opacity-60">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 bg-ink/5 sketch-border overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-ink opacity-40"
        />
      </div>
    </div>
  );
}

function RoadmapItem({ quarter, title, items, active }: any) {
  return (
    <div className={cn("flex gap-8 group", active ? "opacity-100" : "opacity-40 hover:opacity-100 transition-opacity")}>
      <div className="w-16 h-16 border-2 border-ink sketch-border flex items-center justify-center font-mono text-xl font-bold shrink-0 bg-parchment group-hover:bg-ink group-hover:text-parchment transition-colors">
        {quarter}
      </div>
      <div className="space-y-2">
        <h5 className="text-xl font-bold font-serif">{title}</h5>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {items.map((it: string, i: number) => (
            <span key={i} className="text-xs italic opacity-80">{it}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function EconomicsItem({ label, desc }: any) {
  return (
    <div className="p-4 bg-ink/5 border border-ink/10 sketch-border">
      <h6 className="font-bold mb-1 uppercase text-xs">{label}</h6>
      <p className="text-xs opacity-60 leading-tight">{desc}</p>
    </div>
  );
}

function PriceCard({ title, price, items, popular }: any) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="h-full">
      <SketchCard className={cn("h-full flex flex-col items-center text-center", popular && "border-2 border-ink ring-4 ring-ink/5")}>
        {popular && <BlueprintLabel className="mb-6">Popular choice</BlueprintLabel>}
        <h4 className="text-2xl font-bold mb-2 uppercase tracking-tighter">{title}</h4>
        <div className="text-4xl font-mono font-bold mb-8">{price}</div>
        <div className="w-full h-px bg-ink/10 mb-8" />
        <ul className="space-y-4 mb-12 flex-1 w-full text-left text-sm opacity-80">
          {items.map((it: string, i: number) => (
            <li key={i} className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> {it}</li>
          ))}
        </ul>
        <SketchButton className="w-full py-4 text-sm" variant={popular ? 'primary' : 'secondary'}>Get Started</SketchButton>
      </SketchCard>
    </motion.div>
  );
}

function DashboardDemo({ lang }: any) {
  const [activeTab, setActiveTab] = useState('daily');
  const t = (ru: string, en: string) => lang === 'RU' ? ru : en;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <div className="lg:col-span-4 space-y-4">
        {['daily', 'ai', 'experts', 'plan'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "w-full p-6 text-left border-2 sketch-border transition-all",
              activeTab === tab ? "bg-ink text-parchment neumorph-sketch-shadow scale-105 z-10" : "bg-parchment text-ink opacity-60 hover:opacity-100"
            )}
          >
            <h4 className="font-bold uppercase text-xs font-mono mb-2">{tab}</h4>
            <div className="text-xl font-serif font-bold">
              {tab === 'daily' && t('Ежедневник', 'Journal')}
              {tab === 'ai' && t('ИИ-Рекомендации', 'AI Insights')}
              {tab === 'experts' && t('Специалисты', 'Experts')}
              {tab === 'plan' && t('Мой План', 'My Plan')}
            </div>
          </button>
        ))}
      </div>

      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full"
          >
            <SketchCard className="h-full border-ink bg-white/40 min-h-[400px]">
               {activeTab === 'daily' && (
                 <div className="space-y-8">
                   <div className="flex justify-between items-center">
                      <BlueprintLabel>Today / Feb 10, 2026</BlueprintLabel>
                      <Sparkles className="text-ink/40" />
                   </div>
                   <div className="space-y-4">
                      <div className="p-4 border border-ink/10 sketch-border italic opacity-70">
                        {t('Заметки о дне: Чувствую бодрость, сон был глубоким...', 'Daily notes: Feeling energetic, sleep was deep...')}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 border-2 border-ink sketch-border">
                            <div className="text-sm uppercase font-mono mb-1">{t('Настроение', 'Mood')}</div>
                            <div className="text-2xl">😊 Radiant</div>
                         </div>
                         <div className="p-4 border-2 border-ink sketch-border">
                            <div className="text-sm uppercase font-mono mb-1">{t('Энергия', 'Energy')}</div>
                            <div className="text-2xl">⚡ High</div>
                         </div>
                      </div>
                   </div>
                   <Annotation>{t('ИИ анализирует паттерны и дает рекомендации...', 'AI analyzes patterns and gives recommendations...')}</Annotation>
                 </div>
               )}
               {activeTab === 'ai' && (
                 <div className="space-y-6">
                   <div className="p-6 bg-ink text-parchment sketch-border">
                      <h5 className="font-bold text-xl mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5" /> Nexus AI Agent</h5>
                      <p className="opacity-80 italic">
                        {t('Ваш уровень кортизола повысился за последние 3 дня. Рекомендуем снизить интенсивность тренировок и добавить 15 минут дыхательных практик.', 'Your cortisol level has increased over the past 3 days. We recommend lowering workout intensity and adding 15 mins of breathwork.')}
                      </p>
                   </div>
                   <div className="space-y-3">
                      <FeatureItem icon={Activity} label={t('Адаптивный план питания', 'Adaptive Nutrition Plan')} />
                      <FeatureItem icon={Moon} label={t('Оптимизация сна', 'Sleep Optimization')} />
                   </div>
                 </div>
               )}
               {activeTab === 'experts' && (
                 <div className="space-y-6">
                    <div className="flex gap-4 p-4 border border-ink/10 sketch-border">
                       <div className="w-16 h-16 bg-ink/10 sketch-border flex items-center justify-center font-bold">JD</div>
                       <div className="flex-1">
                          <h6 className="font-bold">Dr. James Da Vinci</h6>
                          <p className="text-xs opacity-60">Longevity Specialist</p>
                          <div className="mt-2 flex gap-2">
                             <SketchButton className="px-3 py-1 text-[10px]">{t('Чат', 'Chat')}</SketchButton>
                             <SketchButton className="px-3 py-1 text-[10px]" variant="secondary">{t('История', 'History')}</SketchButton>
                          </div>
                       </div>
                    </div>
                    <Annotation>{t('Ваши эксперты видят контекст ваших данных в реальном времени', 'Your experts see your data context in real-time')}</Annotation>
                 </div>
               )}
               {activeTab === 'plan' && (
                 <div className="space-y-8">
                   <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={[{ name: 'Training', val: 40 }, { name: 'Rest', val: 35 }, { name: 'Mental', val: 25 }]}>
                         <XAxis dataKey="name" stroke="#2b1d18" fontSize={10} axisLine={false} tickLine={false} />
                         <Bar dataKey="val" fill="#2b1d18" stroke="#2b1d18" strokeWidth={1} radius={[4, 4, 0, 0]} />
                      </BarChart>
                   </ResponsiveContainer>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border-2 border-ink sketch-border">
                         <div className="text-[10px] font-mono opacity-60 mb-1">{t('Ближайшее событие', 'Next Event')}</div>
                         <div className="text-sm font-bold italic">Yoga Flow @ 18:00</div>
                      </div>
                      <div className="p-4 border-2 border-ink sketch-border">
                         <div className="text-[10px] font-mono opacity-60 mb-1">{t('Задач сегодня', 'Tasks Today')}</div>
                         <div className="text-sm font-bold italic">4 / 6 completed</div>
                      </div>
                   </div>
                 </div>
               )}
            </SketchCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function VitruvianMan({ activeId }: { activeId: (id: string) => void }) {
  return (
    <div className="relative w-full max-w-lg aspect-square mx-auto group">
      <div className="absolute inset-0 border-2 border-ink/5 rounded-full animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-4 border border-ink/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
      
      <div className="relative w-full h-full flex items-center justify-center p-12">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1729339984218-1f1e3b0d13ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYSUyMHZpbmNpJTIwYW5hdG9teSUyMHNrZXRjaHxlbnwxfHx8fDE3NzA3MjgwNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Vitruvian Man"
          className="w-full h-full object-contain mix-blend-multiply opacity-80"
        />
      </div>

      <div className="absolute inset-0">
        {SECTORS.map((sector, idx) => {
          const angle = (idx / SECTORS.length) * 2 * Math.PI;
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);
          return (
            <motion.button
              key={sector.id}
              whileHover={{ scale: 1.2, rotate: 5 }}
              onClick={() => activeId(sector.id)}
              className="absolute w-12 h-12 bg-parchment border-2 border-ink sketch-border neumorph-sketch-shadow flex items-center justify-center group/btn z-20"
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <sector.icon className="w-6 h-6" />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity bg-ink text-parchment text-[10px] px-2 py-1 sketch-border font-mono">
                {sector.label.EN}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function ChatWidget({ lang, messages, onSendMessage }: any) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const t = (ru: string, en: string) => lang === 'RU' ? ru : en;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 mb-4"
          >
            <SketchCard className="p-0 border-2 border-ink shadow-2xl overflow-hidden flex flex-col h-[450px]">
              <div className="p-4 bg-ink text-parchment flex justify-between items-center shrink-0">
                <span className="font-bold flex items-center gap-2"><Zap className="w-4 h-4" /> Nexus Assistant</span>
                <button onClick={() => setIsOpen(false)} className="opacity-60 hover:opacity-100">×</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm custom-scrollbar">
                {messages.map((m: any, i: number) => (
                  <div key={i} className={cn("max-w-[80%] p-3 sketch-border", m.role === 'ai' ? "mr-auto bg-ink/5 border-ink/10" : "ml-auto bg-ink text-parchment border-ink")}>
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-ink/10 shrink-0">
                <div className="flex gap-2">
                  <input 
                    className="flex-1 bg-ink/5 border-2 border-ink/10 sketch-border px-3 py-2 outline-none focus:border-ink/30 transition-all text-sm" 
                    placeholder={t('Ваш ответ...', 'Your answer...')}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (onSendMessage(input), setInput(''))}
                  />
                  <button onClick={() => { onSendMessage(input); setInput(''); }} className="p-2 bg-ink text-parchment sketch-border">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </SketchCard>
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-ink text-parchment sketch-border neumorph-sketch-shadow flex items-center justify-center hover:scale-110 transition-transform relative"
      >
        {isOpen ? <ChevronRight className="rotate-90" /> : <MessageCircle />}
        {!isOpen && <div className="absolute -top-1 -right-1 w-4 h-4 bg-blood rounded-full animate-pulse border-2 border-parchment" />}
      </button>
    </div>
  );
}

function PlanModal({ isOpen, onClose, survey, lang }: any) {
  const t = (ru: string, en: string) => lang === 'RU' ? ru : en;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <SketchCard title={t('Ваш Персональный План', 'Your Personal Plan')} subtitle={t('Blueprint долголетия v1.0', 'Longevity Blueprint v1.0')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <BlueprintLabel className="mb-4">{t('Уровень нагрузки', 'Load Level')}</BlueprintLabel>
                <div className="text-4xl font-serif font-bold italic">{survey.intensity}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-ink/5 sketch-border">
                  <div className="text-[10px] font-mono opacity-60 mb-1">{t('Тренировки', 'Trainings')}</div>
                  <div className="text-xl font-bold">{survey.trainingsPerWeek} {t('дней / нед', 'days / week')}</div>
                </div>
                <div className="p-4 bg-ink/5 sketch-border">
                  <div className="text-[10px] font-mono opacity-60 mb-1">{t('Сон', 'Sleep')}</div>
                  <div className="text-xl font-bold">{survey.sleepGoal} {t('часов', 'hours')}</div>
                </div>
              </div>
              <SketchCard title={t('Пример Недели', 'Sample Week')} className="border-dashed bg-white/20">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-ink/10 pb-1"><span>{t('Пн', 'Mon')}</span><span className="font-bold italic">Power Yoga + HIIT</span></div>
                  <div className="flex justify-between border-b border-ink/10 pb-1"><span>{t('Вт', 'Tue')}</span><span className="font-bold italic">Recovery + Breathwork</span></div>
                  <div className="flex justify-between border-b border-ink/10 pb-1"><span>{t('Ср', 'Wed')}</span><span className="font-bold italic">Zone 2 Cardio</span></div>
                  <div className="flex justify-between border-b border-ink/10 pb-1"><span>{t('Чт', 'Thu')}</span><span className="font-bold italic">Strength Training</span></div>
                </div>
              </SketchCard>
            </div>
            
            <div className="space-y-8">
              <SketchCard title={t('ИИ-Советы', 'AI Insights')} className="bg-ink text-parchment">
                <div className="space-y-4 text-sm opacity-90 leading-relaxed italic">
                  <p>• {t('Фокус на повышении фазы глубокого сна для восстановления.', 'Focus on increasing deep sleep phase for recovery.')}</p>
                  <p>• {t('Контроль уровня гидратации в дни силовых нагрузок.', 'Monitor hydration levels during strength training days.')}</p>
                  <p>• {t('Интеграция утренней практики осознанности на 5 минут.', 'Integrate a 5-minute morning mindfulness practice.')}</p>
                </div>
              </SketchCard>
              <div className="pt-4">
                 <SketchButton className="w-full text-lg py-6" onClick={() => {
                    confetti({ particleCount: 200, spread: 100 });
                    onClose();
                 }}>
                   {t('Зарегистрироваться и забрать план', 'Register & Claim Plan')}
                 </SketchButton>
                 <button onClick={onClose} className="w-full mt-4 text-xs font-mono opacity-40 hover:opacity-100 uppercase transition-opacity">
                   {t('Продолжить изучение', 'Continue Exploring')}
                 </button>
              </div>
            </div>
          </div>
        </SketchCard>
      </motion.div>
    </div>
  );
}

// --- Utilities ---
function calculateBMI(w: number, h: number) {
  return (w / ((h / 100) ** 2)).toFixed(1);
}

function getValuePoints(perspective: string, lang: Lang) {
  const data: any = {
    users: {
      RU: ["Целостная картина здоровья", "Единый интерфейс данных", "Персональные рекомендации", "Социальная среда"],
      EN: ["Holistic health picture", "Unified data interface", "Personalized recommendations", "Social environment"]
    },
    specialists: {
      RU: ["Доступ к целевой аудитории", "Контекст данных клиента", "Инструменты управления", "Встроенный биллинг"],
      EN: ["Access to target audience", "Client data context", "Management tools", "Built-in billing"]
    },
    partners: {
      RU: ["Канал продаж услуг", "Совместные прогр��ммы", "Метрики эффективности", "B2B интеграции"],
      EN: ["Sales channel for services", "Joint programs", "Efficiency metrics", "B2B integrations"]
    }
  };
  return data[perspective][lang];
}
