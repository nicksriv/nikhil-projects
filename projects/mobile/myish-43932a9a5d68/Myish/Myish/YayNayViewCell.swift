//
//  YayNayViewCell.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/9/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class YayNayViewCell: UITableViewCell {

    @IBOutlet var img1: UIImageView!
    
    @IBOutlet var img2: UIImageView!
    
    @IBOutlet var img3: UIImageView!
    
    @IBOutlet var lbl1: UIButton!
    
    @IBOutlet var lbl2: UIButton!
    
    @IBOutlet var lbl3: UIButton!
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
