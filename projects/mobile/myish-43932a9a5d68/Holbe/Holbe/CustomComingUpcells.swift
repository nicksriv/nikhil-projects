//
//  CustomComingUpcells.swift
//  Holbe
//
//  Created by Appsriv Technologies on 22/04/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import UIKit



class CustomComingUpcells: UICollectionViewCell
{
    
    @IBOutlet weak var ContentView: UIView!
    @IBOutlet weak var LineView: UIView!
    @IBOutlet weak var NewtimedisplayLabel: UILabel!
    @IBOutlet weak var TreattypeLabel: UILabel!
    @IBOutlet weak var WorkoutNameLabel: UILabel!
    @IBOutlet weak var repsandsitups: UILabel!

    @IBOutlet weak var TimedisplayLabel: UILabel!
    
   
    @IBOutlet weak var workoutView: UIView!
    @IBOutlet weak var workoutImages: UIImageView!
    

    
    @IBOutlet weak var completedButton: UIButton!
    
    @IBOutlet weak var partialcompletedButton: UIButton!
    override func awakeFromNib()
    {
        super.awakeFromNib()
        // Initialization code
    }
    
    
    
    @IBAction func CompletedPressed(sender: UIButton)
    {
        
        if sender.superview!.tag == 0
        {
             if SupplementDataTclassTypearray[sender.tag].state == 0{
            completedButton.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
            partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
            SupplementDataTclassTypearray[sender.tag].state=1
            SupplementDataTclassTypearray[sender.tag].compliance = 100
            //completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(SupplementDataTclassTypearray[sender.tag].timings_id)&completion=1")
            self.postsocial(["id":"\(SupplementDataTclassTypearray[sender.tag].timings_id)", "completion": "1"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
            }
             else{
                completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
                partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
               
                SupplementDataTclassTypearray[sender.tag].state = 0
                SupplementDataTclassTypearray[sender.tag].compliance = 0
                //completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(SupplementDataTclassTypearray[sender.tag].timings_id)&completion=0")
                self.postsocial(["id":"\(SupplementDataTclassTypearray[sender.tag].timings_id)", "completion": "0"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
            }
        }
        
        if sender.superview!.tag == 1
        {
            if workoutclassTypearray[sender.tag].state == 0{
            completedButton.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
            partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
             workoutclassTypearray[sender.tag].state = 1
             workoutclassTypearray[sender.tag].complainces = 100
             //completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(workoutclassTypearray[sender.tag].timings_id)&completion=1")
             self.postsocial(["id":"\(workoutclassTypearray[sender.tag].timings_id)", "completion": "1"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
            }
            else{
                completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
                partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
                workoutclassTypearray[sender.tag].state = 0
                workoutclassTypearray[sender.tag].complainces = 0
                //completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(workoutclassTypearray[sender.tag].timings_id)&completion=0")
                self.postsocial(["id":"\(workoutclassTypearray[sender.tag].timings_id)", "completion": "0"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
            }
        }
        if sender.superview!.tag == 2
        {
            if LifeStyleclassTypearray[sender.tag].state == 0{
            completedButton.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
            partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
            LifeStyleclassTypearray[sender.tag].state = 1
            LifeStyleclassTypearray[sender.tag].compliance = 100
            //completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(LifeStyleclassTypearray[sender.tag].timings_id)&completion=1")
            self.postsocial(["id":"\(LifeStyleclassTypearray[sender.tag].timings_id)", "completion": "1"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
            }
            else{
                completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
                partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
                LifeStyleclassTypearray[sender.tag].state = 0
                LifeStyleclassTypearray[sender.tag].compliance = 0
                //completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(LifeStyleclassTypearray[sender.tag].timings_id)&completion=0")
                self.postsocial(["id":"\(LifeStyleclassTypearray[sender.tag].timings_id)", "completion": "0"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
                
            }
        }
        if sender.superview!.tag == 3
        {
            if FoodDataclassTypearray[sender.tag].state == 0 {
            completedButton.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
            partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
            FoodDataclassTypearray[sender.tag].state = 1
            FoodDataclassTypearray[sender.tag].compliance = 100
            //completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(FoodDataclassTypearray[sender.tag].timings_id)&completion=1")
            self.postsocial(["id":"\(FoodDataclassTypearray[sender.tag].timings_id)", "completion": "1"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
            }
            else{
                completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
                partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
                FoodDataclassTypearray[sender.tag].state = 0
                FoodDataclassTypearray[sender.tag].compliance = 0
                //completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(FoodDataclassTypearray[sender.tag].timings_id)&completion=0")
                self.postsocial(["id":"\(FoodDataclassTypearray[sender.tag].timings_id)", "completion": "0"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
            }
        }
        if sender.superview!.tag == 4
        {
            if OthersclassTypearray[sender.tag].state == 0{
            completedButton.setImage(UIImage(named: "completed-btn"), forState: UIControlState.Normal)
            partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
            OthersclassTypearray[sender.tag].state = 1
            OthersclassTypearray[sender.tag].compliance = 100
            //completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(OthersclassTypearray[sender.tag].timings_id)&completion=1")
            self.postsocial(["id":"\(OthersclassTypearray[sender.tag].timings_id)", "completion": "1"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
            }
            else{
                completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
                partialcompletedButton.setImage(UIImage(named: "partial-btn"), forState: UIControlState.Normal)
                OthersclassTypearray[sender.tag].state = 0
                OthersclassTypearray[sender.tag].compliance = 0
                //completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(OthersclassTypearray[sender.tag].timings_id)&completion=0")
                self.postsocial(["id":"\(OthersclassTypearray[sender.tag].timings_id)", "completion": "0"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
            }
        }
        
    }
    
    
    
    @IBAction func partialPressed(sender: UIButton)
    {
      
        // Alert view to show successfull update
        if sender.superview!.tag == 0
        {
            completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
            partialcompletedButton.setImage(UIImage(named: "partial-green-btn"), forState: UIControlState.Normal)
            SupplementDataTclassTypearray[sender.tag].compliance = 50
           //completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(SupplementDataTclassTypearray[sender.tag].timings_id)&completion=0.5")
           self.postsocial(["id":"\(SupplementDataTclassTypearray[sender.tag].timings_id)", "completion": "0.5"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
        }
        
        if sender.superview!.tag == 1
        {
          
            completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
            partialcompletedButton.setImage(UIImage(named: "partial-green-btn"), forState: UIControlState.Normal)
            workoutclassTypearray[sender.tag].complainces = 50
            //completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(workoutclassTypearray[sender.tag].timings_id)&completion=0.5")
            self.postsocial(["id":"\(workoutclassTypearray[sender.tag].timings_id)", "completion": "0.5"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
        }
        if sender.superview!.tag == 2
        {
          
            completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
            partialcompletedButton.setImage(UIImage(named: "partial-green-btn"), forState: UIControlState.Normal)
            LifeStyleclassTypearray[sender.tag].compliance = 50
           // completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(LifeStyleclassTypearray[sender.tag].timings_id)&completion=0.5")
            self.postsocial(["id":"\(LifeStyleclassTypearray[sender.tag].timings_id)", "completion": "0.5"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
        }
        if sender.superview!.tag == 3
        {
            
            completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
            partialcompletedButton.setImage(UIImage(named: "partial-green-btn"), forState: UIControlState.Normal)

            FoodDataclassTypearray[sender.tag].compliance = 50
            //completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(FoodDataclassTypearray[sender.tag].timings_id)&completion=0.5")
            self.postsocial(["id":"\(FoodDataclassTypearray[sender.tag].timings_id)", "completion": "0.5"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
        }
        if sender.superview!.tag == 4
        {
           
            completedButton.setImage(UIImage(named: "completed-grey"), forState: UIControlState.Normal)
            partialcompletedButton.setImage(UIImage(named: "partial-green-btn"), forState: UIControlState.Normal)
            OthersclassTypearray[sender.tag].compliance = 50
            //completion("http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php?id=\(OthersclassTypearray[sender.tag].timings_id)&completion=0.5")
            self.postsocial(["id":"\(OthersclassTypearray[sender.tag].timings_id)", "completion": "0.5"], url: "http://192.185.26.69/~holbe/api/patient/updatecompliancenew.php")
        }

    }
    
    
    func completion(urlsString: String)
    {
        
        let url = NSURL(string: urlsString)
        print(urlsString)
        
        
        let task = NSURLSession.sharedSession().dataTaskWithURL(url!) { (data,response,error) in
            
            dispatch_async(dispatch_get_main_queue(),
                           {
                            
                            self.extract_Completion(data!)
            })
        }
        task.resume()
        
    }
    
    
    func extract_Completion(data:NSData)
    {
        let json = JSON(data: data)
    
        print(json)
    }
    
    func postsocial(params : Dictionary<String, String>, url : String) {
        
        
        
        let request = NSMutableURLRequest(URL: NSURL(string: url)!)
        
        let session = NSURLSession.sharedSession()
        
        request.HTTPMethod = "POST"
        
        request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalCacheData

        
        do{
            
            request.HTTPBody = try NSJSONSerialization.dataWithJSONObject(params, options: NSJSONWritingOptions.init(rawValue: 0))
            
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

            
            print("Response: \(response)")
            
            let strData = NSString(data: data!, encoding: NSUTF8StringEncoding)
            
            print("Body: \(strData)")

            
        })

        task.resume()
 
        
    }
    
    
}
