//
//  partialSubcell.swift
//  Holbe
//
//  Created by Appsriv Technologies on 28/07/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import Foundation


class partialSubcell: UITableViewCell


{
    
    
    @IBOutlet weak var setNumberDisplayLabel: UILabel!
    @IBOutlet weak var textField1: UITextField!
    @IBOutlet weak var textField2: UITextField!
    
    override func awakeFromNib()
    
    
    {
        
        super.awakeFromNib()
        var bottomLine = CALayer()
        bottomLine.frame = CGRectMake(0.0, textField1.frame.height - 1, textField1.frame.width, 1.0)
        bottomLine.backgroundColor = UIColor.lightGrayColor().CGColor
        textField1.borderStyle = UITextBorderStyle.None
        textField1.layer.addSublayer(bottomLine)
        
        
        var bottomLine1 = CALayer()
        bottomLine1.frame = CGRectMake(0.0, textField2.frame.height - 1, textField2.frame.width, 1.0)
        bottomLine1.backgroundColor = UIColor.lightGrayColor().CGColor
        textField2.borderStyle = UITextBorderStyle.None
        textField2.layer.addSublayer(bottomLine1)
    }
    
    
    
}