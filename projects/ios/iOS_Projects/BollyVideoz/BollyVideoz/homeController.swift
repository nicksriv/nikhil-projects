//
//  homeController.swift
//  BollyVideoz
//
//  Created by Dignitas Digital on 8/14/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import UIKit
import Haneke

class homeController: UIViewController, UICollectionViewDelegate, UICollectionViewDataSource, UIScrollViewDelegate {
    
    @IBOutlet var pageControl: UIPageControl!
    @IBOutlet var fullScrollView: UIScrollView!
    
    @IBOutlet var logoImg: UIImageView!
    
    @IBOutlet var collectView: UICollectionView!
    
    @IBOutlet weak var pageLoading: UIActivityIndicatorView!
    var links : [TestData]!
    var Array = [String]()
    
    override func viewWillLayoutSubviews() {
        
        collectView.collectionViewLayout.invalidateLayout()
        
        pageControl.numberOfPages = Int(collectView.contentSize.width / collectView.frame.size.width)
        print(pageControl.numberOfPages)
        pageControl.addTarget(self, action: Selector("changePage:"), forControlEvents: UIControlEvents.ValueChanged)
        
        
    }
    
    override func viewWillAppear(animated: Bool) {
        let tracker = GAI.sharedInstance().defaultTracker as GAITracker
        tracker.set(kGAIScreenName, value: "BollyVideos home")
        tracker.send(GAIDictionaryBuilder.createScreenView().build() as [NSObject : AnyObject])
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if Reachability.isConnectedToNetwork() == true {
            print("Internet connection OK")
        } else {
            print("Internet connection FAILED")
            let alert = UIAlertView(title: "No Internet Connection", message: "Make sure your device is connected to the internet.", delegate: nil, cancelButtonTitle: "OK")
            alert.show()
            
        }
        
         self.logoImg.image = UIImage(named: "logo.png")
        links = [TestData]()
        let api = TestAPI()
        api.loadShots("http://158.85.122.170:81/mongo_api/slider.php?limit=5", completion: didLoadShots)
        // Do any additional setup after loading the view, typically from a nib.
        //    Array = ["Hii","Pulkit","Hii","Pulkit","Hii","Pulkit","Hii","Pulkit","Hii","Pulkit","Hii","Pulkit","Hii","Pulkit","Hii"]
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func didLoadShots(links: [TestData]) {
        
        self.links = links
        pageLoading.startAnimating()
        collectView.reloadData()
        pageLoading.stopAnimating()
        
    }
    
    
    func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
       print("links count \(links.count)")
        return links.count
    }
    
    func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        let cell =  collectionView.dequeueReusableCellWithReuseIdentifier("cell", forIndexPath: indexPath) 
        
        let random = links[indexPath.row].url! as String?
        
        //     var img =  UIImage(data: NSData(contentsOfURL: NSURL(string:"\(random)")!)!)
        var img: NSURL = NSURL(string: random!)!
        print(random)
        if let imgLabel = cell.viewWithTag(23) as? UIImageView {
            imgLabel.image = UIImage(named: "slider.png")
            imgLabel.hnk_setImageFromURL(img)
        }
        // var textLabel = cell.viewWithTag(1) as! UILabel
        
        // textLabel.text = Array[indexPath.row]
        
        return cell
    }
    
    func collectionView(collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAtIndexPath indexPath: NSIndexPath) -> CGSize
    {
        let cellSpacing = CGFloat(2) //Define the space between each cell
        let leftRightMargin = CGFloat(20) //If defined in Interface Builder for "Section Insets"
        let numColumns = CGFloat(3) //The total number of columns you want
        
        let totalCellSpace = cellSpacing * (numColumns - 1)
        let screenWidth = collectView.bounds.size.width
        //  let width = (screenWidth - leftRightMargin - totalCellSpace) / numColumns
        let height = CGFloat(180) //whatever height you want
        
        return CGSizeMake(screenWidth, height);
    }

    func collectionView(collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAtIndex indexPath: NSIndexPath)  -> UIEdgeInsets {
        return UIEdgeInsetsMake(-35, 0, 0, 0)
    }

    func changePage(sender: AnyObject) -> () {
        let x = CGFloat(pageControl.currentPage) * collectView.frame.size.width
        collectView.setContentOffset(CGPointMake(x, 0), animated: true)
    }
    
    func scrollViewDidEndDecelerating(scrollView: UIScrollView) -> () {
        let pageNumber = round(collectView.contentOffset.x / collectView.frame.size.width);
        pageControl.currentPage = Int(pageNumber)
    }
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if(segue.identifier == "sliderView") {
            let cell = sender as! UICollectionViewCell
            
            let vc = segue.destinationViewController as! TestDesc
            let myIndexPath : NSIndexPath = self.collectView.indexPathForCell(cell)!
            let row = myIndexPath.row
            vc.movie = links[row].movie!
            vc.releaseDate = links[row].release!
            vc.videoId = links[row].videoLink!
            vc.genreValue = links[row].genre!
            vc.castValue = links[row].cast!
            vc.movieId = links[row].movieId!
            vc.directorValue = links[row].director!
            
            
        }

    }

}

