import { useState, useEffect } from 'react';

import './styles.scss';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  Text,
  Input,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';

import useKeyPressHandlers from '../../hooks/useKeyPressHandlers';
import { useCreateZone } from '../../hooks/useZones';
import { InputState } from '../../types/input';
import { Point } from '../../types/zone';
import {
  getSvgCoordinates,
  roundCoordinates,
  sortPoints,
} from '../../utils/coordinate';

const ZoneEditor: React.FC = () => {
  const toast = useToast();

  const [drawingPoints, setDrawingPoints] = useState<Point[]>(() => {
    try {
      return sortPoints(
        JSON.parse(localStorage.getItem('drawingPoints') || '[]'),
      );
    } catch (err) {
      console.error('Unable to restore state from draft.', err);
    }
    return [];
  });
  const [zoneName, setZoneName] = useState<InputState<string>>(() => {
    const value = localStorage.getItem('zoneName');
    return { value: value?.length ? value : '', touched: false };
  });

  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(
    null,
  );

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    localStorage.setItem('drawingPoints', JSON.stringify(drawingPoints));
    localStorage.setItem('zoneName', zoneName.value);
  }, [drawingPoints, zoneName.value]);

  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [currentMousePosition, setCurrentMousePosition] = useState<Point>([
    0, 0,
  ]);

  const { mutate: createZone } = useCreateZone();

  const updatePoints = (points: Point[]) => {
    const newPoints = points.length === 4 ? sortPoints(points) : points;
    setDrawingPoints(newPoints);
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (drawingPoints.length < 4) {
      const { x, y } = getSvgCoordinates(e);
      updatePoints([...drawingPoints, [x, y]]);
    }
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const { x, y } = getSvgCoordinates(e);
    setCurrentMousePosition([x, y]);
    if (selectedPointIndex !== null && drawingPoints.length === 4) {
      const newPoints = [...drawingPoints];
      newPoints[selectedPointIndex] = [x, y];
      setDrawingPoints(newPoints);
    }
    if (drawingPoints.length < 4) {
      setIsDrawing(true);
    }
  };

  const handleSvgMouseUp = () => {
    setSelectedPointIndex(null);
    updatePoints(drawingPoints);
  };

  const handleSvgMouseLeave = () => {
    setIsDrawing(false);
    setSelectedPointIndex(null);
  };

  const handlePointMouseDown = (index: number) => {
    if (drawingPoints.length === 4) {
      setSelectedPointIndex(index);
    }
  };

  const cancelDrawing = () => {
    setIsDrawing(false);
    setDrawingPoints([]);
    setCurrentMousePosition([0, 0]);
  };

  const handleCreateZone = () => {
    setZoneName({ ...zoneName, touched: true });
    if (drawingPoints.length === 4 && !!zoneName.value.trim()) {
      createZone(
        {
          name: zoneName.value,
          points: roundCoordinates(drawingPoints),
        },
        {
          onSuccess: () => {
            toast({
              position: 'top-right',
              title: 'Zone created.',
              description: 'The zone has been created successfully.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });

            cancelDrawing();
            setZoneName({ value: '', touched: false });
          },
          onError: (error: unknown) => {
            const description =
              error instanceof AxiosError
                ? error.response?.data?.message
                : 'There was an issue while creating the zone.';
            toast({
              position: 'top-right',
              title: 'Error creating zone.',
              description,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          },
        },
      );
    }
  };

  useKeyPressHandlers({
    onEscape: cancelDrawing,
    onEnter: handleCreateZone,
  });

  const getPolygonPoints = () => {
    if (isDrawing && drawingPoints.length < 4 && drawingPoints.length > 0) {
      return [...drawingPoints, currentMousePosition];
    }
    return drawingPoints;
  };

  return (
    <Box
      borderRadius={0}
      p={5}
      background="gray.700"
      color="gray.300"
      textAlign="center"
    >
      <Heading size="md" textAlign="left" mb={4}>
        Create new Zone
      </Heading>
      <Text fontSize="xs" textAlign="left" mb={8}>
        Click on the SVG to draw the polygon (4 points required)
      </Text>

      <Box>
        <svg
          className="zone-editor__svg"
          width="300"
          height="300"
          onClick={handleSvgClick}
          onMouseMove={handleSvgMouseMove}
          onMouseUp={handleSvgMouseUp}
          onMouseLeave={handleSvgMouseLeave}
        >
          {drawingPoints.length > 0 && (
            <polygon
              points={getPolygonPoints()
                .map((point) => point.join(','))
                .join(' ')}
              className="polygon"
            />
          )}

          {drawingPoints.map((point, index) => (
            <circle
              key={index}
              cx={point[0]}
              cy={point[1]}
              r={
                selectedPointIndex === index
                  ? 6
                  : hoveredPoint === index
                  ? 5
                  : 4
              } // Set 'r' based on conditions
              className={`circle ${
                selectedPointIndex === index ? 'selected' : ''
              } ${hoveredPoint === index ? 'hovered' : ''}`}
              onMouseDown={() => handlePointMouseDown(index)}
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}

          {/* Show a small circle where the current mouse position is (for live preview) */}
          {isDrawing &&
            drawingPoints.length < 4 &&
            drawingPoints.length > 0 && (
              <circle
                cx={currentMousePosition[0]}
                cy={currentMousePosition[1]}
                r="3"
                fill="gray"
              />
            )}
        </svg>
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <FormControl
          isInvalid={!zoneName.value.trim() && zoneName.touched}
          width="300px"
        >
          <Input
            id="zone-name"
            placeholder="Enter zone name"
            value={zoneName.value}
            onChange={(e) =>
              setZoneName({ value: e.target.value, touched: true })
            }
            size="sm"
          />
          <FormErrorMessage>name is required</FormErrorMessage>
        </FormControl>
      </Box>

      <Box mt={4}>
        <Button
          leftIcon={<AddIcon />}
          disabled={drawingPoints.length !== 4}
          colorScheme="teal"
          variant="solid"
          onClick={handleCreateZone}
          mr={2}
          size="sm"
        >
          Create Zone
        </Button>

        <Button
          onClick={() => {
            setDrawingPoints([]);
            setZoneName({ value: '', touched: false });
          }}
          disabled={drawingPoints.length === 0}
          rightIcon={<DeleteIcon />}
          colorScheme="teal"
          variant="outline"
          size="sm"
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default ZoneEditor;
