//
//  tabBarController.swift
//  jsonParseArre
//
//  Created by Dignitas Digital on 8/3/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import UIKit

class tabBarController: UITabBarController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        UITabBarItem.appearance().setTitleTextAttributes([NSForegroundColorAttributeName: UIColor.blackColor()], forState:.Normal)
        UITabBarItem.appearance().setTitleTextAttributes([NSForegroundColorAttributeName: UIColor.redColor()], forState:.Selected)
        UITabBar.appearance().tintColor = UIColor.redColor()
        // Do any additional setup after loading the view.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    override func tabBar(tabBar: UITabBar, didSelectItem item: UITabBarItem) {
        print("tab bar selected")
        if(item.tag == 1)
        {
            //Want to load UIViewController into the CurrentViewController
        }
    }

    
    
    /*
    // MARK: - Navigation
    
    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
    // Get the new view controller using segue.destinationViewController.
    // Pass the selected object to the new view controller.
    }
    */
    
}
