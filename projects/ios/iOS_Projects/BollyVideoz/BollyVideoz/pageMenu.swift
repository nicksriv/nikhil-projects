//
//  pageMenu.swift
//  jsonParseArre
//
//  Created by Dignitas Digital on 7/27/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.



import UIKit

class pageMenu: UIViewController, CAPSPageMenuDelegate {
    /*   @IBAction func toggleBtn(sender: UIBarButtonItem) {
    var appDelegate:AppDelegate = UIApplication.sharedApplication().delegate as! AppDelegate
    appDelegate.centerContainer?.toggleDrawerSide(MMDrawerSide.Left, animated: true, completion: nil)
    }
    */
    var category : String = ""
    var pageMenu : CAPSPageMenu?
    let api = MenuAPI()
    var links : [NavData]!
    
    override func viewWillAppear(animated: Bool) {
        let tracker = GAI.sharedInstance().defaultTracker as GAITracker
        tracker.set(kGAIScreenName, value: "See all")
        tracker.send(GAIDictionaryBuilder.createScreenView().build() as [NSObject : AnyObject])
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        api.loadShots("http://158.85.122.170:81/mongo_api/nav_menu2.php", completion: didLoadShots)
        // MARK: - UI Setup
        
        //   self.title = "PAGE MENU"
        // self.navigationController?.navigationBar.barTintColor = UIColor(red: 30.0/255.0, green: 30.0/255.0, blue: 30.0/255.0, alpha: 1.0)
        //        self.navigationController?.navigationBar.shadowImage = UIImage()
        // self.navigationController?.navigationBar.setBackgroundImage(UIImage(), forBarMetrics: UIBarMetrics.Default)
        // self.navigationController?.navigationBar.barStyle = UIBarStyle.Black
        // self.navigationController?.navigationBar.tintColor = UIColor.whiteColor()
        // self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName: UIColor.orangeColor()]
        
        //     self.navigationItem.leftBarButtonItem = UIBarButtonItem(title: "<-", style: UIBarButtonItemStyle.Done, target: self, action: "didTapGoToLeft")
        //     self.navigationItem.rightBarButtonItem = UIBarButtonItem(title: "->", style: UIBarButtonItemStyle.Done, target: self, action: "didTapGoToRight")
        
    }
    func didLoadShots(Links : [NavData]) {
        self.links = Links
        //       println(links)
        print("\(category)")
        // MARK: - Scroll menu setup
        var storyboard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
        // Initialize view controllers to display and place in array
        var controllerArray : [UIViewController] = []
        if category == "Bollywood" {
            let viewController = self.storyboard?.instantiateViewControllerWithIdentifier("bollyCollectionView") as! bollyCollectionView
            viewController.title = "All"
            controllerArray.append(viewController)
            
            for i in 0..<links.count {
                //   println(links[i].genre)
                
                let viewController1 = self.storyboard?.instantiateViewControllerWithIdentifier("bollyCollectionView") as! bollyCollectionView
                viewController1.title = "\(links[i].genreName!)"
                controllerArray.append(viewController1)
                
            }
        }
        else if category == "Hollywood" {
            let viewController = self.storyboard?.instantiateViewControllerWithIdentifier("hollyCollectionView") as! hollyCollectionView
            viewController.title = "All"
            controllerArray.append(viewController)
            
            for i in 0..<links.count {
                //   println(links[i].genre)
                
                let viewController1 = self.storyboard?.instantiateViewControllerWithIdentifier("hollyCollectionView") as! hollyCollectionView
                viewController1.title = "\(links[i].genreName!)"
                controllerArray.append(viewController1)
                
            }
        }
        else if category == "Others" {
            let viewController = self.storyboard?.instantiateViewControllerWithIdentifier("othersCollectionView") as! othersCollectionView
            viewController.title = "All"
            controllerArray.append(viewController)
            
            for i in 0..<links.count {
                //   println(links[i].genre)
                
                let viewController1 = self.storyboard?.instantiateViewControllerWithIdentifier("othersCollectionView") as! othersCollectionView
                viewController1.title = "\(links[i].genreName!)"
                controllerArray.append(viewController1)
                
            }
        }
        
        // Customize menu (Optional)
        let parameters: [CAPSPageMenuOption] = [
            .ScrollMenuBackgroundColor(UIColor(red:0.88, green:0.88, blue:0.88, alpha:1.0)),
            .ViewBackgroundColor(UIColor(red:0.00, green:0.00, blue:0.00, alpha:1.0)),
            .SelectionIndicatorColor(UIColor.redColor()),
            .BottomMenuHairlineColor(UIColor(red:0.00, green:0.00, blue:0.00, alpha:1.0)),
            .MenuItemFont(UIFont(name: "HelveticaNeue", size: 13.0)!),
            .MenuHeight(41.0),
            .MenuItemWidth(90.0),
            .SelectedMenuItemLabelColor(UIColor.redColor()),
            .UnselectedMenuItemLabelColor(UIColor.blackColor()),
            .CenterMenuItems(true)
        ]
        
        // Initialize scroll menu
        pageMenu = CAPSPageMenu(viewControllers: controllerArray, frame: CGRectMake(0.0, 61.0, self.view.frame.width, self.view.frame.height), pageMenuOptions: parameters)
        
        // Optional delegate
        pageMenu!.delegate = self
        
        self.view.addSubview(pageMenu!.view)
    }
    
    
    // Uncomment below for some navbar color animation fun using the new delegate functions
    
    
    func didMoveToPage(controller: UIViewController, index: Int) {
        //  println("did move to page")
        //  println(links.count)
        if index == 0 {
            NSNotificationCenter.defaultCenter().postNotificationName("load0", object: nil)
        }
        for i in 1...links.count {
            if index == i {
                // println("index1")
                NSNotificationCenter.defaultCenter().postNotificationName("load\(i)", object: nil)
            }
        }
        
    }
    func willMoveToPage(controller: UIViewController, index: Int) {
        //    println("will move to page")
        
        
        
    }
    
}

