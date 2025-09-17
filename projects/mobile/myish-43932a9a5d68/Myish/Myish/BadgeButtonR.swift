//
//  BadgeButton.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/19/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class BadgeButtonR: UIButton {
    
    
    private var badgeLabel: UILabel
    var badgeString: String? {
        didSet {
            setupBadgeViewWithString(badgeText: badgeString)
        }
    }
    
    var badgeEdgeInsets: UIEdgeInsets? {
        didSet {
            setupBadgeViewWithString(badgeText: badgeString)
        }
    }
    
    var badgeBackgroundColor = UIColor(red: 24.0/255.0, green: 96.0/255.0, blue: 214.0/255.0, alpha: 1.0) {
        didSet {
            badgeLabel.backgroundColor = badgeBackgroundColor
        }
    }
    
    var badgeTextColor = UIColor.whiteColor() {
        didSet {
            badgeLabel.textColor = badgeTextColor
        }
    }
    
    override init(frame: CGRect) {
        badgeLabel = UILabel()
        super.init(frame: frame)
        // Initialization code
        //setupBadgeViewWithString(badgeText: "")
    }
    
    required init?(coder aDecoder: NSCoder) {
        badgeLabel = UILabel()
        super.init(coder: aDecoder)
        //etupBadgeViewWithString(badgeText: "")
    }
    
    func initWithFrame(frame frame: CGRect, withBadgeString badgeString: String, withBadgeInsets badgeInsets: UIEdgeInsets) -> AnyObject {
        
        badgeLabel = UILabel()
        badgeEdgeInsets = badgeInsets
        setupBadgeViewWithString(badgeText: badgeString)
        return self
    }
    
    private func setupBadgeViewWithString(badgeText badgeText: String?) {
        badgeLabel.clipsToBounds = true
        badgeLabel.text = badgeText
        badgeLabel.font = UIFont.systemFontOfSize(12)
        badgeLabel.textAlignment = .Center
        badgeLabel.sizeToFit()
        let badgeSize = badgeLabel.frame.size
        
        let height = max(20, Double(badgeSize.height) + 5.0)
        let width = max(height, Double(badgeSize.width) + 10.0)
        
        var vertical: Double?, horizontal: Double?
        if let badgeInset = self.badgeEdgeInsets {
            vertical = Double(badgeInset.top) - Double(badgeInset.bottom)
            horizontal = Double(badgeInset.left) - Double(badgeInset.right)
            
            let x = -(Double(badgeSize.width) / 2) - 10 + horizontal!
            let y = -(Double(badgeSize.height) / 2) - 10 + vertical!
            badgeLabel.frame = CGRect(x: x, y: y, width: width, height: height)
        } else {
            let x = CGFloat(-(width / 2.0))
            let y = CGFloat(-(height / 2.0))
            badgeLabel.frame = CGRectMake(x, y, CGFloat(width), CGFloat(height))
        }
        
        setupBadgeStyle()
        addSubview(badgeLabel)
        
        badgeLabel.hidden = badgeText != nil ? false : true
    }
    
    private func setupBadgeStyle() {
        badgeLabel.textAlignment = .Center
        badgeLabel.backgroundColor = badgeBackgroundColor
        badgeLabel.textColor = badgeTextColor
        badgeLabel.layer.cornerRadius = badgeLabel.bounds.size.height / 2
    }
}