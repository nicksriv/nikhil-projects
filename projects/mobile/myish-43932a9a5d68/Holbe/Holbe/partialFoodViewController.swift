//
//  partialFoodViewController.swift
//  Holbe
//
//  Created by Nikhil Srivastava on 8/1/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//    

import UIKit

class partialFoodViewController: UIViewController, UITextFieldDelegate, UIGestureRecognizerDelegate {

    var foodLifestyle: Bool!
    
    @IBOutlet var partialType: UILabel!
    
   // @IBOutlet weak var editIcon: UIImageView!
    @IBOutlet weak var editIcon: UIButton!
    @IBOutlet var partialItem: UILabel!
    
    @IBOutlet weak var notesLabel: UILabel!
    @IBOutlet var partialQuantityLabel: UILabel!
    
    @IBOutlet var quanitity: UITextField!
    
    @IBOutlet var navBar: UINavigationBar!
    
    @IBOutlet var navVW: UIView!
    
    @IBOutlet var TapGestureRecognizer: UITapGestureRecognizer!
    
    @IBOutlet var cancel: UIButton!
    @IBOutlet var submit: UIButton!
    
    var lifestyletype: String!
    var lifestyleItem: String!
    var lifestyleQuantity: String!
    var timings_id: String!
    var notes:String!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.navigationBar.barTintColor = UIColor(red: 18, green: 178, blue: 230)
        self.navigationController?.title = "LIFESTYLE"
        self.navigationItem.leftBarButtonItem?.image = UIImage(named: "lifestyles")
        TapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(partialFoodViewController.handleTap(_:)))
        TapGestureRecognizer.delegate = self
        self.view.addGestureRecognizer(TapGestureRecognizer)
        //self.navBar.tit
        self.quanitity.delegate = self
        self.partialType.text = lifestyletype
        self.partialType.textColor = UIColor(red: 18, green: 178, blue: 230)
        self.partialType.font = UIFont.boldSystemFontOfSize(20.0)
        self.partialItem.text = lifestyleItem
        self.partialQuantityLabel.text = lifestyleQuantity
        self.notesLabel.text = self.notes
        
        self.navigationController?.navigationBar.hidden = true
        self.navVW.backgroundColor = UIColor(red: 18, green: 178, blue: 230)
        // Do any additional setup after loading the view.
        
        self.navigationController?.navigationBar.hidden = true
        self.navigationController?.prefersStatusBarHidden()
        
        if segueboolean == false
        {
            self.quanitity.userInteractionEnabled = false
            self.submit.hidden = true
            self.cancel.hidden = true
            self.editIcon.hidden =  true
        }
    }
    
    override func viewWillAppear(animated: Bool) {
        screen = false
        submit.layer.cornerRadius = 20
        submit.clipsToBounds = true
        submit.backgroundColor = UIColor(red: 18, green: 178, blue: 230)
        cancel.layer.cornerRadius = 20
        cancel.clipsToBounds = true
        cancel.backgroundColor = UIColor.darkGrayColor()
        submit.titleLabel?.textColor = UIColor.whiteColor()
        cancel.titleLabel?.textColor = UIColor.whiteColor()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func handleTap(sender: UITapGestureRecognizer) {
        
         self.view.endEditing(true)
    }

    
    @IBAction func submitClicked(sender: UIButton) {
        
        
//        let postString = "timings_id=\(timings_id)&time=\(self.quanitity.text)"
//        let json = ["timings_id":"\(timings_id)", "time":"\(self.quanitity.text)"]
//        do{
//        let jsonData = try NSJSONSerialization.dataWithJSONObject(json, options: .PrettyPrinted)
//            request.setValue("application/x-www-form-urlencoded; charset=utf-8", forHTTPHeaderField: "Content-Type")
//            request.HTTPBody = jsonData
//            
//            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
//                guard error == nil && data != nil else {
//                    print("error=\(error)")
//                    return
//                }
//                
//
//                do{
//                if let responseJSON = try NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.MutableContainers) as? [String:AnyObject]{
//                    print(responseJSON)
//                }
//                }
//                catch let error as NSError {
//                    print(error.localizedDescription)
//                }
//                //let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
//                //print("responseString = \(responseString)")
//            }
//            task.resume()
//        }
//        catch let error as NSError {
//         print(error.localizedDescription)
//        }
        
        
        if timings_id != "" && self.quanitity.text != ""{
        //let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/test/updatelifestylecompliance.php")!)
      //  let request = NSMutableURLRequest(URL: NSURL(string: "http://www.holbe.com/api/patient/test/updatelifestylecompliance.php")!)
        let request = NSMutableURLRequest(URL: NSURL(string: baseURL + "patient/test/updatelifestylecompliance.php")!)
        request.HTTPMethod = "POST"
        let postString = "timings_id=\(timings_id)&time=\(self.quanitity.text!)"
        print(postString)
        request.setValue("application/x-www-form-urlencoded; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
        
        let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
            guard error == nil && data != nil else {                                                          // check for fundamental networking error
                print("error=\(error)")
                return
            }
            
            if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200
            {           // check for http errors
                print("statusCode should be 200, but is \(httpStatus.statusCode)")
                print("response = \(response!)")
                
            }
            
            let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
            print("responseString = \(responseString!)")
            
           // self.navigationController?.popViewControllerAnimated(true)
        }
        task.resume()
        self.navigationController?.popViewControllerAnimated(true)    
       // request.HTTPBody = jsonData
        }
        else{
            let alertController = UIAlertController(title: "Alert", message: "All fields are mandatory. Please enter the data for all the fields.", preferredStyle: .Alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
                print("you have pressed OK button");
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
        }
        
        
    }
    
    @IBAction func cancelClicked(sender: UIButton) {
        self.navigationController?.navigationBarHidden = false
        self.navigationController?.popViewControllerAnimated(true)
        
    }

    @IBAction func cross(sender: UIButton) {
        self.navigationController?.navigationBarHidden = false
   self.navigationController?.popViewControllerAnimated(true)
    
    }
    
    
    @IBAction func editIconTapped(sender: AnyObject) {
        quanitity.becomeFirstResponder()
    }
    
 
  

}
