//
//  SearchUserData.swift
//  Myish
//
//  Created by Nikhil Srivastava on 10/29/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class SearchUserData{
    
    var id : String!
    var title : String?
    var imageURL : String?
    var image : UIImage!
    var posts : Array<NSDictionary>!
    //var imageCache: [String : UIImage]
//    var category: String!
//    var yays: String!
//    var nays: String!
//    var skip: String!
//    var comments: [String]!
    var timestamp: String!
    var postnames: [String]!
    var postimages: [UIImage]!
    var postimageUrls: [String]!
    var postcount: Int!
     var postsData: [Posts]!
    
    init(data : NSDictionary){
        
        self.id = Utils.getStringFromJSON(data, key: "_id")
        
        self.title=Utils.getStringFromJSON(data, key: "username")
        
        self.imageURL=Utils.getStringFromJSON(data, key: "profilepicture")
        
        self.posts = data["postscreated"] as! Array<NSDictionary>
        
        self.postsData = [Posts]()
        
        //self.postnames = ""
        //self.postimageUrls = ""
        
        self.postnames = [String]()
        self.postimageUrls = [String]()
        self.postimages = [UIImage]()
        self.postcount = 0
        //self.imageCache = [String : UIImage]()
        var ind = 0
        
        while ((self.postcount<3) && (ind < self.posts.count)){
            
            if (self.posts[ind]["postname"] != nil) && (self.posts[ind]["postimage"] != nil){
                var indpost = Posts()
                            indpost.id = self.posts[ind]["_id"] as? String
                            indpost.postid = self.posts[ind]["postid"] as? String
                            indpost.postimage = self.posts[ind]["postimage"] as? String
                            indpost.postname = self.posts[ind]["postname"] as? String
                
                            indpost.timestamp = self.posts[ind]["timestamp"] as? String
                            
                            self.postsData.append(indpost)
                
                
                self.postnames.append(self.posts[ind]["postname"] as! String)
                self.postimageUrls.append(self.posts[ind]["postimage"] as! String)
                self.postcount = self.postcount + 1
            }
            ind = ind + 1
            
        }
        
//        for ind = 0; ind < self.posts.count; ++ind{
//            var indpost = Posts()
//            indpost.id = self.posts[ind]["_id"] as? String
//            indpost.postid = self.posts[ind]["postid"] as? String
//            indpost.postimage = self.posts[ind]["postimage"] as? String
//            indpost.postname = self.posts[ind]["postname"] as? String
//            if ind == 0{
//                self.postimageUrls = indpost.postimage
//                self.postnames = indpost.postname
//            }
//            
//            indpost.timestamp = self.posts[ind]["timestamp"] as? String
//            
//            self.postsData.append(indpost)
//        }
//
        
        
//        self.yays = Utils.getStringFromJSON(data, key: "postyays")
//        
//        self.nays = Utils.getStringFromJSON(data, key: "postnays")
//        
//        self.skip = Utils.getStringFromJSON(data, key: "postskip")
//        
        self.timestamp = Utils.getStringFromJSON(data, key: "timestamp")
//        
//        self.comments = Utils.getStringArrayFromJSON(data, key: "comments")
        
       
        
        
//        
//        let dateFormatter = NSDateFormatter()
//        dateFormatter.dateFormat = "MM-dd-yyyy"
//        dateFormatter.timeZone = NSTimeZone.localTimeZone()
//        
//        // convert string into date
//        let dateValue = dateFormatter.dateFromString(timestamp) as NSDate!
//        if dateValue != nil{
//            let interval = NSDate().timeIntervalSinceDate(dateValue)
//            let ti = NSInteger(interval)
//            
//            let ms = Int((interval % 1) * 1000)
//            
//            let seconds = ti % 60
//            let minutes = (ti / 60) % 60
//            let hours = (ti / 3600)
//            
//            timestamp =  String(format: "%0.2d",hours)
//        }
        
        
    }
    
    func downloadProfileImageWithUrl(url: NSURL, completionHandler:(succeeded: Bool, image: UIImage?) -> Void) -> Void {
        let session = NSURLSession.sharedSession()
        let request = NSMutableURLRequest(URL: url)
        
        let task = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in
            if (error == nil) {
                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                    let image = UIImage(data: data!)
                    self.image = image
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