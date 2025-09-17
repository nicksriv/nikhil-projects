//
//  ProgressTableViewCell.swift
//  Holbe
//
//  Created by Nikhil Srivastava on 8/1/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

class ProgressTableViewCell: UITableViewCell {

    @IBOutlet var dotVw: UIView!
    @IBOutlet var toplbl: UIButton!
    
   
    
    @IBOutlet var secondlbl: UILabel!
    @IBOutlet var dotButton: UIButton!
    
    @IBOutlet var txtlbl: UILabel!
    @IBOutlet var counterVW: counterView!
    var color: UIColor!
    override func awakeFromNib() {
        
        super.awakeFromNib()
       
//        if color != nil{
//            self.counterVW.counterfillColor = color
//            self.dotVw.backgroundColor = color
//            
//        }
        
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
