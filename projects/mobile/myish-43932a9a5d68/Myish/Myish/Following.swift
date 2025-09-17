//
//  Following.swift
//  Myish
//
//  Created by Nikhil Srivastava on 11/3/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class Following{
    var followingnames: [String]!
    //var followerimages: [UIImage]!
    var followingimageUrls: [String]!
    var followingID: [String]!
    
    init(data: Array<NSDictionary>){
        
        self.followingnames = [String]()
        self.followingID = [String]()
        self.followingimageUrls = [String]()
        
        var ind = 0
        for ind=0; ind<data.count; ++ind{
            
            if (data[ind]["followingusername"] != nil && data[ind]["followingid"] != nil && data[ind]["followingprofilepictureURL"] != nil){
            
            self.followingnames.append(data[ind]["followingusername"]as! String)
            self.followingID.append(data[ind]["followingid"]as! String)
            self.followingimageUrls.append(data[ind]["followingprofilepictureURL"]as! String)
            }
            
        }
    }
}