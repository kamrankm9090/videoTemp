import React, {useCallback, useMemo} from 'react';
import {ActivityIndicator, Dimensions, Text} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import Center from '~/components/common/Center';
import {Colors} from '~/styles';
import CustomTabBar from './CustomTabBar';

const {width} = Dimensions.get('window');

// Define types for navigation state and other props
interface TabRoute {
  key: string;
  title: string;
}

// Define the type for components that will be passed to the CustomTabView
interface CustomTabViewProps {
  routes: TabRoute[];
  components: {
    [key: string]: React.ComponentType<any>;
  };
}

// Lazy Loading Placeholder Component
const LazyLoadingPlaceholder = () => (
  <Center>
    <ActivityIndicator size="large" color={Colors.PRIMARY} />
  </Center>
);

export default function CustomTabView({
  routes,
  components,
}: CustomTabViewProps) {
  const [index, setIndex] = React.useState<number>(0);

  // Memoize renderScene to avoid recalculating on every re-render
  const renderScene = useMemo(
    () =>
      SceneMap(
        routes.reduce(
          (scenes, route) => ({
            ...scenes,
            [route.key]:
              components[route.key] || (() => <Text>Component Missing</Text>),
          }),
          {} as {[key: string]: React.ComponentType<any>},
        ),
      ),
    [routes, components],
  );

  // Lazy-loading placeholder for tab content
  const renderLazyPlaceholder = useCallback(() => {
    return <LazyLoadingPlaceholder />;
  }, []);

  const memoizedSetIndex = useCallback((newIndex: number) => {
    setIndex(newIndex);
  }, []);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width}}
      lazy
      lazyPreloadDistance={2} // Preload adjacent pages for better UX
      renderLazyPlaceholder={renderLazyPlaceholder} // Place the loader while tabs are being initialized
      renderTabBar={props => (
        <CustomTabBar {...props} setIndex={memoizedSetIndex} />
      )}
      // We can add FlatList-based rendering of tab content with dynamic fetching inside renderScene
    />
  );
}
