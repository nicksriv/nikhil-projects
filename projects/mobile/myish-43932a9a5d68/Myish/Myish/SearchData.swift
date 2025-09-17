//
//  SearchData.swift
//  Myish
//
//  Created by Nikhil Srivastava on 10/29/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class SearchData{
    
    var id : String!
    var title : String?
    var imageURL : String?
    var image : UIImage!
    
    //var imageCache: [String : UIImage]
    var category: String!
    var yays: String!
    var nays: String!
    var skip: String!
    var comments: [String]!
    var timestamp: String!
    var profileImageURL: String!
    var profileName: String!
    
    init(data : NSDictionary){
        
        self.id = Utils.getStringFromJSON(data, key: "_id")
        
        self.title=Utils.getStringFromJSON(data, key: "postname")
        
        self.imageURL=Utils.getStringFromJSON(data, key: "postimage")
        
        self.category = Utils.getStringFromJSON(data, key: "category")
        
        self.yays = Utils.getStringFromJSON(data, key: "postyays")
        
        self.nays = Utils.getStringFromJSON(data, key: "postnays")
        
        self.skip = Utils.getStringFromJSON(data, key: "postskip")
        
        self.timestamp = Utils.getStringFromJSON(data, key: "timestamp")
        
        self.comments = Utils.getStringArrayFromJSON(data, key: "comments")
        
        //self.imageCache = [String : UIImage]()
        
        self.profileImageURL = Utils.getStringFromJSON(data, key: "postedbyprofilepicture")
        
        self.profileName = Utils.getStringFromJSON(data, key: "postedbyusername")
        
        let dateFormatter = NSDateFormatter()
        dateFormatter.dateFormat = "MM-dd-yyyy"
        dateFormatter.timeZone = NSTimeZone.localTimeZone()
        
        // convert string into date
        let dateValue = dateFormatter.dateFromString(timestamp) as NSDate!
        if dateValue != nil{
            let interval = NSDate().timeIntervalSinceDate(dateValue)
            let ti = NSInteger(interval)
            
            let ms = Int((interval % 1) * 1000)
            
            let seconds = ti % 60
            let minutes = (ti / 60) % 60
            let hours = (ti / 3600)
            
            timestamp =  String(format: "%0.2d",hours)
        }
        
        
    }
    
    
    func downloadImageWithUrl(url: NSURL, completionHandler:(succeeded: Bool, image: UIImage?) -> Void) -> Void {
        let session = NSURLSession.sharedSession()
        let request = NSMutableURLRequest(URL: url)

        let task = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in
            if (error == nil) {
                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                    let image = UIImage(data: data!)
                    self.image = image
                    imageCache[self.imageURL!] = image
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