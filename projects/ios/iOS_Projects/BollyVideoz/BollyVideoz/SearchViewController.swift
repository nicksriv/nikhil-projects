//  SearchViewController.swift
//  jsonParseArre
//
//  Created by Dignitas Digital on 7/31/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import UIKit
import Haneke

class SearchViewController: UIViewController, UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout, UISearchResultsUpdating {
    var searchArr : [String]!
    var imgArr : [String]!
    var idArr : [String]!
    var dateArr : [String]!
    var videoArr : [String]!
    var genreArr : [String]!
    var castArr : [String]!
    var directorArr : [String]!
    var links : [CategoryData]!
    @IBOutlet var viewFit: UIView!
    
    // @IBOutlet var collectionViewCell: UICollectionViewCell!
    
    
    @IBOutlet var collectionView: UICollectionView!
    
    
    //  let tableData = ["One","Two","Three","Twenty-One"]
    var filteredTableData = [String]()
    var filteredImgData = [String]()
    var filteredIdData = [String]()
    var filteredDateData = [String]()
    var filteredVideoData = [String]()
    var filteredGenreData = [String]()
    var filteredCastData = [String]()
    var filteredDirectorData = [String]()
    var resultSearchController = UISearchController()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        searchArr = [String]()
        imgArr = [String]()
        idArr = [String]()
        dateArr = [String]()
        videoArr = [String]()
        genreArr = [String]()
        castArr = [String]()
        directorArr = [String]()
        
        links = [CategoryData]()
        let api = SearchAPI()
        api.loadShots("http://158.85.122.170:81/mongo_api/grid_call.php?limit=1000&offset=0", completion: didLoadShots)
        
    }
    
    func didLoadShots(links: [CategoryData]) {
        self.links = links
        for i in 0 ... links.count-1 {
            //  println("\(links[i].url)")
            searchArr.append(links[i].movie!)
            imgArr.append(links[i].url!)
            idArr.append(links[i].movieId!)
            dateArr.append(links[i].release!)
            videoArr.append(links[i].videoLink!)
            genreArr.append(links[i].genre!)
            castArr.append(links[i].cast!)
            directorArr.append(links[i].director!)
        }
        
        // println(searchArr.count)
        self.resultSearchController = ({
            let controller = UISearchController(searchResultsController: nil)
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
        self.collectionView.reloadData()
        
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
        if (self.resultSearchController.active) {
            return self.filteredTableData.count
        }
        else {
            return self.searchArr.count
        }
    }
    
    // The cell that is returned must be retrieved from a call to -dequeueReusableCellWithReuseIdentifier:forIndexPath:
    func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCellWithReuseIdentifier("gridCell", forIndexPath: indexPath) 
        
        // 3
        //self.reloadCollectionViewDataAtIndexPath(indexPath)
        if (self.resultSearchController.active) {
            
            if let textLabel = cell.viewWithTag(2) as? UILabel {
                textLabel.text = filteredTableData[indexPath.row]
                // println(filteredImgData[indexPath.row])
            }
            if let imgLabel = cell.viewWithTag(3) as? UIImageView {
                //imgLabel.hnk_cancelSetImage()
                //  imgLabel.image = nil
                var img: NSURL = NSURL(string: "\(filteredImgData[indexPath.row])")!
                imgLabel.hnk_setImageFromURL(img)
                // imgLabel.image = UIImage(data: NSData(contentsOfURL: img)!)
                //     println(filteredImgData[indexPath.row])
            }
            
            
            return cell
        }
            
        else {
            
            if let textLabel = cell.viewWithTag(2) as? UILabel {
                textLabel.text = searchArr[indexPath.row]
            }
            
            if let imgLabel = cell.viewWithTag(3) as? UIImageView {
                
                var img: NSURL = NSURL(string: "\(imgArr[indexPath.row])")!
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
        self.collectionView.reloadData()
        filteredTableData.removeAll(keepCapacity: false)
        filteredImgData.removeAll(keepCapacity: false)
        filteredVideoData.removeAll(keepCapacity: false)
        
        let searchPredicate = NSPredicate(format: "SELF CONTAINS[c] %@", searchController.searchBar.text!)
        let array = (searchArr as NSArray).filteredArrayUsingPredicate(searchPredicate)
        filteredTableData = array as! [String]
        let arrayImg = (imgArr as NSArray).filteredArrayUsingPredicate(searchPredicate)
        filteredImgData = arrayImg as! [String]
        let arrayId = (idArr as NSArray)
        filteredIdData = arrayId as! [String]
        let arrayDate = (dateArr as NSArray)
        filteredDateData = arrayDate as! [String]
        let arrayVideo = (videoArr as NSArray)
        filteredVideoData = arrayVideo as! [String]
        let arrayGenre = (genreArr as NSArray)
        filteredGenreData = arrayGenre as! [String]
        let arrayCast = (castArr as NSArray)
        filteredCastData = arrayCast as! [String]
        let arrayDirector = (directorArr as NSArray)
        filteredDirectorData = arrayDirector as! [String]
        
        //self.collectionView.reloadData()
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if(segue.identifier == "searchDetail") {
            let cell = sender as! UICollectionViewCell
            
            let vc = segue.destinationViewController as! TestDesc
            let myIndexPath : NSIndexPath = self.collectionView.indexPathForCell(cell)!
            let row = myIndexPath.row
            /*
            println("hey")
            vc.movie = links[row].movie!
            vc.releaseDate = links[row].release!
            vc.videoId = links[row].videoLink!
            vc.genreValue = links[row].genre!
            vc.castValue = links[row].cast!
            vc.movieId = links[row].movieId!
            */
            if (self.resultSearchController.active) {
                
                vc.movie = filteredTableData[row]
                vc.releaseDate = filteredDateData[row]
                vc.videoId = filteredVideoData[row]
                vc.genreValue = filteredGenreData[row]
                vc.castValue = filteredCastData[row]
                vc.movieId = filteredIdData[row]
                vc.directorValue = filteredDirectorData[row]
                
            }
            else {
                vc.movie = searchArr[row]
                vc.releaseDate = dateArr[row]
                vc.videoId = videoArr[row]
                vc.genreValue = genreArr[row]
                vc.castValue = castArr[row]
                vc.movieId = idArr[row]
                vc.directorValue = directorArr[row]
                
            }
            
            
        }
        
    }
    
}
