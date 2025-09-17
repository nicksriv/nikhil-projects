
//  NavViewController.swift
//  jsonParseArre
//
//  Created by Dignitas Digital on 7/16/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//


import UIKit
import Haneke

class NavViewController: UIViewController, UIScrollViewDelegate {
    /*  @IBAction func toggleBtn(sender: UIBarButtonItem) {
    var appDelegate:AppDelegate = UIApplication.sharedApplication().delegate as! AppDelegate
    appDelegate.centerContainer?.toggleDrawerSide(MMDrawerSide.Left, animated: true, completion: nil)
    }
    */
    
    @IBOutlet var logoImg: UIImageView!
    @IBOutlet var scrollView: UIScrollView!
    @IBOutlet var pageControl: UIPageControl!
    
    @IBOutlet var containerView: UIView!
    @IBOutlet var fullScrollView: UIScrollView!
    var pageImages: [UIImage] = []
    var imgView : [UIImageView] = []
    var pageViews: [UIImageView?] = []
    var arr1 : [String]!
    var links : [TestData]!
    
    override func viewDidLoad() {
        let priority = DISPATCH_QUEUE_PRIORITY_DEFAULT
        dispatch_async(dispatch_get_global_queue(priority, 0)) {
        self.fullScrollView.delegate = self
        super.viewDidLoad()
        self.logoImg.image = UIImage(named: "logo.png")
        //    self.navigationItem.titleView = UIImageView(image: logoImg.image)
        self.automaticallyAdjustsScrollViewInsets = false
        self.arr1 = [String]()
        self.links = [TestData]()
            
            dispatch_async(dispatch_get_main_queue()) {
        let api = TestAPI()
        api.loadShots("http://158.85.122.170:81/mongo_api/slider.php?limit=5", completion: self.didLoadShots)
        // someFunc(arr1)
            }
        
    }
    }
    /*
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        var width = UIScreen.mainScreen().applicationFrame.size.width
        var height = containerView.frame.origin.y + 530
      //  fullScrollView.contentSize = containerView.frame.size

     //   fullScrollView.contentSize = containerView.bounds.size
      //  fullScrollView.setContentOffset(bottomOffset, animated: true)
        //  fullScrollView.contentSize = CGSize(width: width, height: 1220)
    }
    */
    func didLoadShots(links: [TestData]) {
       
        self.links = links
        if pageImages.count < 1 {
        for i in 0 ... links.count-1 {
            // println("\(links[i].url)")
            arr1.append(links[i].url!)
            let random = links[i].url! as String?
            
            print(random!)
            var img : NSURL = NSURL(string: random!)!
            
            // println(UIImage(data: NSData(contentsOfURL: NSURL(string: links[i].url!)!)!)!)
            // pageImages.append(imgView[i].hnk_setImageFromURL(img))]
         //   pageImages[i].hnk_setImageFromURL(img)
            
            
          //   self.pageImages.append(UIImage(data: NSData(contentsOfURL: NSURL(string: links[i].url!)!)!)!)
            
        }
        
        // println(arr1)
        // println(links.count)
        print(arr1.count)
        
        let pageCount = pageImages.count
        
        // Set up the page control
        pageControl.currentPage = 0
        pageControl.numberOfPages = pageCount
        
        // Set up the array to hold the views for each page
        for _ in 0..<pageCount {
            pageViews.append(nil)
        }
        
        // Set up the content size of the scroll view
        let pagesScrollViewSize = scrollView.frame.size
        print(pagesScrollViewSize.width)
        scrollView.contentSize = CGSize(width: pagesScrollViewSize.width * CGFloat(pageImages.count), height: pagesScrollViewSize.height)
        
        // Load the initial set of pages that are on screen
        loadVisiblePages()
        }
    }
    
    func loadPage(page: Int) {
        
        if page < 0 || page >= pageImages.count {
            // If it's outside the range of what you have to display, then do nothing
            return
        }
        
        // Load an individual page, first checking if you've already loaded it
        if let pageView = pageViews[page] {
            // Do nothing. The view is already loaded.
        } else {
            var frame = scrollView.bounds
            frame.origin.x = frame.size.width * CGFloat(page)
            frame.origin.y = 0.0
            frame = CGRectInset(frame, 0.0, 0.0)
            
            let newPageView = UIImageView(image: pageImages[page])
            //  newPageView.contentMode = .ScaleAspectFit
            newPageView.frame = frame
             dispatch_async(dispatch_get_main_queue()) {
            self.scrollView.addSubview(newPageView)
            }
            pageViews[page] = newPageView
        }
        
    }
    
    func purgePage(page: Int) {
        
        
        if page < 0 || page >= pageImages.count {
            // If it's outside the range of what you have to display, then do nothing
            return
        }
        
        // Remove a page from the scroll view and reset the container array
        if let pageView = pageViews[page] {
            pageView.removeFromSuperview()
            pageViews[page] = nil
        }
        
    }
    
    func loadVisiblePages() {
        
        // First, determine which page is currently visible
        let pageWidth = scrollView.frame.size.width
        let page = Int(floor((scrollView.contentOffset.x * 2.0 + pageWidth) / (pageWidth * 2.0)))
        
        // Update the page control
        pageControl.currentPage = page
        
        // Work out which pages you want to load
        let firstPage = page - 1
        let lastPage = page + 1
        
        
        // Purge anything before the first page
        for var index = 0; index < firstPage; ++index {
            purgePage(index)
        }
        
        // Load pages in our range
        for var index = firstPage; index <= lastPage; ++index {
            loadPage(index)
        }
        
        // Purge anything after the last page
        for var index = lastPage+1; index < pageImages.count; ++index {
            purgePage(index)
        }
    }
    
    
    func scrollViewDidScroll(scrollView: UIScrollView) {
        // Load the pages that are now on screen
        loadVisiblePages()
    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
}
