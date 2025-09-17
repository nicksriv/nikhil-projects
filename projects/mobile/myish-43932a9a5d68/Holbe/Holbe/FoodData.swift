//
//  FoodData.swift
//  Holbe
//
//  Created by Appsriv Technologies on 29/04/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import Foundation

class FoodData
{
    var food_mapping_id:String!
    var food_name:String!
    var when:String!
    var compliance:Int!
    var timings_id: String!
    var state: Int!
    init()
    
    {
        
        food_mapping_id = String()
        food_name = String()
        when = String()
        compliance = Int()
        timings_id = String()
        state = 0
    }
}