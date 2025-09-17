//
//  Posts.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/10/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class Posts{
    
    var postid: String!
    var postname: String!
    var timestamp: String!
    var postimage: String!
    var id: String!
    //var imageCache: [String : UIImage]
    init(){
       //self.imageCache = [String : UIImage]()
    }
    
    func downloadImageWithUrl(url: NSURL, completionHandler:(succeeded: Bool, image: UIImage?) -> Void) -> Void {
        let session = NSURLSession.sharedSession()
        let request = NSMutableURLRequest(URL: url)
        
        let task = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in
            if (error == nil) {
                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                    let image = UIImage(data: data!)
                    //self.image = image
                    imageCache[self.postimage!] = image
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