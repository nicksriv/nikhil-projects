//
//  MenuViewcontroller.swift
//  Holbe
//
//  Created by Appsriv Technologies on 22/04/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

//var images = ["calendar-blue","overview-grey","profile-icon","settings-icon","Practitioner-grey","logout-icon"]

var images = ["overview-grey","calendar-blue","profile-icon","settings-icon","Practitioner-grey","logout-icon"]

class MenuViewcontroller: UIViewController,UITableViewDelegate,UITableViewDataSource,MenuTransitionManagerDelegate//, UIGestureRecognizerDelegate
{
    
    //@IBOutlet var tapGesture: UITapGestureRecognizer!
    var nsadata:NSData!

    @IBOutlet weak var imageDisplay: UIImageView!
    @IBOutlet weak var tableview: UITableView!
    
    @IBOutlet weak var usercitydisplayLabel: UILabel!
    @IBOutlet weak var usernamedisplayLabel: UILabel!
    
    let image = UIImage()

//    var viewcontrollers = [ "Overview","Profile","Log out"]
//    var images = ["overview-icon","profile-icon","logout-icon"]
//    var currentItem : String?
//    
//    override func viewDidLoad() {
//        
//        if userProfilepicture != "" 
//        {
////            print(userProfilepicture)
////            
////            let urlString :String =  userProfilepicture.stringByAddingPercentEncodingWithAllowedCharacters(NSCharacterSet.URLQueryAllowedCharacterSet())!
////            
////            if let url = NSURL(string: "\(urlString)")
////            {
////                if let data = NSData(contentsOfURL: url)
////                {
////                    imageDisplay.image = UIImage(data: data)
////                }
////            }
//            if nsdata != nil
//            {
//            imageDisplay.image = UIImage(data: nsdata)
//            }
//           
//
//            }
//            
//        
//        else
//        {
//            imageDisplay.image = UIImage(named: "default")
//        }
//        
//        
//        // UItableview delegate and datasource
//        self.tableview.delegate = self
//        self.tableview.dataSource = self
//        usernamedisplayLabel.text = userfirstName!
//        usercitydisplayLabel.text = usercityName!
//        
//        tapGesture = UITapGestureRecognizer(target: self, action: #selector(MenuViewcontroller.handleTap(_:)))
//        tapGesture.delegate = self
//        
//        // Hiding empty cells 
//        
//        tableview.tableFooterView = UIView()
//    }
//    
//    func handleTap(sender: UITapGestureRecognizer) {
//        
//       // if sender.tag ==
//    }
//    
//    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
//        return 2
//    }
//    
//    // tableview Delegate & Datasource Methods
//    
//    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
//        if section == 0{
//            return 1
//        }
//        else{
//            return viewcontrollers.count
//        }
//        
//    }
//    
//    func tableView(tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
//        if section != 0{
//            
//            return nil
//        }
//        else{
//        let cell = tableView.dequeueReusableCellWithIdentifier("Cell") as? Menucells
//        
//        // cell?.sidebarcolorImage.backgroundColor = UIColor.greenColor()
//        cell?.sidebarcolorImage.hidden = true
//        cell?.MenuImages.image = UIImage(named: "my-treatment-icon")
//        cell?.tag = section
//        cell?.addGestureRecognizer(tapGesture)
////        if section == 1{
////            cell?.menuItemNames.text = "Your Treatment plan"
////        }
////        else{
//            cell?.menuItemNames.text = "My Treatment"
//        //}
//        
//        cell?.selectionStyle = .None
//        
//        return cell!
//        }
//    }
//    
//    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell
//    {
//        let cell = tableView.dequeueReusableCellWithIdentifier("Cell", forIndexPath: indexPath) as? Menucells
//        
//       // cell?.sidebarcolorImage.backgroundColor = UIColor.greenColor()
//        cell?.sidebarcolorImage.hidden = true
//        if indexPath.section == 0{
//            cell?.MenuImages.image = UIImage(named: "my-treatment-icon")
//            cell?.menuItemNames.text = "Daily Activities"
//        }
//        else{
//            cell?.MenuImages.image = UIImage(named: images[indexPath.row])
//            cell?.menuItemNames.text = viewcontrollers[indexPath.row]
//        }
//        cell?.selectionStyle = .None
//        //cell?.hidden = true
//        return cell!
//    }
//    
//    func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
//        return 50
//    }
//    
//    func tableView(tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
//        if section == 0{
//            return 50
//        }
//        else{
//            return 0
//        }
//        
//    }
//    
//   
//    
//    func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
//     
//       let cell = tableView.cellForRowAtIndexPath(indexPath) as? Menucells
//        cell?.sidebarcolorImage.hidden = false
//        if indexPath.row == 1
//        {
//            cell?.MenuImages.image = UIImage(named: "calendar-blue")
//        }
//        else if indexPath.row == 2
//        {
//            cell?.MenuImages.image = UIImage(named: "user-blue")
//        }
//        else if indexPath.row == 3
//        {
//            cell?.MenuImages.image = UIImage(named: "settings-blue")
//        }
//        else if indexPath.row == 4
//        {
//            cell?.MenuImages.image = UIImage(named: "log-off")
//            NSUserDefaults.standardUserDefaults().setValue("", forKey: "username")
//            NSUserDefaults.standardUserDefaults().setValue("", forKey: "password")
//        }
//        cell?.selectionStyle = UITableViewCellSelectionStyle.None
//        print(indexPath.row)
//
//        
//    }
//    
//    func Dismiss() {
//        dismissViewControllerAnimated(true, completion: nil)
//    }
//    
//    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
//        
//        let selectedIndex  = self.tableview.indexPathForSelectedRow
//        if selectedIndex!.row == 1{
//            screenPosition = 1
//        }
//        currentItem = viewcontrollers[selectedIndex!.row]
//    }
//    
//    
//    
////    func downloadImage(url: NSURL){
////        print("Download Started")
////        print("lastPathComponent: " + (url.lastPathComponent ?? ""))
////        getDataFromUrl(url) { (data, response, error)  in
////            dispatch_async(dispatch_get_main_queue()) { () -> Void in
////                guard let data = data where error == nil else { return }
////                print(response?.suggestedFilename ?? "")
////                print("Download Finished")
////                imageView.image = UIImage(data: data)
////            }
////        }
////    }
//    
//
    //var viewcontrollers = ["Daily Activities","Overview","Profile","Settings","Log out"]
   // var viewcontrollers = ["Daily Activities","Overview","Profile","Settings","Practitioner","Log out"]
    var viewcontrollers = ["Overview","Daily Activities","Profile","Settings","Practitioner","Log out"]
    
    var currentItem : String?
    
    override func viewDidLoad() {
        
//        if userProfilepicture != ""
//        {
//            //            print(userProfilepicture)
//            //
//            //            let urlString :String =  userProfilepicture.stringByAddingPercentEncodingWithAllowedCharacters(NSCharacterSet.URLQueryAllowedCharacterSet())!
//            //
//            //            if let url = NSURL(string: "\(urlString)")
//            //            {
//            //                if let data = NSData(contentsOfURL: url)
//            //                {
//            //                    imageDisplay.image = UIImage(data: data)
//            //                }
//            //            }
//            if nsdata != nil
//            {
//                imageDisplay.image = UIImage(data: nsdata)
//            }
//            
//            
//        }
//            
//            
//        else
//        {
//            imageDisplay.image = UIImage(named: "default")
//        }
        
        
        // UItableview delegate and datasource
        self.tableview.delegate = self
        self.tableview.dataSource = self
        usernamedisplayLabel.text = userfirstName!
        usercitydisplayLabel.text = usercityName!
        
        // Hiding empty cells
        
        tableview.tableFooterView = UIView()
    }
    
    
    // tableview Delegate & Datasource Methods
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return viewcontrollers.count
    }
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell
    {
        let cell = tableView.dequeueReusableCellWithIdentifier("Cell", forIndexPath: indexPath) as? Menucells
        
        // cell?.sidebarcolorImage.backgroundColor = UIColor.greenColor()
        cell?.sidebarcolorImage.hidden = true
        cell?.MenuImages.image = UIImage(named: images[indexPath.row])
        cell?.menuItemNames.text = viewcontrollers[indexPath.row]
        cell?.selectionStyle = .None
        
        return cell!
    }
    
    func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        return 50
    }
    
    func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        
        let cell = tableView.cellForRowAtIndexPath(indexPath) as? Menucells
        cell?.sidebarcolorImage.hidden = false
        if indexPath.row == 0
        {
//            cell?.MenuImages.image = UIImage(named: "calendar-blue")
//            images = ["calendar-blue","overview-grey","profile-icon","settings-icon","Practitioner-grey", "logout-icon"]

            cell?.MenuImages.image = UIImage(named: "overview-icon")
            images = ["overview-icon","my-treatment-icon","profile-icon","settings-icon","Practitioner-grey","logout-icon"]
            
            
            
        }
        else if indexPath.row == 1
        {
//            cell?.MenuImages.image = UIImage(named: "overview-icon")
//            images = ["my-treatment-icon","overview-icon","profile-icon","settings-icon","Practitioner-grey","logout-icon"]
//            //images = ["calendar-blue","overview-grey","profile-icon","settings-icon","Practitioner icon","logout-icon"]
            
            
            
            cell?.MenuImages.image = UIImage(named: "calendar-blue")
            images = ["overview-grey","calendar-blue","profile-icon","settings-icon","Practitioner-grey", "logout-icon"]
            
        }
        else if indexPath.row == 2
        {
            cell?.MenuImages.image = UIImage(named: "user-blue")
            images = ["overview-grey","my-treatment-icon","user-blue","settings-icon","Practitioner-grey","logout-icon"]
           // images = ["calendar-blue","overview-grey","profile-icon","settings-icon","Practitioner icon","logout-icon"]

        }
        else if indexPath.row == 3
        {
            cell?.MenuImages.image = UIImage(named: "settings-blue")
            images = ["overview-grey","my-treatment-icon","profile-icon","settings-blue","Practitioner-grey","logout-icon"]
            //images = ["calendar-blue","overview-grey","profile-icon","settings-icon","Practitioner icon","logout-icon"]

        }
        else if indexPath.row == 4
        {
            cell?.MenuImages.image = UIImage(named: "Practitioner blue")
           images = ["overview-grey","my-treatment-icon","profile-icon","settings-icon","Practitioner blue","logout-icon"]
           
            
           // NSUserDefaults.standardUserDefaults().setValue("", forKey: "username")
           // NSUserDefaults.standardUserDefaults().setValue("", forKey: "password")
        }
            
        else if indexPath.row == 5
        {
            cell?.MenuImages.image = UIImage(named: "log-off")
            images = ["overview-grey","my-treatment-icon","profile-icon","settings-icon","Practitioner-grey","log-off"]
            //images = ["calendar-blue","overview-grey","profile-icon","settings-icon","Practitioner icon","log-off"]

//            NSUserDefaults.standardUserDefaults().setValue("", forKey: "username")
//            NSUserDefaults.standardUserDefaults().setValue("", forKey: "password")
            
            NSUserDefaults.standardUserDefaults().setValue("", forKey: "username")
            NSUserDefaults.standardUserDefaults().setValue("", forKey: "password")
             NSUserDefaults.standardUserDefaults().setValue("", forKey: "device_token")
            NSUserDefaults.standardUserDefaults().setValue(false, forKey: "hasLoginKey")
            
        }
        cell?.selectionStyle = UITableViewCellSelectionStyle.None
        print(indexPath.row)
        
        
    }
    
    func Dismiss() {
        dismissViewControllerAnimated(true, completion: nil)
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        
        
        
       
        
        
        
        let selectedIndex  = self.tableview.indexPathForSelectedRow
        currentItem = viewcontrollers[selectedIndex!.row]
       
    }
    
    

    
    
    
    //    func downloadImage(url: NSURL){
    //        print("Download Started")
    //        print("lastPathComponent: " + (url.lastPathComponent ?? ""))
    //        getDataFromUrl(url) { (data, response, error)  in
    //            dispatch_async(dispatch_get_main_queue()) { () -> Void in
    //                guard let data = data where error == nil else { return }
    //                print(response?.suggestedFilename ?? "")
    //                print("Download Finished")
    //                imageView.image = UIImage(data: data)
    //            }
    //        }
    //    }
    
    override func viewWillAppear(animated: Bool) {
        screen = true
        
       
        print(userProfilepicture)
        
        if userProfilepicture != ""
                {
                    userProfilepicture = userProfilepicture.stringByReplacingOccurrencesOfString(",", withString: "", options: NSStringCompareOptions.LiteralSearch, range: nil)
                    userProfilepicture = userProfilepicture.stringByReplacingOccurrencesOfString(" ", withString: "", options: NSStringCompareOptions.LiteralSearch, range: nil)
                   
                    print(userProfilepicture)
                    downloadImageWithUrl(NSURL(string: userProfilepicture)!, completionHandler: { (succeeded, image) -> Void in
                        
                        if (succeeded == true) && image != nil {
                            
                            
                            
                            self.imageDisplay.image = image
                            
                            //   cell.clientImage.image = self.list[(indexPath as NSIndexPath).row].cimage
                            
                            
                        }
                        else
                        {
                            
                            self.imageDisplay.image = UIImage(named: "default")
                        }
                        
                    })

                    
                    
                    
              }
        
        else
        {
            imageDisplay.image = UIImage(named: "default")
        }
        
        
        
//        
//        if userProfilepicture != ""
//        {
//            
//            
//            if nsdata != nil
//            {
//                
//                imageDisplay.image = UIImage(data: nsdata)
//                
//            }
//                
//            else
//            {
//                imageDisplay.image = UIImage(named: "default")
//            }
//            
//        }
//        else
//        {
//            imageDisplay.image = UIImage(named: "default")
//        }
        
        
        
 

    }
    
    
    func downloadImageWithUrl(url: NSURL, completionHandler:(succeeded: Bool, image: UIImage?) -> Void) -> Void {
        let session = NSURLSession.sharedSession()
        let request = NSMutableURLRequest(URL: url)
        
        let task = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in
            if (error == nil) {
                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                    let image = UIImage(data: data!)
                    //self.image = image
                    // imageCache[url.absoluteString] = image
                    nsdata = data!
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

    
}










