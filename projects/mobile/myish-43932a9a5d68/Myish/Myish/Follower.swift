//
//  Follower.swift
//  Myish
//
//  Created by Nikhil Srivastava on 11/3/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class Follower{
    
    var followernames: [String]!
    //var followerimages: [UIImage]!
    var followerimageUrls: [String]!
    var followerID: [String]!
    
    
    init(data: Array<NSDictionary>){
        self.followernames = [String]()
        self.followerID = [String]()
        self.followerimageUrls = [String]()
        
        var ind = 0
        for ind=0; ind<data.count; ++ind{
            
            if (data[ind]["followerusername"] != nil && data[ind]["followerid"] != nil && data[ind]["followerprofilepictureURL"] != nil){
            
            self.followernames.append(data[ind]["followerusername"]as! String)
            self.followerID.append(data[ind]["followerid"]as! String)
            self.followerimageUrls.append(data[ind]["followerprofilepictureURL"]as! String)
            }
            
        }
    }
    
}