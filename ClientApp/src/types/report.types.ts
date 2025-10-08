export enum Language {
  Urdu,
  English,
}

export interface ReportDto {
  id: number;
  title: string;
  content: string;
  language: Language;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUpdateReportDto {
  title: string;
  content: string;
  language: Language;
}

export interface CreateReportFromTemplateDto {
  templateId: number;
  title: string;
}

export interface CopyReportDto {
  title: string;
}