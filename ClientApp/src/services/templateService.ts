import api from './api';
import { TemplateDto, CreateUpdateTemplateDto } from '../types/template.types';

const getTemplates = (): Promise<TemplateDto[]> => {
  return api.get('/templates').then(response => response.data);
};

const getTemplate = (id: number): Promise<TemplateDto> => {
  return api.get(`/templates/${id}`).then(response => response.data);
};

const createTemplate = (data: CreateUpdateTemplateDto): Promise<TemplateDto> => {
  return api.post('/templates', data).then(response => response.data);
};

const updateTemplate = (id: number, data: CreateUpdateTemplateDto): Promise<void> => {
  return api.put(`/templates/${id}`, data);
};

const deleteTemplate = (id: number): Promise<void> => {
  return api.delete(`/templates/${id}`);
};

const templateService = {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};

export default templateService;