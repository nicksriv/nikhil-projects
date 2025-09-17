//
//  ExtensionImagefromURL.swift
//  Holbe
//
//  Created by Appsriv Technologies on 16/05/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import Foundation

//extension UIImageView {
//    public func imageFromUrl(urlString: String) {
//        if let url = NSURL(string: urlString) {
//            print(url)
//            let request = NSURLRequest(URL: url)
//            NSURLConnection.sendAsynchronousRequest(request, queue: NSOperationQueue.mainQueue()) {
//                (response: NSURLResponse?, data: NSData?, error: NSError?) -> Void in
//                if let imageData = data as NSData? {
//                    print(imageData)
//                    self.image = UIImage(data: imageData)
//                }
//            }
//        }
//    }
//}


extension UIImageView {
    func downloadedFrom(link link:String, contentMode mode: UIViewContentMode) {
        guard
            let url = NSURL(string: link)
            else {return}
        contentMode = mode
        NSURLSession.sharedSession().dataTaskWithURL(url, completionHandler: { (data, response, error) -> Void in
            guard
                let httpURLResponse = response as? NSHTTPURLResponse where httpURLResponse.statusCode == 200,
                let mimeType = response?.MIMEType where mimeType.hasPrefix("image"),
                let data = data where error == nil,
                let image = UIImage(data: data)
                else { return }
            dispatch_async(dispatch_get_main_queue()) { () -> Void in
                self.image = image
            }
        }).resume()
    }
}