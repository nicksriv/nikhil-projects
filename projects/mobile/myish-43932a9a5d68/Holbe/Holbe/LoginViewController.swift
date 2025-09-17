//
//  LoginViewController.swift
//  Holbe
//
//  Created by Nikhil Srivastava on 4/11/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit
import CoreData
var userfirstName:String!
var userLastName:String!
var usercityName:String!
var usrid:String!
var userPhoneNumber:String!
var useraddress:String!
var userDOB:String!
var userEmailID:String!
var userProfilepicture:String!
var userProfileImage:UIImage!
var nsdata:NSData!
var device_type = "iPhone"




class LoginViewController: UIViewController,UITextFieldDelegate,UIApplicationDelegate {
    
    
    @IBOutlet weak var txfEmail: UITextField!

    @IBOutlet weak var txfPassword: UITextField!
    
    @IBOutlet weak var btnForgotPassword: UIButton!
    

    
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.txfEmail.text = ""
        self.txfPassword.text = ""

        userProfilepicture = ""
        nsdata = NSData()
        
        activityIndicator.hidden = true
        
        // Do any additional setup after loading the view.

        
        self.txfEmail.layer.addBorder(.Bottom, color: UIColor.lightGrayColor(), thickness: 1)
        self.txfPassword.layer.addBorder(.Bottom, color: UIColor.lightGrayColor(), thickness: 1)
        self.btnForgotPassword.layer.addBorder(.Bottom, color: UIColor.lightGrayColor(), thickness: 1)
        
        
        
        txfEmail.delegate = self
        txfPassword.delegate = self
        
        txfEmail.autocorrectionType = .No
        txfEmail.keyboardType = UIKeyboardType.EmailAddress
        
         ////Tap guesture recognizer to hide keyboard
        
        let tap:UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(LoginViewController.dismisskeyborad))
        view.addGestureRecognizer(tap)
        
        
    }
    
    
    // func to dismiss keyboard
    
    func dismisskeyborad()  {
        
        view.endEditing(true)
    }
    
    
    // func to dismiis keyboard on pressing return key
    
    func textFieldShouldReturn(textField: UITextField) -> Bool {
        self.view.endEditing(true)
        return false
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */
    
    override func viewWillAppear(animated: Bool) {
        
        screen = true
        
//        let tracker = GAI.sharedInstance().defaultTracker
//        tracker.set(kGAIScreenName, value: "Login screen")
//        
//        let builder = GAIDictionaryBuilder.createScreenView()
//        tracker.send(builder.build() as [NSObject : AnyObject])
        
        
        let tracker = GAI.sharedInstance().defaultTracker
        
        let eventTracker: NSObject = GAIDictionaryBuilder.createEventWithCategory(
        "ui_action",
        action: "Login Pressed",
        label: "Login Screen",
        value: nil).build()
        tracker.send(eventTracker as! [NSObject : AnyObject])
        
        
        self.navigationController?.setNavigationBarHidden(false, animated: true)
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), forBarMetrics: .Default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationController?.navigationBar.translucent = true
        self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName :UIColor.whiteColor()]
        self.navigationController?.navigationBar.tintColor = UIColor.whiteColor()
    }
    
    
    
    @IBAction func ForgotPassword(sender: UIButton) {
        
        let alert = UIAlertController(title: "Forgot Password?", message: "Please enter your email address", preferredStyle: .Alert)
        alert.addTextFieldWithConfigurationHandler (nil)
        
        
        alert.addAction(UIAlertAction(title: "OK", style: .Default, handler: { (UIAlertAction) in
            print(alert.textFields![0].text)
            
            if alert.textFields![0].text! != ""{
             // let url = NSURL(string: "http://192.185.26.69/~holbe/api/patient/forgotpassword.php?user_email_address=\(alert.textFields![0].text!)")!
                 //let url = NSURL(string: "http://www.holbe.com/api/patient/forgotpassword.php?user_email_address=\(alert.textFields![0].text!)")!
                let url = NSURL(string: baseURL + "patient/forgotpassword.php?user_email_address=\(alert.textFields![0].text!)")!
                
                
                let task = NSURLSession.sharedSession().dataTaskWithURL(url) { (data,response,error) in
                    
                    if data != nil && error == nil
                    {
                        dispatch_async(dispatch_get_main_queue(), {
                            
                            if NSString(data: data!, encoding: NSUTF8StringEncoding)! == "true"{
                           // self.success()
                            }
                            
                        })
                    }
                    
                }
                task.resume()
                
                 self.success()
                
            }
        }))
        
            
        self.presentViewController(alert, animated: true, completion: nil)
        
    }
    
    
    func success(){
        
        let alert = UIAlertController(title: "Reset password", message: "Please check your mail to reset password", preferredStyle: .Alert)
        
        alert.addAction(UIAlertAction(title: "OK", style: .Default, handler: nil))
        
        self.presentViewController(alert, animated: true, completion: nil)
        
    }
    
    @IBAction func LoginButton(sender: UIButton)
    {
        
        activityIndicator.hidden = false
        activityIndicator.startAnimating()
        self.navigationController?.navigationBar.hidden = true
    
        
        
        
        if self.txfEmail.text != "" && txfPassword.text != ""
        {
            let checkBool = isValidEmail(txfEmail.text!)
            
            if checkBool == true
            {
                

              //  Login("http://192.185.26.69/~holbe/api/patient/login.php?emailaddress=\(txfEmail.text!)&password=\(txfPassword.text!)")
                //  Login("http://192.185.26.69/~holbe/api/patient/login.php?emailaddress=\(txfEmail.text!)&password=\(txfPassword.text!)&device_id=\(device_id)&device_type=\(device_type)")
                //Login("http://www.holbe.com/api/patient/login.php?emailaddress=\(txfEmail.text!)&password=\(txfPassword.text!)&device_id=\(device_id)&device_type=\(device_type)")
                 Login(baseURL + "patient/login.php?emailaddress=\(txfEmail.text!)&password=\(txfPassword.text!)&device_id=\(device_id)&device_type=\(device_type)")
                

            }
            else
            {
                let alertController = UIAlertController(title: "Alert", message: "Please Enter a valid mail ID and Password", preferredStyle: .Alert)
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
                    print("you have pressed OK button");
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
        }
        
        else{
            let alertController = UIAlertController(title: "Alert", message: "Please Enter valid Credentials", preferredStyle: .Alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
                print("you have pressed OK button");
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
        }
    }
    
    func Login(urlString:String)
    {
        let url = NSURL(string: urlString)
        print(url)
        
        let task = NSURLSession.sharedSession().dataTaskWithURL(url!) { (data,response,error) in
            
            if data != nil && error == nil
            {
            dispatch_async(dispatch_get_main_queue(), {
                
                self.extractLogin(data!)
            })
              }
            
        }
        task.resume()
    }
    
    func extractLogin(data:NSData)
    {
        let json = JSON(data: data)
        
        if json["status"].intValue == 200
        {
      
            if (json["0"].dictionaryObject != nil)
            {
                usrid = json["0"]["user_id"].stringValue
                 print(usrid)
                userfirstName = json["0"]["user_first_name"].stringValue
                usercityName = json["0"]["user_city"].stringValue
                userPhoneNumber = json["0"]["user_phone_no"].stringValue
                userDOB = json["0"]["user_dob"].stringValue
                useraddress = json["0"]["user_address"].stringValue
                userLastName = json["0"]["user_last_name"].stringValue
                userEmailID = json["0"]["user_email_address"].stringValue
                userProfilepicture = json["0"]["user_profile_picture"].stringValue
                
                 let urlString:String = userProfilepicture.stringByAddingPercentEncodingWithAllowedCharacters(NSCharacterSet.URLQueryAllowedCharacterSet())!
                if let url = NSURL(string: "\(urlString)")
                {
                    if let data = NSData(contentsOfURL: url)
                    {
                        nsdata = data
                    }
                }
                print(json["0"]["user_profile_picture"].stringValue)
            }
            
            NSUserDefaults.standardUserDefaults().setValue(userEmailID, forKey: "username")
            NSUserDefaults.standardUserDefaults().setValue(txfPassword.text!, forKey: "password")
            NSUserDefaults.standardUserDefaults().setValue(device_id, forKey: "device_token")
            NSUserDefaults.standardUserDefaults().setValue(true, forKey: "hasLoginKey")
           
            activityIndicator.hidden = true
            activityIndicator.stopAnimating()
            
            screenPosition = 0
            
            let alertController = UIAlertController(title: "Disclaimer!!", message: "Your Information is Secure. Holbe complies with the HIPPA/FIPPA security systems for both Canada and the USA. Your demographic information will never be shared or sold.", preferredStyle: .Alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
                
               self.performSegueWithIdentifier("Login", sender: self)
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
            
            
            //performSegueWithIdentifier("Login", sender: self)
        }
        else
        {
            // performSegueWithIdentifier("LoginSuccess", sender: self)
            let alertController = UIAlertController(title: "Alert", message: "Login Failed", preferredStyle: .Alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
                print("you have pressed OK button");
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
            
            activityIndicator.hidden = true
            activityIndicator.stopAnimating()
            self.navigationController?.navigationBar.hidden = false
        }
        
        do
        {
            let json = try NSJSONSerialization.JSONObjectWithData(data, options: .AllowFragments)
            print(json)
            
        }
        catch
        {
            print(error)
        }
       
    }
    
    
    func isValidEmail(testStr:String) -> Bool {
        // println("validate calendar: \(testStr)")
        let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
        
        let emailTest = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        return emailTest.evaluateWithObject(testStr)
    }
    
   
    
    

}








