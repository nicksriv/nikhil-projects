//
//  DashBoardViewController.swift
//  Holbe
//
//  Created by Appsriv Technologies on 15/04/16.
//  Copyright (c) 2016 Appsriv Technologies. All rights reserved.
//

import UIKit

class DashBoardViewController: UIViewController,MenuTransitionManagerDelegate
{
    
    @IBOutlet weak var foodImg: UIImageView!
    @IBOutlet weak var othersImg: UIImageView!
    @IBOutlet weak var foodLbl: UILabel!
    @IBOutlet weak var othersLbl: UILabel!
    // View to display last week results
    @IBOutlet weak var progressviewnew: ProgressView!
    
    // View to display this week results
    @IBOutlet weak var thisweekProgressview: ProgressView!
    

    @IBOutlet weak var DashBoardImageView: UIImageView!
    
    @IBOutlet weak var DashBoardOverviewView: UIView!
    
    @IBOutlet weak var DashBoardComplaincesView: UIView!
    
    @IBOutlet weak var SupplemtprogressView: ProgressView!
    @IBOutlet weak var SupplementImageview: UIImageView!
    @IBOutlet weak var SupplementPercentagedisplayLabel: UILabel!
    
    @IBOutlet weak var WorkoutProgressView: ProgressView!
    @IBOutlet weak var workoutPercentagedisplayLabel: UILabel!
    
    
    @IBOutlet weak var LifestyleProgressView: ProgressView!
    
    @IBOutlet weak var lifestylePercentagedisplayLabel: UILabel!
    @IBOutlet weak var Fooddrinkprogressview: ProgressView!
    @IBOutlet weak var foodanddrinkPercentageDisplayLabel: UILabel!
    
    @IBOutlet weak var othersprogressView: ProgressView!
    @IBOutlet weak var othersPercentagedisplayLabel: UILabel!
    
    @IBOutlet weak var scrollbutton: UIButton!
    var image:UIImage!
    @IBOutlet weak var compliancePercentagedisplayLabel: UILabel!
    @IBOutlet weak var complianceLastweekpercentagedisplayLabel: UILabel!
    
    @IBOutlet weak var Daysleftlabel: UILabel!
    @IBOutlet weak var treatmentcountLabel: UILabel!
    
    let menuTransitionManager = MenuTransitionManager()

    @IBOutlet weak var OverallComplincedisplayLabel: UILabel!
    override func viewDidLoad()
    {
        super.viewDidLoad()
        
        self.othersprogressView.hidden = true
        self.othersPercentagedisplayLabel.hidden = true
        self.othersImg.hidden = true
        self.othersLbl.hidden = true
        
        self.Fooddrinkprogressview.hidden =  true
        self.foodanddrinkPercentageDisplayLabel.hidden = true
        self.foodImg.hidden = true
        self.foodLbl.hidden = true
        

        //Dashboard API call
     //   dashBoardAPI("http://192.185.26.69/~holbe/api/patient/get_dashboard.php?id=\(usrid)")
      //  dashBoardAPI("http://www.holbe.com/api/patient/get_dashboard.php?id=\(usrid)")
         dashBoardAPI(baseURL + "patient/get_dashboard.php?id=\(usrid)")

        
        
  
        image = UIImage(named: "default")
        
        // Overview view
        
        DashBoardOverviewView.layer.cornerRadius = 5
        scrollbutton.layer.cornerRadius = 10
        
        
        // Complainces View
        DashBoardComplaincesView.layer.cornerRadius = 5
        view.backgroundColor = UIColor(red: 52.0/255.0, green: 170.0/255.0, blue: 220.0/255.0, alpha: 1.0)
        
        
        
        // Providing animations to all the views by calling animatProgressview
        //progressviewnew.hideProgressView()
        
        
        self.scrollbutton.userInteractionEnabled = false
        
        
         func preferredStatusBarStyle() -> UIStatusBarStyle
         {
            return .LightContent
        }
    }
    
    override func viewWillAppear(animated: Bool) {
        screen = true
        self.navigationController?.navigationItem.setHidesBackButton(true, animated: false)
        self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName :UIColor.whiteColor()]
        self.navigationController?.setNavigationBarHidden(false, animated: true)
        self.navigationController?.navigationItem.title = "Settings"
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), forBarMetrics: .Default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationController?.navigationBar.translucent = true
        self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName :UIColor.whiteColor()]
        self.navigationController?.navigationBar.tintColor = UIColor.whiteColor()
        self.navigationController?.navigationItem.hidesBackButton = true
    }
    
    
    func Dismiss() {
        dismissViewControllerAnimated(true, completion: nil)
    }

    @IBAction func unWind(segue:UIStoryboardSegue){
        let sourceVC = segue.sourceViewController as! MenuViewcontroller
        let selectedItem = sourceVC.currentItem! as String
        dismissViewControllerAnimated(true, completion: nil)
        let vc = self.storyboard?.instantiateViewControllerWithIdentifier(selectedItem)
        
if !((self.navigationController!.viewControllers.last!.isKindOfClass(DashBoardViewController)) && vc!.isKindOfClass(DashBoardViewController))
        {
            if let vc = vc{
                self.navigationController?.pushViewController(vc, animated: true)
            }
        }
    }
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "menuviewcontroller"
        {
            let menuTableViewController = segue.destinationViewController as! MenuViewcontroller
            menuTableViewController.transitioningDelegate = menuTransitionManager
            menuTransitionManager.delegate = self
            
        }
    }
    
    
    func dashBoardAPI(urlString:String)
    {
        let url = NSURL(string: urlString)
        let task = NSURLSession.sharedSession().dataTaskWithURL(url!){(data,response,error) in
            if data != nil
            { dispatch_async(dispatch_get_main_queue(),{
                self.extractDashboard(data!)
            })
    }
        }
        task.resume()
    }
    
    func extractDashboard(data:NSData)
    {
        let json = JSON(data: data)
        print(json)
        
        let fstObj = json.arrayValue
        
        let workout_compliance = fstObj[0]["workout_compliance"].stringValue
        print(workout_compliance)
        
        if workout_compliance == ""
        {
            workoutPercentagedisplayLabel.text = "0 %"
        }
        else{
            let x1 = Double(workout_compliance)
            workoutPercentagedisplayLabel.text = String(format:"%.0f", x1!)+"%"
            print(workoutPercentagedisplayLabel.text)
        }

        if workout_compliance != ""{
        WorkoutProgressView.animateProgressView("WorkoutProgressView",percentagetodisplay: Float(workout_compliance)!)
        }
        
        let supplement_compliance = fstObj[0]["supplement_compliance"].stringValue
        if supplement_compliance == ""
        {
            
            SupplementPercentagedisplayLabel.text = "0 %"
        }
        else{
            let x2 = Double(supplement_compliance)
            SupplementPercentagedisplayLabel.text = String(format:"%.0f", x2!)+"%"
        }
      
        if supplement_compliance != ""{
        SupplemtprogressView.animateProgressView("SupplemtprogressView",percentagetodisplay: Float(supplement_compliance)!)
        }
        
        let lifestyle_compliance = fstObj[0]["lifestyle_compliance"].stringValue
        if lifestyle_compliance == ""
        {
            
            lifestylePercentagedisplayLabel.text = "0 %"
        }
        else{
            let x3 = Double(lifestyle_compliance)
            lifestylePercentagedisplayLabel.text = String(format:"%.0f", x3!)+"%"
        }
  
        if lifestyle_compliance != ""{
        LifestyleProgressView.animateProgressView("LifestyleProgressView",percentagetodisplay: Float(lifestyle_compliance)!)
        }
        
        let food_compliance = fstObj[0]["food_compliance"].stringValue
        if food_compliance == ""
        {
            
            foodanddrinkPercentageDisplayLabel.text = "0%"
            
        }
        else
        {
            let x4 = Double(food_compliance)
            foodanddrinkPercentageDisplayLabel.text = String(format:"%.0f", x4!)+"%"
        }
      
        if food_compliance != ""{
        Fooddrinkprogressview.animateProgressView("Fooddrinkprogressview",percentagetodisplay:Float(food_compliance)!)
        }
        
        let others_compliance = fstObj[0]["others_compliance"].stringValue
        if others_compliance == ""
        {
            
            othersPercentagedisplayLabel.text = "0 %"
        }
        else
        {
            let x5 = Double(others_compliance)
            othersPercentagedisplayLabel.text = String(format:"%.0f", x5!)+"%"
        }
     
        if others_compliance != ""{
        othersprogressView.animateProgressView("othersprogressView",percentagetodisplay:Float(others_compliance)!)
        }
        
        let overall_compliance = fstObj[0]["overall_compliance"].stringValue
        if overall_compliance == ""
        {
            
            OverallComplincedisplayLabel.text = "0 %"
        }
        else
        {
            let x6 = Double(overall_compliance)
            //OverallComplincedisplayLabel.text = String(format:"%.1f", x6!)+"%"
            OverallComplincedisplayLabel.text = String(format:"%.0f", x6!)+"%"
        }
      
        
        let treatment_count = fstObj[0]["treatment_count"].stringValue
        if treatment_count == ""
        {
            
            treatmentcountLabel.text = "0"
        }
        else
        {
            let x7 = Double(treatment_count)
            treatmentcountLabel.text = treatment_count
        }
        
        
        let days_left = fstObj[0]["days_left"].stringValue
        if days_left == ""
        {
            Daysleftlabel.text = "0" + " Days left"
        }
        else
        {
            Daysleftlabel.text = days_left + " Days left"
        }
        
        
        let current_week_compliance = fstObj[0]["current_week_compliance"].stringValue
        
        if current_week_compliance == ""
        {
           
            compliancePercentagedisplayLabel.text = "0 %"
        }
        else
        {
            let x8 = Double(current_week_compliance)
            compliancePercentagedisplayLabel.text = String(format:"%.0f", x8!)+"%"
        }
       
        if current_week_compliance != ""{
        thisweekProgressview.animateProgressView("thisweekProgressview", percentagetodisplay: Float(current_week_compliance)!)
        }
        
        let last_week_compliance = fstObj[0]["last_week_compliance"].stringValue
        if last_week_compliance == ""
        {
            
            complianceLastweekpercentagedisplayLabel.text = "0 %"
        }
        else
        {
            let x9 = Double(last_week_compliance)
            complianceLastweekpercentagedisplayLabel.text = String(format:"%.0f", x9!)+"%"
        }
        
        if last_week_compliance != ""{
        progressviewnew.animateProgressView("progressviewnew", percentagetodisplay: Float(last_week_compliance)!)
        }
        
    }
    
    


}
extension Double {
    /// Rounds the double to decimal places value
    func roundToPlaces(places:Int) -> Double {
        let divisor = pow(10.0, Double(places))
        return round(self * divisor) / divisor
    }
}


























