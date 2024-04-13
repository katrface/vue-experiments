export interface ServiceNavItem {
  title: string
  name: string
  description: string
  icon: string
  subnav: ServiceSubnavItem[]
}

export interface ServiceSubnavItem {
  title: string
  name: string
  icon: string
}
