//
//  scrollViewSlider.swift
//  jsonParseArre
//
//  Created by Dignitas Digital on 7/27/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import UIKit

class ScrollViewContainer: UIView {
    
    @IBOutlet var scrollView: UIScrollView!
    
    override func hitTest(point: CGPoint, withEvent event: UIEvent!) -> UIView? {
        
        let view = super.hitTest(point, withEvent: event)
        if let theView = view {
            if theView == self {
                return scrollView
            }
        }
        
        return view
    }
    
}
   