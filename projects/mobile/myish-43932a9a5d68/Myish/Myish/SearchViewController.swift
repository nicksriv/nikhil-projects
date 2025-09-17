//
//  SearchViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 9/25/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class SearchViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, UICollectionViewDelegate, UICollectionViewDataSource, UIGestureRecognizerDelegate, UISearchBarDelegate{

   @IBOutlet weak var tableView: UITableView!

    @IBOutlet weak var segmentControl: UISegmentedControl!
    
    @IBOutlet var searchBar: UISearchBar!
    
    //var searchActive: Bool!
    var searchApi: SearchApi!
    var searchResult: [SearchData]!
    var searchUserApi: SearchUserApi!
    var searchUserResult: [SearchUserData]!
    
    var profilename: String!
    var profileImageURL: String!
    var postTag: Int!
    var userPostTag: Int!
    var profiletag: Int!
    //var followflag: Bool!
    var followflag = [Bool]()
    
    var searchText: String!
    
    //let imageArray = [UIImage(named: "pug"), UIImage(named: "pug2"), UIImage(named: "pug3"), UIImage(named: "pug4")]
    //let appleProducts = ["iPhone", "Apple Watch", "Mac", "iPad"]
    let actInd = UIActivityIndicatorView()
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //self.segmentControl.addBottomBar(2.0, color: UIColor(red: 104.0, green: 181.0, blue: 255.0, alpha: 1.0))
        self.searchApi = SearchApi()
        self.searchResult = [SearchData]()
        self.searchUserApi = SearchUserApi()
        self.searchUserResult = [SearchUserData]()
        self.tableView.delegate = self
        self.tableView.dataSource = self
        self.searchBar.delegate = self
        self.postTag = -1
        self.userPostTag = -1
        self.profiletag = -1
        //self.followflag[] = true
        
        self.searchText = ""
//        self.searchBar.backgroundColor = UIColor(red: 0.22, green: 0.39, blue: 0.55, alpha: 1.0)
//        self.searchBar.tintColor = UIColor(red: 0.22, green: 0.39, blue: 0.55, alpha: 1.0)
//        self.view.backgroundColor = UIColor(red: 0.22, green: 0.39, blue: 0.55, alpha: 1.0)
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: "dismissKeyboard")
        view.addGestureRecognizer(tap)
        
        let colors = Colors()
        self.view.backgroundColor = UIColor.clearColor()
        let backgroundLayer = colors.gl
        backgroundLayer.frame = self.view.frame
        self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
        self.tableView.backgroundColor = UIColor.clearColor()
        self.segmentControl.backgroundColor = UIColor.clearColor()
        self.segmentControl.tintColor = UIColor.whiteColor()
        self.searchBar.barTintColor = UIColor(red: 24.0/255.0, green: 96.0/255.0, blue: 214.0/255.0, alpha: 1.0)
        //segmentControl.backgroundColor = UIColor
        
        self.actInd.frame.origin.x = self.view.frame.origin.x + self.view.frame.size.width/2 - actInd.frame.size.width/2
        self.actInd.frame.origin.y = self.view.frame.origin.y + self.view.frame.size.height/2 - actInd.frame.size.height/2
        self.actInd.color = UIColor.whiteColor()
        self.actInd.setValue("Large white", forKey: "style")
        self.view.addSubview(actInd)
    }
    
    override func viewWillAppear(animated: Bool) {
        
        self.segmentControl.addBottomBar(2.0, color: UIColor.clearColor())
        //self.segmentControl.tintColor = UIColor(red: 0.22, green: 0.39, blue: 0.55, alpha: 1.0)
        //self.segmentControl.backgroundColor = UIColor(red: 0.22, green: 0.39, blue: 0.55, alpha: 1.0)
        
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "Post Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
        
    }
    
    func dismissKeyboard() {
        //Causes the view (or one of its embedded text fields) to resign the first responder status.
        view.endEditing(true)
    }
    
    func SearchReload(url: String){
        
        self.actInd.startAnimating()
        
        self.searchApi.loadSearch(url, completion: didLoadSearch)
        
    }
    
    func searchBarShouldEndEditing(searchBar: UISearchBar) -> Bool {
        return self.view.endEditing(true)
    }
    
    func SearchUserReload(url: String){
        self.actInd.startAnimating()
        self.searchUserApi.loadSearch(url, completion: didLoadUserSearch)
    }
    
    func didLoadUserSearch(search: [SearchUserData])
    {
      
            if search.count == 0
            {
                let alertController = UIAlertController(title: "No user found !!", message: "Please try again later!!", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    print("you have pressed OK button", terminator: "");
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
        
            self.searchUserResult = search
        for var index=0; index<self.searchUserResult.count; index=index+1 {
            self.followflag.append(true)
        }
        
            self.actInd.stopAnimating()
            self.tableView.reloadData()
        
        
    }
    
    func didLoadSearch(search: [SearchData])
    {
        
       
            if search.count == 0
            {
                let alertController = UIAlertController(title: "No post found !!", message: "Please try again later!!", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    print("you have pressed OK button", terminator: "");
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
            
            self.searchResult = search
            self.actInd.stopAnimating()
            self.tableView.reloadData()
  }


    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        
        if segmentControl.selectedSegmentIndex == 1{
        let rows = Double(self.searchResult.count)/3.0
        return Int(ceil(rows))

        }
        else{
            //let rows = Double(self.searchUserResult.count)/3.0
            
            return self.searchUserResult.count
        }
    }
    
     func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
       if segmentControl.selectedSegmentIndex == 0{
        return 2
        }
       else{
        return 1
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
    

    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
    
        if segmentControl.selectedSegmentIndex == 0{
        
        if indexPath.row%2 == 0{
        
        let cell = tableView.dequeueReusableCellWithIdentifier("profile", forIndexPath: indexPath) as! profileViewCell
        
    //cell.profileImage.setTitle("Soon", forState: UIControlState.Normal)
            
            if self.searchUserResult[indexPath.section].imageURL != ""{
                
                var searchImg1 = imageCache[self.searchUserResult[indexPath.section].imageURL!]
                
                if searchImg1 != nil{
                    searchImg1 = imageResize(searchImg1!, sizeChange: CGSize(width: 30, height: 30))
                    cell.profileImage.setImage(searchImg1, forState: UIControlState.Normal)
                    cell.profileImage.imageView!.layer.cornerRadius = (cell.profileImage.imageView!.frame.size.width)/2
                    cell.profileImage.imageView!.clipsToBounds = true
                    cell.profileImage.setTitle("", forState: UIControlState.Normal)
                    
                }
                    
                else{
                    //img = UIImage(named: "whitebkg")
                    let nurl = NSURL(string: self.searchUserResult[indexPath.section].imageURL!)
                    //cell.ActInd.startAnimating()
                    self.searchUserResult[indexPath.section].downloadProfileImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                        if (succeeded == true) && image != nil {
                            // println("AD image loaded")
                            let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 30, height: 30))
                            cell.profileImage.setImage(image, forState: UIControlState.Normal)
                            cell.profileImage.setImage(Utils.imageResize(rimage as UIImage, sizeChange: CGSize(width: 30, height: 30)), forState: UIControlState.Normal)
                            cell.profileImage.imageView!.layer.cornerRadius = (cell.profileImage.imageView!.frame.size.width)/2
                            cell.profileImage.imageView!.clipsToBounds = true
                            cell.profileImage.setTitle("", forState: UIControlState.Normal)

                        }
                        else {
                            let profileImg = Utils.imageResize(UIImage(named: "Myish-circle-transparent")!, sizeChange: CGSize(width: 30, height: 30))
                            //let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
                            cell.profileImage.setImage(profileImg, forState: UIControlState.Normal)
                            cell.profileImage.setImage(Utils.imageResize(profileImg as UIImage, sizeChange: CGSize(width: 30, height: 30)), forState: UIControlState.Normal)
                            cell.profileImage.imageView!.layer.cornerRadius = (cell.profileImage.imageView!.frame.size.width)/2
                            cell.profileImage.imageView!.clipsToBounds = true
                            cell.profileImage.setTitle("", forState: UIControlState.Normal)
                        }
                    })
                    
            }
            }
            else{
                let profileImg = Utils.imageResize(UIImage(named: "Myish-circle-transparent")!, sizeChange: CGSize(width: 30, height: 30))
                //let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
                cell.profileImage.setImage(profileImg, forState: UIControlState.Normal)
                cell.profileImage.setImage(Utils.imageResize(profileImg as UIImage, sizeChange: CGSize(width: 30, height: 30)), forState: UIControlState.Normal)
                cell.profileImage.layer.cornerRadius = (cell.profileImage.imageView!.frame.size.width)/2
                cell.profileImage.clipsToBounds = true
                cell.profileImage.setTitle("", forState: UIControlState.Normal)
            }
            

            let tapGestureRecognizer = UITapGestureRecognizer(target:self, action:Selector("Tapped:"))
            
            cell.profileImage.addGestureRecognizer(tapGestureRecognizer)
            tapGestureRecognizer.view!.tag = indexPath.section

            cell.profileFollowing.hidden = true
            cell.profileName.text = self.searchUserResult[indexPath.section].title
            cell.profileFollowing.tag = indexPath.section
            
            //&referenceid=\(self.searchUserResult[indexPath.section].id)
            self.checkProfile("http://myish.com:\(port)/api/isfollowing?userid=\(userProfileID)&referenceid=\(self.searchUserResult[indexPath.section].id)", completion: { (follows) -> Void in
                if follows == true{
                   // let rimage = Utils.imageResize(UIImage(named: "Clicked-follow-button")!, sizeChange: cell.profileFollowing.bounds.size)
                    cell.profileFollowing.setImage(UIImage(named: "Clicked-follow-button"), forState: UIControlState.Normal)
                   cell.profileFollowing.backgroundColor = UIColor.clearColor()
                   // cell.profileFollowing.layer.cornerRadius = 10
                    //cell.profileFollowing.clipsToBounds = true
                   // self.followflag = true
                    self.followflag[indexPath.section] = true
                    cell.profileFollowing.hidden = false
                    
                    }
                    else if userProfileID == self.searchUserResult[indexPath.section].id
                {
                    cell.profileFollowing.hidden = true
                   // self.followflag = true
                    self.followflag[indexPath.section] = false
                    
                }
                else{
                    //let rimage = Utils.imageResize(UIImage(named: "Unclicked-follow-button")!, sizeChange: cell.profileFollowing.bounds.size)
                    cell.profileFollowing.setImage(UIImage(named: "Unclicked-follow-button"), forState: UIControlState.Normal)
                    cell.profileFollowing.backgroundColor = UIColor.clearColor()
                    //cell.profileFollowing.layer.cornerRadius = 10
                    //cell.profileFollowing.clipsToBounds = true
                  //  self.followflag = false
                    self.followflag[indexPath.section] = true
                    cell.profileFollowing.hidden = false
                }
              //  cell.profileFollowing.hidden = false
            })
            

       return cell
    }
    
    else{
            let cell = tableView.dequeueReusableCellWithIdentifier("post", forIndexPath: indexPath) as! UserPostViewCell
            
            if self.searchUserResult[indexPath.section].postsData.count != 0{
                
                if self.searchUserResult[indexPath.section].postsData.count < 1 {
                    cell.img1.hidden = true
                }
                
                else{
                    
                    cell.img1.hidden = false
                    let tapGestureRecognizer1 = UITapGestureRecognizer(target:self, action:Selector("Tapped1:"))
                    cell.img1.userInteractionEnabled = true
                    cell.img1.addGestureRecognizer(tapGestureRecognizer1)
                    tapGestureRecognizer1.view!.tag = indexPath.section
                    
                let searchImg1 = imageCache[self.searchUserResult[indexPath.section].postsData[0].postimage]
                
                if searchImg1 != nil{
                    cell.img1.image = searchImg1
                }
                    
                else{
                    //img = UIImage(named: "whitebkg")
                    let nurl = NSURL(string: self.searchUserResult[indexPath.section].postsData[0].postimage)
                    //cell.ActInd.startAnimating()
                    self.searchUserResult[indexPath.section].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                        if (succeeded == true) && image != nil {
                            // println("AD image loaded")
                            cell.img1.image = image
                            
                        }
                        else {
                            //println("AD image didnt load")
                        }
                    })
                    
                }

                }
                
                if self.searchUserResult[indexPath.section].postsData.count < 2{
                    cell.img2.hidden = true
                }
                    
                else{
                    
                    cell.img2.hidden = false
                    let tapGestureRecognizer2 = UITapGestureRecognizer(target:self, action:Selector("Tapped2:"))
                    cell.img2.userInteractionEnabled = true
                    cell.img2.addGestureRecognizer(tapGestureRecognizer2)
                    tapGestureRecognizer2.view!.tag = indexPath.section
                    
            let searchImg2 = imageCache[self.searchUserResult[indexPath.section].postsData[1].postimage]
            
            if searchImg2 != nil{
                cell.img2.image = searchImg2
            }
                
            else{
                //img = UIImage(named: "whitebkg")
                let nurl = NSURL(string: self.searchUserResult[indexPath.section].postsData[1].postimage)
                //cell.ActInd.startAnimating()
                self.searchUserResult[indexPath.section].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
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
                
                if self.searchUserResult[indexPath.section].postsData.count < 3{
                    cell.img3.hidden = true
                }
                    
                else{
                    
                    cell.img3.hidden = false
                    let tapGestureRecognizer3 = UITapGestureRecognizer(target:self, action:Selector("Tapped3:"))
                    cell.img3.userInteractionEnabled = true
                    cell.img3.addGestureRecognizer(tapGestureRecognizer3)
                    tapGestureRecognizer3.view!.tag = indexPath.section

            let searchImg3 = imageCache[self.searchUserResult[indexPath.section].postsData[2].postimage]
            
            if searchImg3 != nil{
                cell.img3.image = searchImg3
            }
                
            else{
                //img = UIImage(named: "whitebkg")
                let nurl = NSURL(string: self.searchUserResult[indexPath.section].postsData[2].postimage)
                //cell.ActInd.startAnimating()
                self.searchUserResult[indexPath.section].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                    if (succeeded == true) && image != nil {
                        // println("AD image loaded")
                        cell.img3.image = image
                        
                    }
                    else {
                        //println("AD image didnt load")
                    }
                })
                
               }
                }
                
            }
            else{
                cell.hidden = true
            }

            return cell
        }
    }
        else{
            
            let cell = tableView.dequeueReusableCellWithIdentifier("post_2", forIndexPath: indexPath) as! PostViewCell
            //cell.backgroundColor = UIColor.clearColor()
            
            if (3*indexPath.section) < self.searchResult.count{
                
                cell.img1.hidden = false
                cell.lbl1.hidden = false
                
                let tapGestureRecognizer4 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                let tapGestureRecognizer7 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                
                cell.img1.userInteractionEnabled = true
                cell.img1.addGestureRecognizer(tapGestureRecognizer4)
                tapGestureRecognizer4.view!.tag = 3*indexPath.section
                
                cell.lbl1.userInteractionEnabled = true
                cell.lbl1.addGestureRecognizer(tapGestureRecognizer7)
                tapGestureRecognizer7.view!.tag = 3*indexPath.section
            
            
            cell.lbl1.setBackgroundImage(UIImage(named: "pyramid3"), forState: UIControlState.Normal)
            cell.lbl1.setTitle(self.searchResult[(3*indexPath.section)].title, forState: UIControlState.Normal)
                
            let searchImg1 = imageCache[self.searchResult[(3*indexPath.section)].imageURL!]
                
            if searchImg1 != nil{
                cell.img1.image = searchImg1
            }
                
            else{
                //img = UIImage(named: "whitebkg")
                let nurl = NSURL(string: self.searchResult[(3*indexPath.section)].imageURL!)
                //cell.ActInd.startAnimating()
                cell.img1.image = UIImage()
                self.searchResult[(3*indexPath.section)].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                    if (succeeded == true) && image != nil {
                        // println("AD image loaded")
                        cell.img1.image = image
                        
                    }
                    else {
                        //println("AD image didnt load")
                    }
                })
                
            }
            }
            else{
                cell.img1.hidden = true
                cell.lbl1.hidden = true
            }
            
            if (3*indexPath.section + 1) < self.searchResult.count{
                
                cell.img2.hidden = false
                cell.lbl2.hidden = false
                
                let tapGestureRecognizer5 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                let tapGestureRecognizer8 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                
                
                cell.img2.userInteractionEnabled = true
                cell.img2.addGestureRecognizer(tapGestureRecognizer5)
                tapGestureRecognizer5.view!.tag = 3*indexPath.section + 1
                
                cell.lbl2.userInteractionEnabled = true
                cell.lbl2.addGestureRecognizer(tapGestureRecognizer8)
                tapGestureRecognizer8.view!.tag = 3*indexPath.section + 1
                
                
                cell.lbl2.setBackgroundImage(UIImage(named: "pyramid3"), forState: UIControlState.Normal)
                cell.lbl2.setTitle(self.searchResult[(3*indexPath.section + 1)].title, forState: UIControlState.Normal)
                
                let searchImg2 = imageCache[self.searchResult[(3*indexPath.section + 1)].imageURL!]
                
                if searchImg2 != nil{
                    cell.img2.image = searchImg2
                }
                    
                else{
                    //img = UIImage(named: "whitebkg")
                    let nurl = NSURL(string: self.searchResult[(3*indexPath.section + 1)].imageURL!)
                    //cell.ActInd.startAnimating()
                    cell.img2.image = UIImage()
                    self.searchResult[(3*indexPath.section + 1)].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                        if (succeeded == true) && image != nil{
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
                cell.img2.hidden = true
                cell.lbl2.hidden = true
            }

            if (3*indexPath.section + 2) < self.searchResult.count{
                
                cell.img3.hidden = false
                cell.lbl3.hidden = false
                
                let tapGestureRecognizer6 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                let tapGestureRecognizer9 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                
                cell.img3.userInteractionEnabled = true
                cell.img3.addGestureRecognizer(tapGestureRecognizer6)
                tapGestureRecognizer6.view!.tag = 3*indexPath.section + 2
                
                cell.lbl3.userInteractionEnabled = true
                cell.lbl3.addGestureRecognizer(tapGestureRecognizer9)
                tapGestureRecognizer9.view!.tag = 3*indexPath.section + 2
                
                
                cell.lbl3.setBackgroundImage(UIImage(named: "pyramid3"), forState: UIControlState.Normal)
                cell.lbl3.setTitle(self.searchResult[(3*indexPath.section + 2)].title, forState: UIControlState.Normal)
                
                
                let searchImg3 = imageCache[self.searchResult[(3*indexPath.section + 2)].imageURL!]
                
                if searchImg3 != nil{
                    cell.img3.image = searchImg3
                }
                    
                else{
                    //img = UIImage(named: "whitebkg")
                    let nurl = NSURL(string: self.searchResult[(3*indexPath.section + 2)].imageURL!)
                    //cell.ActInd.startAnimating()
                    cell.img3.image = UIImage()
                    self.searchResult[(3*indexPath.section + 2)].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
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
                cell.img3.hidden = true
                cell.lbl3.hidden = true
            }
            
            return cell
        }
     
    
    
    }

    func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        if segmentControl.selectedSegmentIndex == 0{
        if indexPath.row%2 == 0{
        return 50
        }
        else{
        return 110
        }
      }
        else{
            return 125
        }
    }
    
    @IBAction func FollowingPressed(sender: UIButton) {

        if self.followflag[sender.tag] == false
        {
            let actionSheetController: UIAlertController = UIAlertController(title: "Unfollow \(self.searchUserResult[sender.tag].title!)", message: nil, preferredStyle: UIAlertControllerStyle.ActionSheet)
            
            let choosePictureAction: UIAlertAction = UIAlertAction(title: "Unfollow", style: UIAlertActionStyle.Destructive)
                { action -> Void in
                    let gurl = NSURL(string: "http://www.google.com")
                    if (self.isConnectedToNetwork(gurl!) == true){
                        
                        sender.setImage(UIImage(named: "Unclicked-follow-button"), forState: UIControlState.Normal)
                        sender.imageView!.backgroundColor = UIColor.clearColor()
                        //sender.layer.cornerRadius = 10
                        //sender.clipsToBounds = true
                        
                       self.followflag[sender.tag] = true
                     
                      
                        var params = ["userid":self.searchUserResult[sender.tag].id, "followerid":userProfileID] as Dictionary<String, String>
                        var url = "http://myish.com:\(port)/api/removefollower"
                        
                        self.post(params, url: url, isfollow: true, completion: { (success) -> Void in
                            if success == false{
                                //sender.setImage(self.imageResize(UIImage(named: "Clicked-follow-button")!, sizeChange: sender.imageView!.image!.size), forState: UIControlState.Normal)
                                sender.imageView!.backgroundColor = UIColor.clearColor()
                                //sender.layer.cornerRadius = 10
                                //sender.clipsToBounds = true
                               // self.followflag[sender.tag] = true
                            }
                        
                        })
                        
                        params = ["userid":userProfileID, "followingid":self.searchUserResult[sender.tag].id] as Dictionary<String, String>
                        url = "http://myish.com:\(port)/api/removefollowing"
                        
                        
                        self.post(params, url: url, isfollow: true, completion: { (success) -> Void in
                            if success == false{
                                //sender.setImage(self.imageResize(UIImage(named: "Clicked-follow-button")!, sizeChange: sender.imageView!.image!.size), forState: UIControlState.Normal)
                                sender.imageView!.backgroundColor = UIColor.clearColor()
                                //sender.layer.cornerRadius = 10
                                //sender.clipsToBounds = true
                                //self.followflag[sender.tag] = true//
                                
                            }
                        })
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
            sender.setImage(UIImage(named: "Clicked-follow-button")!, forState: UIControlState.Normal)
            sender.imageView!.backgroundColor = UIColor.clearColor()
            //sender.layer.cornerRadius = 10
            //sender.clipsToBounds = true
            self.followflag[sender.tag] = false
            let gurl = NSURL(string: "http://www.google.com")
            if (self.isConnectedToNetwork(gurl!) == true){
                var params = ["userid":self.searchUserResult[sender.tag].id, "followerid":userProfileID, "followerusername":username, "followerprofilepictureURL":userimageURL] as Dictionary<String, String>
                var url = "http://myish.com:\(port)/api/addfollower"
                
                self.post(params, url: url, isfollow: false, completion: { (success) -> Void in
                    if success == false{
                        //sender.setImage(self.imageResize(UIImage(named: "Unclicked-follow-button")!, sizeChange: sender.imageView!.image!.size), forState: UIControlState.Normal)
                        sender.imageView!.backgroundColor = UIColor.clearColor()
                        //sender.layer.cornerRadius = 10
                       // sender.clipsToBounds = true
                       // self.followflag[sender.tag] = false
                    }
                })
                
                params = ["userid":userProfileID, "followingid":self.searchUserResult[sender.tag].id, "followingusername":self.searchUserResult[sender.tag].title!, "followingprofilepictureURL":self.searchUserResult[sender.tag].imageURL!] as Dictionary<String, String>
                url = "http://myish.com:\(port)/api/addfollowing"
                
                self.post(params, url: url, isfollow: false, completion: { (success) -> Void in
                    if success == false{
                       // sender.setImage(self.imageResize(UIImage(named: "Unclicked-follow-button")!, sizeChange: sender.imageView!.image!.size), forState: UIControlState.Normal)
                        sender.imageView!.backgroundColor = UIColor.clearColor()
                        //sender.layer.cornerRadius = 10
                        //sender.clipsToBounds = true
                        //self.followflag[sender.tag] = false
                    }
                })
                //post([], url: "http://myish.com:3000/api/addfollower", isfollow: false)
                //post([], url: "", isfollow: false)
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

    
    
    @IBAction func indexChanged(sender: UISegmentedControl) {
        self.searchText = self.searchBar.text
        self.searchText = self.searchText.stringByReplacingOccurrencesOfString("*", withString: "")
        self.searchText = self.searchText.stringByTrimmingCharactersInSet(NSCharacterSet.whitespaceAndNewlineCharacterSet())
        self.searchText = self.searchText.stringByAddingPercentEncodingWithAllowedCharacters(NSCharacterSet.URLQueryAllowedCharacterSet())
        if self.searchText != ""{
            if sender.selectedSegmentIndex == 0{
                SearchUserReload("http://myish.com:\(port)/api/searchuser?searchtext=\(self.searchText!)")
            }
            else{
                SearchReload("http://myish.com:\(port)/api/searchpost?searchtext=\(self.searchText!)")
            }
        }
        
         self.postTag = -1
        self.userPostTag = -1
        self.profiletag = -1
        tableView.reloadData()
    }
    
    func Tapped(img: AnyObject)
    {

        self.profiletag = img.view!.tag
        if self.profiletag >= 0{
            if self.searchUserResult[self.profiletag].id == userProfileID{
                self.tabBarController!.selectedIndex = 4
            }
            else{
                performSegueWithIdentifier("profileSearch", sender: img)
            }
        }
        


    }

    
    func Tapped1(img: AnyObject)
    {
        self.userPostTag = 0
        self.postTag = img.view!.tag
        performSegueWithIdentifier("searchpost", sender: img)
        //let vc = self.storyboard!.instantiateViewControllerWithIdentifier("postTab")
        
        //self.navigationController?.pushViewController(vc, animated: true)
    }
    
    func Tapped2(img: AnyObject)
    {
        self.userPostTag = 1
        self.postTag = img.view!.tag
        performSegueWithIdentifier("searchpost", sender: img)
        //let vc = self.storyboard!.instantiateViewControllerWithIdentifier("postTab")
        
        //self.navigationController?.pushViewController(vc, animated: true)
    }
    
    func Tapped3(img: AnyObject)
    {
        self.userPostTag = 2
        self.postTag = img.view!.tag
        performSegueWithIdentifier("searchpost", sender: img)
        //let vc = self.storyboard!.instantiateViewControllerWithIdentifier("postTab")
        
        //self.navigationController?.pushViewController(vc, animated: true)
    }
    
    func Tapped4(img: AnyObject)
    {
        self.userPostTag = -1
        self.postTag = img.view!.tag
        performSegueWithIdentifier("searchpost", sender: img)
        //let vc = self.storyboard!.instantiateViewControllerWithIdentifier("postTab")
        
        //self.navigationController?.pushViewController(vc, animated: true)
    }
    
    func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int
    {
        return 3
    }
    
    
    
    func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell
    {
        let cell = collectionView.dequeueReusableCellWithReuseIdentifier("postCell", forIndexPath: indexPath)
        
        //cell.frame.size.width = 120
            
        let img = cell.viewWithTag(100) as! UIImageView
        let searchImg = imageCache[self.searchResult[indexPath.row].imageURL!]
        
        
        if searchImg != nil{
            img.image = searchImg
            //cell.ADImage.setBackgroundImage(ad.ADimage, forState: UIControlState.Selected)
            //cell.ADImage.setBackgroundImage(ad.ADimage, forState: UIControlState.Highlighted)
        }
            
        else{
            //img = UIImage(named: "whitebkg")
            let nurl = NSURL(string: self.searchResult[indexPath.row].imageURL!)
            //cell.ActInd.startAnimating()
            self.searchResult[indexPath.row].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                if (succeeded == true) && image != nil{
                    // println("AD image loaded")
                    img.image = image
                    
                }
                else {
                    //println("AD image didnt load")
                }
            })
            
        }
        
        return cell
        
    }
    
    func collectionView(collectionView: UICollectionView, didSelectItemAtIndexPath indexPath: NSIndexPath)
    {
        //self.performSegueWithIdentifier("showImage", sender: self)
    }
    
    func searchBarTextDidBeginEditing(searchBar: UISearchBar) {
        //searchActive = true;
    }
    
    func searchBarTextDidEndEditing(searchBar: UISearchBar) {
        //searchActive = false;
    }
    
    func searchBarCancelButtonClicked(searchBar: UISearchBar) {
        //searchActive = false;
    }
    
    func searchBarSearchButtonClicked(searchBar: UISearchBar) {
        //searchActive = false;
        self.searchText = searchBar.text
        self.searchText = self.searchText.stringByReplacingOccurrencesOfString("*", withString: "")
        self.searchText = self.searchText.stringByTrimmingCharactersInSet(NSCharacterSet.whitespaceAndNewlineCharacterSet())
        self.searchText = self.searchText.stringByAddingPercentEncodingWithAllowedCharacters(NSCharacterSet.URLQueryAllowedCharacterSet())
        if segmentControl.selectedSegmentIndex == 0{
        
         SearchUserReload("http://myish.com:\(port)/api/searchuser?searchtext=\(searchText!)")
        }
        else{
         SearchReload("http://myish.com:\(port)/api/searchpost?searchtext=\(searchText!)")
        }
        self.view.endEditing(true)
        
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        
        let dict =   GAIDictionaryBuilder.createEventWithCategory("ui_action", action: "button_press", label: "searchedFor:\(searchText)", value: nil).build()
        tracker.send(dict as [NSObject:AnyObject])
        
        tracker.allowIDFACollection = true
    }
    
    func searchBar(searchBar: UISearchBar, textDidChange searchText: String) {
        
        
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
                
                
                
                let profileDataArray = try! NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.AllowFragments)
                print(profileDataArray)
                
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
    
    func post(params : Dictionary<String, String>, url : String, isfollow: Bool!, completion: ((Bool) -> Void)!)
    {
                var success = true
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
                           
                        }
                        alertController.addAction(OKAction)
                        success = false
                        self.presentViewController(alertController, animated: true, completion:nil)
    }
    
                        let priority = DISPATCH_QUEUE_PRIORITY_DEFAULT
                        dispatch_async(dispatch_get_global_queue(priority, 0)) {
                        dispatch_async(dispatch_get_main_queue()) {
    
                        completion(success)
                        }
                        }
    
                     })
    
                task.resume()
            }
    
    @IBAction func profileButtonClicked(sender: UIButton)
    {
        
    }
    

    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?)
    {
        
        if segue.identifier == "searchpost"
        {
            
            if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN())
            {
                let alertController = UIAlertController(title: "Post Unreachable!!", message: "No Internet Connection.", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    
                    self.actInd.stopAnimating()
                    self.navigationController?.popToRootViewControllerAnimated(true)
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
            
            else
            {
                var postCard = CardData()
                
                if self.postTag >= 0{
                    if self.segmentControl.selectedSegmentIndex == 0{
                        postCard.profileName = self.searchUserResult[self.postTag].title
                        postCard.profileImageURL = self.searchUserResult[self.postTag].imageURL
                        
                        postCard.id = self.searchUserResult[self.postTag].postsData[self.userPostTag].postid
                        
                    }
                    else{
                        postCard.profileName = self.searchResult[self.postTag].profileName
                        postCard.profileImageURL = self.searchResult[self.postTag].profileImageURL
                        postCard.id = self.searchResult[self.postTag].id
                    }
                }
                let posts = segue.destinationViewController as! PostViewController
                posts.cards = postCard
            }
    }
        
        
        
        
        
        if segue.identifier == "profileSearch"
        {
            
            if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN())
            {
                let alertController = UIAlertController(title: "User Unreachable!!", message: "No Internet Connection.", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    
                    self.actInd.stopAnimating()
                    self.navigationController?.popToRootViewControllerAnimated(true)
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
            
            else
            {
                if self.profiletag >= 0
                {
                    if self.searchUserResult[self.profiletag].id == userProfileID
                    {
                        self.tabBarController?.selectedIndex = 5
                    }
                    else
                    {
                        let profileController = segue.destinationViewController as! UserProfileViewController
                        profileController.profileID = self.searchUserResult[self.profiletag].id
                    }
                }

            }
            
        }
        
    }
    
    
}

