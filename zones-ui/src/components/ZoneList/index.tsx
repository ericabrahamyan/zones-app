import { Box, Heading, Text, Spinner, Flex, useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';

import { useDeleteZone, useZones } from '../../hooks/useZones';
import { Zone } from '../../types/zone';
import ZoneListItem from '../ZoneListItem';

const ZoneList: React.FC<{ onDeleteZone?: () => void }> = ({
  onDeleteZone,
}) => {
  const toast = useToast();

  const { data: zones, isLoading, error } = useZones();

  const { mutate: deleteZone } = useDeleteZone();

  const handleDelete = (id: string) => {
    deleteZone(id, {
      onSuccess: () => {
        toast({
          position: 'top-right',
          title: 'Zone deleted.',
          description: 'The zone has been deleted successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        if (onDeleteZone) onDeleteZone();
      },
      onError: (error: unknown) => {
        const description =
          error instanceof AxiosError
            ? error.response?.data?.message
            : 'There was an issue while deleting the zone.';
        toast({
          position: 'top-right',
          title: 'Error deleting zone.',
          description,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  if (error)
    return <Text color="red.500">Something went wrong loading zones.</Text>;

  return (
    <Box
      as="section"
      p={4}
      overflowY={{ base: 'initial', md: 'auto' }}
      width="100%"
      background="gray.900"
      color="gray.300"
    >
      <Heading size="lg" textAlign="left" mb={2}>
        Zones List
      </Heading>

      {isLoading ? (
        <Spinner size="lg" />
      ) : zones && zones?.length === 0 ? (
        <Text>No zones available</Text>
      ) : (
        <Flex
          gap={4}
          wrap="wrap"
          justifyContent={{ base: 'center', md: 'flex-start' }}
        >
          {zones &&
            zones.map((zone: Zone) => (
              <ZoneListItem key={zone.id} zone={zone} onDelete={handleDelete} />
            ))}
        </Flex>
      )}
    </Box>
  );
};

export default ZoneList;
