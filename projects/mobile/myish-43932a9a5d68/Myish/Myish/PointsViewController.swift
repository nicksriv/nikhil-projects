//
//  PointsViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 10/9/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class PointsViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    @IBOutlet var tableView: UITableView!
    @IBOutlet var mypoints: UILabel!
    
    @IBOutlet var vw: UIView!
    @IBOutlet var coupons: UIButton!
   
    @IBOutlet var points: UILabel!
    @IBOutlet var prgvw: UIProgressView!

    
    var profileApi: ProfileApi!
    var numberOfPoints = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.vw.layer.borderColor = UIColor.blackColor().CGColor
        self.vw.layer.borderWidth = 2
        self.vw.layer.cornerRadius = 10
        self.vw.backgroundColor = UIColor.clearColor()
        
        self.coupons.layer.cornerRadius = 10
 
        //self.coupons.hidden = true
        self.mypoints.hidden = true
        self.prgvw.hidden = true
        self.points.hidden = true
        tableView.delegate = self
        tableView.dataSource = self

        let colors = Colors()
        self.view.backgroundColor = UIColor.clearColor()
        let backgroundLayer = colors.gl
        backgroundLayer.frame = self.view.frame
        self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
 
        self.tableView.backgroundColor = UIColor.clearColor()
        
        self.profileApi = ProfileApi()
        
        if userProfileID != ""{
            //self.actInd.startAnimating()
            self.profileApi.loadProfile("http://myish.com:\(port)/api/finduser?userid=\(userProfileID)", completion: didLoadProfile)
            
        }

    }

    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "Points Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
    }
    
     func didLoadProfile(profile: ProfileData){
        self.numberOfPoints = profile.points
        self.tableView.reloadData()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        
        return 1
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {

        return 5
        
    }
    
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        
           let cell = tableView.dequeueReusableCellWithIdentifier("pointsCell", forIndexPath: indexPath)
           let label = cell.viewWithTag(101) as! UILabel
           let points = cell.viewWithTag(200) as! UILabel
           label.font = UIFont(name: "Roboto-Bold", size: 17.0)
           points.font = UIFont(name: "Roboto-Bold", size: 17.0)
           cell.backgroundColor = UIColor.clearColor()
        
        if indexPath.row == 0 {
           label.text = "Points"
           label.enabled = true
            points.text = "\(self.numberOfPoints)"
        }
        
        else if indexPath.row == 1 {
            label.text = "Reports"
            label.hidden = true
            points.hidden = true
        }
        else if indexPath.row == 2 {
            label.text = "Reviews Liked"
            label.hidden = true
            points.hidden = true
        }
        else if indexPath.row == 3 {
            label.text = "Comments"
            label.hidden = true
            points.hidden = true
        }
        else if indexPath.row == 4 {
            label.text = "Followers"
            label.hidden = true
            points.hidden = true
        }
            
            return cell
    }

    
    func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        
    return 60
        
    }

}
