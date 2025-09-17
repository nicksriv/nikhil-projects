//
//  ProfileApi.swift
//  Myish
//
//  Created by Nikhil Srivastava on 10/30/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class ProfileApi{
    
    var profile: ProfileData!
    var index: Int!
    
    init(){
        //self.profile = ProfileData()
        self.index = 0
    }
    
    func loadProfile(profileUrl: String, completion: ((ProfileData) -> Void)!) {
        
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
                print(profileDictionary.count)
                
               // for pro in profileDictionary{
                    
                    let pro = ProfileData(data: profileDictionary as NSDictionary )
                    
                    print(pro.title!)
                    
                    //print("object added \(self.profile)")
                  //  if pro.imageURL != ""{
                        //print("search added \(self.profile)")
                        //print("image added \(pro.imageURL!)")
                        self.profile = pro as ProfileData
                   // }
                    
               // }
                
                let priority = DISPATCH_QUEUE_PRIORITY_DEFAULT
                dispatch_async(dispatch_get_global_queue(priority, 0)) {
                    dispatch_async(dispatch_get_main_queue()) {
                        
                        completion(self.profile)
                    }
                }
                }
                
            }
        }
        
        task.resume()
        
    }
    
}