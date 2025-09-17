//
//  CominUpviewcontroller.swift
//  Holbe
//
//  Created by Appsriv Technologies on 22/04/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

var screen:Bool = true

var customcomingupData = [CustomcomingupDataWorkOut]()
var customcomingupObject = CustomcomingupDataWorkOut()
var segueboolean: Bool = true


// Supplement array and object

var customcomingUpDataSupplements = [CustomcomingUpDataSupplements]()
var customcomingUpDataSupplementsObject = CustomcomingUpDataSupplements()

var customcomingUpDataSupplementsPW = [CustomcomingUpDataSupplements]()
var customcomingUpDataSupplementsObjectPW = CustomcomingUpDataSupplements()

// Food Array and Object

var customcominUpDataFood = [CustomcominUpDataFood]()
var customcominUpDataFoodObject = CustomcominUpDataFood()

// LifeStyle Array and Object

var customcomingUpDataLifeStyle = [CustomcomingUpDataLifeStyle]()
var customcomingUpDataLifeStyleObject = CustomcomingUpDataLifeStyle()

// Others Array and Object

var customcominUpDataOthers = [CustomcominUpDataOthers]()
var customcominUpDataOthersObject = CustomcominUpDataOthers()

var date = NSDate()
var calendar = NSCalendar.currentCalendar()

import UIKit


class CominUpviewcontroller: UIViewController,UICollectionViewDelegate,UICollectionViewDataSource,MenuTransitionManagerDelegate, UIGestureRecognizerDelegate

{
  
////////////////////////////////////////////////////////////////////////////////////////////////
  //var refreshControl: UIRefreshControl!
   // var segueboolean: Bool = true
    var workoutclassObject = WorkOutdata()
    
    @IBOutlet var datePicker: UIDatePicker!
    
    @IBOutlet var TapGestureRecognizer: UITapGestureRecognizer!
    // Object of type Supplement class
    
    var supplementObject = SupplementData()
    
    @IBOutlet var DateLabel: UILabel!
    
    
    @IBOutlet var actInd: UIActivityIndicatorView!
    @IBOutlet var DateChanger: UILabel!
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
    
    
    var WorkoutPrgVw: ProgressView!
    var SupplementPrgVw: ProgressView!
    var FooddrinksPrgVw: ProgressView!
    var OthersVw: ProgressView!
    var LifestylePrgVw: ProgressView!
    
   

    var pickerVisible = false
    var circuitDate:String!
    
    // Variables to display compalinces and count
    
    var Overallcomplainces:String!
    
    var workoutcnt:String! = "0"
    var supplementCount:String! = "0"
    var lifestylecount:String! = "0"
    var foodcount:String! = "0"
    var otherscount:String! = "0"
    
    var leftArrow: UIBarButtonItem!
    var rightArrow: UIBarButtonItem!
   // var section:Int!
    ////////////////////////////////////////////////////////////////////////////////////////////////
    @IBOutlet weak var CollectionUpcoming: UICollectionView!
    
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
    
    var scount:Int!
    var wcount:Int!
    var lcount:Int!
    var fcount:Int!
    var ocount:Int!
    
    var today: NSDate!
    // Array of type TreatmentViewcontroller
   // var Treatmentview:[CustomHeadercelldata] = [CustomHeadercelldata]()
    
    //  Array for Section Headers
    var sectionheadings = ["Supplements","Workout","LifeStyle","Food & Drinks","Others"]
    //var  overallPercentage = ["65%","30%","45%","99%","10%"]
    var  SectionImages1 = ["supplements-30x30","workouts (1)","health","food-&-Drinks (1)","others"]
    //@IBOutlet var TapGestureRecognizer: UITapGestureRecognizer!

    let menuTransitionManager = MenuTransitionManager()
    var  SectionImages = ["Supplements","workouts","lifestyles","food-&-Drinks","others"]
    var  Weekdays = ["Day","Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    
    var fetchSection:Int = 0
    var fetchRow:Int = 0
    
    override func viewDidLoad() {
        self.CollectionUpcoming.delegate = self
        self.CollectionUpcoming.dataSource = self
       // self.CollectionUpcoming.leftAnchor = NSLayoutXAxisAnchor
        
        
        
//        refreshControl = UIRefreshControl()
//        refreshControl.attributedTitle = NSAttributedString(string: "Pull to refresh")
//        self.refreshControl?.addTarget(CominUpviewcontroller.self(), action: #selector(self.refresh(_:)), forControlEvents: UIControlEvents.ValueChanged)
//        self.CollectionUpcoming.addSubview(refreshControl)
//        self.CollectionUpcoming!.alwaysBounceVertical = true
//        

        
//        
//        if screenPosition == 1{
//        
//        let limg = UIImage(named: "left-arrow (1)")
//        let rimg = UIImage(named: "right-arrow")
//        leftArrow = UIBarButtonItem(image: limg, style: UIBarButtonItemStyle.Plain, target: self, action: #selector(CominUpviewcontroller.handleArrow(_:)))
//        rightArrow = UIBarButtonItem(image: rimg, style: UIBarButtonItemStyle.Plain, target: self, action: #selector(CominUpviewcontroller.handleArrow(_:)))
//        leftArrow.tag = 0
//        rightArrow.tag = 1
//        self.navigationItem.leftBarButtonItems?.append(leftArrow)
//        self.navigationItem.rightBarButtonItems?.append(rightArrow)
//        }
        
        //treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=1&dateid=2016-7-26")
        //leftView = UIView(frame: CGRect(x: self.navigationItem.le, y: Int, width: Int, height: Int))
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
        today = date
        let year =  components.year
        let month = components.month
        let day = components.day
        let weekDay = components.weekday
        //self.navigationController?.navigationBar.addSubview(leftArrow)
        //self.navigationController?.navigationBar.addSubview(rightArrow)
        //if screenPosition == 1{
        //self.navigationItem.title = "\(Weekdays[weekDay])-\(year)-\(month)-\(day)"
        //self.navigationItem.title = "Today"
        //}
        //else{
        self.navigationController?.navigationBar.hidden = false
        self.navigationController?.navigationBarHidden = false
        self.navigationItem.title = "Your Treatment Plan"
        self.navigationItem.titleView?.tintColor = UIColor(red: 139, green: 137, blue: 148)
        //}
        
        NSNotificationCenter.defaultCenter().addObserver(self, selector: #selector(CominUpviewcontroller.methodOfReceivedNotification(_:)), name:"Completion", object: nil)
        self.DateChanger.text =  "   TODAY"
        
        self.navigationController?.navigationItem.setHidesBackButton(true, animated: false)
        //self.navigationController?.navigationItem.title = "Day \(day) \(weekDay) \(year)"
        self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName :UIColor(red: 139, green: 137, blue: 148)]
        self.navigationController?.navigationBar.tintColor = UIColor(red: 139, green: 137, blue: 148)
      
        //self.navigationController?.navigationItem.title = "Day 24th"
        //self.navigationController?
        datePicker.addTarget(self, action: #selector(CominUpviewcontroller.datePickerChanged(_:)), forControlEvents: UIControlEvents.ValueChanged)
       // treatmentPlan("http://192.185.26.69/~holbe/api/patient/get_coming_up.php?id=1&dateid=\(year)-\(month)-\(day)")
        
        //print(customchildcelldataarray.count)
        
        SupplementsLabel.textColor = UIColor.whiteColor()
        SupplementsLabel.layer.cornerRadius = 8.5
        SupplementsLabel.clipsToBounds = true
        
        
        
        // WorkOut
        
        WorkoutLabel.textColor = UIColor.whiteColor()
        WorkoutLabel.layer.cornerRadius = 8.5
        WorkoutLabel.clipsToBounds = true
        
        
        //Lifestyle
        
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
        
        
        let SupplementTapped: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(CominUpviewcontroller.supplementviewtappedTapped(_:)))
        
        SupplementsView.addGestureRecognizer(SupplementTapped)
        SupplementsView.userInteractionEnabled = true
        
        let WorkoutTapped: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(CominUpviewcontroller.workoutviewtappedTapped(_:)))
        
        WorkoutView.addGestureRecognizer(WorkoutTapped)
        WorkoutView.userInteractionEnabled = true
        
        let LifeStyleTapped: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(CominUpviewcontroller.lifestyleviewtappedTapped(_:)))
        
        LifeStyleView.addGestureRecognizer(LifeStyleTapped)
        LifeStyleView.userInteractionEnabled = true
        
        let FoodDrinksTapped: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(CominUpviewcontroller.fooddrinksviewtappedTapped(_:)))
        
        FoodDrinksView.addGestureRecognizer(FoodDrinksTapped)
        FoodDrinksView.userInteractionEnabled = false
        FoodDrinksView.backgroundColor = UIColor.grayColor()
        FoodDronklabel.backgroundColor = UIColor.grayColor()
        
        let OthersTapped: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(CominUpviewcontroller.othersviewtappedTapped(_:)))
        
        OthersView.addGestureRecognizer(OthersTapped)
        OthersView.userInteractionEnabled = false
        OthersView.backgroundColor = UIColor.grayColor()
        OthersLabel.backgroundColor = UIColor.grayColor()
        
       // treatmentPlan("http://www.holbe.com/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
        
        
       // treatmentPlan(baseURL + "patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")  latest
        

        
    }
    
    
 
    
    override func viewWillAppear(animated: Bool) {
        
        
        ////CollectionUpcoming.reloadData()
        //date = NSDate()
        //calendar = NSCalendar.currentCalendar()
        let components = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: date)
        let year =  components.year
        let month = components.month
        let day = components.day
        let weekDay = components.weekday
//        if screenPosition == 1{
//        self.navigationItem.title = "Today"
//            
//            if self.navigationItem.leftBarButtonItems?.count <= 1 && self.navigationItem.rightBarButtonItems?.count <= 1 {
//            let limg = UIImage(named: "left-arrow (1)")
//            let rimg = UIImage(named: "right-arrow")
//            leftArrow = UIBarButtonItem(image: limg, style: UIBarButtonItemStyle.Plain, target: self, action: #selector(CominUpviewcontroller.handleArrow(_:)))
//            rightArrow = UIBarButtonItem(image: rimg, style: UIBarButtonItemStyle.Plain, target: self, action: #selector(CominUpviewcontroller.handleArrow(_:)))
//            leftArrow.tag = 0
//            rightArrow.tag = 1
//            self.navigationItem.leftBarButtonItems?.append(leftArrow)
//            self.navigationItem.rightBarButtonItems?.append(rightArrow)
//            }
//        }
       // else{
            self.navigationItem.title = "Your Treatment Plan"
       // }
        self.navigationController?.navigationBar.hidden = false
        self.navigationController?.navigationBar.barTintColor = UIColor.whiteColor()
        let todaycomponents = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: today)
        let todayyear =  todaycomponents.year
        let todaymonth = todaycomponents.month
        let todayday = todaycomponents.day
        
        if todayyear == year && todaymonth == month && todayday == day{
            //self.navigationItem.title = "Today"
            self.DateChanger.text = "   TODAY"
            self.circuitDate = "\(todayyear)-\(todaymonth)-\(todayday)"
            
        }
        else{
            //self.navigationItem.title = "\(Weekdays[weekDay])-\(year)-\(month)-\(day)"
            self.DateChanger.text = "   \(Weekdays[weekDay])-\(year)-\(month)-\(day)"
            self.circuitDate = "\(year)-\(month)-\(day)"
            
        }
        //self.DateChanger.text = "   TODAY"
        self.navigationController?.navigationItem.setHidesBackButton(true, animated: false)
        //self.navigationController?.navigationItem.title = "Day \(day) \(weekDay) \(year)"
        self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName :UIColor(red: 139, green: 137, blue: 148)]
        self.navigationController?.navigationBar.tintColor = UIColor(red: 139, green: 137, blue: 148)
        
       // treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
       
        
      //  treatmentPlan("http://www.holbe.com/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
        
        //print(customchildcelldataarray.count)
       // treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=1&dateid=2016-7-26")
        //treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
        
//        treatmentPlan(baseURL + "patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
//        
//        
//        
//         if ((self.fetchSection == 0) && (self.fetchRow == 0))
//        
//        {
//            print(fetchSection , fetchRow)
//        }
//        
//         else{
//             print(fetchSection , fetchRow)
//             let indexPath: NSIndexPath = NSIndexPath(forRow: self.fetchRow, inSection: self.fetchSection)
//             self.view.layoutIfNeeded()
//             CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: UICollectionViewScrollPosition.CenteredVertically, animated: true)
//        }
//        
        
        if screen == true
        {
             treatmentPlan(baseURL + "patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
        }
        
        else
        {
            let indexPath: NSIndexPath = NSIndexPath(forRow: self.fetchRow, inSection: self.fetchSection)
            self.view.layoutIfNeeded()
            CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: UICollectionViewScrollPosition.CenteredVertically, animated: true)
        }
    }
    
    
    
    func methodOfReceivedNotification(notification: NSNotification){
       //  let n = notification as NSIndexPath
        let index = notification.userInfo!["index"] as! Int
        let section = notification.userInfo!["section"] as! Int
        self.actInd.stopAnimating()
        self.actInd.hidden = true
        let indexpath = NSIndexPath(forRow: index, inSection: section)
       // self.CollectionUpcoming.reloadItemsAtIndexPaths([indexpath])
        //CollectionUpcoming.reloadData()
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
            
            if today == date{
                self.navigationItem.title = "   TODAY"
                self.DateChanger.text = "   TODAY"
               
            }
            else{
                self.navigationItem.title = "   \(Weekdays[weekDay])-\(year)-\(month)-\(day)"
                self.DateChanger.text = "   \(Weekdays[weekDay])-\(year)-\(month)-\(day)"
               
            }
            
            //treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=1&dateid=2016-7-26")
            // treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
            // treatmentPlan("http://www.holbe.com/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
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
            if today == date{
                self.navigationItem.title = "   TODAY"
                self.DateChanger.text = "   TODAY"
               
            }
            else{
                self.navigationItem.title = "   \(Weekdays[weekDay])-\(year)-\(month)-\(day)"
                self.DateChanger.text = "   \(Weekdays[weekDay])-\(year)-\(month)-\(day)"
              
            }
            //treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=1&dateid=2016-7-26")
            //treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
            //treatmentPlan("http://www.holbe.com/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
            treatmentPlan(baseURL + "patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
        }

    }
    
    func supplementviewtappedTapped(gestureRecognizer: UITapGestureRecognizer)
    {
        if CollectionUpcoming.numberOfItemsInSection(0) > 0{
            let indexPath = NSIndexPath(forRow: 0, inSection: 0)
            CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
        }
    }
    
    func workoutviewtappedTapped(gestureRecognizer: UITapGestureRecognizer)
    {
        if CollectionUpcoming.numberOfItemsInSection(1) > 0{
            let indexPath = NSIndexPath(forRow: 0, inSection: 1)
            CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
        }
        else{
            let lastrow = CollectionUpcoming.numberOfItemsInSection(0)
            if lastrow > 0{
                let indexPath = NSIndexPath(forRow: (lastrow - 1), inSection: 0)
                CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
            }
        }
    }
    
    func lifestyleviewtappedTapped(gestureRecognizer: UITapGestureRecognizer)
    {
        if CollectionUpcoming.numberOfItemsInSection(2) > 0{
            let indexPath = NSIndexPath(forRow: 0, inSection: 2)
            CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
        }
        else{
            let lastrow = CollectionUpcoming.numberOfItemsInSection(1)
            if lastrow > 0{
                let indexPath = NSIndexPath(forRow: (lastrow - 1), inSection: 1)
                CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
            }
            else{
                let lastrow1 = CollectionUpcoming.numberOfItemsInSection(0)
                if lastrow1 > 0{
                    let indexPath = NSIndexPath(forRow: (lastrow1 - 1), inSection: 0)
                    CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
                }
            }
        }
    }
    
    func fooddrinksviewtappedTapped(gestureRecognizer: UITapGestureRecognizer)
    {
        if CollectionUpcoming.numberOfItemsInSection(3) > 0{
            let indexPath = NSIndexPath(forRow: 0, inSection: 3)
            CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
        }
        else{
            let lastrow = CollectionUpcoming.numberOfItemsInSection(2)
            if lastrow > 0{
                let indexPath = NSIndexPath(forRow: (lastrow - 1), inSection: 2)
                CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
            }
            else{
                let lastrow1 = CollectionUpcoming.numberOfItemsInSection(1)
                if lastrow1 > 0{
                    let indexPath = NSIndexPath(forRow: (lastrow1 - 1), inSection: 1)
                    CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
                }
                else{
                    let lastrow2 = CollectionUpcoming.numberOfItemsInSection(0)
                    if lastrow2 > 0{
                        let indexPath = NSIndexPath(forRow: (lastrow2 - 1), inSection: 0)
                        CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
                    }
                }
            }
            
        }
    }
    
    func othersviewtappedTapped(gestureRecognizer: UITapGestureRecognizer)
    {
        if CollectionUpcoming.numberOfItemsInSection(4) > 0{
            let indexPath = NSIndexPath(forRow: 0, inSection: 4)
            CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
        }
        else{
            let lastrow = CollectionUpcoming.numberOfItemsInSection(3)
            if lastrow > 0{
                let indexPath = NSIndexPath(forRow: (lastrow - 1), inSection: 3)
                CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
            }
            else{
                let lastrow1 = CollectionUpcoming.numberOfItemsInSection(2)
                if lastrow1 > 0{
                    let indexPath = NSIndexPath(forRow: (lastrow1 - 1), inSection: 2)
                    CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
                }
                else{
                    let lastrow1 = CollectionUpcoming.numberOfItemsInSection(1)
                    if lastrow1 > 0{
                        let indexPath = NSIndexPath(forRow: (lastrow1 - 1), inSection: 1)
                        CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
                    }
                    else{
                        let lastrow1 = CollectionUpcoming.numberOfItemsInSection(0)
                        if lastrow1 > 0{
                            let indexPath = NSIndexPath(forRow: (lastrow1 - 1), inSection: 0)
                            CollectionUpcoming.scrollToItemAtIndexPath(indexPath, atScrollPosition: .Top, animated: true)
                        }
                    }
                }
            }
            
        }
    }

    
    
    func numberOfSectionsInCollectionView(collectionView: UICollectionView) -> Int {
        return 5
    }
    
    func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        if section == 0
        {
            return customcomingUpDataSupplements.count
        }
        else if section == 1
        {
            return customcomingupData.count

        }
        else if section == 2
        {
            return customcomingUpDataLifeStyle.count
        }
        else if section == 3
        {
            return customcominUpDataFood.count
        }
        else
        {
            return customcominUpDataOthers.count
        }


    }
    
    func setIndex(row: Int, section: Int)-> Int{
        if section == 0{
             return row
        }
        else if section == 1{
             return customcomingUpDataSupplements.count + row
        }
        else if section == 2{
             return customcomingUpDataSupplements.count + customcomingupData.count + row
        }
        else if section == 3{
            return customcomingUpDataSupplements.count + customcomingupData.count + customcomingUpDataLifeStyle.count + row
        }
        else {
          return customcomingUpDataSupplements.count +  customcomingupData.count + customcomingUpDataLifeStyle.count + customcominUpDataFood.count + row
        }
    }
    
    func getArray(index: Int)-> AnyObject{
        if index >= 0 && index < customcomingUpDataSupplements.count{
            return customcomingUpDataSupplements[index]
        }
        else if index >= customcomingUpDataSupplements.count && index < (customcomingUpDataSupplements.count + customcomingupData.count){
            let i = index - customcomingUpDataSupplements.count
            return customcomingupData[i]
        }
        else if index >= (customcomingUpDataSupplements.count + customcomingupData.count) && index < (customcomingUpDataSupplements.count + customcomingupData.count + customcomingUpDataLifeStyle.count){
            let i = index - customcomingUpDataSupplements.count - customcomingupData.count
            return customcomingUpDataLifeStyle[i]
        }
        else if index >= (customcomingUpDataSupplements.count + customcomingupData.count + customcomingUpDataLifeStyle.count) && index < (customcomingUpDataSupplements.count + customcomingupData.count + customcomingUpDataLifeStyle.count + customcominUpDataFood.count){
            let i = index - customcomingUpDataSupplements.count - customcomingupData.count - customcomingUpDataLifeStyle.count
            return customcominUpDataFood[i]
        }
        else{
            let i = index - customcomingUpDataSupplements.count - customcomingupData.count - customcomingUpDataLifeStyle.count - customcominUpDataFood.count
            return customcominUpDataOthers[i]
        }
    }
    
    func getIndex(index: Int)-> Int{
        if index >= 0 && index < customcomingUpDataSupplements.count{
            return index
        }
        else if index >= customcomingUpDataSupplements.count && index < (customcomingUpDataSupplements.count + customcomingupData.count){
            let i = index - customcomingUpDataSupplements.count
            return i
        }
        else if index >= (customcomingUpDataSupplements.count + customcomingupData.count) && index < (customcomingUpDataSupplements.count + customcomingupData.count + customcomingUpDataLifeStyle.count){
            let i = index - customcomingUpDataSupplements.count - customcomingupData.count
            return i
        }
        else if index >= (customcomingUpDataSupplements.count + customcomingupData.count + customcomingUpDataLifeStyle.count) && index < (customcomingUpDataSupplements.count + customcomingupData.count + customcomingUpDataLifeStyle.count + customcominUpDataFood.count){
            let i = index - customcomingUpDataSupplements.count - customcomingupData.count - customcomingUpDataLifeStyle.count
            return i
        }
        else{
            let i = index - customcomingUpDataSupplements.count - customcomingupData.count - customcomingUpDataLifeStyle.count - customcominUpDataFood.count
            return i
        }
    }
    
    func getTimingsID(index: Int)-> AnyObject{
        if index >= 0 && index < customcomingUpDataSupplements.count{
            return customcomingUpDataSupplements[index].timings_id
        }
        else if index >= customcomingUpDataSupplements.count && index < (customcomingUpDataSupplements.count + customcomingupData.count){
            let i = index - customcomingUpDataSupplements.count
            return customcomingupData[i].timings_id
        }
        else if index >= (customcomingUpDataSupplements.count + customcomingupData.count) && index < (customcomingUpDataSupplements.count + customcomingupData.count + customcomingUpDataLifeStyle.count){
            let i = index - customcomingUpDataSupplements.count - customcomingupData.count
            return customcomingUpDataLifeStyle[i].timings_id
        }
        else if index >= (customcomingUpDataSupplements.count + customcomingupData.count + customcomingUpDataLifeStyle.count) && index < (customcomingUpDataSupplements.count + customcomingupData.count + customcomingUpDataLifeStyle.count + customcominUpDataFood.count){
            let i = index - customcomingUpDataSupplements.count - customcomingupData.count - customcomingUpDataLifeStyle.count
            return customcominUpDataFood[i].timings_id
        }
        else{
            let i = index - customcomingUpDataSupplements.count - customcomingupData.count - customcomingUpDataLifeStyle.count - customcominUpDataFood.count
            return customcominUpDataOthers[i].timings_id
        }
    }
    
    func getSection(index: Int)-> Int{
        if index >= 0 && index < customcomingUpDataSupplements.count{
            return 0
        }
        else if index >= customcomingUpDataSupplements.count && index < (customcomingUpDataSupplements.count + customcomingupData.count){
            let i = index - customcomingUpDataSupplements.count
            return 1
        }
        else if index >= (customcomingUpDataSupplements.count + customcomingupData.count) && index < (customcomingUpDataSupplements.count + customcomingupData.count + customcomingUpDataLifeStyle.count){
            let i = index - customcomingUpDataSupplements.count - customcomingupData.count
            return 2
        }
        else if index >= (customcomingUpDataSupplements.count + customcomingupData.count + customcomingUpDataLifeStyle.count) && index < (customcomingUpDataSupplements.count + customcomingupData.count + customcomingUpDataLifeStyle.count + customcominUpDataFood.count){
            let i = index - customcomingUpDataSupplements.count - customcomingupData.count - customcomingUpDataLifeStyle.count
            return 3
        }
        else{
            let i = index - customcomingUpDataSupplements.count - customcomingupData.count - customcomingUpDataLifeStyle.count - customcominUpDataFood.count
            return 4
        }
    }

    
    func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCellWithReuseIdentifier("Cell", forIndexPath: indexPath) as! newcustomcollectionviewCell
        
        
      cell.tableView.reloadData()
        
        
//        if indexPath.section == 0
//        {
//            
//            
//            if SupplementDataTclassTypearray[indexPath.row].compliance == 0
//            {
//            SupplementDataTclassTypearray[indexPath.row].state = 0
//            cell?.completedButton.titleLabel?.text = "Uncomplete"
//            cell?.completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
//            cell?.partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//            }
//            else if SupplementDataTclassTypearray[indexPath.row].compliance == 50
//            {
//                cell?.completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
//                cell?.partialcompletedButton.setImage(UIImage(named: "partial-green-btn"), forState: UIControlState.Normal)
//            }
//            else if SupplementDataTclassTypearray[indexPath.row].compliance == 100
//            {
//                cell?.completedButton.titleLabel?.text = "Complete"
//                cell?.completedButton.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
//                cell?.partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//                SupplementDataTclassTypearray[indexPath.row].state = 1
//            }
//            cell?.WorkoutNameLabel.text = SupplementDataTclassTypearray[indexPath.row].supplement_name
//            cell?.repsandsitups.text = SupplementDataTclassTypearray[indexPath.row].amount
//            cell?.TimedisplayLabel.text = SupplementDataTclassTypearray[indexPath.row].when_time
//            cell?.TreattypeLabel.text = "Supplement"
//            cell?.workoutImages.image = UIImage(named: SectionImages[indexPath.section])
//            cell?.LineView.backgroundColor = UIColor(red: 171, green: 209, blue: 75)
//            cell?.workoutView.backgroundColor = UIColor(red: 171, green: 209, blue: 75)
//            cell?.completedButton.tag = indexPath.item
//            cell?.partialcompletedButton.tag = indexPath.item
//            cell?.ContentView.tag = indexPath.section
//        }
//        
//        if indexPath.section == 1
//        {
//            if workoutclassTypearray[indexPath.row].complainces == 0
//            {
//                cell?.completedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//                cell?.partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//            }
//            else if workoutclassTypearray[indexPath.row].complainces == 50
//            {
//                cell?.completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
//                cell?.partialcompletedButton.setImage(UIImage(named: "partial-green-btn"), forState: UIControlState.Normal)
//            }
//            else if workoutclassTypearray[indexPath.row].complainces == 100
//            {
//                cell?.completedButton.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
//                cell?.partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//            }
//
//            
//            cell?.WorkoutNameLabel.text = workoutclassTypearray[indexPath.row].workout_name
//            cell?.repsandsitups.text = workoutclassTypearray[indexPath.row].reps + " Reps of" +  workoutclassTypearray[indexPath.row].sets + " Sets"
//            cell?.TimedisplayLabel.text = workoutclassTypearray[indexPath.row].weight
//            cell?.TreattypeLabel.text = "Workout"
//            cell?.workoutImages.image = UIImage(named: SectionImages[indexPath.section])
//             cell?.LineView.backgroundColor = UIColor(red: 60, green: 195, blue: 175)
//            cell?.workoutView.backgroundColor = UIColor(red: 60, green: 195, blue: 175)
//            cell?.completedButton.tag = indexPath.item
//            cell?.partialcompletedButton.tag = indexPath.item
//            cell?.ContentView.tag = indexPath.section
//        }
//        
//        if indexPath.section == 2
//        {
//            
//            if LifeStyleclassTypearray[indexPath.row].compliance == 0
//            {
//                cell?.completedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//                cell?.partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//            }
//            else if LifeStyleclassTypearray[indexPath.row].compliance == 50
//            {
//                cell?.completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
//                cell?.partialcompletedButton.setImage(UIImage(named: "partial-green-btn"), forState: UIControlState.Normal)
//            }
//            else if LifeStyleclassTypearray[indexPath.row].compliance == 100
//            {
//                cell?.completedButton.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
//                cell?.partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//            }
//
//            cell?.WorkoutNameLabel.text = LifeStyleclassTypearray[indexPath.row].lifestyle_name
//            cell?.repsandsitups.text = LifeStyleclassTypearray[indexPath.row].repitition
//            cell?.TimedisplayLabel.text = LifeStyleclassTypearray[indexPath.row].time
//            cell?.TreattypeLabel.text = "Lifestyles"
//           cell?.workoutImages.image = UIImage(named: SectionImages[indexPath.section])
//             cell?.LineView.backgroundColor = UIColor(red: 26, green: 162, blue: 223)
//             cell?.workoutView.backgroundColor = UIColor(red: 26, green: 162, blue: 223)
//            cell?.completedButton.tag = indexPath.item
//            cell?.partialcompletedButton.tag = indexPath.item
//            cell?.ContentView.tag = indexPath.section
//        }
//        if indexPath.section == 3
//        {
//            
//            if FoodDataclassTypearray[indexPath.row].compliance == 0
//            {
//                cell?.completedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//                cell?.partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//            }
//            else if FoodDataclassTypearray[indexPath.row].compliance == 50
//            {
//                cell?.completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
//                cell?.partialcompletedButton.setImage(UIImage(named: "partial-green-btn"), forState: UIControlState.Normal)
//            }
//            else if FoodDataclassTypearray[indexPath.row].compliance == 100
//            {
//                cell?.completedButton.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
//                cell?.partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//            }
//            cell?.WorkoutNameLabel.text = FoodDataclassTypearray[indexPath.row].food_name
//            cell?.repsandsitups.text = FoodDataclassTypearray[indexPath.row].when
//            cell?.TimedisplayLabel.text = FoodDataclassTypearray[indexPath.row].when
//            cell?.TreattypeLabel.text = "Food & Drinks"
//           cell?.workoutImages.image = UIImage(named: SectionImages[indexPath.section])
//             cell?.LineView.backgroundColor = UIColor(red: 170, green: 104, blue: 180)
//             cell?.workoutView.backgroundColor = UIColor(red: 170, green: 104, blue: 180)
//            cell?.completedButton.tag = indexPath.item
//            cell?.partialcompletedButton.tag = indexPath.item
//            cell?.ContentView.tag = indexPath.section
//        }
//        
//        if indexPath.section == 4
//        {
//            
//            if OthersclassTypearray[indexPath.row].compliance == 0
//            {
//                cell?.completedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//                cell?.partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//            }
//            else if OthersclassTypearray[indexPath.row].compliance == 50
//            {
//                cell?.completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
//                cell?.partialcompletedButton.setImage(UIImage(named: "partial-green-btn"), forState: UIControlState.Normal)
//            }
//            else if OthersclassTypearray[indexPath.row].compliance == 100
//            {
//                cell?.completedButton.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
//                cell?.partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//            }
//
//            
//            cell?.WorkoutNameLabel.text = OthersclassTypearray[indexPath.row].others_name
//            cell?.repsandsitups.text = OthersclassTypearray[indexPath.row].duration
//            cell?.TimedisplayLabel.text = OthersclassTypearray[indexPath.row].duration
//            cell?.TreattypeLabel.text = "Others"
//            cell?.workoutImages.image = UIImage(named: SectionImages[indexPath.section])
//            cell?.LineView.backgroundColor = UIColor(red: 189, green: 52, blue: 94)
//            cell?.workoutView.backgroundColor = UIColor(red: 189, green: 52, blue: 94)
//            cell?.completedButton.tag = indexPath.item
//            cell?.partialcompletedButton.tag = indexPath.item
//            cell?.ContentView.tag = indexPath.section
//        }
//        
//        
//        return cell!
        
        var dts:[String] = [String]()
        var dtsv:[String] = [String]()
        cell.datasrc = [String]()
        cell.datasrcv = [String]()
       // cell.workoutLabel.font = UIFont(name: "", size: CGFloat)
        if indexPath.section == 0
        {
            cell.color = UIColor(red: 186, green: 214, blue: 93)
            cell.colorIndex = 0
           // for var i=0; i<customcomingUpDataSupplements.count; i=i+1{
                dts.append(customcomingUpDataSupplements[indexPath.row].supplementName)
                dtsv.append(customcomingUpDataSupplements[indexPath.row].amount + " " +  customcomingUpDataSupplements[indexPath.row].dosage_main_name)
           // }
            
            cell.datasrc = dts
            cell.datasrcv = dtsv
            
//            if customcomingUpDataSupplements[indexPath.row].workout == "post-workout"{
//                cell.workoutLabel.text = "Supplements - Post Workout"
//            }
//            else if customcomingUpDataSupplements[indexPath.row].workout == "pre-workout"{
//               cell.workoutLabel.text = "Supplements - Pre Workout"
//            }
//            else if customcomingUpDataSupplements[indexPath.row].workout == "during-workout"{
//                cell.workoutLabel.text = "Supplements - During Workout"
//            }
//            else{
//                cell.workoutLabel.text = "Supplements"
//            }
              cell.workoutLabel.text = customcomingUpDataSupplements[indexPath.row].time
            //cell.workoutLabel.textColor = UIColor(red: 186, green: 214, blue: 93)
            //cell.workoutLabel.font = UIFont.boldSystemFontOfSize(17.0)
            //cell.workoutLabel.text = "Supplements"
            //cell.workoutLabel.text = customcomingUpDataSupplements[indexPath.row].type
            cell.timingLabel.text  = customcomingUpDataSupplements[indexPath.row].time
            cell.timingLabel.hidden = true
            //cell.timingLabel.font = UIFont.boldSystemFontOfSize(13.0)

            //cell.workoutName1.text = customcomingUpDataSupplements[indexPath.row].form_main_name
            //cell.workoutSubName1.text = customcomingUpDataSupplements[indexPath.row].dosage_main_name
            cell.workoutImage.image = UIImage(named: "Supplements")
            cell.workoutView.backgroundColor = UIColor(red: 186, green: 214, blue: 93)
            cell.dotView.backgroundColor = UIColor(red: 186, green: 214, blue: 93)
            cell.lineView.backgroundColor = UIColor(red: 186, green: 214, blue: 93)
            cell.toplineView.backgroundColor = UIColor(red: 186, green: 214, blue: 93)
            
            
            
            if customcomingUpDataSupplements[indexPath.row].compliance != ""{
             cell.progresslbl = customcomingUpDataSupplements[indexPath.row].compliance
            }
            //cell.workoutName2.hidden = true
            //cell.workoutName3.hidden = true
            //cell.workoutName4.hidden = true
            //cell.workoutSubName2.hidden = true
            //cell.workoutSubName3.hidden = true
            //cell.workoutSubName4.hidden = true
            cell.completedButton.tag = setIndex(indexPath.row, section: indexPath.section)
            cell.partialButton.tag = setIndex(indexPath.row, section: indexPath.section)
            //  }
            
            //cell.workoutLabel.text = customcomingUpDataSupplementsObject.type
            
            
            
            
            
            
        }
        else if indexPath.section == 1
        {
            
            cell.color = UIColor(red: 71, green: 203, blue: 189)
            cell.colorIndex = 1
            for var i=0; i<customcomingupData[indexPath.row].workout_name.count; i=i+1{
                dts.append(customcomingupData[indexPath.row].workout_name[i])
                dtsv.append(customcomingupData[indexPath.row].reps[i] + " Reps of " + customcomingupData[indexPath.row].sets[i] + " sets")
            }
            
            cell.datasrc = dts
            cell.datasrcv = dtsv
            
            
//            if customcomingupData[indexPath.row].workout_name.count > 1{
//                cell.workoutLabel.text = "Workouts - Circuit"
//            }
//            else{
//                cell.workoutLabel.text = "Workouts"
//            }
            
            cell.workoutLabel.text = customcomingupData[indexPath.row].time
            
           // cell.workoutLabel.textColor = UIColor(red: 71, green: 203, blue: 189)
           // cell.workoutLabel.font = UIFont.boldSystemFontOfSize(17.0)
            
            cell.timingLabel.text  = customcomingupData[indexPath.row].time
            cell.timingLabel.hidden = true
            //cell.timingLabel.font = UIFont.boldSystemFontOfSize(13.0)
            //cell.workoutName1.text = customcomingupData[indexPath.row].workout_name
            //cell.workoutSubName1.text = customcomingupData[indexPath.row].reps + " Reps of " + customcomingupData[indexPath.row].sets + " sets"
            //cell.workoutName2.text = customcomingupData[indexPath.row].workout_name
            //cell.workoutSubName2.text = customcomingupData[indexPath.row].reps + " Reps of " + customcomingupData[indexPath.row].sets + " sets"
            //cell.workoutName3.text = customcomingupData[indexPath.row].workout_name
            //cell.workoutSubName3.text = customcomingupData[indexPath.row].reps + " Reps of " + customcomingupData[indexPath.row].sets + " sets"
            cell.workoutImage.image = UIImage(named: "workouts")
            cell.workoutView.backgroundColor = UIColor(red: 71, green: 203, blue: 189)
            cell.dotView.backgroundColor = UIColor(red: 71, green: 203, blue: 189)
            cell.lineView.backgroundColor = UIColor(red: 71, green: 203, blue: 189)
            cell.toplineView.backgroundColor = UIColor(red: 71, green: 203, blue: 189)
           
            
            if customcomingupData[indexPath.row].compliance != ""{
                cell.progresslbl = customcomingupData[indexPath.row].compliance
            }
            // cell.workoutName4.hidden = true
            //cell.workoutSubName4.hidden = true
            cell.completedButton.tag = setIndex(indexPath.row, section: indexPath.section)
            cell.partialButton.tag = setIndex(indexPath.row, section: indexPath.section)
            // }
            //cell.tableView.reloadData()
            
            
            
        }
            
        else if indexPath.section == 2
        {
            cell.color = UIColor(red: 18, green: 178, blue: 230)
            cell.colorIndex = 2
            
           // for var i=0; i<customcomingUpDataLifeStyle.count; i=i+1{
                dts.append(customcomingUpDataLifeStyle[indexPath.row].lifestyle_name)
             dtsv.append(customcomingUpDataLifeStyle[indexPath.row].time1)
           // }
            
            cell.datasrc = dts
            cell.datasrcv = dtsv
            
           // cell.workoutLabel.text = "Lifestyles"
            cell.workoutLabel.text = customcomingUpDataLifeStyle[indexPath.row].time
          //  cell.workoutLabel.text = customcomingUpDataLifeStyle[indexPath.row].type
            //cell.workoutLabel.textColor = UIColor(red: 18, green: 178, blue: 230)
            //cell.workoutLabel.font = UIFont.boldSystemFontOfSize(17.0)
            
            cell.timingLabel.text  = customcomingUpDataLifeStyle[indexPath.row].time
            cell.timingLabel.hidden = true
            //cell.timingLabel.font = UIFont.boldSystemFontOfSize(13.0)
            //cell.workoutName1.text = customcomingUpDataLifeStyleObject.lifestyle_name
            //cell.workoutSubName1.text = customcomingUpDataLifeStyleObject.gap
            cell.workoutImage.image = UIImage(named: "lifestyles")
            cell.workoutView.backgroundColor = UIColor(red: 18, green: 178, blue: 230)
            cell.dotView.backgroundColor = UIColor(red: 18, green: 178, blue: 230)
            cell.lineView.backgroundColor = UIColor(red: 18, green: 178, blue: 230)
            cell.toplineView.backgroundColor = UIColor(red: 18, green: 178, blue: 230)
            
            if customcomingUpDataLifeStyle[indexPath.row].compliance != ""{
                cell.progresslbl = customcomingUpDataLifeStyle[indexPath.row].compliance
            }
            //self.collectionView.reloadData()
            
            //            cell.workoutName2.hidden = true
            //            cell.workoutName3.hidden = true
            //            cell.workoutName4.hidden = true
            //            cell.workoutSubName2.hidden = true
            //            cell.workoutSubName3.hidden = true
            //            cell.workoutSubName4.hidden = true
            cell.completedButton.tag = setIndex(indexPath.row, section: indexPath.section)
            cell.partialButton.tag = setIndex(indexPath.row, section: indexPath.section)
            
        }
        else if indexPath.section == 3
        {
           cell.color = UIColor(red: 189, green: 128, blue: 195)
            cell.colorIndex = 3
           // for var i=0; i<customcominUpDataFood.count; i=i+1{
                dts.append(customcominUpDataFood[indexPath.row].food_name)
                dtsv.append(customcominUpDataFood[indexPath.row].when)
           // }
            
            cell.datasrc = dts
            cell.datasrcv = dtsv
            
           // cell.workoutLabel.text = "Food & Drinks"
            
            cell.workoutLabel.text = customcominUpDataFood[indexPath.row].time

            //cell.workoutLabel.textColor = UIColor(red: 189, green: 128, blue: 195)
            //cell.workoutLabel.font = UIFont.boldSystemFontOfSize(17.0)
            //cell.workoutLabel.text = customcominUpDataFood[indexPath.row].type
            cell.timingLabel.text  = customcominUpDataFood[indexPath.row].time
            cell.timingLabel.hidden = true
            //cell.timingLabel.font = UIFont.boldSystemFontOfSize(13.0)
            //cell.workoutName1.text = customcominUpDataFood[indexPath.row].food_name
            //cell.workoutSubName1.text = customcominUpDataFood[indexPath.row].when
            cell.workoutImage.image = UIImage(named: "food-&-Drinks")
            cell.workoutView.backgroundColor = UIColor(red: 189, green: 128, blue: 195)
            cell.dotView.backgroundColor = UIColor(red: 189, green: 128, blue: 195)
            cell.lineView.backgroundColor = UIColor(red: 189, green: 128, blue: 195)
            cell.toplineView.backgroundColor = UIColor(red: 189, green: 128, blue: 195)
            
            if customcominUpDataFood[indexPath.row].compliance != ""{
                cell.progresslbl = customcominUpDataFood[indexPath.row].compliance
            }
            //self.collectionView.reloadData()
            //cell.workoutName2.hidden = true
            //cell.workoutName3.hidden = true
            ///cell.workoutName4.hidden = true
            //cell.workoutSubName2.hidden = true
            //cell.workoutSubName3.hidden = true
            //cell.workoutSubName4.hidden = true
            cell.completedButton.tag = setIndex(indexPath.row, section: indexPath.section)
            cell.partialButton.tag = setIndex(indexPath.row, section: indexPath.section)
            
        }
        else
        {
            
          cell.color = UIColor(red: 205, green: 75, blue: 113)
            cell.colorIndex = 4
           // for var i=0; i<customcominUpDataOthers.count; i=i+1{
                dts.append(customcominUpDataOthers[indexPath.row].others_name)
                dtsv.append(customcominUpDataOthers[indexPath.row].duration)
           // }
            
            cell.datasrc = dts
            cell.datasrcv = dtsv
           // cell.workoutLabel.text = "Others"
             cell.workoutLabel.text = customcominUpDataOthers[indexPath.row].time
            cell.workoutLabel.text = customcominUpDataOthers[indexPath.row].type
            //cell.workoutLabel.textColor = UIColor(red: 205, green: 75, blue: 113)
            //cell.workoutLabel.font = UIFont.boldSystemFontOfSize(17.0)
            cell.timingLabel.text  = customcominUpDataOthers[indexPath.row].time
            cell.timingLabel.hidden = true
            //cell.timingLabel.font = UIFont.boldSystemFontOfSize(13.0)
            //cell.workoutName1.text = customcominUpDataOthers[indexPath.row].others_name
            //cell.workoutSubName1.text = customcominUpDataOthers[indexPath.row].duration
            cell.workoutImage.image = UIImage(named: "cloud_white")
            cell.workoutView.backgroundColor = UIColor(red: 205, green: 75, blue: 113)
            cell.dotView.backgroundColor = UIColor(red: 205, green: 75, blue: 113)
            cell.lineView.backgroundColor = UIColor(red: 205, green: 75, blue: 113)
            cell.toplineView.backgroundColor = UIColor(red: 205, green: 75, blue: 113)
            
            if customcominUpDataOthers[indexPath.row].compliance != ""{
                cell.progresslbl = customcominUpDataOthers[indexPath.row].compliance
            }
            //self.collectionView.reloadData()
            //            cell.workoutName2.hidden = true
            //            cell.workoutName3.hidden = true
            //            cell.workoutName4.hidden = true
            //            cell.workoutSubName2.hidden = true
            //            cell.workoutSubName3.hidden = true
            //            cell.workoutSubName4.hidden = true
            cell.completedButton.tag = setIndex(indexPath.row, section: indexPath.section)
            cell.partialButton.tag = setIndex(indexPath.row, section: indexPath.section)
            
        }
        
//        if !(indexPath.section == 0 && indexPath.row == 0){
//            cell.toplineView.hidden = true
//        }
//        else{
//            cell.toplineView.hidden = false
//        }
        
//        
//        if ((indexPath.section != 0) && (indexPath.row == 0)){
//                        cell.toplineView.hidden = true
//                    }
//                    else{
//                        cell.toplineView.hidden = false
//                    }
//        
      cell.toplineView.hidden = false
       cell.lineView.hidden = false
        
        cell.tableView.tag = setIndex(indexPath.row, section: indexPath.section)
    
        
        // Collectiov View Buttons
        cell.completedButton.layer.cornerRadius = 22
        cell.completedButton.layer.masksToBounds = true
        
        cell.partialButton.layer.cornerRadius = 22
        cell.partialButton.layer.masksToBounds = true
        
        
        
        // Collection View  dotView
        cell.dotView.layer.cornerRadius = 5
        cell.dotView.layer.masksToBounds = true
        cell.dotView.hidden = true
        // Collection View  workoutView
        cell.workoutView.layer.cornerRadius = 20
        
        cell.workoutView.layer.masksToBounds = true
        
        
        //self.collectionView.reloadData()
        
        cell.tableView.reloadData()
        
        return cell

    }
    
//    @IBAction func Taskcompletion(sender: UIButton)
//    {
//
//      
//
//        
//        if sender.superview!.tag == 0
//        {
//            if SupplementDataTclassTypearray[sender.tag].state == 0{
//            sender.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
//            sender.titleLabel!.text = "Complete"
//            SupplementDataTclassTypearray[sender.tag].state = 1
//            completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(SupplementDataTclassTypearray[sender.tag].timings_id)&completion=0")
//            }
//            else{
//                sender.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
//                sender.titleLabel!.text = "Uncomplete"
//                SupplementDataTclassTypearray[sender.tag].state = 0
//                completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(SupplementDataTclassTypearray[sender.tag].timings_id)&completion=1")
//            }
//        }
//        
//        if sender.superview!.tag == 1
//        {
//       
//            sender.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
//            completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(workoutclassTypearray[sender.tag].timings_id)&completion=0")
//            
//        }
//        if sender.superview!.tag == 2
//        {
//
//            sender.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
//            completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(LifeStyleclassTypearray[sender.tag].timings_id)&completion=0")
//            
//        }
//        if sender.superview!.tag == 3
//        {
//
//            sender.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
//            completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(FoodDataclassTypearray[sender.tag].timings_id)&completion=0")
//            
//        }
//        if sender.superview!.tag == 4
//        {
//
//            sender.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
//            completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(OthersclassTypearray[sender.tag].timings_id)&completion=0")
//            
//        }
//       
//        
//        
//        // Alert view to show successfull update
//
//        
//    }
////
//    @IBAction func PartialCompletion(sender: UIButton)
//    {
//        
//       
//        
//        // Alert view to show successfull update
//        if sender.superview!.tag == 0
//        {
//            sender.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//            completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(SupplementDataTclassTypearray[sender.tag].timings_id)&completion=0.5")
//        }
//        
//        if sender.superview!.tag == 1
//        {
//            sender.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//            completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(workoutclassTypearray[sender.tag].timings_id)&completion=0.5")
//        }
//        if sender.superview!.tag == 2
//        {
//            sender.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//            completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(LifeStyleclassTypearray[sender.tag].timings_id)&completion=0.5")
//        }
//        if sender.superview!.tag == 3
//        {
//            sender.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//            completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(FoodDataclassTypearray[sender.tag].timings_id)&completion=0.5")
//        }
//        if sender.superview!.tag == 4
//        {
//            sender.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
//            completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(OthersclassTypearray[sender.tag].timings_id)&completion=0.5")
//        }
//
//        
//    
//    }
//    
//    
//    
//    // API call method
//    
////    
//    func completion(urlsString: String)
//    {
//        
//        let url = NSURL(string: urlsString)
//        print(urlsString)
//        
//        
//        let task = NSURLSession.sharedSession().dataTaskWithURL(url!) { (data,response,error) in
//            
//            dispatch_async(dispatch_get_main_queue(),
//                           {
//                            
//                            self.extract_Completion(data!)
//            })
//        }
//        task.resume()
//
//    }
////
////    
//    func extract_Completion(data:NSData)
//    {
//        let json = JSON(data: data)
//        print(json)
//    }
    
    
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        
        
        if segue.identifier == "menuviewcontroller"
        {  
            let menuTableViewController = segue.destinationViewController as! MenuViewcontroller
            menuTableViewController.transitioningDelegate = menuTransitionManager
            menuTransitionManager.delegate = self
            
           // menuTableViewController.customchildcelldataarray = self.customchildcelldataarray
            
        }
        
        
        if segue.identifier == "PartialPopup"
        {
            
                let popupViewController = segue.destinationViewController as! PatialViewController
                popupViewController.arr = sender as! CustomcomingupDataWorkOut
                //popupViewController.timings_id = popupViewController.arr.timings_id
                //menuTransitionManager.delegate = self
                // menuTableViewController.customchildcelldataarray = self.customchildcelldataarray
        }
        
        if segue.identifier == "partialSupplement"
        {
            let popupViewController = segue.destinationViewController as! PartialSupplementViewController
            var arr = sender as! CustomcomingUpDataSupplements
            popupViewController.lifestyletype = arr.supplementName
            //popupViewController.lifestyleItem = arr.amount + arr.unit
          //  popupViewController.lifestyleQuantity = arr.dosage_main_name
            popupViewController.timings_id = arr.timings_id
            popupViewController.caps = arr.form_main_name
            popupViewController.brandName =  arr.brand
            popupViewController.itemName = arr.supplementName
            popupViewController.DosageQuantity = arr.dosage_main_name
            popupViewController.criteria = arr.workout
            popupViewController.notes = arr.notes
            popupViewController.amt = arr.amount
            popupViewController.fetchSection = self.fetchSection
            popupViewController.fetchRow = self.fetchRow
        
            

            //popupViewController.arr = sender as! CustomcomingUpDataSupplements
            //popupViewController.timings_id = popupViewController.arr.timings_id
            //menuTransitionManager.delegate = self
            // menuTableViewController.customchildcelldataarray = self.customchildcelldataarray
        }
            
          
            
      

        if segue.identifier == "FoodLifestyle"
        {
            
                let popupViewController = segue.destinationViewController as! partialFoodViewController
                var arr = sender as! CustomcomingUpDataLifeStyle
                popupViewController.lifestyletype = arr.lifestyle_name
                popupViewController.lifestyleItem = arr.time + " minutes"
                popupViewController.lifestyleQuantity = "Time"
                popupViewController.timings_id = arr.timings_id
                popupViewController.notes = arr.notes
                
                
                //popupViewController.arr = sender as! CustomcomingupDataWorkOut
                //menuTransitionManager.delegate = self
                // menuTableViewController.customchildcelldataarray = self.customchildcelldataarray
         
        }
        if segue.identifier == "Food"
        {
            
                let popupViewController1 = segue.destinationViewController as! FoodViewController
                var arr = sender as! CustomcominUpDataFood
                popupViewController1.type = arr.food_name
                popupViewController1.Item = arr.time
                popupViewController1.Quantity = " Amount"
                popupViewController1.timings_id = arr.timings_id
                
                
                //popupViewController.arr = sender as! CustomcomingupDataWorkOut
                //menuTransitionManager.delegate = self
                // menuTableViewController.customchildcelldataarray = self.customchildcelldataarray
        }
        //Others
        if segue.identifier == "Others"
        {
            
                let popupViewController = segue.destinationViewController as! PartialOthersViewController
                var arr = sender as! CustomcominUpDataOthers
                popupViewController.lifestyletype = arr.others_name
                popupViewController.lifestyleItem = arr.time + " minutes"
                popupViewController.lifestyleQuantity = "Completion"
                popupViewController.timings_id = arr.timings_id
                //popupViewController.arr = sender as! CustomcomingupDataWorkOut
                //menuTransitionManager.delegate = self
                // menuTableViewController.customchildcelldataarray = self.customchildcelldataarray
         
        }
        
    }
    
    func Dismiss() {
        dismissViewControllerAnimated(true, completion: nil)
        
//        let vc = self.storyboard?.instantiateViewControllerWithIdentifier("comingUp") as! CominUpviewcontroller
//        self.navigationController?.pushViewController(vc, animated: true)
        
    }
    
    @IBAction func unWind(segue:UIStoryboardSegue){
        let sourceVC = segue.sourceViewController as! MenuViewcontroller
        let selectedItem = sourceVC.currentItem! as String
        dismissViewControllerAnimated(true, completion: nil)
        
        
        
        
        let vc = self.storyboard?.instantiateViewControllerWithIdentifier(selectedItem)
        
        if !((self.navigationController!.viewControllers.last!.isKindOfClass(CominUpviewcontroller)) && vc!.isKindOfClass(CominUpviewcontroller))
        {
            if let vc = vc{
                self.navigationController?.pushViewController(vc, animated: true)
            }
        }
    }
    
    func treatmentPlan(urlString:String)
    {
        let url = NSURL(string: urlString)
        print(url)
        actInd.startAnimating()
        let task = NSURLSession.sharedSession().dataTaskWithURL(url!) { (data,response,error) in
            
            if data != nil{
                dispatch_async(dispatch_get_main_queue(), {
                    
                    self.Extarctdata(data!)
                })
                
            }
        }
        task.resume()
        
    }
    
    func Extarctdata(data:NSData)
    {
        customcomingupData = [CustomcomingupDataWorkOut]()
        customcomingUpDataSupplements = [CustomcomingUpDataSupplements]()
        customcominUpDataFood = [CustomcominUpDataFood]()
        customcomingUpDataLifeStyle = [CustomcomingUpDataLifeStyle]()
        customcominUpDataOthers = [CustomcominUpDataOthers]()
        
        let json = JSON(data: data)
        print(json)
        
        
        
        // Workout Array and data object
        
        let workout = json["workout"]
        print(workout)
        
       
        //customcomingupData = [NSDictionary]()
        
        
        for i in 0 ..< workout.count
        {
            var flag = true
            var ind = 0
            if workout[i]["circuit_id"].stringValue != "" && workout[i]["circuit_id"].stringValue != "0"{
            for var j=0; j<customcomingupData.count; j=j+1{
                
                    let x = workout[i]["circuit_id"].stringValue
                    let y = customcomingupData[j].circuit_id
                    if x==y{
                        flag = false
                        ind = j
                    }
                }
                
            }
            
            if flag == false{
                
                //customcomingupData[ind].circuit_id = workout[i]["circuit_id"].stringValue
                
                
                customcomingupData[ind].reps.append(workout[i]["reps"].stringValue)
               
                
                customcomingupData[ind].sets.append(workout[i]["sets"].stringValue)
               
                
                customcomingupData[ind].timings_id.append(workout[i]["timings_id"].stringValue)
               
                
                customcomingupData[ind].type.append(workout[i]["type"].stringValue)
               
                
                customcomingupData[ind].workout_name.append(workout[i]["workout_name"].stringValue)
                
                
                customcomingupData[ind].time = workout[i]["time"].stringValue
                customcomingupData[ind].tempo = workout[i]["tempo"].stringValue
                
                customcomingupData[ind].hasWeight.append(workout[i]["hasweight"].stringValue)
                
                customcomingupData[ind].compliance = workout[i]["compliance"].stringValue
                
                customcomingupData[ind].weight.append(workout[i]["weight"].stringValue)
                
                
                
            }
            else{
            customcomingupObject = CustomcomingupDataWorkOut()
            
            customcomingupObject.circuit_id = workout[i]["circuit_id"].stringValue
            print(customcomingupObject.circuit_id)
            
            customcomingupObject.reps.append(workout[i]["reps"].stringValue)
            print(customcomingupObject.reps)
            
            customcomingupObject.sets.append(workout[i]["sets"].stringValue)
            print(customcomingupObject.sets)
                
            customcomingupObject.weight.append(workout[i]["weight"].stringValue)
            
            customcomingupObject.timings_id.append(workout[i]["timings_id"].stringValue)
            print(customcomingupObject.timings_id)
            
            customcomingupObject.type.append(workout[i]["type"].stringValue)
            print(customcomingupObject.type)
            
            customcomingupObject.workout_name.append(workout[i]["workout_name"].stringValue)
            print(customcomingupObject.workout_name)
            
            customcomingupObject.time = workout[i]["time"].stringValue
            customcomingupObject.tempo = workout[i]["tempo"].stringValue
                
            customcomingupObject.hasWeight.append(workout[i]["hasweight"].stringValue)
                
            customcomingupObject.compliance = workout[i]["compliance"].stringValue
            
            customcomingupData.append(customcomingupObject)
            }
        }
        
        
        
        // Supplement Array and data
        
        let supplemet = json["supplement"]
        print(supplemet)
        
        
        
        
        for i in  0 ..< supplemet.count
        {
            customcomingUpDataSupplementsObject = CustomcomingUpDataSupplements()
            
            customcomingUpDataSupplementsObject.type = supplemet[i]["type"].stringValue
            print(customcomingUpDataSupplementsObject.type)
            
            customcomingUpDataSupplementsObject.timings_id = supplemet[i]["timings_id"].stringValue
            print(customcomingUpDataSupplementsObject.timings_id)
            
            customcomingUpDataSupplementsObject.time = supplemet[i]["time"].stringValue
            print(customcomingUpDataSupplementsObject.time)
            
            customcomingUpDataSupplementsObject.gap = supplemet[i]["gap"].stringValue
            print(customcomingUpDataSupplementsObject.gap)
            
            customcomingUpDataSupplementsObject.unit = supplemet[i]["unit"].stringValue
            
            customcomingUpDataSupplementsObject.dosage_main_name = supplemet[i]["dosage_main_name"].stringValue
            print(customcomingUpDataSupplementsObject.dosage_main_name)
            
            customcomingUpDataSupplementsObject.form_main_name = supplemet[i]["form_main_name"].stringValue
            print(customcomingUpDataSupplementsObject.form_main_name)
            
            customcomingUpDataSupplementsObject.supplementName = supplemet[i]["supplement_name"].stringValue
            
            customcomingUpDataSupplementsObject.compliance = supplemet[i]["compliance"].stringValue
            
            customcomingUpDataSupplementsObject.amount = supplemet[i]["amount"].stringValue
            
            customcomingUpDataSupplementsObject.workout =  supplemet[i]["criteria_main_name"].stringValue
            
            customcomingUpDataSupplementsObject.brand =  supplemet[i]["brand_name"].stringValue
            
            customcomingUpDataSupplementsObject.notes =  supplemet[i]["notes"].stringValue
            
            
            
            customcomingUpDataSupplements.append(customcomingUpDataSupplementsObject)
            
            
        }
        
        
        
        
        let foods = json["food"]
        print(foods)
        
        
        for i in 0 ..< foods.count
        {
            customcominUpDataFoodObject = CustomcominUpDataFood()
            
            customcominUpDataFoodObject.food_name = foods[i]["food_name"].stringValue
            print(customcominUpDataFoodObject.food_name)
            
            customcominUpDataFoodObject.time = foods[i]["time"].stringValue
            print(customcominUpDataFoodObject.time)
            
            customcominUpDataFoodObject.compliance = foods[i]["compliance"].stringValue
            print(customcominUpDataFoodObject.compliance)
            
            customcominUpDataFoodObject.timings_id = foods[i]["timings_id"].stringValue
            print(customcominUpDataFoodObject.timings_id)
            
            customcominUpDataFoodObject.type = foods[i]["type"].stringValue
            print(customcominUpDataFoodObject.type)
            
            customcominUpDataFoodObject.when = foods[i]["when"].stringValue
            print(customcominUpDataFoodObject.when)
            
            customcominUpDataFoodObject.compliance = foods[i]["compliance"].stringValue
            
            
            customcominUpDataFood.append(customcominUpDataFoodObject)
            
        }
        
        
        let lifeStyles = json["lifestyle"]
        print(lifeStyles)
        
        
        
        for i in 0 ..< lifeStyles.count
            
        {
            
            customcomingUpDataLifeStyleObject = CustomcomingUpDataLifeStyle()
            
            customcomingUpDataLifeStyleObject.compliance = lifeStyles[i]["compliance"].stringValue
            print(customcomingUpDataLifeStyleObject.compliance)
            
            customcomingUpDataLifeStyleObject.gap = lifeStyles[i]["gap"].stringValue
            print(customcomingUpDataLifeStyleObject.gap)
            
            customcomingUpDataLifeStyleObject.lifestyle_name = lifeStyles[i]["lifestyle_name"].stringValue
            print(customcomingUpDataLifeStyleObject.lifestyle_name)
            
            customcomingUpDataLifeStyleObject.time = lifeStyles[i]["time"].stringValue
            print(customcomingUpDataLifeStyleObject.time)
            
            customcomingUpDataLifeStyleObject.time1 = lifeStyles[i]["time1"].stringValue
            print(customcomingUpDataLifeStyleObject.time1)
            
            customcomingUpDataLifeStyleObject.timings_id = lifeStyles[i]["timings_id"].stringValue
            print(customcomingUpDataLifeStyleObject.timings_id)
            
            customcomingUpDataLifeStyleObject.type = lifeStyles[i]["type"].stringValue
            print(customcomingUpDataLifeStyleObject.type)
            
            customcomingUpDataLifeStyleObject.compliance = lifeStyles[i]["compliance"].stringValue
            customcomingUpDataLifeStyleObject.notes = lifeStyles[i]["notes"].stringValue
            
            customcomingUpDataLifeStyle.append(customcomingUpDataLifeStyleObject)
            
            
            
        }
        
        
        let others = json["others"]
        print(others)
        
        
        
        for i in 0..<others.count
        {
            customcominUpDataOthersObject = CustomcominUpDataOthers()
            
            customcominUpDataOthersObject.compliance = others[i]["compliance"].stringValue
            print(customcominUpDataOthersObject.compliance)
            
            customcominUpDataOthersObject.duration = others[i]["duration"].stringValue
            print(customcominUpDataOthersObject.duration)
            
            customcominUpDataOthersObject.others_name = others[i]["others_name"].stringValue
            print(customcominUpDataOthersObject.others_name)
            
            customcominUpDataOthersObject.time = others[i]["time"].stringValue
            print(customcominUpDataOthersObject.time)
            
            customcominUpDataOthersObject.timings_id = others[i]["timings_id"].stringValue
            print(customcominUpDataOthersObject.timings_id)
            
            customcominUpDataOthersObject.type = others[i]["type"].stringValue
            print(customcominUpDataOthersObject.type)
            
            customcominUpDataOthersObject.compliance = others[i]["compliance"].stringValue
            
            customcominUpDataOthers.append(customcominUpDataOthersObject)
            
        }
        
        let treatmentcount = json["treatment_count"][""]
        print(treatmentcount)
        
        self.workoutcnt = json["treatment_count"][""]["workout_count"].stringValue
        self.wcount = Int(self.self.workoutcnt)
       // self.WorkoutLabel.text = workoutcnt
        print("workoutcnt:\(workoutcnt)")
        self.workoutcnt = String(self.self.wcount)
        self.WorkoutLabel.text = self.workoutcnt
        
        self.supplementCount = json["treatment_count"][""]["supplement_count"].stringValue
        self.scount = Int(self.self.supplementCount)
       // self.SupplementsLabel.text = supplementCount
        print("supplementCount:\(supplementCount)")
        self.supplementCount = String(self.self.scount)
        self.SupplementsLabel.text = self.supplementCount
        
        self.lifestylecount = json["treatment_count"][""]["lifestyle_count"].stringValue
         self.lcount = Int(self.self.lifestylecount)
       // self.LifeStylelabel.text = lifestylecount
        print("lifestylecount:\(lifestylecount)")
        self.lifestylecount = String(self.self.lcount)
        self.LifeStylelabel.text = self.lifestylecount
        
        self.foodcount = json["treatment_count"][""]["food_count"].stringValue
        self.fcount = Int(self.self.foodcount)
        //self.FoodDronklabel.text = foodcount
        print("foodcount\(foodcount)")
        self.foodcount = String(self.self.fcount)
        self.FoodDronklabel.text = self.foodcount
        
        self.otherscount = json["treatment_count"][""]["others_count"].stringValue
        self.ocount = Int(self.self.otherscount)
      // self.OthersLabel.text = otherscount
        print("otherscount:\(otherscount)")
        self.otherscount = String(self.self.ocount)
        self.OthersLabel.text = self.otherscount
        
        activity.stopAnimating()
        activity.hidesWhenStopped = true
        Indicator.removeFromSuperview()
        
        self.CollectionUpcoming.reloadData()
        actInd.stopAnimating()
        var index: NSIndexPath!
        
        
        if CollectionUpcoming.numberOfItemsInSection(0) > 0{
        index = NSIndexPath(forRow: 0, inSection: 0)
        self.CollectionUpcoming.scrollToItemAtIndexPath(index, atScrollPosition: UICollectionViewScrollPosition.Top, animated: true)
        }
        else if CollectionUpcoming.numberOfItemsInSection(1) > 0{
            index = NSIndexPath(forRow: 0, inSection: 1)
            self.CollectionUpcoming.scrollToItemAtIndexPath(index, atScrollPosition: UICollectionViewScrollPosition.Top, animated: true)
        }
        else if CollectionUpcoming.numberOfItemsInSection(2) > 0{
            index = NSIndexPath(forRow: 0, inSection: 2)
            self.CollectionUpcoming.scrollToItemAtIndexPath(index, atScrollPosition: UICollectionViewScrollPosition.Top, animated: true)
        }
        else if CollectionUpcoming.numberOfItemsInSection(3) > 0{
            index = NSIndexPath(forRow: 0, inSection: 3)
            self.CollectionUpcoming.scrollToItemAtIndexPath(index, atScrollPosition: UICollectionViewScrollPosition.Top, animated: true)
        }
        else if CollectionUpcoming.numberOfItemsInSection(4) > 0{
            index = NSIndexPath(forRow: 0, inSection: 4)
            self.CollectionUpcoming.scrollToItemAtIndexPath(index, atScrollPosition: UICollectionViewScrollPosition.Top, animated: true)
        }
        
    }
//    func collectionView(collectionView: UICollectionView, layoutcollectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAtIndex section: Int) -> CGFloat {
//        return 1.0
//    }
//    
//    func collectionView(collectionView: UICollectionView, layoutcollectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAtIndex section: Int) -> CGFloat {
//        return 1.0
//    }
    
//    func extractTreatment(data:NSData)
//    {
//        let json = JSON(data: data)
//        print(json)
//        
//        
//        // workout_compliance
//        self.workout_compliance = json["workout_compliance"][0]["workout_compliance"].stringValue
//        print(workout_compliance)
//        
//        //"supplement_compliance"
//        
//        self.supplement_compliance = json["supplement_compliance"][0]["supplement_compliance"].stringValue
//        print(supplement_compliance)
//        
//        // "lifestyle_compliance"
//        
//        self.lifestyle_compliance = json["lifestyle_compliance"][0]["lifestyle_compliance"].stringValue
//        print(lifestyle_compliance)
//        
//        // "food_compliance"
//        
//        self.food_compliance = json["food_compliance"][0]["food_compliance"].stringValue
//        print(food_compliance)
//        
//        // "others_compliance"
//        
//        self.others_compliance = json["others_compliance"][0]["others_compliance"].stringValue
//        print(others_compliance)
//        
//        
//        
//        //  TREATMENT COUNT ARRAY FROM JSON
//        
//        let treatmentcount = json["treatment_count"][""]
//        print(treatmentcount)
//        self.workoutcnt = json["treatment_count"][""]["workout_count"].stringValue
//        self.WorkoutLabel.text = workoutcnt
//        print("workoutcnt:\(workoutcnt)")
//        self.supplementCount = json["treatment_count"][""]["supplement_count"].stringValue
//        self.SupplementsLabel.text = supplementCount
//        print("supplementCount:\(supplementCount)")
//        self.lifestylecount = json["treatment_count"][""]["lifestyle_count"].stringValue
//        self.LifeStylelabel.text = lifestylecount
//        print("lifestylecount:\(lifestylecount)")
//        self.foodcount = json["treatment_count"][""]["food_count"].stringValue
//        self.FoodDronklabel.text = foodcount
//        print("foodcount\(foodcount)")
//        self.otherscount = json["treatment_count"][""]["others_count"].stringValue
//        self.OthersLabel.text = otherscount
//        print("otherscount:\(otherscount)")
//        
//        // WORKOUT ARRAY FROM JSON
//        
//        let workoutarray = json["workout"].arrayValue
//        print(workoutarray)
//        
//        
//        workoutclassTypearray = [WorkOutdata]()
//        for i in 0..<workoutarray.count
//        {
//            print(i)
//            workoutclassObject = WorkOutdata()
//            
//            let workout_mapping_id = workoutarray[i]["workout_mapping_id"].stringValue
//            workoutclassObject.workout_mapping_id = workout_mapping_id
//            
//            let workout_name = workoutarray[i]["workout_name"].stringValue
//            workoutclassObject.workout_name = workout_name
//            
//            let reps = workoutarray[i]["reps"].stringValue
//            workoutclassObject.reps = reps
//            
//            let sets = workoutarray[i]["sets"].stringValue
//            workoutclassObject.sets = sets
//            
//            let weight = workoutarray[i]["weight"].stringValue
//            workoutclassObject.weight = weight
//            
//            workoutclassObject.timings_id = workoutarray[i]["timings_id"].stringValue
//            
//            // let compliance = workoutarray[i]["compliance"].stringValue
//            // workoutclassObject.complainces = compliance
//            let newCompliance = workoutarray[i]["compliance"].stringValue
//            let Intcomplaince = Double(newCompliance)
//            workoutclassObject.complainces = Int(Intcomplaince!)
//            
//            workoutclassTypearray.append(workoutclassObject)
//            
//        }
//        
//        
//        
//        // Supplement array From JSON
//        
//        let supplementArray = json["supplement"].arrayValue
//        print(supplementArray)
//        
//        SupplementDataTclassTypearray = [SupplementData]()
//        
//        for j in 0..<supplementArray.count
//        {
//            print(j)
//            supplementObject = SupplementData()
//            
//            let supplement_mapping_id = supplementArray[j]["supplement_mapping_id"].stringValue
//            supplementObject.supplement_mapping_id = supplement_mapping_id
//            
//            let supplement_name = supplementArray[j]["supplement_name"].stringValue
//            supplementObject.supplement_name = supplement_name
//            
//            let amount = supplementArray[j]["amount"].stringValue
//            supplementObject.amount = amount
//            
//            supplementObject.repitition = supplementArray[j]["repitition"].stringValue
//            
//            supplementObject.when_time = supplementArray[j]["when_time"].stringValue
//            
//            supplementObject.timings_id = supplementArray[j]["timings_id"].stringValue
//            
//            // supplementObject.compliance = supplementArray[j]["compliance"].stringValue
//            
//            let newCompliance = supplementArray[j]["compliance"].stringValue
//            let Intcomplaince = Double(newCompliance)
//            supplementObject.compliance = Int(Intcomplaince!)
//            
//            SupplementDataTclassTypearray.append(supplementObject)
//            
//            
//        }
//        
//        // Food array from JSON
//        
//        let foodArray = json["food"].arrayValue
//        print(foodArray)
//        
//        FoodDataclassTypearray = [FoodData]()
//        
//        for i in 0..<foodArray.count
//        {
//            print(i)
//            foodObject = FoodData()
//            
//            foodObject.food_mapping_id = foodArray[i]["food_mapping_id"].stringValue
//            foodObject.food_name = foodArray[i]["food_name"].stringValue
//            let newCompliance = foodArray[i]["compliance"].stringValue
//            let Intcomplaince = Double(newCompliance)
//            foodObject.compliance = Int(Intcomplaince!)
//            foodObject.timings_id = foodArray[i]["timings_id"].stringValue
//            
//            foodObject.when = foodArray[i]["when"].stringValue
//            
//            FoodDataclassTypearray.append(foodObject)
//        }
//        
//        
//        
//        // lifestyle array from JSON
//        
//        let lifestyleArray = json["lifestyle"].arrayValue
//        print(lifestyleArray)
//        
//        LifeStyleclassTypearray = [LifeStyle]()
//        
//        for i in 0..<lifestyleArray.count
//        {
//            print(i)
//            lifeStyleObject = LifeStyle()
//            
//            lifeStyleObject.lifestyle_mapping_id = lifestyleArray[i]["lifestyle_mapping_id"].stringValue
//            
//            lifeStyleObject.lifestyle_name = lifestyleArray[i]["lifestyle_name"].stringValue
//            
//            lifeStyleObject.repitition = lifestyleArray[i]["repitition"].stringValue
//            
//            lifeStyleObject.time = lifestyleArray[i]["time"].stringValue
//            
//            lifeStyleObject.when = lifestyleArray[i]["time"].stringValue
//            
//            lifeStyleObject.timings_id = lifestyleArray[i]["timings_id"].stringValue
//            
//            // lifeStyleObject.compliance = lifestyleArray[i]["compliance"].stringValue
//            let newCompliance = lifestyleArray[i]["compliance"].stringValue
//            let Intcomplaince = Double(newCompliance)
//            lifeStyleObject.compliance = Int(Intcomplaince!)
//            
//            LifeStyleclassTypearray.append(lifeStyleObject)
//        }
//        
//        
//        //  others array from JSON
//        
//        let othersArray = json["others"].arrayValue
//        print(othersArray)
//        
//        OthersclassTypearray = [Others]()
//        
//        for i in 0..<othersArray.count
//        {
//            print(i)
//            
//            othersObject = Others()
//            
//            othersObject.others_mapping_id = othersArray[i]["others_mapping_id"].stringValue
//            
//            othersObject.others_name = othersArray[i]["others_name"].stringValue
//            
//            // othersObject.compliance = othersArray[i]["compliance"].stringValue
//            
//            let newCompliance = othersArray[i]["compliance"].stringValue
//            othersObject.timings_id = othersArray[i]["timings_id"].stringValue
//            
//            let Intcomplaince = Double(newCompliance)
//            othersObject.compliance = Int(Intcomplaince!)
//            
//            othersObject.duration = othersArray[i]["duration"].stringValue
//            
//            OthersclassTypearray.append(othersObject)
//        }
//        
//        
//        // Overallcomplainces from JSON
//        
//        Overallcomplainces = json["overall_compliance"][0]["overall_compliance"].stringValue
//        
//       // Complainces.text = Overallcomplainces + " %"
//        //print(<#T##items: Any...##Any#>)
//         CollectionUpcoming.reloadData()
//      //  self.tableview.reloadData()
//        
//        
//    }
    
    
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
    
    func datePickerChanged(datePicker:UIDatePicker) {
        
        let dateFormatter = NSDateFormatter()
        datePicker.hidden = true
        pickerVisible = false
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
        
        let todaycomponents = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: today)
        let todayyear =  todaycomponents.year
        let todaymonth = todaycomponents.month
        let todayday = todaycomponents.day
        
        if todayyear == year && todaymonth == month && todayday == day{
            //self.navigationItem.title = "Today"
            self.DateChanger.text = "   TODAY"
            self.circuitDate = "\(todayyear)-\(todaymonth)-\(todayday)"
        }
        else{
            //self.navigationItem.title = "\(Weekdays[weekDay])-\(year)-\(month)-\(day)"
            self.DateChanger.text = "   \(Weekdays[weekDay])-\(year)-\(month)-\(day)"
            self.circuitDate = "\(year)-\(month)-\(day)"
        }
        //treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=1&dateid=2016-7-26")
       // treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
        //treatmentPlan("http://www.holbe.com/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
         treatmentPlan(baseURL + "patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
       
    }
    
    @IBAction func completedPressed(sender: UIButton)
    {
        let i = self.getIndex(sender.tag)
        let j = self.getSection(sender.tag)
        let indexarr = ["index":i, "section":j]
        
        if getSection(sender.tag) == 0{
            
         self.actInd.startAnimating()
         
        customcomingUpDataSupplements[i].compliance = "100"
        NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
       // let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
      //  let request = NSMutableURLRequest(URL: NSURL(string: "http://www.holbe.com/api/patient/updatecompliancenew.php")!)
        let request = NSMutableURLRequest(URL: NSURL(string: baseURL + "patient/updatecompliancenew.php")!)
        request.HTTPMethod = "POST"
        let postString = "id=\(getTimingsID(sender.tag))&completion=1"
        request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
        let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
            guard error == nil && data != nil else {                                                          // check for fundamental networking error
                print("error=\(error)")
                return
            }
            
            if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode == 200 {
                
              //  NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
                
            }
            
            else if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
                print("statusCode should be 200, but is \(httpStatus.statusCode)")
                print("response = \(response)")
              //  NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
                
            }
            
          
            
            let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
            print("responseString = \(responseString!)")
            
            
            print("Index:\(i)")
            
        }
        task.resume()
            customcomingUpDataSupplements.removeAtIndex(i)
            self.scount = self.scount - 1
            self.SupplementsLabel.text = String(self.scount)
            self.CollectionUpcoming.reloadData()
        
        }
        else if getSection(sender.tag) == 1{
            
            self.actInd.startAnimating()
            customcomingupData[i].compliance = "100"
            var postString = ""
           var request = NSMutableURLRequest(URL: NSURL(string: "")!)
           // var request = NSMutableURLRequest()
            NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
           // let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            
         let indexpath = NSIndexPath(forRow: getIndex(sender.tag), inSection: getSection(sender.tag))
     
            
        let cell =  collectionView(CollectionUpcoming, cellForItemAtIndexPath: indexpath) as! newcustomcollectionviewCell
            
         if (cell.datasrc.count > 1)
             {
                //request = NSMutableURLRequest(URL: NSURL(string: "http://www.holbe.com/api/patient/test/completecircuit.php")!)
                request = NSMutableURLRequest(URL: NSURL(string: baseURL + "patient/test/completecircuit.php")!)
                request.HTTPMethod = "POST"
              //  postString = "circuit_id=\(customcomingupObject.circuit_id)"
                
                print(DateChanger.text)
                print(circuitDate)
                print(date)
                postString = "circuit_id=\(customcomingupData[i].circuit_id)&date=\(self.circuitDate)"
                
                
             }
         else
             {
                //request = NSMutableURLRequest(URL: NSURL(string: "http://www.holbe.com/api/patient/updatecompliancenew.php")!)
                request = NSMutableURLRequest(URL: NSURL(string: baseURL + "patient/updatecompliancenew.php")!)
                request.HTTPMethod = "POST"
                      print(circuitDate)
                postString = "id=\(getTimingsID(sender.tag))&completion=1"
             }
           
     print("request")

            
            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
                guard error == nil && data != nil else {                                                          // check for fundamental networking error
                    print("error=\(error)")
                    return
                }
                
                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode == 200 {
                   
                   // NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
                    
                }
                
                else if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
                    print("response = \(response)")
                   // NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
                    
                }
                
                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("responseString = \(responseString!)")
//                let i = self.getIndex(sender.tag)
//                let j = self.getSection(sender.tag)
//                
//                print("Index:\(i)")
//                customcomingupData[i].compliance = "100"
//                let indexarr = ["index":i, "section":j]
//                NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
                
            }
            task.resume()
            customcomingupData.removeAtIndex(i)
            self.wcount = self.wcount - cell.datasrc.count
            self.WorkoutLabel.text = String(self.wcount)
            self.CollectionUpcoming.reloadData()
            
        }
        else if getSection(sender.tag) == 2{
            self.actInd.startAnimating()
            customcomingUpDataLifeStyle[i].compliance = "100"
          NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
            //let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            //let request = NSMutableURLRequest(URL: NSURL(string: "http://www.holbe.com/api/patient/updatecompliancenew.php")!)
            let request = NSMutableURLRequest(URL: NSURL(string: baseURL + "patient/updatecompliancenew.php")!)
            request.HTTPMethod = "POST"
            let postString = "id=\(getTimingsID(sender.tag))&completion=1"
            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
                guard error == nil && data != nil else {                                                          // check for fundamental networking error
                    print("error=\(error)")
                    return
                }
                
                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode == 200 {           // check for http errors
                    
                   // NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
                    
                }
                
                else if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
                    print("response = \(response)")
                   // NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
                    
                }
                
                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("responseString = \(responseString!)")
                
                
            }
            task.resume()
            customcomingUpDataLifeStyle.removeAtIndex(i)
            self.lcount = self.lcount - 1
            self.LifeStylelabel.text = String(self.lcount)
            self.CollectionUpcoming.reloadData()
            
        }
        else if getSection(sender.tag) == 3{
            self.actInd.startAnimating()
            customcominUpDataFood[i].compliance = "100"
            NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
            //let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            //let request = NSMutableURLRequest(URL: NSURL(string: "http://www.holbe.com/api/patient/updatecompliancenew.php")!)
            let request = NSMutableURLRequest(URL: NSURL(string: baseURL + "patient/updatecompliancenew.php")!)
            request.HTTPMethod = "POST"
            let postString = "id=\(getTimingsID(sender.tag))&completion=1"
            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
                guard error == nil && data != nil else {                                                          // check for fundamental networking error
                    print("error=\(error)")
                    return
                }
                
                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode == 200 {           // check for http errors
                    
                   // NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
                    
                }
                
                else if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
                    print("response = \(response)")
                   // NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
                    
                }
                
                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("responseString = \(responseString!)")
                
                
            }
            task.resume()
            customcominUpDataFood.removeAtIndex(i)
            self.fcount = self.fcount - 1
            self.FoodDronklabel.text = String(self.fcount)
            self.CollectionUpcoming.reloadData()
            
        }
        else {
            self.actInd.startAnimating()
            customcominUpDataOthers[i].compliance = "100"
            NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
           // let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            //let request = NSMutableURLRequest(URL: NSURL(string: "http://www.holbe.com/api/patient/updatecompliancenew.php")!)
            let request = NSMutableURLRequest(URL: NSURL(string: baseURL + "patient/updatecompliancenew.php")!)
            request.HTTPMethod = "POST"
            let postString = "id=\(getTimingsID(sender.tag))&completion=1"
            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
                guard error == nil && data != nil else {                                                          // check for fundamental networking error
                    print("error=\(error)")
                    return
                }
                
                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode == 200 {           // check for http errors
                   
                    
                  //  NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
                }
                
                else if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
                    print("response = \(response)")
                   // NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
                    
                }
                
                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("responseString = \(responseString!)")
                
            }
            task.resume()
            customcominUpDataOthers.removeAtIndex(i)
            self.ocount = self.ocount - 1
            self.OthersLabel.text = String(self.ocount)
            self.CollectionUpcoming.reloadData()
            
        }
//        if sender.tag == 0
//
//        {
//            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
//            request.HTTPMethod = "POST"
//            let postString = "id=\(customcomingUpDataSupplements[sender.tag].timings_id)&completion=1"
//            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
//            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
//                guard error == nil && data != nil else {                                                          // check for fundamental networking error
//                    print("error=\(error)")
//                    return
//                }
//                
//                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
//                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
//                    print("response = \(response)")
//                }
//                
//                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
//                print("responseString = \(responseString)")
//            }
//            task.resume()
//        }
//            
//        else if sender.tag == 1
//        {
//            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
//            request.HTTPMethod = "POST"
//            let postString = "id=\(customcomingupData[sender.tag].timings_id)&completion=1"
//            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
//            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
//                guard error == nil && data != nil else {                                                          // check for fundamental networking error
//                    print("error=\(error)")
//                    return
//                }
//                
//                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
//                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
//                    print("response = \(response)")
//                }
//                
//                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
//                print("responseString = \(responseString)")
//            }
//            task.resume()
//        }
//            
//        else if sender.tag == 2
//        {
//            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
//            request.HTTPMethod = "POST"
//            let postString = "id=\(customcomingUpDataLifeStyle[sender.tag].timings_id)&completion=1"
//            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
//            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
//                guard error == nil && data != nil else {                                                          // check for fundamental networking error
//                    print("error=\(error)")
//                    return
//                }
//                
//                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
//                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
//                    print("response = \(response)")
//                }
//                
//                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
//                print("responseString = \(responseString)")
//            }
//            task.resume()
//        }
//            
//        else if sender.tag == 3
//        {
//            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
//            request.HTTPMethod = "POST"
//            let postString = "id=\(customcominUpDataFood[sender.tag].timings_id)&completion=1"
//            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
//            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
//                guard error == nil && data != nil else {                                                          // check for fundamental networking error
//                    print("error=\(error)")
//                    return
//                }
//                
//                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
//                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
//                    print("response = \(response)")
//                }
//                
//                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
//                print("responseString = \(responseString)")
//            }
//            task.resume()
//        }
//            
//        else if sender.tag == 4
//        {
//            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
//            request.HTTPMethod = "POST"
//            let postString = "id=\(customcominUpDataOthers[sender.tag].timings_id)&completion=1"
//            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
//            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
//                guard error == nil && data != nil else {                                                          // check for fundamental networking error
//                    print("error=\(error)")
//                    return
//                }
//                
//                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
//                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
//                    print("response = \(response)")
//                }
//                
//                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
//                print("responseString = \(responseString)")
//            }
//            task.resume()
//        }
        
    }
    
    
    
    
    @IBAction func partialPressed(sender: UIButton)
    {
        let i = self.getIndex(sender.tag)
        let j = self.getSection(sender.tag)
        let indexarr = ["index":i, "section":j]
        
        
        fetchRow = self.getIndex(sender.tag)
        fetchSection = self.getSection(sender.tag)
        
        if getSection(sender.tag) == 0
        {
//            // print(sender.tag)
//            
//             self.actInd.startAnimating()
//            customcomingUpDataSupplements[self.getIndex(sender.tag)].compliance = "50"
//            NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
//            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
//            request.HTTPMethod = "POST"
//            let postString = "id=\(getTimingsID(sender.tag))&completion=0.5"
//            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
//            
//            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
//                guard error == nil && data != nil else {                                                          // check for fundamental networking error
//                    print("error=\(error)")
//                    return
//                }
//                
//                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200
//                {           // check for http errors
//                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
//                    print("response = \(response)")
//                    
//                }
//                
//                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
//                print("responseString = \(responseString!)")
//                print("Index:\(self.getIndex(sender.tag))")
//                
//               //NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil)
//            }
//            task.resume()
        
         
        let arr = getArray(sender.tag)
        segueboolean = true
        performSegueWithIdentifier("partialSupplement", sender: arr)
        
        }
        else if getSection(sender.tag) == 1
        {
            let arr = getArray(sender.tag)
            segueboolean = true
            performSegueWithIdentifier("PartialPopup", sender: arr)
//            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
//            request.HTTPMethod = "POST"
//            let postString = "id=\(customcomingupData[sender.tag].timings_id)&completion=1"
//            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
//            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
//                guard error == nil && data != nil else {                                                          // check for fundamental networking error
//                    print("error=\(error)")
//                    return
//                }
//                
//                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
//                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
//                    print("response = \(response)")
//                }
//                
//                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
//                print("responseString = \(responseString)")
//            }
//            task.resume()
            
            
            
        }
            
        else if getSection(sender.tag) == 2
        {
            let arr = getArray(sender.tag)
            segueboolean = true
            performSegueWithIdentifier("FoodLifestyle", sender: arr)
            
//            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
//            request.HTTPMethod = "POST"
//            let postString = "id=\(getTimingsID(sender.tag))&completion=0.5"
//            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
//            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
//                guard error == nil && data != nil else {                                                          // check for fundamental networking error
//                    print("error=\(error)")
//                    return
//                }
//                
//                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
//                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
//                    print("response = \(response)")
//                }
//                
//                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
//                print("responseString = \(responseString)")
//            }
//            task.resume()
        }
            
        else if getSection(sender.tag) == 3
        {
            let arr = getArray(sender.tag)
            segueboolean = true
            performSegueWithIdentifier("Food", sender: arr)
//            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
//            request.HTTPMethod = "POST"
//            let postString = "id=\(getTimingsID(sender.tag))&completion=0.5"
//            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
//            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
//                guard error == nil && data != nil else {                                                          // check for fundamental networking error
//                    print("error=\(error)")
//                    return
//                }
//                
//                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
//                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
//                    print("response = \(response)")
//                }
//                
//                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
//                print("responseString = \(responseString)")
//            }
//            task.resume()
        }
            
        else if getSection(sender.tag) == 4
        {
            let arr = getArray(sender.tag)
            segueboolean = true
            performSegueWithIdentifier("Others", sender: arr)
//            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
//            request.HTTPMethod = "POST"
//            let postString = "id=\(getTimingsID(sender.tag))&completion=0.5"
//            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
//            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
//                guard error == nil && data != nil else {                                                          // check for fundamental networking error
//                    print("error=\(error)")
//                    return
//                }
//                
//                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
//                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
//                    print("response = \(response)")
//                }
//                
//                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
//                print("responseString = \(responseString)")
//            }
//            task.resume()
        }
        
    }
//    
//   func scrollViewDidEndDecelerating(scrollView: UIScrollView) {
////        
//////        let dateFormatter = NSDateFormatter()
//////        
//////        dateFormatter.dateStyle = NSDateFormatterStyle.ShortStyle
//////        //dateFormatter.timeStyle = NSDateFormatterStyle.ShortStyle
//////        var strDate = dateFormatter.stringFromDate(datePicker.date)
//////        //dateLabel.text = strDate
//////        date = datePicker.date
//////        calendar = NSCalendar.currentCalendar()
//////        let components = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: datePicker.date)
//////        let year =  components.year
//////        let month = components.month
//////        let day = components.day
//////        let weekDay = components.weekday
//////        
//////        if (scrollView.contentOffset.y >= (scrollView.contentSize.height - scrollView.frame.size.height)) {
//////            
//////            DateChanger.text =  "\(Weekdays[weekDay])-\(year)-\(month)-\(day)"
//////            //treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=1&dateid=2016-7-27")
//////            treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
//////            scrollView.scrollsToTop = true
//////        }
//////        
//////        if (scrollView.contentOffset.y <= 0){
//////            
//////            DateChanger.text =  "\(Weekdays[weekDay])-\(year)-\(month)-\(day)"
//////            //treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=1&dateid=2016-7-26")
//////            treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
//////            scrollView.scrollsToTop = true
//////        }
////       
////        if (scrollView.contentOffset.y <= 0){
////            date = calendar.dateByAddingUnit(
////                .Day,
////                value: -1,
////                toDate: date,
////                options: NSCalendarOptions(rawValue: 0))!
////            let components = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: date)
////            let year =  components.year
////            let month = components.month
////            let day = components.day
////            let weekDay = components.weekday
////            
////            let todaycomponents = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: today)
////            let todayyear =  todaycomponents.year
////            let todaymonth = todaycomponents.month
////            let todayday = todaycomponents.day
////            
////            if todayyear == year && todaymonth == month && todayday == day{
////               // self.navigationItem.title = "Today"
////                self.DateChanger.text = "   TODAY"
////            }
////            else{
////               // self.navigationItem.title = "\(Weekdays[weekDay])-\(year)-\(month)-\(day)"
////                self.DateChanger.text = "   \(Weekdays[weekDay])-\(year)-\(month)-\(day)"
////            }
////            //treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=1&dateid=2016-7-26")
////            //treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
////            treatmentPlan("http://www.holbe.com/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
////        }
////         if scrollView.contentOffset.y >= (scrollView.contentSize.height - scrollView.frame.size.height){
////            date = calendar.dateByAddingUnit(
////                .Day,
////                value: 1,
////                toDate: date,
////                options: NSCalendarOptions(rawValue: 0))!
////            let components = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: date)
////            let year =  components.year
////            let month = components.month
////            let day = components.day
////            let weekDay = components.weekday
////            
////            let todaycomponents = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: today)
////            let todayyear =  todaycomponents.year
////            let todaymonth = todaycomponents.month
////            let todayday = todaycomponents.day
////            
////            if todayyear == year && todaymonth == month && todayday == day{
////               // self.navigationItem.title = "Today"
////                self.DateChanger.text = "   TODAY"
////            }
////            else{
////                //self.navigationItem.title = "\(Weekdays[weekDay])-\(year)-\(month)-\(day)"
////                self.DateChanger.text = "   \(Weekdays[weekDay])-\(year)-\(month)-\(day)"
////            }
////            //treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=1&dateid=2016-7-26")
////            //self.treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
////            self.treatmentPlan("http://www.holbe.com/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
////
////        }
////            
////        
////        
//    
//    
//       
//   }
//    
//    
//    func refresh(sender:AnyObject?) {
//       
//        
////        
////        if (scrollView.contentOffset.y <= 0){
////            date = calendar.dateByAddingUnit(
////                .Day,
////                value: -1,
////                toDate: date,
////                options: NSCalendarOptions(rawValue: 0))!
////            let components = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: date)
////            let year =  components.year
////            let month = components.month
////            let day = components.day
////            let weekDay = components.weekday
////            
////            let todaycomponents = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: today)
////            let todayyear =  todaycomponents.year
////            let todaymonth = todaycomponents.month
////            let todayday = todaycomponents.day
////            
////            if todayyear == year && todaymonth == month && todayday == day{
////                // self.navigationItem.title = "Today"
////                self.DateChanger.text = "   TODAY"
////            }
////            else{
////                // self.navigationItem.title = "\(Weekdays[weekDay])-\(year)-\(month)-\(day)"
////                self.DateChanger.text = "   \(Weekdays[weekDay])-\(year)-\(month)-\(day)"
////            }
////            //treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=1&dateid=2016-7-26")
////            //treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
////            treatmentPlan("http://www.holbe.com/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
////        }
//        //if scrollView.contentOffset.y >= (scrollView.contentSize.height - scrollView.frame.size.height){
//            date = calendar.dateByAddingUnit(
//                .Day,
//                value: 1,
//                toDate: date,
//                options: NSCalendarOptions(rawValue: 0))!
//            let components = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: date)
//            let year =  components.year
//            let month = components.month
//            let day = components.day
//            let weekDay = components.weekday
//            
//            let todaycomponents = calendar.components([.Day , .Month , .Year, .Weekday], fromDate: today)
//            let todayyear =  todaycomponents.year
//            let todaymonth = todaycomponents.month
//            let todayday = todaycomponents.day
//            
//            if todayyear == year && todaymonth == month && todayday == day{
//                // self.navigationItem.title = "Today"
//                self.DateChanger.text = "   TODAY"
//            }
//            else{
//                //self.navigationItem.title = "\(Weekdays[weekDay])-\(year)-\(month)-\(day)"
//                self.DateChanger.text = "   \(Weekdays[weekDay])-\(year)-\(month)-\(day)"
//            }
//            //treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=1&dateid=2016-7-26")
//            //self.treatmentPlan("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
//            self.treatmentPlan("http://www.holbe.com/api/patient/test/get_coming_up.php?id=\(usrid)&dateid=\(year)-\(month)-\(day)")
//        
//        CollectionUpcoming.reloadData()
//        refreshControl.endRefreshing()
//            
//        //}
//
//    }
    
    func collectionView(collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAtIndexPath indexPath: NSIndexPath) -> CGSize {
        
        if indexPath.section == 0
        {
            //return CGSize(width: , height: (105 + 70))
            return CGSize(width: collectionView.bounds.size.width, height: CGFloat(175.0))
        }
            
        else if indexPath.section == 1
        {
            let va = CGFloat(105.0 + 70.0 * CGFloat(customcomingupData[indexPath.row].workout_name.count))
            return CGSize(width: collectionView.bounds.size.width, height: va)
        }
            
        else if indexPath.section == 2
        {
            return CGSize(width: collectionView.bounds.size.width, height: CGFloat(175.0))
        }
            
        else if indexPath.section == 3
        {
            return CGSize(width: collectionView.bounds.size.width, height: CGFloat(175.0))
        }
        else
        {
            return CGSize(width: collectionView.bounds.size.width, height: CGFloat(175.0))
        }
    }
    
    /*
     func collectionView(collectionView: UICollectionView,
     layout collectionViewLayout: UICollectionViewLayout,
     sizeForItemAtIndexPath indexPath: NSIndexPath) -> CGSize {
     let kWhateverHeightYouWant = 100
     return CGSizeMake(collectionView.bounds.size.width, CGFloat(kWhateverHeightYouWant))
     }
 */

    /*var customcomingupData = [CustomcomingupDataWorkOut]()
     var customcomingupObject = CustomcomingupDataWorkOut()
     
     
     
     // Supplement array and object
     
     var customcomingUpDataSupplements = [CustomcomingUpDataSupplements]()
     var customcomingUpDataSupplementsObject = CustomcomingUpDataSupplements()
     
     
     // Food Array and Object
     
     var customcominUpDataFood = [CustomcominUpDataFood]()
     var customcominUpDataFoodObject = CustomcominUpDataFood()
     
     // LifeStyle Array and Object
     
     var customcomingUpDataLifeStyle = [CustomcomingUpDataLifeStyle]()
     var customcomingUpDataLifeStyleObject = CustomcomingUpDataLifeStyle()
     
     // Others Array and Object
     
     var customcominUpDataOthers = [CustomcominUpDataOthers]()
     var customcominUpDataOthersObject = CustomcominUpDataOthers()
     */
    
    
    
    @IBAction func toplbl(sender: UIButton){
       
        let i = self.getIndex(sender.tag)
        let j = self.getSection(sender.tag)
        let indexarr = ["index":i, "section":j]
        
        fetchRow = self.getIndex(sender.tag)
        fetchSection = self.getSection(sender.tag)
        
        if getSection(sender.tag) == 0
        {
            //            // print(sender.tag)
            //
            //             self.actInd.startAnimating()
            //            customcomingUpDataSupplements[self.getIndex(sender.tag)].compliance = "50"
            //            NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil, userInfo: indexarr)
            //            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            //            request.HTTPMethod = "POST"
            //            let postString = "id=\(getTimingsID(sender.tag))&completion=0.5"
            //            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            //
            //            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
            //                guard error == nil && data != nil else {                                                          // check for fundamental networking error
            //                    print("error=\(error)")
            //                    return
            //                }
            //
            //                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200
            //                {           // check for http errors
            //                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
            //                    print("response = \(response)")
            //
            //                }
            //
            //                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
            //                print("responseString = \(responseString!)")
            //                print("Index:\(self.getIndex(sender.tag))")
            //
            //               //NSNotificationCenter.defaultCenter().postNotificationName("Completion", object: nil)
            //            }
            //            task.resume()
            
            let arr = getArray(sender.tag)
            segueboolean = false
            performSegueWithIdentifier("partialSupplement", sender: arr)
           
            
        
            
            
        }
        else if getSection(sender.tag) == 1
        {
            let arr = getArray(sender.tag)
            segueboolean =  false
            performSegueWithIdentifier("PartialPopup", sender: arr)
            //            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            //            request.HTTPMethod = "POST"
            //            let postString = "id=\(customcomingupData[sender.tag].timings_id)&completion=1"
            //            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            //            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
            //                guard error == nil && data != nil else {                                                          // check for fundamental networking error
            //                    print("error=\(error)")
            //                    return
            //                }
            //
            //                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
            //                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
            //                    print("response = \(response)")
            //                }
            //
            //                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
            //                print("responseString = \(responseString)")
            //            }
            //            task.resume()
            
            
            
        }
            
        else if getSection(sender.tag) == 2
        {
            let arr = getArray(sender.tag)
            segueboolean = false
            performSegueWithIdentifier("FoodLifestyle", sender: arr)
            
            //            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            //            request.HTTPMethod = "POST"
            //            let postString = "id=\(getTimingsID(sender.tag))&completion=0.5"
            //            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            //            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
            //                guard error == nil && data != nil else {                                                          // check for fundamental networking error
            //                    print("error=\(error)")
            //                    return
            //                }
            //
            //                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
            //                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
            //                    print("response = \(response)")
            //                }
            //
            //                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
            //                print("responseString = \(responseString)")
            //            }
            //            task.resume()
        }
            
        else if getSection(sender.tag) == 3
        {
            let arr = getArray(sender.tag)
            segueboolean = false
            performSegueWithIdentifier("Food", sender: arr)
            //            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            //            request.HTTPMethod = "POST"
            //            let postString = "id=\(getTimingsID(sender.tag))&completion=0.5"
            //            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            //            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
            //                guard error == nil && data != nil else {                                                          // check for fundamental networking error
            //                    print("error=\(error)")
            //                    return
            //                }
            //
            //                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
            //                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
            //                    print("response = \(response)")
            //                }
            //
            //                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
            //                print("responseString = \(responseString)")
            //            }
            //            task.resume()
        }
            
        else if getSection(sender.tag) == 4
        {
            let arr = getArray(sender.tag)
            segueboolean = false
            performSegueWithIdentifier("Others", sender: arr)
            //            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            //            request.HTTPMethod = "POST"
            //            let postString = "id=\(getTimingsID(sender.tag))&completion=0.5"
            //            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            //            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
            //                guard error == nil && data != nil else {                                                          // check for fundamental networking error
            //                    print("error=\(error)")
            //                    return
            //                }
            //                
            //                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
            //                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
            //                    print("response = \(response)")
            //                }
            //                
            //                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
            //                print("responseString = \(responseString)")
            //            }
            //            task.resume()
        }
        
    }
    
    

}






