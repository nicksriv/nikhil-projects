//
//  CommentViewCell.swift
//  Myish
//
//  Created by Nikhil Srivastava on 11/22/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class CommentViewCell: UITableViewCell {

    //@IBOutlet var imgView: UIImageView!
    
    @IBOutlet var name: UILabel!
    
    @IBOutlet var comment: UILabel!
    
    @IBOutlet var imgButton: UIButton!
    
    @IBOutlet var timeLabel: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
