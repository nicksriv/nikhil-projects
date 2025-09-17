//
//  TestAPI.swift
//  jsonParseArre
//
//  Created by Dignitas Digital on 6/23/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import Foundation

class CategoryAPI {
    
    func loadShots(shotsUrl: String, completion: (([CategoryData]) -> Void)!) {
        
        let accessToken = "dc5a71673c52e02fb510a7bf514789a90c1d9c169c13edbd92e5e19ba74a5f56"
        //  var urlString = shotsUrl + "?access_token=" + accessToken + "&page=1&per_page=25"
        var urlString = shotsUrl
        
        print("NSURLSession: \(urlString)")
        let session = NSURLSession.sharedSession()
        let shotsUrl = NSURL(string: urlString)
        
        var task = session.dataTaskWithURL(shotsUrl!){
            (data, response, error) -> Void in
            
            if error != nil {
                
                print(error!.description)
                print(error!.localizedDescription)
            } else {
                
                var error : NSError?
                
                print("Begin Serialization: ")
                print(data!.length)
                
                
                var shotsDataArray = (try! NSJSONSerialization.JSONObjectWithData(data!, options: .MutableContainers)) as! NSDictionary
                
                var NewsDictionary = (shotsDataArray.valueForKey("trailers")) as! NSArray
                
                //    var potsDataArray = NSJSONSerialization.JSONObjectWithData(data, options: .MutableContainers, error: &error) as! NSArray
                
                var paperDictionary = (NewsDictionary.valueForKey("Bollywood")) as! NSArray
                
                //println(shotsDataArray)
                // println(NewsDictionary)
                var shots = [CategoryData]()
                //  println(NewsDictionary.count)
                // println(paperDictionary.count)
                var arr = paperDictionary[0] as! NSArray
                
                for shot in arr {
                    
                    let shot = CategoryData(data:shot as! NSDictionary)
                    
                    
                    shots.append(shot as CategoryData)
                    
                    
                }
                
                
                let priority = DISPATCH_QUEUE_PRIORITY_DEFAULT
                dispatch_async(dispatch_get_global_queue(priority, 0)) {
                    dispatch_async(dispatch_get_main_queue()) {
                        completion(shots)
                    }
                }
                
            }
        }
        
        task.resume()
    }
    
    
    
}