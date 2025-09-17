//
//  SettingsViewController.swift
//  Holbe
//
//  Created by Appsriv Technologies on 04/05/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit




class SettingsViewController: UIViewController,MenuTransitionManagerDelegate,UITableViewDelegate,UITableViewDataSource,UIImagePickerControllerDelegate,UINavigationControllerDelegate,UITextFieldDelegate,UIGestureRecognizerDelegate
    
{
    
    
    var set:[settingsData] = [settingsData]()
    var setObj = settingsData()
    
    var FirstName:String!
    var LastName:String!
    var PhoneNUmber:String!
    var address:String!
    var Id:String!
    var Email:String!
    var DOB:String!
    var keyboardFlag:Bool!
    var len:CGFloat!
    
    @IBOutlet var TapGestureRecognizer: UITapGestureRecognizer!
    
    @IBOutlet weak var datePicker: UIDatePicker!
    var today: NSDate!
     var pickerVisible = false
    
    
    
    var change:String!
    
    
    
    var imageSelected = false
    
    @IBOutlet weak var displayImage: UIImageView!
      var picker: UIImagePickerController!
    
    @IBOutlet var mainView: UIView!


    @IBOutlet weak var tableView: UITableView!
    let menuTransitionManager = MenuTransitionManager()
    
    var settingsArray = ["First Name","LastName","Phone","Email","Date of Birth","Address"]
    
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    
    var FirstName1:String!
    var LastName1:String!
    var PhoneNUmber1:String!
    var address1:String!
    var Id1:String!
    var Email1:String!
    var DOB1:String!
    
     var activityView = UIActivityIndicatorView(activityIndicatorStyle: .WhiteLarge)
    override func viewDidLoad() {
        
       
        
        self.DOB = userDOB
        
        TapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(SettingsViewController.handleTap(_:)))
        TapGestureRecognizer.delegate = self
        self.mainView.addGestureRecognizer(TapGestureRecognizer)
        
        keyboardFlag = false
        len = 0
        NSNotificationCenter.defaultCenter().addObserver(self, selector: #selector(SettingsViewController.keyboardWillShow(_:)), name:UIKeyboardWillShowNotification, object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("keyboardWillHide:"), name:UIKeyboardWillHideNotification, object: nil)
        
        // Used to scroll uitableview till the top
        self.tableView.contentInset =  UIEdgeInsetsMake(0, 0, 250, 0)
        self.tableView.tableFooterView = UIView()
       
        self.tableView.delegate = self
        self.tableView.dataSource = self
        activityIndicator.hidden = true
        
        if userProfilepicture != ""
        {
            
            if nsdata != nil{
            displayImage.image = UIImage(data:nsdata)
            }
        }
        else
        {
            displayImage.image = UIImage(named: "default")
        }
        
        
        
        let imageViewTapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(SettingsViewController.openCamera))
        self.displayImage.addGestureRecognizer(imageViewTapGestureRecognizer)
        self.displayImage.userInteractionEnabled = true
        
        
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(UIInputViewController.dismissKeyboard))
        view.addGestureRecognizer(tap)
        
        
        datePicker.hidden = true
        datePicker.backgroundColor = UIColor.whiteColor()
        datePicker.datePickerMode = UIDatePickerMode.Date
        datePicker.date = date
        today = date
        
        //datePicker.addTarget(self, action: #selector(SettingsViewController.datePickerChanged(_:)), forControlEvents: UIControlEvents.ValueChanged)
        
         NSNotificationCenter.defaultCenter().addObserver(self, selector: #selector(SettingsViewController.methodOfReceivedNotification1(_:)), name:"Completion1", object: nil)
         
        
        
       
        activityView.center = self.view.center
        activityView.startAnimating()
        self.tableView.addSubview(activityView)



    }
    
//    func gestureRecognizer(gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWithGestureRecognizer TapGestureRecognizer: UIGestureRecognizer) -> Bool {
//        return true
//    }

    
    
    func textFieldDidBeginEditing(textField: UITextField) {
        
      
        
        if textField.tag == 4
        {
            //if pickerVisible == false{
                // datePicker.minimumDate = date
                let datePickers = UIDatePicker()
                datePickers.backgroundColor = UIColor.whiteColor()
                datePickers.datePickerMode = UIDatePickerMode.Date
                datePickers.date = date
                datePickers.hidden = false
                datePickers.addTarget(self, action: #selector(SettingsViewController.datePickerChanged(_:)), forControlEvents: UIControlEvents.ValueChanged)
                pickerVisible = true
                //textField.resignFirstResponder()
                //datePicker.removeFromSuperview()
                textField.inputView = datePickers
           // }
            //else{
               // textField.inputView = UIKe
                //datePickers.hidden = true
              //  pickerVisible = false
            //}

        }
        else if keyboardFlag == false{
            len =  textField.frame.origin.y + textField.frame.size.height
        }
    }
    
    func textFieldDidEndEditing(textField: UITextField) {
        
        if textField.tag == 0
        {
            textField.autocorrectionType = .No
            self.FirstName = textField.text
            print(self.FirstName)
        }
        else if textField.tag == 1
        {
            textField.autocorrectionType = .No
            self.LastName = textField.text
            print(self.LastName)
        }
        else if textField.tag == 2
        {
            textField.keyboardType = UIKeyboardType.PhonePad
            self.PhoneNUmber = textField.text
            print(self.PhoneNUmber)
        }
        else if textField.tag == 3
        {
            textField.keyboardType = UIKeyboardType.EmailAddress
            self.Email = textField.text
            print(self.Email)
        }
        else if textField.tag == 4
        {
            //self.DOB = textField.text
            textField.inputView?.endEditing(true)
            self.tableView.reloadData()
            print(self.DOB)
        }
        else
        {
            self.address = textField.text
            print(self.address)
        }
     
        
    }
    func textFieldShouldReturn(textField: UITextField) -> Bool {
       
        if textField.tag != 4{
            self.view.endEditing(true)

        }
       //        if textField.tag == PasswordEdit.tag{
//            self.actInd.hidden = false
//            self.actInd.startAnimating()
//            self.loginClick()
//        }
        return false
    }
    
    func keyboardWillShow(sender: NSNotification) {
        
        //if keyboardFlag == false{
        let info = sender.userInfo!
        let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()
        
        
        if len+20 > (self.view.frame.size.height - keyboardFrame.size.height) && abs(self.view.frame.origin.y)+(self.view.frame.size.height-len-20) < keyboardFrame.size.height {
            //keyboardFlag = true
            self.view.frame.origin.y -=  max(len+50 - (self.view.frame.size.height - keyboardFrame.size.height),50)
        }
        
        // }
    }
    
    func keyboardWillHide(sender: NSNotification) {
        
        self.view.frame.origin.y -= self.view.frame.origin.y
        // keyboardFlag = false
        //        if keyboardFlag == true{
        //            let info = sender.userInfo!
        //            let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()
        //            keyboardFlag = false
        //
        //            self.view.frame.origin.y += len - (self.view.frame.size.height - keyboardFrame.size.height) + 10
        //            len = 0
        //            
        //        }
    }
    
    
    
    
    
    // Keyboard Dismiss
    
    func dismissKeyboard() {
        //Causes the view (or one of its embedded text fields) to resign the first responder status.
        view.endEditing(true)
    }
    
    
    
    
    // Camera Function to enable camera in the device
    
    func openCamera(){
        
        
        picker = UIImagePickerController()
        picker.delegate = self
        picker.allowsEditing = false
        
        
        
        let pickerTypeAlert = UIAlertController(title: "", message: "", preferredStyle: .ActionSheet)
        pickerTypeAlert.addAction(UIAlertAction(title: "Camera", style: .Default, handler: { (UIAlertAction) in
            self.picker.sourceType = .Camera
            self.picker.cameraDevice = .Front
            self.presentViewController(self.picker, animated: true, completion: nil)
        }))
        
        pickerTypeAlert.addAction(UIAlertAction(title: "Album", style: .Default, handler: { (UIAlertAction) in
            self.picker.sourceType = .PhotoLibrary
            self.presentViewController(self.picker, animated: true, completion: nil)
        }))
        
        pickerTypeAlert.addAction(UIAlertAction(title: "Cancel", style: .Destructive, handler: nil))
        
        
        self.presentViewController(pickerTypeAlert, animated: true, completion: nil)
        
        
        
    }
    
    //ImagePicker Delegate
    
    func imagePickerController(picker: UIImagePickerController, didFinishPickingImage image: UIImage, editingInfo: [String : AnyObject]?) {
        
       // self.displayImage.image = self.resizeImage(image)
        self.displayImage.image = imageResize(image, sizeChange: CGSize(width: 500, height: 500))
        self.displayImage.image = image
        imageSelected = true
        picker.dismissViewControllerAnimated(true, completion: nil)
        
        
    }
    
    
    func imagePickerControllerDidCancel(picker: UIImagePickerController) {
        picker.dismissViewControllerAnimated(true, completion: nil)
    }
    
    override func viewWillAppear(animated: Bool) {
        screen = true
        self.navigationController?.setNavigationBarHidden(false, animated: true)
         self.navigationController?.navigationItem.title = "Settings"
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), forBarMetrics: .Default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationController?.navigationBar.translucent = true
        self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName :UIColor.whiteColor()]
        self.navigationController?.navigationBar.tintColor = UIColor.whiteColor()
        self.navigationController?.navigationItem.hidesBackButton = true
        
        set.removeAll()
        SettingsRefreshCall( baseURL + "patient/getuserdetails.php?id=\(usrid!)")
        
        activityIndicator.hidden = true
        activityIndicator.stopAnimating()
    }
    
    
    func Dismiss() {
        dismissViewControllerAnimated(true, completion: nil)
        
    }
    
    
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 6
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let Cell =  tableView.dequeueReusableCellWithIdentifier("Cell",forIndexPath: indexPath) as! CustomCellSettings
        Cell.EditableTextfield.borderStyle = .None
        
        Cell.EditableTextfield.delegate = self
        
        
        if indexPath.row == 0
        {
            
            Cell.EditableTextfield.tag = indexPath.row
          //  Cell.EditableTextfield.text = userfirstName
            Cell.EditableTextfield.autocorrectionType = .No
            Cell.EditableTextfield.text = FirstName
            print(Cell.EditableTextfield.text)
            self.FirstName = Cell.EditableTextfield.text
        }
        else if indexPath.row == 1
        {
           Cell.EditableTextfield.tag = indexPath.row
           // Cell.EditableTextfield.text = userLastName
            Cell.EditableTextfield.autocorrectionType = .No
            Cell.EditableTextfield.text = LastName
            print(Cell.EditableTextfield.text)
            self.LastName = Cell.EditableTextfield.text
           
    
        }
        
        else if indexPath.row == 2
        {
            Cell.EditableTextfield.tag = indexPath.row
           // Cell.EditableTextfield.text = userPhoneNumber
            Cell.EditableTextfield.keyboardType = UIKeyboardType.NumberPad
            Cell.EditableTextfield.text = PhoneNUmber
            print(Cell.EditableTextfield.text)
            self.PhoneNUmber = Cell.EditableTextfield.text
          
  
        }
        else if indexPath.row == 3
        {
            Cell.EditableTextfield.tag = indexPath.row
         //   Cell.EditableTextfield.text = userEmailID
             Cell.EditableTextfield.text = Email
            Cell.EditableTextfield.userInteractionEnabled = false
            print(Cell.EditableTextfield.text )
            //self.Email = Cell.EditableTextfield.text
            
          
        }

        else if indexPath.row == 4
        {
          
            Cell.EditableTextfield.tag = indexPath.row
            Cell.EditableTextfield.text = self.DOB
            print(Cell.EditableTextfield.text)
            self.DOB = Cell.EditableTextfield.text
         
        }
        else if indexPath.row == 5
        {
           Cell.EditableTextfield.tag = indexPath.row
        //    Cell.EditableTextfield.text = useraddress
            Cell.EditableTextfield.text = address
            print(Cell.EditableTextfield.text)
            self.address = Cell.EditableTextfield.text
            
            
           
         
        }
        
        
        

       
        Cell.CellHeading.text = settingsArray[indexPath.row]
        return Cell
    }
    
    @IBAction func unWind(segue:UIStoryboardSegue){
        
        let sourceVC = segue.sourceViewController as! MenuViewcontroller
        let selectedItem = sourceVC.currentItem! as String
        dismissViewControllerAnimated(true, completion: nil)

        
        let vc =  self.storyboard?.instantiateViewControllerWithIdentifier(selectedItem)
        
        if !((self.navigationController!.viewControllers.last!.isKindOfClass(SettingsViewController)) && vc!.isKindOfClass(SettingsViewController))
        {
            if let vc = vc{
                self.navigationController?.pushViewController(vc, animated: true)
            }
        }
        
    }
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?)
    {
        if segue.identifier == "menuviewcontroller"
        {
            let menuTableViewController = segue.destinationViewController as! MenuViewcontroller
            menuTableViewController.transitioningDelegate = menuTransitionManager
            menuTransitionManager.delegate = self
            
            
        }
    }
    
    
    
    @IBAction func Save(sender: UIBarButtonItem)
        
    {
       // activityIndicator.hidden = false
       activityIndicator.startAnimating()
        
        self.activityView.startAnimating()
        
        self.view.endEditing(true)
        // Accessing custom cell attributes outside the cellforRowatindexPath method
        
//        var str: NSIndexPath!
//        var str1: NSIndexPath!
//        var str2: NSIndexPath!
//        var str3: NSIndexPath!
//        var str4: NSIndexPath!
//        var str5: NSIndexPath!
//        
//        str = NSIndexPath(forRow: 0, inSection: 0)
//        str1 = NSIndexPath(forRow: 1, inSection: 0)
//        str2 = NSIndexPath(forRow: 2, inSection: 0)
//        str3 = NSIndexPath(forRow: 3, inSection: 0)
//        str4 = NSIndexPath(forRow: 4, inSection: 0)
//        str5 = NSIndexPath(forRow: 5, inSection: 0)
     
        
//        if str == NSIndexPath(forRow: 0, inSection: 0)
//        {
//            print(str)
//            let cell = self.tableView.cellForRowAtIndexPath(str) as! CustomCellSettings
//            //self.FirstName =  cell.EditableTextfield.text!
//            self.FirstName1 = FirstName
//            print(self.FirstName)
//
//        }
//        if str1 == NSIndexPath(forRow: 1, inSection: 0)
//        {
//            print(str1)
//            let cell = self.tableView.cellForRowAtIndexPath(str1) as! CustomCellSettings
//            self.LastName = cell.EditableTextfield.text!
//             print(self.LastName)
//        }
//        if str2 == NSIndexPath(forRow: 2, inSection: 0)
//        {
//            print(str2)
//           
//            let cell = self.tableView.cellForRowAtIndexPath(str2) as! CustomCellSettings
//            self.PhoneNUmber = cell.EditableTextfield.text!
//             print(self.PhoneNUmber)
//        }
//        if str3 == NSIndexPath(forRow: 3, inSection: 0)
//        {
//            print(str3)
//           
//            let cell = self.tableView.cellForRowAtIndexPath(str3) as! CustomCellSettings
//            self.Email = cell.EditableTextfield.text!
//            print(self.Email)
//        }
//        if str4 == NSIndexPath(forRow: 4, inSection: 0)
//        {
//            print(str4)
//            let cell = self.tableView.cellForRowAtIndexPath(str4) as! CustomCellSettings
//            self.DOB = cell.EditableTextfield.text!
//            print(self.DOB)
//        }
//        
//        if str5 == NSIndexPath(forRow: 5, inSection: 0)
//        {
//            print(str5)
//            
//            let cell = self.tableView.cellForRowAtIndexPath(str5) as! CustomCellSettings
//            print(cell.EditableTextfield.text!)
//            self.address = cell.EditableTextfield.text!
//            print(self.address)
//        }
        
        
        
//        print(self.FirstName)
//        print(self.LastName)
//        print(self.PhoneNUmber)
//        print(self.address)
        
//        print(userfirstName)
//        print(userLastName)
//        print(userPhoneNumber)
//        print(useraddress)
//        
//       
//        print(self.FirstName)
//        print(self.LastName)
//        print(self.address)
//        //print(self.Id)
//        print(self.PhoneNUmber)
//        print(usrid)
       
      // UploadRequest("http://192.185.26.69/~holbe/api/patient/uploadprofilepic.php", completion: { (data) in
       // UploadRequest("http://www.holbe.com/api/patient/uploadprofilepic.php", completion: { (data) in
             UploadRequest(baseURL + "patient/uploadprofilepic.php", completion: { (data) in
            
            print(data)
            if data["file_path"] != ""{
                
           //     userProfilepicture = "http://" + data["file_path"].stringValue
                userProfilepicture = data["file_path"].stringValue
                print(userProfilepicture)
                //print(self.FirstName)
                print(data["file_path"].stringValue)
                print(self.FirstName!)
                print(self.LastName!)
                print(self.PhoneNUmber!)
                print(self.address!)
               // let path = "http://" + data["file_path"].stringValue
                let path = data["file_path"].stringValue
                //let path = data["file_path"].stringValue
                
                
                print(path)
               
                
//                self.Postdata(["fname":"\(self.FirstName)", "lname": "\(self.LastName)", "phone": "\(self.PhoneNUmber)", "address":"\(self.address)", "id": "\(usrid)", "pic":path, "dob": "\(self.DOB)"], url: "http://www.holbe.com/api/patient/updateuserdetails.php")
                
                
                
                
                 self.Postdata(["fname":"\(self.FirstName)", "lname": "\(self.LastName)", "phone": "\(self.PhoneNUmber)", "address":"\(self.address)", "id": "\(usrid)", "pic":path, "dob": "\(self.DOB)"], url: baseURL + "patient/updateuserdetails.php")
               
               // self.activityIndicator.stopAnimating()
               // self.activityIndicator.hidden = true
                
               
                
                
//                {
//                
//               // self.postRequest(.Save, params: ["fname":"\(self.FirstName)","lname":"\(self.LastName)","phone":"\(self.PhoneNUmber)","address":"\(self.address)","id": "\(usrid)","pic":data["file_path"].stringValue]) { (data) in
//                    
//                    print(data)
//                    if data["status"].intValue == 200
//                    {
//                        self.activityIndicator.hidden = true
//                        self.activityIndicator.stopAnimating()
//                        let alertController = UIAlertController(title: "Success", message: "Sign Up Successfull please check your mail to Validate ", preferredStyle: .Alert)
//                        
//                        let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
//                            print("you have pressed OK button");
//                            self.navigationController?.popViewControllerAnimated(true)
//                        }
//                        alertController.addAction(OKAction)
//                        
//                        self.presentViewController(alertController, animated: true, completion:nil)
//
//                    }
//                    else{
//                        let alertController = UIAlertController(title: "Failed", message: "Please try with a valid mail ID", preferredStyle: .Alert)
//                        
//                        let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
//                            print("you have pressed OK button");
//                        }
//                        alertController.addAction(OKAction)
//                        
//                        self.presentViewController(alertController, animated: true, completion:nil)
//                        
//                    }
//                    
//                }
            }
        })
        
//        self.activityIndicator.stopAnimating()
//        self.activityIndicator.hidden = true
    }


    func Postdata(params : Dictionary<String, String>, url : String) {
        
        
        
        let request = NSMutableURLRequest(URL: NSURL(string: url)!)
        
        let session = NSURLSession.sharedSession()
        
        request.HTTPMethod = "POST"
        
        request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalCacheData
        
        //let paramss = ["username":"jameson", "password":"password"] as Dictionary<String, String>
        
        
        
        //let err: NSError?
        
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
            self.activityIndicator.stopAnimating()
            self.activityIndicator.hidden = true
            userDOB = self.DOB
            
            
           // self.loadSocial(data, completion: self.didLoadLoginData)
            
            
            if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode == 200
            {
           
//                self.activityIndicator.stopAnimating()
//                self.activityIndicator.hidden = true
                
               
                
                
               
                self.self.successMessage()
              
                
            }
            
            else if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200
            {
                print("statusCode should be 200, but is \(httpStatus.statusCode)")
                print("response = \(response)")
                
               self.self.warning()
                
            }


           
            
        })
        
        
        
        task.resume()
        
    }
    
    
    
    //Post method function
    func postRequests(baseURL:BaseURL,params:Dictionary<String, AnyObject>,block:(data:JSON)->())
    
    {
        let url:NSURL = NSURL(string: baseURL.rawValue)!
        print(url)
        let session = NSURLSession.sharedSession()
        
        let request = NSMutableURLRequest(URL: url)
        
        
        request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringCacheData
        request.HTTPMethod = "POST"
        
        do{
            request.HTTPBody = try NSJSONSerialization.dataWithJSONObject(params, options: NSJSONWritingOptions.init(rawValue: 0))
            
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            
            request.setValue("application/json", forHTTPHeaderField: "Accept")
            
        }
        catch{
            print("Error writing JSON: ")
        }
        
        
        let task = session.dataTaskWithRequest(request) {
            (
            let data, let response, let error) in
            
            guard let _:NSData = data, let _:NSURLResponse = response  where error == nil else {
                print("error  No data")
                return
            }
            
            let json = JSON(data: data!)
            print(json)
            
            dispatch_async(dispatch_get_main_queue()){
                block(data: json)
            }
            
        }
        
        task.resume()
    }
    
    
    // Function to resize the image
    
    func resizeImage(image: UIImage) -> UIImage{
        
        var actualHeight: CGFloat = image.size.height
        var actualWidth: CGFloat = image.size.width
        let maxHeight: CGFloat = 500.0
        let maxWidth: CGFloat = 500.0
        var imgRatio: CGFloat = actualWidth/actualHeight
        let maxRatio: CGFloat = maxWidth/maxHeight
        let compressionQuality: CGFloat = 0.7 //70 percent quality (30% compression)
//        
//        if (actualHeight > maxHeight || actualWidth > maxWidth)
//        {
//            if(imgRatio < maxRatio)
//            {
//                //adjust width according to maxHeight
//                imgRatio = maxHeight / actualHeight
//                actualWidth = maxWidth
//                actualHeight = maxHeight
//            }
//            else if(imgRatio > maxRatio)
//            {
//                //adjust height according to maxWidth
//                imgRatio = maxWidth / actualWidth
//                actualHeight = imgRatio * actualHeight
//                actualWidth = maxWidth
//            }
//            else
//            {
//                actualHeight = maxHeight
//                actualWidth = maxWidth
//            }
//        }
        
        let rect: CGRect = CGRectMake(0.0, 0.0, actualWidth, actualHeight)
        UIGraphicsBeginImageContext(rect.size)
        image.drawInRect(rect)
        let img: UIImage = UIGraphicsGetImageFromCurrentImageContext()
        let imageData: NSData = UIImageJPEGRepresentation(img, compressionQuality)!
        UIGraphicsEndImageContext()
        
        return UIImage(data: imageData)!
        //return largeImage
    }

  
    
    
    @IBAction func OpenCamera(sender: UIButton)
    {
        self.openCamera()
    }
    
    
    // Image upload
    
    func UploadRequest(url:String,completion:(data:JSON)->())
    {
        let url = NSURL(string: url)
        print(url)
        
        let boundary = generateBoundaryString()
        
        let request = NSMutableURLRequest(URL: url!)
        request.HTTPMethod = "POST"
        
        let contentType = "multipart/form-data; boundary=\(boundary)"
        request.addValue(contentType, forHTTPHeaderField: "Content-Type")
        
        
        request.addValue("application/json", forHTTPHeaderField: "Accept")
       
        
     
        

        
        //define the multipart request type
        
         request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        
        if (self.displayImage.image == nil)
        {
            return
        }
        
        //let image_data = UIImagePNGRepresentation(displayImage.image!)
        let image_data = UIImageJPEGRepresentation(displayImage.image!, 0.3)
        
        
        if(image_data == nil)
        {
            return
        }
        
       
        let body = NSMutableData()
        
        let timestamp = NSDateFormatter.localizedStringFromDate(NSDate(), dateStyle: .ShortStyle, timeStyle: .ShortStyle)
        print(timestamp)
        let random = arc4random()
        print(random)
        
        print(self.FirstName)
        var fname = "\(self.FirstName)" + " " + "\(timestamp)" + " " + "\(random)"
        //  let fname = "\(self.FirstName)" + "\(random)"
         print(fname)
        
        
        fname = fname.stringByReplacingOccurrencesOfString(",", withString: "", options: NSStringCompareOptions.LiteralSearch, range: nil)
        fname = fname.stringByReplacingOccurrencesOfString(" ", withString: "", options: NSStringCompareOptions.LiteralSearch, range: nil)
        print(fname)
    //    let fname = "\(self.FirstName)" + "\(random)"
        //let mimetype = "image/png"
         let mimetype = "image/jpeg"
        
        //define the data post parameter
        
        body.appendData("--\(boundary)\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        body.appendData("Content-Disposition:form-data; name=\"test\"\r\n\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        body.appendData("hi\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        
        

        
        
        
        body.appendData("--\(boundary)\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
       body.appendData("Content-Disposition:form-data; name=\"filename\"; filename=\"\(fname)\"\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        body.appendData("Content-Type: mimetype\r\n\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        body.appendData(image_data!)
        body.appendData("\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        
        
        body.appendData("--\(boundary)--\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        
        
        
        request.HTTPBody = body
        
        
        
        let session = NSURLSession.sharedSession()
        
        
        let task = session.dataTaskWithRequest(request) {
            (
            let data, let response, let error) in
            
            guard let _:NSData = data, let _:NSURLResponse = response  where error == nil else {
                print("error")
                return
            }
            
            
            let json = JSON(data: data!)
            print(json)
            userProfileImage = self.displayImage.image
            nsdata = data
            completion(data: json)
            
        }
        
        task.resume()
        
        
    }
    
    func generateBoundaryString() -> String
    {
        return "Boundary-\(NSUUID().UUIDString)"
    }
    
    
    
    func datePickerChanged(datePicker:UIDatePicker) {
        
        let dateFormatter = NSDateFormatter()
       
        //self.datePicker.hidden = true
        //pickerVisible = false
        dateFormatter.dateStyle = NSDateFormatterStyle.ShortStyle
        //dateFormatter.timeStyle = NSDateFormatterStyle.ShortStyle
        var strDate = dateFormatter.stringFromDate(datePicker.date)
        //dateLabel.text = strDate
        //date = datePicker.date
        calendar = NSCalendar.currentCalendar()
        let components = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: datePicker.date)
        let year =  components.year
        let month = components.month
        let day = components.day
        let weekDay = components.weekday
        
        var c = NSDateComponents()
        c.year = 1900
        c.month = 1
        c.day = 1
        
        // Get NSDate given the above date components
        var minDate = NSCalendar(identifier: NSCalendarIdentifierGregorian)?.dateFromComponents(c)
        
        datePicker.maximumDate = today
        datePicker.minimumDate = minDate
        if year >= 1900
        {
            if today.compare(datePicker.date) == NSComparisonResult.OrderedDescending
            {
        
        self.DOB = "\(year)-\(month)-\(day)"
        print(self.DOB)
         datePicker.endEditing(true)
            }
            
            else
            {
                
                let alertController = UIAlertController(title: "Oops", message: "Choose right DOB.", preferredStyle: .Alert)
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
                    print("you have pressed OK button");
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
                
            }
        }
        //self.tableView.reloadData()
        
        else{
            
            
            let alertController = UIAlertController(title: "Oops", message: "Choose right year.", preferredStyle: .Alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
                print("you have pressed OK button");
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
        }
        
      
    }
    
    
    
    func handleTap(sender: UITapGestureRecognizer) {
        
//        let touchPoint = sender.locationInView(self.view)
//        if touchPoint.x<datePicker.frame.origin.x || touchPoint.x>(datePicker.frame.origin.x + datePicker.frame.width){
//            datePicker.endEditing(true)
//            //self.view.addSubview(datePicker)
//            datePicker.hidden = true
//            pickerVisible = false
//            self.tableView.reloadData()
//        }
//        if touchPoint.y<datePicker.frame.origin.y || touchPoint.y>(datePicker.frame.origin.y + datePicker.frame.height){
//            datePicker.endEditing(true)
//            //self.view.addSubview(datePicker)
//            datePicker.hidden = true
//            pickerVisible = false
//        }
    }
    
    
    func imageResize(imageObj:UIImage, sizeChange:CGSize)-> UIImage {
        
        let hasAlpha = false
        let scale: CGFloat = 0.0 // Automatically use scale factor of main screen
        
        UIGraphicsBeginImageContextWithOptions(sizeChange, !hasAlpha, scale)
        imageObj.drawInRect(CGRect(origin: CGPointZero, size: sizeChange))
        
        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext() // !!!
        return scaledImage
    }
    
    
    
    
    func SettingsRefreshCall(urlString:String)
    {
        let url = NSURL(string: urlString)
        print(url)
        
        let task = NSURLSession.sharedSession().dataTaskWithURL(url!) { (data,response,error) in
            
            if data != nil{
                dispatch_async(dispatch_get_main_queue(), {
                    
                    self.Extarctdata(data!)
                })
                
            }
        }
        task.resume()
        
    }
    
    
    func Extarctdata(data:NSData)
    {
        let json = JSON(data: data)
        print(json)
        
        
        
        for i in 0 ..< json.count
        {
//            setObj =  settingsData()
//            
//            setObj.firstName = json[i]["user_first_name"].stringValue
//            setObj.lastName = json[i]["user_last_name"].stringValue
//            setObj.emailId = json[i]["user_email_address"].stringValue
//            setObj.DOB = json[i]["user_dob"].stringValue
//            setObj.phoneNumber = json[i]["user_phone_no"].stringValue
//            setObj.gender = json[i]["user_gender"].stringValue
//            setObj.address = json[i]["user_address"].stringValue
//            
//            set.append(setObj)
            
            
            
            
            FirstName = json[i]["user_first_name"].stringValue
            LastName = json[i]["user_last_name"].stringValue
            Email = json[i]["user_email_address"].stringValue
            DOB = json[i]["user_dob"].stringValue
            PhoneNUmber = json[i]["user_phone_no"].stringValue
            address = json[i]["user_address"].stringValue
            
            
        }
        
        
        self.tableView.reloadData()
        
        
        
    }
    
    
    
    func successMessage(){
        
      //  self.activityIndicator.stopAnimating()
      //  self.activityIndicator.hidden = true
      //  NSNotificationCenter.defaultCenter().postNotificationName("Completion1", object: nil)
        
        let alertController = UIAlertController(title: "Success", message: "Your details have been successfully updated.", preferredStyle: .Alert)
        
        let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
            print("you have pressed OK button");
           // self.activityIndicator.stopAnimating()
           // self.activityIndicator.hidden = true
            self.activityView.stopAnimating()
            self.activityView.removeFromSuperview()
            NSNotificationCenter.defaultCenter().postNotificationName("Completion1", object: nil)
       //     NSNotificationCenter.defaultCenter().postNotificationName("Completion2", object: nil)
            
         
            self.performSegueWithIdentifier( "showDaily", sender: self)
            
        }
        alertController.addAction(OKAction)
        
        self.presentViewController(alertController, animated: true, completion:nil)
    }
    
 




    func warning(){
        
        let alertController = UIAlertController(title: "Failed", message: "Your details could not update, Try again.", preferredStyle: .Alert)
        
        let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
            print("you have pressed OK button");
            //self.activityIndicator.stopAnimating()
            //self.activityIndicator.hidden = true
            
            self.performSegueWithIdentifier( "showDaily", sender: self)
        }
        alertController.addAction(OKAction)
        
        self.presentViewController(alertController, animated: true, completion:nil)
    }
    
    
    func methodOfReceivedNotification1(notification: NSNotification){
        self.activityIndicator.stopAnimating()
        self.activityIndicator.hidden = true
    }
    


    
}









































