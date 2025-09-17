//
//  ViewController.swift
//  jsonParseArre
//
//  Created by Dignitas Digital on 6/23/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import UIKit


class ViewController: UICollectionViewController , UICollectionViewDelegateFlowLayout {
    
    @IBOutlet var collectView: UICollectionView!
    
    
    var links : [CategoryData]!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        links = [CategoryData]()
        let api = CategoryAPI()
        api.loadShots("https://gist.githubusercontent.com/anonymous/c336c168b8d765b59d99/raw/00d4819279807f10110eba2c1a9e89c07b6191e4/cat", completion: didLoadShots)
        
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
    
    
    override func numberOfSectionsInCollectionView(collectionView: UICollectionView) -> Int {
        return 1
    }
    
    override func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        
        return links.count
        
    }
    
    override func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        
        
        
        let cell = collectionView.dequeueReusableCellWithReuseIdentifier("Cell", forIndexPath: indexPath) 
        
        let linksCell = links[indexPath.row] as CategoryData
        
        let random = links[indexPath.row].url! as String?
        
        //     var img =  UIImage(data: NSData(contentsOfURL: NSURL(string:"\(random)")!)!)
        let img: NSURL = NSURL(string: random!)!
        let test =  UIImage(data: NSData(contentsOfURL: img)!)
        print(test)
        //   println(img)
        if let linkLabel = cell.viewWithTag(1) as? UILabel {
            linkLabel.text = linksCell.movie
            print(linkLabel.text)
        }
        if let imgLabel = cell.viewWithTag(2) as? UIImageView
        {
            imgLabel.image = test
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
        if(segue.identifier == "detailView") {
            let cell = sender as! CollectionViewCell
            
            let vc = segue.destinationViewController as! TestDesc
            let myIndexPath : NSIndexPath = self.collectView.indexPathForCell(cell)!
            let row = myIndexPath.row
            vc.releaseDate = links[row].title!
            vc.videoId = links[row].videoLink!
            vc.genreValue = links[row].genre!
        }
    }
    
    
}