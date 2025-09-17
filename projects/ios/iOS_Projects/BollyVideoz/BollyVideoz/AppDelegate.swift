//
//  AppDelegate.swift
//  jsonParseArre
//
//  Created by Dignitas Digital on 6/23/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import UIKit
import CoreData
import Fabric
import Crashlytics

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    var window: UIWindow?
    var deviceToken: String?
    //    var centerContainer: MMDrawerController?
    
    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        
        GAI.sharedInstance().trackUncaughtExceptions = true
        
        GAI.sharedInstance().dispatchInterval = 20;
        
        GAI.sharedInstance().logger.logLevel = GAILogLevel.Verbose
        
        GAI.sharedInstance().trackerWithTrackingId("UA-66057608-2")
        
       // Fabric.with([Crashlytics()])
        Fabric.with([Crashlytics.self()])
      //  application.applicationIconBadgeNumber = 0
        
        if self.deviceToken == nil{
            
            self.deviceToken = "1234"
        }
        
        /* CODE FOR IOS 8 */
        application.registerUserNotificationSettings(UIUserNotificationSettings(forTypes: [UIUserNotificationType.Badge, UIUserNotificationType.Sound, UIUserNotificationType.Alert], categories: nil))
        
        application.registerForRemoteNotifications()
        
        /* CODE FOR IOS 7 */
      //  application.registerForRemoteNotificationTypes( UIRemoteNotificationType.Badge | UIRemoteNotificationType.Sound | UIRemoteNotificationType.Alert )
        
        /*       // Override point for customization after application launch.
        var rootViewController = self.window!.rootViewController
        
        let mainStoryboard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
        
        var centerViewController = mainStoryboard.instantiateViewControllerWithIdentifier("NavViewController") as! NavViewController
        
        var leftViewController = mainStoryboard.instantiateViewControllerWithIdentifier("LeftSideViewController") as! NavigationViewController
        
        //      var rightViewController = mainStoryboard.instantiateViewControllerWithIdentifier("RightSideViewController") as RightSideViewController
        
        var leftSideNav = UINavigationController(rootViewController: leftViewController)
        var centerNav = UINavigationController(rootViewController: centerViewController)
        //  var rightNav = UINavigationController(rootViewController: rightViewController)
        
        centerContainer = MMDrawerController(centerViewController: centerNav, leftDrawerViewController: leftSideNav)
        
        centerContainer!.openDrawerGestureModeMask = MMOpenDrawerGestureMode.PanningCenterView;
        centerContainer!.closeDrawerGestureModeMask = MMCloseDrawerGestureMode.PanningCenterView;
        
        window!.rootViewController = centerContainer
        window!.makeKeyAndVisible()
        */

        return true
    }
    
    func application(application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: NSData) {
        print("hey")
        var infos = toHexString(deviceToken)
        self.deviceToken = infos

        
        let urls = NSURL(string: "http://158.85.122.170:81/UI/notif/start_notify.php?id=" + infos + "&type=ios&imei=0")
        
        if (isConnectedToNetwork(urls!) == true){
            
            let requests = NSURLRequest(URL: urls!)
            NSURLConnection.sendAsynchronousRequest(requests, queue: NSOperationQueue.mainQueue()) {(response, data, error) in
                print(NSString(data: data!, encoding: NSUTF8StringEncoding))
            }
      /*
            let url = NSURL(string: host + "?device_id=" + infos + "&device_type=ios&notification=reset")
            let request = NSURLRequest(URL: url!)
            NSURLConnection.sendAsynchronousRequest(request, queue: NSOperationQueue.mainQueue()) {(response, data, error) in
                println(NSString(data: data, encoding: NSUTF8StringEncoding))
            }*/
        }
        print("Device Token : Optional Error : \(deviceToken)")
        
        
    }
    
    func application(application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: NSError) {
        
        self.deviceToken = "1234"
        print(error)
        
    }
    
    func application(application: UIApplication, didReceiveRemoteNotification userInfo: [NSObject : AnyObject]) {
        
        print("Received: \(userInfo)")
        var temp : NSDictionary = userInfo
        
        if let info = userInfo["aps"] as? Dictionary<String, AnyObject>
        {
            let badge = info["badge"] as! Int
            application.applicationIconBadgeNumber = badge
        }

    }
    
    func toHexString(HString: NSData) -> String {
        
        var hexString: String = ""
        let dataBytes =  UnsafePointer<CUnsignedChar>(HString.bytes)
        
        for (var i: Int=0; i<HString.length; ++i) {
            hexString +=  String(format: "%02X", dataBytes[i])
        }
        
        return hexString
    }
    
    func isConnectedToNetwork(url: NSURL) -> Bool {
        var status:Bool = false
        
        let request = NSMutableURLRequest(URL: url)
        request.HTTPMethod = "HEAD"
        request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalAndRemoteCacheData
        request.timeoutInterval = 10.0
        
        var response:NSURLResponse?
        
        var data = (try? NSURLConnection.sendSynchronousRequest(request, returningResponse: &response)) as NSData?
        
        if let httpResponse = response as? NSHTTPURLResponse {
            if httpResponse.statusCode == 200 {
                status = true
            }
        }
        
        return status
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
        application.applicationIconBadgeNumber = 0
        NSNotificationCenter.defaultCenter().postNotificationName(UIApplicationWillEnterForegroundNotification, object: nil)
        
    }
    
    func applicationDidBecomeActive(application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
        application.applicationIconBadgeNumber = 0
        
    }
    
    func applicationWillTerminate(application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }
    
    
}