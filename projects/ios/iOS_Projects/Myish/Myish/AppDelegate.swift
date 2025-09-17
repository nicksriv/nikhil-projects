//
//  AppDelegate.swift
//  Myish
//
//  Created by Nikhil Srivastava on 8/6/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

import FBSDKCoreKit
import FBSDKLoginKit
import Fabric
import TwitterKit



@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?


    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        Fabric.with([Twitter.self()])

        if FBSDKApplicationDelegate.sharedInstance().application(application, didFinishLaunchingWithOptions: launchOptions) == true{
            return true
        }
        
        return true
    }

    func applicationWillResignActive(application: UIApplication) {
        
    }

    func applicationDidEnterBackground(application: UIApplication) {
     
    }

    func applicationWillEnterForeground(application: UIApplication) {
    
    }

    func applicationDidBecomeActive(application: UIApplication) {
        FBSDKAppEvents.activateApp()
    }

    func applicationWillTerminate(application: UIApplication) {
        
    }
    
    func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject) -> Bool {
        
        if FBSDKApplicationDelegate.sharedInstance().application(application, openURL: url, sourceApplication: sourceApplication, annotation: annotation) != false{
            return true
        }
      
        if GPPURLHandler.handleURL(url, sourceApplication: sourceApplication, annotation: annotation) != false{
            return true
        }
        
            return false
        
    }
    



}

