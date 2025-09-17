//
//  PagingController.swift
//  Holbe
//
//  Created by Nikhil Srivastava on 4/11/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import Foundation

import UIKit

class PageViewController: UIPageViewController,UIPageViewControllerDataSource,UIPageViewControllerDelegate{
    
    private let contentImages = ["post-min","Welcome-screen-2","Welcome-screen-3","Welcome-screen-4","Welcome-screen-5"];
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.dataSource = self
        self.delegate = self
        
        if contentImages.count > 0 {
            let firstController = getItemController(0)!
            let startingViewControllers: NSArray = [firstController]
            self.setViewControllers(startingViewControllers as? [UIViewController], direction: UIPageViewControllerNavigationDirection.Forward, animated: false, completion: nil)
        }
        
        let appearance = UIPageControl.appearance()
        appearance.pageIndicatorTintColor = UIColor.grayColor()
        appearance.currentPageIndicatorTintColor = UIColor.whiteColor()
        //appearance.backgroundColor = UIColor.darkGrayColor()
        
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
//    override func viewWillAppear(animated: Bool) {
//        self.navigationItem.setHidesBackButton(true, animated:true);
//    }
//    
    
    func pageViewController(pageViewController: UIPageViewController, viewControllerAfterViewController viewController: UIViewController) -> UIViewController? {
        
        let itemController = viewController as! PageItemController
        
        if itemController.itemIndex+1 < contentImages.count {
            
            let pageItemController = getItemController(itemController.itemIndex+1)
            
            return pageItemController
        }
        
        
        
        return nil
        
        
    }
    
    
    
    func pageViewController(pageViewController: UIPageViewController, viewControllerBeforeViewController viewController: UIViewController) -> UIViewController? {
        
        let itemController = viewController as! PageItemController
        
        if itemController.itemIndex > 0 {
            return getItemController(itemController.itemIndex-1)
        }
        
        return nil
        
    }
    
    
    
    private func getItemController(itemIndex: Int) -> PageItemController? {
        
        if itemIndex < contentImages.count {
            let pageItemController = self.storyboard!.instantiateViewControllerWithIdentifier("pageItemController") as! PageItemController
            pageItemController.itemIndex = itemIndex
            pageItemController.imageName = contentImages[itemIndex]
            return pageItemController
        }
        
        return nil
    }
    
    func pageViewController(pageViewController: UIPageViewController, willTransitionToViewControllers pendingViewControllers: [UIViewController]) {
        
        print(pendingViewControllers.count)
    }
    
    func presentationCountForPageViewController(pageViewController: UIPageViewController) -> Int {
        return contentImages.count
    }
    
    func presentationIndexForPageViewController(pageViewController: UIPageViewController) -> Int {
        return 0
    }
    
   
    
}
