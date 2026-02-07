/**
 * Утилиты для неоморфизма
 */

import { cn } from './cn'

export const neumorphicClasses = {
  card: 'neumorphic-card',
  cardPressed: 'neumorphic-card-pressed',
  cardSoft: 'neumorphic-card-soft',
  button: 'neumorphic-button',
  buttonPrimary: 'neumorphic-button-primary',
  input: 'neumorphic-input',
  surface: 'neumorphic-surface',
}

/**
 * Комбинирует классы неоморфизма с дополнительными классами
 */
export function neumorphic(
  type: keyof typeof neumorphicClasses,
  ...additionalClasses: (string | undefined | null | false)[]
) {
  return cn(neumorphicClasses[type], ...additionalClasses)
}

/**
 * Создает неоморфную карточку с опциональными классами
 */
export function neumorphicCard(...classes: (string | undefined | null | false)[]) {
  return cn(neumorphicClasses.card, ...classes)
}

/**
 * Создает неоморфную кнопку с опциональными классами
 */
export function neumorphicButton(
  primary = false,
  ...classes: (string | undefined | null | false)[]
) {
  return cn(
    primary ? neumorphicClasses.buttonPrimary : neumorphicClasses.button,
    ...classes
  )
}

/**
 * Создает неоморфный инпут с опциональными классами
 */
export function neumorphicInput(...classes: (string | undefined | null | false)[]) {
  return cn(neumorphicClasses.input, ...classes)
}
