import { ZoneInput } from '../types/zone';

import axiosInstance from './axiosInstance';

export const fetchZones = async () => {
  const { data } = await axiosInstance.get('/zone');
  return data;
};

export const createZone = async (input: ZoneInput) => {
  const { data } = await axiosInstance.post('/zone', input);
  return data;
};

export const deleteZone = async (id: string) => {
  await axiosInstance.delete(`/zone/${id}`);
};
