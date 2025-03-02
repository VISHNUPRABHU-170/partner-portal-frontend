export interface FeatureTicketModel {
  title: string;
  description: string;
  cloudProvider: CloudProviders;
  priority: string;
  createdAt: string;
  deadLine: string;
  tags: string[];
}

export interface CloudColor {
  success: string;
  fails: string;
}

export enum CloudProviders {
  AWS = 'AWS',
  AZURE = 'AZURE',
  GCP = 'GCP',
  OTHERS = 'OTHERS',
}

export const CLOUD_COLOR_MAPPER: Record<CloudProviders, CloudColor> = {
  [CloudProviders.AWS]: { success: '#5FD198', fails: '#FAD27D' },
  [CloudProviders.AZURE]: { success: '#5FD198', fails: '#2FC8EB' },
  [CloudProviders.GCP]: { success: '#5FD198', fails: '#EB6253' },
  [CloudProviders.OTHERS]: { success: '#5FD198', fails: '#C7C7C7' },
};
