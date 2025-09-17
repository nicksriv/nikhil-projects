//
//  CommentViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 11/22/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

public protocol UpdateCommentCount{
    func UpdateComments(commentCount:Int)
}

class CommentViewController: UIViewController, UITableViewDataSource, UITableViewDelegate, UITextFieldDelegate {
    
    var comments: [CommentData]!
    var commentApi: CommentApi!
    var commentURL: String!
    var postID: String!
    var profilename: String!
    var profileimageURL: String!
    //var comment: CommentData!
    var keyboardFlag = false
    var len: CGFloat!
    @IBOutlet var commentfield: UITextField!
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet var send: UIButton!
    var posttitle: String!
    var postedby: String!
    var postedbyimage: UIImage!
    var time: String!
    var commentsDelegate: UpdateCommentCount?
    @IBOutlet weak internal var actInd: UIActivityIndicatorView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // self.tabBarController?.tabBar.layer.zPosition = -1
        self.tabBarController?.tabBar.hidden = true
        self.tableView.delegate = self
        self.tableView.dataSource = self
        self.tableView.separatorStyle = UITableViewCellSeparatorStyle.None
        self.commentfield.delegate = self
        self.commentApi = CommentApi()
        self.comments = [CommentData]()
        
        //self.tabBarController!.tabBar.hidden = true
        if self.postID != nil && self.postID != ""{
            self.commentURL = "http://myish.com:\(port)/api/getcommentsbypostid?postid=\(self.postID)"
            self.commentApi.loadComments(self.commentURL, completion: didLoadComments)
        }
        
        keyboardFlag = false
        len = 0
        let colors = Colors()
        self.view.backgroundColor = UIColor.clearColor()
        let backgroundLayer = colors.gl
        backgroundLayer.frame = self.view.frame
        self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
        self.tableView.backgroundColor = UIColor.clearColor()
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("keyboardWillShow:"), name:UIKeyboardWillShowNotification, object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("keyboardWillHide:"), name:UIKeyboardWillHideNotification, object: nil)
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false
        
        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }
    
    override func viewWillAppear(animated: Bool) {
        //        if self.postID != nil && self.postID != ""{
        //            self.commentURL = "http://myish.com:3000/api/getcommentsbypostid?postid=\(self.postID)"
        //            self.commentApi.loadComments(self.commentURL, completion: didLoadComments)
        //        }
        
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "Comment Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
    }
    
    override func viewWillDisappear(animated: Bool) {
        commentsDelegate?.UpdateComments(self.comments.count)
    }
    func textFieldDidBeginEditing(textField: UITextField) {
        
        if keyboardFlag == false{
            len =  textField.frame.origin.y + textField.frame.size.height
            
        }
    }
    
    func textFieldDidEndEditing(textField: UITextField) {
        NSNotificationCenter.defaultCenter().postNotification(NSNotification(name: "keyboardWillHide:", object: self))
    }
    
    func textFieldShouldReturn(textField: UITextField) -> Bool {
        self.view.endEditing(true)
        return false
    }
    
    func keyboardWillShow(sender: NSNotification) {
        
        if keyboardFlag == false{
            let info = sender.userInfo!
            let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()
            
            if len > (self.view.frame.size.height - keyboardFrame.size.height){
                keyboardFlag = true
                self.view.frame.origin.y -= len - (self.view.frame.size.height - keyboardFrame.size.height) + 10
            }
            
        }
    }
    
    func keyboardWillHide(sender: NSNotification) {
        
        if keyboardFlag == true{
            let info = sender.userInfo!
            let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()
            keyboardFlag = false
            
            self.view.frame.origin.y += len - (self.view.frame.size.height - keyboardFrame.size.height) + 10
            len = 0
            
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    func didLoadComments(comments: Comments)
    {
        self.comments = comments.commentdata
        tableView.reloadData()
    }
    
    
    func didLoadCommentsAndShouldScrollToBottom(comments:Comments)
    {
        self.comments = comments.commentdata
        tableView.reloadData()
        tableView.scrollToRowAtIndexPath(NSIndexPath(forRow: self.comments.count, inSection: 0), atScrollPosition: .Bottom, animated: true)
    }
    
    // MARK: - Table view data source
    
    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return (self.comments.count + 1)
    }
    
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        
        if indexPath.row == 0{
            let cell = tableView.dequeueReusableCellWithIdentifier("postcell", forIndexPath: indexPath) as UITableViewCell
            
            let name = cell.viewWithTag(200) as! UILabel
            let comment = cell.viewWithTag(300) as! UILabel
            let imgButton = cell.viewWithTag(100) as! UIButton
            let timelabel = cell.viewWithTag(500) as! UILabel
            let imgview = cell.viewWithTag(502) as! UIImageView
            let commentscount = cell.viewWithTag(501) as! UILabel
            name.text = self.postedby
            comment.text = self.posttitle
            timelabel.text = self.time
            imgview.backgroundColor = UIColor.lightGrayColor()
            if self.comments.count == 1{
                commentscount.text = "\(self.comments.count) comment"
            }
            else{
                if self.comments.count == 0{
                    commentscount.text = "No comments"
                }
                else{
                    commentscount.text = "\(self.comments.count) comments"
                }
            }
            
            if self.postedbyimage != nil{
                self.postedbyimage = Utils.imageResize(self.postedbyimage, sizeChange: CGSize(width: 30, height: 30))
                imgButton.setImage(self.postedbyimage, forState: UIControlState.Normal)
                imgButton.setImage(Utils.imageResize(self.postedbyimage, sizeChange: CGSize(width: 30, height: 30)), forState: UIControlState.Normal)
                imgButton.layer.cornerRadius = (imgButton.imageView!.frame.size.width)/2
                imgButton.clipsToBounds = true
                imgButton.setTitle("", forState: UIControlState.Normal)
            }
            else{
                let profileImg = Utils.imageResize(UIImage(named: "Myish-circle-transparent")!, sizeChange: CGSize(width: 50, height: 50))
                //let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
                imgButton.setImage(profileImg, forState: UIControlState.Normal)
                imgButton.setImage(Utils.imageResize(profileImg as UIImage, sizeChange: CGSize(width: 50, height: 50)), forState: UIControlState.Normal)
                imgButton.layer.cornerRadius = (imgButton.imageView!.frame.size.width)/2
                imgButton.clipsToBounds = true
                imgButton.setTitle("", forState: UIControlState.Normal)
            }
            
            return cell
        }
        else{
            
            let cell = tableView.dequeueReusableCellWithIdentifier("commentcell", forIndexPath: indexPath) as! CommentViewCell
            
            cell.name.text = self.comments[indexPath.row - 1].username
            cell.comment.text = self.comments[indexPath.row - 1].usercomment
            cell.timeLabel.text = self.comments[indexPath.row - 1].timestamp
            //        cell.comment.layer.borderWidth = 1
            //        cell.comment.layer.borderColor = UIColor.lightGrayColor().CGColor
            //        cell.comment.layer.cornerRadius = 10
            
            if self.comments[indexPath.row - 1].userimageUrl != ""{
                
                var profileImg = imageCache[self.comments[indexPath.row - 1].userimageUrl]
                
                if profileImg != nil{
                    profileImg = Utils.imageResize(profileImg!, sizeChange: CGSize(width: 30, height: 30))
                    //let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
                    cell.imgButton.setImage(profileImg, forState: UIControlState.Normal)
                    cell.imgButton.setImage(Utils.imageResize(profileImg! as UIImage, sizeChange: CGSize(width: 30, height: 30)), forState: UIControlState.Normal)
                    cell.imgButton.layer.cornerRadius = (cell.imgButton.imageView!.frame.size.width)/2
                    cell.imgButton.clipsToBounds = true
                    cell.imgButton.setTitle("", forState: UIControlState.Normal)
                }
                    
                else{
                    
                    let nurl = NSURL(string: self.comments[indexPath.row - 1].userimageUrl)
                    self.comments[indexPath.row - 1].downloadProfileImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                        if (succeeded == true) && image != nil {
                            let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 30, height: 30))
                            cell.imgButton.setImage(image, forState: UIControlState.Normal)
                            cell.imgButton.setImage(Utils.imageResize(rimage as UIImage, sizeChange: CGSize(width: 30, height: 30)), forState: UIControlState.Normal)
                            cell.imgButton.layer.cornerRadius = (cell.imgButton.imageView!.frame.size.width)/2
                            cell.imgButton.clipsToBounds = true
                            cell.imgButton.setTitle("", forState: UIControlState.Normal)
                            
                        }
                        else {
                            
                        }
                    })
                    
                }
                
            }
            else{
                let profileImg = Utils.imageResize(UIImage(named: "Myish-circle-transparent")!, sizeChange: CGSize(width: 30, height: 30))
                //let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
                cell.imgButton.setImage(profileImg, forState: UIControlState.Normal)
                cell.imgButton.setImage(Utils.imageResize(profileImg as UIImage, sizeChange: CGSize(width: 30, height: 30)), forState: UIControlState.Normal)
                cell.imgButton.layer.cornerRadius = (cell.imgButton.imageView!.frame.size.width)/2
                cell.imgButton.clipsToBounds = true
                cell.imgButton.setTitle("", forState: UIControlState.Normal)
            }
            
            
            return cell
        }
    }
    
    func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        if indexPath.row == 0{
            return 121
        }
        else{
            return UITableViewAutomaticDimension
        }
        
    }
    
    func tableView(tableView: UITableView, estimatedHeightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        
        if indexPath.row == 0{
            return 121
        }
        else{
            return 60
        }
    }
    
    //    func imageResize(imageObj:UIImage, sizeChange:CGSize)-> UIImage {
    //
    //        let hasAlpha = false
    //        let scale: CGFloat = 0.0 // Automatically use scale factor of main screen
    //
    //        UIGraphicsBeginImageContextWithOptions(sizeChange, !hasAlpha, scale)
    //        imageObj.drawInRect(CGRect(origin: CGPointZero, size: sizeChange))
    //
    //        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
    //        UIGraphicsEndImageContext()
    //        return scaledImage
    //    }
    
    
    @IBAction func sendClicked(sender: UIButton) {
        
        
        //        self.comment = CommentData()
        //        comment.username = username
        //        comment.userimageUrl = userimageURL
        //        comment.usercomment = self.commentfield.text!
        self.view.endEditing(true)
        if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN())
        {
            
            
            let alert = UIAlertController(title: "No Internet Connection", message: "Please check your internet connection", preferredStyle: UIAlertControllerStyle.Alert)
            let okAction = UIAlertAction(title: "OK", style: .Default, handler: nil)
            alert.addAction(okAction)
            
            self.presentViewController(alert, animated: true, completion:nil)
            
        }
        else
        {
            //   self.view.endEditing(true)
            if self.commentfield.text != nil && self.commentfield.text != ""
            {
                
                post(["postid":self.postID, "comments":self.commentfield.text!, "postedbyid":userProfileID, "profilepictureURL":userimageURL, "username":username], url: "http://myish.com:\(port)/api/addcommentdetails")
                
               
                self.commentfield.text = ""
                
                
//                if self.postID != nil && self.postID != ""
//                {
//                    self.commentURL = "http://myish.com:\(port)/api/getcommentsbypostid?postid=\(self.postID)"
//                    print("http://myish.com:\(port)/api/getcommentsbypostid?postid=\(self.postID)")
//                    self.commentApi.loadComments(self.commentURL, completion: self.didLoadCommentsAndShouldScrollToBottom)
//                }
                
            }
        }
        
    }
    
    
    @IBAction func backButtonPressed(sender: UIButton)
    {
        //self.tabBarController!.tabBar.hidden = false
        self.navigationController?.popViewControllerAnimated(true)
    }
    
    
    
    
    func post(params : Dictionary<String, String>, url : String) {
        let request = NSMutableURLRequest(URL: NSURL(string: url)!)
        let session = NSURLSession.sharedSession()
        request.HTTPMethod = "POST"
        request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalCacheData
        
        if self.postID != nil && self.postID != ""
        {
           // self.actInd.startAnimating()
            self.commentURL = "http://myish.com:\(port)/api/getcommentsbypostid?postid=\(self.postID)"
            print("http://myish.com:\(port)/api/getcommentsbypostid?postid=\(self.postID)")
            self.commentApi.loadComments(self.commentURL, completion: self.didLoadCommentsAndShouldScrollToBottom)
            //self.actInd.stopAnimating()
        }
        
        
        
        
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
                
                
                //self.tableView.reloadData()
                //                userProfileID = strData as! String
                //                let vc : AnyObject! = self.storyboard!.instantiateViewControllerWithIdentifier("TabBarController")
                //                self.navigationController?.pushViewController(vc as! UIViewController, animated: true)
                print("Body: \(strData!)")
                
            }
            else {
                print("Error: \(error?.localizedDescription)")
                let alertController = UIAlertController(title: "Unable to add comment !!", message: "Please try again !!", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    print("you have pressed OK button", terminator: "");
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
            
        })
        
        task.resume()
    }

    
    
}
