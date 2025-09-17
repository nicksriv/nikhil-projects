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
import CoreLocation

class SignUpViewController: UIViewController, UITextFieldDelegate, GIDSignInDelegate, GIDSignInUIDelegate, CLLocationManagerDelegate {
    
    static var kClientId : String = "519513685035-85dlmm8bo8tcokfd2uks4v3ik3j3vdkc.apps.googleusercontent.com"
    //var GPlusLogin: GPPSignIn!
    var GSignin: GIDSignIn!
    
    @IBOutlet var GoogleSignIn: GIDSignInButton!
    @IBOutlet weak var NameEdit: UITextField!
    
    @IBOutlet weak var Gender: UISegmentedControl!
    
    @IBOutlet weak var EmailEdit: UITextField!
    
    @IBOutlet weak var PasswordEdit: UITextField!
    
    @IBOutlet var navBar: UINavigationBar!
    var keyboardFlag = false
    var len: CGFloat!
    @IBOutlet var backBaritem: UIBarButtonItem!
    
    @IBOutlet weak var actInd: UIActivityIndicatorView!
    
    var loginApi: LoginApi!
    var locManager = CLLocationManager()
    var latitude: CLLocationDegrees!
    var longitude: CLLocationDegrees!
    var trimmed: String!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //UIApplication.sharedApplication().setStatusBarHidden(true, withAnimation: UIStatusBarAnimation.None)
        
        // GSignin = GIDSignIn()
        GSignin = GIDSignIn.sharedInstance()
        GSignin.clientID = SignUpViewController.kClientId
        GSignin.shouldFetchBasicProfile = true
        GSignin.allowsSignInWithBrowser = false;
        GSignin.allowsSignInWithWebView = true;
        GSignin.delegate = self
        GSignin.uiDelegate = self
        
        NameEdit.delegate = self
        EmailEdit.delegate = self
        PasswordEdit.delegate = self
        PasswordEdit.tag = 0
        keyboardFlag = false
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
       // print("latitude: "+ latitude +" longitude: "+longitude)
        len = 0
       
        //self.backBaritem.setBackButtonBackgroundImage(Utils.imageResize(UIImage(named: "Back gray")!, sizeChange: CGSize(width: 23, height: 31)), forState: UIControlState.Normal, barMetrics: UIBarMetrics.Default)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("keyboardWillShow:"), name:UIKeyboardWillShowNotification, object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("keyboardWillHide:"), name:UIKeyboardWillHideNotification, object: nil)
        loginApi = LoginApi()
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    func textFieldDidBeginEditing(textField: UITextField) {
        
        func prefersStatusBarHidden() -> Bool {
            return true
        }
        
        if keyboardFlag == false{
       len =  textField.frame.origin.y + textField.frame.size.height
        }
    }
    
    func textFieldDidEndEditing(textField: UITextField) {
        
    }
    
    func textFieldShouldReturn(textField: UITextField) -> Bool {
        self.view.endEditing(true)
        if textField.tag == PasswordEdit.tag{
            self.actInd.hidden = false
            self.actInd.startAnimating()
            self.loginClick()
        }
        return false
    }
    
    override func touchesBegan(touches: Set<UITouch>, withEvent event: UIEvent?) {
        
        
         UIApplication.sharedApplication().statusBarHidden=false;
        self.view.endEditing(true)
    }
    
    func keyboardWillShow(sender: NSNotification) {
        
        //if keyboardFlag == false{
            let info = sender.userInfo!
            let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()
            
            
            if len+20 > (self.view.frame.size.height - keyboardFrame.size.height) && abs(self.view.frame.origin.y)+(self.view.frame.size.height-len-20) < keyboardFrame.size.height {
                //keyboardFlag = true
            self.view.frame.origin.y -=  max(len+50 - (self.view.frame.size.height - keyboardFrame.size.height),50)
            }
        // }
    }
    
    func keyboardWillHide(sender: NSNotification) {
        
        self.view.frame.origin.y -= self.view.frame.origin.y
       // keyboardFlag = false
//        if keyboardFlag == true{
//            let info = sender.userInfo!
//            let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()
//            keyboardFlag = false
//            
//            self.view.frame.origin.y += len - (self.view.frame.size.height - keyboardFrame.size.height) + 10
//            len = 0
//            
//        }
    }
    
    @IBAction func FBLoginClicked(sender: UIButton) {
        //if FBSDKAccessToken.currentAccessToken() == nil{
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
                            self.postsocial(["source":"IOS", "devicetype": "Iphone", "deviceid": deviceTok, "fbid":fbid, "username":username, "emailaddress":emailid, "gender":gender, "profilepicture":userimageURL, "password": "facebook", "lattitude": "\(self.latitude)", "longitude": "\(self.longitude)"], url: "http://myish.com:\(port)/api/sociallogin")
                        }
                        
                    }
                })
                
            }
        }

    }
    
    func signIn(signIn: GIDSignIn!, didSignInForUser user: GIDGoogleUser!,
        withError error: NSError!) {
            if (error == nil) {
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
                username = name
                
                emailid = email
 
                let googleid = userId
                NSUserDefaults.standardUserDefaults().setValue(emailid, forKey: "username")
                NSUserDefaults.standardUserDefaults().setValue("google", forKey: "password")
                NSUserDefaults.standardUserDefaults().setValue(true, forKey: "hasLoginKey")
                
                let gurl = NSURL(string: "http://www.google.com")
                if (self.isConnectedToNetwork(gurl!) == true){
                    self.postsocial(["source":"IOS", "devicetype": "Iphone", "deviceid": deviceTok, "googleplusid":googleid, "username":username, "emailaddress":emailid, "profilepicture":userimageURL, "password": "google", "lattitude": "\(self.latitude)", "longitude": "\(self.longitude)"], url: "http://myish.com:\(port)/api/sociallogin")
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
    
    @IBAction func GPPLoginClicked(sender: UIButton) {
        
       GSignin.signIn()
        
    }
    
    @IBAction func BackButtonPressed(sender: UIButton) {
       self.navigationController?.popViewControllerAnimated(true)
    }
    
    
    @IBAction func RegisterClicked(sender: UIButton) {
        self.actInd.hidden = false
        self.actInd.startAnimating()
        self.loginClick()
    }
    
    func loginClick(){
    
        if NameEdit.text == "" || self.isValidUsername(NameEdit.text!) == false{
            
            let alertController = UIAlertController(title: "Invalid Name !!", message: "Please enter a valid name.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");
                //self.PasswordEdit.text = ""
                //self.NameEdit.becomeFirstResponder()
                self.actInd.stopAnimating()
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
        }
        //else if NameEdit.text?.characters.count > 15 {
          else if trimmed.characters.count > 15 {
            
            let alertController = UIAlertController(title: "Character Limit Exceeded", message: "Maximum of 15 characters allowed for name", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");
                //self.PasswordEdit.text = ""
                //self.NameEdit.becomeFirstResponder()
                self.actInd.stopAnimating()
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)

        }
        else if EmailEdit.text == "" {
            
            let alertController = UIAlertController(title: "Invalid Email !!", message: "Please enter a valid email.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");
                //self.PasswordEdit.text = ""
                //self.EmailEdit.becomeFirstResponder()
                self.actInd.stopAnimating()
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
        }
        else if self.isValidEmail(EmailEdit.text!) == false{
            let alertController = UIAlertController(title: "Invalid Email Address!!", message: "Please enter a valid email.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");
                //self.PasswordEdit.text = ""
                //self.EmailEdit.becomeFirstResponder()
                self.actInd.stopAnimating()
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
            
        }
        else if PasswordEdit.text == "" {
            
            let alertController = UIAlertController(title: "Invalid Password !!", message: "Please enter a valid password.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");
                //self.PasswordEdit.text = ""
                //self.PasswordEdit.becomeFirstResponder()
                self.actInd.stopAnimating()
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
        }
            
        else {
            
            //let name = NameEdit.text!.stringByReplacingOccurrencesOfString(" ", withString: "%20")
            
            let registrationStr = "http://myish.com:\(port)/api/validate?emailaddress=\(EmailEdit.text!)&password=\(PasswordEdit.text!)"
            let gurl = NSURL(string: "http://www.google.com")
            if (isConnectedToNetwork(gurl!) == true){
                
                post(["source":"IOS", "devicetype": "Iphone", "deviceid": deviceTok, "username":NameEdit.text!, "password":PasswordEdit.text!, "emailaddress":EmailEdit.text!, "gender":Gender.titleForSegmentAtIndex(Gender.selectedSegmentIndex)!, "longitude": "\(self.longitude)", "lattitude": "\(self.latitude)"], url: "http://myish.com:\(port)/api/users", isRecord: true)
                //self.performSegueWithIdentifier("login", sender: self)
                loginApi.loadLogin(registrationStr, completion: didLoadLoginData)
                
            }
            
        }
        
    }
    
    func post(params : Dictionary<String, String>, url : String, isRecord: Bool!) {
        let request = NSMutableURLRequest(URL: NSURL(string: url)!)
        let session = NSURLSession.sharedSession()
        request.HTTPMethod = "POST"
        request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalCacheData
        do{
            
            request.HTTPBody = try NSJSONSerialization.dataWithJSONObject(params, options: NSJSONWritingOptions.init(rawValue: 0))
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("application/json", forHTTPHeaderField: "Accept")
        }
        catch{
            print("Error writing JSON: ")
        }
        let task =  session.dataTaskWithRequest(request, completionHandler: {data, response, error -> Void in
            
            if error == nil{
                let strData = NSString(data: data!, encoding: NSUTF8StringEncoding)
                if isRecord == true{
                self.actInd.stopAnimating()
                //self.performSegueWithIdentifier("login", sender: self)
                }
                
            }
            else {
                if isRecord == true{
                let alertController = UIAlertController(title: "Unable to login !!", message: "Please try again !!", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    print("you have pressed OK button", terminator: "");
                    self.actInd.stopAnimating()
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
                self.actInd.stopAnimating()
                }
            }
            
            
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

    
    
    func postsocial(params : Dictionary<String, String>, url : String) {
        
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
    
    func didLoadLoginData(loginDatas: [LoginData]){
        if loginDatas.count > 0{
            if loginDatas[0].userid != ""{
                userProfileID = loginDatas[0].userid
                username = loginDatas[0].profilename
                userimageURL = loginDatas[0].profileimageURL
                emailid = loginDatas[0].profileemail
                gender = loginDatas[0].gender
                aboutme = loginDatas[0].aboutme
                
                self.postLogin(["id":userProfileID,"deviceid":deviceTok], url: "http://myish.com:\(port)/api/updatedeviceid") //to update device token
                
                self.actInd.stopAnimating()
                
                if self.PasswordEdit.text != ""{
                    NSUserDefaults.standardUserDefaults().setValue(emailid, forKey: "username")
                    NSUserDefaults.standardUserDefaults().setValue(self.PasswordEdit.text, forKey: "password")
                    NSUserDefaults.standardUserDefaults().setValue(true, forKey: "hasLoginKey")
                }
//                let gurl = NSURL(string: "http://www.google.com")
//                if (self.isConnectedToNetwork(gurl!) == true){
//                    self.post(["userid":userProfileID], url: "http://myish.com:3000/api/recordtimestamp", isRecord: false)
//                }
                
                
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
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "login"{
        _ = segue.destinationViewController as! LoginProfileViewController
        }
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
    
    func isValidUsername(testStr:String) -> Bool {
        
//      //  let nameRegEx = "[A-Z0-9a-z._-\\s]"
//        //print(testStr)
//        
//       // let nameTest = NSPredicate(format:"SELF MATCHES %@", nameRegEx)
//       // var res = testStr.stringByTrimmingCharactersInSet(NSCharacterSet.whitespaceCharacterSet())
//        // print(res)
//        
//     // let res = testStr.rangeOfCharacterFromSet(NSCharacterSet(charactersInString: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-. ").invertedSet)
//        
//        
//       // let res = testStr.stringByTrimmingCharactersInSet(NSCharacterSet.whitespaceCharacterSet())
//        
//        //let result = nameTest.evaluateWithObject(testStr)
//        var result: Bool!
//        if (res != nil){
//            result = false
//        }
//        else{
//            result = true
//        }
//        
//        return result

        var rawString: String = testStr
        var whitespace: NSCharacterSet = NSCharacterSet.whitespaceAndNewlineCharacterSet()
        trimmed = rawString.stringByTrimmingCharactersInSet(whitespace)
        
        print(trimmed)
        if trimmed.characters.count>0
        {
          //  print(trimmed.characters.count)
            return true
        }
        else
        {
           // print(trimmed.characters.count)
            return false
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
    
    func locationManager(manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let location = locations.last
        if location != nil{
            latitude = location!.coordinate.latitude
            longitude = location!.coordinate.longitude
        }

    }
    
    override func prefersStatusBarHidden() -> Bool
    {
        return true
    }
    
    
}