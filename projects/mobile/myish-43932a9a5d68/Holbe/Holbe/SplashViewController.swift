//
//  SplashViewController.swift
//  Holbe
//
//  Created by Appsriv Technologies on 18/10/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

class SplashViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.navigationBarHidden = true

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
          
            if let storedUsername = NSUserDefaults.standardUserDefaults().valueForKey("username") as? String {
                
                if let storedpassword = NSUserDefaults.standardUserDefaults().valueForKey("password") as? String {

                      if storedUsername != ""
                      {
                          if let storeddeviceId = NSUserDefaults.standardUserDefaults().valueForKey("device_token") as? String
                          {
                           // Login("http://www.holbe.com/api/patient/login.php?emailaddress=\(storedUsername)&password=\(storedpassword)&device_id=\(storeddeviceId)&device_type=\(device_type)")
                            Login(baseURL + "patient/login.php?emailaddress=\(storedUsername)&password=\(storedpassword)&device_id=\(storeddeviceId)&device_type=\(device_type)")
                        }
                          else{
                            //Login("http://www.holbe.com/api/patient/login.php?emailaddress=\(storedUsername)&password=\(storedpassword)&device_type=\(device_type)")
                            Login(baseURL + "patient/login.php?emailaddress=\(storedUsername)&password=\(storedpassword)&device_type=\(device_type)")
                        }
                        
                       // performSegueWithIdentifier("show2", sender: self)
                        

                     }
                    
                      else{
                        performSegueWithIdentifier("show1", sender: self)
                    }
                   
                    }
                }
            }

        else{
            performSegueWithIdentifier("show1", sender: self)
        }
        
    }
    
    
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "show1"{
            let login = segue.destinationViewController as! ViewController
            
        }
        if segue.identifier == "show2"{
            let daily = segue.destinationViewController as! CominUpviewcontroller
            
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
            
            //self.loadSocial(data, completion: self.didLoadLoginData)
            
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
            

         
            screenPosition = 0
            performSegueWithIdentifier("show2", sender: self)
        }
        
        else
        {
               performSegueWithIdentifier("show1", sender: self)
        }
    }
    
    

}
