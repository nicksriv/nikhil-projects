//
//  PostApi.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/8/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class PostApi{
    
    var posts: [Post]!
    var index: Int!
    
    init(){
        self.posts = [Post]()
        self.index = 0
    }
    
    func loadYayNay(Url: String, completion: (([Post]) -> Void)!) {
        
        let urlString = Url
        self.posts = [Post]()
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
                    
                    let yayNay = Post(data:yayNay as NSDictionary )
                    
                    print(yayNay.title!)
                    
                    print("object added \(self.posts.count)")
                    if yayNay.imageURL != ""{
                        print("search added \(self.posts.count)")
                        print("image added \(yayNay.imageURL!)")
                        self.posts.append(yayNay as Post)
                    }
                    
                }
                
                let priority = DISPATCH_QUEUE_PRIORITY_DEFAULT
                dispatch_async(dispatch_get_global_queue(priority, 0)) {
                    dispatch_async(dispatch_get_main_queue()) {
                        
                        completion(self.posts)
                    }
                }
                
            }
        }
        
        task.resume()
        
    }
    
    
    
}