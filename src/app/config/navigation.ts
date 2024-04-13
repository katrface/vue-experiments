import type { ServiceNavItem, ServiceSubnavItem } from '@/shared/ui-kit/navigation'

export const services: ServiceNavItem[] = [
  {
    title: 'Todo List',
    description: 'Список задач для организации работы и жизни',
    name: 'todo-list',
    icon: 'mdi-checkbox-marked-circle-auto-outline',
    subnav: [
      {
        title: 'Список задач',
        name: 'todo-list',
        icon: 'mdi-format-list-text'
      },
      {
        title: 'История изменений',
        name: 'todo-list-history',
        icon: 'mdi-clipboard-text-clock-outline'
      },
      {
        title: 'Настройки сервиса',
        name: 'todo-list-settings',
        icon: 'mdi-cog-outline'
      }
    ]
  },
  {
    title: 'Почта',
    description: 'Сервис электронной почты',
    name: 'email',
    icon: 'mdi-email-outline',
    subnav: []
  }
]

export const SUPPORT: ServiceSubnavItem = {
  title: 'Служба поддержки',
  name: 'support',
  icon: 'mdi-help-circle-outline'
}
