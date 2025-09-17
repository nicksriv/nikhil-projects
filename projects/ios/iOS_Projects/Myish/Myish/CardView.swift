//
//  CardView.swift
//  Myish
//
//  Created by Nikhil Srivastava on 9/15/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

let defaultBottomOffset:CGFloat = 0
let defaultTopOffset:CGFloat = 70
let defaultHorizontalOffset:CGFloat = 10
let defaultHeightRatio:CGFloat = 1.0
let backgroundCardHorizontalMarginMultiplier:CGFloat = 0.25
let backgroundCardScalePercent:CGFloat = 1.5

class CardView: KolodaView {
    
    override func frameForCardAtIndex(index: UInt) -> CGRect {
        if index == 0 {
            let bottomOffset:CGFloat = defaultBottomOffset
            let topOffset:CGFloat = defaultTopOffset
            let xOffset:CGFloat = defaultHorizontalOffset
            let width = CGRectGetWidth(self.frame ) - 2 * defaultHorizontalOffset
            let height = width * defaultHeightRatio
            let yOffset:CGFloat = topOffset
            let frame = CGRect(x: xOffset, y: yOffset, width: width, height: height)
            
            return frame
        } else if index == 1 {
            let horizontalMargin = -self.bounds.width * backgroundCardHorizontalMarginMultiplier
            let width = self.bounds.width * backgroundCardScalePercent
            let height = width * defaultHeightRatio
            return CGRect(x: horizontalMargin, y: 0, width: width, height: height)
        }
        return CGRectZero
    }
    
}
