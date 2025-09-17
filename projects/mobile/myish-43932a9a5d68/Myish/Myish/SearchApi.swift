//
//  SearchApi.swift
//  Myish
//
//  Created by Nikhil Srivastava on 10/29/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class SearchApi{
    
    var searches: [SearchData]!
    var index: Int!
    
    init(){
        self.searches = [SearchData]()
        self.index = 0
    }
    
    func loadSearch(searchUrl: String, completion: (([SearchData]) -> Void)!) {

        let urlString = searchUrl
        self.searches = [SearchData]()
        print("NSURLSession: \(urlString)")
        let session = NSURLSession.sharedSession()
        let searchUrl = NSURL(string: urlString)
        
        let task = session.dataTaskWithURL(searchUrl!){
            
            (data, response, error) -> Void in
            
            if error != nil {
                
                print(error!.description)
                print(error!.localizedDescription)
            } else {
                
                print("Begin Serialization: ")
                print(data!.length)
                
                
                let searchDataArray = try! NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.MutableContainers) as! Array<NSDictionary>
                
                let searchDictionary = searchDataArray
                print(searchDictionary.count)
                
                for search in searchDictionary{
                    
                    let search = SearchData(data:search as NSDictionary )
                    
                    print(search.title!)

                    print("object added \(self.searches.count)")
                    if search.imageURL != ""{
                        print("search added \(self.searches.count)")
                        print("image added \(search.imageURL!)")
                        self.searches.append(search as SearchData)
                    }

                }
                
                let priority = DISPATCH_QUEUE_PRIORITY_DEFAULT
                dispatch_async(dispatch_get_global_queue(priority, 0)) {
                    dispatch_async(dispatch_get_main_queue()) {
                        
                        completion(self.searches)
                    }
                }
                
            }
        }
        
        task.resume()
        
    }
    
}