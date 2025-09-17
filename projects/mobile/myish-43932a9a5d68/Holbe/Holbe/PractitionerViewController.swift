//
//  PractitionerViewController.swift
//  Holbe
//
//  Created by Appsriv Technologies on 16/09/16.
//  Copyright � 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit



class PractitionerViewController: UIViewController, UITableViewDataSource, UITableViewDelegate, MenuTransitionManagerDelegate {
    
    var aprac:[ActivePractitioner] = [ActivePractitioner]()
    var iprac:[ActivePractitioner] = [ActivePractitioner]()
    var apracObject = ActivePractitioner()
    var ipracObject = ActivePractitioner()
    var isactive: Bool!
    let menuTransitionManager = MenuTransitionManager()
    var userProfilepicture:String!
    let image = UIImage()
    var urlString:String = ""
    var status:Int = 0
    var sectionBoolean:Bool = true
    var practo:String = ""

 
    
    
    @IBOutlet weak var actInd: UIActivityIndicatorView!

    
    
    @IBOutlet weak var tableView: UITableView!

    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.dataSource = self
        tableView.delegate = self
        self.actInd.color = UIColor.darkGrayColor()
        NSNotificationCenter.defaultCenter().addObserver(self, selector: #selector(CominUpviewcontroller.methodOfReceivedNotification(_:)), name:"Completion", object: nil)
        
      
       
    }
    
    override func viewWillAppear(animated: Bool) {
        
        screen = true
        
        self.actInd.startAnimating()
        self.tableView.userInteractionEnabled = false
        aprac.removeAll()
        iprac.removeAll()
        self.navigationController?.setNavigationBarHidden(false, animated: true)
        self.navigationItem.title = "Practitioners"
       // practitionercall("http://192.185.26.69/~holbe/api/patient/test/listpractitioner.php?user_id=\(usrid)")
       // practitionercall("http://www.holbe.com/api/patient/test/listpractitioner.php?user_id=\(usrid)")
        practitionercall(baseURL + "patient/test/listpractitioner.php?user_id=\(usrid)")
        //self.actInd.stopAnimating()
        self.tableView.userInteractionEnabled = true
        navigationItem.leftBarButtonItem?.tintColor = UIColor.grayColor()
        navigationController!.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName: UIColor.grayColor()]
    }

    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()

    }
    
    

    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 2
    }
    
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int
    {
        if section == 0
        {
            return aprac.count
           
            
        }
        
        else
        {
            return iprac.count
            
        }
    }
    
    
    
    
    func tableView(tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let cell1 = tableView.dequeueReusableCellWithIdentifier("header") as! PractitionerHeaderCell
    if section == 0
       {
        
        cell1.practype.text = "Current Practitioners"
        cell1.practype.textColor =  UIColor(red: 94/255, green: 94/255, blue: 94/255, alpha: 1)
        cell1.backgroundColor = UIColor(red: 238/255, green: 241/255, blue: 246/255, alpha: 1)
        
        
        }
        else
        {
            cell1.practype.text = "Previous Practitioners"
            cell1.practype.textColor =  UIColor(red: 94/255, green: 94/255, blue: 94/255, alpha: 1)
            cell1.backgroundColor = UIColor(red: 238/255, green: 241/255, blue: 246/255, alpha: 1)
        }
        
        return cell1
    }
    
    
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell2 = tableView.dequeueReusableCellWithIdentifier("child") as! PractitionerChildCell
        
       
        if indexPath.section  == 0
        {

            sectionBoolean = true
            status = 1
            cell2.pracImage.image = nil
            cell2.pracImage.image = UIImage(named: "profile-page")
            cell2.pracImage.layer.borderWidth = 2
            cell2.pracImage.layer.borderColor = UIColor(red:0/255.0, green:171/255.0, blue:234/255.0, alpha: 1.0).CGColor
            cell2.pracName.text = aprac[indexPath.row].pname
            cell2.pracDetail.text = aprac[indexPath.row].pabout
            cell2.swipeButton.tag = setIndex(indexPath.row, section: indexPath.section)
            cell2.swipeButton.tintColor = UIColor.greenColor()
            let img2 = UIImage(named: "Toggle-green1" )
            cell2.swipeButton.setImage(img2, forState: .Normal)
            
            
//            if aprac[indexPath.row].pimage != nil
//            {
//                cell2.pracImage.image = aprac[indexPath.row].pimage
//            }
//
            if aprac[indexPath.row].pimgurl != ""
            {
                urlString = aprac[indexPath.row].pimgurl.stringByAddingPercentEncodingWithAllowedCharacters(NSCharacterSet.URLQueryAllowedCharacterSet())!
                
                downloadImageWithUrl(NSURL(string: urlString)!, completionHandler: { (succeeded, image) -> Void in
                    
                    if (succeeded == true) && image != nil {
                        
                        //self.apracObject.pimage = image
                        cell2.pracImage.layer.borderWidth = 2
                        cell2.pracImage.layer.borderColor = UIColor(red:0/255.0, green:171/255.0, blue:234/255.0, alpha: 1.0).CGColor
                        
                        self.aprac[indexPath.row].pimage = image
                        
                        cell2.pracImage.image = self.aprac[indexPath.row].pimage
                        
                        
                    }
                    else{
                      
                  
                    }
                    
                })
            }

           
            
        }
        else if indexPath.section == 1
        {
            sectionBoolean = false
            status = 0
            cell2.pracImage.image = nil
            cell2.pracImage.image = UIImage(named: "profile-page")
            cell2.pracImage.layer.borderWidth = 2
            cell2.pracImage.layer.borderColor = UIColor(red:67/255.0, green:198/255.0, blue:183/255.0, alpha: 1.0).CGColor
            cell2.pracImage.borderColor = UIColor(red:67/255.0, green:198/255.0, blue:183/255.0, alpha: 1.0)
            cell2.pracName.text = iprac[indexPath.row].pname
            cell2.pracDetail.text = iprac[indexPath.row].pabout
            cell2.swipeButton.tag = setIndex(indexPath.row, section: indexPath.section)
            let img1 = UIImage(named: "Toggle-red1" )
            cell2.swipeButton.tintColor = UIColor.redColor()
            cell2.swipeButton.setImage(img1, forState: .Normal)
           
//            if iprac[indexPath.row].pimage != nil
//            {
//                cell2.pracImage.image = iprac[indexPath.row].pimage
//            }
//           
            if iprac[indexPath.row].pimgurl != ""
            {
                urlString = iprac[indexPath.row].pimgurl.stringByAddingPercentEncodingWithAllowedCharacters(NSCharacterSet.URLQueryAllowedCharacterSet())!
                
                downloadImageWithUrl(NSURL(string: urlString)!, completionHandler: { (succeeded, image) -> Void in
                    
                    if (succeeded == true) && image != nil {
                        cell2.pracImage.layer.borderWidth = 2
                        cell2.pracImage.layer.borderColor = UIColor(red:67/255.0, green:198/255.0, blue:183/255.0, alpha: 1.0).CGColor
                        //self.apracObject.pimage = image
                       // cell2.pracImage.image = image
                        self.iprac[indexPath.row].pimage = image
                        cell2.pracImage.image = self.iprac[indexPath.row].pimage
                    }
                    else
                    {

                    }
                    
                })
            }
            
            
            }
            
      
        
        return cell2
    }

func tableView(tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 40
    }
    
    func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        return 88
    }
    
    
    
    func setIndex(row: Int, section: Int)-> Int
    {
        if section == 0
        {
            return row
        }
//        else if section == 1
//        {
//            return aprac.count + row
//        }
        else
        {
            return aprac.count + row
        }
        
    }
    
    
    
    func getIndex(index: Int)-> Int{
        if index >= 0 && index < aprac.count
        {
            return index
        }
       
       
        else
        {
            let i = index - aprac.count
            return i
        }
    }
    
    
    func getSection(index: Int)-> Int{
      
        if index >= 0 && index < aprac.count
        {
            return 0
        }
        
//        else if index >= aprac.count && index < (aprac.count + iprac.count){
//            let i = index - aprac.count
//            return 1
//    }
        else
        {
            return 1
        }
       
    }

    
    
    
    //GET Method
    func practitionercall(urlString:String)
    {
        let url = NSURL(string: urlString)
        print(url)
        self.actInd.startAnimating()
        self.tableView.userInteractionEnabled =  false
        let task = NSURLSession.sharedSession().dataTaskWithURL(url!) { (data,response,error) in
            
            if data != nil{
                dispatch_async(dispatch_get_main_queue(), {
                    
                    self.Extarctdata(data!)
                })
                
            }
        }
        task.resume()
        
    }
    
    
    
    
   func Extarctdata(data:NSData)
   {
    
    
         let json = JSON(data: data)
         print(json)
    
    
    
        let activeprac = json["active_practitioners"]
        

  if activeprac != nil
    {
        
    
    
       for i in 0 ..< activeprac.count
        {
           
            
         
                apracObject = ActivePractitioner()
                
                apracObject.pname = activeprac[i]["name"].stringValue
                apracObject.prac_id = (activeprac[i]["pract_id"].stringValue)
                apracObject.pimgurl = activeprac[i]["pract_pic"].stringValue
 
            

            
            //apracObject.pimage = image
            aprac.append(apracObject)
            
        }
      //  self.tableView.reloadData()
    }
    
    
       let inactiveprac = json["inactive_practitioners"]
    
    
    
    if inactiveprac != nil
    {
        
    
       for i in  0 ..< inactiveprac.count
       {
            ipracObject = ActivePractitioner()
            ipracObject.pname = inactiveprac[i]["name"].stringValue
            ipracObject.prac_id = inactiveprac[i]["pract_id"].stringValue
        
        
           ipracObject.pimgurl = inactiveprac[i]["pract_pic"].stringValue
        
         // ipracObject.pimage = image
       
          iprac.append(ipracObject)
        
        }
        //self.tableView.reloadData()
    }
      self.actInd.stopAnimating()
      self.tableView.reloadData()
    
    self.tableView.userInteractionEnabled = true
      

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
                    //nsdata = data!
                    print("success")
                    completionHandler(succeeded: true, image: image)
                })
            } else {
                print("error")
                completionHandler(succeeded: false, image: nil)
            }
        })
        //self.actInd.stopAnimating()
        self.tableView.userInteractionEnabled = true
        
        task.resume()
    }
    
    
    
    
    func postStatus(url : String, dict: NSDictionary){
        
        
        let request = NSMutableURLRequest(URL: NSURL(string: url)!)
        request.HTTPMethod = "POST"
        let postString = "status=\(self.status)&pract_id=\(self.practo)&user_id=\(usrid)"
        print(postString)
        request.setValue("application/x-www-form-urlencoded; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
        
        let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
            guard error == nil && data != nil else {                                                          // check for fundamental networking error
                print("error=\(error)")
                return
            }
            
            if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200
            {           // check for http errors
                print("statusCode should be 200, but is \(httpStatus.statusCode)")
                print("response = \(response)")
                
            }
            
            let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
            print("responseString = \(responseString!)")
           // NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: dict as [NSObject : AnyObject])
//            self.actInd.stopAnimating()
//            self.tableView.userInteractionEnabled = true
        }

        task.resume()
        
        
        
    }
 
    
   
    
    
    
    
    @IBAction func unWind(segue:UIStoryboardSegue){
        let sourceVC = segue.sourceViewController as! MenuViewcontroller
        let selectedItem = sourceVC.currentItem! as String
        dismissViewControllerAnimated(true, completion: nil)
        let vc = self.storyboard?.instantiateViewControllerWithIdentifier(selectedItem)
        if !((self.navigationController!.viewControllers.last!.isKindOfClass(PractitionerViewController)) && vc!.isKindOfClass(PractitionerViewController))
        {
            if let vc = vc{
                self.navigationController?.pushViewController(vc, animated: true)
            }
        }
        
    }
    
    func Dismiss() {
        dismissViewControllerAnimated(true, completion: nil)
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "menuviewcontroller"
        {
            let menuTableViewController = segue.destinationViewController as! MenuViewcontroller
            menuTableViewController.transitioningDelegate = menuTransitionManager
            menuTransitionManager.delegate = self
            
        }
    }
    
    
    @IBAction func swipeButton(sender: AnyObject) {
    
        
        let i = self.getIndex(sender.tag)
        let j = self.getSection(sender.tag)
           var indexarr = ["index":i, "section":j]
  
          if getSection(sender.tag) == 0     {

        
            let alert = UIAlertController(title: "Practitioners Updation", message: "Are you sure to move this practitioner to inactive list?", preferredStyle: UIAlertControllerStyle.Alert);
            alert.addAction(UIAlertAction(title: "No", style: UIAlertActionStyle.Cancel, handler: nil));
            alert.addAction(UIAlertAction(title: "Yes", style: UIAlertActionStyle.Default, handler:{(action:UIAlertAction) in
            
//            self.actInd.startAnimating()
//            self.tableView.userInteractionEnabled = false
            self.status = 0
            self.practo = self.aprac[i].prac_id
            let dataitem = self.aprac[i]
            self.iprac.insert(dataitem, atIndex: 0)
            //self.iprac.append(dataitem)
            self.aprac.removeAtIndex(i)
          //  self.postStatus("http://www.holbe.com/api/patient/test/updatepractitionerstatus.php",dict: indexarr)
            self.postStatus(baseURL + "patient/test/updatepractitionerstatus.php",dict: indexarr)
            //self.tableView.moveRowAtIndexPath(NSIndexPath(forRow: i, inSection: j) , toIndexPath: NSIndexPath(forRow: 0, inSection: j+1))
            self.tableView.reloadData()
                
      
           
            
            
        }));
        self.presentViewController(alert, animated: true, completion: nil);
           
 
    }
        
   else if getSection(sender.tag) == 1
        
       {
            let alert = UIAlertController(title: "Practitioners Updation", message: "Are you sure to move this practitioner to active list?", preferredStyle: UIAlertControllerStyle.Alert);
            alert.addAction(UIAlertAction(title: "No", style: UIAlertActionStyle.Cancel, handler: nil));
            alert.addAction(UIAlertAction(title: "Yes", style: UIAlertActionStyle.Default, handler: {(action:UIAlertAction) in
                
//            self.actInd.startAnimating()
//            self.tableView.userInteractionEnabled =  false
            self.practo = self.iprac[i].prac_id
            self.status = 1
            let dataitem = self.iprac[i]
            self.aprac.insert(dataitem, atIndex: 0)
           // self.aprac.append(dataitem)
            self.iprac.removeAtIndex(i)
            self.postStatus("http://www.holbe.com/api/patient/test/updatepractitionerstatus.php", dict: indexarr)
            self.postStatus(baseURL + "patient/test/updatepractitionerstatus.php", dict: indexarr)
            //self.tableView.moveRowAtIndexPath(NSIndexPath(forRow: i, inSection: j), toIndexPath: NSIndexPath(forRow: 0, inSection: j-1))
            self.tableView.reloadData()
       
            
        }));
        self.presentViewController(alert, animated: true, completion: nil);
        
   
      }

        
     
        
   }
    
    
    func methodOfReceivedNotification(notification: NSNotification){
       
        self.actInd.stopAnimating()
        self.tableView.userInteractionEnabled = true
        

    }

    
    

}








