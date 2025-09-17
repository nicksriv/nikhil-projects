//
//  PractitionerChildCell.swift
//  Holbe
//
//  Created by Appsriv Technologies on 16/09/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

class PractitionerChildCell: UITableViewCell {
    
    
    @IBOutlet weak var swipeButton: UIButton!
    @IBOutlet weak var pracImage: UIImageView!
    @IBOutlet weak var pracName: UILabel!
    @IBOutlet weak var pracDetail: UILabel!
    
    
    
    
    
    override func awakeFromNib() {
        
        super.awakeFromNib()
        
    }
    
    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        
        
    }
}