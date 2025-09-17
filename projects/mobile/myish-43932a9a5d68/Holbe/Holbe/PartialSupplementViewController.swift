//
//  PartialSupplementViewController.swift
//  Holbe
//
//  Created by Nikhil Srivastava on 9/1/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

class PartialSupplementViewController: UIViewController, UITextFieldDelegate {
    
    @IBOutlet weak var viewB: UIView!
    @IBOutlet var navVW: UIView!
    @IBOutlet var partialType: UILabel!
    
    @IBOutlet var viewA: UIView!
       @IBOutlet var partialItem: UILabel!
    
    @IBOutlet var partialQuantityLabel: UILabel!
    
    @IBOutlet var quanitity: UITextField!
    
    @IBOutlet var navBar: UINavigationBar!
    let str = ["1","2","3","4","5","6","7","8","9","10"]
    
    var lifestyletype: String!
    var lifestyleItem: String!
    var lifestyleQuantity: String!
    var timings_id: String!
    var brandName: String = ""
    var itemName: String = ""
    var DosageQuantity: String = ""
    var amt:String = ""
    var criteria: String = ""
    var notes: String = ""
    var caps: String!
    var fetchSection:Int!
    var fetchRow:Int!
   

    @IBOutlet weak var capsuleLbl: UILabel!
    @IBOutlet weak var brandLbl: UILabel!
    @IBOutlet weak var itemLbl: UILabel!
    @IBOutlet weak var dosageLbl: UILabel!
    @IBOutlet weak var criteriaLbl: UILabel!
    @IBOutlet weak var notesLbl: UILabel!
    @IBOutlet weak var amountTf: UITextField!
    
    //var pickerVW: UIPickerView!
    
  
   
    @IBOutlet weak var editIcon1: UIButton!
  //  @IBOutlet weak var editIcon1: UIImageView!
    @IBOutlet var cancel: UIButton!
    @IBOutlet var submit: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.navigationBar.barTintColor = UIColor(red: 186, green: 214, blue: 93)
        self.navigationController?.title = "SUPPLEMENTS"
        self.navigationItem.leftBarButtonItem?.image = UIImage(named: "lifestyles")
        //self.navBar.tit
       // self.quanitity.delegate = self
        self.partialType.text = lifestyletype
        self.partialType.textColor = UIColor(red: 186, green: 214, blue: 93)
        self.partialType.font = UIFont.boldSystemFontOfSize(20.0)
      //  self.partialItem.text = lifestyleItem
       // self.partialQuantityLabel.text = lifestyleQuantity
        self.capsuleLbl.text = itemName
        self.brandLbl.text = brandName
        self.itemLbl.text = caps
        self.dosageLbl.text = DosageQuantity
        self.criteriaLbl.text = criteria
        self.notesLbl.text = notes
        self.amountTf.text = amt
        
       amountTf.delegate = self
        
        //pickerVW = UIPickerView()
        //pickerVW.delegate = self
       // pickerVW.dataSource = self
       // self.quanitity.inputView = pickerVW
        self.navigationController?.navigationBar.hidden = true
        // self.navBar.barTintColor = UIColor(red: 18, green: 178, blue: 230)
        // self.navBar.tintColor = UIColor.whiteColor()
        // Do any additional setup after loading the view.
        
        self.navVW.backgroundColor = UIColor(red: 186, green: 214, blue: 93)
        self.navigationController?.navigationBar.hidden = true
        self.navigationController?.prefersStatusBarHidden()
        
        
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(SignInViewController.dismissKeyboard))
        view.addGestureRecognizer(tap)
        
        if segueboolean == false
        {
            self.amountTf.userInteractionEnabled =  false
            self.submit.hidden = true
            self.cancel.hidden = true
            self.editIcon1.hidden = true
  
        }
        
        
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("keyboardWillShow:"), name:UIKeyboardWillShowNotification, object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("keyboardWillHide:"), name:UIKeyboardWillHideNotification, object: nil)
        
       
        
    }
    
    func editIcon1Tapped(img: AnyObject)
    {
        
    }
    
    func dismissKeyboard() {
        //Causes the view (or one of its embedded text fields) to resign the first responder status.
        view.endEditing(true)
    }
    
    func keyboardWillShow(sender: NSNotification) {
        
        //if keyboardFlag == false{
        //if flag == true{
          //  let info = sender.userInfo!
          //  let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()
        var frame1 = self.viewA.frame
        frame1.origin.y -= 150
        self.viewA.frame = frame1
        var frame = self.viewB.frame
            frame.origin.y -= 150
            self.viewB.frame = frame
        
         //   flag = false
       // }
    }
    
    func keyboardWillHide(sender: NSNotification) {
        //if flag == false{
        var frame1 = self.viewA.frame
        //let info = sender.userInfo!
        //let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()
        frame1.origin.y += 150
        self.viewA.frame = frame1
        var frame = self.viewB.frame
            //let info = sender.userInfo!
            //let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()
            frame.origin.y += 150
            self.viewB.frame = frame
        
       
            //flag = true
       // }
        
    }
    
    
    
    
    
    
    
    
    
    // Func to dismiss keyboard on pressing return key
    
    func textFieldShouldReturn(textField: UITextField) -> Bool {
        textField.endEditing(true)
        //self.navVW.frame.origin.y += 45
        self.navigationController?.navigationBarHidden = false
        return false
    }
    

    
    
    
    override func viewWillAppear(animated: Bool) {
        screen = false
        submit.layer.cornerRadius = 20
        submit.clipsToBounds = true
        submit.backgroundColor = UIColor(red: 186, green: 214, blue: 93)
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
    
    @IBAction func submitClicked(sender: UIButton) {
        
      //  if timings_id != "" && self.quanitity.text != ""{
        if timings_id != "" && self.capsuleLbl.text != ""{
           // let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/test/updatesupplementcompliance.php")!)
            //let request = NSMutableURLRequest(URL: NSURL(string: "http://www.holbe.com/api/patient/test/updatesupplementcompliance.php")!)
            let request = NSMutableURLRequest(URL: NSURL(string: baseURL + "patient/test/updatesupplementcompliance.php")!)
            request.HTTPMethod = "POST"
            let postString = "timings_id=\(timings_id)&amount=\(self.amountTf.text!)"
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
                print("responseString = \(responseString!)")
                //self.navigationController?.popViewControllerAnimated(true)
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
    
    @IBAction func cancelClicked(sender: UIButton) {
        self.navigationController?.navigationBarHidden = false
        self.navigationController?.popViewControllerAnimated(true)
        
    }
    
//    func numberOfComponentsInPickerView(pickerView: UIPickerView) -> Int {
//        return 1
//    }
    
//    func pickerView(pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
//        return 10
//    }
//    
//    
//    func pickerView(pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
//        
//        return str[row]
//    }
//    
//    func pickerView(pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
//        self.quanitity.text = str[row]
//        self.pickerVW.hidden = true
//        self.pickerVW.removeFromSuperview()
//    }
//    
    
    @IBAction func crossButton(sender: UIButton) {
        self.navigationController?.navigationBarHidden = false
        self.navigationController?.popViewControllerAnimated(true)
    }
    
//    func dismissKeyboard() {
//        //Causes the view (or one of its embedded text fields) to resign the first responder status.
//        view.endEditing(true)
//    }
//    
//    func textFieldShouldReturn(textField: UITextField) -> Bool {
//        self.view.endEditing(true)
//        return false
//    }

    @IBAction func editIconTapped(sender: AnyObject) {
        amountTf.becomeFirstResponder()
    }

}
