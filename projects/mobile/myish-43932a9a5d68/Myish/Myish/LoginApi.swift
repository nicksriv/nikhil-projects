//
//  LoginApi.swift
//  Myish
//
//  Created by Nikhil Srivastava on 10/27/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class LoginApi{
    
    var logindatas: [LoginData]
    
    init(){
      logindatas = [LoginData]()
    }
    
    func loadLogin(loginUrl: String, completion: (([LoginData]) -> Void)!) {
        
        let urlString = loginUrl
        
        print("NSURLSession: \(urlString)")
        let session = NSURLSession.sharedSession()
        let loginUrls = NSURL(string: urlString)
        
        let task = session.dataTaskWithURL(loginUrls!){
            
            (data, response, error) -> Void in
            
            if error != nil {
                
                print(error!.description)
                print(error!.localizedDescription)
            } else {
                
                print("Begin Serialization: ")
                print(data!.length)
                
                
                let loginDataArray = try! NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.MutableContainers) as! Array<NSDictionary>
                
                let loginDictionary = loginDataArray
                //var cardCount = cardsDataArray.count
                //var cards = [CardData]()
                print(loginDictionary.count)
                
                for login in loginDictionary{
                    
                    let login = LoginData(data:login as NSDictionary )
                    
                    //print(login.title)
//                    if(login.status == "1"){
//                        print("ad added \(self.logindatas.count)")
                        self.logindatas.append(login as LoginData)
                    //}
                    
                }
                
                let priority = DISPATCH_QUEUE_PRIORITY_DEFAULT
                dispatch_async(dispatch_get_global_queue(priority, 0)) {
                    dispatch_async(dispatch_get_main_queue()) {
                        
                        completion(self.logindatas)
                    }
                }
                
            }
        }
        
        task.resume()
        
    }

}