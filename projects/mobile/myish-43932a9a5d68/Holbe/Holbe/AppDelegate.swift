
//
//  AppDelegate.swift
//  Holbe
//
//  Created by Nikhil Srivastava on 4/11/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit
import Fabric
import Crashlytics
import Branch


var screenPosition: Int!
var device_id = ""
var baseURL = "http://www.holbe.com/api/"


@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?


    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        // Override point for customization after application launch.
        Fabric.with([Crashlytics.self])
        
        let gai = GAI.sharedInstance()
        gai.trackUncaughtExceptions = true  // report uncaught exceptions
        gai.logger.logLevel = GAILogLevel.Verbose  // remove before app release
        
        
        GAI.sharedInstance().trackUncaughtExceptions = true
        GAI.sharedInstance().dispatchInterval = 20
        GAI.sharedInstance().logger.logLevel = GAILogLevel.Verbose
        GAI.sharedInstance().trackerWithTrackingId("UA-77735518-1")
        let types:UIUserNotificationType = ([.Alert, .Sound, .Badge])
        let settings:UIUserNotificationSettings = UIUserNotificationSettings(forTypes: types, categories: nil)
        application.registerUserNotificationSettings(settings)
        application.registerForRemoteNotifications()
  

        let branch: Branch = Branch.getInstance()
           branch.initSessionWithLaunchOptions(launchOptions, andRegisterDeepLinkHandler: {params, error in
            if error == nil {
                // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
                // params will be empty if no data found
                // ... insert custom logic here ...
                print("params: %@", params.description)
            }
           })
        
        return true
    }

    func applicationWillResignActive(application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(application: UIApplication) {
        // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }
    
    
    func toHexString(HString: NSData) -> String {
        
        var hexString: String = ""
        let dataBytes =  UnsafePointer<CUnsignedChar>(HString.bytes)
        
        for (var i: Int=0; i<HString.length; ++i) {
            hexString +=  String(format: "%02X", dataBytes[i])
        }
        
        return hexString
    }
    
    
    
    func application(application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: NSData) {
        
        print(deviceToken)
        let infos = toHexString(deviceToken)
        device_id = infos
        print("Device Token:" + device_id)
        NSUserDefaults.standardUserDefaults().setValue(device_id, forKey: "device_token")

    }
    
    
    func application(application: UIApplication, didRegisterUserNotificationSettings notificationSettings: UIUserNotificationSettings) {
        
        if notificationSettings.types != .None {
            application.registerForRemoteNotifications()
        }

        
    }
    
    
    func application(application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: NSError) {
        print("Failed to register:", error)
    }
    
    
    // Respond to URI scheme links
    // Respond to URI scheme links
    
    func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject) -> Bool {
        // pass the url to the handle deep link call
        Branch.getInstance().handleDeepLink(url)
        // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
        return true
    }
    
    func application(_ application: UIApplication, open url: NSURL, sourceApplication: String?, annotation: Any) -> Bool {
        // pass the url to the handle deep link call
        Branch.getInstance().handleDeepLink(url);
        
        // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
        return true
    }
    
    
    func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
        // pass the url to the handle deep link call
        
        return Branch.getInstance().continueUserActivity(userActivity)
    }
}

