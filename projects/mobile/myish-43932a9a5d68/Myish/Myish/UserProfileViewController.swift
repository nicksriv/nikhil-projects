//
//  ProfileViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 10/13/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit
var userNmae:String!

class UserProfileViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    
    
    
    @IBOutlet var posts: UIButton!
    
    @IBOutlet var grid: UIButton!
    
    @IBOutlet var options: UIButton!
    
    @IBOutlet var status: UILabel!
    
    @IBOutlet var followers: UIButton!
    
    @IBOutlet var snapshotImage: UIButton!
    
    @IBOutlet var following: UIButton!
    
    @IBOutlet var settings: UIButton!
    
    @IBOutlet var followButton: UIButton!
    
    //@IBOutlet var postImage: UIImageView!
    
    @IBOutlet var nameLabel: UILabel!
    //@IBOutlet var navBar: UINavigationBar!
    @IBOutlet var tableview: UITableView!
    var followflag: Bool!
    
    @IBOutlet weak var lblFollowers: UILabel!
    
    @IBOutlet weak var lblFollowing: UILabel!

    @IBOutlet weak var actInd: UIActivityIndicatorView!
    var follower: Follower!
    var followingUsers: Following!
    var profileApi: ProfileApi!
    var profile: ProfileData!
    var profileID: String!
    var flag: Bool!
    //var postApi: PostApi!
    //var nayApi: YayNayApi!
    //var posts: [Posts]!
    //var post: [Post]!
    // var nays: [YayNayData]!
    //var profilename: String!
    //var profileImageURL: String!
    var postTag: Int!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    
        self.posts.hidden = true
        self.grid.hidden = true
        self.options.hidden = true
        self.status.hidden = true
        self.followers.hidden = true
        self.followers.userInteractionEnabled = false
        self.following.hidden = true
        self.following.userInteractionEnabled = false
        self.nameLabel.hidden = true
        //self.postImage.hidden = true
        self.snapshotImage.hidden = true
        self.followButton.backgroundColor = UIColor.clearColor()
        self.followButton.backgroundColor = UIColor(red: 255.0/255.0, green: 90.0/255.0, blue: 52.0/255.0, alpha: 1.0)
        self.followButton.hidden = true
        self.settings.hidden = true
        self.tableview.hidden = true
        self.flag = true
        self.profileApi = ProfileApi()
        self.profile = ProfileData()
        self.grid.imageView?.image = self.imageResize(UIImage(named: "Menu")!, sizeChange: CGSize(width: 20, height: 20))
        self.grid.imageView?.image = self.imageResize(UIImage(named: "Feed-blue-dark")!, sizeChange: CGSize(width: 20, height: 20))
        self.settings.setImage(UIImage(named: "Settings"), forState: UIControlState.Normal)
        self.grid.setImage(UIImage(named: "Menu"), forState: UIControlState.Normal)
        
        //self.options.imageView!.image = UIImage(named: "feedwhite")
        self.options.setImage(UIImage(named: "Feed-blue-dark"), forState: UIControlState.Normal)
        //self.posts.addRightBar(2, color: UIColor.whiteColor())
        self.posts.userInteractionEnabled = false
        let colors = Colors()
        self.view.backgroundColor = UIColor.clearColor()
        let backgroundLayer = colors.gl
        backgroundLayer.frame = self.view.frame
        self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
        
        //self.followButton.imageView!.bounds.size = CGSize(width: self.followButton.imageView!.image!.size.width - 100, height: self.followButton.imageView!.image!.size.height)
        self.followButton.setImage(imageResize(UIImage(named: "Follow-button-transparent")!, sizeChange: (CGSize(width: self.followButton.imageView!.image!.size.width - 100, height: self.followButton.imageView!.image!.size.height))), forState: UIControlState.Normal)
        self.followers.titleLabel?.font = UIFont(name: "Roboto-Regular", size: 15.0)
        self.following.titleLabel?.font = UIFont(name: "Roboto-Regular", size: 15.0)
        self.posts.titleLabel?.font = UIFont(name: "Roboto-Regular", size: 15.0)
        self.status.font = UIFont(name: "Roboto-Regular", size: 15.0)
        
        self.tableview.delegate = self
        self.tableview.dataSource = self
        self.tableview.backgroundColor = UIColor.clearColor()
        self.postTag = 0
        
        
    }
    
    override func viewWillAppear(animated: Bool) {
        
        
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "UserProfile Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
        
        if self.profileID != nil && self.profileID != ""{
            self.posts.hidden = true
            self.grid.hidden = true
            self.options.hidden = true
            self.status.hidden = true
            self.followers.hidden = true
            self.following.hidden = true
            userNmae = self.nameLabel.text!
            self.nameLabel.hidden = true
            //self.flag = true
            self.snapshotImage.hidden = true
            self.followButton.backgroundColor = UIColor.clearColor()
            self.followButton.hidden = true
            self.settings.hidden = true
            self.tableview.hidden = true
            self.actInd.startAnimating()
            self.ProfileReload("http://myish.com:\(port)/api/finduser?userid=\(self.profileID)")
        }
        else{
            let alertController = UIAlertController(title: "User unavailable !!", message: "Please try again later!!", preferredStyle: UIAlertControllerStyle.Alert)
            
            
            let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                print("you have pressed OK button", terminator: "");
                
            }
            alertController.addAction(OKAction)
            
            self.presentViewController(alertController, animated: true, completion:nil)
        }
    }
    
    func ProfileReload(url: String){
        
        self.profileApi.loadProfile(url, completion: didLoadProfile)
        
    }
    
    func didLoadProfile(profile: ProfileData){
        
        self.profile = profile
        
        if self.profile != nil{
        self.checkProfile("http://myish.com:\(port)/api/isfollowing?userid=\(userProfileID)&referenceid=\(self.profileID)", completion: followButtonHide)
        self.follower = Follower(data: self.profile.followers)
        self.followingUsers = Following(data: self.profile.following)
//        self.following.setTitle("\(self.profile.followingcount) following", forState: UIControlState.Normal)
//        self.followers.setTitle("\(self.profile.followerscount) followers", forState: UIControlState.Normal)
            self.lblFollowers.text = "\(self.profile.followerscount) followers"
            self.lblFollowing.text = "\(self.profile.followingcount) following"
            
        self.nameLabel.text = self.profile.title
        //self.navBar.topItem?.title = self.profile.title
        if self.profile.aboutme != nil{
            
            self.status.text = self.profile.aboutme
            
        }
        else {
            self.status.text = ""
            }
        
        //self.status.text = self.profile.postnames[0]
        self.followButton.addUserBottomBar(2, color: UIColor.whiteColor())
        self.followButton.addUserBottomRightBar(2, color: UIColor.whiteColor())
        self.followButton.addUserBottomRightBar2(2, color: UIColor.whiteColor())
        self.followButton.addUserTopBar(2, color: UIColor.whiteColor())
        self.posts.setTitle("\(self.profile.postscount) posts", forState: UIControlState.Normal)
        
         if self.profile.imageURL != ""{
        
        var profileImg = imageCache[self.profile.imageURL!]
        
        if profileImg != nil{
            profileImg = Utils.imageResize(profileImg!, sizeChange: CGSize(width: 80, height: 80))
            //let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
            self.snapshotImage.setImage(profileImg, forState: UIControlState.Normal)
            self.snapshotImage.setImage(Utils.imageResize(profileImg! as UIImage, sizeChange: CGSize(width: 80, height: 80)), forState: UIControlState.Normal)
            self.snapshotImage.layer.cornerRadius = (self.snapshotImage.imageView!.frame.size.width)/2
            self.snapshotImage.clipsToBounds = true
            self.snapshotImage.setTitle("", forState: UIControlState.Normal)
        }
            
        else{
            
            let nurl = NSURL(string: self.profile.imageURL!)
            self.profile.downloadProfileImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                if (succeeded == true) && image != nil {
                    let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 80, height: 80))
                    self.snapshotImage.setImage(image, forState: UIControlState.Normal)
                    self.snapshotImage.setImage(Utils.imageResize(rimage as UIImage, sizeChange: CGSize(width: 80, height: 80)), forState: UIControlState.Normal)
                    self.snapshotImage.layer.cornerRadius = (self.snapshotImage.imageView!.frame.size.width)/2
                    self.snapshotImage.clipsToBounds = true
                    self.snapshotImage.setTitle("", forState: UIControlState.Normal)
                    
                }
                else {
                    let profileImg = Utils.imageResize(UIImage(named: "Myish-circle-transparent")!, sizeChange: CGSize(width: 80, height: 80))
                    //let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
                    self.snapshotImage.setImage(profileImg, forState: UIControlState.Normal)
                    self.snapshotImage.setImage(Utils.imageResize(profileImg as UIImage, sizeChange: CGSize(width: 80, height: 80)), forState: UIControlState.Normal)
                    self.snapshotImage.layer.cornerRadius = (self.snapshotImage.imageView!.frame.size.width)/2
                    self.snapshotImage.clipsToBounds = true
                    self.snapshotImage.setTitle("", forState: UIControlState.Normal)
                }
            })
            
        }
        
         }
         else{
            let profileImg = Utils.imageResize(UIImage(named: "Myish-circle-transparent")!, sizeChange: CGSize(width: 80, height: 80))
            //let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
            self.snapshotImage.setImage(profileImg, forState: UIControlState.Normal)
            self.snapshotImage.setImage(Utils.imageResize(profileImg as UIImage, sizeChange: CGSize(width: 80, height: 80)), forState: UIControlState.Normal)
            self.snapshotImage.layer.cornerRadius = (self.snapshotImage.imageView!.frame.size.width)/2
            self.snapshotImage.clipsToBounds = true
            self.snapshotImage.setTitle("", forState: UIControlState.Normal)
            }
        
//        if self.profile.postimageUrls != ""{
//        
//        var postImg = imageCache[self.profile.postimageUrls]
//        
//        if postImg != nil{
//            postImg = self.imageResize(postImg!, sizeChange: CGSize(width: 250, height: 250))
//            self.postImage.image = postImg
//            self.postImage.layer.cornerRadius = 10
//            self.postImage.clipsToBounds = true
//            
//        }
//            
//        else{
//            
//            let nurl = NSURL(string: self.profile.postimageUrls)
//            self.profile.downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
//                if (succeeded == true) {
//                    let rimage = self.imageResize(image!, sizeChange: CGSize(width: 250, height: 250))
//                    self.postImage.image =  rimage
//                    self.postImage.layer.cornerRadius = 10
//                    self.postImage.clipsToBounds = true
//                    
//                }
//                else {
//                    
//                }
//            })
//            
//        }
//        
//        
//        }
        self.actInd.stopAnimating()
        self.posts.hidden = false
        self.grid.hidden = false
        self.options.hidden = false
        self.status.hidden = false
        self.followers.hidden = false
      //self.followers.hidden = true
        self.following.hidden = false
       //self.following.hidden = true
        self.nameLabel.hidden = false
        //self.postImage.hidden = false
        self.snapshotImage.hidden = false
        //self.followButton.hidden = false
        self.settings.hidden = true
            if self.profile.postsData.count > 0{
                self.tableview.hidden = false
                self.tableview.reloadData()
            }
    }
    
    }
    
    
    @IBAction func backButtonPressed(sender: UIButton) {
         self.navigationController?.popViewControllerAnimated(true)
        
    }
    
    @IBAction func followClicked(sender: UIButton) {
        
        if self.followflag == true{
//            sender.setImage(imageResize(UIImage(named: "Follow-button-transparent")!, sizeChange: sender.imageView!.image!.size), forState: UIControlState.Normal)
//            sender.imageView!.backgroundColor = UIColor.clearColor()
//            self.followflag = false
            self.followPressed(true)
        }
        else{
            sender.setImage(imageResize(UIImage(named: "Following")!, sizeChange: sender.imageView!.image!.size), forState: UIControlState.Normal)
            sender.imageView!.backgroundColor = UIColor.clearColor()
            self.followflag = true
            self.followPressed(false)
        }
    }
    
    @IBAction func gridpressed(sender: UIButton) {
       self.flag = true
        self.grid.setImage(UIImage(named: "Menu"), forState: UIControlState.Normal)
        //self.options.imageView!.image = UIImage(named: "feedwhite")
        self.options.setImage(UIImage(named: "Feed-blue-dark"), forState: UIControlState.Normal)
        self.tableview.reloadData()
    
    }
    
    @IBAction func seriespressed(sender: UIButton) {
        self.flag = false
        self.grid.setImage(UIImage(named: "gridblue"), forState: UIControlState.Normal)
        //self.options.imageView!.image = UIImage(named: "feedwhite")
        self.options.setImage(UIImage(named: "feedwhite"), forState: UIControlState.Normal)
        self.tableview.reloadData()
    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        
    }
    
    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        
        if self.flag == true{
            var rows: Double = 0
            
            if self.profile.postsData.count > 0{
                rows = Double(self.profile.postsData.count)/3.0
            }
            
            if rows == 0{
                return 1
            }
            else{
                
                return Int(ceil(rows))
            }
        }
        else{
            return self.profile.postsData.count
        }
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    func imageResize(imageObj:UIImage, sizeChange:CGSize)-> UIImage {
        
        let hasAlpha = true
        let scale: CGFloat = 0.0
        
        UIGraphicsBeginImageContextWithOptions(sizeChange, !hasAlpha, scale)
        imageObj.drawInRect(CGRect(origin: CGPointZero, size: sizeChange))
        
        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return scaledImage
    }
    
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        
        if self.flag == true{
            let cell = tableView.dequeueReusableCellWithIdentifier("gridviewcell", forIndexPath: indexPath) as! GridUserViewCell
            
            //cell.backgroundColor = UIColor.clearColor()
            var userposts = [Posts]()
            
            userposts = self.profile.postsData
            //userposts = userposts.reverse()
            
            
            if userposts.count > 0{
                
                if (3*indexPath.section) < userposts.count{
                    
                    cell.lbl1.hidden = false
                    cell.img1.hidden = false
                    
                    let tapGestureRecognizer4 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                    let tapGestureRecognizer7 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                    
                    cell.img1.userInteractionEnabled = true
                    cell.img1.addGestureRecognizer(tapGestureRecognizer4)
                    tapGestureRecognizer4.view!.tag = 3*indexPath.section
                    
                    cell.lbl1.userInteractionEnabled = true
                    cell.lbl1.addGestureRecognizer(tapGestureRecognizer7)
                    tapGestureRecognizer7.view!.tag = 3*indexPath.section
                    
                    cell.lbl1.setBackgroundImage(UIImage(named: "pyramid3"), forState: UIControlState.Normal)
                    cell.lbl1.setTitle(userposts[(3*indexPath.section)].postname, forState: UIControlState.Normal)
                    
                    let searchImg1 = imageCache[userposts[(3*indexPath.section)].postimage!]
                    
                    if searchImg1 != nil{
                        cell.img1.image = searchImg1
                    }
                        
                    else{
                        //img = UIImage(named: "whitebkg")
                        let nurl = NSURL(string: userposts[(3*indexPath.section)].postimage!)
                        //cell.ActInd.startAnimating()
                        userposts[(3*indexPath.section)].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                            if (succeeded == true) && image != nil {
                                cell.img1.image = image
                                
                            }
                            else {
                                
                            }
                        })
                        
                    }
                }
                else{
                    cell.lbl1.hidden = true
                    cell.img1.hidden = true
                }
                
                if (3*indexPath.section + 1) < userposts.count{
                    
                    cell.lbl2.hidden = false
                    cell.img2.hidden = false
                    
                    let tapGestureRecognizer5 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                    let tapGestureRecognizer8 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                    
                    cell.img2.userInteractionEnabled = true
                    cell.img2.addGestureRecognizer(tapGestureRecognizer5)
                    tapGestureRecognizer5.view!.tag = 3*indexPath.section + 1
                    
                    cell.lbl2.userInteractionEnabled = true
                    cell.lbl2.addGestureRecognizer(tapGestureRecognizer8)
                    tapGestureRecognizer8.view!.tag = 3*indexPath.section + 1
                    
                    cell.lbl2.setBackgroundImage(UIImage(named: "pyramid3"), forState: UIControlState.Normal)
                    cell.lbl2.setTitle(userposts[(3*indexPath.section + 1)].postname, forState: UIControlState.Normal)
                    
                    let searchImg2 = imageCache[userposts[(3*indexPath.section + 1)].postimage!]
                    
                    if searchImg2 != nil{
                        cell.img2.image = searchImg2
                    }
                        
                    else{
                        //img = UIImage(named: "whitebkg")
                        let nurl = NSURL(string: userposts[(3*indexPath.section + 1)].postimage!)
                        //cell.ActInd.startAnimating()
                        userposts[(3*indexPath.section + 1)].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                            if (succeeded == true) && image != nil {
                                // println("AD image loaded")
                                cell.img2.image = image
                                
                            }
                            else {
                                //println("AD image didnt load")
                            }
                        })
                        
                    }
                }
                else{
                    cell.lbl2.hidden = true
                    cell.img2.hidden = true
                }
                
                if (3*indexPath.section + 2) < userposts.count{
                    
                    cell.lbl3.hidden = false
                    cell.img3.hidden = false
                    
                    let tapGestureRecognizer6 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                    let tapGestureRecognizer9 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                    
                    cell.img3.userInteractionEnabled = true
                    cell.img3.addGestureRecognizer(tapGestureRecognizer6)
                    tapGestureRecognizer6.view!.tag = 3*indexPath.section + 2
                    
                    cell.lbl3.userInteractionEnabled = true
                    cell.lbl3.addGestureRecognizer(tapGestureRecognizer9)
                    tapGestureRecognizer9.view!.tag = 3*indexPath.section + 2
                    
                    cell.lbl3.setBackgroundImage(UIImage(named: "pyramid3"), forState: UIControlState.Normal)
                    cell.lbl3.setTitle(userposts[(3*indexPath.section + 2)].postname, forState: UIControlState.Normal)
                    
                    let searchImg3 = imageCache[userposts[(3*indexPath.section + 2)].postimage!]
                    
                    if searchImg3 != nil{
                        cell.img3.image = searchImg3
                    }
                        
                    else{
                        //img = UIImage(named: "whitebkg")
                        let nurl = NSURL(string: userposts[(3*indexPath.section + 2)].postimage!)
                        //cell.ActInd.startAnimating()
                        userposts[(3*indexPath.section + 2)].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                            if (succeeded == true) && image != nil{
                                // println("AD image loaded")
                                cell.img3.image = image
                                
                            }
                            else {
                                //println("AD image didnt load")
                            }
                        })
                        
                    }
                    
                }
                else{
                    cell.lbl3.hidden = true
                    cell.img3.hidden = true
                }
                
            }
            else{
                cell.lbl1.hidden = true
                cell.lbl2.hidden = true
                cell.lbl3.hidden = true
                cell.img1.hidden = true
                cell.img2.hidden = true
                cell.img3.hidden = true
            }
            return cell
            
        }
        else{
            let cell = tableView.dequeueReusableCellWithIdentifier("tilecell", forIndexPath: indexPath) as! TileViewCell
            
            cell.backgroundColor = UIColor.whiteColor()
            var userposts = [Posts]()
            
            userposts = self.profile.postsData
            //userposts = userposts.reverse()
            
            let tapGestureRecognizer7 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
            let tapGestureRecognizer10 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
            
            cell.img1.userInteractionEnabled = true
            cell.img1.addGestureRecognizer(tapGestureRecognizer7)
            tapGestureRecognizer7.view!.tag = indexPath.section
            
            cell.lbl1.userInteractionEnabled = true
            cell.lbl1.addGestureRecognizer(tapGestureRecognizer10)
            tapGestureRecognizer10.view!.tag = indexPath.section
            
            cell.lbl1.text = userposts[indexPath.section].postname
            
            let searchImg3 = imageCache[userposts[indexPath.section].postimage!]
            
            if searchImg3 != nil{
                cell.img1.image = searchImg3
            }
                
            else{
                //img = UIImage(named: "whitebkg")
                let nurl = NSURL(string: userposts[indexPath.section].postimage!)
                //cell.ActInd.startAnimating()
                userposts[indexPath.section].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                    if (succeeded == true) && image != nil{
                        // println("AD image loaded")
                        cell.img1.image = image
                        
                    }
                    else {
                        //println("AD image didnt load")
                    }
                })
                
            }
            
            
            
            return cell
        }
        
    }
    
    func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        
        if self.flag == true{
            return  UITableViewAutomaticDimension
            
        }
        else{
            return 375
        }
    }
    
    func tableView(tableView: UITableView, estimatedHeightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        if self.flag == true{
            return  200
            
        }
        else{
            return 375
        }
    }
    
    func Tapped4(img: AnyObject)
    {
        self.postTag = img.view!.tag
        performSegueWithIdentifier("userpost", sender: img)
        
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
       
        if segue.identifier == "followerUser"{
            
            if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN())
            {
                let alertController = UIAlertController(title: "Followers Unreachable!!", message: "No Internet Connection.", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    
                    // self.actInd.stopAnimating()
                    //self.navigationController?.popToRootViewControllerAnimated(true)
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
            else
            {
            
            let followers = segue.destinationViewController as! FollowViewController
            followers.navTitle = "Followers"
            followers.followName = self.follower.followernames
            followers.followImgUrl = self.follower.followerimageUrls
            followers.followID = self.follower.followerID
            var follow = [Bool]()
            var ind = 0
            for ind = 0; ind < followers.followID.count; ++ind{
                if self.followingUsers.followingID.contains(followers.followID[ind]){
                    follow.append(true)
                }
                else{
                    follow.append(false)
                }
            }
            
            followers.follow = follow
            }
            
        }
        if segue.identifier == "followingUser"{
            if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN())
            {
                let alertController = UIAlertController(title: "Follower Unreachable!!", message: "No Internet Connection.", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    
                    // self.actInd.stopAnimating()
                    //self.navigationController?.popToRootViewControllerAnimated(true)
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }else
            {
            
            let following = segue.destinationViewController as! FollowViewController
            following.navTitle = "Following"
            following.followID = self.followingUsers.followingID
            following.followName = self.followingUsers.followingnames
            following.followImgUrl = self.followingUsers.followingimageUrls
            var follow = [Bool]()
            var ind = 0
            for ind = 0; ind < following.followID.count; ++ind{
                
                follow.append(true)
                
            }
            
            following.follow = follow
            }
            
        }
        
        if segue.identifier == "userpost"{
            if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN())
            {
                let alertController = UIAlertController(title: "Posts Unreachable!!", message: "No Internet Connection.", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    
                    // self.actInd.stopAnimating()
                    //self.navigationController?.popToRootViewControllerAnimated(true)
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
            else
            {
            let postCard = CardData()
            postCard.profileName = username
            postCard.profileImageURL = userimageURL
            if self.postTag != 0{
                postCard.id = self.profile.postsData[self.postTag].postid
            }
            let posts = segue.destinationViewController as! PostViewController
            posts.cards = postCard
            }
        }
        
        if segue.identifier == "settings"{
            let posts = segue.destinationViewController as! SettingsViewController
            
            
        }
        
    }
    
    func followButtonHide(isFollowing: Bool){
        if isFollowing == true{
            self.followButton.setImage(imageResize(UIImage(named: "Following")!, sizeChange: (self.followButton.imageView!.bounds.size)), forState: UIControlState.Normal)
            // self.followButton.setImage(UIImage(named: "Following"), forState: UIControlState.Normal)
            self.followButton.imageView!.backgroundColor = UIColor.clearColor()
            self.followflag = true
           
        }
        else{
            self.followButton.setImage(imageResize(UIImage(named: "Follow-button-transparent")!, sizeChange: (self.followButton.imageView!.bounds.size)), forState: UIControlState.Normal)
            //self.followButton.setImage(UIImage(named: "Follow-button-transparent"), forState: UIControlState.Normal)
            self.followButton.imageView!.backgroundColor = UIColor.clearColor()
            self.followflag = false
            
        }
        self.followButton.hidden = false
    }
    
    func checkProfile(Url: String, completion: ((Bool) -> Void)!){
        
        let urlString = Url
        var isFollowing = false
        
        print("NSURLSession: \(urlString)")
        let session = NSURLSession.sharedSession()
        let profileUrl = NSURL(string: urlString)
        
        let task = session.dataTaskWithURL(profileUrl!){
            
            (data, response, error) -> Void in
            
            if error != nil {
                
                print(error!.description)
                print(error!.localizedDescription)
            } else {
                
                print("Begin Serialization: ")
                print(data!.length)
                
                
                let profileDataArray = try! NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.MutableContainers) as! Array<NSDictionary>
                
                for var ind = 0; ind < profileDataArray.count; ++ind{
                    
                //if profileDataArray[ind]
                    if let followingarr = profileDataArray[ind]["following"]{

                        if let followingperson: Array<NSDictionary> = followingarr as? Array<NSDictionary>{
                            
                            if followingperson.count > 0{
                                isFollowing = true
                            }
                            else{
                                isFollowing = false
                            }
                        }
                       

                }
                
                }
                
                let priority = DISPATCH_QUEUE_PRIORITY_DEFAULT
                dispatch_async(dispatch_get_global_queue(priority, 0)) {
                    dispatch_async(dispatch_get_main_queue()) {
                        
                        completion(isFollowing)
                    }
                }
                
            }
        }
        
        task.resume()
        
    }
    
    func followPressed(follows: Bool) {
        if follows == true{
            let actionSheetController: UIAlertController = UIAlertController(title: "Unfollow \(self.profile.title!)", message: nil, preferredStyle: UIAlertControllerStyle.ActionSheet)
            
            let choosePictureAction: UIAlertAction = UIAlertAction(title: "Unfollow", style: UIAlertActionStyle.Destructive)
                { action -> Void in
                    let gurl = NSURL(string: "http://www.google.com")
                    if (self.isConnectedToNetwork(gurl!) == true){
                        self.post(["userid":self.profileID, "followerid":userProfileID], url: "http://myish.com:\(port)/api/removefollower", isfollow: true)
                        self.post(["userid":userProfileID, "followingid":self.profileID], url: "http://myish.com:\(port)/api/removefollowing", isfollow: true)
                        self.followButton.setImage(self.imageResize(UIImage(named: "Follow-button-transparent")!, sizeChange: self.followButton.imageView!.image!.size), forState: UIControlState.Normal)
                        self.followButton.imageView!.backgroundColor = UIColor.clearColor()
                        self.followflag = false
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
            let gurl = NSURL(string: "http://www.google.com")
            if (self.isConnectedToNetwork(gurl!) == true){
            post(["userid":self.profileID, "followerid":userProfileID, "followerusername":username, "followerprofilepictureURL":userimageURL], url: "http://myish.com:\(port)/api/addfollower", isfollow: false)
            post(["userid":userProfileID, "followingid":self.profileID, "followingusername":self.profile.title!, "followingprofilepictureURL":self.profile.imageURL!], url: "http://myish.com:\(port)/api/addfollowing", isfollow: false)
            }
        }
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
    
    func post(params : Dictionary<String, String>, url : String, isfollow: Bool!) {
        //var success = true
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

            if error == nil{
                let strData = NSString(data: data!, encoding: NSUTF8StringEncoding)
                
            }
            else {
                print("Error: \(error?.localizedDescription)")
                let alertController = UIAlertController(title: "Unable to process the request !!", message: "Please try again !!", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    print("you have pressed OK button", terminator: "");
                    if isfollow == true{
                    self.followButton.setImage(self.imageResize(UIImage(named: "Following")!, sizeChange: self.followButton.imageView!.image!.size), forState: UIControlState.Normal)
                    self.followButton.imageView!.backgroundColor = UIColor.clearColor()
                    self.followflag = true
                    }
                    else{
                        self.followButton.setImage(self.imageResize(UIImage(named: "Follow-button-transparent")!, sizeChange: self.followButton.imageView!.image!.size), forState: UIControlState.Normal)
                        self.followButton.imageView!.backgroundColor = UIColor.clearColor()
                        self.followflag = false
                    }
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
            
        })
        
        task.resume()
    }
    
  
    
//    func scrollViewDidScroll(scrollView: UIScrollView)
//     {
//        infoview.hidden = true
////        var dummyViewHeight: CGFloat = 180
////        var dummyView: UIView = UIView(frame: CGRectMake(0, 0, self.tableview.bounds.size.width, dummyViewHeight))
////        self.tableview.tableHeaderView = dummyView
////        self.tableview.contentInset = UIEdgeInsetsMake(-dummyViewHeight, 0, 0, 0)
//
//    }//

    
    
//    func scrollViewWillBeginDragging(scrollView: UIScrollView)
//    {
//        var sectionHeaderHeight: CGFloat = 176
//        if scrollView.contentOffset.y <= sectionHeaderHeight && scrollView.contentOffset.y >= 0
//        {
//            scrollView.contentInset = UIEdgeInsetsMake(-scrollView.contentOffset.y, 0, 0, 0)
//        }
//        else if scrollView.contentOffset.y >= sectionHeaderHeight
//        {
//            scrollView.contentInset = UIEdgeInsetsMake(-sectionHeaderHeight, 0, 0, 0)
//        }
//
//    }
    
    
}
