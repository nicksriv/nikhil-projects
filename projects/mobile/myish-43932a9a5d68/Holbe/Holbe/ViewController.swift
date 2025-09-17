//
//  ViewController.swift
//  Holbe
//
//  Created by Nikhil Srivastava on 4/11/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

class ViewController: UIViewController,MenuTransitionManagerDelegate {
    let menuTransitionManager = MenuTransitionManager()

    @IBOutlet var actInd: UIActivityIndicatorView!
    override func viewDidLoad() {
        super.viewDidLoad()
          //self.navigationController!.navigationBar.tintColor = UIColor.blackColor()
        // Do any additional setup after loading the view, typically from a nib.
        //self.actInd.startAnimating()
       // let username = NSUserDefaults.standardUserDefaults().valueForKey("username")
       // let password = NSUserDefaults.standardUserDefaults().valueForKey("password")
        
       // Login("http://192.185.26.69/~holbe/api/patient/login.php?emailaddress=\(username!)&password=\(password!)")
    }
    
    override func viewWillAppear(animated: Bool) {
        screen = true
        self.navigationController?.setNavigationBarHidden(true, animated: false)
        //self.navigationController?.setNavigationBarHidden(false, animated: true)
//        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), forBarMetrics: .Default)
//        self.navigationController?.navigationBar.shadowImage = UIImage()
//        self.navigationController?.navigationBar.translucent = true
//        self.navigationController?.navigationBar.titleTextAttributes =             [NSForegroundColorAttributeName :UIColor.whiteColor()]
//        self.navigationController?.navigationBar.tintColor = UIColor.whiteColor()

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
        
    }
    func Dismiss() {
        dismissViewControllerAnimated(true, completion: nil)
        
    }
    
//    override func viewDidAppear(animated: Bool) {
//        login()
//    }
//    
//    func login(){
//        let hasLogin = NSUserDefaults.standardUserDefaults().boolForKey("hasLoginKey")
//        
//        if hasLogin == true{
//            //if NSUserDefaults.valueForKey("username") != nil && NSUserDefaults.valueForKey("password") != nil{
//            
//                
//            
//
//                      performSegueWithIdentifier("directLogin", sender: self)
//                    
//        }
//           
//        
//        else
//        {
//           
//        }
//        
//    }
    
    
    @IBAction func unWind(segue:UIStoryboardSegue){
        
        let sourceVC = segue.sourceViewController as! MenuViewcontroller
        let selectedItem = sourceVC.currentItem! as String
        dismissViewControllerAnimated(true, completion: nil)
        
        
        let vc =  self.storyboard?.instantiateViewControllerWithIdentifier(selectedItem)
        
        if !((self.navigationController!.viewControllers.last!.isKindOfClass(ViewController)) && vc!.isKindOfClass(ViewController))
        {
            if let vc = vc{
                self.navigationController?.pushViewController(vc, animated: true)
            }
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
            
            // NSUserDefaults.standardUserDefaults().setValue(txfEmail.text!, forKey: "username")
            // NSUserDefaults.standardUserDefaults().setValue(txfPassword.text!, forKey: "password")
            
            //activityIndicator.hidden = true
            //activityIndicator.stopAnimating()
            self.actInd.stopAnimating()
            let storyboard = UIStoryboard(name: "Main", bundle: nil)
            let vc = storyboard.instantiateViewControllerWithIdentifier("MenuViewController") as! MenuViewcontroller
            vc.currentItem = "Coming Up"
            self.navigationController?.pushViewController(vc, animated: true)
            
        }
        else
        {
            // performSegueWithIdentifier("LoginSuccess", sender: self)
            let alertController = UIAlertController(title: "Alert", message: "Login Failed", preferredStyle: .Alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
                print("you have pressed OK button");
            }
            alertController.addAction(OKAction)
            
            //self.presentViewController(alertController, animated: true, completion:nil)
            self.actInd.stopAnimating()
            //activityIndicator.hidden = true
            //activityIndicator.stopAnimating()
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
    
    


}

