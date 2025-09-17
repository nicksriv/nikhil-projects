//
//  CustomCellSettings.swift
//  Holbe
//
//  Created by Appsriv Technologies on 04/05/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

class CustomCellSettings: UITableViewCell,UITextFieldDelegate


{
    
   var keyboardFlag = false
    var len:CGFloat = 0
    
    @IBOutlet weak var CellHeading: UILabel!
    
    @IBOutlet weak var EditableTextfield: UITextField!
    
    override func awakeFromNib() {
         super.awakeFromNib()
    }
}
