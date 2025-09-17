//
//  ProfilecustomCell.swift
//  Holbe
//
//  Created by Appsriv Technologies on 21/04/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

class ProfilecustomCell: UITableViewCell
{


    @IBOutlet weak var profileprogressView: counterView!
    
    @IBOutlet weak var headingLabel: UILabel!

    @IBOutlet weak var PercentagedisplayLabel: UILabel!
    
    @IBOutlet weak var DescriptionLabel: UILabel!
    
    @IBOutlet weak var DescriptionImage: UIImageView!

    @IBOutlet weak var CompletedLabel: UILabel!
    
    @IBOutlet weak var LateLabel: UILabel!
    
    @IBOutlet weak var MIssedLabel: UILabel!
    override func awakeFromNib()
    {
        super.awakeFromNib()
        
    }
    
    override func setSelected(selected: Bool, animated: Bool)
    {
        super.setSelected(selected, animated: animated)
  
    }

}