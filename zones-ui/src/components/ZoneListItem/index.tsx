import {
  Card,
  CardBody,
  CardFooter,
  CloseButton,
  Box,
  Text,
} from '@chakra-ui/react';

import { Zone } from '../../types/zone';

interface ZoneListItemProps {
  zone: Zone;
  onDelete: (id: string) => void;
}

const ZoneListItem: React.FC<ZoneListItemProps> = ({ zone, onDelete }) => {
  return (
    <Card
      bg="gray.400"
      borderRadius="md"
      boxShadow="lg"
      position="relative"
      width="350px"
      height="400px"
      overflow="hidden"
    >
      <CloseButton
        onClick={() => onDelete(zone.id)}
        aria-label="Delete zone"
        size="md"
        position="absolute"
        top="8px"
        right="8px"
        color="gray.300" // Make sure the color contrasts with the background
        background="none"
        _hover={{ color: 'red.400' }}
        zIndex={2} // Ensure the button appears above the SVG
      />

      {/* SVG Background with fixed width of 300px */}
      <CardBody
        p={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
        bg="gray.700"
      >
        <Box width="100%" height="300px" display="flex" justifyContent="center">
          <svg
            width="300px"
            height="300px"
            style={{ outline: '1px solid #ffffff2e' }}
          >
            <polygon
              points={zone.points
                .map((point: [number, number]) => point.join(','))
                .join(' ')}
              style={{
                fill: 'rgba(173, 216, 230, 0.3)',
                stroke: 'white',
                strokeWidth: 2,
              }}
            />
          </svg>
        </Box>
      </CardBody>

      {/* Zone Name */}
      <CardFooter
        position="absolute"
        bottom={0}
        width="100%"
        py={2}
        bg="teal"
        color="gray.300"
        textAlign="center"
      >
        <Text fontSize="xs">{zone.name}</Text>
      </CardFooter>
    </Card>
  );
};

export default ZoneListItem;
