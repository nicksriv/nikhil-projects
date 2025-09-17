//
//  LoginViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 8/6/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import UIKit


class LoginViewController: UIViewController {
    
    @IBOutlet weak var registration: UIButton!
    @IBOutlet weak var member: UIButton!
    
    //let MyKeychainWrapper = KeychainWrapper()
    //let createLoginButtonTag = 0
    //let loginButtonTag = 1
    let termsOfServiceURL = "http://www.myish.com/terms-and-conditions.html"
    let privacyPolicyURL = "http://www.myish.com/privacy-policy.html"
    var webViewURL = ""
    
    @IBAction func termsOfService(sender: UIButton) {
        webViewURL = termsOfServiceURL
       self.performSegueWithIdentifier("webView", sender: self)
    }
    
    @IBAction func privacyPolicy(sender: UIButton) {
      webViewURL = privacyPolicyURL
        self.performSegueWithIdentifier("webView", sender: self)
    }
    
    override func viewDidLoad() {
        
//        let hasLogin = NSUserDefaults.standardUserDefaults().boolForKey("hasLoginKey")
//        
//        if hasLogin == true{
//        //if NSUserDefaults.valueForKey("username") != nil && NSUserDefaults.valueForKey("password") != nil{
//            if let storedUsername = NSUserDefaults.standardUserDefaults().valueForKey("username") as? String {
//                
//                if let storedpassword = NSUserDefaults.standardUserDefaults().valueForKey("password") as? String {
//                
//                let registrationStr = "http://myish.com:3000/api/validate?emailaddress=\(storedUsername)&password=\(storedpassword)"
//                //let url = NSURL(string: registrationStr)
//                print(registrationStr)
//                let gurl = NSURL(string: "http://www.google.com")
//                if (isConnectedToNetwork(gurl!) == true){
//                    let login = LoginApi()
//                    login.loadLogin(registrationStr, completion: didLoadLoginData)
//                }
//                }
//            }
        

            //performSegueWithIdentifier("tabbar", sender: self)
       // }
        //}
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }
    
   

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "login"{
            let login = segue.destinationViewController as! LoginProfileViewController
            
        }
        if segue.identifier == "register"{
            let register = segue.destinationViewController as! SignUpViewController
            
        }
        if segue.identifier == "webView"{
            let webView = segue.destinationViewController as! WebViewController
            webView.url = webViewURL
        }
        
    }
    
//    func didLoadLoginData(loginDatas: [LoginData]){
//        if loginDatas.count > 0{
//            if loginDatas[0].userid != ""{
//                userProfileID = loginDatas[0].userid
//                username = loginDatas[0].profilename
//                userimageURL = loginDatas[0].profileimageURL
//
//                let vc : AnyObject! = self.storyboard!.instantiateViewControllerWithIdentifier("TabBarController")
//                self.navigationController?.pushViewController(vc as! UIViewController, animated: true)
//                
//            }
//
//        }
//
//    }
//    
//    func isConnectedToNetwork(url: NSURL) -> Bool {
//        var status:Bool = false
//        
//        let request = NSMutableURLRequest(URL: url)
//        request.HTTPMethod = "HEAD"
//        request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalAndRemoteCacheData
//        request.timeoutInterval = 10.0
//        
//        var response: NSURLResponse?
//        do{
//            var data = try NSURLConnection.sendSynchronousRequest(request, returningResponse: &response) as NSData?
//            
//            if let httpResponse = response as? NSHTTPURLResponse {
//                if httpResponse.statusCode == 200 {
//                    status = true
//                }
//            }
//        }
//        catch{
//            
//        }
//        
//        
//        return status
//    }
//    


}
