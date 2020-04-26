//
//  Header.h
//  MytelPayEU
//
//  Created by Thanh Pham on 2/19/19.
//  Copyright © 2019 Facebook. All rights reserved.
//
#import <UIKit/UIKit.h>
#import <React/RCTView.h>

@interface BarcodeView : RCTView

@property (nonatomic, copy) NSString *text;
@property (nonatomic, copy) NSString *format;

@property (nonatomic, assign) int width;
@property (nonatomic, assign) int height;
@property (nonatomic, assign) bool cache;

@end
