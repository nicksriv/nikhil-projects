//
//  ProfileViewController.swift
//  Holbe
//
//  Created by Appsriv Technologies on 21/04/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//


import UIKit



class ProfileViewController: UIViewController,UITableViewDelegate,UITableViewDataSource,MenuTransitionManagerDelegate
{
    
    @IBOutlet var complianceLbl: UILabel!
    
    // Array of type Profiledata Class
    var ProfileArray:[ProfileData] = [ProfileData]()
    
    
    //Object of type Profile data class
    var ProfileObject = ProfileData()
    
    
    
    // Array of type SupplementforProfile Class
    var SupplementforProfileArray:[SupplementforProfile] = [SupplementforProfile]()
    
    // Object of type class SupplementforProfile
    var SupplementforProfileObject = SupplementforProfile()
    
    
    // Array of type class workoutforProfile
    var workoutforProfileArray:[workoutforProfile] = [workoutforProfile]()
    
    // Object of type class workoutforProfile
    var workoutforProfileObject = workoutforProfile()
    
    // Array of type class foodForProfile
    var foodForProfileArray:[foodForProfile] = [foodForProfile]()
    
    // Object of type class foodForProfile
    var foodForProfileObject = foodForProfile()
    
    
    // Array of type class lifestyleForProfile
    var lifestyleForProfileArray:[lifestyleForProfile] = [lifestyleForProfile]()
    
    // Object of type class lifestyleForProfile
    var lifestyleForProfileObject = lifestyleForProfile()
    
    
    //  Array of type class OthersforProfile
    var OthersforProfileArray:[OthersforProfile] = [OthersforProfile]()
    
    // Object of type class OthersforProfile
    var OthersforProfileObject = OthersforProfile()
    
    @IBOutlet weak var segmentControl: UISegmentedControl!
    
    @IBOutlet weak var displayImage: UIImageView!

    @IBOutlet weak var tableview: UITableView!
    
    @IBOutlet weak var UsernameLabel: UILabel!
    let menuTransitionManager = MenuTransitionManager()
    
    @IBOutlet weak var activeButton: UIButton!
    
    var active = true
   
    
    override func viewDidLoad() {
        
        
//        self.navigationController?.navigationBar.hidden = false
//        self.navigationController?.navigationBarHidden = false
        
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
////                    displayImage.image = UIImage(data: data)
////                }
////            }
//          
//            if nsdata != nil
//            {
//            displayImage.image = UIImage(data: nsdata)
//            }
//            
//        }
//        else
//        {
//          //  displayImage.image = UIImage(named: "default")
//            displayImage.image = UIImage(data: nsdata)
//        }

        tableview.dataSource = self
        tableview.delegate = self
        UsernameLabel.text = userfirstName
        self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName :UIColor.whiteColor()]
        self.segmentControl.backgroundColor = UIColor.whiteColor()
        self.segmentControl.tintColor = UIColor.whiteColor()
        segmentControl.setTitleTextAttributes([NSForegroundColorAttributeName: UIColor.blackColor()], forState: UIControlState.Selected)
        segmentControl.setTitleTextAttributes([NSForegroundColorAttributeName: UIColor.darkGrayColor()], forState: UIControlState.Normal)
     
        
        

        
        
    }
    
    
    
    
    // API CALL Function for GetOverview
    
    func getoverview(urlString:String)
    {
        let url = NSURL(string: urlString)
        print(url)
        
        let task = NSURLSession.sharedSession().dataTaskWithURL(url!){(data,responce,error) in
            if data != nil{
                
                dispatch_async(dispatch_get_main_queue(),{
                    self.extractGetOverView(data!)
                })
            }
        }
     task.resume()
    }
    
    
    // JSON Parsing for getOverview API
    
    
    func extractGetOverView(data:NSData)
    {
        let json = JSON(data:data)
        print(json)
        
        
        // Array for OVerall stats
        
        let OverallArray = json["treatment"].arrayValue
        print(OverallArray)
        
        ProfileArray = [ProfileData]()
        for i in 0..<OverallArray.count
        {
            print(i)
            ProfileObject = ProfileData()
            
            ProfileObject.treatment_count = OverallArray[i]["treatment_count"].stringValue
            print(ProfileObject.treatment_count)
            
            ProfileObject.treatment_completed = OverallArray[i]["treatment_completed"].stringValue
            
            ProfileObject.treatment_missed = OverallArray[i]["treatment_late"].stringValue
            
            ProfileObject.treatment_late = OverallArray[i]["treatment_missed"].stringValue
            
            ProfileArray.append(ProfileObject)
            
            
        }
        
        let complianceObj = json["compliance"].arrayValue
        print(complianceObj)

            self.complianceLbl.text = complianceObj[0]["overall_compliance"].stringValue + " %"
            print(self.complianceLbl.text)

       
        // Supplement array for Profile
        
        let supplementforprofileArray = json["supplement"].arrayValue
        print(supplementforprofileArray)
        
        SupplementforProfileArray = [SupplementforProfile]()
        
        for i in 0..<supplementforprofileArray.count
        {
            SupplementforProfileObject = SupplementforProfile()
            
            SupplementforProfileObject.supplement_count = supplementforprofileArray[i]["supplement_count"].stringValue
            
            SupplementforProfileObject.supplement_completed = supplementforprofileArray[i]["supplement_completed"].stringValue
            
            SupplementforProfileObject.supplement_late = supplementforprofileArray[i]["supplement_late"].stringValue
            
            SupplementforProfileObject.supplement_missed = supplementforprofileArray[i]["supplement_missed"].stringValue
            
            SupplementforProfileArray.append(SupplementforProfileObject)
        }
        
        
        // workout array for Profile
        
        
        let workoutarray = json["workout"].arrayValue
        print(workoutarray)
        
        workoutforProfileArray = [workoutforProfile]()
        
        for i in 0..<workoutarray.count
        
        {
            
           workoutforProfileObject =  workoutforProfile()
            
            workoutforProfileObject.workout_count = workoutarray[i]["workout_count"].stringValue
            
            workoutforProfileObject.workout_completed = workoutarray[i]["workout_completed"].stringValue
            
            workoutforProfileObject.workout_late = workoutarray[i]["workout_late"].stringValue
            
            workoutforProfileObject.workout_missed = workoutarray[i]["workout_missed"].stringValue
            
            workoutforProfileArray.append(workoutforProfileObject)
        }
        
        
        
        // food array for Profile
        
        
        let foodForProfilearry = json["food"].arrayValue
        print(foodForProfilearry)
        
        foodForProfileArray = [foodForProfile]()
        
        for i in 0..<foodForProfilearry.count
        {
            foodForProfileObject = foodForProfile()
            
            foodForProfileObject.food_count = foodForProfilearry[i]["food_count"].stringValue
            
            foodForProfileObject.food_completed = foodForProfilearry[i]["food_completed"].stringValue
            
            foodForProfileObject.food_late = foodForProfilearry[i]["food_late"].stringValue
            
            foodForProfileObject.food_missed = foodForProfilearry[i]["food_missed"].stringValue
            
            foodForProfileArray.append(foodForProfileObject)
        }
        
        
        //  lifestyle array for Profile
        
        let lifestyleForProfilearray = json["lifestyle"].arrayValue
        print(lifestyleForProfilearray)
        
        lifestyleForProfileArray = [lifestyleForProfile]()
        
        for i in 0..<lifestyleForProfilearray.count
        
        {
            lifestyleForProfileObject  = lifestyleForProfile()
            
            lifestyleForProfileObject.lifestyle_count = lifestyleForProfilearray[i]["lifestyle_count"].stringValue
            
            lifestyleForProfileObject.lifestyle_completed = lifestyleForProfilearray[i]["lifestyle_completed"].stringValue
            
            lifestyleForProfileObject.lifestyle_late = lifestyleForProfilearray[i]["lifestyle_late"].stringValue
            
            lifestyleForProfileObject.lifestyle_missed = lifestyleForProfilearray[i]["lifestyle_missed"].stringValue
            
            lifestyleForProfileArray.append(lifestyleForProfileObject)
        }
        
        
        
        //Others array for Profile
        
        let OthersforProfilearray = json["others"].arrayValue
        print(OthersforProfilearray)
        
        OthersforProfileArray = [OthersforProfile]()
        
        for i in 0..<OthersforProfilearray.count
        
        {
            OthersforProfileObject = OthersforProfile()
            
            OthersforProfileObject.others_count = OthersforProfilearray[i]["others_count"].stringValue
            OthersforProfileObject.others_completed = OthersforProfilearray[i]["others_completed"].stringValue
            OthersforProfileObject.others_late = OthersforProfilearray[i]["others_late"].stringValue
            OthersforProfileObject.others_missed = OthersforProfilearray[i]["others_missed"].stringValue
            
            OthersforProfileArray.append(OthersforProfileObject)
        }
        
        let UserProfile = json["info"].arrayValue
        print(UserProfile)
        if userProfilepicture != ""
        {
        if nsdata != nil
        {
            displayImage.image = UIImage(data: nsdata)
        }
       
            
        
            else
        {
        
            userfirstName = UserProfile[0]["user_first_name"].stringValue
            UsernameLabel.text = userfirstName
            userProfilepicture = UserProfile[0]["user_profile_picture"].stringValue
            self.displayImage.image = userProfileImage
        }
        }
        
        else
        {
            displayImage.image = UIImage(named: "default")
        }
//        let urlString:String = userProfilepicture.stringByAddingPercentEncodingWithAllowedCharacters(NSCharacterSet.URLQueryAllowedCharacterSet())!
//
//        let url = NSURL(string: urlString)
//        
//        downloadImageWithUrl(url!, completionHandler: { (succeeded, image) -> Void in
//            if (succeeded == true) && image != nil {
//                
//                self.displayImage.image = image
//                
//            }
//            else {
//                
//            }
//        })

        
         self.tableview.reloadData()
       
        
        
    }
    
    
    
    
    
    override func viewWillAppear(animated: Bool) {
        screen = true
        
        
        print(userProfilepicture)
        
        self.navigationController?.navigationItem.setHidesBackButton(true, animated: false)
        self.navigationController?.setNavigationBarHidden(false, animated: true)
        self.navigationController?.navigationItem.title = "Settings"
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), forBarMetrics: .Default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationController?.navigationBar.translucent = true
        self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName :UIColor.whiteColor()]
        self.navigationController?.navigationBar.tintColor = UIColor.whiteColor()
        self.navigationController?.navigationItem.hidesBackButton = true
        
        if userProfilepicture != ""
        {
        
            
            if nsdata != nil
            {
                
                displayImage.image = UIImage(data: nsdata)
                
            }
            
            else
            {
                displayImage.image = UIImage(named: "default")
            }
            
        }
        else
        {
            displayImage.image = UIImage(named: "default")
        }
        
        
       //  getoverview("http://192.185.26.69/~holbe/api/patient/getoverview.php?id=\(usrid)")
        // getoverview("http://www.holbe.com/api/patient/getoverview.php?id=\(usrid)")
         getoverview(baseURL + "patient/getoverview.php?id=\(usrid)")
        
        
        
        
  
            self.segmentControl.addBottomBar(CGRect(x: 0.0, y: (self.segmentControl.frame.height), width: (self.segmentControl.frame.width)/4, height: 4.0), color:  UIColor(red: 29/255, green: 174/255, blue: 250/255, alpha: 1.0))

    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
//        return ProfileArray.count + SupplementforProfileArray.count + workoutforProfileArray.count + lifestyleForProfileArray.count + foodForProfileArray.count + OthersforProfileArray.count
        
        return ProfileArray.count + SupplementforProfileArray.count + workoutforProfileArray.count + lifestyleForProfileArray.count
    }
    
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("Cell", forIndexPath: indexPath) as! ProfilecustomCell
        
        
        if indexPath.row == 0
        {
            cell.CompletedLabel.text = ProfileArray[0].treatment_completed
            cell.headingLabel.text = "OVERALL STATS"
            cell.LateLabel.text = ProfileArray[0].treatment_missed
            cell.MIssedLabel.text = ProfileArray[0].treatment_late
            cell.PercentagedisplayLabel.text = ProfileArray[0].treatment_count
            cell.DescriptionLabel.text = "Treatments to Date"
            cell.DescriptionImage.image = UIImage(named: "icon")
             cell.profileprogressView.animateProgressView(Float(ProfileArray[0].treatment_completed)!)
        }
        
        if indexPath.row == 1
        {
            cell.CompletedLabel.text = SupplementforProfileArray[0].supplement_completed
            cell.headingLabel.text = "SUPPLEMENTS"
            cell.LateLabel.text = SupplementforProfileArray[0].supplement_late
            cell.MIssedLabel.text = SupplementforProfileArray[0].supplement_missed
            cell.PercentagedisplayLabel.text = SupplementforProfileArray[0].supplement_count
            cell.DescriptionLabel.text = "Supplements to Date"
            cell.DescriptionImage.image = UIImage(named: "supplements-30x30")
            print(SupplementforProfileArray[0].supplement_count)
             cell.profileprogressView.animateProgressView(Float(SupplementforProfileArray[0].supplement_completed)!)
        }

        if indexPath.row == 2
        {
            cell.CompletedLabel.text = workoutforProfileArray[0].workout_completed
            cell.headingLabel.text = "WORKOUTS"
            cell.LateLabel.text = workoutforProfileArray[0].workout_late
            cell.MIssedLabel.text = workoutforProfileArray[0].workout_missed
            cell.PercentagedisplayLabel.text = workoutforProfileArray[0].workout_count
            cell.DescriptionLabel.text = "Workouts to Date"
            cell.DescriptionImage.image = UIImage(named: "workouts (1)")
             cell.profileprogressView.animateProgressView(Float(workoutforProfileArray[0].workout_completed)!)
        }

//        if indexPath.row == 3
//        {
//            cell.CompletedLabel.text = foodForProfileArray[0].food_completed
//            cell.headingLabel.text = "FOOD"
//            cell.LateLabel.text = foodForProfileArray[0].food_late
//            cell.MIssedLabel.text = foodForProfileArray[0].food_missed
//            cell.PercentagedisplayLabel.text = foodForProfileArray[0].food_count
//            cell.DescriptionLabel.text = "Food to Date"
//            cell.DescriptionImage.image = UIImage(named: "food-&-Drinks (1)")
//            cell.profileprogressView.animateProgressView(Float(foodForProfileArray[0].food_completed)!)
//            
//        }
        if indexPath.row == 3
        {
            cell.CompletedLabel.text = lifestyleForProfileArray[0].lifestyle_completed
            cell.headingLabel.text = "LIFESTYLE"
            cell.LateLabel.text = lifestyleForProfileArray[0].lifestyle_late
            cell.MIssedLabel.text = lifestyleForProfileArray[0].lifestyle_missed
            cell.PercentagedisplayLabel.text = lifestyleForProfileArray[0].lifestyle_count
            cell.DescriptionLabel.text = "Lifestyles to Date"
            cell.DescriptionImage.image = UIImage(named: "health")
             cell.profileprogressView.animateProgressView(Float(lifestyleForProfileArray[0].lifestyle_completed)!)
        }
        
//        if indexPath.row == 5
//        {
//            cell.CompletedLabel.text = OthersforProfileArray[0].others_completed
//            cell.headingLabel.text = "OTHERS"
//            cell.LateLabel.text = OthersforProfileArray[0].others_late
//            cell.MIssedLabel.text = OthersforProfileArray[0].others_missed
//            cell.PercentagedisplayLabel.text = OthersforProfileArray[0].others_count
//            cell.DescriptionLabel.text = "Others to Date"
//            cell.DescriptionImage.image = UIImage(named: "others")
//             cell.profileprogressView.animateProgressView(Float(OthersforProfileArray[0].others_completed)!)
//        }
        
        
        
       
       // cell.profileprogressView.animateProgressView()
        
        
        
        cell.selectionStyle = .None
        return cell
    }
    
    @IBAction func unWind(segue:UIStoryboardSegue){
        let sourceVC = segue.sourceViewController as! MenuViewcontroller
        let selectedItem = sourceVC.currentItem! as String
        dismissViewControllerAnimated(true, completion: nil)
        let vc = self.storyboard?.instantiateViewControllerWithIdentifier(selectedItem)
        if !((self.navigationController!.viewControllers.last!.isKindOfClass(ProfileViewController)) && vc!.isKindOfClass(ProfileViewController))
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
    
    
    
    
    @IBAction func activeButtonFunctionality(sender: UIButton)
    
    {
        if active == true
        {
            active = false
            activeButton.setImage(UIImage(named: "Active-button"), forState: UIControlState.Normal)
        }
        else
        {
            active = true
            activeButton.setImage(UIImage(named: "inactive-button"), forState: UIControlState.Normal)
        }
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
    
    @IBAction func EditClicked(sender: UIBarButtonItem) {
        dismissViewControllerAnimated(true, completion: nil)
        
        
        let vc =  self.storyboard?.instantiateViewControllerWithIdentifier("Settings")
        
        if !((self.navigationController!.viewControllers.last!.isKindOfClass(ProfileViewController)) && vc!.isKindOfClass(ProfileViewController))
        {
            if let vc = vc{
                self.navigationController?.pushViewController(vc, animated: true)
            }
        }
    }
    
    
    @IBAction func segmentChanged(sender: AnyObject)
    {
        
        if segmentControl.selectedSegmentIndex == 0
        {

            
            self.segmentControl.addBottomBar(CGRect(x: self.segmentControl.frame.width, y: (self.segmentControl.frame.height), width: -(self.segmentControl.frame.width)/2, height: 4.0), color:  UIColor.whiteColor())
            
            self.segmentControl.addBottomBar(CGRect(x: 0.0, y: (self.segmentControl.frame.height), width: (self.segmentControl.frame.width)/2, height: 4.0), color:  UIColor(red: 29/255, green: 174/255, blue: 250/255, alpha: 1.0))
            
            
            
        }
        
        if segmentControl.selectedSegmentIndex == 1
        {
            self.segmentControl.addBottomBar(CGRect(x: 0.0, y: (self.segmentControl.frame.height), width: (self.segmentControl.frame.width)/2, height: 4.0), color:  UIColor.whiteColor())
            

            
            self.segmentControl.addBottomBar(CGRect(x: self.segmentControl.frame.width, y: (self.segmentControl.frame.height), width: -(self.segmentControl.frame.width)/2, height: 4.0), color:  UIColor(red: 29/255, green: 174/255, blue: 250/255, alpha: 1.0))
        
        }
    }

 
    
    
    

    
    
}



























