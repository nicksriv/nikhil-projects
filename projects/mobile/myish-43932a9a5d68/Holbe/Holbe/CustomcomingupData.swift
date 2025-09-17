//
//  CustomcomingupData.swift
//  Holbe
//
//  Created by Appsriv Technologies on 25/07/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import Foundation


class CustomcomingupDataWorkOut
    
{
    var circuit_id:String!
    var reps:[String]!
    var sets:[String]!
    var workout_name:[String]!
    var type:[String]!
    var timings_id:[String]!
    var time:String!
    var hasWeight: [String]!
    var compliance: String!
    var weight:[String]!
    var tempo:String!
    
    init()
    {
        circuit_id = String()
        reps = [String]()
        sets = [String]()
        workout_name = [String]()
        type = [String]()
        timings_id = [String]()
        time = String()
        hasWeight = [String]()
        weight = [String]()
        tempo = String()
    }
    
    
}