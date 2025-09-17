//
//  LoginProfileViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 9/3/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import UIKit
import FBSDKCoreKit
import FBSDKLoginKit
import TwitterKit
import CoreLocation


class LoginProfileViewController: UIViewController, UITextFieldDelegate, GIDSignInDelegate, GIDSignInUIDelegate, CLLocationManagerDelegate {

    static var kClientId : String = "519513685035-85dlmm8bo8tcokfd2uks4v3ik3j3vdkc.apps.googleusercontent.com"
    //var GPlusLogin: GPPSignIn!
    var GSignin: GIDSignIn!
    //var signIn: GIDSignIn!
    //var userProfileID: String!
    var loginApi: LoginApi!
    
    @IBOutlet var googleSignin: GIDSignInButton!
    @IBOutlet weak var actInd: UIActivityIndicatorView!
    @IBOutlet weak var emailID: UITextField!
    
    @IBOutlet weak var password: UITextField!
    var keyboardFlag = false
    var len: CGFloat!
    var locManager = CLLocationManager()
    var latitude: CLLocationDegrees!
    var longitude: CLLocationDegrees!
    @IBOutlet weak var loginButton: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
       
        //GSignin = GIDSignIn()
        GSignin = GIDSignIn.sharedInstance()
        GSignin.clientID = LoginProfileViewController.kClientId
        GSignin.shouldFetchBasicProfile = true
        GSignin.allowsSignInWithBrowser = false;
        GSignin.allowsSignInWithWebView = true;
        GSignin.delegate = self
        GSignin.uiDelegate = self
        
        emailID.delegate = self
        password.delegate = self
        emailID.tag = 0
        password.tag = 1
        keyboardFlag = false
        len = 0
        locManager.delegate = self
        //locManager.requestWhenInUseAuthorization()
        if #available(iOS 9.0, *) {
            locManager.requestWhenInUseAuthorization()
        } else {
           locManager.requestWhenInUseAuthorization()
        }
        locManager.startUpdatingLocation()
        if locManager.location != nil{
            latitude = locManager.location?.coordinate.latitude
            longitude = locManager.location?.coordinate.longitude
        }
        
        
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("keyboardWillShow:"), name:UIKeyboardWillShowNotification, object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("keyboardWillHide:"), name:UIKeyboardWillHideNotification, object: nil)

        loginApi = LoginApi()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func textFieldDidBeginEditing(textField: UITextField) {
        
        if keyboardFlag == false{
            len =  textField.frame.origin.y + textField.frame.size.height
            
        }
    }
    
    func textFieldDidEndEditing(textField: UITextField) {
        NSNotificationCenter.defaultCenter().postNotification(NSNotification(name: "keyboardWillHide:", object: self))
    }
    
    func textFieldShouldReturn(textField: UITextField) -> Bool {
        self.view.endEditing(true)
        if textField.tag == password.tag{
            self.actInd.hidden = false
            self.actInd.startAnimating()
        self.loginclick()
        }
        
        return false
    }
    
    func keyboardWillShow(sender: NSNotification) {
        
        if keyboardFlag == false{
            let info = sender.userInfo!
            let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()
            
            if len > (self.view.frame.size.height - keyboardFrame.size.height){
                keyboardFlag = true
                self.view.frame.origin.y -= len - (self.view.frame.size.height - keyboardFrame.size.height) + 10
            }
            
        }
    }
    
    func keyboardWillHide(sender: NSNotification) {
        
        if keyboardFlag == true{
            let info = sender.userInfo!
            let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()
            keyboardFlag = false
            
            self.view.frame.origin.y += len - (self.view.frame.size.height - keyboardFrame.size.height) + 10
            len = 0
            
        }
    }

    
    @IBAction func FBLoginClicked(sender: UIButton) {
      //  if FBSDKAccessToken.currentAccessToken() == nil || emailid == ""{
            let login = FBSDKLoginManager()
            let FBSDKResult: FBSDKLoginManagerLoginResult!
            let error: NSError!
        
            login.logOut()
            login.logInWithReadPermissions(["public_profile", "email"]){ (FBSDKResult, error) -> Void in
                if (error != nil) {
                    NSLog("Process error")
                } else if (FBSDKResult.isCancelled) {
                    NSLog("Cancelled")
                } else {
                    NSLog("Logged in")
         
                    let graph = FBSDKGraphRequest(graphPath: "me", parameters: ["fields": "id, name, email, gender, picture.type(large)"])
                    graph.startWithCompletionHandler({ (connection, user, error) -> Void in
                        if error == nil{
                           self.actInd.startAnimating()
                            let dictuser = user["email"] as! String!
                            username = user["name"] as! String!
                            
                            emailid = dictuser
                            let arr = user["picture"] as! NSDictionary
                            let dict = arr["data"] as! NSDictionary
                            userimageURL = dict["url"] as! String!
                            gender = user["gender"] as! String!
                            let fbid = user["id"] as! String!
                            NSUserDefaults.standardUserDefaults().setValue(emailid, forKey: "username")
                            NSUserDefaults.standardUserDefaults().setValue("facebook", forKey: "password")
                            NSUserDefaults.standardUserDefaults().setValue(true, forKey: "hasLoginKey")

                            let gurl = NSURL(string: "http://www.google.com")
                            if (self.isConnectedToNetwork(gurl!) == true){
                                self.post(["source":"IOS", "devicetype": "Iphone", "deviceid": deviceTok, "fbid":fbid, "username":username, "emailaddress":emailid, "gender":gender, "profilepicture":userimageURL, "password": "facebook", "lattitude": "\(self.latitude)", "longitude": "\(self.longitude)"], url: "http://myish.com:\(port)/api/sociallogin")
                            }

                        }
                    })

                }
            }

    }
    
    func signIn(signIn: GIDSignIn!, didSignInForUser user: GIDGoogleUser!,
        withError error: NSError!) {
            if (error == nil) {
                // Perform any operations on signed in user here.
                let userId = user.userID                  // For client-side use only!
                let idToken = user.authentication.idToken // Safe to send to the server
                let name = user.profile.name
                let email = user.profile.email
                if user.profile.hasImage == true{
                let imgURL = user.profile.imageURLWithDimension(0)
                 userimageURL = imgURL.absoluteString
                }
                // ...
                self.actInd.startAnimating()
                //let dictuser = user["email"] as! String!
                username = name
                
                emailid = email
                
               
                //gender = user["gender"] as! String!
                let googleid = userId
                NSUserDefaults.standardUserDefaults().setValue(emailid, forKey: "username")
                NSUserDefaults.standardUserDefaults().setValue("google", forKey: "password")
                NSUserDefaults.standardUserDefaults().setValue(true, forKey: "hasLoginKey")
                
                let gurl = NSURL(string: "http://www.google.com")
                if (self.isConnectedToNetwork(gurl!) == true){
                    self.post(["source":"IOS", "devicetype": "Iphone", "deviceid": deviceTok, "googleplusid":googleid, "username":username, "emailaddress":emailid, "profilepicture":userimageURL, "password": "google", "lattitude": "\(self.latitude)", "longitude": "\(self.longitude)"], url: "http://myish.com:\(port)/api/sociallogin")
                }
            } else {
                print("\(error.localizedDescription)")
            }
    }
    

    func signIn(signIn: GIDSignIn!, didDisconnectWithUser user:GIDGoogleUser!,
        withError error: NSError!) {
            // Perform any operations when the user disconnects from app here.
            // ...
    }
    
    @IBAction func GPPLoginClicked(sender: GIDSignInButton) {
        GSignin.signIn()
    }

    
    @IBAction func TWTLoginClicked(sender: UIButton) {
        Twitter.sharedInstance().logInWithCompletion{(session, error) in
            if session != nil {
                print(session!.userName, terminator: "")
                //session.u
                let vc : AnyObject! = self.storyboard!.instantiateViewControllerWithIdentifier("TabBarController")
                self.navigationController?.pushViewController(vc as! UIViewController, animated: true)
                //self.showViewController(vc as! UIViewController, sender: vc)
            }        }
    }
    
    @IBAction func loginClicked(sender: UIButton) {
    
        self.actInd.hidden = false
        self.actInd.startAnimating()
        self.loginclick()
    
    }
    
    func loginclick(){
        if emailID.text == "" {
            
            let alertController = UIAlertController(title: "Invalid Email !!", message: "Please enter a valid email.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");
                self.actInd.stopAnimating()
                //self.password.text = ""
                //self.emailID.becomeFirstResponder()
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
        }
        else if self.isValidEmail(emailID.text!) == false{
            let alertController = UIAlertController(title: "Invalid Email Address!!", message: "Please enter a valid email.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");
                self.actInd.stopAnimating()
                //self.password.text = ""
                //self.emailID.becomeFirstResponder()
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
            
        }
        else if password.text == "" {
            
            let alertController = UIAlertController(title: "Invalid Password !!", message: "Please enter a valid password.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");
                self.actInd.stopAnimating()
                //self.password.text = ""
                //self.password.becomeFirstResponder()
            }
            alertController.addAction(OKAction)
            //self.navigationController?.pushViewController(alertController, animated: true)
            self.presentViewController(alertController, animated: true, completion:nil)
            
        }
            
        else {
            //let str = "http://myish.com:3000/api/validate?emailaddress=amit@dignitasdigital.com&password=bFGz449"
            
            let registrationStr = "http://myish.com:\(port)/api/validate?emailaddress=\(emailID.text!)&password=\(password.text!)"
            let url = NSURL(string: registrationStr)
            print(registrationStr)
            let gurl = NSURL(string: "http://www.google.com")
            if (isConnectedToNetwork(gurl!) == true){
                loginApi.loadLogin(registrationStr, completion: didLoadLoginData)
            }
            
        }
    }
    
    func loadSocial(data: NSData!, completion: (([LoginData]) -> Void)!){
        var logindatas = [LoginData]()
        let loginDataArray = try! NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.MutableContainers) as! Array<NSDictionary>
        
        let loginDictionary = loginDataArray
        //var cardCount = cardsDataArray.count
        //var cards = [CardData]()
        print(loginDictionary.count)
        
        print(loginDictionary)
        
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
    
    func didLoadLoginData(loginDatas: [LoginData]){
        if loginDatas.count > 0{
        if loginDatas[0].userid != ""{
        userProfileID = loginDatas[0].userid
        username = loginDatas[0].profilename
            if loginDatas[0].profileimageURL != "" && loginDatas[0].profileimageURL != nil {
                userimageURL = loginDatas[0].profileimageURL
            }
        emailid = loginDatas[0].profileemail
        gender = loginDatas[0].gender
        aboutme = loginDatas[0].aboutme
            
            self.postLogin(["id":userProfileID,"deviceid":deviceTok], url: "http://myish.com:\(port)/api/updatedeviceid") //to update device token
            
            
            self.actInd.stopAnimating()
            
            if self.password.text != ""{
                NSUserDefaults.standardUserDefaults().setValue(emailid, forKey: "username")
                NSUserDefaults.standardUserDefaults().setValue(self.password.text, forKey: "password")
                NSUserDefaults.standardUserDefaults().setValue(true, forKey: "hasLoginKey")
            }
//            let gurl = NSURL(string: "http://www.google.com")
//            if (self.isConnectedToNetwork(gurl!) == true){
//                self.postLogin(["userid":userProfileID], url: "http://myish.com:3000/api/recordtimestamp")
//            }
            
            
            if let _ = NSUserDefaults.standardUserDefaults().valueForKey("isFirstLaunch") as? Bool{
                
                let vc : AnyObject! = self.storyboard!.instantiateViewControllerWithIdentifier("TabBarController")
                self.navigationController?.pushViewController(vc as! UIViewController, animated: true)
            
            }
            else{
                
                NSUserDefaults.standardUserDefaults().setValue(true, forKey: "isFirstLaunch")
                let pageController = self.storyboard!.instantiateViewControllerWithIdentifier("pageViewController") as! UIPageViewController
                self.navigationController?.pushViewController(pageController , animated: true)
            }

        }
        else{
            let alertController = UIAlertController(title: "Unable to process the user !!", message: "Please try again later.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button");
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
            }
            self.actInd.stopAnimating()

        }
        else{
            let alertController = UIAlertController(title: "Unable to Login !!", message: "Please try again later.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
                                        let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                                            print("you have pressed OK button");
                                        }
                                        alertController.addAction(OKAction)
            
                                        self.presentViewController(alertController, animated: true, completion:nil)
            self.actInd.stopAnimating()
        }
        
        
    }
    
    @IBAction func backButtonPressed(sender: UIButton) {
        self.navigationController?.popViewControllerAnimated(true)
        
    }
    
    func isValidEmail(testStr:String) -> Bool {
        
        let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}"
        
        let emailTest = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        
        let result = emailTest.evaluateWithObject(testStr)
        
        
        let emailRegEx1 = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}+\\.[A-Za-z]{2,4}"
        
        let emailTest1 = NSPredicate(format:"SELF MATCHES %@", emailRegEx1)
        
        let result1 = emailTest1.evaluateWithObject(testStr)
        
        
        return (result || result1)
        
    }
    
    
     func post(params : Dictionary<String, String>, url : String) {
    
        let request = NSMutableURLRequest(URL: NSURL(string: url)!)
        let session = NSURLSession.sharedSession()
        request.HTTPMethod = "POST"
        request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalCacheData
        //let paramss = ["username":"jameson", "password":"password"] as Dictionary<String, String>
        
        //let err: NSError?
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
        //let paramss = ["username":"jameson", "password":"password"] as Dictionary<String, String>
        
        //let err: NSError?
        do{
            request.HTTPBody = try NSJSONSerialization.dataWithJSONObject(params, options: NSJSONWritingOptions.init(rawValue: 0))
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("application/json", forHTTPHeaderField: "Accept")
            //request.setValue("utf-8", forHTTPHeaderField: "Accept-Charset")
            
        }
        catch{
            print("Error writing JSON: ")
        }
        //print("Request: \(request)")
        let task = session.dataTaskWithRequest(request, completionHandler: {data, response, error in
            guard data != nil else {
                //print("no data found: \(error)")
                return
            }
            
            //print("Response: \(response)")
            let strData = NSString(data: data!, encoding: NSUTF8StringEncoding)

            
        })
        
        task.resume()
        
        
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

    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "password"{
            let passwordController = segue.destinationViewController as! PasswordViewController
            
        }
    }
    
    func locationManager(manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let location = locations.last
        if location != nil{
            latitude = location!.coordinate.latitude
            longitude = location!.coordinate.longitude
        }

    }


}
