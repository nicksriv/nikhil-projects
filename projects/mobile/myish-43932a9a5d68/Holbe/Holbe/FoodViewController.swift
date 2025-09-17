//
//  FoodViewController.swift
//  Holbe
//
//  Created by Nikhil Srivastava on 8/1/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

class FoodViewController: UIViewController, UITextFieldDelegate, UIGestureRecognizerDelegate {

    
    @IBOutlet var Food: UILabel!
    
    @IBOutlet var time: UILabel!
    
    @IBOutlet weak var editIcon: UIImageView!
    @IBOutlet var minutes: UILabel!
    
    @IBOutlet var minuteTxt: UITextField!
    
    @IBOutlet var TapGestureRecognizer: UITapGestureRecognizer!
    
    @IBOutlet var navVW: UIView!
    var type: String!
    var Item: String!
    var Quantity: String!
    var timings_id: String!
    
    @IBOutlet var cancel: UIButton!
    @IBOutlet var submit: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.navigationBar.barTintColor = UIColor(red: 189, green: 128, blue: 195)
        self.navigationController?.title = "FOOD & DRINKS"
        self.navigationItem.leftBarButtonItem?.image = UIImage(named: "food-&-Drinks")
        TapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(FoodViewController.handleTap))
        TapGestureRecognizer.delegate = self
        self.view.addGestureRecognizer(TapGestureRecognizer)
        self.minuteTxt.delegate = self
        self.Food.text = type
        self.Food.textColor = UIColor(red: 189, green: 128, blue: 195)
        self.Food.font = UIFont.boldSystemFontOfSize(20.0)
        self.time.text = Item
        self.minutes.text = Quantity
        self.navigationController?.navigationBar.hidden = true
        self.navVW.backgroundColor = UIColor(red: 189, green: 128, blue: 195)
        // Do any additional setup after loading the view.
        self.navigationController?.navigationBar.hidden = true
        self.navigationController?.prefersStatusBarHidden()
        
        if segueboolean == false
        {
            self.minuteTxt.userInteractionEnabled =  false
            self.submit.hidden = true
            self.cancel.hidden = true
            self.editIcon.hidden = true
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(animated: Bool) {
        screen = false
        submit.layer.cornerRadius = 20
        submit.clipsToBounds = true
        submit.backgroundColor = UIColor(red: 189, green: 128, blue: 195)
        cancel.layer.cornerRadius = 20
        cancel.clipsToBounds = true
        cancel.backgroundColor = UIColor.darkGrayColor()
        submit.titleLabel?.textColor = UIColor.whiteColor()
        cancel.titleLabel?.textColor = UIColor.whiteColor()
    }
    
    @IBAction func submitClicked(sender: UIButton) {
        
        if timings_id != "" && self.minuteTxt.text != ""{
        
       // let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/test/updatefoodcompliance.php")!)
        //let request = NSMutableURLRequest(URL: NSURL(string: "http://www.holbe.com/api/patient/test/updatefoodcompliance.php")!)
        let request = NSMutableURLRequest(URL: NSURL(string: baseURL + "patient/test/updatefoodcompliance.php")!)
        request.HTTPMethod = "POST"
        let postString = "timings_id=\(timings_id)&amount=\(self.minuteTxt.text!)"
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
                print("response = \(response)")
                
            }
            
            let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
            print("responseString = \(responseString)")
            //self.navigationController!.popViewControllerAnimated(false)
        
        }
        
        task.resume()
        self.navigationController?.popViewControllerAnimated(true)
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
    
    func handleTap(sender: UITapGestureRecognizer) {
        self.view.endEditing(true)
//        let touchPoint = sender.locationInView(self.view)
//        if touchPoint.x<datePicker.frame.origin.x || touchPoint.x>(datePicker.frame.origin.x + datePicker.frame.width){
//            datePicker.endEditing(true)
//            datePicker.hidden = true
//            pickerVisible = false
//        }
//        if touchPoint.y<datePicker.frame.origin.y || touchPoint.y>(datePicker.frame.origin.y + datePicker.frame.height){
//            datePicker.endEditing(true)
//            datePicker.hidden = true
//            pickerVisible = false
//        }
    }


    @IBAction func cancelClicked(sender: UIButton) {
        
        self.navigationController?.navigationBarHidden = false
        self.navigationController?.popViewControllerAnimated(true)
    }

    @IBAction func crossClick(sender: UIButton) {
        self.navigationController?.navigationBarHidden = false
        self.navigationController?.popViewControllerAnimated(true)
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
