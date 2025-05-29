import {StyleSheet} from 'react-native';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

const HEADER_HEIGHT = 60;
const TABBAR_HEIGHT = 50;

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.BACKGROUND},
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  headerTitle: {fontSize: 18, fontWeight: 'bold'},
  tabBar: {
    height: TABBAR_HEIGHT,
    flexDirection: 'row',
    backgroundColor: Colors.Nero_3,
    elevation: 2,
    position: 'relative',
    borderRadius: 8,
  },
  tabItem: {
    flex: 1,
    paddingVertical: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tabText: {color: Colors.WHITE, fontSize: 16},
  tabTextActive: {color: Colors.WHITE, fontWeight: '600'},
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: '#3b82f6',
  },
  activeBackground: {
    position: 'absolute',
    height: '100%',
    backgroundColor: Colors.NIGHT_RIDER,
    borderRadius: scale(8),
    top: 0,
    left: 0,
  },
  pageContainer: {flex: 1},
  pageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
