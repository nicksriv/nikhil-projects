//
//  PasswordViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/18/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class PasswordViewController: UIViewController, UITextFieldDelegate {

    @IBOutlet weak var emailID: UITextField!
    
    @IBOutlet weak var actInd: UIActivityIndicatorView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.emailID.delegate = self
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "ForgotPassword Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func textFieldShouldReturn(textField: UITextField) -> Bool {
        
        self.send()
        
        return false
    }
    
    func sendrequest(){
        self.send()
    }
    
    @IBAction func SendPressed(sender: UIButton) {
    self.send()
    }

    @IBAction func BackButtonPressed(sender: UIButton) {
      self.navigationController?.popViewControllerAnimated(true)
    }
    
    func send(){
        self.actInd.hidden = false
        self.actInd.startAnimating()
        let text = self.emailID.text
        if text != nil && text != ""{
        if self.isValidEmail(text!) == true{
        let gurl = NSURL(string: "http://www.google.com")
        if (isConnectedToNetwork(gurl!) == true){
            
            post(["emailaddress":text!], url: "http://myish.com:\(port)/api/forgotpassword")
            let alertController = UIAlertController(title: "Password reset !!", message: "New password has been mailed to the given email address!", preferredStyle: UIAlertControllerStyle.Alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                
                
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
            self.actInd.stopAnimating()
        }
        }
        else{
            let alertController = UIAlertController(title: "Invalid Email Address!!", message: "Please enter a valid email.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");

                self.actInd.stopAnimating()
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
            }
        }
        else{
            let alertController = UIAlertController(title: "Invalid email address !!", message: "Email address cannot be blank. Please enter a valid email.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");
                
                self.actInd.stopAnimating()
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
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
        }
        catch{
            print("Error writing JSON: ")
        }
        let task =  session.dataTaskWithRequest(request, completionHandler: {data, response, error -> Void in
            print("Request: \(request)")
            print("Response: \(response!)")
            if error == nil{
               
                self.actInd.stopAnimating()
                
                
            }
            else {
                print("Error: \(error?.localizedDescription)")
                let alertController = UIAlertController(title: "Unable to send request !!", message: "Please try again !!", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
               
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
                self.actInd.stopAnimating()
            }
            
            
        })
        
        task.resume()
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
