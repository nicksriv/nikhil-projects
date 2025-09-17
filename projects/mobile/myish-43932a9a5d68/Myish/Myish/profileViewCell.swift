//
//  profileViewCell.swift
//  Myish
//
//  Created by Nikhil Srivastava on 9/25/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class profileViewCell: UITableViewCell {

    @IBOutlet weak var profileImage: UIButton!
    @IBOutlet weak var profileFollowing: UIButton!
    @IBOutlet weak var profileName: UILabel!
    
    @IBOutlet var following: UIButton!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
       
}
