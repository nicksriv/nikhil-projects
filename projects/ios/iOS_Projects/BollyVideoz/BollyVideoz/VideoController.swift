//
//  VideoController.swift
//  jsonParseArre
//
//  Created by Dignitas Digital on 7/30/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import UIKit

class videoController: UIViewController, UITableViewDelegate, UITableViewDataSource, UIScrollViewDelegate {
    @IBOutlet var videoTable: UITableView!
    
    var flag = 0
    var bag = 0
    
    var links : [CategoryData]!
    
    @IBOutlet weak var pageLoading: UIActivityIndicatorView!
    override func viewWillAppear(animated: Bool) {
        let tracker = GAI.sharedInstance().defaultTracker as GAITracker
        tracker.set(kGAIScreenName, value: "Video screen")
        tracker.send(GAIDictionaryBuilder.createScreenView().build() as [NSObject : AnyObject])
        
    }
    

    override func viewDidLoad() {
        super.viewDidLoad()
       // NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("videoFull:"), name: "UIWindowDidBecomeHiddenNotification", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("videoLull:"), name: "UIWindowDidBecomeVisibleNotification", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("videoFull:"), name: "UIWindowDidBecomeHiddenNotification", object: nil)
        links = [CategoryData]()
        let api = videoAPI()
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?limit=1000&offset=0", completion: didLoadShots)
        videoTable.allowsSelection = false
        
    }
    
    func didLoadShots(links: [CategoryData]) {
        self.links = links
        pageLoading.startAnimating()
        videoTable.reloadData()
        pageLoading.stopAnimating()
    }
    
    func videoLull(notification:NSNotificationCenter) {
        print("videoplay")
        flag = 1
        
    }
    
    func videoFull(notification:NSNotificationCenter) {
        print("videooff")
        self.videoTable.reloadData()
        bag = 1
    }
    /*
    func videoFull(notification:NSNotification){
     //   (UIApplication.sharedApplication().delegate as WGMAppDelegate).videoFullscreen = true
    }
    */

   override func didRotateFromInterfaceOrientation(fromInterfaceOrientation: UIInterfaceOrientation) {
        
        print("\(bag)")
        //println(width)
        // println(videoId)
        
        // println(videoId)
    if flag == 0 {
        if UIDevice.currentDevice().orientation.isPortrait.boolValue {
            self.videoTable.reloadData()
            
        }
        if UIDevice.currentDevice().orientation.isLandscape.boolValue {
            self.videoTable.reloadData()
            
        }
    }
    
    

}
        //     println(html)
    

    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        //  println(links.count)
        return links.count
    }
    
    // Row display. Implementers should *always* try to reuse cells by setting each cell's reuseIdentifier and querying for available reusable cells with dequeueReusableCellWithIdentifier:
    // Cell gets various attributes set automatically based on table (separators) and data source (accessory views, editing controls)
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
       let cell = tableView.dequeueReusableCellWithIdentifier("videoCell")
        
        //  var height = UIScreen.mainScreen().applicationFrame.size.height
                let linksCell = links[indexPath.row]
        if let loader = cell!.viewWithTag(3) as? UIActivityIndicatorView {
            loader.startAnimating()
            loader.hidesWhenStopped = true
        if let webView = cell!.viewWithTag(21) as? UIWebView {
            //   let width = webView.frame.size.width
            //    let height = webView.frame.size.height
            /*  if(UIDeviceOrientationIsLandscape(UIDevice.currentDevice().orientation))
            {
            println("landscape")
            }
            
            if(UIDeviceOrientationIsPortrait(UIDevice.currentDevice().orientation))
            {
            println("Portrait")
            }
            */
            webView.scrollView.scrollEnabled = false
            webView.scrollView.bounces = false
            var html = "<html><body><iframe src=\"http://www.youtube.com/embed/\(linksCell.videoLink!)\" width=\"\(videoTable.frame.width - 16)\" height=\"200\" frameborder=\"0\" allowfullscreen></iframe></body></html>"
            webView.loadHTMLString(html, baseURL: nil)
            loader.stopAnimating()
            //  println(linksCell.videoLink)
            print(html)
        }
        
        if let videoName = cell!.viewWithTag(22) as? UILabel {
            videoName.text = linksCell.title
            videoName.adjustsFontSizeToFitWidth = true
        }
        }
        return cell!
        
    }
    
    
}
