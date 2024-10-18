import { useQuery, useMutation, useQueryClient } from 'react-query';

import { createZone, deleteZone, fetchZones } from '../api/zonesApi';

export const useZones = () => {
  return useQuery('zones', fetchZones);
};

export const useCreateZone = () => {
  const queryClient = useQueryClient();
  return useMutation(createZone, {
    onSuccess: () => {
      queryClient.invalidateQueries('zones');
    },
  });
};

export const useDeleteZone = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteZone, {
    onSuccess: () => {
      queryClient.invalidateQueries('zones');
    },
  });
};
