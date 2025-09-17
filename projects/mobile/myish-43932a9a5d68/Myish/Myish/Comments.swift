//
//  Comments.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/18/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation


class Comments{
    
    var id : String!
    var comments: Array<NSDictionary>!
    var commentdata: [CommentData]!
    
    init(){
        commentdata = [CommentData]()
    }
    
    init(data : NSDictionary){
        
        self.id = Utils.getStringFromJSON(data, key: "_id")
        
        self.comments = data["comments"] as! Array<NSDictionary>
        
        commentdata = [CommentData]()
        
        
        //self.imageCache = [String : UIImage]()
        var ind = 0
        
        for ind = 0; ind < self.comments.count; ++ind{
            var indpost = CommentData()
            indpost.id = self.comments[ind]["_id"] as? String
            indpost.username = self.comments[ind]["username"] as? String
            indpost.userimageUrl = self.comments[ind]["userimage"] as? String
            indpost.usercomment = self.comments[ind]["comments"] as? String
            indpost.timestamp = self.comments[ind]["timestamp"] as? String
            let dateValue = indpost.timestamp.toDate as NSDate!
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
                        
                        indpost.timestamp =  String(format: "%0.2d",hours) + " hours"
                    }
                    else{
                        if hours == 1{
                            indpost.timestamp =  String(format: "%0.1d",hours) + " hour"
                        }
                        else if hours < 1{
                            indpost.timestamp =  "Just now"
                        }
                        else{
                            indpost.timestamp =  String(format: "%0.1d",hours) + " hours"
                        }
                        
                    }
                    
                }
                else{
                    let days = hours/24
                    if days > 9{
                        indpost.timestamp =  String(format: "%0.2d",days) + " days"
                        
                    }
                    else{
                        if days == 1{
                            indpost.timestamp =  String(format: "%0.1d",days) + " day"
                        }
                        else{
                            indpost.timestamp =  String(format: "%0.1d",days) + " days"
                        }
                        
                    }
                    
                }
                
            }
            self.commentdata.append(indpost)
        }
        
        
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



