//
//  NavAPI.swift
//  myDrawer
//
//  Created by Dignitas Digital on 6/23/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import Foundation

class NavAPI {
    
    func loadShots(shotsUrl: String, completion: (([NavData]) -> Void)!) {
        
       // let accessToken = "dc5a71673c52e02fb510a7bf514789a90c1d9c169c13edbd92e5e19ba74a5f56"
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
                
                
                //        var paperDictionary = (NewsDictionary.valueForKey("genres")) as! NSArray
                
                //println(shotsDataArray)
                //  println(NewsDictionary)
                var shots = [NavData]()
                //  println(NewsDictionary.count)
                // println(paperDictionary.count)
                
                
                
                //    var arr = paperDictionary[0] as! NSArray
                // println(arr)
                for shot in NewsDictionary {
                    
                    let shot = NavData(data:shot as! NSDictionary)
                    
                    
                    shots.append(shot as NavData)
                    
                    
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