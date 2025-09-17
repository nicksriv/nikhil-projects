//
//  TreatmentViewcontroller.swift
//  Holbe
//
//  Created by Appsriv Technologies on 20/04/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit

// Global array of class Customchildcelldata
var workoutclassTypearray:[WorkOutdata] = [WorkOutdata]()
var SupplementDataTclassTypearray:[SupplementData] = [SupplementData]()
var FoodDataclassTypearray:[FoodData] = [FoodData]()
var LifeStyleclassTypearray:[LifeStyle] = [LifeStyle]()
var OthersclassTypearray:[Others] = [Others]()

class TreatmentViewcontroller: UIViewController,UITableViewDataSource,UITableViewDelegate,MenuTransitionManagerDelegate, UIGestureRecognizerDelegate
{
    
    var section:Int!

    let menuTransitionManager = MenuTransitionManager()
    
    @IBOutlet weak var Complainces: UILabel!
    
    
    @IBOutlet weak var tableview: UITableView!
    
    //supplement Elements
    @IBOutlet weak var SupplementsView: UIView!
    @IBOutlet weak var SupplementsImageView: UIImageView!
    @IBOutlet weak var SupplementsLabel: UILabel!
    
    
    //Workout Elements
    @IBOutlet weak var WorkoutView: UIView!
    @IBOutlet weak var WorkoutLabel: UILabel!
    
    
    //Life style Elements
    @IBOutlet weak var LifeStylelabel: UILabel!
    @IBOutlet var LifeStyleView: UIView!
    
    
    // Food & Drink Elements
    @IBOutlet weak var FoodDronklabel: UILabel!
    @IBOutlet var FoodDrinksView: UIView!
    
    
    
    // Others Elements
    @IBOutlet weak var OthersLabel: UILabel!
    @IBOutlet var OthersView: UIView!
    
    // Array of type TreatmentViewcontroller
    var Treatmentview:[CustomHeadercelldata] = [CustomHeadercelldata]()
    
    //  Array for Section Headers
    var sectionheadings = ["Supplements","Workout","LifeStyle","Food & Drinks","Others"]
    //var  overallPercentage = ["65%","30%","45%","99%","10%"]
    var  SectionImages = ["supplements-30x30","workouts (1)","health","food-&-Drinkss","others"]
    
    
    
    @IBOutlet var TapGestureRecognizer: UITapGestureRecognizer!
    
    var date = NSDate()
    var calendar = NSCalendar.currentCalendar()
    var pickerVisible = false
    // Object of type Workout class
    var workoutclassObject = WorkOutdata()
    
    
    // Object of type Supplement class
    
    var supplementObject = SupplementData()
    
    
    // Object of type FoodData class
    
    var foodObject = FoodData()
    
    // Object of type LifeStyle class
    
    var lifeStyleObject = LifeStyle()
    
    // Object of type Others class
    
    var othersObject = Others()
    
    // workout_compliance
    var workout_compliance:String!
    
    //supplement_compliance
    var supplement_compliance:String!
    
    
    // lifestyle_compliance
    var lifestyle_compliance:String!
    
    // food_compliance
    var food_compliance:String!
    
    //  others_compliance
    var others_compliance:String!
    
    
    
   var  Weekdays = ["Day","Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    
    
   // Variables to display compalinces and count
    
    var Overallcomplainces:String!
    
    var workoutcnt:String!
    var supplementCount:String!
    var lifestylecount:String!
    var foodcount:String!
    var otherscount:String!
    var leftArrow: UIBarButtonItem!
    var rightArrow: UIBarButtonItem!
    
    
    override func viewDidLoad()
    {
      
        super.viewDidLoad()
      
        let limg = UIImage(named: "left-arrow (1)")
        let rimg = UIImage(named: "right-arrow")
        leftArrow = UIBarButtonItem(image: limg, style: UIBarButtonItemStyle.Plain, target: self, action: #selector(CominUpviewcontroller.handleArrow(_:)))
        rightArrow = UIBarButtonItem(image: rimg, style: UIBarButtonItemStyle.Plain, target: self, action: #selector(CominUpviewcontroller.handleArrow(_:)))
        leftArrow.tag = 0
        rightArrow.tag = 1
        self.navigationItem.leftBarButtonItems?.append(leftArrow)
        self.navigationItem.rightBarButtonItems?.append(rightArrow)
        TapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(CominUpviewcontroller.handleTap(_:)))
        TapGestureRecognizer.delegate = self
        self.view.addGestureRecognizer(TapGestureRecognizer)
        date = NSDate()
        calendar = NSCalendar.currentCalendar()
        let components = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: date)
        datePicker.hidden = true
        datePicker.backgroundColor = UIColor.whiteColor()
        datePicker.datePickerMode = UIDatePickerMode.Date
        //datePicker.minimumDate = date
        datePicker.date = date
        datePicker.backgroundColor = UIColor.lightGrayColor()
        datePicker.tintColor = UIColor.whiteColor()
        
        let year =  components.year
        let month = components.month
        let day = components.day
        let weekDay = components.weekday
        self.navigationItem.title = "Today"
        datePicker.addTarget(self, action: #selector(CominUpviewcontroller.datePickerChanged(_:)), forControlEvents: UIControlEvents.ValueChanged)
        
        tableview.delegate = self
        tableview.dataSource = self

        
        //find screen size
        let screenSize: CGRect = UIScreen.mainScreen().bounds
        let screenWidth = screenSize.width
        let screenHeight = screenSize.height
        print(screenWidth)
        print(screenHeight)
        
        //Supplements
        
        SupplementsLabel.textColor = UIColor.whiteColor()
        SupplementsLabel.layer.cornerRadius = 8.5
        SupplementsLabel.clipsToBounds = true
        
        
        
        // WorkOut
        
        WorkoutLabel.textColor = UIColor.whiteColor()
        WorkoutLabel.layer.cornerRadius = 8.5
        WorkoutLabel.clipsToBounds = true
        
        
        //Life style
        
        LifeStylelabel.textColor = UIColor.whiteColor()
        LifeStylelabel.layer.cornerRadius = 8.5
        LifeStylelabel.clipsToBounds = true
        
        // Food & Drinks
        
        FoodDronklabel.textColor = UIColor.whiteColor()
        FoodDronklabel.layer.cornerRadius = 8.5
        FoodDronklabel.clipsToBounds = true
        
        
        //Others
        OthersLabel.textColor = UIColor.whiteColor()
        OthersLabel.layer.cornerRadius = 8.5
        OthersLabel.clipsToBounds = true
        

        // Tap recognizer for UIView
        let SupplementTapped: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(TreatmentViewcontroller.supplementviewtappedTapped(_:)))
        
        SupplementsView.addGestureRecognizer(SupplementTapped)
        SupplementsView.userInteractionEnabled = true
        
        let WorkoutTapped: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(TreatmentViewcontroller.workoutviewtappedTapped(_:)))
        
        WorkoutView.addGestureRecognizer(WorkoutTapped)
        WorkoutView.userInteractionEnabled = true
        
        let LifeStyleTapped: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(TreatmentViewcontroller.lifestyleviewtappedTapped(_:)))
       
        LifeStyleView.addGestureRecognizer(LifeStyleTapped)
        LifeStyleView.userInteractionEnabled = true
        
        let FoodDrinksTapped: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(TreatmentViewcontroller.fooddrinksviewtappedTapped(_:)))
        
        FoodDrinksView.addGestureRecognizer(FoodDrinksTapped)
        FoodDrinksView.userInteractionEnabled = true
        
        let OthersTapped: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(TreatmentViewcontroller.othersviewtappedTapped(_:)))
        
        OthersView.addGestureRecognizer(OthersTapped)
        OthersView.userInteractionEnabled = true
        // API call of getTreatment
        
        print(usrid)
       // treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
       // treatmentPlan("http://www.holbe.com/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
        treatmentPlan(baseURL + "patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")

    
        
    }
    
    override func viewWillAppear(animated: Bool) {
        
        screen = true
        
  
        self.navigationController?.navigationBar.tintColor = UIColor.lightGrayColor()
        self.navigationController?.navigationItem.title = "Your Treatment Plan"
        self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName :UIColor.lightGrayColor()]
        self.navigationController?.navigationItem.setHidesBackButton(true, animated: false)
        
        date = NSDate()
        calendar = NSCalendar.currentCalendar()
        let components = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: date)
        let year =  components.year
        let month = components.month
        let day = components.day
        let weekDay = components.weekday
        self.navigationItem.title = "Today"
        self.navigationController?.navigationBar.tintColor = UIColor.lightGrayColor()
        self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName :UIColor.lightGrayColor()]
        self.navigationController?.navigationItem.setHidesBackButton(true, animated: false)
        //treatmentPlan("http://192.185.26.69/~holbe/api/patient/get_dashboard_new.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
       // treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
       // treatmentPlan("http://www.holbe.com/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
        treatmentPlan(baseURL + "patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")

    }
    
    func handleTap(sender: UITapGestureRecognizer) {
        
        let touchPoint = sender.locationInView(self.view)
        if touchPoint.x<datePicker.frame.origin.x || touchPoint.x>(datePicker.frame.origin.x + datePicker.frame.width){
            datePicker.endEditing(true)
            datePicker.hidden = true
            pickerVisible = false
        }
        if touchPoint.y<datePicker.frame.origin.y || touchPoint.y>(datePicker.frame.origin.y + datePicker.frame.height){
            datePicker.endEditing(true)
            datePicker.hidden = true
            pickerVisible = false
        }
    }
    
    func handleArrow(sender: UIBarButtonItem) {
        
        if sender.tag == 0{
            date = calendar.dateByAddingUnit(
                .Day,
                value: -1,
                toDate: date,
                options: NSCalendarOptions(rawValue: 0))!
            let components = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: date)
            let year =  components.year
            let month = components.month
            let day = components.day
            let weekDay = components.weekday
            self.navigationItem.title = "\(Weekdays[weekDay])-\(year)-\(month)-\(day)"
           // treatmentPlan("http://192.185.26.69/~holbe/api/patient/get_dashboard_new.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
           // treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
          //  treatmentPlan("http://www.holbe.com/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
            treatmentPlan(baseURL + "patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
        }
        else if sender.tag == 1{
            date = calendar.dateByAddingUnit(
                .Day,
                value: 1,
                toDate: date,
                options: NSCalendarOptions(rawValue: 0))!
            let components = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: date)
            let year =  components.year
            let month = components.month
            let day = components.day
            let weekDay = components.weekday
            self.navigationItem.title = "\(Weekdays[weekDay])-\(year)-\(month)-\(day)"
           // treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
            treatmentPlan("http://www.holbe.com/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
            treatmentPlan(baseURL + "patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
           
        }
        
    }
    
    func supplementviewtappedTapped(gestureRecognizer: UITapGestureRecognizer)
    {
        if tableview.numberOfRowsInSection(0) > 0{
        let indexPath = NSIndexPath(forRow: 0, inSection: 0)
        tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
        }
    }
    
    func workoutviewtappedTapped(gestureRecognizer: UITapGestureRecognizer)
    {
        if tableview.numberOfRowsInSection(1) > 0{
        let indexPath = NSIndexPath(forRow: 0, inSection: 1)
        tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
         }
        else{
          let lastrow = tableview.numberOfRowsInSection(0)
            if lastrow > 0{
          let indexPath = NSIndexPath(forRow: (lastrow - 1), inSection: 0)
          tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
            }
        }
    }
    
    func lifestyleviewtappedTapped(gestureRecognizer: UITapGestureRecognizer)
    {
        if tableview.numberOfRowsInSection(2) > 0{
        let indexPath = NSIndexPath(forRow: 0, inSection: 2)
        tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
         }
        else{
            let lastrow = tableview.numberOfRowsInSection(1)
            if lastrow > 0{
            let indexPath = NSIndexPath(forRow: (lastrow - 1), inSection: 1)
            tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
            }
            else{
                let lastrow1 = tableview.numberOfRowsInSection(0)
                if lastrow1 > 0{
                    let indexPath = NSIndexPath(forRow: (lastrow1 - 1), inSection: 0)
                    tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
                }
            }
        }
    }
    
    func fooddrinksviewtappedTapped(gestureRecognizer: UITapGestureRecognizer)
    {
        if tableview.numberOfRowsInSection(3) > 0{
        let indexPath = NSIndexPath(forRow: 0, inSection: 3)
        tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
         }
        else{
            let lastrow = tableview.numberOfRowsInSection(2)
            if lastrow > 0{
            let indexPath = NSIndexPath(forRow: (lastrow - 1), inSection: 2)
            tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
            }
            else{
                let lastrow1 = tableview.numberOfRowsInSection(1)
                if lastrow1 > 0{
                    let indexPath = NSIndexPath(forRow: (lastrow1 - 1), inSection: 1)
                    tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
                }
                else{
                    let lastrow2 = tableview.numberOfRowsInSection(0)
                    if lastrow2 > 0{
                        let indexPath = NSIndexPath(forRow: (lastrow2 - 1), inSection: 0)
                        tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
                    }
                }
            }

        }
    }
    
    func othersviewtappedTapped(gestureRecognizer: UITapGestureRecognizer)
    {
        if tableview.numberOfRowsInSection(4) > 0{
        let indexPath = NSIndexPath(forRow: 0, inSection: 4)
        tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
         }
        else{
            let lastrow = tableview.numberOfRowsInSection(3)
            if lastrow > 0{
            let indexPath = NSIndexPath(forRow: (lastrow - 1), inSection: 3)
            tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
            }
            else{
                let lastrow1 = tableview.numberOfRowsInSection(2)
                if lastrow1 > 0{
                    let indexPath = NSIndexPath(forRow: (lastrow1 - 1), inSection: 2)
                    tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
                }
                else{
                    let lastrow1 = tableview.numberOfRowsInSection(1)
                    if lastrow1 > 0{
                        let indexPath = NSIndexPath(forRow: (lastrow1 - 1), inSection: 1)
                        tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
                    }
                    else{
                        let lastrow1 = tableview.numberOfRowsInSection(0)
                        if lastrow1 > 0{
                            let indexPath = NSIndexPath(forRow: (lastrow1 - 1), inSection: 0)
                            tableview.scrollToRowAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
                        }
                    }
                }
            }

        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 5
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int
    {
        if section == 0
        {
            return SupplementDataTclassTypearray.count
        }
        else if section == 1
        {
            return workoutclassTypearray.count
        }
        else if section == 2
        {
            return LifeStyleclassTypearray.count
        }
        else if section == 3
        {
            return FoodDataclassTypearray.count
        }
        else
        {
            return OthersclassTypearray.count
        }
        
    }
    
    
    // Child Cell
    
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("Cell", forIndexPath: indexPath) as! CustomChildCell
        
        print(indexPath)
        
        if indexPath.section == 0
        {
            cell.DesignLabel.text = SupplementDataTclassTypearray[indexPath.row].supplement_name
            cell.TabletLabel.text = SupplementDataTclassTypearray[indexPath.row].dosage
            cell.TimeLabe.text = SupplementDataTclassTypearray[indexPath.row].when_time
            
            cell.CounterviewdisplayLabel.text = String(SupplementDataTclassTypearray[indexPath.row].compliance) + " %"
            
            cell.CounterView.animateProgressView(Float(SupplementDataTclassTypearray[indexPath.row].compliance))
            cell.BarimageView.backgroundColor = UIColor(red: 171, green: 209, blue: 75)
            cell.CounterView.counterfillColor = UIColor(red: 171, green: 209, blue: 75)
            
            
            
        }
        
        else if indexPath.section == 1
        {
            cell.DesignLabel.text = workoutclassTypearray[indexPath.row].workout_name
            cell.TabletLabel.text = workoutclassTypearray[indexPath.row].reps + " Reps of " + workoutclassTypearray[indexPath.row].sets + " Sets"
            cell.TimeLabe.text = workoutclassTypearray[indexPath.row].weight
            
            cell.CounterviewdisplayLabel.text = String(workoutclassTypearray[indexPath.row].complainces) + " %"
            cell.CounterView.animateProgressView(Float(workoutclassTypearray[indexPath.row].complainces))
             cell.BarimageView.backgroundColor = UIColor(red: 60, green: 195, blue: 175)
            cell.CounterView.counterfillColor = UIColor(red: 60, green: 195, blue: 175)
        }
        
        else if indexPath.section == 2
        {
            cell.DesignLabel.text = LifeStyleclassTypearray[indexPath.row].lifestyle_name
            cell.TabletLabel.text = LifeStyleclassTypearray[indexPath.row].when
            cell.TimeLabe.text = LifeStyleclassTypearray[indexPath.row].time
            
            cell.CounterviewdisplayLabel.text = String(LifeStyleclassTypearray[indexPath.row].compliance) + " %"
             cell.CounterView.animateProgressView(Float(LifeStyleclassTypearray[indexPath.row].compliance))
             cell.BarimageView.backgroundColor = UIColor(red: 26, green: 162, blue: 223)
            cell.CounterView.counterfillColor = UIColor(red: 26, green: 162, blue: 223)
        }
        
        else if indexPath.section == 3
        {
            cell.DesignLabel.text = FoodDataclassTypearray[indexPath.row].food_name
            cell.TabletLabel.text = FoodDataclassTypearray[indexPath.row].when
            cell.TimeLabe.text = FoodDataclassTypearray[indexPath.row].when
            
            cell.CounterviewdisplayLabel.text = String(FoodDataclassTypearray[indexPath.row].compliance) + " %"
             cell.CounterView.animateProgressView(Float(FoodDataclassTypearray[indexPath.row].compliance))
             cell.BarimageView.backgroundColor = UIColor(red: 170, green: 104, blue: 180)
            cell.CounterView.counterfillColor = UIColor(red: 170, green: 104, blue: 180)
            
            
        }
        
        else if indexPath.section == 4
        {
            cell.DesignLabel.text = OthersclassTypearray[indexPath.row].others_name
            cell.TabletLabel.text = OthersclassTypearray[indexPath.row].duration
            cell.TimeLabe.text = OthersclassTypearray[indexPath.row].duration
            
            cell.CounterviewdisplayLabel.text = String(OthersclassTypearray[indexPath.row].compliance) + " %"
             cell.CounterView.animateProgressView(Float(OthersclassTypearray[indexPath.row].compliance))
             cell.BarimageView.backgroundColor = UIColor(red: 189, green: 52, blue: 94)
            cell.CounterView.counterfillColor = UIColor(red: 189, green: 52, blue: 94)

        }
        

     

        
        cell.selectionStyle = UITableViewCellSelectionStyle.Default
        return cell

        
    }
    
    
    // Section Header
    
    
    func tableView(tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        
       let  headerCell = tableView.dequeueReusableCellWithIdentifier("Headercell") as! CustomHeaderCell
    
       headerCell.SectionheaderHeading.text = sectionheadings[section]
       headerCell.SectionheaderImage.image = UIImage(named: SectionImages[section])
        let index = section
        
        
        switch index {
        case 0  :
            headerCell.SectionheaderHeading.textColor = UIColor(red: 171, green: 206, blue: 75)
            if supplement_compliance  != nil{
            headerCell.OverallPercentageLabel.text = supplement_compliance + " %"
            }
            print( "Value of index is 0")
            
        case 1  :
            headerCell.SectionheaderHeading.textColor = UIColor(red: 60, green: 195, blue: 175)
            if workout_compliance  != nil
            {
            headerCell.OverallPercentageLabel.text = workout_compliance + " %"
            }
            print( "Value of index is 1")
            
        case 2  :
            headerCell.SectionheaderHeading.textColor = UIColor(red: 26, green: 162, blue: 223)
            if lifestyle_compliance  != nil
            {
            headerCell.OverallPercentageLabel.text = lifestyle_compliance + " %"
            }
            print( "Value of index is 2")
            
        case 3:
            headerCell.SectionheaderHeading.textColor = UIColor(red: 170, green: 104, blue: 180)
            if food_compliance  != nil
            {
            headerCell.OverallPercentageLabel.text = food_compliance + " %"
            }
            print("Value of index is 3")
        default :
            headerCell.SectionheaderHeading.textColor = UIColor(red: 189, green: 52, blue: 94)
            if others_compliance  != nil
            {
            headerCell.OverallPercentageLabel.text = others_compliance + " %"
            }
            print( "Value of index is 4")
        }
        
 
        
        return headerCell
    }
    
    func tableView(tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 75
    }
    
    func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        return 120
    }
    
    func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath){
      performSegueWithIdentifier("Coming Up", sender: self)
        
    }
    
    func tableView(tableView: UITableView, didHighlightRowAtIndexPath indexPath: NSIndexPath) {
        performSegueWithIdentifier("Coming Up", sender: self)
    }
    
    //API call method for treatment plan 
    

    func treatmentPlan(urlString:String)
    {
        let url = NSURL(string: urlString)
         print(url)
        
        let task = NSURLSession.sharedSession().dataTaskWithURL(url!) { (data,response,error) in
            
            if data != nil{
            dispatch_async(dispatch_get_main_queue(), {
                
                self.extractTreatment(data!)
            })
            
        }
        }
        task.resume()

    }
    
    
    func extractTreatment(data:NSData)
    {
        let json = JSON(data: data)
        print(json)
        
        
        // workout_compliance json["overall_compliance"][""]["overall_compliance"].stringValue
        self.workout_compliance = json["workout_compliance"][""]["workout_compliance"].stringValue
        print(workout_compliance)
        
        //"supplement_compliance"
        
        self.supplement_compliance = json["supplement_compliance"][""]["supplement_compliance"].stringValue
        print(supplement_compliance)
        
        // "lifestyle_compliance"
        
        self.lifestyle_compliance = json["lifestyle_compliance"][""]["lifestyle_compliance"].stringValue
        print(lifestyle_compliance)
        
        // "food_compliance"
        
        self.food_compliance = json["food_compliance"][""]["food_compliance"].stringValue
        print(food_compliance)
        
        // "others_compliance"
        
        self.others_compliance = json["others_compliance"][""]["others_compliance"].stringValue
        print(others_compliance)
        
        
        
        //  TREATMENT COUNT ARRAY FROM JSON
        
//        let treatmentcount = json["treatment_count"][0]
//        print(treatmentcount)
//        self.workoutcnt = treatmentcount["workout_count"].stringValue
//        self.WorkoutLabel.text = workoutcnt
//        
//        self.supplementCount = treatmentcount["supplement_count"].stringValue
//        self.SupplementsLabel.text = supplementCount
//        
//        self.lifestylecount = treatmentcount["lifestyle_count"].stringValue
//        self.LifeStylelabel.text = lifestylecount
//        
//        self.foodcount = treatmentcount["food_count"].stringValue
//        self.FoodDronklabel.text = foodcount
//        
//        self.otherscount = treatmentcount["others_count"].stringValue
//        self.OthersLabel.text = otherscount
        
        
        let treatmentcount = json["treatment_count"][""]
        print(treatmentcount)
        self.workoutcnt = json["treatment_count"][""]["workout_count"].stringValue
        self.WorkoutLabel.text = workoutcnt
        print("workoutcnt:\(workoutcnt)")
        self.supplementCount = json["treatment_count"][""]["supplement_count"].stringValue
        self.SupplementsLabel.text = supplementCount
        print("supplementCount:\(supplementCount)")
        self.lifestylecount = json["treatment_count"][""]["lifestyle_count"].stringValue
        self.LifeStylelabel.text = lifestylecount
        print("lifestylecount:\(lifestylecount)")
        self.foodcount = json["treatment_count"][""]["food_count"].stringValue
        self.FoodDronklabel.text = foodcount
        print("foodcount\(foodcount)")
        self.otherscount = json["treatment_count"][""]["others_count"].stringValue
        self.OthersLabel.text = otherscount
        print("otherscount:\(otherscount)")
        
        // WORKOUT ARRAY FROM JSON
        
        let workoutarray = json["workout"].arrayValue
        print(workoutarray)
        
        
        workoutclassTypearray = [WorkOutdata]()
        for i in 0..<workoutarray.count
        {
            print(i)
            workoutclassObject = WorkOutdata()
            
            let workout_mapping_id = workoutarray[i]["workout_mapping_id"].stringValue
            workoutclassObject.workout_mapping_id = workout_mapping_id
            
            let workout_name = workoutarray[i]["workout_name"].stringValue
            workoutclassObject.workout_name = workout_name
            
            let reps = workoutarray[i]["reps"].stringValue
            workoutclassObject.reps = reps
            
            let sets = workoutarray[i]["sets"].stringValue
            workoutclassObject.sets = sets
            
            let weight = workoutarray[i]["weight"].stringValue
            workoutclassObject.weight = weight
            
           // let compliance = workoutarray[i]["compliance"].stringValue
           // workoutclassObject.complainces = compliance
            let newCompliance = workoutarray[i]["compliance"].stringValue
            let Intcomplaince = Double(newCompliance)
            workoutclassObject.complainces = Int(Intcomplaince!)
            
            workoutclassTypearray.append(workoutclassObject)
            
        }
        
        
        
        // Supplement array From JSON
        
        let supplementArray = json["supplement"].arrayValue
        print(supplementArray)
        
        SupplementDataTclassTypearray = [SupplementData]()
        
        for j in 0..<supplementArray.count
        {
            print(j)
            supplementObject = SupplementData()
            
            let supplement_mapping_id = supplementArray[j]["supplement_mapping_id"].stringValue
            supplementObject.supplement_mapping_id = supplement_mapping_id
            
            let supplement_name = supplementArray[j]["supplement_name"].stringValue
            supplementObject.supplement_name = supplement_name
            
            let amount = supplementArray[j]["amount"].stringValue
            supplementObject.amount = amount
            
            supplementObject.repitition = supplementArray[j]["repitition"].stringValue
            
            supplementObject.when_time = supplementArray[j]["when_time"].stringValue
            
            let supplement_dosage = supplementArray[j]["dosage_main_name"].stringValue
            supplementObject.dosage = supplement_dosage
            
           // supplementObject.compliance = supplementArray[j]["compliance"].stringValue
            
            let newCompliance = supplementArray[j]["compliance"].stringValue
            let Intcomplaince = Double(newCompliance)
            supplementObject.compliance = Int(Intcomplaince!)

            SupplementDataTclassTypearray.append(supplementObject)
            
            
        }
        
        // Food array from JSON
        
        let foodArray = json["food"].arrayValue
        print(foodArray)
        
        FoodDataclassTypearray = [FoodData]()
        
        for i in 0..<foodArray.count
        {
            print(i)
            foodObject = FoodData()
            
            foodObject.food_mapping_id = foodArray[i]["food_mapping_id"].stringValue
            foodObject.food_name = foodArray[i]["food_name"].stringValue
            let newCompliance = foodArray[i]["compliance"].stringValue
            let Intcomplaince = Double(newCompliance)
            foodObject.compliance = Int(Intcomplaince!)
            
            
            foodObject.when = foodArray[i]["when"].stringValue
            
            FoodDataclassTypearray.append(foodObject)
        }
        
        
        
        // lifestyle array from JSON
        
        let lifestyleArray = json["lifestyle"].arrayValue
        print(lifestyleArray)
        
        LifeStyleclassTypearray = [LifeStyle]()
        
        for i in 0..<lifestyleArray.count
        {
            print(i)
            lifeStyleObject = LifeStyle()
            
            lifeStyleObject.lifestyle_mapping_id = lifestyleArray[i]["lifestyle_mapping_id"].stringValue
            
            lifeStyleObject.lifestyle_name = lifestyleArray[i]["lifestyle_name"].stringValue
            
            lifeStyleObject.repitition = lifestyleArray[i]["repitition"].stringValue
            
            lifeStyleObject.time = lifestyleArray[i]["time"].stringValue
            
            lifeStyleObject.when = lifestyleArray[i]["time"].stringValue
            
           // lifeStyleObject.compliance = lifestyleArray[i]["compliance"].stringValue
            let newCompliance = lifestyleArray[i]["compliance"].stringValue
            let Intcomplaince = Double(newCompliance)
            lifeStyleObject.compliance = Int(Intcomplaince!)
            
            LifeStyleclassTypearray.append(lifeStyleObject)
        }
        
        
        //  others array from JSON
        
        let othersArray = json["others"].arrayValue
        print(othersArray)
        
        OthersclassTypearray = [Others]()
        
        for i in 0..<othersArray.count
        {
            print(i)
            
            othersObject = Others()
            
            othersObject.others_mapping_id = othersArray[i]["others_mapping_id"].stringValue
            
            othersObject.others_name = othersArray[i]["others_name"].stringValue
            
           // othersObject.compliance = othersArray[i]["compliance"].stringValue
            
            let newCompliance = othersArray[i]["compliance"].stringValue
            let Intcomplaince = Double(newCompliance)
            othersObject.compliance = Int(Intcomplaince!)
            
            othersObject.duration = othersArray[i]["duration"].stringValue
            
            OthersclassTypearray.append(othersObject)
        }
        
        
        // Overallcomplainces from JSON
        
        //Overallcomplainces = json["overall_compliance"][0]["overall_compliance"].stringValue
        Overallcomplainces = json["overall_compliance"][""]["overall_compliance"].stringValue
        Complainces.text = Overallcomplainces + " %"
        //print(<#T##items: Any...##Any#>)
        
        self.tableview.reloadData()
       
       
        
        
        
        
        
        
        
        
        
        
        
        
        
        
//       let com = json[0]["overall_compliance"]
//        Overallcomplainces = com.stringValue
//        print(com)
//        print(Overallcomplainces)
//        self.Complainces.text = Overallcomplainces + "%"
//        
//        
//        
//       // workoutcount = Customchildcelldata()
//
//        let wcount = json[1]["workout_count"]
//        workoutcnt = wcount.stringValue
//        self.WorkoutLabel.text = workoutcnt
//        
//        let  supplementCount = json[1]["supplement_count"]
//        self.supplementCount = supplementCount.stringValue
//        self.SupplementsLabel.text = self.supplementCount
//        
//        let lifeStylecount = json[1]["lifestyle_count"]
//        lifestylecount = lifeStylecount.stringValue
//        self.LifeStylelabel.text = lifestylecount
//        
//        let foodCount = json[1]["food_count"]
//        foodcount = foodCount.stringValue
//        self.FoodDronklabel.text = foodcount
//        
//        let othersCount = json[1]["others_count"]
//        otherscount = othersCount.stringValue
//        self.OthersLabel.text = otherscount
        
        
        
        
        
        
       
//        customchildcelldataarray = [Customchildcelldata]()
//        print(customchildcelldataarray.count)
//        for i in 2..<json.count
//        {
//            objectCustomchildcelldata = Customchildcelldata()
//           let treatmentdata = json[i].dictionaryValue
//            print(treatmentdata)
//            objectCustomchildcelldata.reps = treatmentdata["reps"]?.stringValue
//            //print(objectCustomchildcelldata.reps)
//            objectCustomchildcelldata.workout_name = treatmentdata["workout_name"]?.stringValue
//           // print(objectCustomchildcelldata.workout_name)
//            objectCustomchildcelldata.sets = treatmentdata["sets"]?.stringValue
//            //print(objectCustomchildcelldata.sets)
//            objectCustomchildcelldata.weight = treatmentdata["weight"]?.stringValue
//           // print(objectCustomchildcelldata.weight)
//            objectCustomchildcelldata.workout_Id = treatmentdata["workout_mapping_id"]?.stringValue
//            
//            objectCustomchildcelldata.complainces = treatmentdata["compliance"]?.stringValue
//            
//            let obj = counterView()
//            obj.percentage = objectCustomchildcelldata.complainces
//            customchildcelldataarray.append(objectCustomchildcelldata)
//            
//        }
//        
//        print(customchildcelldataarray.count)
//        tableview.reloadData()
        
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "Coming Up"
        {
            screenPosition = 1
            let destination = segue.destinationViewController as! CominUpviewcontroller
            
        }
        
        if segue.identifier == "menuviewcontroller"
        {
            let menuTableViewController = segue.destinationViewController as! MenuViewcontroller
            menuTableViewController.transitioningDelegate = menuTransitionManager
            menuTransitionManager.delegate = self
            

        }
    }
    func Dismiss() {
        dismissViewControllerAnimated(true, completion: nil)
        
    }
    
    @IBAction func unWind(segue:UIStoryboardSegue){
        
        let sourceVC = segue.sourceViewController as! MenuViewcontroller
        let selectedItem = sourceVC.currentItem! as String
        dismissViewControllerAnimated(true, completion: nil)
        
      
        let vc =  self.storyboard?.instantiateViewControllerWithIdentifier(selectedItem)
        
        if !((self.navigationController!.viewControllers.last!.isKindOfClass(TreatmentViewcontroller)) && vc!.isKindOfClass(TreatmentViewcontroller))
        {
            if let vc = vc{
                self.navigationController?.pushViewController(vc, animated: true)
            }
        }
        
        
    }

    
//    func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
//        print(indexPath.section)
//        self.section = indexPath.section
//        print(self.section)
//        
//        performSegueWithIdentifier("Coming Up", sender: self)
//    }
    
    func do_table_refresh()
    {
        dispatch_async(dispatch_get_main_queue(), {
            self.tableview.reloadData()
            return
        })
    }
    
    @IBAction func CalendarClicked(sender: UIBarButtonItem) {
        if pickerVisible == false{
            // datePicker.minimumDate = date
            datePicker.date = date
            datePicker.hidden = false
            pickerVisible = true
        }
        else{
            datePicker.hidden = true
            pickerVisible = false
        }
        
    }
    @IBOutlet var datePicker: UIDatePicker!
    
    func datePickerChanged(datePicker:UIDatePicker) {
        var dateFormatter = NSDateFormatter()
        
        dateFormatter.dateStyle = NSDateFormatterStyle.ShortStyle
        //dateFormatter.timeStyle = NSDateFormatterStyle.ShortStyle
        var strDate = dateFormatter.stringFromDate(datePicker.date)
        //dateLabel.text = strDate
        date = datePicker.date
        calendar = NSCalendar.currentCalendar()
        let components = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: datePicker.date)
        let year =  components.year
        let month = components.month
        let day = components.day
        let weekDay = components.weekday
        self.navigationItem.title = "\(Weekdays[weekDay])-\(year)-\(month)-\(day)"
       // treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
        treatmentPlan("http://www.holbe.com/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
        treatmentPlan(baseURL + "patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
       
    }
    
}




























