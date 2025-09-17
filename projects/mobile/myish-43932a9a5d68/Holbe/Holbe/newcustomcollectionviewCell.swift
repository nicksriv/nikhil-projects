//
//  newcustomcollectionviewCell.swift
//  Holbe
//
//  Created by Appsriv Technologies on 25/07/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

class newcustomcollectionviewCell: UICollectionViewCell, UITableViewDelegate, UITableViewDataSource
{

    @IBOutlet weak var completedButton: UIButton!
    
    @IBOutlet weak var partialButton: UIButton!
    
    @IBOutlet var counterview: counterView!
    @IBOutlet var prgVw: ProgressView!
    @IBOutlet weak var progressView: ProgressView!
    @IBOutlet var DateLabel: UILabel!
    
    @IBOutlet var tableView: UITableView!
    @IBOutlet weak var workoutName1: UILabel!
    
    @IBOutlet weak var workoutSubName1: UILabel!
    
    @IBOutlet weak var workoutLabel: UILabel!
    
    @IBOutlet weak var workoutName2: UILabel!
    @IBOutlet weak var workoutSubName2: UILabel!
    
    @IBOutlet weak var workoutName3: UILabel!
    @IBOutlet weak var workoutSubName3: UILabel!
    
    @IBOutlet weak var workoutName4: UILabel!
    @IBOutlet weak var workoutSubName4: UILabel!
    
    @IBOutlet var lineView: UIView!
    
    @IBOutlet weak var timingLabel: UILabel!
    
    @IBOutlet var toplineView: UIView!
    
    @IBOutlet weak var workoutImage: UIImageView!
    
    @IBOutlet weak var workoutView: UIView!
    
    
    @IBOutlet weak var dotView: UIView!
    
    var datasrc: [String]!
    var datasrcv: [String]!
    var colorIndex: Int!
    var color: UIColor!
    var progresslbl: String!
   // var weight:String!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
    }
    
    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)!
    }
    
    override func awakeFromNib()
    {
        super.awakeFromNib()
        //datasrc = NSDictionary()
        self.tableView.delegate = self
        self.tableView.dataSource = self
        //self.tableView.reloadData()
   
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if datasrc != nil{
        return datasrc.count
        }
        else {
        return 0
        }
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("CollCell", forIndexPath: indexPath) as! ProgressTableViewCell
        //var type = cell.viewWithTag(100) as! UILabel
        //var reps = cell.viewWithTag(101) as! UILabel
        
      //  cell.toplbl.text = datasrc[indexPath.row] as String
      //  cell.toplbl.textColor = color
        
        cell.toplbl.setTitle(datasrc[indexPath.row] as String, forState:UIControlState.Normal)
        cell.toplbl.setTitleColor(color, forState: UIControlState.Normal)
        cell.toplbl.tag = self.tableView.tag
        //cell.toplbl.font = UIFont.boldSystemFontOfSize(17.0)
        cell.secondlbl.text = datasrcv[indexPath.row] as String
        
        //let progressvw = cell.viewWithTag(200) as! counterView
        //let indicator = cell.viewWithTag(201)! as UIView
        //var compliance = cell.viewWithTag(300) as! UILabel
      
        //cell.counterVW = counterView(frame: cell.counterVW.frame)
        
        //cell.txtlbl.text = progresslbl+"%"
//        if datasrc.count > 1{
//            cell.counterVW.hidden = true
//            cell.dotButton.hidden = true
//            cell.txtlbl.hidden = true
//        }
//        else{
//            cell.counterVW.hidden = false
//            cell.dotButton.hidden = false
//            cell.txtlbl.hidden = false
//        }
        
        cell.color = color
        //cell.counterVW.counterfillColor = color
        cell.dotVw.backgroundColor = UIColor.whiteColor()
        cell.dotVw.layer.borderColor = UIColor.whiteColor().CGColor
        if datasrc.count>1{
            cell.dotVw.layer.borderWidth = 1
            cell.dotVw.layer.borderColor = color.CGColor

        }
        else{
            cell.dotVw.backgroundColor = color
        }
        
        
//        switch(colorIndex){
//        
//        case 0: cell.color = UIColor(red: 186, green: 214, blue: 93)
//                cell.counterVW.counterfillColor = UIColor(red: 186, green: 214, blue: 93)
//                cell.dotVw.backgroundColor = UIColor(red: 186, green: 214, blue: 93)
//                break
//        case 1: cell.color = UIColor(red: 71, green: 203, blue: 189)
//                cell.counterVW.counterfillColor = UIColor(red: 71, green: 203, blue: 189)
//                cell.dotVw.backgroundColor = UIColor(red: 71, green: 203, blue: 189)
//                break
//        case 2: cell.color = UIColor(red: 18, green: 178, blue: 230)
//                cell.counterVW.counterfillColor = UIColor(red: 18, green: 178, blue: 230)
//                cell.dotVw.backgroundColor = UIColor(red: 18, green: 178, blue: 230)
//                break
//        case 3: cell.color = UIColor(red: 189, green: 128, blue: 195)
//                cell.counterVW.counterfillColor = UIColor(red: 189, green: 128, blue: 195)
//                cell.dotVw.backgroundColor = UIColor(red: 189, green: 128, blue: 195)
//                break
//        case 4: cell.color = UIColor(red: 205, green: 75, blue: 113)
//                cell.counterVW.counterfillColor = UIColor(red: 205, green: 75, blue: 113)
//                cell.dotVw.backgroundColor = UIColor(red: 205, green: 75, blue: 113)
//                break
//        default:cell.color = UIColor(red: 205, green: 75, blue: 113)
//                cell.counterVW.counterfillColor = UIColor(red: 205, green: 75, blue: 113)
//                cell.dotVw.backgroundColor = UIColor(red: 205, green: 75, blue: 113)
//                break
//        
//        }
        
//        let priority = DISPATCH_QUEUE_PRIORITY_DEFAULT
//        dispatch_async(dispatch_get_global_queue(priority, 0)) {
//            // do some task
//            cell.counterVW.animateProgressView(Float(self.progresslbl)!)
//            dispatch_async(dispatch_get_main_queue()) {
//                // update some UI
//                
//            }
//        }
        //cell.counterVW.animateProgressView(Float(self.progresslbl)!)
        
        cell.dotVw.layer.cornerRadius = 5
        cell.dotVw.layer.masksToBounds = true
        //cell.counterVW.createProgressLayer(cell.counterVW.counterfillColor)
        
       
        
        
        return cell
    }
    
    func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        
        if datasrc.count > 1{
            return 70
        }
        else{
            return 70
        }
        
    }
    
    

    
}
