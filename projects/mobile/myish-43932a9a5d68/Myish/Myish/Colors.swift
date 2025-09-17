//
//  Colors.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/7/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class Colors {
    let colorTop = UIColor(red: 24.0/255.0, green: 96.0/255.0, blue: 214.0/255.0, alpha: 1.0).CGColor
    let colorBottom = UIColor(red: 67.0/255.0, green: 171.0/255.0, blue: 241.0/255.0, alpha: 1.0).CGColor
    
    let gl: CAGradientLayer
    
    init() {
        gl = CAGradientLayer()
        gl.colors = [ colorTop, colorBottom]
        gl.locations = [ 0.0, 1.0]
    }
}