//
//  PatialViewController.swift
//  Holbe
//
//  Created by Appsriv Technologies on 28/07/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

 var len: CGFloat!

class PatialViewController: UIViewController,UITableViewDelegate,UITableViewDataSource,UITextFieldDelegate


{
    
    @IBOutlet var cancel: UIButton!
    @IBOutlet var submit: UIButton!
    @IBOutlet var navVW: UIView!
    @IBOutlet weak var tableView: UITableView!
    var arr: CustomcomingupDataWorkOut!
    var setsreps:[NSDictionary]!
    var timings_id: [String]! = [String]()
    let str = ["1","2","3","4","5","6","7","8","9","10"]
    var firstBox: [[String]]!
    var secondBox: [[String]]!
    var flag: Bool!
    var clickable: Bool!
    var reps:String = ""
    var tempo:String = ""
    var section:Int!
    
    override func viewDidLoad()
    {
        super.viewDidLoad()
        tableView.delegate = self
        tableView.dataSource = self
        setsreps = [NSDictionary]()
       // self.timings_id = arr.timings_id
         self.navigationController?.navigationBar.hidden = true
        self.navigationController?.prefersStatusBarHidden()
        
        self.navVW.backgroundColor = UIColor(red: 71, green: 203, blue: 189)
        func preferredStatusBarStyle() -> UIStatusBarStyle
        {
            return .LightContent
        }
        len = 0.0
        NSNotificationCenter.defaultCenter().addObserver(self, selector: #selector(PatialViewController.keyboardWillShow(_:)), name:UIKeyboardWillShowNotification, object: nil)
        NSNotificationCenter.defaultCenter().addObserver(self, selector: #selector(PatialViewController.keyboardWillHide(_:)), name:UIKeyboardWillHideNotification, object: nil)
        firstBox = Array<Array<String>>()
        secondBox = Array<Array<String>>()
       
        for var i=0; i<arr.workout_name.count; i=i+1{
            var str = Array<String>()
            var str1 = Array<String>()
            for var j=0; j<Int(arr.sets[i]); j=j+1{
                
             
                str.append(arr.reps[i])
                str1.append(arr.weight[i])
             }
            //firstBox[i] = [String]()
            //secondBox[i] = [String]()
           // firstBox.append(Array(count: Int(arr.reps[i])!, repeatedValue:String()))
           //  secondBox.append(Array(count: Int(arr.weight[i])!, repeatedValue:String()))
            //arr.reps[indexPath.section]
            //firstTxtBox.placeholder = "\(arr.reps[i])"
            firstBox.append(str)
            secondBox.append(str1)
        }
        
        flag = true
        
        if segueboolean == false
        {
            self.submit.hidden = true
            self.cancel.hidden = true
        }
    }
    
    override func viewWillAppear(animated: Bool)
    {
        screen = false
        self.navigationController?.navigationBar.hidden = true
        self.navigationController?.navigationBar.tintColor = UIColor.lightGrayColor()
        self.navigationController?.navigationItem.title = "Partial Completion"
        self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName :UIColor.lightGrayColor()]
        self.navigationController?.navigationItem.setHidesBackButton(true, animated: false)
        submit.layer.cornerRadius = 20
        submit.clipsToBounds = true
        submit.backgroundColor = UIColor(red: 71, green: 203, blue: 189)
        cancel.layer.cornerRadius = 20
        cancel.clipsToBounds = true
        cancel.backgroundColor = UIColor.darkGrayColor()
        submit.titleLabel?.textColor = UIColor.whiteColor()
        cancel.titleLabel?.textColor = UIColor.whiteColor()
        
        
        
    }
    
    func keyboardWillShow(sender: NSNotification) {
        
        //if keyboardFlag == false{
        if flag == true{
        let info = sender.userInfo!
        let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()
        var frame = self.view.frame
        frame.size.height -= keyboardFrame.height
        self.view.frame = frame
            flag = false
        }
    }
    
    func keyboardWillHide(sender: NSNotification) {
        if flag == false{
            var frame = self.view.frame
            let info = sender.userInfo!
            let keyboardFrame: CGRect = (info[UIKeyboardFrameEndUserInfoKey] as! NSValue).CGRectValue()
            frame.size.height += keyboardFrame.height
            self.view.frame = frame
            flag = true
        }
        
    }
    

    
    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return arr.workout_name.count
    }
    
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return Int(arr.sets[section])!
    }
    
    func tableView(tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let  headerCell = tableView.dequeueReusableCellWithIdentifier("partialcell") as! PartialcustomCell
        headerCell.tempoLabel.text = arr.tempo
        headerCell.workoutNameDisplayLabel.text = arr.workout_name[section]
        headerCell.workoutNameDisplayLabel.textColor = UIColor(red: 71, green: 203, blue: 189)
        headerCell.workoutNameDisplayLabel.font = UIFont.boldSystemFontOfSize(20.0)
        headerCell.setsDisplayLAbel.text = "\(arr.sets[section]) Sets of \(arr.reps[section])"
        self.timings_id.append(arr.timings_id[section])
        return headerCell
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("partialsetcell", forIndexPath: indexPath) as! HeaderViewCell
        cell.selectionStyle = UITableViewCellSelectionStyle.None
       // let lt = firstBox[indexPath.section][indexPath.row] as NSDictionary
       // cell.firstTxtBox.text = ""
        //cell.firstTxtBox.placeholder = "\(arr.reps[indexPath.section])"
        
        cell.editIcon.tag = indexPath.row
        section = indexPath.section
        cell.firstTxtBox.tag = indexPath.row
        
        let lt = firstBox [indexPath.section][indexPath.row] as String
        cell.firstTxtBox.text = lt
        //cell.firstTxtBox.placeholder = lt
        cell.firstTxtBox.addTarget(self, action: #selector(PatialViewController.textChange(_:)), forControlEvents: UIControlEvents.EditingChanged)
        let lt1 = secondBox [indexPath.section][indexPath.row] as String
        cell.secondTxtBox.text = lt1
        //cell.secondTxtBox.placeholder = lt1
        cell.secondTxtBox.addTarget(self, action: #selector(PatialViewController.textChanged(_:)), forControlEvents: UIControlEvents.EditingChanged)
        if arr.hasWeight[indexPath.section] != "1"{
        cell.cross.hidden = true
        cell.secondTxtBox.hidden = true
        cell.lbs.hidden = true
        }
        else{
            cell.cross.hidden = false
           // cell.secondTxtBox.placeholder = lt1
            cell.secondTxtBox.text = secondBox[indexPath.section][indexPath.row]
            cell.secondTxtBox.hidden = false
            cell.lbs.hidden = false
        }
        cell.Sets.text = "Sets \(indexPath.row + 1)"
        //cell.tableView.tag = indexPath.row
        //cell.tableView.reloadData()
        
        
        cell.editIcon.addTarget(self, action: #selector(editIconClicked), forControlEvents: .TouchUpInside)
        if segueboolean == false
        {
            cell.editIcon.hidden = true
            cell.firstTxtBox.userInteractionEnabled = false
            cell.secondTxtBox.userInteractionEnabled =  false
        }
        
        
        
        
        
        return cell
    }
    
    func editIconClicked(sender: UIButton)
    {
        let indexPath: NSIndexPath = NSIndexPath(forRow: sender.tag, inSection: section)
       
        let cell = tableView.cellForRowAtIndexPath(indexPath) as! HeaderViewCell
        
        cell.firstTxtBox.becomeFirstResponder()
        
    }
    
    func textChange(textField: UITextField){
        
        let cellIndexPath = tableView.indexPathForCell(textField.superview!.superview! as! UITableViewCell)!
        let cell = tableView.cellForRowAtIndexPath(cellIndexPath) as! HeaderViewCell
        cell.firstTxtBox.text = textField.text!
        let lt = NSDictionary(dictionary: [cellIndexPath : textField.text!])
        firstBox[cellIndexPath.section][cellIndexPath.row] = textField.text!
        
    }
    
    func textChanged(textField: UITextField){
        
        let cellIndexPath = tableView.indexPathForCell(textField.superview!.superview! as! UITableViewCell)!
        let cell = tableView.cellForRowAtIndexPath(cellIndexPath) as! HeaderViewCell
        cell.secondTxtBox.text = textField.text!
        let lt = NSDictionary(dictionary: [cellIndexPath : textField.text!])
        secondBox[cellIndexPath.section][cellIndexPath.row] = textField.text!
    }
    

    func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
     return 50
    }
    
    func tableView(tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 150
    }
    
    @IBAction func submitClicked(sender: UIButton) {
   
        var dict: [Dictionary<String, String>] = [Dictionary<String, String>]()
        var indexPath: NSIndexPath!
  
        var flag = true
      
        var jsonArr: Dictionary<String, String>
      
        for var i=0; i<arr.workout_name.count; i=i+1{
            
            jsonArr = Dictionary<String, String>()
            
           jsonArr["timings_id"] = self.timings_id[i]
            
            for var j=0; j<Int(arr.reps[i])!; j=j+1{
                
                if self.tableView.numberOfRowsInSection(i) > j{
                indexPath = NSIndexPath(forRow: j, inSection: i)
                let cell = self.tableView.cellForRowAtIndexPath(indexPath) as? HeaderViewCell
                
               if arr.hasWeight[i] == "1" && firstBox[i][j] != "" && secondBox[i][j] != ""{
                jsonArr["reps\(j+1)"] = firstBox[i][j]
                jsonArr["weight\(j+1)"] = secondBox[i][j]
                
               }
                else if firstBox[i][j] != ""{
                jsonArr["reps\(j+1)"] = firstBox[i][j]
                }
                
                else{
                    flag = false
                }
                }
            }
            dict.append(jsonArr)
        }
        self.connectToWebAPI(dict)

        self.navigationController?.popViewControllerAnimated(true)
    }
    
    
    func connectToWebAPI(params: [Dictionary<String, String>]){
        
       
            
          //  let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/test/updateworkoutcompliance.php")!)//"http://posttestserver.com/post.php")!)
            //let request = NSMutableURLRequest(URL: NSURL(string: "http://www.holbe.com/api/patient/test/updateworkoutcompliance.php")!)//"http://posttestserver.com/post.php")!)
            let request = NSMutableURLRequest(URL: NSURL(string: baseURL + "patient/test/updateworkoutcompliance.php")!)
            let session = NSURLSession.sharedSession()
            request.HTTPMethod = "POST"
            request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalCacheData
 
            let paramss = ["data": params]

            do{
                request.HTTPBody = try NSJSONSerialization.dataWithJSONObject(paramss, options: NSJSONWritingOptions.init(rawValue: 0))
                request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                request.setValue("application/json", forHTTPHeaderField: "Accept")
                
            }
            catch{
                print("Error writing JSON: ")
            }
            print("Request: \(request)")
            let task = session.dataTaskWithRequest(request, completionHandler: {data, response, error in
                guard data != nil else {
                    print("no data found: \(error)")
                    return
                }
                
                print("Response: \(response!)")
                let strData = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("Body: \(strData!)")

            })
            
            task.resume()
            
            
        
        
    }
    
    
    
    @IBAction func cancelClicked(sender: UIButton) {
    self.navigationController?.navigationBarHidden = false
    self.navigationController?.popViewControllerAnimated(true)
    }
    
    @IBAction func cross(sender: UIButton) {
        self.navigationController?.navigationBarHidden = false
        self.navigationController?.popViewControllerAnimated(true)
    }
    
}
