//
//  TileViewCell.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/18/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class TileViewCell: UITableViewCell {

    @IBOutlet var img1: UIImageView!
    
    @IBOutlet var lbl1: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
