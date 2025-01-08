import React from 'react';
import {View} from 'react-native';

interface Props {
  /**
   * Fill the rest of available area
   */
  flex?: number;
  /**
   * Horizontal space, multiply with 8
   */
  spaceX?: number;
  /**
   * Vertical space, multiply with 8
   */
  spaceY?: number;
}
export default function Spacer({flex, spaceX, spaceY}: Props) {
  React.useEffect(() => {
    if (!flex && !spaceX && !spaceY) {
      throw new Error(
        'At least one of the props should be passed to component!',
      );
    }
  }, [spaceX, spaceY, flex]);

  const style = React.useMemo(() => {
    return flex
      ? {flex: 1}
      : spaceX
      ? {height: '100%', marginHorizontal: spaceX}
      : {width: '100%', marginVertical: spaceY};
  }, [flex, spaceX, spaceY]);

  return <View style={style} />;
}
