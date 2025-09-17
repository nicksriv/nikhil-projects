//
//  LoginData.swift
//  Myish
//
//  Created by Nikhil Srivastava on 10/27/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class LoginData{
    
    var userid : String!
    var profilename: String!
    var profileimageURL: String!
    var profileemail: String!
    var gender: String!
    var aboutme: String!
   // var email
    
    init(data : NSDictionary){
        
        self.userid = Utils.getStringFromJSON(data, key: "_id")
        self.profileimageURL = Utils.getStringFromJSON(data, key: "profilepicture")
        self.profilename = Utils.getStringFromJSON(data, key: "username")
        self.gender = Utils.getStringFromJSON(data, key: "gender")
        self.aboutme = Utils.getStringFromJSON(data, key: "aboutme")
        self.profileemail = Utils.getStringFromJSON(data, key: "emailaddress")
//        self.title=Utils.getStringFromJSON(data, key: "title")
//        
//        self.imageURL=Utils.getStringFromJSON(data, key: "iphone_image")
//        
//        //self.create_date=Utils.getStringFromJSON(data, key: "create_date")
//        
//        //self.modify_date=Utils.getStringFromJSON(data, key: "modify_date")
//        
//        self.status=Utils.getStringFromJSON(data, key: "status")
//        
//        self.url=Utils.getStringFromJSON(data,key: "url")
//        
//        //self.remove=Utils.getStringFromJSON(data,key: "remove")
//        
//        self.bookmark = false
//        
//        self.imageCache = [String : UIImage]()
        
        
    }
}