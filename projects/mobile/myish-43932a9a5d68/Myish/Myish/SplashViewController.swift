
//
//  SplashViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/17/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class SplashViewController: UIViewController {

        //@IBOutlet weak var registration: UIButton!
        //@IBOutlet weak var member: UIButton!
        
        //let MyKeychainWrapper = KeychainWrapper()
        //let createLoginButtonTag = 0
        //let loginButtonTag = 1
        override func viewDidLoad() {
            
                                //}
            super.viewDidLoad()
            
            // Do any additional setup after loading the view.
        }
        
        override func didReceiveMemoryWarning() {
            super.didReceiveMemoryWarning()
            // Dispose of any resources that can be recreated.
        }
    
    override func viewDidAppear(animated: Bool) {
        login()
    }
    
    func login(){
        let hasLogin = NSUserDefaults.standardUserDefaults().boolForKey("hasLoginKey")
        
        if hasLogin == true{
            //if NSUserDefaults.valueForKey("username") != nil && NSUserDefaults.valueForKey("password") != nil{
            if let storedUsername = NSUserDefaults.standardUserDefaults().valueForKey("username") as? String {
                
                if let storedpassword = NSUserDefaults.standardUserDefaults().valueForKey("password") as? String {
                    
                    if storedpassword.caseInsensitiveCompare("facebook") == NSComparisonResult.OrderedSame || storedpassword.caseInsensitiveCompare("google") == NSComparisonResult.OrderedSame{
                        let gurl = NSURL(string: "http://www.google.com")
                        if (self.isConnectedToNetwork(gurl!) == true){
                            self.post(["emailaddress":storedUsername, "password":storedpassword], url: "http://myish.com:\(port)/api/sociallogin")
                        }
                    }
                    else{
                    let registrationStr = "http://myish.com:\(port)/api/validate?emailaddress=\(storedUsername)&password=\(storedpassword)"
                    //let url = NSURL(string: registrationStr)
                    print(registrationStr)
                    let gurl = NSURL(string: "http://www.google.com")
                    if (isConnectedToNetwork(gurl!) == true){
                        let login = LoginApi()
                        login.loadLogin(registrationStr, completion: didLoadLoginData)
                    }
                    }
                }
            }
        }
        else{
            performSegueWithIdentifier("logincontroller", sender: self)
        }

    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
                if segue.identifier == "logincontroller"{
                    let tab = segue.destinationViewController as! LoginViewController
        
                }
                if segue.identifier == "tabcontroller"{
                    let tab = segue.destinationViewController as! TabBarController
                    
                }
            }
        
    func didLoadLoginData(loginDatas: [LoginData]){
                if loginDatas.count > 0{
                    if loginDatas[0].userid != ""{
                        
                        print(loginDatas)
                        userProfileID = loginDatas[0].userid
                        username = loginDatas[0].profilename
                        userimageURL = loginDatas[0].profileimageURL
                        emailid = loginDatas[0].profileemail
                        gender = loginDatas[0].gender
                        aboutme = loginDatas[0].aboutme
//                        let gurl = NSURL(string: "http://www.google.com")
//                        if (self.isConnectedToNetwork(gurl!) == true){
//                            self.postLogin(["userid":userProfileID], url: "http://myish.com:3000/api/recordtimestamp")
//                        }
                        
                         self.postLogin(["id":userProfileID,"deviceid":deviceTok], url: "http://myish.com:\(port)/api/updatedeviceid") //to update device token
        
                        performSegueWithIdentifier("tabcontroller", sender: self)
        
                    }
                    else{
                        performSegueWithIdentifier("logincontroller", sender: self)

                    }
        
                }
                else{
                        performSegueWithIdentifier("logincontroller", sender: self)

                }
        
            }
        
    func isConnectedToNetwork(url: NSURL) -> Bool {
                var status:Bool = false
        
                let request = NSMutableURLRequest(URL: url)
                request.HTTPMethod = "HEAD"
                request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalAndRemoteCacheData
                request.timeoutInterval = 10.0
                
                var response: NSURLResponse?
                do{
                    var data = try NSURLConnection.sendSynchronousRequest(request, returningResponse: &response) as NSData?
                    
                    if let httpResponse = response as? NSHTTPURLResponse {
                        if httpResponse.statusCode == 200 {
                            status = true
                        }
                    }
                }
                catch{
                    
                }
                
                
                return status
            }
    
    func loadSocial(data: NSData!, completion: (([LoginData]) -> Void)!){
        var logindatas = [LoginData]()
        let loginDataArray = try! NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.MutableContainers) as! Array<NSDictionary>
        
        let loginDictionary = loginDataArray
        //var cardCount = cardsDataArray.count
        //var cards = [CardData]()
        print(loginDictionary.count)
        
        for login in loginDictionary{
            
            let login = LoginData(data:login as NSDictionary )
            
            logindatas.append(login as LoginData)
            
        }
        
        let priority = DISPATCH_QUEUE_PRIORITY_DEFAULT
        dispatch_async(dispatch_get_global_queue(priority, 0)) {
            dispatch_async(dispatch_get_main_queue()) {
                
                completion(logindatas)
            }
        }
    }
    
    func post(params : Dictionary<String, String>, url : String) {
        
        let request = NSMutableURLRequest(URL: NSURL(string: url)!)
        let session = NSURLSession.sharedSession()
        request.HTTPMethod = "POST"
        request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalCacheData

        do{
            request.HTTPBody = try NSJSONSerialization.dataWithJSONObject(params, options: NSJSONWritingOptions.init(rawValue: 0))
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("application/json", forHTTPHeaderField: "Accept")
            //request.setValue("utf-8", forHTTPHeaderField: "Accept-Charset")
            
        }
        catch{
            print("Error writing JSON: ")
        }
        print("Request: \(request)")
        let task = session.dataTaskWithRequest(request, completionHandler: {data, response, error in
            guard data != nil else {
                print("no data found: \(error)")
                return
            }
            
            print("Response: \(response)")
            let strData = NSString(data: data!, encoding: NSUTF8StringEncoding)
            print("Body: \(strData)")

            self.loadSocial(data, completion: self.didLoadLoginData)
            
        })
        
        task.resume()
        
        
    }
    
    func postLogin(params : Dictionary<String, String>, url : String) {
        
        let request = NSMutableURLRequest(URL: NSURL(string: url)!)
        let session = NSURLSession.sharedSession()
        request.HTTPMethod = "POST"
        request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalCacheData

        do{
            request.HTTPBody = try NSJSONSerialization.dataWithJSONObject(params, options: NSJSONWritingOptions.init(rawValue: 0))
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("application/json", forHTTPHeaderField: "Accept")
            //request.setValue("utf-8", forHTTPHeaderField: "Accept-Charset")
            
        }
        catch{
            print("Error writing JSON: ")
        }
        print("Request: \(request)")
        let task = session.dataTaskWithRequest(request, completionHandler: {data, response, error in
            guard data != nil else {
               // print("no data found: \(error)")
                return
            }
            
           // print("Response: \(response)")
            let strData = NSString(data: data!, encoding: NSUTF8StringEncoding)
           // print("Body: \(strData)")

            
        })
        
        task.resume()
        
        
    }
    
            
        
        
}