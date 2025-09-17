//
//  PartialOthersViewController.swift
//  Holbe
//
//  Created by Nikhil Srivastava on 8/1/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

class PartialOthersViewController: UIViewController, UITextFieldDelegate, UIPickerViewDelegate, UIPickerViewDataSource {

    @IBOutlet var navVW: UIView!
    @IBOutlet var partialType: UILabel!
    
    @IBOutlet weak var editIcon: UIImageView!
    @IBOutlet var partialItem: UILabel!
    
    @IBOutlet var partialQuantityLabel: UILabel!
    
    @IBOutlet var quanitity: UITextField!
    
    @IBOutlet var navBar: UINavigationBar!
    let str = ["1","2","3","4","5","6","7","8","9","10"]
    
    var lifestyletype: String!
    var lifestyleItem: String!
    var lifestyleQuantity: String!
    var timings_id: String!
    var pickerVW: UIPickerView!
    
    @IBOutlet var cancel: UIButton!
    @IBOutlet var submit: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.navigationBar.barTintColor = UIColor(red: 205, green: 75, blue: 113)
        self.navigationController?.title = "OTHERS"
        self.navigationItem.leftBarButtonItem?.image = UIImage(named: "lifestyles")
        //self.navBar.tit
        self.quanitity.delegate = self
        self.partialType.text = lifestyletype
        self.partialType.textColor = UIColor(red: 205, green: 75, blue: 113)
        self.partialType.font = UIFont.boldSystemFontOfSize(20.0)
        self.partialItem.text = lifestyleItem
        self.partialQuantityLabel.text = lifestyleQuantity
        
        pickerVW = UIPickerView()
        pickerVW.delegate = self
        pickerVW.dataSource = self
        self.quanitity.inputView = pickerVW
        self.navigationController?.navigationBar.hidden = true
       // self.navBar.barTintColor = UIColor(red: 18, green: 178, blue: 230)
       // self.navBar.tintColor = UIColor.whiteColor()
        // Do any additional setup after loading the view.
        
        self.navVW.backgroundColor = UIColor(red: 205, green: 75, blue: 113)
        self.navigationController?.navigationBar.hidden = true
        self.navigationController?.prefersStatusBarHidden()
        
        if segueboolean == false
        {
            self.quanitity.userInteractionEnabled =  false
            self.submit.hidden = true
            self.cancel.hidden = true
            self.editIcon.hidden = true
        }
    }
    
    override func viewWillAppear(animated: Bool) {
        screen = false
        submit.layer.cornerRadius = 20
        submit.clipsToBounds = true
        submit.backgroundColor = UIColor(red: 205, green: 75, blue: 113)
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
        
        if timings_id != "" && self.quanitity.text != ""{
       // let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/test/updateotherscompliance.php")!)
        //let request = NSMutableURLRequest(URL: NSURL(string: "http://www.holbe.com/api/patient/test/updateotherscompliance.php")!)
        let request = NSMutableURLRequest(URL: NSURL(string: baseURL + "patient/test/updateotherscompliance.php")!)
        request.HTTPMethod = "POST"
        let postString = "timings_id=\(timings_id)&completion=\(self.quanitity.text!)"
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

    func numberOfComponentsInPickerView(pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return 10
    }

    
    func pickerView(pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        
        return str[row]
    }
    
    func pickerView(pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        self.quanitity.text = str[row]
        self.pickerVW.hidden = true
        self.pickerVW.removeFromSuperview()
    }

    
    @IBAction func crossButton(sender: UIButton) {
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
