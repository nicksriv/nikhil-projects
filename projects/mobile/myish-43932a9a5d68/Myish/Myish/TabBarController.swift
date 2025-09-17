//
//  TabBarController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 8/31/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class TabBarController: UITabBarController, UITabBarControllerDelegate {
    
    var userProfileID: String!
   // var deepLinkingCompletionDelegate: BranchDeepLinkingControllerCompletionDelegate?
    
    
    

    override func viewDidLoad() {
        
        super.viewDidLoad()
        self.tabBar.backgroundColor = UIColor.whiteColor()
        UITabBar.appearance().shadowImage = UIImage()
        UITabBar.appearance().backgroundImage = UIImage()
        //33 96 147
        
        self.tabBar.barTintColor = UIColor(red: 33.0/255.0, green: 96.0/255, blue: 147.0/255.0, alpha: 1.0)
        
        self.tabBar.tintColor = UIColor.whiteColor()
        self.tabBarController?.selectedIndex = 0
        //self.tabBarController?.delegate = self
        UITabBarItem.appearance().setTitleTextAttributes([NSForegroundColorAttributeName: UIColor(red: 104.0/255.0, green: 181.0/255, blue: 255.0/255.0, alpha: 1.0)], forState:.Normal)
        
        UITabBarItem.appearance().setTitleTextAttributes([NSForegroundColorAttributeName: UIColor.whiteColor()], forState:.Selected)

        var tabViewControllers = self.viewControllers as [UIViewController]!
        //tabViewControllers[0].tabBarItem = UITabBarItem(
        
        
        tabViewControllers[0].tabBarItem = UITabBarItem(title: "", image: UIImage(named: "Home-HD-blue")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal), selectedImage: UIImage(named: "Home-HD")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal))
       tabViewControllers[0].tabBarItem.imageInsets = UIEdgeInsets(top: 6,left: 0,bottom: -6,right: 0)
        
        tabViewControllers[1].tabBarItem = UITabBarItem(title: "", image: UIImage(named: "Search-HD-blue")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal), selectedImage: UIImage(named: "Search-HD-white")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal))
       tabViewControllers[1].tabBarItem.imageInsets = UIEdgeInsets(top: 6,left: 0,bottom: -6,right: 0)
        //tabViewControllers[1]. = "Search"
        //tabViewControllers[2].tabBarItem = UITabBarItem(title: "", image: self.imageResize(UIImage(named: "Camera-Blue")!, sizeChange: CGSize(width: self.tabBar.frame.width/5, height: self.tabBar.frame.height+15)).imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal), selectedImage: UIImage(named: "Camera-white")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal))
        tabViewControllers[2].tabBarItem = UITabBarItem(title: "", image: UIImage(named: "Camera-HD-blue")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal), selectedImage: UIImage(named: "Camera-HD-white")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal))
        tabViewControllers[2].tabBarItem.imageInsets = UIEdgeInsets(top: -2,left: 2,bottom: 2,right: 2)

        tabViewControllers[3].tabBarItem = UITabBarItem(title: "", image: UIImage(named: "PTS-HD-blue")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal), selectedImage: UIImage(named: "PTS-HD-white")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal))
       tabViewControllers[3].tabBarItem.imageInsets = UIEdgeInsets(top: 6,left: 0,bottom: -6,right: 0)
        
        tabViewControllers[4].tabBarItem = UITabBarItem(title: "", image: UIImage(named: "User-HD-blue")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal), selectedImage: UIImage(named: "User-HD-white")!.imageWithRenderingMode(UIImageRenderingMode.AlwaysOriginal))
        tabViewControllers[4].tabBarItem.imageInsets = UIEdgeInsets(top: 6,left: 0,bottom: -6,right: 0)
        
        
        
        
        
        
        
        self.tabBar.shadowImage = UIImage()

    }
    
    
    
    
    

    override func didReceiveMemoryWarning()
    {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func tabBar(tabBar: UITabBar, didSelectItem item: UITabBarItem)
    {
        //let tabViewControllers = self.viewControllers! as [UIViewController]
        if item == tabBar.items![0]{
           //item.title = "";
           //item.imageInsets = UIEdgeInsetsMake(0, 0, 0, 0);
        tabBarController?.childViewControllers[0].navigationController?.popToRootViewControllerAnimated(true)
        
        }
        if item == tabBar.items![1]{
            //item.title = "";
            //item.imageInsets = UIEdgeInsetsMake(0, 0, 0, 0);
            tabBarController?.childViewControllers[1].navigationController?.popToRootViewControllerAnimated(true)
        }
        if item == tabBar.items![4]{
            //item.title = "";
            //item.imageInsets = UIEdgeInsetsMake(0, 0, 0, 0);
            if !(reach!.isReachableViaWiFi() || reach!.isReachableViaWWAN())
            {
                let alertController = UIAlertController(title: "Profile Unavailable!!", message: "No Internet Connection.", preferredStyle: UIAlertControllerStyle.Alert)
                
                
                let OKAction = UIAlertAction(title: "OK", style: .Default) { (action:UIAlertAction) in
                    
                    //self.actInd.stopAnimating()
                  // self.navigationController?.popToViewController(navigationController?.f, animated: true)
                    
                }
                alertController.addAction(OKAction)
                
                self.presentViewController(alertController, animated: true, completion:nil)
            }
            else
            {
                 tabBarController?.childViewControllers[4].navigationController?.popToRootViewControllerAnimated(true)
            }
            
           
        }
    }
    

    
    override func tabBar(tabBar: UITabBar, didBeginCustomizingItems items: [UITabBarItem])
    {
       tabBar.backgroundColor = UIColor.whiteColor()
    }
    
    
    func imageResize(imageObj:UIImage, sizeChange:CGSize)-> UIImage
    {
        
        let hasAlpha = false
        let scale: CGFloat = 0.0 // Automatically use scale factor of main screen
        
        UIGraphicsBeginImageContextWithOptions(sizeChange, !hasAlpha, scale)
        imageObj.drawInRect(CGRect(origin: CGPointZero, size: sizeChange))
        
        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext() // !!!
        return scaledImage
    }

    
    override func viewWillAppear(animated: Bool)
    {

    }
    
//    func configureControlWithData(data: [NSObject : AnyObject]!) {
//        let postID = data["postid"] as! String
//        let storyboard = UIStoryboard(name: "Main", bundle: nil)
//        let destinationController = storyboard.instantiateViewControllerWithIdentifier("postTab") as? PostViewController
//        
//        let postCard = CardData()
//        postCard.profileName = username
//        postCard.profileImageURL = userimageURL
//        postCard.id = postID
//        
//        destinationController!.cards = postCard
//        tabBarController?.childViewControllers[0].navigationController?.pushViewController(destinationController!, animated: false)
//       //tabBarController?.navigationController?.pushViewController
//    }
//    
//    
//    func closePressed() {
//        self.deepLinkingCompletionDelegate?.deepLinkingControllerCompleted()
//    }
    
//    func tabBarController(tabBarController: UITabBarController, shouldSelectViewController viewController: UIViewController) -> Bool {
//        
//        if viewController == self.viewControllers![2]{
//        let picker = UIImagePickerController()
//        picker.delegate = viewController as! CameraViewController
//        picker.allowsEditing = true
//        picker.sourceType = .PhotoLibrary
//        self.presentViewController(picker, animated: true, completion: nil)
//        return false
//        }
//        else{
//            return true
//        }
//    }
    
    

}
