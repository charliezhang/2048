//
//  TFViewController.m
//  2048
//
//  Created by Charlie Zhang on 3/14/14.
//  Copyright (c) 2014 Facebook. All rights reserved.
//

#import "TFViewController.h"

@interface TFViewController ()

@end

@implementation TFViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    NSString *fullURL = @"http://www.erlingsiba.com";
    NSURL *url = [NSURL URLWithString:fullURL];
    NSURLRequest *requestObj = [NSURLRequest requestWithURL:url];
    [_viewWeb loadRequest:requestObj];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
