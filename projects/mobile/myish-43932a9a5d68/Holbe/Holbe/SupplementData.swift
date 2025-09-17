//
//  SupplementData.swift
//  Holbe
//
//  Created by Appsriv Technologies on 29/04/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import Foundation

class SupplementData

{
    var supplement_mapping_id:String!
    var supplement_name:String!
    var amount:String!
    var repitition:String!
    var when_time:String!
    var compliance:Int!
    var timings_id: String!
    var state: Int!
    var dosage: String!
    
    init()
    
    {
        supplement_mapping_id = String()
        supplement_name = String()
        amount = String()
        repitition = String()
        when_time = String()
        compliance = Int()
        timings_id = String()
        state = 0
    }
}
