//
//  HollyCollectionView.swift
//  jsonParseArre
//
//  Created by Dignitas Digital on 7/30/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//


import UIKit

class hollyCollectionView: UICollectionViewController, UICollectionViewDelegateFlowLayout {
    
    @IBOutlet var collectionViewOutlet: UICollectionView!
    var links : [CategoryData]!
    let api = bollyMenuAPI()
    var flag: Int = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        links = [CategoryData]()
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList0:",name:"load0", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList1:",name:"load1", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList2:",name:"load2", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList3:",name:"load3", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList4:",name:"load4", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList5:",name:"load5", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList6:",name:"load6", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList7:",name:"load7", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList8:",name:"load8", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList9:",name:"load9", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList10:",name:"load10", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList11:",name:"load11", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList12:",name:"load12", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList13:",name:"load13", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList14:",name:"load14", object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "loadList15:",name:"load15", object: nil)
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=all&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        // Do any additional setup after loading the view, typically from a nib.
        
        //   api.loadShots("https://gist.githubusercontent.com/anonymous/113d07b9d1dccad81895/raw/bdcb0401bde4fe16d2b6f4c8ce36d731e0cfd9f2/cat_slider", completion: didLoadShots)
        // collectView.reloadData()
    }
    func loadList0(notification: NSNotification){
        //load data here
        print("loadlis0")
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=all&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    func loadList1(notification: NSNotification){
        //load data here
        print("loadlis1")
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=action&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    func loadList2(notification: NSNotification){
        //load data here
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=adventure&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    func loadList3(notification: NSNotification){
        //load data here
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=animation&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    func loadList4(notification: NSNotification){
        //load data here
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=comedy&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    func loadList5(notification: NSNotification){
        //load data here
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=crime&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    func loadList6(notification: NSNotification){
        //load data here
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=drama&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    func loadList7(notification: NSNotification){
        //load data here
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=family&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    func loadList8(notification: NSNotification){
        //load data here
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=fantasy&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    func loadList9(notification: NSNotification){
        //load data here
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=horror&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    func loadList10(notification: NSNotification){
        //load data here
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=mystery&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    func loadList11(notification: NSNotification){
        //load data here
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=romance&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    func loadList12(notification: NSNotification){
        //load data here
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=sci-fi&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    func loadList13(notification: NSNotification){
        //load data here
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=uncategorized&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    func loadList14(notification: NSNotification){
        //load data here
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?genres=religious&category=hollywood&limit=1000&offset=0", completion: didLoadShots)
        //  self.collectionViewOutlet.reloadData()
    }
    
    
    
    func didLoadShots(links: [CategoryData]) {
        self.links = links
        collectionViewOutlet.reloadData()
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
        var img: NSURL = NSURL(string: random!)!
        //  var test =  UIImage(data: NSData(contentsOfURL: img)!)
        //  println(test)
        //   println(img)
        if let linkLabel = cell.viewWithTag(7) as? UILabel {
            linkLabel.text = linksCell.movie
            linkLabel.adjustsFontSizeToFitWidth = true
            print(linkLabel.text)
            // println("acha")
        }
        
        if let imgLabel = cell.viewWithTag(8) as? UIImageView
        {
            imgLabel.image = UIImage(named: "placeholder.png")
            imgLabel.hnk_setImageFromURL(img)
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
        if(segue.identifier == "hollyDetail") {
            let cell = sender as! UICollectionViewCell
            
            let vc = segue.destinationViewController as! TestDesc
            let myIndexPath : NSIndexPath = self.collectionViewOutlet.indexPathForCell(cell)!
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
