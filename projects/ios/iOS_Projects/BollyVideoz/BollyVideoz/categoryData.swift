//
//  TestData.swift
//  jsonParseArre
//
//  Created by Dignitas Digital on 6/23/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import Foundation

class CategoryData {
    
    var title : String?
    
    var url : String?
    
    var movie : String?
    
    //   var name : String?
    
    var videoLink : String?
    
    var release : String?
    
    var desc : String?
    
    var genre : String?
    
    var cast : String?
    
    var movieId : String?
    
    var director : String?
    
    init(data : NSDictionary){
        
        //        self.name = getStringFromJSON(data, key:  "name")
        
        
        self.title = getStringFromJSON(data, key:  "post_title")
        
        self.movie = getStringFromJSON(data, key: "movie")
        
        self.url = getStringFromJSON(data,key: "guid")
        
        self.videoLink = getStringFromJSON(data, key: "video_code")
        
        self.release = getStringFromJSON(data, key: "release_date")
        
        self.desc = getStringFromJSON(data, key: "description")
        
        self.genre = getStringFromJSON(data, key: "genres")
        
        self.cast = getStringFromJSON(data, key: "cast")
        
        self.movieId = getStringFromJSON(data, key: "ID")
        
        self.director = getStringFromJSON(data, key: "director")
        
        
    }
    
    func getStringFromJSON(data: NSDictionary, key: String) -> String{
        
        
        
        let info : AnyObject? = data[key]
        
        if let info = data[key] as? String {
            //   println(key)
            //   println(info)
            //  println("test")
            return info
        }
        return ""
    }
    
}