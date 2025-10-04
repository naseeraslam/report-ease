import { Language } from './report.types';

export interface TemplateDto {
  id: number;
  name: string;
  content: string;
  language: Language;
}

export interface CreateUpdateTemplateDto {
  name: string;
  content: string;
  language: Language;
}