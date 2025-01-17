import {proxy} from 'valtio';

type Props = {
  currentYIndex: any;
  multiItems: any;
  screenFocused: boolean;
};

export default proxy<Props>({
  currentYIndex: 0,
  multiItems: [],
  screenFocused: false,
});
