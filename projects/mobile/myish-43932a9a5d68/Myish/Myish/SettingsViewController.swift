//
//  SettingsViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/12/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class SettingsViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
        
        @IBOutlet var tableView: UITableView!
    var branchUniversalObject: BranchUniversalObject! = nil
       // var profilepic
        //@IBOutlet weak var navbar: UINavigationBar!
        override func viewDidLoad() {
            super.viewDidLoad()
            tableView.delegate = self
            tableView.dataSource = self
            let colors = Colors()
            self.view.backgroundColor = UIColor.clearColor()
            let backgroundLayer = colors.gl
            backgroundLayer.frame = self.view.frame
            self.view.layer.insertSublayer(backgroundLayer, atIndex: 0)
            self.tableView.backgroundColor = UIColor.clearColor()
           
        }
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        //Google Analytics
        let tracker = GAI.sharedInstance().defaultTracker
        tracker.set(kGAIScreenName, value: "Settings Screen")
        
        let builder = GAIDictionaryBuilder.createScreenView()
        tracker.send(builder.build() as [NSObject : AnyObject])
        
        tracker.allowIDFACollection = true
    }
        
        override func didReceiveMemoryWarning() {
            super.didReceiveMemoryWarning()
            // Dispose of any resources that can be recreated.
        }
        
        func numberOfSectionsInTableView(tableView: UITableView) -> Int {
            
            return 1
        }
        
        func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
            
            return 5
            
        }
        
        
        func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
            
            let cell = tableView.dequeueReusableCellWithIdentifier("settingsCell", forIndexPath: indexPath)
            let button = cell.viewWithTag(100) as! UIButton
            button.titleLabel!.font = UIFont(name: "Roboto-Bold", size: 15.0)!
            button.setTitleColor(UIColor.lightGrayColor(), forState: UIControlState.Disabled)
            cell.backgroundColor = UIColor.clearColor()
            
            if indexPath.row == 0 {
                button.setTitle("Edit profile", forState: UIControlState.Normal)
                button.enabled = true
                button.tag = 0
            }
                
            else if indexPath.row == 1 {
                //button.titleLabel!.text =
                button.setTitle("Change password", forState: UIControlState.Normal)
                button.enabled = true
                button.tag = 1
            }
            else if indexPath.row == 2 {
                //button.titleLabel!.text = "Update profile picture"
                button.setTitle("Update profile picture", forState: UIControlState.Normal)
                button.enabled = true
                button.tag = 2
            }
            else if indexPath.row == 3 {
                //button.titleLabel!.text = "Invite friends"
                button.setTitle("Invite friends", forState: UIControlState.Normal)
                button.userInteractionEnabled = true
                button.enabled = true
                button.tag = 3
            }
            else if indexPath.row == 4 {
                //button.titleLabel!.text = "Logout"
                button.setTitle("Logout", forState: UIControlState.Normal)
                button.enabled = true
                button.tag = 4
            }
            
            return cell
        }
        
        
        func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
            
            return 60
            
        }
    
    func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        
    }
    @IBAction func buttonClicked(sender: UIButton) {
        if sender.tag == 2{
            performSegueWithIdentifier("imageload", sender: self)
        }
        if sender.tag == 0{
            performSegueWithIdentifier("editProfile", sender: self)
        }
        if sender.tag == 1{
            performSegueWithIdentifier("password", sender: self)
        }
        if sender.tag == 4{
            NSUserDefaults.standardUserDefaults().setValue(nil, forKey: "username")
            NSUserDefaults.standardUserDefaults().setValue(nil, forKey: "password")
             NSUserDefaults.standardUserDefaults().setValue(false, forKey: "hasLoginKey")
            userProfileID = ""
            username = ""
            userimageURL = ""
            GIDSignIn.sharedInstance().signOut()
            
            //login.logOut()
//            NSUserDefaults.standardUserDefaults().setValue(nil, forKey: "userid")
//            NSUserDefaults.standardUserDefaults().setValue(nil, forKey: "username")
//            NSUserDefaults.standardUserDefaults().setValue(nil, forKey: "userimageURL")
           // let vc : AnyObject! = storyboard!.instantiateViewControllerWithIdentifier("LoginViewController")
           // let navigationController = UINavigationController(rootViewController: vc as! UIViewController)
            self.tabBarController?.navigationController?.popToRootViewControllerAnimated(true)
        }
        if sender.tag == 3
        {
                let name = username +  "  has invited you to share some of your ish."
            
                //let objectsToShare = [name]
//                let activityVC = UIActivityViewController(activityItems: objectsToShare, applicationActivities: nil)
//                
//                self.presentViewController(activityVC, animated: true, completion: nil)
            
            var URL = NSURL(string:  "http://www.myish.com/?_branch_match_id=302757601978451682")!
            var str = NSMutableAttributedString(string: "http://www.myish.com/?_branch_match_id=302757601978451682")
            str.addAttribute(NSLinkAttributeName, value: URL, range: NSMakeRange(0, str.length))
            var link = "http://www.myish.com/?_branch_match_id=302757601978451682"
            
            
            
//         self.branchUniversalObject.addMetadataKey("Username", value: "\(username)")
//            
//            let linkProperties: BranchLinkProperties = BranchLinkProperties()
//            linkProperties.feature = "sharing"
//            linkProperties.addControlParam("$desktop_url", withValue: "http://www.myish.com/")
//            linkProperties.addControlParam("$ios_url", withValue: "myish://")
//            
//            
//            self.branchUniversalObject.getShortUrlWithLinkProperties(linkProperties,  andCallback: { (optUrl: String?, error: NSError?) -> Void in
//                if error == nil{
//                    if let url = optUrl {
//                        
//                      print("got my Branch link to share: %@", url)
                        let objectsToShare = [NSURL(string:link)!, name]
                        
                        let activityVC = UIActivityViewController(activityItems: objectsToShare, applicationActivities: nil)
                        
                        self.presentViewController(activityVC, animated: true, completion: nil)
                        UIApplication.sharedApplication()
//                        
//                    }
//                }
//            })

            
            
            
            
            
        
    }
    }
    
    @IBAction func backButtonPressed(sender: UIButton) {
        self.navigationController?.popViewControllerAnimated(true)
        
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "imageload"{
        let posts = segue.destinationViewController as! ImageUploadController
        }
        if segue.identifier == "editProfile"{
        let edit = segue.destinationViewController as! EditViewController
        
        }
    }
    
        
       
        
}
