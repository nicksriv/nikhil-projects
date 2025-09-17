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
import Crashlytics


var userProfileID: String = ""
var username: String = ""
var userimageURL: String = ""
var imageCache = [String: UIImage]()
var aboutme = ""
var gender = ""
var emailid = ""
var deviceTok = ""
//var login = FBSDKLoginManager()
var reach: Reachability?


enum environment{
    case DEV
    case PROD
}

let buildEnvironment:environment = .DEV//change this to switch between DEV and PROD environments

var port = 4000 //API port number -- 4000 for DEV, 3000 for PROD

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, GIDSignInDelegate{
    
    var window: UIWindow?
    let cognitoAccountId = "myish_ios"
    let cognitoIdentityPoolId = "us-east-1:2a17d70c-0f2f-44ce-bd0e-cd56dd1c25d8"
    let cognitoUnauthRoleArn = "Cognito_myish_iosUnauth_Role_M"
    let cognitoAuthRoleArn = "Cognito_myish_iosAuth_Role_S3_M"
    let cognitoIdentityID = "us-east-1:ec99eccd-d1d2-4073-8d97-ab97b96c4f89"
    
    
    
    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        Fabric.with([Twitter.self(), Crashlytics.self()])
        
        application.applicationIconBadgeNumber = 0
        
        if buildEnvironment == .DEV{
            port = 4000
        }
        else{
            port = 3000
        }
        
        let branch: Branch = Branch.getInstance()
        branch.accountForFacebookSDKPreventingAppLaunch()
        
        branch.initSessionWithLaunchOptions(launchOptions, andRegisterDeepLinkHandler: { optParams, error in
            if error == nil{
              if let postID = optParams["postid"] as? String {
                let storyboard = UIStoryboard(name: "Main", bundle: nil)
                            let navigationController = self.window?.rootViewController as? UINavigationController
                            let destinationController2 = storyboard.instantiateViewControllerWithIdentifier("TabBarController")
                            navigationController?.pushViewController(destinationController2, animated: false)
                            let destinationController = storyboard.instantiateViewControllerWithIdentifier("postTab") as? PostViewController
                            //destinationController?.cards.id = info
                
                            let postCard = CardData()
                            postCard.profileName = username
                            postCard.profileImageURL = userimageURL
                            postCard.id = postID
                
                            destinationController!.cards = postCard
                            navigationController?.pushViewController(destinationController!, animated: false)
               // branch.registerDeepLinkController(destinationController, forKey: "postid")
                //branch.initSessionWithLaunchOptions(launchOptions, automaticallyDisplayDeepLinkController: true)

                }
            }
        })
        
        
        GIDSignIn.sharedInstance().delegate = self
        
        let credentialsProvider = AWSCognitoCredentialsProvider(
            regionType: AWSRegionType.USEast1, identityPoolId: cognitoIdentityPoolId)
        //        let credentialsProvider = AWSCognitoCredentialsProvider.init(regionType: AWSRegionType.USEast1, identityId: cognitoIdentityID, accountId: cognitoAccountId, identityPoolId: cognitoIdentityPoolId, unauthRoleArn: cognitoUnauthRoleArn, authRoleArn: cognitoAuthRoleArn, logins: nil)
        
        let defaultServiceConfiguration = AWSServiceConfiguration(
            region: AWSRegionType.USWest2,
            credentialsProvider: credentialsProvider)
        
        AWSServiceManager.defaultServiceManager().defaultServiceConfiguration = defaultServiceConfiguration
        
        let types:UIUserNotificationType = ([.Alert, .Sound, .Badge])
        let settings:UIUserNotificationSettings = UIUserNotificationSettings(forTypes: types, categories: nil)
        application.registerUserNotificationSettings(settings)
        application.registerForRemoteNotifications()
        
        //AWSLogger.defaultLogger().logLevel = .Verbose
        if FBSDKApplicationDelegate.sharedInstance().application(application, didFinishLaunchingWithOptions: launchOptions) == true{
            return true
        }
        //GIDSignIn.sharedInstance().delegate = self
        reach = Reachability.reachabilityForInternetConnection()
        
        // Tell the reachability that we DON'T want to be reachable on 3G/EDGE/CDMA
        reach!.reachableOnWWAN = false
        
        // Here we set up a NSNotification observer. The Reachability that caused the notification
        // is passed in the object parameter
        NSNotificationCenter.defaultCenter().addObserver(self,
                                                         selector: "reachabilityChanged:",
                                                         name: kReachabilityChangedNotification,
                                                         object: nil)
        
        reach!.startNotifier()
        
        //var configureError: NSError?
        
        //GGLContext.sharedInstance().configureWithError(&configureError)
        // assert(configureError == nil, "Error configuring Google services: \(configureError)")
        
        
        
        // Configure tracker from GoogleService-Info.plist.
        //        var configureError:NSError?
        //        GGLContext.sharedInstance().configureWithError(&configureError)
        //        assert(configureError == nil, "Error configuring Google services: \(configureError)")
        
        // Optional: configure GAI options.
        let gai = GAI.sharedInstance()
        gai.trackerWithTrackingId("UA-70843447-1") //UA-70843447-1
        gai.trackUncaughtExceptions = true  // report uncaught exceptions
        //gai.logger.logLevel = GAILogLevel.Verbose  // remove before app release
        
        
        
        
        
        
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
    
    func application(application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: NSData) {
        
        print(deviceToken)
        let infos = toHexString(deviceToken)
        deviceTok = infos
        print("Device Token:" + deviceTok)
        
//        let alertController = UIAlertController(title: "Device Token", message: deviceTok, preferredStyle:UIAlertControllerStyle.Alert)
//        
//        alertController.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.Default, handler: nil))
//     
//        self.window?.rootViewController?.presentViewController(alertController, animated: true, completion: nil)
//        
        
    }
    
    func application(application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: NSError) {
        //deviceTok = "1234"
    }
    
    func application(application: UIApplication, didReceiveRemoteNotification userInfo: [NSObject : AnyObject]) {
        // let temp : NSDictionary = userInfo
        
        if let info = userInfo["aps"] as? Dictionary<String, AnyObject>
        {
            //            if let badge = info["badge"]  {
            //                application.applicationIconBadgeNumber = (badge as! NSString).integerValue
            //            }
            
        }
        
        
        if let info = userInfo["postid"] as? String
        {
            if application.applicationState == .Inactive || application.applicationState == .Background {
                let storyboard = UIStoryboard(name: "Main", bundle: nil)
                let navigationController = self.window?.rootViewController as? UINavigationController
                let destinationController2 = storyboard.instantiateViewControllerWithIdentifier("TabBarController")
                navigationController?.pushViewController(destinationController2, animated: false)
                let destinationController = storyboard.instantiateViewControllerWithIdentifier("postTab") as? PostViewController
                //destinationController?.cards.id = info
                
                let postCard = CardData()
                postCard.profileName = username
                postCard.profileImageURL = userimageURL
                postCard.id = info
                
                destinationController!.cards = postCard
                navigationController?.pushViewController(destinationController!, animated: false)
            
            }
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
    
    func application(application: UIApplication,
                     openURL url: NSURL, options: [String: AnyObject]) -> Bool {
        
//        if url.host != nil{
//            let urlString = url.absoluteString
//            let querystring = urlString.componentsSeparatedByString("=")
//            let postid = querystring[1] as String
//            
//            let storyboard = UIStoryboard(name: "Main", bundle: nil)
//            let navigationController = self.window?.rootViewController as? UINavigationController
//            let destinationController2 = storyboard.instantiateViewControllerWithIdentifier("TabBarController")
//            navigationController?.pushViewController(destinationController2, animated: false)
//            let destinationController = storyboard.instantiateViewControllerWithIdentifier("postTab") as? PostViewController
//            //destinationController?.cards.id = info
//            
//            let postCard = CardData()
//            postCard.profileName = username
//            postCard.profileImageURL = userimageURL
//            postCard.id = postid
//            
//            destinationController!.cards = postCard
//            navigationController?.pushViewController(destinationController!, animated: false)
//            
//        }
        
        if Branch.getInstance().handleDeepLink(url) != false{
            return true
        }
        
        if #available(iOS 9.0, *) {
            if GIDSignIn.sharedInstance().handleURL(url,
                                                    sourceApplication: options[UIApplicationOpenURLOptionsSourceApplicationKey] as? String,
                                                    annotation: options[UIApplicationOpenURLOptionsAnnotationKey]) != false{
                return true
            }
            if FBSDKApplicationDelegate.sharedInstance().application(application, openURL: url, sourceApplication: options[UIApplicationOpenURLOptionsSourceApplicationKey] as? String,
                                                                     annotation: options[UIApplicationOpenURLOptionsAnnotationKey]) != false{
                return true
            }
            return false
        } else {
            // Fallback on earlier versions
            return false
        }
    }
    
    
    func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject) -> Bool {
        
        if Branch.getInstance().handleDeepLink(url) != false{
            return true
        }
        
        if FBSDKApplicationDelegate.sharedInstance().application(application, openURL: url, sourceApplication: sourceApplication, annotation: annotation) != false{
            return true
        }
        
        //if GPPURLHandler.handleURL(url, sourceApplication: sourceApplication, annotation: annotation) != false{
        // return true
        // }
        if GIDSignIn.sharedInstance().handleURL(url,
                                                sourceApplication: sourceApplication,
                                                annotation: annotation) != false {
            return true
        }
        
        return false
        
    }
    
    func application(application: UIApplication, handleEventsForBackgroundURLSession identifier: String, completionHandler: () -> Void) {
        AWSS3TransferUtility.interceptApplication(application, handleEventsForBackgroundURLSession: identifier, completionHandler: completionHandler)
        
    }
    
    func reachabilityChanged(notification: NSNotification) {
        if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN()) {
            
            let vc = getVisibleViewControllerFrom(self.window?.rootViewController)
            let alert = UIAlertController(title: "No Internet Connection", message: "Please check your internet connection", preferredStyle: .Alert)
            let okAction = UIAlertAction(title: "OK", style: .Default, handler: nil)
            alert.addAction(okAction)
            
            vc?.presentViewController(alert, animated: true, completion: nil)
            
        }
    }
    
    
    func getVisibleViewControllerFrom(vc: UIViewController?) -> UIViewController? {
        if let nc = vc as? UINavigationController {
            return self.getVisibleViewControllerFrom(nc.visibleViewController)
        } else if let tc = vc as? UITabBarController {
            return self.getVisibleViewControllerFrom(tc.selectedViewController)
        } else {
            if let pvc = vc?.presentedViewController {
                return self.getVisibleViewControllerFrom(pvc)
            } else {
                return vc
            }
        }
    }
    
    func signIn(signIn: GIDSignIn!, didSignInForUser user: GIDGoogleUser!,
                withError error: NSError!) {
        if (error == nil) {
            // Perform any operations on signed in user here.
            let userId = user.userID                  // For client-side use only!
            let idToken = user.authentication.idToken // Safe to send to the server
            let fullName = user.profile.name
            // let givenName = user.profile.givenName
            // let familyName = user.profile.familyName
            let email = user.profile.email
            // ...
        } else {
            print("\(error.localizedDescription)")
        }
    }
    
    func signIn(signIn: GIDSignIn!, didDisconnectWithUser user:GIDGoogleUser!,
                withError error: NSError!) {
        // Perform any operations when the user disconnects from app here.
        // ...
    }
    
    func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
        // pass the url to the handle deep link call
        
        return Branch.getInstance().continueUserActivity(userActivity)
    }
    
}