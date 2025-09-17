//
//  Customchildcelldata.swift
//  Holbe
//
//  Created by Appsriv Technologies on 21/04/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import Foundation

class WorkOutdata

{
    var workout_name:String!
    var reps:String!
    var sets:String!
    var weight:String!
    var complainces:Int!
    var workout_mapping_id:String!
    var timings_id: String!
    var state: Int!
    
//    var workoutCount:String!
//    var supplement_count:String!
//    var lifestyle_count:String!
//    var food_count:String!
//    var others_count:String!
    
    
    init()
    
    {
        workout_name = String()
        reps = String()
        sets = String()
        weight = String()
        workout_mapping_id = String()
        complainces = Int()
        timings_id = String()
        state = 0
//        workoutCount = String()
//        supplement_count = String()
//        lifestyle_count = String()
//        food_count = String()
//        others_count = String()
        
    }
}