//
//  TestDesc.swift
//  jsonParseArre
//
//  Created by Dignitas Digital on 6/25/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import Foundation
import UIKit
import Haneke

class TestDesc: UIViewController, UICollectionViewDelegateFlowLayout, UIScrollViewDelegate, UICollectionViewDelegate, UICollectionViewDataSource  {
    var winks : [TestData]!
    var flag = 0
    var bag = 0
    @IBOutlet var scrollView: UIScrollView!
    @IBOutlet var webView: UIWebView!
    

    @IBOutlet var movieName: UILabel!
    var releaseDate = String()
    var videoId = String()
    var movie = String()
    var genreValue = String()
    var castValue = String()
    var movieId = String()
    var directorValue = String()
    
    @IBOutlet var relatedCollectionVc: UICollectionView!
    @IBOutlet var cast: UILabel!
    @IBOutlet var date: UILabel!
    @IBOutlet var genre: UILabel!
    @IBOutlet var director: UILabel!
    
    var splitInArr = [String]()
    var joinToString : String = ""
    var splitCast = [String]()
    var joinCast : String = ""
    
/*
    override func viewWillLayoutSubviews() {
        super.viewDidLayoutSubviews()
        
        var width = UIScreen.mainScreen().applicationFrame.size.width
        var height = UIScreen.mainScreen().applicationFrame.size.height
        scrollView.contentSize = CGSize(width: width, height:height)
        //  println(width)
        
    }
  */

    
    func videoLull(notification:NSNotificationCenter) {
        print("videoplay")
        flag = 1
        
    }
    func videoFull(notification:NSNotificationCenter) {
        bag = 1
        
        print("videooff")
       self.webView.setNeedsDisplay()
    }
    
    override func didRotateFromInterfaceOrientation(fromInterfaceOrientation: UIInterfaceOrientation) {
        
        
        webView.scrollView.scrollEnabled = false
        webView.scrollView.bounces = false
        //println(width)
        // println(videoId)
        print(bag)
        // println(videoId)
        if flag == 0 {
        if UIDevice.currentDevice().orientation.isPortrait.boolValue {
            let width = UIScreen.mainScreen().applicationFrame.size.width - 16
            print(width)
            var height = UIScreen.mainScreen().applicationFrame.size.width - 16
            let html = "<html><body><iframe src=\"http://www.youtube.com/embed/\(videoId)\" width=\"\(width)\" height=\"200\" frameborder=\"0\" allowfullscreen></iframe></body></html>"
            webView.loadHTMLString(html, baseURL: nil)
        }
        if UIDevice.currentDevice().orientation.isLandscape.boolValue {
            let width = scrollView.frame.size.width
            print(width)
            var height = UIScreen.mainScreen().applicationFrame.size.width
            let html = "<html><body><iframe src=\"http://www.youtube.com/embed/\(videoId)\" width=\"\(width)\" height=\"200\" frameborder=\"0\" allowfullscreen></iframe></body></html>"
            webView.loadHTMLString(html, baseURL: nil)
        }
        
        
        }
        
        
        //     println(html)
        
        
    }
    override func viewWillAppear(animated: Bool) {
        let tracker = GAI.sharedInstance().defaultTracker as GAITracker
        tracker.set(kGAIScreenName, value: "Video play")
        tracker.send(GAIDictionaryBuilder.createScreenView().build() as [NSObject : AnyObject])
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("videoLull:"), name: "UIWindowDidBecomeVisibleNotification", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: Selector("videoFull:"), name: "UIWindowDidBecomeHiddenNotification", object: nil)
        let width = UIScreen.mainScreen().applicationFrame.size.width - 16
        var height = UIScreen.mainScreen().applicationFrame.size.width - 16
        webView.scrollView.scrollEnabled = false
        webView.scrollView.bounces = false
        let html = "<html><body><iframe src=\"http://www.youtube.com/embed/\(videoId)\" width=\"\(width)\" height=\"200\" frameborder=\"0\" ></iframe></body></html>"
        webView.loadHTMLString(html, baseURL: nil)
    }
    override func viewDidLoad() {
        winks = [TestData]()

        let api = RelatedAPI()
        // println(winks)

        
        api.loadShots("http://158.85.122.170:81/mongo_api/recom_call.php?id=\(movieId)&limit=8", completion: didLoadShots)
        //  var html = "<html><body><iframe src=\"http://www.youtube.com/embed/\(videoId)\" width=\"330\" height=\"315\" frameborder=\"0\" allowfullscreen></iframe></body></html>"
        splitInArr = genreValue.characters.split {$0 == " "}.map { String($0) }
        // println(splitInArr)
        joinToString = splitInArr.joinWithSeparator(", ")
        // println(joinToString)
        splitCast = castValue.characters.split {$0 == ","}.map { String($0) }
        joinCast = splitCast.joinWithSeparator(", ")
        cast.sizeToFit()
        movieName.text = movie
        genre.text = joinToString
        date.text = releaseDate
        cast.text = joinCast
        director.text = directorValue
        cast.adjustsFontSizeToFitWidth = true
        movieName.adjustsFontSizeToFitWidth = true
      //  director.adjustsFontSizeToFitWidth = true
        genre.adjustsFontSizeToFitWidth = true

        
        
    }
    
    func didLoadShots(Winks : [TestData]) {
        self.winks = Winks
        relatedCollectionVc.reloadData()
        //  println(winks.count)
    }
    
    
    func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        
        // println(winks.count)
        return winks.count
    }
    
    // The cell that is returned must be retrieved from a call to -dequeueReusableCellWithReuseIdentifier:forIndexPath:
    func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCellWithReuseIdentifier("relatedCell", forIndexPath: indexPath) 
        let winksCell = winks[indexPath.row] as TestData
        
        let random = winks[indexPath.row].url! as String?
        
        //     var img =  UIImage(data: NSData(contentsOfURL: NSURL(string:"\(random)")!)!)
        var img: NSURL = NSURL(string: random!)!
        //  var test =  UIImage(data: NSData(contentsOfURL: img)!)
        //  println(test)
        //   println(img)
        if let winkLabel = cell.viewWithTag(5) as? UILabel {
            winkLabel.text = winksCell.movie
            winkLabel.adjustsFontSizeToFitWidth = true
            print(winkLabel.text)
        }
        if let imgLabel = cell.viewWithTag(6) as? UIImageView
        {
            imgLabel.image = UIImage(named: "placeholder.png")
            // imgLabel.image = test
            imgLabel.hnk_setImageFromURL(img)
        }
        return cell
    }
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if(segue.identifier == "callItself") {
            let cell = sender as! UICollectionViewCell
            
            let vc = segue.destinationViewController as! TestDesc
            let myIndexPath : NSIndexPath = self.relatedCollectionVc.indexPathForCell(cell)!
            let row = myIndexPath.row
            vc.movie = winks[row].movie!
            vc.releaseDate = winks[row].release!
            vc.videoId = winks[row].videoLink!
            vc.genreValue = winks[row].genre!
            vc.castValue = winks[row].cast!
            vc.movieId = winks[row].movieId!
            vc.directorValue = winks[row].director!
            
            
        }
        
    }
    
}