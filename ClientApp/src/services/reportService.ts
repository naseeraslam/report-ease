import api from './api';
import { ReportDto, CreateUpdateReportDto, CreateReportFromTemplateDto } from '../types/report.types';

const getReports = (): Promise<ReportDto[]> => {
  return api.get('/reports').then(response => response.data);
};

const getReport = (id: number): Promise<ReportDto> => {
  return api.get(`/reports/${id}`).then(response => response.data);
};

const createReport = (data: CreateUpdateReportDto): Promise<ReportDto> => {
  return api.post('/reports', data).then(response => response.data);
};

const createReportFromTemplate = (data: CreateReportFromTemplateDto): Promise<ReportDto> => {
  return api.post('/reports/from-template', data).then(response => response.data);
};

const updateReport = (id: number, data: CreateUpdateReportDto): Promise<void> => {
  return api.put(`/reports/${id}`, data);
};

const deleteReport = (id: number): Promise<void> => {
  return api.delete(`/reports/${id}`);
};

const exportReportAsPdf = (id: number): Promise<Blob> => {
  return api.get(`/reports/${id}/export/pdf`, { responseType: 'blob' }).then(response => response.data);
};

const exportReportAsDocx = (id: number): Promise<Blob> => {
  return api.get(`/reports/${id}/export/docx`, { responseType: 'blob' }).then(response => response.data);
};

const reportService = {
  getReports,
  getReport,
  createReport,
  createReportFromTemplate,
  updateReport,
  deleteReport,
  exportReportAsPdf,
  exportReportAsDocx,
};

export default reportService;