//
//  FollowViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 10/30/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class FollowViewController: UIViewController, UITableViewDelegate, UITableViewDataSource{
    
    var tagValue:Int!
    var tagvalue11:Int!
    
    @IBOutlet var tableView: UITableView!
    //var followImg: [UIImage]!
    var followImgUrl: [String]!
    var followName: [String]!
    //var imageCache: [String: UIImage]!
    var followID: [String]!
    //var follow: Bool!
    var follow: [Bool]!
    
    @IBOutlet var titlelab: UILabel!
    var navTitle: String!
    
   // @IBOutlet var navBar: UINavigationBar!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.tableView.userInteractionEnabled = true
        
        let colors = Colors()
        self.view.backgroundColor = UIColor.clearColor()
        let backgroundLayer = colors.gl
        backgroundLayer.frame = self.view.frame
        self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
        
        self.tableView.delegate = self
        self.tableView.dataSource = self
        //self.followImg = [UIImage]()
        //self.followImgUrl = [String]()
        //self.followName = [String]()
      self.titlelab.text = self.navTitle
        //self.imageCache = [String: UIImage]()
        
    }
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "Follow Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        
        return 1
    }
    
    func imageResize(imageObj:UIImage, sizeChange:CGSize)-> UIImage {
        
        let hasAlpha = false
        let scale: CGFloat = 0.0 // Automatically use scale factor of main screen
        
        UIGraphicsBeginImageContextWithOptions(sizeChange, !hasAlpha, scale)
        imageObj.drawInRect(CGRect(origin: CGPointZero, size: sizeChange))
        
        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return scaledImage
    }
    

    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        if self.followName != nil{
        
        return self.followName.count
        }
        else {
            
        return 1
       }
        
    }
    
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCellWithIdentifier("followCell", forIndexPath: indexPath) as! FollowViewCell
        cell.profileImg.tag = indexPath.row
        
        //let imageVw = cell.viewWithTag(101) as! UIImageView
        //let name = cell.viewWithTag(201) as! UILabel
        //let followButton = cell.viewWithTag(301) as! UIButton
        
        if self.follow != nil{
            
            if self.followImgUrl[indexPath.row] != ""{
            var searchImg1 = imageCache[self.followImgUrl[indexPath.row]]
            
            if searchImg1 != nil{
                searchImg1 = imageResize(searchImg1!, sizeChange: CGSize(width: 30, height: 30))
                cell.profileImg.setImage(searchImg1, forState: UIControlState.Normal)
                cell.profileImg.imageView!.layer.cornerRadius = (cell.profileImg.imageView!.frame.size.width)/2
                cell.profileImg.imageView!.clipsToBounds = true
                cell.profileImg.setTitle("", forState: UIControlState.Normal)
                
            }
                
            else{
                //img = UIImage(named: "whitebkg")
                let nurl = NSURL(string: self.followImgUrl[indexPath.row])
                //cell.ActInd.startAnimating()
                self.downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                    if (succeeded == true) && image != nil {
                        // println("AD image loaded")
                        let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 30, height: 30))
                        cell.profileImg.setImage(image, forState: UIControlState.Normal)
                        cell.profileImg.setImage(Utils.imageResize(rimage as UIImage, sizeChange: CGSize(width: 30, height: 30)), forState: UIControlState.Normal)
                        cell.profileImg.imageView!.layer.cornerRadius = (cell.profileImg.imageView!.frame.size.width)/2
                        cell.profileImg.imageView!.clipsToBounds = true
                        cell.profileImg.setTitle("", forState: UIControlState.Normal)
                        
                    }
                    else {
                        let profileImg = Utils.imageResize(UIImage(named: "Myish-circle-transparent")!, sizeChange: CGSize(width: 30, height: 30))
                        //let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
                        cell.profileImg.setImage(profileImg, forState: UIControlState.Normal)
                        cell.profileImg.setImage(Utils.imageResize(profileImg as UIImage, sizeChange: CGSize(width: 30, height: 30)), forState: UIControlState.Normal)
                        cell.profileImg.imageView!.layer.cornerRadius = (cell.profileImg.imageView!.frame.size.width)/2
                        cell.profileImg.imageView!.clipsToBounds = true
                        cell.profileImg.setTitle("", forState: UIControlState.Normal)
                    }
                })
                
            }
            
        }
        else{
            let profileImg = Utils.imageResize(UIImage(named: "Myish-circle-transparent")!, sizeChange: CGSize(width: 30, height: 30))
            //let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
            cell.profileImg.setImage(profileImg, forState: UIControlState.Normal)
            cell.profileImg.setImage(Utils.imageResize(profileImg as UIImage, sizeChange: CGSize(width: 30, height: 30)), forState: UIControlState.Normal)
            cell.profileImg.layer.cornerRadius = (cell.profileImg.imageView!.frame.size.width)/2
            cell.profileImg.clipsToBounds = true
            cell.profileImg.setTitle("", forState: UIControlState.Normal)
        }

        cell.name.text = self.followName[indexPath.row] as String
        cell.follow.tag = indexPath.row
        if self.follow[indexPath.row] == true{
            cell.follow.setTitle("", forState: UIControlState.Normal)
            cell.follow.setTitle("", forState: UIControlState.Highlighted)
            cell.follow.setImage(UIImage(named: "Clicked-follow-button")!, forState: UIControlState.Normal)
            cell.follow.setImage(UIImage(named: "Unclicked-follow-button")!, forState: UIControlState.Highlighted)
            
        }
        else{
            cell.follow.setTitle("", forState: UIControlState.Normal)
            cell.follow.setTitle("", forState: UIControlState.Highlighted)
            cell.follow.setImage(UIImage(named: "Unclicked-follow-button")!, forState: UIControlState.Normal)
            cell.follow.setImage(UIImage(named: "Clicked-follow-button")!, forState: UIControlState.Highlighted)
            
            }
        }
        return cell
    }

    
    
    
    
    
    @IBAction func followPressed(sender: UIButton) {
        if self.follow[sender.tag] == true{
            let actionSheetController: UIAlertController = UIAlertController(title: "Unfollow \(self.followName[sender.tag])", message: nil, preferredStyle: UIAlertControllerStyle.ActionSheet)
            
            let choosePictureAction: UIAlertAction = UIAlertAction(title: "Unfollow", style: UIAlertActionStyle.Destructive)
                { action -> Void in
                    self.follow[sender.tag] = false
                    sender.setTitle("", forState: UIControlState.Normal)
                    sender.setTitle("", forState: UIControlState.Highlighted)
                    sender.setImage(UIImage(named: "Unclicked-follow-button")!, forState: UIControlState.Normal)
                    sender.setImage(UIImage(named: "Clicked-follow-button")!, forState: UIControlState.Highlighted)
                    let gurl = NSURL(string: "http://www.google.com")
                    if (self.isConnectedToNetwork(gurl!) == true){
                        self.post(["userid":self.followID[sender.tag], "followerid":userProfileID], url: "http://myish.com:\(port)/api/removefollower")
                        self.post(["userid":userProfileID, "followingid":self.followID[sender.tag]], url: "http://myish.com:\(port)/api/removefollowing")
                    }
                    if self.navTitle.caseInsensitiveCompare("followers") != NSComparisonResult.OrderedSame{
                    self.follow.removeAtIndex(sender.tag)
                    self.followID.removeAtIndex(sender.tag)
                    self.followImgUrl.removeAtIndex(sender.tag)
                    self.followName.removeAtIndex(sender.tag)
                    self.tableView.reloadData()
                    }
                    
            }
            
            actionSheetController.addAction(choosePictureAction)
            
            let cancelAction: UIAlertAction = UIAlertAction(title: "Cancel", style: .Default) { action -> Void in
                
            }
            actionSheetController.addAction(cancelAction)
            
            actionSheetController.view.bounds = CGRect(x: 0, y: actionSheetController.view.frame.origin.y, width: UIScreen.mainScreen().bounds.width, height: actionSheetController.view.frame.size.height)
            self.presentViewController(actionSheetController, animated: true, completion: nil)

        }
        else{
            self.follow[sender.tag] = true
            sender.setTitle("", forState: UIControlState.Normal)
            sender.setTitle("", forState: UIControlState.Highlighted)
            sender.setImage(UIImage(named: "Clicked-follow-button")!, forState: UIControlState.Normal)
            sender.setImage(UIImage(named: "Unclicked-follow-button")!, forState: UIControlState.Highlighted)
            post(["userid":self.followID[sender.tag], "followerid":userProfileID, "followerusername":username, "followerprofilepictureURL":userimageURL], url: "http://myish.com:\(port)/api/addfollower")
            post(["userid":userProfileID, "followingid":self.followID[sender.tag], "followingusername":self.followName[sender.tag], "followingprofilepictureURL":self.followImgUrl[sender.tag]], url: "http://myish.com:\(port)/api/addfollowing")
        }
    }
    
    func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        
        return 60
        
    }
    
    @IBAction func backButtonPressed(sender: UIButton) {
        self.navigationController?.popViewControllerAnimated(true)
        //self.navigationController?.popToRootViewControllerAnimated(false)
        
    }
    
//    func actioncontroller(username: String){
//        
//        let actionSheetController: UIAlertController = UIAlertController(title: "Unfollow \(username)", message: nil, preferredStyle: UIAlertControllerStyle.ActionSheet)
//        
//        let choosePictureAction: UIAlertAction = UIAlertAction(title: "Unfollow", style: UIAlertActionStyle.Destructive)
//            { action -> Void in
//                
//                let gurl = NSURL(string: "http://www.google.com")
//                if (self.isConnectedToNetwork(gurl!) == true){
//                    self.post(["userid":username, "followerid":userProfileID], url: "http://myish.com:3000/api/removefollower")
//                    self.post(["userid":userProfileID, "followingid":username], url: "http://myish.com:3000/api/removefollowing")
//                }
//            
//        }
//        
//        actionSheetController.addAction(choosePictureAction)
//        
//        let cancelAction: UIAlertAction = UIAlertAction(title: "Cancel", style: .Default) { action -> Void in
//            
//        }
//        actionSheetController.addAction(cancelAction)
//        
//        actionSheetController.view.bounds = CGRect(x: 0, y: actionSheetController.view.frame.origin.y, width: UIScreen.mainScreen().bounds.width, height: actionSheetController.view.frame.size.height)
//        self.presentViewController(actionSheetController, animated: true, completion: nil)
//    }
    
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
                let strData = NSString(data: data!, encoding: NSUTF8StringEncoding)
 
            }
            else {
                print("Error: \(error?.localizedDescription)")
                let alertController = UIAlertController(title: "Unable to process the request !!", message: "Please try again !!", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    print("you have pressed OK button", terminator: "");
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
            
        })
        
        task.resume()
    }
    
    func isConnectedToNetwork(url: NSURL) -> Bool {
        var status:Bool = false
        
        let request = NSMutableURLRequest(URL: url)
        request.HTTPMethod = "HEAD"
        request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalAndRemoteCacheData
        request.timeoutInterval = 10.0
        
        var response: NSURLResponse?
        do{
            let data = try NSURLConnection.sendSynchronousRequest(request, returningResponse: &response) as NSData?
            
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


    
    func downloadImageWithUrl(url: NSURL, completionHandler:(succeeded: Bool, image: UIImage?) -> Void) -> Void {
        let session = NSURLSession.sharedSession()
        let request = NSMutableURLRequest(URL: url)
        
        let task = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in
            if (error == nil) {
                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                    let image = UIImage(data: data!)
                    //self.image = image
                   imageCache[url.absoluteString] = image
                    print("success")
                    completionHandler(succeeded: true, image: image)
                })
            } else {
                print("error")
                completionHandler(succeeded: false, image: nil)
            }
        })
        
        task.resume()
    }
    
    

    
    
    @IBAction func openprofileUser(sender: UIButton)
    {
        tagvalue11 = sender.tag
        self.performSegueWithIdentifier("showUserProfile", sender: self)
        
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        
        if segue.identifier == "showUserProfile"
        {
            if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN())
            {
                let alertController = UIAlertController(title: "Followers Page Unreachable!!", message: "No Internet Connection to Update.", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    
                   // self.actInd.stopAnimating()
                    //self.navigationController?.popToRootViewControllerAnimated(true)
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
                
            else
            {
            
            let destinationController = segue.destinationViewController as! UserProfileViewController
            destinationController.profileID = followID[tagvalue11]
            }
            
        }
    }
    
    
    
    
 


}
    
    
    
    
