import {Dimensions} from 'react-native';
import {useEffect, useState} from 'react';

type DimensionType = {
  orientation: 'portrait' | 'landscape';
  width: number;
  height: number;
};

export default function useOrientation(dimension: 'screen' | 'window') {
  const [dimensions, setDimensions] = useState<DimensionType>({
    orientation: 'portrait',
    width: 0,
    height: 0,
  });

  const [init, setInit] = useState(true);

  const listener = Dimensions.addEventListener('change', ({window, screen}) => {
    const ScaleSize = dimension == 'screen' ? window : screen;
    console.log('raah');

    setDimensions({
      ...ScaleSize,
      orientation:
        ScaleSize.width > ScaleSize.height ? 'landscape' : 'portrait',
    });
  });

  useEffect(() => {
    const updateDimensions = () => {
      const {width, height} = Dimensions.get(dimension);
      setInit(false);
      setDimensions({
        orientation: width > height ? 'landscape' : 'portrait',
        width,
        height,
      });
    };
    init && updateDimensions();
    return () => listener.remove();
  }, [dimensions]);

  return dimensions;
}
