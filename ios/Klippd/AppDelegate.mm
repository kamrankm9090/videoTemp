#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <AVFoundation/AVFoundation.h>
#import <AVFoundation/AVFoundation.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"Klippd";
  // You can add your custom initial props in the dictionary below.
    // --- You can add your custom initial props in the dictionary below.
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:nil];
  // --- They will be passed down to the ViewController used by React Native.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
