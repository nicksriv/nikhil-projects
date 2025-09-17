//
//  PostViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 8/6/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class PostViewController: UIViewController, BranchDeepLinkingController{
    
    @IBOutlet var postProfileImg: UIButton!
    
    @IBOutlet var postUserName: UILabel!
    
    @IBOutlet var postTime: UILabel!
    
    @IBOutlet var postCategory: UIButton!
    
    @IBOutlet var postDescription: UILabel!
    
    @IBOutlet var postComments: UIButton!
    
    
    @IBOutlet weak var btnNay: BadgeButton!
    
    @IBOutlet weak var btnYay: BadgeButtonR!
    
    @IBOutlet var actInd: UIActivityIndicatorView!
    var cards: CardData!
    var postapi: SinglePostApi!
    var post: Post!
    var flagCount: Int!
    var deepLinkingCompletionDelegate: BranchDeepLinkingControllerCompletionDelegate?
    
    var cardURL: String!
    
    @IBOutlet var imgView: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        self.postCategory.hidden = true
        self.postComments.hidden = true
        self.postDescription.hidden = true
        self.postTime.hidden = true
        self.postProfileImg.hidden = true
        self.postUserName.hidden = true
        self.imgView.hidden = true
        
        
        let colors = Colors()
        self.view.backgroundColor = UIColor.clearColor()
        let backgroundLayer = colors.gl
        backgroundLayer.frame = self.view.frame
        self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
        
        
        self.postapi = SinglePostApi()

       
        //self.actInd.frame.origin.x = self.view.frame.origin.x + self.view.frame.size.width/2 - actInd.frame.size.width/2
        //self.actInd.frame.origin.y = self.view.frame.origin.y + self.view.frame.size.height/2 - actInd.frame.size.height/2
        
        //self.view.addSubview(actInd)
        self.modalTransitionStyle = UIModalTransitionStyle.FlipHorizontal
        
        
   //    NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("PushNotification:"), name:UIKeyboardWillShowNotification, object: nil)

        if self.cards != nil{
        
        if self.cards.id != nil && self.cards.id != ""{
         self.PostReload("http://myish.com:\(port)/api/getpostbyid?postid=\(self.cards.id)")
          print("http://myish.com:\(port)/api/getpostbyid?postid=\(self.cards.id)")
        }
        }
    }
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        //self.tabBarController?.tabBar.layer.zPosition = 0
        self.tabBarController?.tabBar.hidden = false
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "ViewPost Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
    }
    
    func PostReload(url: String){
        
        self.postapi.loadPost(url, completion: didLoadPost)
        
    }
    
    
    
    

    
    
    
    func imageResize(imageObj:UIImage, sizeChange:CGSize)-> UIImage {
        
        let hasAlpha = false
        let scale: CGFloat = 0.0
        
        UIGraphicsBeginImageContextWithOptions(sizeChange, !hasAlpha, scale)
        imageObj.drawInRect(CGRect(origin: CGPointZero, size: sizeChange))
        
        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return scaledImage
    }
    
    func didLoadPost(posts: Post){
        self.post = posts
        if self.post != nil{
        self.actInd.hidden = false
        self.actInd.startAnimating()
        self.postUserName.text = self.post.profilename
            if self.post.commentcount == 1{
                self.postComments.setTitle("\(self.post.commentcount) comment", forState: UIControlState.Normal)
            }
            else{
                if self.post.commentcount == 0{
                    self.postComments.setTitle("No comments", forState: UIControlState.Normal)
                }
                else{
                    self.postComments.setTitle("\(self.post.commentcount) comments", forState: UIControlState.Normal)
                }
            }
        
        self.postCategory.setTitle(self.post.category, forState: UIControlState.Normal)
        self.postDescription.text = self.post.title
            self.btnNay.badgeString = "\(self.post.postNayCount)"
            self.btnNay.badgeEdgeInsets = UIEdgeInsetsMake(10, 0, 0, 15)
            self.btnYay.badgeString = "\(self.post.postYayCount)"
            self.btnYay.badgeEdgeInsets = UIEdgeInsetsMake(10, 15, 0, 0)
        self.postTime.text = self.post.timestamp
            if self.post.profileimageurl != ""{
                
                var profileImg = imageCache[self.post.profileimageurl]
                
                if profileImg != nil{
                    profileImg = Utils.imageResize(profileImg!, sizeChange: CGSize(width: 50, height: 50))
                    //let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
                    self.postProfileImg.setImage(profileImg, forState: UIControlState.Normal)
                    self.postProfileImg.setImage(Utils.imageResize(profileImg! as UIImage, sizeChange: CGSize(width: 50, height: 50)), forState: UIControlState.Normal)
                    self.postProfileImg.layer.cornerRadius = (self.postProfileImg.imageView!.frame.size.width)/2
                    self.postProfileImg.clipsToBounds = true
                    self.postProfileImg.setTitle("", forState: UIControlState.Normal)
                }
                    
                else{
                    
                    let nurl = NSURL(string: self.post.profileimageurl)
                    downloadProfileImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                        if (succeeded == true) && image != nil {
                            let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
                            self.postProfileImg.setImage(image, forState: UIControlState.Normal)
                            self.postProfileImg.setImage(Utils.imageResize(rimage as UIImage, sizeChange: CGSize(width: 50, height: 50)), forState: UIControlState.Normal)
                            self.postProfileImg.layer.cornerRadius = (self.postProfileImg.imageView!.frame.size.width)/2
                            self.postProfileImg.clipsToBounds = true
                            self.postProfileImg.setTitle("", forState: UIControlState.Normal)
                            
                        }
                        else {
                            let profileImg = Utils.imageResize(UIImage(named: "Myish-circle-transparent")!, sizeChange: CGSize(width: 50, height: 50))
                            //let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
                            self.postProfileImg.setImage(profileImg, forState: UIControlState.Normal)
                            self.postProfileImg.setImage(Utils.imageResize(profileImg as UIImage, sizeChange: CGSize(width: 50, height: 50)), forState: UIControlState.Normal)
                            self.postProfileImg.layer.cornerRadius = (self.postProfileImg.imageView!.frame.size.width)/2
                            self.postProfileImg.clipsToBounds = true
                            self.postProfileImg.setTitle("", forState: UIControlState.Normal)
                        }
                    })
                    
                }
            }
            else{
                let profileImg = Utils.imageResize(UIImage(named: "Myish-circle-transparent")!, sizeChange: CGSize(width: 50, height: 50))
                //let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
                self.postProfileImg.setImage(profileImg, forState: UIControlState.Normal)
                self.postProfileImg.setImage(Utils.imageResize(profileImg as UIImage, sizeChange: CGSize(width: 50, height: 50)), forState: UIControlState.Normal)
                self.postProfileImg.layer.cornerRadius = (self.postProfileImg.imageView!.frame.size.width)/2
                self.postProfileImg.clipsToBounds = true
                self.postProfileImg.setTitle("", forState: UIControlState.Normal)
            }
            
        
        if self.post.imageURL != "" {
            
            let Img = imageCache[self.post.imageURL!]

            let url = NSURL(string: self.post.imageURL!)
            
            if Img == nil{
                downloadImageWithUrl(url!, completionHandler: { (succeeded, image) -> Void in
                    
                    if (succeeded == true) && image != nil {
                        
                        self.post.image = image
                        self.postLoad()
                    }
                    else{
                        
                        //self.actInd.stopAnimating()
                        self.postLoad()
                    }

                })
            }
            else{
                 self.post.image = Img
                //self.actInd.stopAnimating()
                self.postLoad()
            }
            
        
        }
        //self.actInd.stopAnimating()
        self.postCategory.hidden = false
        self.postComments.hidden = false
        self.postDescription.hidden = false
        self.postTime.hidden = false
        self.postProfileImg.hidden = false
        self.postUserName.hidden = false
        self.imgView.hidden = false

        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()

    }
    
    func postLoad(){

            if self.post.image != nil{
                let img = self.imageResize(self.post.image, sizeChange: self.imgView.frame.size)
                self.imgView.image = img
                self.imgView.layer.cornerRadius = 10.0
                self.imgView.clipsToBounds = true
            }

        else{
            self.imgView = UIImageView(image: UIImage(named: "placeholder"))
        }
        self.actInd.stopAnimating()

    }
    
    func downloadImageWithUrl(url: NSURL, completionHandler:(succeeded: Bool, image: UIImage?) -> Void) -> Void {
        let session = NSURLSession.sharedSession()
        let request = NSMutableURLRequest(URL: url)
        
        let task = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in
            if (error == nil) {
                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                    let image = UIImage(data: data!)
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
        
        func downloadProfileImageWithUrl(url: NSURL, completionHandler:(succeeded: Bool, image: UIImage?) -> Void) -> Void {
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

    
    
    @IBAction func backButtonPressed(sender: UIButton) {
    
        self.navigationController?.popViewControllerAnimated(true)
    
    }
    
    func actioncontroller(){
        
        let actionSheetController: UIAlertController = UIAlertController(title: nil, message: nil, preferredStyle: UIAlertControllerStyle.ActionSheet)
        
        
        //Create and add first option action
        let takePictureAction: UIAlertAction = UIAlertAction(title: "Social sharing", style: UIAlertActionStyle.Default)
            { action -> Void in
                
                //self.performSegueWithIdentifier("segue_setup_customer", sender: self)
                
        }
        
        actionSheetController.addAction(takePictureAction)
        //Create and add a second option action
        
        
        let choosePictureAction: UIAlertAction = UIAlertAction(title: "Report abuse", style: UIAlertActionStyle.Destructive)
            { action -> Void in
                
                let alertController = UIAlertController(title: "Report abuse!!", message: "Are your sure you want to report this post", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let YESAction = UIAlertAction(title: "YES", style: .Default) { (action:UIAlertAction) in
                    let gurl = NSURL(string: "http://www.google.com")
                    if (self.isConnectedToNetwork(gurl!) == true){
                        self.post(["userid":userProfileID, "postid":self.post.id], url: "http://myish.com:\(port)/api/reportabuse")
                    }
                }
                alertController.addAction(YESAction)
                
                let NOAction = UIAlertAction(title: "NO", style: .Default) { (action:UIAlertAction) in
                    
                }
                alertController.addAction(NOAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
                
                
                //self.performSegueWithIdentifier("segue_setup_provider", sender: self)
                
        }
        
        actionSheetController.addAction(choosePictureAction)
        
        let cancelAction: UIAlertAction = UIAlertAction(title: "Cancel", style: .Default) { action -> Void in
            
        }
        actionSheetController.addAction(cancelAction)
        
        actionSheetController.view.bounds = CGRect(x: 0, y: actionSheetController.view.frame.origin.y, width: UIScreen.mainScreen().bounds.width, height: actionSheetController.view.frame.size.height)
        self.presentViewController(actionSheetController, animated: true, completion: nil)
    }
    
    func post(params : Dictionary<String, String>, url : String) {
        
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
            //let json = JSON(data: data)
            //do{
            // let err: NSError?
            //self.loadSocial(data, completion: self.didLoadLoginData)
            
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
    
    
    @IBAction func morePressed(sender: UIButton) {
        self.actioncontroller()
    }

    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?)
    {
        if segue.identifier == "userprofile"
        {
                            if self.post.profileid == userProfileID{
                    self.tabBarController?.selectedIndex = 5
            }
                else
                {
                    let profileController = segue.destinationViewController as! UserProfileViewController
                    profileController.profileID = self.post.profileid
                    
                }
            
           
            
        }
        
        if segue.identifier == "postcomments"{
            let commentController = segue.destinationViewController as! CommentViewController
            commentController.postID = self.cards.id
            commentController.profilename = self.post.profilename
            commentController.profileimageURL = self.post.profileimageurl
            commentController.postedby = self.post.profilename
            commentController.posttitle = self.post.title
            commentController.postedbyimage = UIImage()
            commentController.time = self.post.timestamp
            if self.postProfileImg.imageView!.image != nil{
            commentController.postedbyimage = self.postProfileImg.imageView!.image
            }
            else{
                commentController.postedbyimage = UIImage(named: "User blue")
            }
        }
    }
    
    func configureControlWithData(data: [NSObject : AnyObject]!) {
        let postID = data["postid"] as! String
        
        if postID != ""{
            self.PostReload("http://myish.com:\(port)/api/getpostbyid?postid=\(postID)")
            print("Configure: http://myish.com:\(port)/api/getpostbyid?postid=\(postID)")
        }
    }
    
    
    func closePressed() {
        self.deepLinkingCompletionDelegate?.deepLinkingControllerCompleted()
    }
    
}









