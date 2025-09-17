//
//  ImageUploadController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/14/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation
import UIKit

class ImageUploadController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate{
    
    @IBOutlet var profilePic: UIImageView!

    @IBOutlet var change: UIButton!
    var picker: UIImagePickerController!
    var path: String!
    
    @IBOutlet var actInd: UIActivityIndicatorView!
    @IBOutlet var save: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        change.layer.cornerRadius = 10
        save.layer.cornerRadius = 10
        
        let colors = Colors()
        self.view.backgroundColor = UIColor.clearColor()
        let backgroundLayer = colors.gl
        backgroundLayer.frame = self.view.frame
        self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
        self.actInd.color = UIColor.blackColor()
        self.change.backgroundColor = UIColor(red: 255.0/255.0, green: 90.0/255.0, blue: 52.0/255.0, alpha: 1)
        self.save.backgroundColor = UIColor(red: 255.0/255.0, green: 90.0/255.0, blue: 52.0/255.0, alpha: 1)
        
    }
    
    override func viewWillAppear(animated: Bool) {
        if imageCache[userimageURL] != nil{
            self.profilePic.image = imageCache[userimageURL]
        }
        else{
            self.profilePic.image = UIImage(named: "Myish-circle-transparent")
        }
        
        self.profilePic.layer.cornerRadius = 10
        self.profilePic.clipsToBounds = true
        self.save.enabled = false
        
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "ProfleImageUpload Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func imagePickerController(picker: UIImagePickerController, var didFinishPickingImage image: UIImage!, editingInfo: [NSObject : AnyObject]!) {
        
        picker.dismissViewControllerAnimated(true, completion: nil)
        //image = resizeImage(image)
        profilePic.image = image
        self.save.enabled = true
        
    }
    
    func imagePickerControllerDidCancel(picker: UIImagePickerController) {
        picker.dismissViewControllerAnimated(true, completion: nil)
        
    }


    @IBAction func chnagePicPressed(sender: UIButton) {
        //self.cancelButton.titleLabel?.text = "Refresh"
        picker = UIImagePickerController()
        picker.delegate = self
        picker.allowsEditing = true
        
        let alertController = UIAlertController(title: "Lets choose a sexy DP for you", message: "Would you like to use the camera or the photo gallery.", preferredStyle: UIAlertControllerStyle.Alert)
        
        
        let CameraAction = UIAlertAction(title: "Camera", style: .Default) { (action:UIAlertAction) in

            self.picker.sourceType = .Camera
//            let lay = self.picker.cameraOverlayView!.layer
//            lay.cornerRadius = UIScreen.mainScreen().bounds.width/2
//            lay.borderWidth = 1
//            lay.masksToBounds = true
            //self.picker.displayLayer(lay)
            self.presentViewController(self.picker, animated: true, completion: nil)
        }
        let PhotoAction = UIAlertAction(title: "Photos", style: .Default) { (action:UIAlertAction) in

            self.picker.sourceType = .PhotoLibrary
//            let lay = self.picker.view.layer
//            lay.cornerRadius = UIScreen.mainScreen().bounds.width/2
//            lay.borderWidth = 1
//            lay.masksToBounds = true
            //self.picker.displayLayer(lay)
            self.presentViewController(self.picker, animated: true, completion: nil)
        }
        alertController.addAction(CameraAction)
        alertController.addAction(PhotoAction)
        self.presentViewController(alertController, animated: true, completion:nil)


    }
    
    @IBAction func backButtonPressed(sender: UIButton) {
    self.navigationController?.popViewControllerAnimated(true)
    
    }
    
    
    @IBAction func savePressed(sender: UIButton) {
        self.actInd.startAnimating()
        self.save.enabled = false
        self.uploadtoAmazonS3()
        if self.path != ""{
            Utils.post(["picturepath":self.path, "userid":userProfileID], url: "http://myish.com:\(port)/api/updateprofilepicture")
        }
    }
    

    
    func resizeImage(image: UIImage) -> UIImage{
        
        var actualHeight: CGFloat = image.size.height
        var actualWidth: CGFloat = image.size.width
        let maxHeight: CGFloat = 300.0
        let maxWidth: CGFloat = 400.0
        var imgRatio: CGFloat = actualWidth/actualHeight
        let maxRatio: CGFloat = maxWidth/maxHeight
        let compressionQuality: CGFloat = 1.0 //50 percent compression
        
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
    
    func uploadtoAmazonS3(){
        let transferManager = AWSS3TransferManager.defaultS3TransferManager()
        let str = NSTemporaryDirectory().stringByRemovingPercentEncoding
        let timestamp = NSDateFormatter.localizedStringFromDate(NSDate(), dateStyle: .MediumStyle, timeStyle: .ShortStyle)
        let random = arc4random()
        let testFileURL1 = NSURL(fileURLWithPath: str!).URLByAppendingPathComponent("\(random)_\(timestamp)")
        let uploadRequest1 : AWSS3TransferManagerUploadRequest = AWSS3TransferManagerUploadRequest()
        
        let data = UIImageJPEGRepresentation(self.profilePic.image!, 0.5)
        data!.writeToURL(testFileURL1, atomically: true)
        uploadRequest1.bucket = "ddmyish"
        let imagekey = emailid.stringByReplacingOccurrencesOfString("@", withString: "")
        uploadRequest1.key =  "\(imagekey).jpg"
        uploadRequest1.body = testFileURL1
        
        uploadRequest1.ACL = AWSS3ObjectCannedACL.PublicRead
        uploadRequest1.contentType = "image/jpeg"

        
        transferManager.upload(uploadRequest1).continueWithBlock( { (task: AWSTask!) -> AnyObject! in
            
            if task.error != nil {
                print("Error: \(task.error)")
            }
            if task.exception != nil{
                print("Exception: \(task.exception)")
            }
            if task.result != nil{
                print("Result: \(task.result)")
                let uploadTask : AWSS3TransferManagerUploadOutput = task.result as! AWSS3TransferManagerUploadOutput
                
                
            }
            //self.actInd.stopAnimating()
            if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN())
            {
                let alertController = UIAlertController(title: "Profile picture !!", message: "No Internet Connection to Update.", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    
                    self.actInd.stopAnimating()
                    self.navigationController?.popToRootViewControllerAnimated(true)
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
            else
            {
                
                let alertController = UIAlertController(title: "Profile picture !!", message: "Profile picture successfully updated.", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    
                    self.actInd.stopAnimating()
                    self.navigationController?.popToRootViewControllerAnimated(true)
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
            
 
            return nil
        })
        self.path = "https://s3-us-west-2.amazonaws.com/ddmyish/" + uploadRequest1.key
        self.path = path.stringByReplacingOccurrencesOfString(" ", withString: "%20")
        
        imageCache[userimageURL] = nil //clear the cache of old pic
        userimageURL = self.path // update new pic path       
        
        
    }

    func noCamera()
    {
        let alertVC = UIAlertController(title: "No Camera", message: "Sorry, this device has no camera", preferredStyle: .Alert)
        let okAction = UIAlertAction(title: "OK", style:.Default, handler: nil)
        alertVC.addAction(okAction)
        presentViewController(alertVC, animated: true, completion: nil)
    }
    
    
}