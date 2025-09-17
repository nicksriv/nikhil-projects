//
//  SinglePostApi.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/10/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation
class SinglePostApi{
    
    var post: Post!
    var index: Int!
    
    init(){
        //self.profile = ProfileData()
        self.index = 0
    }
    
    func loadPost(profileUrl: String, completion: ((Post) -> Void)!) {
        
        let urlString = profileUrl
        
        print("NSURLSession: \(urlString)")
        let session = NSURLSession.sharedSession()
        let profileUrl = NSURL(string: urlString)
        
        let task = session.dataTaskWithURL(profileUrl!){
            
            (data, response, error) -> Void in
            
            if error != nil {
                
                print(error!.description)
                print(error!.localizedDescription)
            } else {
                
                print("Begin Serialization: ")
                print(data!.length)
                
                
                let profileDataArray = try! NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.MutableContainers) as? Array<NSDictionary>
                if profileDataArray?.count > 0{
                let profileDictionary = profileDataArray![0] as NSDictionary
                //print(profileDictionary)
                
                // for pro in profileDictionary{
                
                let pro = Post(data: profileDictionary as NSDictionary )
                
                //print(pro.title!)
                
                //print("object added \(self.profile)")
                //  if pro.imageURL != ""{
                //print("search added \(self.profile)")
                //print("image added \(pro.imageURL!)")
                self.post = pro as Post
                // }
                
                // }
                
                let priority = DISPATCH_QUEUE_PRIORITY_DEFAULT
                dispatch_async(dispatch_get_global_queue(priority, 0)) {
                    dispatch_async(dispatch_get_main_queue()) {
                        
                        completion(self.post)
                    }
                }
                }
                
            }
        }
        
        task.resume()
        
    }
    
}