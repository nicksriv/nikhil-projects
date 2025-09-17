//
//  CustomTableViewCellComingUpScreen.swift
//  Holbe
//
//  Created by Appsriv Technologies on 26/07/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.


//

import UIKit

class CustomTableViewCellComingUpScreen: UITableViewCell,UICollectionViewDelegate,UICollectionViewDataSource

{
    
    
    var images = ["Supplements","workouts","lifestyles","food-&-Drinks","others"]

    @IBOutlet weak var collectionView: UICollectionView!
    
    
    override func awakeFromNib()
    {
        super.awakeFromNib()
          getCustomcomingupData("http://192.185.26.69/~holbe/api/patient/test/get_coming_up.php?id=1&dateid=2016-06-26")
        collectionView.delegate = self
        collectionView.dataSource = self
        //collectionView.reloadData()
  
   
    }
    
    func getCustomcomingupData(urlString:String)
    {
        let url = NSURL(string: urlString)
        let session = NSURLSession.sharedSession()
        session.dataTaskWithURL(url!) { (data:NSData?, response:NSURLResponse?, error:NSError?) in
            
            if data != nil && error == nil
            {
                dispatch_async(dispatch_get_main_queue(), {
                    
                    self.Extarctdata(data!)
                })
            }
            
            }.resume()
        
        
        
    }
    
    
    func Extarctdata(data:NSData)
    {
        let json = JSON(data: data)
        print(json)
        
        
        
        // Workout Array and data object
        
        let workout = json["workout"]
        print(workout)
        
        customcomingupData = [CustomcomingupDataWorkOut]()
        
        for i in 0 ..< workout.count
        {
//            customcomingupObject = CustomcomingupDataWorkOut()
//            
//            customcomingupObject.circuit_id = workout[i]["circuit_id"].stringValue
//            print(customcomingupObject.circuit_id)
//            
//            customcomingupObject.reps = workout[i]["reps"].stringValue
//            print(customcomingupObject.reps)
//            
//            customcomingupObject.sets = workout[i]["sets"].stringValue
//            print(customcomingupObject.sets)
//            
//            customcomingupObject.timings_id = workout[i]["timings_id"].stringValue
//            print(customcomingupObject.timings_id)
//            
//            customcomingupObject.type = workout[i]["type"].stringValue
//            print(customcomingupObject.type)
//            
//            customcomingupObject.workout_name = workout[i]["workout_name"].stringValue
//            print(customcomingupObject.workout_name)
//            
//            customcomingupObject.time = workout[i]["time"].stringValue
//            
//            customcomingupData.append(customcomingupObject)
        }
        
        
        
        // Supplemet Array and data
        
        let supplemet = json["supplement"]
        print(supplemet)
        
        
        customcomingUpDataSupplements = [CustomcomingUpDataSupplements]()
        
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
            
            customcomingUpDataSupplementsObject.dosage_main_name = supplemet[i]["dosage_main_name"].stringValue
            print(customcomingUpDataSupplementsObject.dosage_main_name)
            
            customcomingUpDataSupplementsObject.form_main_name = supplemet[i]["form_main_name"].stringValue
            print(customcomingUpDataSupplementsObject.form_main_name)
            
            customcomingUpDataSupplementsObject.supplementName = supplemet[i]["supplement_name"].stringValue
            
            customcomingUpDataSupplements.append(customcomingUpDataSupplementsObject)
            
            
        }
        
        
        customcominUpDataFood = [CustomcominUpDataFood]()
        
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
            
            customcominUpDataFood.append(customcominUpDataFoodObject)
            
        }
        
        
        let lifeStyles = json["lifestyle"]
        print(lifeStyles)
        
        customcomingUpDataLifeStyle = [CustomcomingUpDataLifeStyle]()
        
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
            
            customcomingUpDataLifeStyleObject.timings_id = lifeStyles[i]["timings_id"].stringValue
            print(customcomingUpDataLifeStyleObject.timings_id)
            
            customcomingUpDataLifeStyleObject.type = lifeStyles[i]["type"].stringValue
            print(customcomingUpDataLifeStyleObject.type)
            
            customcomingUpDataLifeStyle.append(customcomingUpDataLifeStyleObject)
            
            
            
        }
        
        
        let others = json["others"]
        print(others)
        
        customcominUpDataOthers = [CustomcominUpDataOthers]()
        
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
            
            customcominUpDataOthers.append(customcominUpDataOthersObject)
            
        }
        
        activity.stopAnimating()
        activity.hidesWhenStopped = true
        Indicator.removeFromSuperview()
        
        self.collectionView.reloadData()
        
    }


    
    
    func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int
    {
        //self.collectionView.reloadData()
        if collectionView.tag == 0
        {
//            self.collectionView.reloadData()
//            return customcomingUpDataSupplements.count
          return customcomingUpDataSupplements.count
            
        }
        
        else if collectionView.tag == 1
        {
            
            
            
            return customcomingupData.count
        }
        
        else if collectionView.tag == 2
        {
            return customcomingUpDataLifeStyle.count
            //return 1
        }
        
        else if collectionView.tag == 3
        {
            return customcominUpDataFood.count
           //return  1
        }
        else
        {
            return customcominUpDataOthers.count
            //return 1
        }
        
        
       //return 1
        
        
        
    }
    
    func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCellWithReuseIdentifier("collecionCell", forIndexPath: indexPath) as! newcustomcollectionviewCell
        
       // self.collectionView.reloadData()
        
        if collectionView.tag == 0
        {
            var dts:[String] = [String]()
            var dtsv:[String] = [String]()
            for var i=0; i<customcomingUpDataSupplements.count; i=i+1{
                dts.append(customcomingUpDataSupplements[i].supplementName)
                dtsv.append(customcomingUpDataSupplements[i].dosage_main_name)
            }
            
            cell.datasrc = dts
            cell.datasrcv = dtsv
            
                cell.workoutLabel.text = customcomingUpDataSupplements[indexPath.row].type
                cell.timingLabel.text  = customcomingUpDataSupplements[indexPath.row].time
                //cell.workoutName1.text = customcomingUpDataSupplements[indexPath.row].form_main_name
                //cell.workoutSubName1.text = customcomingUpDataSupplements[indexPath.row].dosage_main_name
                cell.workoutImage.image = UIImage(named: "Supplements")
                cell.workoutView.backgroundColor = UIColor(red: 186, green: 214, blue: 93)
                //cell.workoutName2.hidden = true
                //cell.workoutName3.hidden = true
                //cell.workoutName4.hidden = true
                //cell.workoutSubName2.hidden = true
                //cell.workoutSubName3.hidden = true
                //cell.workoutSubName4.hidden = true
                cell.completedButton.tag = indexPath.row
                cell.partialButton.tag = indexPath.row
          //  }
            
            //cell.workoutLabel.text = customcomingUpDataSupplementsObject.type
 
            
            


            
        }
        else if collectionView.tag == 1
        {
            
            
            var dts:[String] = [String]()
            var dtsv:[String] = [String]()
//            for var i=0; i<customcomingupData.count; i=i+1{
//                dts.append(customcomingupData[i].workout_name)
//                dtsv.append(customcomingupData[i].reps + " Reps of " + customcomingupData[i].sets + " sets")
//            }
//            
//            cell.datasrc = dts
//            cell.datasrcv = dtsv
//            
//                cell.workoutLabel.text = customcomingupData[indexPath.row].type
                cell.timingLabel.text  = customcomingupData[indexPath.row].time
                //cell.workoutName1.text = customcomingupData[indexPath.row].workout_name
                //cell.workoutSubName1.text = customcomingupData[indexPath.row].reps + " Reps of " + customcomingupData[indexPath.row].sets + " sets"
                //cell.workoutName2.text = customcomingupData[indexPath.row].workout_name
                //cell.workoutSubName2.text = customcomingupData[indexPath.row].reps + " Reps of " + customcomingupData[indexPath.row].sets + " sets"
                //cell.workoutName3.text = customcomingupData[indexPath.row].workout_name
                //cell.workoutSubName3.text = customcomingupData[indexPath.row].reps + " Reps of " + customcomingupData[indexPath.row].sets + " sets"
                cell.workoutImage.image = UIImage(named: "workouts")
                cell.workoutView.backgroundColor = UIColor(red: 71, green: 203, blue: 189)
                
               // cell.workoutName4.hidden = true
                //cell.workoutSubName4.hidden = true
                cell.completedButton.tag = 0
                cell.partialButton.tag = 0
           // }

  
       

        }
        
        else if collectionView.tag == 2
        {

            
            var dts:[String] = [String]()
            var dtsv:[String] = [String]()
            for var i=0; i<customcomingUpDataLifeStyle.count; i=i+1{
                dts.append(customcomingUpDataLifeStyle[i].lifestyle_name)
                dtsv.append(customcomingUpDataLifeStyle[i].gap)
            }
            
            cell.datasrc = dts
            cell.datasrcv = dtsv

            cell.workoutLabel.text = customcomingUpDataLifeStyle[indexPath.row].type
            cell.timingLabel.text  = customcomingUpDataLifeStyle[indexPath.row].time
            //cell.workoutName1.text = customcomingUpDataLifeStyleObject.lifestyle_name
            //cell.workoutSubName1.text = customcomingUpDataLifeStyleObject.gap
            cell.workoutImage.image = UIImage(named: "lifestyles")
             cell.workoutView.backgroundColor = UIColor(red: 18, green: 178, blue: 230)
            //self.collectionView.reloadData()
            
//            cell.workoutName2.hidden = true
//            cell.workoutName3.hidden = true
//            cell.workoutName4.hidden = true
//            cell.workoutSubName2.hidden = true
//            cell.workoutSubName3.hidden = true
//            cell.workoutSubName4.hidden = true
            cell.completedButton.tag = 0
            cell.partialButton.tag = 0

        }
        else if collectionView.tag == 3
        {
            var dts:[String] = [String]()
            var dtsv:[String] = [String]()
            for var i=0; i<customcominUpDataFood.count; i=i+1{
                dts.append(customcominUpDataFood[i].food_name)
                dtsv.append(customcominUpDataFood[i].when)
            }
            
            cell.datasrc = dts
            cell.datasrcv = dtsv
   

            cell.workoutLabel.text = customcominUpDataFood[indexPath.row].type
            cell.timingLabel.text  = customcominUpDataFood[indexPath.row].time
            //cell.workoutName1.text = customcominUpDataFood[indexPath.row].food_name
            //cell.workoutSubName1.text = customcominUpDataFood[indexPath.row].when
            cell.workoutImage.image = UIImage(named: "food-&-Drinkss")
             cell.workoutView.backgroundColor = UIColor(red: 189, green: 128, blue: 195)
            //self.collectionView.reloadData()
            //cell.workoutName2.hidden = true
            //cell.workoutName3.hidden = true
            ///cell.workoutName4.hidden = true
            //cell.workoutSubName2.hidden = true
            //cell.workoutSubName3.hidden = true
            //cell.workoutSubName4.hidden = true
            cell.completedButton.tag = 0
            cell.partialButton.tag = 0

        }
        else
        {
            
            var dts:[String] = [String]()
            var dtsv:[String] = [String]()
            for var i=0; i<customcominUpDataOthers.count; i=i+1{
                dts.append(customcominUpDataOthers[i].others_name)
                dtsv.append(customcominUpDataOthers[i].duration)
            }
            
            cell.datasrc = dts
            cell.datasrcv = dtsv

            cell.workoutLabel.text = customcominUpDataOthers[indexPath.row].type
            cell.timingLabel.text  = customcominUpDataOthers[indexPath.row].time
            //cell.workoutName1.text = customcominUpDataOthers[indexPath.row].others_name
            //cell.workoutSubName1.text = customcominUpDataOthers[indexPath.row].duration
            cell.workoutImage.image = UIImage(named: "others")
             cell.workoutView.backgroundColor = UIColor(red: 205, green: 75, blue: 113)
            //self.collectionView.reloadData()
//            cell.workoutName2.hidden = true
//            cell.workoutName3.hidden = true
//            cell.workoutName4.hidden = true
//            cell.workoutSubName2.hidden = true
//            cell.workoutSubName3.hidden = true
//            cell.workoutSubName4.hidden = true
            cell.completedButton.tag = 0
            cell.partialButton.tag = 0

        }

        
    
        
        
        
        // Collectiov View Buttons
        cell.completedButton.layer.cornerRadius = 15
        cell.completedButton.layer.masksToBounds = true
        
        cell.partialButton.layer.cornerRadius = 15
        cell.partialButton.layer.masksToBounds = true
        
        
        
        // Collection View  dotView
        cell.dotView.layer.cornerRadius = 5
        cell.dotView.layer.masksToBounds = true
        
        // Collection View  workoutView
        cell.workoutView.layer.cornerRadius = 20
        
        cell.workoutView.layer.masksToBounds = true
        
        
        //self.collectionView.reloadData()
        
      
        
        return cell
    }
    
    func collectionView(collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAtIndexPath indexPath: NSIndexPath) -> CGSize {
        
        if collectionView.tag == 0
        {
        return CGSize(width: 320, height: 200);
        }
        
        else if collectionView.tag == 1
        {
            return CGSize(width: 320, height: 325);
        }
        
        else if collectionView.tag == 2
        {
            return CGSize(width: 320, height: 200);
        }
        
        else if collectionView.tag == 3
        {
            return CGSize(width: 320, height: 200);
        }
        else
        {
            return CGSize(width: 320, height: 200);
        }
    }
    
    
    
    
   
    func completedPressed(sender: UIButton)
    {
        
        if collectionView.tag == 0
        
        {
            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            request.HTTPMethod = "POST"
            let postString = "id=\(customcomingUpDataSupplements[sender.tag].timings_id)&completion=1"
            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
                guard error == nil && data != nil else {                                                          // check for fundamental networking error
                    print("error=\(error)")
                    return
                }
                
                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
                    print("response = \(response)")
                }
                
                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("responseString = \(responseString)")
            }
            task.resume()
        }
        
        else if collectionView.tag == 1
        {
            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            request.HTTPMethod = "POST"
            let postString = "id=\(customcomingupData[sender.tag].timings_id)&completion=1"
            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
                guard error == nil && data != nil else {                                                          // check for fundamental networking error
                    print("error=\(error)")
                    return
                }
                
                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
                    print("response = \(response)")
                }
                
                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("responseString = \(responseString)")
            }
            task.resume()
        }
        
        else if collectionView.tag == 2
        {
            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            request.HTTPMethod = "POST"
            let postString = "id=\(customcomingUpDataLifeStyle[sender.tag].timings_id)&completion=1"
            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
                guard error == nil && data != nil else {                                                          // check for fundamental networking error
                    print("error=\(error)")
                    return
                }
                
                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
                    print("response = \(response)")
                }
                
                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("responseString = \(responseString)")
            }
            task.resume()
        }
        
        else if collectionView.tag == 3
        {
            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            request.HTTPMethod = "POST"
            let postString = "id=\(customcominUpDataFood[sender.tag].timings_id)&completion=1"
            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
                guard error == nil && data != nil else {                                                          // check for fundamental networking error
                    print("error=\(error)")
                    return
                }
                
                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
                    print("response = \(response)")
                }
                
                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("responseString = \(responseString)")
            }
            task.resume()
        }
        
        else if collectionView.tag == 4
        {
            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            request.HTTPMethod = "POST"
            let postString = "id=\(customcominUpDataOthers[sender.tag].timings_id)&completion=1"
            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
                guard error == nil && data != nil else {                                                          // check for fundamental networking error
                    print("error=\(error)")
                    return
                }
                
                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
                    print("response = \(response)")
                }
                
                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("responseString = \(responseString)")
            }
            task.resume()
        }
        
    }
    
    
    
    
    func partialPressed(sender: UIButton)
    {
        if collectionView.tag == 0
            
        {
           // print(sender.tag)
            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            request.HTTPMethod = "POST"
            let postString = "id=\(customcomingUpDataSupplements[sender.tag].timings_id)&completion=0.5"
            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
                guard error == nil && data != nil else {                                                          // check for fundamental networking error
                    print("error=\(error)")
                    return
                }
                
                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200
                {           // check for http errors
                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
                    print("response = \(response)")
                }
                
                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("responseString = \(responseString)")
            }
            task.resume()
        }
            
        else if collectionView.tag == 1
        {
            
            
            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            request.HTTPMethod = "POST"
            let postString = "id=\(customcomingupData[sender.tag].timings_id)&completion=1"
            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
                guard error == nil && data != nil else {                                                          // check for fundamental networking error
                    print("error=\(error)")
                    return
                }
                
                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
                    print("response = \(response)")
                }
                
                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("responseString = \(responseString)")
            }
            task.resume()
            
        
            
        }
            
        else if collectionView.tag == 2
        {
            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            request.HTTPMethod = "POST"
            let postString = "id=\(customcomingUpDataLifeStyle[sender.tag].timings_id)&completion=0.5"
            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
                guard error == nil && data != nil else {                                                          // check for fundamental networking error
                    print("error=\(error)")
                    return
                }
                
                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
                    print("response = \(response)")
                }
                
                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("responseString = \(responseString)")
            }
            task.resume()
        }
            
        else if collectionView.tag == 3
        {
            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            request.HTTPMethod = "POST"
            let postString = "id=\(customcominUpDataFood[sender.tag].timings_id)&completion=0.5"
            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
                guard error == nil && data != nil else {                                                          // check for fundamental networking error
                    print("error=\(error)")
                    return
                }
                
                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
                    print("response = \(response)")
                }
                
                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("responseString = \(responseString)")
            }
            task.resume()
        }
            
        else if collectionView.tag == 4
        {
            let request = NSMutableURLRequest(URL: NSURL(string: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")!)
            request.HTTPMethod = "POST"
            let postString = "id=\(customcominUpDataOthers[sender.tag].timings_id)&completion=0.5"
            request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) { data, response, error in
                guard error == nil && data != nil else {                                                          // check for fundamental networking error
                    print("error=\(error)")
                    return
                }
                
                if let httpStatus = response as? NSHTTPURLResponse where httpStatus.statusCode != 200 {           // check for http errors
                    print("statusCode should be 200, but is \(httpStatus.statusCode)")
                    print("response = \(response)")
                }
                
                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
                print("responseString = \(responseString)")
            }
            task.resume()
        }

   }

}
