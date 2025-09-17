//
//  ViewController.swift
//  collectionViewReplicate
//
//  Created by Dignitas Digital on 7/19/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import UIKit
import Haneke

class HollyController: UIViewController, UICollectionViewDelegateFlowLayout, UIScrollViewDelegate, UICollectionViewDelegate, UICollectionViewDataSource {
    // @IBOutlet var collectView: UICollectionView!
    @IBOutlet var textLabel: UILabel!
    
    
    //  @IBOutlet var tollyCollect: UICollectionView!
    
    @IBOutlet var collectionView: UICollectionView!
    // @IBOutlet var collectView: UICollectionView!
    
    //  @IBOutlet var scrollView: UIScrollView!
    var links : [CategoryData]!
    

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        //    collectView.dataSource = self
        //   collectView.delegate = self
        // scrollView.contentSize.height = 1000

        links = [CategoryData]()
        let api = HollywoodAPI()
        api.loadShots("http://158.85.122.170:81/mongo_api/cat_slider.php?limit=8&offset=0", completion: didLoadShots)
    }
    
    func didLoadShots(links: [CategoryData]) {
        self.links = links
        collectionView.reloadData()
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
        
        textLabel.text = "Hollywood"
        // println(textLabel)
        //  let hearderCell = collectionView.dequeueReusableCellWithReuseIdentifier("headerCell", forIndexPath: indexPath) as! UICollectionViewCell
        
        
        let linksCell = links[indexPath.row] as CategoryData
        
        let random = links[indexPath.row].url! as String?
        
        //     var img =  UIImage(data: NSData(contentsOfURL: NSURL(string:"\(random)")!)!)
        var img: NSURL = NSURL(string: random!)!
        //  var test =  UIImage(data: NSData(contentsOfURL: img)!)
        //  println(test)
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
            loader.stopAnimating()
          
            imgLabel.hnk_setImageFromURL(img)
        }
        if let headerLabel = cell.viewWithTag(3) as? UILabel {
            headerLabel.text = linksCell.videoLink
            print(headerLabel.text)
        }
        }
        //  var imageLabel = UIImage(named: "\(random)")
        // println(imageLabel)
        //  imgLabel = UIImageView(image: test)
        // println(imgLabel)
        
        //       imgLabel.image = test
        //  self.view.addSubview(imgLabel)
        
        
        
        
        return cell
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if(segue.identifier == "hollywoodMovie") {
            let cell = sender as! UICollectionViewCell
            
            let vc = segue.destinationViewController as! TestDesc
            let myIndexPath : NSIndexPath = self.collectionView.indexPathForCell(cell)!
            let row = myIndexPath.row
            vc.movie = links[row].movie!
            vc.releaseDate = links[row].release!
            vc.videoId = links[row].videoLink!
            vc.genreValue = links[row].genre!
            vc.castValue = links[row].cast!
            vc.movieId = links[row].movieId!
            vc.directorValue = links[row].director!
            
        }
        if(segue.identifier == "hollyView") {
            let bc = segue.destinationViewController as! pageMenu
            bc.category = "Hollywood"
        }
    }
    
    
    
    
}

