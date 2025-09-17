//
//  CameraViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 9/21/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import UIKit
import AVFoundation
import Photos
import CoreLocation
//import ImageCropView




class CameraViewController:UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate, UITextViewDelegate,ImageCropViewControllerDelegate,CLLocationManagerDelegate{

    @IBOutlet var postButton: UIButton!
    @IBOutlet weak var previewView: UIView!
    var myImageView: UIImageView!
    var images:NSMutableArray!
    var path: String!
    var latitude: CLLocationDegrees!
    var longitude: CLLocationDegrees!
    var locManager = CLLocationManager()
    
    @IBOutlet weak var foofashion: UISegmentedControl!
    //@IBOutlet weak var ImgButton: UIButton!
    
    @IBOutlet weak var imgView: UIImageView!

    @IBOutlet var caption: UITextView!
    
    //@IBOutlet var pickerView: UIPickerView!
    
    @IBOutlet var actInd: UIActivityIndicatorView!
    var picker: UIImagePickerController!
    //var pickerDataSource: [String]!
    var profileApi: ProfileApi!
    var profile: ProfileData!
    var category: String!
    var imageCaption : String!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let colors = Colors()
        self.view.backgroundColor = UIColor.clearColor()
        let backgroundLayer = colors.gl
        backgroundLayer.frame = self.view.frame
        self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
        self.profileApi = ProfileApi()
        //self.profile = ProfileData()
        //var csize = CGSize(width: self.postButton.frame.size.width - 10, height: self.postButton.frame.size.height)
        //let img = self.imageResize(UIImage(named: "Send post button")!, sizeChange: csize)
        //self.postButton.setImage(img, forState: UIControlState.Normal)
        
        self.ProfileReload("http://myish.com:\(port)/api/finduser?userid=\(userProfileID)")
        //pickerDataSource = [String]()
        //pickerDataSource.append("Food")
        //pickerDataSource.append("Fashion")
        //let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: "dismissAlert")
        //view.addGestureRecognizer(tap)
        //caption.returnKeyType =  UIReturnKeyType.Done
//        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("keyboardWillShow:"), name:UIKeyboardWillShowNotification, object: nil)
//        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("keyboardWillHide:"), name:UIKeyboardWillHideNotification, object: nil)

        //self.pickerView.dataSource = self
        //self.pickerView.delegate = self
        //self.pickerView.tintColor = UIColor.darkGrayColor()
        let kbToolBar = UIToolbar(frame: CGRect.zero)
        kbToolBar.barStyle = UIBarStyle.BlackTranslucent
        kbToolBar.translucent = true
        kbToolBar.userInteractionEnabled = true
        kbToolBar.sizeToFit()
        let btnKBFlexibleSpace = UIBarButtonItem(barButtonSystemItem: UIBarButtonSystemItem.FlexibleSpace, target: nil, action: nil)
        //var btnKBDone = UIBarButtonItem(title: "Done", style: UIBarButtonItemStyle.Done , target: self, action: KBToolBarButtonDoneHandler)
        let btnKBDone = UIBarButtonItem(barButtonSystemItem: UIBarButtonSystemItem.Done, target: self, action: "KBToolBarButtonDoneHandler:")
        let btnKBItems: [UIBarButtonItem] = [btnKBFlexibleSpace, btnKBDone]
        kbToolBar.setItems(btnKBItems, animated: true)
        self.caption.delegate = self
        self.caption.inputAccessoryView = kbToolBar
        
        //self.caption.layer.cornerRadius = 10.0
        self.caption.clipsToBounds = true
        //self.pickerView.layer.cornerRadius = 10.0
        //self.pickerView.clipsToBounds = true
        self.postButton.layer.cornerRadius = 10.0
        self.postButton.clipsToBounds = true
        
        self.foofashion.backgroundColor = UIColor.clearColor()
        self.foofashion.tintColor = UIColor.whiteColor()
        //self.foofashion.layer.cornerRadius = 10.0
        //self.foofashion.clipsToBounds = true
        
        //self.doRefresh()
        
        
        locManager.delegate = self
        //locManager.requestWhenInUseAuthorization()
        if #available(iOS 9.0, *) {
            locManager.requestWhenInUseAuthorization()
        } else {
            locManager.requestWhenInUseAuthorization()
        }
        locManager.startUpdatingLocation()
        if locManager.location != nil{
            latitude = locManager.location?.coordinate.latitude
            longitude = locManager.location?.coordinate.longitude
        }
        
    
    }
    
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        self.cancelButton.titleLabel?.text = "Cancel"
        doRefresh()
        
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "SendPost Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
    }
    
    func textViewDidBeginEditing(textView: UITextView) {
        caption.text = ""
    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)
        

    }
    
    //func dismissAlert() {
        //Causes the view (or one of its embedded text fields) to resign the first responder status.
     //   view.resignFirstResponder()
    //}
    
    func ProfileReload(url: String){
        
        self.profileApi.loadProfile(url, completion: didLoadProfile)
        
    }
    
    func didLoadProfile(profile: ProfileData){
        
        
        self.profile = profile
    }
    
    func KBToolBarButtonDoneHandler(sender: UIBarButtonItem){
        caption.resignFirstResponder()
    }
    
//    func ImageCropViewControllerSuccess(controller: UIViewController, didFinishCroppingImage croppedImage: UIImage!) {
//        self.imgView.image = croppedImage
//        self.imgView.layer.cornerRadius = 10.0
//        self.imgView.clipsToBounds = true
//        self.picker.popToRootViewControllerAnimated(true)
//    }
//    
//    func cropImage(image: UIImage){
//        let controller: ImageCropViewController = ImageCropViewController(image: image)
//        controller.delegate = self
//        self.picker.pushViewController(controller, animated: true)
//    }
//    
//    func ImageCropViewControllerDidCancel(controller:  UIViewController){
//       
//        self.picker.popToRootViewControllerAnimated(true)
//    }
    
    func imagePickerController(picker: UIImagePickerController, let didFinishPickingImage image: UIImage!, editingInfo: [NSObject : AnyObject]!) {
        //let image1 = getSquareImage(image)
        //image1.setValue(0.5, forKey: "scale")
        
//        let scrollview = UIScrollView()
//        scrollview.alwaysBounceVertical = false
//        scrollview.alwaysBounceHorizontal = false
//        scrollview.showsVerticalScrollIndicator = true
//        scrollview.flashScrollIndicators()
        
        let data = UIImageJPEGRepresentation(image, 1)
        print(image.size)
        
        let imageCropper = ImageCropViewController(image: image)
        imageCropper.delegate = self
        imageCropper.blurredBackground = true
        //imageCropper.cropArea = CGRectMake(0, 0,1024, 1024)
        //let currentTransform = imageCropper.cropView.imageview.transform
        //print(imageCropper.cropView)
       //imageCropper.cropView.imageview.transform = CGAffineTransformScale(currentTransform,2,2)
        
        self.picker.setNavigationBarHidden(false, animated: true)
        self.picker.pushViewController(imageCropper, animated: true)
    
        
    }
    
    func ImageCropViewControllerSuccess(controller: UIViewController!, didFinishCroppingImage croppedImage: UIImage!) {
        
        let data = UIImageJPEGRepresentation(croppedImage, 1)
        print(croppedImage.size)
//
        let compressedImage = resizeImage(getSquareImage(croppedImage))
        
        let data2 = UIImageJPEGRepresentation(compressedImage, 1)
        print(compressedImage.size)
//
        let image = getSquareImage(compressedImage)
        
        self.imgView.image = image
        self.imgView.clipsToBounds = true
        picker.dismissViewControllerAnimated(true, completion: nil)
    }
    
    func ImageCropViewControllerDidCancel(controller: UIViewController!) {
       self.picker.popViewControllerAnimated(true)
    }
//    func cropimage(image: UIImage) -> UIImage{
//        
//        let squareLength: CGFloat = min(image.size.width, image.size.height)
//        // Center the crop area
//        let clippedRect: CGRect = CGRectMake((image.size.width - squareLength) / 2, (image.size.height - squareLength) / 2, squareLength, squareLength)
//        // Crop logic
//        let imageRef: CGImageRef = CGImageCreateWithImageInRect(image.CGImage, clippedRect)!
//        let croppedImage: UIImage = UIImage(CGImage: imageRef)
//        //CGImageRelease(imageRef)
//
//        return croppedImage
//    }
    
    func imagePickerControllerDidCancel(picker: UIImagePickerController) {
        picker.dismissViewControllerAnimated(true, completion: nil)
        self.tabBarController?.selectedIndex = 0
    }
    
    @IBAction func didPressTakePhoto(sender: UIButton) {

    }
    
    func getSquareImage(image:UIImage)->UIImage{
        
        let imageSize = image.size;
        let width = imageSize.width;
        let height = imageSize.height;
        if (width != height) {
            let newDimension = min(width, height);
            let widthOffset = (width - newDimension) / 2;
            let heightOffset = (height - newDimension) / 2;
            UIGraphicsBeginImageContextWithOptions(CGSizeMake(newDimension, newDimension), false, 0)
            
            image.drawAtPoint(CGPointMake(-widthOffset, -heightOffset),
                blendMode:.Copy,
                alpha:1)
            return  UIGraphicsGetImageFromCurrentImageContext();
            UIGraphicsEndImageContext();
        }
        else{
            return image
        }
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
    
    func resizeImage(image: UIImage) -> UIImage{
        
        var actualHeight: CGFloat = image.size.height
        var actualWidth: CGFloat = image.size.width
        let maxHeight: CGFloat = 632.0
        let maxWidth: CGFloat = 700.0
        var imgRatio: CGFloat = actualWidth/actualHeight
        let maxRatio: CGFloat = maxWidth/maxHeight
        let compressionQuality: CGFloat = 0.7 //70 percent quality (30% compression)
        
        if (actualHeight > maxHeight || actualWidth > maxWidth)
        {
            if(imgRatio < maxRatio)
            {
                //adjust width according to maxHeight
                imgRatio = maxHeight / actualHeight
                actualWidth = imgRatio * actualWidth
                actualHeight = maxHeight
            }
            else if(imgRatio > maxRatio)
            {
                //adjust height according to maxWidth
                imgRatio = maxWidth / actualWidth
                actualHeight = imgRatio * actualHeight
                actualWidth = maxWidth
            }
            else
            {
                actualHeight = maxHeight
                actualWidth = maxWidth
            }
        }
        
        let rect: CGRect = CGRectMake(0.0, 0.0, actualWidth, actualHeight)
        UIGraphicsBeginImageContext(rect.size)
        image.drawInRect(rect)
        let img: UIImage = UIGraphicsGetImageFromCurrentImageContext()
        let imageData: NSData = UIImageJPEGRepresentation(img, compressionQuality)!
        UIGraphicsEndImageContext()
        
        return UIImage(data: imageData)!
        //return largeImage
    }
    

//    func numberOfComponentsInPickerView(pickerView: UIPickerView) -> Int {
//        return 1
//    }
//    
//    func pickerView(pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
//        return 2
//    }
//    
//    func pickerView(pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
//        return self.pickerDataSource[row]
//    }
    
    
    @IBOutlet var cancelButton: UIButton!
    
    
    @IBAction func sendPost(sender: UIButton) {
        self.actInd.color = UIColor(red: 0.0/255.0, green: 35.0/255.0, blue: 102.0/255.0, alpha: 1.0)
        self.actInd.hidden = false
         //self.view.bringSubviewToFront(actInd)
        self.actInd.startAnimating()
        
        self.view.userInteractionEnabled = false
       
        
        imageCaption = caption.text
        
        if self.path != "" && imageCaption != "" && imageCaption != "Write a caption..."{
           

            let categoryNumber = self.foofashion.selectedSegmentIndex
            
            if categoryNumber == 0{
                category = "Fashion"
            }
            else{
                category = "Food"
            }
            
            let gurl = NSURL(string: "http://www.google.com")
            
            if reach!.isReachable() || reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN() || self.isConnectedToNetwork(gurl!){
                
                 uploadtoAmazonS3()
                
                self.cancelButton.titleLabel?.text = "Done"
                
            }
            else{
               let alert = UIAlertController(title: "Cannot post now", message: "Internet connection appears to be offline", preferredStyle: .Alert)
                let ok = UIAlertAction(title: "OK", style: .Default, handler:nil)
                alert.addAction(ok)
                self.actInd.stopAnimating()
                self.view.userInteractionEnabled = true
                self.presentViewController(alert, animated: true, completion: nil)
            }
            
        }
        else{
          
            let alertController1 = UIAlertController(title: "Please write a caption for your photo", message: "Try again.", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button");
            }
            alertController1.addAction(OKAction)
            self.actInd.stopAnimating()
            self.view.userInteractionEnabled = true
            self.presentViewController(alertController1, animated: true, completion:nil)
        }
  
        //self.actInd.stopAnimating()
        //self.actInd.hidden = true
        
        
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
    
    
    @IBAction func RefreshPressed(sender: UIButton) {
       
        self.cancelButton.titleLabel?.text = "Cancel"
        self.doRefresh()
        
    }
    
    func doRefresh(){
        self.imgView.image = UIImage(named: "placeholder")
        self.imgView.contentMode = UIViewContentMode.ScaleToFill
        self.caption.text = "Write a caption..."
        self.caption.font = UIFont(name: "Roboto-Regular", size: 15.0)
        picker = UIImagePickerController()
        picker.delegate = self
        //picker = ImageCropViewController()
        picker.allowsEditing = false
        
        self.picker.sourceType = .Camera
        self.picker.showsCameraControls = false
//        
        let screenBounds = UIScreen.mainScreen().bounds
        //let frame = CGRectMake(screenBounds.width/2-30, screenBounds.height-70, screenBounds.width/2 , 60)

        let shutterButton = UIButton(frame: CGRectMake(screenBounds.width/2-40,screenBounds.height-100,80,80))
        //button1.backgroundColor = UIColor.redColor()
        
        shutterButton.setBackgroundImage(UIImage(named: "Shutter-Release"), forState: .Normal)
        shutterButton.addTarget(self, action: "ShutterTapped:", forControlEvents: .TouchUpInside)
        
        let cameraRoll = UIButton(frame: CGRectMake(screenBounds.width*0.75,screenBounds.height-90,60,60))
        cameraRoll.backgroundColor = UIColor.grayColor()
        
        let thumbnail = self.fetchPhotoAtIndexFromEnd(0) // get latest photo thumbnail from camera roll
        
        if let thumbnailImage = thumbnail{
            cameraRoll.setBackgroundImage(thumbnailImage, forState: .Normal)
        }
        
        cameraRoll.addTarget(self, action: "cameraRollSelected:", forControlEvents: .TouchUpInside)
        
        let toggleCamera =  UIButton(frame: CGRectMake(screenBounds.width*0.85,10,30,30))
        toggleCamera.addTarget(self, action: "CameraToggled:", forControlEvents: .TouchUpInside)
        toggleCamera.setBackgroundImage(UIImage(named: "CameraToggle"), forState: .Normal)
        
        let dismissPicker = UIButton(frame: CGRectMake(screenBounds.width*0.1,screenBounds.height-75,55,30))
        dismissPicker.backgroundColor = UIColor.clearColor()
        dismissPicker.setTitle("Cancel", forState: .Normal)
        dismissPicker.sizeToFit()
        dismissPicker.addTarget(self, action: "pickerDismissed:", forControlEvents: .TouchUpInside)
        
        let overlay = UIView(frame: screenBounds)
        overlay.addSubview(shutterButton)
        overlay.addSubview(cameraRoll)
        overlay.addSubview(toggleCamera)
        overlay.addSubview(dismissPicker)
        overlay.backgroundColor = UIColor.clearColor()
        
          picker.cameraDevice = .Front
        
//        
//        let overlay = UIView(frame: screenBounds)
//        let tap = UITapGestureRecognizer(target: self, action: "ShutterTapped:")
//        overlay.addGestureRecognizer(tap)
//        overlay.userInteractionEnabled = true
        
        self.picker.cameraOverlayView = overlay
        
       
      
        self.presentViewController(self.picker, animated: true, completion: nil)
        
        
//        let alertController = UIAlertController(title: "Choosing the right picture !!", message: "Would you like to use the camera or the photo gallery.", preferredStyle: UIAlertControllerStyle.Alert)
//        
//        
//        let CameraAction = UIAlertAction(title: "Camera", style: .Default) { (action:UIAlertAction) in
//            // print("you have pressed OK button", terminator: "");
//            
//            self.picker.sourceType = .Camera
//            self.picker.showsCameraControls = true
//            
//            let screenBounds = UIScreen.mainScreen().bounds
//            let frame = CGRectMake(screenBounds.width-70, screenBounds.height-70, 60, 60)
//            
//            let button = UIButton(frame: frame)
//            button.backgroundColor = UIColor.redColor()
//            
//            button.setTitle("CR", forState: .Normal)
//            button.addTarget(self, action: "cameraRollSelected:", forControlEvents: .TouchUpInside)
//            
//            self.picker.cameraOverlayView = button
//            
//            
//            //self.picker.cameraOverlayView = UIImageView(frame: CGRect(x: 0, y: UIScreen.mainScreen().bounds.height/2 - UIScreen.mainScreen().bounds.width/2, width: UIScreen.mainScreen().bounds.width, height: UIScreen.mainScreen().bounds.width))
//            self.presentViewController(self.picker, animated: true, completion: nil)
//        }
//        let PhotoAction = UIAlertAction(title: "Photos", style: .Default) { (action:UIAlertAction) in
//            //print("you have pressed OK button", terminator: "");
//            
//            self.picker.sourceType = .PhotoLibrary
//            self.presentViewController(self.picker, animated: true, completion: nil)
//        }
//        alertController.addAction(CameraAction)
//        alertController.addAction(PhotoAction)
        //alertController.view.superview?.userInteractionEnabled = true
        //alertController.view.superview?.addGestureRecognizer(UITapGestureRecognizer(target: self, action: "goBack"))
//        self.presentViewController(alertController, animated: true, completion: {() -> Void in
//            alertController.view.superview!.userInteractionEnabled = true
//            alertController.view.superview!.addGestureRecognizer(UITapGestureRecognizer(target: self, action: "goBack"))
//        })
    }
    
    func ShutterTapped(sender:UIButton){
        print("SHutter Tapped")
        picker.takePicture()
    }
    
    func cameraRollSelected(sender:UIButton){
        self.picker.sourceType = .PhotoLibrary
    }
    
    func CameraToggled(sender:UIButton){
        if self.picker.cameraDevice == .Rear{
          self.picker.cameraDevice = .Front
        }else{
            self.picker.cameraDevice = .Rear
        }
    }
    
    func pickerDismissed(sender:UIButton){
        self.picker.dismissViewControllerAnimated(true, completion: nil)
        self.tabBarController?.selectedIndex = 0
    }
 
    //Get the latest photo thumbnail from camera roll
    func fetchPhotoAtIndexFromEnd(index:Int) -> UIImage? {
        
        let imgManager = PHImageManager.defaultManager()
        
        var imageThumbnail:UIImage?
        // Note that if the request is not set to synchronous
        // the requestImageForAsset will return both the image
        // and thumbnail; by setting synchronous to true it
        // will return just the thumbnail
        let requestOptions = PHImageRequestOptions()
        requestOptions.synchronous = true
        
        // Sort the images by creation date
        let fetchOptions = PHFetchOptions()
        fetchOptions.sortDescriptors = [NSSortDescriptor(key:"creationDate", ascending: true)]
        
        if let fetchResult: PHFetchResult = PHAsset.fetchAssetsWithMediaType(PHAssetMediaType.Image, options: fetchOptions) {
            
            // If the fetch result isn't empty,
            // proceed with the image request
            if fetchResult.count > 0 {
                // Perform the image request
                imgManager.requestImageForAsset(fetchResult.objectAtIndex(fetchResult.count - 1 - index) as! PHAsset, targetSize: view.frame.size, contentMode: PHImageContentMode.AspectFill, options: requestOptions, resultHandler: { (image, _) in
                    
                    
                  imageThumbnail = image
                   
                })
            }
        }
        return imageThumbnail
    }
    
    func goBack(){
        self.dismissViewControllerAnimated(true, completion: nil)
    }
    
    
    func uploadtoAmazonS3(){
        let transferManager = AWSS3TransferManager.defaultS3TransferManager()
        let str = NSTemporaryDirectory().stringByRemovingPercentEncoding
        let timestamp = NSDateFormatter.localizedStringFromDate(NSDate(), dateStyle: .MediumStyle, timeStyle: .ShortStyle)
        let random = arc4random()
        let testFileURL1 = NSURL(fileURLWithPath: str!).URLByAppendingPathComponent("\(random)_\(timestamp)")
        let uploadRequest1 : AWSS3TransferManagerUploadRequest = AWSS3TransferManagerUploadRequest()
        
       let data = UIImageJPEGRepresentation(imgView.image!, 1.0)
        data!.writeToURL(testFileURL1, atomically: true)
        uploadRequest1.bucket = "ddmyish"
        uploadRequest1.key =  "\(random)_\(timestamp).jpg"
        uploadRequest1.body = testFileURL1

        uploadRequest1.ACL = AWSS3ObjectCannedACL.PublicRead
        uploadRequest1.contentType = "image/jpeg"
        
        transferManager.upload(uploadRequest1).continueWithBlock( { (task: AWSTask!) -> AnyObject! in
           
                            if task.error != nil || task.exception != nil {
                                print("Error: \(task.error)")
                                
                                let alertController = UIAlertController(title: "Cannot post now", message: "please try again later", preferredStyle: UIAlertControllerStyle.Alert)
                                
                                
                                let OK = UIAlertAction(title: "OK", style: .Default, handler: nil)
                                alertController.addAction(OK)
                                
                                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                                    self.actInd.stopAnimating()
                                    self.view.userInteractionEnabled = true
                                    self.actInd.hidden = true
                                    self.presentViewController(alertController, animated: true, completion:nil)
                                })
                                
                            }
//                            if task.exception != nil{
//                                print("Exception: \(task.exception)")
//                            }
                            if task.result != nil && task.error == nil && task.exception == nil {
                                print("Result: \(task.result)")
                                let uploadTask : AWSS3TransferManagerUploadOutput = task.result as! AWSS3TransferManagerUploadOutput
                                
                                let alertController = UIAlertController(title: "You successfully posted your ish!", message: "Do you want to post again or go to the home screen?", preferredStyle: UIAlertControllerStyle.Alert)
                                
                                
                                let PostAction = UIAlertAction(title: "Post again", style: .Default) { (action:UIAlertAction) in
                                    self.doRefresh()
                                }
                                let HomeAction = UIAlertAction(title: "Home", style: .Default) { (action:UIAlertAction) in
                                    self.tabBarController?.selectedIndex = 0
                                }
                                alertController.addAction(PostAction)
                                alertController.addAction(HomeAction)
                                
                                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                                    self.post(["postimage":self.path, "postname":self.imageCaption, "postedby":userProfileID, "category":self.category, "postedbyusername": self.profile.title!, "postedbyprofilepicture": self.profile.imageURL!,"lattitude": "\(self.latitude)", "longitude": "\(self.longitude)"], url: "http://myish.com:\(port)/api/posts")
                                    self.actInd.stopAnimating()
                                    self.view.userInteractionEnabled = true
                                    self.actInd.hidden = true
                                    self.presentViewController(alertController, animated: true, completion:nil)
                                })
                                
                               
                            }
            return nil
            })
        self.path = "https://s3-us-west-2.amazonaws.com/ddmyish/"+"\(random)_\(timestamp)"+".jpg"
        self.path = path.stringByReplacingOccurrencesOfString(" ", withString: "%20")
        
        
        
    }
    
    func keyboardWillShow(sender: NSNotification) {
        let info = sender.userInfo!
        let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()

        self.view.frame.origin.y -= keyboardFrame.size.height
    }
    
    func keyboardWillHide(sender: NSNotification) {
        let info = sender.userInfo!
        let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()
        
        self.view.frame.origin.y += keyboardFrame.size.height
    }
    
    func post(params : Dictionary<String, String>, url : String){
        
        let request = NSMutableURLRequest(URL: NSURL(string: url)!)
        let session = NSURLSession.sharedSession()
        request.HTTPMethod = "POST"
        request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalCacheData
        do{
            //  let err: NSError?
            request.HTTPBody = try NSJSONSerialization.dataWithJSONObject(params, options: NSJSONWritingOptions.init(rawValue: 0))
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("application/json", forHTTPHeaderField: "Accept")
        }
        catch{
            print("Error writing JSON: ")
        }
        let task =  session.dataTaskWithRequest(request, completionHandler: {data, response, error -> Void in
            print("Request: \(request)")
            //print("Response: \(response!)")
            if error == nil{
                let postid = NSString(data: data!, encoding: NSUTF8StringEncoding) as! String
                Utils.post(["postimage":self.path, "postname":self.caption.text, "userid":userProfileID, "postid": postid, "lattitude": "\(self.latitude)", "longitude": "\(self.longitude)"], url: "http://myish.com:\(port)/api/userpostcreated")
                
                                
            }
            else {
                print("Error: \(error?.localizedDescription)")
                
            }

        })
        
        task.resume()
    }
    
    
    
    @IBAction func cancelPressed(sender: UIButton) {
        self.tabBarController?.selectedIndex = 0
    }
    
    func noCamera(){
        let alertVC = UIAlertController(title: "No Camera", message: "Sorry, this device has no camera", preferredStyle: .Alert)
        let okAction = UIAlertAction(title: "OK", style:.Default, handler: nil)
        alertVC.addAction(okAction)
        presentViewController(alertVC, animated: true, completion: nil)
    }
    
    @IBAction func photoFromLibrary(sender: UIButton) {
        picker.allowsEditing = false //2
        picker.sourceType = .PhotoLibrary //3
        //picker.modalPresentationStyle = .Popover
        self.presentViewController(picker, animated: true, completion: nil)//4
        
    }
    
    @IBAction func didPressTakeAnother(sender: AnyObject) {
        //captureSession!.startRunning()
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    func locationManager(manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let location = locations.last
        if location != nil{
            latitude = location!.coordinate.latitude
            longitude = location!.coordinate.longitude
        }
        
    }
    
    
    
}

