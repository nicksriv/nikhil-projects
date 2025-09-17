//
//  LifeStyle.swift
//  Holbe
//
//  Created by Appsriv Technologies on 29/04/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import Foundation

class LifeStyle

{
    var lifestyle_mapping_id:String!
    var lifestyle_name:String!
    var time:String!
    var repitition:String!
    var when:String!
    var compliance:Int!
    var timings_id: String!
    var state: Int!
    init()
    {
        lifestyle_mapping_id = String()
        lifestyle_name = String()
        time = String()
        repitition = String()
        when = String()
        compliance = Int()
        state = 0
    }
    
}
