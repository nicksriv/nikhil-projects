//
//  CardData.swift
//  Myish
//
//  Created by Nikhil Srivastava on 10/22/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class CardData{
    
    var id : String!
    var title : String?
    var imageURL : String?
    var image : UIImage!

    //var imageCache: [String : UIImage]
    var category: String!
    var yays: [String]!
    var nays: [String]!
    var skip: String!
    var comments: [String]!
    var timestamp: String!
    
    var profileImageURL: String!
    var profileName: String!
    var postSkipCount: Int!
    var postYayCount: Int!
    var postNayCount: Int!
    var commentCount: Int!
    var postimage : UIImage!
    var postedBy: String!
    
    
    init(data : NSDictionary){
        
        self.id = Utils.getStringFromJSON(data, key: "_id")
        
        self.title=Utils.getStringFromJSON(data, key: "postname")
        
        self.imageURL=Utils.getStringFromJSON(data, key: "postimage")
        
        self.category = Utils.getStringFromJSON(data, key: "category")
        
        self.yays = Utils.getStringArrayFromJSON(data, key: "postyays")
        
        self.nays = Utils.getStringArrayFromJSON(data, key: "postnays")
        
        self.skip = Utils.getStringFromJSON(data, key: "postskip")
        
        self.timestamp = Utils.getStringFromJSON(data, key: "timestamp")
        
        self.comments = Utils.getStringArrayFromJSON(data, key: "comments")
        
        self.profileImageURL = Utils.getStringFromJSON(data, key: "postedbyprofilepicture")
        
        self.profileName = Utils.getStringFromJSON(data, key: "postedbyusername")
        
        self.postSkipCount = data["postskipcount"] as? Int
        
        self.postYayCount = data["postyaycount"] as? Int
        
        self.postNayCount = data["postnaycount"] as? Int
        
        self.commentCount = data["commentcount"] as? Int

        self.postedBy = Utils.getStringFromJSON(data, key: "postedby")

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
    
    init(){
        
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
        //let requestn = NSURLRequest(URL: url)
        
        let task = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in
            if (error == nil) {
                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                    let image = UIImage(data: data!)
                    //self.postimage = image
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

