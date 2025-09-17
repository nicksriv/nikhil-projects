//
//  ChangePasswordController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/20/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class ChangePasswordController: UIViewController {
    
    @IBOutlet var currentpassword: UITextField!
    
    @IBOutlet var newpassword: UITextField!
    
    @IBOutlet var verifypassword: UITextField!
    
    @IBOutlet var done: UIButton!
    var keyboardFlag = false
    var len: CGFloat!
    var CPString: String!
    var NPString: String!
    var VPString: String!
    //var genders: String!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let colors = Colors()
        self.view.backgroundColor = UIColor.clearColor()
        let backgroundLayer = colors.gl
        backgroundLayer.frame = self.view.frame
        self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
        done.layer.cornerRadius = 10
        self.done.backgroundColor = UIColor(red: 255.0/255.0, green: 90.0/255.0, blue: 52.0/255.0, alpha: 1.0)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "ChangePassword Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
    }
    
    @IBAction func BackButtonPressed(sender: UIButton) {
        self.navigationController?.popViewControllerAnimated(true)
    }
    
    @IBAction func donePressed(sender: UIButton) {
        
        update()
        
    }
    
    func textFieldDidBeginEditing(textField: UITextField) {
        
        if keyboardFlag == false{
            len =  textField.frame.origin.y + textField.frame.size.height
        }
    }
    
    func textFieldDidEndEditing(textField: UITextField) {
        
    }
    
    func textFieldShouldReturn(textField: UITextField) -> Bool {
        self.view.endEditing(true)
        if textField.tag == self.verifypassword.tag{
            update()
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
    
    func update(){
        
        self.CPString = self.currentpassword.text
        self.NPString = self.newpassword.text
        self.VPString = self.verifypassword.text
        var flag = false
        let storedpassword = NSUserDefaults.standardUserDefaults().valueForKey("password") as? String
        if self.CPString == storedpassword && self.CPString != ""{
            
        if self.VPString == self.NPString && self.VPString != ""{
           
            flag = true
            post(["password":self.VPString, "userid": userProfileID], url: "http://myish.com:\(port)/api/changepassword")
        }
        else{
            let alertController = UIAlertController(title: "Password cannot be updated!!", message: "Please enter the new password !", preferredStyle: UIAlertControllerStyle.Alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                
                
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)

            }
        if flag == true{
            let alertController = UIAlertController(title: "Password updated !!", message: "All details have been successfully updated!", preferredStyle: UIAlertControllerStyle.Alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                
                
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
            
        }
        else{
            let alertController = UIAlertController(title: "Password unchanged !!", message: "Password is unchanged!", preferredStyle: UIAlertControllerStyle.Alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                
                
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
            
        }
        }
        else{//CPString
            let alertController = UIAlertController(title: "Current password incorrect !!", message: "Please enter the correct current password!", preferredStyle: UIAlertControllerStyle.Alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                
                
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
                
                
                
                
            }
            else {
                print("Error: \(error?.localizedDescription)")
                let alertController = UIAlertController(title: "Unable to send request !!", message: "Please try again !!", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
                
            }
            
            
        })
        
        task.resume()
    }

}
