//
//  FollowViewCell.swift
//  Myish
//
//  Created by Nikhil Srivastava on 12/23/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class FollowViewCell: UITableViewCell {

    @IBOutlet weak var follow: UIButton!
   
    
    @IBOutlet weak var profileImg: UIButton!
    
    @IBOutlet weak var name: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    


}
