export type Theme = 'light' | 'dark' | 'company';
export type Language = 'en' | 'ar';

export interface Translations {
  [key: string]: string | Translations;
}

export interface ServiceItem {
  icon: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
}

export interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

export interface WhyUsItem {
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}
