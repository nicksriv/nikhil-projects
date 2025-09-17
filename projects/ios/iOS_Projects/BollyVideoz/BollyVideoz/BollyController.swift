//
//  ViewController.swift
//  collectionViewReplicate
//
//  Created by Dignitas Digital on 7/19/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import UIKit
import CoreData
import Haneke

class BollyController: UIViewController, UICollectionViewDelegateFlowLayout, UIScrollViewDelegate, UICollectionViewDelegate, UICollectionViewDataSource {
    // @IBOutlet var collectView: UICollectionView!
    @IBOutlet var textLabel: UILabel!
    @IBOutlet var seeAll: UIButton!
    
    
    @IBOutlet var collectView: UICollectionView!
    
    //  @IBOutlet var scrollView: UIScrollView!
    var links : [CategoryData]!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view, typically from a nib.
        //    collectView.dataSource = self
        //   collectView.delegate = self
        // scrollView.contentSize.height = 1000
        links = [CategoryData]()
        let api = CategoryAPI()
        api.loadShots("http://158.85.122.170:81/mongo_api/cat_slider.php?limit=10&offset=0", completion: didLoadShots)
        //    api.loadShots("http://192.168.1.38/bvz2/api/mongo_server/cat_slider.php?limit=8&offset=0", completion: didLoadShots)
        
        
    }
    
    func didLoadShots(links: [CategoryData]) {
        self.links = links
        collectView.reloadData()
        // println(links.count)
    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    
    func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        
        return links.count
        
    }
    
    func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCellWithReuseIdentifier("Cell", forIndexPath: indexPath) 
        
        
        
        textLabel.text = "Bollywood"
        // println(textLabel)
        //  let hearderCell = collectionView.dequeueReusableCellWithReuseIdentifier("headerCell", forIndexPath: indexPath) as! UICollectionViewCell
        
        
        let linksCell = links[indexPath.row] as CategoryData
        
        let random = links[indexPath.row].url! as String?
        
        //     var img =  UIImage(data: NSData(contentsOfURL: NSURL(string:"\(random)")!)!)
        var img: NSURL = NSURL(string: random!)!
        //  var test =  UIImage(data: NSData(contentsOfURL: img)!)
        //   println(test)
        //   println(img)
        if let loader = cell.viewWithTag(3) as? UIActivityIndicatorView {
            loader.startAnimating()
            loader.hidesWhenStopped = true
        if let linkLabel = cell.viewWithTag(1) as? UILabel {
            linkLabel.text = linksCell.movie
            linkLabel.adjustsFontSizeToFitWidth = true
            print(linkLabel.text)
        }
        if let imgLabel = cell.viewWithTag(2) as? UIImageView
        {
            imgLabel.image = UIImage(named: "placeholder.png")
            
            imgLabel.hnk_setImageFromURL(img)
            loader.stopAnimating()
        }
        if let headerLabel = cell.viewWithTag(3) as? UILabel {
            headerLabel.text = linksCell.videoLink
            print(headerLabel.text)
        }
        //  var imageLabel = UIImage(named: "\(random)")
        // println(imageLabel)
        //  imgLabel = UIImageView(image: test)
        // println(imgLabel)
        
        //       imgLabel.image = test
        //  self.view.addSubview(imgLabel)
        }
        
        
        return cell
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if(segue.identifier == "detailView") {
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
        if(segue.identifier == "bollyView") {
            let bc = segue.destinationViewController as! pageMenu
            bc.category = "Bollywood"
        }
    }
    
    
}

