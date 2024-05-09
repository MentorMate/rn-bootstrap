import React from 'react';
import {
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  HStack,
  Box,
  Icon,
  Heading,
  Tooltip,
  TooltipContent,
  Button,
  Center,
} from '@gluestack-ui/themed';

const SliderBasic = ({ value: valueProp = 60, ...props }: any) => {
  const [sliderValue, setSliderValue] = React.useState(valueProp);
  const handleChange = (value: any) => {
    setSliderValue(value);
  };

  return (
    <Slider
      {...props}
      w="$48"
      h="$6"
      value={sliderValue}
      onChange={(value: any) => {
        handleChange(value);
      }}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

SliderBasic.description =
  'This is a basic Slider component example. Sliders are used to select a value from a range of values.';

export default SliderBasic;

export {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  HStack,
  Text,
  Box,
  Icon,
  Heading,
  Tooltip,
  TooltipContent,
  Button,
  Center,
};

