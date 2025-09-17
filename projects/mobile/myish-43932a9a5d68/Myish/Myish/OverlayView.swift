//
//  OverlayView.swift
//  Myish
//
//  Created by Nikhil Srivastava on 9/15/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import Foundation
import UIKit
import pop

//enum GGOverlayViewMode {
//    case GGOverlayViewModeLeft
//    case GGOverlayViewModeRight
//}

public enum OverlayMode{
    case None
    case Left
    case Right
}

public class OverlayView: UIView{
    //var _mode: GGOverlayViewMode! = GGOverlayViewMode.GGOverlayViewModeLeft
    //var imageView: UIImageView!
    public var overlayState:OverlayMode = OverlayMode.None
    
    required public init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)!
    }
    
//    override init(frame: CGRect) {
//        super.init(frame: frame)
//        self.backgroundColor = UIColor.whiteColor()
//        imageView = UIImageView(image: UIImage(named: "noOverlayImage"))
//        self.addSubview(imageView)
//    }
//    
//    func setMode(mode: GGOverlayViewMode) -> Void {
//        if _mode == mode {
//            return
//        }
//        _mode = mode
//        
//        if _mode == GGOverlayViewMode.GGOverlayViewModeLeft {
//            imageView.image = UIImage(named: "noOverlayImage")
//        } else {
//            imageView.image = UIImage(named: "yesOverlayImage")
//        }
//    }
//    
//    override public func layoutSubviews() {
//        super.layoutSubviews()
//        imageView.frame = CGRectMake(50, 50, 100, 100)
//    }
}