//
//  Extensions.swift
//  Holbe
//
//  Created by Nikhil Srivastava on 4/11/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import Foundation
import UIKit


extension UIView {
    
    @IBInspectable var borderColor : UIColor? {
        set (newValue) {
            self.layer.borderColor = (newValue ?? UIColor.clearColor()).CGColor
        }
        get {
            return UIColor(CGColor: self.layer.borderColor ?? UIColor.clearColor().CGColor)
        }
    }
}

extension CALayer {
    
    func addBorder(edge: UIRectEdge, color: UIColor, thickness: CGFloat) {
        
        let border = CALayer()
        
        switch edge {
        case UIRectEdge.Top:
            border.frame = CGRectMake(0, 0, CGRectGetWidth(self.frame), thickness)
            break
        case UIRectEdge.Bottom:
            border.frame = CGRectMake(0, CGRectGetHeight(self.frame) - thickness, CGRectGetWidth(self.frame), thickness)
            break
        case UIRectEdge.Left:
            border.frame = CGRectMake(0, 0, thickness, CGRectGetHeight(self.frame))
            break
        case UIRectEdge.Right:
            border.frame = CGRectMake(CGRectGetWidth(self.frame) - thickness, 0, thickness, CGRectGetHeight(self.frame))
            break
        default:
            break
        }
        
        border.backgroundColor = color.CGColor;
        
        self.addSublayer(border)
    }
}