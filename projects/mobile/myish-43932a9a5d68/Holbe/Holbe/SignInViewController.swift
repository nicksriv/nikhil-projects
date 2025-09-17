//
//  SignInViewController.swift
//  Holbe
//
//  Created by Appsriv Technologies on 20/04/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

var profileImage:UIImage!


class SignInViewController: UIViewController,UITextFieldDelegate,UIImagePickerControllerDelegate,UINavigationControllerDelegate
{

    @IBOutlet var MainView: UIView!
    @IBOutlet weak var FirstName: UITextField!
    @IBOutlet weak var UserEmailID: UITextField!
    @IBOutlet weak var LastName: UITextField!
    @IBOutlet weak var UserPassword: UITextField!
    
    var UsermailiD:String!
    var Userpassword:String!
    var fstName:String!
    var lstName:String!
    var imageSelected = false
    
    var picker: UIImagePickerController!
    
    @IBOutlet weak var imgProfilePic: UIImageView!
    
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
 
    
    override func viewDidLoad()
    {
        super.viewDidLoad()
        activityIndicator.hidden = true
        
        // Textfiled delegate
        UserEmailID.delegate = self
        UserPassword.delegate = self
        
        FirstName.autocorrectionType = .No
        LastName.autocorrectionType = .No
        UserEmailID.autocorrectionType = .No
        UserEmailID.keyboardType = UIKeyboardType.EmailAddress

        
        
        // Giving Border style to all Textfields
        
        self.FirstName.layer.addBorder(.Bottom, color: UIColor.lightGrayColor(), thickness: 1)
        self.UserEmailID.layer.addBorder(.Bottom, color: UIColor.lightGrayColor(), thickness: 1)
        self.LastName.layer.addBorder(.Bottom, color: UIColor.lightGrayColor(), thickness: 1)
        self.UserPassword.layer.addBorder(.Bottom, color: UIColor.lightGrayColor(), thickness: 1)
        
        self.FirstName.attributedPlaceholder = NSAttributedString(string:"FIRST NAME",attributes:[NSForegroundColorAttributeName: UIColor.whiteColor()])
        self.LastName.attributedPlaceholder = NSAttributedString(string:"LAST NAME",attributes:[NSForegroundColorAttributeName: UIColor.whiteColor()])
        self.UserEmailID.attributedPlaceholder = NSAttributedString(string:"EMAIL",attributes:[NSForegroundColorAttributeName: UIColor.whiteColor()])
        self.UserPassword.attributedPlaceholder = NSAttributedString(string:"PASSWORD",attributes:[NSForegroundColorAttributeName: UIColor.whiteColor()])
        
        
        
        
        // Do any additional setup after loading the view.
        
        //Tap guesture recognizer to hide keyboard 
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(SignInViewController.dismissKeyboard))
        view.addGestureRecognizer(tap)
     
        let imageViewTapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(SignInViewController.openCamera))
        self.imgProfilePic.addGestureRecognizer(imageViewTapGestureRecognizer)
        self.imgProfilePic.userInteractionEnabled = true
        
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("keyboardWillShow:"), name:UIKeyboardWillShowNotification, object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("keyboardWillHide:"), name:UIKeyboardWillHideNotification, object: nil)

    }
    
    
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

          //  self.imgProfilePic.image = self.resizeImage(image)
            self.imgProfilePic.image = imageResize(image, sizeChange: CGSize(width: 500, height: 500))
            imageSelected = true
            picker.dismissViewControllerAnimated(true, completion: nil)
       
       
    
    }
    

    
    func imagePickerControllerDidCancel(picker: UIImagePickerController) {
        picker.dismissViewControllerAnimated(true, completion: nil)
    }
    
    
    
    
    // Function to hide keyboard
    
    func dismissKeyboard() {
        //Causes the view (or one of its embedded text fields) to resign the first responder status.
        view.endEditing(true)
    }
    
    func keyboardWillShow(notification: NSNotification) {
        
        if let keyboardSize = (notification.userInfo?[UIKeyboardFrameBeginUserInfoKey] as? NSValue)?.CGRectValue() {
            if view.frame.origin.y == 0{
                //self.view.frame.origin.y -= keyboardSize.height
                self.view.frame.origin.y -= 45
                self.navigationController?.navigationBarHidden = true
                
            }
            else {
                
            }
        }
        
    }
    
    func keyboardWillHide(notification: NSNotification) {
        if let keyboardSize = (notification.userInfo?[UIKeyboardFrameBeginUserInfoKey] as? NSValue)?.CGRectValue() {
            if view.frame.origin.y != 0 {
                //self.view.frame.origin.y += keyboardSize.height
                self.view.frame.origin.y += 45
                self.navigationController?.navigationBarHidden = false
            }
            else {
                
            }
        }
    }
    
    
    
    

 

    
    
    // Func to dismiss keyboard on pressing return key
    
    func textFieldShouldReturn(textField: UITextField) -> Bool {
         self.view.endEditing(true)
        self.view.frame.origin.y += 45
        self.navigationController?.navigationBarHidden = false
        return false
    }
    
    
    override func viewWillAppear(animated: Bool) {
        screen = true
        
        let tracker = GAI.sharedInstance().defaultTracker
        
        let eventTracker: NSObject = GAIDictionaryBuilder.createEventWithCategory(
            "ui_action",
            action: "Sign Up Pressed",
            label: "Sign Up Screen",
            value: nil).build()
        tracker.send(eventTracker as! [NSObject : AnyObject])
        
        self.navigationController?.setNavigationBarHidden(false, animated: true)
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), forBarMetrics: .Default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationController?.navigationBar.translucent = true
        self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName :UIColor.whiteColor()]
        self.navigationController?.navigationBar.tintColor = UIColor.whiteColor()
       
    }

    override func didReceiveMemoryWarning()
    {
        super.didReceiveMemoryWarning()
        
    }
    
    
    //Post method function
    func postRequest(baseURL:BaseURL,params:Dictionary<String, AnyObject>,block:(data:JSON)->()){
        
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
            
            dispatch_async(dispatch_get_main_queue()){
                block(data: json)
            }
            
        }
        
        task.resume()
        
    }
    

 
    
    // Sign UP API call
    @IBAction func SignUP(sender: UIButton)
        
    {
        self.MainView.userInteractionEnabled = false
        activityIndicator.hidden = false
        activityIndicator.startAnimating()
        print(UserEmailID.text)
        print(UserPassword.text)
        

        if UserEmailID.text != "" && UserPassword.text != "" && FirstName.text != "" && LastName.text != ""
        {
            UsermailiD = UserEmailID.text
            Userpassword = UserPassword.text
            fstName = FirstName.text
            lstName = LastName.text
            
            print(UsermailiD)
            print(Userpassword)
            print(fstName)
            print(lstName)
        
        let checkBool = isValidEmail(UserEmailID.text!)
            if checkBool == true
            {
            
                guard imageSelected == true else {
                    
                    let alertController = UIAlertController(title: "Profile picture", message: "Please select a profile picture to continue", preferredStyle: .Alert)
                    
                    let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
        
                    }
                    alertController.addAction(OKAction)
                    
                    self.presentViewController(alertController, animated: true, completion:nil)
                    self.activityIndicator.hidden = true
                    self.MainView.userInteractionEnabled = true
                    self.imgProfilePic.userInteractionEnabled = true
                    return
                }
                
           
                
        
               
             // UploadRequest("http://192.185.26.69/~holbe/api/patient/uploadprofilepic.php", completion: { (data) in
                    
                // UploadRequest("http://www.holbe.com/api/patient/uploadprofilepic.php", completion: { (data) in
                    UploadRequest(baseURL + "patient/uploadprofilepic.php", completion: { (data) in
                    
                    print(data)
                    if data["file_path"] != ""{
                        print(data["file_path"].stringValue)
                 //   let path = "http://" + data["file_path"].stringValue
                        let path = data["file_path"].stringValue
                    
                    self.postRequest(.createUser, params: ["user_email_address":"\(self.UserEmailID.text!)","password":"\(self.UserPassword.text!)","first_name":self.FirstName.text!,"last_name":self.LastName.text!,"profilepic":path]) { (data) in
                        
                                    print(data)
                                    if data["status"].intValue == 200
                                    {
                                        let alertController = UIAlertController(title: "Success", message: "Sign Up Successfull Please Check Mail to Validate", preferredStyle: .Alert)
                        
                                        let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
                                            print("you have pressed OK button");
                                            self.navigationController?.popViewControllerAnimated(true)
                                            
                                            let pageController = self.storyboard!.instantiateViewControllerWithIdentifier("pageViewController") as! UIPageViewController
                                            self.navigationController?.pushViewController(pageController , animated: true)
                                            
                                            
                                        }
                                        alertController.addAction(OKAction)
                                        self.presentViewController(alertController, animated: true, completion:nil)
                                        
                                        NSUserDefaults.standardUserDefaults().setValue(userEmailID, forKey: "username")
                                        NSUserDefaults.standardUserDefaults().setValue(self.UserPassword.text!, forKey: "password")
                                        NSUserDefaults.standardUserDefaults().setValue(true, forKey: "hasLoginKey")
                                        
                                        self.activityIndicator.stopAnimating()
                                        self.activityIndicator.hidden = true
                                        self.MainView.userInteractionEnabled = true
                                        
                                        
                                        
                                    }
                        else if data["status"].intValue == 0
                        {
                            let alertController = UIAlertController(title: "Failed", message: "A user with same email already exists", preferredStyle: .Alert)
                            
                            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
                                print("you have pressed OK button");
                                
                            }
                            alertController.addAction(OKAction)
                            self.presentViewController(alertController, animated: true, completion:nil)
                            self.activityIndicator.stopAnimating()
                            self.activityIndicator.hidden = true
                            self.MainView.userInteractionEnabled = true
                        }
                            
                                    else{
                                        let alertController = UIAlertController(title: "Failed", message: "Please try with a valid mail ID", preferredStyle: .Alert)
                        
                                        let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
                                            print("you have pressed OK button");
                                        }
                                        alertController.addAction(OKAction)
                                        
                                        self.presentViewController(alertController, animated: true, completion:nil)
                                        self.activityIndicator.stopAnimating()
                                        self.activityIndicator.hidden = true
                                        self.MainView.userInteractionEnabled = true
                        
                                    }
                                    
                                }
                    }
                })
        

            }
            
            else{
                let alertController = UIAlertController(title: "Alert", message: "Please Enter valid Credentials", preferredStyle: .Alert)
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
                    print("you have pressed OK button");
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
                self.activityIndicator.stopAnimating()
                activityIndicator.hidden = true
                self.MainView.userInteractionEnabled = true
                
                
            }
        }
        else{
            let alertController = UIAlertController(title: "Alert", message: "Please Enter valid Credentials", preferredStyle: .Alert)
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction!) in
                print("you have pressed OK button");
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
            self.activityIndicator.stopAnimating()
            activityIndicator.hidden = true
            self.MainView.userInteractionEnabled = true
         

        }

    }
    
        
    
    // Function to validate email ID
    func isValidEmail(testStr:String) -> Bool {
        // println("validate calendar: \(testStr)")
        let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
        
        let emailTest = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        return emailTest.evaluateWithObject(testStr)
    }
    
    
    
    
    // Image upload
    func UploadRequest(url:String,completion:(data:JSON)->())
    {
        let url = NSURL(string: url)
        print(url)
        
        let request = NSMutableURLRequest(URL: url!)
        request.HTTPMethod = "POST"
        
        let boundary = generateBoundaryString()
        let contentType = "multipart/form-data; boundary=\(boundary)"
        request.addValue(contentType, forHTTPHeaderField: "Content-Type")
        
        
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        //define the multipart request type
        
        request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        
        if (self.imgProfilePic.image == nil)
        {
            return
        }
        
       // let orientationFixedImage = cameraImage.fixOrientation()
       // var image_data = UIImagePNGRepresentation(imgProfilePic.image!)
        var image_data = UIImageJPEGRepresentation(imgProfilePic.image!, 0.3)
        
      

        
        
        if(image_data == nil)
        {
            return
        }
        
        
        let body = NSMutableData()
        
        let timestamp = NSDateFormatter.localizedStringFromDate(NSDate(), dateStyle: .ShortStyle, timeStyle: .ShortStyle)
        print(timestamp)
        let random = arc4random()
        print(random)

        var fname = "\(self.fstName)" + " " + "\(timestamp)" + " " + "\(random)"
        let mimetype = "image/jpeg"
        
        fname = fname.stringByReplacingOccurrencesOfString(",", withString: "", options: NSStringCompareOptions.LiteralSearch, range: nil)
        fname = fname.stringByReplacingOccurrencesOfString(" ", withString: "", options: NSStringCompareOptions.LiteralSearch, range: nil)
        
        //define the data post parameter
        
        body.appendData("--\(boundary)\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        body.appendData("Content-Disposition:form-data; name=\"test\"\r\n\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        body.appendData("hi\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        
        
        
        body.appendData("--\(boundary)\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        body.appendData("Content-Disposition:form-data; name=\"filename\"; filename=\"\(fname)\"\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        body.appendData("Content-Type: \(mimetype)\r\n\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
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
            completion(data: json)
            
        }
        
        task.resume()
        
        
    }
    
    
    func generateBoundaryString() -> String
    {
        return "Boundary-\(NSUUID().UUIDString)"
    }
    
    func resizeImage(image: UIImage) -> UIImage{
    
    var actualHeight: CGFloat = image.size.height
    var actualWidth: CGFloat = image.size.width
    let maxHeight: CGFloat = 500.0
    let maxWidth: CGFloat = 500.0
    var imgRatio: CGFloat = actualWidth/actualHeight
    let maxRatio: CGFloat = maxWidth/maxHeight
    let compressionQuality: CGFloat = 0.7 //70 percent quality (30% compression)
    
//    if (actualHeight > maxHeight || actualWidth > maxWidth)
//    {
//    if(imgRatio < maxRatio)
//    {
//    //adjust width according to maxHeight
//    imgRatio = maxHeight / actualHeight
//    actualWidth = maxWidth
//    actualHeight = maxHeight
//    }
//    else if(imgRatio > maxRatio)
//    {
//    //adjust height according to maxWidth
//    imgRatio = maxWidth / actualWidth
//    actualHeight = imgRatio * actualHeight
//    actualWidth = maxWidth
//    }
//    else
//    {
//    actualHeight = maxHeight
//    actualWidth = maxWidth
//    }
//    }
    
    let rect: CGRect = CGRectMake(0.0, 0.0, actualWidth, actualHeight)
    UIGraphicsBeginImageContext(rect.size)
    image.drawInRect(rect)
    let img: UIImage = UIGraphicsGetImageFromCurrentImageContext()
    let imageData: NSData = UIImageJPEGRepresentation(img, compressionQuality)!
    UIGraphicsEndImageContext()
    
    return UIImage(data: imageData)!
    //return largeImage
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

}


    




































