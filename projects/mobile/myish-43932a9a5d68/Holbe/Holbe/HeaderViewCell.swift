//
//  HeaderViewCell.swift
//  Holbe
//
//  Created by Nikhil Srivastava on 7/30/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

class HeaderViewCell: UITableViewCell, UITextFieldDelegate {
//UIPickerViewDelegate, UIPickerViewDataSource,
    @IBOutlet var firstTxtBox: UITextField!
    
    @IBOutlet var secondTxtBox: UITextField!
    
    @IBOutlet var cross: UIImageView!
    
    @IBOutlet var lbs: UILabel!
    
    var pickerVW: UIPickerView!
    
    var firstvalue: String!
    
    var secondvalue: String!
    
    @IBOutlet weak var editIcon: UIButton!
   
    @IBOutlet var Sets: UILabel!
    let str = ["1","2","3","4","5","6","7","8","9","10"]
    
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
       // pickerVW = UIPickerView()
        //pickerVW.delegate = self
        //pickerVW.dataSource = self
        //self.firstTxtBox.inputView = pickerVW
       // self.secondTxtBox.delegate = self
       // self.firstTxtBox.delegate = self
        self.firstTxtBox.tag = 1
        self.secondTxtBox.tag = 2
//        if segueboolean == false
//        {
//            self.editIcon.hidden = true
//            self.firstTxtBox.userInteractionEnabled = false
//            self.secondTxtBox.userInteractionEnabled =  false
//        }
//        
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
    func numberOfComponentsInPickerView(pickerView: UIPickerView) -> Int {
        return 1
    }
    
//    func pickerView(pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
//        return 10
//    }
    
    
    
//    func pickerView(pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
//        
//        return str[row]
//    }
//    
//    func pickerView(pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
//        self.firstTxtBox.text = str[row]
//        pickerVW.hidden = true
//        
//        pickerVW.removeFromSuperview()
//    }
    
    

//    func textFieldShouldBeginEditing(textField: UITextField) -> Bool {
//        //pickerVW.hidden = false
//        return true
//    }
//    
//    func textFieldDidBeginEditing(textField: UITextField) {
//        len =  textField.frame.origin.y + textField.frame.size.height
//    }
//    
//    func textFieldShouldReturn(textField: UITextField) -> Bool {
//        textField.endEditing(true)
//        return true
//    }
//    
//    func textFieldDidEndEditing(textField: UITextField) {
//       // pickerVW.hidden = true
//        if textField.tag == 1{
//            firstvalue = self.firstTxtBox.text
//        }
//        else{
//            secondvalue = self.secondTxtBox.text
//        }
//    }
    
    

}
