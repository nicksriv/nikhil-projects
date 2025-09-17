//
//  FirstViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 8/6/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import UIKit
import pop


private let numberOfCards: UInt = 5
private let frameAnimationSpringBounciness:CGFloat = 9
private let frameAnimationSpringSpeed:CGFloat = 16
private let kolodaCountOfVisibleCards = 2
private let kolodaAlphaValueSemiTransparent:CGFloat = 0.1

class FirstViewController: UIViewController, KolodaViewDataSource, KolodaViewDelegate,UpdateCommentCount {

    @IBOutlet var postProfileImg: UIButton!
    
    @IBOutlet var postUserName: UILabel!
    
    @IBOutlet var postTime: UILabel!
    
    @IBOutlet var postCategory: UIButton!
    
    @IBOutlet var postDescription: UILabel!
    
    @IBOutlet var postComments: UIButton!
    
    @IBOutlet var actInd: UIActivityIndicatorView!
    
    //@IBOutlet var navBar: UINavigationBar!
    
    @IBOutlet var NayButton: BadgeButton!
    
    @IBOutlet var skipButton: UIButton!
    
    @IBOutlet var YayButton: BadgeButtonR!
    
    @IBOutlet var moreButton: UIButton!
    var cardApi: CardAPI!
    var cards: [CardData]!
    //@IBOutlet var rightNavItem: UIBarButtonItem!
    var flagCount: Int!
    var flag: Bool!
   // var currentIndex: Int!
    var postID: String!
    var cardIndex: Int!
    var cardcount: Int!
    var cardsrolled: Int!
    var commentsCount:Int!
    var branchUniversalObject: BranchUniversalObject! = nil
    
    @IBOutlet var imgView: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //var draggableBackground: DraggableViewBackground = DraggableViewBackground(frame: self.view.frame)
        //self.view.addSubview(draggableBackground)
       // self.currentIndex = 0
        self.cardView.hidden = true
        self.cardIndex = 0
        self.cardcount = 0
        self.cardsrolled = 0
        let colors = Colors()
        self.view.backgroundColor = UIColor.clearColor()
        //self.navBar.barTintColor = UIColor.clearColor()
        let backgroundLayer = colors.gl
        backgroundLayer.frame = self.view.frame
        self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
        self.postCategory.userInteractionEnabled = false
        //self.navBar.backgroundColor = UIColor(red: 0.22, green: 0.39, blue: 0.55, alpha: 1.0)
        //self.navBar.tintColor = UIColor(red: 0.22, green: 0.39, blue: 0.55, alpha: 1.0)
        //self.navBar.barTintColor = UIColor(red: 0.22, green: 0.39, blue: 0.55, alpha: 1.0)
        self.YayButton.imageView?.image = self.imageResize(UIImage(named: "NAY-button")!, sizeChange: self.YayButton.frame.size)
        self.NayButton.imageView?.image = self.imageResize(UIImage(named: "YAY-button")!, sizeChange: self.NayButton.frame.size)
        self.skipButton.imageView?.image = self.imageResize(UIImage(named: "Skip-button")!, sizeChange: self.skipButton.frame.size)
        self.flag = false
        //self.rightNavItem.image = UIImage(named: "Feed-blue-dark")
        self.cardApi = CardAPI()
        self.cards = [CardData]()
        //if userProfileID != ""{
        //self.CardReload("http://myish.com:3000/api/getpostsforuser?userid=\(userProfileID)&limit=10")
        //}
        self.cardView.alphaValueSemiTransparent = kolodaAlphaValueSemiTransparent
        self.cardView.countOfVisibleCards = kolodaCountOfVisibleCards
        self.cardView.dataSource = self
        self.cardView.delegate = self
        
        branchUniversalObject = BranchUniversalObject(canonicalIdentifier: "Post/12345")
        branchUniversalObject.title = "Myish-Title"
        branchUniversalObject.contentDescription = "Myish-Content"
        //branchUniversalObject.imageUrl = "https://example.com/mycontent-12345.png"
       
        //branchUniversalObject.addMetadataKey("property2", value: "red")
        
        //self.cardView. .frames = self.imgView.frame
        self.actInd.frame.origin.x = self.view.frame.origin.x + self.view.frame.size.width/2 - actInd.frame.size.width/2
        self.actInd.frame.origin.y = self.view.frame.origin.y + self.view.frame.size.height/2 - actInd.frame.size.height/2
        //self.actInd.color = UIColor.whiteColor()
        //self.actInd.setValue("Large white", forKey: "style")
        self.view.addSubview(actInd)
        self.modalTransitionStyle = UIModalTransitionStyle.FlipHorizontal
        let gurl = NSURL(string: "http://www.google.com")
        if (self.isConnectedToNetwork(gurl!) == true){
            self.post(["userid":userProfileID], url: "http://myish.com:\(port)/api/recordtimestamp", isLast: false)
        }

        print(imageCache)
    }
    
    func UpdateComments(commentCount: Int) {
        self.commentsCount = commentCount
        
        if commentsCount == 1{
            self.postComments.setTitle("\(commentsCount) comment", forState: UIControlState.Normal)
        }
        else{
            if commentsCount == 0{
                self.postComments.setTitle("No comments", forState: UIControlState.Normal)
            }
            else{
                self.postComments.setTitle("\(commentsCount) comments", forState: UIControlState.Normal)
            }
            
        }
    }
    
    override func viewWillAppear(animated: Bool) {
        
        //self.tabBarController?.tabBar.layer.zPosition = 0
        self.tabBarController?.tabBar.hidden = false
        if self.cardIndex >= self.cards.count{
        if userProfileID != ""{
            self.cardView.hidden = true
            self.flag = false
            self.actInd.hidden = false
            self.actInd.startAnimating()
            self.CardReload("http://myish.com:\(port)/api/getpostsforuser?userid=\(userProfileID)&limit=10")
        }
        }
        
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "Home screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
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
    
    
    func CardReload(url: String){
        
        self.cardApi.loadCards(url, completion: didLoadAds)
        
    }
    
    
    
    func didLoadAds(cards: [CardData]){
        if cards.count > 0{
            
            for subview in  self.view.subviews{ //remove placeholder imageview
                if subview.isKindOfClass(UIImageView) && subview.tag == 100{
                    subview.removeFromSuperview()
                }
            }
        
            for var ind = 0; ind < cards.count; ++ind{
            self.cards.append(cards[ind])
            }
            
            self.cardcount = cards.count
            self.cardsrolled = self.cardIndex
            self.flagCount = self.cardsrolled
            self.cardView.userInteractionEnabled = true
            self.imgView.userInteractionEnabled = true
            self.postCategory.hidden = false
            self.postDescription.hidden = false
            self.NayButton.hidden = false
            self.YayButton.hidden = false
            self.postTime.hidden = false
            self.postUserName.hidden = false
            self.moreButton.hidden = false
            self.postComments.hidden = false
            self.postCategory.hidden = false
            self.postProfileImg.hidden = false
            self.skipButton.hidden = false
        
        self.postCategory.setTitle(self.cards[cardIndex].category, forState: UIControlState.Normal)
        self.postDescription.text = self.cards[cardIndex].title
        self.NayButton.badgeString = "\(self.cards[cardIndex].postNayCount)"
        self.NayButton.badgeEdgeInsets = UIEdgeInsetsMake(10, 0, 0, 15)
        self.YayButton.badgeString = "\(self.cards[cardIndex].postYayCount)"
        self.YayButton.badgeEdgeInsets = UIEdgeInsetsMake(10, 15, 0, 0)
        self.postTime.text = self.cards[cardIndex].timestamp 
        if self.cards[cardIndex].profileName != ""{
            self.postUserName.text = self.cards[cardIndex].profileName
        }
           
            commentsCount = self.cards[cardIndex].commentCount
            
            if commentsCount == 1{
                self.postComments.setTitle("\(commentsCount) comment", forState: UIControlState.Normal)
            }
            else{
                if commentsCount == 0{
                    self.postComments.setTitle("No comments", forState: UIControlState.Normal)
                }
                else{
                    self.postComments.setTitle("\(commentsCount) comments", forState: UIControlState.Normal)
                }
                
            }

        
        self.postCategory.setTitle(self.cards[cardIndex].category, forState: UIControlState.Normal)

            if self.cards[cardIndex].profileImageURL != ""{
            var postImg = imageCache[self.cards[cardIndex].profileImageURL]
        
            if postImg != nil{
                postImg = Utils.imageResize(postImg!, sizeChange: CGSize(width: 50, height: 50))
                //let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
                self.postProfileImg.setImage(postImg, forState: UIControlState.Normal)
                self.postProfileImg.setImage(Utils.imageResize(postImg! as UIImage, sizeChange: CGSize(width: 50, height: 50)), forState: UIControlState.Normal)
                self.postProfileImg.layer.cornerRadius = (self.postProfileImg.imageView!.frame.size.width)/2
                self.postProfileImg.clipsToBounds = true
                self.postProfileImg.setTitle("", forState: UIControlState.Normal)
            }
                
            else{
                
                let placeHolderProfileImg = Utils.imageResize(UIImage(named: "Myish-circle-transparent")!, sizeChange: CGSize(width: 50, height: 50))
                
                self.postProfileImg.setImage(placeHolderProfileImg, forState: UIControlState.Normal)
                self.postProfileImg.setImage(Utils.imageResize(placeHolderProfileImg as UIImage, sizeChange: CGSize(width: 50, height: 50)), forState: UIControlState.Normal)
                self.postProfileImg.layer.cornerRadius = (self.postProfileImg.imageView!.frame.size.width)/2
                self.postProfileImg.clipsToBounds = true
                self.postProfileImg.setTitle("", forState: UIControlState.Normal)
                
                
                let nurl = NSURL(string: self.cards[cardIndex].profileImageURL)
                self.cards[cardIndex].downloadProfileImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                    if (succeeded == true) && image != nil {
                        let rimage = Utils.imageResize(image!, sizeChange: CGSize(width: 50, height: 50))
                        self.postProfileImg.setImage(image, forState: UIControlState.Normal)
                        self.postProfileImg.setImage(Utils.imageResize(rimage as UIImage, sizeChange: CGSize(width: 50, height: 50)), forState: UIControlState.Normal)
                        self.postProfileImg.layer.cornerRadius = (self.postProfileImg.imageView!.frame.size.width)/2
                        self.postProfileImg.clipsToBounds = true
                        self.postProfileImg.setTitle("", forState: UIControlState.Normal)
                        
                    }
                    else {
                        
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
   
        
        
        for var index = self.cardsrolled!; index < self.cards.count; ++index{
            
            let url = NSURL(string: self.cards[index].imageURL!)
            
            if imageCache[self.cards[index].imageURL!] == nil{
                self.cards[index].downloadImageWithUrl(url!, completionHandler: { (succeeded, image) -> Void in
                    
                    if (succeeded == true) && image != nil {
                       // self.imgView =  UIImageView(image: self.cards[index].image)
                        //self.actInd.stopAnimating()
                        //self.cards[index].image = image
                        self.flagCount =  self.flagCount + 1
                        if  self.flagCount == (self.cards.count){
                            
                            if self.actInd.isAnimating(){
                            self.actInd.stopAnimating()
                            }
                           // self.currentIndex = 0
                            self.cardView.hidden = false
                            self.cardView.reloadData()
                            //self.cardView.resetCurrentCardNumber()
                            self.cardView.bringSubviewToFront(self.NayButton)
                            self.cardView.bringSubviewToFront(self.YayButton)
                            self.cardView.bringSubviewToFront(self.skipButton)

                        }
                        
                    }
                    else{
                        self.flagCount =  self.flagCount + 1
                        if  self.flagCount == (self.cards.count){
                            if self.actInd.isAnimating(){
                                self.actInd.stopAnimating()
                            }
                           // self.currentIndex = 0
                            self.cardView.hidden = false
                            self.cardView.reloadData()
                            //self.cardView.resetCurrentCardNumber()
                            
                            self.cardView.bringSubviewToFront(self.NayButton)
                            self.cardView.bringSubviewToFront(self.YayButton)
                            self.cardView.bringSubviewToFront(self.skipButton)

                        }
                    }
                 
                })
            }
            else{
                self.flagCount =  self.flagCount + 1
                if  self.flagCount == (self.cards.count){
                    if self.actInd.isAnimating(){
                        self.actInd.stopAnimating()
                    }
                    // self.currentIndex = 0
                    self.cardView.hidden = false
                    self.cardView.reloadData()
                    //self.cardView.resetCurrentCardNumber()
                    
                    self.cardView.bringSubviewToFront(self.NayButton)
                    self.cardView.bringSubviewToFront(self.YayButton)
                    self.cardView.bringSubviewToFront(self.skipButton)

                }
            }

            }
        }
        else{
            let imgVw = UIImageView(image: UIImage(named: "placeholder")!)
            imgVw.frame = self.view.frame
            imgVw.backgroundColor = UIColor.clearColor()
            self.view.addSubview(imgVw)
            imgVw.tag = 100
            //self.cardView.addSubview(imgVw)
//            self.cardView.userInteractionEnabled = false
            self.actInd.stopAnimating()
            //self.cardView.hidden = false
            
        }
 
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    @IBOutlet weak var cardView: CardView!
    
    //MARK: KolodaViewDataSource
    func kolodaNumberOfCards(koloda: KolodaView) -> UInt {
        return UInt(self.cards.count - self.cardsrolled)
        
        //return numberOfCards
    }
    
    func kolodaViewForCardAtIndex(koloda: KolodaView, index: UInt) -> UIView {
        
        //if Int(index) < self.cardcount{

        if imageCache[self.cards[self.cardsrolled + Int(index)].imageURL!] != nil {
            
            self.imgView = UIImageView(image: imageCache[self.cards[self.cardsrolled + Int(index)].imageURL!])
            //self.imgView.contentMode = UIViewContentMode.ScaleAspectFill
            
            self.imgView.layer.cornerRadius = 10.0
            self.imgView.clipsToBounds = true
            
            self.cardView.insertSubview(self.skipButton, aboveSubview: self.imgView)
            self.cardView.insertSubview(self.NayButton, aboveSubview: self.imgView)
            self.cardView.insertSubview(self.YayButton, aboveSubview: self.imgView)

            }
        else{
            self.imgView = UIImageView(image: UIImage(named: "placeholder"))
            //self.imgView.contentMode = UIViewContentMode.ScaleAspectFill
            
            self.imgView.layer.cornerRadius = 10.0
            self.imgView.clipsToBounds = true
            
            self.cardView.insertSubview(self.skipButton, aboveSubview: self.imgView)
            self.cardView.insertSubview(self.NayButton, aboveSubview: self.imgView)
            self.cardView.insertSubview(self.YayButton, aboveSubview: self.imgView)
        }

        return self.imgView
    }
    
    @IBAction func moreButtonPressed(sender: UIButton) {
        
        self.actioncontroller()
    }

    
    func kolodaViewForCardOverlayAtIndex(koloda: KolodaView, index: UInt) -> OverlayView? {
        return NSBundle.mainBundle().loadNibNamed("OverView",
            owner: self, options: nil)[0] as? OverlayView
    }
    @IBAction func skipButtonTapped(sender: UIButton) {
    
        cardView.swipe(SwipeResultDirection.Up)
        
    }

    @IBAction func leftButtonTapped(sender: UIButton) {
        
        cardView.swipe(SwipeResultDirection.Left)
 
    }
    
    
    @IBAction func rightButtonTapped(sender: UIButton) {
        cardView.swipe(SwipeResultDirection.Right)
  
    }
    
    func kolodaDidSwipedCardAtIndex(koloda: KolodaView, index: UInt, direction: SwipeResultDirection) {
        print("index: \(index)")
        if self.cardIndex < self.cards.count{
        switch direction {
        case SwipeResultDirection.None:
            break
        case SwipeResultDirection.Left:
            if self.cardIndex == (self.cards.count - 1){
               post(["postid":self.cards[cardIndex].id, "userid":userProfileID], url: "http://myish.com:\(port)/api/postnayall", isLast: true)
            }
            else{
                post(["postid":self.cards[cardIndex].id, "userid":userProfileID], url: "http://myish.com:\(port)/api/postnayall", isLast: false)
            }
            
            if self.cards[cardIndex].postedBy != ""{
            post(["userid":self.cards[cardIndex].postedBy], url: "http://myish.com:\(port)/api/addpoints", isLast: false)
            }
            
        case SwipeResultDirection.Right:
            if self.cardIndex == (self.cards.count - 1){
                post(["postid":self.cards[cardIndex].id, "userid":userProfileID], url: "http://myish.com:\(port)/api/postyayall", isLast: true)
            }
            else{
                post(["postid":self.cards[cardIndex].id, "userid":userProfileID], url: "http://myish.com:\(port)/api/postyayall", isLast: false)
            }
            
            if self.cards[cardIndex].postedBy != ""{
                post(["userid":self.cards[cardIndex].postedBy], url: "http://myish.com:\(port)/api/addpoints", isLast: false)
            }
        case SwipeResultDirection.Up:
            if self.cardIndex == (self.cards.count - 1){
                post(["postid":self.cards[cardIndex].id, "userid":userProfileID], url: "http://myish.com:\(port)/api/postskipall", isLast: true)
            }
            else{
                post(["postid":self.cards[cardIndex].id, "userid":userProfileID], url: "http://myish.com:\(port)/api/postskipall", isLast: false)
            }
            
            }
            
        }
        
        
        cardIndex = cardIndex + 1
        
        if self.cardIndex <= self.cards.count{
            if self.cardIndex < self.cards.count{
        self.postCategory.setTitle(self.cards[cardIndex].category, forState: UIControlState.Normal)
        self.postDescription.text = self.cards[cardIndex].title
        self.NayButton.badgeString = "\(self.cards[cardIndex].postNayCount)"
        self.NayButton.badgeEdgeInsets = UIEdgeInsetsMake(10, 0, 0, 15)
        self.YayButton.badgeString = "\(self.cards[cardIndex].postYayCount)"
        self.YayButton.badgeEdgeInsets = UIEdgeInsetsMake(10, 15, 0, 0)
        if self.cards[cardIndex].profileName != ""{
        self.postUserName.text = self.cards[cardIndex].profileName
        }
        self.postTime.text = self.cards[cardIndex].timestamp
                if self.cards[cardIndex].commentCount == 1{
                    self.postComments.setTitle("\(self.cards[cardIndex].commentCount) comment", forState: UIControlState.Normal)
                }
                else{
                    if self.cards[cardIndex].commentCount == 0{
                        self.postComments.setTitle("No comments", forState: UIControlState.Normal)
                    }
                    else{
                        self.postComments.setTitle("\(self.cards[cardIndex].commentCount) comments", forState: UIControlState.Normal)
                    }
                }
        self.postCategory.setTitle(self.cards[cardIndex].category, forState: UIControlState.Normal)
            //self.postDescription.font = UIFont(name: "lveticaneueltstdroman", size: 17.0)!
            //self.postComments.titleLabel!.font = UIFont(name: "lveticaneueltstdroman", size: 15.0)!
            if self.cards[cardIndex].profileImageURL != ""{
                
                var profileImg = imageCache[self.cards[cardIndex].profileImageURL]
                
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
                    //set placeholder image until actual image downloads
                    let profileImg = Utils.imageResize(UIImage(named: "Myish-circle-transparent")!, sizeChange: CGSize(width: 50, height: 50))
                    self.postProfileImg.setImage(profileImg, forState: UIControlState.Normal)
                    self.postProfileImg.layer.cornerRadius = (self.postProfileImg.imageView!.frame.size.width)/2
                    self.postProfileImg.clipsToBounds = true
                    self.postProfileImg.setTitle("", forState: UIControlState.Normal)
                    
                    //download actual image
                    let nurl = NSURL(string: self.cards[cardIndex].profileImageURL)
                    
                    self.cards[cardIndex].downloadProfileImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
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
            }
            else{
                
                self.postCategory.hidden = true
                self.postDescription.hidden = true
                self.NayButton.hidden = true
                self.YayButton.hidden = true
                self.postTime.hidden = true
                self.postUserName.hidden = true
                self.moreButton.hidden = true
                self.postComments.hidden = true
                self.postCategory.hidden = true
                self.postProfileImg.hidden = true
                self.skipButton.hidden = true
                self.cardView.hidden = true
                self.cardView.userInteractionEnabled = false
                self.imgView.userInteractionEnabled = false
                self.actInd.startAnimating()
                

            }
        }

    }
    
    func kolodaDidRunOutOfCards(koloda: KolodaView) {
       
        //self.currentIndex = 0
        //self.cardView.reloadData()
        //cardView.resetCurrentCardNumber()
    }
    
    func kolodaDidSelectCardAtIndex(koloda: KolodaView, index: UInt) {
        //UIApplication.sharedApplication().openURL(NSURL(string: "http://google.com/")!)
    }
    
    func kolodaShouldApplyAppearAnimation(koloda: KolodaView) -> Bool {
        return true
    }
    
    func kolodaShouldMoveBackgroundCard(koloda: KolodaView) -> Bool {
        return false
    }
    
    func kolodaShouldTransparentizeNextCard(koloda: KolodaView) -> Bool {
        return false
    }
    
    func kolodaBackgroundCardAnimation(koloda: KolodaView) -> POPPropertyAnimation? {
        let animation = POPSpringAnimation(propertyNamed: kPOPViewFrame)
        animation.springBounciness = frameAnimationSpringBounciness
        animation.springSpeed = frameAnimationSpringSpeed
        return animation
    }
    
    func post(params : Dictionary<String, String>, url : String, isLast: Bool) {
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
            print("Response: \(response)")
            if error == nil{
                let strData = NSString(data: data!, encoding: NSUTF8StringEncoding)
                if isLast == true{
                    if userProfileID != ""{
                        self.flag = true
                        self.cardView.resetCurrentCardNumber()
                        self.actInd.hidden = false
                        self.actInd.startAnimating()
                        self.CardReload("http://myish.com:\(port)/api/getpostsforuser?userid=\(userProfileID)&limit=10")
                        
                    }
                }
                
            }
            else {
                print("Error: \(error?.localizedDescription)")
                
            }
            
        })
        
        task.resume()
    }
    
    func actioncontroller(){

        let actionSheetController: UIAlertController = UIAlertController(title: nil, message: nil, preferredStyle: UIAlertControllerStyle.ActionSheet)
        
        
        //Create and add first option action
        let takePictureAction: UIAlertAction = UIAlertAction(title: "Social sharing", style: UIAlertActionStyle.Default)
            { action -> Void in
                let text: String = self.cards[self.cardIndex].title!
                let img: UIImage = imageCache[self.cards[self.cardIndex].imageURL!]!
                let pid = self.cards[self.cardIndex].id
                
                
                
                    var tf = UITextView.self
                var URL = NSURL(string:  "https://myish.app.link/vk3Vh1Fexw?postid=\(pid)")!
                   // var URL = ["my-ish", NSURL(string: "myishtest://&postid=\(pid)")!]
                    var str = NSMutableAttributedString(string: "https://myish.app.link/vk3Vh1Fexw?postid=\(pid)")
                    str.addAttribute(NSLinkAttributeName, value: URL, range: NSMakeRange(0, str.length))
                

                
                self.branchUniversalObject.addMetadataKey("postid", value: "\(pid)")
                
                let linkProperties: BranchLinkProperties = BranchLinkProperties()
                linkProperties.feature = "sharing"
                //linkProperties.channel = "facebook"
                linkProperties.addControlParam("$desktop_url", withValue: "http://www.myish.com/")
                linkProperties.addControlParam("$ios_url", withValue: "myish://")
                
                     //let objectsToShare = [NSURL(string: "https://myish.app.link/vk3Vh1Fexw?postid=\(pid)")!, str]
                
                self.branchUniversalObject.getShortUrlWithLinkProperties(linkProperties,  andCallback: { (optUrl: String?, error: NSError?) -> Void in
                    if error == nil{
                        if let url = optUrl {
                            
                        print("got my Branch link to share: %@", url)
                            let objectsToShare = [NSURL(string:url)!,""]
                            
                            let activityVC = UIActivityViewController(activityItems: objectsToShare, applicationActivities: nil)
                            
                            self.presentViewController(activityVC, animated: true, completion: nil)
                            UIApplication.sharedApplication()

                    }
                    }
                })
               
                
                     // self.presentViewController(activityVC, animated: true, completion: nil)
                
                     // UIApplication.sharedApplication()
              
        
        }
        
        actionSheetController.addAction(takePictureAction)
        //Create and add a second option action
        
        
        let choosePictureAction: UIAlertAction = UIAlertAction(title: "Report abuse", style: UIAlertActionStyle.Destructive)
            { action -> Void in
                
                let alertController = UIAlertController(title: "Report abuse!!", message: "Are your sure you want to report this post", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let YESAction = UIAlertAction(title: "YES", style: .Default) { (action:UIAlertAction) in
                    let gurl = NSURL(string: "http://www.google.com")
                    if (self.isConnectedToNetwork(gurl!) == true){
                        self.post(["userid":userProfileID, "postid":self.cards[self.cardIndex].id], url: "http://myish.com:\(port)/api/reportabusepost", isLast: false)
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

    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?)
    {
        if segue.identifier == "viewcomments"
            
        {
            if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN())
            {
                let alertController = UIAlertController(title: "Comment Page Unavailable!!", message: "No Internet Connection.", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    
//                    self.actInd.stopAnimating()
//                    self.navigationController?.popToRootViewControllerAnimated(true)
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
            
            else
            {
                let commentController = segue.destinationViewController as! CommentViewController
                commentController.postID = self.cards[cardIndex].id
                commentController.profilename = self.cards[cardIndex].profileName
                commentController.profileimageURL = self.cards[cardIndex].profileImageURL
                commentController.postedby = self.cards[cardIndex].profileName
                commentController.posttitle = self.cards[cardIndex].title
                commentController.postedbyimage = UIImage()
                commentController.time = self.cards[cardIndex].timestamp
                
                if imageCache[self.cards[cardIndex].profileImageURL!] != nil
                {
                    commentController.postedbyimage = imageCache[self.cards[cardIndex].profileImageURL!]
                }
                else
                {
                   // commentController.postedbyimage = UIImage(named: "User blue")
                    commentController.postedbyimage = UIImage(named: "Myish-circle-transparent")
                }
                commentController.commentsDelegate = self
                
            }
            
    }
        
        
        
        
        if segue.identifier == "profilePost"
        {
            
            
            if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN())
            {
                let alertController = UIAlertController(title: "Profile Unavailable !!", message: "No Internet Connection", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    
//                    self.actInd.stopAnimating()
//                    self.navigationController?.popToRootViewControllerAnimated(true)
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
            
            else
                
            {
                if self.cardIndex >= 0
                {
                    if self.cards[self.cardIndex].id == userProfileID
                    {
                        self.tabBarController?.selectedIndex = 5
                    }
                        
                    else
                    {
                        let profileController = segue.destinationViewController as! UserProfileViewController
                        profileController.profileID = self.cards[cardIndex].postedBy
                    }
                }
                
            }
            
    }
        
        
        
}
}









