//
//  SignUpViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 8/26/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import UIKit
import FBSDKCoreKit
import FBSDKLoginKit
import TwitterKit


class SignUpViewController: UIViewController, GPPSignInDelegate {
    
    static var kClientId : String = "535956049241-pbon6natcb2nv7eou21ck21rq8t14c3s.apps.googleusercontent.com"
    var GPlusLogin: GPPSignIn!
    
    @IBOutlet weak var NameEdit: UITextField!
    
    @IBOutlet weak var Gender: UISegmentedControl!
    
    @IBOutlet weak var EmailEdit: UITextField!
    
    @IBOutlet weak var PasswordEdit: UITextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        GPlusLogin = GPPSignIn()
        //GPlusLogin.clientID = SignUpViewController.kClientId
        GPlusLogin.shouldFetchGooglePlusUser = true
        GPlusLogin.clientID = SignUpViewController.kClientId
        GPlusLogin.scopes = ["profile"]
        GPlusLogin.delegate = self

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    @IBAction func FBLoginClicked(sender: UIButton) {
        if FBSDKAccessToken.currentAccessToken() == nil{
        let login = FBSDKLoginManager()
        let FBSDKResult: FBSDKLoginManagerLoginResult!
        let error: NSError!
        login.logInWithReadPermissions(["public_profile"]){ (FBSDKResult, error) -> Void in
            if (error != nil) {
                NSLog("Process error");
            } else if (FBSDKResult.isCancelled) {
                NSLog("Cancelled");
            } else {
                NSLog("Logged in");
                let vc : AnyObject! = self.storyboard!.instantiateViewControllerWithIdentifier("TabBarController")
                self.showViewController(vc as! UIViewController, sender: vc)
            }
        }
    }
        else{
            let vc : AnyObject! = self.storyboard!.instantiateViewControllerWithIdentifier("TabBarController")
            self.showViewController(vc as! UIViewController, sender: vc)
        }
    }

    @IBAction func GPPLoginClicked(sender: UIButton) {
        
        if GPlusLogin.trySilentAuthentication() == false{
        
//            if (GPPSignIn.sharedInstance().authentication == nil){
//                GPlusLogin.authenticate()
//            }
            
            let vc : AnyObject! = self.storyboard!.instantiateViewControllerWithIdentifier("TabBarController")
            self.showViewController(vc as! UIViewController, sender: vc)
        }
        
    }
    
    
    @IBAction func TWTLoginClicked(sender: UIButton) {
        Twitter.sharedInstance().logInWithCompletion{(session, error) in
            if session != nil {
                print(session!.userName, terminator: "")
                let vc : AnyObject! = self.storyboard!.instantiateViewControllerWithIdentifier("TabBarController")
                self.showViewController(vc as! UIViewController, sender: vc)
            }        }
    }
    
    func finishedWithAuth(auth: GTMOAuth2Authentication!, error: NSError!) {
        
        if(error == nil){
           
            if (GPPSignIn.sharedInstance().authentication != nil){
                
            }
            else{
                
            }
        }
        else{
            NSLog("Received error \(error) and auth object \(auth)")
        }
    }
    
    @IBAction func RegisterClicked(sender: UIButton) {
        if NameEdit.text == "" {
            
            let alertController = UIAlertController(title: "Invalid Name !!", message: "Please enter a valid name.", preferredStyle: UIAlertControllerStyle.Alert)

            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
        }
        else if EmailEdit.text == "" {
            
            let alertController = UIAlertController(title: "Invalid Email !!", message: "Please enter a valid email.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
        }
        else if self.isValidEmail(EmailEdit.text!) == false{
            let alertController = UIAlertController(title: "Invalid Email Address!!", message: "Please enter a valid email.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
            
        }
        else if PasswordEdit.text == "" {
            
            let alertController = UIAlertController(title: "Invalid Password !!", message: "Please enter a valid password.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
        }
        
        else {
            let name = NameEdit.text!.stringByReplacingOccurrencesOfString(" ", withString: "%20")
            let registrationStr = "http://www.myish.com/api/signup/index?name=\(name)&gender=\(Gender.titleForSegmentAtIndex(Gender.selectedSegmentIndex)!)&email=\(EmailEdit.text)&password=\(PasswordEdit.text)&type=ios"
            let url = NSURL(string: registrationStr)
            print(registrationStr)
            let gurl = NSURL(string: "http://www.google.com")
            if (isConnectedToNetwork(gurl!) == true){
                let request = NSURLRequest(URL: url!)
                NSURLConnection.sendAsynchronousRequest(request, queue: NSOperationQueue.mainQueue()) {(response, data, error) in
                    if (error == nil) {
                        var jerror: NSError?
                        
                        let status = (try! NSJSONSerialization.JSONObjectWithData(data!, options: .MutableContainers)) as! NSDictionary
                        if  status.valueForKey("status") as! String == "1"{
                           
                            let vc : AnyObject! = self.storyboard!.instantiateViewControllerWithIdentifier("TabBarController")
                            self.showViewController(vc as! UIViewController, sender: vc)
                        
                        }
                        else{
                            
                            let alertController = UIAlertController(title: "Unable to Register !!", message: "Please try again later.", preferredStyle: UIAlertControllerStyle.Alert)
                            
                            
                            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                                print("you have pressed OK button");
                            }
                            alertController.addAction(OKAction)
                            
                            self.presentViewController(alertController, animated: true, completion:nil)
                        }
                    }
                }
                
            }
        }
        
    }
    
    func isValidEmail(testStr:String) -> Bool {
        
        let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}"
        
        let emailTest = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        
        let result = emailTest.evaluateWithObject(testStr)
        
        return result

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

}
