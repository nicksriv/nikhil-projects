//
//  Utils.swift
//  Myish
//
//  Created by Nikhil Srivastava on 10/22/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class Utils {
    
    
    class func getStringFromJSON(data: NSDictionary, key: String) -> String{
        
        
        
        let info : AnyObject? = data[key]
        
        if let info = data[key] as? String {
            print(key)
            print(info)
            return info
        }
        return ""
    }
    
    class func getStringArrayFromJSON(data: NSDictionary, key: String) -> [String]{
        
        
        
       // let info = data[key] as! Array<String>
        
        if let info = data[key] as? Array<String>{
            print(key)
            print(info)
            return info
        }
        return []
    }
    
    class func stripHTML(str: NSString) -> String {
        
        var stringToStrip = str
        var r = stringToStrip.rangeOfString("<[^>]+>", options:.RegularExpressionSearch)
        while r.location != NSNotFound {
            
            stringToStrip = stringToStrip.stringByReplacingCharactersInRange(r, withString: "")
            r = stringToStrip.rangeOfString("<[^>]+>", options:.RegularExpressionSearch)
        }
        
        return stringToStrip as String
    }
    
    class func formatDate(dateString: String) -> String {
        
        let formatter = NSDateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ssZ"
        let date = formatter.dateFromString(dateString)
        
        formatter.dateFormat = "MMM dd, yyyy"
        return formatter.stringFromDate(date!)
    }
    
    class func imageResize(imageObj:UIImage, sizeChange:CGSize)-> UIImage {
        
        let hasAlpha = false
        let scale: CGFloat = 0.0 // Automatically use scale factor of main screen
        
        UIGraphicsBeginImageContextWithOptions(sizeChange, !hasAlpha, scale)
        imageObj.drawInRect(CGRect(origin: CGPointZero, size: sizeChange))
        
        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext() // !!!
        return scaledImage
    }
    
    class func post(params : Dictionary<String, String>, url : String) {
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
  
        }
        let task =  session.dataTaskWithRequest(request, completionHandler: {data, response, error -> Void in
 
            if error == nil{
            let strData = NSString(data: data!, encoding: NSUTF8StringEncoding)
 
            }
            else {
          
            }
        })
        
        task.resume()
    }
    
    class func post2(params : Dictionary<String, String>, url : String) {
        let request = NSMutableURLRequest(URL: NSURL(string: url)!)
        let session = NSURLSession.sharedSession()
        request.HTTPMethod = "POST"
        request.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalCacheData
        do{
            //  let err: NSError?
            request.HTTPBody = try NSJSONSerialization.dataWithJSONObject(params, options: NSJSONWritingOptions.init(rawValue: 0))
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("application/json", forHTTPHeaderField: "Accept")
        }
        catch{
            //print("Error writing JSON: ")
        }
        let task =  session.dataTaskWithRequest(request, completionHandler: {data, response, error -> Void in
            //print("Request: \(request)")
            //print("Response: \(response!)")
            if error == nil{
                let strData = NSString(data: data!, encoding: NSUTF8StringEncoding)
                //userProfileID = strData as! String
               // print("Body: \(strData!)")
                
            }
            else {
              //  print("Error: \(error?.localizedDescription)")
                
            }
            let err: NSError?
                        do{
                            let json = try NSJSONSerialization.JSONObjectWithData(data!, options: .MutableLeaves) as? NSDictionary
            
                            if let parseJSON = json {
                                // Okay, the parsedJSON is here, let's get the value for 'success' out of it
                                let success = parseJSON["success"] as? Int
                               // print("Success: \(success)")
                            }
                            else {
                                // Woa, okay the json object was nil, something went worng. Maybe the server isn't running?
                                let jsonStr = NSString(data: data!, encoding: NSUTF8StringEncoding)
                                //print("Failure Error could not parse JSON: \(jsonStr!)")
                            }
                        }
                        catch let error as NSError{
                            let jsonStr = NSString(data: data!, encoding: NSUTF8StringEncoding)
                            //print("Error could not parse JSON: '\(jsonStr!)'")
                            //print("json error: \(error.localizedDescription)")
                        }
        })
        
        task.resume()
    }

    
    
}

extension String {
    var toDate : NSDate? {
        let formatter = NSDateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        formatter.locale = NSLocale(localeIdentifier: "en_US_POSIX")
        formatter.timeZone = NSTimeZone(forSecondsFromGMT: 0)
        if let date = formatter.dateFromString(self) {
            return date
        } else {
            formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
            if let  date = formatter.dateFromString(self) {
                return date
            }
        }
        return nil
    }
}
