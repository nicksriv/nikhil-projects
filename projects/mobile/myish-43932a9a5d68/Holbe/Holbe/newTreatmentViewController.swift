//
//  newTreatmentViewController.swift
//  Holbe
//
//  Created by Appsriv Technologies on 22/07/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
// Workout array and object

//



//var activityView: UIActivityIndicatorView = UIActivityIndicatorView(activityIndicatorStyle: .WhiteLarge)

import UIKit


var Indicator = UIView()
var pleasewaitLabel = UILabel()
var activity:UIActivityIndicatorView = UIActivityIndicatorView(frame: CGRectMake(40,-20, 100, 100)) as UIActivityIndicatorView


@IBDesignable class newTreatmentViewController: UIViewController,UITableViewDataSource,UITableViewDelegate
{
    
    
    @IBOutlet weak var supplementLabel: UILabel!
    @IBOutlet weak var workoutLabel: UILabel!
    @IBOutlet weak var lifestyleLabel: UILabel!
    @IBOutlet weak var foodanddrinksLabel: UILabel!
    @IBOutlet weak var othersLabel: UILabel!
   
    @IBOutlet weak var tableView: UITableView!
    

    
    
   
    override func viewDidLoad()
    {
        Indicator = UIView(frame: CGRectMake(0,60,180,100))
        Indicator.backgroundColor = UIColor(red: 56, green: 56, blue: 56)
        Indicator.layer.cornerRadius = 10
        Indicator.center = self.view.center
        view.addSubview(Indicator)
        pleasewaitLabel = UILabel(frame: CGRectMake(45,15, 150, 100))
        pleasewaitLabel.text = "Please Wait..."
        pleasewaitLabel.textColor = UIColor.whiteColor()
        Indicator.addSubview(pleasewaitLabel)
        activity.color = UIColor.whiteColor()
        activity.startAnimating()
        activity.hidesWhenStopped = true
        Indicator.addSubview(activity)

        self.tableView.dataSource = self
        self.tableView.delegate = self
        // API call
        
  
        
        
        self.supplementLabel.layer.cornerRadius = 10
        self.supplementLabel.layer.masksToBounds = true
        self.workoutLabel.layer.cornerRadius = 10
        self.workoutLabel.layer.masksToBounds = true
        self.lifestyleLabel.layer.cornerRadius = 10
        self.lifestyleLabel.layer.masksToBounds = true
        self.foodanddrinksLabel.layer.cornerRadius = 10
        self.foodanddrinksLabel.layer.masksToBounds = true
        self.othersLabel.layer.cornerRadius = 10
        self.othersLabel.layer.masksToBounds = true
        
        
       

    }
    
    
    // Tableview delegates
    

    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int
    {
       
        return 5
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell
    {
        let cell = tableView.dequeueReusableCellWithIdentifier("Cell", forIndexPath: indexPath) as! CustomTableViewCellComingUpScreen
        print(indexPath.row)
         cell.collectionView.tag = indexPath.row
       // cell.collectionView.reloadData()
        return cell
    }
    
    func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        if indexPath.row == 0
        {
            return 200 * 4 + 30
        }
        else if indexPath.row == 1
        {
            return 350
        }
        else if indexPath.row == 2
        {
           return 200
        }
        else if indexPath.row == 3
        {
            return 200
        }
        else
        {
            return 200
        }
        
    }
    
    override func viewWillAppear(animated: Bool)
    {

        self.navigationController?.navigationBar.tintColor = UIColor.lightGrayColor()
        self.navigationController?.navigationItem.title = "Your Treatment Plan"
        self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName :UIColor.lightGrayColor()]
        self.navigationController?.navigationItem.setHidesBackButton(true, animated: false)
    }
    
    
       

}


//extension newTreatmentViewController: UICollectionViewDelegate, UICollectionViewDataSource
//{
//    func collectionView(collectionView: UICollectionView,numberOfItemsInSection section: Int) -> Int
//    {
//        
//        return 1
//    }
//    
//    func collectionView(collectionView: UICollectionView,cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell
//    {
//        
//        let cell = collectionView.dequeueReusableCellWithReuseIdentifier("Cell",forIndexPath: indexPath)
//        if indexPath.section == 0
//        {
//            print(indexPath.section)
//            
//        }
//            
//        else if indexPath.section == 1
//        {
//            print(indexPath.section)
//        }
//        
//        
//        
//        // cell.backgroundColor = model[collectionView.tag][indexPath.item]
//        
//        return cell
//    }
//}
