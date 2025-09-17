//
//  CustomOverView.swift
//  Myish
//
//  Created by Nikhil Srivastava on 9/15/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import Foundation
import UIKit


private let overlayRightImageName = "yesOverlayImage"
private let overlayLeftImageName = "noOverlayImage"

class CustomOverView: OverlayView {
    
    @IBOutlet lazy var overlayImageView: UIImageView! = {
        [unowned self] in
        
        var imageView = UIImageView(frame: self.superview!.bounds)
        self.addSubview(imageView)
        
        return imageView
        }()
    
    override var overlayState:OverlayMode  {
        didSet {
            switch overlayState {
            case .Left :
                overlayImageView.image = UIImage(named: overlayLeftImageName)
            case .Right :
                overlayImageView.image = UIImage(named: overlayRightImageName)
            default:
                overlayImageView.image = nil
            }
            
        }
    }
    
}
