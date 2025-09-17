//
//  EditViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/19/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class EditViewController: UIViewController, UITextFieldDelegate{

    
    @IBOutlet var name: UITextField!
    
    @IBOutlet var segmentControl: UISegmentedControl!
    
    @IBOutlet var email: UITextField!
    
    @IBOutlet var password: UITextField!
    
    @IBOutlet var done: UIButton!
    var keyboardFlag = false
    var len: CGFloat!
    var nameString: String!
    var emailString: String!
    var passwordString: String!
    var genders: String!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        let colors = Colors()
        self.view.backgroundColor = UIColor.clearColor()
        let backgroundLayer = colors.gl
        backgroundLayer.frame = self.view.frame
        self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
        done.layer.cornerRadius = 10
        self.done.backgroundColor = UIColor(red: 255.0/255.0, green: 90.0/255.0, blue: 52.0/255.0, alpha: 1)
        segmentControl.layer.cornerRadius = 8
        name.text = username
        name.enabled = false
        name.textColor = UIColor.darkGrayColor()
        email.text = emailid
        email.enabled = false
        email.textColor = UIColor.darkGrayColor()
        password.text = aboutme
        if gender.caseInsensitiveCompare("Male") == NSComparisonResult.OrderedSame{
            self.segmentControl.selectedSegmentIndex = 0
        }
        else{
            self.segmentControl.selectedSegmentIndex = 1

        }
        

    }

    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "EditProfile Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
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
        if textField.tag == self.password.tag{
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
        
        self.nameString = self.name.text
        self.emailString = self.email.text
        self.passwordString = self.password.text
        self.genders = "MALE"
        if self.segmentControl.selectedSegmentIndex == 1{
        self.genders = "FEMALE"
        }
        var flag = false
//        if self.nameString != username && self.nameString != ""{
//            username = self.nameString
//            flag = true
//            post(["username":username, "userid": userProfileID], url: "http://myish.com:3000/api/updateusername")
//        }
//        if self.emailString != emailid && isValidEmail(self.emailString){
//            emailid = self.emailString
//            flag = true
//            //post(["emailaddress":emailid, "userid": userProfileID], url: "http://myish.com:3000/api/updateemail")
//        }
        if self.genders != gender{
            gender = self.genders
            flag = true
            post(["gender":gender, "userid": userProfileID], url: "http://myish.com:\(port)/api/updategender")
        }
        if self.passwordString != aboutme && self.passwordString != ""{
            aboutme = self.passwordString
            flag = true
            post(["aboutme":aboutme, "userid": userProfileID], url: "http://myish.com:\(port)/api/updateaboutme")
        }
        if flag == true{
            let alertController = UIAlertController(title: "Profile updated !!", message: "All details have been successfully updated!", preferredStyle: UIAlertControllerStyle.Alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                
               // self.actInd.stopAnimating()
                self.navigationController?.popToRootViewControllerAnimated(true)

                
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
            
        }
        else{
            let alertController = UIAlertController(title: "Profile details !!", message: "All details are unchanged!", preferredStyle: UIAlertControllerStyle.Alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                
                self.navigationController?.popToRootViewControllerAnimated(true)
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
