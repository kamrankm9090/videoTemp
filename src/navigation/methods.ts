import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {RootStackParamList} from './types';
import {Platform} from 'react-native';
import {
  TransitionPresets,
  StackNavigationOptions,
} from '@react-navigation/stack';

export const navigationRef = createNavigationContainerRef();

/**
 * Recursive function that delays the next call if the navigation is not yet mounted.
 */
const navigationMethod = (successCallback: () => unknown) => {
  if (navigationRef.isReady()) {
    return successCallback();
  }

  setTimeout(() => {
    navigationMethod(successCallback);
  }, 10);
};

/**
 * Navigate to a new route.
 */
export function navigate<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T],
) {
  navigationMethod(() => {
    // @ts-ignore Suspended complexity warning typescript.
    navigationRef.navigate(name, params);
  });
}

/**
 * Navigate and reset root.
 */
export function resetRoot(routeName: string, params?: object) {
  navigationMethod(() => {
    navigationRef?.current?.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: routeName, params}],
      }),
    );
  });
}

/**
 * Replace.
 */
export function replace<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T],
) {
  navigationMethod(() => {
    navigationRef?.current?.dispatch(StackActions.replace(name, params));
  });
}

/**
 * Set params for the current route.
 */
export function setParams(params: object, routeKey?: string) {
  navigationMethod(() => {
    navigationRef.dispatch({
      ...CommonActions.setParams(params),
      source: routeKey,
    });
  });
}

/**
 * Check if it's possible to go back.
 */
export function canGoBack() {
  return navigationMethod(navigationRef.canGoBack);
}

/**
 * Go back to the previous route.
 */
export function goBack() {
  navigationMethod(navigationRef.goBack);
}

/**
 * Returns the navigation state for all navigators in the navigator tree.
 */
export function getRootState() {
  return navigationMethod(navigationRef.getRootState);
}

/**
 * Returns current route name.
 */
export function getCurrentRouteName() {
  return navigationRef?.current?.getCurrentRoute?.()?.name;
}

export function push(routeName: string, params?: object) {
  navigationMethod(() => {
    navigationRef?.current?.dispatch(StackActions.push(routeName, params));
  });
}

export function pop(numberOfPages: number) {
  navigationMethod(() => {
    navigationRef?.current?.dispatch(StackActions.pop(numberOfPages));
  });
}

//
// ────────────────────────────────────────────────────────────────────────────────
// DEFAULT TRANSITIONS FOR IOS AND ANDROID
// ────────────────────────────────────────────────────────────────────────────────
//

/**
 * iOS Transition Configuration
 * Uses SlideFromRight preset and applies a scale + opacity animation.
 */
const iosTransitionConfig: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,

  cardStyleInterpolator: ({current, next, layouts}) => ({
    cardStyle: {
      opacity: current.progress,
      transform: [
        {
          // Scale animation: Shrinks slightly when going back
          scale: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.95],
              })
            : current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.95, 1],
              }),
        },
        {
          // Slide in from the right
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
      ],
    },
  }),

  gestureEnabled: true,
  gestureDirection: 'horizontal',
};

/**
 * Android Transition Configuration
 * Uses FadeFromBottom preset and a slide-in with opacity animation.
 */
const androidTransitionConfig: StackNavigationOptions = {
  ...TransitionPresets.FadeFromBottomAndroid,

  cardStyleInterpolator: ({current}) => ({
    cardStyle: {
      opacity: current.progress,
      transform: [
        {
          // Slight slide-in from the right
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
      ],
    },
  }),

  gestureEnabled: true,
  gestureDirection: 'horizontal',
};

/**
 * Platform-Based Transition Export
 * iOS uses slide, Android uses fade with slight slide.
 */
const screenTransitionConfig: StackNavigationOptions =
  Platform.OS === 'ios' ? iosTransitionConfig : androidTransitionConfig;

//
// ────────────────────────────────────────────────────────────────────────────────
// FADE ONLY TRANSITION (NO GESTURE)
// ────────────────────────────────────────────────────────────────────────────────
//

/**
 * Fade Only Transition
 * Clean fade-in effect with no gestures.
 */
const fadeOnlyTransitionConfigFade: StackNavigationOptions = {
  cardStyleInterpolator: ({current}) => ({
    cardStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
  }),

  gestureEnabled: false,
};

const screenTransitionConfigFade: StackNavigationOptions =
  fadeOnlyTransitionConfigFade;

//
// ────────────────────────────────────────────────────────────────────────────────
// SMOOTH FADE WITH SCALE TRANSITION (RECOMMENDED)
// ────────────────────────────────────────────────────────────────────────────────
//

/**
 * Smooth Fade + Scale Transition
 * A subtle zoom-in with fade effect for a polished experience.
 */
const smoothFadeTransitionConfig: StackNavigationOptions = {
  cardStyleInterpolator: ({current}) => ({
    cardStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          // Slight zoom-in effect
          scale: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.98, 1],
          }),
        },
      ],
    },
  }),

  gestureEnabled: false,
};

const screenTransitionConfigSmooth: StackNavigationOptions =
  smoothFadeTransitionConfig;

//
// ────────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ────────────────────────────────────────────────────────────────────────────────
//

export {
  screenTransitionConfig, // Platform-based default transition
  screenTransitionConfigFade, // Fade only (no scale, no gesture)
  screenTransitionConfigSmooth, // Recommended smooth fade + scale
};
