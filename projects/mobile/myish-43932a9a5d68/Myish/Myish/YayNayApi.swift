//
//  YayNayApi.swift
//  Myish
//
//  Created by Nikhil Srivastava on 11/3/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class YayNayApi{
    
    var yaynay: [YayNayData]!
    var index: Int!
    
    init(){
        self.yaynay = [YayNayData]()
       // self.index = 0
    }
    
    func loadYayNay(yaynayUrl: String, completion: (([YayNayData]) -> Void)!) {
        
        let urlString = yaynayUrl
        self.yaynay = [YayNayData]()
        print("NSURLSession: \(urlString)")
        let session = NSURLSession.sharedSession()
        let yaynayUrl = NSURL(string: urlString)
        
        let task = session.dataTaskWithURL(yaynayUrl!){
            
            (data, response, error) -> Void in
            
            if error != nil {
                
                print(error!.description)
                print(error!.localizedDescription)
            } else {
                
                print("Begin Serialization: ")
                print(data!.length)
                
                
                let yayNayDataArray = try! NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.MutableContainers) as! Array<NSDictionary>
                
                let yayNayDictionary = yayNayDataArray
                print(yayNayDictionary.count)
                
                for yayNay in yayNayDictionary{
                    
                    let yayNay = YayNayData(data:yayNay as NSDictionary )
                    
                    print(yayNay.title!)
                    
                    print("object added \(self.yaynay.count)")
                    if yayNay.imageURL != ""{
                        print("search added \(self.yaynay.count)")
                        print("image added \(yayNay.imageURL!)")
                        self.yaynay.append(yayNay as YayNayData)
                    }
                    
                }
                
                let priority = DISPATCH_QUEUE_PRIORITY_DEFAULT
                dispatch_async(dispatch_get_global_queue(priority, 0)) {
                    dispatch_async(dispatch_get_main_queue()) {
                        
                        completion(self.yaynay)
                    }
                }
                
            }
        }
        
        task.resume()
        
    }
    

    
}