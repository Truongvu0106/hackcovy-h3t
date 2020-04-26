//
//  BarcodeViewManager.m
//  MytelPayEU
//
//  Created by Thanh Pham on 2/19/19.
//  Copyright © 2019 Facebook. All rights reserved.
//
#import "BarcodeView.h"
#import "BarcodeViewManager.h"

@implementation BarcodeViewManager

RCT_EXPORT_MODULE()

- (RCTView *)view
{
  return [[BarcodeView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(text, NSString);
RCT_EXPORT_VIEW_PROPERTY(format, NSString);
RCT_EXPORT_VIEW_PROPERTY(width, int);
RCT_EXPORT_VIEW_PROPERTY(height, int);
RCT_EXPORT_VIEW_PROPERTY(cache, BOOL);

@end

