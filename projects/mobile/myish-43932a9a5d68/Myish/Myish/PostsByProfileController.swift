//
//  PostsByProfileController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/8/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class PostsByProfileController: UIViewController, UITableViewDelegate, UITableViewDataSource, UIGestureRecognizerDelegate{
    
    @IBOutlet weak var tableView: UITableView!
    
    //@IBOutlet weak var segmentControl: UISegmentedControl!
    
    var postApi: PostApi!
    //var nayApi: YayNayApi!
    var posts: [Posts]!
    //var post: [Post]!
   // var nays: [YayNayData]!
    var profilename: String!
    var profileImageURL: String!
    var postTag: Int!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.postApi = PostApi()
       // self.nayApi = YayNayApi()
        //self.post = [Post]()
        self.posts = [Posts]()
       // self.nays = [YayNayData]()
        self.tableView.delegate = self
        self.tableView.dataSource = self
        
        let colors = Colors()
        self.view.backgroundColor = UIColor.clearColor()
        let backgroundLayer = colors.gl
        backgroundLayer.frame = self.view.frame
        self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
        self.tableView.backgroundColor = UIColor.clearColor()
        self.postTag = 0
        
    }
    
    override func viewWillAppear(animated: Bool) {
        // self.segmentControl.addBottomBar(2.0, color: UIColor(red: 0.22, green: 0.39, blue: 0.55, alpha: 1.0))
        // self.segmentControl.backgroundColor = UIColor(red: 0.22, green: 0.39, blue: 0.55, alpha: 1.0)
        
       // YayLoad("http://myish.com:3000/api/getpostsuseryay?userid=\(userProfileID)")
        
       // NayLoad("http://myish.com:3000/api/getpostsusernay?userid=\(userProfileID)")
        
        //self.tableView.reloadData()
        
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "PostByProfile Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
    }
    
    @IBAction func backButtonPressed(sender: UIButton) {
        self.navigationController?.popViewControllerAnimated(true)
        
    }
    
    func YayLoad(url: String){
        
        //self.searchApi.loadSearch(url, completion: didLoadSearch)
        self.postApi.loadYayNay(url, completion: didLoadYaySearch)
    }
    
    func didLoadYaySearch(yaynay: [Post]){
        
        //self.posts = [Post]()
        //self.posts = yaynay
        //self.tableView.reloadData()
    }
    

    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        
        var rows: Double = 0
        
        if self.posts.count > 0{
                rows = Double(self.posts.count)/3.0
            }

        if rows == 0{
            return 1
        }
        else{
            
            return Int(ceil(rows))
        }
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
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
    
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCellWithIdentifier("post_2", forIndexPath: indexPath) as! PostsTableViewCell
        
        cell.backgroundColor = UIColor.clearColor()
        var userposts = [Posts]()
        
        userposts = posts
       
        
        
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
                
                cell.lbl1.text = userposts[(3*indexPath.section)].postname
                
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
                
                cell.lbl2.text = userposts[(3*indexPath.section + 1)].postname
                
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
                
                cell.lbl3.text = userposts[(3*indexPath.section + 2)].postname
                
                let searchImg3 = imageCache[userposts[(3*indexPath.section + 2)].postimage!]
                
                if searchImg3 != nil{
                    cell.img3.image = searchImg3
                }
                    
                else{
                    //img = UIImage(named: "whitebkg")
                    let nurl = NSURL(string: userposts[(3*indexPath.section + 2)].postimage!)
                    //cell.ActInd.startAnimating()
                    userposts[(3*indexPath.section + 2)].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
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
    
    func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        
        return 125
    }
    
    func Tapped4(img: AnyObject)
    {
        self.postTag = img.view!.tag
        performSegueWithIdentifier("singlepost", sender: img)

    }

    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "singlepost"{
            let postCard = CardData()
            postCard.profileName = self.profilename
            postCard.profileImageURL = self.profileImageURL
            if self.postTag != 0{
            postCard.id = self.posts[self.postTag].postid
            }
            let posts = segue.destinationViewController as! PostViewController
            posts.cards = postCard
        }
    }
    
    
}