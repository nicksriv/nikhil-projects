//
//  ViewController.swift
//  PapriChat_Temp
//
//  Created by Nikhil Srivastava on 7/16/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UITextFieldDelegate {
    
    
    @IBOutlet weak var username: UITextField!
    
    @IBOutlet weak var password: UITextField!
    
    var userid: String!
    var passwrd: String!
    var token: String!
    

    override func viewDidLoad() {
        super.viewDidLoad()
        username.delegate = self
        password.delegate = self
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func textFieldShouldReturn(textField: UITextField) -> Bool {
        if textField == self.username {
            self.password.becomeFirstResponder()
        }
        else if textField == self.password {
            
            userid = self.username.text
            passwrd = self.password.text
            
            validateUser(self.userid, pwd: self.passwrd)

        
        }
        
        textField.resignFirstResponder()
        return true
    }
    
//    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
//
//        if segue == "ChatContacts" {
//            if validateUser(self.userid, pwd: self.passwrd) == true{
//                
//            }
//        }
//    }
    
    func validateUser(user: String, pwd: String)->Bool{
        var correctUser: Bool = false
        var dict = ["user":user, "pass":pwd]
        var url = "http://52.6.88.205/login"
        
        //correctUser = self.post(dict, url: url)
        
        self.post(dict, url: url) { (succeeded: Bool, msg: String) -> () in
            var alert = UIAlertView(title: "Success!", message: msg, delegate: nil, cancelButtonTitle: "Okay.")
            if(succeeded) {
                alert.title = "Success!"
                alert.message = msg
                correctUser = true
            }
            else {
                alert.title = "Failed : ("
                alert.message = msg
            }
            
            // Move to the UI thread
            dispatch_async(dispatch_get_main_queue(), { () -> Void in
                // Show the alert
                alert.show()
                
                let storyBoard : UIStoryboard = UIStoryboard(name: "Main", bundle:nil)
                
                let resultViewController = storyBoard.instantiateViewControllerWithIdentifier("ChatContacts") as! ChatContactsViewController
                
                resultViewController.auth = self.token
                
                self.presentViewController(resultViewController, animated:true, completion:nil)
                
            })
        }
        
        return correctUser
    }
    
    func post(params : Dictionary<String, String>, url : String, postCompleted : (succeeded: Bool, msg: String) -> ()) {
        
        var request = NSMutableURLRequest(URL: NSURL(string: url)!)
        var session = NSURLSession.sharedSession()
        request.HTTPMethod = "POST"
        
        var err: NSError?
        request.HTTPBody = NSJSONSerialization.dataWithJSONObject(params, options: nil, error: &err)
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        
        var task = session.dataTaskWithRequest(request, completionHandler: {data, response, error -> Void in
            println("Response: \(response)")
            var strData = NSString(data: data, encoding: NSUTF8StringEncoding)
            println("Body: \(strData)")
            var err: NSError?
            var json = NSJSONSerialization.JSONObjectWithData(data, options: .MutableLeaves, error: &err) as? NSDictionary
            
            var msg = "No message"
            
            // Did the JSONObjectWithData constructor return an error? If so, log the error to the console
            if(err != nil) {
                println(err!.localizedDescription)
                let jsonStr = NSString(data: data, encoding: NSUTF8StringEncoding)
                println("Error could not parse JSON: '\(jsonStr)'")
                postCompleted(succeeded: false, msg: "Error")
            }
            else {
                // The JSONObjectWithData constructor didn't return an error. But, we should still
                // check and make sure that json has a value using optional binding.
                if let parseJSON = json {
                    // Okay, the parsedJSON is here, let's get the value for 'success' out of it
                    if let success = parseJSON["status"] as? String {
                        println("Success: \(success)")
                        self.token = parseJSON["hash"] as! String
                        println("Hash token: \(self.token)")
                        postCompleted(succeeded: true, msg: "Logged in.")
                    }
                    return
                }
                else {
                    // Woa, okay the json object was nil, something went worng. Maybe the server isn't running?
                    let jsonStr = NSString(data: data, encoding: NSUTF8StringEncoding)
                    println("Error could not parse JSON: \(jsonStr)")
                    postCompleted(succeeded: false, msg: "Error")
                }
            }
        })
        
        task.resume()
    }
    
    


}

