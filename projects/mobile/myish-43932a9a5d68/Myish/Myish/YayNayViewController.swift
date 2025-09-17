//
//  SearchViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 9/25/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class YayNayViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, UIGestureRecognizerDelegate{
    
    @IBOutlet weak var tableView: UITableView!
    
    @IBOutlet weak var actInd: UIActivityIndicatorView!
    @IBOutlet weak var segmentControl: UISegmentedControl!
    
    var yayApi: YayNayApi!
    var nayApi: YayNayApi!

    var yays: [YayNayData]!
    var nays: [YayNayData]!
    
    var profilename: String!
    var profileImageURL: String!
    var postTag: Int!
    var currentPage = 0
    var isNewDataLoading = true
   // var yaycount = 0
    //var naycount = 0
    
   

    
     override func viewDidLoad()
     {
        super.viewDidLoad()
        self.yayApi = YayNayApi()
        self.nayApi = YayNayApi()

        self.yays = [YayNayData]()
        self.nays = [YayNayData]()
        
//        yays.sortInPlace({ $0.timestamp.compare($1.timestamp) == NSComparisonResult.OrderedAscending })
//        nays.sortInPlace({ $0.timestamp.compare($1.timestamp) == NSComparisonResult.OrderedAscending })
        
        self.tableView.delegate = self
        self.tableView.dataSource = self
        self.postTag = -1
        let colors = Colors()
        self.view.backgroundColor = UIColor.clearColor()
        let backgroundLayer = colors.gl
        backgroundLayer.frame = self.view.frame
        self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
        self.tableView.backgroundColor = UIColor.clearColor()
        self.tableView.hidden = true
        self.segmentControl.backgroundColor = UIColor.clearColor()
        self.segmentControl.tintColor = UIColor.whiteColor()

//        if userProfileID != ""{
//            
//            YayLoad("http://myish.com:3000/api/getpostsuseryay?userid=\(userProfileID)")
//            
//            NayLoad("http://myish.com:3000/api/getpostsusernay?userid=\(userProfileID)")
//        }

//
//         self.tableView.reloadData()
        
    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)
        if userProfileID != ""{
            self.actInd.startAnimating()
            
           //YayLoad("http://myish.com:\(port)/api/getpostsuseryay?userid=\(userProfileID)")
           //NayLoad("http://myish.com:\(port)/api/getpostsusernay?userid=\(userProfileID)")
               self.yays = [YayNayData]()
               self.nays = [YayNayData]()
               getNewData()
            
            
//            YayLoad("http://myish.com:\(port)/api/newgetpostsuseryay/\(userProfileID)/\(currentPage)")
//            NayLoad("http://myish.com:\(port)/api/newgetpostsusernay/\(userProfileID)/\(currentPage)")
         
//          
           
        }
        
}
    
    
    func getNewData()
    {
        if segmentControl.selectedSegmentIndex == 0
        {
            if currentPage == 0
            {
                self.yays = [YayNayData]()
                
                
            }
            YayLoad("http://myish.com:\(port)/api/newgetpostsuseryay/\(userProfileID)/\(currentPage)")
            print("http://myish.com:\(port)/api/newgetpostsuseryay/\(userProfileID)/\(currentPage)")
            print(yays.count)
            
        }
        else
        {
            if currentPage == 0
            {
                self.nays = [YayNayData]()
               
               
            }
        
         NayLoad("http://myish.com:\(port)/api/newgetpostsusernay/\(userProfileID)/\(currentPage)")
            print("http://myish.com:\(port)/api/newgetpostsusernay/\(userProfileID)/\(currentPage)")
            print(nays.count)
            
        
        }
       
    }
    
    func scrollViewDidEndDragging(scrollView: UIScrollView, willDecelerate decelerate: Bool) {
        
        //Bottom Refresh
        
       
            
            if (scrollView.contentOffset.y >= (scrollView.contentSize.height - scrollView.frame.size.height))
            {
                if isNewDataLoading == true{
                    
                   
                        
                        //isNewDataLoading = true
                        currentPage++
                        getNewData()
                    
                }
            }
        
    }
    
    
    
    override func viewWillAppear(animated: Bool) {
       // self.segmentControl.addBottomBar(2.0, color: UIColor(red: 0.22, green: 0.39, blue: 0.55, alpha: 1.0))
       // self.segmentControl.backgroundColor = UIColor(red: 0.22, green: 0.39, blue: 0.55, alpha: 1.0)
        
//        if userProfileID != ""{
//
//            YayLoad("http://myish.com:3000/api/getpostsuseryay?userid=\(userProfileID)")
//
//            NayLoad("http://myish.com:3000/api/getpostsusernay?userid=\(userProfileID)")
//        }
//
//         self.tableView.reloadData()
        
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "YayNay Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
        
    }
    
    @IBAction func backButtonPressed(sender: UIButton) {
    self.navigationController?.popViewControllerAnimated(true)
    
    }
    
    func YayLoad(url: String){
        
        //self.searchApi.loadSearch(url, completion: didLoadSearch)
        self.actInd.startAnimating()
        self.view.userInteractionEnabled = false
        self.yayApi.loadYayNay(url, completion: didLoadYaySearch)
    }
    
    func didLoadYaySearch(yaynay: [YayNayData]){
        self.actInd.stopAnimating()
        self.view.userInteractionEnabled = true
        if yaynay.count > 0
        {
           // self.yays = [YayNayData]()
           
           // self.yays.appendContentsOf(<#T##newElements: CollectionType##CollectionType#>) = yaynay
            self.yays = self.yays + yaynay
            self.tableView.hidden = false
            self.tableView.reloadData()
           
          
        }
        else
        {
            isNewDataLoading = false
        }
        
       
       
    }
    
    func NayLoad(url: String){
        
        //self.searchApi.loadSearch(url, completion: didLoadSearch)
        self.actInd.startAnimating()
        self.view.userInteractionEnabled = false
         self.nayApi.loadYayNay(url, completion: didLoadNaySearch)
        
    }
    
    func didLoadNaySearch(yaynay: [YayNayData]){
        self.actInd.stopAnimating()
        self.view.userInteractionEnabled = true
     if yaynay.count > 0
        {
       // self.nays = [YayNayData]()
        self.nays = self.nays + yaynay
        self.tableView.hidden = false
        self.tableView.reloadData()
        }
        else
        {
            isNewDataLoading = false
        }
    }

    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    func numberOfSectionsInTableView(tableView: UITableView) -> Int {

        var rows: Double = 0
        if segmentControl.selectedSegmentIndex == 0{
            if self.yays.count > 0{
         rows = Double(self.yays.count)/3.0
            }
        }
        else{
            if self.nays.count > 0{
             rows = Double(self.nays.count)/3.0
            }
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
        let scale: CGFloat = 0.0 // Automatically use scale factor of main screen
        
        UIGraphicsBeginImageContextWithOptions(sizeChange, !hasAlpha, scale)
        imageObj.drawInRect(CGRect(origin: CGPointZero, size: sizeChange))
        
        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext() // !!!
        return scaledImage
    }
    
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        
        self.actInd.stopAnimating()
        
        
        let cell = tableView.dequeueReusableCellWithIdentifier("post_2", forIndexPath: indexPath) as! YayNayViewCell
        
//        
//        cell.cellImageView.image = UIImage(named: "placeholder")  //set placeholder image first.
//        cell.cellImageView.downloadImageFrom(link: imageLinkArray[indexPath.row], contentMode: UIViewContentMode.ScaleAspectFit)  //set your image from link array.
        
        
        //cell.backgroundColor = UIColor.clearColor()
        
        var yaynay = [YayNayData]()
        
        if segmentControl.selectedSegmentIndex == 0{
            yaynay = yays
        }
        else{
            yaynay = nays
        }

        if yaynay.count > 0{
            
            if (3*indexPath.section) < yaynay.count{
                
                //cell.lbl1.hidden = false
                //cell.img1.hidden = false
                
                let tapGestureRecognizer4 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                let tapGestureRecognizer7 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                
                cell.img1.userInteractionEnabled = true
                cell.img1.addGestureRecognizer(tapGestureRecognizer4)
                tapGestureRecognizer4.view!.tag = 3*indexPath.section
                
                cell.lbl1.userInteractionEnabled = true
                cell.lbl1.addGestureRecognizer(tapGestureRecognizer7)
                tapGestureRecognizer7.view!.tag = 3*indexPath.section
                
                
                
                let searchImg1 = imageCache[yaynay[(3*indexPath.section)].imageURL!]
                
                if searchImg1 != nil{
                    cell.lbl1.hidden = false
                    cell.img1.hidden = false
                    cell.img1.image = searchImg1
                    cell.lbl1.setBackgroundImage(UIImage(named: "pyramid3"), forState: UIControlState.Normal)
                    cell.lbl1.setTitle(yaynay[(3*indexPath.section)].title, forState: UIControlState.Normal)
                }
                    
                else{
                    //img = UIImage(named: "whitebkg")
                    let nurl = NSURL(string: yaynay[(3*indexPath.section)].imageURL!)
                    cell.img1.image = UIImage()
                    cell.lbl1.setTitle("", forState: UIControlState.Normal)
                    yaynay[(3*indexPath.section)].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                        if (succeeded == true) && image != nil{
                            cell.lbl1.hidden = false
                            cell.img1.hidden = false
                            cell.img1.image = image
                            cell.lbl1.setBackgroundImage(UIImage(named: "pyramid3"), forState: UIControlState.Normal)
                            cell.lbl1.setTitle(yaynay[(3*indexPath.section)].title, forState: UIControlState.Normal)
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
            
            if (3*indexPath.section + 1) < yaynay.count{
                
                //cell.lbl2.hidden = false
                //cell.img2.hidden = false
                
                let tapGestureRecognizer5 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                let tapGestureRecognizer8 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                
                cell.img2.userInteractionEnabled = true
                cell.img2.addGestureRecognizer(tapGestureRecognizer5)
                tapGestureRecognizer5.view!.tag = 3*indexPath.section + 1
                
                cell.lbl2.userInteractionEnabled = true
                cell.lbl2.addGestureRecognizer(tapGestureRecognizer8)
                tapGestureRecognizer8.view!.tag = 3*indexPath.section + 1
                
                
                
                let searchImg2 = imageCache[yaynay[(3*indexPath.section + 1)].imageURL!]
                
                if searchImg2 != nil{
                    cell.lbl2.hidden = false
                    cell.img2.hidden = false
                    cell.img2.image = searchImg2
                    cell.lbl2.setBackgroundImage(UIImage(named: "pyramid3"), forState: UIControlState.Normal)
                    cell.lbl2.setTitle(yaynay[(3*indexPath.section + 1)].title, forState: UIControlState.Normal)
                }
                    
                else{
                    //img = UIImage(named: "whitebkg")
                    let nurl = NSURL(string: yaynay[(3*indexPath.section + 1)].imageURL!)
                    cell.img2.image = UIImage()
                    cell.lbl2.setTitle("", forState: UIControlState.Normal)
                    yaynay[(3*indexPath.section + 1)].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                        if (succeeded == true) && image != nil{
                            cell.lbl2.hidden = false
                            cell.img2.hidden = false
                            cell.img2.image = image
                            cell.lbl2.setBackgroundImage(UIImage(named: "pyramid3"), forState: UIControlState.Normal)
                            cell.lbl2.setTitle(yaynay[(3*indexPath.section + 1)].title, forState: UIControlState.Normal)
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
            
            if (3*indexPath.section + 2) < yaynay.count{
                
                //cell.lbl3.hidden = false
                //cell.img3.hidden = false
                
                let tapGestureRecognizer6 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                let tapGestureRecognizer9 = UITapGestureRecognizer(target:self, action:Selector("Tapped4:"))
                
                cell.img3.userInteractionEnabled = true
                cell.img3.addGestureRecognizer(tapGestureRecognizer6)
                tapGestureRecognizer6.view!.tag = 3*indexPath.section + 2
                
                cell.lbl3.userInteractionEnabled = true
                cell.lbl3.addGestureRecognizer(tapGestureRecognizer9)
                tapGestureRecognizer9.view!.tag = 3*indexPath.section + 2
                
                cell.lbl3.setBackgroundImage(UIImage(named: "pyramid3"), forState: UIControlState.Normal)
                cell.lbl3.setTitle(yaynay[(3*indexPath.section + 2)].title, forState: UIControlState.Normal)
                
                let searchImg3 = imageCache[yaynay[(3*indexPath.section + 2)].imageURL!]
                
                if searchImg3 != nil{
                    cell.lbl3.hidden = false
                    cell.img3.hidden = false
                    cell.img3.image = searchImg3
                    cell.lbl3.setBackgroundImage(UIImage(named: "pyramid3"), forState: UIControlState.Normal)
                    cell.lbl3.setTitle(yaynay[(3*indexPath.section + 2)].title, forState: UIControlState.Normal)
                }
                    
                else{
                    //img = UIImage(named: "whitebkg")
                    let nurl = NSURL(string: yaynay[(3*indexPath.section + 2)].imageURL!)
                    cell.img3.image = UIImage()
                    cell.lbl3.setTitle("", forState: UIControlState.Normal)
                    yaynay[(3*indexPath.section + 2)].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
                        if (succeeded == true) && image != nil{
                            cell.lbl3.hidden = false
                            cell.img3.hidden = false
                            cell.img3.image = image
                            cell.lbl3.setBackgroundImage(UIImage(named: "pyramid3"), forState: UIControlState.Normal)
                            cell.lbl3.setTitle(yaynay[(3*indexPath.section + 2)].title, forState: UIControlState.Normal)
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
    
    @IBAction func indexChanged(sender: UISegmentedControl) {
        
        if segmentControl.selectedSegmentIndex == 0{
            isNewDataLoading = true
            currentPage = 0
            self.yays = [YayNayData]()
            tableView.reloadData()
                        YayLoad("http://myish.com:\(port)/api/newgetpostsuseryay/\(userProfileID)/\(currentPage)")
                    }
                    else{
              self.nays = [YayNayData]()
            isNewDataLoading = true
            currentPage = 0
            tableView.reloadData()
                        NayLoad("http://myish.com:\(port)/api/newgetpostsusernay/\(userProfileID)/\(currentPage)")
                    }
        self.postTag = -1
        
        tableView.reloadData()
    }
    
    func Tapped4(img: AnyObject)
    {
        self.postTag = img.view!.tag
        performSegueWithIdentifier("yaynaypost", sender: img)
        
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?)
    {
        if segue.identifier == "yaynaypost"
        {
            
            if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN())
            {
                let alertController = UIAlertController(title: "Post Unreachable!!", message: "No Internet Connection to Update.", preferredStyle: UIAlertControllerStyle.Alert)
                
                
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
                postCard.profileName = self.profilename
                postCard.profileImageURL = self.profileImageURL
                if self.postTag >= 0{
                    if self.segmentControl.selectedSegmentIndex == 0{
                        postCard.id = self.yays[self.postTag].id
                    }
                    else{
                        postCard.id = self.nays[self.postTag].id
                    }
                }
                let posts = segue.destinationViewController as! PostViewController
                posts.cards = postCard
            }
            
        }
    }
    
    
//    private func handleResponse(data: NSData!, response: NSURLResponse!, error: NSError!) {
//       
//        
//        var jsonError: NSError?
//        var responseDict: [String: AnyObject]?
//        
//        do {
//            responseDict = try NSJSONSerialization.JSONObjectWithData(data, options: NSJSONReadingOptions()) as? [String: AnyObject]
//        } catch {
//            jsonError = NSError(domain: "JSONError", code: 1, userInfo: [ NSLocalizedDescriptionKey: "Failed to parse JSON." ])
//        }
//        
////        if let jsonError = jsonError {
////            showAlertWithError(jsonError)
////            return
////        }
//        
//        if let pages = responseDict?["nbPages"] as? NSNumber {
//            numPages = pages as Int
//        }
//        
//        if let results = responseDict?["hits"] as? [[String: AnyObject]] {
//            currentPage++
//            
////            for i in results {
////                stories.append(StoryModel(i))
////            }
//            
//            tableView.reloadData()
//        }
//    }

    
    
//    func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int
//    {
//        return 3
//    }
//    
//    
//    
//    func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell
//    {
//        let cell = collectionView.dequeueReusableCellWithReuseIdentifier("postCell", forIndexPath: indexPath)
//        
//        //cell.frame.size.width = 120
//        
//        let img = cell.viewWithTag(100) as! UIImageView
//        let searchImg = self.searchResult[indexPath.row].imageCache[self.searchResult[indexPath.row].imageURL!]
//        
//        
//        if searchImg != nil{
//            img.image = searchImg
//            //cell.ADImage.setBackgroundImage(ad.ADimage, forState: UIControlState.Selected)
//            //cell.ADImage.setBackgroundImage(ad.ADimage, forState: UIControlState.Highlighted)
//        }
//            
//        else{
//            //img = UIImage(named: "whitebkg")
//            let nurl = NSURL(string: self.searchResult[indexPath.row].imageURL!)
//            //cell.ActInd.startAnimating()
//            self.searchResult[indexPath.row].downloadImageWithUrl(nurl!, completionHandler: { (succeeded, image) -> Void in
//                if (succeeded == true) {
//                    // println("AD image loaded")
//                    img.image = image
//                    
//                }
//                else {
//                    //println("AD image didnt load")
//                }
//            })
//            
//        }
//        
//        return cell
//        
//    }
//    
//    func collectionView(collectionView: UICollectionView, didSelectItemAtIndexPath indexPath: NSIndexPath)
//    {
//        //self.performSegueWithIdentifier("showImage", sender: self)
//    }
//    
//    func searchBarTextDidBeginEditing(searchBar: UISearchBar) {
//        //searchActive = true;
//    }
//    
//    func searchBarTextDidEndEditing(searchBar: UISearchBar) {
//        //searchActive = false;
//    }
//    
//    func searchBarCancelButtonClicked(searchBar: UISearchBar) {
//        //searchActive = false;
//    }
//    
//    func searchBarSearchButtonClicked(searchBar: UISearchBar) {
//        //searchActive = false;
//        let searchText = searchBar.text
//        if segmentControl.selectedSegmentIndex == 0{
//            SearchUserReload("http://myish.com:3000/api/searchuser?searchtext=\(searchText!)")
//        }
//        else{
//            SearchReload("http://myish.com:3000/api/searchpost?searchtext=\(searchText!)")
//        }
//    }
//    
//    func searchBar(searchBar: UISearchBar, textDidChange searchText: String) {
//        
//        
//    }
    
    /*
    // Override to support conditional editing of the table view.
    override func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool {
    // Return false if you do not want the specified item to be editable.
    return true
    }
    */
    
    /*
    // Override to support editing the table view.
    override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
    if editingStyle == .Delete {
    // Delete the row from the data source
    tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: .Fade)
    } else if editingStyle == .Insert {
    // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
    }
    }
    */
    
    /*
    // Override to support rearranging the table view.
    override func tableView(tableView: UITableView, moveRowAtIndexPath fromIndexPath: NSIndexPath, toIndexPath: NSIndexPath) {
    
    }
    */
    
    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(tableView: UITableView, canMoveRowAtIndexPath indexPath: NSIndexPath) -> Bool {
    // Return false if you do not want the item to be re-orderable.
    return true
    }
    */
    
    /*
    // MARK: - Navigation
    
    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
    // Get the new view controller using segue.destinationViewController.
    // Pass the selected object to the new view controller.
    }
    */
    
}



//extension UIImageView {
//    func downloadImageFrom(link link:String, contentMode: UIViewContentMode) {
//        NSURLSession.sharedSession().dataTaskWithURL( NSURL(string:link)!, completionHandler: {
//            (data, response, error) -> Void in
//            dispatch_async(dispatch_get_main_queue()) {
//                self.contentMode =  contentMode
//                if let data = data { self.image = UIImage(data: data) }
//            }
//        }).resume()
//    }


