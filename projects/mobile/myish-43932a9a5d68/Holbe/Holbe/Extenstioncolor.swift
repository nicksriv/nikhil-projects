//
//  Extenstioncolor.swift
//  Holbe
//
//  Created by Appsriv Technologies on 28/04/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import Foundation
import UIKit

extension UIColor {
    convenience init(red: Int, green: Int, blue: Int) {
        let newRed = CGFloat(red)/255
        let newGreen = CGFloat(green)/255
        let newBlue = CGFloat(blue)/255
        
        self.init(red: newRed, green: newGreen, blue: newBlue, alpha: 1.0)
    }
}
