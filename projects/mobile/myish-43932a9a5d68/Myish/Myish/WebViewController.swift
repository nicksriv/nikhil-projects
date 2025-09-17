//
//  WebViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 4/11/16.
//  Copyright © 2016 Appsriv Technologies. All rights reserved.
//

import UIKit

class WebViewController: UIViewController {

    @IBOutlet weak var webView: UIWebView!
    
    var url:String!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        let requestURL = NSURL(string: url)!
        let request = NSURLRequest(URL: requestURL)
        webView.loadRequest(request)
        
    }

    @IBAction func dismiss(sender: UIButton) {
        self.navigationController?.popViewControllerAnimated(true)
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
