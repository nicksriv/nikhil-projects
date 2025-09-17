//
//  CommentApi.swift
//  Myish
//
//  Created by Nikhil Srivastava on 11/22/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class CommentApi{

var comments: Comments
var index: Int!

init(){
    self.comments = Comments()
    self.index = 0
}

func loadComments(commentUrl: String, completion: ((Comments) -> Void)!) {
    
    let urlString = commentUrl
    self.comments = Comments()
    print("NSURLSession: \(urlString)")
    let session = NSURLSession.sharedSession()
    let commentUrl = NSURL(string: urlString)
    
    let task = session.dataTaskWithURL(commentUrl!){
        
        (data, response, error) -> Void in
        
        if error != nil {
            
            print(error!.description)
            print(error!.localizedDescription)
        } else {
            
            print("Begin Serialization: ")
            print(data!.length)
            
            
            let commentDataArray = try! NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.MutableContainers) as! Array<NSDictionary>
            
            let commentDictionary = commentDataArray[0] as NSDictionary

               self.comments = Comments(data:commentDictionary as NSDictionary )

        }

            let priority = DISPATCH_QUEUE_PRIORITY_DEFAULT
            dispatch_async(dispatch_get_global_queue(priority, 0)) {
                dispatch_async(dispatch_get_main_queue()) {
                    
                    completion(self.comments)
                }

        }
    }
    
    task.resume()
    
}

}