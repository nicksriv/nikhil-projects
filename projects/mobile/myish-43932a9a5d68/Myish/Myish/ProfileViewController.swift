//
//  ProfileViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 10/13/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit


class ProfileViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {

  
    
    @IBOutlet var posts: UIButton!
    
    @IBOutlet var grid: UIButton!
    
    @IBOutlet var options: UIButton!
    
    @IBOutlet var status: UILabel!
    
    @IBOutlet var followers: UIButton!
    
    @IBOutlet var snapshotImage: UIButton!
    
    @IBOutlet var following: UIButton!
    
    @IBOutlet var settings: UIButton!
    
    @IBOutlet weak var profileName: UILabel!
    
    //@IBOutlet var postImage: UIImageView!
    
    @IBOutlet var yaysnays: UIButton!
   // @IBOutlet var navBar: UINavigationBar!
    
    
    @IBOutlet weak var lblFollowers: UILabel!
    
    
    @IBOutlet weak var lblFollowing: UILabel!
    
    @IBOutlet weak var actInd: UIActivityIndicatorView!
    @IBOutlet var tableView: UITableView!
    var follower: Follower!
    var followingUsers: Following!
    var profileApi: ProfileApi!
    var profile: ProfileData!
    var flag: Bool!
    var postApi: PostApi!
    //var nayApi: YayNayApi!
    var postsArray: [Posts]!
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
        self.following.hidden = true
        self.profileName.hidden = true
        
        //self.postImage.hidden = true
        self.yaysnays.hidden = true
        self.snapshotImage.hidden = true
        self.tableView.delegate = self
        self.tableView.dataSource = self
        self.tableView.hidden = true
        self.posts.userInteractionEnabled = false
        self.flag = true
        //self.view.hidden = true
        self.profileApi = ProfileApi()
        //self.follower = Follower()
        //self.followingUsers = Following()
        self.profile = ProfileData()
        //self.view.backgroundColor = UIColor(red: 0.22, green: 0.39, blue: 0.55, alpha: 1.0)
        let colors = Colors()
        self.view.backgroundColor = UIColor.clearColor()
        let backgroundLayer = colors.gl
        backgroundLayer.frame = self.view.frame
        self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
        self.tableView.backgroundColor = UIColor.clearColor()
        self.postTag = -1
        //self.navBar.backgroundColor = UIColor.clearColor()
        //self.navBar.barTintColor = UIColor.clearColor()
        //self.navBar.tintColor = UIColor(red: 0.4078, green: 0.7098, blue: 1.0, alpha: 1.0)
        //self.grid.imageView?.image = self.imageResize(UIImage(named: "Menu")!, sizeChange: CGSize(width: 20, height: 20))
        //self.grid.imageView?.image = self.imageResize(UIImage(named: "Feed-blue-dark")!, sizeChange: CGSize(width: 20, height: 20))
        self.settings.setImage(UIImage(named: "Settings"), forState: UIControlState.Normal)
        self.grid.setImage(UIImage(named: "Menu"), forState: UIControlState.Normal)
        //self.options.imageView!.image = UIImage(named: "feedwhite")
        self.options.setImage(UIImage(named: "Feed-blue-dark"), forState: UIControlState.Normal)
        //self.posts.addRightBar(2, color: UIColor.whiteColor())
        //self.grid.addRightBar(2, color: UIColor.whiteColor())
        //if userProfileID != ""{
        //self.ProfileReload("http://myish.com:3000/api/finduser?userid=\(userProfileID)")
        //}
        self.followers.titleLabel!.font = UIFont(name: "Roboto-Regular", size: 15.0)
        self.following.titleLabel!.font = UIFont(name: "Roboto-Regular", size: 15.0)
        self.posts.titleLabel!.font = UIFont(name: "Roboto-Regular", size: 15.0)
        self.status.font = UIFont(name: "Roboto-Regular", size: 15.0)
    }
    
    override func viewWillAppear(animated: Bool) {
       // print(self.profileName.text)
        
        if userProfileID != ""{
            self.actInd.startAnimating()
            self.ProfileReload("http://myish.com:\(port)/api/finduser?userid=\(userProfileID)")
          // print("http://myish.com:\(port)/api/finduser?userid=\(userProfileID)")
        }
        
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "MyProfile Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    func ProfileReload(url: String){
        
        self.profileApi.loadProfile(url, completion: didLoadProfile)
        
    }
    
    func didLoadProfile(profile: ProfileData){
        
        self.profile = profile
        if self.profile != nil{
        
        self.follower = Follower(data: self.profile.followers)
        self.followingUsers = Following(data: self.profile.following)
//        self.following.setTitle("\(self.profile.followingcount) following", forState: UIControlState.Normal)
//        self.followers.setTitle("\(self.profile.followerscount) followers", forState: UIControlState.Normal)
            self.lblFollowing.text = "\(self.profile.followingcount) following"
            self.lblFollowers.text = "\(self.profile.followerscount) followers"
    
        //self.navBar.topItem?.title = self.profile.title
        self.profileName.text = self.profile.title
            if self.profile.aboutme != nil{
                
                self.status.text = self.profile.aboutme
                
            }
            else {
                self.status.text = ""
            }

        self.status.addBottomBar(2, color: UIColor.whiteColor())
        self.status.addBottomRightBar(2, color: UIColor.whiteColor())
        self.status.addBottomRightBar2(2, color: UIColor.whiteColor())
        self.status.addTopBar(2, color: UIColor.whiteColor())
        self.posts.setTitle("\(self.profile.postscount) posts", forState: UIControlState.Normal)
        
        if self.profile.imageURL != ""{
        
        var profileImg = imageCache[self.profile.imageURL!]
        
        if profileImg != nil{
            profileImg = self.imageResize(profileImg!, sizeChange: CGSize(width: 80, height: 80))
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
                    let rimage = self.imageResize(image!, sizeChange: CGSize(width: 80, height: 80))
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
            else if userimageURL != ""{
            var profileImg = imageCache[userimageURL]
            
            if profileImg != nil{
                profileImg = self.imageResize(profileImg!, sizeChange: CGSize(width: 80, height: 80))
                self.snapshotImage.setImage(profileImg, forState: UIControlState.Normal)
                self.snapshotImage.setImage(Utils.imageResize(profileImg! as UIImage, sizeChange: CGSize(width: 80, height: 80)), forState: UIControlState.Normal)
                self.snapshotImage.layer.cornerRadius = (self.snapshotImage.imageView!.frame.size.width)/2
                self.snapshotImage.clipsToBounds = true
                self.snapshotImage.setTitle("", forState: UIControlState.Normal)
                
                
            }
                
            else{
                
                let nurl = NSURL(string: userimageURL)
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

        self.actInd.stopAnimating()
        self.posts.hidden = false
        self.grid.hidden = false
        self.options.hidden = false
        self.status.hidden = false
        self.followers.hidden = false
        self.following.hidden = false
        self.profileName.hidden = false
        //self.postImage.hidden = false
        self.yaysnays.hidden = false
        self.snapshotImage.hidden = false
         
            if self.profile.postsData.count > 0{
                self.tableView.hidden = false
                self.tableView.reloadData()
            }
        
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
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func seriesPressed(sender: UIButton) {
        self.flag = false
        self.grid.setImage(UIImage(named: "gridblue"), forState: UIControlState.Normal)
        
        self.options.setImage(UIImage(named: "feedwhite"), forState: UIControlState.Normal)
        self.tableView.reloadData()
    }

    @IBAction func gridPressed(sender: UIButton) {
        self.flag = true
        self.grid.setImage(UIImage(named: "Menu"), forState: UIControlState.Normal)
        
        self.options.setImage(UIImage(named: "Feed-blue-dark"), forState: UIControlState.Normal)
        self.tableView.reloadData()
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
    
//    func imageResize(imageObj:UIImage, sizeChange:CGSize)-> UIImage {
//        
//        let hasAlpha = false
//        let scale: CGFloat = 0.0
//        
//        UIGraphicsBeginImageContextWithOptions(sizeChange, !hasAlpha, scale)
//        imageObj.drawInRect(CGRect(origin: CGPointZero, size: sizeChange))
//        
//        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
//        UIGraphicsEndImageContext()
//        return scaledImage
//    }
    
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        
        if self.flag == true{
        let cell = tableView.dequeueReusableCellWithIdentifier("gridcell", forIndexPath: indexPath) as! GridViewCell
        
        //cell.backgroundColor = UIColor.clearColor()
        var userposts = [Posts]()
        
        userposts = self.profile.postsData
        
        //userposts =  userposts.reverse()
        
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
                
                cell.lbl1.setTitle("", forState:UIControlState.Normal)
//                cell.lbl1.setTitle(userposts[(3*indexPath.section)].postname, forState: UIControlState.Normal)
                
                let searchImg1 = imageCache[userposts[(3*indexPath.section)].postimage!]
                
                if searchImg1 != nil{
                    cell.img1.image = searchImg1
                    
                   cell.lbl1.setTitle(userposts[(3*indexPath.section)].postname, forState: UIControlState.Normal)
                }
                    
                else{
                    //img = UIImage(named: "whitebkg")
                    let nurl = NSURL(string: userposts[(3*indexPath.section)].postimage!)
                    //cell.ActInd.startAnimating()
                    userposts[(3*indexPath.section)].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                        if (succeeded == true) && image != nil {
                            cell.img1.image = image
                            cell.lbl1.setTitle(userposts[(3*indexPath.section)].postname, forState: UIControlState.Normal)
                            
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
               // cell.lbl2.setTitle(userposts[(3*indexPath.section + 1)].postname, forState: UIControlState.Normal)
                cell.lbl2.setTitle("", forState:UIControlState.Normal)
                
                let searchImg2 = imageCache[userposts[(3*indexPath.section + 1)].postimage!]
                
                if searchImg2 != nil{
                    cell.img2.image = searchImg2
                    cell.lbl2.setTitle(userposts[(3*indexPath.section + 1)].postname, forState: UIControlState.Normal)
                }
                    
                else{
                    //img = UIImage(named: "whitebkg")
                    let nurl = NSURL(string: userposts[(3*indexPath.section + 1)].postimage!)
                    //cell.ActInd.startAnimating()
                    userposts[(3*indexPath.section + 1)].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                        if (succeeded == true) && image != nil {
                            // println("AD image loaded")
                            cell.img2.image = image
                            cell.lbl2.setTitle(userposts[(3*indexPath.section + 1)].postname, forState: UIControlState.Normal)
                            
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
               // cell.lbl3.setTitle(userposts[(3*indexPath.section + 2)].postname, forState: UIControlState.Normal)
                cell.lbl3.setTitle("", forState: UIControlState.Normal)
                
                let searchImg3 = imageCache[userposts[(3*indexPath.section + 2)].postimage!]
                
                if searchImg3 != nil{
                    cell.img3.image = searchImg3
                    cell.lbl3.setTitle(userposts[(3*indexPath.section + 2)].postname, forState: UIControlState.Normal)
                }
                    
                else{
                    //img = UIImage(named: "whitebkg")
                    let nurl = NSURL(string: userposts[(3*indexPath.section + 2)].postimage!)
                    //cell.ActInd.startAnimating()
                    userposts[(3*indexPath.section + 2)].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                        if (succeeded == true) && image != nil {
                            // println("AD image loaded")
                            cell.img3.image = image
                            cell.lbl3.setTitle(userposts[(3*indexPath.section + 2)].postname, forState: UIControlState.Normal)
                            
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
           let cell = tableView.dequeueReusableCellWithIdentifier("slidingcell", forIndexPath: indexPath) as! SlidingViewCell
            
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
            
           // userposts = self.profile.postsData
         //   cell.lbl1.text = userposts[indexPath.section].postname
            cell.lbl1.text = ""
            
            let searchImg3 = imageCache[userposts[indexPath.section].postimage!]
           // cell.lbl1.text = userposts[indexPath.section].postname
            
            if searchImg3 != nil{
                cell.img1.image = searchImg3
                cell.lbl1.text = userposts[indexPath.section].postname
            }
                
            else{
                //img = UIImage(named: "whitebkg")
                let nurl = NSURL(string: userposts[indexPath.section].postimage!)
                //cell.ActInd.startAnimating()
                userposts[indexPath.section].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                    if (succeeded == true) && image != nil {
                        // println("AD image loaded")
                        cell.img1.image = image
                        cell.lbl1.text = userposts[indexPath.section].postname
                        
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
            return UITableViewAutomaticDimension
 
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
        performSegueWithIdentifier("profilepost", sender: img)
        
    }
    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        
        
        
        if segue.identifier == "followers"{
            
            if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN())
            {
                let alertController = UIAlertController(title: "Followers Unreachable!!", message: "No Internet Connection", preferredStyle: UIAlertControllerStyle.Alert)
                
                
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
        if segue.identifier == "following"{
            
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
        if segue.identifier == "YayNay"
        {
            if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN())
            {
                let alertController = UIAlertController(title: "YAYS/NAYS Unreachable!!", message: "No Internet Connection.", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    
                    self.actInd.stopAnimating()
                    self.navigationController?.popToRootViewControllerAnimated(true)
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
            
            else
            {
              let yaynay = segue.destinationViewController as! YayNayViewController
              yaynay.profileImageURL = self.profile.imageURL
              yaynay.profilename = self.profile.title
            }
        }
        
        
        if segue.identifier == "profilepost"{
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
            if self.postTag >= 0{
                postCard.id = self.profile.postsData[self.postTag].postid
            }
            let posts = segue.destinationViewController as! PostViewController
            posts.cards = postCard
                }
        }
        
        if segue.identifier == "profileSettings"
        {
            let posts = segue.destinationViewController as! SettingsViewController
            
            
        }

    }
    
//    func scrollViewDidScroll(scrollView: UIScrollView) {
//        print("Hi")
//    }
//    func scrollViewDidScrollToTop(scrollView: UIScrollView) {
//        print("Hello")
//    }
//    func scrollViewDidEndDragging(scrollView: UIScrollView, willDecelerate decelerate: Bool) {
//        var firstVisibleIndexPath: NSIndexPath = self.tableView.indexPathsForVisibleRows![0]
//        print("first visible cell's section: \(firstVisibleIndexPath.section), row: \(firstVisibleIndexPath.row)")
//    }
    
//    func tableView(tableView: UITableView, willDisplayCell cell: UITableViewCell, forRowAtIndexPath indexPath: NSIndexPath)
//    {
//         if indexPath.row+1 == 5
//        {
//            print("came to last row")
//             tableView.setContentOffset(CGPointMake(0, self.posts.center.y-60), animated: true)
//            tableView.setContentOffset(CGPointMake(0, self.grid.center.y-60), animated: true)
//            tableView.setContentOffset(CGPointMake(0, self.options.center.y-60), animated: true)
//            
//        }
//    }

}
