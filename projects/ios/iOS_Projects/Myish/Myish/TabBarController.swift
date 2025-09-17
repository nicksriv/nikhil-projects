//
//  TabBarController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 8/31/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class TabBarController: UITabBarController {

    override func viewDidLoad() {
        super.viewDidLoad()
        self.tabBar.backgroundColor = UIColor.whiteColor()
        self.tabBar.barTintColor = UIColor.blueColor()
        self.tabBar.tintColor = UIColor.whiteColor()
        self.tabBarController?.selectedIndex = 0
        //self.tabBar.selectedItem?.selectedImage = UIImage(named: "Home white")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal)
        //self.tabBarController?.selectedViewController?.tabBarItem.selectedImage = UIImage(named: "Home white")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal)
        //var viewControl = UIViewController()
        //viewControl.tabBarItem = UITabBarItem(title: "", image: UIImage(named: "Shoot button blue")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal), selectedImage: UIImage(named: "Shoot button blue")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal))
        //viewControl.targetForAction(action: , withSender: AnyObject?)
        var tabViewControllers = self.viewControllers as [UIViewController]!
        tabViewControllers[0].tabBarItem = UITabBarItem(title: "", image: UIImage(named: "Home blue")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal), selectedImage: UIImage(named: "Home white")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal))
        tabViewControllers[1].tabBarItem = UITabBarItem(title: "", image: UIImage(named: "Search blue")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal), selectedImage: UIImage(named: "Search white")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal))
        tabViewControllers[2].tabBarItem = UITabBarItem(title: "", image: UIImage(named: "Shoot button blue")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal), selectedImage: UIImage(named: "Shoot button white")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal))
        tabViewControllers[3].tabBarItem = UITabBarItem(title: "", image: UIImage(named: "PTS blue")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal), selectedImage: UIImage(named: "PTS white")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal))
        tabViewControllers[4].tabBarItem = UITabBarItem(title: "", image: UIImage(named: "User blue")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal), selectedImage: UIImage(named: "User white")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal))
        
        //self.viewControllers?.insert(viewControl, atIndex: 2)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func tabBar(tabBar: UITabBar, didSelectItem item: UITabBarItem) {
        
    }
    
    override func tabBar(tabBar: UITabBar, didBeginCustomizingItems items: [UITabBarItem]) {
       tabBar.backgroundColor = UIColor.whiteColor()
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
