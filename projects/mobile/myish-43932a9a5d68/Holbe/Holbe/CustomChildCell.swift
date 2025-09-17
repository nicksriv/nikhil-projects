//
//  CustomChildCell.swift
//  Holbe
//
//  Created by Appsriv Technologies on 14/04/16.
//  Copyright (c) 2016 Appsriv Technologies. All rights reserved.
//

import UIKit

class CustomChildCell: UITableViewCell
{
    @IBOutlet weak var CounterView: counterView!
    @IBOutlet weak var BarimageView: UIView!
    
    @IBOutlet weak var DesignLabel: UILabel!
    @IBOutlet weak var TabletLabel: UILabel!
    @IBOutlet weak var TimeLabe: UILabel!
    @IBOutlet weak var weightLabel: UILabel!
    
    @IBOutlet weak var CounterviewdisplayLabel: UILabel!
    
    var timerCount = 7
    var timerRunning = false
    var timer = NSTimer()
    

    override func awakeFromNib()
    {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool)
    {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
//
    func Counting(){
        
        if timerCount == 0
        {
            timerCount = 6 // or self.timer.invalidate() in case you want to  stop it
        }
        else
        {
          //  timerCount++;
          //  CounterviewdisplayLabel = "\(timerCount)"
        
        }
    }
    


}
