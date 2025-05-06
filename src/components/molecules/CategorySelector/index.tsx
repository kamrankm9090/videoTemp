import {FlatList} from 'react-native-gesture-handler';
import AppText from '~/components/atoms/AppText';
import AppTouchable from '~/components/atoms/AppTouchable';
import {Colors} from '~/styles';

const categories = ['All', 'Beauty', 'Sports', 'Games', 'Home', 'Tv & Audio'];

const CategorySelector = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (category: string) => void;
}) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={item => item}
      contentContainerStyle={{
        gap: 8,
      }}
      renderItem={({item}) => {
        const isActive = item === selected;
        return (
          <AppTouchable
            onPress={() => setSelected(item)}
            bg={isActive ? Colors.PRIMARY : Colors.NIGHT_RIDER}
            px={10}
            py={5}
            borderRadius={8}>
            <AppText
              fontWeight="500"
              color={isActive ? Colors.WHITE : Colors.GARY_3}
              lineHeight={24}
              fontSize={14}>
              {item}
            </AppText>
          </AppTouchable>
        );
      }}
    />
  );
};

export default CategorySelector;
