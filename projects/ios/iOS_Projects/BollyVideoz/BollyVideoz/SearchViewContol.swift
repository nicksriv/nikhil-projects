//  SearchViewContol.swift
//  BollyVideoz
//
//  Created by Dignitas Digital on 8/11/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import UIKit
import Haneke

class SearchViewControl: UIViewController, UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout, UISearchResultsUpdating, UISearchBarDelegate, UISearchControllerDelegate {
    var searchArr : [String]!
    var imgArr : [String]!
    var links : [CategoryData]!
    @IBOutlet var viewFit: UIView!
    @IBOutlet weak var pageLoading: UIActivityIndicatorView!
    
    var movieObj = movieSync()
    // @IBOutlet var collectionViewCell: UICollectionViewCell!
    var movies = [movieSync]()
    var searchResult = [movieSync]()
    
    @IBOutlet var collectionView: UICollectionView!
    
    
    //  let tableData = ["One","Two","Three","Twenty-One"]
    var filteredTableData = [String]()
    var filteredImgData = [String]()
    
    var resultSearchController = UISearchController()
    
    override func viewWillAppear(animated: Bool) {
        let tracker = GAI.sharedInstance().defaultTracker as GAITracker
        tracker.set(kGAIScreenName, value: "Searches")
        tracker.send(GAIDictionaryBuilder.createScreenView().build() as [NSObject : AnyObject])
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //   searchArr = [String]()
        //   imgArr = [String]()
        print("value \(movieObj.movieName)")
        //    resultSearchController.delegate = self
        links = [CategoryData]()
        let api = SearchAPI()
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?limit=1000&offset=0", completion: didLoadShots)
        
    }
    
    func didLoadShots(links: [CategoryData]) {
        self.links = links
        for i in 0 ... links.count-1 {
            //  println("\(links[i].url)")
            self.movieObj = movieSync()
            self.movieObj.movieName = links[i].movie!
            self.movieObj.movieImg = links[i].url!
            self.movieObj.releaseDate = links[i].release!
            self.movieObj.starCast = links[i].cast!
            self.movieObj.director = links[i].director!
            self.movieObj.genre = links[i].genre!
            self.movieObj.videoLink = links[i].videoLink!
            self.movieObj.movieId = links[i].movieId!
            movies.append(movieObj)
        }
        
        // println(searchArr.count)
        self.resultSearchController = ({
            let controller = UISearchController(searchResultsController: nil)
            controller.delegate = self
            controller.searchBar.delegate = self
            controller.searchResultsUpdater = self
            controller.dimsBackgroundDuringPresentation = false
            controller.hidesNavigationBarDuringPresentation = true
            controller.definesPresentationContext = true
            controller.searchBar.sizeToFit()
            
            //     self.tableView.tableHeaderView = controller.searchBar
            self.viewFit.addSubview(controller.searchBar)
            
            return controller
        })()
        
        // Reload the table
        pageLoading.startAnimating()
        self.collectionView.reloadData()
        pageLoading.stopAnimating()
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Table view data source
    func numberOfSectionsInCollectionView(collectionView: UICollectionView) -> Int {
        return 1
    }
    
    func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        print(searchResult.count)
        print(movies.count)
        if (self.resultSearchController.active) {
            
            return self.searchResult.count
        }
        else {
            return self.movies.count
        }
    }
    
    // The cell that is returned must be retrieved from a call to -dequeueReusableCellWithReuseIdentifier:forIndexPath:
    func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCellWithReuseIdentifier("gridCell", forIndexPath: indexPath) 
        var movie = movieSync()
        // 3
        //self.reloadCollectionViewDataAtIndexPath(indexPath)
        if (self.resultSearchController.active) {
            movie = searchResult[indexPath.row] as movieSync
            if let textLabel = cell.viewWithTag(2) as? UILabel {
                textLabel.text = movie.movieName
                textLabel.adjustsFontSizeToFitWidth = true
                // println(filteredImgData[indexPath.row])
            }
            if let imgLabel = cell.viewWithTag(3) as? UIImageView {
                //imgLabel.hnk_cancelSetImage()
                //  imgLabel.image = nil
                imgLabel.image = UIImage(named: "placeholder.png")
                var img: NSURL = NSURL(string: "\(movie.movieImg)")!
                imgLabel.hnk_setImageFromURL(img)
                // imgLabel.image = UIImage(data: NSData(contentsOfURL: img)!)
                //     println(filteredImgData[indexPath.row])
            }
            
            
            return cell
        }
            
        else {
            
            if let textLabel = cell.viewWithTag(2) as? UILabel {
                textLabel.text = movies[indexPath.row].movieName
                textLabel.adjustsFontSizeToFitWidth = true
            }
            
            if let imgLabel = cell.viewWithTag(3) as? UIImageView {
                imgLabel.image = UIImage(named: "placeholder.png")
                var img: NSURL = NSURL(string: "\(movies[indexPath.row].movieImg)")!
                imgLabel.hnk_setImageFromURL(img)
                // imgLabel.image = UIImage(data: NSData(contentsOfURL: img)!)
                //     println(filteredImgData[indexPath.row])
                
            }
            return cell
        }
        
    }
    /*    func reloadCollectionViewDataAtIndexPath(indexPath:NSIndexPath){
    var indexArray = NSArray(object: indexPath)
    println("\(indexArray)")
    self.collectionView!.reloadItemsAtIndexPaths(indexArray as [AnyObject])
    }
    */
    func updateSearchResultsForSearchController(searchController: UISearchController)
    {
        // println("saerch")
        //  self.collectionView.reloadData()
        // filteredTableData.removeAll(keepCapacity: false)
        // filteredImgData.removeAll(keepCapacity: false)
        
        
        //let searchPredicate = NSPredicate(format: "SELF CONTAINS[c] %@", searchController.searchBar.text)
        // searchResult = (movies as NSArray).filteredArrayUsingPredicate(searchPredicate)
        //   searchResult = array as! [String]
        
        
        //self.collectionView.reloadData()
    }
    
    func searchBarSearchButtonClicked(searchBar: UISearchBar){
        
        self.searchResult = [movieSync]()
        for var ind = 0; ind < movies.count; ++ind{
            
            if (movies[ind].movieName.lowercaseString.rangeOfString(searchBar.text!.lowercaseString) != nil){
                self.searchResult.append(movies[ind])
            }
            
        }
        
        self.collectionView.reloadData()
        
    }
    
    func searchBarCancelButtonClicked(searchBar: UISearchBar) {
        
       // self.collectionView.reloadData()
        
    }
    
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if(segue.identifier == "searchDetail") {
            let cell = sender as! UICollectionViewCell
            
            let vc = segue.destinationViewController as! TestDesc
            let myIndexPath : NSIndexPath = self.collectionView.indexPathForCell(cell)!
            let row = myIndexPath.row
            
            var movie = movieSync()
/*            println("hey")
            vc.movie = links[row].movie!
            vc.releaseDate = links[row].release!
            vc.videoId = links[row].videoLink!
            vc.genreValue = links[row].genre!
            vc.castValue = links[row].cast!
            vc.movieId = links[row].movieId!
  */          
            if (self.resultSearchController.active) {
                movie = searchResult[row] as movieSync
                
                vc.movie = movie.movieName
                vc.movieId = movie.movieId
                vc.releaseDate = movie.releaseDate
                vc.castValue = movie.starCast
                vc.directorValue = movie.director
                vc.videoId = movie.videoLink
                vc.genreValue = movie.genre
               
                
            }
            else {
                movie = movies[row] as movieSync
                
                vc.movie = movie.movieName
                vc.movieId = movie.movieId
                vc.releaseDate = movie.releaseDate
                vc.castValue = movie.starCast
                vc.directorValue = movie.director
                vc.videoId = movie.videoLink
                vc.genreValue = movie.genre
                
            }
            
            
        }
        
    }
    
}
