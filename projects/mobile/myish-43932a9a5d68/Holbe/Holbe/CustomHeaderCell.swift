//
//  CustomHeaderCell.swift
//  Holbe
////
//  Created by Appsriv Technologies on 14/04/16.
//  Copyright (c) 2016 Appsriv Technologies. All rights reserved.
//

import UIKit

class CustomHeaderCell: UITableViewCell {
 
    @IBOutlet weak var OverallPercentageLabel: UILabel!

    @IBOutlet var checkBox: UIButton!
    @IBOutlet weak var SectionheaderImage: UIImageView!
    @IBOutlet weak var SectionheaderHeading: UILabel!
    var check: Bool!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        check = false
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    @IBAction func checkBoxClicked(sender: UIButton) {
        if check == false{
            check = true
        }
        else{
            check = false
        }
    }

}
