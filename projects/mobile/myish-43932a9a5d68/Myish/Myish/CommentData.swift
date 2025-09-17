//
//  CommentData.swift
//  Myish
//
//  Created by Nikhil Srivastava on 11/22/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class CommentData{
    
    var id : String!
    var timestamp: String!
    var username: String!
    var userimage: UIImage!
    var userimageUrl: String!
    var usercomment: String!
    
    init(){
       
    }
    
    init(data : NSDictionary){
        
        self.id = Utils.getStringFromJSON(data, key: "_id")
        self.username = Utils.getStringFromJSON(data, key: "username")
        self.userimageUrl = Utils.getStringFromJSON(data, key: "userimage")
        self.usercomment = Utils.getStringFromJSON(data, key: "comments")
        self.timestamp = Utils.getStringFromJSON(data, key: "timestamp")
        
        let dateValue = timestamp.toDate as NSDate!
        if dateValue != nil{
            let interval = NSDate().timeIntervalSinceDate(dateValue!)
            //timestamp = dateFormatter.stringFromDate(currentDate)
            let ti = NSInteger(interval)
            
            let ms = Int((interval % 1) * 1000)
            
            let seconds = ti % 60
            let minutes = (ti / 60) % 60
            let hours = (ti / 3600)
            
            if hours < 24{
                if hours > 9{
                    
                    timestamp =  String(format: "%0.2d",hours) + " hours"
                }
                else{
                    if hours == 1{
                        timestamp =  String(format: "%0.1d",hours) + " hour"
                    }
                    else if hours < 1{
                        timestamp =  "Just now"
                    }
                    else{
                        timestamp =  String(format: "%0.1d",hours) + " hours"
                    }
                    
                }
                
            }
            else{
                let days = hours/24
                if days > 9{
                    timestamp =  String(format: "%0.2d",days) + " days"
                    
                }
                else{
                    if days == 1{
                        timestamp =  String(format: "%0.1d",days) + " day"
                    }
                    else{
                        timestamp =  String(format: "%0.1d",days) + " days"
                    }
                    
                }
                
            }
            
        }

        
    }
    
    func downloadProfileImageWithUrl(url: NSURL, completionHandler:(succeeded: Bool, image: UIImage?) -> Void) -> Void {
        let session = NSURLSession.sharedSession()
        let request = NSMutableURLRequest(URL: url)
        
        let task = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in
            if (error == nil) {
                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                    let image = UIImage(data: data!)
                    //self.image = image
                    imageCache[url.absoluteString] = image
                    print("success")
                    completionHandler(succeeded: true, image: image)
                })
            } else {
                print("error")
                completionHandler(succeeded: false, image: nil)
            }
        })
        
        task.resume()
    }
    
    
    func downloadImageWithUrl(url: NSURL, completionHandler:(succeeded: Bool, image: UIImage?) -> Void) -> Void {
        let session = NSURLSession.sharedSession()
        let request = NSMutableURLRequest(URL: url)
        
        let task = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in
            if (error == nil) {
                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                    let image = UIImage(data: data!)
                    //self.image = image
                    imageCache[url.absoluteString] = image
                    print("success")
                    completionHandler(succeeded: true, image: image)
                })
            } else {
                print("error")
                completionHandler(succeeded: false, image: nil)
            }
        })
        
        task.resume()
    }
    
}